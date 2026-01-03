import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  RefObject,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import gsap from "gsap";

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: "linear" | "elastic";
  showNavigation?: boolean;
  className?: string;
  scaleStep?: number;
  fadeStep?: number;
  maxVisible?: number;
  children: ReactNode;
}

export interface CardSwapRef {
  next: () => void;
  prev: () => void;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`absolute top-1/2 left-1/2 rounded-xl border border-white bg-black [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${
        customClass ?? ""
      } ${rest.className ?? ""}`.trim()}
    />
  )
);
Card.displayName = "Card";

type CardRef = RefObject<HTMLDivElement | null>;
interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
  scale: number;
  opacity: number;
}

const makeSlot = (
  i: number,
  distX: number,
  distY: number,
  total: number,
  scaleStep: number,
  fadeStep: number,
  maxVisible: number
): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.25,
  zIndex: total - i,
  scale: Math.max(0.7, 1 - i * scaleStep),
  opacity: i < maxVisible ? Math.max(0.55, 1 - i * fadeStep) : 0,
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    scale: slot.scale,
    opacity: slot.opacity,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

const CardSwap = forwardRef<CardSwapRef, CardSwapProps>(
  (
    {
      width = 500,
      height = 400,
      cardDistance = 60,
      verticalDistance = 70,
      delay = 5000,
      pauseOnHover = false,
      onCardClick,
      skewAmount = 6,
      easing = "elastic",
      showNavigation = false,
      className,
      scaleStep = 0.05,
      fadeStep = 0.08,
      maxVisible = 6,
      children,
    },
    ref
  ) => {
    const config =
      easing === "elastic"
        ? {
            ease: "elastic.out(0.6,0.9)",
            durDrop: 2,
            durMove: 2,
            durReturn: 2,
            promoteOverlap: 0.9,
            returnDelay: 0.05,
          }
        : {
            ease: "power1.inOut",
            durDrop: 0.8,
            durMove: 0.8,
            durReturn: 0.8,
            promoteOverlap: 0.45,
            returnDelay: 0.2,
          };

    const childArr = useMemo(
      () => Children.toArray(children) as ReactElement<CardProps>[],
      [children]
    );
    const refs = useMemo<CardRef[]>(
      () => childArr.map(() => React.createRef<HTMLDivElement>()),
      [childArr.length]
    );

    const order = useRef<number[]>(
      Array.from({ length: childArr.length }, (_, i) => i)
    );

    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const autoTimerRef = useRef<number | null>(null);
    const container = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const clearAutoTimer = useCallback(() => {
      if (autoTimerRef.current) {
        window.clearTimeout(autoTimerRef.current);
        autoTimerRef.current = null;
      }
    }, []);

    const swap = useCallback(() => {
      if (order.current.length < 2 || isAnimating) return;
      setIsAnimating(true);

      clearAutoTimer();
      tlRef.current?.kill();

      const [front, ...rest] = order.current;
      const elFront = refs[front].current!;
      const tl = gsap.timeline({
        onComplete: () => {
          order.current = [...rest, front];
          setIsAnimating(false);
          autoTimerRef.current = window.setTimeout(swap, delay);
        },
      });
      tlRef.current = tl;

      tl.to(elFront, {
        y: "+=500",
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current!;
        const slotIndex = i >= maxVisible - 1 ? maxVisible - 1 : i;
        const slot = makeSlot(
          slotIndex,
          cardDistance,
          verticalDistance,
          refs.length,
          scaleStep,
          fadeStep,
          maxVisible
        );
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            scale: slot.scale,
            opacity: slot.opacity,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${Math.min(i, maxVisible - 1) * 0.14}`
        );
      });

      const backSlot = makeSlot(
        Math.min(refs.length - 1, maxVisible - 1),
        cardDistance,
        verticalDistance,
        refs.length,
        scaleStep,
        fadeStep,
        maxVisible
      );
      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        "return"
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          scale: backSlot.scale,
          opacity: backSlot.opacity,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return"
      );
    }, [cardDistance, verticalDistance, refs, isAnimating, config, clearAutoTimer, fadeStep, scaleStep, delay]);

    const swapReverse = useCallback(() => {
      if (order.current.length < 2 || isAnimating) return;
      setIsAnimating(true);

      clearAutoTimer();
      tlRef.current?.kill();

      const back = order.current[order.current.length - 1];
      const rest = order.current.slice(0, -1);
      const elBack = refs[back].current!;
      const tl = gsap.timeline({
        onComplete: () => {
          order.current = [back, ...rest];
          setIsAnimating(false);
          autoTimerRef.current = window.setTimeout(swap, delay);
        },
      });
      tlRef.current = tl;

      // Move back card up
      tl.to(elBack, {
        y: "+=500",
        duration: config.durDrop,
        ease: config.ease,
      });

      // Promote others backward
      tl.addLabel("demote", `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current!;
        const slotIndex = i + 1 >= maxVisible ? maxVisible - 1 : i + 1;
        const slot = makeSlot(
          slotIndex,
          cardDistance,
          verticalDistance,
          refs.length,
          scaleStep,
          fadeStep,
          maxVisible
        );
        tl.set(el, { zIndex: slot.zIndex }, "demote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            scale: slot.scale,
            opacity: slot.opacity,
            duration: config.durMove,
            ease: config.ease,
          },
          `demote+=${Math.min(i, maxVisible - 1) * 0.14}`
        );
      });

      // Return back card to front
      const frontSlot = makeSlot(
        0,
        cardDistance,
        verticalDistance,
        refs.length,
        scaleStep,
        fadeStep,
        maxVisible
      );
      tl.addLabel("return", `demote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elBack, { zIndex: frontSlot.zIndex });
        },
        undefined,
        "return"
      );
      tl.to(
        elBack,
        {
          x: frontSlot.x,
          y: frontSlot.y,
          z: frontSlot.z,
          scale: frontSlot.scale,
          opacity: frontSlot.opacity,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return"
      );

    }, [cardDistance, verticalDistance, refs, isAnimating, config, clearAutoTimer, fadeStep, scaleStep, delay, swap]);

    useImperativeHandle(ref, () => ({
      next: swap,
      prev: swapReverse,
    }));

    useLayoutEffect(() => {
      const total = refs.length;
      order.current = Array.from({ length: total }, (_, i) => i);
      refs.forEach((r, i) =>
        placeNow(
          r.current!,
          makeSlot(
            Math.min(i, maxVisible - 1),
            cardDistance,
            verticalDistance,
            total,
            scaleStep,
            fadeStep,
            maxVisible
          ),
          skewAmount
        )
      );

      autoTimerRef.current = window.setTimeout(swap, delay);

      if (pauseOnHover) {
        const node = container.current!;
        const pause = () => {
          tlRef.current?.pause();
          clearAutoTimer();
        };
        const resume = () => {
          tlRef.current?.play();
          autoTimerRef.current = window.setTimeout(swap, delay);
        };
        node.addEventListener("mouseenter", pause);
        node.addEventListener("mouseleave", resume);
        return () => {
          node.removeEventListener("mouseenter", pause);
          node.removeEventListener("mouseleave", resume);
          clearAutoTimer();
          tlRef.current?.kill();
        };
      }

      return () => {
        clearAutoTimer();
        tlRef.current?.kill();
      };
    }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, swap, clearAutoTimer, scaleStep, fadeStep, refs.length]);

    const rendered = childArr.map((child, i) =>
      isValidElement<CardProps>(child)
        ? cloneElement(child, {
            key: i,
            ref: refs[i],
            style: { width, height, ...(child.props.style ?? {}) },
            onClick: (e) => {
              child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);
              onCardClick?.(i);
            },
          } as CardProps & React.RefAttributes<HTMLDivElement>)
        : child
    );

    return (
      <div
        ref={container}
        className={`absolute bottom-0 right-0 transform translate-x-[5%] translate-y-[20%] origin-bottom-right perspective-[900px] overflow-visible max-[768px]:translate-x-[25%] max-[768px]:translate-y-[25%] max-[768px]:scale-[0.75] max-[480px]:translate-x-[25%] max-[480px]:translate-y-[25%] max-[480px]:scale-[0.55] ${
          className ?? ""
        }`}
        style={{ width, height }}
      >
        {rendered}

        {showNavigation && (
          <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-6">
            <div className="pointer-events-auto flex gap-3 rounded-full bg-black/40 px-3 py-2 backdrop-blur-md shadow-lg border border-white/15">
              <button
                type="button"
                aria-label="Previous card"
                className="h-10 w-10 rounded-full border border-white/20 bg-white/5 text-white transition hover:border-cyan-400 hover:text-cyan-200"
                onClick={swapReverse}
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next card"
                className="h-10 w-10 rounded-full border border-white/20 bg-white/5 text-white transition hover:border-cyan-400 hover:text-cyan-200"
                onClick={swap}
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

CardSwap.displayName = "CardSwap";

export default CardSwap;
