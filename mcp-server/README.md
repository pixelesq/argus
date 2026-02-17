# @pixelesq/argus-mcp

**SEO auditing for your terminal.** Give Claude Code, Cursor, Windsurf, or any MCP-compatible client the ability to audit, extract, and compare SEO data from any webpage.

Built on the same 40+ rule audit engine that powers the [Argus Chrome Extension](https://www.getargus.app).

---

## Quick Start

### Claude Code

```bash
claude mcp add argus-seo -- npx -y @pixelesq/argus-mcp
```

Or add to your project's `.mcp.json`:

```json
{
  "mcpServers": {
    "argus-seo": {
      "command": "npx",
      "args": ["-y", "@pixelesq/argus-mcp"]
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json` in your project root:

```json
{
  "mcpServers": {
    "argus-seo": {
      "command": "npx",
      "args": ["-y", "@pixelesq/argus-mcp"]
    }
  }
}
```

### Windsurf

Add to your Windsurf MCP config:

```json
{
  "mcpServers": {
    "argus-seo": {
      "command": "npx",
      "args": ["-y", "@pixelesq/argus-mcp"]
    }
  }
}
```

### Global Install (any client)

```bash
npm install -g @pixelesq/argus-mcp
```

Then reference the binary directly:

```json
{
  "mcpServers": {
    "argus-seo": {
      "command": "argus-mcp"
    }
  }
}
```

---

## Tools

Once connected, your AI client can use four tools:

### `seo_audit`

Run a full SEO audit on any URL. Returns a weighted score out of 100 with detailed findings across 10 categories.

**Parameters:**
- `url` (string, required) — The URL to audit

**Example prompt:** "Audit the SEO of https://example.com"

**Example output:**
```
# SEO Audit Report: https://example.com
Overall Score: 72/100

## Category Scores
- title: 85/100 [PASS]
- description: 70/100 [WARN]
- headings: 100/100 [PASS]
- images: 45/100 [FAIL]
- links: 80/100 [PASS]
- technical: 90/100 [PASS]
- structured-data: 25/100 [FAIL]
- social: 60/100 [WARN]
- content: 85/100 [PASS]
- performance: 70/100 [WARN]

## Critical Issues
- [images] 4 images missing alt text
- [structured-data] No JSON-LD structured data found

## Warnings
- [description] Meta description is 168 characters (recommended: 70-160)
- [social] Missing og:image tag
...
```

### `extract_meta`

Extract all SEO-relevant data from a page: meta tags, Open Graph, Twitter Card, JSON-LD, headings, links, and images.

**Parameters:**
- `url` (string, required) — The URL to extract from

**Example prompt:** "Extract all meta tags from https://example.com"

**Example output:**
```
# Meta Tag Extraction: https://example.com

## Basic Meta
- Title: Example Domain (14 chars)
- Description: This is an example... (52 chars)
- Canonical: https://example.com
- Robots: index, follow
- Language: en

## Open Graph
- og:title: Example Domain
- og:description: This is an example...
- og:image: https://example.com/og.png

## Twitter Card
- twitter:card: summary_large_image
- twitter:title: Example Domain

## Content
- Word count: 1,247
- Headings: 8
- Images: 12 (3 missing alt)
- Links: 34 (8 external)

## Heading Structure
- H1: Example Domain
  - H2: About
    - H3: Our Mission
  - H2: Services
...
```

### `compare_seo`

Compare SEO scores and meta tags across 2–5 URLs side by side. Great for competitive analysis.

**Parameters:**
- `urls` (string[], required) — 2 to 5 URLs to compare

**Example prompt:** "Compare SEO of our homepage vs our competitor's homepage"

**Example output:**
```
# SEO Comparison Report

## Overall Scores
- https://yoursite.com: 82/100
- https://competitor.com: 74/100

## Category Breakdown
### title
- https://yoursite.com: 100/100
- https://competitor.com: 70/100

### structured-data
- https://yoursite.com: 90/100
- https://competitor.com: 25/100
...

## Key Differences
- Best performing: https://yoursite.com (82/100)
- Lowest performing: https://competitor.com (74/100)
- Score gap: 8 points
```

### `extract_json`

Get raw extraction + audit data as JSON. Useful for piping into scripts or further processing.

**Parameters:**
- `url` (string, required) — The URL to extract from

**Example prompt:** "Get raw SEO data as JSON for https://example.com"

Returns the full `PageExtraction` and `AuditReport` objects as JSON.

---

## Audit Categories

40+ rules across 10 weighted categories:

| Category | Weight | Rules | Checks |
|----------|--------|-------|--------|
| **Technical** | 18 | 8 | Canonical, robots, HTTPS, viewport, lang, hreflang, x-robots-tag |
| **Performance** | 13 | 4 | LCP, INP, CLS, TTFB thresholds |
| **Title** | 12 | 3 | Exists, length (30–60 chars), title/OG match |
| **Description** | 10 | 3 | Exists, length (70–160 chars), description/OG match |
| **Structured Data** | 10 | 4 | JSON-LD exists, valid JSON, schema type, BreadcrumbList |
| **Headings** | 8 | 4 | H1 exists, single H1, hierarchy, no empty headings |
| **Images** | 8 | 4 | Alt text, explicit dimensions, lazy loading, modern formats |
| **Social** | 8 | 5 | OG tags, og:image, og:image size, Twitter Card, Twitter image |
| **Content** | 8 | 2 | Word count (300+), reading time |
| **Links** | 5 | 3 | Descriptive anchors, no empty links, internal link count |

### Scoring

- **Critical** issue: −30 points in its category
- **Warning**: −15 points
- **Info**: −5 points
- **Pass**: 0 (no penalty)

Category scores are weighted and combined into a single 0–100 overall score.

---

## How It Works

The MCP server uses the same audit engine as the Argus Chrome extension:

1. **Fetches** the page HTML via Node.js `fetch`
2. **Parses** the DOM using [cheerio](https://github.com/cheeriojs/cheerio) (same data extraction as the Chrome extension's content script, different runtime)
3. **Runs** all 40+ audit rules (pure functions shared with the extension)
4. **Returns** formatted results via MCP's stdio transport

No browser required. No headless Chrome. Just HTML parsing and rule evaluation.

---

## Requirements

- Node.js 18+
- An MCP-compatible client (Claude Code, Cursor, Windsurf, etc.)

---

## Related

- [Argus Chrome Extension](https://www.getargus.app) — The browser extension with the same audit engine plus AI-powered insights via Claude Opus 4.6 and Gemini Nano
- [Chrome Web Store](https://chromewebstore.google.com/detail/argus) — Install the extension
- [GitHub](https://github.com/ArslanYM/argus) — Source code

---

## License

MIT — free to use, modify, and distribute.

Built by [Pixelesq](https://pixelesq.com).
