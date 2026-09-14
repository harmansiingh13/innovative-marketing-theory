"use client";

import * as React from "react";
import {
  useRef,
  useEffect,
  cloneElement,
  isValidElement,
  type ReactNode,
  type ElementType,
  type ComponentPropsWithoutRef,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type FlyInTextProps<T extends ElementType = "span"> = {
  as?: T;
  children?: ReactNode;
  text?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  distance?: number;
  seed?: number;
  triggerOnScroll?: boolean;
  scrollStart?: string;
  className?: string;
  style?: React.CSSProperties;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

function normalizeNodes(nodes: ReactNode[]): ReactNode[] {
  const result: ReactNode[] = [];
  for (const node of nodes) {
    if (typeof node === "string" || typeof node === "number") {
      const prev = result[result.length - 1];
      if (typeof prev === "string") {
        result[result.length - 1] = prev + String(node);
      } else {
        result.push(String(node));
      }
    } else {
      result.push(node);
    }
  }
  return result;
}

function processNode(node: ReactNode, counter: { count: number }): ReactNode {
  if (typeof node === "string" || typeof node === "number") {
    const str = String(node);
    const words = str.split(" ");

    return words.map((word, wIdx) => {
      const chars = Array.from(word);

      return (
        <React.Fragment key={`w-${wIdx}`}>
          <span
            style={{
              display: "inline-block",
              whiteSpace: "nowrap",
              verticalAlign: "baseline",
            }}
          >
            {chars.map((char) => {
              const charIdx = counter.count++;
              return (
                <span
                  key={`c-${charIdx}`}
                  data-fly-char="true"
                  style={{
                    display: "inline-block",
                    verticalAlign: "baseline",
                    willChange: "transform, opacity",
                    opacity: 0,
                  }}
                >
                  {char}
                </span>
              );
            })}
          </span>
          {wIdx < words.length - 1 && " "}
        </React.Fragment>
      );
    });
  }

  if (Array.isArray(node)) {
    const normalized = normalizeNodes(node);
    return normalized.map((child, idx) => (
      <React.Fragment key={idx}>{processNode(child, counter)}</React.Fragment>
    ));
  }

  if (isValidElement(node)) {
    if (node.type === "br") {
      return node;
    }

    const { children, ...restProps } = node.props as {
      children?: ReactNode;
      [key: string]: unknown;
    };

    return cloneElement(node, restProps, processNode(children, counter));
  }

  return node;
}

export const FlyInText = <T extends ElementType = "span">({
  as,
  children,
  text,
  delay = 0,
  duration = 0.65,
  stagger,
  distance = 28,
  seed = 0,
  triggerOnScroll = true,
  scrollStart = "top 88%",
  className,
  style,
  ...restProps
}: FlyInTextProps<T>) => {
  const Component = as || "span";
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const chars = containerRef.current?.querySelectorAll<HTMLElement>("[data-fly-char]");
      if (!chars || chars.length === 0) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set(chars, {
          opacity: 1,
          clearProps: "all",
        });
        return;
      }

      const effectiveStagger = stagger ?? Math.max(0.008, Math.min(0.02, 0.45 / chars.length));

      gsap.fromTo(
        chars,
        {
          x: (idx) => {
            const angle = ((idx * 137.508 + seed) % 360) * (Math.PI / 180);
            return Math.round(Math.cos(angle) * distance * 10) / 10;
          },
          y: (idx) => {
            const angle = ((idx * 137.508 + seed) % 360) * (Math.PI / 180);
            return Math.round(Math.sin(angle) * distance * 10) / 10;
          },
          rotation: (idx) => (idx % 2 === 0 ? 1 : -1) * (3 + ((idx * 3) % 6)),
          scale: 0.9,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration,
          ease: "power3.out",
          stagger: effectiveStagger,
          delay,
          clearProps: "transform,opacity",
          scrollTrigger:
            triggerOnScroll && containerRef.current
              ? {
                  trigger: containerRef.current,
                  start: scrollStart,
                  once: true,
                }
              : undefined,
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [delay, duration, stagger, distance, seed, triggerOnScroll, scrollStart]);

  const contentToRender = text !== undefined ? text : children;
  const counter = { count: 0 };
  const renderedContent = processNode(contentToRender, counter);

  return (
    <Component
      ref={containerRef as unknown as React.Ref<never>}
      className={className}
      style={style}
      {...restProps}
    >
      {renderedContent}
    </Component>
  );
};
