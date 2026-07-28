import React, { useState, useEffect } from 'react';
import { Shield, Cookie, Check, X } from 'lucide-react';

export const CookieBanner: React.FC<{ onOpenPrivacy: () => void }> = ({ onOpenPrivacy }) => {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem('seopenseo_cookie_consent');
    if (!consent) {
      setAccepted(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('seopenseo_cookie_consent', 'accepted');
    setAccepted(true);
  };

  const handleDecline = () => {
    localStorage.setItem('seopenseo_cookie_consent', 'essential_only');
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-slate-900 border border-slate-700/80 rounded-2xl p-5 shadow-2xl shadow-slate-950 backdrop-blur-md animate-fade-in">
      <div className="flex items-start space-x-3">
        <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Cookie & Privacy Preferences</h4>
            <button
              onClick={handleDecline}
              className="text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            We use cookies and third-party vendor tags (including Google AdSense and analytics) to personalize content, analyze traffic, and support free open SEO intelligence.
          </p>
          <div className="flex items-center space-x-2 pt-1">
            <button
              onClick={handleAccept}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold px-3.5 py-1.5 rounded-lg transition flex items-center space-x-1 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Accept Cookies</span>
            </button>
            <button
              onClick={onOpenPrivacy}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-3 py-1.5 rounded-lg transition flex items-center space-x-1 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>Privacy Policy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
