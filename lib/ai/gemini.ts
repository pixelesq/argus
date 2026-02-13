import type { GeminiAvailability } from '../types';

declare global {
  // Chrome Built-in AI Prompt API (Chrome 137+)
  const LanguageModel: {
    availability(): Promise<string>;
    create(options: { systemPrompt: string }): Promise<LanguageModelSession>;
  };

  interface LanguageModelSession {
    prompt(input: string): Promise<string>;
    promptStreaming(input: string): AsyncIterable<string>;
    destroy(): void;
  }
}

export async function checkGeminiAvailability(): Promise<GeminiAvailability> {
  try {
    if (typeof LanguageModel === 'undefined') return 'unavailable';
    const availability = await LanguageModel.availability();
    if (availability === 'available') return 'available';
    if (availability === 'downloadable' || availability === 'downloading')
      return 'downloading';
    return 'unavailable';
  } catch {
    return 'unavailable';
  }
}

export async function createSession(
  systemPrompt: string,
): Promise<LanguageModelSession> {
  const session = await LanguageModel.create({ systemPrompt });
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
  // Note: promptStreaming returns cumulative text, not chunks
  for await (const chunk of stream) {
    fullResponse = chunk;
    onChunk(chunk);
  }
  return fullResponse;
}
