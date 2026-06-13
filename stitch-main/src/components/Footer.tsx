"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="w-full py-16 px-6 md:px-10 bg-background border-t border-outline-variant/30 transition-colors">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1440px] mx-auto items-center">
        {/* Brand Logo */}
        <div className="font-headline-md text-2xl text-on-surface text-center md:text-left rtl:md:text-right mb-4 md:mb-0">
          {language === "ar" ? "ستيتش" : "Stitch"}
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 font-body-md text-sm text-on-surface-variant opacity-80 hover:opacity-100 transition-opacity">
          <Link href="#" className="hover:text-primary transition-colors">
            {t("footer_privacy")}
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            {t("footer_terms")}
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            {t("footer_faq")}
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            {t("footer_careers")}
          </Link>
        </div>

        {/* Copyright */}
        <div className="font-body-md text-sm text-secondary text-center md:text-right rtl:md:text-left mt-4 md:mt-0">
          {t("footer_copyright")}
        </div>
      </div>
    </footer>
  );
};
