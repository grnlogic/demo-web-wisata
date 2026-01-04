"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HomeAnimations() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from("[data-hero-badge]", {
        y: -16,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
      });

      gsap.from("[data-hero-title]", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.1,
      });

      gsap.from("[data-hero-cta]", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.25,
      });

      gsap.utils
        .toArray<HTMLElement>("[data-hero-panel]")
        .forEach((panel, idx) => {
          gsap.from(panel, {
            opacity: 0,
            y: 32,
            duration: 0.9,
            ease: "power3.out",
            delay: 0.1 * idx,
          });
        });

      gsap.utils.toArray<HTMLElement>("[data-fade-up]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 0 },
          {
            y: -60,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
