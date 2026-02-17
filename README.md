<p align="center">
  <img src="public/icon/icon.svg" width="80" height="80" alt="Argus logo" />
</p>

<h1 align="center">Argus</h1>

<p align="center">
  <strong>The all-seeing, AI-powered SEO inspector.</strong><br/>
  A free Chrome extension + MCP server that brings enterprise-level SEO auditing to everyone — powered by Claude Opus 4.6.
</p>

<p align="center">
  <a href="#features">Features</a> &middot;
  <a href="#install">Install</a> &middot;
  <a href="#opus-46-integration">Opus 4.6 Integration</a> &middot;
  <a href="#mcp-server">MCP Server</a> &middot;
  <a href="#architecture">Architecture</a>
</p>

---

## The Problem

Enterprise SEO tools cost $100-300/month. SEO expertise is locked behind years of specialist knowledge. Most free tools only scratch the surface.

**Argus breaks these barriers.** It's a completely free, open-source Chrome extension that gives you instant, deep SEO analysis on any webpage — powered by Claude Opus 4.6 for AI insights that rival expensive platforms.

---

## Features

### Three-Tab Architecture

**Extract** — Every SEO tag at a glance
- Title, meta description, canonical, robots (with character count badges)
- Open Graph & Twitter Card tags with **live social preview cards**
- JSON-LD structured data with syntax highlighting and validation
- Heading hierarchy as a visual tree
- Link analysis (internal/external/nofollow counts)
- Image audit (missing alt text, dimensions, lazy loading, modern formats)
- One-click copy and full JSON/text export

**Audit** — 40+ rule-based SEO checks
- Weighted scoring (0-100) across 10 categories
- Categories: title, description, headings, images, links, technical, structured data, social, content, performance
- Color-coded severity (critical/warning/info/pass) with fix guidance
- Real Web Vitals: LCP, INP, CLS, TTFB via PerformanceObserver API

**Insights** — AI-powered deep analysis
- Three-tier AI provider system with automatic fallback
- Automatic page classification, content quality, and SEO strategy analysis
- On-demand: rewrite meta descriptions, improve titles, suggest FAQ schema, generate schema markup
- Opus 4.6 exclusive: SEO strategy brief, technical fixes, content gap analysis, competitor insights

---

<h2 id="opus-46-integration">Opus 4.6 Integration</h2>

Argus uses Claude Opus 4.6 as its primary AI engine via a **BYOK (Bring Your Own Key)** architecture:

### Three-Tier AI Provider System

| Tier | Provider | How It Works |
|------|----------|-------------|
| **1 (Primary)** | Claude Opus 4.6 | User provides their API key (stored locally, never synced). Direct `fetch()` from the side panel to `api.anthropic.com` with streaming SSE. |
| **2 (Fallback)** | Gemini Nano | Chrome's on-device AI model. No API key, no network — runs locally. |
| **3 (Always Available)** | Static Analysis | Rule-based analysis — works offline with zero dependencies. |

### Opus 4.6 Exclusive Features

When Claude is configured, Argus unlocks advanced analysis that smaller models can't handle:

- **SEO Strategy Brief** — Comprehensive prioritized action plan analyzing ALL extracted data (meta, headings, links, images, schema, technical signals) plus audit results
- **Schema Markup Generator** — Generates complete, valid JSON-LD ready to paste into your page
- **Technical Fix Generator** — Produces exact HTML code fixes for every audit issue
- **Content Gap Analysis** — Identifies missing sections based on page type and heading structure
- **Competitor Insights** — E-E-A-T signals, featured snippet optimization, and advanced tactics

### Why BYOK?

- **Privacy** — Your API key never leaves your browser (stored in `chrome.storage.local`)
- **No backend** — Direct browser-to-API calls, no proxy server
- **No cost to us** — Users control their own usage
- **Graceful degradation** — Works perfectly without any API key (Gemini Nano or static analysis)

### API Architecture

```
Side Panel (React)
    │
    ├─ Has Claude key? → fetch('https://api.anthropic.com/v1/messages')
    │                     with streaming SSE, max_tokens: 2048
    │
    ├─ Gemini Nano available? → Chrome Built-in AI Prompt API (on-device)
    │
    └─ Neither? → Static rule-based analysis (always works)
```

---

<h2 id="mcp-server">MCP Server — SEO Auditing in Your Terminal</h2>

Argus includes a **Model Context Protocol (MCP) server** that brings SEO auditing directly into Claude Code. Developers can audit any webpage's SEO without leaving their terminal.

### Tools

| Tool | Description |
|------|-------------|
| `seo_audit` | Full 40+ rule audit with weighted scoring |
| `extract_meta` | Extract all meta tags, OG, Twitter, JSON-LD, headings, links, images |
| `compare_seo` | Side-by-side comparison of 2-5 URLs |
| `extract_json` | Raw extraction + audit data as JSON for programmatic use |

### Setup

```bash
# Build the MCP server
cd mcp-server && npm install && npm run build

# Add to Claude Code
claude mcp add argus-seo -- node mcp-server/build/index.js
```

Or drop a `.mcp.json` in any project:
```json
{
  "mcpServers": {
    "argus-seo": {
      "command": "node",
      "args": ["path/to/argus/mcp-server/build/index.js"]
    }
  }
}
```

### Shared Audit Engine

The MCP server shares the same audit engine as the Chrome extension. The audit rules are pure functions that take a `PageExtraction` data structure — they work identically in both browser and Node.js runtimes.

```
Chrome Extension                    MCP Server
─────────────                       ──────────
content.ts (DOM APIs)               fetch() + cheerio (HTML parsing)
        ↓                                   ↓
   PageExtraction ◄───── SAME TYPE ─────► PageExtraction
        ↓                                   ↓
   auditors/engine.ts  ◄── SHARED CODE ──► auditors/engine.ts
        ↓                                   ↓
   AuditReport                          AuditReport (returned via MCP)
```

---

<h2 id="install">Install</h2>

### Chrome Extension

1. Clone and build:
   ```bash
   git clone https://github.com/pixelesq/argus.git
   cd argus
   npm install
   npm run build
   ```
2. Open `chrome://extensions/`, enable **Developer mode**
3. Click **Load unpacked**, select `.output/chrome-mv3`
4. Click the Argus icon — the side panel opens

### Configure AI (Optional)

**Claude Opus 4.6:** Click the gear icon in the Insights tab → enter your API key from [console.anthropic.com](https://console.anthropic.com/settings/keys)

**Gemini Nano:** Requires Chrome 138+. Enable `chrome://flags/#prompt-api-for-gemini-nano`, restart Chrome.

---

<h2 id="architecture">Architecture</h2>

### Tech Stack

| Layer | Technology |
|---|---|
| Extension Framework | [WXT](https://wxt.dev) (Vite-based) |
| UI | React 19 + TailwindCSS 4 |
| Language | TypeScript (strict) |
| Manifest | Chrome Extension Manifest V3 |
| AI (Cloud) | Claude Opus 4.6 via Messages API |
| AI (On-Device) | Chrome Built-in AI (Gemini Nano) |
| MCP Server | @modelcontextprotocol/sdk + cheerio |
| Icons | [Lucide React](https://lucide.dev) |

### Project Structure

```
argus/
├── entrypoints/              # Chrome extension entry points
│   ├── background.ts         # Service worker (side panel + headers)
│   ├── content.ts            # Content script (DOM extraction)
│   └── sidepanel/            # React side panel UI
│       ├── App.tsx
│       ├── tabs/             # Extract, Audit, Insights
│       └── components/       # UI components
├── lib/                      # Core business logic
│   ├── ai/                   # AI provider system
│   │   ├── claude.ts         # Claude Opus 4.6 API client
│   │   ├── gemini.ts         # Gemini Nano client
│   │   ├── provider.ts       # Unified provider with fallback
│   │   ├── prompts.ts        # System prompts (standard + Opus-enhanced)
│   │   └── settings.ts       # API key management
│   ├── auditors/             # Audit engine (shared with MCP)
│   │   ├── engine.ts         # Orchestration
│   │   ├── scoring.ts        # Weighted scoring algorithm
│   │   └── rules/            # 40+ audit rules across 10 categories
│   └── extractors/           # DOM-based data extraction
├── mcp-server/               # MCP server for Claude Code
│   ├── src/
│   │   ├── index.ts          # Server + tools
│   │   └── extractor.ts      # cheerio-based HTML extraction
│   └── package.json
└── .mcp.json                 # MCP config for Claude Code
```

### Privacy

- **No analytics, no tracking, no data collection**
- The extension makes zero network requests except:
  1. (Optional) HEAD request for HTTP response headers
  2. (Optional) Claude API calls — only when user provides their own key, direct to Anthropic
- Gemini Nano runs entirely on-device
- API keys stored in `chrome.storage.local` (device-local, never synced)

---

## Development

```bash
# Extension dev server (hot reload)
npm run dev

# Production build
npm run build

# MCP server
cd mcp-server && npm install && npm run build
```

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

<p align="center">
  <sub>Built for the <strong>Built with Opus 4.6: a Claude Code Hackathon</strong></sub>
</p>
