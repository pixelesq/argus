import type { GeminiAvailability } from '../types';

// Shared options for availability checks and session creation
const MODEL_OPTIONS = {
  expectedInputs: [{ type: 'text', languages: ['en'] }],
  expectedOutputs: [{ type: 'text', languages: ['en'] }],
};

declare global {
  // Chrome Built-in AI Prompt API (Chrome 138+)
  const LanguageModel: {
    availability(options?: Record<string, unknown>): Promise<string>;
    create(options: Record<string, unknown>): Promise<LanguageModelSession>;
    params(): Promise<{
      defaultTopK: number;
      maxTopK: number;
      defaultTemperature: number;
      maxTemperature: number;
    }>;
  };

  interface LanguageModelSession {
    prompt(input: string, options?: Record<string, unknown>): Promise<string>;
    promptStreaming(
      input: string,
      options?: Record<string, unknown>,
    ): AsyncIterable<string>;
    clone(): Promise<LanguageModelSession>;
    destroy(): void;
  }
}

export async function checkGeminiAvailability(): Promise<GeminiAvailability> {
  try {
    if (typeof LanguageModel === 'undefined') return 'unavailable';
    const availability = await LanguageModel.availability(MODEL_OPTIONS);
    if (availability === 'available') return 'available';
    if (availability === 'downloadable') return 'downloadable';
    if (availability === 'downloading') return 'downloading';
    return 'unavailable';
  } catch {
    return 'unavailable';
  }
}

export async function createSession(
  systemPrompt: string,
  onDownloadProgress?: (progress: number) => void,
): Promise<LanguageModelSession> {
  const session = await LanguageModel.create({
    ...MODEL_OPTIONS,
    initialPrompts: [{ role: 'system', content: systemPrompt }],
    monitor(m: EventTarget) {
      if (onDownloadProgress) {
        m.addEventListener('downloadprogress', ((e: CustomEvent) => {
          onDownloadProgress(e.loaded ?? 0);
        }) as EventListener);
      }
    },
  });
  return session;
}

export async function promptGemini(
  session: LanguageModelSession,
  prompt: string,
): Promise<string> {
  const response = await session.prompt(prompt);
  return response;
}

export async function promptGeminiStreaming(
  session: LanguageModelSession,
  prompt: string,
  onChunk: (text: string) => void,
): Promise<string> {
  const stream = session.promptStreaming(prompt);
  let fullResponse = '';
  for await (const chunk of stream) {
    fullResponse = chunk;
    onChunk(chunk);
  }
  return fullResponse;
}
