import { useState, useEffect, useCallback } from 'react';
import {
  Sparkles,
  FileText,
  Heading,
  MessageSquare,
  Code2,
  RefreshCw,
  Loader2,
  Download,
} from 'lucide-react';
import CopyButton from '../components/CopyButton';
import GeminiStatus from '../components/GeminiStatus';
import type {
  PageExtraction,
  GeminiAvailability,
  AiInsight,
} from '@/lib/types';
import {
  checkGeminiAvailability,
  createSession,
  promptGemini,
} from '@/lib/ai/gemini';
import { SYSTEM_PROMPTS, buildPageContext } from '@/lib/ai/prompts';

interface InsightsTabProps {
  data: PageExtraction;
}

function InsightCard({
  insight,
  onRetry,
}: {
  insight: AiInsight;
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-200">
          {insight.title}
        </span>
        <div className="flex items-center gap-1">
          {insight.content && !insight.loading && (
            <CopyButton value={insight.content} />
          )}
          {onRetry && !insight.loading && (
            <button
              onClick={onRetry}
              className="rounded p-1 text-slate-500 hover:bg-slate-700 hover:text-slate-300"
              title="Retry"
            >
              <RefreshCw size={12} />
            </button>
          )}
        </div>
      </div>
      {insight.loading ? (
        <div className="flex items-center gap-2 py-2">
          <Loader2 size={14} className="animate-spin text-indigo-400" />
          <span className="text-xs text-slate-400">Analyzing...</span>
        </div>
      ) : insight.error ? (
        <p className="text-xs text-red-400">{insight.error}</p>
      ) : (
        <p className="whitespace-pre-wrap text-xs leading-relaxed text-slate-300">
          {insight.content}
        </p>
      )}
    </div>
  );
}

function StaticInsights({ data }: { data: PageExtraction }) {
  const missingMeta: string[] = [];
  if (!data.meta.title) missingMeta.push('Title tag');
  if (!data.meta.description) missingMeta.push('Meta description');
  if (!data.meta.canonical) missingMeta.push('Canonical URL');
  if (!data.meta.viewport) missingMeta.push('Viewport');
  if (!data.meta.language) missingMeta.push('HTML lang attribute');
  if (!data.og.title) missingMeta.push('og:title');
  if (!data.og.description) missingMeta.push('og:description');
  if (!data.og.image) missingMeta.push('og:image');
  if (!data.twitter.card) missingMeta.push('twitter:card');

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-3">
        <p className="mb-2 text-xs font-semibold text-slate-200">
          Content Assessment
        </p>
        <p className="text-xs text-slate-300">
          {data.wordCount >= 300
            ? `This page has ${data.wordCount} words, which is sufficient for most content types.`
            : data.wordCount > 0
              ? `This page has only ${data.wordCount} words. Consider adding more substantive content for better search visibility.`
              : 'No text content detected on this page.'}
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Estimated reading time: {Math.ceil(data.wordCount / 200)} min
        </p>
      </div>

      {missingMeta.length > 0 && (
        <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-3">
          <p className="mb-2 text-xs font-semibold text-slate-200">
            Missing Meta Tags
          </p>
          <ul className="flex flex-col gap-1">
            {missingMeta.map((tag) => (
              <li
                key={tag}
                className="flex items-center gap-1.5 text-xs text-amber-400"
              >
                <span className="h-1 w-1 rounded-full bg-amber-400" />
                {tag}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-3">
        <p className="mb-2 text-xs font-semibold text-slate-200">
          Schema Recommendations
        </p>
        <p className="text-xs text-slate-300">
          {data.jsonLd.length > 0
            ? `Current schema types: ${data.jsonLd.map((j) => j.type).filter(Boolean).join(', ') || 'Unknown'}`
            : 'No structured data found. Consider adding:'}
        </p>
        {data.jsonLd.length === 0 && (
          <ul className="mt-1 flex flex-col gap-0.5">
            <li className="text-xs text-slate-400">
              - Article / BlogPosting for blog content
            </li>
            <li className="text-xs text-slate-400">
              - Product for product pages
            </li>
            <li className="text-xs text-slate-400">
              - Organization for homepages
            </li>
            <li className="text-xs text-slate-400">
              - BreadcrumbList for navigation
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default function InsightsTab({ data }: InsightsTabProps) {
  const [geminiStatus, setGeminiStatus] =
    useState<GeminiAvailability>('unavailable');
  const [downloadProgress, setDownloadProgress] = useState<
    number | undefined
  >();
  const [insights, setInsights] = useState<Record<string, AiInsight>>({});
  const [triggeringDownload, setTriggeringDownload] = useState(false);

  const pageContext = buildPageContext({
    title: data.meta.title,
    description: data.meta.description,
    url: data.url,
    wordCount: data.wordCount,
    headings: data.headings.map((h) => `${h.tag}: ${h.text}`),
    schemaTypes: data.jsonLd.map((j) => j.type).filter(Boolean),
  });

  useEffect(() => {
    checkGeminiAvailability().then(setGeminiStatus);
  }, []);

  const runInsight = useCallback(
    async (
      key: string,
      title: string,
      systemPrompt: string,
      userPrompt: string,
    ) => {
      setInsights((prev) => ({
        ...prev,
        [key]: { type: 'analysis', title, content: '', loading: true },
      }));

      try {
        const session = await createSession(systemPrompt, (progress) => {
          setDownloadProgress(progress);
        });
        const result = await promptGemini(session, userPrompt);
        session.destroy();
        setInsights((prev) => ({
          ...prev,
          [key]: {
            type: 'analysis',
            title,
            content: result,
            loading: false,
          },
        }));
      } catch (err) {
        setInsights((prev) => ({
          ...prev,
          [key]: {
            type: 'analysis',
            title,
            content: '',
            loading: false,
            error: err instanceof Error ? err.message : 'Analysis failed',
          },
        }));
      }
    },
    [],
  );

  // Auto-run initial analyses when Gemini is available
  useEffect(() => {
    if (geminiStatus !== 'available') return;

    runInsight(
      'classification',
      'Page Classification',
      SYSTEM_PROMPTS.classifier,
      pageContext,
    );
    runInsight(
      'metaAssessment',
      'Meta Description Assessment',
      SYSTEM_PROMPTS.contentAnalysis,
      `Evaluate this page's meta description quality:\n${pageContext}`,
    );
    runInsight(
      'contentQuality',
      'Content Quality',
      SYSTEM_PROMPTS.contentAnalysis,
      pageContext,
    );
  }, [geminiStatus, pageContext, runInsight]);

  // Trigger model download -- calling createSession when downloadable will start the download
  const handleTriggerDownload = async () => {
    setTriggeringDownload(true);
    setGeminiStatus('downloading');
    try {
      const session = await createSession(
        'You are a helpful assistant.',
        (progress) => {
          setDownloadProgress(progress);
        },
      );
      session.destroy();
      setGeminiStatus('available');
    } catch (err) {
      console.error('Failed to download model:', err);
      setGeminiStatus('downloadable');
    } finally {
      setTriggeringDownload(false);
    }
  };

  const isAiReady = geminiStatus === 'available';

  return (
    <div className="pb-4">
      {/* Gemini Status */}
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2.5">
        <GeminiStatus
          status={geminiStatus}
          downloadProgress={downloadProgress}
        />
        <Sparkles size={14} className="text-indigo-400" />
      </div>

      {/* Unavailable -- show setup instructions */}
      {geminiStatus === 'unavailable' && (
        <div className="px-4 py-4">
          <div className="mb-4 rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <p className="mb-3 text-sm font-semibold text-slate-200">
              AI Insights require Chrome's built-in Gemini Nano model
            </p>
            <div className="flex flex-col gap-1.5 text-xs text-slate-400">
              <p>To enable:</p>
              <p>1. Update to Chrome 138 or later</p>
              <p>
                2. Go to{' '}
                <code className="rounded bg-slate-700 px-1 text-indigo-400">
                  chrome://flags/#prompt-api-for-gemini-nano
                </code>
              </p>
              <p>3. Set to "Enabled"</p>
              <p>
                4. Go to{' '}
                <code className="rounded bg-slate-700 px-1 text-indigo-400">
                  chrome://flags/#optimization-guide-on-device-model
                </code>
              </p>
              <p>5. Set to "Enabled BypassPerfRequirement"</p>
              <p>6. Restart Chrome</p>
              <p className="mt-2 text-slate-500">
                The model will download automatically (~2.4 GB) when first used.
              </p>
            </div>
          </div>

          <p className="mb-3 text-[10px] font-medium uppercase tracking-wide text-slate-500">
            Static Analysis
          </p>
          <StaticInsights data={data} />
        </div>
      )}

      {/* Downloadable -- show download trigger button */}
      {geminiStatus === 'downloadable' && (
        <div className="px-4 py-4">
          <div className="mb-4 rounded-lg border border-indigo-400/20 bg-indigo-400/5 p-4">
            <p className="mb-2 text-sm font-semibold text-slate-200">
              Gemini Nano is available on your device
            </p>
            <p className="mb-3 text-xs text-slate-400">
              The AI model needs to be downloaded once (~2.4 GB). After that, all
              analysis runs locally on your device — no data leaves your browser.
            </p>
            <button
              onClick={handleTriggerDownload}
              disabled={triggeringDownload}
              className="inline-flex items-center gap-1.5 rounded-md bg-indigo-500 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-indigo-600 disabled:opacity-50"
            >
              <Download size={14} />
              Download & Activate AI
            </button>
          </div>

          <p className="mb-3 text-[10px] font-medium uppercase tracking-wide text-slate-500">
            Static Analysis
          </p>
          <StaticInsights data={data} />
        </div>
      )}

      {/* Downloading -- show progress */}
      {geminiStatus === 'downloading' && (
        <div className="px-4 py-4">
          <div className="mb-4 rounded-lg border border-amber-400/20 bg-amber-400/5 p-4">
            <p className="mb-2 text-sm font-semibold text-slate-200">
              Downloading Gemini Nano model...
            </p>
            {downloadProgress !== undefined && (
              <div className="mb-2">
                <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                  <div
                    className="h-full rounded-full bg-amber-400 transition-all duration-300"
                    style={{ width: `${Math.round(downloadProgress * 100)}%` }}
                  />
                </div>
                <p className="mt-1 text-right text-[10px] text-slate-500">
                  {Math.round(downloadProgress * 100)}%
                </p>
              </div>
            )}
            <p className="text-xs text-slate-400">
              This is a one-time download. AI features will activate
              automatically when complete.
            </p>
          </div>

          <p className="mb-3 text-[10px] font-medium uppercase tracking-wide text-slate-500">
            Static Analysis
          </p>
          <StaticInsights data={data} />
        </div>
      )}

      {/* Available -- show AI features */}
      {isAiReady && (
        <div className="px-4 py-3">
          {/* Auto-run insights */}
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wide text-slate-500">
            AI Analysis
          </p>
          <div className="mb-4 flex flex-col gap-2">
            {insights.classification && (
              <InsightCard
                insight={insights.classification}
                onRetry={() =>
                  runInsight(
                    'classification',
                    'Page Classification',
                    SYSTEM_PROMPTS.classifier,
                    pageContext,
                  )
                }
              />
            )}
            {insights.metaAssessment && (
              <InsightCard
                insight={insights.metaAssessment}
                onRetry={() =>
                  runInsight(
                    'metaAssessment',
                    'Meta Description Assessment',
                    SYSTEM_PROMPTS.contentAnalysis,
                    `Evaluate this page's meta description quality:\n${pageContext}`,
                  )
                }
              />
            )}
            {insights.contentQuality && (
              <InsightCard
                insight={insights.contentQuality}
                onRetry={() =>
                  runInsight(
                    'contentQuality',
                    'Content Quality',
                    SYSTEM_PROMPTS.contentAnalysis,
                    pageContext,
                  )
                }
              />
            )}
          </div>

          {/* On-demand actions */}
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wide text-slate-500">
            On-Demand Actions
          </p>
          <div className="mb-4 grid grid-cols-2 gap-2">
            <button
              onClick={() =>
                runInsight(
                  'rewriteDesc',
                  'Rewrite Meta Description',
                  SYSTEM_PROMPTS.metaDescription,
                  pageContext,
                )
              }
              disabled={insights.rewriteDesc?.loading}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-xs text-slate-300 transition-colors hover:border-indigo-400/30 hover:bg-slate-700 disabled:opacity-50"
            >
              <FileText size={14} className="text-indigo-400" />
              Rewrite Description
            </button>
            <button
              onClick={() =>
                runInsight(
                  'improveTitle',
                  'Improve Title',
                  SYSTEM_PROMPTS.titleImprover,
                  pageContext,
                )
              }
              disabled={insights.improveTitle?.loading}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-xs text-slate-300 transition-colors hover:border-indigo-400/30 hover:bg-slate-700 disabled:opacity-50"
            >
              <Heading size={14} className="text-indigo-400" />
              Improve Title
            </button>
            <button
              onClick={() =>
                runInsight(
                  'suggestFaq',
                  'Suggest FAQ Schema',
                  SYSTEM_PROMPTS.faqGenerator,
                  pageContext,
                )
              }
              disabled={insights.suggestFaq?.loading}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-xs text-slate-300 transition-colors hover:border-indigo-400/30 hover:bg-slate-700 disabled:opacity-50"
            >
              <MessageSquare size={14} className="text-indigo-400" />
              Suggest FAQ
            </button>
            <button
              onClick={() =>
                runInsight(
                  'recommendSchema',
                  'Recommend Schema Types',
                  SYSTEM_PROMPTS.schemaRecommendation,
                  pageContext,
                )
              }
              disabled={insights.recommendSchema?.loading}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-xs text-slate-300 transition-colors hover:border-indigo-400/30 hover:bg-slate-700 disabled:opacity-50"
            >
              <Code2 size={14} className="text-indigo-400" />
              Schema Types
            </button>
          </div>

          {/* On-demand results */}
          <div className="flex flex-col gap-2">
            {insights.rewriteDesc && (
              <InsightCard
                insight={insights.rewriteDesc}
                onRetry={() =>
                  runInsight(
                    'rewriteDesc',
                    'Rewrite Meta Description',
                    SYSTEM_PROMPTS.metaDescription,
                    pageContext,
                  )
                }
              />
            )}
            {insights.improveTitle && (
              <InsightCard
                insight={insights.improveTitle}
                onRetry={() =>
                  runInsight(
                    'improveTitle',
                    'Improve Title',
                    SYSTEM_PROMPTS.titleImprover,
                    pageContext,
                  )
                }
              />
            )}
            {insights.suggestFaq && (
              <InsightCard
                insight={insights.suggestFaq}
                onRetry={() =>
                  runInsight(
                    'suggestFaq',
                    'Suggest FAQ Schema',
                    SYSTEM_PROMPTS.faqGenerator,
                    pageContext,
                  )
                }
              />
            )}
            {insights.recommendSchema && (
              <InsightCard
                insight={insights.recommendSchema}
                onRetry={() =>
                  runInsight(
                    'recommendSchema',
                    'Recommend Schema Types',
                    SYSTEM_PROMPTS.schemaRecommendation,
                    pageContext,
                  )
                }
              />
            )}
          </div>

          {/* Static fallback section */}
          <div className="mt-4">
            <p className="mb-2 text-[10px] font-medium uppercase tracking-wide text-slate-500">
              Quick Reference
            </p>
            <StaticInsights data={data} />
          </div>
        </div>
      )}
    </div>
  );
}
