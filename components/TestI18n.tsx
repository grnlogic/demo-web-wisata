'use client';

import { useLocale, T, useAsyncTranslate } from '@/lib/i18n-helpers';

export default function TestI18n() {
  const locale = useLocale();
  const { translated: welcomeText } = useAsyncTranslate('Selamat datang di Pangandaran');
  
  return (
    <div className="fixed bottom-4 right-4 bg-slate-900/90 text-white p-4 rounded-lg shadow-lg backdrop-blur-sm border border-white/10 z-50 max-w-xs">
      <h3 className="font-bold mb-2 text-cyan-400">Translation Test</h3>
      <div className="space-y-1 text-sm">
        <p><strong>Locale:</strong> {locale}</p>
        <p><strong>API:</strong> LibreTranslate</p>
        <hr className="border-white/20 my-2" />
        <p><T>Selamat datang di Pangandaran</T></p>
        <p className="text-slate-400 text-xs">{welcomeText}</p>
      </div>
    </div>
  );
}
