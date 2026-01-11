"use client";

import React, { useMemo, useState, useEffect } from "react";
import {
  ArrowRight,
  Bus,
  Car,
  Clock,
  Map,
  MapPin,
  Plane,
  Train,
  Wallet,
  X,
} from "lucide-react";
import { useModal } from "./ModalContext";

type ToolkitId = "map" | "transport" | "budget";

type ToolkitItem = {
  id: ToolkitId;
  title: string;
  description: string;
  cta: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
};

const toolkitItems: ToolkitItem[] = [
  {
    id: "map",
    title: "Peta interaktif",
    description:
      "Navigasi spot foto, parkir, toilet umum, dan titik kuliner favorit warga.",
    cta: "Buka peta",
    icon: Map,
    gradient: "from-cyan-500/20 via-cyan-400/10 to-blue-500/10",
  },
  {
    id: "transport",
    title: "Transport & akses",
    description:
      "Rute bus/travel, sewa motor/mobil, plus estimasi waktu tempuh dari Bandung/Jakarta.",
    cta: "Lihat opsi",
    icon: Bus,
    gradient: "from-emerald-500/20 via-green-500/10 to-cyan-500/10",
  },
  {
    id: "budget",
    title: "Kalkulator budget",
    description:
      "Hitung cepat biaya makan, tiket, sewa, dan aktivitas utama per orang per hari.",
    cta: "Cek estimasi",
    icon: Wallet,
    gradient: "from-amber-500/20 via-orange-500/10 to-pink-500/10",
  },
];

export default function ToolkitSection() {
  const [activeTool, setActiveTool] = useState<ToolkitId | null>(null);

  const activeItem =
    toolkitItems.find((item) => item.id === activeTool) || null;

  return (
    <section className="py-16 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">
              Toolkit
            </p>
            <h3 className="text-3xl font-semibold text-white">
              Perlengkapan cepat sebelum berangkat
            </h3>
            <p className="text-white/70 max-w-2xl">
              Peta, transport, dan budget yang bisa dibaca sepintas tapi cukup
              detail untuk langsung dipakai.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
            <Clock className="h-4 w-4 text-cyan-200" />
            Klik salah satu untuk membuka detail.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {toolkitItems.map((item) => (
            <ToolkitCard
              key={item.id}
              item={item}
              onOpen={() => setActiveTool(item.id)}
            />
          ))}
        </div>
      </div>

      {activeItem ? (
        <ToolkitModal onClose={() => setActiveTool(null)} item={activeItem} />
      ) : null}
    </section>
  );
}

function ToolkitCard({
  item,
  onOpen,
}: {
  item: ToolkitItem;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group w-full rounded-3xl border border-white/10 bg-gradient-to-br ${item.gradient} p-6 text-left shadow-xl transition hover:-translate-y-1 hover:border-cyan-200/40 focus:outline-none focus:ring-2 focus:ring-cyan-200/60 focus:ring-offset-2 focus:ring-offset-slate-950`}
    >
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
        <item.icon className="w-6 h-6" />
      </div>
      <h4 className="mt-4 text-xl font-semibold text-white">{item.title}</h4>
      <p className="mt-2 text-sm text-white/75 leading-relaxed">
        {item.description}
      </p>
      <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100 transition group-hover:gap-3">
        {item.cta}
        <ArrowRight className="w-4 h-4" />
      </div>
    </button>
  );
}

function ToolkitModal({
  item,
  onClose,
}: {
  item: ToolkitItem;
  onClose: () => void;
}) {
  const { setIsModalOpen } = useModal();

  useEffect(() => {
    setIsModalOpen(true);
    return () => {
      setIsModalOpen(false);
    };
  }, [setIsModalOpen]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        aria-hidden
        onClick={onClose}
      />
      <div className="relative w-full max-w-5xl my-auto max-h-[90vh] flex flex-col rounded-3xl border border-white/10 bg-slate-900 text-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5 flex-shrink-0">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">
              {item.title}
            </p>
            <h4 className="text-2xl font-semibold mt-1">{item.description}</h4>
          </div>
          <button
            type="button"
            aria-label="Tutup"
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80 transition hover:border-white/30 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200/60 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {item.id === "map" && <MapContent />}
          {item.id === "transport" && <TransportContent />}
          {item.id === "budget" && <BudgetContent />}
        </div>
      </div>
    </div>
  );
}

function MapContent() {
  const pins = [
    {
      name: "Pantai Barat",
      detail: "Spot sunset, pusat kuliner malam",
    },
    {
      name: "Cagar Alam",
      detail: "Track hutan, satwa, dan goa",
    },
    {
      name: "Pasir Putih",
      detail: "Snorkeling, kapal kaca, pasir halus",
    },
    {
      name: "Pelabuhan Cikidang",
      detail: "Spot sunrise + dermaga foto",
    },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-inner">
        <iframe
          title="Peta Pangandaran"
          className="h-[600px] w-full"
          src="https://www.openstreetmap.org/export/embed.html?bbox=108.625%2C-7.802%2C108.702%2C-7.676&layer=mapnik&marker=-7.740%2C108.655"
          allowFullScreen
        />
      </div>
      <div className="space-y-3">
        <div className="space-y-2">
          {pins.map((pin) => (
            <div
              key={pin.name}
              className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"
            >
              <div className="mt-0.5 rounded-lg bg-cyan-500/15 p-2 text-cyan-200">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-white">{pin.name}</p>
                <p className="text-xs text-white/70">{pin.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TransportContent() {
  const options = [
    {
      title: "Bus / Travel",
      detail: "Bandung/Jakarta - Pangandaran, drop off terminal atau hotel",
      eta: "6-9 jam",
      price: "Mulai 180k",
      icon: Bus,
    },
    {
      title: "Kereta + Shuttle",
      detail: "Stasiun Banjar lanjut travel 1 jam ke Pangandaran",
      eta: "4-6 jam",
      price: "Mulai 220k",
      icon: Train,
    },
    {
      title: "Mobil / Motor sewa",
      detail: "Cocok untuk hopping spot di dalam kota & pantai timur",
      eta: "Dalam kota",
      price: "Motor 90k/hari, Mobil 350k/hari",
      icon: Car,
    },
    {
      title: "Pesawat (via Nusa Wiru)",
      detail: "Jadwal terbatas, lanjut taksi 20 menit ke pusat kota",
      eta: "50 menit dari Bandung",
      price: "Cek maskapai",
      icon: Plane,
    },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {options.map((opt) => (
        <div
          key={opt.title}
          className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
                <opt.icon className="h-4 w-4" />
                {opt.title}
              </div>
              <p className="text-sm text-white/80">{opt.detail}</p>
            </div>
            <span className="text-xs rounded-full bg-cyan-500/15 px-3 py-1 text-cyan-100">
              {opt.eta}
            </span>
          </div>
          <div className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-emerald-100">
            <Wallet className="h-4 w-4" />
            {opt.price}
          </div>
        </div>
      ))}
    </div>
  );
}

function BudgetContent() {
  const [form, setForm] = useState({
    people: "2",
    days: "2",
    makan: "85000",
    tiket: "50000",
    transport: "180000",
    aktivitas: "60000",
  });

  const peopleNum = Math.max(1, toNumber(form.people));
  const daysNum = Math.max(1, toNumber(form.days));
  const makanNum = Math.max(0, toNumber(form.makan));
  const tiketNum = Math.max(0, toNumber(form.tiket));
  const transportNum = Math.max(0, toNumber(form.transport));
  const aktivitasNum = Math.max(0, toNumber(form.aktivitas));

  const totalTrip = useMemo(() => {
    const makan = makanNum * daysNum * peopleNum;
    const aktivitas = aktivitasNum * daysNum * peopleNum;
    const tiket = tiketNum * peopleNum;
    const transport = transportNum * daysNum;
    return makan + aktivitas + tiket + transport;
  }, [aktivitasNum, daysNum, makanNum, peopleNum, tiketNum, transportNum]);

  const perPerson = useMemo(
    () => totalTrip / Math.max(peopleNum, 1),
    [totalTrip, peopleNum]
  );
  const perPersonPerDay = useMemo(
    () => perPerson / Math.max(daysNum, 1),
    [perPerson, daysNum]
  );

  const update = (key: keyof typeof form) => (value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField
          label="Jumlah orang"
          value={form.people}
          min={1}
          onChange={update("people")}
        />
        <NumberField
          label="Durasi (hari)"
          value={form.days}
          min={1}
          onChange={update("days")}
        />
        <NumberField
          label="Makan per orang / hari"
          prefix="Rp"
          value={form.makan}
          step={5000}
          min={0}
          onChange={update("makan")}
        />
        <NumberField
          label="Aktivitas per orang / hari"
          prefix="Rp"
          value={form.aktivitas}
          step={5000}
          min={0}
          onChange={update("aktivitas")}
        />
        <NumberField
          label="Tiket/masuk per orang"
          prefix="Rp"
          value={form.tiket}
          step={5000}
          min={0}
          onChange={update("tiket")}
        />
        <NumberField
          label="Transport (per hari, grup)"
          prefix="Rp"
          value={form.transport}
          step={10000}
          min={0}
          onChange={update("transport")}
        />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-inner space-y-3">
        <p className="text-sm text-white/70">Ringkasan</p>
        <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">
            Total trip
          </p>
          <p className="text-3xl font-semibold mt-2">
            Rp {formatCurrency(totalTrip)}
          </p>
          <p className="text-sm text-white/60">
            Sudah termasuk makan, tiket, transport, dan aktivitas.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <SummaryCard
            label="Per orang"
            value={`Rp ${formatCurrency(perPerson)}`}
          />
          <SummaryCard
            label="Per orang / hari"
            value={`Rp ${formatCurrency(perPersonPerDay)}`}
          />
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-white/65">
          <span className="rounded-full bg-white/10 px-3 py-1">
            Sesuaikan harga jika musim liburan.
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1">
            Tambahkan 10-15% untuk buffer darurat.
          </span>
        </div>
      </div>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  prefix,
  min,
  step = 1,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  min?: number;
  step?: number;
}) {
  return (
    <label className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition focus-within:border-cyan-200/60 focus-within:bg-white/10">
      <span className="text-xs uppercase tracking-[0.2em] text-white/60">
        {label}
      </span>
      <div className="mt-1 inline-flex items-center gap-2 text-white">
        {prefix ? <span className="text-white/60">{prefix}</span> : null}
        <input
          type="number"
          className="w-full bg-transparent text-white outline-none"
          value={value}
          min={min}
          step={step}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </label>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/10 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-white/60">
        {label}
      </p>
      <p className="mt-2 text-xl font-semibold text-white">{value}</p>
    </div>
  );
}

function formatCurrency(value: number) {
  if (!Number.isFinite(value)) return "-";
  return new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(
    Math.max(0, Math.round(value))
  );
}

function toNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}
