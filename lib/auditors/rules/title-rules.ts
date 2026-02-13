import type { AuditRule } from '../../types';

export const titleRules: AuditRule[] = [
  {
    id: 'title-exists',
    category: 'title',
    name: 'Title Tag Exists',
    description: 'Page must have a title tag.',
    check: (data) => ({
      ruleId: 'title-exists',
      ruleName: 'Title Tag Exists',
      category: 'title',
      severity: data.meta.title ? 'pass' : 'critical',
      message: data.meta.title
        ? `Title tag found: "${data.meta.title}"`
        : 'No title tag found. Every page must have a unique title tag.',
    }),
  },
  {
    id: 'title-length',
    category: 'title',
    name: 'Title Length',
    description: 'Title should be between 30 and 60 characters.',
    check: (data) => {
      const len = data.meta.titleLength;
      if (!data.meta.title) {
        return {
          ruleId: 'title-length',
          ruleName: 'Title Length',
          category: 'title',
          severity: 'critical',
          message: 'No title to evaluate.',
        };
      }
      const inRange = len >= 30 && len <= 60;
      return {
        ruleId: 'title-length',
        ruleName: 'Title Length',
        category: 'title',
        severity: inRange ? 'pass' : 'warning',
        message: inRange
          ? `Title length is ${len} characters (optimal range).`
          : `Title length is ${len} characters. Recommended: 30-60 characters.`,
        details: !inRange
          ? len < 30
            ? 'Your title is too short. Consider adding more descriptive keywords.'
            : 'Your title may be truncated in search results. Consider shortening it.'
          : undefined,
      };
    },
  },
  {
    id: 'title-og-match',
    category: 'title',
    name: 'Title / OG Title Match',
    description: 'Title and og:title should ideally match.',
    check: (data) => {
      if (!data.og.title) {
        return {
          ruleId: 'title-og-match',
          ruleName: 'Title / OG Title Match',
          category: 'title',
          severity: 'info',
          message: 'No og:title set to compare with title tag.',
        };
      }
      const match = data.meta.title === data.og.title;
      return {
        ruleId: 'title-og-match',
        ruleName: 'Title / OG Title Match',
        category: 'title',
        severity: match ? 'pass' : 'info',
        message: match
          ? 'Title and og:title match.'
          : 'Title and og:title differ. This may be intentional for social sharing.',
        details: !match
          ? `Title: "${data.meta.title}"\nog:title: "${data.og.title}"`
          : undefined,
      };
    },
  },
];
