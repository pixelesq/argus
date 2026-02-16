import { useState } from 'react';
import {
  XCircle,
  AlertTriangle,
  Info,
  CheckCircle,
  ChevronDown,
} from 'lucide-react';
import type { AuditResult, Severity } from '@/lib/types';

const severityConfig: Record<
  Severity,
  { icon: React.ReactNode; color: string; bg: string }
> = {
  critical: {
    icon: <XCircle size={14} />,
    color: 'text-red-400',
    bg: 'bg-red-400/10',
  },
  warning: {
    icon: <AlertTriangle size={14} />,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
  },
  info: {
    icon: <Info size={14} />,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  pass: {
    icon: <CheckCircle size={14} />,
    color: 'text-green-400',
    bg: 'bg-green-400/10',
  },
};

export default function AuditItem({ result }: { result: AuditResult }) {
  const [expanded, setExpanded] = useState(false);
  const config = severityConfig[result.severity];

  return (
    <div className={`rounded-lg border border-slate-700 ${config.bg}`}>
      <button
        onClick={() => result.details && setExpanded(!expanded)}
        className="flex w-full items-start gap-2 p-2.5 text-left"
      >
        <span className={`mt-0.5 shrink-0 ${config.color}`}>
          {config.icon}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-slate-200">
            {result.ruleName}
          </p>
          <p className="mt-0.5 text-[13px] text-slate-400">{result.message}</p>
        </div>
        {result.details && (
          <ChevronDown
            size={14}
            className={`mt-0.5 shrink-0 text-slate-500 transition-transform ${expanded ? 'rotate-180' : ''}`}
          />
        )}
      </button>
      {expanded && result.details && (
        <div className="border-t border-slate-700 px-3 py-2">
          <p className="whitespace-pre-wrap text-[13px] text-slate-400">
            {result.details}
          </p>
        </div>
      )}
    </div>
  );
}
