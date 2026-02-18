# Chrome Web Store Publishing Guide — Argus by Pixelesq

## Prerequisites

- [ ] Google account
- [ ] One-time Chrome Web Store developer registration fee: **$5 USD**
- [ ] Privacy policy hosted at a public URL (e.g., `pixelesq.com/privacy`)

---

## Step 1: Register as a Chrome Web Store Developer

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Sign in with your Google account
3. Pay the one-time $5 registration fee
4. Accept the developer agreement

---

## Step 2: Build the Extension Zip

```bash
cd argus
npm install
npm run build
npm run zip
```

This creates a `.zip` file in the `.output/` directory (e.g., `.output/argus-1.0.0-chrome.zip`).

---

## Step 3: Upload to Chrome Web Store

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Click **"New Item"**
3. Upload the `.zip` file from Step 2
4. You'll be taken to the listing editor

---

## Step 4: Fill in Store Listing

### Tab: Store Listing

| Field | Value |
|---|---|
| **Language** | English |
| **Extension name** | `Argus by Pixelesq — SEO Inspector & AI Auditor` |
| **Summary** | `SEO auditor with Claude Opus 4.6 + Gemini Nano AI. 40+ checks, weighted scoring, social previews, and an MCP server for Claude Code.` |
| **Description** | Copy from `store/listing.md` — the "Detailed Description" section |
| **Category** | Developer Tools |
| **Extension icon** | Upload `public/icon/128.png` (128x128 PNG) |

### Screenshots (required: 1-5 screenshots)

Upload the screenshots from the `store/screenshots/` directory. Required size: **1280x800** or **640x400** pixels.

You need to capture these yourself from a real browser session:

1. **Extract tab** — showing meta data with character count badges on a real website
2. **Extract tab: Social Preview** — OG section expanded showing the social preview card
3. **Audit tab** — showing the score gauge and category breakdown
4. **Audit tab: Details** — showing audit results with severity badges
5. **Insights tab: Claude Opus** — showing the Opus 4.6 analysis section with SEO Strategy Brief, Generate Schema, Technical Fixes, Content Gaps, and Competitor Insights buttons
6. **Insights tab: AI Settings** — showing the Claude API key configuration panel

**How to capture Chrome side panel screenshots:**
1. Open Argus on a content-rich webpage
2. Resize Chrome window so the side panel is clearly visible
3. Use macOS: `Cmd+Shift+4` then drag to select the side panel area
4. Ensure screenshots are exactly 1280x800 or 640x400 pixels

### Promotional Images (optional but recommended)

| Image | Size | Purpose |
|---|---|---|
| Small promo tile | 440x280 px | Shown in Chrome Web Store search results |
| Marquee promo tile | 1400x560 px | Featured banner on store page |

Use these in `store/promo/` — design them with:
- Argus logo/icon prominently
- Tagline: "The all-seeing SEO inspector"
- Dark background matching the extension theme (#0f172a)
- Pixelesq branding subtle in the corner

---

## Step 5: Privacy Tab

| Field | Value |
|---|---|
| **Single purpose** | Copy the "Single Purpose Description" from `store/listing.md` |
| **Permission justifications** | See below |
| **Data usage** | See below |
| **Privacy policy URL** | `https://pixelesq.com/privacy` |

### Permission Justifications

When asked to justify each permission:

| Permission | Justification |
|---|---|
| `sidePanel` | Required to display the extension's primary UI in Chrome's side panel, where users view extracted SEO data, audit results, and AI insights. |
| `activeTab` | Required to identify the currently active tab and send extraction requests to the content script running on that tab. |
| `storage` | Used to store user preferences (CTA dismissal state) and, if the user opts in, their Claude API key for AI-powered analysis. The API key is stored locally only, never synced or transmitted to any Pixelesq server. |
| `<all_urls>` (host permission via content script) | The content script needs to run on all URLs so users can inspect SEO data on any webpage they visit. No data is collected or transmitted — extraction only occurs when the user has the side panel open. |

### Remote Code / Network Disclosure

If asked whether the extension makes network requests:

- The extension optionally connects to `api.anthropic.com` **only** when the user explicitly provides their own Claude API key in the Settings panel. This is used to send page metadata (title, description, headings, structured data) for AI-powered SEO analysis. No requests are made without the user's API key.
- No other external network requests are made. All extraction and auditing runs locally.

### Data Usage Disclosure

When asked what data the extension collects, select:

- [x] **Website content** — "Read the content of websites you visit"
  - Usage: "To extract meta tags, headings, links, images, and structured data for SEO analysis displayed in the side panel. If the user opts in by providing a Claude API key, extracted metadata is also sent to Anthropic's API for AI-powered recommendations."
  - Not sold to third parties
  - Not used for purposes unrelated to the extension's core functionality
  - Not used for creditworthiness or lending purposes

All other categories: **Not collected**

---

## Step 6: Distribution Tab

| Field | Value |
|---|---|
| **Visibility** | Public |
| **Distribution** | All regions |
| **Mature content** | No |

---

## Step 7: Submit for Review

1. Click **"Submit for Review"**
2. Initial review typically takes **1-3 business days**
3. You'll receive an email when the review is complete
4. If rejected, the email will explain what needs to change

### Common Rejection Reasons and How to Avoid Them

| Reason | Prevention |
|---|---|
| "Not providing enough information about why host permissions are needed" | Use the exact justification text above |
| "Missing or inaccessible privacy policy" | Ensure `pixelesq.com/privacy` is live before submitting |
| "Description doesn't match functionality" | The listing description accurately reflects current features |
| "Excessive permissions" | All 4 permissions are necessary and justified |
| "Missing single purpose description" | Provided in `store/listing.md` |

---

## Step 8: Post-Launch

### Update the Extension

1. Bump version in `package.json`
2. Rebuild: `npm run build && npm run zip`
3. Go to Developer Dashboard → click your extension → **Package** tab
4. Click **"Upload new package"** and upload the new zip
5. Submit for review

### Monitor

- Check the Developer Dashboard for user reviews
- Respond to support inquiries at `pixelesq.com/support`
- Monitor the **Statistics** tab for install/uninstall trends

---

## File Checklist

Before submitting, ensure you have:

- [x] Extension zip file (`npm run zip`)
- [x] Extension icon: 128x128 PNG (`public/icon/128.png`)
- [ ] 1-5 screenshots: 1280x800 or 640x400 PNG/JPG (capture from browser)
- [ ] Small promo tile: 440x280 PNG (design)
- [ ] Marquee promo tile: 1400x560 PNG (optional, design)
- [x] Privacy policy at a public URL
- [x] Store listing copy (`store/listing.md`)
- [x] Single purpose description (`store/listing.md`)
- [x] Permission justifications (this guide)
