import type { AuditRule } from '../../types';

export const headingRules: AuditRule[] = [
  {
    id: 'h1-exists',
    category: 'headings',
    name: 'H1 Tag Exists',
    description: 'Page must have at least one H1 tag.',
    check: (data) => {
      const h1s = data.headings.filter((h) => h.level === 1);
      return {
        ruleId: 'h1-exists',
        ruleName: 'H1 Tag Exists',
        category: 'headings',
        severity: h1s.length > 0 ? 'pass' : 'critical',
        message:
          h1s.length > 0
            ? `H1 found: "${h1s[0].text}"`
            : 'No H1 tag found. Every page should have exactly one H1.',
      };
    },
  },
  {
    id: 'h1-multiple',
    category: 'headings',
    name: 'Single H1',
    description: 'Page should have only one H1 tag.',
    check: (data) => {
      const h1s = data.headings.filter((h) => h.level === 1);
      if (h1s.length <= 1) {
        return {
          ruleId: 'h1-multiple',
          ruleName: 'Single H1',
          category: 'headings',
          severity: 'pass',
          message: h1s.length === 1 ? 'Only one H1 tag found.' : 'No H1 tags.',
        };
      }
      return {
        ruleId: 'h1-multiple',
        ruleName: 'Single H1',
        category: 'headings',
        severity: 'warning',
        message: `${h1s.length} H1 tags found. Best practice is to have exactly one.`,
        details: h1s.map((h) => `- ${h.text}`).join('\n'),
      };
    },
  },
  {
    id: 'heading-hierarchy',
    category: 'headings',
    name: 'Heading Hierarchy',
    description: 'Headings should not skip levels.',
    check: (data) => {
      if (data.headings.length === 0) {
        return {
          ruleId: 'heading-hierarchy',
          ruleName: 'Heading Hierarchy',
          category: 'headings',
          severity: 'info',
          message: 'No headings to evaluate.',
        };
      }
      const skips: string[] = [];
      for (let i = 1; i < data.headings.length; i++) {
        const prev = data.headings[i - 1].level;
        const curr = data.headings[i].level;
        if (curr > prev + 1) {
          skips.push(
            `H${prev} → H${curr} (skipped H${prev + 1}) at "${data.headings[i].text}"`,
          );
        }
      }
      return {
        ruleId: 'heading-hierarchy',
        ruleName: 'Heading Hierarchy',
        category: 'headings',
        severity: skips.length === 0 ? 'pass' : 'warning',
        message:
          skips.length === 0
            ? 'Heading hierarchy is correct.'
            : `${skips.length} heading level skip(s) found.`,
        details: skips.length > 0 ? skips.join('\n') : undefined,
      };
    },
  },
  {
    id: 'heading-empty',
    category: 'headings',
    name: 'Empty Headings',
    description: 'Headings should not be empty.',
    check: (data) => {
      const empty = data.headings.filter((h) => !h.text.trim());
      return {
        ruleId: 'heading-empty',
        ruleName: 'Empty Headings',
        category: 'headings',
        severity: empty.length === 0 ? 'pass' : 'warning',
        message:
          empty.length === 0
            ? 'No empty headings found.'
            : `${empty.length} empty heading(s) found.`,
        details:
          empty.length > 0
            ? empty.map((h) => `Empty ${h.tag.toUpperCase()}`).join('\n')
            : undefined,
      };
    },
  },
];
