export interface AiSettings {
  claudeApiKey: string;
}

const STORAGE_KEY = 'argus_ai_settings';

export async function getAiSettings(): Promise<AiSettings> {
  try {
    const result = await chrome.storage.local.get(STORAGE_KEY);
    return result[STORAGE_KEY] ?? { claudeApiKey: '' };
  } catch {
    return { claudeApiKey: '' };
  }
}

export async function saveAiSettings(settings: AiSettings): Promise<void> {
  await chrome.storage.local.set({ [STORAGE_KEY]: settings });
}

export async function clearAiSettings(): Promise<void> {
  await chrome.storage.local.remove(STORAGE_KEY);
}

export async function validateClaudeKey(apiKey: string): Promise<boolean> {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 1,
        messages: [{ role: 'user', content: 'hi' }],
      }),
    });
    // 200 = valid, 401 = invalid key, anything else = treat as valid (rate limit, etc.)
    return response.status !== 401;
  } catch {
    // Network error — can't validate, assume valid
    return true;
  }
}
