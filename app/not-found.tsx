import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden min-h-[72vh] px-6 py-16 sm:px-10 md:px-16">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-80"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-white to-blue-50" />
        <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-ocean-200 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-primary-100 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-6 text-slate-900">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary-700 shadow-sm ring-1 ring-slate-200">
            Hilang di Pangandaran?
          </p>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              404 • Lokasi tidak ditemukan
            </h1>
            <p className="text-lg text-slate-600 md:text-xl">
              Sepertinya halaman yang kamu cari sedang bersembunyi di balik
              bukit. Yuk kembali ke rute yang benar dan lanjutkan petualanganmu.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/20 transition hover:-translate-y-0.5 hover:bg-primary-700"
            >
              Kembali ke Beranda
              <span aria-hidden>↺</span>
            </Link>
            <Link
              href="/destinasi"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary-700 shadow-md ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Jelajahi Destinasi
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm">
              <p className="text-sm font-semibold text-primary-700">
                Tips cepat
              </p>
              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                <li>• Cek kembali ejaan URL.</li>
                <li>• Gunakan navigasi utama di atas.</li>
                <li>• Cari info di halaman destinasi atau acara.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm">
              <p className="text-sm font-semibold text-primary-700">
                Butuh bantuan?
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Tim kami siap membantu melalui chat di pojok kanan bawah atau
                halaman kontak.
              </p>
              <Link
                href="/tentang"
                className="mt-3 inline-flex text-sm font-semibold text-primary-700 underline underline-offset-4"
              >
                Kenal lebih dekat dengan kami
              </Link>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-ocean-50 opacity-90" />
            <div className="relative space-y-4 p-8">
              <div className="flex items-center justify-between text-sm font-semibold text-primary-700">
                <span>Peta Pangandaran</span>
                <span className="rounded-full bg-primary-100 px-3 py-1 text-xs text-primary-700">
                  Aman • Nyaman
                </span>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-primary-100 via-ocean-100 to-white shadow-inner">
                <div className="absolute inset-0 opacity-70" aria-hidden="true">
                  <svg
                    viewBox="0 0 400 300"
                    className="h-full w-full text-primary-200"
                    fill="none"
                  >
                    <path
                      d="M50 220C120 190 140 150 200 160C260 170 270 240 340 230"
                      stroke="currentColor"
                      strokeWidth="14"
                      strokeLinecap="round"
                    />
                    <path
                      d="M80 120C140 130 170 90 220 90C270 90 310 130 330 160"
                      stroke="currentColor"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                    <circle cx="120" cy="180" r="10" fill="#0073e6" />
                    <circle cx="210" cy="130" r="10" fill="#00b8e6" />
                    <circle cx="300" cy="190" r="10" fill="#0ea5e9" />
                  </svg>
                </div>
                <div className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow">
                  Jalur wisata
                </div>
                <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-primary-700 shadow">
                  <span className="inline-block h-2 w-2 rounded-full bg-primary-600" />
                  Spot favorit
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm text-slate-700">
                <div className="rounded-xl bg-white/70 px-4 py-3 shadow-sm ring-1 ring-slate-200">
                  <p className="text-xs uppercase tracking-[0.08em] text-slate-500">
                    Cuaca
                  </p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    Cerah bersahabat
                  </p>
                  <p className="text-xs text-slate-500">
                    Angin laut sepoi-sepoi
                  </p>
                </div>
                <div className="rounded-xl bg-white/70 px-4 py-3 shadow-sm ring-1 ring-slate-200">
                  <p className="text-xs uppercase tracking-[0.08em] text-slate-500">
                    Rekomendasi
                  </p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    Pantai & Kuliner
                  </p>
                  <p className="text-xs text-slate-500">
                    Sunset, seafood, kopi senja
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
