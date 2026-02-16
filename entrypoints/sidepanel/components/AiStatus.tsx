import type { AiProvider, GeminiAvailability } from '@/lib/types';

interface AiStatusProps {
  provider: AiProvider;
  geminiStatus: GeminiAvailability;
  downloadProgress?: number;
}

export default function AiStatus({
  provider,
  geminiStatus,
  downloadProgress,
}: AiStatusProps) {
  if (provider === 'claude') {
    return (
      <div className="flex items-center gap-1.5">
        <span className="inline-block h-2 w-2 rounded-full bg-indigo-400" />
        <span className="text-[10px] font-medium text-indigo-400">
          Claude Opus 4.6
        </span>
      </div>
    );
  }

  if (provider === 'gemini') {
    return (
      <div className="flex items-center gap-1.5">
        <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
        <span className="text-[10px] font-medium text-green-400">
          Gemini Nano (on-device)
        </span>
      </div>
    );
  }

  // Static / unavailable states
  if (geminiStatus === 'downloadable') {
    return (
      <div className="flex items-center gap-1.5">
        <span className="inline-block h-2 w-2 rounded-full bg-blue-400" />
        <span className="text-[10px] font-medium text-blue-400">
          Gemini available (not downloaded)
        </span>
      </div>
    );
  }

  if (geminiStatus === 'downloading') {
    return (
      <div className="flex items-center gap-1.5">
        <span className="inline-block h-2 w-2 rounded-full animate-pulse bg-amber-400" />
        <span className="text-[10px] font-medium text-amber-400">
          {downloadProgress !== undefined
            ? `Downloading... ${Math.round(downloadProgress * 100)}%`
            : 'Downloading model...'}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      <span className="inline-block h-2 w-2 rounded-full bg-slate-500" />
      <span className="text-[10px] font-medium text-slate-500">
        Static analysis only
      </span>
    </div>
  );
}
