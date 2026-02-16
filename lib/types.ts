// ===== EXTRACTION TYPES =====

export interface MetaData {
  title: string;
  titleLength: number;
  description: string;
  descriptionLength: number;
  canonical: string;
  robots: string;
  viewport: string;
  charset: string;
  language: string;
  author: string;
  generator: string;
  themeColor: string;
}

export interface OpenGraphData {
  title: string;
  description: string;
  image: string;
  imageWidth: string;
  imageHeight: string;
  url: string;
  type: string;
  siteName: string;
  locale: string;
}

export interface TwitterCardData {
  card: string;
  title: string;
  description: string;
  image: string;
  site: string;
  creator: string;
}

export interface JsonLdData {
  raw: string;
  parsed: any;
  type: string;
  isValid: boolean;
  errors: string[];
}

export interface HeadingData {
  tag: string;
  text: string;
  level: number;
}

export interface LinkData {
  href: string;
  text: string;
  isExternal: boolean;
  isNofollow: boolean;
  isNoopener: boolean;
}

export interface ImageData {
  src: string;
  alt: string;
  width: number | null;
  height: number | null;
  hasLazyLoading: boolean;
  naturalWidth: number;
  naturalHeight: number;
  displayWidth: number;
  displayHeight: number;
  fileExtension: string;
}

export interface TechnicalData {
  canonical: string;
  robotsMeta: string;
  hreflangTags: { lang: string; href: string }[];
  alternateLinks: { rel: string; type: string; href: string }[];
  favicon: string;
  appleTouchIcon: string;
  isHttps: boolean;
  url: string;
}

export interface HreflangTag {
  lang: string;
  href: string;
}

export interface PageExtraction {
  meta: MetaData;
  og: OpenGraphData;
  twitter: TwitterCardData;
  jsonLd: JsonLdData[];
  headings: HeadingData[];
  links: LinkData[];
  images: ImageData[];
  technical: TechnicalData;
  wordCount: number;
  url: string;
  timestamp: string;
  responseHeaders?: Record<string, string>;
}

// ===== AUDIT TYPES =====

export type Severity = 'critical' | 'warning' | 'info' | 'pass';

export interface AuditRule {
  id: string;
  category: AuditCategory;
  name: string;
  description: string;
  check: (data: PageExtraction) => AuditResult;
}

export interface AuditResult {
  ruleId: string;
  ruleName: string;
  category: AuditCategory;
  severity: Severity;
  message: string;
  details?: string;
}

export type AuditCategory =
  | 'title'
  | 'description'
  | 'headings'
  | 'images'
  | 'links'
  | 'technical'
  | 'structured-data'
  | 'social'
  | 'content'
  | 'performance';

export interface AuditReport {
  score: number;
  results: AuditResult[];
  categoryScores: Record<AuditCategory, number>;
  timestamp: string;
  url: string;
}

// ===== PERFORMANCE TYPES =====

export interface WebVitals {
  lcp: number | null;
  inp: number | null;
  cls: number | null;
  ttfb: number | null;
  fcp: number | null;
}

// ===== AI TYPES =====

export interface AiInsight {
  type: 'classification' | 'suggestion' | 'rewrite' | 'analysis';
  title: string;
  content: string;
  loading: boolean;
  error?: string;
}

export type GeminiAvailability = 'available' | 'downloadable' | 'downloading' | 'unavailable';

export type AiProvider = 'claude' | 'gemini' | 'static';
