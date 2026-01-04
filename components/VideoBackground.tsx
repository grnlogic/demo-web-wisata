"use client";

import { useEffect, useRef } from "react";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Perlambat playback untuk gerakan yang lebih smooth dan ambient
    video.playbackRate = 0.75;
    video.style.opacity = "0";

    // Buat loop terasa halus: fade in/out 2 detik di awal/akhir durasi
    const fadeDuration = 2; // detik

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
    <div className="absolute inset-0 p-[0.5%] overflow-hidden">
      <div className="relative w-full h-full rounded-3xl overflow-hidden">
        {/* Video Background - Motion Texture */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-110"
          style={{
            filter: "brightness(0.65) contrast(1.15) saturate(1.1)",
            transform: "scale(1.1)",
          }}
        >
          <source src="/video looping banner.mp4" type="video/mp4" />
        </video>

        {/* Ambient Overlay - Multi Layer untuk Motion Texture Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/25 to-slate-900/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

        {/* Subtle vignette dan texture overlay */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at center, transparent 20%, rgba(0, 0, 0, 0.6) 100%)",
          }}
        ></div>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          }}
        ></div>
      </div>
    </div>
  );
}
