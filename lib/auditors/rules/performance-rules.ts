import type { AuditRule } from '../../types';

export const performanceRules: AuditRule[] = [
  {
    id: 'lcp-good',
    category: 'performance',
    name: 'Largest Contentful Paint',
    description: 'LCP should be under 2.5 seconds.',
    check: (_data) => {
      // Performance metrics are evaluated separately via Web Vitals
      // This is a placeholder that will be overridden when vitals data is available
      return {
        ruleId: 'lcp-good',
        ruleName: 'Largest Contentful Paint',
        category: 'performance',
        severity: 'info',
        message: 'LCP data not available from side panel. Visit the page directly for performance metrics.',
      };
    },
  },
  {
    id: 'inp-good',
    category: 'performance',
    name: 'Interaction to Next Paint',
    description: 'INP should be under 200ms.',
    check: (_data) => ({
      ruleId: 'inp-good',
      ruleName: 'Interaction to Next Paint',
      category: 'performance',
      severity: 'info',
      message: 'INP data not available from side panel.',
    }),
  },
  {
    id: 'cls-good',
    category: 'performance',
    name: 'Cumulative Layout Shift',
    description: 'CLS should be under 0.1.',
    check: (_data) => ({
      ruleId: 'cls-good',
      ruleName: 'Cumulative Layout Shift',
      category: 'performance',
      severity: 'info',
      message: 'CLS data not available from side panel.',
    }),
  },
  {
    id: 'ttfb-good',
    category: 'performance',
    name: 'Time to First Byte',
    description: 'TTFB should be under 800ms.',
    check: (_data) => ({
      ruleId: 'ttfb-good',
      ruleName: 'Time to First Byte',
      category: 'performance',
      severity: 'info',
      message: 'TTFB data not available from side panel.',
    }),
  },
];
