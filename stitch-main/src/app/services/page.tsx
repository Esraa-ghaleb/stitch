"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { api, Service, serviceTitle, serviceDesc, ApiError } from "@/lib/api";

export default function ServicesPage() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addingId, setAddingId] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError("");
    api.services
      .list({ category: activeFilter === "all" ? undefined : activeFilter, sort: sortBy })
      .then((res) => setServices(res.data.services))
      .catch(() => setError(t("error_loading")))
      .finally(() => setLoading(false));
  }, [activeFilter, sortBy, t]);

  const handleAddToCart = async (serviceId: string) => {
    if (!user) {
      window.location.href = "/signin";
      return;
    }
    setAddingId(serviceId);
    try {
      await api.cart.add(serviceId);
    } catch (err) {
      alert(err instanceof ApiError ? err.message : t("error_loading"));
    } finally {
      setAddingId(null);
    }
  };

  return (
    <div className="pt-[100px] md:pt-[120px] pb-24">
      <section className="relative min-h-[400px] md:min-h-[500px] flex items-center justify-center px-6 overflow-hidden mb-24 rounded-b-[40px]">
        <div className="absolute inset-0 z-0">
          <img
            alt="Luxury Beauty Background"
            className="w-full h-full object-cover object-center opacity-70"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFrxI-4jAHcisglKd9WpbrK7Rk2VmjzV7IyoUXFCS9RE1i-ayhFNO0VVMndX1dpbLKVZ3q6Atf0-sICnkuL33VDmgUBWohcQ0G62QCXOSVmlt2bda9-XwqZq09oDZC2rPh5bEAuDc65CYUAYCm1elSVAIv6CRLIjjgNzejk9lqKQfyPeZfDLlbrMH4VHfFldmuG-DChubfFwZVNuZMIk33IoX5UnXY1N1AjRSsUo0PZiZU7bURebkuto4SJEzU-nsGgjguWq_zwRlw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
        </div>
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <p className="font-label-sm text-xs uppercase tracking-[0.2em] text-primary mb-4">{t("hero_subtitle")}</p>
          <h1 className="font-headline-lg text-4xl md:text-6xl text-on-surface mb-6">{t("nav_services")}</h1>
          <p className="font-body-lg text-sm md:text-base text-on-surface-variant max-w-xl mx-auto">{t("hero_desc")}</p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 md:px-10 mb-24">
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-outline-variant/30 pb-6 mb-12 gap-6">
          <div className="flex gap-4 md:gap-8 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 font-label-sm text-xs uppercase tracking-wider">
            {[
              { key: "all", label: t("filter_all") },
              { key: "face", label: t("cat_face") },
              { key: "hair", label: t("cat_hair") },
              { key: "body", label: t("cat_body") },
              { key: "accessories", label: t("cat_accessories") },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`pb-1 transition-colors whitespace-nowrap cursor-pointer ${
                  activeFilter === tab.key
                    ? "text-on-surface border-b-2 border-primary font-bold"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 self-end md:self-auto text-xs uppercase tracking-widest font-label-sm">
            <span className="text-on-surface-variant">{t("sort_by")}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-none font-body-md text-sm text-on-surface focus:ring-0 cursor-pointer py-0 pl-2 pr-8"
            >
              <option value="newest">{t("sort_newest")}</option>
              <option value="price_low">{t("sort_price_low")}</option>
              <option value="price_high">{t("sort_price_high")}</option>
            </select>
          </div>
        </div>

        {loading && <p className="text-center text-on-surface-variant py-12">{t("loading")}</p>}
        {error && <p className="text-center text-red-600 py-12">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16">
            {services.map((product) => (
              <div key={product._id} className="group flex flex-col">
                <div className="relative bg-surface-container-low rounded-xl aspect-[3/4] mb-6 overflow-hidden img-zoom-container cursor-pointer">
                  {product.badgeKey && (
                    <div className="absolute top-4 left-4 z-10 bg-primary text-white font-label-sm text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                      {product.badgeKey}
                    </div>
                  )}
                  <Link href={`/services/treatment-details?id=${product._id}`}>
                    <img
                      alt={serviceTitle(product, language, t)}
                      className="w-full h-full object-cover img-zoom"
                      src={product.imageUrl}
                    />
                  </Link>
                  <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out flex gap-2">
                    <Link
                      href={`/book?serviceId=${product._id}`}
                      className="flex-1 bg-on-surface text-white font-label-sm text-center text-xs uppercase tracking-widest py-3 rounded-lg hover:bg-primary transition-colors"
                    >
                      {t("book_now")}
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product._id)}
                      disabled={addingId === product._id}
                      className="flex-1 bg-primary text-white font-label-sm text-xs uppercase py-3 rounded-lg hover:bg-on-surface transition-colors cursor-pointer disabled:opacity-60"
                    >
                      {addingId === product._id ? "..." : t("add_to_cart")}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="flex items-center gap-1 mb-2 text-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[14px]"
                        style={{ fontVariationSettings: `"FILL" ${i < Math.floor(product.rating) ? 1 : 0}` }}
                      >
                        {i < Math.floor(product.rating) ? "star" : "star_border"}
                      </span>
                    ))}
                    <span className="font-body-md text-xs text-on-surface-variant ml-1">({product.reviewsCount})</span>
                  </div>
                  <Link href={`/services/treatment-details?id=${product._id}`}>
                    <h4 className="font-headline-md text-lg leading-tight text-on-surface mb-1 hover:text-primary transition-colors">
                      {serviceTitle(product, language, t)}
                    </h4>
                  </Link>
                  <p className="font-body-md text-xs text-on-surface-variant mb-3 flex-grow line-clamp-2">
                    {serviceDesc(product, language, t)}
                  </p>
                  <p className="font-body-lg text-sm font-semibold text-on-surface">
                    {product.duration} Mins | ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
