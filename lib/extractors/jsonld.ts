import type { JsonLdData } from '../types';

export function extractJsonLd(): JsonLdData[] {
  const scripts = document.querySelectorAll(
    'script[type="application/ld+json"]',
  );
  const results: JsonLdData[] = [];

  scripts.forEach((script) => {
    const raw = script.textContent?.trim() ?? '';
    const errors: string[] = [];
    let parsed: any = null;
    let type = '';
    let isValid = false;

    try {
      parsed = JSON.parse(raw);
      isValid = true;
      if (parsed['@type']) {
        type = Array.isArray(parsed['@type'])
          ? parsed['@type'].join(', ')
          : parsed['@type'];
      } else if (parsed['@graph'] && Array.isArray(parsed['@graph'])) {
        const types = parsed['@graph']
          .map((item: any) => item['@type'])
          .filter(Boolean);
        type = types.join(', ');
      }
    } catch (e) {
      errors.push(e instanceof Error ? e.message : 'Invalid JSON');
    }

    results.push({ raw, parsed, type, isValid, errors });
  });

  return results;
}
