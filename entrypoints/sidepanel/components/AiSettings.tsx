import { useState, useEffect } from 'react';
import { X, Check, Loader2, ExternalLink, Trash2 } from 'lucide-react';
import { getAiSettings, saveAiSettings, clearAiSettings, validateClaudeKey } from '@/lib/ai/settings';

interface AiSettingsProps {
  onClose: () => void;
  onSaved: () => void;
}

export default function AiSettings({ onClose, onSaved }: AiSettingsProps) {
  const [apiKey, setApiKey] = useState('');
  const [existingKey, setExistingKey] = useState(false);
  const [validating, setValidating] = useState(false);
  const [status, setStatus] = useState<'idle' | 'valid' | 'invalid' | 'saved'>('idle');

  useEffect(() => {
    getAiSettings().then((settings) => {
      if (settings.claudeApiKey) {
        setApiKey(settings.claudeApiKey);
        setExistingKey(true);
      }
    });
  }, []);

  const handleValidateAndSave = async () => {
    if (!apiKey.trim()) return;
    setValidating(true);
    setStatus('idle');

    const valid = await validateClaudeKey(apiKey.trim());
    if (valid) {
      await saveAiSettings({ claudeApiKey: apiKey.trim() });
      setStatus('saved');
      setExistingKey(true);
      onSaved();
    } else {
      setStatus('invalid');
    }
    setValidating(false);
  };

  const handleRemove = async () => {
    await clearAiSettings();
    setApiKey('');
    setExistingKey(false);
    setStatus('idle');
    onSaved();
  };

  const maskedKey = existingKey && apiKey
    ? `${apiKey.slice(0, 10)}${'•'.repeat(20)}${apiKey.slice(-4)}`
    : '';

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-16">
      <div className="mx-4 w-full max-w-sm rounded-lg border border-slate-700 bg-slate-800 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-700 px-4 py-3">
          <span className="text-sm font-semibold text-slate-100">AI Settings</span>
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 px-4 py-4">
          {/* Provider hierarchy explanation */}
          <div className="rounded-md border border-slate-700 bg-slate-900/50 p-3">
            <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wide text-slate-500">
              AI Provider Priority
            </p>
            <div className="flex flex-col gap-1 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500/20 text-[9px] font-bold text-indigo-400">1</span>
                <span>Claude Opus 4.6 <span className="text-slate-500">(cloud — BYOK)</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500/20 text-[9px] font-bold text-blue-400">2</span>
                <span>Gemini Nano <span className="text-slate-500">(on-device)</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-600/40 text-[9px] font-bold text-slate-400">3</span>
                <span>Static analysis <span className="text-slate-500">(always available)</span></span>
              </div>
            </div>
          </div>

          {/* API Key input */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-300">
              Claude API Key
            </label>
            {existingKey && status !== 'saved' ? (
              <div className="flex items-center gap-2">
                <div className="flex-1 rounded-md border border-slate-600 bg-slate-900 px-3 py-2 font-mono text-xs text-slate-400">
                  {maskedKey}
                </div>
                <button
                  onClick={handleRemove}
                  className="rounded-md border border-red-500/30 p-2 text-red-400 hover:bg-red-500/10"
                  title="Remove key"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ) : (
              <input
                type="password"
                value={existingKey ? '' : apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setStatus('idle');
                  setExistingKey(false);
                }}
                placeholder="sk-ant-..."
                className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 font-mono text-xs text-slate-200 placeholder:text-slate-600 focus:border-indigo-400 focus:outline-none"
              />
            )}
            <p className="mt-1 text-[10px] text-slate-500">
              Your key is stored locally and never sent anywhere except Anthropic's API.
            </p>
          </div>

          {/* Status messages */}
          {status === 'invalid' && (
            <p className="text-xs text-red-400">Invalid API key. Please check and try again.</p>
          )}
          {status === 'saved' && (
            <p className="flex items-center gap-1 text-xs text-green-400">
              <Check size={12} /> Key saved. Claude Opus 4.6 is now active.
            </p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2">
            {!existingKey && (
              <button
                onClick={handleValidateAndSave}
                disabled={!apiKey.trim() || validating}
                className="flex items-center gap-1.5 rounded-md bg-indigo-500 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-indigo-600 disabled:opacity-50"
              >
                {validating ? (
                  <>
                    <Loader2 size={12} className="animate-spin" /> Validating...
                  </>
                ) : (
                  <>
                    <Check size={12} /> Save & Activate
                  </>
                )}
              </button>
            )}
            <a
              href="https://console.anthropic.com/settings/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300"
            >
              Get API key <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
