import type { TechnicalData } from '../types';

export function extractTechnical(): TechnicalData {
  const hreflangTags: { lang: string; href: string }[] = [];
  document
    .querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]')
    .forEach((el) => {
      hreflangTags.push({
        lang: el.hreflang,
        href: el.href,
      });
    });

  const alternateLinks: { rel: string; type: string; href: string }[] = [];
  document
    .querySelectorAll<HTMLLinkElement>('link[rel="alternate"]')
    .forEach((el) => {
      if (!el.hreflang) {
        alternateLinks.push({
          rel: 'alternate',
          type: el.type || '',
          href: el.href,
        });
      }
    });

  const favicon =
    document.querySelector<HTMLLinkElement>(
      'link[rel="icon"], link[rel="shortcut icon"]',
    )?.href ?? '';

  const appleTouchIcon =
    document.querySelector<HTMLLinkElement>('link[rel="apple-touch-icon"]')
      ?.href ?? '';

  const robotsMeta =
    document
      .querySelector<HTMLMetaElement>('meta[name="robots"]')
      ?.getAttribute('content') ?? '';

  return {
    canonical:
      document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ??
      '',
    robotsMeta,
    hreflangTags,
    alternateLinks,
    favicon,
    appleTouchIcon,
    isHttps: location.protocol === 'https:',
    url: location.href,
  };
}
