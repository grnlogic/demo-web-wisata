"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  logo: string;
  logoAlt?: string;
  logoText?: string;
  logoSubtext?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  isAuthenticated?: boolean;
  userName?: string;
  onLogout?: () => void;
  onLogin?: () => void;
}

const NAV_BAR_HEIGHT = 64;

const CardNav: React.FC<CardNavProps> = ({
  logo,
  logoAlt = "Logo",
  logoText,
  logoSubtext,
  items,
  className = "",
  ease = "power3.out",
  baseColor = "#fff",
  menuColor,
  buttonBgColor,
  buttonTextColor,
  isAuthenticated = false,
  userName,
  onLogout,
  onLogin,
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement;
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = "visible";
        contentEl.style.pointerEvents = "auto";
        contentEl.style.position = "static";
        contentEl.style.height = "auto";

        contentEl.offsetHeight;

        const topBar = NAV_BAR_HEIGHT;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: NAV_BAR_HEIGHT, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease,
    });

    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 },
      "-=0.1"
    );

    return tl;
  };

  useLayoutEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      window.removeEventListener("scroll", handleScroll);
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div
      data-cardnav="true"
      className={`card-nav-container fixed left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-[99] transition-all duration-300 ${className} ${
        isScrolled ? "top-3" : "top-4 md:top-6"
      }`}
    >
      <nav
        ref={navRef}
        className={`card-nav ${
          isExpanded ? "open" : ""
        } block h-[64px] p-0 rounded-2xl relative overflow-hidden will-change-[height] transition-all duration-300 border ${
          isScrolled
            ? "bg-slate-900/90 border-white/10 backdrop-blur-xl shadow-lg"
            : "bg-slate-900/80 border-white/10 backdrop-blur-xl shadow-2xl"
        }`}
        style={{
          background: isScrolled
            ? "linear-gradient(135deg, rgba(11, 17, 32, 0.95), rgba(12, 18, 34, 0.92))"
            : "linear-gradient(135deg, rgba(11, 17, 32, 0.92), rgba(12, 20, 40, 0.9))",
        }}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-[64px] flex items-center justify-between px-3 md:px-4 z-[2]">
          <div
            className={`hamburger-menu ${
              isHamburgerOpen ? "open" : ""
            } group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 md:order-none px-3 rounded-lg hover:bg-white/5 transition-colors`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? "Close menu" : "Open menu"}
            tabIndex={0}
          >
            <div
              className={`hamburger-line w-[28px] h-[2.5px] rounded-full bg-slate-200 transition-all duration-300 ease-out [transform-origin:50%_50%] ${
                isHamburgerOpen ? "translate-y-[4px] rotate-45 bg-cyan-400" : ""
              }`}
            />
            <div
              className={`hamburger-line w-[28px] h-[2.5px] rounded-full bg-slate-200 transition-all duration-300 ease-out [transform-origin:50%_50%] ${
                isHamburgerOpen
                  ? "-translate-y-[4px] -rotate-45 bg-cyan-400"
                  : ""
              }`}
            />
          </div>

          <div className="logo-container flex items-center gap-3 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-none group cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-slate-800/90 border border-white/10 flex items-center justify-center overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-105">
              <img
                src={logo}
                alt={logoAlt}
                className="logo w-8 h-8 object-contain"
              />
            </div>
            {(logoText || logoSubtext) && (
              <div className="flex flex-col">
                {logoText && (
                  <span className="font-bold text-base leading-tight bg-gradient-to-r from-cyan-200 via-sky-200 to-blue-200 bg-clip-text text-transparent">
                    {logoText}
                  </span>
                )}
                {logoSubtext && (
                  <span className="text-[11px] leading-tight text-slate-300 font-medium">
                    {logoSubtext}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2 h-full order-3">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={onLogout}
                className="border border-white/10 rounded-lg px-3 py-2 text-sm font-semibold cursor-pointer transition-all duration-300 bg-white/5 hover:bg-white/10 text-white shadow-md"
              >
                Logout
              </button>
            ) : (
              <button
                type="button"
                onClick={onLogin}
                className="border border-white/10 rounded-lg px-3 py-2 text-sm font-semibold cursor-pointer transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-600 text-white shadow-md"
              >
                Login
              </button>
            )}
          </div>

          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-3 h-full">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  {userName?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-semibold text-slate-100">
                  Hi, {userName}
                </span>
              </div>
              <button
                type="button"
                onClick={onLogout}
                className="border border-white/10 rounded-lg px-4 py-2 font-semibold cursor-pointer transition-all duration-300 bg-white/5 hover:bg-white/10 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onLogin}
              className="card-nav-cta-button hidden md:inline-flex border border-white/10 rounded-lg px-5 py-2.5 items-center h-auto font-semibold cursor-pointer transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-600 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Login
            </button>
          )}
        </div>

        <div
          className={`card-nav-content absolute left-0 right-0 top-[64px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] ${
            isExpanded
              ? "visible pointer-events-auto"
              : "invisible pointer-events-none"
          } md:flex-row md:items-end md:gap-[12px]`}
          aria-hidden={!isExpanded}
        >
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card select-none relative flex flex-col gap-2 p-[14px_18px] rounded-xl min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-full md:min-h-0 md:flex-[1_1_0%] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/10"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label font-bold tracking-[-0.5px] text-[18px] md:text-[22px]">
                {item.label}
              </div>
              <div className="nav-card-links mt-auto flex flex-col gap-[4px]">
                {item.links?.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link inline-flex items-center gap-[6px] no-underline cursor-pointer transition-all duration-200 hover:translate-x-1 text-[15px] md:text-[16px] font-medium text-white/90"
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
                  >
                    <GoArrowUpRight
                      className="nav-card-link-icon shrink-0 w-4 h-4"
                      aria-hidden="true"
                    />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
