import { CheckCircle, XCircle } from 'lucide-react';
import CopyButton from './CopyButton';
import type { JsonLdData } from '@/lib/types';

export default function JsonLdViewer({ data }: { data: JsonLdData }) {
  const formatted = data.isValid
    ? JSON.stringify(data.parsed, null, 2)
    : data.raw;

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-3">
      <div className="mb-2 flex items-center gap-2">
        {data.type && (
          <span className="rounded bg-indigo-400/20 px-2 py-0.5 text-[10px] font-medium text-indigo-400">
            {data.type}
          </span>
        )}
        {data.isValid ? (
          <span className="flex items-center gap-1 text-[10px] text-green-400">
            <CheckCircle size={10} />
            Valid
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[10px] text-red-400">
            <XCircle size={10} />
            Invalid
          </span>
        )}
        <div className="ml-auto">
          <CopyButton value={formatted} />
        </div>
      </div>
      {data.errors.length > 0 && (
        <div className="mb-2 rounded bg-red-400/10 p-2">
          {data.errors.map((err, i) => (
            <p key={i} className="text-xs text-red-400">
              {err}
            </p>
          ))}
        </div>
      )}
      <pre className="max-h-60 overflow-auto rounded bg-slate-900 p-2 text-xs leading-relaxed text-slate-300">
        {formatted}
      </pre>
    </div>
  );
}
