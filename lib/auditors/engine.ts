import type { PageExtraction, AuditReport, AuditRule, WebVitals } from '../types';
import {
  getCategoryScores,
  calculateOverallScore,
} from './scoring';
import { titleRules } from './rules/title-rules';
import { descriptionRules } from './rules/description-rules';
import { headingRules } from './rules/heading-rules';
import { imageRules } from './rules/image-rules';
import { linkRules } from './rules/link-rules';
import { technicalRules } from './rules/technical-rules';
import { structuredDataRules } from './rules/structured-data-rules';
import { socialRules } from './rules/social-rules';
import { contentRules } from './rules/content-rules';
import { performanceRules } from './rules/performance-rules';

const ALL_RULES: AuditRule[] = [
  ...titleRules,
  ...descriptionRules,
  ...headingRules,
  ...imageRules,
  ...linkRules,
  ...technicalRules,
  ...structuredDataRules,
  ...socialRules,
  ...contentRules,
  ...performanceRules,
];

export function runAudit(data: PageExtraction, vitals?: WebVitals): AuditReport {
  const results = ALL_RULES.map((rule) => rule.check(data));

  // Override performance rules with actual vitals data if available
  if (vitals) {
    const perfOverrides = getPerformanceResults(vitals);
    for (const override of perfOverrides) {
      const idx = results.findIndex((r) => r.ruleId === override.ruleId);
      if (idx !== -1) {
        results[idx] = override;
      }
    }
  }

  const categoryScores = getCategoryScores(results);
  const score = calculateOverallScore(categoryScores);

  return {
    score,
    results,
    categoryScores,
    timestamp: new Date().toISOString(),
    url: data.url,
  };
}

function getPerformanceResults(vitals: WebVitals) {
  const results = [];

  if (vitals.lcp !== null) {
    const ms = vitals.lcp;
    results.push({
      ruleId: 'lcp-good',
      ruleName: 'Largest Contentful Paint',
      category: 'performance' as const,
      severity:
        ms < 2500 ? ('pass' as const) : ms < 4000 ? ('warning' as const) : ('critical' as const),
      message: `LCP: ${(ms / 1000).toFixed(2)}s ${ms < 2500 ? '(good)' : ms < 4000 ? '(needs improvement)' : '(poor)'}`,
    });
  }

  if (vitals.inp !== null) {
    const ms = vitals.inp;
    results.push({
      ruleId: 'inp-good',
      ruleName: 'Interaction to Next Paint',
      category: 'performance' as const,
      severity:
        ms < 200 ? ('pass' as const) : ms < 500 ? ('warning' as const) : ('critical' as const),
      message: `INP: ${ms}ms ${ms < 200 ? '(good)' : ms < 500 ? '(needs improvement)' : '(poor)'}`,
    });
  }

  if (vitals.cls !== null) {
    const v = vitals.cls;
    results.push({
      ruleId: 'cls-good',
      ruleName: 'Cumulative Layout Shift',
      category: 'performance' as const,
      severity:
        v < 0.1 ? ('pass' as const) : v < 0.25 ? ('warning' as const) : ('critical' as const),
      message: `CLS: ${v.toFixed(3)} ${v < 0.1 ? '(good)' : v < 0.25 ? '(needs improvement)' : '(poor)'}`,
    });
  }

  if (vitals.ttfb !== null) {
    const ms = vitals.ttfb;
    results.push({
      ruleId: 'ttfb-good',
      ruleName: 'Time to First Byte',
      category: 'performance' as const,
      severity: ms < 800 ? ('pass' as const) : ('info' as const),
      message: `TTFB: ${ms}ms ${ms < 800 ? '(good)' : '(slow)'}`,
    });
  }

  return results;
}
