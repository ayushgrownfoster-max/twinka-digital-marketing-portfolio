"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface CapabilitySlide {
  id: string;
  number: string;
  title: string;
  tag: string;
  description: string;
  stat: string;
  statLabel: string;
  linkHref: string;
}

const CAPABILITIES: CapabilitySlide[] = [
  {
    id: "google-ads",
    number: "01",
    title: "Google Ads",
    tag: "SEARCH, SHOPPING & PMAX",
    description:
      "Exact-match Search, Google Shopping, and Performance Max campaigns capturing buyers actively searching to purchase.",
    stat: "6.8%",
    statLabel: "Peak Search CTR",
    linkHref: "/#services",
  },
  {
    id: "meta-ads",
    number: "02",
    title: "Meta Ads",
    tag: "FACEBOOK & INSTAGRAM",
    description:
      "Advantage+ Shopping, Catalog, Story, and Click-to-WhatsApp campaigns engineered for low CPA and high ROAS.",
    stat: "5.2x",
    statLabel: "Peak Blended ROAS",
    linkHref: "/#services",
  },
  {
    id: "linkedin-ads",
    number: "03",
    title: "LinkedIn Ads",
    tag: "B2B ABM & LEAD GEN",
    description:
      "Account-based Sponsored Content and Lead Gen Forms targeting senior decision-makers by role, industry, and company size.",
    stat: "42+",
    statLabel: "Enterprise Demos / Mo",
    linkHref: "/#services",
  },
  {
    id: "youtube-ads",
    number: "04",
    title: "YouTube Ads",
    tag: "IN-STREAM & SHORTS",
    description:
      "Direct-response video and YouTube Shorts campaigns engineered to build demand and drive trackable conversions.",
    stat: "3.9x",
    statLabel: "Video Campaign ROAS",
    linkHref: "/#services",
  },
  {
    id: "tiktok-ads",
    number: "05",
    title: "TikTok Ads",
    tag: "UGC & D2C SCALING",
    description:
      "High-velocity UGC creative testing, Spark Ads, and conversion campaigns built for rapid D2C and consumer scaling.",
    stat: "1,200+",
    statLabel: "Monthly Orders Scaled",
    linkHref: "/#services",
  },
  {
    id: "twitter-ads",
    number: "06",
    title: "X (Twitter) Ads",
    tag: "REAL-TIME & TECH",
    description:
      "Promoted posts, product launch bursts, and interest-targeted campaigns for SaaS, fintech, and high-growth brands.",
    stat: "95%+",
    statLabel: "OTP-Verified Leads",
    linkHref: "/#services",
  },
];

export default function CapabilitySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const maxIndex = Math.max(0, CAPABILITIES.length - visibleCount);

  // Auto-advance slider every 4 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section
      className="border-y border-ink/10 py-12 bg-paper relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-site px-6 md:px-10">
        {/* Header & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-ink/50">
              PERFORMANCE MARKETING CAPABILITIES
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous capability"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-paper text-ink transition-all hover:bg-ink hover:text-paper hover:border-ink"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              aria-label="Next capability"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-paper text-ink transition-all hover:bg-ink hover:text-paper hover:border-ink"
            >
              →
            </button>
          </div>
        </div>

        {/* Slider viewport */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{
              x: `-${currentIndex * (100 / visibleCount)}%`,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            {CAPABILITIES.map((item, idx) => (
              <div
                key={item.id}
                className="w-full shrink-0 md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-ink/10 bg-mist/40 p-6 md:p-8 transition-all duration-300 hover:border-ink/30 hover:bg-mist/70 hover:shadow-lg">
                  <div>
                    {/* Top line: number + tag */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="font-mono text-xs font-bold text-ink/40">
                        {item.number}
                      </span>
                      <span className="inline-flex items-center rounded-full border border-ink/10 bg-paper/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink/70">
                        {item.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl md:text-2xl font-bold text-ink group-hover:text-ink/90 transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 text-sm text-ink/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom metrics + link */}
                  <div className="mt-8 pt-5 border-t border-ink/10 flex items-end justify-between">
                    <div>
                      <span className="block font-display text-2xl font-bold text-ink">
                        {item.stat}
                      </span>
                      <span className="text-[11px] font-medium text-ink/50 uppercase tracking-wider">
                        {item.statLabel}
                      </span>
                    </div>
                    <Link
                      href={item.linkHref}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-ink/80 transition-colors group-hover:text-ink"
                    >
                      <span>Explore</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Pagination Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {CAPABILITIES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === i
                  ? "w-8 bg-ink"
                  : "w-2 bg-ink/20 hover:bg-ink/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
