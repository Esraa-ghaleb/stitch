"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { api, Booking, serviceTitle, ApiError } from "@/lib/api";

function DepositContent() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [healthNotes, setHealthNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    if (!bookingId) {
      router.replace("/book");
      return;
    }
    api.bookings
      .get(bookingId)
      .then((res) => {
        const b = res.data.booking;
        setBooking(b);
        const parts = b.customerName.split(" ");
        setFirstName(parts[0] || "");
        setLastName(parts.slice(1).join(" ") || "");
        setEmail(b.customerEmail);
        setPhone(b.customerPhone);
        setHealthNotes(b.healthNotes);
      })
      .catch(() => setError(t("error_loading")))
      .finally(() => setLoading(false));
  }, [bookingId, router, t]);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingId) return;
    setSubmitting(true);
    setError("");
    try {
      await api.bookings.update(bookingId, {
        firstName,
        lastName,
        email,
        phone,
        healthNotes,
        paymentMethod,
      });
      await api.bookings.confirm(bookingId);
      router.push(`/book/confirmed?id=${bookingId}`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t("error_loading"));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="pt-[120px] pb-24 text-center">{t("loading")}</div>;
  if (!booking) return <div className="pt-[120px] pb-24 text-center text-red-600">{error || t("error_loading")}</div>;

  return (
    <div className="pt-[100px] md:pt-[120px] pb-24">
      <main className="max-w-[1440px] mx-auto px-6 md:px-10 w-full">
        <div className="mb-16">
          <h1 className="font-headline-lg text-3xl md:text-6xl text-on-surface mb-4">{t("checkout_title")}</h1>
          <p className="font-body-lg text-sm md:text-base text-on-surface-variant max-w-2xl">{t("checkout_desc")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-[80px]">
          <div className="lg:col-span-7 xl:col-span-8">
            {error && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm">{error}</div>}
            <form onSubmit={handlePay} className="space-y-16">
              <section>
                <h2 className="font-headline-md text-xl md:text-2xl text-on-surface mb-8">{t("checkout_cust_info")}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div>
                    <label className="font-label-sm text-xs text-on-surface-variant">{t("contact_label_fn")}</label>
                    <input required className="input-underline w-full py-2" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div>
                    <label className="font-label-sm text-xs text-on-surface-variant">{t("contact_label_ln")}</label>
                    <input required className="input-underline w-full py-2" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="font-label-sm text-xs text-on-surface-variant">{t("contact_label_email")}</label>
                    <input required type="email" className="input-underline w-full py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="font-label-sm text-xs text-on-surface-variant">{t("booking_phone")}</label>
                    <input type="tel" className="input-underline w-full py-2" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="font-label-sm text-xs text-on-surface-variant">
                      {language === "ar" ? "ملاحظات صحية والجلد" : "Health & Skin Notes"}
                    </label>
                    <textarea rows={3} className="input-underline w-full resize-none py-2" value={healthNotes} onChange={(e) => setHealthNotes(e.target.value)} />
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-headline-md text-xl md:text-2xl text-on-surface mb-8">{t("checkout_payment_method")}</h2>
                <div className="flex flex-col gap-4">
                  {(["card", "applepay", "googlepay"] as const).map((method) => (
                    <label key={method} className="flex items-center gap-4 p-6 glass-card rounded-xl cursor-pointer">
                      <input type="radio" name="payment" value={method} checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} />
                      <span className="font-label-sm text-xs uppercase tracking-widest">
                        {method === "card" ? (language === "ar" ? "بطاقة ائتمان" : "Credit / Debit Card") : method === "applepay" ? "Apple Pay" : "Google Pay"}
                      </span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-on-surface-variant mt-4">
                  {language === "ar"
                    ? "لا يتم تخزين بيانات البطاقة. يتم تأكيد العربون بأمان."
                    : "Card details are not stored. Your deposit is confirmed securely."}
                </p>
              </section>

              <button type="submit" disabled={submitting}
                className="w-full bg-on-surface text-white py-4 px-6 rounded-full hover:bg-primary transition-colors disabled:opacity-60 cursor-pointer">
                {submitting ? t("auth_loading") : t("checkout_confirm")}
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-24 glass-card shadow-md rounded-2xl p-8 flex flex-col gap-6">
              <h3 className="font-headline-md text-xl border-b border-outline-variant/30 pb-4">{t("checkout_summary")}</h3>
              <div className="flex gap-4 items-center">
                <img alt="" className="w-20 h-24 object-cover rounded-md" src={booking.service.imageUrl} />
                <div>
                  <span className="font-label-sm text-xs uppercase">{serviceTitle(booking.service, language, t)}</span>
                  <p className="font-body-md text-sm font-semibold">${booking.subtotal.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 text-sm">
                <div className="flex justify-between"><span>{t("checkout_subtotal")}</span><span>${booking.subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>{t("booking_deposit")}</span><span>${booking.depositAmount.toFixed(2)}</span></div>
              </div>
              <div className="flex justify-between items-end border-t border-outline-variant/60 pt-4">
                <span className="font-label-sm text-xs uppercase font-bold">{t("checkout_total")}</span>
                <span className="font-headline-md text-2xl font-bold">${booking.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function DepositPage() {
  return (
    <Suspense fallback={<div className="pt-[120px] text-center">Loading...</div>}>
      <DepositContent />
    </Suspense>
  );
}
