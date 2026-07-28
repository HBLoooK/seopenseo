import React, { useState } from 'react';
import { FileCode2, Copy, Check, Download, Plus, Trash2, Sparkles, ShieldCheck } from 'lucide-react';

export const RobotsSitemapView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'robots' | 'sitemap'>('sitemap');

  // Sitemap state
  const [siteDomain, setSiteDomain] = useState('https://seopenseo.netlify.app');
  const [pages, setPages] = useState<{ path: string; freq: string; priority: string }[]>([
    { path: '/', freq: 'daily', priority: '1.0' },
    { path: '/tools', freq: 'weekly', priority: '0.8' },
    { path: '/blog', freq: 'daily', priority: '0.8' },
    { path: '/about', freq: 'monthly', priority: '0.5' },
  ]);
  const [copiedSitemap, setCopiedSitemap] = useState(false);

  // Robots.txt state
  const [userAgents, setUserAgents] = useState('*');
  const [disallowPaths, setDisallowPaths] = useState('/admin/\n/api/\n/private/');
  const [sitemapUrl, setSitemapUrl] = useState('https://seopenseo.netlify.app/sitemap.xml');
  const [copiedRobots, setCopiedRobots] = useState(false);

  // Generate XML
  const xmlOutput = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${siteDomain.replace(/\/$/, '')}${p.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${p.freq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  // Generate Robots.txt
  const robotsOutput = `User-agent: ${userAgents}
${disallowPaths
  .split('\n')
  .filter(Boolean)
  .map((p) => `Disallow: ${p.trim()}`)
  .join('\n')}

Sitemap: ${sitemapUrl}`;

  const handleCopy = (text: string, type: 'sitemap' | 'robots') => {
    navigator.clipboard.writeText(text);
    if (type === 'sitemap') {
      setCopiedSitemap(true);
      setTimeout(() => setCopiedSitemap(false), 2000);
    } else {
      setCopiedRobots(true);
      setTimeout(() => setCopiedRobots(false), 2000);
    }
  };

  const handleDownload = (filename: string, content: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <FileCode2 className="w-3.5 h-3.5" />
            <span>Crawler Directives & XML Sitemaps Generator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Robots.txt & XML Sitemap Builder
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Configure crawl budget permissions, disallow sensitive subdirectories, and build search-engine compliant XML sitemaps for Google Search Console submission.
          </p>

          <div className="flex space-x-2 pt-2">
            <button
              onClick={() => setActiveSubTab('sitemap')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeSubTab === 'sitemap'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              XML Sitemap Builder
            </button>
            <button
              onClick={() => setActiveSubTab('robots')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeSubTab === 'robots'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Robots.txt Generator
            </button>
          </div>
        </div>
      </div>

      {activeSubTab === 'sitemap' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white">Sitemap URL Configuration</h2>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Root Domain</label>
              <input
                type="text"
                value={siteDomain}
                onChange={(e) => setSiteDomain(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 text-xs"
              />
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-300">Pages List ({pages.length})</span>
                <button
                  onClick={() => setPages([...pages, { path: '/new-page', freq: 'weekly', priority: '0.7' }])}
                  className="px-2.5 py-1 bg-slate-800 text-emerald-400 text-xs rounded-lg border border-slate-700 flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add URL</span>
                </button>
              </div>

              {pages.map((p, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={p.path}
                      onChange={(e) => {
                        const updated = [...pages];
                        updated[idx].path = e.target.value;
                        setPages(updated);
                      }}
                      className="flex-1 px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                      placeholder="/page-path"
                    />
                    <select
                      value={p.priority}
                      onChange={(e) => {
                        const updated = [...pages];
                        updated[idx].priority = e.target.value;
                        setPages(updated);
                      }}
                      className="px-2 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-slate-300"
                    >
                      <option value="1.0">1.0 (High)</option>
                      <option value="0.8">0.8 (Med)</option>
                      <option value="0.5">0.5 (Standard)</option>
                      <option value="0.3">0.3 (Low)</option>
                    </select>
                    <button
                      onClick={() => setPages(pages.filter((_, i) => i !== idx))}
                      className="text-red-400 hover:text-red-300 px-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* XML Output Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-white">Generated sitemap.xml</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleCopy(xmlOutput, 'sitemap')}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center space-x-1"
                  >
                    {copiedSitemap ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSitemap ? 'Copied!' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={() => handleDownload('sitemap.xml', xmlOutput, 'application/xml')}
                    className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg flex items-center space-x-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto max-h-[380px]">
                {xmlOutput}
              </pre>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
            <h2 className="text-base font-bold text-white">Robots.txt Rules</h2>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">User-Agent</label>
              <input
                type="text"
                value={userAgents}
                onChange={(e) => setUserAgents(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Disallow Paths (One per line)</label>
              <textarea
                rows={4}
                value={disallowPaths}
                onChange={(e) => setDisallowPaths(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 font-mono"
              ></textarea>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">XML Sitemap Location URL</label>
              <input
                type="text"
                value={sitemapUrl}
                onChange={(e) => setSitemapUrl(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100"
              />
            </div>
          </div>

          {/* Output */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-white">Generated robots.txt</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleCopy(robotsOutput, 'robots')}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center space-x-1"
                  >
                    {copiedRobots ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedRobots ? 'Copied!' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={() => handleDownload('robots.txt', robotsOutput, 'text/plain')}
                    className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg flex items-center space-x-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto">
                {robotsOutput}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
