"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

export const Navbar: React.FC = () => {
  const { toggleLanguage, language, t } = useLanguage();
  const { user, logout, loading: authLoading } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!user) {
      setCartCount(0);
      return;
    }
    api.cart
      .get()
      .then((res) => {
        const count = res.data.cart.items.reduce((s, i) => s + i.quantity, 0);
        setCartCount(count);
      })
      .catch(() => setCartCount(0));
  }, [user]);

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
  };

  const navLinkClass = "hover:text-primary-container transition-colors duration-300";

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-white/80 dark:bg-black/60 shadow-md py-4 backdrop-blur-xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-10 max-w-[1440px] mx-auto">
        <Link
          href="/"
          className="font-headline-md text-3xl font-semibold text-on-surface hover:opacity-80 transition-opacity"
        >
          {language === "ar" ? "ستيتش" : "Stitch"}
        </Link>

        <div className="hidden md:flex items-center gap-8 font-body-md text-sm uppercase tracking-widest text-primary">
          <Link href="/" className={navLinkClass}>{t("nav_home")}</Link>
          <Link href="/about" className="text-on-surface-variant hover:text-primary transition-colors duration-300">
            {t("nav_about")}
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button className="text-on-surface-variant hover:text-primary transition-colors duration-300 flex items-center gap-1 cursor-pointer">
              {t("nav_services")}
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>
            {isServicesOpen && (
              <div className="absolute top-full left-0 rtl:right-0 rtl:left-auto mt-2 w-48 bg-white/95 backdrop-blur-xl border border-outline-variant/30 rounded-xl shadow-2xl z-50 p-2">
                <Link href="/services/face" className="block px-4 py-2 hover:bg-surface-container rounded-lg text-on-surface-variant">{t("cat_face")}</Link>
                <Link href="/services/hair" className="block px-4 py-2 hover:bg-surface-container rounded-lg text-on-surface-variant">{t("cat_hair")}</Link>
                <Link href="/services/body" className="block px-4 py-2 hover:bg-surface-container rounded-lg text-on-surface-variant">{t("cat_body")}</Link>
                <Link href="/services" className="block px-4 py-2 hover:bg-surface-container rounded-lg text-on-surface-variant">{t("cat_other")}</Link>
              </div>
            )}
          </div>

          <Link href="/book" className="text-on-surface-variant hover:text-primary transition-colors duration-300">{t("nav_booking")}</Link>
          <Link href="/editorial" className="text-on-surface-variant hover:text-primary transition-colors duration-300">{t("editorial_title")}</Link>
          <Link href="/contact" className="text-on-surface-variant hover:text-primary transition-colors duration-300">{t("nav_contact")}</Link>
        </div>

        <div className="flex items-center gap-4 text-primary">
          {user ? (
            <Link href="/cart" className="relative hover:text-primary-container transition-all p-2">
              <span className="material-symbols-outlined">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          ) : (
            <Link href="/signin" className="hidden md:block text-xs uppercase tracking-widest hover:text-primary-container">
              {t("nav_signin")}
            </Link>
          )}

          {!authLoading && user && (
            <div className="hidden md:flex items-center gap-3">
              <span className="text-xs text-on-surface-variant normal-case tracking-normal">{user.name}</span>
              <button onClick={handleLogout} className="text-xs uppercase tracking-widest hover:text-primary-container cursor-pointer">
                {t("nav_logout")}
              </button>
            </div>
          )}

          {!authLoading && !user && (
            <Link href="/signup" className="hidden md:block text-xs uppercase tracking-widest bg-on-surface text-white px-4 py-2 rounded-full hover:bg-primary transition-colors">
              {t("nav_signup")}
            </Link>
          )}

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 font-label-sm uppercase hover:text-primary-container transition-colors cursor-pointer p-2"
          >
            <span className="material-symbols-outlined text-[18px]">language</span>
            <span>{language === "en" ? "AR" : "EN"}</span>
          </button>

          <button
            className="md:hidden hover:text-primary transition-all duration-300 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined">{isMobileMenuOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden w-full bg-white border-t border-outline-variant/35 py-4 px-6 flex flex-col gap-4 font-body-md text-sm uppercase tracking-wider">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>{t("nav_home")}</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>{t("nav_about")}</Link>
          <Link href="/services" onClick={() => setIsMobileMenuOpen(false)}>{t("nav_services")}</Link>
          <Link href="/book" onClick={() => setIsMobileMenuOpen(false)}>{t("nav_booking")}</Link>
          <Link href="/editorial" onClick={() => setIsMobileMenuOpen(false)}>{t("editorial_title")}</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>{t("nav_contact")}</Link>
          {user ? (
            <>
              <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)}>{t("cart_title")}</Link>
              <button onClick={handleLogout} className="text-start cursor-pointer">{t("nav_logout")}</button>
            </>
          ) : (
            <>
              <Link href="/signin" onClick={() => setIsMobileMenuOpen(false)}>{t("nav_signin")}</Link>
              <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>{t("nav_signup")}</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};
