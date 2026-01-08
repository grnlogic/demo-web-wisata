"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

interface SafeImageProps {
  src: string | null | undefined;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  style?: React.CSSProperties;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

export default function SafeImage({
  src,
  alt,
  fallbackSrc = "/marlin pangandaran.jpg",
  className = "",
  fill = false,
  width,
  height,
  priority = false,
  quality = 75,
  sizes,
  style,
  objectFit = "cover",
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(false);
    } else {
      setHasError(true);
    }
  };

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
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className={className}
        style={{ objectFit, ...style }}
        onError={handleError}
        priority={priority}
        quality={quality}
        sizes={sizes}
      />
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      style={{ objectFit, ...style }}
      onError={handleError}
      priority={priority}
      quality={quality}
      sizes={sizes}
    />
  );
}
