"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface PriceItem {
  id: string;
  jenisHarga: string;
  harga: number;
}

interface PriceListProps {
  prices: PriceItem[];
}

export default function PriceList({ prices }: PriceListProps) {
  const [expanded, setExpanded] = useState(false);

  const formatPrice = (harga: number) => {
    if (harga === 0) return "Gratis";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(harga);
  };

  if (!prices || prices.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-slate-800">Harga Tiket</h3>
        {prices.length > 1 && (
          <span className="text-sm text-slate-500">
            {prices.length} kategori
          </span>
        )}
      </div>
      <div className="space-y-3">
        {(expanded ? prices : prices.slice(0, 1)).map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center py-3 border-b border-slate-200 last:border-0"
          >
            <span className="text-slate-700">{item.jenisHarga}</span>
            <span className="font-semibold text-blue-600">
              {formatPrice(item.harga)}
            </span>
          </div>
        ))}
      </div>
      {prices.length > 1 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Tampilkan lebih sedikit
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Lihat semua harga ({prices.length - 1} lainnya)
            </>
          )}
        </button>
      )}
    </div>
  );
}
