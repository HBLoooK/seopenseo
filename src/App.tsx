import React, { useState } from 'react';
import logoImg from './assets/images/seopenseo_logo_1785243382312.jpg';
import { ToolTab } from './types';
import { Header } from './components/Header';
import { SiteAuditView } from './components/SiteAuditView';
import { KeywordResearchView } from './components/KeywordResearchView';
import { SerpAnalyzerView } from './components/SerpAnalyzerView';
import { BacklinkExplorerView } from './components/BacklinkExplorerView';
import { ContentGapView } from './components/ContentGapView';
import { SchemaGeneratorView } from './components/SchemaGeneratorView';
import { RobotsSitemapView } from './components/RobotsSitemapView';
import { InternalLinkView } from './components/InternalLinkView';
import { SnippetPreviewView } from './components/SnippetPreviewView';
import { HeaderInspectorView } from './components/HeaderInspectorView';
import { ContentOptimizerView } from './components/ContentOptimizerView';
import { GeoAnalyzerView } from './components/GeoAnalyzerView';
import { OpenApiGuideView } from './components/OpenApiGuideView';
import { AdBanner } from './components/AdBanner';
import { CookieBanner } from './components/CookieBanner';
import { LegalPolicyModal } from './components/LegalPolicyModal';
import { Sparkles, ShieldCheck, Lock, FileText, Building, Mail, Megaphone } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ToolTab>('audit');
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalDefaultTab, setLegalModalDefaultTab] = useState<'privacy' | 'terms' | 'about' | 'contact' | 'adsense'>('privacy');

  const openLegalModal = (tab: 'privacy' | 'terms' | 'about' | 'contact' | 'adsense') => {
    setLegalModalDefaultTab(tab);
    setLegalModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950 flex flex-col justify-between">
      {/* Top Header Navigation */}
      <div>
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'audit' && <SiteAuditView />}
          {activeTab === 'keywords' && <KeywordResearchView />}
          {activeTab === 'serp' && <SerpAnalyzerView />}
          {activeTab === 'geo' && <GeoAnalyzerView />}
          {activeTab === 'snippet-preview' && <SnippetPreviewView />}
          {activeTab === 'backlinks' && <BacklinkExplorerView />}
          {activeTab === 'internal-links' && <InternalLinkView />}
          {activeTab === 'content-gap' && <ContentGapView />}
          {activeTab === 'content-optimizer' && <ContentOptimizerView />}
          {activeTab === 'header-inspector' && <HeaderInspectorView />}
          {activeTab === 'schema' && <SchemaGeneratorView />}
          {activeTab === 'robots-sitemap' && <RobotsSitemapView />}
          {activeTab === 'open-api' && <OpenApiGuideView />}

          {/* AdSense Placement Slot */}
          <AdBanner slot="88992211" format="auto" />
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-8 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <img
                src={logoImg}
                alt="seopenseo mark"
                referrerPolicy="no-referrer"
                className="w-6 h-6 rounded-lg object-cover border border-emerald-500/30"
              />
              <span className="font-bold text-slate-200">seopenseo</span>
              <span className="text-slate-500">• Free & Open SEO Intelligence Platform</span>
            </div>

            <div className="flex items-center space-x-4 text-slate-400">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>No Credit Card Required</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>100% Free & Open Source</span>
              </span>
            </div>
          </div>

          {/* AdSense Mandatory Compliance Footer Navigation Links */}
          <div className="pt-4 border-t border-slate-800/60 flex flex-wrap items-center justify-center sm:justify-between gap-4 text-slate-400">
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => openLegalModal('privacy')}
                className="hover:text-emerald-400 transition flex items-center space-x-1 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span>Privacy Policy</span>
              </button>
              <button
                onClick={() => openLegalModal('terms')}
                className="hover:text-emerald-400 transition flex items-center space-x-1 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span>Terms of Service</span>
              </button>
              <button
                onClick={() => openLegalModal('about')}
                className="hover:text-emerald-400 transition flex items-center space-x-1 cursor-pointer"
              >
                <Building className="w-3.5 h-3.5 text-slate-500" />
                <span>About Us</span>
              </button>
              <button
                onClick={() => openLegalModal('contact')}
                className="hover:text-emerald-400 transition flex items-center space-x-1 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>Contact Us</span>
              </button>
              <button
                onClick={() => openLegalModal('adsense')}
                className="hover:text-amber-400 transition flex items-center space-x-1 cursor-pointer text-amber-400/90 font-medium"
              >
                <Megaphone className="w-3.5 h-3.5" />
                <span>AdSense & Ads.txt</span>
              </button>
            </div>

            <div className="text-[11px] text-slate-500">
              © 2026 SEOpenSEO. All rights reserved. Google AdSense Verified.
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Consent Banner for ePrivacy & GDPR */}
      <CookieBanner onOpenPrivacy={() => openLegalModal('privacy')} />

      {/* Trust, Legal & Compliance Modal */}
      <LegalPolicyModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        defaultTab={legalModalDefaultTab}
      />
    </div>
  );
}

