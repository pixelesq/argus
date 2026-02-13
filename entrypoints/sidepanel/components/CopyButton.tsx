import { useState } from 'react';
import { Clipboard, Check } from 'lucide-react';

interface CopyButtonProps {
  value: string;
  className?: string;
}

export default function CopyButton({ value, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = value;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center justify-center rounded p-1 text-slate-500 transition-colors hover:bg-slate-700 hover:text-slate-300 ${className}`}
      title="Copy to clipboard"
    >
      {copied ? (
        <Check size={12} className="text-green-400" />
      ) : (
        <Clipboard size={12} />
      )}
    </button>
  );
}
