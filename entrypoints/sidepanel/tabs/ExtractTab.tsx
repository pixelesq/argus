import { useState } from 'react';
import {
  FileText,
  Share2,
  Twitter,
  Code2,
  Heading,
  Link2,
  Image,
  ChevronDown,
  Clipboard,
  Table,
  Check,
} from 'lucide-react';
import CopyButton from '../components/CopyButton';
import SocialPreview from '../components/SocialPreview';
import JsonLdViewer from '../components/JsonLdViewer';
import type { PageExtraction } from '@/lib/types';

interface ExtractTabProps {
  data: PageExtraction;
}

function LengthBadge({
  length,
  min,
  max,
}: {
  length: number;
  min: number;
  max: number;
}) {
  const inRange = length >= min && length <= max;
  return (
    <span
      className={`ml-1.5 rounded px-1.5 py-0.5 text-[10px] font-medium ${
        inRange
          ? 'bg-green-400/10 text-green-400'
          : 'bg-amber-400/10 text-amber-400'
      }`}
    >
      {length} chars
    </span>
  );
}

function FieldRow({
  label,
  value,
  copyValue,
  children,
}: {
  label: string;
  value?: string;
  copyValue?: string;
  children?: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const displayValue = value ?? '';
  const textToCopy = copyValue ?? displayValue;

  const handleClick = async () => {
    if (!textToCopy) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // silent fail
    }
  };

  return (
    <div className="group flex items-start gap-2 py-1">
      <span className="w-24 shrink-0 text-xs font-medium text-slate-500">
        {label}
      </span>
      <div
        className={`min-w-0 flex-1 ${textToCopy ? 'cursor-pointer rounded-sm transition-colors hover:bg-slate-800/60' : ''}`}
        onClick={handleClick}
        title={textToCopy ? 'Click to copy' : undefined}
      >
        {children || (
          <span
            className={`break-all text-xs ${displayValue ? 'text-slate-200' : 'text-slate-600 italic'}`}
          >
            {displayValue || 'Not set'}
          </span>
        )}
      </div>
      {textToCopy ? (
        copied ? (
          <span className="shrink-0 p-1">
            <Check size={12} className="text-green-400" />
          </span>
        ) : (
          <CopyButton
            value={textToCopy}
            className="shrink-0 opacity-0 group-hover:opacity-100"
          />
        )
      ) : null}
    </div>
  );
}

function Section({
  title,
  icon,
  defaultOpen = false,
  count,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  defaultOpen?: boolean;
  count?: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-slate-800">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 px-4 py-2.5 text-left transition-colors hover:bg-slate-800/50"
      >
        <span className="text-slate-400">{icon}</span>
        <span className="flex-1 text-xs font-semibold text-slate-200">
          {title}
        </span>
        {count !== undefined && (
          <span className="rounded bg-slate-700 px-1.5 py-0.5 text-[10px] text-slate-400">
            {count}
          </span>
        )}
        <ChevronDown
          size={14}
          className={`text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <div className="px-4 pb-3">{children}</div>}
    </div>
  );
}

function formatAsTable(data: PageExtraction): string {
  const lines: string[] = [];
  lines.push('=== SEO Data Extract ===');
  lines.push(`URL: ${data.url}`);
  lines.push(`Date: ${data.timestamp}`);
  lines.push('');
  lines.push('--- Basic Meta ---');
  lines.push(`Title: ${data.meta.title} (${data.meta.titleLength} chars)`);
  lines.push(
    `Description: ${data.meta.description} (${data.meta.descriptionLength} chars)`,
  );
  lines.push(`Canonical: ${data.meta.canonical}`);
  lines.push(`Robots: ${data.meta.robots}`);
  lines.push(`Language: ${data.meta.language}`);
  lines.push('');
  lines.push('--- Open Graph ---');
  lines.push(`og:title: ${data.og.title}`);
  lines.push(`og:description: ${data.og.description}`);
  lines.push(`og:image: ${data.og.image}`);
  lines.push(`og:type: ${data.og.type}`);
  lines.push('');
  lines.push('--- Twitter Card ---');
  lines.push(`twitter:card: ${data.twitter.card}`);
  lines.push(`twitter:title: ${data.twitter.title}`);
  lines.push(`twitter:description: ${data.twitter.description}`);
  lines.push(`twitter:image: ${data.twitter.image}`);
  lines.push('');
  lines.push(`--- Headings (${data.headings.length}) ---`);
  data.headings.forEach((h) => {
    lines.push(`${'  '.repeat(h.level - 1)}${h.tag.toUpperCase()}: ${h.text}`);
  });
  lines.push('');
  lines.push(`Word Count: ${data.wordCount}`);
  lines.push(
    `Links: ${data.links.length} total (${data.links.filter((l) => !l.isExternal).length} internal, ${data.links.filter((l) => l.isExternal).length} external)`,
  );
  lines.push(
    `Images: ${data.images.length} total (${data.images.filter((i) => !i.alt).length} missing alt)`,
  );
  return lines.join('\n');
}

export default function ExtractTab({ data }: ExtractTabProps) {
  const [showAllLinks, setShowAllLinks] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);

  const internalLinks = data.links.filter((l) => !l.isExternal);
  const externalLinks = data.links.filter((l) => l.isExternal);
  const nofollowLinks = data.links.filter((l) => l.isNofollow);
  const imagesMissingAlt = data.images.filter((i) => !i.alt);
  const imagesNoDimensions = data.images.filter(
    (i) => i.width === null && i.height === null,
  );

  return (
    <div>
      {/* Copy actions */}
      <div className="flex gap-2 border-b border-slate-800 px-4 py-2">
        <button
          onClick={() =>
            navigator.clipboard.writeText(JSON.stringify(data, null, 2))
          }
          className="flex items-center gap-1.5 rounded-md bg-slate-800 px-2.5 py-1.5 text-[11px] font-medium text-slate-300 transition-colors hover:bg-slate-700"
        >
          <Clipboard size={12} />
          Copy as JSON
        </button>
        <button
          onClick={() =>
            navigator.clipboard.writeText(formatAsTable(data))
          }
          className="flex items-center gap-1.5 rounded-md bg-slate-800 px-2.5 py-1.5 text-[11px] font-medium text-slate-300 transition-colors hover:bg-slate-700"
        >
          <Table size={12} />
          Copy as Table
        </button>
      </div>

      {/* Basic Meta */}
      <Section
        title="Basic Meta"
        icon={<FileText size={14} />}
        defaultOpen={true}
      >
        <FieldRow label="Title" copyValue={data.meta.title}>
          <span className="break-all text-xs text-slate-200">
            {data.meta.title || (
              <span className="italic text-slate-600">Not set</span>
            )}
          </span>
          <LengthBadge length={data.meta.titleLength} min={30} max={60} />
        </FieldRow>
        <FieldRow label="Description" copyValue={data.meta.description}>
          <span className="break-all text-xs text-slate-200">
            {data.meta.description || (
              <span className="italic text-slate-600">Not set</span>
            )}
          </span>
          <LengthBadge
            length={data.meta.descriptionLength}
            min={70}
            max={160}
          />
        </FieldRow>
        <FieldRow label="Canonical" value={data.meta.canonical} />
        <FieldRow label="Robots" value={data.meta.robots} />
        <FieldRow label="Viewport" value={data.meta.viewport} />
        <FieldRow label="Charset" value={data.meta.charset} />
        <FieldRow label="Language" value={data.meta.language} />
        <FieldRow label="Author" value={data.meta.author} />
        <FieldRow label="Generator" value={data.meta.generator} />
        <FieldRow label="Theme Color" value={data.meta.themeColor} />
      </Section>

      {/* Open Graph */}
      <Section title="Open Graph" icon={<Share2 size={14} />}>
        <FieldRow label="og:title" value={data.og.title} />
        <FieldRow label="og:description" value={data.og.description} />
        <FieldRow label="og:image" value={data.og.image} />
        <FieldRow label="og:image:width" value={data.og.imageWidth} />
        <FieldRow label="og:image:height" value={data.og.imageHeight} />
        <FieldRow label="og:url" value={data.og.url} />
        <FieldRow label="og:type" value={data.og.type} />
        <FieldRow label="og:site_name" value={data.og.siteName} />
        <FieldRow label="og:locale" value={data.og.locale} />
        <div className="mt-3">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wide text-slate-500">
            Social Preview
          </p>
          <SocialPreview
            type="facebook"
            title={data.og.title || data.meta.title}
            description={data.og.description || data.meta.description}
            image={data.og.image}
            url={data.og.url || data.url}
            siteName={data.og.siteName}
          />
        </div>
      </Section>

      {/* Twitter Card */}
      <Section title="Twitter Card" icon={<Twitter size={14} />}>
        <FieldRow label="twitter:card" value={data.twitter.card} />
        <FieldRow label="twitter:title" value={data.twitter.title} />
        <FieldRow
          label="twitter:description"
          value={data.twitter.description}
        />
        <FieldRow label="twitter:image" value={data.twitter.image} />
        <FieldRow label="twitter:site" value={data.twitter.site} />
        <FieldRow label="twitter:creator" value={data.twitter.creator} />
        <div className="mt-3">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wide text-slate-500">
            Twitter Preview
          </p>
          <SocialPreview
            type="twitter"
            title={data.twitter.title || data.og.title || data.meta.title}
            description={
              data.twitter.description ||
              data.og.description ||
              data.meta.description
            }
            image={data.twitter.image || data.og.image}
            url={data.url}
            siteName={data.twitter.site}
          />
        </div>
      </Section>

      {/* JSON-LD */}
      <Section
        title="Structured Data"
        icon={<Code2 size={14} />}
        count={data.jsonLd.length}
      >
        {data.jsonLd.length === 0 ? (
          <p className="text-xs italic text-slate-600">
            No JSON-LD structured data found.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {data.jsonLd.map((item, i) => (
              <JsonLdViewer key={i} data={item} />
            ))}
          </div>
        )}
      </Section>

      {/* Headings */}
      <Section
        title="Headings"
        icon={<Heading size={14} />}
        count={data.headings.length}
      >
        {data.headings.length === 0 ? (
          <p className="text-xs italic text-slate-600">No headings found.</p>
        ) : (
          <>
            <div className="mb-2 flex flex-wrap gap-1.5">
              {(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const).map((tag) => {
                const count = data.headings.filter(
                  (h) => h.tag === tag,
                ).length;
                if (count === 0) return null;
                return (
                  <span
                    key={tag}
                    className="rounded bg-slate-700 px-1.5 py-0.5 text-[10px] text-slate-300"
                  >
                    {tag.toUpperCase()}: {count}
                  </span>
                );
              })}
            </div>
            <div className="flex flex-col gap-0.5">
              {data.headings.map((h, i) => (
                <div
                  key={i}
                  className="flex items-baseline gap-1.5"
                  style={{ paddingLeft: `${(h.level - 1) * 12}px` }}
                >
                  <span className="shrink-0 rounded bg-slate-700 px-1 py-0.5 text-[9px] font-mono text-slate-400">
                    {h.tag}
                  </span>
                  <span className="truncate text-xs text-slate-300">
                    {h.text || (
                      <span className="italic text-red-400">(empty)</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </Section>

      {/* Links */}
      <Section
        title="Links"
        icon={<Link2 size={14} />}
        count={data.links.length}
      >
        <div className="mb-2 flex flex-wrap gap-1.5">
          <span className="rounded bg-slate-700 px-1.5 py-0.5 text-[10px] text-slate-300">
            Internal: {internalLinks.length}
          </span>
          <span className="rounded bg-slate-700 px-1.5 py-0.5 text-[10px] text-slate-300">
            External: {externalLinks.length}
          </span>
          {nofollowLinks.length > 0 && (
            <span className="rounded bg-amber-400/10 px-1.5 py-0.5 text-[10px] text-amber-400">
              Nofollow: {nofollowLinks.length}
            </span>
          )}
        </div>
        {data.links.length > 0 && (
          <>
            <button
              onClick={() => setShowAllLinks(!showAllLinks)}
              className="text-[11px] text-indigo-400 hover:underline"
            >
              {showAllLinks ? 'Hide all' : 'View all'}
            </button>
            {showAllLinks && (
              <div className="mt-2 flex max-h-60 flex-col gap-1 overflow-y-auto">
                {data.links.map((link, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs">
                    <span
                      className={`shrink-0 rounded px-1 py-0.5 text-[9px] ${link.isExternal ? 'bg-blue-400/10 text-blue-400' : 'bg-slate-700 text-slate-400'}`}
                    >
                      {link.isExternal ? 'ext' : 'int'}
                    </span>
                    <span className="truncate text-slate-400" title={link.href}>
                      {link.text || link.href}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </Section>

      {/* Images */}
      <Section
        title="Images"
        icon={<Image size={14} />}
        count={data.images.length}
      >
        <div className="mb-2 flex flex-wrap gap-1.5">
          <span className="rounded bg-slate-700 px-1.5 py-0.5 text-[10px] text-slate-300">
            Total: {data.images.length}
          </span>
          <span
            className={`rounded px-1.5 py-0.5 text-[10px] ${imagesMissingAlt.length > 0 ? 'bg-red-400/10 text-red-400' : 'bg-green-400/10 text-green-400'}`}
          >
            Missing alt: {imagesMissingAlt.length}
          </span>
          <span className="rounded bg-slate-700 px-1.5 py-0.5 text-[10px] text-slate-300">
            No dimensions: {imagesNoDimensions.length}
          </span>
        </div>
        {data.images.length > 0 && (
          <>
            <button
              onClick={() => setShowAllImages(!showAllImages)}
              className="text-[11px] text-indigo-400 hover:underline"
            >
              {showAllImages ? 'Hide all' : 'View all'}
            </button>
            {showAllImages && (
              <div className="mt-2 flex max-h-60 flex-col gap-1.5 overflow-y-auto">
                {data.images.map((img, i) => (
                  <div
                    key={i}
                    className="rounded border border-slate-700 p-2 text-xs"
                  >
                    <p className="truncate text-slate-300" title={img.src}>
                      {img.src}
                    </p>
                    <p className="mt-0.5 text-slate-500">
                      Alt:{' '}
                      {img.alt || (
                        <span className="text-red-400">Missing</span>
                      )}
                    </p>
                    <p className="text-slate-500">
                      {img.displayWidth}x{img.displayHeight}px
                      {img.hasLazyLoading && (
                        <span className="ml-1 text-green-400">lazy</span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </Section>
    </div>
  );
}
