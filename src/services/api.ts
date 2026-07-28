import {
  SiteAuditResult,
  KeywordResearchResult,
  SerpAnalysisResult,
  BacklinkReportResult,
  ContentGapResult,
  InternalLinksResult,
  HeaderInspectResult,
  ContentOptimizeResult,
  GeoAuditResult,
} from '../types';

export async function runSiteAudit(url: string): Promise<SiteAuditResult> {
  const response = await fetch('/api/audit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to analyze site URL');
  }

  return response.json();
}

export async function runKeywordResearch(
  seedKeyword: string,
  country: string = 'United States'
): Promise<KeywordResearchResult> {
  const response = await fetch('/api/keywords', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ seedKeyword, country }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to conduct keyword research');
  }

  return response.json();
}

export async function runSerpAnalysis(
  query: string
): Promise<SerpAnalysisResult> {
  const response = await fetch('/api/serp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to analyze SERP');
  }

  return response.json();
}

export async function runBacklinkReport(
  domain: string
): Promise<BacklinkReportResult> {
  const response = await fetch('/api/backlinks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ domain }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to fetch backlink report');
  }

  return response.json();
}

export async function runContentGap(
  targetDomain: string,
  competitors: string[]
): Promise<ContentGapResult> {
  const response = await fetch('/api/content-gap', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ targetDomain, competitors }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to execute content gap analysis');
  }

  return response.json();
}

export async function generateSchema(
  type: string,
  inputs: Record<string, any>
): Promise<{ type: string; jsonLd: any; explanation: string }> {
  const response = await fetch('/api/schema-gen', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, inputs }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to generate JSON-LD schema');
  }

  return response.json();
}

export async function runInternalLinks(url: string): Promise<InternalLinksResult> {
  const response = await fetch('/api/internal-links', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to analyze internal links');
  }

  return response.json();
}

export async function runHeaderInspect(url: string): Promise<HeaderInspectResult> {
  const response = await fetch('/api/header-inspect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to inspect HTTP headers');
  }

  return response.json();
}

export async function runContentOptimize(
  content: string,
  targetKeyword: string
): Promise<ContentOptimizeResult> {
  const response = await fetch('/api/content-optimize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, targetKeyword }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to analyze content');
  }

  return response.json();
}

export async function runGeoAudit(url: string): Promise<GeoAuditResult> {
  const response = await fetch('/api/geo-audit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to perform GEO & Multi-Region Audit');
  }

  return response.json();
}

