"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { api, Service, serviceTitle, ApiError } from "@/lib/api";

function BookPageContent() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedServiceId = searchParams.get("serviceId") || "";
  const preselectedQty = parseInt(searchParams.get("quantity") || "1", 10);

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceId: preselectedServiceId,
    date: "",
    time: "10:00 AM",
    notes: "",
    quantity: preselectedQty,
  });

  const timeSlots = ["09:00 AM", "10:30 AM", "12:00 PM", "01:30 PM", "03:00 PM", "04:30 PM", "06:00 PM"];

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name,
        email: prev.email || user.email,
      }));
    }
  }, [user]);

  useEffect(() => {
    api.services
      .list()
      .then((res) => {
        setServices(res.data.services);
        if (!formData.serviceId && res.data.services[0]) {
          setFormData((prev) => ({ ...prev, serviceId: res.data.services[0]._id }));
        }
      })
      .catch(() => setError(t("error_loading")))
      .finally(() => setLoading(false));
  }, [t]);

  useEffect(() => {
    if (preselectedServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: preselectedServiceId, quantity: preselectedQty }));
    }
  }, [preselectedServiceId, preselectedQty]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await api.bookings.create({
        serviceId: formData.serviceId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        notes: formData.notes,
        quantity: formData.quantity,
      });
      router.push(`/book/summary?id=${res.data.booking._id}`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t("error_loading"));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="pt-[120px] pb-24 text-center">{t("loading")}</div>;

  return (
    <div className="pt-[100px] md:pt-[120px] pb-24 max-w-4xl mx-auto px-6">
      <div className="text-center mb-12">
        <h1 className="font-headline-lg text-3xl md:text-5xl text-on-surface mb-4">{t("booking_title")}</h1>
        <p className="font-body-md text-sm text-on-surface-variant">{t("booking_subtitle")}</p>
      </div>

      <div className="glass-card rounded-3xl p-8 shadow-lg">
        {error && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm">{error}</div>}

        <div className="flex justify-between items-center mb-8 pb-6 border-b border-outline-variant/20 font-label-sm text-xs uppercase tracking-wider text-on-surface-variant">
          <span className="text-primary font-bold">{t("booking_step_1")}</span>
          <span className="opacity-40">&mdash;&mdash;</span>
          <span className="opacity-60">{t("booking_step_2")}</span>
          <span className="opacity-40">&mdash;&mdash;</span>
          <span className="opacity-60">{t("booking_step_3")}</span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant">{t("booking_name")} *</label>
              <input required type="text" name="name" value={formData.name} onChange={handleInputChange}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant">{t("booking_phone")} *</label>
              <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant">{t("booking_email")} *</label>
              <input required type="email" name="email" value={formData.email} onChange={handleInputChange}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant">{t("booking_step_1")} *</label>
              <select name="serviceId" value={formData.serviceId} onChange={handleInputChange} required
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary">
                {services.map((s) => (
                  <option key={s._id} value={s._id}>
                    {serviceTitle(s, language, t)} (${s.price.toFixed(2)})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant">{t("booking_date")} *</label>
              <input required type="date" name="date" value={formData.date} onChange={handleInputChange}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant">{t("booking_time")} *</label>
              <div className="flex flex-wrap gap-2">
                {timeSlots.map((slot) => (
                  <button key={slot} type="button" onClick={() => setFormData((prev) => ({ ...prev, time: slot }))}
                    className={`px-3 py-2 text-xs rounded-lg border cursor-pointer ${
                      formData.time === slot ? "bg-primary text-white border-primary" : "bg-surface-container-low border-outline-variant/30"
                    }`}>
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant">{t("booking_notes")}</label>
            <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={3}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none" />
          </div>
          <button type="submit" disabled={submitting}
            className="w-full bg-on-surface text-white font-label-sm text-xs uppercase tracking-widest py-4 rounded-xl hover:bg-primary transition-colors disabled:opacity-60 cursor-pointer">
            {submitting ? t("auth_loading") : t("booking_pay")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="pt-[120px] text-center">Loading...</div>}>
      <BookPageContent />
    </Suspense>
  );
}
