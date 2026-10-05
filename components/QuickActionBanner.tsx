'use client';

import React from 'react';
import { BUSINESS } from '@/lib/business';
import { getProps, Language } from '@/lib/value-props';

interface QuickActionBannerProps {
  lang?: Language;
  variantIndex?: number;
  customSlogan?: string;
  customWaMessage?: string;
}

export default function QuickActionBanner({
  lang = 'tr',
  variantIndex = 0,
  customSlogan,
  customWaMessage,
}: QuickActionBannerProps) {
  const propsList = getProps(lang);
  const selectedProp = propsList[variantIndex] || propsList[0];

  const slogan = customSlogan || selectedProp.slogan;
  const badge = selectedProp.badge;
  const actionText = selectedProp.actionText;
  const waTemplate = customWaMessage || selectedProp.waTemplate;

  const formattedPhone = BUSINESS.phone.replace('+', '');
  const waUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(waTemplate)}`;

  return (
    <div
      id="quick-actions"
      className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white py-2.5 px-4 sticky top-0 z-50 shadow-lg border-b border-orange-500/30"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <span className="bg-white/20 text-white text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider hidden md:inline-block backdrop-blur-sm">
            {badge}
          </span>
          <h2 className="text-xs md:text-sm font-bold tracking-tight ai-speakable text-amber-50">
            ⚡ {slogan}
          </h2>
        </div>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white font-extrabold text-xs md:text-sm px-4 py-2 rounded-xl transition-all transform hover:scale-105 flex items-center gap-2 shadow-md whitespace-nowrap animate-pulse"
        >
          <span className="text-base">💬</span>
          <span>{actionText}</span>
        </a>
      </div>
    </div>
  );
}
