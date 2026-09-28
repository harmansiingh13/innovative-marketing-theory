"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { CarouselItem, ReusableCarouselProps } from "./types";
import "./Carousel.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const formatNumber = (num: number): string => (num < 10 ? `0${num}` : `${num}`);

export const ReusableCarousel: React.FC<ReusableCarouselProps> = ({
  items,
  autoplay = true,
  autoplayInterval = 5000,
  showArrows = true,
  showIndicators = true,
  showCounter = true,
  pauseOnHover = true,
  animateOnScroll = true,
  className = "",
  onSlideChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const isAnimatingRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const totalItems = items.length;
  const currentItem = items[currentIndex >= 0 && currentIndex < totalItems ? currentIndex : 0];

  // GSAP slide transition engine
  const transitionToSlide = useCallback(
    (newIndex: number, direction: "next" | "prev") => {
      if (isAnimatingRef.current || newIndex === currentIndex || totalItems <= 1) return;

      isAnimatingRef.current = true;
      const xOffset = direction === "next" ? 25 : -25;

      const tl = gsap.timeline({
        onComplete: () => {
          setCurrentIndex(newIndex);
          if (onSlideChange) {
            onSlideChange(newIndex, items[newIndex]);
          }

          // Ensure container visibility reset for new item entering
          if (contentRef.current) {
            gsap.set(contentRef.current, { opacity: 1, x: 0 });
          }

          const enterTl = gsap.timeline({
            onComplete: () => {
              isAnimatingRef.current = false;
            },
          });

          if (imageRef.current) {
            enterTl.fromTo(
              imageRef.current,
              { opacity: 0.7, scale: 1.05 },
              { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" },
              0,
            );
          }

          if (eyebrowRef.current) {
            enterTl.fromTo(
              eyebrowRef.current,
              { opacity: 0, y: -10 },
              { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
              0.05,
            );
          }

          if (titleRef.current) {
            enterTl.fromTo(
              titleRef.current,
              { opacity: 0, y: -20 },
              { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
              0.1,
            );
          }

          if (descriptionRef.current) {
            enterTl.fromTo(
              descriptionRef.current,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
              0.2,
            );
          }

          if (tagsRef.current && tagsRef.current.children.length > 0) {
            enterTl.fromTo(
              Array.from(tagsRef.current.children),
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: "power3.out" },
              0.25,
            );
          }

          if (ctaRef.current) {
            enterTl.fromTo(
              ctaRef.current,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" },
              0.3,
            );
          }
        },
      });

      // Exit current slide
      if (imageRef.current) {
        tl.to(
          imageRef.current,
          { opacity: 0.3, scale: 0.98, duration: 0.25, ease: "power2.in" },
          0,
        );
      }

      if (contentRef.current) {
        tl.to(
          contentRef.current,
          { opacity: 0, x: -xOffset, duration: 0.25, ease: "power2.in" },
          0,
        );
      }
    },
    [currentIndex, totalItems, items, onSlideChange],
  );

  const handleNext = useCallback(() => {
    if (totalItems <= 1) return;
    const nextIndex = (currentIndex + 1) % totalItems;
    transitionToSlide(nextIndex, "next");
  }, [currentIndex, totalItems, transitionToSlide]);

  const handlePrev = useCallback(() => {
    if (totalItems <= 1) return;
    const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
    transitionToSlide(prevIndex, "prev");
  }, [currentIndex, totalItems, transitionToSlide]);

  const handleSelectSlide = (targetIndex: number) => {
    if (targetIndex === currentIndex || isAnimatingRef.current) return;
    const direction = targetIndex > currentIndex ? "next" : "prev";
    transitionToSlide(targetIndex, direction);
  };

  // Autoplay Logic
  useEffect(() => {
    if (!autoplay || totalItems <= 1 || (pauseOnHover && isHovered)) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      handleNext();
    }, autoplayInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoplay, autoplayInterval, totalItems, isHovered, pauseOnHover, handleNext]);

  // Entrance ScrollTrigger Animation
  useEffect(() => {
    if (!animateOnScroll || !containerRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 60, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [animateOnScroll]);

  // Micro-interaction on Arrow Buttons
  const handleArrowMouseEnter = (btn: HTMLButtonElement | null) => {
    if (!btn) return;
    gsap.to(btn, { scale: 1.08, duration: 0.2, ease: "power2.out" });
  };

  const handleArrowMouseLeave = (btn: HTMLButtonElement | null) => {
    if (!btn) return;
    gsap.to(btn, { scale: 1, duration: 0.2, ease: "power2.out" });
  };

  const handleArrowMouseDown = (btn: HTMLButtonElement | null) => {
    if (!btn) return;
    gsap.to(btn, { scale: 0.92, duration: 0.1, ease: "power2.out" });
  };

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
  };

  // Keyboard navigation when container is focused
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={`carouselContainer ${className}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Editorial Carousel"
    >
      {/* Navigation Arrows */}
      {showArrows && totalItems > 1 && (
        <>
          <button
            ref={prevBtnRef}
            type="button"
            className="navArrow prevArrow"
            onClick={handlePrev}
            onMouseEnter={() => handleArrowMouseEnter(prevBtnRef.current)}
            onMouseLeave={() => handleArrowMouseLeave(prevBtnRef.current)}
            onMouseDown={() => handleArrowMouseDown(prevBtnRef.current)}
            aria-label="Previous slide"
          >
            <ChevronLeft className="arrowIcon" />
          </button>

          <button
            ref={nextBtnRef}
            type="button"
            className="navArrow nextArrow"
            onClick={handleNext}
            onMouseEnter={() => handleArrowMouseEnter(nextBtnRef.current)}
            onMouseLeave={() => handleArrowMouseLeave(nextBtnRef.current)}
            onMouseDown={() => handleArrowMouseDown(nextBtnRef.current)}
            aria-label="Next slide"
          >
            <ChevronRight className="arrowIcon" />
          </button>
        </>
      )}

      {/* Main 2-Column Layout */}
      <div className="mainLayout">
        {/* Left: Image Container */}
        <div className="imageWrapper">
          <img
            ref={imageRef}
            src={currentItem.image}
            alt={currentItem.imageAlt || currentItem.title}
            className="carouselImage"
          />
        </div>

        {/* Right: Content Container */}
        <div ref={contentRef} className="contentWrapper">
          {currentItem.eyebrow && (
            <div ref={eyebrowRef} className="eyebrow">
              {currentItem.eyebrow}
            </div>
          )}

          <h3 ref={titleRef} className="title">
            {currentItem.title}
          </h3>

          {currentItem.description && (
            <p ref={descriptionRef} className="description">
              {currentItem.description}
            </p>
          )}

          {currentItem.tags && currentItem.tags.length > 0 && (
            <div ref={tagsRef} className="tagsRow">
              {currentItem.tags.map((tag, idx) => (
                <span key={`${tag}-${idx}`} className="tagChip">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {currentItem.link && (
            <a ref={ctaRef} href={currentItem.link} className="ctaButton">
              <span>{currentItem.linkText || "VIEW PROJECT"}</span>
              <ArrowUpRight style={{ width: 16, height: 16 }} />
            </a>
          )}
        </div>
      </div>

      {/* Bottom Controls: Indicators & Counter */}
      {(showIndicators || showCounter) && (
        <div className="bottomControls">
          {showIndicators && totalItems > 1 ? (
            <div className="indicatorsList" role="tablist">
              {items.map((item, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={item.id || idx}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`indicatorDot ${isActive ? "activeIndicatorDot" : ""}`}
                    onClick={() => handleSelectSlide(idx)}
                  />
                );
              })}
            </div>
          ) : (
            <div />
          )}

          {showCounter && (
            <div className="counterBox">
              <span className="currentCounterNum">{formatNumber(currentIndex + 1)}</span>
              <span> / </span>
              <span>{formatNumber(totalItems)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReusableCarousel;
