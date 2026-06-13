"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { api, Booking, serviceTitle } from "@/lib/api";

function ConfirmedContent() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!bookingId) {
      router.replace("/book");
      return;
    }
    api.bookings
      .get(bookingId)
      .then((res) => setBooking(res.data.booking))
      .catch(() => setError(t("error_loading")))
      .finally(() => setLoading(false));
  }, [bookingId, router, t]);

  if (loading) return <div className="pt-[120px] pb-24 text-center">{t("loading")}</div>;
  if (error || !booking) return <div className="pt-[120px] pb-24 text-center text-red-600">{error || t("error_loading")}</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-[100px] md:pt-[120px] pb-24">
      <main className="w-full max-w-3xl px-6 md:px-10 relative z-10 flex flex-col items-center text-center">
        <div className="mb-8">
          <div className="w-32 h-32 rounded-full glass-card flex items-center justify-center shadow-lg bg-white/60 mx-auto">
            <span className="material-symbols-outlined text-primary text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
        </div>

        <h1 className="font-headline-lg text-3xl md:text-5xl text-on-surface mb-4">{t("confirm_title")}</h1>
        <p className="font-body-md text-sm text-on-surface-variant max-w-md mb-8">{t("confirm_desc")}</p>

        <div className="w-full max-w-md glass-card rounded-xl p-8 mb-12 shadow-lg bg-white/60 border border-outline-variant/30 text-start rtl:text-right">
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-outline-variant/30">
            <div>
              <p className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">{t("confirm_ref")}</p>
              <p className="font-body-lg text-sm font-semibold">#{booking.reference}</p>
            </div>
            <div className="text-end rtl:text-left">
              <p className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">{t("confirm_status")}</p>
              <span className="inline-flex items-center bg-secondary-container px-3 py-1 rounded-full text-[10px] font-bold capitalize">
                {booking.status}
              </span>
            </div>
          </div>

          <div className="mb-6 pb-6 border-b border-outline-variant/30">
            <p className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">{t("confirm_specialist")}</p>
            <p className="font-body-md text-sm font-semibold">{booking.specialist}</p>
            <p className="font-body-md text-xs text-on-surface-variant mt-2">
              {serviceTitle(booking.service, language, t)}
            </p>
          </div>

          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-outline mt-1">calendar_today</span>
            <div>
              <p className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">{t("confirm_datetime")}</p>
              <p className="font-body-md text-sm font-semibold">{booking.date} at {booking.time}</p>
              <p className="font-body-md text-xs text-outline mt-1">{t("confirm_datetime_desc")}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("124 Avenue des Champs-Élysées, Paris")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-white/60 border border-outline-variant/60 text-on-surface py-4 px-8 rounded-full font-label-sm text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-all"
          >
            {t("confirm_directions")}
          </a>
        </div>
      </main>
    </div>
  );
}

export default function ConfirmedPage() {
  return (
    <Suspense fallback={<div className="pt-[120px] text-center">Loading...</div>}>
      <ConfirmedContent />
    </Suspense>
  );
}
