import { Lightbulb, Palette, PenTool, BookOpen, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useParallax, useScrollReveal } from '@/hooks/use-scroll-motion';

const ExpertiseSection = () => {
  const { t, isRTL } = useLanguage();
  const sectionReveal = useScrollReveal<HTMLElement>(0.12);
  const sectionOffset = useParallax(0.05);

  const services = [
    {
      icon: Lightbulb,
      title: t('expertise.brandStrategy'),
      description: t('expertise.brandStrategyDesc'),
      features: [t('expertise.brandStrategyF1'), t('expertise.brandStrategyF2')],
    },
    {
      icon: Palette,
      title: t('expertise.visualIdentity'),
      description: t('expertise.visualIdentityDesc'),
      features: [t('expertise.visualIdentityF1'), t('expertise.visualIdentityF2')],
    },
    {
      icon: PenTool,
      title: t('expertise.logoDesign'),
      description: t('expertise.logoDesignDesc'),
      features: [t('expertise.logoDesignF1'), t('expertise.logoDesignF2')],
    },
    {
      icon: BookOpen,
      title: t('expertise.brandGuidelines'),
      description: t('expertise.brandGuidelinesDesc'),
      features: [t('expertise.brandGuidelinesF1'), t('expertise.brandGuidelinesF2')],
    },
  ];

  return (
    <section id="services" ref={sectionReveal.ref} className="py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-muted/30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6 transition-all duration-700 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transform: `translate3d(0, ${sectionReveal.isVisible ? sectionOffset * -0.18 : 32}px, 0)` }}
        >
          <div>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block animate-fade-up">
              {t('expertise.label')}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight max-w-2xl animate-fade-up-delay-1" style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "'Epilogue', sans-serif" }}>
              {t('expertise.heading')}
            </h2>
          </div>
          <a 
            href="#services" 
            className="text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2 group animate-fade-up-delay-2"
          >
            {t('expertise.seeAll')}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative glass p-8 rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-700 hover:shadow-[0_0_40px_hsl(var(--primary)/0.1)] overflow-hidden will-change-transform ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{
                transitionDelay: `${index * 90}ms`,
                transform: `translate3d(0, ${sectionReveal.isVisible ? Math.max(0, 12 - index * 2) - sectionOffset * 0.08 : 40}px, 0)`,
              }}
            >
              <service.icon className="absolute -bottom-8 -right-8 w-48 h-48 text-primary/[0.04] group-hover:text-primary/[0.08] transition-colors duration-500 pointer-events-none" strokeWidth={0.8} />

              <div className="relative z-10 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <service.icon className="w-6 h-6 text-primary" />
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed text-[20px]">
                  {service.description}
                </p>

                <div className="flex items-end justify-between">
                  <ul className="space-y-1">
                    {service.features.map((feature) => (
                      <li key={feature} className="text-sm text-muted-foreground/70 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="w-10 h-10 rounded-lg border border-border/50 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {t('expertise.closing')}
        </p>

        {/* Industries */}
        <div className="mt-24 grid lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-1">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
              {t('industries.label')}
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
              {t('industries.heading')}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {t('industries.intro')}
            </p>
          </div>
          <ul className="lg:col-span-2 grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {['i1','i2','i3','i4','i5','i6','i7','i8','i9','i10'].map((k) => (
              <li key={k} className="flex items-center gap-3 text-foreground/90">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                <span className="text-base md:text-lg">{t(`industries.${k}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
