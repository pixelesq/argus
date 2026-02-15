import type { AuditRule } from '../../types';

export const technicalRules: AuditRule[] = [
  {
    id: 'canonical-exists',
    category: 'technical',
    name: 'Canonical URL',
    description: 'Page should have a canonical URL.',
    check: (data) => ({
      ruleId: 'canonical-exists',
      ruleName: 'Canonical URL',
      category: 'technical',
      severity: data.technical.canonical ? 'pass' : 'warning',
      message: data.technical.canonical
        ? `Canonical URL set: ${data.technical.canonical}`
        : 'No canonical URL found. This can cause duplicate content issues.',
    }),
  },
  {
    id: 'canonical-self',
    category: 'technical',
    name: 'Canonical Self-Reference',
    description: 'Canonical should point to the current page URL.',
    check: (data) => {
      if (!data.technical.canonical) {
        return {
          ruleId: 'canonical-self',
          ruleName: 'Canonical Self-Reference',
          category: 'technical',
          severity: 'info',
          message: 'No canonical URL to evaluate.',
        };
      }
      const isSelf = data.technical.canonical === data.url;
      return {
        ruleId: 'canonical-self',
        ruleName: 'Canonical Self-Reference',
        category: 'technical',
        severity: isSelf ? 'pass' : 'info',
        message: isSelf
          ? 'Canonical URL is self-referencing.'
          : 'Canonical URL points to a different page. Verify this is intentional.',
        details: !isSelf
          ? `Current URL: ${data.url}\nCanonical: ${data.technical.canonical}`
          : undefined,
      };
    },
  },
  {
    id: 'robots-noindex',
    category: 'technical',
    name: 'Robots Noindex',
    description: 'Check if page is accidentally set to noindex.',
    check: (data) => {
      const hasNoindex = data.technical.robotsMeta
        .toLowerCase()
        .includes('noindex');
      return {
        ruleId: 'robots-noindex',
        ruleName: 'Robots Noindex',
        category: 'technical',
        severity: hasNoindex ? 'critical' : 'pass',
        message: hasNoindex
          ? 'Page has noindex directive. It will NOT appear in search results.'
          : 'No noindex directive found.',
        details: hasNoindex
          ? `robots meta: "${data.technical.robotsMeta}"\nIf intentional, ignore this warning.`
          : undefined,
      };
    },
  },
  {
    id: 'https',
    category: 'technical',
    name: 'HTTPS',
    description: 'Page should be served over HTTPS.',
    check: (data) => ({
      ruleId: 'https',
      ruleName: 'HTTPS',
      category: 'technical',
      severity: data.technical.isHttps ? 'pass' : 'warning',
      message: data.technical.isHttps
        ? 'Page is served over HTTPS.'
        : 'Page is NOT served over HTTPS. This is a ranking signal.',
    }),
  },
  {
    id: 'viewport-exists',
    category: 'technical',
    name: 'Viewport Meta Tag',
    description: 'Page must have a viewport meta tag for mobile.',
    check: (data) => ({
      ruleId: 'viewport-exists',
      ruleName: 'Viewport Meta Tag',
      category: 'technical',
      severity: data.meta.viewport ? 'pass' : 'critical',
      message: data.meta.viewport
        ? 'Viewport meta tag found.'
        : 'No viewport meta tag. Page may not render properly on mobile devices.',
    }),
  },
  {
    id: 'lang-exists',
    category: 'technical',
    name: 'HTML Lang Attribute',
    description: 'HTML element should have a lang attribute.',
    check: (data) => ({
      ruleId: 'lang-exists',
      ruleName: 'HTML Lang Attribute',
      category: 'technical',
      severity: data.meta.language ? 'pass' : 'warning',
      message: data.meta.language
        ? `Language set: ${data.meta.language}`
        : 'No lang attribute on <html> element. This helps search engines and screen readers.',
    }),
  },
  {
    id: 'hreflang-valid',
    category: 'technical',
    name: 'Hreflang Tags',
    description: 'Hreflang tags should be properly configured.',
    check: (data) => {
      const tags = data.technical.hreflangTags;
      if (tags.length === 0) {
        return {
          ruleId: 'hreflang-valid',
          ruleName: 'Hreflang Tags',
          category: 'technical',
          severity: 'pass',
          message: 'No hreflang tags found (not required for single-language sites).',
        };
      }
      const hasXDefault = tags.some((t) => t.lang === 'x-default');
      const issues: string[] = [];
      if (!hasXDefault) {
        issues.push('Missing x-default hreflang tag.');
      }
      tags.forEach((t) => {
        if (!t.href) issues.push(`Hreflang for "${t.lang}" has no href.`);
      });
      return {
        ruleId: 'hreflang-valid',
        ruleName: 'Hreflang Tags',
        category: 'technical',
        severity: issues.length === 0 ? 'pass' : 'warning',
        message:
          issues.length === 0
            ? `${tags.length} hreflang tags properly configured.`
            : `Hreflang issues found.`,
        details: issues.length > 0 ? issues.join('\n') : undefined,
      };
    },
  },
  {
    id: 'x-robots-noindex',
    category: 'technical',
    name: 'X-Robots-Tag Header',
    description: 'X-Robots-Tag HTTP header should not contain noindex.',
    check: (data) => {
      const xRobots = data.responseHeaders?.['x-robots-tag'] ?? '';
      if (xRobots.toLowerCase().includes('noindex')) {
        return {
          ruleId: 'x-robots-noindex',
          ruleName: 'X-Robots-Tag Header',
          category: 'technical',
          severity: 'critical',
          message:
            'X-Robots-Tag contains noindex — page is blocked from indexing via HTTP header.',
          details: `X-Robots-Tag: ${xRobots}\nThis header overrides meta robots. If intentional, ignore this warning.`,
        };
      }
      if (xRobots) {
        return {
          ruleId: 'x-robots-noindex',
          ruleName: 'X-Robots-Tag Header',
          category: 'technical',
          severity: 'pass',
          message: `X-Robots-Tag: ${xRobots}`,
        };
      }
      return {
        ruleId: 'x-robots-noindex',
        ruleName: 'X-Robots-Tag Header',
        category: 'technical',
        severity: 'pass',
        message:
          'No X-Robots-Tag header detected (normal for most sites).',
      };
    },
  },
];
