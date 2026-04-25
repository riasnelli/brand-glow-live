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
    'nav.siteTitle': 'MakeYourBrand',
    'nav.siteTitleSuffix': 'Live',

    // Hero
    'hero.badge': 'NOW ACCEPTING NEW PROJECTS',
    'hero.heading1': 'Brand.',
    'hero.heading2': 'Proudly Owned.',
    'hero.subheading': 'Fifteen years of senior-level brand design — without the agency markup or layers of account managers. You work directly with the freelance branding designer behind every logo, layout, and decision. That is how good branding gets made for Dubai and the GCC.',
    'hero.cta1': 'Start Your Brand',
    'hero.cta2': 'View Work',
    'hero.scroll': 'Scroll',

    // Logo Marquee / Trust Bar
    'marquee.startups': 'Startups',
    'marquee.enterprises': 'Enterprises',
    'marquee.regional': 'Regional Brands',
    'marquee.global': 'Global Clients',
    'trust.line': 'Trusted by founders and growing businesses across the UAE, India, and beyond.',

    // Who I Help
    'who.label': 'Who I Help',
    'who.heading': 'Built for ambitious Dubai & GCC business owners.',
    'who.body': "You're launching something new in Dubai, refreshing a tired identity, or finally giving your business the look it has earned. The market here moves fast and looks sharp — your brand has to do both. I help SMEs, startups, restaurants, retailers, and entrepreneurs across the UAE and GCC build identities that feel premium, distinct, and unmistakably theirs.",

    // Expertise (Services)
    'expertise.label': 'Services',
    'expertise.heading': 'Everything your brand needs, from one trusted hand.',
    'expertise.seeAll': 'See all services',
    'expertise.brandStrategy': 'Brand Identity & Logo Design',
    'expertise.brandStrategyDesc': "A complete visual system built around who you are and who you're trying to reach. From the core logo to colours, typography, and brand rules — designed to hold up across every touchpoint in the Dubai market.",
    'expertise.brandStrategyF1': 'Logo & Wordmark',
    'expertise.brandStrategyF2': 'Bilingual Arabic / English',
    'expertise.visualIdentity': 'Packaging Design',
    'expertise.visualIdentityDesc': 'Shelf-ready packaging that earns the second look. Whether FMCG, F&B, or premium retail, I design packaging that respects your category and quietly outclasses it.',
    'expertise.visualIdentityF1': 'FMCG & Retail',
    'expertise.visualIdentityF2': 'F&B & Premium',
    'expertise.logoDesign': 'Website Design',
    'expertise.logoDesignDesc': "Clean, conversion-focused websites that match the quality of your brand. Built to look at home next to Dubai's best — fast, modern, and easy for customers to act on.",
    'expertise.logoDesignF1': 'Landing & Brand Sites',
    'expertise.logoDesignF2': 'Mobile-First Builds',
    'expertise.brandGuidelines': 'Print & Brand Collateral',
    'expertise.brandGuidelinesDesc': 'Business cards, menus, brochures, signage, social templates — every piece tuned to the same identity. Consistency is what makes a brand feel real.',
    'expertise.brandGuidelinesF1': 'Print & Signage',
    'expertise.brandGuidelinesF2': 'Social Templates',
    'expertise.closing': 'One designer, one cohesive system — so your brand never looks stitched together from five different vendors.',

    // Industries
    'industries.label': 'Industries',
    'industries.heading': 'Fifteen years across the categories that matter in the Gulf.',
    'industries.intro': "I understand what makes each industry's branding work — and what makes it fall flat.",
    'industries.i1': 'Restaurants, Cafes & F&B',
    'industries.i2': 'Retail & Supermarkets',
    'industries.i3': 'Jewellery & Luxury',
    'industries.i4': 'Healthcare & Clinics',
    'industries.i5': 'Logistics & Technology',
    'industries.i6': 'Real Estate & Property',
    'industries.i7': 'FMCG & Packaging',
    'industries.i8': 'Hospitality & Resorts',
    'industries.i9': 'Personal & Founder Branding',
    'industries.i10': 'Startups & New Ventures',

    // Selected Works
    'works.label': 'Case Studies',
    'works.heading1': 'Selected ',
    'works.heading2': 'Work',
    'works.viewAll': 'View All Projects',
    'works.loading': 'Loading projects...',
    'works.empty': 'No work to show right now.',

    // Why Freelancer (was Process)
    'process.label': 'Why a Freelancer',
    'process.heading1': 'The senior designer',
    'process.heading2': 'advantage.',
    'process.subheading': "Working with a freelance branding designer in Dubai means you get the senior craft of an agency without the overhead, the layers, or the wait.",
    'process.step1Title': 'Direct Access, Every Step',
    'process.step1Desc': "You talk to the person actually designing your brand — not a project manager relaying notes. Faster decisions, clearer thinking, better work.",
    'process.step2Title': 'Quicker Turnarounds',
    'process.step2Desc': 'No internal handoffs, no waiting on three departments. Most projects move in days, not months — without cutting corners on craft.',
    'process.step3Title': 'Transparent, Honest Pricing',
    'process.step3Desc': 'You pay for design, not overhead. Clear scopes, fair rates, and no surprise invoices — the kind of working relationship Dubai business owners actually want.',
    'process.step4Title': '',
    'process.step4Desc': '',

    // About Snippet
    'about.label': 'About',
    'about.heading': 'Hi, I\u2019m Riasnelli — the designer behind NelliDESiGN.',
    'about.body': "For over 15 years I've built brands for businesses from Kerala to the Gulf — including jewellery houses like Dinar Gold & Diamonds, healthcare names like Androster, and a growing list of restaurants, retailers, and tech ventures. I design in both English and Arabic, so I understand the cultural weight a GCC brand needs to carry. If you're thinking about your next move, let's talk — no pitch deck required.",

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
    'contact.heading1': "Let's build something ",
    'contact.heading2': 'worth remembering.',
    'contact.subheading': "Whether you're starting from scratch or finally fixing a brand that never quite fit, I'd love to hear what you're working on. One honest conversation is usually all it takes to know if we're the right match.",
    'contact.cta': 'Start a Project',
    'contact.emailLabel': 'Email me at',
    'contact.email': 'hello@makeyourbrand.live',
    'contact.houseOf': 'From the House of',
    'contact.nellidesign': 'NelliDESiGN',
    'contact.basedIn': 'Based in',
    'contact.location': 'Kochi, India · Available Remotely',
    'contact.copyright': '© 2026 MakeYourBrand.Live',

    // Mobile Menu
    'mobile.works': 'Works',
    'mobile.process': 'Process',
    'mobile.about': 'About',
    'mobile.contact': 'Contact',
    'mobile.call': 'Call',
    'mobile.mail': 'Mail',

    // Privacy Policy
    'privacy.title': 'Privacy Policy',
    'privacy.back': 'Back to Home',
    'privacy.lastUpdated': 'Last updated:',
    'privacy.intro.title': '1. Introduction',
    'privacy.intro.desc': 'Welcome to MakeYourBrand.Live. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.',
    'privacy.data.title': '2. The Data We Collect About You',
    'privacy.data.desc': 'We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:',
    'privacy.data.identity': 'Identity Data: includes first name, last name, username or similar identifier.',
    'privacy.data.contact': 'Contact Data: includes email address and telephone numbers.',
    'privacy.data.tech': 'Technical Data: includes internet protocol (IP) address, browser type and version, time zone setting and location, operating system and platform.',
    'privacy.data.usage': 'Usage Data: includes information about how you use our website and services.',
    'privacy.usage.title': '3. How We Use Your Personal Data',
    'privacy.usage.desc': 'We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:',
    'privacy.usage.contract': 'Where we need to perform the contract we are about to enter into or have entered into with you.',
    'privacy.usage.legitimate': 'Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests.',
    'privacy.usage.legal': 'Where we need to comply with a legal obligation.',
    'privacy.security.title': '4. Data Security',
    'privacy.security.desc': 'We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed.',
    'privacy.contact.title': '5. Contact Us',
    'privacy.contact.desc': 'If you have any questions about this privacy policy or our privacy practices, please contact us.',

    // FAQ
    'faq.label': 'FAQ',
    'faq.heading': 'Frequently Asked Questions',
    'faq.q1': 'Are you based in Dubai?',
    'faq.a1': "I'm based in Kochi, India, and work with Dubai and GCC clients remotely every week. Fifteen years in, the process is built for distance — clear communication, fast turnarounds, and the same quality you'd expect from a senior designer sitting in your office.",
    'faq.q2': 'How much does branding cost in Dubai?',
    'faq.a2': "Every project is scoped to what you actually need — no inflated agency packages. Logo and identity projects typically start in the AED 4,000–8,000 range, while full brand systems with packaging or website sit higher. Send a brief and you'll get a clear, fixed quote within 24 hours.",
    'faq.q3': 'How long does a branding project take?',
    'faq.a3': 'A logo and core identity usually takes 2–3 weeks. A full brand system with packaging or web design runs 4–6 weeks. Working freelance means no internal queues — your project moves as fast as the feedback does.',
    'faq.q4': 'Do you design in Arabic as well as English?',
    'faq.a4': "Yes — bilingual Arabic and English design is part of almost every GCC project I take on. Logos, packaging, signage, and websites are built so both languages feel equally considered, not one bolted onto the other.",
    'faq.q5': 'Why work with a freelancer instead of an agency?',
    'faq.a5': 'You get the senior designer directly — not a junior briefed by an account manager. That means faster decisions, sharper work, and pricing without agency overhead. For most Dubai SMEs, founders, and growing brands, it is simply the better deal.',
    'faq.q6': 'What industries do you work with?',
    'faq.a6': 'Restaurants and F&B, retail and supermarkets, jewellery, healthcare, real estate, logistics, FMCG, hospitality, startups, and personal/founder branding. Fifteen years across these categories means I understand what works — and what quietly kills a brand — in each one.',
  },
  ar: {
    // Nav
    'nav.work': 'أعمالنا',
    'nav.services': 'خدماتنا',
    'nav.about': 'من نحن',
    'nav.contact': 'تواصل معنا',
    'nav.siteTitle': 'ميك يور براند',
    'nav.siteTitleSuffix': 'لايف',

    // Hero
    'hero.badge': 'نقبل مشاريع جديدة الآن',
    'hero.heading1': 'علامتك.',
    'hero.heading2': 'بفخر تملكها.',
    'hero.subheading': 'خمسة عشر عامًا من تصميم الهوية البصرية على مستوى كبار المصممين — دون تكاليف الوكالات أو طبقات إدارة الحسابات. تتعامل مباشرة مع المصمم المستقل الذي يقف خلف كل شعار وكل تفصيل وكل قرار. هكذا تُبنى العلامات التجارية في دبي والخليج.',
    'hero.cta1': 'ابدأ علامتك',
    'hero.cta2': 'شاهد الأعمال',
    'hero.scroll': 'مرر للأسفل',

    // Logo Marquee / Trust
    'marquee.startups': 'شركات ناشئة',
    'marquee.enterprises': 'مؤسسات كبرى',
    'marquee.regional': 'علامات إقليمية',
    'marquee.global': 'عملاء عالميون',
    'trust.line': 'موثوق به من قِبَل المؤسسين والشركات النامية في الإمارات والهند وأبعد.',

    // Who I Help
    'who.label': 'لمن أعمل',
    'who.heading': 'مصمَّم لأصحاب الأعمال الطموحين في دبي والخليج.',
    'who.body': 'أنت تطلق مشروعًا جديدًا في دبي، أو تعيد تنشيط هوية متعبة، أو تمنح عملك أخيرًا المظهر الذي يستحقه. السوق هنا سريع وأنيق — وعلامتك يجب أن تكون كذلك. أساعد الشركات الصغيرة والمتوسطة والمطاعم وتجار التجزئة ورواد الأعمال في الإمارات والخليج على بناء هويات تبدو راقية ومميزة وخاصة بهم بلا لبس.',

    // Services (Expertise)
    'expertise.label': 'خدماتنا',
    'expertise.heading': 'كل ما تحتاجه علامتك التجارية، من يدٍ موثوقة واحدة.',
    'expertise.seeAll': 'عرض جميع الخدمات',
    'expertise.brandStrategy': 'الهوية البصرية وتصميم الشعار',
    'expertise.brandStrategyDesc': 'نظام بصري متكامل مبني حول من تكون ومن تستهدف. من الشعار الأساسي إلى الألوان والخطوط وقواعد العلامة — مصمم ليصمد عبر كل نقطة تواصل في سوق دبي.',
    'expertise.brandStrategyF1': 'شعار وكلمة',
    'expertise.brandStrategyF2': 'ثنائي اللغة عربي / إنجليزي',
    'expertise.visualIdentity': 'تصميم العبوات',
    'expertise.visualIdentityDesc': 'عبوات جاهزة للرفوف تستحق نظرة ثانية. سواء كانت سلعًا استهلاكية أو أغذية أو منتجات راقية، أصمم عبوات تحترم فئتها وتتفوق عليها بهدوء.',
    'expertise.visualIdentityF1': 'سلع استهلاكية وتجزئة',
    'expertise.visualIdentityF2': 'أطعمة ومنتجات راقية',
    'expertise.logoDesign': 'تصميم المواقع الإلكترونية',
    'expertise.logoDesignDesc': 'مواقع نظيفة تركّز على التحويل وتطابق جودة علامتك. مبنية لتقف بجانب أفضل مواقع دبي — سريعة وعصرية وسهلة على عملائك.',
    'expertise.logoDesignF1': 'مواقع هبوط وعلامة',
    'expertise.logoDesignF2': 'تصميم يركز على الجوال',
    'expertise.brandGuidelines': 'المطبوعات وأدوات العلامة',
    'expertise.brandGuidelinesDesc': 'بطاقات عمل وقوائم وكتيبات ولافتات وقوالب سوشيال — كل قطعة منسجمة مع نفس الهوية. الاتساق هو ما يجعل العلامة حقيقية.',
    'expertise.brandGuidelinesF1': 'مطبوعات ولافتات',
    'expertise.brandGuidelinesF2': 'قوالب السوشيال',
    'expertise.closing': 'مصمم واحد، نظام واحد متكامل — حتى لا تبدو علامتك مرقّعة من خمسة موردين مختلفين.',

    // Industries
    'industries.label': 'القطاعات',
    'industries.heading': 'خمسة عشر عامًا عبر القطاعات التي تهم في الخليج.',
    'industries.intro': 'أفهم ما الذي يجعل الهوية تنجح في كل قطاع — وما الذي يُسقطها.',
    'industries.i1': 'مطاعم ومقاهٍ وأغذية ومشروبات',
    'industries.i2': 'تجزئة وسوبرماركت',
    'industries.i3': 'مجوهرات وفخامة',
    'industries.i4': 'رعاية صحية وعيادات',
    'industries.i5': 'لوجستيات وتقنية',
    'industries.i6': 'عقارات',
    'industries.i7': 'سلع استهلاكية وتغليف',
    'industries.i8': 'ضيافة ومنتجعات',
    'industries.i9': 'علامة شخصية وعلامة المؤسس',
    'industries.i10': 'شركات ناشئة ومشاريع جديدة',

    // Selected Works
    'works.label': 'دراسات حالة',
    'works.heading1': 'أعمال ',
    'works.heading2': 'مختارة',
    'works.viewAll': 'عرض جميع المشاريع',
    'works.loading': 'جاري تحميل المشاريع...',
    'works.empty': 'لا توجد أعمال للعرض حاليًا.',

    // Why a Freelancer (was Process)
    'process.label': 'لماذا مصمم مستقل',
    'process.heading1': 'ميزة المصمم',
    'process.heading2': 'الكبير.',
    'process.subheading': 'العمل مع مصمم هوية بصرية مستقل في دبي يعني الحصول على حرفية كبار المصممين دون التكاليف الإضافية أو الطبقات أو الانتظار.',
    'process.step1Title': 'تواصل مباشر في كل خطوة',
    'process.step1Desc': 'تتحدث مع الشخص الذي يصمم علامتك فعلًا — لا مع مدير مشروع ينقل الملاحظات. قرارات أسرع وتفكير أوضح وعمل أفضل.',
    'process.step2Title': 'تسليم أسرع',
    'process.step2Desc': 'لا تسليمات داخلية ولا انتظار لثلاث إدارات. معظم المشاريع تتقدم بأيام وليس بأشهر — دون أي مساس بالحرفية.',
    'process.step3Title': 'تسعير شفاف وصادق',
    'process.step3Desc': 'تدفع مقابل التصميم لا مقابل التكاليف الإدارية. نطاقات واضحة وأسعار عادلة ولا فواتير مفاجئة — هكذا يحب أصحاب الأعمال في دبي العمل.',
    'process.step4Title': '',
    'process.step4Desc': '',

    // About
    'about.label': 'عني',
    'about.heading': 'مرحبًا، أنا رياسنيلي — المصمم خلف NelliDESiGN.',
    'about.body': 'منذ أكثر من 15 عامًا أبني علامات تجارية لشركات من كيرلا إلى الخليج — منها بيوت مجوهرات مثل دينار للذهب والألماس، وعلامات صحية مثل أندروستر، وقائمة متنامية من المطاعم وتجار التجزئة وشركات التقنية. أصمم بالعربية والإنجليزية، لذا أفهم الثقل الثقافي الذي يجب أن تحمله أي علامة خليجية. إن كنت تفكر في خطوتك القادمة، فلنتحدث — دون عرض تقديمي رسمي.',

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
    'contact.heading1': 'لنبنِ شيئًا ',
    'contact.heading2': 'يستحق التذكر.',
    'contact.subheading': 'سواء كنت تبدأ من الصفر أو تصلح أخيرًا علامة لم تكن مناسبة يومًا، يسعدني أن أسمع عما تعمل عليه. غالبًا ما تكفي محادثة صادقة لمعرفة ما إذا كنا الفريق المناسب.',
    'contact.cta': 'ابدأ مشروعك',
    'contact.emailLabel': 'راسلنا على',
    'contact.email': 'hello@makeyourbrand.live',
    'contact.houseOf': 'من بيت',
    'contact.nellidesign': 'NelliDESiGN',
    'contact.basedIn': 'مقرنا في',
    'contact.location': 'كوتشي، الهند · متاحون عن بُعد',
    'contact.copyright': '© 2026 ميك يور براند • لايف',

    // Mobile Menu
    'mobile.works': 'أعمالنا',
    'mobile.process': 'المنهجية',
    'mobile.about': 'من نحن',
    'mobile.contact': 'تواصل معنا',
    'mobile.call': 'اتصل',
    'mobile.mail': 'بريد',

    // Privacy Policy
    'privacy.title': 'سياسة الخصوصية',
    'privacy.back': 'العودة للصفحة الرئيسية',
    'privacy.lastUpdated': 'آخر تحديث:',
    'privacy.intro.title': '1. مقدمة',
    'privacy.intro.desc': 'مرحبًا بك في MakeYourBrand.Live. نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. ستعلمك سياسة الخصوصية هذه بكيفية اعتنائنا ببياناتك الشخصية عند زيارتك لموقعنا الإلكتروني وتخبرك بحقوق الخصوصية الخاصة بك وكيف يحميك القانون.',
    'privacy.data.title': '2. البيانات التي نجمعها عنك',
    'privacy.data.desc': 'قد نقوم بجمع واستخدام وتخزين ونقل أنواع مختلفة من البيانات الشخصية عنك والتي قمنا بتجميعها معًا على النحو التالي:',
    'privacy.data.identity': 'بيانات الهوية: تتضمن الاسم الأول واسم العائلة واسم المستخدم أو مُعرّف مشابه.',
    'privacy.data.contact': 'بيانات الاتصال: تتضمن عنوان البريد الإلكتروني وأرقام الهواتف.',
    'privacy.data.tech': 'البيانات الفنية: تتضمن عنوان بروتوكول الإنترنت (IP)، ونوع المتصفح وإصداره، وإعدادات المنطقة الزمنية والموقع، ونظام التشغيل والمنصة.',
    'privacy.data.usage': 'بيانات الاستخدام: تتضمن معلومات حول كيفية استخدامك لموقعنا وخدماتنا.',
    'privacy.usage.title': '3. كيف نستخدم بياناتك الشخصية',
    'privacy.usage.desc': 'لن نستخدم بياناتك الشخصية إلا عندما يسمح لنا القانون بذلك. في أغلب الأحيان، سنستخدم بياناتك الشخصية في الظروف التالية:',
    'privacy.usage.contract': 'حيث نحتاج إلى تنفيذ العقد الذي نحن على وشك الدخول فيه أو قد دخلنا فيه معك.',
    'privacy.usage.legitimate': 'حيثما يكون ذلك ضروريًا لمصالحنا المشروعة ولا تتجاوز مصالحك وحقوقك الأساسية تلك المصالح.',
    'privacy.usage.legal': 'حيث نحتاج إلى الامتثال لالتزام قانوني.',
    'privacy.security.title': '4. أمن البيانات',
    'privacy.security.desc': 'لقد وضعنا تدابير أمنية مناسبة لمنع فقدان بياناتك الشخصية عن طريق الخطأ أو استخدامها أو الوصول إليها بطريقة غير مصرح بها أو تغييرها أو الكشف عنها.',
    'privacy.contact.title': '5. اتصل بنا',
    'privacy.contact.desc': 'إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو ممارسات الخصوصية الخاصة بنا، يرجى الاتصال بنا.',

    // FAQ
    'faq.label': 'الأسئلة الشائعة',
    'faq.heading': 'أسئلة متكررة',
    'faq.q1': 'هل مقرّك في دبي؟',
    'faq.a1': 'مقرّي في كوتشي بالهند، وأعمل أسبوعيًا مع عملاء في دبي والخليج عن بُعد. خمسة عشر عامًا من الخبرة جعلت العملية مصمَّمة للعمل عن بُعد — تواصل واضح، تسليم سريع، وجودة كبار المصممين كأنني في مكتبك.',
    'faq.q2': 'كم تكلفة بناء العلامة التجارية في دبي؟',
    'faq.a2': 'كل مشروع يُسعَّر حسب احتياجك الفعلي — دون باقات وكالات منفوخة. مشاريع الشعار والهوية تبدأ عادةً بين 4,000 و8,000 درهم، فيما تكون أنظمة العلامة الكاملة مع التغليف أو الموقع أعلى. أرسل ملخصًا قصيرًا وستصلك تسعيرة ثابتة وواضحة خلال 24 ساعة.',
    'faq.q3': 'كم يستغرق مشروع العلامة التجارية؟',
    'faq.a3': 'الشعار والهوية الأساسية يستغرقان عادةً من 2 إلى 3 أسابيع. أما نظام العلامة الكامل مع التغليف أو تصميم الموقع فيمتد من 4 إلى 6 أسابيع. العمل المستقل يعني أن مشروعك يتقدم بسرعة ملاحظاتك دون انتظار طوابير داخلية.',
    'faq.q4': 'هل تصمم بالعربية كما تصمم بالإنجليزية؟',
    'faq.a4': 'نعم — التصميم ثنائي اللغة جزء أساسي من كل مشروع خليجي تقريبًا. الشعارات والعبوات واللافتات والمواقع تُبنى بحيث تبدو كلا اللغتين مدروستين بنفس القدر، لا واحدة مُلصَقة على الأخرى.',
    'faq.q5': 'لماذا أعمل مع مصمم مستقل بدل وكالة؟',
    'faq.a5': 'تتعامل مباشرة مع المصمم الكبير — لا مع مبتدئ يشرح له مدير حسابات. قرارات أسرع، عمل أدق، وتسعير دون تكاليف الوكالات. لمعظم الشركات الصغيرة والمتوسطة والمؤسسين والعلامات النامية في دبي، هذه ببساطة الصفقة الأفضل.',
    'faq.q6': 'ما القطاعات التي تعمل معها؟',
    'faq.a6': 'المطاعم والأغذية، التجزئة والسوبرماركت، المجوهرات، الرعاية الصحية، العقارات، اللوجستيات، السلع الاستهلاكية، الضيافة، الشركات الناشئة، والعلامات الشخصية للمؤسسين. خمسة عشر عامًا عبر هذه القطاعات تعني أنني أفهم ما الذي ينجح — وما الذي يُسقط العلامة بهدوء — في كل واحد منها.',
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
