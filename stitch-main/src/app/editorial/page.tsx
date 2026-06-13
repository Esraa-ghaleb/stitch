"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { api, EditorialPost } from "@/lib/api";

export default function EditorialPage() {
  const { t, language } = useLanguage();
  const [posts, setPosts] = useState<EditorialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.editorial
      .list()
      .then((res) => setPosts(res.data.posts))
      .catch(() => setError(t("error_loading")))
      .finally(() => setLoading(false));
  }, [t]);

  const getTitle = (post: EditorialPost) => {
    if (language === "ar" && post.titleAr) return post.titleAr;
    const translated = t(post.titleKey);
    return translated !== post.titleKey ? translated : post.titleEn;
  };

  const getDesc = (post: EditorialPost) =>
    language === "ar" && post.descAr ? post.descAr : post.descEn;

  const featured = posts.find((p) => p.featured) || posts[0];
  const others = posts.filter((p) => p._id !== featured?._id);

  if (loading) return <div className="pt-[120px] pb-24 text-center">{t("loading")}</div>;
  if (error) return <div className="pt-[120px] pb-24 text-center text-red-600">{error}</div>;

  return (
    <div className="pt-[100px] md:pt-[120px] pb-24">
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 mb-24 text-center">
        <p className="font-label-sm text-xs uppercase tracking-[0.2em] text-primary mb-4">Stitch Lifestyle</p>
        <h1 className="font-headline-lg text-4xl md:text-7xl text-on-surface mb-6 font-light">{t("editorial_title")}</h1>
        <p className="font-body-lg text-base md:text-xl text-on-surface-variant max-w-2xl mx-auto">{t("editorial_subtitle")}</p>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 md:px-10 space-y-24">
        {featured && (
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group">
            <div className="lg:col-span-7 relative aspect-[16/10] w-full rounded-3xl overflow-hidden img-zoom-container shadow-md">
              <img alt={getTitle(featured)} className="w-full h-full object-cover img-zoom" src={featured.imageUrl} />
            </div>
            <div className="lg:col-span-5 flex flex-col gap-4">
              <span className="font-label-sm text-xs uppercase tracking-wider text-primary font-semibold">{featured.readTime}</span>
              <h3 className="font-headline-md text-3xl text-on-surface">{getTitle(featured)}</h3>
              <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed">{getDesc(featured)}</p>
            </div>
          </article>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {others.map((post) => (
            <article key={post._id} className="flex flex-col gap-6 group">
              <div className="relative aspect-[3/2] w-full rounded-2xl overflow-hidden img-zoom-container shadow-md">
                <img alt={getTitle(post)} className="w-full h-full object-cover img-zoom" src={post.imageUrl} />
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-label-sm text-xs uppercase tracking-wider text-primary font-semibold">{post.readTime}</span>
                <h3 className="font-headline-md text-2xl text-on-surface">{getTitle(post)}</h3>
                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">{getDesc(post)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
