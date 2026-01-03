"use client";

import Link from "next/link";
import { ArrowLeft, Utensils } from "lucide-react";

export default function KulinerNotFound() {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
      <div className="text-center space-y-6 px-4">
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-orange-100 mb-4">
          <Utensils className="w-16 h-16 text-orange-600" />
        </div>

        <h1 className="text-4xl font-bold text-slate-800">
          Kuliner Tidak Ditemukan
        </h1>

        <p className="text-xl text-slate-600 max-w-md mx-auto">
          Maaf, kuliner yang Anda cari tidak ditemukan atau sudah tidak
          tersedia.
        </p>

        <Link
          href="/kuliner"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali ke Daftar Kuliner</span>
        </Link>
      </div>
    </div>
  );
}
