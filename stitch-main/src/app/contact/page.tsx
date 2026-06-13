"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { t, language } = useLanguage();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { api } = await import("@/lib/api");
      await api.contact.submit({ firstName, lastName, email, subject, message });
      setIsSubmitted(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setError(t("error_loading"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 mb-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[60vh]">
          <div className="lg:col-span-7 z-10">
            <h1 className="font-headline-lg text-4xl md:text-7xl text-on-surface mb-8 leading-tight">
              {language === "ar" ? (
                <>تواصل <br /><span className="italic text-primary">معنا.</span></>
              ) : (
                <>Get in <br /><span className="italic text-primary">touch.</span></>
              )}
            </h1>
            <p className="font-body-lg text-sm md:text-base text-on-surface-variant max-w-lg mb-12">
              {t("contact_desc")}
            </p>
          </div>
          <div className="lg:col-span-5 relative h-[450px] lg:h-[650px] w-full mt-12 lg:mt-0">
            <div className="absolute inset-0 rounded-[40px] overflow-hidden shadow-xl">
              <img
                alt="Contact Us Imagery"
                className="w-full h-full object-cover object-center"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCa93QaNrzuqf8BTS9cL73hHFgfDlDqRtlQ1bI83fo8MT9RCwKt6FH27lRvNMWg2Kvc-ltNGLPt2CGQPpHDr391HEizLDT4H6_BAT8gzXAM8k1389fYoemKz1-vBpCQb1TbeLkg6wFxsrbyAYvKlWyJbQYKKuYeobqDun4ydCwUzNCP6CLKjnzy_yZfPvgo4BZ57KZzvlBEVnDmp0HNdqgi0dN1OiF5oqWPtPJ2KHqCiw1KrWzeeBU60gxOyoNCRypXMDcKniepy6YRFo0"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-8 -start-4 glass-card rounded-full px-6 py-3 flex items-center gap-3 shadow-md z-20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0"></span>
              <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface">
                {t("contact_reply_badge")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Content Split */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Information Column */}
          <div className="flex flex-col justify-center lg:pe-12">
            <h2 className="font-headline-md text-2xl md:text-3xl mb-12">
              {t("contact_reach_out")}
            </h2>
            <div className="space-y-10">
              {/* Location */}
              <div className="flex items-start gap-6 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center shrink-0 group-hover:bg-primary-container transition-colors duration-300">
                  <span className="material-symbols-outlined text-primary group-hover:text-on-primary-container transition-colors" style={{ fontVariationSettings: '"FILL" 1' }}>
                    location_on
                  </span>
                </div>
                <div>
                  <h3 className="font-label-sm text-xs uppercase text-outline mb-2">
                    {t("contact_clinic_title")}
                  </h3>
                  <p className="font-body-lg text-sm md:text-base text-on-surface whitespace-pre-line">
                    {t("contact_clinic_desc")}
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-start gap-6 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center shrink-0 group-hover:bg-primary-container transition-colors duration-300">
                  <span className="material-symbols-outlined text-primary group-hover:text-on-primary-container transition-colors" style={{ fontVariationSettings: '"FILL" 1' }}>
                    chat
                  </span>
                </div>
                <div>
                  <h3 className="font-label-sm text-xs uppercase text-outline mb-2">
                    {t("contact_general_title")}
                  </h3>
                  <p className="font-body-lg text-sm md:text-base text-on-surface">hello@stitch.com</p>
                  <p className="font-body-lg text-sm md:text-base text-on-surface mt-1" dir="ltr">
                    WhatsApp: +33 1 23 45 67 89
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>
                    schedule
                  </span>
                </div>
                <div>
                  <h3 className="font-label-sm text-xs uppercase text-outline mb-2">
                    {t("contact_hours_title")}
                  </h3>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 font-body-md text-xs md:text-sm text-on-surface-variant">
                    <span>{t("contact_hours_mf")}</span>
                    <span dir="ltr">10:00 - 19:00</span>
                    <span>{t("contact_hours_sat")}</span>
                    <span dir="ltr">10:00 - 20:00</span>
                    <span>{t("contact_hours_sun")}</span>
                    <span className="text-outline-variant">{t("contact_hours_sun_time")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="mt-16 pt-8 border-t border-outline-variant/30">
              <h3 className="font-label-sm text-xs uppercase text-outline mb-6">
                {t("contact_connect_title")}
              </h3>
              <div className="flex gap-4">
                {["forum", "photo_camera", "video_library"].map((icon) => (
                  <a
                    key={icon}
                    className="w-10 h-10 rounded-full border border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary hover:bg-surface-container transition-all duration-300"
                    href="#"
                  >
                    <span className="material-symbols-outlined text-[20px]">{icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div>
            <div className="glass-panel p-8 md:p-12 rounded-[32px] shadow-lg relative overflow-hidden">
              <div className="absolute -top-20 -end-20 w-64 h-64 bg-primary-container/20 rounded-full blur-3xl pointer-events-none"></div>
              <h2 className="font-headline-md text-2xl md:text-3xl mb-8 relative z-10">
                {t("contact_form_title")}
              </h2>

              {isSubmitted ? (
                <div className="text-center py-12 flex flex-col items-center gap-4 relative z-10">
                  <span className="material-symbols-outlined text-5xl text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>
                    check_circle
                  </span>
                  <p className="font-body-md text-base text-on-surface font-semibold">
                    {t("contact_success")}
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 border border-outline px-6 py-2 rounded-full font-label-sm text-xs uppercase hover:bg-surface-container transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  {error && (
                    <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm">{error}</div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative flex flex-col-reverse">
                      <input
                        className="input-minimal w-full font-body-lg py-2 focus:ring-0"
                        id="firstName"
                        placeholder=" "
                        required
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <label className="font-label-sm uppercase tracking-wider text-xs text-on-surface-variant cursor-text mb-1" htmlFor="firstName">
                        {t("contact_label_fn")}
                      </label>
                    </div>
                    <div className="relative flex flex-col-reverse">
                      <input
                        className="input-minimal w-full font-body-lg py-2 focus:ring-0"
                        id="lastName"
                        placeholder=" "
                        required
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                      <label className="font-label-sm uppercase tracking-wider text-xs text-on-surface-variant cursor-text mb-1" htmlFor="lastName">
                        {t("contact_label_ln")}
                      </label>
                    </div>
                  </div>

                  <div className="relative flex flex-col-reverse">
                    <input
                      className="input-minimal w-full font-body-lg py-2 focus:ring-0"
                      id="email"
                      placeholder=" "
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="font-label-sm uppercase tracking-wider text-xs text-on-surface-variant cursor-text mb-1" htmlFor="email">
                      {t("contact_label_email")}
                    </label>
                  </div>

                  <div className="relative flex flex-col-reverse">
                    <div className="relative">
                      <select
                        className="input-minimal w-full font-body-lg py-2 focus:ring-0 appearance-none bg-transparent cursor-pointer text-on-surface pe-8"
                        id="subject"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      >
                        <option disabled value=""></option>
                        <option value="treatment">{t("contact_subj_treatment")}</option>
                        <option value="booking">{t("contact_subj_book")}</option>
                        <option value="press">{t("contact_subj_press")}</option>
                        <option value="other">{t("contact_subj_other")}</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center text-primary">
                        <span className="material-symbols-outlined">expand_more</span>
                      </div>
                    </div>
                    <label className="font-label-sm uppercase tracking-wider text-xs text-on-surface-variant mb-1" htmlFor="subject">
                      {t("contact_label_subj")}
                    </label>
                  </div>

                  <div className="relative flex flex-col-reverse">
                    <textarea
                      className="input-minimal w-full font-body-lg py-2 focus:ring-0 resize-none"
                      id="message"
                      placeholder=" "
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    <label className="font-label-sm uppercase tracking-wider text-xs text-on-surface-variant cursor-text mb-1" htmlFor="message">
                      {t("contact_label_msg")}
                    </label>
                  </div>

                  <div className="pt-6">
                    <button
                      className="w-full md:w-auto px-10 py-4 bg-on-surface text-white rounded-full font-label-sm text-xs uppercase tracking-widest hover:bg-primary transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-60"
                      type="submit"
                      disabled={loading}
                    >
                      <span>{loading ? t("auth_loading") : t("contact_btn_send")}</span>
                      <span className="material-symbols-outlined group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300 rtl:rotate-180">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="w-full h-[350px] md:h-[550px] rounded-[32px] overflow-hidden shadow-lg relative grayscale-[20%] sepia-[10%]">
          <img
            alt="Map showing Paris boutique location"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCivLes9YFsfeiIRiaYoHukhTycvYeG7vMIaPOUdXGGNypLiSgKVLBjpMjGTaqZsMRuyX7wIXvu0k_OJ7iu4mOg-M8GqEuqkKQYFw3ZQ-PLkTbMce6Jsg8O8T8mMvMO1xYIE7Cp0RNZZ665wXtQ7F3BjDtCQlwJ_F6nKZTrCo3OBEHpQBsDrOXL7JK4SDyWIDViTbIe5tEvQdFZgN59sy6LhdRfEFp30MWzdJGeT5LO443mjvgxzVwToqcdpe1mXqyfh-FIohJvYk_S"
          />
          {/* Map Pin Overlay */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-12 h-12 bg-on-surface rounded-full flex items-center justify-center text-white mb-2 shadow-lg animate-bounce">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>
                medical_services
              </span>
            </div>
            <div className="glass-card px-4 py-2 rounded-lg font-label-sm text-on-surface uppercase tracking-widest text-[10px] font-bold">
              {t("contact_map_pin")}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
