import React, { useState } from 'react';
import { runInternalLinks } from '../services/api';
import { InternalLinksResult } from '../types';
import {
  Link2,
  Search,
  AlertTriangle,
  Layers,
  BarChart2,
  ArrowRight,
  ShieldAlert,
  Zap,
} from 'lucide-react';

export const InternalLinkView: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InternalLinksResult | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await runInternalLinks(url.trim());
      setResult(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to analyze internal links');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
            <Link2 className="w-3.5 h-3.5" />
            <span>PageRank & Architecture Analyzer</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Internal Link & PageRank Flow Engine
          </h1>
          <p className="text-slate-400 text-sm mt-2 leading-relaxed">
            Audit internal navigation depth, detect orphan pages without incoming links, and calculate internal PageRank distribution to boost crawl efficiency.
          </p>

          <form onSubmit={handleAnalyze} className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter website domain (e.g., wikipedia.org or github.com)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20 text-sm flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Mapping Links...</span>
                </>
              ) : (
                <>
                  <span>Map Internal Links</span>
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
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4">
              <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                Pages Crawled
              </div>
              <div className="text-2xl font-bold text-white">{result.totalPagesScanned}</div>
              <div className="text-[11px] text-slate-500 mt-1">Found in sitemap</div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4">
              <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                Internal Links
              </div>
              <div className="text-2xl font-bold text-emerald-400">{result.totalInternalLinks}</div>
              <div className="text-[11px] text-slate-500 mt-1">Cross-page connections</div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4">
              <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                Internal PageRank Score
              </div>
              <div className="text-2xl font-bold text-cyan-400">{result.internalPageRankScore}/100</div>
              <div className="text-[11px] text-slate-500 mt-1">Crawl efficiency index</div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4">
              <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                Orphan Pages
              </div>
              <div className="text-2xl font-bold text-amber-400">{result.orphanPages.length}</div>
              <div className="text-[11px] text-slate-500 mt-1">Requires internal links</div>
            </div>
          </div>

          {/* Orphan Pages Alert Box */}
          {result.orphanPages.length > 0 && (
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm mb-3">
                <ShieldAlert className="w-5 h-5" />
                <span>Orphan Pages Detected ({result.orphanPages.length})</span>
              </div>
              <p className="text-xs text-slate-300 mb-3">
                Orphan pages have 0 internal links from main navigation. Search engines may struggle to discover and index them.
              </p>
              <div className="space-y-2">
                {result.orphanPages.map((op, i) => (
                  <div key={i} className="bg-slate-950/80 border border-slate-800 rounded-lg p-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="font-mono text-emerald-400 truncate">{op.url}</span>
                    <span className="text-slate-400">{op.reason}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PageRank Distribution Table */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-6">
            <h3 className="text-base font-bold text-white mb-4 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Top Internal PageRank Share</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[11px]">
                    <th className="py-3 px-4">Page URL</th>
                    <th className="py-3 px-4">Incoming Links</th>
                    <th className="py-3 px-4">Outgoing Links</th>
                    <th className="py-3 px-4">PageRank Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {result.topInternalPages.map((page, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-mono text-slate-200">{page.url}</td>
                      <td className="py-3 px-4 font-semibold text-emerald-400">{page.incomingLinks}</td>
                      <td className="py-3 px-4 text-slate-400">{page.outgoingLinks}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-24 bg-slate-950 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-emerald-500 h-full rounded-full"
                              style={{ width: `${Math.min(100, page.pageRankShare * 3)}%` }}
                            />
                          </div>
                          <span className="font-bold text-white">{page.pageRankShare}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
