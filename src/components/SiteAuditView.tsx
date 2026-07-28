import React, { useState } from 'react';
import { SiteAuditResult } from '../types';
import { runSiteAudit } from '../services/api';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  ExternalLink,
  Layers,
  Image as ImageIcon,
  Link,
  Code,
  Gauge,
  ArrowRight,
  RefreshCw,
  FileText,
} from 'lucide-react';

export const SiteAuditView: React.FC = () => {
  const [inputUrl, setInputUrl] = useState('https://github.com');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SiteAuditResult | null>(null);
  const [issueFilter, setIssueFilter] = useState<'all' | 'critical' | 'warning' | 'pass'>('all');

  const handleAudit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputUrl.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await runSiteAudit(inputUrl.trim());
      setResult(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to analyze URL');
    } finally {
      setLoading(false);
    }
  };

  const filteredIssues = result?.issues.filter((issue) => {
    if (issueFilter === 'all') return true;
    return issue.type === issueFilter;
  });

  const criticalCount = result?.issues.filter((i) => i.type === 'critical').length || 0;
  const warningCount = result?.issues.filter((i) => i.type === 'warning').length || 0;
  const passCount = result?.issues.filter((i) => i.type === 'pass').length || 0;

  return (
    <div className="space-y-6">
      {/* Search Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Powered Full Web Page Crawler & Auditor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Free On-Page & Technical SEO Site Audit
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Scan any live URL to detect indexability issues, meta tag flaws, missing alt texts, header hierarchy gaps, and schema markup validity.
          </p>

          {/* Input Bar */}
          <form onSubmit={handleAudit} className="flex flex-col sm:flex-row gap-3 pt-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Enter domain or URL (e.g. github.com or https://mysite.com/blog)"
                id="audit-url-input"
                className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              id="audit-submit-btn"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Crawling & Auditing...</span>
                </>
              ) : (
                <>
                  <span>Audit URL</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Presets */}
          <div className="flex items-center space-x-2 text-xs text-slate-400 pt-1 flex-wrap gap-y-2">
            <span className="text-slate-500 font-medium">Try example:</span>
            {['github.com', 'wikipedia.org', 'dev.to'].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => {
                  setInputUrl(`https://${preset}`);
                }}
                className="px-2.5 py-1 bg-slate-800/80 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-700/60 transition-colors"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center space-x-3">
          <XCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Results View */}
      {result && (
        <div className="space-y-6">
          {/* Top Health Score Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Health Score Gauge Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Overall SEO Score
              </span>
              <div className="relative flex items-center justify-center w-28 h-28 my-1">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={
                      result.healthScore >= 80
                        ? 'text-emerald-400'
                        : result.healthScore >= 60
                        ? 'text-amber-400'
                        : 'text-red-400'
                    }
                    strokeDasharray={`${result.healthScore}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-extrabold text-white">{result.healthScore}</span>
                  <span className="text-[10px] text-slate-400 uppercase">out of 100</span>
                </div>
              </div>
              <span className="text-xs text-slate-400 mt-2">
                Target URL: <span className="text-slate-200 font-medium">{result.domain}</span>
              </span>
            </div>

            {/* Quick Stats: Critical, Warnings, Passed */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Critical Errors</span>
                <XCircle className="w-4 h-4 text-red-400" />
              </div>
              <div className="my-2">
                <div className="text-3xl font-bold text-red-400">{criticalCount}</div>
                <p className="text-xs text-slate-400 mt-1">Requires immediate correction</p>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-red-400 h-full rounded-full"
                  style={{ width: `${Math.min(100, (criticalCount / (result.issues.length || 1)) * 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Warnings</span>
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              </div>
              <div className="my-2">
                <div className="text-3xl font-bold text-amber-400">{warningCount}</div>
                <p className="text-xs text-slate-400 mt-1">Optimization opportunities</p>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-400 h-full rounded-full"
                  style={{ width: `${Math.min(100, (warningCount / (result.issues.length || 1)) * 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Passed Checks</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="my-2">
                <div className="text-3xl font-bold text-emerald-400">{passCount}</div>
                <p className="text-xs text-slate-400 mt-1">Healthy compliance</p>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full"
                  style={{ width: `${Math.min(100, (passCount / (result.issues.length || 1)) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* AI Executive Summary Card */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/30 border border-slate-800 rounded-2xl p-6 relative">
            <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-sm mb-2">
              <Sparkles className="w-4 h-4" />
              <span>AI SEO Strategic Summary</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">{result.aiInsights.summary}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-800/80">
              <div>
                <span className="text-xs text-slate-500 font-medium">Search Intent</span>
                <p className="text-sm font-semibold text-white mt-0.5">{result.aiInsights.searchIntent}</p>
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium">Readability Grade</span>
                <p className="text-sm font-semibold text-white mt-0.5">{result.aiInsights.readabilityGrade}</p>
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium">Top Detected Keyphrases</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {result.aiInsights.topKeywordsFound.map((kw, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-xs border border-slate-700"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Tabs Grid: Issues list & On-Page Meta Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Column 1 & 2: Audit Checklist with Filter */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <h3 className="text-base font-bold text-white flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-emerald-400" />
                    <span>Detailed Audit Checklist</span>
                  </h3>
                  <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                    {(
                      [
                        { id: 'all', label: `All (${result.issues.length})` },
                        { id: 'critical', label: `Critical (${criticalCount})` },
                        { id: 'warning', label: `Warnings (${warningCount})` },
                        { id: 'pass', label: `Passed (${passCount})` },
                      ] as const
                    ).map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setIssueFilter(f.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                          issueFilter === f.id
                            ? 'bg-slate-800 text-white font-semibold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredIssues?.map((issue) => (
                    <div
                      key={issue.id}
                      className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl space-y-2 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2.5">
                          {issue.type === 'critical' && <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />}
                          {issue.type === 'warning' && (
                            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                          )}
                          {issue.type === 'pass' && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                          )}
                          <h4 className="text-sm font-semibold text-white">{issue.title}</h4>
                        </div>
                        <span className="px-2 py-0.5 text-[10px] uppercase font-bold rounded bg-slate-800 text-slate-400 border border-slate-700">
                          {issue.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 pl-7">{issue.description}</p>
                      {issue.type !== 'pass' && (
                        <div className="ml-7 p-2.5 bg-slate-900/90 rounded-lg border border-slate-800/60 text-xs text-emerald-300">
                          <strong className="text-emerald-400">Recommendation: </strong>
                          {issue.recommendation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 3: Meta Tags & Scraped DOM Breakdown */}
            <div className="space-y-4">
              {/* Meta Tags Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>On-Page Meta Tags</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Title Tag</span>
                      <span className={result.metadata.titleLength <= 60 ? 'text-emerald-400' : 'text-amber-400'}>
                        {result.metadata.titleLength} chars
                      </span>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 font-mono text-slate-200 break-words">
                      {result.metadata.title || 'None detected'}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Meta Description</span>
                      <span
                        className={
                          result.metadata.descriptionLength >= 120 && result.metadata.descriptionLength <= 160
                            ? 'text-emerald-400'
                            : 'text-amber-400'
                        }
                      >
                        {result.metadata.descriptionLength} chars
                      </span>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 font-mono text-slate-300 break-words">
                      {result.metadata.description || 'None detected'}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">Canonical URL</span>
                      <span className="text-slate-300 truncate block mt-0.5" title={result.metadata.canonicalUrl}>
                        {result.metadata.canonicalUrl ? 'Present' : 'Missing'}
                      </span>
                    </div>
                    <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">Robots Meta</span>
                      <span className="text-slate-300 block mt-0.5">{result.metadata.robotsMeta}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* DOM Stats Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <ImageIcon className="w-4 h-4 text-emerald-400" />
                  <span>Media & Content Structure</span>
                </h3>

                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400">Total Word Count</span>
                    <p className="text-lg font-bold text-white mt-1">{result.contentStats.wordCount.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400">Reading Time</span>
                    <p className="text-lg font-bold text-white mt-1">~{result.contentStats.readingTimeMinutes} min</p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400">Images Total</span>
                    <p className="text-lg font-bold text-white mt-1">{result.contentStats.imagesTotal}</p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400">Missing Alt</span>
                    <p className={`text-lg font-bold mt-1 ${result.contentStats.imagesMissingAlt > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {result.contentStats.imagesMissingAlt}
                    </p>
                  </div>
                </div>

                {/* Heading Hierarchy Preview */}
                <div className="pt-2">
                  <span className="text-xs text-slate-400 font-medium block mb-2">Heading Tree ({result.contentStats.headings.length} tags)</span>
                  <div className="max-h-48 overflow-y-auto space-y-1 bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300">
                    {result.contentStats.headings.length === 0 ? (
                      <span className="text-slate-500 italic">No headings extracted</span>
                    ) : (
                      result.contentStats.headings.map((h, i) => (
                        <div key={i} className="flex items-center space-x-1.5 truncate">
                          <span
                            className={`px-1 rounded text-[9px] font-bold ${
                              h.tag === 'h1'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : h.tag === 'h2'
                                ? 'bg-cyan-500/20 text-cyan-400'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {h.tag.toUpperCase()}
                          </span>
                          <span className="truncate">{h.text}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* JSON-LD Schema Status */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Code className="w-4 h-4 text-emerald-400" />
                  <span>Structured Data ({result.schemas.length} found)</span>
                </h3>
                {result.schemas.length === 0 ? (
                  <p className="text-xs text-slate-400 py-2">
                    No JSON-LD schema markup detected. Use our <strong>Schema Builder</strong> tab to create FAQ or Article schema!
                  </p>
                ) : (
                  <div className="space-y-1.5 pt-1">
                    {result.schemas.map((s, i) => (
                      <div
                        key={i}
                        className="p-2 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between text-xs"
                      >
                        <span className="font-semibold text-emerald-400">{s.type}</span>
                        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                          Valid JSON-LD
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
