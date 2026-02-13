import type { AuditRule } from '../../types';

export const imageRules: AuditRule[] = [
  {
    id: 'images-alt',
    category: 'images',
    name: 'Image Alt Text',
    description: 'Images should have alt text for accessibility and SEO.',
    check: (data) => {
      const missing = data.images.filter((i) => !i.alt);
      if (data.images.length === 0) {
        return {
          ruleId: 'images-alt',
          ruleName: 'Image Alt Text',
          category: 'images',
          severity: 'pass',
          message: 'No images found on page.',
        };
      }
      return {
        ruleId: 'images-alt',
        ruleName: 'Image Alt Text',
        category: 'images',
        severity:
          missing.length === 0
            ? 'pass'
            : missing.length > 5
              ? 'critical'
              : 'warning',
        message:
          missing.length === 0
            ? 'All images have alt text.'
            : `${missing.length} image(s) missing alt text.`,
        details:
          missing.length > 0
            ? missing
                .slice(0, 10)
                .map((i) => `- ${i.src}`)
                .join('\n')
            : undefined,
      };
    },
  },
  {
    id: 'images-dimensions',
    category: 'images',
    name: 'Image Dimensions',
    description:
      'Images should have explicit width/height to prevent layout shift.',
    check: (data) => {
      const noDims = data.images.filter(
        (i) => i.width === null && i.height === null,
      );
      if (data.images.length === 0) {
        return {
          ruleId: 'images-dimensions',
          ruleName: 'Image Dimensions',
          category: 'images',
          severity: 'pass',
          message: 'No images found.',
        };
      }
      return {
        ruleId: 'images-dimensions',
        ruleName: 'Image Dimensions',
        category: 'images',
        severity: noDims.length === 0 ? 'pass' : 'warning',
        message:
          noDims.length === 0
            ? 'All images have explicit dimensions.'
            : `${noDims.length} image(s) lack width/height attributes (CLS risk).`,
      };
    },
  },
  {
    id: 'images-lazy',
    category: 'images',
    name: 'Lazy Loading',
    description: 'Below-fold images should use lazy loading.',
    check: (data) => {
      const noLazy = data.images.filter((i) => !i.hasLazyLoading);
      if (data.images.length === 0) {
        return {
          ruleId: 'images-lazy',
          ruleName: 'Lazy Loading',
          category: 'images',
          severity: 'pass',
          message: 'No images found.',
        };
      }
      return {
        ruleId: 'images-lazy',
        ruleName: 'Lazy Loading',
        category: 'images',
        severity: noLazy.length === 0 ? 'pass' : 'info',
        message:
          noLazy.length === 0
            ? 'All images use lazy loading.'
            : `${noLazy.length} image(s) without lazy loading. Consider adding loading="lazy" for below-fold images.`,
      };
    },
  },
  {
    id: 'images-format',
    category: 'images',
    name: 'Modern Image Formats',
    description: 'Consider using WebP/AVIF for better compression.',
    check: (data) => {
      const legacy = data.images.filter((i) =>
        ['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(i.fileExtension),
      );
      if (data.images.length === 0) {
        return {
          ruleId: 'images-format',
          ruleName: 'Modern Image Formats',
          category: 'images',
          severity: 'pass',
          message: 'No images found.',
        };
      }
      return {
        ruleId: 'images-format',
        ruleName: 'Modern Image Formats',
        category: 'images',
        severity: legacy.length === 0 ? 'pass' : 'info',
        message:
          legacy.length === 0
            ? 'All images use modern formats.'
            : `${legacy.length} image(s) using legacy formats. Consider WebP or AVIF for better compression.`,
      };
    },
  },
];
