"use client";

import React, { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t, language } = useLanguage();
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const applySpotlight = (card: HTMLDivElement) => {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      };
      card.addEventListener("mousemove", handleMouseMove);
      return () => card.removeEventListener("mousemove", handleMouseMove);
    };

    let clean1: (() => void) | undefined;
    let clean2: (() => void) | undefined;

    if (card1Ref.current) {
      clean1 = applySpotlight(card1Ref.current);
    }
    if (card2Ref.current) {
      clean2 = applySpotlight(card2Ref.current);
    }

    return () => {
      if (clean1) clean1();
      if (clean2) clean2();
    };
  }, []);

  return (
    <div className="pt-[100px] md:pt-[120px] pb-24">
      {/* Hero Section */}
      <section className="relative px-6 md:px-10 max-w-7xl mx-auto pt-16 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 md:col-start-3 text-center space-y-6">
            <h1
              className="font-headline-lg text-4xl md:text-7xl text-on-surface leading-tight"
              dangerouslySetInnerHTML={{ __html: t("about_hero_title") }}
            />
            <p className="font-body-lg text-base md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              {t("about_hero_desc")}
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Cards Section (Spotlight) */}
      <section className="relative px-6 md:px-10 max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div
            ref={card1Ref}
            className="spotlight-card p-12 min-h-[350px] flex flex-col justify-center rounded-[24px] relative overflow-hidden bg-zinc-900/95 border border-zinc-800 text-white"
            style={{
              ["--mouse-x" as any]: "0px",
              ["--mouse-y" as any]: "0px",
            }}
          >
            {/* Custom spotlight style implemented via css variables in globals.css or inline overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(215,195,176,0.15),transparent_40%)] pointer-events-none z-0" />
            <div className="relative z-10 space-y-6">
              <h2 className="font-headline-md text-2xl md:text-3xl text-[#d7c3b0] font-normal">
                {t("about_card1_title")}
              </h2>
              <div className="h-px w-16 bg-[#d7c3b0]/30" />
              <p className="font-body-lg text-sm md:text-base text-zinc-300 leading-relaxed">
                {t("about_card1_desc")}
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div
            ref={card2Ref}
            className="spotlight-card p-12 min-h-[350px] flex flex-col justify-center rounded-[24px] relative overflow-hidden bg-zinc-900/95 border border-zinc-800 text-white"
            style={{
              ["--mouse-x" as any]: "0px",
              ["--mouse-y" as any]: "0px",
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(215,195,176,0.15),transparent_40%)] pointer-events-none z-0" />
            <div className="relative z-10 space-y-6">
              <h2 className="font-headline-md text-2xl md:text-3xl text-[#d7c3b0] font-normal">
                {t("about_card2_title")}
              </h2>
              <div className="h-px w-16 bg-[#d7c3b0]/30" />
              <p className="font-body-lg text-sm md:text-base text-zinc-300 leading-relaxed">
                {t("about_card2_desc")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
