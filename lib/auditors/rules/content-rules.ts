import type { AuditRule } from '../../types';

export const contentRules: AuditRule[] = [
  {
    id: 'word-count',
    category: 'content',
    name: 'Word Count',
    description: 'Page should have sufficient content.',
    check: (data) => {
      const wc = data.wordCount;
      return {
        ruleId: 'word-count',
        ruleName: 'Word Count',
        category: 'content',
        severity: wc >= 300 ? 'pass' : wc > 0 ? 'warning' : 'info',
        message:
          wc >= 300
            ? `${wc} words found (sufficient content).`
            : wc > 0
              ? `Only ${wc} words found. Pages with < 300 words may be considered thin content.`
              : 'No text content found on page.',
      };
    },
  },
  {
    id: 'reading-time',
    category: 'content',
    name: 'Reading Time',
    description: 'Estimated reading time based on word count.',
    check: (data) => {
      const minutes = Math.ceil(data.wordCount / 200);
      return {
        ruleId: 'reading-time',
        ruleName: 'Reading Time',
        category: 'content',
        severity: 'info',
        message: `Estimated reading time: ${minutes} minute${minutes !== 1 ? 's' : ''} (${data.wordCount} words).`,
      };
    },
  },
];
