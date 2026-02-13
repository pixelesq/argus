import type { MetaData } from '../types';

export function extractMeta(): MetaData {
  const getMetaContent = (name: string): string => {
    const el =
      document.querySelector(`meta[name="${name}"]`) ||
      document.querySelector(`meta[name="${name}" i]`) ||
      document.querySelector(`meta[http-equiv="${name}" i]`);
    return el?.getAttribute('content') ?? '';
  };

  const title = document.title || '';
  const description = getMetaContent('description');

  return {
    title,
    titleLength: title.length,
    description,
    descriptionLength: description.length,
    canonical:
      document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ??
      '',
    robots: getMetaContent('robots'),
    viewport: getMetaContent('viewport'),
    charset: document.characterSet || '',
    language: document.documentElement.lang || '',
    author: getMetaContent('author'),
    generator: getMetaContent('generator'),
    themeColor: getMetaContent('theme-color'),
  };
}
