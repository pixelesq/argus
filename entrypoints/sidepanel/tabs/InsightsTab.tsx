import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Sparkles,
  FileText,
  Heading,
  MessageSquare,
  Code2,
  RefreshCw,
  Loader2,
  Download,
  Settings,
  Zap,
  Layout,
  AlertTriangle,
  BookOpen,
} from 'lucide-react';
import CopyButton from '../components/CopyButton';
import AiStatus from '../components/AiStatus';
import AiSettings from '../components/AiSettings';
import type {
  PageExtraction,
  AuditReport,
  GeminiAvailability,
  AiInsight,
  AiProvider,
} from '@/lib/types';
import { checkGeminiAvailability, createSession } from '@/lib/ai/gemini';
import { getAiSettings } from '@/lib/ai/settings';
import { runPrompt } from '@/lib/ai/provider';
import {
  SYSTEM_PROMPTS,
  OPUS_PROMPTS,
  buildPageContext,
  buildFullPageContext,
  buildAuditContext,
} from '@/lib/ai/prompts';

interface InsightsTabProps {
  data: PageExtraction;
  auditReport?: AuditReport | null;
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
          <span className="text-xs text-slate-400">Analyzing with AI...</span>
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

export default function InsightsTab({ data, auditReport }: InsightsTabProps) {
  const [activeProvider, setActiveProvider] = useState<AiProvider>('static');
  const [geminiStatus, setGeminiStatus] =
    useState<GeminiAvailability>('unavailable');
  const [downloadProgress, setDownloadProgress] = useState<
    number | undefined
  >();
  const [insights, setInsights] = useState<Record<string, AiInsight>>({});
  const [triggeringDownload, setTriggeringDownload] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Detect available providers on mount
  const detectProviders = useCallback(async () => {
    const settings = await getAiSettings();
    const gStatus = await checkGeminiAvailability();
    setGeminiStatus(gStatus);

    if (settings.claudeApiKey) {
      setActiveProvider('claude');
    } else if (gStatus === 'available') {
      setActiveProvider('gemini');
    } else {
      setActiveProvider('static');
    }
  }, []);

  useEffect(() => {
    detectProviders();
  }, [detectProviders]);

  const pageContext = useMemo(
    () =>
      buildPageContext({
        title: data.meta.title,
        description: data.meta.description,
        url: data.url,
        wordCount: data.wordCount,
        headings: data.headings.map((h) => `${h.tag}: ${h.text}`),
        schemaTypes: data.jsonLd.map((j) => j.type).filter(Boolean),
      }),
    [data.meta.title, data.meta.description, data.url, data.wordCount, data.headings, data.jsonLd],
  );

  const fullPageContext = useMemo(() => buildFullPageContext(data), [data]);

  const auditContext = useMemo(
    () => (auditReport ? buildAuditContext(auditReport) : ''),
    [auditReport],
  );

  const isAiReady = activeProvider === 'claude' || activeProvider === 'gemini';
  const isClaude = activeProvider === 'claude';

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
        const result = await runPrompt(systemPrompt, userPrompt);
        setInsights((prev) => ({
          ...prev,
          [key]: { type: 'analysis', title, content: result, loading: false },
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

  // Auto-run initial analyses when AI is available
  useEffect(() => {
    if (!isAiReady) return;

    // Use full context for Claude, basic for Gemini
    const context = isClaude ? fullPageContext : pageContext;

    runInsight(
      'classification',
      'Page Classification',
      SYSTEM_PROMPTS.classifier,
      context,
    );
    runInsight(
      'contentQuality',
      'Content Quality',
      SYSTEM_PROMPTS.contentAnalysis,
      context,
    );

    // Claude-only: auto-run the strategy brief
    if (isClaude) {
      runInsight(
        'strategyBrief',
        'SEO Strategy Brief',
        OPUS_PROMPTS.seoStrategyBrief,
        fullPageContext + (auditContext ? `\n\n=== AUDIT RESULTS ===\n${auditContext}` : ''),
      );
    } else {
      runInsight(
        'metaAssessment',
        'Meta Description Assessment',
        SYSTEM_PROMPTS.contentAnalysis,
        `Evaluate this page's meta description quality:\n${context}`,
      );
    }
  }, [isAiReady, isClaude, fullPageContext, pageContext, auditContext, runInsight]);

  // Trigger Gemini model download
  const handleTriggerDownload = async () => {
    setTriggeringDownload(true);
    setGeminiStatus('downloading');
    try {
      const session = await createSession(
        'You are a helpful assistant.',
        (progress) => setDownloadProgress(progress),
      );
      session.destroy();
      setGeminiStatus('available');
      setActiveProvider('gemini');
    } catch {
      setGeminiStatus('downloadable');
    } finally {
      setTriggeringDownload(false);
    }
  };

  return (
    <div className="pb-4">
      {/* Settings modal */}
      {showSettings && (
        <AiSettings
          onClose={() => setShowSettings(false)}
          onSaved={() => {
            detectProviders();
            setInsights({});
          }}
        />
      )}

      {/* Status bar */}
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2.5">
        <AiStatus
          provider={activeProvider}
          geminiStatus={geminiStatus}
          downloadProgress={downloadProgress}
        />
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowSettings(true)}
            className="rounded p-1 text-slate-500 transition-colors hover:bg-slate-800 hover:text-slate-300"
            title="AI Settings"
          >
            <Settings size={14} />
          </button>
          <Sparkles size={14} className="text-indigo-400" />
        </div>
      </div>

      {/* No AI available — show setup options */}
      {!isAiReady && (
        <div className="px-4 py-4">
          {/* Claude setup CTA */}
          <div className="mb-4 rounded-lg border border-indigo-400/20 bg-indigo-400/5 p-4">
            <p className="mb-2 text-sm font-semibold text-slate-200">
              Unlock AI-Powered SEO Insights
            </p>
            <p className="mb-3 text-xs text-slate-400">
              Add your Claude API key for deep analysis powered by Opus 4.6 — the most capable
              AI model available. Your key stays in your browser.
            </p>
            <button
              onClick={() => setShowSettings(true)}
              className="inline-flex items-center gap-1.5 rounded-md bg-indigo-500 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-indigo-600"
            >
              <Settings size={14} />
              Configure Claude API
            </button>
          </div>

          {/* Gemini download CTA */}
          {geminiStatus === 'downloadable' && (
            <div className="mb-4 rounded-lg border border-blue-400/20 bg-blue-400/5 p-4">
              <p className="mb-2 text-xs font-semibold text-slate-200">
                Or use Gemini Nano (on-device)
              </p>
              <p className="mb-3 text-xs text-slate-400">
                Download Chrome's built-in AI model (~2.4 GB). Runs locally — no API key needed.
              </p>
              <button
                onClick={handleTriggerDownload}
                disabled={triggeringDownload}
                className="inline-flex items-center gap-1.5 rounded-md border border-blue-400/30 bg-blue-500/10 px-3 py-2 text-xs font-medium text-blue-400 transition-colors hover:bg-blue-500/20 disabled:opacity-50"
              >
                <Download size={14} />
                Download Gemini Nano
              </button>
            </div>
          )}

          {/* Gemini downloading progress */}
          {geminiStatus === 'downloading' && (
            <div className="mb-4 rounded-lg border border-amber-400/20 bg-amber-400/5 p-4">
              <p className="mb-2 text-sm font-semibold text-slate-200">
                Downloading Gemini Nano...
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
            </div>
          )}

          {/* Gemini setup instructions */}
          {geminiStatus === 'unavailable' && (
            <div className="mb-4 rounded-lg border border-slate-700 bg-slate-800/50 p-3">
              <p className="mb-2 text-xs font-medium text-slate-300">
                Gemini Nano setup (optional)
              </p>
              <div className="flex flex-col gap-1 text-[10px] text-slate-500">
                <p>1. Update to Chrome 138+</p>
                <p>2. Enable <code className="rounded bg-slate-700 px-1 text-indigo-400">chrome://flags/#prompt-api-for-gemini-nano</code></p>
                <p>3. Enable <code className="rounded bg-slate-700 px-1 text-indigo-400">chrome://flags/#optimization-guide-on-device-model</code></p>
                <p>4. Restart Chrome</p>
              </div>
            </div>
          )}

          <p className="mb-3 text-[10px] font-medium uppercase tracking-wide text-slate-500">
            Static Analysis
          </p>
          <StaticInsights data={data} />
        </div>
      )}

      {/* AI is active — show AI features */}
      {isAiReady && (
        <div className="px-4 py-3">
          {/* Auto-run insights */}
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wide text-slate-500">
            {isClaude ? 'Opus 4.6 Analysis' : 'AI Analysis'}
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
                    isClaude ? fullPageContext : pageContext,
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
                    isClaude ? fullPageContext : pageContext,
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
            {/* Claude-only: Strategy Brief */}
            {insights.strategyBrief && (
              <InsightCard
                insight={insights.strategyBrief}
                onRetry={() =>
                  runInsight(
                    'strategyBrief',
                    'SEO Strategy Brief',
                    OPUS_PROMPTS.seoStrategyBrief,
                    fullPageContext + (auditContext ? `\n\n=== AUDIT RESULTS ===\n${auditContext}` : ''),
                  )
                }
              />
            )}
          </div>

          {/* On-demand actions (shared) */}
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wide text-slate-500">
            On-Demand Actions
          </p>
          <div className="mb-2 grid grid-cols-2 gap-2">
            <button
              onClick={() =>
                runInsight(
                  'rewriteDesc',
                  'Rewrite Meta Description',
                  SYSTEM_PROMPTS.metaDescription,
                  isClaude ? fullPageContext : pageContext,
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
                  isClaude ? fullPageContext : pageContext,
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
                  isClaude ? fullPageContext : pageContext,
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
                  isClaude ? fullPageContext : pageContext,
                )
              }
              disabled={insights.recommendSchema?.loading}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-xs text-slate-300 transition-colors hover:border-indigo-400/30 hover:bg-slate-700 disabled:opacity-50"
            >
              <Code2 size={14} className="text-indigo-400" />
              Schema Types
            </button>
          </div>

          {/* Claude-only: Advanced actions */}
          {isClaude && (
            <>
              <p className="mb-2 mt-3 text-[10px] font-medium uppercase tracking-wide text-indigo-400/70">
                Opus 4.6 Deep Analysis
              </p>
              <div className="mb-4 grid grid-cols-2 gap-2">
                <button
                  onClick={() =>
                    runInsight(
                      'generateSchema',
                      'Generate Schema Markup',
                      OPUS_PROMPTS.generateSchema,
                      fullPageContext,
                    )
                  }
                  disabled={insights.generateSchema?.loading}
                  className="flex items-center gap-1.5 rounded-lg border border-indigo-400/20 bg-indigo-400/5 p-2.5 text-xs text-indigo-300 transition-colors hover:border-indigo-400/40 hover:bg-indigo-400/10 disabled:opacity-50"
                >
                  <Zap size={14} className="text-indigo-400" />
                  Generate Schema
                </button>
                <button
                  onClick={() =>
                    runInsight(
                      'technicalFix',
                      'Technical Fixes',
                      OPUS_PROMPTS.technicalFix,
                      fullPageContext + (auditContext ? `\n\n=== AUDIT ISSUES ===\n${auditContext}` : ''),
                    )
                  }
                  disabled={insights.technicalFix?.loading}
                  className="flex items-center gap-1.5 rounded-lg border border-indigo-400/20 bg-indigo-400/5 p-2.5 text-xs text-indigo-300 transition-colors hover:border-indigo-400/40 hover:bg-indigo-400/10 disabled:opacity-50"
                >
                  <AlertTriangle size={14} className="text-indigo-400" />
                  Technical Fixes
                </button>
                <button
                  onClick={() =>
                    runInsight(
                      'contentGaps',
                      'Content Gaps',
                      OPUS_PROMPTS.contentGaps,
                      fullPageContext,
                    )
                  }
                  disabled={insights.contentGaps?.loading}
                  className="flex items-center gap-1.5 rounded-lg border border-indigo-400/20 bg-indigo-400/5 p-2.5 text-xs text-indigo-300 transition-colors hover:border-indigo-400/40 hover:bg-indigo-400/10 disabled:opacity-50"
                >
                  <Layout size={14} className="text-indigo-400" />
                  Content Gaps
                </button>
                <button
                  onClick={() =>
                    runInsight(
                      'competitorInsights',
                      'Competitor Insights',
                      OPUS_PROMPTS.competitorInsights,
                      fullPageContext,
                    )
                  }
                  disabled={insights.competitorInsights?.loading}
                  className="flex items-center gap-1.5 rounded-lg border border-indigo-400/20 bg-indigo-400/5 p-2.5 text-xs text-indigo-300 transition-colors hover:border-indigo-400/40 hover:bg-indigo-400/10 disabled:opacity-50"
                >
                  <BookOpen size={14} className="text-indigo-400" />
                  Competitor Insights
                </button>
              </div>
            </>
          )}

          {/* On-demand results */}
          <div className="flex flex-col gap-2">
            {insights.rewriteDesc && (
              <InsightCard insight={insights.rewriteDesc} />
            )}
            {insights.improveTitle && (
              <InsightCard insight={insights.improveTitle} />
            )}
            {insights.suggestFaq && (
              <InsightCard insight={insights.suggestFaq} />
            )}
            {insights.recommendSchema && (
              <InsightCard insight={insights.recommendSchema} />
            )}
            {insights.generateSchema && (
              <InsightCard insight={insights.generateSchema} />
            )}
            {insights.technicalFix && (
              <InsightCard insight={insights.technicalFix} />
            )}
            {insights.contentGaps && (
              <InsightCard insight={insights.contentGaps} />
            )}
            {insights.competitorInsights && (
              <InsightCard insight={insights.competitorInsights} />
            )}
          </div>

          {/* Static reference section */}
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
