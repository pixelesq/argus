import type { GeminiAvailability } from '@/lib/types';

interface GeminiStatusProps {
  status: GeminiAvailability;
}

export default function GeminiStatus({ status }: GeminiStatusProps) {
  const config = {
    available: {
      dot: 'bg-green-400',
      text: 'AI Ready',
      textColor: 'text-green-400',
    },
    downloading: {
      dot: 'bg-amber-400 animate-pulse',
      text: 'Model downloading...',
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
