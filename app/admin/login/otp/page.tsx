"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  MapPin,
  ArrowLeft,
  Mail,
  Clock,
  Send,
  CheckCircle2,
} from "lucide-react";

function OtpVerificationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const emailParam = searchParams.get("email");
  const typeParam = searchParams.get("type") as "LOGIN" | "REGISTER";
  const nameParam = searchParams.get("name");
  const passwordParam = searchParams.get("password");

  // State untuk tahap 1: Input email
  const [step, setStep] = useState<"email" | "otp">(
    emailParam ? "otp" : "email"
  );
  const [email, setEmail] = useState(emailParam || "");
  const [type, setType] = useState<"LOGIN" | "REGISTER">(
    typeParam || "REGISTER"
  );
  const [name, setName] = useState(nameParam || "");
  const [password, setPassword] = useState(passwordParam || "");
  const [sendingOtp, setSendingOtp] = useState(false);

  // State untuk tahap 2: Input OTP
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [resending, setResending] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const backgroundUrl =
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80&sat=-20";

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Format email tidak valid");
      return;
    }

    setSendingOtp(true);

    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Gagal mengirim OTP");
      }

      // Move to OTP input step
      setStep("otp");
      setTimeLeft(600); // Reset timer
    } catch (err: any) {
      setError(err.message || "Gagal mengirim OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[0];
    }

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    if (!/^\d{6}$/.test(pastedData)) return;

    const newOtp = pastedData.split("");
    setOtp(newOtp);
    inputRefs.current[5]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("Masukkan 6 digit kode OTP");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          code: otpCode,
          type,
          name,
          password,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Verifikasi gagal");
      }

      // For REGISTER: Show success message and redirect to login
      if (type === "REGISTER") {
        setError(""); // Clear error
        setSuccess(
          "Registrasi berhasil! Anda akan diarahkan ke halaman login..."
        );
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push("/admin/login");
        }, 2000);
        return;
      }

      // For LOGIN: Auto login after successful verification
      const loginResult = await signIn("credentials", {
        identifier: email,
        password: password,
        redirect: false,
      });

      if (loginResult?.error) {
        setError("Verifikasi berhasil, tetapi gagal login. Coba login manual.");
        setTimeout(() => router.push("/admin/login"), 2000);
        return;
      }

      // Redirect to dashboard for LOGIN
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Kode OTP tidak valid");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError("");

    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Gagal mengirim ulang OTP");
      }

      setTimeLeft(600); // Reset timer
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      setError(err.message || "Gagal mengirim ulang OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
        aria-hidden
      />
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
        <div className="w-full max-w-md">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-10">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
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

            <button
              onClick={() => {
                if (step === "otp" && !emailParam) {
                  setStep("email");
                } else {
                  router.push("/admin/login");
                }
              }}
              className="flex items-center gap-2 text-sm text-white/60 hover:text-white mb-6 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </button>

            {step === "email" ? (
              // STEP 1: Email Input
              <>
                <div className="space-y-2 mb-8">
                  <p className="text-xs font-semibold text-cyan-300">
                    Verifikasi Email
                  </p>
                  <h1 className="text-4xl font-bold leading-tight">
                    Masukkan Email Anda
                  </h1>
                  <p className="text-sm text-white/60">
                    Kami akan mengirimkan kode verifikasi 6 digit ke email Anda
                  </p>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-400/40 rounded-2xl">
                    <p className="text-sm text-red-100">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSendOtp} className="space-y-6">
                  <label className="block">
                    <span className="text-sm font-medium text-white/80 mb-2 block">
                      Alamat Email
                    </span>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nama@email.com"
                        required
                        className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-white/40 focus:border-cyan-400 focus:bg-white/15 outline-none transition"
                      />
                    </div>
                  </label>

                  {/* Toggle type for standalone access */}
                  {!typeParam && (
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value="REGISTER"
                          checked={type === "REGISTER"}
                          onChange={(e) =>
                            setType(e.target.value as "REGISTER")
                          }
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-white/80">
                          Registrasi
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value="LOGIN"
                          checked={type === "LOGIN"}
                          onChange={(e) => setType(e.target.value as "LOGIN")}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-white/80">Login</span>
                      </label>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={sendingOtp}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 py-3.5 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sendingOtp ? "Mengirim..." : "Kirim Kode OTP"}
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </>
            ) : (
              // STEP 2: OTP Input
              <>
                <div className="space-y-2 mb-8">
                  <p className="text-xs font-semibold text-cyan-300">
                    Verifikasi Email
                  </p>
                  <h1 className="text-4xl font-bold leading-tight">
                    Masukkan Kode OTP
                  </h1>
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <Mail className="w-4 h-4" />
                    <p>
                      Kode telah dikirim ke{" "}
                      <strong className="text-white">{email}</strong>
                    </p>
                  </div>
                </div>

                {/* Timer */}
                <div className="flex items-center justify-center gap-2 mb-6 p-3 bg-white/5 border border-white/10 rounded-2xl">
                  <Clock className="w-5 h-5 text-cyan-300" />
                  <span className="text-sm font-semibold">
                    Kode berlaku: {formatTime(timeLeft)}
                  </span>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-400/40 rounded-2xl">
                    <p className="text-sm text-red-100">{error}</p>
                  </div>
                )}

                {success && (
                  <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-400/40 rounded-2xl flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-200 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-emerald-100">{success}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* OTP Input */}
                  <div className="flex gap-2 justify-center">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => {
                          inputRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        className="w-12 h-14 text-center text-2xl font-bold bg-white/10 border-2 border-white/20 rounded-xl text-white focus:border-cyan-400 focus:bg-white/15 outline-none transition"
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otp.some((d) => d === "")}
                    className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 py-3.5 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Memverifikasi..." : "Verifikasi"}
                  </button>

                  <div className="text-center">
                    <p className="text-sm text-white/60 mb-2">
                      Tidak menerima kode?
                    </p>
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={resending || timeLeft > 540}
                      className="text-sm font-semibold text-cyan-300 hover:text-cyan-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      {resending ? "Mengirim ulang..." : "Kirim Ulang OTP"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OtpVerificationPage() {
  return (
    <Suspense
      fallback={
        <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-300 mx-auto mb-4"></div>
            <p className="text-white/60">Memuat...</p>
          </div>
        </div>
      }
    >
      <OtpVerificationContent />
    </Suspense>
  );
}
