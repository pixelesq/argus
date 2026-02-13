import { extractMeta } from '@/lib/extractors/meta';
import { extractOpenGraph } from '@/lib/extractors/opengraph';
import { extractTwitterCard } from '@/lib/extractors/twitter';
import { extractJsonLd } from '@/lib/extractors/jsonld';
import { extractHeadings } from '@/lib/extractors/headings';
import { extractLinks } from '@/lib/extractors/links';
import { extractImages } from '@/lib/extractors/images';
import { extractTechnical } from '@/lib/extractors/technical';
import type { PageExtraction, WebVitals } from '@/lib/types';

export default defineContentScript({
  matches: ['<all_urls>'],
  runAt: 'document_idle',
  main() {
    browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
      if (message.type === 'EXTRACT_PAGE_DATA') {
        const data = extractPageData();
        sendResponse(data);
        return true;
      }
      if (message.type === 'GET_WEB_VITALS') {
        getWebVitals().then((vitals) => sendResponse(vitals));
        return true;
      }
    });
  },
});

function extractPageData(): PageExtraction {
  const bodyText = document.body?.innerText ?? '';
  const words = bodyText.replace(/\s+/g, ' ').trim().split(' ');
  const wordCount = words[0] === '' ? 0 : words.length;

  return {
    meta: extractMeta(),
    og: extractOpenGraph(),
    twitter: extractTwitterCard(),
    jsonLd: extractJsonLd(),
    headings: extractHeadings(),
    links: extractLinks(),
    images: extractImages(),
    technical: extractTechnical(),
    wordCount,
    url: location.href,
    timestamp: new Date().toISOString(),
  };
}

function getWebVitals(): Promise<WebVitals> {
  return new Promise((resolve) => {
    const vitals: WebVitals = {
      lcp: null,
      inp: null,
      cls: null,
      ttfb: null,
      fcp: null,
    };

    // TTFB
    const navEntries = performance.getEntriesByType(
      'navigation',
    ) as PerformanceNavigationTiming[];
    if (navEntries.length > 0) {
      vitals.ttfb = Math.round(navEntries[0].responseStart);
    }

    // FCP
    const paintEntries = performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find(
      (e) => e.name === 'first-contentful-paint',
    );
    if (fcpEntry) {
      vitals.fcp = Math.round(fcpEntry.startTime);
    }

    // LCP
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        if (entries.length > 0) {
          vitals.lcp = Math.round(entries[entries.length - 1].startTime);
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      setTimeout(() => lcpObserver.disconnect(), 100);
    } catch {
      // LCP not supported
    }

    // CLS
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        vitals.cls = Math.round(clsValue * 1000) / 1000;
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
      setTimeout(() => clsObserver.disconnect(), 100);
    } catch {
      // CLS not supported
    }

    // INP - observe event entries
    try {
      let maxDuration = 0;
      const inpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if ((entry as any).duration > maxDuration) {
            maxDuration = (entry as any).duration;
          }
        }
        vitals.inp = maxDuration > 0 ? Math.round(maxDuration) : null;
      });
      inpObserver.observe({ type: 'event', buffered: true });
      setTimeout(() => inpObserver.disconnect(), 100);
    } catch {
      // INP not supported
    }

    // Give observers time to collect buffered entries
    setTimeout(() => resolve(vitals), 150);
  });
}
