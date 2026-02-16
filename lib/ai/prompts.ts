import type { PageExtraction, AuditReport } from '../types';

// ===== SYSTEM PROMPTS =====

export const SYSTEM_PROMPTS = {
  classifier: `You are an SEO analyst. Given a webpage's meta data and content summary, classify what the page is about in one concise sentence. Be specific about the topic, audience, and intent.`,

  metaDescription: `You are an SEO copywriter. Given a page's title, current meta description (if any), and content summary, write an optimized meta description. Requirements:
- 140-155 characters
- Include primary keyword naturally
- Include a call to action
- Be compelling for search result clicks
- Output ONLY the meta description text, nothing else.`,

  titleImprover: `You are an SEO copywriter. Given a page's current title, meta description, and content summary, suggest an improved title tag. Requirements:
- 50-60 characters
- Front-load the primary keyword
- Be compelling and clickable
- Output ONLY the improved title, nothing else.`,

  contentAnalysis: `You are an SEO content analyst. Given a page's metadata and content stats, provide a brief analysis covering:
1. Content quality signals (thin content, keyword stuffing, etc.)
2. Search intent alignment
3. One specific, actionable improvement
Keep response under 150 words. Be direct and specific.`,

  schemaRecommendation: `You are a structured data expert. Given a page's URL, title, description, and detected schema types, recommend which Schema.org types should be added. Be specific about required properties. Keep response concise.`,

  faqGenerator: `You are an SEO content strategist. Given a page's content summary, generate 3-5 FAQ questions and brief answers that could be added as FAQ schema. Format as:
Q: [question]
A: [brief answer]`,
};

// ===== OPUS 4.6 ENHANCED PROMPTS =====
// These prompts leverage Opus 4.6's deeper reasoning for more sophisticated analysis

export const OPUS_PROMPTS = {
  seoStrategyBrief: `You are a senior SEO strategist performing a comprehensive page-level audit. Analyze ALL provided data — meta tags, headings, links, images, structured data, and technical signals — to produce a prioritized SEO action plan.

Your analysis must cover:
1. **Critical Issues** — Things actively hurting rankings (noindex, missing canonical, broken schema, etc.)
2. **Quick Wins** — Easy fixes with high impact (missing meta descriptions, alt text, heading hierarchy)
3. **Strategic Opportunities** — Improvements that require more effort (content gaps, schema enhancements, internal linking)
4. **Competitive Edge** — Advanced tactics for the detected page type (E-E-A-T signals, featured snippet optimization, etc.)

Format each item as: [Priority: High/Medium/Low] Issue → Recommended fix
Keep response focused and actionable. No filler text.`,

  generateSchema: `You are a Schema.org structured data expert. Given a page's full metadata, content structure, and URL, generate complete, valid JSON-LD markup.

Rules:
- Output ONLY the JSON-LD script tag — no explanation
- Include all required and recommended properties for the detected schema type
- Use realistic values based on the page content provided
- Follow Google's structured data guidelines
- Wrap in <script type="application/ld+json"> tags so it's ready to paste
- If the page already has schema, generate an improved/expanded version`,

  technicalFix: `You are a technical SEO engineer. Given a page's technical audit results showing issues, generate specific HTML code fixes for each problem.

For each issue provide:
1. What's wrong (one line)
2. The exact HTML/meta tag to add or modify (ready to paste into <head>)

Output code blocks for each fix. Be concise — code over explanation.`,

  contentGaps: `You are an SEO content strategist. Analyze the page's heading structure, word count, and topic to identify content gaps — sections or topics that should exist on this page type but are missing.

For each gap:
1. Suggested heading (H2/H3)
2. What content should go under it (one sentence)
3. Why it matters for SEO (one sentence)

Limit to the top 5 most impactful gaps.`,

  competitorInsights: `You are an SEO competitive analyst. Based on the page type, industry, and current optimization state, provide insights on what top-ranking pages for similar queries typically do differently.

Cover: content depth, schema types, internal linking patterns, featured snippet targeting, and E-E-A-T signals. Keep response under 200 words.`,
};

// ===== CONTEXT BUILDERS =====

export function buildPageContext(data: {
  title: string;
  description: string;
  url: string;
  wordCount: number;
  headings: string[];
  schemaTypes: string[];
}): string {
  return [
    `URL: ${data.url}`,
    `Title: ${data.title}`,
    `Description: ${data.description}`,
    `Word count: ${data.wordCount}`,
    `Headings: ${data.headings.slice(0, 10).join(', ')}`,
    data.schemaTypes.length > 0
      ? `Schema types: ${data.schemaTypes.join(', ')}`
      : 'Schema types: None',
  ].join('\n');
}

/**
 * Build rich context for Opus 4.6 — sends the full extraction data
 * for deeper, more nuanced analysis.
 */
export function buildFullPageContext(data: PageExtraction): string {
  const sections: string[] = [];

  // Basic meta
  sections.push(`=== PAGE METADATA ===`);
  sections.push(`URL: ${data.url}`);
  sections.push(`Title: ${data.meta.title} (${data.meta.titleLength} chars)`);
  sections.push(
    `Description: ${data.meta.description} (${data.meta.descriptionLength} chars)`,
  );
  sections.push(`Canonical: ${data.meta.canonical || 'MISSING'}`);
  sections.push(`Robots: ${data.meta.robots || 'none set'}`);
  sections.push(`Language: ${data.meta.language || 'MISSING'}`);
  sections.push(`Charset: ${data.meta.charset}`);

  // Open Graph
  sections.push(`\n=== OPEN GRAPH ===`);
  sections.push(`og:title: ${data.og.title || 'MISSING'}`);
  sections.push(`og:description: ${data.og.description || 'MISSING'}`);
  sections.push(`og:image: ${data.og.image || 'MISSING'}`);
  if (data.og.imageWidth)
    sections.push(`og:image dimensions: ${data.og.imageWidth}x${data.og.imageHeight}`);
  sections.push(`og:type: ${data.og.type || 'MISSING'}`);

  // Twitter Card
  sections.push(`\n=== TWITTER CARD ===`);
  sections.push(`twitter:card: ${data.twitter.card || 'MISSING'}`);
  sections.push(`twitter:title: ${data.twitter.title || 'MISSING'}`);
  sections.push(`twitter:image: ${data.twitter.image || 'MISSING'}`);

  // Headings
  sections.push(`\n=== HEADING STRUCTURE ===`);
  if (data.headings.length === 0) {
    sections.push('No headings found');
  } else {
    data.headings.slice(0, 20).forEach((h) => {
      sections.push(`${'  '.repeat(h.level - 1)}${h.tag.toUpperCase()}: ${h.text}`);
    });
    if (data.headings.length > 20)
      sections.push(`... and ${data.headings.length - 20} more`);
  }

  // Content stats
  sections.push(`\n=== CONTENT ===`);
  sections.push(`Word count: ${data.wordCount}`);
  sections.push(
    `Reading time: ~${Math.ceil(data.wordCount / 200)} min`,
  );

  // Links summary
  const internalLinks = data.links.filter((l) => !l.isExternal);
  const externalLinks = data.links.filter((l) => l.isExternal);
  const nofollowLinks = data.links.filter((l) => l.isNofollow);
  sections.push(`\n=== LINKS ===`);
  sections.push(`Total: ${data.links.length}`);
  sections.push(`Internal: ${internalLinks.length}`);
  sections.push(`External: ${externalLinks.length}`);
  sections.push(`Nofollow: ${nofollowLinks.length}`);

  // Images summary
  const missingAlt = data.images.filter((i) => !i.alt);
  const missingDimensions = data.images.filter(
    (i) => i.width === null || i.height === null,
  );
  sections.push(`\n=== IMAGES ===`);
  sections.push(`Total: ${data.images.length}`);
  sections.push(`Missing alt: ${missingAlt.length}`);
  sections.push(`Missing dimensions: ${missingDimensions.length}`);

  // Structured data
  sections.push(`\n=== STRUCTURED DATA ===`);
  if (data.jsonLd.length === 0) {
    sections.push('No JSON-LD found');
  } else {
    data.jsonLd.forEach((j) => {
      sections.push(
        `Type: ${j.type || 'Unknown'} | Valid: ${j.isValid} ${j.errors.length > 0 ? `| Errors: ${j.errors.join(', ')}` : ''}`,
      );
    });
  }

  // Technical
  sections.push(`\n=== TECHNICAL ===`);
  sections.push(`HTTPS: ${data.technical.isHttps}`);
  sections.push(`Favicon: ${data.technical.favicon ? 'Present' : 'MISSING'}`);
  sections.push(
    `Hreflang tags: ${data.technical.hreflangTags.length > 0 ? data.technical.hreflangTags.map((t) => t.lang).join(', ') : 'None'}`,
  );

  return sections.join('\n');
}

/**
 * Build context from audit results for the fix generator.
 */
export function buildAuditContext(report: AuditReport): string {
  const issues = report.results.filter((r) => r.severity !== 'pass');
  if (issues.length === 0) return 'No issues found. Score: 100/100.';

  const sections = [`Overall score: ${report.score}/100\n`];

  const critical = issues.filter((r) => r.severity === 'critical');
  const warnings = issues.filter((r) => r.severity === 'warning');
  const infos = issues.filter((r) => r.severity === 'info');

  if (critical.length > 0) {
    sections.push('CRITICAL ISSUES:');
    critical.forEach((r) => sections.push(`- [${r.category}] ${r.message}`));
  }
  if (warnings.length > 0) {
    sections.push('\nWARNINGS:');
    warnings.forEach((r) => sections.push(`- [${r.category}] ${r.message}`));
  }
  if (infos.length > 0) {
    sections.push('\nINFO:');
    infos.forEach((r) => sections.push(`- [${r.category}] ${r.message}`));
  }

  return sections.join('\n');
}
