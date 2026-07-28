import React, { useState } from 'react';
import {
  Smartphone,
  Monitor,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Eye,
  Star,
} from 'lucide-react';

export const SnippetPreviewView: React.FC = () => {
  const [title, setTitle] = useState('Best SEO Tools for 2026: Complete Free Explorer Suite');
  const [description, setDescription] = useState(
    'Discover top-tier free SEO analysis tools with zero subscription limits. Audit meta tags, inspect SERPs, map internal PageRank, and generate JSON-LD schema instantly.'
  );
  const [url, setUrl] = useState('https://seopenseo.netlify.app/tools/free-seo-suite');
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [showRichSnippet, setShowRichSnippet] = useState(true);
  const [copied, setCopied] = useState(false);

  // Approximate pixel width calculations (Average ~10px per desktop title char, ~6px for description)
  const titlePixelWidth = Math.round(title.length * 9.8);
  const titleCharCount = title.length;
  const isTitleOver = titlePixelWidth > 580;

  const descPixelWidth = Math.round(description.length * 6.2);
  const descCharCount = description.length;
  const isDescOver = device === 'desktop' ? descPixelWidth > 990 : descPixelWidth > 600;

  const handleCopyHtml = () => {
    const htmlSnippet = `<title>${title}</title>\n<meta name="description" content="${description}">`;
    navigator.clipboard.writeText(htmlSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-4">
            <Eye className="w-3.5 h-3.5" />
            <span>Google SERP Simulator</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Google SERP Snippet & Pixel Width Calculator
          </h1>
          <p className="text-slate-400 text-sm mt-2 leading-relaxed">
            Preview how your webpage appears on Google Search results in real-time. Calculate exact title pixel widths (580px max) and prevent truncated meta descriptions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Form */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-5">
            <h3 className="text-base font-bold text-white mb-2">Metadata Form</h3>

            {/* Title Input */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <label className="font-semibold text-slate-300">SEO Meta Title Tag</label>
                <span className={`font-mono font-bold ${isTitleOver ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {titleCharCount} chars ({titlePixelWidth}px / 580px)
                </span>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Page Title..."
                className={`w-full bg-slate-950 border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none ${
                  isTitleOver ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
              <div className="h-1.5 bg-slate-950 rounded-full mt-2 overflow-hidden">
                <div
                  className={`h-full transition-all ${isTitleOver ? 'bg-rose-500' : 'bg-emerald-500'}`}
                  style={{ width: `${Math.min(100, (titlePixelWidth / 580) * 100)}%` }}
                />
              </div>
            </div>

            {/* Description Input */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <label className="font-semibold text-slate-300">Meta Description</label>
                <span className={`font-mono font-bold ${isDescOver ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {descCharCount} chars ({descPixelWidth}px / {device === 'desktop' ? '990px' : '600px'})
                </span>
              </div>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Meta Description..."
                className={`w-full bg-slate-950 border rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none ${
                  isDescOver ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
              <div className="h-1.5 bg-slate-950 rounded-full mt-2 overflow-hidden">
                <div
                  className={`h-full transition-all ${isDescOver ? 'bg-rose-500' : 'bg-emerald-500'}`}
                  style={{ width: `${Math.min(100, (descPixelWidth / (device === 'desktop' ? 990 : 600)) * 100)}%` }}
                />
              </div>
            </div>

            {/* Target URL */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Canonical URL</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Options Toggles */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setDevice('desktop')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 cursor-pointer ${
                    device === 'desktop' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-950 text-slate-400'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDevice('mobile')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 cursor-pointer ${
                    device === 'mobile' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-950 text-slate-400'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                </button>
              </div>

              <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showRichSnippet}
                  onChange={(e) => setShowRichSnippet(e.target.checked)}
                  className="rounded border-slate-800 text-cyan-500 focus:ring-0"
                />
                <span>Rich Star Rating Snippet</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Live Preview Panel */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>Google SERP Live Preview</span>
              </h3>
              <button
                type="button"
                onClick={handleCopyHtml}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied HTML!' : 'Copy Tags'}</span>
              </button>
            </div>

            {/* Google SERP Visual Box (Authentic Light SERP styling) */}
            <div className={`bg-white rounded-xl p-5 shadow-lg font-sans text-left transition-all ${
              device === 'mobile' ? 'max-w-[360px] mx-auto border-2 border-slate-300' : 'w-full'
            }`}>
              {/* Domain & URL Breadcrumb */}
              <div className="flex items-center space-x-2 text-[13px] text-[#202124] mb-1">
                <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700 shrink-0">
                  S
                </div>
                <div className="truncate">
                  <div className="text-[12px] font-medium text-[#202124] leading-tight truncate">
                    {url.replace(/https?:\/\//, '').split('/')[0]}
                  </div>
                  <div className="text-[11px] text-[#4d5156] leading-none truncate">
                    {url}
                  </div>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-[18px] leading-[22px] font-normal text-[#1a0dab] hover:underline cursor-pointer tracking-tight truncate">
                {title || 'Your Page Title Goes Here'}
              </h3>

              {/* Rich Snippet Stars */}
              {showRichSnippet && (
                <div className="flex items-center space-x-1.5 my-1 text-[12px] text-[#4d5156]">
                  <div className="flex text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span className="font-semibold text-[#202124]">4.9</span>
                  <span>(128 reviews)</span>
                  <span>• Free</span>
                </div>
              )}

              {/* Description */}
              <p className="text-[14px] leading-[20px] text-[#4d5156] mt-1 break-words">
                {description || 'Enter a meta description to see how Google renders your snippet...'}
              </p>
            </div>

            {/* Status Checklist */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                <span className="text-slate-300">Title Tag Length</span>
                <span className={`font-bold flex items-center space-x-1 ${isTitleOver ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {isTitleOver ? <AlertCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                  <span>{isTitleOver ? 'Too Long (Truncated)' : 'Optimal Length'}</span>
                </span>
              </div>
              <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                <span className="text-slate-300">Description Length</span>
                <span className={`font-bold flex items-center space-x-1 ${isDescOver ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {isDescOver ? <AlertCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                  <span>{isDescOver ? 'Too Long (Truncated)' : 'Optimal Length'}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
