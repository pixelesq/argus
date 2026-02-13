import type { GeminiAvailability } from '@/lib/types';

interface GeminiStatusProps {
  status: GeminiAvailability;
  downloadProgress?: number;
}

export default function GeminiStatus({
  status,
  downloadProgress,
}: GeminiStatusProps) {
  const config = {
    available: {
      dot: 'bg-green-400',
      text: 'AI Ready',
      textColor: 'text-green-400',
    },
    downloadable: {
      dot: 'bg-blue-400',
      text: 'AI available (model not downloaded)',
      textColor: 'text-blue-400',
    },
    downloading: {
      dot: 'bg-amber-400 animate-pulse',
      text:
        downloadProgress !== undefined
          ? `Downloading model... ${Math.round(downloadProgress * 100)}%`
          : 'Downloading model...',
      textColor: 'text-amber-400',
    },
    unavailable: {
      dot: 'bg-red-400',
      text: 'AI unavailable',
      textColor: 'text-red-400',
    },
  }[status];

  return (
    <div className="flex items-center gap-1.5">
      <span className={`inline-block h-2 w-2 rounded-full ${config.dot}`} />
      <span className={`text-[10px] font-medium ${config.textColor}`}>
        {config.text}
      </span>
    </div>
  );
}
