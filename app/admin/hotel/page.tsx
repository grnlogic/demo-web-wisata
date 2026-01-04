"use client";

import { useEffect, useState, useCallback } from "react";
import { RefreshCw, Hotel, MapPin, Star, Clock, Loader2 } from "lucide-react";
import Link from "next/link";

interface HotelListing {
  id: string;
  name: string;
  description?: string | null;
  link?: string | null;
  thumbnail?: string | null;
  source?: string | null;
  location?: string | null;
  price?: string | null;
  rating?: number | null;
  reviews?: number | null;
  checkInDate?: string | null;
  checkOutDate?: string | null;
  fetchedAt?: string | null;
}

export default function HotelAdminPage() {
  const [hotels, setHotels] = useState<HotelListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadHotels = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/hotels", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Gagal memuat data hotel");
      }
      setHotels(data.hotels || []);
    } catch (err: any) {
      setError(err.message || "Gagal memuat data hotel");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHotels();
  }, [loadHotels]);

  const handleRefresh = async () => {
    setRefreshing(true);
    setError(null);
    try {
      const res = await fetch("/api/hotels", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Gagal memperbarui data hotel");
      }
      await loadHotels();
    } catch (err: any) {
      setError(err.message || "Gagal memperbarui data hotel");
    } finally {
      setRefreshing(false);
    }
  };

  const lastUpdated = hotels[0]?.fetchedAt
    ? new Date(hotels[0].fetchedAt).toLocaleString("id-ID")
    : "-";

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            Akomodasi
          </p>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Hotel className="h-5 w-5 text-amber-600" /> Hotel Pangandaran
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Tarik 50 data dari SerpAPI Google Hotels (1× klik tombol) lalu
            tersimpan di database. FE membaca dari cache ini.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Terakhir diperbarui: {lastUpdated}
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-amber-500 disabled:opacity-70"
          >
            {refreshing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            Perbarui (50 data)
          </button>
        </div>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-600">Memuat data hotel...</p>
        </div>
      ) : hotels.length === 0 ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800">
          Belum ada data. Klik "Perbarui" untuk menarik 50 hotel dan
          menyimpannya.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col"
            >
              {hotel.thumbnail ? (
                <div className="h-40 w-full overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={hotel.thumbnail}
                    alt={hotel.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-40 w-full bg-slate-100 flex items-center justify-center text-slate-500 text-sm">
                  Tidak ada gambar
                </div>
              )}
              <div className="p-4 space-y-2 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-amber-700/80">
                      {hotel.source || "Google Hotels"}
                    </p>
                    <h3 className="text-base font-semibold text-slate-900">
                      {hotel.name}
                    </h3>
                  </div>
                  {hotel.rating ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                      <Star className="h-3 w-3" /> {hotel.rating.toFixed(1)}
                    </span>
                  ) : null}
                </div>
                {hotel.location ? (
                  <p className="flex items-center gap-1 text-xs text-slate-600">
                    <MapPin className="h-3 w-3 text-slate-500" />{" "}
                    {hotel.location}
                  </p>
                ) : null}
                <p className="text-sm text-slate-700 line-clamp-3">
                  {hotel.description || "Tidak ada deskripsi"}
                </p>
              </div>
              <div className="px-4 pb-4 flex items-center justify-between text-sm text-slate-700">
                <span className="font-semibold text-emerald-700">
                  {hotel.price || "Lihat harga"}
                </span>
                <span className="text-xs text-slate-500">
                  {hotel.reviews
                    ? `${hotel.reviews} ulasan`
                    : "Ulasan belum ada"}
                </span>
              </div>
              <div className="px-4 pb-4">
                {hotel.link ? (
                  <a
                    href={hotel.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-800"
                  >
                    Buka detail
                    <Clock className="h-4 w-4" />
                  </a>
                ) : (
                  <span className="text-xs text-slate-500">
                    Link tidak tersedia
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
