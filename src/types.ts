export type ToolTab =
  | 'audit'
  | 'keywords'
  | 'serp'
  | 'backlinks'
  | 'content-gap'
  | 'schema'
  | 'robots-sitemap'
  | 'internal-links'
  | 'snippet-preview'
  | 'header-inspector'
  | 'content-optimizer'
  | 'geo'
  | 'open-api';

export interface AuditIssue {
  id: string;
  type: 'critical' | 'warning' | 'notice' | 'pass';
  title: string;
  description: string;
  recommendation: string;
  category: 'technical' | 'content' | 'meta' | 'mobile' | 'performance';
}

export interface HeadingItem {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  text: string;
}

export interface SchemaItem {
  type: string;
  rawJson: string;
  isValid: boolean;
}

export interface SiteAuditResult {
  url: string;
  domain: string;
  scrapedAt: string;
  healthScore: number;
  metadata: {
    title: string;
    titleLength: number;
    description: string;
    descriptionLength: number;
    canonicalUrl: string;
    viewport: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    language?: string;
    charset?: string;
    robotsMeta?: string;
  };
  contentStats: {
    wordCount: number;
    readingTimeMinutes: number;
    headings: HeadingItem[];
    imagesTotal: number;
    imagesMissingAlt: number;
    internalLinksCount: number;
    externalLinksCount: number;
  };
  schemas: SchemaItem[];
  issues: AuditIssue[];
  performanceMetrics: {
    estimatedLcpMs: number;
    estimatedFidMs: number;
    estimatedCls: number;
    ttfbMs: number;
    mobileScore: number;
    desktopScore: number;
  };
  aiInsights: {
    summary: string;
    searchIntent: string;
    readabilityGrade: string;
    topKeywordsFound: string[];
    contentOpportunities: string[];
  };
}

export interface KeywordIdea {
  keyword: string;
  monthlyVolume: number;
  difficulty: number; // 0-100
  cpc: number; // in USD
  intent: 'Informational' | 'Navigational' | 'Commercial' | 'Transactional';
  trend: 'Upward' | 'Stable' | 'Declining' | 'Seasonal';
  competition: 'Low' | 'Medium' | 'High';
  paaQuestions: string[];
  lsiKeywords: string[];
}

export interface KeywordResearchResult {
  seedKeyword: string;
  country: string;
  totalVolume: number;
  avgDifficulty: number;
  keywords: KeywordIdea[];
  relatedQuestions: string[];
  keywordClusters: {
    clusterName: string;
    keywords: string[];
  }[];
  groundingSources?: { title: string; url: string }[];
}

export interface SerpResultItem {
  position: number;
  title: string;
  url: string;
  domain: string;
  snippet: string;
  domainRating: number;
  wordCount: number;
  targetKeywordDensity: string;
  snippetScore: number; // 0-100
}

export interface SerpAnalysisResult {
  query: string;
  searchVolume: number;
  serpDifficulty: number;
  results: SerpResultItem[];
  featuredSnippetPresent: boolean;
  peopleAlsoAsk: string[];
  aiSerpSummary: string;
}

export interface BacklinkItem {
  id: string;
  sourceUrl: string;
  sourceDomain: string;
  sourceDomainRating: number;
  targetUrl: string;
  anchorText: string;
  isDoFollow: boolean;
  firstDiscovered: string;
  spamScore: number; // 0-100
}

export interface BacklinkReportResult {
  targetDomain: string;
  domainRating: number;
  urlRating: number;
  totalBacklinks: number;
  referringDomains: number;
  doFollowRatio: number; // percentage
  anchorDistribution: { anchor: string; percentage: number; count: number }[];
  topPages: { url: string; backlinksCount: number; referringDomains: number }[];
  recentBacklinks: BacklinkItem[];
  toxicLinksCount: number;
}

export interface ContentGapResult {
  targetDomain: string;
  competitors: string[];
  missedKeywords: {
    keyword: string;
    volume: number;
    difficulty: number;
    competitorRanks: { [competitor: string]: number };
  }[];
  weakKeywords: {
    keyword: string;
    volume: number;
    yourRank: number;
    bestCompetitorRank: number;
  }[];
  aiStrategyPlan: string;
}

export interface InternalLinksResult {
  domain: string;
  totalPagesScanned: number;
  totalInternalLinks: number;
  internalPageRankScore: number;
  orphanPages: { url: string; reason: string }[];
  depthDistribution: { depth: number; pagesCount: number }[];
  anchorDiversity: { anchorText: string; count: number; percentage: number }[];
  topInternalPages: { url: string; incomingLinks: number; outgoingLinks: number; pageRankShare: number }[];
}

export interface HeaderInspectResult {
  url: string;
  statusCode: number;
  statusText: string;
  protocol: string;
  ipAddress?: string;
  responseTimeMs: number;
  sslValid: boolean;
  sslDetails?: { issuer: string; validUntil: string; daysRemaining: number };
  headers: Record<string, string>;
  securityAnalysis: {
    hsts: boolean;
    csp: boolean;
    xFrameOptions: boolean;
    xContentTypeOptions: boolean;
    referrerPolicy: boolean;
  };
  seoDirectives: {
    canonicalHeader?: string;
    xRobotsTag?: string;
    compression: 'brotli' | 'gzip' | 'none';
    cacheControl?: string;
  };
}

export interface ContentOptimizeResult {
  targetKeyword: string;
  wordCount: number;
  keywordCount: number;
  keywordDensity: number;
  readabilityGrade: string;
  fleschScore: number;
  readingTimeMinutes: number;
  headingStructure: {
    h1Count: number;
    h2Count: number;
    h3Count: number;
    isBalanced: boolean;
    recommendation: string;
  };
  missingLsiKeywords: { keyword: string; recommendedFrequency: number; count: number }[];
  actionableTips: string[];
}

export interface GeoAuditResult {
  url: string;
  domain: string;
  geoScore: number;
  aiCitationScore: number; // Generative Engine Optimization index
  entityClarityScore: number;
  localGeoTargetingScore: number;
  aiBotAccess: {
    gptBot: boolean;
    perplexityBot: boolean;
    claudeBot: boolean;
    googleExtended: boolean;
  };
  hreflangMapping: {
    lang: string;
    url: string;
    isValid: boolean;
  }[];
  schemaEntitiesDetected: string[];
  geoDirectives: {
    countryTargeting?: string;
    napDetected: boolean;
    geoCoordinates?: { lat: number; lng: number };
  };
  geoRecommendations: string[];
  aiSearchCitationPrompts: string[];
}

