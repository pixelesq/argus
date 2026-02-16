#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { extractFromHtml } from './extractor.js';

// Import audit engine — these are pure functions that work in any JS runtime
import { runAudit } from '../../lib/auditors/engine';
import type { PageExtraction, AuditReport } from '../../lib/types';

const server = new McpServer({
  name: 'argus-seo',
  version: '1.0.0',
});

// ===== Helper: Fetch a page and extract data =====

async function fetchAndExtract(url: string): Promise<PageExtraction> {
  const response = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (compatible; ArgusSEO/1.0; +https://github.com/ArslanYM/argus)',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  return extractFromHtml(html, url);
}

function formatAuditReport(report: AuditReport, data: PageExtraction): string {
  const lines: string[] = [];

  lines.push(`# SEO Audit Report: ${data.url}`);
  lines.push(`Overall Score: ${report.score}/100\n`);

  // Category scores
  lines.push('## Category Scores');
  for (const [category, score] of Object.entries(report.categoryScores)) {
    const bar = score >= 80 ? 'PASS' : score >= 50 ? 'WARN' : 'FAIL';
    lines.push(`- ${category}: ${score}/100 [${bar}]`);
  }

  // Issues by severity
  const critical = report.results.filter((r) => r.severity === 'critical');
  const warnings = report.results.filter((r) => r.severity === 'warning');
  const infos = report.results.filter((r) => r.severity === 'info');
  const passes = report.results.filter((r) => r.severity === 'pass');

  if (critical.length > 0) {
    lines.push('\n## Critical Issues');
    critical.forEach((r) => lines.push(`- [${r.category}] ${r.message}`));
  }
  if (warnings.length > 0) {
    lines.push('\n## Warnings');
    warnings.forEach((r) => lines.push(`- [${r.category}] ${r.message}`));
  }
  if (infos.length > 0) {
    lines.push('\n## Info');
    infos.forEach((r) => lines.push(`- [${r.category}] ${r.message}`));
  }

  lines.push(`\n## Summary`);
  lines.push(
    `${passes.length} passed | ${critical.length} critical | ${warnings.length} warnings | ${infos.length} info`,
  );

  return lines.join('\n');
}

function formatExtraction(data: PageExtraction): string {
  const lines: string[] = [];

  lines.push(`# Meta Tag Extraction: ${data.url}\n`);

  lines.push('## Basic Meta');
  lines.push(`- Title: ${data.meta.title} (${data.meta.titleLength} chars)`);
  lines.push(`- Description: ${data.meta.description} (${data.meta.descriptionLength} chars)`);
  lines.push(`- Canonical: ${data.meta.canonical || 'MISSING'}`);
  lines.push(`- Robots: ${data.meta.robots || 'none'}`);
  lines.push(`- Language: ${data.meta.language || 'MISSING'}`);
  lines.push(`- Viewport: ${data.meta.viewport || 'MISSING'}`);

  lines.push('\n## Open Graph');
  lines.push(`- og:title: ${data.og.title || 'MISSING'}`);
  lines.push(`- og:description: ${data.og.description || 'MISSING'}`);
  lines.push(`- og:image: ${data.og.image || 'MISSING'}`);
  lines.push(`- og:type: ${data.og.type || 'MISSING'}`);

  lines.push('\n## Twitter Card');
  lines.push(`- twitter:card: ${data.twitter.card || 'MISSING'}`);
  lines.push(`- twitter:title: ${data.twitter.title || 'MISSING'}`);
  lines.push(`- twitter:image: ${data.twitter.image || 'MISSING'}`);

  lines.push('\n## Content');
  lines.push(`- Word count: ${data.wordCount}`);
  lines.push(`- Headings: ${data.headings.length}`);
  lines.push(`- Images: ${data.images.length} (${data.images.filter((i) => !i.alt).length} missing alt)`);
  lines.push(`- Links: ${data.links.length} (${data.links.filter((l) => l.isExternal).length} external)`);

  lines.push('\n## Structured Data');
  if (data.jsonLd.length === 0) {
    lines.push('- No JSON-LD found');
  } else {
    data.jsonLd.forEach((j) => {
      lines.push(`- ${j.type || 'Unknown'}: ${j.isValid ? 'Valid' : 'INVALID'}`);
    });
  }

  lines.push('\n## Heading Structure');
  data.headings.slice(0, 20).forEach((h) => {
    lines.push(`${'  '.repeat(h.level - 1)}- ${h.tag.toUpperCase()}: ${h.text}`);
  });

  return lines.join('\n');
}

// ===== MCP Tools =====

server.tool(
  'seo_audit',
  'Run a comprehensive SEO audit on a webpage. Returns a score out of 100 with detailed findings across 10 categories: title, description, headings, images, links, technical, structured data, social, content, and performance.',
  {
    url: z.string().url().describe('The URL of the webpage to audit'),
  },
  async ({ url }) => {
    const data = await fetchAndExtract(url);
    const report = runAudit(data);
    return {
      content: [{ type: 'text' as const, text: formatAuditReport(report, data) }],
    };
  },
);

server.tool(
  'extract_meta',
  'Extract all SEO-relevant meta tags, Open Graph, Twitter Card, JSON-LD structured data, heading hierarchy, links, and images from a webpage.',
  {
    url: z.string().url().describe('The URL of the webpage to extract data from'),
  },
  async ({ url }) => {
    const data = await fetchAndExtract(url);
    return {
      content: [{ type: 'text' as const, text: formatExtraction(data) }],
    };
  },
);

server.tool(
  'compare_seo',
  'Compare SEO scores and meta tags across multiple webpages side by side. Useful for competitive analysis or auditing multiple pages on your site.',
  {
    urls: z
      .array(z.string().url())
      .min(2)
      .max(5)
      .describe('List of 2-5 URLs to compare'),
  },
  async ({ urls }) => {
    const results: { url: string; data: PageExtraction; report: AuditReport }[] = [];

    for (const url of urls) {
      const data = await fetchAndExtract(url);
      const report = runAudit(data);
      results.push({ url, data, report });
    }

    const lines: string[] = ['# SEO Comparison Report\n'];

    // Score table
    lines.push('## Overall Scores');
    results.forEach((r) => {
      lines.push(`- ${r.url}: **${r.report.score}/100**`);
    });

    // Category comparison
    lines.push('\n## Category Breakdown');
    const categories = Object.keys(results[0].report.categoryScores);
    for (const cat of categories) {
      lines.push(`\n### ${cat}`);
      results.forEach((r) => {
        const score = r.report.categoryScores[cat as keyof typeof r.report.categoryScores];
        lines.push(`- ${r.url}: ${score}/100`);
      });
    }

    // Meta tag comparison
    lines.push('\n## Meta Tag Comparison');
    results.forEach((r) => {
      lines.push(`\n**${r.url}**`);
      lines.push(`- Title: ${r.data.meta.title || 'MISSING'} (${r.data.meta.titleLength} chars)`);
      lines.push(
        `- Description: ${r.data.meta.description ? r.data.meta.description.slice(0, 80) + '...' : 'MISSING'}`,
      );
      lines.push(`- Schema: ${r.data.jsonLd.map((j) => j.type).join(', ') || 'None'}`);
      lines.push(`- Word count: ${r.data.wordCount}`);
    });

    // Key differences
    lines.push('\n## Key Differences');
    const scores = results.map((r) => r.report.score);
    const best = results[scores.indexOf(Math.max(...scores))];
    const worst = results[scores.indexOf(Math.min(...scores))];
    lines.push(`- Best performing: ${best.url} (${best.report.score}/100)`);
    lines.push(`- Lowest performing: ${worst.url} (${worst.report.score}/100)`);
    lines.push(`- Score gap: ${Math.max(...scores) - Math.min(...scores)} points`);

    return {
      content: [{ type: 'text' as const, text: lines.join('\n') }],
    };
  },
);

server.tool(
  'extract_json',
  'Extract raw SEO data from a webpage as JSON. Useful for programmatic analysis or piping into other tools.',
  {
    url: z.string().url().describe('The URL of the webpage to extract data from'),
  },
  async ({ url }) => {
    const data = await fetchAndExtract(url);
    const report = runAudit(data);
    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({ extraction: data, audit: report }, null, 2),
        },
      ],
    };
  },
);

// ===== Start server =====

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error('Failed to start Argus MCP server:', err);
  process.exit(1);
});
