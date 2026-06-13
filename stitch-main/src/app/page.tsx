"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t, language } = useLanguage();

  return (
    <div className="pt-[100px] md:pt-[120px] pb-24 transition-content">
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 relative mb-24">
        <div className="relative w-full h-[60vh] md:h-[75vh] rounded-[40px] overflow-hidden mb-12">
          {/* Main Hero Image */}
          <img
            alt="Stitch Luxury Beauty Salon Interior"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo4aAiofl4r9H6rcHe3LCi_l1A61KjkC-QKMkojO2he28wH0OwkzugtwIbSHQ0cZHanRNmFnkj-oVJjvJBNRsqUxiurL329bDmwoEy2usjEFoBiQ8lSb4fyIEGhDBeCBc_-4Ow_1HWAzHjyRR0euLj_NOtZUS5a9Kt9DpiSYATG76VSEI7jaat4clfMufkHQqVKRZt-Ysi_IQ58OO1smrfvoDmrJ2ZaVLKHIrH3JN_Oxe22mihXSijMAxCl6W3lS65xeuel1r9CXwx"
          />

          {/* Floating Glass Card Over Hero */}
          <div className="absolute bottom-6 left-6 rtl:left-auto rtl:right-6 md:bottom-12 md:left-12 rtl:md:left-auto rtl:md:right-12 glass-card p-6 md:p-8 rounded-2xl max-w-sm">
            <p className="font-body-md text-on-surface mb-2 text-sm md:text-base leading-relaxed">
              {t("home_philosophy_desc")}
            </p>
            <p className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider">
              {t("home_philosophy_title")}
            </p>
          </div>

          {/* Floating Product Image - Top Right */}
          <div className="absolute top-12 right-12 rtl:right-auto rtl:left-12 glass-card p-4 rounded-xl w-48 shadow-lg hover:-translate-y-2 transition-transform duration-500 hidden lg:block">
            <img
              alt="Signature Facial"
              className="w-full h-auto rounded-lg mb-3 object-cover aspect-square"
              src="https://lh3.googleusercontent.com/aida/AP1WRLvFQ6_Dqrf5CLiUkwnzHPdRI2N2jxXH5sJfmXd6vJC-AKq-Ujzhtrpbn0FV82GFCx7nn-7DTHOOst_EVFLX1W38Y4kbTMViySrKu2sjpSoEYzXdXcHClWm-tafZvkt3VHr4f4znRdNb5NpAqMOxl3NN8MuTzrJrlS-rzthHTev8p62JJTgGFVXqDE4GZldpdxL18S0bZzZEFjGdzcrf-4qytu1yOWw9ffotg1BJg__xgJd9txgQ4SO949o"
            />
            <div className="flex justify-between items-center">
              <div>
                <p className="font-label-sm text-xs uppercase font-semibold">
                  {t("prod_1_title")}
                </p>
                <p className="text-[10px] text-on-surface-variant">
                  Sale -15%
                </p>
              </div>
              <span className="material-symbols-outlined text-[16px] rtl:transform rtl:rotate-180">
                arrow_outward
              </span>
            </div>
          </div>
        </div>

        {/* Hero Bottom text and call to actions */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12 items-end">
          <div className="md:col-span-8">
            <h1 className="font-headline-lg text-4xl md:text-6xl text-on-surface leading-tight font-light">
              {t("hero_title")} <br />
              <span className="text-primary italic font-serif">
                {language === "ar" ? "صُمم لكل امرأة" : "Designed For Every Woman"}
              </span>
            </h1>
          </div>
          <div className="md:col-span-4 flex flex-col justify-end">
            <p className="font-body-lg text-base md:text-lg text-on-surface-variant mb-6 leading-relaxed">
              {t("hero_desc")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="bg-on-surface text-white px-6 py-3.5 rounded-full font-body-md text-sm hover:bg-primary transition-colors duration-300 shadow-md text-center inline-block"
              >
                {t("hero_book")}
              </Link>
              <Link
                href="/services"
                className="glass-card border border-rose-gold text-on-surface px-6 py-3.5 rounded-full font-body-md text-sm hover:bg-surface-container transition-colors duration-300 text-center inline-block"
              >
                {t("hero_services")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Mission Section */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 mb-24 py-12 border-t border-outline-variant/20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4">
            <h2 className="font-label-sm uppercase tracking-[0.2em] text-sm text-on-surface-variant mb-2 font-bold">
              {t("home_mission_title")}
            </h2>
          </div>
          <div className="md:col-span-8">
            <p className="font-headline-md text-xl md:text-2xl text-on-surface leading-relaxed mb-6 font-light">
              {t("home_mission_desc")}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-outline px-6 py-2 rounded-full font-label-sm text-xs uppercase hover:bg-surface-container transition-colors"
            >
              {t("home_learn_more")}
            </Link>
          </div>
        </div>
      </section>

      {/* Services Categories (Bento Grid) */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 mb-12" id="services">
        <h3 className="font-headline-md text-2xl md:text-3xl text-on-surface mb-8">
          {t("shop_categories")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Category - Body */}
          <Link
            href="/services/body"
            className="glass-card rounded-[32px] p-6 hover:-translate-y-2 transition-transform duration-500 cursor-pointer group flex flex-col h-[380px] bg-secondary-fixed/20 relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-auto relative z-10">
              <span className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant font-semibold">
                ( {t("cat_body")} )
              </span>
              <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-opacity rtl:transform rtl:rotate-180">
                arrow_outward
              </span>
            </div>
            <img
              alt="Body Care treatments at Stitch"
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfv7_E_Xo5iybi8YAqW_ugR4FjF7UiDV2NxembWSGTcx79TsT8Np6SYE3WqVmnBAn0hiceGmcqxdHU9r1xmsMmC74dQODuh9QKxoXyMuU9PNrChPuaV8WgQMWn2wp180VNmB1GqtIdkI5PttYsEgYjV5NlgHiSJ663HxaKXbvPLlc4frzR19jt73DqC_7KgbsTutzgQLSmH7bykA3LT5mBciIoKGnHhVnoK1DZesq5z2ZnEVbC3fW2ikvt-iKF-3DaNJ1rFsfeKe8NPLE"
            />
          </Link>

          {/* Category - Face */}
          <Link
            href="/services/face"
            className="glass-card rounded-[32px] p-6 hover:-translate-y-2 transition-transform duration-500 cursor-pointer group flex flex-col h-[380px] bg-secondary-fixed/20 relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-auto relative z-10">
              <span className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant font-semibold">
                ( {t("cat_face")} )
              </span>
              <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-opacity rtl:transform rtl:rotate-180">
                arrow_outward
              </span>
            </div>
            <img
              alt="Face Care treatments at Stitch"
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsnEIY61Gw1qpRxIxgRu-iMOdq7sVFzuDyxXN_VDOP8EL7jK22hC3fOegODbPEhLKvIZvUHUBmBD117-VSTYUIB7xco9ZWEUyft1gTVtqCqPwDJkACO43on2URvWw00CQXBtztnapfPzBO8WrPgvcVMMfCgXNHZdxNuZfzvTnv8R5Bhj8AkTvt0ggSSIZmy5HpbFOZV7E6SmrgdTIBsWM9WGOXeDsV4Woe8v2Qm9fG_sWZyFdJC_52O1UPnNRsM-N0RTRMoZ4_1L11x5A"
            />
          </Link>

          {/* Category - Hair */}
          <Link
            href="/services/hair"
            className="glass-card rounded-[32px] p-6 hover:-translate-y-2 transition-transform duration-500 cursor-pointer group flex flex-col h-[380px] bg-secondary-fixed/20 relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-auto relative z-10">
              <span className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant font-semibold">
                ( {t("cat_hair")} )
              </span>
              <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-opacity rtl:transform rtl:rotate-180">
                arrow_outward
              </span>
            </div>
            <img
              alt="Hair Care treatments at Stitch"
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuABdOpsllrn1OYQ60DEb_i9z-iu_B1SHsdPtcVvRRLhRdH8tsuYHxSYN2Ch75FsmeiCNKAPwd9D-mIXYaWmmMsYuWi_49oBf7Ar2dHu0XnUF-8HcXy5qjOS2HYZL5jduTzSdNEF2BPSUscPCkrY21KGlgoCa5LTflRNb7Y_5a8u6AESwO7dn82qlF5vDNC_LWkZAX12pUaInpuJ18bjVTaTQa9FcoGGvycdK_CSkHT-9-olvZ5Caj-AUgT9u6yw6xEfCPjVC_Eg1YLkkxw"
            />
          </Link>

          {/* Category - Other / Specialty */}
          <Link
            href="/services"
            className="glass-card rounded-[32px] p-6 hover:-translate-y-2 transition-transform duration-500 cursor-pointer group flex flex-col h-[380px] bg-secondary-fixed/20 overflow-hidden relative"
          >
            <div className="flex justify-between items-start mb-auto relative z-10">
              <span className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant font-semibold">
                ( {t("cat_other")} )
              </span>
              <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-opacity rtl:transform rtl:rotate-180">
                arrow_outward
              </span>
            </div>
            <img
              alt="Other Specialty services at Stitch"
              className="absolute inset-0 w-full h-full object-cover opacity-85 mix-blend-multiply"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAucgE2KvnmDjJCPx-CaDUz3Q6OxbI_YruXYSBjgXhEyJcbYce7CryjE-BeYO2cflB3g9Phj3LszfD3ioPRBDV0pVODO-qt6DT9W01Lj6ZBL7t0c-tIWKJspuegHVYUy_O0J7Bvtgg7oAWWqfC9siKAuxCkzkDCdyDWaKvTUwh6z6Rak3PtxCkZ77a8R4zMb1zSOOrLk1SK0Gj-8bBBGJDJyHR7VCF9MQjXfDHvk41hEPvQKC3nkZneN4eMH0QWgpTMTUgwQhRpi4as"
            />
            <div className="absolute bottom-6 left-6 rtl:left-auto rtl:right-6 z-10">
              <span className="font-headline-md text-lg text-on-surface transform -rotate-90 rtl:rotate-90 origin-bottom-left rtl:origin-bottom-right inline-block uppercase tracking-widest font-semibold">
                {language === "ar" ? "الفعل" : "the act"}
              </span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
