const siteHeader = document.getElementById("siteHeader");
const mobileToggle = document.getElementById("mobileToggle");
const mobileNav = document.getElementById("mobileNav");
const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
const langButtons = document.querySelectorAll(".lang-btn");
const serviceSearch = document.getElementById("serviceSearch");
const serviceCategoriesRoot = document.getElementById("serviceCategories");
const reviewSlider = document.getElementById("reviewSlider");
const prevReviewBtn = document.getElementById("prevReview");
const nextReviewBtn = document.getElementById("nextReview");
const quickForm = document.getElementById("quickForm");
const backToTop = document.getElementById("backToTop");
const revealItems = document.querySelectorAll(".reveal");

const state = {
    lang: "tr",
    reviewIndex: 0,
    reviewTimer: null,
    openCategories: new Set(["hair-design"])
};

const translations = {
    tr: {
        meta_title: "Taksim Beauty Center | Beyoğlu Güzellik Salonu",
        meta_description:
            "Taksim Beauty Center: saç, tırnak, cilt, microblading, kalıcı makyaj ve daha fazlası. Beyoğlu'nda profesyonel güzellik hizmetleri.",
        aria_open_menu: "Menüyü aç",
        aria_prev_review: "Önceki yorum",
        aria_next_review: "Sonraki yorum",
        aria_back_to_top: "Yukarı dön",
        nav_home: "Anasayfa",
        nav_services: "Hizmetler",
        nav_gallery: "Galeri",
        nav_reviews: "Yorumlar",
        nav_contact: "İletişim",
        cta_header: "Randevu",
        hero_eyebrow: "Beyoğlu / İstanbul",
        hero_title: "Taksim'de saç, güzellik ve bakımın premium adresi.",
        hero_subtitle:
            "Taksim Beauty Center'da saç, tırnak, cilt ve estetik uygulamaları tek bir profesyonel menüde sunuyoruz.",
        hero_btn_book: "Randevu Al",
        hero_btn_services: "Hizmet Menüsü",
        metric_reviews: "52 Google değerlendirmesi",
        metric_open_value: "Açık",
        metric_open_label: "Her gün 12:00 AM'e kadar",
        metric_phone_label: "Hızlı rezervasyon hattı",
        hero_card_1: "Salon içinden gerçek sonuç: modern ışıltılı saç renklendirme.",
        hero_card_2: "Özel gün ve günlük kullanım için uzun saç tasarımları.",
        about_eyebrow: "Marka Kimliği",
        about_title: "Taksim Beauty Center, kontrollü kalite ve güçlü görsel standart.",
        about_text:
            "Adresimiz: Kocatepe, Şht. Muhtar Bey Cd. No:2/B Kat:1 D:1, 34421 Beyoğlu/İstanbul. Kadromuz saç tasarımı, cilt bakımı, tırnak uygulamaları ve ileri estetik hizmetlerinde uzmanlaşmıştır.",
        about_point_1_title: "Merkezi Konum",
        about_point_1_text: "Taksim ve Beyoğlu bölgesine yürüyüş mesafesinde.",
        about_point_2_title: "4.6/5 Müşteri Puanı",
        about_point_2_text: "Google üzerinde 52 değerlendirme ile güven inşa eden servis kalitesi.",
        about_point_3_title: "Gerçek Portfolyo",
        about_point_3_text: "Sitede kullanılan ana görseller salonun kendi uygulama sonuçlarıdır.",
        services_eyebrow: "Hizmet Menüsü",
        services_title: "Kategori bazlı, filtrelenebilir ve fiyatı net hizmet sistemi.",
        services_subtitle:
            "Menüde kategoriye dokunarak servisleri, tahmini süreyi ve başlangıç fiyatını görebilirsiniz.",
        services_search_placeholder: "Hizmet ara (ör. ombre, manikür, microblading)",
        services_hint: "Örn: Ombre, Manikür, Microblading, Derma Pen",
        services_board_caption: "Salon içindeki hizmet panosu dijital menüye dönüştürüldü.",
        services_empty: "Aramanıza uygun hizmet bulunamadı.",
        services_count_suffix: "hizmet",
        gallery_eyebrow: "Gerçek Çalışmalar",
        gallery_title: "İlk bakışta kaliteyi gösteren salon ve uygulama galerisi.",
        gallery_item_1_title: "Saç Renklendirme",
        gallery_item_1_text: "Yumuşak geçişli blond tonlama",
        gallery_item_2_title: "Kesim + Röfle",
        gallery_item_2_text: "Doğal çizgide katlı form ve ışık oyunları",
        gallery_item_3_title: "Bakır Seri",
        gallery_item_3_text: "Yüksek parlaklıkta sıcak ton dönüşümü",
        gallery_item_4_title: "Nail Art",
        gallery_item_4_text: "Detay odaklı sezon tasarımları",
        gallery_item_5_title: "Jel + Tasarım",
        gallery_item_5_text: "Uzun ömürlü yüzey ve güçlü desen",
        gallery_item_6_title: "Profesyonel Ürünler",
        gallery_item_6_text: "Uygulama sonrası bakım için kaliteli seri",
        gallery_item_7_title: "Tattoo & Piercing",
        gallery_item_7_text: "Minimal çizgilerle steril işlem protokolü",
        gallery_item_8_title: "Salon Atmosferi",
        gallery_item_8_text: "Mermer doku, altın ışık ve premium yerleşim",
        reviews_eyebrow: "Müşteri Yorumları",
        reviews_title: "Yorumlar dil seçimine göre anında güncellenir.",
        contact_eyebrow: "İletişim",
        contact_title: "Taksim Beauty Center'a tek tıkla ulaşın.",
        contact_address_label: "Adres",
        contact_address_value: "Kocatepe, Şht. Muhtar Bey Cd. No:2/B Kat:1 D:1, 34421 Beyoğlu/İstanbul",
        contact_phone_label: "Telefon",
        contact_hours_label: "Çalışma Saatleri",
        contact_hours_value: "Açık · 12:00 AM'e kadar",
        cta_call: "Ara",
        cta_whatsapp: "WhatsApp",
        cta_directions: "Yol Tarifi",
        form_eyebrow: "Hızlı Talep",
        form_title: "Kısa formu doldurun, ekip sizi arasın.",
        form_name_label: "Ad Soyad",
        form_name_placeholder: "Adınız Soyadınız",
        form_phone_label: "Telefon",
        form_phone_placeholder: "05xx xxx xx xx",
        form_service_label: "Hizmet",
        form_service_placeholder: "Hizmet seçin",
        service_option_hair: "Saç",
        service_option_nail: "Tırnak",
        service_option_skin: "Cilt",
        service_option_aesthetic: "Kalıcı Makyaj / Microblading",
        form_note_label: "Not",
        form_note_placeholder: "İstediğiniz işlem veya saat aralığını yazın",
        form_submit: "Talep Gönder",
        form_error_name: "Lütfen geçerli bir ad soyad girin.",
        form_error_phone: "Lütfen geçerli bir telefon numarası girin.",
        form_error_service: "Lütfen bir hizmet seçin.",
        form_success: "Talebiniz alındı. En kısa sürede sizi arayacağız.",
        footer_text: "Taksim Beauty Center • Beyoğlu / İstanbul • 0507 847 77 22"
    },
    en: {
        meta_title: "Taksim Beauty Center | Beyoglu Beauty Salon",
        meta_description:
            "Taksim Beauty Center offers hair, nails, skincare, microblading, permanent makeup, and more in Beyoglu, Istanbul.",
        aria_open_menu: "Open menu",
        aria_prev_review: "Previous review",
        aria_next_review: "Next review",
        aria_back_to_top: "Back to top",
        nav_home: "Home",
        nav_services: "Services",
        nav_gallery: "Gallery",
        nav_reviews: "Reviews",
        nav_contact: "Contact",
        cta_header: "Book",
        hero_eyebrow: "Beyoglu / Istanbul",
        hero_title: "Premium hair and beauty destination in Taksim.",
        hero_subtitle:
            "At Taksim Beauty Center, hair, nails, skincare, and aesthetic services are delivered through one professional menu.",
        hero_btn_book: "Book Now",
        hero_btn_services: "Service Menu",
        metric_reviews: "52 Google reviews",
        metric_open_value: "Open",
        metric_open_label: "Open daily until 12:00 AM",
        metric_phone_label: "Fast reservation line",
        hero_card_1: "Real result from the salon: modern luminous hair coloring.",
        hero_card_2: "Long-hair styling for special events and daily wear.",
        about_eyebrow: "Brand Identity",
        about_title: "Taksim Beauty Center means controlled quality and strong visual standards.",
        about_text:
            "Address: Kocatepe, Şht. Muhtar Bey Cd. No:2/B Kat:1 D:1, 34421 Beyoglu/Istanbul. Our team specializes in hair design, skincare, nail services, and advanced aesthetics.",
        about_point_1_title: "Central Location",
        about_point_1_text: "Walking distance to Taksim and Beyoglu points.",
        about_point_2_title: "4.6/5 Client Rating",
        about_point_2_text: "Google-based trust with 52 public reviews.",
        about_point_3_title: "Real Portfolio",
        about_point_3_text: "Main visuals on this website are real salon results.",
        services_eyebrow: "Service Menu",
        services_title: "Filterable category system with clear pricing.",
        services_subtitle:
            "Tap a category to view treatments, estimated duration, and starting price.",
        services_search_placeholder: "Search service (e.g. ombre, manicure, microblading)",
        services_hint: "Examples: Ombre, Manicure, Microblading, Derma Pen",
        services_board_caption: "The in-salon service board has been converted into a digital menu.",
        services_empty: "No services found for your search.",
        services_count_suffix: "services",
        gallery_eyebrow: "Real Works",
        gallery_title: "A gallery that shows quality at first glance.",
        gallery_item_1_title: "Hair Coloring",
        gallery_item_1_text: "Soft transition blonde toning",
        gallery_item_2_title: "Cut + Highlights",
        gallery_item_2_text: "Layered structure with natural light effects",
        gallery_item_3_title: "Copper Series",
        gallery_item_3_text: "High-shine warm-tone transformation",
        gallery_item_4_title: "Nail Art",
        gallery_item_4_text: "Detail-driven seasonal designs",
        gallery_item_5_title: "Gel + Design",
        gallery_item_5_text: "Long-lasting surface with bold pattern",
        gallery_item_6_title: "Professional Products",
        gallery_item_6_text: "Quality aftercare product selection",
        gallery_item_7_title: "Tattoo & Piercing",
        gallery_item_7_text: "Sterile process with minimal line work",
        gallery_item_8_title: "Salon Atmosphere",
        gallery_item_8_text: "Marble texture, gold lighting, premium layout",
        reviews_eyebrow: "Client Reviews",
        reviews_title: "Reviews update instantly with language selection.",
        contact_eyebrow: "Contact",
        contact_title: "Reach Taksim Beauty Center in one tap.",
        contact_address_label: "Address",
        contact_address_value: "Kocatepe, Şht. Muhtar Bey Cd. No:2/B Floor:1 Apt:1, 34421 Beyoglu/Istanbul",
        contact_phone_label: "Phone",
        contact_hours_label: "Working Hours",
        contact_hours_value: "Open · Until 12:00 AM",
        cta_call: "Call",
        cta_whatsapp: "WhatsApp",
        cta_directions: "Directions",
        form_eyebrow: "Quick Request",
        form_title: "Submit the short form and our team will call you.",
        form_name_label: "Full Name",
        form_name_placeholder: "Your full name",
        form_phone_label: "Phone",
        form_phone_placeholder: "+90 5xx xxx xx xx",
        form_service_label: "Service",
        form_service_placeholder: "Select service",
        service_option_hair: "Hair",
        service_option_nail: "Nails",
        service_option_skin: "Skincare",
        service_option_aesthetic: "Permanent Makeup / Microblading",
        form_note_label: "Note",
        form_note_placeholder: "Add preferred treatment and time window",
        form_submit: "Send Request",
        form_error_name: "Please enter a valid full name.",
        form_error_phone: "Please enter a valid phone number.",
        form_error_service: "Please select a service.",
        form_success: "Your request is received. Our team will call you shortly.",
        footer_text: "Taksim Beauty Center • Beyoglu / Istanbul • 0507 847 77 22"
    },
    ar: {
        meta_title: "مركز تقسيم بيوتي سنتر | صالون تجميل في بيوغلو",
        meta_description:
            "يقدم مركز Taksim Beauty Center خدمات الشعر والأظافر والعناية بالبشرة والمايكروبليدنج والمكياج الدائم في بيوغلو إسطنبول.",
        aria_open_menu: "فتح القائمة",
        aria_prev_review: "التقييم السابق",
        aria_next_review: "التقييم التالي",
        aria_back_to_top: "العودة للأعلى",
        nav_home: "الرئيسية",
        nav_services: "الخدمات",
        nav_gallery: "المعرض",
        nav_reviews: "التقييمات",
        nav_contact: "التواصل",
        cta_header: "احجز",
        hero_eyebrow: "بيوغلو / إسطنبول",
        hero_title: "عنوان الجمال والعناية المميز في تقسيم.",
        hero_subtitle:
            "في Taksim Beauty Center نقدم خدمات الشعر والأظافر والبشرة والتجميل ضمن قائمة احترافية واحدة.",
        hero_btn_book: "احجز الآن",
        hero_btn_services: "قائمة الخدمات",
        metric_reviews: "52 تقييمًا على Google",
        metric_open_value: "مفتوح",
        metric_open_label: "يوميًا حتى 12:00 صباحًا",
        metric_phone_label: "خط حجز سريع",
        hero_card_1: "نتيجة حقيقية من الصالون: تلوين شعر عصري لامع.",
        hero_card_2: "تسريحات الشعر الطويل للمناسبات والاستخدام اليومي.",
        about_eyebrow: "هوية العلامة",
        about_title: "Taksim Beauty Center يعني جودة ثابتة ومعيارًا بصريًا قويًا.",
        about_text:
            "العنوان: Kocatepe, Şht. Muhtar Bey Cd. No:2/B Kat:1 D:1, 34421 Beyoğlu/İstanbul. فريقنا متخصص في تصميم الشعر والعناية بالبشرة وخدمات الأظافر والتجميل المتقدم.",
        about_point_1_title: "موقع مركزي",
        about_point_1_text: "على مسافة مشي من نقاط تقسيم وبيوغلو.",
        about_point_2_title: "تقييم 4.6/5",
        about_point_2_text: "ثقة العملاء مدعومة بـ 52 تقييمًا عامًا على Google.",
        about_point_3_title: "معرض حقيقي",
        about_point_3_text: "الصور الرئيسية في الموقع هي نتائج حقيقية من الصالون.",
        services_eyebrow: "قائمة الخدمات",
        services_title: "نظام فئات قابل للبحث مع أسعار واضحة.",
        services_subtitle:
            "اضغط على أي فئة لرؤية الخدمة والمدة التقديرية وسعر البداية.",
        services_search_placeholder: "ابحث عن خدمة (مثل: أومبري، مانيكير، مايكروبليدنج)",
        services_hint: "أمثلة: أومبري، مانيكير، مايكروبليدنج، ديرما بن",
        services_board_caption: "تم تحويل لوحة الخدمات داخل الصالون إلى قائمة رقمية.",
        services_empty: "لا توجد خدمات مطابقة لبحثك.",
        services_count_suffix: "خدمة",
        gallery_eyebrow: "أعمال حقيقية",
        gallery_title: "معرض يعكس الجودة من النظرة الأولى.",
        gallery_item_1_title: "تلوين الشعر",
        gallery_item_1_text: "درجات أشقر بتدرج ناعم",
        gallery_item_2_title: "قص + هايلايت",
        gallery_item_2_text: "طبقات طبيعية مع توزيع إضاءة متوازن",
        gallery_item_3_title: "سلسلة النحاسي",
        gallery_item_3_text: "تحول دافئ بلمعان مرتفع",
        gallery_item_4_title: "فن الأظافر",
        gallery_item_4_text: "تصاميم موسمية دقيقة التفاصيل",
        gallery_item_5_title: "جيل + تصميم",
        gallery_item_5_text: "ثبات طويل مع نقشة قوية",
        gallery_item_6_title: "منتجات احترافية",
        gallery_item_6_text: "منتجات عناية عالية الجودة بعد الخدمة",
        gallery_item_7_title: "تاتو وثقب",
        gallery_item_7_text: "إجراء معقم بخطوط فنية دقيقة",
        gallery_item_8_title: "أجواء الصالون",
        gallery_item_8_text: "رخام فاخر وإضاءة ذهبية وتوزيع مميز",
        reviews_eyebrow: "آراء العملاء",
        reviews_title: "التقييمات تتغير فورًا حسب اللغة المختارة.",
        contact_eyebrow: "التواصل",
        contact_title: "تواصل مع Taksim Beauty Center بضغطة واحدة.",
        contact_address_label: "العنوان",
        contact_address_value: "Kocatepe, Şht. Muhtar Bey Cd. No:2/B Kat:1 D:1, 34421 Beyoğlu/İstanbul",
        contact_phone_label: "الهاتف",
        contact_hours_label: "ساعات العمل",
        contact_hours_value: "مفتوح · حتى 12:00 صباحًا",
        cta_call: "اتصال",
        cta_whatsapp: "واتساب",
        cta_directions: "الاتجاهات",
        form_eyebrow: "طلب سريع",
        form_title: "املأ النموذج المختصر وسيتواصل معك الفريق.",
        form_name_label: "الاسم الكامل",
        form_name_placeholder: "اكتب اسمك الكامل",
        form_phone_label: "الهاتف",
        form_phone_placeholder: "05xx xxx xx xx",
        form_service_label: "الخدمة",
        form_service_placeholder: "اختر خدمة",
        service_option_hair: "الشعر",
        service_option_nail: "الأظافر",
        service_option_skin: "العناية بالبشرة",
        service_option_aesthetic: "المكياج الدائم / مايكروبليدنج",
        form_note_label: "ملاحظة",
        form_note_placeholder: "اكتب نوع الخدمة والوقت المناسب",
        form_submit: "إرسال الطلب",
        form_error_name: "يرجى إدخال اسم صحيح.",
        form_error_phone: "يرجى إدخال رقم هاتف صحيح.",
        form_error_service: "يرجى اختيار خدمة.",
        form_success: "تم استلام طلبك. سيتصل بك فريقنا قريبًا.",
        footer_text: "Taksim Beauty Center • بيوغلو / إسطنبول • 0507 847 77 22"
    }
};

const serviceCategories = [
    {
        id: "hair-design",
        image: "assets/images/tbc-hair-dark-wave.png",
        title: {
            tr: "Saç Tasarım & Kesim",
            en: "Hair Design & Cuts",
            ar: "تصميم الشعر والقص"
        },
        summary: {
            tr: "Kesim, şekillendirme ve günlük kullanım odaklı saç tasarımı.",
            en: "Cuts, styling, and practical daily-look hair design.",
            ar: "قص وتصفيف وتصميم شعر مناسب للاستخدام اليومي."
        },
        services: [
            {
                name: { tr: "Hair Design", en: "Hair Design", ar: "تصميم الشعر" },
                details: {
                    tr: "Yüz formuna göre kişiselleştirilmiş tasarım.",
                    en: "Personalized design based on face shape.",
                    ar: "تصميم مخصص حسب ملامح الوجه."
                },
                duration: { tr: "60 dk", en: "60 min", ar: "60 دقيقة" },
                price: "₺1.400+"
            },
            {
                name: { tr: "Haircut", en: "Haircut", ar: "قص الشعر" },
                details: {
                    tr: "Kadın ve erkek kesim seçenekleri.",
                    en: "Women and men cut options.",
                    ar: "خيارات قص للنساء والرجال."
                },
                duration: { tr: "45 dk", en: "45 min", ar: "45 دقيقة" },
                price: "₺900+"
            },
            {
                name: { tr: "Blow Dry", en: "Blow Dry", ar: "سشوار" },
                details: {
                    tr: "Hacimli ve pürüzsüz fön uygulaması.",
                    en: "Volume-focused and smooth finish blow dry.",
                    ar: "تجفيف وتصفيف ناعم مع حجم مناسب."
                },
                duration: { tr: "35 dk", en: "35 min", ar: "35 دقيقة" },
                price: "₺650+"
            },
            {
                name: { tr: "Braid", en: "Braiding", ar: "ضفائر" },
                details: {
                    tr: "Özel gün ve günlük örgü modelleri.",
                    en: "Braiding styles for events and daily wear.",
                    ar: "موديلات ضفائر للمناسبات والاستخدام اليومي."
                },
                duration: { tr: "40 dk", en: "40 min", ar: "40 دقيقة" },
                price: "₺700+"
            },
            {
                name: { tr: "Perma", en: "Perm", ar: "بيرم" },
                details: {
                    tr: "Kalıcılığı yüksek dalga ve doku işlemi.",
                    en: "Long-lasting wave and texture process.",
                    ar: "تموجات دائمة مع ملمس واضح."
                },
                duration: { tr: "120 dk", en: "120 min", ar: "120 دقيقة" },
                price: "₺2.200+"
            },
            {
                name: { tr: "Beard Shaving", en: "Beard Shaving", ar: "حلاقة اللحية" },
                details: {
                    tr: "Temiz çizgi ve simetrik sakal şekillendirme.",
                    en: "Clean line and symmetrical beard shaping.",
                    ar: "تحديد اللحية بخطوط نظيفة ومتوازنة."
                },
                duration: { tr: "20 dk", en: "20 min", ar: "20 دقيقة" },
                price: "₺450+"
            }
        ]
    },
    {
        id: "hair-color-treatment",
        image: "assets/images/tbc-hair-blonde-wave.png",
        title: {
            tr: "Saç Renk & Kimyasal",
            en: "Hair Color & Treatments",
            ar: "ألوان الشعر والمعالجات"
        },
        summary: {
            tr: "Renk dönüşümü ve onarıcı kimyasal uygulamalar.",
            en: "Color transformations and restorative chemical services.",
            ar: "تحويلات اللون وخدمات المعالجة الكيميائية للشعر."
        },
        services: [
            {
                name: { tr: "Hair Color", en: "Hair Color", ar: "صبغة الشعر" },
                details: {
                    tr: "Kök ve tam boya seçenekleri.",
                    en: "Root touch-up and full-color options.",
                    ar: "خيارات صبغة كاملة أو جذور."
                },
                duration: { tr: "90 dk", en: "90 min", ar: "90 دقيقة" },
                price: "₺1.900+"
            },
            {
                name: { tr: "Ombre - Sombre", en: "Ombre - Sombre", ar: "أومبري - سومبري" },
                details: {
                    tr: "Doğal geçişli ve parlak renk katmanları.",
                    en: "Natural transitions with dimensional color depth.",
                    ar: "تدرجات ناعمة ولمعان متوازن."
                },
                duration: { tr: "180 dk", en: "180 min", ar: "180 دقيقة" },
                price: "₺3.750+"
            },
            {
                name: { tr: "Hair Extension", en: "Hair Extension", ar: "وصلات الشعر" },
                details: {
                    tr: "Yoğunluk ve uzunluk arttıran kaynak sistemleri.",
                    en: "Extension systems for volume and length.",
                    ar: "أنظمة وصلات لزيادة الطول والكثافة."
                },
                duration: { tr: "150 dk", en: "150 min", ar: "150 دقيقة" },
                price: "₺4.200+"
            },
            {
                name: { tr: "Brazilian Blowout", en: "Brazilian Blowout", ar: "برازيلي بلو أوت" },
                details: {
                    tr: "Kabarmayı azaltan pürüzsüzleştirme işlemi.",
                    en: "Anti-frizz smoothing and shine service.",
                    ar: "تنعيم يقلل النفشة ويزيد اللمعان."
                },
                duration: { tr: "110 dk", en: "110 min", ar: "110 دقيقة" },
                price: "₺2.850+"
            },
            {
                name: { tr: "Keratin - Protein - Hair Botox", en: "Keratin - Protein - Hair Botox", ar: "كيراتين - بروتين - بوتوكس الشعر" },
                details: {
                    tr: "Yıpranmış saçlar için yoğun onarım protokolü.",
                    en: "Intensive repair protocol for damaged hair.",
                    ar: "برنامج ترميم مكثف للشعر التالف."
                },
                duration: { tr: "120 dk", en: "120 min", ar: "120 دقيقة" },
                price: "₺3.100+"
            }
        ]
    },
    {
        id: "nail-pedicure",
        image: "assets/images/tbc-nails-purple.png",
        title: {
            tr: "El, Ayak & Tırnak",
            en: "Hand, Foot & Nails",
            ar: "اليد والقدم والأظافر"
        },
        summary: {
            tr: "Manikür, pedikür ve kalıcı tırnak tasarım uygulamaları.",
            en: "Manicure, pedicure, and long-lasting nail design services.",
            ar: "خدمات المانيكير والبديكير وتصميم الأظافر الدائم."
        },
        services: [
            {
                name: { tr: "Manicure - Pedicure", en: "Manicure - Pedicure", ar: "مانيكير - بديكير" },
                details: {
                    tr: "Temiz bakım ve hijyen odaklı uygulama.",
                    en: "Clean-care service focused on hygiene.",
                    ar: "عناية نظيفة مع تركيز كامل على التعقيم."
                },
                duration: { tr: "55 dk", en: "55 min", ar: "55 دقيقة" },
                price: "₺950+"
            },
            {
                name: { tr: "Nail Extension", en: "Nail Extension", ar: "تمديد الأظافر" },
                details: {
                    tr: "Form koruyan dayanıklı uzatma sistemi.",
                    en: "Durable extension system with shape stability.",
                    ar: "إطالة متينة مع ثبات الشكل."
                },
                duration: { tr: "90 dk", en: "90 min", ar: "90 دقيقة" },
                price: "₺1.350+"
            },
            {
                name: { tr: "Gel Polish", en: "Gel Polish", ar: "جيل بوليش" },
                details: {
                    tr: "Uzun ömürlü parlak yüzey uygulaması.",
                    en: "Long-lasting glossy gel coating.",
                    ar: "تغطية جيل لامعة وثابتة لفترة أطول."
                },
                duration: { tr: "50 dk", en: "50 min", ar: "50 دقيقة" },
                price: "₺850+"
            },
            {
                name: { tr: "Nail Art", en: "Nail Art", ar: "فن الأظافر" },
                details: {
                    tr: "Sezon trendlerine uygun desen tasarımları.",
                    en: "Trend-based custom design patterns.",
                    ar: "تصاميم ونقوش مخصصة حسب الموسم."
                },
                duration: { tr: "45 dk", en: "45 min", ar: "45 دقيقة" },
                price: "₺700+"
            },
            {
                name: { tr: "Foot Massage", en: "Foot Massage", ar: "مساج القدم" },
                details: {
                    tr: "Pedikür sonrası rahatlatıcı bakım desteği.",
                    en: "Relaxing support massage after pedicure.",
                    ar: "جلسة استرخاء للقدم بعد البديكير."
                },
                duration: { tr: "30 dk", en: "30 min", ar: "30 دقيقة" },
                price: "₺650+"
            }
        ]
    },
    {
        id: "skin-medical",
        image: "assets/images/tbc-products-shelf.png",
        title: {
            tr: "Cilt & Medikal Bakım",
            en: "Skin & Medical Care",
            ar: "العناية بالبشرة والخدمات الطبية"
        },
        summary: {
            tr: "Cilt yenileme ve destekleyici medikal bakım uygulamaları.",
            en: "Skin renewal and supportive medical-care procedures.",
            ar: "خدمات تجديد البشرة والرعاية العلاجية الداعمة."
        },
        services: [
            {
                name: { tr: "Skin Care - Facial", en: "Skin Care - Facial", ar: "عناية البشرة - فيشل" },
                details: {
                    tr: "Cilt tipine göre arındırma ve nem protokolü.",
                    en: "Customized cleansing and hydration protocol.",
                    ar: "تنظيف وترطيب مخصص حسب نوع البشرة."
                },
                duration: { tr: "60 dk", en: "60 min", ar: "60 دقيقة" },
                price: "₺1.250+"
            },
            {
                name: { tr: "Medical Care", en: "Medical Care", ar: "عناية طبية" },
                details: {
                    tr: "Uzman değerlendirmeli cilt destek seansları.",
                    en: "Specialist-evaluated skin support sessions.",
                    ar: "جلسات دعم البشرة بإشراف متخصص."
                },
                duration: { tr: "75 dk", en: "75 min", ar: "75 دقيقة" },
                price: "₺1.650+"
            },
            {
                name: { tr: "Lifting", en: "Lifting", ar: "ليفتينغ" },
                details: {
                    tr: "Yüz hattı toparlayıcı bakım uygulaması.",
                    en: "Firming facial contour support treatment.",
                    ar: "علاج شد لتحسين ملامح الوجه."
                },
                duration: { tr: "70 dk", en: "70 min", ar: "70 دقيقة" },
                price: "₺1.750+"
            },
            {
                name: { tr: "Derma Pen", en: "Derma Pen", ar: "ديرما بن" },
                details: {
                    tr: "Cilt yenileme ve doku iyileştirme hedefli seans.",
                    en: "Texture renewal and skin resurfacing protocol.",
                    ar: "جلسة تجديد لتحسين ملمس البشرة."
                },
                duration: { tr: "50 dk", en: "50 min", ar: "50 دقيقة" },
                price: "₺1.450+"
            },
            {
                name: { tr: "Plazma Pen", en: "Plasma Pen", ar: "بلازما بن" },
                details: {
                    tr: "Noktasal sıkılaştırma ve cilt toparlama uygulaması.",
                    en: "Targeted tightening and skin lift support.",
                    ar: "شد موضعي ودعم تماسك الجلد."
                },
                duration: { tr: "45 dk", en: "45 min", ar: "45 دقيقة" },
                price: "₺1.900+"
            },
            {
                name: { tr: "Wax", en: "Wax", ar: "واكس" },
                details: {
                    tr: "Hızlı, hijyenik ve düzenli epilasyon servisi.",
                    en: "Fast, hygienic waxing service.",
                    ar: "خدمة واكس سريعة ونظيفة."
                },
                duration: { tr: "30 dk", en: "30 min", ar: "30 دقيقة" },
                price: "₺550+"
            }
        ]
    },
    {
        id: "brow-lash-makeup",
        image: "assets/images/tbc-client-portrait.png",
        title: {
            tr: "Kaş, Kirpik & Makyaj",
            en: "Brows, Lashes & Makeup",
            ar: "الحواجب والرموش والمكياج"
        },
        summary: {
            tr: "Microblading, kalıcı makyaj ve özel gün makyaj uygulamaları.",
            en: "Microblading, permanent makeup, and event makeup services.",
            ar: "خدمات المايكروبليدنج والمكياج الدائم ومكياج المناسبات."
        },
        services: [
            {
                name: { tr: "Microblading", en: "Microblading", ar: "مايكروبليدنج" },
                details: {
                    tr: "Yüz oranına uygun doğal kaş formu.",
                    en: "Natural brow shape adapted to facial ratios.",
                    ar: "تحديد حواجب طبيعي متناسق مع ملامح الوجه."
                },
                duration: { tr: "90 dk", en: "90 min", ar: "90 دقيقة" },
                price: "₺2.600+"
            },
            {
                name: { tr: "Silk Eyelashes", en: "Silk Eyelashes", ar: "رموش حريرية" },
                details: {
                    tr: "Yoğunluk ve uzunluk dengeli ipek kirpik seti.",
                    en: "Balanced volume and length silk lash set.",
                    ar: "رموش حريرية بكثافة وطول متوازن."
                },
                duration: { tr: "80 dk", en: "80 min", ar: "80 دقيقة" },
                price: "₺1.850+"
            },
            {
                name: { tr: "Permanent Make-up", en: "Permanent Makeup", ar: "مكياج دائم" },
                details: {
                    tr: "Dudak, eyeliner veya kaş kalıcı uygulamaları.",
                    en: "Lips, eyeliner, or brow permanent application.",
                    ar: "تطبيق دائم للشفاه أو الآيلاينر أو الحواجب."
                },
                duration: { tr: "120 dk", en: "120 min", ar: "120 دقيقة" },
                price: "₺3.400+"
            },
            {
                name: { tr: "Make-up", en: "Makeup", ar: "مكياج" },
                details: {
                    tr: "Günlük, gece veya etkinlik odaklı profesyonel makyaj.",
                    en: "Professional makeup for daily, evening, or events.",
                    ar: "مكياج احترافي يومي أو سهرة أو مناسبات."
                },
                duration: { tr: "55 dk", en: "55 min", ar: "55 دقيقة" },
                price: "₺1.200+"
            }
        ]
    },
    {
        id: "tattoo-piercing",
        image: "assets/images/tbc-tattoo-floral.png",
        title: {
            tr: "Tattoo & Piercing",
            en: "Tattoo & Piercing",
            ar: "تاتو وثقب"
        },
        summary: {
            tr: "Minimal tasarımlar ve steril piercing işlemleri.",
            en: "Minimal tattoo designs and sterile piercing sessions.",
            ar: "تصاميم تاتو بسيطة مع جلسات ثقب معقمة."
        },
        services: [
            {
                name: { tr: "Tattoo - Piercing", en: "Tattoo - Piercing", ar: "تاتو - ثقب" },
                details: {
                    tr: "Ön çizim ve steril çalışma protokolü ile uygulanır.",
                    en: "Performed with pre-design and sterile protocol.",
                    ar: "يتم التنفيذ بتصميم أولي وبروتوكول تعقيم كامل."
                },
                duration: { tr: "40-90 dk", en: "40-90 min", ar: "40-90 دقيقة" },
                price: "₺1.100+"
            }
        ]
    }
];

const reviews = [
    {
        author: "Rajeh Elkahlout",
        service: {
            tr: "Saç Kesimi",
            en: "Haircut",
            ar: "قص الشعر"
        },
        when: {
            tr: "1 yıl önce",
            en: "1 year ago",
            ar: "منذ سنة"
        },
        quote: {
            tr: "Ibo şimdiye kadar tanıdığım en iyi berberlerden biri. Mutlaka gelip deneyin.",
            en: "Ibo is the most perfect barber I've ever met. Just come and have the best haircut ever.",
            ar: "إيبو من أفضل الحلاقين الذين تعاملت معهم. أنصحكم بالتجربة."
        }
    },
    {
        author: "M Wafa",
        service: {
            tr: "Profesyonel Saç Uygulaması",
            en: "Professional Hair Service",
            ar: "خدمة شعر احترافية"
        },
        when: {
            tr: "1 yıl önce",
            en: "1 year ago",
            ar: "منذ سنة"
        },
        quote: {
            tr: "Çok profesyonel ve çok temiz bir salon. İbrahim mükemmel bir saç kesimi yaptı.",
            en: "Very professional and clean. Ibrahim was highly skilled and gave me an amazing haircut.",
            ar: "المكان احترافي ونظيف جدًا. إبراهيم قدّم لي قصة شعر ممتازة."
        }
    },
    {
        author: "ΣΠΡΕΣΣΑ. Π",
        service: {
            tr: "Salon Ziyareti",
            en: "Salon Visit",
            ar: "زيارة الصالون"
        },
        when: {
            tr: "1 hafta önce",
            en: "1 week ago",
            ar: "منذ أسبوع"
        },
        quote: {
            tr: "Salona yaptığım ziyaretten çok memnun kaldım. Faize'ye çok teşekkür ederim.",
            en: "I was delighted by my visit to the salon. Thank you very much Faize.",
            ar: "كنت سعيدة جدًا بزيارتي للصالون. شكرًا جزيلاً لفائزة."
        }
    },
    {
        author: "Ali Usta",
        service: {
            tr: "Beauty Deneyimi",
            en: "Beauty Experience",
            ar: "تجربة الجمال"
        },
        when: {
            tr: "1 yıl önce",
            en: "1 year ago",
            ar: "منذ سنة"
        },
        quote: {
            tr: "İlk ziyaretim çok olumlu geçti, tekrar farklı beauty hizmetleri aldım. Fiyat ve kalite dengesi çok iyi.",
            en: "My first visit was very positive, so I booked more beauty services. Great value and highly recommended.",
            ar: "كانت زيارتي الأولى ممتازة لذلك حجزت خدمات إضافية. السعر مقابل الجودة ممتاز جدًا."
        }
    }
];

document.addEventListener("DOMContentLoaded", () => {
    bindEvents();
    initAnchorScroll();
    initReveal();
    updateScrolledHeader();
    applyLanguage("tr");
    highlightActiveNav();
    window.addEventListener("scroll", () => {
        updateScrolledHeader();
        highlightActiveNav();
    }, { passive: true });
    window.addEventListener("resize", syncCategoryHeights);
    startReviewAutoplay();
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js").catch(() => {});
    });
}

function bindEvents() {
    mobileToggle?.addEventListener("click", () => {
        mobileToggle.classList.toggle("active");
        mobileNav?.classList.toggle("open");
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mobileToggle?.classList.remove("active");
            mobileNav?.classList.remove("open");
        });
    });

    langButtons.forEach((button) => {
        button.addEventListener("click", () => applyLanguage(button.dataset.lang || "tr"));
    });

    serviceSearch?.addEventListener("input", (event) => {
        renderServiceCategories(event.target.value || "");
    });

    prevReviewBtn?.addEventListener("click", () => {
        moveReview(-1);
        startReviewAutoplay();
    });

    nextReviewBtn?.addEventListener("click", () => {
        moveReview(1);
        startReviewAutoplay();
    });

    backToTop?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    quickForm?.addEventListener("submit", handleQuickFormSubmit);
}

function initAnchorScroll() {
    document.querySelectorAll('a[href^=\"#\"]').forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            const href = anchor.getAttribute("href");
            if (!href || href.length < 2) return;
            const target = document.querySelector(href);
            if (!target) return;

            event.preventDefault();
            const headerHeight = siteHeader?.offsetHeight || 0;
            const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 14;
            window.scrollTo({ top, behavior: "smooth" });
        });
    });
}

function applyLanguage(lang) {
    if (!translations[lang]) return;
    state.lang = lang;

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("is-rtl", lang === "ar");

    langButtons.forEach((button) => button.classList.toggle("active", button.dataset.lang === lang));

    const dict = translations[lang];

    document.querySelectorAll("[data-i18n]").forEach((node) => {
        const key = node.dataset.i18n;
        if (dict[key] !== undefined) node.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
        const key = node.dataset.i18nPlaceholder;
        if (dict[key] !== undefined) node.placeholder = dict[key];
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
        const key = node.dataset.i18nAriaLabel;
        if (dict[key] !== undefined) node.setAttribute("aria-label", dict[key]);
    });

    document.title = dict.meta_title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute("content", dict.meta_description);

    renderServiceCategories(serviceSearch?.value || "");
    renderReviews();
    highlightActiveNav();
}

function renderServiceCategories(query) {
    if (!serviceCategoriesRoot) return;

    const dict = translations[state.lang];
    const search = normalizeText(query);
    let markup = "";
    let hasResults = false;

    serviceCategories.forEach((category) => {
        const title = category.title[state.lang];
        const summary = category.summary[state.lang];
        const categoryMatch = normalizeText(`${title} ${summary}`).includes(search);

        const matchedServices = category.services.filter((service) => {
            const haystack = `${service.name[state.lang]} ${service.details[state.lang]} ${service.price} ${service.duration[state.lang]}`;
            return normalizeText(haystack).includes(search);
        });

        if (search && !categoryMatch && matchedServices.length === 0) return;

        hasResults = true;
        const servicesToRender = search ? (matchedServices.length ? matchedServices : category.services) : category.services;
        const isOpen = search ? true : state.openCategories.has(category.id);
        const countText = `${servicesToRender.length} ${dict.services_count_suffix}`;

        markup += `
            <article class="service-category ${isOpen ? "open" : ""}" data-category-id="${category.id}">
                <button class="service-category-toggle" type="button" data-category-toggle="${category.id}" aria-expanded="${isOpen}">
                    <img src="${category.image}" alt="${escapeHtml(title)}">
                    <div>
                        <h3 class="service-category-title">${escapeHtml(title)}</h3>
                        <p class="service-category-summary">${escapeHtml(summary)}</p>
                        <span class="service-count">${escapeHtml(countText)}</span>
                    </div>
                    <span class="category-icon"><i class="fa-solid fa-chevron-down"></i></span>
                </button>
                <div class="service-category-content">
                    <ul class="service-list">
                        ${servicesToRender
                            .map(
                                (service) => `
                            <li class="service-row">
                                <div>
                                    <h4>${escapeHtml(service.name[state.lang])}</h4>
                                    <p>${escapeHtml(service.details[state.lang])}</p>
                                </div>
                                <div class="service-meta">
                                    <span>${escapeHtml(service.duration[state.lang])}</span>
                                    <strong>${escapeHtml(service.price)}</strong>
                                </div>
                            </li>`
                            )
                            .join("")}
                    </ul>
                </div>
            </article>
        `;
    });

    if (!hasResults) {
        serviceCategoriesRoot.innerHTML = `<p class="services-empty">${escapeHtml(dict.services_empty)}</p>`;
        return;
    }

    serviceCategoriesRoot.innerHTML = markup;

    serviceCategoriesRoot.querySelectorAll("[data-category-toggle]").forEach((toggleButton) => {
        toggleButton.addEventListener("click", () => {
            const categoryId = toggleButton.dataset.categoryToggle;
            if (!categoryId) return;

            if (state.openCategories.has(categoryId)) {
                state.openCategories.delete(categoryId);
            } else {
                state.openCategories.add(categoryId);
            }

            const card = toggleButton.closest(".service-category");
            const isOpen = card?.classList.toggle("open");
            toggleButton.setAttribute("aria-expanded", String(Boolean(isOpen)));
            syncCategoryHeights();
        });
    });

    syncCategoryHeights();
}

function syncCategoryHeights() {
    document.querySelectorAll(".service-category").forEach((card) => {
        const content = card.querySelector(".service-category-content");
        if (!content) return;
        content.style.maxHeight = card.classList.contains("open") ? `${content.scrollHeight}px` : "0px";
    });
}

function renderReviews() {
    if (!reviewSlider) return;
    if (state.reviewIndex >= reviews.length) state.reviewIndex = 0;

    reviewSlider.innerHTML = reviews
        .map((review, index) => {
            const activeClass = index === state.reviewIndex ? "active" : "";
            return `
                <article class="review-item ${activeClass}">
                    <div class="review-stars">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <blockquote>${escapeHtml(review.quote[state.lang])}</blockquote>
                    <div class="review-author">
                        <strong>${escapeHtml(review.author)}</strong>
                        <span>${escapeHtml(review.service[state.lang])} • ${escapeHtml(review.when[state.lang])}</span>
                    </div>
                </article>
            `;
        })
        .join("");
}

function moveReview(delta) {
    state.reviewIndex = (state.reviewIndex + delta + reviews.length) % reviews.length;
    renderReviews();
}

function startReviewAutoplay() {
    window.clearInterval(state.reviewTimer);
    state.reviewTimer = window.setInterval(() => moveReview(1), 6500);
}

function handleQuickFormSubmit(event) {
    event.preventDefault();
    if (!quickForm) return;

    const dict = translations[state.lang];
    const formData = Object.fromEntries(new FormData(quickForm).entries());

    if (!formData.clientName || String(formData.clientName).trim().length < 2) {
        showFormFeedback(dict.form_error_name, "error");
        return;
    }

    if (!isValidPhone(String(formData.clientPhone || ""))) {
        showFormFeedback(dict.form_error_phone, "error");
        return;
    }

    if (!formData.reservationService) {
        showFormFeedback(dict.form_error_service, "error");
        return;
    }

    showFormFeedback(dict.form_success, "success");
    quickForm.reset();
}

function showFormFeedback(message, type) {
    if (!quickForm) return;
    quickForm.querySelector(".form-feedback")?.remove();
    const node = document.createElement("p");
    node.className = `form-feedback ${type}`;
    node.textContent = message;
    quickForm.prepend(node);
}

function updateScrolledHeader() {
    const isScrolled = window.scrollY > 20;
    siteHeader?.classList.toggle("is-scrolled", isScrolled);
    backToTop?.classList.toggle("show", window.scrollY > 500);
}

function highlightActiveNav() {
    const sections = [...document.querySelectorAll("main section[id]")];
    if (!sections.length) return;

    const currentSection = sections.findLast((section) => {
        const top = section.offsetTop - 180;
        return window.scrollY >= top;
    });

    const currentId = currentSection ? `#${currentSection.id}` : "#anasayfa";
    navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === currentId);
    });
}

function initReveal() {
    if (!("IntersectionObserver" in window)) {
        revealItems.forEach((item) => item.classList.add("visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    revealItems.forEach((item) => observer.observe(item));
}

function normalizeText(value = "") {
    return String(value)
        .toLocaleLowerCase("tr-TR")
        .replace(/[ç]/g, "c")
        .replace(/[ğ]/g, "g")
        .replace(/[ı]/g, "i")
        .replace(/[ö]/g, "o")
        .replace(/[ş]/g, "s")
        .replace(/[ü]/g, "u")
        .trim();
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function isValidPhone(value) {
    return /^\+?[\d\s()-]{10,}$/.test(value.trim());
}
