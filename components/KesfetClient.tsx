"use client";

import { useTranslations } from 'next-intl';

export default function KesfetClient() {
  const t = useTranslations('Kesfet');

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold">{t('welcome')}</h1>
        <p className="text-gray-600 mt-4">{t('description')}</p>
      </div>
      {/* Kategori veya harita bazlı keşfetme alanı */}
    </div>
  );
}
