"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { api, Service, serviceTitle, serviceDesc } from "@/lib/api";

interface PageProps {
  params: Promise<{ category: string }>;
}

export default function CategoryPage({ params }: PageProps) {
  const { category } = use(params);
  const { t, language } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [bannerUrl, setBannerUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api.services
      .byCategory(category)
      .then((res) => {
        setServices(res.data.services);
        setBannerUrl(res.data.bannerUrl);
      })
      .catch(() => setError(t("error_loading")))
      .finally(() => setLoading(false));
  }, [category, t]);

  const isHair = category === "hair";
  const titleKey = category === "face" ? "cat_face" : category === "body" ? "cat_body" : category === "hair" ? "cat_hair" : "cat_specialty";

  if (loading) {
    return <div className="pt-[120px] pb-24 text-center text-on-surface-variant">{t("loading")}</div>;
  }

  if (error) {
    return <div className="pt-[120px] pb-24 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="pt-[100px] md:pt-[120px] pb-24 bg-[#FAF9F6]">
      {isHair ? (
        <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-8 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 flex flex-col justify-center text-start">
            <span className="font-label-sm text-xs uppercase tracking-[0.2em] text-primary mb-3 block">{t("hair_subtitle")}</span>
            <h1 className="font-headline-lg text-4xl md:text-6xl text-on-surface font-serif mb-6">{t(titleKey)}</h1>
            <p className="font-body-md text-base text-on-surface-variant mb-8 max-w-md">{t("hair_desc")}</p>
            <button
              onClick={() => document.getElementById("collections-section")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-primary text-white font-label-sm text-xs uppercase tracking-widest px-8 py-3 rounded-full hover:bg-on-surface transition-all duration-300 cursor-pointer"
            >
              {t("hair_explore")}
            </button>
          </div>
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] w-full rounded-[24px] overflow-hidden shadow-xl">
              <img alt={t(titleKey)} className="w-full h-full object-cover" src={bannerUrl || services[0]?.imageUrl} />
            </div>
          </div>
        </section>
      ) : (
        <section className="relative min-h-[350px] md:min-h-[450px] flex items-center justify-center px-6 overflow-hidden mb-16 rounded-b-[40px]">
          <div className="absolute inset-0 z-0">
            <img alt={t(titleKey)} className="w-full h-full object-cover opacity-70" src={bannerUrl || services[0]?.imageUrl} />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
          </div>
          <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
            <p className="font-label-sm text-xs uppercase tracking-[0.2em] text-primary mb-4">{t("nav_services")}</p>
            <h1 className="font-headline-lg text-4xl md:text-6xl text-on-surface mb-6">{t(titleKey)}</h1>
          </div>
        </section>
      )}

      {isHair && (
        <div id="collections-section" className="text-center py-12 md:py-16">
          <h2 className="font-headline-lg text-3xl md:text-5xl font-serif text-on-surface italic">{t("hair_collections_title")}</h2>
        </div>
      )}

      <section className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className={isHair ? "grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"}>
          {services.map((item) => (
            <div key={item._id} className={`${isHair ? "flex flex-col" : "glass-card rounded-2xl overflow-hidden shadow-md hover-lift"} group h-full`}>
              <Link href={`/services/treatment-details?id=${item._id}`}>
                <div className={`relative ${isHair ? "aspect-[4/3] rounded-2xl" : "aspect-[4/3]"} w-full overflow-hidden img-zoom-container`}>
                  {item.badgeKey && (
                    <div className="absolute top-4 left-4 z-10 bg-[#FAF9F6]/90 backdrop-blur-sm text-on-surface font-label-sm text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                      {item.badgeKey}
                    </div>
                  )}
                  <img src={item.imageUrl} alt={serviceTitle(item, language, t)} className="w-full h-full object-cover img-zoom" />
                </div>
              </Link>
              <div className={isHair ? "py-6 flex flex-col flex-grow" : "p-6 flex flex-col flex-grow"}>
                <h3 className="font-headline-md text-xl text-on-surface mb-2">{serviceTitle(item, language, t)}</h3>
                <p className="font-body-md text-sm text-on-surface-variant mb-6 flex-grow">{serviceDesc(item, language, t)}</p>
                <div className="flex justify-between items-center mt-auto border-t border-outline-variant/20 pt-4">
                  <span className="font-body-lg text-sm text-on-surface">{item.duration} Mins | ${item.price.toFixed(2)}</span>
                  <Link href={`/book?serviceId=${item._id}`} className="bg-primary text-white font-label-sm text-xs uppercase px-4 py-2 rounded-full hover:bg-on-surface transition-colors">
                    {t("book_now")}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {isHair && (
        <section className="bg-[#F2ECE4] py-20 px-6 mt-24 text-center">
          <h3 className="font-serif text-2xl md:text-4xl text-[#3A332E] italic mb-6">&ldquo;{t("hair_quote")}&rdquo;</h3>
          <p className="font-label-sm text-xs uppercase tracking-[0.3em] text-[#70655B]">{t("hair_quote_author")}</p>
        </section>
      )}
    </div>
  );
}
