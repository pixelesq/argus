import type { AuditRule } from '../../types';

export const socialRules: AuditRule[] = [
  {
    id: 'og-exists',
    category: 'social',
    name: 'Open Graph Tags',
    description: 'Page should have Open Graph meta tags.',
    check: (data) => {
      const hasOg = data.og.title || data.og.description || data.og.image;
      return {
        ruleId: 'og-exists',
        ruleName: 'Open Graph Tags',
        category: 'social',
        severity: hasOg ? 'pass' : 'warning',
        message: hasOg
          ? 'Open Graph tags found.'
          : 'No Open Graph tags found. Content may not display well when shared on social media.',
      };
    },
  },
  {
    id: 'og-image',
    category: 'social',
    name: 'OG Image',
    description: 'Page should have an og:image for social sharing.',
    check: (data) => ({
      ruleId: 'og-image',
      ruleName: 'OG Image',
      category: 'social',
      severity: data.og.image ? 'pass' : 'warning',
      message: data.og.image
        ? 'og:image is set.'
        : 'No og:image found. Social shares will lack a preview image.',
    }),
  },
  {
    id: 'og-image-size',
    category: 'social',
    name: 'OG Image Size',
    description: 'og:image should be at least 1200x630 pixels.',
    check: (data) => {
      if (!data.og.image) {
        return {
          ruleId: 'og-image-size',
          ruleName: 'OG Image Size',
          category: 'social',
          severity: 'info',
          message: 'No og:image to evaluate.',
        };
      }
      const w = parseInt(data.og.imageWidth, 10);
      const h = parseInt(data.og.imageHeight, 10);
      if (isNaN(w) || isNaN(h)) {
        return {
          ruleId: 'og-image-size',
          ruleName: 'OG Image Size',
          category: 'social',
          severity: 'info',
          message:
            'og:image dimensions not specified. Recommended: 1200x630 pixels.',
        };
      }
      const adequate = w >= 1200 && h >= 630;
      return {
        ruleId: 'og-image-size',
        ruleName: 'OG Image Size',
        category: 'social',
        severity: adequate ? 'pass' : 'info',
        message: adequate
          ? `og:image dimensions are ${w}x${h} (adequate).`
          : `og:image is ${w}x${h}. Recommended minimum: 1200x630 pixels.`,
      };
    },
  },
  {
    id: 'twitter-card',
    category: 'social',
    name: 'Twitter Card',
    description: 'Page should have Twitter card meta tags.',
    check: (data) => {
      const hasTwitter = data.twitter.card || data.twitter.title;
      return {
        ruleId: 'twitter-card',
        ruleName: 'Twitter Card',
        category: 'social',
        severity: hasTwitter ? 'pass' : 'warning',
        message: hasTwitter
          ? `Twitter card type: ${data.twitter.card || 'set'}`
          : 'No Twitter card tags found.',
      };
    },
  },
  {
    id: 'twitter-image',
    category: 'social',
    name: 'Twitter Image',
    description: 'Twitter card should include an image.',
    check: (data) => ({
      ruleId: 'twitter-image',
      ruleName: 'Twitter Image',
      category: 'social',
      severity: data.twitter.image || data.og.image ? 'pass' : 'warning',
      message:
        data.twitter.image || data.og.image
          ? 'Twitter image is set (or will fall back to og:image).'
          : 'No twitter:image or og:image found.',
    }),
  },
];
