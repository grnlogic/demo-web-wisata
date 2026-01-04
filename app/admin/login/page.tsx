"use client";

import { getSession, signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Lock,
  User,
  AlertCircle,
  ArrowRight,
  Mail,
  UserPlus,
  CheckCircle2,
  Eye,
  EyeOff,
  Chrome,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterPasswordConfirm, setShowRegisterPasswordConfirm] =
    useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const backgroundUrl =
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80&sat=-20";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        identifier,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Username atau password salah");
      } else {
        const session = await getSession();
        const role = session?.user?.role || "USER";
        if (role === "ADMIN") {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }
        router.refresh();
      }
    } catch (error) {
      setError("Terjadi kesalahan, silakan coba lagi");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");
    setRegisterSuccess("");

    if (registerPassword !== registerPasswordConfirm) {
      setRegisterError("Password tidak sama. Harap verifikasi kembali.");
      return;
    }

    setRegisterLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registerName,
          email: registerEmail,
          password: registerPassword,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Gagal mendaftar");
      }

      setRegisterSuccess("Akun berhasil dibuat. Masuk otomatis...");

      const loginResult = await signIn("credentials", {
        identifier: registerEmail,
        password: registerPassword,
        redirect: false,
      });

      if (loginResult?.error) {
        setRegisterError(
          "Registrasi berhasil, tetapi gagal login. Coba login manual."
        );
        return;
      }

      router.push("/");
      router.refresh();
    } catch (err: any) {
      setRegisterError(err.message || "Gagal mendaftar");
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setRegisterError("");
    setGoogleLoading(true);
    try {
      await signIn("google", { callbackUrl: "/" });
    } finally {
      setGoogleLoading(false);
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
              <p className="text-xs font-semibold text-cyan-300">
                {mode === "login" ? "Masuk" : "Registrasi"}
              </p>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                {mode === "login" ? "Masuk ke akun Anda." : "Buat akun baru."}
              </h1>
              <p className="text-sm text-white/60">
                {mode === "login"
                  ? "Gunakan akun yang sudah terdaftar untuk melanjutkan ke portal."
                  : "Daftar dengan email untuk memberikan rating dan komentar."}
              </p>
            </div>

            <div className="inline-flex bg-white/5 border border-white/10 rounded-full p-1 text-sm mb-6">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`px-4 py-2 rounded-full transition ${
                  mode === "login"
                    ? "bg-white text-slate-900 shadow"
                    : "text-white/70"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setMode("register")}
                className={`px-4 py-2 rounded-full transition ${
                  mode === "register"
                    ? "bg-white text-slate-900 shadow"
                    : "text-white/70"
                }`}
              >
                Daftar
              </button>
            </div>

            {mode === "login" && error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-400/40 rounded-2xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-200 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-100">{error}</p>
              </div>
            )}

            {mode === "login" ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <label className="block">
                  <span className="text-xs uppercase tracking-wide text-white/50">
                    Email atau Username
                  </span>
                  <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 focus-within:border-cyan-400/60 focus-within:bg-white/10 transition-all">
                    <Mail className="w-5 h-5 text-white/60" />
                    <input
                      id="identifier"
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="w-full bg-transparent text-white placeholder-white/40 focus:outline-none"
                      placeholder="admin atau email"
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
                      type={showLoginPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onPaste={(e) => e.preventDefault()}
                      onCopy={(e) => e.preventDefault()}
                      onCut={(e) => e.preventDefault()}
                      className="w-full bg-transparent text-white placeholder-white/40 focus:outline-none"
                      placeholder="••••••••"
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword((prev) => !prev)}
                      className="text-white/60 hover:text-white transition"
                      aria-label={
                        showLoginPassword
                          ? "Sembunyikan password"
                          : "Lihat password"
                      }
                    >
                      {showLoginPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
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

                <div className="relative py-2 text-center text-white/50 text-xs">
                  <span className="absolute left-0 right-0 top-1/2 h-px bg-white/10" aria-hidden />
                  <span className="relative bg-slate-950 px-3">atau</span>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={googleLoading}
                  className="w-full inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-60"
                >
                  <Chrome className="w-5 h-5 text-amber-300" />
                  {googleLoading ? "Menghubungkan ke Google..." : "Masuk dengan Google"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-5">
                <label className="block">
                  <span className="text-xs uppercase tracking-wide text-white/50">
                    Nama (opsional)
                  </span>
                  <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 focus-within:border-cyan-400/60 focus-within:bg-white/10 transition-all">
                    <User className="w-5 h-5 text-white/60" />
                    <input
                      id="register-name"
                      type="text"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      className="w-full bg-transparent text-white placeholder-white/40 focus:outline-none"
                      placeholder="Nama lengkap"
                      autoComplete="name"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="text-xs uppercase tracking-wide text-white/50">
                    Email
                  </span>
                  <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 focus-within:border-cyan-400/60 focus-within:bg-white/10 transition-all">
                    <Mail className="w-5 h-5 text-white/60" />
                    <input
                      id="register-email"
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className="w-full bg-transparent text-white placeholder-white/40 focus:outline-none"
                      placeholder="email@contoh.com"
                      required
                      autoComplete="email"
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
                      id="register-password"
                      type={showRegisterPassword ? "text" : "password"}
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      onPaste={(e) => e.preventDefault()}
                      onCopy={(e) => e.preventDefault()}
                      onCut={(e) => e.preventDefault()}
                      className="w-full bg-transparent text-white placeholder-white/40 focus:outline-none"
                      placeholder="Minimal 8 karakter"
                      required
                      minLength={8}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegisterPassword((prev) => !prev)}
                      className="text-white/60 hover:text-white transition"
                      aria-label={
                        showRegisterPassword
                          ? "Sembunyikan password"
                          : "Lihat password"
                      }
                    >
                      {showRegisterPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </label>

                <label className="block">
                  <span className="text-xs uppercase tracking-wide text-white/50">
                    Verifikasi Password
                  </span>
                  <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 focus-within:border-cyan-400/60 focus-within:bg-white/10 transition-all">
                    <Lock className="w-5 h-5 text-white/60" />
                    <input
                      id="register-password-confirm"
                      type={showRegisterPasswordConfirm ? "text" : "password"}
                      value={registerPasswordConfirm}
                      onChange={(e) =>
                        setRegisterPasswordConfirm(e.target.value)
                      }
                      onPaste={(e) => e.preventDefault()}
                      onCopy={(e) => e.preventDefault()}
                      onCut={(e) => e.preventDefault()}
                      className="w-full bg-transparent text-white placeholder-white/40 focus:outline-none"
                      placeholder="Ulangi password"
                      required
                      minLength={8}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowRegisterPasswordConfirm((prev) => !prev)
                      }
                      className="text-white/60 hover:text-white transition"
                      aria-label={
                        showRegisterPasswordConfirm
                          ? "Sembunyikan password"
                          : "Lihat password"
                      }
                    >
                      {showRegisterPasswordConfirm ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </label>

                {registerError && (
                  <div className="mb-2 p-4 bg-red-500/10 border border-red-400/40 rounded-2xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-200 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-100">{registerError}</p>
                  </div>
                )}

                {registerSuccess && (
                  <div className="mb-2 p-4 bg-emerald-500/10 border border-emerald-400/40 rounded-2xl flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-200 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-emerald-100">
                      {registerSuccess}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={registerLoading}
                  className="group w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 py-3.5 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {registerLoading ? "Mendaftarkan..." : "Daftar & Masuk"}
                  <UserPlus className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>

                <div className="relative py-2 text-center text-white/50 text-xs">
                  <span className="absolute left-0 right-0 top-1/2 h-px bg-white/10" aria-hidden />
                  <span className="relative bg-slate-950 px-3">atau</span>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={googleLoading}
                  className="w-full inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-60"
                >
                  <Chrome className="w-5 h-5 text-amber-300" />
                  {googleLoading ? "Menghubungkan ke Google..." : "Daftar / Masuk dengan Google"}
                </button>

                <p className="text-xs text-white/60 text-center">
                  Dengan mendaftar, Anda dapat memberikan rating dan komentar
                  pada destinasi.
                </p>
              </form>
            )}
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
