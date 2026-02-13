import ScoreGauge from '../components/ScoreGauge';
import AuditItem from '../components/AuditItem';
import PixelesqCTA from '../components/PixelesqCTA';
import type { AuditReport, AuditCategory, Severity } from '@/lib/types';

interface AuditTabProps {
  report: AuditReport;
}

const CATEGORY_LABELS: Record<AuditCategory, string> = {
  title: 'Title',
  description: 'Description',
  headings: 'Headings',
  images: 'Images',
  links: 'Links',
  technical: 'Technical',
  'structured-data': 'Structured Data',
  social: 'Social',
  content: 'Content',
  performance: 'Performance',
};

function getCategoryColor(score: number): string {
  if (score >= 90) return 'bg-green-400';
  if (score >= 70) return 'bg-amber-400';
  if (score >= 50) return 'bg-orange-400';
  return 'bg-red-400';
}

const SEVERITY_ORDER: Record<Severity, number> = {
  critical: 0,
  warning: 1,
  info: 2,
  pass: 3,
};

export default function AuditTab({ report }: AuditTabProps) {
  const hasIssues = report.results.some(
    (r) => r.severity === 'critical' || r.severity === 'warning',
  );

  // Group by category
  const grouped: Record<string, typeof report.results> = {};
  for (const result of report.results) {
    if (!grouped[result.category]) {
      grouped[result.category] = [];
    }
    grouped[result.category].push(result);
  }

  // Sort results within each category by severity
  for (const key of Object.keys(grouped)) {
    grouped[key].sort(
      (a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity],
    );
  }

  return (
    <div className="pb-4">
      {/* Score */}
      <div className="relative flex flex-col items-center gap-4 border-b border-slate-800 px-4 py-6">
        <ScoreGauge score={report.score} />
        <p className="text-xs text-slate-400">
          {report.score >= 90
            ? 'Excellent SEO health'
            : report.score >= 70
              ? 'Good, but room for improvement'
              : report.score >= 50
                ? 'Needs attention'
                : 'Significant issues found'}
        </p>
      </div>

      {/* Category breakdown */}
      <div className="border-b border-slate-800 px-4 py-3">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-wide text-slate-500">
          Category Scores
        </p>
        <div className="flex flex-col gap-1.5">
          {(
            Object.entries(report.categoryScores) as [AuditCategory, number][]
          ).map(([category, score]) => (
            <div key={category} className="flex items-center gap-2">
              <span className="w-24 text-[11px] text-slate-400">
                {CATEGORY_LABELS[category]}
              </span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-700">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${getCategoryColor(score)}`}
                  style={{ width: `${score}%` }}
                />
              </div>
              <span className="w-8 text-right text-[10px] font-medium text-slate-400">
                {score}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Results grouped by category */}
      <div className="px-3 py-3">
        {(Object.keys(CATEGORY_LABELS) as AuditCategory[]).map((category) => {
          const results = grouped[category];
          if (!results || results.length === 0) return null;

          return (
            <div key={category} className="mb-4">
              <p className="mb-1.5 text-[11px] font-semibold text-slate-300">
                {CATEGORY_LABELS[category]}
              </p>
              <div className="flex flex-col gap-1.5">
                {results.map((result) => (
                  <AuditItem key={result.ruleId} result={result} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <PixelesqCTA hasIssues={hasIssues} />
    </div>
  );
}
