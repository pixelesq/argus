# Argus Marketing Website — SEO & Meta Configuration

This file contains the recommended meta tags, Open Graph tags, Twitter Card tags, and JSON-LD structured data for each page. Implement these in the `<head>` of each page.

---

## Global / Shared

### Favicon
```html
<link rel="icon" type="image/svg+xml" href="/icon.svg" />
<link rel="icon" type="image/png" sizes="32x32" href="/icon/32.png" />
<link rel="apple-touch-icon" sizes="128x128" href="/icon/128.png" />
```

### Shared Meta
```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="theme-color" content="#6366f1" />
<meta name="author" content="Pixelesq" />
<link rel="canonical" href="https://argus.pixelesq.com{current_path}" />
```

### Organization JSON-LD (include on every page)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Pixelesq",
  "url": "https://pixelesq.com",
  "logo": "https://argus.pixelesq.com/icon/128.png",
  "sameAs": [
    "https://twitter.com/pixelesq",
    "https://github.com/pixelesq"
  ]
}
```

### SoftwareApplication JSON-LD (include on Home, Features, Guide)
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Argus by Pixelesq",
  "applicationCategory": "BrowserApplication",
  "operatingSystem": "Chrome",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Free Chrome extension that extracts meta tags, audits SEO health with 40+ checks, and provides AI-powered insights using on-device Gemini Nano.",
  "softwareVersion": "1.0.0",
  "author": {
    "@type": "Organization",
    "name": "Pixelesq",
    "url": "https://pixelesq.com"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "ratingCount": "1",
    "bestRating": "5"
  }
}
```

> **Note:** Update the `aggregateRating` once you have real Chrome Web Store reviews. Remove it entirely until you have at least a few genuine reviews.

---

## Per-Page SEO Configuration

### Home (/)

```html
<title>Argus — Free SEO Chrome Extension | Meta Tag Extractor & AI Auditor</title>
<meta name="description" content="Argus is a free Chrome extension that extracts meta tags, audits SEO health with 40+ checks, and provides AI-powered insights using on-device Gemini Nano. By Pixelesq." />
<meta name="keywords" content="SEO chrome extension, meta tag extractor, SEO audit tool, chrome SEO inspector, meta tag checker, free SEO tool, AI SEO extension, Gemini Nano SEO" />
<meta name="robots" content="index, follow" />

<meta property="og:title" content="Argus — Free SEO Chrome Extension by Pixelesq" />
<meta property="og:description" content="Extract meta tags, audit SEO health, and get AI-powered insights. The all-seeing SEO inspector for Chrome." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://argus.pixelesq.com/" />
<meta property="og:image" content="https://argus.pixelesq.com/og/home.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name" content="Argus by Pixelesq" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Argus — Free SEO Chrome Extension by Pixelesq" />
<meta name="twitter:description" content="Extract meta tags, audit SEO health, and get AI-powered insights. The all-seeing SEO inspector for Chrome." />
<meta name="twitter:image" content="https://argus.pixelesq.com/og/home.png" />
<meta name="twitter:site" content="@pixelesq" />
```

### Features (/features)

```html
<title>Argus Features — Meta Tag Extraction, SEO Audit, AI Insights | Chrome Extension</title>
<meta name="description" content="Explore Argus features: extract Open Graph, Twitter Cards, JSON-LD, and all meta tags. Run 40+ SEO audit checks. Get AI-powered title and description rewrites with Gemini Nano." />

<meta property="og:title" content="Argus Features — Everything You Need for On-Page SEO" />
<meta property="og:description" content="Meta tag extraction, 40+ SEO checks, JSON-LD validation, social previews, heading analysis, and AI-powered insights. All in one Chrome extension." />
<meta property="og:url" content="https://argus.pixelesq.com/features" />
<meta property="og:image" content="https://argus.pixelesq.com/og/features.png" />
```

### Guide (/guide)

```html
<title>How to Use Argus — Installation Guide & SEO Inspector Tutorial</title>
<meta name="description" content="Learn how to install and use Argus, the free SEO Chrome extension. Step-by-step guide covering meta tag extraction, SEO auditing, AI insights setup, and pro tips for SEO professionals." />

<meta property="og:title" content="Argus Guide — Install & Use the All-Seeing SEO Inspector" />
<meta property="og:description" content="Step-by-step guide to installing Argus, using all three tabs, enabling AI insights with Gemini Nano, and getting the most out of your SEO workflow." />
<meta property="og:url" content="https://argus.pixelesq.com/guide" />
<meta property="og:image" content="https://argus.pixelesq.com/og/guide.png" />
```

### Compare (/compare)

```html
<title>Argus vs SEO Meta in 1 Click vs Detailed SEO Extension — Best SEO Chrome Extensions Compared</title>
<meta name="description" content="Compare Argus with SEO Meta in 1 Click, Detailed SEO Extension, and META SEO Inspector. See which free Chrome SEO extension offers the best meta tag extraction, auditing, and AI features." />

<meta property="og:title" content="Best SEO Chrome Extensions Compared — Argus vs Competitors" />
<meta property="og:description" content="Side-by-side comparison of Argus, SEO Meta in 1 Click, Detailed SEO Extension, and META SEO Inspector. Features, scoring, AI, privacy." />
<meta property="og:url" content="https://argus.pixelesq.com/compare" />
<meta property="og:image" content="https://argus.pixelesq.com/og/compare.png" />
```

### FAQ (/faq)

```html
<title>Argus FAQ — Common Questions About the SEO Chrome Extension</title>
<meta name="description" content="Frequently asked questions about Argus, the free SEO Chrome extension. Learn about installation, features, AI insights, privacy, compatibility, and more." />

<meta property="og:title" content="Argus FAQ — Everything You Need to Know" />
<meta property="og:description" content="Answers to the most common questions about Argus: installation, features, AI insights, privacy, and compatibility." />
<meta property="og:url" content="https://argus.pixelesq.com/faq" />
<meta property="og:image" content="https://argus.pixelesq.com/og/faq.png" />
```

### By Pixelesq (/pixelesq)

```html
<title>About Pixelesq — The AI-Native SEO Platform Behind Argus</title>
<meta name="description" content="Pixelesq is the AI-native platform for automated SEO optimization. Learn how Pixelesq builds tools like Argus to make SEO accessible, automated, and intelligent." />

<meta property="og:title" content="Pixelesq — AI-Native SEO Optimization Platform" />
<meta property="og:description" content="The team behind Argus. Pixelesq automates meta tags, structured data, and SEO optimization across all your pages." />
<meta property="og:url" content="https://argus.pixelesq.com/pixelesq" />
<meta property="og:image" content="https://argus.pixelesq.com/og/pixelesq.png" />
```

---

## OG Image Specs

Create OG images at **1200x630 pixels** for each page:

| Page | Image concept |
|---|---|
| Home | Argus eye logo centered, tagline "The all-seeing SEO inspector", dark bg (#0f172a) |
| Features | Split view showing Extract/Audit/Insights tabs, feature highlights |
| Guide | Step numbers 1-2-3 with extension icon, "Get started in 30 seconds" |
| Compare | Comparison table preview with Argus highlighted as winner |
| FAQ | Question mark motif with Argus branding |
| Pixelesq | Pixelesq logo + "AI-Native SEO Platform" |

Background: `#0f172a` (slate-900), accent: `#818cf8` (indigo-400), text: `#f8fafc` (slate-50)
