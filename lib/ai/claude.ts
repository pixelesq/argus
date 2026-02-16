const API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-opus-4-6';

interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function promptClaude(
  apiKey: string,
  systemPrompt: string,
  userPrompt: string,
): Promise<string> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 2048,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }] satisfies ClaudeMessage[],
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      (error as any)?.error?.message ?? `Claude API error: ${response.status}`,
    );
  }

  const data = await response.json();
  return (data as any).content?.[0]?.text ?? '';
}

export async function promptClaudeStreaming(
  apiKey: string,
  systemPrompt: string,
  userPrompt: string,
  onChunk: (text: string) => void,
): Promise<string> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 2048,
      stream: true,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }] satisfies ClaudeMessage[],
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      (error as any)?.error?.message ?? `Claude API error: ${response.status}`,
    );
  }

  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let fullText = '';
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      const data = line.slice(6);
      if (data === '[DONE]') continue;

      try {
        const event = JSON.parse(data);
        if (
          event.type === 'content_block_delta' &&
          event.delta?.type === 'text_delta'
        ) {
          fullText += event.delta.text;
          onChunk(fullText);
        }
      } catch {
        // skip malformed events
      }
    }
  }

  return fullText;
}
