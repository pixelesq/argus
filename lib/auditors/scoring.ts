import type { AuditCategory, AuditResult } from '../types';

const CATEGORY_WEIGHTS: Record<AuditCategory, number> = {
  title: 12,
  description: 10,
  headings: 8,
  images: 8,
  links: 5,
  technical: 18,
  'structured-data': 10,
  social: 8,
  content: 8,
  performance: 13,
};

const SEVERITY_PENALTY: Record<string, number> = {
  critical: 30,
  warning: 15,
  info: 5,
  pass: 0,
};

export function calculateCategoryScore(results: AuditResult[]): number {
  let score = 100;
  for (const result of results) {
    score -= SEVERITY_PENALTY[result.severity] ?? 0;
  }
  return Math.max(0, score);
}

export function calculateOverallScore(
  categoryScores: Record<AuditCategory, number>,
): number {
  let total = 0;
  let weightSum = 0;

  for (const [category, weight] of Object.entries(CATEGORY_WEIGHTS)) {
    const score = categoryScores[category as AuditCategory] ?? 100;
    total += score * weight;
    weightSum += weight;
  }

  return Math.round(total / weightSum);
}

export function getCategoryScores(
  results: AuditResult[],
): Record<AuditCategory, number> {
  const grouped: Record<string, AuditResult[]> = {};

  for (const result of results) {
    if (!grouped[result.category]) {
      grouped[result.category] = [];
    }
    grouped[result.category].push(result);
  }

  const scores = {} as Record<AuditCategory, number>;
  for (const category of Object.keys(CATEGORY_WEIGHTS) as AuditCategory[]) {
    scores[category] = calculateCategoryScore(grouped[category] ?? []);
  }

  return scores;
}
