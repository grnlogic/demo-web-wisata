"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Lock, User, AlertCircle, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const backgroundUrl =
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80&sat=-20";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Username atau password salah");
      } else {
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (error) {
      setError("Terjadi kesalahan, silakan coba lagi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
        aria-hidden
      />
      {/* Gradient overlays to create depth */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950/70 to-slate-900"
        aria-hidden
      />
      <div
        className="absolute -left-20 -top-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -right-16 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-5xl grid gap-12 lg:grid-cols-[1.1fr_1fr] items-center">
          {/* Form panel */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-10 lg:p-12">
            <div className="flex items-center gap-3 mb-10">
              <div className="h-12 w-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-cyan-300" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-white/60">
                  Portal Wisata
                </p>
                <p className="text-sm text-white/60">Wisata Pangandaran</p>
              </div>
            </div>

            <div className="space-y-2 mb-8">
              <p className="text-xs font-semibold text-cyan-300">Masuk</p>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Masuk ke akun Anda.
              </h1>
              <p className="text-sm text-white/60">
                Gunakan akun yang sudah terdaftar untuk melanjutkan ke portal.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-400/40 rounded-2xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-200 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-100">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block">
                <span className="text-xs uppercase tracking-wide text-white/50">
                  Username
                </span>
                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 focus-within:border-cyan-400/60 focus-within:bg-white/10 transition-all">
                  <User className="w-5 h-5 text-white/60" />
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-transparent text-white placeholder-white/40 focus:outline-none"
                    placeholder="admin"
                    required
                    autoComplete="username"
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-xs uppercase tracking-wide text-white/50">
                  Password
                </span>
                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 focus-within:border-cyan-400/60 focus-within:bg-white/10 transition-all">
                  <Lock className="w-5 h-5 text-white/60" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent text-white placeholder-white/40 focus:outline-none"
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                  />
                </div>
              </label>

              <div className="flex items-center justify-between text-sm text-white/60">
                <a href="/" className="hover:text-white">
                  Kembali ke beranda
                </a>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 border border-white/10 text-xs">
                  Aman dengan enkripsi
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 py-3.5 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Memproses..." : "Masuk"}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>

          {/* Visual column */}
          <div className="relative hidden lg:block">
            <div
              className="absolute inset-0 rounded-[28px] border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl"
              aria-hidden
            />
            <div className="relative h-full min-h-[520px] overflow-hidden rounded-[28px]">
              <div
                className="absolute inset-0 bg-cover bg-center scale-105"
                style={{ backgroundImage: `url(${backgroundUrl})` }}
                aria-hidden
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"
                aria-hidden
              />
              <div className="absolute bottom-0 left-0 right-0 p-10 text-white/90">
                <p className="text-sm uppercase tracking-[0.25em] text-cyan-200/80">
                  Pangandaran
                </p>
                <h3 className="mt-2 text-3xl font-semibold">
                  Keindahan pesisir dan alam
                </h3>
                <p className="mt-2 text-sm text-white/70">
                  Login untuk mengakses dan mengelola konten destinasi, event,
                  kuliner, dan berita di portal wisata.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
