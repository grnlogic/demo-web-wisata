"use client";

import { Utensils, Plus, Search } from "lucide-react";

export default function AdminKulinerPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Kelola Kuliner
          </h1>
          <p className="text-slate-600 mt-1">
            Kelola informasi kuliner dan restoran
          </p>
        </div>
        <button
          className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Kuliner</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari kuliner..."
              className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Semua Kategori</option>
            <option value="seafood">Seafood</option>
            <option value="tradisional">Makanan Tradisional</option>
            <option value="restoran">Restoran</option>
            <option value="cafe">Cafe</option>
          </select>
        </div>
      </div>

      {/* Empty State */}
      <div className="bg-white rounded-xl p-12 shadow-lg text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 mb-4">
          <Utensils className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">
          Belum Ada Kuliner
        </h3>
        <p className="text-slate-600 mb-6 max-w-md mx-auto">
          Mulai tambahkan informasi kuliner dan restoran di Pangandaran.
        </p>
        <button
          className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Kuliner Pertama</span>
        </button>
      </div>
    </div>
  );
}
