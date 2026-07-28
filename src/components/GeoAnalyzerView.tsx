import React, { useState } from 'react';
import { runGeoAudit } from '../services/api';
import { GeoAuditResult } from '../types';
import {
  Globe,
  Search,
  AlertTriangle,
  ArrowRight,
  Bot,
  Sparkles,
  CheckCircle2,
  XCircle,
  MapPin,
  HelpCircle,
  Zap,
} from 'lucide-react';

export const GeoAnalyzerView: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GeoAuditResult | null>(null);

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await runGeoAudit(url.trim());
      setResult(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to perform GEO audit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-4">
            <Bot className="w-3.5 h-3.5" />
            <span>AI Search & Multi-Region Optimization</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Generative Engine Optimization (GEO) & Local Geo Audit
          </h1>
          <p className="text-slate-400 text-sm mt-2 leading-relaxed">
            Optimize your domain for ChatGPT Search, Perplexity, Gemini, and Claude citations. Verify AI crawler access (GPTBot, ClaudeBot), audit <code className="text-cyan-400">hreflang</code> multi-region tags, and validate entity schema clarity.
          </p>

          <form onSubmit={handleAudit} className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter domain URL (e.g. https://wikipedia.org)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-cyan-500/20 text-sm flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Auditing AI & Geo...</span>
                </>
              ) : (
                <>
                  <span>Audit GEO & Location</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 text-rose-400 text-sm flex items-center space-x-3">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {result && (
        <div className="space-y-8 animate-fade-in">
          {/* Executive GEO Scores Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4">
              <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                AI Citation Index (GEO)
              </div>
              <div className="text-2xl font-bold text-cyan-400">{result.aiCitationScore}/100</div>
              <div className="text-[11px] text-slate-500 mt-1">LLM citation readiness</div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4">
              <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                Entity Clarity Index
              </div>
              <div className="text-2xl font-bold text-emerald-400">{result.entityClarityScore}/100</div>
              <div className="text-[11px] text-slate-500 mt-1">Knowledge graph clarity</div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4">
              <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                Geo-Targeting Score
              </div>
              <div className="text-2xl font-bold text-amber-400">{result.localGeoTargetingScore}/100</div>
              <div className="text-[11px] text-slate-500 mt-1">Multi-region & local NAP</div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4">
              <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                Overall GEO Rating
              </div>
              <div className="text-2xl font-bold text-white">{result.geoScore}/100</div>
              <div className="text-[11px] text-emerald-400 mt-1">Grade A (Highly Cited)</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Bot Crawler Access */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Bot className="w-4 h-4 text-cyan-400" />
                <span>AI Search Engine Crawler Status (Robots.txt)</span>
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-300 font-medium">ChatGPT / OpenAI (GPTBot)</span>
                  {result.aiBotAccess.gptBot ? (
                    <span className="text-emerald-400 font-bold flex items-center space-x-1"><CheckCircle2 className="w-4 h-4" /><span>Allowed</span></span>
                  ) : (
                    <span className="text-rose-400 font-bold flex items-center space-x-1"><XCircle className="w-4 h-4" /><span>Blocked</span></span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-300 font-medium">Perplexity AI (PerplexityBot)</span>
                  {result.aiBotAccess.perplexityBot ? (
                    <span className="text-emerald-400 font-bold flex items-center space-x-1"><CheckCircle2 className="w-4 h-4" /><span>Allowed</span></span>
                  ) : (
                    <span className="text-rose-400 font-bold flex items-center space-x-1"><XCircle className="w-4 h-4" /><span>Blocked</span></span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-300 font-medium">Anthropic Claude (ClaudeBot)</span>
                  {result.aiBotAccess.claudeBot ? (
                    <span className="text-emerald-400 font-bold flex items-center space-x-1"><CheckCircle2 className="w-4 h-4" /><span>Allowed</span></span>
                  ) : (
                    <span className="text-rose-400 font-bold flex items-center space-x-1"><XCircle className="w-4 h-4" /><span>Blocked</span></span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-300 font-medium">Google Gemini (Google-Extended)</span>
                  {result.aiBotAccess.googleExtended ? (
                    <span className="text-emerald-400 font-bold flex items-center space-x-1"><CheckCircle2 className="w-4 h-4" /><span>Allowed</span></span>
                  ) : (
                    <span className="text-rose-400 font-bold flex items-center space-x-1"><XCircle className="w-4 h-4" /><span>Blocked</span></span>
                  )}
                </div>
              </div>
            </div>

            {/* Geo Location & Multi-Region Directives */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>Multi-Region & Local Geo Directives</span>
              </h3>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Target Region / Language:</span>
                  <span className="font-semibold text-white">{result.geoDirectives.countryTargeting}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">NAP (Name Address Phone) Detected:</span>
                  <span className={`font-semibold ${result.geoDirectives.napDetected ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {result.geoDirectives.napDetected ? 'Yes (Local Schema Valid)' : 'No (Global Digital)'}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <div className="text-xs font-semibold text-slate-300">Detected Hreflang Language Mappings</div>
                <div className="space-y-1.5">
                  {result.hreflangMapping.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="font-mono text-cyan-400 uppercase font-bold">{item.lang}</span>
                      <span className="font-mono text-slate-300 truncate max-w-[220px]">{item.url}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Strategic GEO Recommendations & AI Prompts */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>GEO (AI Search Optimization) Action Plan</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Directives to Increase AI Citations</div>
                {result.geoRecommendations.map((rec, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs text-slate-300 bg-slate-950 border border-slate-800 p-3 rounded-xl">
                    <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Test Prompts for AI Engines</div>
                {result.aiSearchCitationPrompts.map((prompt, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-cyan-300 bg-slate-950 border border-slate-800 p-3 rounded-xl">
                    <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="font-mono">"{prompt}"</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
