import Link from "next/link";
import { Store, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 mb-6">
          <Store className="w-10 h-10 text-slate-400" />
        </div>
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          UKM Tidak Ditemukan
        </h1>
        <p className="text-slate-600 mb-8">
          Maaf, UKM yang Anda cari tidak dapat ditemukan. Mungkin telah dihapus
          atau URL-nya salah.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/ukm"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Daftar UKM
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-700 border border-slate-300 rounded-full font-semibold hover:bg-slate-50 transition-colors"
          >
            <Home className="w-5 h-5" />
            Ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
