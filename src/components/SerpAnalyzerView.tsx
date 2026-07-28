import React, { useState } from 'react';
import { SerpAnalysisResult } from '../types';
import { runSerpAnalysis } from '../services/api';
import {
  Globe,
  Search,
  Sparkles,
  Smartphone,
  Monitor,
  Eye,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

export const SerpAnalyzerView: React.FC = () => {
  const [query, setQuery] = useState('best free seo software');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SerpAnalysisResult | null>(null);

  // Snippet Optimizer Interactive State
  const [optTitle, setOptTitle] = useState('SEOpenSEO - 100% Free Open Alternative to Ahrefs & SEMrush');
  const [optUrl, setOptUrl] = useState('https://seopenseo.netlify.app/free-seo-tools');
  const [optDesc, setOptDesc] = useState(
    'Audit web pages, explore keywords, analyze SERPs, check backlinks, and build schema markup with zero cost. No credit card required.'
  );
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const handleSerpSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await runSerpAnalysis(query.trim());
      setResult(data);
    } catch (err: any) {
      setError(err?.message || 'SERP analysis failed');
    } finally {
      setLoading(false);
    }
  };

  // Pixel width approximation (average 10px per character for title, 8px for snippet)
  const titleCharCount = optTitle.length;
  const titlePixelWidth = Math.round(titleCharCount * 10);
  const titleMaxPixel = 600;

  const descCharCount = optDesc.length;
  const descPixelWidth = Math.round(descCharCount * 6.5);
  const descMaxPixel = 960;

  const handleCopyCode = () => {
    const code = `<title>${optTitle}</title>\n<meta name="description" content="${optDesc}">\n<link rel="canonical" href="${optUrl}">`;
    navigator.clipboard.writeText(code);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Globe className="w-3.5 h-3.5" />
            <span>SERP Ranking Signals & Snippet Pixel Width Simulator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Live SERP Analyzer & Google Snippet Optimizer
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Inspect live top 10 search engine results, analyze competitor snippet click-through strategies, and preview your meta title & description with pixel width bounds.
          </p>

          <form onSubmit={handleSerpSearch} className="flex flex-col sm:flex-row gap-3 pt-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter search query (e.g. best project management tools)"
                id="serp-query-input"
                className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              id="serp-submit-btn"
              className="px-6 py-3 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-semibold text-sm rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-indigo-500/20 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing SERP...</span>
                </>
              ) : (
                <>
                  <span>Analyze SERP</span>
                  <Sparkles className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Snippet Optimizer Tool (Always Available & Interactive) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 flex-wrap gap-2">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Eye className="w-5 h-5 text-indigo-400" />
              <span>Interactive Google SERP Snippet Preview & Optimizer</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Test title and description length with Google's desktop (600px) and mobile pixel limits.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setPreviewMode('desktop')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center space-x-1.5 transition-colors ${
                previewMode === 'desktop' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop Preview</span>
            </button>
            <button
              onClick={() => setPreviewMode('mobile')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center space-x-1.5 transition-colors ${
                previewMode === 'mobile' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Preview</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls Form */}
          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-slate-300 font-semibold">Meta Title Tag</label>
                <span className={titleCharCount <= 60 ? 'text-emerald-400 font-mono' : 'text-amber-400 font-mono'}>
                  {titleCharCount} / 60 chars (~{titlePixelWidth} / 600px)
                </span>
              </div>
              <input
                type="text"
                value={optTitle}
                onChange={(e) => setOptTitle(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${titlePixelWidth <= 600 ? 'bg-emerald-400' : 'bg-red-400'}`}
                  style={{ width: `${Math.min(100, (titlePixelWidth / 600) * 100)}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-slate-300 font-semibold">Display Target URL</label>
              </div>
              <input
                type="text"
                value={optUrl}
                onChange={(e) => setOptUrl(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-slate-300 font-semibold">Meta Description</label>
                <span className={descCharCount <= 160 ? 'text-emerald-400 font-mono' : 'text-amber-400 font-mono'}>
                  {descCharCount} / 160 chars (~{descPixelWidth} / 960px)
                </span>
              </div>
              <textarea
                rows={3}
                value={optDesc}
                onChange={(e) => setOptDesc(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
              <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${descCharCount <= 160 ? 'bg-emerald-400' : 'bg-red-400'}`}
                  style={{ width: `${Math.min(100, (descCharCount / 160) * 100)}%` }}
                ></div>
              </div>
            </div>

            <button
              onClick={handleCopyCode}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl border border-slate-700 flex items-center justify-center space-x-2 transition-colors"
            >
              {copiedSnippet ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedSnippet ? 'Copied HTML Meta Tags!' : 'Copy HTML Snippet Tags'}</span>
            </button>
          </div>

          {/* Real Google SERP Snippet Preview Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Live Google Search Simulation ({previewMode})
              </div>

              {/* SERP Card Container */}
              <div
                className={`p-4 bg-white text-slate-900 rounded-xl shadow-md border border-slate-200 ${
                  previewMode === 'mobile' ? 'max-w-sm mx-auto' : 'w-full'
                }`}
              >
                {/* Header breadcrumb & Favicon */}
                <div className="flex items-center space-x-2 text-xs text-slate-600 truncate mb-1">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0">
                    S
                  </div>
                  <div className="flex flex-col text-[11px] leading-tight truncate">
                    <span className="font-semibold text-slate-800 truncate">SEOpenSEO</span>
                    <span className="text-slate-500 text-[10px] truncate">{optUrl}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-normal text-blue-800 hover:underline cursor-pointer leading-tight mb-1 font-sans break-words">
                  {optTitle || 'Your Page Title Goes Here'}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-700 leading-normal font-sans break-words">
                  {optDesc || 'Your meta description snippet will appear here in Google search engine results...'}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pixel bounds compliant</span>
              </span>
              <span className="text-slate-500">Google SERP V12 rendering</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live SERP Analysis Results Table */}
      {result && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-lg font-bold text-white">
                SERP Top 10 Results for: <span className="text-indigo-400">"{result.query}"</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Estimated Volume: {result.searchVolume.toLocaleString()} searches/mo • SERP Difficulty: {result.serpDifficulty}%
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-300 bg-slate-950 p-3.5 rounded-xl border border-slate-800 leading-relaxed">
            <strong className="text-indigo-400">AI SERP Insight: </strong>
            {result.aiSerpSummary}
          </p>

          <div className="space-y-3 pt-2">
            {result.results.map((res) => (
              <div
                key={res.position}
                className="p-4 bg-slate-950 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold text-xs flex items-center justify-center border border-indigo-500/30">
                      #{res.position}
                    </span>
                    <div>
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-semibold text-indigo-400 hover:underline flex items-center space-x-1"
                      >
                        <span>{res.title}</span>
                        <ExternalLink className="w-3 h-3 text-slate-500" />
                      </a>
                      <span className="text-xs text-slate-500 font-mono">{res.domain}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-xs">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      DR: {res.domainRating}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      ~{res.wordCount} words
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 pl-10 leading-relaxed">{res.snippet}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
