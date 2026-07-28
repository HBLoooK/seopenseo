import React, { useState } from 'react';
import { runContentOptimize } from '../services/api';
import { ContentOptimizeResult } from '../types';
import {
  FileText,
  Search,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Zap,
} from 'lucide-react';

export const ContentOptimizerView: React.FC = () => {
  const [content, setContent] = useState(
    `# Ultimate Guide to Modern SEO Tools in 2026\n\nSearch engine optimization has transformed into a high-speed technical discipline. To rank effectively on Google, content writers and web developers need lightweight, real-time diagnostic tools.\n\n## Why Free SEO Tools Matter\n\nMost commercial SEO software suites charge over $100 per month for basic keyword lookups. SEOpenSEO provides instant site audits, canonical checks, and JSON-LD schema generation with open web standards.`
  );
  const [targetKeyword, setTargetKeyword] = useState('free seo tools');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ContentOptimizeResult | null>(null);

  const handleOptimize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await runContentOptimize(content, targetKeyword);
      setResult(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to analyze content');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
            <FileText className="w-3.5 h-3.5" />
            <span>Readability & Keyword Density Engine</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            On-Page Content & Readability Optimizer
          </h1>
          <p className="text-slate-400 text-sm mt-2 leading-relaxed">
            Paste raw Markdown or article copy to analyze target keyword density, calculate Flesch-Kincaid reading grade levels, check heading balance, and find missing LSI terms.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-6 space-y-6">
          <form onSubmit={handleOptimize} className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Primary Keyword</label>
              <input
                type="text"
                value={targetKeyword}
                onChange={(e) => setTargetKeyword(e.target.value)}
                placeholder="e.g. free seo tools"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Article Text / Markdown Body</label>
              <textarea
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste article body here..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !content.trim()}
              className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 text-sm flex items-center justify-center space-x-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing Copy...</span>
                </>
              ) : (
                <>
                  <span>Run Content Optimization</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 text-rose-400 text-sm flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-6 space-y-6">
          {result ? (
            <div className="space-y-6 animate-fade-in">
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4">
                  <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Word Count
                  </div>
                  <div className="text-2xl font-bold text-white">{result.wordCount}</div>
                  <div className="text-[11px] text-slate-500 mt-1">Est. {result.readingTimeMinutes} min read</div>
                </div>

                <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4">
                  <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Keyword Density
                  </div>
                  <div className="text-2xl font-bold text-emerald-400">{result.keywordDensity}%</div>
                  <div className="text-[11px] text-slate-500 mt-1">{result.keywordCount} exact matches</div>
                </div>

                <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4">
                  <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Flesch Reading Ease
                  </div>
                  <div className="text-2xl font-bold text-cyan-400">{result.fleschScore}/100</div>
                  <div className="text-[11px] text-slate-500 mt-1">{result.readabilityGrade}</div>
                </div>

                <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4">
                  <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Headings Balance
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    H1: {result.headingStructure.h1Count} • H2: {result.headingStructure.h2Count}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">{result.headingStructure.recommendation}</div>
                </div>
              </div>

              {/* Actionable Tips */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
                <h3 className="text-base font-bold text-white mb-3 flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span>SEO Content Recommendations</span>
                </h3>

                <div className="space-y-2">
                  {result.actionableTips.map((tip, i) => (
                    <div key={i} className="flex items-start space-x-2.5 text-xs text-slate-300 bg-slate-950 border border-slate-800 p-3 rounded-xl">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* LSI Terms Checklist */}
              {result.missingLsiKeywords.length > 0 && (
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
                  <h3 className="text-base font-bold text-white mb-3 flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>LSI & Semantic Keyword Inclusion</span>
                  </h3>

                  <div className="space-y-2">
                    {result.missingLsiKeywords.map((lsi, i) => (
                      <div key={i} className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="font-mono text-slate-200">{lsi.keyword}</span>
                        <div className="flex items-center space-x-3">
                          <span className="text-slate-400">Found: <strong className="text-white">{lsi.count}</strong></span>
                          <span className="text-slate-500">Rec: {lsi.recommendedFrequency}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-12 text-center text-slate-500">
              <BookOpen className="w-10 h-10 mx-auto text-slate-700 mb-3" />
              <p className="text-sm">Enter your article copy and click "Run Content Optimization" to view real-time readability and keyword metrics.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
