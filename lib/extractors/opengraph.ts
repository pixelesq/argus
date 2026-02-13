import type { OpenGraphData } from '../types';

export function extractOpenGraph(): OpenGraphData {
  const getOgContent = (property: string): string => {
    const el = document.querySelector(`meta[property="${property}"]`);
    return el?.getAttribute('content') ?? '';
  };

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
