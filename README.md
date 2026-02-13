<p align="center">
  <img src="public/icon/icon.svg" width="80" height="80" alt="Argus logo" />
</p>

<h1 align="center">Argus by Pixelesq</h1>

<p align="center">
  <strong>The all-seeing SEO inspector for Chrome.</strong><br/>
  Extract meta tags. Audit SEO health. Get AI-powered insights. All in one click.
</p>

<p align="center">
  <a href="https://pixelesq.com?utm_source=github&utm_medium=readme&utm_campaign=argus">Website</a> &middot;
  <a href="#install">Install</a> &middot;
  <a href="#features">Features</a> &middot;
  <a href="#ai-insights">AI Insights</a>
</p>

---

## Why Argus?

Named after **Argus Panoptes** — the hundred-eyed giant of Greek mythology who sees everything — Argus gives you instant, complete visibility into any webpage's SEO setup.

No more juggling browser dev tools, bookmarklets, and third-party crawlers. Open the side panel, and everything is right there.

**Built for SEO professionals, marketers, developers, and content teams** who need to quickly inspect and validate on-page SEO without leaving the browser.

---

## Features

### Extract — Every tag, one click

Open the **Extract** tab and instantly see everything search engines see:

- **Title & meta description** with character count indicators (green = optimal, amber = needs attention)
- **Open Graph tags** with a live social preview card showing how your page looks when shared on Facebook/LinkedIn
- **Twitter Card tags** with a live Twitter preview card
- **JSON-LD structured data** with syntax-highlighted pretty print, schema type badges, and validation status
- **Heading hierarchy** visualized as a tree — spot skipped levels at a glance
- **Link summary** — internal, external, and nofollow counts with full expandable list
- **Image audit** — total count, missing alt text, missing dimensions, lazy loading status

**One-click copy** — click any field value to copy it. Export the entire page as **JSON** or a formatted **text table** for reports and docs.

### Audit — Know your score in seconds

The **Audit** tab runs **40+ SEO checks** across 10 categories and gives you a weighted score from 0 to 100:

| Category | What's checked |
|---|---|
| **Title** | Existence, length (30-60 chars), OG title consistency |
| **Description** | Existence, length (70-160 chars), OG description consistency |
| **Headings** | H1 presence, single H1, hierarchy integrity, empty headings |
| **Images** | Alt text coverage, explicit dimensions (CLS prevention), lazy loading, modern formats |
| **Links** | Descriptive anchor text, empty hrefs, internal link density |
| **Technical** | Canonical URL, robots/noindex detection, HTTPS, viewport, lang attribute, hreflang |
| **Structured Data** | JSON-LD presence, validity, schema types, breadcrumb markup |
| **Social** | OG tags, OG image + dimensions, Twitter card, Twitter image |
| **Content** | Word count (thin content detection), reading time estimate |
| **Performance** | LCP, INP, CLS, TTFB (via Web Vitals when available) |

Every issue is categorized as **critical**, **warning**, or **info** with a clear explanation and fix guidance. Category scores are weighted to reflect real-world SEO impact.

### AI Insights — On-device, private, instant

The **Insights** tab uses **Chrome's built-in Gemini Nano** — a large language model that runs entirely on your device. No data leaves your browser. No API keys. No usage limits.

**Automatic analysis** when you open the tab:
- **Page Classification** — what the page is about, who it targets, and what the search intent is
- **Meta Description Assessment** — quality evaluation of your current meta description
- **Content Quality Analysis** — thin content signals, keyword usage, actionable improvements

**On-demand AI actions:**
- **Rewrite Meta Description** — generates an optimized 140-155 character meta description
- **Improve Title** — suggests a better, keyword-front-loaded title tag
- **Suggest FAQ Schema** — generates 3-5 FAQ questions and answers ready for FAQ schema markup
- **Recommend Schema Types** — suggests which Schema.org types to add based on your page content

> **No Gemini Nano?** No problem. The tab gracefully falls back to a **static analysis** with content assessment, missing meta tag checklist, and rule-based schema recommendations.

---

<h2 id="install">Install</h2>

### From Chrome Web Store

*(Coming soon)*

### Manual Install (Developer Mode)

1. Download or clone this repository
2. Install dependencies and build:
   ```bash
   npm install
   npm run build
   ```
3. Open **chrome://extensions/** in Chrome
4. Enable **Developer mode** (toggle in the top right)
5. Click **Load unpacked**
6. Select the `.output/chrome-mv3` folder (press **Cmd+Shift+.** on Mac to reveal hidden folders)
7. Click the **Argus** icon in your toolbar — the side panel opens
8. Navigate to any webpage and start inspecting

### Enable AI Insights (optional)

Gemini Nano requires Chrome 137+ and a one-time setup:

1. Go to `chrome://flags/#prompt-api-for-gemini-nano`
2. Set to **Enabled**
3. Restart Chrome
4. The model downloads automatically (~2.4 GB, one-time)

---

## How It Works

Argus runs **entirely client-side** — no network calls, no analytics, no data collection.

- A **content script** is injected into each page to extract DOM data (meta tags, headings, links, images, JSON-LD, Web Vitals)
- The **side panel UI** communicates with the content script via Chrome's message passing API
- The **audit engine** runs 40+ rule-based checks with weighted scoring
- **AI insights** use Chrome's built-in Gemini Nano model — everything stays on your device

### Privacy

Argus does not:
- Send any data to external servers
- Include analytics or tracking
- Collect or store browsing history
- Make any network requests (except the optional HTTP HEAD for response headers)

Your page data never leaves your browser.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [WXT](https://wxt.dev) (Vite-based extension framework) |
| UI | React 18 + TailwindCSS |
| Language | TypeScript |
| Manifest | Chrome Extension Manifest V3 |
| AI | Chrome Built-in AI Prompt API (Gemini Nano) |
| Icons | [Lucide](https://lucide.dev) |

---

## Development

```bash
# Install dependencies
npm install

# Start dev server with hot reload
npm run dev

# Production build
npm run build

# Create zip for Chrome Web Store
npm run zip
```

---

## About Pixelesq

Argus is built by **[Pixelesq](https://pixelesq.com)** — an AI-native platform that automates meta tags, structured data, and SEO optimization across all your pages.

If Argus finds issues on your site, [Pixelesq can fix them automatically](https://pixelesq.com?utm_source=github&utm_medium=readme&utm_campaign=argus_about).

---

<p align="center">
  <sub>Built with care by <a href="https://pixelesq.com">Pixelesq</a></sub>
</p>
