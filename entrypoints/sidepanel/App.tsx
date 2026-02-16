import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Eye, Plus, Minus } from 'lucide-react';
import TabBar, { type TabId } from './components/TabBar';
import ExtractTab from './tabs/ExtractTab';
import AuditTab from './tabs/AuditTab';
import InsightsTab from './tabs/InsightsTab';
import type { PageExtraction, AuditReport, WebVitals } from '@/lib/types';
import { runAudit } from '@/lib/auditors/engine';

const ZOOM_KEY = 'argus_zoom_level';
const ZOOM_MIN = 80;
const ZOOM_MAX = 140;
const ZOOM_STEP = 10;
const ZOOM_DEFAULT = 100;

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('extract');
  const [pageData, setPageData] = useState<PageExtraction | null>(null);
  const [auditReport, setAuditReport] = useState<AuditReport | null>(null);
  const [webVitals, setWebVitals] = useState<WebVitals | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(ZOOM_DEFAULT);

  // Load saved zoom level
  useEffect(() => {
    chrome.storage.local.get(ZOOM_KEY).then((result) => {
      if (result[ZOOM_KEY]) setZoom(result[ZOOM_KEY]);
    }).catch(() => {});
  }, []);

  // Apply zoom to document root
  useEffect(() => {
    document.documentElement.style.fontSize = `${(zoom / 100) * 13}px`;
    chrome.storage.local.set({ [ZOOM_KEY]: zoom }).catch(() => {});
  }, [zoom]);

  const zoomIn = () => setZoom((z) => Math.min(z + ZOOM_STEP, ZOOM_MAX));
  const zoomOut = () => setZoom((z) => Math.max(z - ZOOM_STEP, ZOOM_MIN));

  const extractData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [tab] = await browser.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (!tab?.id) {
        setError('No active tab found.');
        setLoading(false);
        return;
      }

      const url = tab.url || '';
      if (
        url.startsWith('chrome://') ||
        url.startsWith('chrome-extension://') ||
        url.startsWith('about:') ||
        url.startsWith('edge://')
      ) {
        setError('Cannot analyze browser internal pages.');
        setLoading(false);
        return;
      }

      // Try to inject and extract
      try {
        const data = (await browser.tabs.sendMessage(tab.id, {
          type: 'EXTRACT_PAGE_DATA',
        })) as PageExtraction;

        // Fetch response headers via background script
        try {
          const result = await browser.runtime.sendMessage({
            type: 'FETCH_HEADERS',
            url: tab.url,
          });
          if (result?.headers) {
            data.responseHeaders = result.headers;
          }
        } catch {
          // Headers are optional — CORS or network failures are fine
        }

        setPageData(data);

        // Fetch web vitals (needs small delay for PerformanceObservers to buffer)
        try {
          await new Promise((r) => setTimeout(r, 200));
          const vitals = await browser.tabs.sendMessage(tab.id, {
            type: 'GET_WEB_VITALS',
          });
          setWebVitals(vitals as WebVitals);
        } catch {
          // Vitals are optional
        }
      } catch {
        setError(
          'Could not connect to page. Try refreshing the page and reopening Argus.',
        );
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Extract on mount
  useEffect(() => {
    extractData();
  }, [extractData]);

  // Listen for tab changes
  useEffect(() => {
    const onActivated = () => {
      extractData();
    };

    const onUpdated = (
      _tabId: number,
      changeInfo: browser.Tabs.OnUpdatedChangeInfoType,
    ) => {
      if (changeInfo.status === 'complete') {
        extractData();
      }
    };

    browser.tabs.onActivated.addListener(onActivated);
    browser.tabs.onUpdated.addListener(onUpdated);

    return () => {
      browser.tabs.onActivated.removeListener(onActivated);
      browser.tabs.onUpdated.removeListener(onUpdated);
    };
  }, [extractData]);

  // Run audit when data is available (needed for both Audit and Insights tabs)
  useEffect(() => {
    if (pageData) {
      setAuditReport(runAudit(pageData, webVitals ?? undefined));
    }
  }, [pageData, webVitals]);

  const truncatedUrl = pageData?.url
    ? pageData.url.length > 50
      ? pageData.url.slice(0, 50) + '...'
      : pageData.url
    : '';

  return (
    <div className="flex h-screen flex-col bg-slate-900">
      {/* Header */}
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-slate-700 px-3">
        <div className="flex items-center gap-1.5">
          {/* <Eye size={18} className="text-indigo-400" /> */}
          <span className="text-sm font-bold text-slate-50">Argus</span>
          <a
            href="https://pixelesq.com?utm_source=argus&utm_medium=extension&utm_campaign=header"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-slate-500 transition-colors hover:text-indigo-400"
          >
            by Pixelesq
          </a>
        </div>
        <div className="flex items-center gap-1.5">
          {/* {truncatedUrl && (
            <span
              className="max-w-[140px] truncate text-[10px] text-slate-500"
              title={pageData?.url}
            >
              {truncatedUrl}
            </span>
          )} */}
          <div className="flex items-center rounded-md border border-slate-700 bg-slate-800">
            <button
              onClick={zoomOut}
              disabled={zoom <= ZOOM_MIN}
              className="px-1 py-0.5 text-slate-400 transition-colors hover:text-slate-200 disabled:opacity-30"
              title="Zoom out"
            >
              <Minus size={12} />
            </button>
            <span className="min-w-[32px] text-center text-[10px] text-slate-400">{zoom}%</span>
            <button
              onClick={zoomIn}
              disabled={zoom >= ZOOM_MAX}
              className="px-1 py-0.5 text-slate-400 transition-colors hover:text-slate-200 disabled:opacity-30"
              title="Zoom in"
            >
              <Plus size={12} />
            </button>
          </div>
          <button
            onClick={extractData}
            disabled={loading}
            className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200 disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {error ? (
          <div className="flex flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="rounded-full bg-red-400/10 p-3">
              <Eye size={24} className="text-red-400" />
            </div>
            <p className="text-sm text-red-400">{error}</p>
            <button
              onClick={extractData}
              className="rounded-md bg-slate-800 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:bg-slate-700"
            >
              Try Again
            </button>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center gap-3 p-8">
            <RefreshCw size={24} className="animate-spin text-indigo-400" />
            <p className="text-xs text-slate-400">Analyzing page...</p>
          </div>
        ) : (
          <>
            {activeTab === 'extract' && pageData && (
              <ExtractTab data={pageData} />
            )}
            {activeTab === 'audit' && pageData && auditReport && (
              <AuditTab report={auditReport} />
            )}
            {activeTab === 'insights' && pageData && (
              <InsightsTab data={pageData} auditReport={auditReport} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
