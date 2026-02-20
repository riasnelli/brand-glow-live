import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'nav.work': 'Work',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.contact': 'Contact',

    // Hero
    'hero.badge': 'NOW ACCEPTING NEW PROJECTS',
    'hero.heading1': 'Brand.',
    'hero.heading2': 'Designed Better.',
    'hero.subheading': 'Freelance branding designer with 15+ years of international experience — helping startups, SMEs, and enterprises build bold, strategic visual identities that command attention.',
    'hero.cta1': 'Start a Project',
    'hero.cta2': 'View Work',
    'hero.scroll': 'Scroll',

    // Logo Marquee
    'marquee.startups': 'Startups',
    'marquee.enterprises': 'Enterprises',
    'marquee.regional': 'Regional Brands',
    'marquee.global': 'Global Clients',

    // Expertise
    'expertise.label': 'Expertise',
    'expertise.heading': 'Premium branding solutions for ambitious businesses.',
    'expertise.seeAll': 'See all services',
    'expertise.brandStrategy': 'Brand Strategy',
    'expertise.brandStrategyDesc': "Positioning your brand to thrive in competitive markets. From market research to strategic brand architecture tailored for your business landscape.",
    'expertise.brandStrategyF1': 'Market Research',
    'expertise.brandStrategyF2': 'Competitive Positioning',
    'expertise.visualIdentity': 'Visual Identity Design',
    'expertise.visualIdentityDesc': 'Crafting premium visual systems — color palettes, typography, and imagery — that resonate with discerning audiences and global standards.',
    'expertise.visualIdentityF1': 'Color Systems',
    'expertise.visualIdentityF2': 'Typography Selection',
    'expertise.logoDesign': 'Logo Design',
    'expertise.logoDesignDesc': "Designing iconic, versatile logos that reflect ambition and sophistication — built to stand out across dynamic business ecosystems.",
    'expertise.logoDesignF1': 'Logomark',
    'expertise.logoDesignF2': 'Wordmark & Bilingual',
    'expertise.brandGuidelines': 'Brand Guidelines',
    'expertise.brandGuidelinesDesc': 'Comprehensive brand documentation ensuring flawless consistency across every touchpoint — from business cards to large-scale campaigns.',
    'expertise.brandGuidelinesF1': 'Usage Standards',
    'expertise.brandGuidelinesF2': 'Multi-Channel Application',

    // Selected Works
    'works.label': 'Case Studies',
    'works.heading1': 'Selected ',
    'works.heading2': 'Work',
    'works.viewAll': 'View All Projects',
    'works.loading': 'Loading projects...',
    'works.empty': 'No work to show right now.',

    // Process
    'process.label': 'The Process',
    'process.heading1': 'From chaos to',
    'process.heading2': 'clarity.',
    'process.subheading': 'A proven four-step framework refined over 15+ years — designed to deliver brands that win in fast-paced markets.',
    'process.step1Title': 'Discover',
    'process.step1Desc': 'Understanding your market, competitors, and target audience to identify the strategic opportunity your brand can own.',
    'process.step2Title': 'Define',
    'process.step2Desc': 'Translating research into a clear brand direction, messaging, and voice that resonates with your consumers and global stakeholders.',
    'process.step3Title': 'Design',
    'process.step3Desc': 'Crafting the complete visual identity — logo, typography, colors — with precision and sophistication your brand demands.',
    'process.step4Title': 'Deliver',
    'process.step4Desc': 'Handing over production-ready brand assets and comprehensive guidelines, ensuring flawless execution across all channels.',

    // Testimonials
    'testimonials.label': 'Testimonials',
    'testimonials.heading': 'What clients say',
    'testimonials.quote1': 'MakeYourBrand.Live understood our market from day one. The brand identity they created elevated our presence and gave us instant credibility with investors.',
    'testimonials.author1': 'Ahmed Al Rashid',
    'testimonials.role1': 'CEO, Nexus Capital',
    'testimonials.company1': 'Nexus',
    'testimonials.quote2': 'From strategy to final delivery, every detail was polished and purposeful. Our rebrand attracted attention across the region and opened new partnership doors.',
    'testimonials.author2': 'Priya Sharma',
    'testimonials.role2': 'Founder, Aura Wellness',
    'testimonials.company2': 'Aura',
    'testimonials.quote3': 'Working with a designer who has 15+ years of global experience made all the difference. They built a brand system that works beautifully across all our touchpoints.',
    'testimonials.author3': 'James Mitchell',
    'testimonials.role3': 'Managing Director, Sterling Properties',
    'testimonials.company3': 'Sterling',

    // Contact
    'contact.label': "Let's Work Together",
    'contact.heading1': 'Ready to elevate your ',
    'contact.heading2': 'brand?',
    'contact.subheading': "Let's discuss how 15+ years of international design expertise can transform your brand. Currently accepting new projects.",
    'contact.cta': 'Start a Project',
    'contact.emailLabel': 'Email me at',
    'contact.email': 'hello@makeyourbrand.live',
    'contact.houseOf': 'From the House of',
    'contact.nellidesign': 'NelliDESiGN',
    'contact.basedIn': 'Based in',
    'contact.location': 'Kochi, India · Available Remotely',
    'contact.copyright': '© 2026 MakeYourBrand.Live — From the House of NelliDESiGN. All rights reserved.',

    // Mobile Menu
    'mobile.works': 'Works',
    'mobile.process': 'Process',
    'mobile.about': 'About',
    'mobile.contact': 'Contact',
    'mobile.call': 'Call',
    'mobile.mail': 'Mail',
  },
  ar: {
    // Nav
    'nav.work': 'أعمالنا',
    'nav.services': 'خدماتنا',
    'nav.about': 'من نحن',
    'nav.contact': 'تواصل معنا',

    // Hero
    'hero.badge': 'نقبل مشاريع جديدة الآن',
    'hero.heading1': 'علامتك.',
    'hero.heading2': 'مصمّمة بشكل أفضل.',
    'hero.subheading': 'مصمم هوية بصرية مستقل بخبرة دولية تتجاوز 15 عامًا — أساعد الشركات الناشئة والمتوسطة والكبرى على بناء هويات بصرية جريئة واستراتيجية تلفت الانتباه.',
    'hero.cta1': 'ابدأ مشروعك',
    'hero.cta2': 'شاهد الأعمال',
    'hero.scroll': 'مرر للأسفل',

    // Logo Marquee
    'marquee.startups': 'شركات ناشئة',
    'marquee.enterprises': 'مؤسسات كبرى',
    'marquee.regional': 'علامات إقليمية',
    'marquee.global': 'عملاء عالميون',

    // Expertise
    'expertise.label': 'خبراتنا',
    'expertise.heading': 'حلول متميزة للعلامات التجارية الطموحة.',
    'expertise.seeAll': 'عرض جميع الخدمات',
    'expertise.brandStrategy': 'استراتيجية العلامة التجارية',
    'expertise.brandStrategyDesc': 'نضع علامتك التجارية في موقع يمكّنها من النجاح في أسواق تنافسية. من أبحاث السوق إلى بنية العلامة التجارية الاستراتيجية المصممة خصيصًا لبيئة عملك.',
    'expertise.brandStrategyF1': 'أبحاث السوق',
    'expertise.brandStrategyF2': 'التموضع التنافسي',
    'expertise.visualIdentity': 'تصميم الهوية البصرية',
    'expertise.visualIdentityDesc': 'صياغة أنظمة بصرية متميزة — ألوان وخطوط وصور — تتناسب مع الجمهور المميز والمعايير العالمية.',
    'expertise.visualIdentityF1': 'أنظمة الألوان',
    'expertise.visualIdentityF2': 'اختيار الخطوط',
    'expertise.logoDesign': 'تصميم الشعار',
    'expertise.logoDesignDesc': 'تصميم شعارات مميزة ومتعددة الاستخدامات تعكس الطموح والرقي — مصممة للتميز في بيئات الأعمال الديناميكية.',
    'expertise.logoDesignF1': 'رمز الشعار',
    'expertise.logoDesignF2': 'شعار نصي وثنائي اللغة',
    'expertise.brandGuidelines': 'دليل الهوية البصرية',
    'expertise.brandGuidelinesDesc': 'توثيق شامل للعلامة التجارية يضمن اتساقًا مثاليًا عبر كل نقطة تواصل — من بطاقات العمل إلى الحملات واسعة النطاق.',
    'expertise.brandGuidelinesF1': 'معايير الاستخدام',
    'expertise.brandGuidelinesF2': 'تطبيق متعدد القنوات',

    // Selected Works
    'works.label': 'دراسات حالة',
    'works.heading1': 'أعمال ',
    'works.heading2': 'مختارة',
    'works.viewAll': 'عرض جميع المشاريع',
    'works.loading': 'جاري تحميل المشاريع...',
    'works.empty': 'لا توجد أعمال للعرض حاليًا.',

    // Process
    'process.label': 'المنهجية',
    'process.heading1': 'من الفوضى إلى',
    'process.heading2': 'الوضوح.',
    'process.subheading': 'منهجية مثبتة من أربع خطوات صُقلت على مدار أكثر من 15 عامًا — مصممة لتقديم علامات تجارية تفوز في الأسواق سريعة الوتيرة.',
    'process.step1Title': 'الاكتشاف',
    'process.step1Desc': 'فهم سوقك ومنافسيك وجمهورك المستهدف لتحديد الفرصة الاستراتيجية التي يمكن لعلامتك التجارية امتلاكها.',
    'process.step2Title': 'التحديد',
    'process.step2Desc': 'ترجمة الأبحاث إلى اتجاه واضح للعلامة التجارية ورسائل وصوت يتردد صداها مع عملائك وأصحاب المصلحة العالميين.',
    'process.step3Title': 'التصميم',
    'process.step3Desc': 'صياغة الهوية البصرية الكاملة — الشعار والخطوط والألوان — بدقة ورقي تتطلبه علامتك التجارية.',
    'process.step4Title': 'التسليم',
    'process.step4Desc': 'تسليم أصول العلامة التجارية الجاهزة للإنتاج وإرشادات شاملة، تضمن تنفيذًا مثاليًا عبر جميع القنوات.',

    // Testimonials
    'testimonials.label': 'آراء العملاء',
    'testimonials.heading': 'ماذا يقول العملاء',
    'testimonials.quote1': 'فهم MakeYourBrand.Live سوقنا من اليوم الأول. الهوية البصرية التي أنشأوها رفعت من حضورنا ومنحتنا مصداقية فورية لدى المستثمرين.',
    'testimonials.author1': 'أحمد الراشد',
    'testimonials.role1': 'الرئيس التنفيذي، نيكسس كابيتال',
    'testimonials.company1': 'نيكسس',
    'testimonials.quote2': 'من الاستراتيجية إلى التسليم النهائي، كل تفصيل كان مصقولًا وهادفًا. إعادة بناء علامتنا التجارية جذبت الانتباه في جميع أنحاء المنطقة وفتحت أبواب شراكات جديدة.',
    'testimonials.author2': 'بريا شارما',
    'testimonials.role2': 'مؤسسة، أورا ويلنس',
    'testimonials.company2': 'أورا',
    'testimonials.quote3': 'العمل مع مصمم لديه أكثر من 15 عامًا من الخبرة العالمية أحدث فرقًا كبيرًا. لقد بنوا نظام علامة تجارية يعمل بشكل جميل عبر جميع نقاط التواصل.',
    'testimonials.author3': 'جيمس ميتشل',
    'testimonials.role3': 'المدير العام، ستيرلينج بروبرتيز',
    'testimonials.company3': 'ستيرلينج',

    // Contact
    'contact.label': 'لنعمل معًا',
    'contact.heading1': 'مستعد للارتقاء بـ',
    'contact.heading2': 'علامتك التجارية؟',
    'contact.subheading': 'دعنا نناقش كيف يمكن لأكثر من 15 عامًا من خبرة التصميم الدولية أن تحوّل علامتك التجارية. نقبل حاليًا مشاريع جديدة.',
    'contact.cta': 'ابدأ مشروعك',
    'contact.emailLabel': 'راسلنا على',
    'contact.email': 'hello@makeyourbrand.live',
    'contact.houseOf': 'من بيت',
    'contact.nellidesign': 'NelliDESiGN',
    'contact.basedIn': 'مقرنا في',
    'contact.location': 'كوتشي، الهند · متاحون عن بُعد',
    'contact.copyright': '© 2026 MakeYourBrand.Live — من بيت NelliDESiGN. جميع الحقوق محفوظة.',

    // Mobile Menu
    'mobile.works': 'أعمالنا',
    'mobile.process': 'المنهجية',
    'mobile.about': 'من نحن',
    'mobile.contact': 'تواصل معنا',
    'mobile.call': 'اتصل',
    'mobile.mail': 'بريد',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'ar' ? 'ar' : 'en') as Language;
  });

  const isRTL = language === 'ar';

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
