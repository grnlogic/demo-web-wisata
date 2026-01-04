"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Sparkles,
  X,
} from "lucide-react";

type QuickStep = {
  time: string;
  title: string;
  detail: string;
};

type DayCell = {
  date: Date;
  currentMonth: boolean;
  isToday: boolean;
};

const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const DAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

const buildCalendar = (viewDate: Date): DayCell[] => {
  const monthStart = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const offset = (monthStart.getDay() + 6) % 7; // Mulai Senin
  const start = new Date(monthStart);
  start.setDate(monthStart.getDate() - offset);

  const days: DayCell[] = [];
  for (let i = 0; i < 42; i += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const today = new Date();
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    days.push({
      date,
      currentMonth: date.getMonth() === viewDate.getMonth(),
      isToday,
    });
  }
  return days;
};

const formatFullDate = (date: Date) => {
  const day = date.getDate();
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const formatMonthYear = (date: Date) =>
  `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;

export default function QuickPlannerCalendar({
  quickSteps,
}: {
  quickSteps: QuickStep[];
}) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  const days = useMemo(() => buildCalendar(viewDate), [viewDate]);
  const selectedLabel = useMemo(
    () => formatFullDate(selectedDate),
    [selectedDate]
  );

  const changeMonth = (direction: "prev" | "next") => {
    setViewDate((prev) => {
      const next = new Date(prev);
      next.setMonth(prev.getMonth() + (direction === "next" ? 1 : -1));
      return next;
    });
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-2 rounded-full bg-white text-slate-900 px-5 py-3 text-sm font-semibold shadow-xl ring-2 ring-white/30 transition hover:-translate-y-0.5"
      >
        <CalendarIcon className="w-4 h-4" />
        Lihat kalender
        <span className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-600 group-hover:translate-x-0.5 transition">
          interaktif
          <Sparkles className="w-3 h-3 text-amber-500" />
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm px-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.15),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(96,165,250,0.15),transparent_35%)]" />
          <div className="relative w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 p-6 shadow-2xl">
            <div className="flex flex-col gap-6 lg:flex-row">
              <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-inner">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">
                      Kalender ekspres
                    </p>
                    <p className="text-lg font-semibold text-white">
                      {formatMonthYear(viewDate)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => changeMonth("prev")}
                      className="rounded-full border border-white/10 bg-white/10 p-2 text-white transition hover:border-white/30 hover:bg-white/15"
                      aria-label="Bulan sebelumnya"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => changeMonth("next")}
                      className="rounded-full border border-white/10 bg-white/10 p-2 text-white transition hover:border-white/30 hover:bg-white/15"
                      aria-label="Bulan selanjutnya"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-7 gap-2 text-xs font-semibold uppercase tracking-wide text-white/60">
                  {DAYS.map((day) => (
                    <div key={day} className="text-center">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="mt-2 grid grid-cols-7 gap-2">
                  {days.map((day) => {
                    const isSelected =
                      day.date.toDateString() === selectedDate.toDateString();

                    return (
                      <button
                        key={day.date.toISOString()}
                        type="button"
                        onClick={() => setSelectedDate(day.date)}
                        className={`relative flex h-12 w-full items-center justify-center rounded-xl border text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 ${
                          isSelected
                            ? "border-cyan-300/70 bg-cyan-300/20 text-white shadow-lg shadow-cyan-500/20"
                            : day.isToday
                            ? "border-white/30 bg-white/10 text-white"
                            : day.currentMonth
                            ? "border-white/10 bg-white/5 text-white/80"
                            : "border-white/5 bg-white/0 text-white/50"
                        }`}
                      >
                        <span>{day.date.getDate()}</span>
                        {day.isToday && !isSelected && (
                          <span className="absolute bottom-1 h-1 w-1 rounded-full bg-cyan-300" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="w-full lg:w-80 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-inner">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-emerald-200">
                      Agenda pilihan
                    </p>
                    <p className="text-lg font-semibold text-white">
                      {selectedLabel}
                    </p>
                  </div>
                  <Sparkles className="w-5 h-5 text-emerald-200" />
                </div>

                <div className="mt-4 space-y-3">
                  {quickSteps.map((step, idx) => (
                    <div
                      key={step.title}
                      className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/80 shadow-sm"
                    >
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/60">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {step.time}
                        </span>
                        <span className="rounded-full bg-emerald-400/15 px-2 py-1 text-[10px] font-semibold text-emerald-100">
                          Hari {idx < 2 ? 1 : 2}
                        </span>
                      </div>
                      <p className="mt-2 text-white font-semibold">
                        {step.title}
                      </p>
                      <p className="text-xs text-white/70 leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-3 text-xs text-white/60">
                  <MapPin className="w-4 h-4 text-cyan-200" />
                  Klik tanggal untuk menandai hari keberangkatan. Rute
                  menyesuaikan dua hari tanpa detour.
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white/70">
                <Sparkles className="w-4 h-4 text-amber-300" />
                Kalender ini hanya simulasi cepat; daftar lengkap ada di halaman
                event.
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/event"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/40"
                >
                  Buka halaman event
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/40"
                >
                  <X className="w-4 h-4" />
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
