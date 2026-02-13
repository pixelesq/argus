import type { HeadingData } from '../types';

export function extractHeadings(): HeadingData[] {
  const headings: HeadingData[] = [];
  const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

  elements.forEach((el) => {
    const tag = el.tagName.toLowerCase();
    headings.push({
      tag,
      text: el.textContent?.trim() ?? '',
      level: parseInt(tag.charAt(1), 10),
    });
  });

  return headings;
}
