import React, { useState } from 'react';
import { runHeaderInspect } from '../services/api';
import { HeaderInspectResult } from '../types';
import {
  ShieldCheck,
  Search,
  AlertTriangle,
  ArrowRight,
  Lock,
  Server,
  FileCode,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

export const HeaderInspectorView: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<HeaderInspectResult | null>(null);

  const handleInspect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await runHeaderInspect(url.trim());
      setResult(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to inspect HTTP headers');
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
            <Server className="w-3.5 h-3.5" />
            <span>HTTP Status & Security Directives</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Live HTTP Header & SSL Inspector
          </h1>
          <p className="text-slate-400 text-sm mt-2 leading-relaxed">
            Inspect raw server response headers, verify HTTP status codes, detect canonical header tags, audit SSL certificates, and check security flags like HSTS & CSP.
          </p>

          <form onSubmit={handleInspect} className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL to inspect headers (e.g., https://github.com)"
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
                  <span>Requesting Headers...</span>
                </>
              ) : (
                <>
                  <span>Inspect Response</span>
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
          {/* Status Bar */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className={`px-4 py-2 rounded-xl text-lg font-black ${
                result.statusCode >= 200 && result.statusCode < 300
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}>
                {result.statusCode} {result.statusText}
              </div>
              <div>
                <div className="font-mono text-sm font-bold text-white truncate max-w-md">{result.url}</div>
                <div className="text-xs text-slate-400">{result.protocol} • Response Time: {result.responseTimeMs}ms</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300">
                Compression: <span className="text-emerald-400 font-bold uppercase">{result.seoDirectives.compression}</span>
              </div>
            </div>
          </div>

          {/* Grid for Security Directives & SSL */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Security Analysis */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
              <h3 className="text-base font-bold text-white mb-4 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Security & Header Protection Audit</span>
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-300">Strict-Transport-Security (HSTS)</span>
                  {result.securityAnalysis.hsts ? (
                    <span className="text-emerald-400 font-bold flex items-center space-x-1"><CheckCircle2 className="w-4 h-4" /><span>Enabled</span></span>
                  ) : (
                    <span className="text-amber-400 font-bold flex items-center space-x-1"><XCircle className="w-4 h-4" /><span>Missing</span></span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-300">Content-Security-Policy (CSP)</span>
                  {result.securityAnalysis.csp ? (
                    <span className="text-emerald-400 font-bold flex items-center space-x-1"><CheckCircle2 className="w-4 h-4" /><span>Enabled</span></span>
                  ) : (
                    <span className="text-amber-400 font-bold flex items-center space-x-1"><XCircle className="w-4 h-4" /><span>Missing</span></span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-300">X-Frame-Options (Clickjacking)</span>
                  {result.securityAnalysis.xFrameOptions ? (
                    <span className="text-emerald-400 font-bold flex items-center space-x-1"><CheckCircle2 className="w-4 h-4" /><span>Protected</span></span>
                  ) : (
                    <span className="text-amber-400 font-bold flex items-center space-x-1"><XCircle className="w-4 h-4" /><span>Missing</span></span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-300">X-Content-Type-Options</span>
                  {result.securityAnalysis.xContentTypeOptions ? (
                    <span className="text-emerald-400 font-bold flex items-center space-x-1"><CheckCircle2 className="w-4 h-4" /><span>nosniff</span></span>
                  ) : (
                    <span className="text-amber-400 font-bold flex items-center space-x-1"><XCircle className="w-4 h-4" /><span>Missing</span></span>
                  )}
                </div>
              </div>
            </div>

            {/* SSL & Directives */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Lock className="w-4 h-4 text-cyan-400" />
                <span>SSL TLS Certificate & Directives</span>
              </h3>

              {result.sslDetails ? (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Issuer Authority:</span>
                    <span className="font-semibold text-white">{result.sslDetails.issuer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Expiration Date:</span>
                    <span className="font-semibold text-emerald-400">{result.sslDetails.validUntil} ({result.sslDetails.daysRemaining} days remaining)</span>
                  </div>
                </div>
              ) : (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl p-4 text-xs font-bold">
                  No valid SSL Certificate detected.
                </div>
              )}

              <div className="space-y-2 pt-2">
                <div className="text-xs font-semibold text-slate-300">Cache-Control Directives</div>
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-emerald-400 break-all">
                  {result.seoDirectives.cacheControl || "No cache-control header provided"}
                </div>
              </div>
            </div>
          </div>

          {/* Raw Response Headers Box */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
            <h3 className="text-base font-bold text-white mb-4 flex items-center space-x-2">
              <FileCode className="w-4 h-4 text-emerald-400" />
              <span>Raw Response Headers</span>
            </h3>

            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 font-mono text-xs space-y-2 overflow-x-auto text-slate-300">
              {Object.entries(result.headers).map(([key, val], i) => (
                <div key={i} className="flex">
                  <span className="text-cyan-400 font-semibold w-56 shrink-0">{key}:</span>
                  <span className="text-slate-200 break-all">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
