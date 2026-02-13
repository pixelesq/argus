import type { ImageData } from '../types';

export function extractImages(): ImageData[] {
  const images: ImageData[] = [];
  const elements = document.querySelectorAll<HTMLImageElement>('img');

  elements.forEach((el) => {
    const src = el.getAttribute('src') ?? el.currentSrc ?? '';
    const ext = src.split('.').pop()?.split('?')[0]?.toLowerCase() ?? '';
    const rect = el.getBoundingClientRect();

    images.push({
      src,
      alt: el.getAttribute('alt') ?? '',
      width: el.hasAttribute('width') ? el.width : null,
      height: el.hasAttribute('height') ? el.height : null,
      hasLazyLoading: el.loading === 'lazy',
      naturalWidth: el.naturalWidth,
      naturalHeight: el.naturalHeight,
      displayWidth: Math.round(rect.width),
      displayHeight: Math.round(rect.height),
      fileExtension: ext,
    });
  });

  return images;
}
