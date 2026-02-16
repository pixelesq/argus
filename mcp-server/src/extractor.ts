import * as cheerio from 'cheerio';
import type {
  PageExtraction,
  MetaData,
  OpenGraphData,
  TwitterCardData,
  JsonLdData,
  HeadingData,
  LinkData,
  ImageData,
  TechnicalData,
} from '../../lib/types';

/**
 * Extract PageExtraction data from raw HTML — the Node.js equivalent
 * of the Chrome extension's content.ts DOM extraction.
 * Uses cheerio to provide DOM-like querying over HTML strings.
 */
export function extractFromHtml(html: string, url: string): PageExtraction {
  const $ = cheerio.load(html);

  return {
    meta: extractMeta($),
    og: extractOpenGraph($),
    twitter: extractTwitterCard($),
    jsonLd: extractJsonLd($),
    headings: extractHeadings($),
    links: extractLinks($, url),
    images: extractImages($),
    technical: extractTechnical($, url),
    wordCount: extractWordCount($),
    url,
    timestamp: new Date().toISOString(),
  };
}

function extractMeta($: cheerio.CheerioAPI): MetaData {
  const getMetaContent = (name: string): string => {
    return (
      $(`meta[name="${name}"]`).attr('content') ??
      $(`meta[name="${name}" i]`).attr('content') ??
      $(`meta[http-equiv="${name}" i]`).attr('content') ??
      ''
    );
  };

  const title = $('title').first().text() || '';
  const description = getMetaContent('description');

  return {
    title,
    titleLength: title.length,
    description,
    descriptionLength: description.length,
    canonical: $('link[rel="canonical"]').attr('href') ?? '',
    robots: getMetaContent('robots'),
    viewport: getMetaContent('viewport'),
    charset:
      $('meta[charset]').attr('charset') ??
      ($('meta[http-equiv="Content-Type"]').attr('content')?.match(/charset=([^;]+)/)?.[1] ?? ''),
    language: $('html').attr('lang') ?? '',
    author: getMetaContent('author'),
    generator: getMetaContent('generator'),
    themeColor: getMetaContent('theme-color'),
  };
}

function extractOpenGraph($: cheerio.CheerioAPI): OpenGraphData {
  const getOgContent = (property: string): string =>
    $(`meta[property="${property}"]`).attr('content') ?? '';

  return {
    title: getOgContent('og:title'),
    description: getOgContent('og:description'),
    image: getOgContent('og:image'),
    imageWidth: getOgContent('og:image:width'),
    imageHeight: getOgContent('og:image:height'),
    url: getOgContent('og:url'),
    type: getOgContent('og:type'),
    siteName: getOgContent('og:site_name'),
    locale: getOgContent('og:locale'),
  };
}

function extractTwitterCard($: cheerio.CheerioAPI): TwitterCardData {
  const getTwitterContent = (name: string): string =>
    $(`meta[name="${name}"]`).attr('content') ??
    $(`meta[property="${name}"]`).attr('content') ??
    '';

  return {
    card: getTwitterContent('twitter:card'),
    title: getTwitterContent('twitter:title'),
    description: getTwitterContent('twitter:description'),
    image: getTwitterContent('twitter:image'),
    site: getTwitterContent('twitter:site'),
    creator: getTwitterContent('twitter:creator'),
  };
}

function extractJsonLd($: cheerio.CheerioAPI): JsonLdData[] {
  const results: JsonLdData[] = [];

  $('script[type="application/ld+json"]').each((_, el) => {
    const raw = $(el).html()?.trim() ?? '';
    const errors: string[] = [];
    let parsed: any = null;
    let type = '';
    let isValid = false;

    try {
      parsed = JSON.parse(raw);
      isValid = true;
      if (parsed['@type']) {
        type = Array.isArray(parsed['@type'])
          ? parsed['@type'].join(', ')
          : parsed['@type'];
      } else if (parsed['@graph'] && Array.isArray(parsed['@graph'])) {
        const types = parsed['@graph']
          .map((item: any) => item['@type'])
          .filter(Boolean);
        type = types.join(', ');
      }
    } catch (e) {
      errors.push(e instanceof Error ? e.message : 'Invalid JSON');
    }

    results.push({ raw, parsed, type, isValid, errors });
  });

  return results;
}

function extractHeadings($: cheerio.CheerioAPI): HeadingData[] {
  const headings: HeadingData[] = [];

  $('h1, h2, h3, h4, h5, h6').each((_, el) => {
    const tag = (el as any).tagName?.toLowerCase() ?? '';
    headings.push({
      tag,
      text: $(el).text().trim(),
      level: parseInt(tag.charAt(1), 10),
    });
  });

  return headings;
}

function extractLinks($: cheerio.CheerioAPI, pageUrl: string): LinkData[] {
  const links: LinkData[] = [];
  let currentHost = '';
  try {
    currentHost = new URL(pageUrl).hostname;
  } catch {}

  $('a[href]').each((_, el) => {
    const href = $(el).attr('href') ?? '';
    const rel = $(el).attr('rel') ?? '';

    let isExternal = false;
    try {
      const linkUrl = new URL(href, pageUrl);
      isExternal = linkUrl.hostname !== currentHost;
    } catch {}

    links.push({
      href,
      text: $(el).text().trim(),
      isExternal,
      isNofollow: rel.includes('nofollow'),
      isNoopener: rel.includes('noopener'),
    });
  });

  return links;
}

function extractImages($: cheerio.CheerioAPI): ImageData[] {
  const images: ImageData[] = [];

  $('img').each((_, el) => {
    const src = $(el).attr('src') ?? '';
    const ext = src.split('.').pop()?.split('?')[0]?.toLowerCase() ?? '';
    const widthAttr = $(el).attr('width');
    const heightAttr = $(el).attr('height');

    images.push({
      src,
      alt: $(el).attr('alt') ?? '',
      width: widthAttr ? parseInt(widthAttr, 10) : null,
      height: heightAttr ? parseInt(heightAttr, 10) : null,
      hasLazyLoading: $(el).attr('loading') === 'lazy',
      naturalWidth: 0,
      naturalHeight: 0,
      displayWidth: 0,
      displayHeight: 0,
      fileExtension: ext,
    });
  });

  return images;
}

function extractTechnical($: cheerio.CheerioAPI, pageUrl: string): TechnicalData {
  const hreflangTags: { lang: string; href: string }[] = [];
  $('link[rel="alternate"][hreflang]').each((_, el) => {
    hreflangTags.push({
      lang: $(el).attr('hreflang') ?? '',
      href: $(el).attr('href') ?? '',
    });
  });

  const alternateLinks: { rel: string; type: string; href: string }[] = [];
  $('link[rel="alternate"]').each((_, el) => {
    if (!$(el).attr('hreflang')) {
      alternateLinks.push({
        rel: 'alternate',
        type: $(el).attr('type') ?? '',
        href: $(el).attr('href') ?? '',
      });
    }
  });

  return {
    canonical: $('link[rel="canonical"]').attr('href') ?? '',
    robotsMeta: $('meta[name="robots"]').attr('content') ?? '',
    hreflangTags,
    alternateLinks,
    favicon:
      $('link[rel="icon"]').attr('href') ??
      $('link[rel="shortcut icon"]').attr('href') ??
      '',
    appleTouchIcon: $('link[rel="apple-touch-icon"]').attr('href') ?? '',
    isHttps: pageUrl.startsWith('https'),
    url: pageUrl,
  };
}

function extractWordCount($: cheerio.CheerioAPI): number {
  const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
  if (!bodyText) return 0;
  return bodyText.split(' ').length;
}
