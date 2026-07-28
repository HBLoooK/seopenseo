import React from 'react';
import { Megaphone } from 'lucide-react';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  slot = '1234567890',
  format = 'auto',
  className = '',
}) => {
  return (
    <div className={`my-6 overflow-hidden rounded-xl bg-slate-900/40 border border-slate-800/60 p-4 text-center transition-all ${className}`}>
      <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2 border-b border-slate-800/40 pb-1">
        <span className="flex items-center space-x-1">
          <Megaphone className="w-3 h-3 text-amber-500/80" />
          <span>Advertisement</span>
        </span>
        <span>Google AdSense Unit • Slot #{slot}</span>
      </div>

      {/* Real AdSense Container */}
      <div className="min-h-[90px] flex items-center justify-center bg-slate-950/60 rounded-lg p-2 border border-slate-800/40">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client="ca-pub-3493593869359820"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
        {/* Placeholder label displayed when AdSense script is pending publisher approval */}
        <div className="text-xs text-slate-400 font-mono py-2">
          <span className="text-emerald-400 font-bold">[AdSense Ready Slot • Publisher ca-pub-3493593869359820]</span>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Verified publisher ID active. Google Auto-Ads and display units will render automatically when site review completes.
          </p>
        </div>
      </div>
    </div>
  );
};
