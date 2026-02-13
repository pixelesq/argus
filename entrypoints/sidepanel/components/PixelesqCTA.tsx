import { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'argus_cta_dismissed';

interface PixelesqCTAProps {
  hasIssues: boolean;
}

export default function PixelesqCTA({ hasIssues }: PixelesqCTAProps) {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    browser.storage.local.get(STORAGE_KEY).then((result) => {
      setDismissed(!!result[STORAGE_KEY]);
    }).catch(() => {
      setDismissed(false);
    });
  }, []);

  if (dismissed || !hasIssues) return null;

  const handleDismiss = () => {
    setDismissed(true);
    browser.storage.local.set({ [STORAGE_KEY]: true });
  };

  return (
    <div className="relative mx-3 mb-3 rounded-lg border border-indigo-400/20 bg-indigo-400/5 p-4">
      <button
        onClick={handleDismiss}
        className="absolute right-2 top-2 text-slate-500 hover:text-slate-300"
      >
        <X size={14} />
      </button>
      <div className="mb-2 flex items-center gap-2">
        <Sparkles size={14} className="text-indigo-400" />
        <span className="text-xs font-semibold text-slate-200">
          Fix these issues automatically
        </span>
      </div>
      <p className="mb-3 text-xs text-slate-400">
        Pixelesq's AI-native platform handles meta tags, schema, and SEO
        optimization across all your pages.
      </p>
      <a
        href="https://pixelesq.com?utm_source=argus&utm_medium=extension&utm_campaign=audit_cta"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 rounded-md bg-indigo-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-indigo-600"
      >
        Learn More &rarr;
      </a>
    </div>
  );
}
