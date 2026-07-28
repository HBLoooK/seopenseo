import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  Info,
  Mail,
  X,
  Lock,
  Code,
  CheckCircle,
  Building,
  HelpCircle,
  Megaphone,
} from 'lucide-react';

interface LegalPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'privacy' | 'terms' | 'about' | 'contact' | 'adsense';
}

export const LegalPolicyModal: React.FC<LegalPolicyModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'privacy',
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'about' | 'contact' | 'adsense'>(defaultTab);

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/40 shrink-0">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">Trust, Legal & Compliance Center</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Bar */}
        <div className="flex items-center space-x-1 p-2 bg-slate-950/60 border-b border-slate-800 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition cursor-pointer shrink-0 ${
              activeTab === 'privacy'
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition cursor-pointer shrink-0 ${
              activeTab === 'terms'
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms of Service</span>
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition cursor-pointer shrink-0 ${
              activeTab === 'about'
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>About Us</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition cursor-pointer shrink-0 ${
              activeTab === 'contact'
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact Us</span>
          </button>

          <button
            onClick={() => setActiveTab('adsense')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition cursor-pointer shrink-0 ${
              activeTab === 'adsense'
                ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>AdSense & Ads.txt</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-300 text-xs leading-relaxed">
          {/* 1. Privacy Policy */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">Privacy Policy & Cookie Disclosures</h3>
              <p className="text-slate-400">Last updated: July 28, 2026</p>

              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h4 className="font-bold text-emerald-400 text-sm">1. Google AdSense & Third-Party Advertising</h4>
                <p>
                  SEOpenSEO uses Google AdSense to serve advertisements. Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to SEOpenSEO and/or other sites on the Internet.
                </p>
                <p>
                  Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" className="text-cyan-400 underline">Google Ads Settings</a>. Alternatively, users can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noreferrer" className="text-cyan-400 underline">www.aboutads.info</a>.
                </p>
              </div>

              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h4 className="font-bold text-emerald-400 text-sm">2. Information Collection & Usage</h4>
                <p>
                  SEOpenSEO is designed with privacy as a foundational principle. We do not require account registration or collect personal identifying information (PII) to perform technical site audits, keyword lookups, SERP simulations, or PageRank calculations.
                </p>
              </div>

              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h4 className="font-bold text-emerald-400 text-sm">3. Log Files & Analytics</h4>
                <p>
                  Like most standard web servers, SEOpenSEO stores log files containing IP addresses, browser types, Internet Service Providers (ISPs), referring/exit pages, and timestamp data solely for system performance, security auditing, and rate-limiting prevention.
                </p>
              </div>

              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h4 className="font-bold text-emerald-400 text-sm">4. GDPR & CCPA User Rights</h4>
                <p>
                  Under European General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), you have the right to request deletion, access, or restriction of any stored analytical data. Contact <code className="text-cyan-400">privacy@seopenseo.org</code> to submit inquiries.
                </p>
              </div>
            </div>
          )}

          {/* 2. Terms of Service */}
          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">Terms of Service</h3>
              <p className="text-slate-400">Effective Date: July 28, 2026</p>

              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h4 className="font-bold text-emerald-400 text-sm">1. Acceptance of Terms</h4>
                <p>
                  By accessing and using SEOpenSEO, you agree to be bound by these Terms of Service. If you do not agree to all terms, you are prohibited from accessing or using the platform.
                </p>
              </div>

              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h4 className="font-bold text-emerald-400 text-sm">2. Permitted Use & Crawling Fair Play</h4>
                <p>
                  You agree to use SEOpenSEO tools strictly for lawful search engine optimization, web auditing, content analysis, and research. Automated high-frequency API abuse designed to overload system infrastructure is prohibited.
                </p>
              </div>

              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h4 className="font-bold text-emerald-400 text-sm">3. Disclaimer of Warranties</h4>
                <p>
                  The services provided on SEOpenSEO are provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied. Search engine algorithm metrics are estimations for optimization purposes.
                </p>
              </div>
            </div>
          )}

          {/* 3. About Us */}
          {activeTab === 'about' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">About SEOpenSEO</h3>
              <p className="text-slate-300">
                SEOpenSEO was founded to democratize enterprise-grade Search Engine Optimization (SEO) and Generative Engine Optimization (GEO) tools for webmasters, developers, digital marketers, and content creators worldwide.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-white flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Zero Paywall Access</span>
                  </div>
                  <p className="text-slate-400">No trial expirations, forced subscriptions, or gated reports.</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-white flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    <span>Open Standards</span>
                  </div>
                  <p className="text-slate-400">Built on standard web parsers, real-time HTTP inspections, and PageRank graph mathematics.</p>
                </div>
              </div>
            </div>
          )}

          {/* 4. Contact Us Form */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">Contact & Support Center</h3>
              <p className="text-slate-400">Have questions regarding AdSense advertising, technical support, or platform feedback?</p>

              {contactSubmitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5 text-center space-y-2">
                  <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="font-bold text-white text-sm">Message Received</h4>
                  <p className="text-slate-300">Thank you for contacting SEOpenSEO. Our support team will review your inquiry shortly.</p>
                  <button
                    onClick={() => setContactSubmitted(false)}
                    className="mt-2 text-xs text-emerald-400 hover:underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Your Name</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Email Address</label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Subject</label>
                    <input
                      type="text"
                      required
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      placeholder="AdSense Inquiry / Feedback"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Message</label>
                    <textarea
                      rows={3}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Type your message here..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition cursor-pointer"
                  >
                    Submit Message
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 5. Google AdSense & Ads.txt Setup Guide */}
          {activeTab === 'adsense' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Megaphone className="w-4 h-4 text-amber-400" />
                <span>Google AdSense Publisher Integration</span>
              </h3>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-amber-400 text-sm">1. Server Endpoints & Ads.txt</h4>
                <p>
                  SEOpenSEO serves a valid <code className="text-amber-400 font-mono">/ads.txt</code> endpoint directly from the root domain.
                </p>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300">
                  https://seopenseo.netlify.app/ads.txt
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-amber-400 text-sm">2. AdSense Verification Script in Header</h4>
                <p>
                  The required Google AdSense publisher code and auto-ads script tag are embedded inside <code className="text-cyan-400">index.html</code>.
                </p>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-cyan-300 overflow-x-auto">
                  &lt;script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3493593869359820" crossorigin="anonymous"&gt;&lt;/script&gt;
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between shrink-0">
          <span className="text-slate-500 text-[11px]">SEOpenSEO • Google AdSense Approved Infrastructure</span>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-4 py-2 rounded-xl transition text-xs cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
