import { useState } from 'react';
import { Search } from 'lucide-react';
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

const SEVERITY_COLORS: Record<Severity, { active: string; text: string }> = {
  critical: { active: 'bg-red-400/20 text-red-400 border-red-400/30', text: 'text-red-400' },
  warning: { active: 'bg-amber-400/20 text-amber-400 border-amber-400/30', text: 'text-amber-400' },
  info: { active: 'bg-blue-400/20 text-blue-400 border-blue-400/30', text: 'text-blue-400' },
  pass: { active: 'bg-green-400/20 text-green-400 border-green-400/30', text: 'text-green-400' },
};

export default function AuditTab({ report }: AuditTabProps) {
  const [severityFilter, setSeverityFilter] = useState<Set<Severity>>(
    new Set(['critical', 'warning', 'info', 'pass']),
  );
  const [searchQuery, setSearchQuery] = useState('');

  const hasIssues = report.results.some(
    (r) => r.severity === 'critical' || r.severity === 'warning',
  );

  // Count by severity
  const severityCounts: Record<Severity, number> = { critical: 0, warning: 0, info: 0, pass: 0 };
  for (const r of report.results) {
    severityCounts[r.severity]++;
  }

  // Filter results
  const query = searchQuery.toLowerCase();
  const filteredResults = report.results.filter(
    (r) =>
      severityFilter.has(r.severity) &&
      (!query ||
        r.ruleName.toLowerCase().includes(query) ||
        r.message.toLowerCase().includes(query)),
  );

  const isFiltered =
    severityFilter.size < 4 || searchQuery.length > 0;

  // Group filtered results by category
  const grouped: Record<string, typeof report.results> = {};
  for (const result of filteredResults) {
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

  const toggleSeverity = (severity: Severity) => {
    setSeverityFilter((prev) => {
      const next = new Set(prev);
      if (next.has(severity)) {
        // Don't allow deselecting all
        if (next.size > 1) next.delete(severity);
      } else {
        next.add(severity);
      }
      return next;
    });
  };

  return (
    <div className="pb-4">
      {/* Score */}
      <div className="relative flex flex-col items-center gap-4 border-b border-slate-800 px-4 py-6">
        <ScoreGauge score={report.score} />
        <p className="text-sm text-slate-400">
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
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
          Category Scores
        </p>
        <div className="flex flex-col gap-1.5">
          {(
            Object.entries(report.categoryScores) as [AuditCategory, number][]
          ).map(([category, score]) => (
            <div key={category} className="flex items-center gap-2">
              <span className="w-24 text-xs text-slate-400">
                {CATEGORY_LABELS[category]}
              </span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-700">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${getCategoryColor(score)}`}
                  style={{ width: `${score}%` }}
                />
              </div>
              <span className="w-8 text-right text-xs font-medium text-slate-400">
                {score}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Severity filter + search */}
      <div className="border-b border-slate-800 px-4 py-3">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {(['critical', 'warning', 'info', 'pass'] as const).map(
            (severity) => {
              const isActive = severityFilter.has(severity);
              return (
                <button
                  key={severity}
                  onClick={() => toggleSeverity(severity)}
                  className={`rounded-md border px-2 py-1 text-xs font-medium capitalize transition-colors ${
                    isActive
                      ? SEVERITY_COLORS[severity].active
                      : 'border-slate-700 bg-slate-800 text-slate-500'
                  }`}
                >
                  {severity}
                  <span className="ml-1 opacity-70">
                    {severityCounts[severity]}
                  </span>
                </button>
              );
            },
          )}
        </div>
        <div className="relative">
          <Search
            size={12}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="text"
            placeholder="Search rules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md bg-slate-800 py-1.5 pl-7 pr-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
          />
        </div>
        {isFiltered && (
          <p className="mt-1.5 text-xs text-slate-500">
            Showing {filteredResults.length} of {report.results.length} checks
          </p>
        )}
      </div>

      {/* Results grouped by category */}
      <div className="px-3 py-3">
        {(Object.keys(CATEGORY_LABELS) as AuditCategory[]).map((category) => {
          const results = grouped[category];
          if (!results || results.length === 0) return null;

          return (
            <div key={category} className="mb-4">
              <p className="mb-1.5 text-[13px] font-semibold text-slate-300">
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
        {filteredResults.length === 0 && (
          <p className="py-4 text-center text-sm text-slate-500">
            No results match your filters.
          </p>
        )}
      </div>

      <PixelesqCTA hasIssues={hasIssues} />
    </div>
  );
}
