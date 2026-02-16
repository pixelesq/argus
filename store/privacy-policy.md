# Privacy Policy — Argus by Pixelesq

**Last updated:** February 2026

## Overview

Argus by Pixelesq ("Argus", "the extension") is a Chrome browser extension that extracts SEO metadata from web pages and provides audit reports and AI-powered insights. This privacy policy explains what data the extension accesses, how it is used, and how it is stored.

## Data Collection

**Argus does not collect, transmit, or store any personal data.**

Specifically:

- **No analytics** — Argus does not include any analytics, telemetry, or usage tracking.
- **No external API calls** — All processing happens locally in your browser. Argus does not communicate with any external server, API, or cloud service.
- **No data transmission** — No page content, metadata, URLs, or browsing activity is ever sent outside your browser.
- **No user accounts** — Argus does not require sign-up, login, or any form of authentication.

## Data Access

Argus accesses the following data from web pages you visit, **only when the extension side panel is open**:

- HTML meta tags (title, description, robots, viewport, etc.)
- Open Graph and Twitter Card meta tags
- JSON-LD structured data scripts
- Heading elements (h1–h6)
- Link elements (href, anchor text, rel attributes)
- Image elements (src, alt, dimensions, loading attribute)
- Page URL, character set, and language attribute
- Word count of visible page text
- Web performance metrics (LCP, CLS, INP, TTFB, FCP) via browser Performance APIs

This data is used solely to populate the extension's side panel UI and is **never stored persistently** (except a single user preference — see below).

## Data Storage

Argus stores exactly one value in `chrome.storage.local`:

- **CTA dismissal preference** — A boolean flag recording whether the user has dismissed the Pixelesq promotional banner in the Audit tab. This contains no personal information.

No other data is persisted between sessions.

## AI Features

When Chrome's built-in Gemini Nano model is available, Argus uses the Chrome Prompt API (`LanguageModel`) to generate SEO recommendations. This AI processing:

- Runs **entirely on-device** using Chrome's built-in model
- Does **not** send any data to Google, Pixelesq, or any third party
- Uses only the page metadata already extracted and displayed in the side panel
- Can be used without any network connection

## Third-Party Services

Argus does not integrate with any third-party services, APIs, or SDKs.

The extension contains a single external link to [pixelesq.com](https://pixelesq.com) (with UTM parameters for campaign tracking on the destination website). Clicking this link is entirely optional and navigates the user's browser normally — no data is pre-filled or transmitted by the extension.

## Permissions

Argus requests the following Chrome extension permissions:

| Permission | Purpose |
|---|---|
| `sidePanel` | Display the extension UI in Chrome's side panel |
| `activeTab` | Access the currently active tab to extract SEO data |
| `storage` | Store the CTA dismissal preference (one boolean value) |

The extension runs a content script on all URLs (`<all_urls>`) to enable SEO extraction on any webpage. The content script only activates when the extension sends an extraction request — it does not run background processes or monitor browsing activity.

## Children's Privacy

Argus does not knowingly collect any data from children or any other users.

## Changes to This Policy

If this privacy policy is updated, the changes will be reflected with a new "Last updated" date at the top of this page.

## Contact

For questions about this privacy policy or the extension:

- Website: [pixelesq.com](https://pixelesq.com)
- Support: [pixelesq.com/support](https://pixelesq.com/support)

---

**Argus by Pixelesq** — The all-seeing SEO inspector.
