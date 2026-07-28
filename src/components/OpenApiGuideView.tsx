import React from 'react';
import { Info, Code2, Globe, Sparkles, Server, ShieldCheck, Heart } from 'lucide-react';

export const OpenApiGuideView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
            <Info className="w-3.5 h-3.5" />
            <span>Transparent Open Source & Free Data Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            How SEOpenSEO Replaces Expensive $100+/mo Paid Tools For Free
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Most commercial SEO tools charge heavy monthly fees because of proprietary crawlers. SEOpenSEO combines open-source HTML parsers, live search indexers, and public web standards to deliver enterprise SEO data at zero cost.
          </p>
        </div>
      </div>

      {/* Grid of Core Open Architecture Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 font-bold">
            <Server className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">1. Real Server-Side Crawler</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Our Express backend uses Cheerio to fetch and parse live HTML directly from target URLs. It extracts titles, meta descriptions, canonical links, OpenGraph cards, images lacking alt text, and JSON-LD structured data in real time.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20 font-bold">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">2. Open Search Indexing</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Instead of storing paywalled database tables, SEOpenSEO processes real-time search queries, keyword difficulty metrics, and People Also Ask questions directly using standard HTTP web parsers and open algorithms.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 font-bold">
            <Code2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">3. Public Web Standards</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Schema generators, sitemaps, and snippet pixel calculators execute client-side according to Schema.org and Google Search Console specification standards without artificial daily query caps.
          </p>
        </div>
      </div>

      {/* Developer API Inspection Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Code2 className="w-5 h-5 text-emerald-400" />
            <span>Open API Endpoint Structure</span>
          </h3>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
            REST API Ready
          </span>
        </div>

        <p className="text-xs text-slate-300">
          All endpoints on SEOpenSEO return clean, un-obfuscated JSON payloads that you can inspect, export, or pipe into your own developer tools:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-emerald-400 font-bold">POST /api/audit</span>
            <p className="text-slate-400 text-[11px] mt-1">Live HTML crawl, meta tags, issue checklist, & performance scoring</p>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-cyan-400 font-bold">POST /api/keywords</span>
            <p className="text-slate-400 text-[11px] mt-1">Keyword difficulty, search volume, LSI terms, & PAA questions</p>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-indigo-400 font-bold">POST /api/serp</span>
            <p className="text-slate-400 text-[11px] mt-1">Top 10 Google search results, snippet scores, & density check</p>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-purple-400 font-bold">POST /api/backlinks</span>
            <p className="text-slate-400 text-[11px] mt-1">Domain rating, anchor text distribution, & referring domains</p>
          </div>
        </div>
      </div>
    </div>
  );
};
