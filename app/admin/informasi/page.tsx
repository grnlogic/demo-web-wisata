"use client";

import { Info, Save } from "lucide-react";

export default function AdminInformasiPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Informasi Umum
          </h1>
          <p className="text-slate-600 mt-1">
            Kelola informasi umum tentang Pangandaran
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl p-6 shadow-lg space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Tentang Pangandaran
          </h3>
          <textarea
            rows={6}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Deskripsi tentang Pangandaran..."
            defaultValue="Pangandaran adalah destinasi wisata bahari yang terkenal di Jawa Barat dengan keindahan pantainya yang memukau."
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Kontak Informasi
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="info@wisatapangandaran.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Telepon
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+62 xxx xxxx xxxx"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Media Sosial
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Facebook
              </label>
              <input
                type="url"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://facebook.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Instagram
              </label>
              <input
                type="url"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://instagram.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Twitter
              </label>
              <input
                type="url"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://twitter.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                YouTube
              </label>
              <input
                type="url"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://youtube.com/..."
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            <Save className="w-5 h-5" />
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">
              Informasi
            </h4>
            <p className="text-sm text-blue-800">
              Informasi yang Anda masukkan akan ditampilkan di halaman "Tentang" dan footer website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
