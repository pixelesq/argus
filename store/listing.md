# Chrome Web Store Listing — Argus by Pixelesq

## Name (45 chars max)
Argus by Pixelesq — SEO Inspector & AI Auditor

## Short Description (132 chars max)
SEO auditor with Claude Opus 4.6 + Gemini Nano AI. 40+ checks, weighted scoring, social previews, and an MCP server for Claude Code.

## Category
Developer Tools

## Language
English

---

## Detailed Description (for Chrome Web Store listing page)

Argus is the all-seeing SEO inspector — named after the hundred-eyed giant of Greek mythology. Open the side panel on any page to instantly extract every meta tag, audit SEO health with 40+ checks, and get AI-powered recommendations from Claude Opus 4.6 or Chrome's built-in Gemini Nano.

NEW: Argus now ships with a three-tier AI system — bring your own Claude API key for Opus 4.6 deep analysis, use Chrome's on-device Gemini Nano, or fall back to rule-based static analysis. Plus, the same audit engine is available as an MCP server (@pixelesq/argus-mcp) so Claude Code, Cursor, and Windsurf can audit SEO directly from the terminal.

🔍 EXTRACT — See everything search engines see
• Title tag with character count (green = optimal, amber = outside range)
• Meta description with length indicator
• Full Open Graph tags with a live social share preview card
• Twitter Card tags with a live Twitter preview
• JSON-LD structured data with syntax highlighting, type badges, and validation
• Heading hierarchy visualized as an indented tree
• Link summary — internal, external, nofollow counts
• Image audit — missing alt text, missing dimensions, lazy loading
• One-click copy for every field. Export as JSON or formatted text table.

📊 AUDIT — Know your score in seconds
Argus runs 40+ rule-based SEO checks across 10 categories and generates a weighted score from 0 to 100:
• Title — existence, length, OG consistency
• Description — existence, length, OG consistency
• Headings — H1 presence, single H1, hierarchy, empty headings
• Images — alt text, dimensions (CLS), lazy loading, modern formats
• Links — anchor text quality, empty hrefs, internal link density
• Technical — canonical, robots/noindex, HTTPS, viewport, lang, hreflang
• Structured Data — JSON-LD presence, validity, schema types, breadcrumbs
• Social — Open Graph, Twitter Card, image sizes
• Content — word count, thin content detection, reading time
• Performance — LCP, INP, CLS, TTFB via Web Vitals

Every issue is labeled critical, warning, or info with a clear explanation.

🤖 AI INSIGHTS — Three-Tier AI System
Argus offers three levels of AI analysis that activate automatically based on what's available:

Tier 1: Claude Opus 4.6 (BYOK — Bring Your Own Key)
Add your Anthropic API key in Settings to unlock the most powerful analysis. Opus 4.6 receives the full page extraction — meta tags, headings, links, images, structured data, and audit results — for deep, nuanced recommendations. Streaming responses appear in real time. Your key is stored locally in chrome.storage.local, never synced, and calls go direct from your browser to api.anthropic.com.

Claude-exclusive features:
• SEO Strategy Brief — prioritized action plan with critical issues, quick wins, strategic opportunities, and competitive edge tactics
• Generate Schema Markup — complete, ready-to-paste JSON-LD generated from your page content
• Technical Fixes — exact HTML code fixes for every audit issue, ready to drop into your <head>
• Content Gap Analysis — identifies missing sections and topics that top-ranking pages cover
• Competitor Insights — what top pages in your space do differently (content depth, E-E-A-T, schema, internal linking)

Tier 2: Gemini Nano (on-device, no API key needed)
When Chrome's built-in model is available, Argus automatically runs:
• Page classification — what the page is about and its search intent
• Meta description assessment — evaluates quality and suggests improvements
• Content quality — identifies thin content signals and opportunities

Tier 3: Static Analysis (always available, no AI required)
Content assessment, missing meta tag checklist, and rule-based schema recommendations. Works offline, on any Chrome version.

Shared AI actions (available with both Claude and Gemini):
• Rewrite meta description (optimized 140-155 chars with CTA)
• Improve title tag (keyword-front-loaded, 50-60 chars)
• Generate FAQ schema questions and answers
• Recommend Schema.org types for your page

🖥️ MCP SERVER — SEO in your terminal
Argus also ships as @pixelesq/argus-mcp, an MCP server that gives Claude Code, Cursor, and Windsurf four SEO tools:
• seo_audit — full audit with 0-100 score
• extract_meta — all meta tags, OG, Twitter, JSON-LD, headings, links, images
• compare_seo — side-by-side competitive analysis of 2-5 URLs
• extract_json — raw data as JSON for CI/CD pipelines and scripts

One command to install: claude mcp add argus-seo -- npx -y @pixelesq/argus-mcp

🔒 PRIVACY
Core extraction and auditing are fully client-side — no analytics, no tracking, no data collection.

AI calls are optional and transparent:
• Claude Opus: If you add an API key, requests go directly from your browser to api.anthropic.com. Your key never leaves your device. No data is routed through Pixelesq servers.
• Gemini Nano: Runs entirely on-device. No network calls.
• No AI: All extraction and audit features work with zero network requests.

⚡ BUILT FOR SPEED
• Side panel UI — stays open as you browse, auto-refreshes on tab switch
• Dark theme optimized for inspector workflows
• Lightweight — no bloat
• No external fonts or CDN dependencies
• Claude responses stream in real time via SSE

Built by Pixelesq — the AI-native platform for automated SEO optimization.

---

## Single Purpose Description (required for Chrome Web Store review)

This extension extracts SEO metadata from the currently active webpage and displays it in a side panel. It reads meta tags, Open Graph tags, Twitter Card tags, JSON-LD structured data, headings, links, and images from the page DOM. It then runs rule-based SEO audits on the extracted data. If the user provides a Claude API key or has Chrome's built-in Gemini Nano model available, the extension provides AI-generated recommendations for improving the page's SEO. Claude API calls are made directly from the browser to api.anthropic.com when the user opts in by entering their API key. The API key is stored locally in chrome.storage.local. Gemini Nano processing runs entirely on-device. All other processing occurs locally in the browser.

---

## Privacy Policy URL
https://pixelesq.com/privacy

## Website URL
https://www.getargus.app

## Support URL
https://pixelesq.com/support
