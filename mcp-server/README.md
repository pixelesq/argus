# @pixelesq/argus-mcp

MCP (Model Context Protocol) server for SEO auditing. Gives Claude Code, Cursor, Windsurf, or any MCP-compatible client the ability to audit any webpage's SEO directly from the terminal.

Built on the same 40+ rule audit engine that powers the [Argus Chrome Extension](https://github.com/ArslanYM/argus).

## Tools

| Tool | Description |
|------|-------------|
| `seo_audit` | Full SEO audit with score out of 100 across 10 categories |
| `extract_meta` | Extract all meta tags, Open Graph, Twitter Card, JSON-LD, headings, links, images |
| `compare_seo` | Side-by-side SEO comparison of 2-5 URLs |
| `extract_json` | Raw extraction + audit data as JSON |

## Setup

### Claude Code

Add to your project's `.mcp.json`:

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

Or install globally and reference directly:

```bash
npm install -g @pixelesq/argus-mcp
```

```json
{
  "mcpServers": {
    "argus-seo": {
      "command": "argus-mcp"
    }
  }
}
```

### Cursor / Windsurf / Other MCP Clients

Use the same `npx` command pattern — consult your client's MCP configuration docs.

## Usage Examples

Once connected, Claude can use the tools naturally:

- "Audit the SEO of https://example.com"
- "Compare the SEO of our homepage vs competitor's homepage"
- "Extract all meta tags from this page"
- "Get the raw SEO data as JSON for https://example.com"

## Audit Categories

The audit engine checks 40+ rules across these categories:

- **Title** — length, keywords, uniqueness
- **Description** — length, relevance
- **Headings** — hierarchy, H1 presence, structure
- **Images** — alt text, dimensions, lazy loading
- **Links** — internal/external ratio, nofollow usage
- **Technical** — canonical, robots, HTTPS, hreflang
- **Structured Data** — JSON-LD validity, schema types
- **Social** — Open Graph, Twitter Card completeness
- **Content** — word count, readability signals
- **Performance** — resource hints, lazy loading adoption

## License

MIT
