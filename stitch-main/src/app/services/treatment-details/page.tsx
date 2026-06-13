"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { api, Service, Review, serviceTitle, serviceDesc } from "@/lib/api";

function TreatmentDetailsContent() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "face-1";
  const [service, setService] = useState<Service | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api.services
      .get(id)
      .then((res) => {
        setService(res.data.service);
        setReviews(res.data.reviews);
      })
      .catch(() => setError(t("error_loading")))
      .finally(() => setLoading(false));
  }, [id, t]);

  if (loading) return <div className="pt-[120px] pb-24 text-center">{t("loading")}</div>;
  if (error || !service) return <div className="pt-[120px] pb-24 text-center text-red-600">{error || t("error_loading")}</div>;

  const processDesc = language === "ar" && service.processDescAr ? service.processDescAr : service.processDescEn || t("treatment_process_desc");
  const ingredients = language === "ar" && service.ingredientsAr ? service.ingredientsAr : service.ingredientsEn || "Colloidal Gold, Hyaluronic Acid, Squalane, Rosehip Seed Oil, Peptides.";
  const aftercare = language === "ar" && service.aftercareAr ? service.aftercareAr : service.aftercareEn || "Avoid direct sun for 24 hours. Use SPF daily.";

  return (
    <div className="pt-[100px] md:pt-[120px] pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24">
          <div className="md:col-span-7 flex flex-col gap-6">
            <div className="img-zoom-container rounded-xl overflow-hidden shadow-lg relative w-full h-[50vh] md:h-[70vh]">
              <img alt={serviceTitle(service, language, t)} className="img-zoom w-full h-full object-cover" src={service.imageUrl} />
            </div>
          </div>
          <div className="md:col-span-5 relative">
            <div className="sticky top-32 glass-card p-8 rounded-xl shadow-lg flex flex-col gap-6">
              <h1 className="font-headline-lg text-3xl md:text-4xl text-on-surface">{serviceTitle(service, language, t)}</h1>
              <p className="font-body-lg text-sm text-on-surface-variant">{serviceDesc(service, language, t)}</p>
              <div className="flex items-center justify-between pb-6 border-b border-outline-variant/30">
                <span className="font-headline-md text-2xl font-semibold">${service.price.toFixed(2)}</span>
                <span className="text-on-surface-variant font-label-sm text-[10px] uppercase">
                  {service.reviewsCount} {t("treatment_reviews")}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-primary/30 pb-2">
                <span className="font-label-sm text-xs uppercase tracking-widest text-on-surface-variant">{t("treatment_quantity")}</span>
                <div className="flex items-center gap-4">
                  <button className="cursor-pointer" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <span>{quantity}</span>
                  <button className="cursor-pointer" onClick={() => setQuantity(quantity + 1)}>
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
              </div>
              <Link
                href={`/book?serviceId=${service._id}&quantity=${quantity}`}
                className="block w-full bg-on-surface text-white text-center py-4 rounded-full font-label-sm text-xs uppercase tracking-widest hover:bg-primary transition-all"
              >
                {t("treatment_book")}
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-24">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 border-b border-outline-variant/30 mb-12 pb-4">
            {[
              { key: "desc", label: t("treatment_the_process") },
              { key: "ingredients", label: t("treatment_tech_materials") },
              { key: "how-to", label: t("treatment_aftercare") },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`font-label-sm text-xs uppercase tracking-widest pb-2 cursor-pointer ${
                  activeTab === tab.key ? "text-primary border-b-2 border-primary font-bold" : "text-on-surface-variant"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="font-body-lg text-sm md:text-base text-on-surface-variant leading-relaxed">
            {activeTab === "desc" && <p>{processDesc}</p>}
            {activeTab === "ingredients" && <p>{ingredients}</p>}
            {activeTab === "how-to" && <p>{aftercare}</p>}
          </div>
        </div>

        {reviews.length > 0 && (
          <section className="mb-24">
            <h2 className="font-headline-md text-2xl text-center mb-12">{t("treatment_verdict")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <div key={review._id} className="glass-panel p-8 rounded-xl shadow-md">
                  <div className="flex text-primary mb-4">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                    ))}
                  </div>
                  <h3 className="font-headline-md text-lg mb-2">{review.title}</h3>
                  <p className="font-body-md text-xs italic mb-4">{review.text}</p>
                  <p className="font-label-sm text-xs uppercase">— {review.authorName}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default function TreatmentDetailsPage() {
  return (
    <Suspense fallback={<div className="pt-[120px] text-center">Loading...</div>}>
      <TreatmentDetailsContent />
    </Suspense>
  );
}
