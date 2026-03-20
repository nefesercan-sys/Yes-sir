"use client";

import { useTranslations } from 'next-intl';

export default function IlanlarClient() {
  const t = useTranslations('Ilanlar'); // messages/tr.json içinde 'Ilanlar' anahtarı olmalı

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6">{t('title')}</h1>
      
      {/* İlan Listesi Buraya Gelecek */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 border rounded-lg shadow-sm bg-white">
          <p className="text-gray-500 italic">Henüz ilan bulunmuyor...</p>
        </div>
      </div>
    </div>
  );
}
