/**
 * Lightweight markdown renderer for AI insight output.
 * Handles: bold, italic, headings, lists, code, horizontal rules.
 * No external dependencies — safe for Chrome extension bundle size.
 */
export function renderMarkdown(text: string): string {
  if (!text) return '';

  return text
    .split('\n')
    .map((line) => {
      const trimmed = line.trim();

      // Horizontal rules
      if (/^[-*_]{3,}$/.test(trimmed)) {
        return '<hr class="my-2 border-slate-700" />';
      }

      // Headings
      if (trimmed.startsWith('#### '))
        return `<h4 class="mt-3 mb-1 text-[13px] font-semibold text-slate-200">${inline(trimmed.slice(5))}</h4>`;
      if (trimmed.startsWith('### '))
        return `<h3 class="mt-3 mb-1 text-[13px] font-semibold text-slate-200">${inline(trimmed.slice(4))}</h3>`;
      if (trimmed.startsWith('## '))
        return `<h2 class="mt-3 mb-1 text-[13px] font-bold text-slate-100">${inline(trimmed.slice(3))}</h2>`;
      if (trimmed.startsWith('# '))
        return `<h1 class="mt-3 mb-1 text-sm font-bold text-slate-100">${inline(trimmed.slice(2))}</h1>`;

      // Unordered list items
      if (/^[-*]\s/.test(trimmed)) {
        return `<div class="flex gap-1.5 mt-0.5"><span class="text-indigo-400 mt-[3px] shrink-0">&#8226;</span><span>${inline(trimmed.slice(2))}</span></div>`;
      }

      // Numbered list items
      const numMatch = trimmed.match(/^(\d+)[.)]\s(.+)/);
      if (numMatch) {
        return `<div class="flex gap-1.5 mt-0.5"><span class="text-indigo-400 shrink-0 font-medium">${numMatch[1]}.</span><span>${inline(numMatch[2])}</span></div>`;
      }

      // Empty line
      if (trimmed === '') return '<div class="h-1.5"></div>';

      // Regular paragraph
      return `<p class="mt-0.5">${inline(trimmed)}</p>`;
    })
    .join('');
}

/** Process inline markdown: bold, italic, code, links */
function inline(text: string): string {
  return text
    // Code blocks (backticks)
    .replace(
      /`([^`]+)`/g,
      '<code class="rounded bg-slate-700 px-1 py-0.5 text-[11px] font-mono text-indigo-300">$1</code>',
    )
    // Bold + italic
    .replace(
      /\*\*\*(.+?)\*\*\*/g,
      '<strong class="font-semibold text-slate-100"><em>$1</em></strong>',
    )
    // Bold
    .replace(
      /\*\*(.+?)\*\*/g,
      '<strong class="font-semibold text-slate-100">$1</strong>',
    )
    // Italic
    .replace(/\*(.+?)\*/g, '<em class="text-slate-300 italic">$1</em>')
    // Priority badges [Priority: High/Medium/Low]
    .replace(
      /\[Priority:\s*High\]/gi,
      '<span class="rounded px-1 py-0.5 text-[10px] font-semibold bg-red-400/15 text-red-400">HIGH</span>',
    )
    .replace(
      /\[Priority:\s*Medium\]/gi,
      '<span class="rounded px-1 py-0.5 text-[10px] font-semibold bg-amber-400/15 text-amber-400">MED</span>',
    )
    .replace(
      /\[Priority:\s*Low\]/gi,
      '<span class="rounded px-1 py-0.5 text-[10px] font-semibold bg-blue-400/15 text-blue-400">LOW</span>',
    )
    // Arrow separator for fix recommendations
    .replace(
      /\s*→\s*/g,
      ' <span class="text-slate-600 mx-0.5">→</span> ',
    );
}
