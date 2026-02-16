import { promptClaude, promptClaudeStreaming } from './claude';
import {
  checkGeminiAvailability,
  createSession,
  promptGemini,
  promptGeminiStreaming,
} from './gemini';
import { getAiSettings } from './settings';
import type { GeminiAvailability } from '../types';

export type AiProvider = 'claude' | 'gemini' | 'static';

export interface AiProviderState {
  active: AiProvider;
  claudeConfigured: boolean;
  geminiStatus: GeminiAvailability;
}

export async function detectProvider(): Promise<AiProviderState> {
  const settings = await getAiSettings();
  const hasClaudeKey = Boolean(settings.claudeApiKey);
  const geminiStatus = await checkGeminiAvailability();

  let active: AiProvider = 'static';
  if (hasClaudeKey) {
    active = 'claude';
  } else if (geminiStatus === 'available') {
    active = 'gemini';
  }

  return {
    active,
    claudeConfigured: hasClaudeKey,
    geminiStatus,
  };
}

export async function runPrompt(
  systemPrompt: string,
  userPrompt: string,
): Promise<string> {
  const settings = await getAiSettings();

  // Try Claude first
  if (settings.claudeApiKey) {
    return promptClaude(settings.claudeApiKey, systemPrompt, userPrompt);
  }

  // Fall back to Gemini
  const geminiStatus = await checkGeminiAvailability();
  if (geminiStatus === 'available') {
    const session = await createSession(systemPrompt);
    try {
      return await promptGemini(session, userPrompt);
    } finally {
      session.destroy();
    }
  }

  throw new Error('No AI provider available');
}

export async function runPromptStreaming(
  systemPrompt: string,
  userPrompt: string,
  onChunk: (text: string) => void,
): Promise<string> {
  const settings = await getAiSettings();

  // Try Claude first
  if (settings.claudeApiKey) {
    return promptClaudeStreaming(
      settings.claudeApiKey,
      systemPrompt,
      userPrompt,
      onChunk,
    );
  }

  // Fall back to Gemini
  const geminiStatus = await checkGeminiAvailability();
  if (geminiStatus === 'available') {
    const session = await createSession(systemPrompt);
    try {
      return await promptGeminiStreaming(session, userPrompt, onChunk);
    } finally {
      session.destroy();
    }
  }

  throw new Error('No AI provider available');
}
