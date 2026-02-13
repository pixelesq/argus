import type { AuditRule } from '../../types';

const GENERIC_ANCHORS = [
  'click here',
  'read more',
  'here',
  'learn more',
  'more',
  'link',
  'this',
];

export const linkRules: AuditRule[] = [
  {
    id: 'links-generic-anchor',
    category: 'links',
    name: 'Descriptive Anchor Text',
    description: 'Links should have descriptive anchor text.',
    check: (data) => {
      const generic = data.links.filter((l) =>
        GENERIC_ANCHORS.includes(l.text.toLowerCase().trim()),
      );
      return {
        ruleId: 'links-generic-anchor',
        ruleName: 'Descriptive Anchor Text',
        category: 'links',
        severity: generic.length === 0 ? 'pass' : 'warning',
        message:
          generic.length === 0
            ? 'All links have descriptive anchor text.'
            : `${generic.length} link(s) with generic anchor text found.`,
        details:
          generic.length > 0
            ? generic
                .slice(0, 10)
                .map((l) => `"${l.text}" → ${l.href}`)
                .join('\n')
            : undefined,
      };
    },
  },
  {
    id: 'links-empty-href',
    category: 'links',
    name: 'Empty Links',
    description: 'Links should not have empty href or href="#".',
    check: (data) => {
      const empty = data.links.filter(
        (l) => !l.href || l.href === '#' || l.href === 'javascript:void(0)',
      );
      return {
        ruleId: 'links-empty-href',
        ruleName: 'Empty Links',
        category: 'links',
        severity: empty.length === 0 ? 'pass' : 'warning',
        message:
          empty.length === 0
            ? 'No empty or placeholder links found.'
            : `${empty.length} link(s) with empty or placeholder href.`,
      };
    },
  },
  {
    id: 'links-internal-count',
    category: 'links',
    name: 'Internal Links',
    description: 'Page should have a reasonable number of internal links.',
    check: (data) => {
      const internal = data.links.filter((l) => !l.isExternal);
      return {
        ruleId: 'links-internal-count',
        ruleName: 'Internal Links',
        category: 'links',
        severity: internal.length >= 3 ? 'pass' : 'info',
        message:
          internal.length >= 3
            ? `${internal.length} internal links found.`
            : `Only ${internal.length} internal link(s) found. Consider adding more for better site structure.`,
      };
    },
  },
];
