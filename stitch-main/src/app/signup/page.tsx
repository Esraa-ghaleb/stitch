"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth, ApiError } from "@/context/AuthContext";

export default function SignUpPage() {
  const { t } = useLanguage();
  const { register, user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (!authLoading && user) router.replace("/");
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError(t("auth_password_mismatch"));
      return;
    }
    setLoading(true);
    try {
      await register(name, email, password);
      router.push("/");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t("auth_error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[100px] md:pt-[120px] pb-24 max-w-md mx-auto px-6">
      <div className="text-center mb-10">
        <h1 className="font-headline-lg text-3xl md:text-4xl text-on-surface mb-3">
          {t("auth_signup_title")}
        </h1>
        <p className="font-body-md text-sm text-on-surface-variant">
          {t("auth_signup_subtitle")}
        </p>
      </div>

      <div className="glass-card rounded-3xl p-8 shadow-lg">
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant">
              {t("auth_name")}
            </label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant">
              {t("auth_email")}
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant">
              {t("auth_password")}
            </label>
            <input
              required
              type="password"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant">
              {t("auth_confirm_password")}
            </label>
            <input
              required
              type="password"
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-on-surface text-white font-label-sm text-xs uppercase tracking-widest py-4 rounded-xl hover:bg-primary transition-colors disabled:opacity-60 cursor-pointer"
          >
            {loading ? t("auth_loading") : t("auth_signup_btn")}
          </button>
        </form>
        <p className="text-center mt-6 text-sm text-on-surface-variant">
          {t("auth_has_account")}{" "}
          <Link href="/signin" className="text-primary font-semibold hover:underline">
            {t("nav_signin")}
          </Link>
        </p>
      </div>
    </div>
  );
}
