# Argus Features — Every SEO Signal in One Side Panel

**The most complete free Chrome extension for SEO auditing, meta tag extraction, and AI-powered optimization.**

Argus is a free Chrome extension SEO audit tool built by [Pixelesq](https://pixelesq.com). It opens as a persistent side panel in Chrome and gives you instant, comprehensive visibility into every on-page SEO signal — meta tags, Open Graph data, Twitter Cards, JSON-LD structured data, heading structure, link profiles, image optimization, Core Web Vitals, and more. No network requests. No data collection. Everything runs locally in your browser.

This page covers every feature in detail across Argus's three tabs: **Extract**, **Audit**, and **Insights**.

---

## Extract Tab — See Everything Search Engines See

The Extract tab is a complete meta tag checker for Chrome that instantly reads and displays every SEO-relevant element on the current page. Every single field value is click-to-copy — just click any value and it copies to your clipboard. Two bulk export buttons at the top let you copy the entire extraction as structured JSON or as a formatted text table for reports and documentation.

### Basic Meta Tags

The first section you see when you open the Extract tab. Argus reads and displays:

- **Title tag** — the full title text with an inline character count badge. The badge turns green when the title falls within the optimal 30-60 character range and amber when it falls outside. This is the single most important on-page SEO element, and Argus makes it impossible to miss a title that is too short or too long for search result display.
- **Meta description** — the full description text with the same character count badge. Green for the recommended 70-160 character range, amber otherwise. Descriptions outside this range risk being truncated in Google search results or failing to provide enough context for click-through.
- **Canonical URL** — the `rel="canonical"` link value, critical for avoiding duplicate content penalties. Argus displays the full URL so you can immediately verify it points to the correct canonical version of the page.
- **Robots meta tag** — the full `robots` directive (e.g., `index, follow` or `noindex, nofollow`). Instantly spot pages accidentally set to `noindex` before they disappear from search results.
- **Viewport** — the `viewport` meta tag value. Essential for mobile-first indexing. Argus flags when this tag is missing entirely.
- **Charset** — the declared character encoding (typically `UTF-8`).
- **Language** — the `lang` attribute from the `<html>` element. Search engines and screen readers rely on this to understand the page's primary language.
- **Author** — the `author` meta tag value, if present.
- **Generator** — the `generator` meta tag, which reveals the CMS or framework (WordPress, Next.js, etc.) used to build the page.
- **Theme Color** — the `theme-color` meta tag that controls browser chrome color on mobile devices.

Every field shows "Not set" in italic when the tag is missing from the page, so you never have to wonder whether a tag is empty or simply absent.

### Open Graph Tags — The Open Graph Checker

Argus is a full open graph checker that extracts and validates every Open Graph meta tag on the page. The Open Graph protocol controls how your page appears when shared on Facebook, LinkedIn, Slack, Discord, and dozens of other platforms that support social previews.

Extracted fields:

- **og:title** — the title that appears in social share cards
- **og:description** — the description shown below the title in share previews
- **og:image** — the URL of the image used in the social share card
- **og:image:width** — declared image width in pixels
- **og:image:height** — declared image height in pixels
- **og:url** — the canonical URL for the shared content
- **og:type** — the content type (website, article, product, etc.)
- **og:site_name** — the name of the overall website
- **og:locale** — the language and territory tag (e.g., `en_US`)

**Live Social Share Preview Card:** Below the raw tag values, Argus renders a pixel-accurate preview card that simulates exactly how your page will look when shared on Facebook or LinkedIn. The preview card displays the og:image (or a "No image set" placeholder if missing), the hostname, the og:title (falling back to the page title if og:title is not set), and the og:description (falling back to the meta description). This eliminates the guesswork of sharing a link to test how it looks — you can see the result instantly, right in the extension.

### Twitter Card Tags — The Twitter Card Checker

Argus serves as a complete twitter card checker, extracting every Twitter Card meta tag and rendering a live preview of how the page will appear when shared on X (formerly Twitter).

Extracted fields:

- **twitter:card** — the card type (`summary`, `summary_large_image`, `app`, `player`)
- **twitter:title** — the title shown in the Twitter card
- **twitter:description** — the description text
- **twitter:image** — the image URL for the card
- **twitter:site** — the @username of the website's Twitter account
- **twitter:creator** — the @username of the content author

**Live Twitter Preview Card:** Just like the Open Graph section, Argus renders a live preview card showing how the tweet will look. It uses the Twitter-specific tags first, then falls back to Open Graph tags, then to the base meta tags — matching exactly how Twitter's own card rendering works in production. The preview shows the image, site handle, title, and description in a card layout that mirrors the real Twitter feed.

### JSON-LD Structured Data — The JSON-LD Validator Extension

This is where Argus functions as a powerful JSON-LD validator extension. Structured data is one of the most impactful yet hardest-to-debug aspects of technical SEO. Argus makes it effortless.

For every JSON-LD block found on the page, Argus provides:

- **Auto-detection** — Argus automatically finds and parses every `<script type="application/ld+json">` block on the page, no matter how many there are. The section header shows a count badge with the total number of JSON-LD blocks detected.
- **@type badge** — each block displays a prominent badge showing the Schema.org type (e.g., `Article`, `Product`, `Organization`, `BreadcrumbList`, `FAQPage`). This gives you an instant overview of what structured data the page declares without reading the raw JSON.
- **Validation with error messages** — every block is validated for correct JSON syntax. Valid blocks show a green checkmark with "Valid" label. Invalid blocks show a red X with "Invalid" label, plus a detailed error panel listing every parsing error encountered. This catches common issues like trailing commas, unquoted keys, and malformed URLs that would cause Google to silently ignore your structured data.
- **Pretty-printed JSON with syntax highlighting** — valid blocks are re-parsed and formatted with proper indentation for easy reading. The code is displayed in a scrollable panel with monospaced font against a dark background for comfortable reading. Invalid blocks display the raw source text so you can locate the exact syntax error.
- **Copy button** — every JSON-LD block has its own copy button that copies the formatted (or raw) JSON to your clipboard. This is invaluable for pasting into Google's Rich Results Test, sharing with developers, or archiving for documentation.

If you have ever searched for "how to check JSON-LD in Chrome" or "validate structured data without leaving the browser," this is the feature you need. Argus validates your JSON-LD inline, on every page load, without any extra steps.

### Heading Hierarchy — The Heading Structure Checker

Argus includes a visual heading structure checker that displays the complete heading hierarchy of any page as an indented tree. Proper heading structure is a fundamental on-page SEO signal and a WCAG accessibility requirement.

- **Visual tree with indentation** — headings are displayed with left-padding proportional to their level (H1 at the root, H2 indented one level, H3 indented two levels, and so on). Each heading shows its tag label (`h1`, `h2`, `h3`, `h4`, `h5`, `h6`) in a monospaced badge followed by the heading text.
- **Count badges per level** — at the top of the section, Argus displays compact badges showing how many headings exist at each level (e.g., `H1: 1`, `H2: 5`, `H3: 12`). Levels with zero headings are omitted for clarity.
- **Empty heading detection** — headings with no text content are flagged with a red "(empty)" label. Empty headings are a common accessibility and SEO issue that is easy to overlook in complex pages.
- **Total heading count** — the section header shows a badge with the total number of headings on the page.

This makes it trivial to spot skipped heading levels (e.g., jumping from H2 directly to H4), multiple H1 tags, and empty or placeholder headings — all common issues that hurt both SEO and accessibility.

### Links Analysis

Argus extracts every link on the page and provides a clear summary:

- **Internal links count** — the number of links pointing to pages on the same domain
- **External links count** — the number of links pointing to other domains
- **Nofollow links count** — the number of links with `rel="nofollow"`, highlighted in amber to draw attention
- **Expandable full list** — click "View all" to expand a scrollable list of every link on the page. Each link shows a badge indicating whether it is internal (`int`) or external (`ext`), plus the link text and URL. Internal links use a neutral badge; external links are highlighted in blue.

Link analysis helps you evaluate internal linking density, spot broken or empty links, and audit your outbound link profile.

### Images Analysis

Every image on the page is analyzed and summarized:

- **Total image count** — displayed as a badge in the section header
- **Missing alt text count** — a red badge when images are missing alt attributes, green when all images have alt text. Alt text is essential for accessibility and image search SEO.
- **Missing dimensions count** — the number of images without explicit `width` and `height` attributes. Missing dimensions are a primary cause of Cumulative Layout Shift (CLS), one of Google's Core Web Vitals.
- **Expandable full list** — click "View all" to see every image with its source URL, alt text (or a red "Missing" label), display dimensions, and lazy loading status (shown as a green "lazy" label when `loading="lazy"` is present).

### Export: Copy All as JSON or Formatted Text Table

At the top of the Extract tab, two export buttons let you copy the entire page extraction in one click:

- **Copy as JSON** — copies the complete extraction data as a prettified JSON object with two-space indentation. This includes every meta tag, Open Graph value, Twitter Card value, all JSON-LD blocks, every heading, every link, and every image with all their attributes. Ideal for programmatic consumption, bug reports, or archiving page state over time.
- **Copy as Table** — copies a human-readable formatted text report including the URL, timestamp, basic meta tags with character counts, Open Graph values, Twitter Card values, heading tree with indentation, word count, link summary (total, internal, external), and image summary (total, missing alt). Perfect for pasting into Slack, emails, project management tools, or documentation.

### Click-to-Copy on Every Field

Every individual field value in the Extract tab is clickable. Click any value — a title, a canonical URL, an og:image path, a JSON-LD block — and it copies directly to your clipboard with a green checkmark confirmation. This micro-interaction saves significant time when you need to grab a specific value for a report, a ticket, or a fix.

---

## Audit Tab — 40+ SEO Checks, Weighted Scoring, Actionable Fixes

The Audit tab is a comprehensive SEO score checker that runs over 40 automated checks against the current page and produces a weighted score from 0 to 100. Every check is categorized by severity (**critical**, **warning**, or **info**) and grouped into 10 categories that reflect real-world SEO priorities.

The score is displayed prominently as a circular gauge at the top of the tab, with a color that reflects overall health: green for strong scores, amber for pages needing attention, and red for critical issues.

### Title (3 rules)

The title tag is the most visible SEO element in search results. Argus checks:

1. **Title Tag Exists** (critical if missing) — every indexable page must have a `<title>` tag. Pages without a title are virtually invisible in search results. If found, Argus displays the title text. If missing, it flags this as a critical issue.
2. **Title Length: 30-60 characters** (warning if outside range) — titles shorter than 30 characters underutilize available SERP real estate and lack descriptive keywords. Titles longer than 60 characters risk truncation with an ellipsis in Google search results. Argus reports the exact character count and advises whether to add keywords or shorten the title.
3. **Title / OG Title Match** (info if mismatched) — compares the page `<title>` with the `og:title` meta tag. When they differ, it may be intentional (e.g., a shorter social title), but Argus flags the discrepancy so you can verify it is deliberate. When `og:title` is not set, Argus notes the absence.

### Description (3 rules)

The meta description is your page's pitch in search results. Argus checks:

1. **Meta Description Exists** (critical if missing) — pages without a meta description rely on Google's auto-generated snippet, which rarely captures your intended message. Argus flags missing descriptions as critical.
2. **Description Length: 70-160 characters** (warning if outside range) — descriptions shorter than 70 characters waste SERP space and may appear incomplete. Descriptions longer than 160 characters will be truncated. Argus reports the exact count and provides specific advice.
3. **Description / OG Description Match** (info if mismatched) — compares the meta description with `og:description`. Differences are flagged for review so you can confirm they are intentional.

### Headings (4 rules)

Heading structure communicates content hierarchy to both users and search engines. Argus checks:

1. **H1 Tag Exists** (critical if missing) — every page should have at least one H1 that summarizes the page's primary topic. Argus displays the H1 text when found.
2. **Single H1** (warning if multiple) — best practice is to have exactly one H1 per page. Multiple H1 tags dilute the primary topic signal. Argus lists all H1 tags found when there are more than one.
3. **Heading Hierarchy** (warning if skipped levels) — headings should not skip levels (e.g., jumping from H2 to H4 without an H3). Argus identifies every skip, specifying the exact transition and the heading text where the skip occurs.
4. **Empty Headings** (warning if found) — heading tags with no text content are an accessibility violation and provide no SEO value. Argus counts empty headings and identifies their levels.

### Images (4 rules)

Images impact page speed, accessibility, and search visibility. Argus checks:

1. **Image Alt Text** (critical if more than 5 missing, warning if any missing) — alt text is required for accessibility compliance and enables images to rank in Google Image Search. Argus counts the number of images missing alt attributes and lists the source URLs of the first 10 offenders.
2. **Image Dimensions / CLS Prevention** (warning if missing) — images without explicit `width` and `height` attributes cause Cumulative Layout Shift as the browser recalculates layout after the image loads. Argus counts how many images lack dimension attributes.
3. **Lazy Loading** (info if missing) — below-fold images should use `loading="lazy"` to defer loading until they scroll into view. Argus counts images without lazy loading and recommends adding the attribute.
4. **Modern Image Formats** (info if legacy formats detected) — images in JPEG, PNG, GIF, or BMP formats can often be replaced with WebP or AVIF for significantly better compression without quality loss. Argus identifies how many images use legacy formats.

### Links (3 rules)

Internal and external link quality affects crawlability and user experience. Argus checks:

1. **Descriptive Anchor Text** (warning if generic found) — links with anchor text like "click here," "read more," "here," "learn more," "more," "link," or "this" waste an opportunity to signal relevance to search engines. Argus lists every generic anchor text link found, up to 10 examples, with the link text and target URL.
2. **Empty Links** (warning if found) — links with an empty `href`, `href="#"`, or `href="javascript:void(0)"` are useless for navigation and crawling. Argus counts them.
3. **Internal Link Count** (info if fewer than 3) — pages with very few internal links may have poor internal link structure. Argus recommends adding more internal links if fewer than 3 are found.

### Technical (7 rules)

Technical SEO fundamentals that affect indexing and crawlability. Argus checks:

1. **Canonical URL** (warning if missing) — a missing `rel="canonical"` link can lead to duplicate content issues when the same content is accessible via multiple URLs. Argus displays the canonical URL when found.
2. **Canonical Self-Reference** (info if pointing elsewhere) — the canonical URL should typically point to the current page's own URL. When it points to a different URL, Argus flags it and shows both the current URL and the canonical URL so you can verify the redirect is intentional.
3. **Robots Noindex** (critical if detected) — a `noindex` directive in the robots meta tag prevents the page from appearing in search results entirely. Argus treats this as critical because accidental noindex directives are one of the most damaging SEO mistakes. It displays the full robots meta content and notes that intentional noindex can be ignored.
4. **HTTPS** (warning if not served over HTTPS) — HTTPS is a confirmed Google ranking signal. Pages served over HTTP are flagged.
5. **Viewport Meta Tag** (critical if missing) — without a viewport meta tag, pages do not render properly on mobile devices and fail Google's mobile-first indexing requirements.
6. **HTML Lang Attribute** (warning if missing) — the `lang` attribute on the `<html>` element tells search engines and screen readers what language the page is written in. Argus reports the language value when present.
7. **Hreflang Tags** (warning if misconfigured) — for multilingual sites, hreflang tags must be properly configured. Argus checks for the presence of an `x-default` tag and verifies that every hreflang declaration has a valid `href`. Single-language sites without hreflang tags pass this check automatically.

### Structured Data (4 rules)

JSON-LD structured data enables rich results in search. Argus checks:

1. **JSON-LD Exists** (warning if missing) — pages without any JSON-LD structured data miss opportunities for rich results like star ratings, FAQ dropdowns, breadcrumb trails, and product information in search results.
2. **JSON-LD Valid** (critical if invalid) — invalid JSON-LD is silently ignored by search engines. Argus validates every block for correct JSON syntax and flags invalid blocks with specific error messages.
3. **Schema Type** (info if no structured data) — Argus identifies and reports all Schema.org `@type` values found in the JSON-LD blocks. When no structured data exists, it suggests common types to consider: Article, Product, LocalBusiness, and others.
4. **Breadcrumb Schema** (info if missing) — `BreadcrumbList` schema helps search engines understand site hierarchy and can appear as breadcrumb trails in search results. Argus checks whether any JSON-LD block includes a BreadcrumbList type.

### Social (5 rules)

Social meta tags control how your content appears when shared. Argus checks:

1. **Open Graph Tags Exist** (warning if missing) — pages without any Open Graph tags (title, description, or image) will display poorly when shared on Facebook, LinkedIn, Slack, and other platforms.
2. **OG Image** (warning if missing) — social shares without a preview image get dramatically lower engagement. Argus checks for the presence of `og:image`.
3. **OG Image Size** (info if undersized or unspecified) — the recommended minimum size for OG images is 1200x630 pixels. Argus checks the declared `og:image:width` and `og:image:height` values. When dimensions are not specified in the meta tags, it notes the absence and recommends adding them.
4. **Twitter Card** (warning if missing) — pages without Twitter Card meta tags (`twitter:card` or `twitter:title`) may not display optimally when shared on X.
5. **Twitter Image** (warning if missing) — checks for `twitter:image` or falls back to `og:image`. Pages with neither lack a preview image on Twitter shares.

### Content (2 rules)

Content depth signals quality and relevance. Argus checks:

1. **Word Count / Thin Content** (warning if under 300 words) — pages with fewer than 300 words may be classified as thin content by search engines, which can negatively affect rankings. Argus reports the exact word count and flags pages below the threshold.
2. **Reading Time** (info) — estimates reading time based on an average of 200 words per minute. This is informational and helps you gauge content depth relative to user expectations.

### Performance (4 rules)

Core Web Vitals are confirmed Google ranking signals. Argus measures them using the Web Vitals library when performance data is available:

1. **Largest Contentful Paint (LCP)** — measures loading performance. Good: under 2.5 seconds. Needs improvement: 2.5-4.0 seconds. Poor: over 4.0 seconds. Reported in seconds with two decimal precision.
2. **Interaction to Next Paint (INP)** — measures interactivity responsiveness. Good: under 200ms. Needs improvement: 200-500ms. Poor: over 500ms.
3. **Cumulative Layout Shift (CLS)** — measures visual stability. Good: under 0.1. Needs improvement: 0.1-0.25. Poor: over 0.25. Reported to three decimal places.
4. **Time to First Byte (TTFB)** — measures server responsiveness. Good: under 800ms. Slow: over 800ms.

Performance metrics are sourced from the actual page via the Web Vitals API when the data is available. When performance data cannot be collected from the side panel context, Argus reports the status transparently.

### Scoring: How Argus Calculates Your SEO Score

Argus uses a weighted scoring system that reflects the real-world importance of each SEO category. Here is how it works:

**Category Weights:**

| Category | Weight |
|---|---|
| Technical | 18 |
| Performance | 13 |
| Title | 12 |
| Description | 10 |
| Structured Data | 10 |
| Headings | 8 |
| Images | 8 |
| Social | 8 |
| Content | 8 |
| Links | 5 |

**Severity Penalties:**

Each failed check reduces the category score based on its severity:

| Severity | Points Deducted |
|---|---|
| Critical | -30 |
| Warning | -15 |
| Info | -5 |
| Pass | 0 |

**Calculation:**

1. Each category starts at 100 points.
2. For every failed rule in the category, the corresponding severity penalty is subtracted.
3. The category score floors at 0 (never goes negative).
4. The overall score is the weighted average of all category scores, using the weights in the table above.
5. The result is a single integer from 0 to 100.

This means Technical issues (weight 18) have more than three times the impact of Links issues (weight 5), reflecting the real-world reality that a missing viewport tag or an accidental noindex directive is far more damaging than a generic anchor text link. A single critical Technical issue (like a noindex flag) deducts 30 points from that category, which translates to roughly 5.4 points off the overall score. Two critical issues in the same category can drop it by 60 points.

Every audit result includes a clear, human-readable message explaining what was found and what to do about it. Critical issues explain exactly what is wrong and why it matters. Warnings include specific, actionable guidance. Info results provide context and best-practice recommendations.

---

## Insights Tab — AI-Powered SEO Analysis, Entirely On-Device

The Insights tab is an AI SEO tool powered by Chrome's built-in Gemini Nano — a large language model that runs entirely on your device. No data is sent to any server. No API keys are required. No usage limits. No cost. Every AI analysis happens in your browser, which means your page content, URLs, and SEO data remain completely private.

### How It Works

Argus uses Chrome's built-in Prompt API (available in Chrome 137+) to access the Gemini Nano model. When you open the Insights tab, Argus checks whether the model is available, downloading, or unavailable, and displays the current status at the top of the tab.

The AI receives a structured context summary of the current page including the URL, title, meta description, word count, the first 10 headings, and any detected Schema.org types. This context is constructed locally from the data already extracted by the Extract tab — no additional network requests are made.

### Auto-Run Analyses

When Gemini Nano is available, three analyses run automatically as soon as you open the Insights tab:

1. **Page Classification** — the AI identifies what the page is about, who the target audience is, and what the search intent is, summarized in one concise sentence. This is useful for verifying that your page communicates its purpose clearly to both users and search engines.

2. **Meta Description Assessment** — the AI evaluates the quality of your current meta description, checking for compelling copy, keyword inclusion, call-to-action presence, and appropriate length. It provides specific, actionable feedback on how to improve it.

3. **Content Quality Analysis** — the AI analyzes the page for thin content signals, keyword usage patterns, search intent alignment, and provides one specific, actionable improvement. The analysis is kept under 150 words and focuses on being direct and practical rather than generic.

Each auto-run analysis shows a loading spinner while the model processes, then displays the result in a card with a copy button and a retry button. If an analysis fails, the error is displayed inline with the option to retry.

### On-Demand AI Actions

Four additional AI-powered actions are available as buttons that you trigger manually:

1. **Rewrite Meta Description** — generates a fully optimized meta description between 140 and 155 characters. The rewrite includes the primary keyword naturally, incorporates a call to action, and is written to maximize click-through rate from search results. The output is the description text only — ready to copy and paste directly into your CMS or code.

2. **Improve Title** — suggests an improved title tag between 50 and 60 characters with the primary keyword front-loaded for maximum SERP visibility. The suggestion is clickable and compelling, designed to earn clicks in search results.

3. **Suggest FAQ Schema** — generates 3 to 5 frequently asked questions with brief answers based on the page content. The output is formatted as Q&A pairs ready to be converted into FAQPage structured data markup. FAQ schema can earn additional SERP real estate with expandable question-and-answer dropdowns.

4. **Recommend Schema Types** — analyzes the page URL, title, description, and existing schema types, then recommends which additional Schema.org types should be added. The recommendation includes specific required properties for each suggested type, so you know exactly what to implement.

Every on-demand result includes a copy button for easy transfer to your workflow and a retry button to regenerate the analysis.

### Graceful Fallback When AI Is Unavailable

When Gemini Nano is not available (Chrome version below 137, model not enabled, or model still downloading), the Insights tab does not simply show an empty state. Instead, it provides a comprehensive static analysis:

**If the model is downloading:** Argus shows a clear message explaining that the Gemini Nano model is currently downloading (~2.4 GB) and that AI features will be available once the download completes.

**If AI is unavailable:** Argus displays setup instructions (enable the flag at `chrome://flags/#prompt-api-for-gemini-nano`, restart Chrome) and falls back to three static analysis panels:

1. **Content Assessment** — evaluates the word count and provides a qualitative assessment. Pages with 300+ words are noted as having sufficient content. Pages with fewer words are flagged with a recommendation to add more substantive content. Pages with no detected text content are called out. Estimated reading time is calculated at 200 words per minute.

2. **Missing Meta Tags Checklist** — a bullet-pointed list of every important meta tag that is absent from the page, including: title tag, meta description, canonical URL, viewport, HTML lang attribute, og:title, og:description, og:image, and twitter:card. Each missing tag is highlighted in amber for immediate visibility.

3. **Rule-Based Schema Recommendations** — if JSON-LD is already present, Argus lists the detected schema types. If no structured data exists, it provides specific recommendations: Article/BlogPosting for blog content, Product for product pages, Organization for homepages, and BreadcrumbList for navigation. These recommendations are based on common Schema.org patterns and provide a starting point even without AI analysis.

The static fallback ensures that the Insights tab always delivers value, regardless of whether the AI model is available.

---

## Technical Specifications

| Specification | Detail |
|---|---|
| **Extension format** | Chrome Extension Manifest V3 |
| **Total size** | 291 KB |
| **Framework** | WXT (Vite-based extension framework) + React |
| **Styling** | TailwindCSS |
| **Language** | TypeScript throughout — zero JavaScript |
| **AI model** | Chrome Built-in Gemini Nano (on-device) |
| **UI paradigm** | Side panel (persists across page navigation) |
| **Theme** | Dark theme UI optimized for extended use |
| **Auto-refresh** | Refreshes data on tab switch and page load |
| **Network requests** | None (fully client-side) |
| **Data collection** | None — no analytics, no tracking, no telemetry |
| **Permissions** | `sidePanel`, `activeTab`, `storage` |
| **Icon set** | Lucide (open-source) |
| **Price** | Free — no premium tier, no usage limits |

### Side Panel Architecture

Unlike popup-based extensions that close when you click elsewhere, Argus runs in Chrome's side panel. This means:

- **Persistence** — the panel stays open as you navigate between pages, switch tabs, and interact with the page. You never lose your place.
- **Auto-refresh** — when you switch to a different tab or the current page finishes loading, Argus automatically re-extracts all data and re-runs the audit. The side panel always shows data for the currently active tab.
- **Non-intrusive** — the side panel sits beside the page content without overlapping it, so you can compare the extracted data against the live page in real time.

### Privacy and Security

Argus operates entirely within your browser:

- No data is transmitted to external servers.
- No browsing history is stored or collected.
- No analytics or tracking scripts are included.
- The optional AI features use Chrome's built-in Gemini Nano model, which runs on-device. Your page content is never sent to any API endpoint.

The extension requests only the minimum permissions it needs: `sidePanel` to render the UI, `activeTab` to read page content from the active tab, and `storage` to persist settings.

---

## Why Argus for Chrome Extension SEO Auditing

Argus was built for the people who actually do SEO work every day — developers validating their implementations, SEO professionals auditing client sites, content teams checking their pages before publication, and marketers ensuring their social shares look right.

Most Chrome extension SEO audit tools give you either shallow extraction (just the meta tags) or overwhelming raw data (every HTTP header and DOM node). Argus is designed to hit the sweet spot: comprehensive enough to catch every issue that matters, focused enough that you can act on the results in minutes, and intelligent enough to explain what each result means.

Whether you need a meta tag checker for Chrome, a JSON-LD validator extension, an open graph checker, a twitter card checker, a heading structure checker, or an AI SEO tool — Argus is the single extension that replaces them all.

[Install Argus free from the Chrome Web Store.](https://chrome.google.com/webstore)

---

*Argus is built by [Pixelesq](https://pixelesq.com) — the AI-native platform for automated SEO optimization.*
