import Link from "next/link";
import { MapPin } from "lucide-react";

export default function DestinasiNotFound() {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-slate-50">
      <div className="max-w-md mx-auto px-4 text-center">
        <MapPin className="w-24 h-24 mx-auto text-slate-300 mb-4" />
        <h1 className="text-4xl font-bold text-slate-800 mb-2">
          Destinasi Tidak Ditemukan
        </h1>
        <p className="text-slate-600 mb-6">
          Maaf, destinasi yang Anda cari tidak ditemukan atau tidak tersedia.
        </p>
        <Link
          href="/destinasi"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
        >
          Kembali ke Destinasi
        </Link>
      </div>
    </div>
  );
}
