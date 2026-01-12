"use client";

import { getSession, signIn } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
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
  Waves,
  Sparkles,
  X,
} from "lucide-react";
import { gsap } from "gsap";

// Toast/Popup Component
type ToastProps = {
  message: string;
  type: "error" | "success";
  onClose: () => void;
};

function Toast({ message, type, onClose }: ToastProps) {
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate in
    gsap.fromTo(
      toastRef.current,
      { y: -50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
    );

    // Auto dismiss
    const timer = setTimeout(() => {
      handleClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    gsap.to(toastRef.current, {
      y: -20,
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={toastRef}
      className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-md border border-white/10 ${
        type === "error" ? "bg-red-500/20 text-red-100" : "bg-emerald-500/20 text-emerald-100"
      }`}
    >
      {type === "error" ? (
        <AlertCircle className="w-5 h-5" />
      ) : (
        <CheckCircle2 className="w-5 h-5" />
      )}
      <span className="font-medium text-sm">{message}</span>
      <button onClick={handleClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Register states
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);
  
  // UI states
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterPasswordConfirm, setShowRegisterPasswordConfirm] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Notification State
  const [notification, setNotification] = useState<{ message: string; type: "error" | "success" } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    // Initial Animation Sequence
    const tl = gsap.timeline();

    if (textContentRef.current) {
        tl.fromTo(textContentRef.current, 
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );
    }

    if (formCardRef.current) {
        tl.fromTo(formCardRef.current,
            { y: 100, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.75)" },
            "-=0.6"
        );
    }
  }, []);

  const backgroundUrl = "/sunset_login%20page.jpg";

  const showToast = (message: string, type: "error" | "success") => {
    setNotification({ message, type });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        identifier,
        password,
        redirect: false,
      });

      if (result?.error) {
        showToast("Username atau password salah", "error");
        // Shake animation on error
        gsap.to(formCardRef.current, {
          x: [-10, 10, -10, 10, 0],
          duration: 0.4,
          ease: "none",
          repeat: 2,
          yoyo: true,
        });
      } else {
        showToast("Login berhasil! Mengalihkan...", "success");
        const session = await getSession();
        const role = session?.user?.role || "USER";
        setTimeout(() => {
            if (role === "ADMIN") {
            router.push("/admin/dashboard");
            } else {
            router.push("/");
            }
            router.refresh();
        }, 1000);
      }
    } catch (error) {
      showToast("Terjadi kesalahan, silakan coba lagi", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (registerPassword !== registerPasswordConfirm) {
      showToast("Password tidak sama!", "error");
      return;
    }

    setRegisterLoading(true);

    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: registerEmail,
          type: "REGISTER",
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Gagal mengirim OTP");
      }

      showToast("OTP terkirim ke email anda!", "success");

      const params = new URLSearchParams({
        email: registerEmail,
        type: "REGISTER",
        name: registerName,
        password: registerPassword,
      });

      setTimeout(() => {
          router.push(`/admin/login/otp?${params.toString()}`);
      }, 1000);
    } catch (err: any) {
      showToast(err.message || "Gagal mengirim OTP", "error");
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await signIn("google", { callbackUrl: "/" });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 font-sans text-white selection:bg-cyan-500/30" ref={containerRef}>
      
      {/* Toast Notification Popup */}
      {notification && (
        <Toast 
            message={notification.message} 
            type={notification.type} 
            onClose={() => setNotification(null)} 
        />
      )}

      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className={`absolute inset-0 bg-cover bg-center transition-transform duration-[30s] ease-linear will-change-transform ${
            mounted ? "scale-110" : "scale-100"
          }`}
          style={{ backgroundImage: `url('${backgroundUrl}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-slate-950/40" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-[1000px] grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Main Visual Text (Left Side Desktop) */}
          <div className="hidden lg:flex flex-col gap-6 p-8" ref={textContentRef}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 px-3 text-sm backdrop-blur-md w-fit shadow-lg shadow-cyan-500/10">
              <Sparkles className="h-4 w-4 text-cyan-300 animate-pulse" />
              <span className="text-white/80">Explore Hidden Gems</span>
            </div>
            <h1 className="font-playfair text-5xl font-bold leading-tight text-white drop-shadow-2xl">
              Jelajahi <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-200">Keindahan</span> <br />
              Pangandaran.
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-md">
              Portal resmi untuk menemukan destinasi terbaik, event seru, dan pengalaman lokal yang tak terlupakan.
            </p>
            
            <div className="flex gap-4 mt-4">
               <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800" />
                  ))}
               </div>
               <div className="flex flex-col justify-center text-sm">
                  <span className="font-bold text-white">2.5k+</span>
                  <span className="text-white/60 text-xs">Wisatawan bergabung</span>
               </div>
            </div>
          </div>

          {/* Login Card (Right Side) */}
          <div className="relative w-full max-w-md mx-auto" ref={formCardRef}>
             {/* Glassmorphism Card */}
             <div className="relative bg-slate-900/60 backdrop-blur-2xl rounded-[32px] border border-white/10 p-8 md:p-10 shadow-2xl overflow-hidden hover:shadow-cyan-500/10 transition-shadow duration-500">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-80" />
                
                {/* Mobile Header (Only visible on small screens) */}
                <div className="lg:hidden mb-8 text-center">
                   <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/30">
                      <Waves className="h-6 w-6 text-white" />
                   </div>
                   <h2 className="text-2xl font-bold text-white font-playfair">Wisata Pangandaran</h2>
                </div>

                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    {mode === 'login' ? 'Selamat Datang' : 'Buat Akun'}
                  </h2>
                  <div className="flex bg-slate-950/50 rounded-lg p-1 border border-white/5">
                    <button 
                      onClick={() => setMode('login')}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${mode === 'login' ? 'bg-white text-slate-950 shadow' : 'text-white/50 hover:text-white'}`}
                    >
                      Masuk
                    </button>
                    <button 
                      onClick={() => setMode('register')}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${mode === 'register' ? 'bg-white text-slate-950 shadow' : 'text-white/50 hover:text-white'}`}
                    >
                      Daftar
                    </button>
                  </div>
                </div>

                {/* Form Logic */}
                {mode === "login" ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-4">
                      <div className="group relative">
                        <div className="absolute left-4 top-3.5 text-white/40 group-focus-within:text-cyan-400 transition-colors">
                           <Mail className="w-5 h-5" />
                        </div>
                        <input
                          type="text"
                          value={identifier}
                          onChange={(e) => setIdentifier(e.target.value)}
                          className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-slate-950/80 transition-all"
                          placeholder="Email atau Username"
                          required
                        />
                      </div>
                      
                      <div className="group relative">
                        <div className="absolute left-4 top-3.5 text-white/40 group-focus-within:text-cyan-400 transition-colors">
                           <Lock className="w-5 h-5" />
                        </div>
                        <input
                          type={showLoginPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 pl-12 pr-12 text-sm text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-slate-950/80 transition-all"
                          placeholder="Password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          className="absolute right-4 top-3.5 text-white/30 hover:text-white transition-colors"
                        >
                          {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <a href="#" className="text-xs text-white/50 hover:text-cyan-400 transition-colors">Lupa passsword?</a>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                         <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Masuk Sekarang <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-3">
                         <input
                          type="text"
                          value={registerName}
                          onChange={(e) => setRegisterName(e.target.value)}
                          className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 transition-all"
                          placeholder="Nama Lengkap"
                        />
                        <input
                          type="email"
                          value={registerEmail}
                          onChange={(e) => setRegisterEmail(e.target.value)}
                          className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 transition-all"
                          placeholder="Email"
                          required
                        />
                         <div className="relative">
                           <input
                            type={showRegisterPassword ? "text" : "password"}
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 transition-all"
                            placeholder="Password (Min. 8 Karakter)"
                            required
                            minLength={8}
                          />
                           <button
                            type="button"
                            onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                            className="absolute right-4 top-3 text-white/30 hover:text-white transition-colors"
                          >
                            {showRegisterPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        <input
                          type="password"
                          value={registerPasswordConfirm}
                          onChange={(e) => setRegisterPasswordConfirm(e.target.value)}
                          className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 transition-all"
                          placeholder="Ulangi Password"
                          required
                        />
                    </div>

                    <button
                      type="submit"
                      disabled={registerLoading}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                       {registerLoading ? "Memproses..." : "Daftar Akun"} <UserPlus className="w-4 h-4" />
                    </button>
                  </form>
                )}

                <div className="relative my-6 text-center text-[10px] uppercase tracking-widest text-white/20">
                    <span className="absolute left-0 top-1/2 w-full h-px bg-white/5"></span>
                    <span className="relative bg-[#0b101b] px-2 rounded-full border border-white/5">Atau lanjut dengan</span>
                </div>

                <button
                  onClick={handleGoogleSignIn}
                  disabled={googleLoading}
                  className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 font-medium py-3 rounded-xl transition-all active:scale-[0.98]"
                >
                   <Chrome className="w-4 h-4 text-blue-600" />
                   <span>Google</span>
                </button>

             </div>

             <p className="mt-8 text-center text-xs text-white/30 font-light">
               &copy; {new Date().getFullYear()} Wisata Pangandaran. All rights reserved.
             </p>
          </div>

        </div>
      </div>
    </div>
  );
}
