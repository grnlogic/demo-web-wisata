"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

interface ImageItem {
  id: string;
  url: string;
  caption: string | null;
  isPrimary: boolean;
}

interface ImageGalleryProps {
  images: ImageItem[];
  destinationName: string;
}

export default function ImageGallery({
  images,
  destinationName,
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  useEffect(() => {
    if (!isAutoPlay || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay, images.length]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
        <ImageIcon className="w-24 h-24 text-white/50" />
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Main Carousel */}
      <div className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden bg-slate-800">
        {/* Images */}
        <div className="relative w-full h-full">
          {images.map((img, idx) => (
            <div
              key={img.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                idx === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={img.url}
                alt={img.caption || destinationName}
                className="w-full h-full object-cover"
              />
              {img.caption && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm text-white px-4 py-3 rounded-lg">
                  <span className="text-sm">{img.caption}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Counter & Auto-play Toggle */}
        <div className="absolute top-4 right-4 flex items-center gap-3">
          <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <ImageIcon className="w-4 h-4" />
            <span className="text-sm">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
          {images.length > 1 && (
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                isAutoPlay
                  ? "bg-blue-500 text-white"
                  : "bg-black/50 text-white hover:bg-black/70"
              }`}
            >
              {isAutoPlay ? "Auto ⏸" : "Auto ▶"}
            </button>
          )}
        </div>
      </div>

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToImage(idx)}
              className={`transition-all rounded-full ${
                idx === currentIndex
                  ? "w-8 h-2 bg-blue-500"
                  : "w-2 h-2 bg-slate-600 hover:bg-slate-500"
              }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="mt-4 overflow-x-auto pb-2">
          <div className="flex gap-3">
            {images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => goToImage(idx)}
                className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden transition-all ${
                  idx === currentIndex
                    ? "ring-4 ring-blue-500 scale-105"
                    : "opacity-60 hover:opacity-100 hover:scale-105"
                }`}
              >
                <img
                  src={img.url}
                  alt={img.caption || destinationName}
                  className="w-full h-full object-cover"
                />
                {img.isPrimary && (
                  <div className="absolute top-1 right-1 bg-blue-500 text-white text-xs px-2 py-0.5 rounded">
                    Utama
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
