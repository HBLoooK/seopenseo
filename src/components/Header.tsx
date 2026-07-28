import React from 'react';
import logoImg from '../assets/images/seopenseo_logo_1785243382312.jpg';
import { ToolTab } from '../types';
import {
  Search,
  ShieldCheck,
  KeyRound,
  Globe,
  Link2,
  GitCompare,
  Code2,
  FileCode2,
  Sparkles,
  Info,
  Network,
  Eye,
  Server,
  FileText,
  Bot,
} from 'lucide-react';

interface HeaderProps {
  activeTab: ToolTab;
  setActiveTab: (tab: ToolTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const tabs: { id: ToolTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'audit', label: 'Site Audit', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'keywords', label: 'Keyword Explorer', icon: <KeyRound className="w-4 h-4" /> },
    { id: 'serp', label: 'SERP Analyzer', icon: <Globe className="w-4 h-4" /> },
    { id: 'geo', label: 'GEO & AI Search Audit', icon: <Bot className="w-4 h-4" />, badge: 'GEO Engine' },
    { id: 'snippet-preview', label: 'SERP Snippet & Pixel', icon: <Eye className="w-4 h-4" /> },
    { id: 'backlinks', label: 'Backlinks', icon: <Link2 className="w-4 h-4" /> },
    { id: 'internal-links', label: 'Internal Links & PageRank', icon: <Network className="w-4 h-4" /> },
    { id: 'content-gap', label: 'Content Gap', icon: <GitCompare className="w-4 h-4" /> },
    { id: 'content-optimizer', label: 'Content Optimizer', icon: <FileText className="w-4 h-4" /> },
    { id: 'header-inspector', label: 'HTTP & SSL Inspector', icon: <Server className="w-4 h-4" /> },
    { id: 'schema', label: 'Schema Builder', icon: <Code2 className="w-4 h-4" /> },
    { id: 'robots-sitemap', label: 'Robots & Sitemap', icon: <FileCode2 className="w-4 h-4" /> },
    { id: 'open-api', label: 'How It\'s Free', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('audit')}>
            <img
              src={logoImg}
              alt="seopenseo logo"
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-xl object-cover border border-emerald-500/30 shadow-lg shadow-emerald-500/20"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-white">
                  seopen<span className="text-emerald-400">seo</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Sparkles className="w-3 h-3 mr-1" />
                  100% Free & Open
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Unlimited SEO Intelligence • No Credit Card • Powered by Gemini AI
              </p>
            </div>
          </div>

          {/* Top Quick Status */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2 text-xs bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Live Web Grounding Active</span>
            </div>
          </div>
        </div>

        {/* Horizontal Navigation Bar */}
        <div className="flex space-x-1 overflow-x-auto no-scrollbar py-2 border-t border-slate-800/60">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                id={`tab-button-${tab.id}`}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="ml-1 px-1.5 py-0.2 rounded text-[10px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
