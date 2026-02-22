# Privacy Policy — Argus by Pixelesq

**Last updated:** February 2026

## Overview

Argus by Pixelesq ("Argus", "the extension") is a Chrome browser extension that extracts SEO metadata from web pages and provides audit reports and AI-powered insights. This privacy policy explains what data the extension accesses, how it is used, and how it is stored.

## Data Collection

**Argus does not collect, transmit, or store any personal data.**

Specifically:

- **No analytics** — Argus does not include any analytics, telemetry, or usage tracking.
- **No Pixelesq servers** — Argus does not communicate with any Pixelesq-operated server, API, or cloud service. All processing happens locally in your browser.
- **No user accounts** — Argus does not require sign-up, login, or any form of authentication.
- **Optional Claude API calls** — If the user chooses to enter a Claude API key, the extension sends page metadata directly from the browser to Anthropic's API (api.anthropic.com) to generate AI-powered SEO insights. These calls are initiated solely by the user, go directly to Anthropic, and are governed by [Anthropic's privacy policy](https://www.anthropic.com/privacy). Pixelesq never sees, proxies, or stores the API key or the data sent to Anthropic. See the "AI Features" section below for details.

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

Argus stores the following values in `chrome.storage.local`:

- **CTA dismissal preference** — A boolean flag recording whether the user has dismissed the Pixelesq promotional banner in the Audit tab. This contains no personal information.
- **Claude API key** (optional) — If the user chooses to configure Claude AI features, their Anthropic API key is stored locally in `chrome.storage.local` under the key `argus_ai_settings`. This key is stored only on the user's device, is never synced via `chrome.storage.sync`, and is never transmitted to any Pixelesq server. The user can clear their API key at any time from the extension's AI Settings panel.

No other data is persisted between sessions.

## AI Features

Argus offers a three-tier AI system. Each tier operates independently:

### Tier 1: Claude Opus 4.6 (optional, user-initiated)

If the user enters a Claude API key in the extension's AI Settings panel, Argus sends page metadata (title, description, headings, links, images, structured data, and audit results) directly from the browser to Anthropic's Messages API at `api.anthropic.com`. This AI processing:

- Is **entirely opt-in** — no API calls are made unless the user provides their own API key
- Sends requests **directly from the browser to Anthropic** — Pixelesq does not proxy, intercept, or log any data
- Uses the `anthropic-dangerous-direct-browser-access` header required by Anthropic for browser-to-API calls
- Sends only the page metadata already extracted and displayed in the side panel — not raw HTML or page content
- Streams responses via Server-Sent Events (SSE) for real-time display
- Is governed by [Anthropic's Usage Policy](https://www.anthropic.com/policies) and [Privacy Policy](https://www.anthropic.com/privacy)

The user can remove their API key at any time from the AI Settings panel, which immediately stops all Claude API calls.

### Tier 2: Gemini Nano (on-device)

When Chrome's built-in Gemini Nano model is available, Argus uses the Chrome Prompt API (`LanguageModel`) to generate SEO recommendations. This AI processing:

- Runs **entirely on-device** using Chrome's built-in model
- Does **not** send any data to Google, Pixelesq, or any third party
- Uses only the page metadata already extracted and displayed in the side panel
- Can be used without any network connection

### Tier 3: Static Analysis (always available)

When neither Claude nor Gemini Nano is available, Argus provides rule-based static analysis including content assessment, missing meta tag checklists, and schema recommendations. This tier makes no network requests of any kind.

## Third-Party Services

Argus integrates with the following third-party service **only when the user explicitly opts in**:

- **Anthropic API** (api.anthropic.com) — Used for Claude Opus 4.6 AI analysis when the user provides their own API key. Requests are made directly from the browser. No data is routed through Pixelesq.

The extension contains a single external link to [pixelesq.com](https://pixelesq.com) (with UTM parameters for campaign tracking on the destination website). Clicking this link is entirely optional and navigates the user's browser normally — no data is pre-filled or transmitted by the extension.

## Permissions

Argus requests the following Chrome extension permissions:

| Permission | Purpose |
|---|---|
| `sidePanel` | Display the extension UI in Chrome's side panel |
| `activeTab` | Access the currently active tab to extract SEO data |
| `storage` | Store the CTA dismissal preference and optional Claude API key locally |

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
