"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { api, serviceTitle, Cart } from "@/lib/api";

export default function CartPage() {
  const { t, language } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/signin");
      return;
    }
    api.cart
      .get()
      .then((res) => setCart(res.data.cart))
      .catch(() => setError(t("error_loading")))
      .finally(() => setLoading(false));
  }, [user, authLoading, router, t]);

  const updateQty = async (itemId: string, quantity: number) => {
    setUpdating(itemId);
    try {
      const res = await api.cart.updateItem(itemId, quantity);
      setCart(res.data.cart);
    } catch {
      setError(t("error_loading"));
    } finally {
      setUpdating(null);
    }
  };

  const removeItem = async (itemId: string) => {
    setUpdating(itemId);
    try {
      const res = await api.cart.removeItem(itemId);
      setCart(res.data.cart);
    } catch {
      setError(t("error_loading"));
    } finally {
      setUpdating(null);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="pt-[120px] pb-24 text-center text-on-surface-variant">{t("loading")}</div>
    );
  }

  return (
    <div className="pt-[100px] md:pt-[120px] pb-24 max-w-4xl mx-auto px-6">
      <h1 className="font-headline-lg text-3xl md:text-5xl text-on-surface mb-8">{t("cart_title")}</h1>
      {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}

      {!cart?.items.length ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <p className="text-on-surface-variant mb-6">{t("cart_empty")}</p>
          <Link href="/services" className="text-primary underline text-sm uppercase tracking-widest">
            {t("continue_shopping")}
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {cart.items.map((item) => (
            <div key={item._id} className="glass-card rounded-2xl p-6 flex gap-6 items-center">
              <img
                src={item.service.imageUrl}
                alt={serviceTitle(item.service, language, t)}
                className="w-24 h-24 object-cover rounded-xl"
              />
              <div className="flex-grow">
                <h3 className="font-headline-md text-lg">{serviceTitle(item.service, language, t)}</h3>
                <p className="text-sm text-on-surface-variant">${item.service.price.toFixed(2)}</p>
                <div className="flex items-center gap-3 mt-3">
                  <button
                    disabled={updating === item._id}
                    onClick={() => updateQty(item._id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full border border-outline-variant/30 cursor-pointer"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    disabled={updating === item._id}
                    onClick={() => updateQty(item._id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full border border-outline-variant/30 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeItem(item._id)}
                className="text-xs text-on-surface-variant underline cursor-pointer"
              >
                {t("remove")}
              </button>
            </div>
          ))}
          <Link
            href={`/book?serviceId=${cart.items[0].service._id}`}
            className="block text-center bg-on-surface text-white py-4 rounded-full font-label-sm text-xs uppercase tracking-widest hover:bg-primary transition-colors"
          >
            {t("cart_checkout")}
          </Link>
        </div>
      )}
    </div>
  );
}
