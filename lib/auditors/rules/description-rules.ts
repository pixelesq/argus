import type { AuditRule } from '../../types';

export const descriptionRules: AuditRule[] = [
  {
    id: 'desc-exists',
    category: 'description',
    name: 'Meta Description Exists',
    description: 'Page should have a meta description.',
    check: (data) => ({
      ruleId: 'desc-exists',
      ruleName: 'Meta Description Exists',
      category: 'description',
      severity: data.meta.description ? 'pass' : 'critical',
      message: data.meta.description
        ? 'Meta description found.'
        : 'No meta description found. This is important for search result snippets.',
    }),
  },
  {
    id: 'desc-length',
    category: 'description',
    name: 'Description Length',
    description: 'Meta description should be between 70 and 160 characters.',
    check: (data) => {
      if (!data.meta.description) {
        return {
          ruleId: 'desc-length',
          ruleName: 'Description Length',
          category: 'description',
          severity: 'critical',
          message: 'No description to evaluate.',
        };
      }
      const len = data.meta.descriptionLength;
      const inRange = len >= 70 && len <= 160;
      return {
        ruleId: 'desc-length',
        ruleName: 'Description Length',
        category: 'description',
        severity: inRange ? 'pass' : 'warning',
        message: inRange
          ? `Description length is ${len} characters (optimal range).`
          : `Description length is ${len} characters. Recommended: 70-160 characters.`,
        details: !inRange
          ? len < 70
            ? 'Your description is too short. Add more compelling detail.'
            : 'Your description may be truncated in search results.'
          : undefined,
      };
    },
  },
  {
    id: 'desc-og-match',
    category: 'description',
    name: 'Description / OG Description Match',
    description: 'Description and og:description should ideally match.',
    check: (data) => {
      if (!data.og.description) {
        return {
          ruleId: 'desc-og-match',
          ruleName: 'Description / OG Description Match',
          category: 'description',
          severity: 'info',
          message: 'No og:description set to compare.',
        };
      }
      const match = data.meta.description === data.og.description;
      return {
        ruleId: 'desc-og-match',
        ruleName: 'Description / OG Description Match',
        category: 'description',
        severity: match ? 'pass' : 'info',
        message: match
          ? 'Description and og:description match.'
          : 'Description and og:description differ.',
      };
    },
  },
];
