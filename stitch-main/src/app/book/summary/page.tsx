"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { api, Booking, serviceTitle, ApiError } from "@/lib/api";

function SummaryContent() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [discountCode, setDiscountCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!bookingId) {
      router.replace("/book");
      return;
    }
    api.bookings
      .get(bookingId)
      .then((res) => {
        setBooking(res.data.booking);
        setDiscountCode(res.data.booking.discountCode || "");
      })
      .catch(() => setError(t("error_loading")))
      .finally(() => setLoading(false));
  }, [bookingId, router, t]);

  const applyDiscount = async () => {
    if (!bookingId) return;
    setApplying(true);
    setError("");
    try {
      const res = await api.bookings.update(bookingId, { discountCode });
      setBooking(res.data.booking);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t("error_loading"));
    } finally {
      setApplying(false);
    }
  };

  const updateQuantity = async (qty: number) => {
    if (!bookingId || qty < 1) return;
    try {
      const res = await api.bookings.update(bookingId, { quantity: qty });
      setBooking(res.data.booking);
    } catch {
      setError(t("error_loading"));
    }
  };

  if (loading) return <div className="pt-[120px] pb-24 text-center">{t("loading")}</div>;
  if (error && !booking) return <div className="pt-[120px] pb-24 text-center text-red-600">{error}</div>;
  if (!booking) return null;

  const service = booking.service;

  return (
    <div className="pt-[100px] md:pt-[120px] pb-24">
      <main className="flex-grow px-6 md:px-10 max-w-[1440px] w-full mx-auto">
        <div className="mb-8">
          <Link href="/services" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary font-label-sm text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined text-[18px] rtl:rotate-180">arrow_back</span>
            {t("continue_shopping")}
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          <section className="w-full lg:w-3/4 flex flex-col gap-12">
            <h1 className="font-headline-lg text-3xl md:text-5xl text-on-surface">{t("your_selection")}</h1>
            <article className="flex flex-col sm:flex-row gap-6 pb-8 border-b border-outline-variant/30">
              <div className="w-full sm:w-48 aspect-[3/4] overflow-hidden bg-surface-container rounded-xl">
                <img alt="" className="w-full h-full object-cover" src={service.imageUrl} />
              </div>
              <div className="flex flex-col justify-between flex-grow py-2">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-headline-md text-xl md:text-2xl text-on-surface mb-2">
                      {serviceTitle(service, language, t)}
                    </h3>
                    <p className="font-body-md text-xs text-on-surface-variant">{service.duration} Min</p>
                  </div>
                  <span className="font-body-lg text-base font-semibold">${booking.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-end mt-6">
                  <div className="flex items-center gap-4 border-b border-outline-variant pb-1">
                    <button type="button" onClick={() => updateQuantity(booking.quantity - 1)} className="cursor-pointer">
                      <span className="material-symbols-outlined text-[16px]">remove</span>
                    </button>
                    <span className="font-label-sm text-xs w-4 text-center">{booking.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(booking.quantity + 1)} className="cursor-pointer">
                      <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </section>

          <aside className="w-full lg:w-1/4 sticky top-24">
            <div className="glass-card shadow-lg p-8 rounded-2xl flex flex-col gap-6">
              <h2 className="font-headline-md text-xl border-b border-outline-variant/30 pb-4">{t("summary")}</h2>
              <div className="space-y-4 text-sm text-on-surface-variant">
                <div className="flex justify-between"><span>{t("selected_date")}</span><span>{booking.date}</span></div>
                <div className="flex justify-between"><span>{t("selected_time")}</span><span>{booking.time}</span></div>
                <div className="flex justify-between pt-4 border-t border-outline-variant/30">
                  <span>{t("checkout_subtotal")}</span><span>${booking.subtotal.toFixed(2)}</span>
                </div>
                {booking.discountAmount > 0 && (
                  <div className="flex justify-between text-primary">
                    <span>{t("discount_label")}</span><span>-${booking.discountAmount.toFixed(2)}</span>
                  </div>
                )}
              </div>
              <div className="relative mt-4 flex gap-2">
                <input
                  className="flex-1 border-b border-outline-variant bg-transparent py-2 text-sm focus:outline-none focus:border-primary"
                  placeholder={t("discount_label")}
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <button onClick={applyDiscount} disabled={applying} className="text-xs uppercase tracking-widest hover:text-primary cursor-pointer disabled:opacity-60">
                  {applying ? "..." : t("apply")}
                </button>
              </div>
              {error && <p className="text-red-600 text-xs">{error}</p>}
              <div className="border-t border-outline-variant/30 pt-6 flex justify-between items-end">
                <span className="font-body-lg text-sm">{t("total")}</span>
                <span className="font-headline-md text-xl font-semibold">${booking.total.toFixed(2)}</span>
              </div>
              <button
                onClick={() => router.push(`/book/deposit?id=${booking._id}`)}
                className="w-full bg-on-surface text-white font-label-sm text-xs uppercase tracking-widest py-4 rounded-full hover:bg-primary transition-colors cursor-pointer"
              >
                {t("checkout")}
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default function SessionSummaryPage() {
  return (
    <Suspense fallback={<div className="pt-[120px] text-center">Loading...</div>}>
      <SummaryContent />
    </Suspense>
  );
}
