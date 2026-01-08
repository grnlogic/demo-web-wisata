"use client";

import { useState, useEffect, CSSProperties } from "react";
import { ImageOff } from "lucide-react";

interface SafeBackgroundImageProps {
  src: string | null | undefined;
  fallbackSrc?: string;
  gradient?: string;
  className?: string;
  children?: React.ReactNode;
  style?: CSSProperties;
}

export default function SafeBackgroundImage({
  src,
  fallbackSrc = "/marlin pangandaran.jpg",
  gradient = "linear-gradient(180deg, rgba(15,23,42,0.2) 0%, rgba(15,23,42,0.7) 70%)",
  className = "",
  children,
  style,
}: SafeBackgroundImageProps) {
  const [bgSrc, setBgSrc] = useState<string>(src || fallbackSrc);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!src) {
      setBgSrc(fallbackSrc);
      setIsLoading(false);
      return;
    }

    const img = new window.Image();
    img.src = src;

    img.onload = () => {
      setBgSrc(src);
      setIsLoading(false);
      setHasError(false);
    };

    img.onerror = () => {
      // Try fallback
      const fallbackImg = new window.Image();
      fallbackImg.src = fallbackSrc;

      fallbackImg.onload = () => {
        setBgSrc(fallbackSrc);
        setIsLoading(false);
        setHasError(false);
      };

      fallbackImg.onerror = () => {
        setHasError(true);
        setIsLoading(false);
      };
    };
  }, [src, fallbackSrc]);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 ${className}`}
        style={style}
      >
        <ImageOff className="w-12 h-12 text-slate-600 mb-2" />
        <p className="text-xs text-slate-500 text-center px-4">
          Gambar tidak tersedia
        </p>
        {children}
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        backgroundImage: `${gradient}, url(${bgSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
