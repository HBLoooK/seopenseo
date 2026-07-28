import React, { useState } from 'react';
import { ContentGapResult } from '../types';
import { runContentGap } from '../services/api';
import {
  GitCompare,
  Search,
  Sparkles,
  AlertCircle,
  TrendingUp,
  FileText,
  Plus,
  X,
  RefreshCw,
} from 'lucide-react';

export const ContentGapView: React.FC = () => {
  const [targetDomain, setTargetDomain] = useState('mysite.com');
  const [competitors, setCompetitors] = useState<string[]>(['ahrefs.com', 'semrush.com']);
  const [newCompetitor, setNewCompetitor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ContentGapResult | null>(null);

  const handleAddCompetitor = () => {
    if (!newCompetitor.trim()) return;
    if (competitors.length >= 3) return;
    setCompetitors([...competitors, newCompetitor.trim()]);
    setNewCompetitor('');
  };

  const handleRemoveCompetitor = (index: number) => {
    setCompetitors(competitors.filter((_, i) => i !== index));
  };

  const handleRunGap = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!targetDomain.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await runContentGap(targetDomain.trim(), competitors);
      setResult(data);
    } catch (err: any) {
      setError(err?.message || 'Content gap analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
            <GitCompare className="w-3.5 h-3.5" />
            <span>Competitive Keyword Gap Matrix</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Free Content Gap & Competitor Keyword Matrix
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Discover high-converting keywords your top competitors rank for that your website is missing entirely or underperforming on.
          </p>

          <form onSubmit={handleRunGap} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Your Target Domain</label>
                <input
                  type="text"
                  value={targetDomain}
                  onChange={(e) => setTargetDomain(e.target.value)}
                  placeholder="e.g. mycompany.com"
                  id="target-domain-input"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Competitors (Up to 3)</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newCompetitor}
                    onChange={(e) => setNewCompetitor(e.target.value)}
                    placeholder="e.g. competitor.com"
                    id="competitor-input"
                    className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddCompetitor}
                    disabled={competitors.length >= 3}
                    className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 flex items-center justify-center disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Competitor Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {competitors.map((comp, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-lg text-xs font-medium flex items-center space-x-1.5"
                >
                  <span>{comp}</span>
                  <button type="button" onClick={() => handleRemoveCompetitor(idx)}>
                    <X className="w-3.5 h-3.5 text-purple-400 hover:text-white" />
                  </button>
                </span>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              id="content-gap-submit-btn"
              className="px-6 py-3 bg-purple-500 hover:bg-purple-400 text-slate-950 font-semibold text-sm rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/20 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing Content Gaps...</span>
                </>
              ) : (
                <>
                  <span>Find Content Gaps</span>
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

      {result && (
        <div className="space-y-6">
          {/* Strategy Brief Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="flex items-center space-x-2 text-purple-400 font-semibold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>AI Content Strategy Roadmap</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">{result.aiStrategyPlan}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Missed Keywords */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span>Missed Keywords ({result.missedKeywords.length})</span>
              </h3>
              <p className="text-xs text-slate-400">Keywords competitors rank for, but you do not rank at all.</p>

              <div className="space-y-2">
                {result.missedKeywords.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-semibold text-white block">{item.keyword}</span>
                      <span className="text-[10px] text-slate-500">
                        Vol: {item.volume.toLocaleString()} • KD: {item.difficulty}%
                      </span>
                    </div>
                    <span className="px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20 font-semibold text-[10px]">
                      Not Ranking
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weak Keywords */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-amber-400" />
                <span>Weak / Underperforming Keywords ({result.weakKeywords.length})</span>
              </h3>
              <p className="text-xs text-slate-400">Keywords where you rank, but competitors hold top spots.</p>

              <div className="space-y-2">
                {result.weakKeywords.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-semibold text-white block">{item.keyword}</span>
                      <span className="text-[10px] text-slate-500">Vol: {item.volume.toLocaleString()}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px]">Your Rank: #{item.yourRank}</span>
                      <span className="text-emerald-400 font-bold text-[10px]">
                        Competitor: #{item.bestCompetitorRank}
                      </span>
                    </div>
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
