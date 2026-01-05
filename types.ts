/**
 * ملف التعريفات (Types)؛ يحتوي على جميع الواجهات (Interfaces) والقوالب البرمجية المستخدمة 
 * في المشروع لضمان دقة البيانات وتسهيل التطوير باستخدام TypeScript.
 */
export type Language = 'nl' | 'en' | 'ar';

export type UserRole = 'SUPER_ADMIN' | 'MANAGER' | 'EDITOR';

export interface AdminUser {
  id: string;
  username: string;
  password?: string;
  role: UserRole;
  permissions: {
    editContent: boolean;
    editSettings: boolean;
    manageUsers: boolean;
  };
}

export interface GlobalSettings {
  siteTitle: string;
  logoUrl: string;
  heroImageUrl: string;
  contactEmail: string;
  location: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface NavItem {
  id: string;
  label: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface PortfolioItem {
  image: string;
  title: string;
  category: string;
  link?: string;
}

export interface PricingTier {
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  priceSuffix?: string;
}

export interface ContentSnapshot {
  id: string;
  timestamp: number;
  data: Record<string, TranslationData>;
  settings: GlobalSettings;
}

export interface TranslationData {
  nav: {
    home: string;
    services: string;
    portfolio: string;
    pricing: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  about: {
    title: string;
    content: string;
  };
  services: {
    title: string;
    items: Service[];
  };
  portfolio: {
    title: string;
    items: PortfolioItem[];
  };
  pricing: {
    title: string;
    subtitle: string;
    social: {
      title: string;
      tiers: PricingTier[];
    };
    web: {
      title: string;
      tiers: PricingTier[];
    };
  };
  contact: {
    title: string;
    formTitle: string;
    name: string;
    email: string;
    message: string;
    send: string;
    infoTitle: string;
  };
  footer: {
    rights: string;
  };
}