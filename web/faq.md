# Argus — FAQ Page Content

> **Note for developers:** This file contains the body content for the FAQ page at `/faq`. Meta tags, Open Graph, Twitter Card, and JSON-LD page-level configuration are in `seo-config.md`. The FAQPage JSON-LD schema below should be injected into the `<head>` alongside the Organization schema. Each section is clearly delimited with HTML comments and markdown headings so you can map them directly to components.

---

<!-- ========== SECTION: HERO ========== -->

## Frequently Asked Questions

**Got questions about the Argus Chrome extension? We have answers.**

Whether you want to know how to check meta tags, understand how the SEO audit scoring works, or learn about Gemini Nano AI insights, this Argus Chrome extension FAQ covers everything. Browse by category or search for your specific question.

<!-- End Hero -->

---

<!-- ========== SECTION: FAQ JSON-LD SCHEMA ========== -->

## FAQPage JSON-LD Schema

> **Developer note:** Inject this JSON-LD into the `<head>` of the `/faq` page. This is required for FAQ rich results in Google Search. Every question and answer on this page is included.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Argus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Argus is a free Chrome extension built by Pixelesq that extracts meta tags, runs 40+ SEO audit checks, and provides AI-powered insights — all within your browser. It opens as a side panel alongside any webpage, giving you instant visibility into title tags, meta descriptions, Open Graph tags, Twitter Cards, JSON-LD structured data, heading hierarchy, links, and images. The AI features are powered by Chrome's built-in Gemini Nano model, so your data never leaves your device."
      }
    },
    {
      "@type": "Question",
      "name": "Is Argus free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Argus is completely free — not freemium, not a trial. Every feature including meta tag extraction, the full SEO audit with 40+ checks, social share previews, and AI-powered insights is available from the moment you install. There are no premium tiers, no account requirements, and no feature gates."
      }
    },
    {
      "@type": "Question",
      "name": "Who makes Argus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Argus is built by Pixelesq, a team focused on AI-native SEO optimization. Pixelesq builds tools that make technical SEO accessible and automated. Argus is open source and available on GitHub."
      }
    },
    {
      "@type": "Question",
      "name": "Why is it called Argus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Argus is named after Argus Panoptes from Greek mythology, a giant with one hundred eyes who could see everything. The name reflects the extension's purpose: to give you all-seeing visibility into every SEO signal on a page — meta tags, structured data, audit issues, and AI insights — so nothing escapes your attention."
      }
    },
    {
      "@type": "Question",
      "name": "What browsers does Argus support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Argus is currently available for Google Chrome. It uses Chrome-specific APIs including the Side Panel API and Chrome's built-in AI (Gemini Nano), so it is not compatible with Firefox, Safari, or Edge at this time. Chromium-based browsers like Brave or Vivaldi may work for core features, but AI insights require Chrome's native Gemini Nano integration."
      }
    },
    {
      "@type": "Question",
      "name": "How do I install Argus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Visit the Chrome Web Store, search for 'Argus by Pixelesq,' and click 'Add to Chrome.' The installation takes seconds and requires no signup or configuration. Once installed, the Argus icon appears in your browser toolbar and you can start inspecting any page immediately."
      }
    },
    {
      "@type": "Question",
      "name": "How do I open Argus after installing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Click the Argus icon in your Chrome toolbar. The extension opens as a side panel alongside your current page — no popups or new tabs. If you don't see the icon, click the puzzle-piece Extensions menu in Chrome's toolbar and pin Argus for easy access."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use Argus on any website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Argus works on any standard HTTP or HTTPS webpage. You can use it to check meta tags, run an SEO audit, and generate AI insights on any publicly accessible site, your own staging environments, or localhost development servers. The only exceptions are restricted browser pages like chrome:// URLs and the Chrome Web Store itself."
      }
    },
    {
      "@type": "Question",
      "name": "Why can't Argus analyze chrome:// pages?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chrome restricts all extensions from running on internal browser pages (chrome://, chrome-extension://, and the Chrome Web Store) for security reasons. This is a Chrome platform limitation, not an Argus limitation. Argus works on all regular HTTP and HTTPS webpages."
      }
    },
    {
      "@type": "Question",
      "name": "How do I enable AI insights?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI insights use Chrome's built-in Gemini Nano model. To enable them, you need Chrome version 127 or later. Navigate to chrome://flags, search for 'Prompt API for Gemini Nano,' enable it, and restart Chrome. The first time you use AI features, Chrome will download the Gemini Nano model in the background. Once ready, the Insights tab in Argus will show AI-powered suggestions."
      }
    },
    {
      "@type": "Question",
      "name": "What Chrome version do I need for AI features?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI-powered insights in Argus require Chrome version 127 or later, which includes support for the built-in Gemini Nano model. You can check your Chrome version by navigating to chrome://settings/help. All non-AI features (meta tag extraction, SEO audit, social previews) work on any recent version of Chrome."
      }
    },
    {
      "@type": "Question",
      "name": "How big is the Gemini Nano model download?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Gemini Nano model is approximately 1.7 GB. Chrome downloads it in the background after you enable the Prompt API flag, so it won't interrupt your browsing. The download only happens once, and the model is stored locally for all future use across any extension or site that uses Chrome's built-in AI."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use Argus without the AI features?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. The AI insights are optional. The Extract tab (meta tag extraction, Open Graph, Twitter Cards, JSON-LD, headings, links, images) and the Audit tab (40+ SEO checks with scoring) work fully without Gemini Nano. You only need AI enabled for the Insights tab, which provides meta description rewrites and title suggestions."
      }
    },
    {
      "@type": "Question",
      "name": "What meta tags does Argus extract?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Argus extracts all standard meta tags including title, description, canonical URL, robots directives, viewport, charset, language, author, generator, and theme-color. It also pulls Open Graph tags, Twitter Card tags, JSON-LD structured data, hreflang tags, alternate links, and favicon references. Every tag is displayed in a clean, organized format for quick review."
      }
    },
    {
      "@type": "Question",
      "name": "Does Argus check Open Graph tags?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Argus extracts the full set of Open Graph tags including og:title, og:description, og:image, og:image:width, og:image:height, og:url, og:type, og:site_name, and og:locale. It also renders a live social share preview so you can see exactly how your page will appear when shared on Facebook and LinkedIn."
      }
    },
    {
      "@type": "Question",
      "name": "Does Argus validate JSON-LD structured data?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Argus extracts all JSON-LD blocks on a page, parses them, identifies the schema.org type, validates the JSON structure, and reports any syntax errors. The structured data is displayed with syntax highlighting so you can read and debug your schema markup directly in the side panel. The audit tab also checks whether JSON-LD is present and flags issues."
      }
    },
    {
      "@type": "Question",
      "name": "How does the SEO audit scoring work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Argus runs 40+ individual checks across 10 categories. Each check produces a severity rating: pass, info, warning, or critical. Each category receives a score from 0 to 100, and the overall score is a weighted average of all category scores. Categories like Technical (18%) and Performance (13%) carry more weight than Links (5%) because they have a greater impact on search rankings."
      }
    },
    {
      "@type": "Question",
      "name": "What are the 10 audit categories?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The 10 SEO audit categories in Argus are: Title (12% weight), Description (10%), Headings (8%), Images (8%), Links (5%), Technical (18%), Structured Data (10%), Social (8%), Content (8%), and Performance (13%). Each category contains multiple individual checks, and the weights reflect the relative impact each area has on search engine rankings."
      }
    },
    {
      "@type": "Question",
      "name": "Can Argus rewrite my meta description?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. When AI insights are enabled, Argus uses Gemini Nano to analyze your page content and generate an optimized meta description suggestion. The rewrite is tailored to your actual page content and aims to improve click-through rates while staying within the recommended character length. The AI processing happens entirely on your device."
      }
    },
    {
      "@type": "Question",
      "name": "Can Argus suggest a better title tag?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The AI Insights tab can generate improved title tag suggestions based on your page content. Gemini Nano analyzes what the page is about and proposes alternatives that balance keyword relevance, readability, and character length. Like all AI features in Argus, this runs on-device with zero data sent externally."
      }
    },
    {
      "@type": "Question",
      "name": "Can Argus generate FAQ schema?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Argus validates and displays existing FAQ schema (FAQPage JSON-LD) on any page, but it does not currently generate new FAQ schema from scratch. The AI insights focus on meta description rewrites, title improvements, and content analysis. For generating structured data, you would use a dedicated schema markup generator alongside Argus for validation."
      }
    },
    {
      "@type": "Question",
      "name": "Does Argus show social share previews?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Argus renders live social share preview cards based on the Open Graph and Twitter Card tags it extracts from the page. You can see exactly how your page will look when shared on Facebook, Twitter/X, and LinkedIn — before you actually share it. This helps you catch missing images, truncated titles, or blank descriptions before your audience does."
      }
    },
    {
      "@type": "Question",
      "name": "Can I copy extracted data?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Argus lets you export extracted meta tags and audit results as JSON or formatted text. You can copy individual values to your clipboard or export the full dataset for use in reports, spreadsheets, or team communications. This makes it easy to share findings with developers or clients."
      }
    },
    {
      "@type": "Question",
      "name": "Does Argus check page performance / Web Vitals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Argus captures Core Web Vitals including Largest Contentful Paint (LCP), Interaction to Next Paint (INP), Cumulative Layout Shift (CLS), Time to First Byte (TTFB), and First Contentful Paint (FCP). These metrics are factored into the Performance category of the SEO audit, which carries a 13% weight in the overall score."
      }
    },
    {
      "@type": "Question",
      "name": "Does Argus collect any data?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Argus has a strict zero data collection policy. The extension contains no analytics, no tracking pixels, no telemetry, and makes no outbound network requests. All processing — extraction, auditing, and AI insights — happens locally in your browser. Your browsing history and page content are never collected or transmitted."
      }
    },
    {
      "@type": "Question",
      "name": "Does Argus send data to external servers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Argus makes zero outbound network requests. There are no API calls, no cloud processing, and no server-side components. The extension operates entirely within your browser. Even the AI features run on-device using Chrome's built-in Gemini Nano model, so your page content never leaves your machine."
      }
    },
    {
      "@type": "Question",
      "name": "Does Argus include analytics or tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Argus contains no Google Analytics, no Mixpanel, no Segment, no tracking pixels, and no telemetry of any kind. We do not track which pages you visit, what features you use, or how often you open the extension. The extension is open source, so you can verify this yourself in the GitHub repository."
      }
    },
    {
      "@type": "Question",
      "name": "Where does the AI processing happen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "All AI processing in Argus happens on your device using Chrome's built-in Gemini Nano model. Gemini Nano is a small language model that runs locally inside Chrome — no internet connection is required after the initial model download. Your page content is processed entirely on-device, ensuring complete privacy with zero data transmission to external servers."
      }
    },
    {
      "@type": "Question",
      "name": "What permissions does Argus need and why?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Argus requests three Chrome permissions: 'sidePanel' to open the extension as a side panel alongside your page, 'activeTab' to read the content of the tab you're currently viewing (only when you click the Argus icon), and 'storage' to save your preferences locally. Argus does not request broad browsing history, bookmark, or download permissions."
      }
    },
    {
      "@type": "Question",
      "name": "Argus shows 'Could not connect to page' — what do I do?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This usually means the content script could not be injected into the current page. Try refreshing the page and reopening Argus. If you're on a chrome:// URL, the Chrome Web Store, or a browser-internal page, Argus cannot run — this is a Chrome security restriction. If the problem persists on a normal webpage, try disabling and re-enabling the extension in chrome://extensions."
      }
    },
    {
      "@type": "Question",
      "name": "The AI status shows 'unavailable' — how do I fix it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If AI features show as unavailable, first confirm you are running Chrome 127 or later by checking chrome://settings/help. Then navigate to chrome://flags, search for 'Prompt API for Gemini Nano,' and set it to 'Enabled.' Restart Chrome and allow time for the model to download (approximately 1.7 GB). You can monitor the download progress in Chrome's task manager."
      }
    },
    {
      "@type": "Question",
      "name": "The side panel is empty or not loading",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If the side panel appears blank, try closing and reopening it by clicking the Argus icon in the toolbar. If that doesn't work, navigate to chrome://extensions, find Argus, and click the refresh/reload button. This forces the extension to reinitialize. Also ensure you are on a standard webpage (not a chrome:// URL, new tab page, or browser-internal page)."
      }
    },
    {
      "@type": "Question",
      "name": "Argus doesn't update when I navigate to a new page",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Argus is designed to auto-refresh when you navigate to a new page or switch tabs. If it's not updating, the content script may not have loaded on the new page. Try closing and reopening the side panel. For single-page applications (SPAs) that use client-side routing, Argus detects URL changes, but some SPAs may require you to reopen the panel after navigation."
      }
    }
  ]
}
```

<!-- End FAQ JSON-LD Schema -->

---

<!-- ========== SECTION: GENERAL ========== -->

## General

### What is Argus?

Argus is a free Chrome extension built by [Pixelesq](https://pixelesq.com) that extracts meta tags, runs 40+ SEO audit checks, and provides AI-powered insights — all within your browser. It opens as a side panel alongside any webpage, giving you instant visibility into title tags, meta descriptions, Open Graph tags, Twitter Cards, JSON-LD structured data, heading hierarchy, links, and images. The AI features are powered by Chrome's built-in Gemini Nano model, so your data never leaves your device.

### Is Argus free?

Yes, Argus is completely free — not freemium, not a trial. Every feature including meta tag extraction, the full SEO audit with 40+ checks, social share previews, and AI-powered insights is available from the moment you install. There are no premium tiers, no account requirements, and no feature gates.

### Who makes Argus?

Argus is built by [Pixelesq](https://pixelesq.com), a team focused on AI-native SEO optimization. Pixelesq builds tools that make technical SEO accessible and automated. Argus is open source and available on GitHub.

### Why is it called Argus?

Argus is named after Argus Panoptes from Greek mythology, a giant with one hundred eyes who could see everything. The name reflects the extension's purpose: to give you all-seeing visibility into every SEO signal on a page — meta tags, structured data, audit issues, and AI insights — so nothing escapes your attention.

### What browsers does Argus support?

Argus is currently available for Google Chrome. It uses Chrome-specific APIs including the Side Panel API and Chrome's built-in AI (Gemini Nano), so it is not compatible with Firefox, Safari, or Edge at this time. Chromium-based browsers like Brave or Vivaldi may work for core features, but AI insights require Chrome's native Gemini Nano integration.

<!-- End General -->

---

<!-- ========== SECTION: INSTALLATION & SETUP ========== -->

## Installation & Setup

### How do I install Argus?

Visit the Chrome Web Store, search for "Argus by Pixelesq," and click "Add to Chrome." The installation takes seconds and requires no signup or configuration. Once installed, the Argus icon appears in your browser toolbar and you can start inspecting any page immediately.

### How do I open Argus after installing?

Click the Argus icon in your Chrome toolbar. The extension opens as a side panel alongside your current page — no popups or new tabs. If you don't see the icon, click the puzzle-piece Extensions menu in Chrome's toolbar and pin Argus for easy access.

### Can I use Argus on any website?

Argus works on any standard HTTP or HTTPS webpage. You can use it to check meta tags, run an SEO audit, and generate AI insights on any publicly accessible site, your own staging environments, or localhost development servers. The only exceptions are restricted browser pages like chrome:// URLs and the Chrome Web Store itself.

### Why can't Argus analyze chrome:// pages?

Chrome restricts all extensions from running on internal browser pages (chrome://, chrome-extension://, and the Chrome Web Store) for security reasons. This is a Chrome platform limitation, not an Argus limitation. Argus works on all regular HTTP and HTTPS webpages.

### How do I enable AI insights?

AI insights use Chrome's built-in Gemini Nano model. To enable them, you need Chrome version 127 or later. Navigate to `chrome://flags`, search for "Prompt API for Gemini Nano," enable it, and restart Chrome. The first time you use AI features, Chrome will download the Gemini Nano model in the background. Once ready, the Insights tab in Argus will show AI-powered suggestions.

### What Chrome version do I need for AI features?

AI-powered insights in Argus require Chrome version 127 or later, which includes support for the built-in Gemini Nano model. You can check your Chrome version by navigating to `chrome://settings/help`. All non-AI features (meta tag extraction, SEO audit, social previews) work on any recent version of Chrome.

### How big is the Gemini Nano model download?

The Gemini Nano model is approximately 1.7 GB. Chrome downloads it in the background after you enable the Prompt API flag, so it won't interrupt your browsing. The download only happens once, and the model is stored locally for all future use across any extension or site that uses Chrome's built-in AI.

### Can I use Argus without the AI features?

Absolutely. The AI insights are optional. The Extract tab (meta tag extraction, Open Graph, Twitter Cards, JSON-LD, headings, links, images) and the Audit tab (40+ SEO checks with scoring) work fully without Gemini Nano. You only need AI enabled for the Insights tab, which provides meta description rewrites and title suggestions.

<!-- End Installation & Setup -->

---

<!-- ========== SECTION: FEATURES ========== -->

## Features

### What meta tags does Argus extract?

Argus extracts all standard meta tags including title, description, canonical URL, robots directives, viewport, charset, language, author, generator, and theme-color. It also pulls Open Graph tags, Twitter Card tags, JSON-LD structured data, hreflang tags, alternate links, and favicon references. Every tag is displayed in a clean, organized format for quick review.

### Does Argus check Open Graph tags?

Yes. Argus extracts the full set of Open Graph tags including og:title, og:description, og:image, og:image:width, og:image:height, og:url, og:type, og:site_name, and og:locale. It also renders a live social share preview so you can see exactly how your page will appear when shared on Facebook and LinkedIn.

### Does Argus validate JSON-LD structured data?

Yes. Argus extracts all JSON-LD blocks on a page, parses them, identifies the schema.org type, validates the JSON structure, and reports any syntax errors. The structured data is displayed with syntax highlighting so you can read and debug your schema markup directly in the side panel. The audit tab also checks whether JSON-LD is present and flags issues.

### How does the SEO audit scoring work?

Argus runs 40+ individual checks across 10 categories. Each check produces a severity rating: pass, info, warning, or critical. Each category receives a score from 0 to 100, and the overall score is a weighted average of all category scores. Categories like Technical (18%) and Performance (13%) carry more weight than Links (5%) because they have a greater impact on search rankings.

### What are the 10 audit categories?

The 10 SEO audit categories in Argus are: **Title** (12% weight), **Description** (10%), **Headings** (8%), **Images** (8%), **Links** (5%), **Technical** (18%), **Structured Data** (10%), **Social** (8%), **Content** (8%), and **Performance** (13%). Each category contains multiple individual checks, and the weights reflect the relative impact each area has on search engine rankings.

### Can Argus rewrite my meta description?

Yes. When AI insights are enabled, Argus uses Gemini Nano to analyze your page content and generate an optimized meta description suggestion. The rewrite is tailored to your actual page content and aims to improve click-through rates while staying within the recommended character length. The AI processing happens entirely on your device.

### Can Argus suggest a better title tag?

Yes. The AI Insights tab can generate improved title tag suggestions based on your page content. Gemini Nano analyzes what the page is about and proposes alternatives that balance keyword relevance, readability, and character length. Like all AI features in Argus, this runs on-device with zero data sent externally.

### Can Argus generate FAQ schema?

Argus validates and displays existing FAQ schema (FAQPage JSON-LD) on any page, but it does not currently generate new FAQ schema from scratch. The AI insights focus on meta description rewrites, title improvements, and content analysis. For generating structured data, you would use a dedicated schema markup generator alongside Argus for validation.

### Does Argus show social share previews?

Yes. Argus renders live social share preview cards based on the Open Graph and Twitter Card tags it extracts from the page. You can see exactly how your page will look when shared on Facebook, Twitter/X, and LinkedIn — before you actually share it. This helps you catch missing images, truncated titles, or blank descriptions before your audience does.

### Can I copy extracted data?

Yes. Argus lets you export extracted meta tags and audit results as JSON or formatted text. You can copy individual values to your clipboard or export the full dataset for use in reports, spreadsheets, or team communications. This makes it easy to share findings with developers or clients.

### Does Argus check page performance / Web Vitals?

Yes. Argus captures Core Web Vitals including Largest Contentful Paint (LCP), Interaction to Next Paint (INP), Cumulative Layout Shift (CLS), Time to First Byte (TTFB), and First Contentful Paint (FCP). These metrics are factored into the Performance category of the SEO audit, which carries a 13% weight in the overall score.

<!-- End Features -->

---

<!-- ========== SECTION: PRIVACY & SECURITY ========== -->

## Privacy & Security

### Does Argus collect any data?

No. Argus has a strict zero data collection policy. The extension contains no analytics, no tracking pixels, no telemetry, and makes no outbound network requests. All processing — extraction, auditing, and AI insights — happens locally in your browser. Your browsing history and page content are never collected or transmitted.

### Does Argus send data to external servers?

No. Argus makes zero outbound network requests. There are no API calls, no cloud processing, and no server-side components. The extension operates entirely within your browser. Even the AI features run on-device using Chrome's built-in Gemini Nano model, so your page content never leaves your machine.

### Does Argus include analytics or tracking?

No. Argus contains no Google Analytics, no Mixpanel, no Segment, no tracking pixels, and no telemetry of any kind. We do not track which pages you visit, what features you use, or how often you open the extension. The extension is open source, so you can verify this yourself in the GitHub repository.

### Where does the AI processing happen?

All AI processing in Argus happens on your device using Chrome's built-in Gemini Nano model. Gemini Nano is a small language model that runs locally inside Chrome — no internet connection is required after the initial model download. Your page content is processed entirely on-device, ensuring complete privacy with zero data transmission to external servers.

### What permissions does Argus need and why?

Argus requests three Chrome permissions: **sidePanel** to open the extension as a side panel alongside your page, **activeTab** to read the content of the tab you're currently viewing (only when you click the Argus icon), and **storage** to save your preferences locally. Argus does not request broad browsing history, bookmark, or download permissions.

<!-- End Privacy & Security -->

---

<!-- ========== SECTION: TROUBLESHOOTING ========== -->

## Troubleshooting

### Argus shows "Could not connect to page" — what do I do?

This usually means the content script could not be injected into the current page. Try refreshing the page and reopening Argus. If you're on a chrome:// URL, the Chrome Web Store, or a browser-internal page, Argus cannot run — this is a Chrome security restriction. If the problem persists on a normal webpage, try disabling and re-enabling the extension in `chrome://extensions`.

### The AI status shows "unavailable" — how do I fix it?

If AI features show as unavailable, first confirm you are running Chrome 127 or later by checking `chrome://settings/help`. Then navigate to `chrome://flags`, search for "Prompt API for Gemini Nano," and set it to "Enabled." Restart Chrome and allow time for the model to download (approximately 1.7 GB). You can monitor the download progress in Chrome's task manager.

### The side panel is empty or not loading

If the side panel appears blank, try closing and reopening it by clicking the Argus icon in the toolbar. If that doesn't work, navigate to `chrome://extensions`, find Argus, and click the refresh/reload button. This forces the extension to reinitialize. Also ensure you are on a standard webpage (not a chrome:// URL, new tab page, or browser-internal page).

### Argus doesn't update when I navigate to a new page

Argus is designed to auto-refresh when you navigate to a new page or switch tabs. If it's not updating, the content script may not have loaded on the new page. Try closing and reopening the side panel. For single-page applications (SPAs) that use client-side routing, Argus detects URL changes, but some SPAs may require you to reopen the panel after navigation.

<!-- End Troubleshooting -->

---

<!-- ========== SECTION: STILL HAVE QUESTIONS ========== -->

## Still Have Questions?

Can't find the answer you're looking for? We're here to help.

- **Report a bug or request a feature** — [Open an issue on GitHub](#github-issues-link)
- **Browse the source code** — [View the Argus repository on GitHub](#github-repo-link)
- **Learn more about Pixelesq** — [Visit pixelesq.com](https://pixelesq.com)

<!-- End Still Have Questions -->
