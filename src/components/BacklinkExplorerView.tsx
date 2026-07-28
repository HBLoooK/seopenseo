import React, { useState } from 'react';
import { BacklinkReportResult } from '../types';
import { runBacklinkReport } from '../services/api';
import {
  Link2,
  Search,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  ExternalLink,
  PieChart,
  Layers,
  RefreshCw,
  Award,
} from 'lucide-react';

export const BacklinkExplorerView: React.FC = () => {
  const [domain, setDomain] = useState('vercel.com');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<BacklinkReportResult | null>(null);

  const handleFetchBacklinks = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!domain.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await runBacklinkReport(domain.trim());
      setReport(data);
    } catch (err: any) {
      setError(err?.message || 'Backlink check failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Link2 className="w-3.5 h-3.5" />
            <span>Open Backlink & Domain Authority Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Free Backlink Checker & Domain Rating Explorer
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Analyze referring domains, backlink growth, dofollow vs nofollow ratios, anchor text diversity, and toxic link risks for any domain.
          </p>

          <form onSubmit={handleFetchBacklinks} className="flex flex-col sm:flex-row gap-3 pt-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="Enter domain (e.g. vercel.com, shopify.com, stripe.com)"
                id="backlink-domain-input"
                className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              id="backlink-submit-btn"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Fetching Backlinks...</span>
                </>
              ) : (
                <>
                  <span>Check Domain</span>
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

      {report && (
        <div className="space-y-6">
          {/* Top Rating Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
              <span className="text-xs text-slate-400 font-semibold flex items-center space-x-1">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Domain Rating (DR)</span>
              </span>
              <div className="my-2">
                <span className="text-3xl font-extrabold text-white">{report.domainRating}</span>
                <span className="text-xs text-slate-400"> / 100</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full"
                  style={{ width: `${report.domainRating}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
              <span className="text-xs text-slate-400 font-semibold">Total Backlinks</span>
              <div className="my-2">
                <span className="text-3xl font-extrabold text-white">{report.totalBacklinks.toLocaleString()}</span>
              </div>
              <span className="text-xs text-slate-400">Extracted links profile</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
              <span className="text-xs text-slate-400 font-semibold">Referring Domains</span>
              <div className="my-2">
                <span className="text-3xl font-extrabold text-white">{report.referringDomains.toLocaleString()}</span>
              </div>
              <span className="text-xs text-slate-400">Unique referring root domains</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
              <span className="text-xs text-slate-400 font-semibold">DoFollow Ratio</span>
              <div className="my-2 flex items-baseline space-x-2">
                <span className="text-3xl font-extrabold text-emerald-400">{report.doFollowRatio}%</span>
                <span className="text-xs text-slate-400">DoFollow</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full"
                  style={{ width: `${report.doFollowRatio}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Anchor Distribution & Top Pages Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Anchor Distribution */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <PieChart className="w-5 h-5 text-emerald-400" />
                <span>Anchor Text Distribution</span>
              </h3>

              <div className="space-y-3">
                {report.anchorDistribution.map((item, idx) => (
                  <div key={idx} className="space-y-1 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span className="font-medium truncate max-w-[200px]">{item.anchor}</span>
                      <span className="font-mono text-slate-400">
                        {item.percentage}% ({item.count.toLocaleString()} links)
                      </span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="bg-emerald-400 h-full rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Linked Pages */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                <span>Top Linked Pages</span>
              </h3>

              <div className="space-y-2">
                {report.topPages.map((page, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <a
                      href={page.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 font-mono hover:underline truncate max-w-[240px]"
                    >
                      {page.url}
                    </a>
                    <div className="text-right">
                      <span className="font-bold text-white block">{page.backlinksCount.toLocaleString()} links</span>
                      <span className="text-[10px] text-slate-500">{page.referringDomains} ref domains</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sample Discovered Backlinks Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Link2 className="w-5 h-5 text-emerald-400" />
              <span>Sample Discovered Backlink Profile</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-3">Referring Source Page</th>
                    <th className="py-3 px-3">Source DR</th>
                    <th className="py-3 px-3">Anchor Text</th>
                    <th className="py-3 px-3">Type</th>
                    <th className="py-3 px-3">Discovered</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {report.recentBacklinks.map((link) => (
                    <tr key={link.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-3 max-w-xs truncate">
                        <a
                          href={link.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-400 hover:underline flex items-center space-x-1"
                        >
                          <span className="truncate">{link.sourceUrl}</span>
                          <ExternalLink className="w-3 h-3 text-slate-500 flex-shrink-0" />
                        </a>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-slate-800 font-bold border border-slate-700">
                          DR {link.sourceDomainRating}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-medium text-white">{link.anchorText}</td>
                      <td className="py-3 px-3">
                        {link.isDoFollow ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold text-[10px]">
                            DoFollow
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 text-[10px]">
                            NoFollow
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-400">{link.firstDiscovered}</td>
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
