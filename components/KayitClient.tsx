"use client";

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function KayitClient() {
  const t = useTranslations('Auth');
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full">
      <h2 className="text-2xl font-bold text-center mb-6">{t('registerTitle')}</h2>
      <form className="space-y-4">
        <input 
          type="text" 
          placeholder={t('namePlaceholder')} 
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input 
          type="email" 
          placeholder={t('emailPlaceholder')} 
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button 
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {t('registerButton')}
        </button>
      </form>
    </div>
  );
}
