import type { TwitterCardData } from '../types';

export function extractTwitterCard(): TwitterCardData {
  const getTwitterContent = (name: string): string => {
    const el =
      document.querySelector(`meta[name="${name}"]`) ||
      document.querySelector(`meta[property="${name}"]`);
    return el?.getAttribute('content') ?? '';
  };

  return {
    card: getTwitterContent('twitter:card'),
    title: getTwitterContent('twitter:title'),
    description: getTwitterContent('twitter:description'),
    image: getTwitterContent('twitter:image'),
    site: getTwitterContent('twitter:site'),
    creator: getTwitterContent('twitter:creator'),
  };
}
