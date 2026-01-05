/**
 * ملف الثوابت والترجمات؛ يضم جميع النصوص الافتراضية للموقع باللغات الثلاث (العربية، الإنجليزية، الهولندية) 
 * بالإضافة إلى الإعدادات الأولية للهوية البصرية والألوان.
 */
import { TranslationData, GlobalSettings } from './types';

export const EMAIL_ADDRESS = "Aamr.alawad@gmail.com";

export const INITIAL_SETTINGS: GlobalSettings = {
  siteTitle: "AmA Social & Web",
  logoUrl: "https://i.ibb.co/3sX8M8K/433054174-122137941272212906-8178144079872583842-n.png",
  heroImageUrl: "https://i.ibb.co/3sX8M8K/433054174-122137941272212906-8178144079872583842-n.png",
  contactEmail: EMAIL_ADDRESS,
  location: "Utrecht, The Netherlands",
  primaryColor: "#06b6d4",
  secondaryColor: "#d946ef",
};

export const TRANSLATIONS: Record<string, TranslationData> = {
  nl: {
    nav: { home: "Home", services: "Diensten", portfolio: "Portfolio", pricing: "Prijzen", contact: "Contact" },
    hero: { title: "Connect. Create. Engage.", subtitle: "Uw partner voor professionele social media strategieën, advertenties en webdesign in Nederland.", cta: "Bekijk onze pakketten" },
    about: { title: "Wie ben ik", content: "Ik ben een gepassioneerde digitale marketeer en webdesigner gevestigd in Nederland. Mijn missie is om bedrijven te helpen groeien door middel van krachtige visuele identiteiten en datagestuurde social media strategieën." },
    services: {
      title: "Wat ik aanbied",
      items: [
        { icon: 'Share2', title: "Social Media Beheer", description: "Volledig beheer van uw kanalen om betrokkenheid te vergroten." },
        { icon: 'Zap', title: "Betaalde Advertenties", description: "Gerichte campagnes op Facebook, Instagram en Google Ads." },
        { icon: 'Camera', title: "Content Creatie", description: "Professionele fotografie en video-editing voor uw merk." },
        { icon: 'Monitor', title: "Webdesign", description: "Moderne websites die uw merkidentiteit perfect weerspiegelen." },
        { icon: 'Search', title: "SEO Optimalisatie", description: "Beter vindbaar worden in Google voor uw lokale klanten." },
        { icon: 'MapPin', title: "Google Maps", description: "Optimalisatie van uw bedrijfsprofiel voor lokale zoekopdrachten." }
      ]
    },
    portfolio: {
      title: "Mijn Klanten",
      items: [
        { image: "https://i.ibb.co/9v2mX3K/AmA-facelofo-after-editting-with-codes-background-1.jpg", title: "AmA Content Creator", category: "Social Media / Video", link: "https://www.facebook.com/admeral.ama2" },
        { image: "https://i.ibb.co/3S1B8fH/ama-sociallogo-cercle-no-background.png", title: "Social Services Client", category: "Web Design", link: "#" },
        { image: "https://i.ibb.co/L5hY6Y9/Lastrada-logo-map.png", title: "La Strada Brunssum", category: "Advertising", link: "https://www.facebook.com/la.strada.Brunssum/" },
        { image: "https://i.ibb.co/fHnN7f1/Logo-Tasneem-Min-round-no-background.png", title: "Tasneem Grocery", category: "Social Media Ads", link: "https://www.facebook.com/profile.php?id=61583301257685" },
        { image: "https://i.ibb.co/GvXhZ2L/Samma-Market.png", title: "Samma Market", category: "E-commerce Store", link: "https://www.samaamarket.nl" }
      ]
    },
    pricing: { 
      title: "Tarieven & Pakketten", 
      subtitle: "Kies het plan dat het beste bij uw bedrijf past.", 
      social: { 
        title: "Social Media Pakketten", 
        tiers: [
          { name: "Basis", price: "€299", features: ["2 Berichten per week", "Basisondersteuning", "Focus op 1 platform", "Maandelijkse rapportage"] },
          { name: "Standaard", price: "€499", features: ["3 Berichten per week", "Ad management", "2 Platformen", "Community beheer"] },
          { name: "Premium", price: "€799", isPopular: true, features: ["5 Berichten per week", "Video/Reels creatie", "Alle platformen", "Wekelijkse rapportage"] },
          { name: "Goud", price: "€1199", features: ["Dagelijkse content", "Professionele fotografie", "Influencer marketing", "24/7 Support"] },
          { name: "Platina", price: "Maatwerk", features: ["Volledige marketingafdeling", "Onbeperkte content", "Global strategie", "Event support"] }
        ] 
      }, 
      web: { 
        title: "Webdesign Pakketten", 
        tiers: [
          { name: "Landing Page", price: "€599", priceSuffix: "eenmalig", features: ["Enkele pagina", "Contactformulier", "Mobiel vriendelijk", "SEO basis"] },
          { name: "Business Website", price: "€1299", priceSuffix: "eenmalig", isPopular: true, features: ["Tot 5 pagina's", "CMS beheer", "Google Maps integratie", "Hoge snelheid"] },
          { name: "E-commerce", price: "€2499", priceSuffix: "eenmalig", features: ["Webshop functionaliteit", "Betalingssystemen", "Product management", "Premium support"] }
        ] 
      } 
    },
    contact: { title: "Contact", formTitle: "Stuur een bericht", name: "Naam", email: "Email", message: "Bericht", send: "Verzenden", infoTitle: "Info" },
    footer: { rights: "Alle rechten voorbehouden." }
  },
  en: {
    nav: { home: "Home", services: "Services", portfolio: "Portfolio", pricing: "Pricing", contact: "Contact" },
    hero: { title: "Connect. Create. Engage.", subtitle: "Your partner for professional social media strategies, advertising, and web design.", cta: "View our packages" },
    about: { title: "About Me", content: "I am a passionate digital marketer and web designer based in the Netherlands. My mission is to help businesses grow through powerful visual identities and data-driven social media strategies." },
    services: {
      title: "What I Offer",
      items: [
        { icon: 'Share2', title: "Social Media Management", description: "Full management of your channels to increase engagement." },
        { icon: 'Zap', title: "Paid Advertising", description: "Targeted campaigns on Facebook, Instagram, and Google Ads." },
        { icon: 'Camera', title: "Content Creation", description: "Professional photography and video editing for your brand." },
        { icon: 'Monitor', title: "Web Design", description: "Modern websites that perfectly reflect your brand identity." },
        { icon: 'Search', title: "SEO Optimization", description: "Get found on Google by your local customers." },
        { icon: 'MapPin', title: "Google Maps", description: "Optimization of your business profile for local searches." }
      ]
    },
    portfolio: {
      title: "Our Clients",
      items: [
        { image: "https://i.ibb.co/9v2mX3K/AmA-facelofo-after-editting-with-codes-background-1.jpg", title: "AmA Content Creator", category: "Social Media / Video", link: "https://www.facebook.com/admeral.ama2" },
        { image: "https://i.ibb.co/3S1B8fH/ama-sociallogo-cercle-no-background.png", title: "Social Services Client", category: "Web Design", link: "#" },
        { image: "https://i.ibb.co/L5hY6Y9/Lastrada-logo-map.png", title: "La Strada Brunssum", category: "Advertising", link: "https://www.facebook.com/la.strada.Brunssum/" },
        { image: "https://i.ibb.co/fHnN7f1/Logo-Tasneem-Min-round-no-background.png", title: "Tasneem Grocery", category: "Social Media Ads", link: "https://www.facebook.com/profile.php?id=61583301257685" },
        { image: "https://i.ibb.co/GvXhZ2L/Samma-Market.png", title: "Samma Market", category: "E-commerce Store", link: "https://www.samaamarket.nl" }
      ]
    },
    pricing: { 
      title: "Rates & Packages", 
      subtitle: "Choose the plan that fits your business needs.", 
      social: { 
        title: "Social Media Packages", 
        tiers: [
          { name: "Basic", price: "€299", features: ["2 Posts per week", "Basic support", "1 Platform", "Monthly report"] },
          { name: "Standard", price: "€499", features: ["3 Posts per week", "Ads management", "2 Platforms", "Community management"] },
          { name: "Premium", price: "€799", isPopular: true, features: ["5 Posts per week", "Video/Reels creation", "All platforms", "Weekly reports"] },
          { name: "Gold", price: "€1199", features: ["Daily content", "Professional photography", "Influencer marketing", "24/7 Support"] },
          { name: "Platinum", price: "Custom", features: ["Full marketing team", "Unlimited content", "Global strategy", "Event support"] }
        ] 
      }, 
      web: { 
        title: "Web Design Packages", 
        tiers: [
          { name: "Landing Page", price: "€599", priceSuffix: "one-time", features: ["Single page", "Contact form", "Mobile friendly", "SEO basics"] },
          { name: "Business Site", price: "€1299", priceSuffix: "one-time", isPopular: true, features: ["Up to 5 pages", "CMS access", "Google Maps integration", "High speed"] },
          { name: "E-commerce", price: "€2499", priceSuffix: "one-time", features: ["Full shop functionality", "Payment gateways", "Product management", "Premium support"] }
        ] 
      } 
    },
    contact: { title: "Contact", formTitle: "Send message", name: "Name", email: "Email", message: "Message", send: "Send", infoTitle: "Info" },
    footer: { rights: "All rights reserved." }
  },
  ar: {
    nav: { home: "الرئيسية", services: "خدماتنا", portfolio: "أعمالنا", pricing: "الأسعار", contact: "اتصل بنا" },
    hero: { title: "تواصل. ابتكر. تفاعل.", subtitle: "شريكك لاستراتيجيات التواصل الاجتماعي الاحترافية، الإعلانات، وتصميم المواقع في هولندا.", cta: "شاهد الباقات" },
    about: { title: "من أنا", content: "أنا مسوق رقمي ومصمم مواقع شغوف مقيم في هولندا. مهمتي هي مساعدة الشركات على النمو من خلال هويات بصرية قوية واستراتيجيات تواصل اجتماعي تعتمد على البيانات." },
    services: {
      title: "ماذا أقدم",
      items: [
        { icon: 'Share2', title: "إدارة وسائل التواصل", description: "إدارة كاملة لقنواتك لزيادة التفاعل والوصول لجمهورك المستهدف." },
        { icon: 'Zap', title: "الإعلانات الممولة", description: "حملات مستهدفة باحترافية على فيسبوك، إنستغرام، وجوجل مابس." },
        { icon: 'Camera', title: "صناعة المحتوى", description: "تصوير فوتوغرافي احترافي وتحرير فيديو (Reels) لعلامتك التجارية." },
        { icon: 'Monitor', title: "تصميم المواقع", description: "مواقع إلكترونية حديثة تعكس هوية علامتك التجارية وتزيد من مبيعاتك." },
        { icon: 'Search', title: "تحسين محركات البحث", description: "اجعل عملائك يجدونك بسهولة في النتائج الأولى على محرك بحث جوجل." },
        { icon: 'MapPin', title: "جوجل مابس", description: "تحسين وتهيئة ملف شركتك على الخرائط لتصدر نتائج البحث المحلية." }
      ]
    },
    portfolio: {
      title: "عملاؤنا",
      items: [
        { image: "https://i.ibb.co/9v2mX3K/AmA-facelofo-after-editting-with-codes-background-1.jpg", title: "صانع محتوى AmA", category: "سوشال ميديا / فيديو", link: "https://www.facebook.com/admeral.ama2" },
        { image: "https://i.ibb.co/3S1B8fH/ama-sociallogo-cercle-no-background.png", title: "عميل خدمات السوشال", category: "تصميم ويب", link: "#" },
        { image: "https://i.ibb.co/L5hY6Y9/Lastrada-logo-map.png", title: "لا سترادا برونسوم", category: "دعاية وإعلان", link: "https://www.facebook.com/la.strada.Brunssum/" },
        { image: "https://i.ibb.co/fHnN7f1/Logo-Tasneem-Min-round-no-background.png", title: "بقالة تسنيم", category: "إعلانات ممولة", link: "https://www.facebook.com/profile.php?id=61583301257685" },
        { image: "https://i.ibb.co/GvXhZ2L/Samma-Market.png", title: "متجر سما ماركت", category: "متجر إلكتروني", link: "https://www.samaamarket.nl" }
      ]
    },
    pricing: { 
      title: "الأسعار والباقات", 
      subtitle: "اختر الباقة التي تناسب حجم وطموح عملك التجاري.", 
      social: { 
        title: "باقات السوشال ميديا", 
        tiers: [
          { name: "الأساسية", price: "€299", features: ["منشوران أسبوعياً", "دعم أساسي", "منصة واحدة", "تقرير شهري"] },
          { name: "القياسية", price: "€499", features: ["3 منشورات أسبوعياً", "إدارة الإعلانات", "منصتان", "إدارة المجتمع"] },
          { name: "المميزة", price: "€799", isPopular: true, features: ["5 منشورات أسبوعياً", "صناعة Reels/فيديو", "جميع المنصات", "تقارير أسبوعية"] },
          { name: "الذهبية", price: "€1199", features: ["محتوى يومي", "تصوير احترافي", "تسويق عبر المؤثرين", "دعم 24/7"] },
          { name: "البلاتينية", price: "حسب الطلب", features: ["فريق تسويق كامل", "محتوى غير محدود", "استراتيجية عالمية", "تغطية فعاليات"] }
        ] 
      }, 
      web: { 
        title: "باقات تصميم المواقع", 
        tiers: [
          { name: "صفحة هبوط", price: "€599", priceSuffix: "مرة واحدة", features: ["صفحة واحدة متكاملة", "نموذج اتصال سريع", "متوافق مع الجوال", "أساسيات SEO"] },
          { name: "موقع أعمال", price: "€1299", priceSuffix: "مرة واحدة", isPopular: true, features: ["حتى 5 صفحات", "لوحة تحكم كاملة", "ربط جوجل مابس", "سرعة وأمان عالي"] },
          { name: "متجر إلكتروني", price: "€2499", priceSuffix: "مرة واحدة", features: ["متجر كامل (WooCommerce)", "بوابات دفع متعددة", "إدارة المخزون", "دعم فني متميز"] }
        ] 
      } 
    },
    contact: { title: "تواصل معنا", formTitle: "أرسل رسالة", name: "الاسم", email: "البريد الإلكتروني", message: "الرسالة", send: "إرسال", infoTitle: "معلومات التواصل" },
    footer: { rights: "جميع الحقوق محفوظة." }
  }
};