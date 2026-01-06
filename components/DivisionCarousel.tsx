"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type DivisionCard = {
  title: string;
  role: string;
  description: string;
  image: string;
  focus: string;
  imagePosition?: string;
};

type Props = {
  divisions: DivisionCard[];
};

export default function DivisionCarousel({ divisions }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  const scheduleResume = useCallback(() => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setIsInteracting(false), 4000);
  }, []);

  const handleUserInteract = useCallback(() => {
    setIsInteracting(true);
    scheduleResume();
  }, [scheduleResume]);

  const renderItems = useMemo(() => {
    const base = [
      { kind: "spacer" as const, key: "spacer-start" },
      ...divisions.map((division) => ({
        kind: "card" as const,
        key: `card-${division.title}`,
        data: division,
      })),
      { kind: "spacer" as const, key: "spacer-end" },
    ];
    // Duplicate to allow seamless looping without jump
    return [...base, ...base];
  }, [divisions]);

  useEffect(() => {
    const container = sliderRef.current;
    if (!container) return;

    let raf: number;
    const speed = 0.65; // px per frame ~39px/s for a gentle carousel feel

    const tick = () => {
      const loopWidth = container.scrollWidth / 2; // one full set

      if (!isInteracting && loopWidth > 0) {
        const next = container.scrollLeft + speed;
        container.scrollLeft = next >= loopWidth ? next - loopWidth : next;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInteracting]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  return (
    <div
      ref={sliderRef}
      className="flex gap-6 overflow-x-auto pb-4 pt-2 px-4 sm:px-6 no-scrollbar snap-x snap-proximity"
      onPointerDown={handleUserInteract}
      onPointerUp={handleUserInteract}
      onTouchStart={handleUserInteract}
      onWheel={handleUserInteract}
    >
      {renderItems.map((item, idx) => {
        if (item.kind === "spacer") {
          return (
            <article
              aria-hidden
              key={`${item.key}-${idx}`}
              className="w-[5%] min-w-[36px] shrink-0 snap-start rounded-3xl border border-dashed border-slate-200/60 bg-white/60 shadow-inner"
            />
          );
        }

        const division = item.data;

        return (
          <article
            key={`${item.key}-${idx}`}
            className="relative w-[280px] shrink-0 snap-start rounded-3xl border border-slate-200 bg-white shadow-xl transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl sm:w-[320px] md:w-[360px]"
          >
            <div
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-500 via-ocean-400 to-primary-500"
              aria-hidden
            />
            <div className="relative h-44 overflow-hidden rounded-t-3xl">
              <Image
                src={division.image}
                alt={division.role}
                fill
                sizes="(max-width: 768px) 320px, 360px"
                className={`object-cover transition duration-500 group-hover:scale-[1.05] ${
                  division.imagePosition ?? ""
                }`}
                priority
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"
                aria-hidden
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow">
                {division.focus}
              </span>
            </div>
            <div className="space-y-3 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-700">
                    {division.role}
                  </p>
                  <h3 className="text-xl font-bold text-slate-900">
                    {division.title}
                  </h3>
                </div>
                <div className="rounded-full bg-ocean-50 px-3 py-1 text-xs font-semibold text-ocean-700">
                  Aktif
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">
                {division.description}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
