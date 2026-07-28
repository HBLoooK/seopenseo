import React, { useState } from 'react';
import { KeywordResearchResult, KeywordIdea } from '../types';
import { runKeywordResearch } from '../services/api';
import {
  KeyRound,
  Search,
  Sparkles,
  TrendingUp,
  Download,
  Copy,
  Check,
  Globe,
  Filter,
  HelpCircle,
  Layers,
  ArrowUpDown,
  RefreshCw,
} from 'lucide-react';

export const KeywordResearchView: React.FC = () => {
  const [seedKeyword, setSeedKeyword] = useState('seo tools');
  const [country, setCountry] = useState('United States');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<KeywordResearchResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [sortField, setSortField] = useState<'volume' | 'kd' | 'cpc'>('volume');
  const [sortAsc, setSortAsc] = useState(false);

  const handleResearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!seedKeyword.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await runKeywordResearch(seedKeyword.trim(), country);
      setResult(data);
    } catch (err: any) {
      setError(err?.message || 'Keyword research failed');
    } finally {
      setLoading(false);
    }
  };

  const sortedKeywords = result
    ? [...result.keywords].sort((a, b) => {
        if (sortField === 'volume') {
          return sortAsc ? a.monthlyVolume - b.monthlyVolume : b.monthlyVolume - a.monthlyVolume;
        } else if (sortField === 'kd') {
          return sortAsc ? a.difficulty - b.difficulty : b.difficulty - a.difficulty;
        } else {
          return sortAsc ? a.cpc - b.cpc : b.cpc - a.cpc;
        }
      })
    : [];

  const handleExportCsv = () => {
    if (!result) return;
    const headers = ['Keyword', 'Monthly Volume', 'Keyword Difficulty (KD)', 'CPC ($)', 'Intent', 'Competition', 'Trend'];
    const rows = result.keywords.map((k) => [
      `"${k.keyword}"`,
      k.monthlyVolume,
      k.difficulty,
      k.cpc,
      k.intent,
      k.competition,
      k.trend,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `keywords_${result.seedKeyword.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyKeywords = () => {
    if (!result) return;
    const text = result.keywords.map((k) => `${k.keyword}\tVol: ${k.monthlyVolume}\tKD: ${k.difficulty}%`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getIntentBadge = (intent: KeywordIdea['intent']) => {
    switch (intent) {
      case 'Informational':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Commercial':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Transactional':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Navigational':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  const getKdColor = (kd: number) => {
    if (kd <= 29) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (kd <= 59) return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    return 'text-red-400 bg-red-500/10 border-red-500/20';
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
            <KeyRound className="w-3.5 h-3.5" />
            <span>Google Search Grounding & Keyword Expansion Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Free Keyword Explorer & Keyword Difficulty Analyzer
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Uncover search volume metrics, keyword difficulty scores, cost-per-click estimates, search intent, and long-tail query clusters without paywalls.
          </p>

          <form onSubmit={handleResearch} className="flex flex-col sm:flex-row gap-3 pt-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={seedKeyword}
                onChange={(e) => setSeedKeyword(e.target.value)}
                placeholder="Enter seed keyword (e.g., email marketing, running shoes, web dev)"
                id="keyword-input"
                className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>

            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="United States">🇺🇸 United States</option>
              <option value="United Kingdom">🇬🇧 United Kingdom</option>
              <option value="Canada">🇨🇦 Canada</option>
              <option value="Australia">🇦🇺 Australia</option>
              <option value="Germany">🇩🇪 Germany</option>
              <option value="India">🇮🇳 India</option>
              <option value="Global">🌐 Global Search</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              id="keyword-submit-btn"
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Exploring...</span>
                </>
              ) : (
                <>
                  <span>Search Ideas</span>
                  <Sparkles className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Presets */}
          <div className="flex items-center space-x-2 text-xs text-slate-400 pt-1 flex-wrap gap-y-2">
            <span className="text-slate-500 font-medium">Quick examples:</span>
            {['ai content writer', 'best laptops 2026', 'sourdough bread recipe', 'local plumbing service'].map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setSeedKeyword(ex)}
                className="px-2.5 py-1 bg-slate-800/80 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-700/60 transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Results View */}
      {result && (
        <div className="space-y-6">
          {/* Metrics Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
              <span className="text-xs text-slate-400 font-semibold">Total Estimated Search Volume</span>
              <div className="my-2 flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-white">{result.totalVolume.toLocaleString()}</span>
                <span className="text-xs text-slate-400">searches / mo</span>
              </div>
              <div className="text-xs text-cyan-400 flex items-center space-x-1">
                <Globe className="w-3.5 h-3.5" />
                <span>Target Region: {result.country}</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
              <span className="text-xs text-slate-400 font-semibold">Average Keyword Difficulty (KD)</span>
              <div className="my-2 flex items-baseline space-x-2">
                <span className={`text-3xl font-bold ${getKdColor(result.avgDifficulty).split(' ')[0]}`}>
                  {result.avgDifficulty}%
                </span>
                <span className="text-xs text-slate-400">
                  {result.avgDifficulty <= 30
                    ? 'Easy to Rank'
                    : result.avgDifficulty <= 60
                    ? 'Medium Competition'
                    : 'Hard / Established Brands'}
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-cyan-400 h-full rounded-full"
                  style={{ width: `${result.avgDifficulty}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
              <span className="text-xs text-slate-400 font-semibold">Total Keyword Ideas Found</span>
              <div className="my-2">
                <span className="text-3xl font-bold text-white">{result.keywords.length}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleExportCsv}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg flex items-center space-x-1 border border-slate-700"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={handleCopyKeywords}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg flex items-center space-x-1 border border-slate-700"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy List'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Keywords Table & Sidebar Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Table (2 cols) */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <KeyRound className="w-5 h-5 text-cyan-400" />
                  <span>Keyword Ideas & Intent Breakdown</span>
                </h3>
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <span>Sort by:</span>
                  <button
                    onClick={() => {
                      if (sortField === 'volume') setSortAsc(!sortAsc);
                      else {
                        setSortField('volume');
                        setSortAsc(false);
                      }
                    }}
                    className={`px-2 py-1 rounded border ${
                      sortField === 'volume' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' : 'border-slate-800'
                    }`}
                  >
                    Volume
                  </button>
                  <button
                    onClick={() => {
                      if (sortField === 'kd') setSortAsc(!sortAsc);
                      else {
                        setSortField('kd');
                        setSortAsc(true);
                      }
                    }}
                    className={`px-2 py-1 rounded border ${
                      sortField === 'kd' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' : 'border-slate-800'
                    }`}
                  >
                    Difficulty
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-3">Keyword</th>
                      <th className="py-3 px-3">Volume</th>
                      <th className="py-3 px-3">KD %</th>
                      <th className="py-3 px-3">CPC ($)</th>
                      <th className="py-3 px-3">Intent</th>
                      <th className="py-3 px-3">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {sortedKeywords.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-3 font-medium text-white">{item.keyword}</td>
                        <td className="py-3 px-3 font-mono">{item.monthlyVolume.toLocaleString()}</td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded font-bold border text-[10px] ${getKdColor(item.difficulty)}`}>
                            {item.difficulty}%
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-400">${item.cpc.toFixed(2)}</td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded border text-[10px] font-semibold ${getIntentBadge(item.intent)}`}>
                            {item.intent}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-400 flex items-center space-x-1">
                          <TrendingUp className="w-3 h-3 text-emerald-400" />
                          <span>{item.trend}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sidebar: PAA & Clusters */}
            <div className="space-y-4">
              {/* Keyword Clusters */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Keyword Topic Clusters</span>
                </h3>
                <div className="space-y-3">
                  {result.keywordClusters.map((cluster, i) => (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <span className="text-xs font-semibold text-cyan-300 block">{cluster.clusterName}</span>
                      <div className="flex flex-wrap gap-1">
                        {cluster.keywords.map((kw, j) => (
                          <span key={j} className="px-2 py-0.5 bg-slate-900 text-slate-300 rounded text-[10px] border border-slate-800">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* People Also Ask */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <HelpCircle className="w-4 h-4 text-cyan-400" />
                  <span>People Also Ask (PAA)</span>
                </h3>
                <div className="space-y-2">
                  {result.relatedQuestions.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 flex items-start justify-between"
                    >
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grounding Citations */}
              {result.groundingSources && result.groundingSources.length > 0 && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs space-y-2">
                  <span className="text-slate-400 font-semibold block">Live Search Citations</span>
                  <div className="space-y-1">
                    {result.groundingSources.slice(0, 3).map((source, i) => (
                      <a
                        key={i}
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-400 hover:underline block truncate"
                      >
                        • {source.title || source.url}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
