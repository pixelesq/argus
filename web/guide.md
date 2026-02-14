# How to Use Argus — Installation Guide & Chrome Extension SEO Tutorial

Get started with Argus in 30 seconds. This step-by-step guide covers everything from installation to advanced pro tips, so you can inspect meta tags, audit SEO health, and check Open Graph tags in Chrome like a professional.

Whether you landed here searching for how to install an SEO Chrome extension, how to check meta tags in Chrome, or how to audit SEO on any webpage, you are in the right place. Argus is a free, privacy-first Chrome extension that puts every on-page SEO signal at your fingertips.

---

## 1. Installation

There are two ways to install Argus. Choose whichever fits your workflow.

### From Chrome Web Store (Recommended)

The fastest way to get started:

1. Visit the [Argus page on the Chrome Web Store](https://chromewebstore.google.com).
2. Click **"Add to Chrome"** and confirm the permissions prompt.
3. Pin Argus to your toolbar for easy access: click the puzzle-piece icon in Chrome's toolbar, find Argus, and click the pin icon.

That's it. Click the Argus icon on any webpage to open the side panel and start inspecting.

### Manual Install (Developer Mode)

If you prefer to build from source or want to contribute:

1. Download or clone the [Argus repository](https://github.com/pixelesq/argus):
   ```bash
   git clone https://github.com/pixelesq/argus.git
   cd argus
   ```
2. Install dependencies and build:
   ```bash
   npm install
   npm run build
   ```
3. Open `chrome://extensions` in Chrome.
4. Enable **Developer mode** using the toggle in the top-right corner.
5. Click **Load unpacked**.
6. Navigate to the `.output/chrome-mv3` folder inside the cloned project and select it.

> **Mac users:** The `.output` folder is hidden by default. Press **Cmd+Shift+.** (period) in the file picker to reveal hidden folders, then select `.output/chrome-mv3`.

Once loaded, pin Argus to your toolbar and click the icon on any page to open the side panel.

---

## 2. Enabling AI Insights (Optional)

Argus includes an AI Insights tab powered by Chrome's built-in Gemini Nano model. This is entirely optional — every other feature works without it — but it adds AI-generated title rewrites, meta description suggestions, FAQ schema generation, and more.

AI Insights run completely on your device. No data is sent to any server, no API keys are required, and there are no usage limits.

### Setup Steps

1. **Update Chrome to version 138 or later.** Check your version at `chrome://settings/help`.

2. **Enable the Prompt API flag:**
   - Navigate to `chrome://flags/#prompt-api-for-gemini-nano`
   - Set it to **Enabled**

3. **Enable the on-device model flag:**
   - Navigate to `chrome://flags/#optimization-guide-on-device-model`
   - Set it to **Enabled BypassPerfRequirement**

4. **Restart Chrome** to apply both flag changes.

5. **Wait for the one-time model download.** The first time you open the AI Insights tab, Chrome will download the Gemini Nano model (~2.4 GB). This happens once and may take a few minutes depending on your connection speed.

6. **Done.** After the download completes, the AI model runs entirely on-device. No further downloads are needed, and all analysis stays in your browser.

---

## 3. Using the Extract Tab

The Extract tab is where you inspect every SEO-relevant tag on a page. This is the tab that opens by default when you launch Argus, and it is the core of the chrome extension SEO tutorial experience.

### Opening the Side Panel

Click the Argus icon in your Chrome toolbar. The side panel slides open on the right side of your browser, showing the Extract tab with data from the current page.

### Basic Meta Section

The Basic Meta section is expanded by default and shows the most important SEO tags:

- **Title** — The page's title tag with a character count badge. Green means the length is in the optimal range (30-60 characters). Amber means it is too short or too long.
- **Description** — The meta description with a character count badge. Green means optimal (70-160 characters). Amber means it needs attention.
- **Canonical** — The canonical URL, if set.
- **Robots** — The robots meta directive (index, noindex, follow, nofollow, etc.).
- **Viewport, Charset, Language, Author, Generator, Theme Color** — Additional meta tags displayed when present.

This is the fastest way to check meta tags in Chrome without opening DevTools.

### Open Graph Tags and Social Preview

Expand the **Open Graph** section to see all OG tags extracted from the page:

- `og:title`, `og:description`, `og:image`, `og:image:width`, `og:image:height`
- `og:url`, `og:type`, `og:site_name`, `og:locale`

Below the tag values, Argus renders a **Social Preview card** that shows exactly how the page will appear when shared on Facebook or LinkedIn. This is the quickest way to check Open Graph tags in Chrome and verify your social sharing appearance before publishing.

### Twitter Card Setup

The **Twitter Card** section works the same way:

- `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- `twitter:site`, `twitter:creator`

A **Twitter Preview card** shows how the page will render when shared on Twitter/X.

### JSON-LD Structured Data

The **Structured Data** section displays all JSON-LD blocks found on the page:

- Each block shows its **schema type** (Article, Product, Organization, etc.) with a badge.
- The JSON is syntax-highlighted and pretty-printed for easy reading.
- **Validation status** is shown — Argus flags parsing errors and invalid structures.
- A count badge in the section header tells you how many JSON-LD blocks exist.

### Heading Structure

The **Headings** section shows the full heading hierarchy as an indented tree:

- Summary badges show how many of each heading level (H1, H2, H3, etc.) exist.
- Headings are indented by level so you can visually spot skipped levels or structural issues.
- Empty headings are flagged in red.

### Links and Images

- **Links** — Shows a breakdown of internal, external, and nofollow link counts. Click "View all" to expand the full list, where each link is tagged as internal or external.
- **Images** — Shows total image count, how many are missing alt text, and how many lack explicit dimensions. Click "View all" to see each image's source URL, alt text, display dimensions, and lazy loading status.

### Copying Data

Argus makes it easy to get data out:

- **Click any field value** to copy it to your clipboard. A green checkmark confirms the copy.
- **Copy as JSON** — Click the "Copy as JSON" button at the top of the Extract tab to copy the entire page extraction as structured JSON data.
- **Copy as Table** — Click the "Copy as Table" button to copy the data as a human-readable text table, ready to paste into reports, spreadsheets, or documentation.

### Auto-Refresh Behavior

Argus automatically re-extracts page data when you:

- Switch to a different browser tab
- Navigate to a new page in the current tab
- Wait for a page to finish loading

You can also manually refresh by clicking the refresh icon in the Argus header bar.

---

## 4. Using the Audit Tab

The Audit tab runs 40+ rule-based SEO checks across 10 categories and gives you a single score that summarizes the page's SEO health. This is how to audit SEO on any page without leaving Chrome.

### Understanding the Score Gauge

At the top of the Audit tab, a circular gauge displays your overall SEO score from 0 to 100:

- **90-100 (green)** — Excellent SEO health. Minor improvements may be possible, but the fundamentals are solid.
- **70-89 (amber)** — Good, but room for improvement. Review the warnings below.
- **50-69 (orange)** — Needs attention. Several issues are impacting SEO potential.
- **0-49 (red)** — Significant issues found. Critical problems need to be addressed.

### Reading Category Scores

Below the gauge, you will find horizontal progress bars for each of the 10 audit categories:

- **Title** — Is the title tag present, the right length, and consistent with the OG title?
- **Description** — Is the meta description present, properly sized, and consistent with the OG description?
- **Headings** — Does the page have a single H1? Is the heading hierarchy logical and complete?
- **Images** — Do images have alt text? Are dimensions specified to prevent layout shift? Is lazy loading used?
- **Links** — Are anchor texts descriptive? Are there empty hrefs or too few internal links?
- **Technical** — Is there a canonical URL? Is the page using HTTPS? Are viewport, lang, and hreflang set properly?
- **Structured Data** — Is JSON-LD present and valid? Are the right schema types being used?
- **Social** — Are Open Graph tags complete? Is there a properly sized OG image? Is a Twitter card configured?
- **Content** — Is there enough text content, or is this a thin content page?
- **Performance** — Core Web Vitals readings (LCP, INP, CLS, TTFB) when available.

Each bar is color-coded using the same scale as the main gauge (green/amber/orange/red).

### Understanding Severity Levels

Each individual audit result is marked with one of four severity levels:

- **Critical (red X icon)** — Fix immediately. These issues can directly harm your search rankings or prevent indexing. Examples: missing title tag, accidental noindex on a production page, broken canonical URL.
- **Warning (amber triangle icon)** — Should fix. These issues reduce your SEO potential but are not blocking. Examples: title too long, missing meta description, images without alt text.
- **Info (blue info icon)** — Nice to have. These are best-practice recommendations that can give you an edge. Examples: adding structured data, improving anchor text, enabling lazy loading.
- **Pass (green checkmark icon)** — Good. The check passed with no issues. These confirm what you are doing right.

### Expanding Audit Details

Click on any audit result to expand it and reveal detailed remediation guidance. The expanded view explains exactly what the issue is, why it matters, and what you should do to fix it.

### How Scoring Works

The overall score is a **weighted average** of all 10 category scores. Categories with greater SEO impact carry more weight:

- Technical (18%), Performance (13%), and Title (12%) carry the most weight.
- Description (10%) and Structured Data (10%) are next.
- Headings (8%), Images (8%), Social (8%), and Content (8%) follow.
- Links (5%) has the lowest weight.

Within each category, each failed check reduces the category score by a penalty based on severity:

- Critical: -30 points
- Warning: -15 points
- Info: -5 points
- Pass: 0 (no penalty)

A category starts at 100 and is reduced by each issue. The category score cannot go below 0.

---

## 5. Using the AI Insights Tab

The AI Insights tab uses Chrome's built-in Gemini Nano to provide intelligent, context-aware analysis of the current page. Everything runs on-device, so your page data never leaves the browser.

### Checking AI Status

At the top of the Insights tab, a status indicator shows the current state of the AI model:

- **Green dot — "AI Ready"** — The model is loaded and ready. AI features will work immediately.
- **Amber dot (pulsing) — "Model downloading..."** — Chrome is downloading the Gemini Nano model. Wait for the download to complete (~2.4 GB, one-time), then reopen the Insights tab.
- **Red dot — "AI unavailable"** — The model is not available. Check that you are on Chrome 138+ and that both flags are enabled (see the [Enabling AI Insights](#2-enabling-ai-insights-optional) section above).

### Auto-Run Analyses

When the AI model is available, three analyses run automatically as soon as you open the Insights tab:

- **Page Classification** — Identifies what the page is about, its target audience, and the likely search intent.
- **Meta Description Assessment** — Evaluates the quality and effectiveness of the current meta description.
- **Content Quality** — Analyzes the page's content for thin content signals, keyword usage, and actionable improvements.

Each analysis appears in a card. You can click the copy button to copy the AI's output, or click the retry button to re-run the analysis.

### On-Demand Actions

Below the auto-run analyses, four action buttons let you generate additional AI insights on demand:

- **Rewrite Description** — Generates an optimized meta description based on the page's actual content.
- **Improve Title** — Suggests a better, keyword-front-loaded title tag.
- **Suggest FAQ** — Generates 3-5 FAQ questions and answers suitable for FAQ schema markup.
- **Schema Types** — Recommends which Schema.org types to add based on the page content.

Click any button, wait a moment for the AI to process, and the result appears in a card below. Use the copy button on each card to copy the generated text directly, then customize it for your needs.

### Static Analysis Fallback

When the AI model is not available, Argus does not leave you empty-handed. The Insights tab automatically falls back to **static analysis**, which includes:

- **Content Assessment** — Word count evaluation and estimated reading time.
- **Missing Meta Tags** — A checklist of any meta tags that are absent (title, description, canonical, viewport, language, OG tags, Twitter card).
- **Schema Recommendations** — Rule-based suggestions for which structured data types to consider adding.

Even without AI, you still get actionable guidance from the static analysis.

---

## 6. Pro Tips

Ten tips to get the most out of Argus as a power user:

1. **Audit competitor pages.** Navigate to a competitor's URL and open Argus. Instantly see their title strategy, meta descriptions, structured data, OG setup, and heading structure. Use their strengths as inspiration for your own pages.

2. **Copy JSON-LD and paste into Google's Rich Results Test.** Use the Copy as JSON button in the Structured Data section, then paste the JSON-LD into [Google's Rich Results Test](https://search.google.com/test/rich-results) to validate it against Google's requirements.

3. **Check OG tags before launching social media campaigns.** Before sharing a page on social media, open Argus and review the Open Graph section. Use the social preview card to verify the image, title, and description look correct. Fix any issues before your post goes live.

4. **Monitor heading hierarchy when editing CMS content.** After editing a page in your CMS, open Argus to check that the heading structure is still logical. Look for skipped levels (jumping from H2 to H4), duplicate H1 tags, or empty headings that can confuse search engines.

5. **Use the word count check for thin content pages.** Pages with fewer than 300 words may be flagged as thin content by search engines. The Extract tab shows the word count, and the Audit tab will flag thin content automatically. Use this to identify pages that need more substantive content.

6. **Re-run the Audit after making changes to track score improvement.** After fixing issues that Argus identified, refresh the page and switch to the Audit tab to see your updated score. This is an effective way to demonstrate SEO progress to stakeholders.

7. **Use AI rewrite suggestions as starting points, then customize.** The AI-generated titles and meta descriptions are a great starting point, but always add your brand voice and specific value propositions. Copy the AI output, refine it, and make it your own.

8. **Check robots meta to catch accidental noindex on production pages.** One of the most common SEO disasters is leaving a `noindex` directive on a production page. The Basic Meta section shows the robots meta value immediately. The Audit tab flags this as a critical issue. Check every page before and after deployment.

9. **Compare title vs og:title intentionally for social optimization.** Your title tag is optimized for search engines, but your `og:title` is what people see when the link is shared on social media. These can and often should be different. Use Argus to see both side by side and craft each for its intended audience.

10. **Export as Table for client reports or team documentation.** The "Copy as Table" button exports a clean, formatted text summary of all extracted SEO data. Paste it directly into client reports, Slack messages, Notion pages, or team documentation. It works anywhere plain text is accepted.

---

## 7. Troubleshooting

If something is not working as expected, check these common issues first.

### "Could not connect to page"

This usually means the content script was not injected into the page. To fix it:

1. Refresh the current page (Ctrl+R or Cmd+R).
2. Wait for the page to fully load.
3. Click the Argus icon to reopen the side panel.

This commonly happens when you install or update Argus and then try to use it on a tab that was already open before the installation.

### "Cannot analyze browser internal pages"

Argus cannot inspect browser-internal pages such as:

- `chrome://` pages (settings, flags, extensions, etc.)
- `chrome-extension://` pages
- `about:` pages
- `edge://` pages

This is a security restriction enforced by Chrome. Navigate to a regular webpage to use Argus.

### AI Shows "Unavailable"

If the AI Insights tab shows a red dot with "AI unavailable":

1. Verify your Chrome version is 138 or later at `chrome://settings/help`.
2. Confirm the Prompt API flag is enabled at `chrome://flags/#prompt-api-for-gemini-nano`.
3. Confirm the on-device model flag is set to "Enabled BypassPerfRequirement" at `chrome://flags/#optimization-guide-on-device-model`.
4. Restart Chrome after changing any flags.
5. If the status changes to an amber "Model downloading..." indicator, wait for the download to finish (~2.4 GB).

### Side Panel Is Empty

If the side panel opens but shows no data:

1. Make sure the current page has fully loaded (check for the loading spinner in Chrome's address bar).
2. Refresh the page and wait for it to complete.
3. Click the refresh button in the Argus header bar.

If the issue persists, the content script may not have been injected. Go to `chrome://extensions`, find Argus, and check for any error messages. Disabling and re-enabling the extension can also help.

### Extension Not Appearing in Toolbar

If you cannot find the Argus icon in your toolbar:

1. Click the puzzle-piece (Extensions) icon in Chrome's toolbar.
2. Find Argus in the list and click the pin icon to pin it to the toolbar.
3. If Argus is not in the list, go to `chrome://extensions` and verify it is installed and enabled.
4. Check for any error messages on the Argus card in `chrome://extensions`. If there are errors, try clicking "Reload" or removing and re-adding the extension.

---

## Next Steps

Now that you know how to use Argus, here are some suggested next steps:

- **Explore the [Features page](/features)** for a deeper look at all 40+ audit checks and extraction capabilities.
- **Read the [Comparison page](/compare)** to see how Argus stacks up against other SEO Chrome extensions.
- **Check the [FAQ](/faq)** for answers to common questions about privacy, compatibility, and more.
- **Visit [Pixelesq](https://pixelesq.com?utm_source=argus&utm_medium=guide&utm_campaign=next_steps)** to automatically fix the SEO issues that Argus finds across your entire site.
