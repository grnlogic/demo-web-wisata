"use client";

import { useEffect, useRef } from "react";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Perlambat playback untuk gerakan yang lebih smooth dan ambient
    video.playbackRate = 0.7;
    video.style.opacity = "0";

    // Buat loop terasa halus: fade in/out 2 detik di awal/akhir durasi
    const fadeDuration = 2.5; // detik

    const updateOpacity = () => {
      if (!video.duration || Number.isNaN(video.duration)) return;

      const timeToEnd = video.duration - video.currentTime;
      let opacity = 1;

      if (video.currentTime < fadeDuration) {
        opacity = Math.min(video.currentTime / fadeDuration, 1);
      } else if (timeToEnd < fadeDuration) {
        opacity = Math.max(timeToEnd / fadeDuration, 0);
      }

      video.style.opacity = opacity.toString();
    };

    let rafId = requestAnimationFrame(function tick() {
      updateOpacity();
      rafId = requestAnimationFrame(tick);
    });

    // Ensure seamless loop - handle loop event
    const handleTimeUpdate = () => {
      // Reset sedikit sebelum video benar-benar selesai untuk seamless loop
      if (video.duration - video.currentTime < 0.1) {
        video.currentTime = 0;
        video.style.opacity = "0"; // mulai dari fade-in lagi
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Video Container with elegant border radius */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Video Background - Motion Texture */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: "brightness(0.85) contrast(1.1) saturate(1.15)",
            transform: "scale(1.05)",
          }}
        >
          <source src="/video looping banner.mp4" type="video/mp4" />
        </video>

        {/* Premium Blue Gradient Overlay - Light Theme */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(37, 99, 235, 0.35) 0%, rgba(6, 182, 212, 0.25) 50%, rgba(14, 165, 233, 0.3) 100%)",
          }}
        />

        {/* Bottom fade for content transition */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, transparent 60%, rgba(255,255,255,0.1) 80%, rgba(255,255,255,0.9) 100%)",
          }}
        />

        {/* Top subtle gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(30, 64, 175, 0.3) 0%, transparent 40%)",
          }}
        />

        {/* Soft vignette effect */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(30, 64, 175, 0.15) 100%)",
          }}
        />

        {/* Subtle animated grain effect for premium feel */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Animated light flares */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute -top-1/2 -left-1/4 w-full h-full opacity-20 animate-pulse"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 50%)",
              animationDuration: "4s",
            }}
          />
          <div 
            className="absolute -bottom-1/2 -right-1/4 w-3/4 h-3/4 opacity-15 animate-pulse"
            style={{
              background: "radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 50%)",
              animationDuration: "5s",
              animationDelay: "1s",
            }}
          />
        </div>
      </div>
    </div>
  );
}
