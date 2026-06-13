"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextProps {
  language: Language;
  dir: "ltr" | "rtl";
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    nav_home: "Home",
    nav_about: "About",
    nav_services: "Services Hub",
    nav_booking: "Booking",
    nav_contact: "Contact",
    nav_products: "Products",

    // Hero Section
    hero_subtitle: "Curated Elegance",
    hero_title: "Luxury Beauty Collection",
    hero_desc: "Discover our meticulously curated selection of premium skincare, haircare, and body essentials designed to elevate your daily ritual.",
    hero_cta: "Explore Collection",
    hero_book: "Book Appointment",
    hero_services: "Explore Services",

    // Home Editorial
    home_philosophy_title: "Stitch Philosophy",
    home_philosophy_desc: "Inspired by you and wanted to turn everyday care into a special ritual.",
    home_mission_title: "Brand Mission",
    home_mission_desc: "The brand's goal is to give a feeling of luxury spa care without being over the top. We want to focus on the skincare experience and packaging should not be distracting.",
    home_learn_more: "Learn More",

    // Categories
    cat_face: "Face",
    cat_face_desc: "Rejuvenating serums and moisturizers.",
    cat_hair: "Hair Care & Styling",
    hair_subtitle: "THE ART OF HAIR",
    hair_desc: "Precision cutting, bespoke coloring, and advanced restorative hair treatments designed to reflect your personal style.",
    hair_explore: "Explore Collection",
    hair_collections_title: "The Collections",
    hair_quote: "Hair is the richest ornament of women.",
    hair_quote_author: "MARTIN LUTHER",
    hair_cut_title: "Signature Precision Cut",
    hair_cut_desc: "Tailored precision cutting customized to suit your facial structure, hair texture, and individual personality.",
    hair_color_title: "Botanical Color & Gloss",
    hair_color_desc: "Rich, plant-powered coloring treatments that impart vibrant tone and radiant gloss while protecting hair health.",
    hair_keratin_title: "Keratin Restoration",
    hair_keratin_desc: "Deep restructuring therapy designed to eliminate frizz, seal hair cuticles, and restore luxurious smoothness.",
    hair_detox_title: "Scalp Health Detox",
    hair_detox_desc: "A purifying, soothing therapy to cleanse pores, remove product build-up, and revitalize your scalp's ecosystem.",
    cat_body: "Body",
    cat_other: "Other",
    cat_specialty: "Specialty Services",
    cat_accessories: "Accessories",
    view_all: "View All Categories",

    // Filter & Sort
    filter_all: "All",
    sort_by: "Sort By:",
    sort_newest: "Newest",
    sort_price_low: "Price: Low to High",
    sort_price_high: "Price: High to Low",

    // Product Cards / Services
    badge_new: "New",
    badge_bestseller: "Bestseller",
    add_to_cart: "Add to Cart",
    book_now: "Book Now",
    prod_1_title: "Luminous Renewal Serum",
    prod_1_desc: "A potent blend of botanical extracts to restore youthful radiance.",
    prod_2_title: "Restorative Night Cream",
    prod_2_desc: "Deep hydration and cellular repair while you sleep.",
    prod_3_title: "Botanical Body Oil",
    prod_3_desc: "Nourishing essential oils for an all-over healthy glow.",
    prod_4_title: "Purifying Clay Mask",
    prod_4_desc: "Detoxifying French green clay for clear, refined pores.",

    // About Page (Spotlight Edition)
    about_hero_title: "The Art of <br/><i class='text-primary font-serif'>Elegance</i>",
    about_hero_desc: "Established in 2018, Stitch is a luxury clinic and salon dedicated to aesthetic excellence and holistic beauty.",
    about_card1_title: "Our Identity & Craft",
    about_card1_desc: "Stitch is a sanctuary of aesthetic excellence. We blend advanced clinic technology with holistic salon rituals to offer bespoke facial, body, and hair treatments tailored to your unique essence.",
    about_card2_title: "Our Vision",
    about_card2_desc: "To redefine the standard of luxury beauty by creating a space where profound relaxation meets visible results, empowering every woman to radiate confidence and grace.",

    // Contact Page
    contact_title: "Get in touch.",
    contact_desc: "Whether you're inquiring about our premium treatments, booking a bespoke consultation, or simply sharing your thoughts, we're here to listen.",
    contact_reply_badge: "We usually reply within 24h",
    contact_reach_out: "Reach out directly",
    contact_clinic_title: "Our Clinic Location",
    contact_clinic_desc: "124 Avenue des Champs-Élysées\n75008 Paris, France",
    contact_general_title: "Contact & WhatsApp",
    contact_hours_title: "Clinic Hours",
    contact_hours_mf: "Monday - Friday",
    contact_hours_sat: "Saturday",
    contact_hours_sun: "Sunday",
    contact_hours_sun_time: "Closed",
    contact_connect_title: "Connect Digitally",
    contact_form_title: "Send a message",
    contact_label_fn: "First Name",
    contact_label_ln: "Last Name",
    contact_label_email: "Email Address",
    contact_label_subj: "Subject",
    contact_subj_treatment: "Treatment Inquiry",
    contact_subj_book: "Appointment Booking",
    contact_subj_press: "Press & Media",
    contact_subj_other: "Other",
    contact_label_msg: "Your Message",
    contact_btn_send: "Send Inquiry",
    contact_map_pin: "Stitch Clinic",

    // Booking Details / Process
    treatment_detail_title: "Signature Treatment Details",
    treatment_detail_desc: "Deep hydration for a luminous, resilient complexion.",
    treatment_reviews: "(128 Reviews)",
    treatment_quantity: "Quantity",
    treatment_book: "Book Session",
    treatment_view_schedule: "View Schedule",
    treatment_the_process: "The Process",
    treatment_tech_materials: "Technology & Materials",
    treatment_aftercare: "Aftercare",
    treatment_verdict: "The Verdict",
    treatment_community_saying: "What our community is saying.",
    treatment_review1_title: "\"Absolute Perfection\"",
    treatment_review1_text: "\"This cream has completely transformed my winter skin. The texture is divine—rich but sinks right in. My face looks plumper and feels incredibly soft. It's truly a luxurious experience every night.\"",
    treatment_review2_title: "\"Worth Every Penny\"",
    treatment_review2_text: "\"I was hesitant about the price, but a little goes a long way. The subtle scent is gorgeous, and it sits beautifully under makeup without pilling. My new holy grail.\"",
    treatment_review3_title: "\"Deeply Hydrating\"",
    treatment_review3_text: "\"A beautiful product. It provides lasting hydration throughout the day. I only gave it 4 stars because the jar is heavy for travel, but the cream itself is exquisite.\"",
    treatment_process_desc: "Experience the epitome of skincare luxury with our Aurum Nourishing Cream. Meticulously formulated to mimic the skin's natural lipid barrier, this ultra-rich yet surprisingly weightless cream absorbs instantly to deliver deep, lasting hydration.\n\nInfused with rare botanical extracts and advanced peptides, it works harmoniously to restore a youthful, radiant glow, leaving your complexion feeling extraordinarily soft, supple, and revitalized. A sensory ritual that transforms daily maintenance into an act of profound self-care.",

    // Secure Deposit / Checkout
    checkout_title: "Secure Appointment & Deposit",
    checkout_desc: "Complete your booking details to secure your appointment for our luxury services.",
    checkout_cust_info: "Customer Information",
    checkout_payment_method: "Payment Method",
    checkout_card_num: "Card Number",
    checkout_expiry: "MM / YY",
    checkout_cvc: "CVC",
    checkout_summary: "Booking Summary",
    checkout_subtotal: "Subtotal",
    checkout_shipping: "Shipping",
    checkout_taxes: "Taxes",
    checkout_calculated: "Calculated next step",
    checkout_total: "Total",
    checkout_confirm: "Confirm Booking & Deposit",
    checkout_agree: "By completing this order, you agree to our",
    checkout_secure: "SECURE CHECKOUT",

    // Confirmation
    confirm_title: "Appointment Confirmed.",
    confirm_desc: "Thank you for choosing Stitch. Your appointment has been successfully scheduled.",
    confirm_ref: "Booking Reference",
    confirm_status: "Status",
    confirm_specialist: "Specialist",
    confirm_datetime: "Date & Time",
    confirm_datetime_desc: "A confirmation email with calendar invite has been sent.",
    confirm_add_cal: "Add to Calendar",
    confirm_directions: "Get Directions",

    // Footer
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Service",
    footer_faq: "FAQ",
    footer_careers: "Careers",
    footer_copyright: "© 2024 Stitch. All rights reserved.",

    // Auth
    nav_signin: "Sign In",
    nav_signup: "Sign Up",
    nav_logout: "Logout",
    auth_signin_title: "Welcome Back",
    auth_signin_subtitle: "Sign in to manage your bookings and account.",
    auth_signup_title: "Create Account",
    auth_signup_subtitle: "Join Stitch for a personalized luxury experience.",
    auth_name: "Full Name",
    auth_email: "Email Address",
    auth_password: "Password",
    auth_confirm_password: "Confirm Password",
    auth_signin_btn: "Sign In",
    auth_signup_btn: "Create Account",
    auth_no_account: "Don't have an account?",
    auth_has_account: "Already have an account?",
    auth_password_mismatch: "Passwords do not match",
    auth_loading: "Please wait...",
    auth_error: "Something went wrong. Please try again.",

    // Booking flow
    booking_title: "Book Your Session",
    booking_subtitle: "Select your preferred treatment, date, and time.",
    booking_step_1: "Select Treatment",
    booking_step_2: "Review Summary",
    booking_step_3: "Secure Deposit",
    booking_name: "Full Name",
    booking_phone: "Phone Number",
    booking_email: "Email Address",
    booking_date: "Preferred Date",
    booking_time: "Preferred Time",
    booking_notes: "Special Notes",
    booking_pay: "Continue to Summary",
    booking_deposit: "Deposit Due Today",
    shop_categories: "Our Collections",

    // Summary / checkout
    continue_shopping: "Back to Services",
    your_selection: "Session Summary",
    remove: "Remove",
    summary: "Order Summary",
    selected_date: "Selected Date",
    selected_time: "Selected Time",
    discount_label: "Discount Code",
    apply: "Apply",
    total: "Total Due Today",
    checkout: "Proceed to Deposit",
    taxes: "Taxes calculated at checkout",

    // Editorial
    editorial_title: "Editorial",
    editorial_subtitle: "Stories, rituals, and inspiration from the world of Stitch.",
    editorial_read_time: "5 Min Read",
    editorial_post_1_title: "The Art of Slow Skincare",
    editorial_post_1_desc: "Discover how intentional rituals transform daily skincare into profound self-care.",
    editorial_post_2_title: "Inside the Botanical Lab",
    editorial_post_2_desc: "A behind-the-scenes look at how we source and formulate our signature treatments.",
    editorial_post_3_title: "Rituals of Eastern Aromatherapy",

    // Contact
    contact_success: "Your message has been sent. We'll reply within 24 hours.",

    // Cart
    cart_title: "Your Cart",
    cart_empty: "Your cart is empty",
    cart_checkout: "Book Selected Services",
    loading: "Loading...",
    error_loading: "Failed to load data. Please try again.",
  },
  ar: {
    // Navigation
    nav_home: "الرئيسية",
    nav_about: "من نحن",
    nav_services: "مركز الخدمات",
    nav_booking: "الحجز",
    nav_contact: "اتصل بنا",
    nav_products: "المنتجات",

    // Hero Section
    hero_subtitle: "أناقة منتقاة بعناية",
    hero_title: "مجموعة الجمال الفاخرة",
    hero_desc: "اكتشف مجموعتنا المنتقاة بدقة من أساسيات العناية بالبشرة والشعر والجسم الممتازة المصممة للارتقاء بروتينك اليومي.",
    hero_cta: "استكشف المجموعة",
    hero_book: "احجزي موعداً",
    hero_services: "استكشف الخدمات",

    // Home Editorial
    home_philosophy_title: "فلسفة ستيتش",
    home_philosophy_desc: "مستوحى منك، وأردنا تحويل العناية اليومية إلى طقوس خاصة.",
    home_mission_title: "مهمة العلامة التجارية",
    home_mission_desc: "هدف العلامة التجارية هو إعطاء شعور برعاية السبا الفاخرة دون المبالغة. نريد التركيز على تجربة العناية بالبشرة ويجب ألا يكون التغليف مشتتًا للانتباه.",
    home_learn_more: "اعرفي المزيد",

    // Categories
    cat_face: "الوجه",
    cat_face_desc: "أمصال ومرطبات مجددة للشباب.",
    cat_hair: "العناية بالشعر وتصفيفه",
    hair_subtitle: "فن الشعر والموضة",
    hair_desc: "قص دقيق وتلوين مخصص وعلاجات متطورة لاستعادة حيوية وصحة الشعر مصممة خصيصاً لتعكس أسلوبك الفريد.",
    hair_explore: "استكشاف المجموعة",
    hair_collections_title: "المجموعات الحصرية",
    hair_quote: "الشعر هو أغنى حلي وزينة للمرأة.",
    hair_quote_author: "مارتن لوثر",
    hair_cut_title: "قصة التوقيع الدقيقة",
    hair_cut_desc: "قص دقيق ومخصص بشكل فريد ليناسب ملامح وجهك، وبنية شعرك، وهويتك الفريدة.",
    hair_color_title: "لون نباتي ولمعان طبيعي",
    hair_color_desc: "علاجات تلوين نباتية غنية تمنح شعرك لوناً حيوياً ولمعاناً فائقاً مع الحفاظ التام على صحته وقوته.",
    hair_keratin_title: "علاج الكيراتين المجدد",
    hair_keratin_desc: "علاج مكثف لإعادة بناء الشعر، يقضي على التجعد، يغلق مسام الشعر، ويعيد إليه نعومته الفائقة.",
    hair_detox_title: "ديتوكس وصحة فروة الرأس",
    hair_detox_desc: "علاج مطهر ومهدئ لتنظيف فروة الرأس، وإزالة تراكمات المنتجات، وتحسين فروة رأسك لنمو شعر صحي.",
    cat_body: "الجسم",
    cat_other: "أخرى",
    cat_specialty: "خدمات تخصصية",
    cat_accessories: "إكسسوارات",
    view_all: "عرض جميع الفئات",

    // Filter & Sort
    filter_all: "الكل",
    sort_by: "ترتيب حسب:",
    sort_newest: "الأحدث",
    sort_price_low: "السعر: من الأقل للأعلى",
    sort_price_high: "السعر: من الأعلى للأقل",

    // Product Cards / Services
    badge_new: "جديد",
    badge_bestseller: "الأكثر مبيعاً",
    add_to_cart: "أضف للسلة",
    book_now: "احجز الآن",
    prod_1_title: "مصل التجديد المضيء",
    prod_1_desc: "مزيج قوي من المستخلصات النباتية لاستعادة إشراقة الشباب.",
    prod_2_title: "كريم الليل المجدد",
    prod_2_desc: "ترطيب عميق وإصلاح خلوي أثناء النوم.",
    prod_3_title: "زيت الجسم النباتي",
    prod_3_desc: "زيوت أساسية مغذية لتوهج صحي شامل.",
    prod_4_title: "قناع الطين المنقي",
    prod_4_desc: "طين أخضر فرنسي مزيل للسموم لمسام نقية وصافية.",

    // About Page (Spotlight Edition)
    about_hero_title: "فن <br/><i class='text-primary font-serif'>الأناقة</i>",
    about_hero_desc: "تأسست ستيتش في عام 2018، وهي عيادة وصالون فاخر يكرس جهوده للتميز الجمالي والجمال الشامل.",
    about_card1_title: "هويتنا وحرفتنا",
    about_card1_desc: "ستيتش هي ملاذ للتميز الجمالي. نمزج بين تكنولوجيا العيادات المتقدمة وطقوس الصالونات الشاملة لتقديم علاجات مخصصة للوجه والجسم والشعر مصممة لتناسب جوهرك الفريد.",
    about_card2_title: "رؤيتنا",
    about_card2_desc: "إعادة تعريف معيار الجمال الفاخر من خلال خلق مساحة يلتقي فيها الاسترخاء العميق مع النتائج المرئية، لتمكين كل امرأة من إشعاع الثقة والنعمة.",

    // Contact Page
    contact_title: "تواصل معنا.",
    contact_desc: "سواء كنت تستفسر عن علاجاتنا المتميزة، أو تحجز استشارة خاصة، أو تشاركنا أفكارك، نحن هنا للاستماع.",
    contact_reply_badge: "نرد عادة خلال ٢٤ ساعة",
    contact_reach_out: "تواصل معنا مباشرة",
    contact_clinic_title: "موقع عيادتنا",
    contact_clinic_desc: "١٢٤ شارع الشانزليزيه\n٧٥٠٠٨ باريس، فرنسا",
    contact_general_title: "التواصل وواتساب",
    contact_hours_title: "ساعات العمل",
    contact_hours_mf: "الاثنين - الجمعة",
    contact_hours_sat: "السبت",
    contact_hours_sun: "الأحد",
    contact_hours_sun_time: "مغلق",
    contact_connect_title: "تواصل رقمياً",
    contact_form_title: "أرسل رسالة",
    contact_label_fn: "الاسم الأول",
    contact_label_ln: "اسم العائلة",
    contact_label_email: "البريد الإلكتروني",
    contact_label_subj: "الموضوع",
    contact_subj_treatment: "استفسار عن العلاج",
    contact_subj_book: "حجز موعد",
    contact_subj_press: "الصحافة والإعلام",
    contact_subj_other: "أخرى",
    contact_label_msg: "رسالتك",
    contact_btn_send: "إرسال الاستفسار",
    contact_map_pin: "عيادة ستيتش",

    // Booking Details / Process
    treatment_detail_title: "تفاصيل الجلسة المميزة",
    treatment_detail_desc: "ترطيب عميق لبشرة مشرقة ومرنة.",
    treatment_reviews: "(128 مراجعة)",
    treatment_quantity: "الكمية",
    treatment_book: "احجز الجلسة",
    treatment_view_schedule: "عرض الجدول",
    treatment_the_process: "خطوات الجلسة",
    treatment_tech_materials: "التقنية والمواد",
    treatment_aftercare: "العناية اللاحقة",
    treatment_verdict: "الحكم",
    treatment_community_saying: "ما يقوله مجتمعنا.",
    treatment_review1_title: "\"كمال مطلق\"",
    treatment_review1_text: "\"لقد غيّر هذا الكريم بشرتي الشتوية تمامًا. الملمس إلهي - غني ولكنه يتغلغل مباشرة. يبدو وجهي ممتلئًا ويشعر بنعومة لا تصدق. إنها حقًا تجربة فاخرة كل ليلة.\"",
    treatment_review2_title: "\"يستحق كل بنس\"",
    treatment_review2_text: "\"كنت مترددة بشأن السعر، لكن القليل منه يقطع شوطًا طويلاً. الرائحة الرقيقة رائعة، ويجلس بشكل جميل تحت المكياج دون أن يتكتل. الكأس المقدسة الجديدة الخاصة بي.\"",
    treatment_review3_title: "\"ترطيب عميق\"",
    treatment_review3_text: "\"منتج جميل. يوفر ترطيبًا دائمًا طوال اليوم. لقد أعطيته 4 نجوم فقط لأن البرطمان ثقيل للسفر، لكن الكريم نفسه رائع.\"",
    treatment_process_desc: "جربي قمة الفخامة في العناية بالبشرة مع كريم أوروم المغذي. تمت صياغته بدقة لتقليد الحاجز الدهني الطبيعي للبشرة، هذا الكريم الغني للغاية وخفيف الوزن بشكل مدهش يُمتص على الفور لتقديم ترطيب عميق ودائم.\n\nغني بالمستخلصات النباتية النادرة والببتيدات المتقدمة، يعمل بانسجام لاستعادة توهج شبابي ومشرق، مما يترك بشرتك تشعر بنعومة ومرونة وتجدد غير عاديين. طقس حسي يحول العناية اليومية إلى عمل من أعمال الرعاية الذاتية العميقة.",

    // Secure Deposit / Checkout
    checkout_title: "حجز آمن وعربون",
    checkout_desc: "أكمل تفاصيل حجزك لتأمين موعدك لخدماتنا الفاخرة.",
    checkout_cust_info: "معلومات العميل",
    checkout_payment_method: "طريقة الدفع",
    checkout_card_num: "رقم البطاقة",
    checkout_expiry: "شهر / سنة",
    checkout_cvc: "رمز الأمان",
    checkout_summary: "ملخص الحجز",
    checkout_subtotal: "المجموع الفرعي",
    checkout_shipping: "الشحن",
    checkout_taxes: "الضرائب",
    checkout_calculated: "يتم حسابه بالخطوة التالية",
    checkout_total: "الإجمالي",
    checkout_confirm: "تأكيد الحجز والعربون",
    checkout_agree: "بإتمام هذا الطلب، أنت توافق على",
    checkout_secure: "دفع آمن",

    // Confirmation
    confirm_title: "تم تأكيد الموعد.",
    confirm_desc: "شكراً لاختيارك ستيتش. تم جدولة موعدك بنجاح.",
    confirm_ref: "رقم الحجز",
    confirm_status: "الحالة",
    confirm_specialist: "المتخصص",
    confirm_datetime: "التاريخ والوقت",
    confirm_datetime_desc: "تم إرسال رسالة تأكيد مع دعوة للتقويم.",
    confirm_add_cal: "إضافة للتقويم",
    confirm_directions: "الحصول على الاتجاهات",

    // Footer
    footer_privacy: "سياسة الخصوصية",
    footer_terms: "شروط الخدمة",
    footer_faq: "الأسئلة الشائعة",
    footer_careers: "الوظائف",
    footer_copyright: "© 2024 ستيتش. جميع الحقوق محفوظة.",

    // Auth
    nav_signin: "تسجيل الدخول",
    nav_signup: "إنشاء حساب",
    nav_logout: "تسجيل الخروج",
    auth_signin_title: "مرحباً بعودتك",
    auth_signin_subtitle: "سجّلي الدخول لإدارة حجوزاتك وحسابك.",
    auth_signup_title: "إنشاء حساب",
    auth_signup_subtitle: "انضمي إلى ستيتش لتجربة فاخرة مخصصة.",
    auth_name: "الاسم الكامل",
    auth_email: "البريد الإلكتروني",
    auth_password: "كلمة المرور",
    auth_confirm_password: "تأكيد كلمة المرور",
    auth_signin_btn: "تسجيل الدخول",
    auth_signup_btn: "إنشاء حساب",
    auth_no_account: "ليس لديك حساب؟",
    auth_has_account: "لديك حساب بالفعل؟",
    auth_password_mismatch: "كلمتا المرور غير متطابقتين",
    auth_loading: "يرجى الانتظار...",
    auth_error: "حدث خطأ. يرجى المحاولة مرة أخرى.",

    // Booking flow
    booking_title: "احجزي جلستك",
    booking_subtitle: "اختاري العلاج والتاريخ والوقت المناسبين.",
    booking_step_1: "اختيار العلاج",
    booking_step_2: "مراجعة الملخص",
    booking_step_3: "دفع العربون",
    booking_name: "الاسم الكامل",
    booking_phone: "رقم الهاتف",
    booking_email: "البريد الإلكتروني",
    booking_date: "التاريخ المفضل",
    booking_time: "الوقت المفضل",
    booking_notes: "ملاحظات خاصة",
    booking_pay: "المتابعة للملخص",
    booking_deposit: "العربون المستحق اليوم",
    shop_categories: "مجموعاتنا",

    // Summary / checkout
    continue_shopping: "العودة للخدمات",
    your_selection: "ملخص الجلسة",
    remove: "إزالة",
    summary: "ملخص الطلب",
    selected_date: "التاريخ المختار",
    selected_time: "الوقت المختار",
    discount_label: "رمز الخصم",
    apply: "تطبيق",
    total: "الإجمالي المستحق اليوم",
    checkout: "المتابعة للعربون",
    taxes: "يتم حساب الضرائب عند الدفع",

    // Editorial
    editorial_title: "المجلة",
    editorial_subtitle: "قصص وطقوس وإلهام من عالم ستيتش.",
    editorial_read_time: "٥ دقائق قراءة",
    editorial_post_1_title: "فن العناية البطيئة بالبشرة",
    editorial_post_1_desc: "اكتشفي كيف تحول الطقوس الواعية العناية اليومية إلى رعاية ذاتية عميقة.",
    editorial_post_2_title: "داخل المختبر النباتي",
    editorial_post_2_desc: "نظرة خلف الكواليس على كيفية sourcing وformulation علاجاتنا المميزة.",
    editorial_post_3_title: "طقوس العطور الشرقية",

    // Contact
    contact_success: "تم إرسال رسالتك. سنرد خلال ٢٤ ساعة.",

    // Cart
    cart_title: "سلة التسوق",
    cart_empty: "سلتك فارغة",
    cart_checkout: "احجز الخدمات المختارة",
    loading: "جاري التحميل...",
    error_loading: "فشل تحميل البيانات. يرجى المحاولة مرة أخرى.",
  },
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");

  const dir = language === "ar" ? "rtl" : "ltr";

  // Keep HTML attributes updated on state change
  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language, dir]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  const t = (key: string): string => {
    return translations[language][key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, dir, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
