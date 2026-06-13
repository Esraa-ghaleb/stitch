"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export const FloatingBookingButton: React.FC = () => {
  const { dir } = useLanguage();

  return (
    <Link
      href="/book"
      className={`fixed bottom-8 w-16 h-16 bg-rose-gold text-on-surface rounded-full flex justify-center items-center shadow-2xl hover:scale-110 active:scale-95 transition-transform z-50 group ${
        dir === "rtl" ? "left-8" : "right-8"
      }`}
    >
      <span className="material-symbols-outlined text-3xl group-hover:animate-pulse">
        calendar_month
      </span>
    </Link>
  );
};
