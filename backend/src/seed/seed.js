import dotenv from "dotenv";
import mongoose from "mongoose";
import { env } from "../config/env.js";
import Service from "../models/Service.js";
import Editorial from "../models/Editorial.js";
import Review from "../models/Review.js";

dotenv.config();

const services = [
  {
    slug: "prod-1",
    category: "face",
    titleKey: "prod_1_title",
    descKey: "prod_1_desc",
    titleEn: "Luminous Renewal Serum",
    titleAr: "مصل التجديد المضiء",
    descEn: "A potent blend of botanical extracts to restore youthful radiance.",
    descAr: "مزيج قوي من المستخلصات النباتية لاستعادة إشراقة الشباب.",
    duration: 60,
    price: 185,
    rating: 4.5,
    reviewsCount: 124,
    badgeKey: "Botanical",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_b8nWuUPL3HExIhAI9ezwAE0D3mzvCr0zb2FFEnLdF-KfEvm0KOLjzDnBVVbJGPhXnJYu7HKXsJWp-Nixq0-b9ijJbdeRJXbc2kePWVqTQZFGfA_2QCEim_N5-iKboTlCui1OzXM7zx1O6urXUIbIzcUTw8O1XEjRG1aEcb6qiNhjWC4uRVn-glpAwiktwHq4qYwv5FqStz-aLMqUnF2zhyB3ErFtBdLNGnCRA6CBWiMiqWH8RTtHAa4TWV0UmJXnQMp-yhOrGMtq",
    bannerUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB4NkFKS8YAEYoNX7MrIZSwJf1qqxWhZxhMdzqzUzBHZM-dIIAEebEXo4FWyEhSdVn8q9Wvj4ZD3KYPBnd_fVinYjhIvMXuGx5R7bqB1gblAMlB44ZRAjoqLY9enZFNvNTI_Xok67vNEMpOQHfSQeXeek-WbZLsiZonSbjPawtq0VPBcbWDJTjpO28yhdiiuAz2qNUWGwxqkx2e3GATGracofQwm166jqPRcJHCa2T6c93qWWSkGGcyH7Qgh2yCI_i_tafIvwgC3xUmOmA",
    processDescEn:
      "Experience the epitome of skincare luxury with our signature facial treatment.",
    processDescAr: "جربي قمة الفخامة في العناية بالبشرة مع علاج الوجه المميز لدينا.",
    ingredientsEn: "Colloidal Gold, Hyaluronic Acid, Squalane, Rosehip Seed Oil, Peptides.",
    aftercareEn: "Avoid direct sun for 24 hours. Use SPF daily.",
  },
  {
    slug: "prod-2",
    category: "face",
    titleKey: "prod_2_title",
    descKey: "prod_2_desc",
    titleEn: "Restorative Night Cream",
    titleAr: "كريم الليل المجدد",
    descEn: "Deep hydration and cellular repair while you sleep.",
    descAr: "ترطيب عميق وإصلاح خلوي أثناء النوم.",
    duration: 45,
    price: 210,
    rating: 5,
    reviewsCount: 89,
    badgeKey: "Laser",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCrMcsEmPkQOBN4ixmUuSHaoAPmCDx6_6OozWWq5GMqRNA58oYas-EzSwAXvb2MWmDrmr6xdrcpva1uvAAqYhkPYxL_KVmZfkIxS59sc-OM1rQEIHMBwNI4Xt7eE5vp-rmt1Kn6tBrYsoCCyO6-TwDsm7ipt6GAp-37NZj3BiTl3Cmcnhvwl8oJaTV8rSTEkz7AZfu8B3MTTyu6dQGb6kkh2dKGtL2CJOiEtfAfGPCmvnMuAB24QcVuh8wfDMfJWwGoiXC6GY4xcX-5",
    duration: 45,
  },
  {
    slug: "prod-3",
    category: "body",
    titleKey: "prod_3_title",
    descKey: "prod_3_desc",
    titleEn: "Botanical Body Oil",
    titleAr: "زيت الجسم النباتي",
    descEn: "Nourishing essential oils for an all-over healthy glow.",
    descAr: "زيوت أساسية مغذية لتوهج صحي شامل.",
    duration: 90,
    price: 85,
    rating: 4,
    reviewsCount: 215,
    badgeKey: "Holistic",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBx-IKFKQ6vGB1NwfUPwam8nLIMYGhd4r0ZRgP4Yt7DCcbJ57II80SXm5ZorLrW4E5n6LwBbraBYpLNuKQF1rSoWMoMUteClBlOR3jdPp8nmwv4FQhM0uEtmq9QYwFZLwocE0OW8bDZkxNa_ZDWhu3o5kKawuypwWyXmfTY2DkbZ7qIgLZwa0OJXFHAuoYLX74JyBae_EPfP2A7BotwGcRDPtoTIaiG1tanFjgAIxtmfag9udlTLZnpNGLYtnpUyyek5ytr7p_fmQY2",
    bannerUrl:
      "https://lh3.googleusercontent.com/aida/AP1WRLusTG301Gttm_dxnbFgbtk1cP6lNk6GMR467RBM7TC0KMl5A-qA76hL42rQXWYGMIQPXP_6dqvOZBzPkVhFchjd1pzf0yUnMMGFGiotWk8gjEaZm2p2is2092ikRs3NP407n9TJ6yxHAFC-7Y2adcxWCLx5spUsTFloHA8_RBXDGpIVZ8NOmzk70zZRZ0ySDPZtD0ekIT-_A_MCDJ2VVcMZSqACQDoCvZxl9gwCYazvckDgA-YvcJUe8cWQ",
  },
  {
    slug: "prod-4",
    category: "body",
    titleKey: "prod_4_title",
    descKey: "prod_4_desc",
    titleEn: "Purifying Clay Mask",
    titleAr: "قناع الطين المنقي",
    descEn: "Detoxifying French green clay for clear, refined pores.",
    descAr: "طين أخضر فرنسي مزيل للسموم لمسام نقية وصافية.",
    duration: 30,
    price: 65,
    rating: 4.5,
    reviewsCount: 62,
    badgeKey: "Purifying",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC4i7r7qLPvAtVkzOszbYpxT81k9yURCEu9z24V3iwOHe1cMI_mQ0CVag31G4ydWiuzS1F9RpFiw0EBRXjKqNuRzuy-ugunm_eAjEpMTviml5NaBwXiSlzvJPBLOZonEx99DoAfdKgt92g63UZOcr3bf9r15GCtCdUYhgziYVPDjI5DN7Pw0w9zWvA-HGL8qACIM-YJ39YDTqpna_nqj_CvmYcg4Xd3EKGQao3icMeK97mwCfi_qixPosgS_jXWpAEJIT16T-VTu83U",
  },
  {
    slug: "face-1",
    category: "face",
    titleKey: "treatment_detail_title",
    descKey: "treatment_detail_desc",
    titleEn: "Luminous Rose Serum Facial",
    titleAr: "سيروم الورد المضiء",
    descEn: "Deep hydration for a luminous, resilient complexion.",
    descAr: "ترطيب عميق لبشرة مشرقة ومرنة.",
    duration: 60,
    price: 95,
    rating: 5,
    reviewsCount: 128,
    badgeKey: "Best Seller",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCNlkHUwNHQweYfy2BXieNd11i0nf6P1tcnDJWLuYg24ssSwGnau9SLyCDE8e1tix_-Prdua65FuRHesaMcksRW_KfSNQfvpDhrvSgq8pIQvHtya1TpJ5hJtTrpPlp_pcYgapEFdASkJzvfjnUemCpeY82HqUIfGAhL8WbfhfCs7nrAVzXLU4ICVGjsPtHo5HNwPF71X_zwQUYVLvm-HpcJglDrLFJImqJFe2wYvkDdsUaWmfQJLUahzpbWzAzxA-48ZZJfJu87eZ4UQrg",
    processDescEn:
      "Experience the epitome of skincare luxury with our Aurum Nourishing Cream treatment.",
    ingredientsEn: "Colloidal Gold, Hyaluronic Acid Complex, Squalane, Rosehip Seed Oil, Peptides.",
    aftercareEn: "Avoid direct sun for 24 hours. Use SPF daily.",
  },
  {
    slug: "face-2",
    category: "face",
    titleEn: "Velvet Nourish Cream",
    titleAr: "كريم التغذية المخملي",
    descEn: "Rich, restorative hydration that melts into the skin.",
    descAr: "ترطيب غني ومجدد يذوب في البشرة.",
    duration: 90,
    price: 185,
    rating: 4.5,
    reviewsCount: 45,
    badgeKey: "New",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD61wAE_OxGutYAVxuKGOcWrggQ3q9ZeC-Kvt19HVpWp3Tu51HLpSxyxxa31R-vIaS2mF_RFHCbc5uimp16nsIgRhdkPGq4L-LjzHLzxmaYcJ8UG2Oue6LmBxZ5-o7Q2LhTUVWjofYLjjzh5c_rGDqjFPP4pwhCUoe_2s0-LQ0806VvwFxZA8AVvG_27Z8LhznjzL1rAiwjhdYmmX9M-brwmGTM7bL2GMGPfpQyMu9TYZfIJnLUToTRPpyOAc3Mccyhs6cO0_QzRqDZDfs",
    titleKey: "prod_2_title",
    descKey: "prod_2_desc",
  },
  {
    slug: "face-3",
    category: "face",
    titleEn: "Purifying Silk Cleanser",
    titleAr: "منظف الحرير المنقي",
    descEn: "A gentle, foaming gel that removes impurities.",
    descAr: "جل رغوي لطيف يزيل الشوائب.",
    duration: 30,
    price: 65,
    rating: 5,
    reviewsCount: 312,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDK6l5YJX4AmNOnXdiqMHHucOcglM4fyiMTqh9eUtK4yQyLhGNxGpGcP0Dfx8QzViyuMVTufkUz8SMGT7kWihRQtwSiGjacl3FdeVTMBxsPeKpJSBxC6KfEOJYkOpi8GyPiM8DiTF9QuMAO_DmjPcj1erqJ-vFfSe9H7IN-MewNqB_mX5MUAqOOLUnJF4EtqWBeJ3Z-6sk8D2qaOF09Q9a8xaVHv6RDF8YqSwMkT5KYPBl5gCPHs4MSQHxZQwdeEyRvjJ4uVoHkNoU5QF0",
    titleKey: "prod_4_title",
    descKey: "prod_4_desc",
  },
  {
    slug: "body-1",
    category: "body",
    titleEn: "Hydrating Body Massage",
    titleAr: "مساج مرطب للجسم",
    descEn: "Deep moisture with a lightweight feel.",
    descAr: "ترطيب عميق بملمس خفيف.",
    duration: 60,
    price: 120,
    rating: 5,
    reviewsCount: 98,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDymvUak45VxnrfpcKUABzprsm4mrENxsdmXLTVCZb9RnzBAjdZ9a2ziunDsVMR9Tsxdxk5LCNT_8kiWYthNv5OEtY1-rm3jJwUOqMBiqcET31QM0cTeRSnl_BPQwYZDG4hPH0fz5bsSqPDDV4Aic6OgMfC283Utw_UpYFTDZhkSRpJ9T5qiJkNpV1bcKDEl21qiP4I1GSafAet3IkxAytkUOYCcLzTFFCj9TZVP8YYSLnT7hLDKbU7hXk3JhjWNxfxF8Rt0NP9x7am",
    titleKey: "prod_3_title",
    descKey: "prod_3_desc",
  },
  {
    slug: "body-2",
    category: "body",
    titleEn: "Mineral Body Scrub Ritual",
    titleAr: "طقوس تقشير الجسم المعدنية",
    descEn: "Exfoliating sea salt blend for radiant skin.",
    descAr: "مزيج ملح البحر المقشر لبشرة مشرقة.",
    duration: 90,
    price: 150,
    rating: 4.9,
    reviewsCount: 76,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDNYFTbaiuBeFEx7LQFZEJx_TjtyFXk5z0vv43AOForUHdlB6RzQiFs6rxPFE6CQgcy0ciZyJV5Mi2Rqgsvk_jfUXPyWm7B5rzl0jrXsisw4rIeVVWS3lnX3xlT3qk7F65RxHqCsI2fh0YWFUIQRiyj9AkB-5qYHjEBp4Io2NP8Q4JoP4c1ghjecbwv3uMoLLq_dLvoaLSNNqWx3P2gmuZiCfrMsmOFA0gJu0zDRZXtRBzOmLU1islvUZRoiUIzh64yYppwrcLuLBpO",
    titleKey: "prod_4_title",
    descKey: "prod_4_desc",
  },
  {
    slug: "body-3",
    category: "body",
    titleEn: "Nourishing Body Oil Treatment",
    titleAr: "علاج زيت الجسم المغذي",
    descEn: "Intense hydration with a luminous finish.",
    descAr: "ترطيب مكثف بلمسة نهائية مشرقة.",
    duration: 120,
    price: 180,
    rating: 5,
    reviewsCount: 142,
    badgeKey: "Bestseller",
    imageUrl:
      "https://lh3.googleusercontent.com/aida/AP1WRLvaVOlClm9myi40UsWdDrAJjMpTDZVDYSyvNE_gRxYvfbIso8qRK1HWqqjrNww5KDwQfB-XsVPX5yFVtQUXiSASHO9Dsho6BgcIpDZEgH6T53Aw4hUihRAmBDv84MFeI35vdkfvJrZODMU6pz98NygNZIKDDOunVxk5GK_O3L8OpmB4A7uGb-ae2VI_AeaAAC_t4facxvDEMGMWFppBeFTdYeQLn6iVKiBEgF723dLp5PCd9O3gWeJkBRA",
    titleKey: "prod_3_title",
    descKey: "prod_3_desc",
  },
  {
    slug: "hair-1",
    category: "hair",
    titleKey: "hair_cut_title",
    descKey: "hair_cut_desc",
    titleEn: "Signature Precision Cut",
    titleAr: "قصة التوقيع الدقيقة",
    descEn: "Tailored precision cutting customized to suit your facial structure.",
    descAr: "قص دقيق ومخصص ليناسب ملامح وجهك.",
    duration: 60,
    price: 120,
    rating: 5,
    reviewsCount: 94,
    badgeKey: "Styling",
    imageUrl:
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=800&auto=format&fit=crop",
    bannerUrl:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "hair-2",
    category: "hair",
    titleKey: "hair_color_title",
    descKey: "hair_color_desc",
    titleEn: "Botanical Color & Gloss",
    titleAr: "لون نباتي ولمعان طبيعي",
    descEn: "Rich, plant-powered coloring treatments.",
    descAr: "علاجات تلوين نباتية غنية.",
    duration: 120,
    price: 185,
    rating: 4.9,
    reviewsCount: 78,
    badgeKey: "Coloring",
    imageUrl:
      "https://images.unsplash.com/photo-1605497746444-ac9dbd324ce4?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "hair-3",
    category: "hair",
    titleKey: "hair_keratin_title",
    descKey: "hair_keratin_desc",
    titleEn: "Keratin Restoration",
    titleAr: "علاج الكيراتين المجدد",
    descEn: "Deep restructuring therapy designed to eliminate frizz.",
    descAr: "علاج مكثف لإعادة بناء الشعر.",
    duration: 90,
    price: 300,
    rating: 5,
    reviewsCount: 112,
    badgeKey: "Treatment",
    imageUrl:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "hair-4",
    category: "hair",
    titleKey: "hair_detox_title",
    descKey: "hair_detox_desc",
    titleEn: "Scalp Health Detox",
    titleAr: "ديتوكس وصحة فروة الرأس",
    descEn: "A purifying, soothing therapy to cleanse pores.",
    descAr: "علاج مطهر ومهدئ لتنظيف فروة الرأس.",
    duration: 45,
    price: 75,
    rating: 4.8,
    reviewsCount: 45,
    badgeKey: "Clinic",
    imageUrl:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "spec-1",
    category: "specialty",
    titleEn: "Complete Bridal Package",
    titleAr: "باقة العروس المتكاملة",
    descEn: "A comprehensive bridal styling session.",
    descAr: "جلسة تصفيف شاملة للعروس.",
    duration: 240,
    price: 450,
    rating: 5,
    reviewsCount: 64,
    imageUrl:
      "https://lh3.googleusercontent.com/aida/AP1WRLt3lEAjN3VZ0wYMvKfk-v4urE3JYklreECQ11WT3-h_EEWU_Bb4B4EASCAS3VIF8KJLlOeBkup3UmCIRJj85VMWwAy4hwkPRpHFb0opAw3FcGpGalOFQYGuGYUXQa-PT-8D7hfo4FPYLaaoUnh2RNnE7NMVh0ucRnLL2Al-X1vdFqoUWqkXf_O8UT5v0dyRswCYQFrWl0JFTBr6j_BPUXk3lOKY4PgwF_S41HAUImdPG4ZfrgpVcxPlSPc",
    bannerUrl:
      "https://lh3.googleusercontent.com/aida/AP1WRLt3lEAjN3VZ0wYMvKfk-v4urE3JYklreECQ11WT3-h_EEWU_Bb4B4EASCAS3VIF8KJLlOeBkup3UmCIRJj85VMWwAy4hwkPRpHFb0opAw3FcGpGalOFQYGuGYUXQa-PT-8D7hfo4FPYLaaoUnh2RNnE7NMVh0ucRnLL2Al-X1vdFqoUWqkXf_O8UT5v0dyRswCYQFrWl0JFTBr6j_BPUXk3lOKY4PgwF_S41HAUImdPG4ZfrgpVcxPlSPc",
    titleKey: "cat_specialty",
    descKey: "cat_specialty",
  },
  {
    slug: "spec-2",
    category: "specialty",
    titleEn: "Professional Makeup Session",
    titleAr: "جلسة مكياج احترافية",
    descEn: "Expert makeup application tailored to your features.",
    descAr: "تطبيق مكياج احترافي يناسب ملامحك.",
    duration: 90,
    price: 120,
    rating: 4.9,
    reviewsCount: 118,
    badgeKey: "Popular",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCa93QaNrzuqf8BTS9cL73hHFgfDlDqRtlQ1bI83fo8MT9RCwKt6FH27lRvNMWg2Kvc-ltNGLPt2CGQPpHDr391HEizLDT4H6_BAT8gzXAM8k1389fYoemKz1-vBpCQb1TbeLkg6wFxsrbyAYvKlWyJbQYKKuYeobqDun4ydCwUzNCP6CLKjnzy_yZfPvgo4BZ57KZzvlBEVnDmp0HNdqgi0dN1OiF5oqWPtPJ2KHqCiw1KrWzeeBU60gxOyoNCRypXMDcKniepy6YRFo0",
    titleKey: "cat_specialty",
    descKey: "cat_specialty",
  },
];

const editorials = [
  {
    slug: "art-of-slow-skincare",
    titleKey: "editorial_post_1_title",
    titleEn: "The Art of Slow Skincare",
    titleAr: "فن العناية البطيئة بالبشرة",
    descEn: "Discover how intentional rituals transform daily skincare into profound self-care.",
    descAr: "اكتشفي كيف تحول الطقوس الواعية العناية اليومية إلى رعاية ذاتية عميقة.",
    readTime: "6 Min Read",
    featured: true,
    sortOrder: 1,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCo4aAiofl4r9H6rcHe3LCi_l1A61KjkC-QKMkojO2he28wH0OwkzugtwIbSHQ0cZHanRNmFnkj-oVJjvJBNRsqUxiurL329bDmwoEy2usjEFoBiQ8lSb4fyIEGhDBeCBc_-4Ow_1HWAzHjyRR0euLj_NOtZUS5a9Kt9DpiSYATG76VSEI7jaat4clfMufkHQqVKRZt-Ysi_IQ58OO1smrfvoDmrJ2ZaVLKHIrH3JN_Oxe22mihXSijMAxCl6W3lS65xeuel1r9CXwx",
  },
  {
    slug: "inside-botanical-lab",
    titleKey: "editorial_post_2_title",
    titleEn: "Inside the Botanical Lab",
    titleAr: "داخل المختبر النباتي",
    descEn: "A behind-the-scenes look at how we source and formulate our signature treatments.",
    descAr: "نظرة خلف الكواليس على كيفية sourcing وformulation علاجاتنا المميزة.",
    readTime: "5 Min Read",
    sortOrder: 2,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuFrxI-4jAHcisglKd9WpbrK7Rk2VmjzV7IyoUXFCS9RE1i-ayhFNO0VVMndX1dpbLKVZ3q6Atf0-sICnkuL33VDmgUBWohcQ0G62QCXOSVmlt2bda9-XwqZq09oDZC2rPh5bEAuDc65CYUAYCm1elSVAIv6CRLIjjgNzejk9lqKQfyPeZfDLlbrMH4VHfFldmuG-DChubfFwZVNuZMIk33IoX5UnXY1N1AjRSsUo0PZiZU7bURebkuto4SJEzU-nsGgjguWq_zwRlw",
  },
  {
    slug: "eastern-aromatherapy",
    titleEn: "Rituals of Eastern Aromatherapy",
    titleAr: "طقوس العطور الشرقية",
    descEn: "How deep essential scents enhance your daily calmness and mental wellbeing.",
    descAr: "كيف يمكن للزيوت العطرية أن تؤثر على هدوئك اليومي.",
    readTime: "8 Min Read",
    sortOrder: 3,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrl2pj1LIRRIbVo12r4HjJ68SmXs3iB1rNOOPpmbS6zCA6p7G-qCOfHW-kp7cjateqNBV44wOjWfDNlp8P-do61xc_w4Rc2DfMpgbOsi8UerBibq30C7JPAagT6M6kdDefSnySC8SpmEPSqY9Py_vaYw7pLJj9i3Zve9gjVn4HzCSIMYSeWkc-qjtliVSpUF3s04QZqvK3BIo4E3GRBQE2IOKjHdupwOyXXFGU1M4qvQsREk27HCpTmwdxbLl_DussN07T7pkT7HeY",
    titleKey: "editorial_post_3_title",
  },
];

const defaultReviews = [
  {
    serviceSlug: "face-1",
    authorName: "Elena V.",
    title: "Absolute Perfection",
    text: "This treatment has completely transformed my skin. Truly a luxurious experience.",
    rating: 5,
  },
  {
    serviceSlug: "face-1",
    authorName: "Sarah M.",
    title: "Worth Every Penny",
    text: "The subtle scent is gorgeous, and my skin feels incredibly soft.",
    rating: 5,
  },
  {
    serviceSlug: "face-1",
    authorName: "Chloe R.",
    title: "Deeply Hydrating",
    text: "Provides lasting hydration throughout the day. Exquisite treatment.",
    rating: 4,
  },
];

async function seed() {
  await mongoose.connect(env.mongodbUri);
  console.log("Connected for seeding...");

  await Service.deleteMany({});
  await Editorial.deleteMany({});
  await Review.deleteMany({});

  const createdServices = await Service.insertMany(services);
  console.log(`Seeded ${createdServices.length} services`);

  await Editorial.insertMany(editorials);
  console.log(`Seeded ${editorials.length} editorial posts`);

  const faceService = createdServices.find((s) => s.slug === "face-1");
  if (faceService) {
    for (const r of defaultReviews) {
      await Review.create({ ...r, service: faceService._id, serviceSlug: undefined });
    }
    console.log(`Seeded ${defaultReviews.length} reviews`);
  }

  console.log("Seed complete!");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
