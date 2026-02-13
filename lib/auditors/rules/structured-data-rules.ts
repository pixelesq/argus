import type { AuditRule } from '../../types';

export const structuredDataRules: AuditRule[] = [
  {
    id: 'jsonld-exists',
    category: 'structured-data',
    name: 'JSON-LD Exists',
    description: 'Page should have JSON-LD structured data.',
    check: (data) => ({
      ruleId: 'jsonld-exists',
      ruleName: 'JSON-LD Exists',
      category: 'structured-data',
      severity: data.jsonLd.length > 0 ? 'pass' : 'warning',
      message:
        data.jsonLd.length > 0
          ? `${data.jsonLd.length} JSON-LD block(s) found.`
          : 'No JSON-LD structured data found. Adding schema markup can enhance search results.',
    }),
  },
  {
    id: 'jsonld-valid',
    category: 'structured-data',
    name: 'JSON-LD Valid',
    description: 'JSON-LD blocks should be valid JSON.',
    check: (data) => {
      const invalid = data.jsonLd.filter((j) => !j.isValid);
      if (data.jsonLd.length === 0) {
        return {
          ruleId: 'jsonld-valid',
          ruleName: 'JSON-LD Valid',
          category: 'structured-data',
          severity: 'pass',
          message: 'No JSON-LD to validate.',
        };
      }
      return {
        ruleId: 'jsonld-valid',
        ruleName: 'JSON-LD Valid',
        category: 'structured-data',
        severity: invalid.length === 0 ? 'pass' : 'critical',
        message:
          invalid.length === 0
            ? 'All JSON-LD blocks are valid.'
            : `${invalid.length} invalid JSON-LD block(s).`,
        details:
          invalid.length > 0
            ? invalid.map((j) => j.errors.join(', ')).join('\n')
            : undefined,
      };
    },
  },
  {
    id: 'jsonld-type',
    category: 'structured-data',
    name: 'Schema Type',
    description: 'JSON-LD should include appropriate schema types.',
    check: (data) => {
      if (data.jsonLd.length === 0) {
        return {
          ruleId: 'jsonld-type',
          ruleName: 'Schema Type',
          category: 'structured-data',
          severity: 'info',
          message:
            'No structured data. Consider adding Article, Product, LocalBusiness, or other relevant schema.',
        };
      }
      const types = data.jsonLd
        .map((j) => j.type)
        .filter(Boolean)
        .join(', ');
      return {
        ruleId: 'jsonld-type',
        ruleName: 'Schema Type',
        category: 'structured-data',
        severity: 'pass',
        message: `Schema types found: ${types || 'Unknown'}`,
      };
    },
  },
  {
    id: 'breadcrumb-schema',
    category: 'structured-data',
    name: 'Breadcrumb Schema',
    description: 'BreadcrumbList schema helps search engines understand site structure.',
    check: (data) => {
      const hasBreadcrumb = data.jsonLd.some(
        (j) => j.type && j.type.includes('BreadcrumbList'),
      );
      return {
        ruleId: 'breadcrumb-schema',
        ruleName: 'Breadcrumb Schema',
        category: 'structured-data',
        severity: hasBreadcrumb ? 'pass' : 'info',
        message: hasBreadcrumb
          ? 'BreadcrumbList schema found.'
          : 'No BreadcrumbList schema. Consider adding breadcrumb structured data.',
      };
    },
  },
];
