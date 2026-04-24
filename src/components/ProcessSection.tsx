import FloatingParticles from './FloatingParticles';
import { useLanguage } from '@/contexts/LanguageContext';
import { useParallax, useScrollReveal } from '@/hooks/use-scroll-motion';

const ProcessSection = () => {
  const { t } = useLanguage();
  const sectionReveal = useScrollReveal<HTMLElement>(0.14);
  const sectionOffset = useParallax(0.05);

  const steps = [
    { number: '01', title: t('process.step1Title'), description: t('process.step1Desc') },
    { number: '02', title: t('process.step2Title'), description: t('process.step2Desc') },
    { number: '03', title: t('process.step3Title'), description: t('process.step3Desc') },
  ];

  return (
    <section id="about" ref={sectionReveal.ref} className="py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-muted/40 via-background to-muted/20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <FloatingParticles count={12} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div
          className={`grid lg:grid-cols-2 gap-16 mb-20 transition-all duration-700 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transform: `translate3d(0, ${sectionReveal.isVisible ? sectionOffset * -0.16 : 32}px, 0)` }}
        >
          <div>
            <div className="flex items-center gap-2 mb-6 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-sm font-semibold tracking-widest uppercase">
                {t('process.label')}
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] animate-fade-up-delay-1">
              <span className="text-foreground">{t('process.heading1')}</span>
              <br />
              <span className="text-primary/60">{t('process.heading2')}</span>
            </h2>
          </div>
          <div className="flex items-end animate-fade-up-delay-2">
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              {t('process.subheading')}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`group relative transition-all duration-700 will-change-transform ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{
                transitionDelay: `${index * 110}ms`,
                transform: `translate3d(0, ${sectionReveal.isVisible ? Math.max(0, 10 - index) - sectionOffset * 0.06 : 40}px, 0)`,
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary/50 via-border to-transparent" />
              
              <div className="pt-8">
                <span className="text-6xl md:text-7xl font-bold text-primary/20 group-hover:text-primary/30 transition-colors duration-500 block mb-4">
                  {step.number}
                </span>
                <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-[20px] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* About snippet */}
        <div className="mt-28 grid lg:grid-cols-3 gap-10 items-start">
          <div>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
              {t('about.label')}
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
              {t('about.heading')}
            </h3>
          </div>
          <p className="lg:col-span-2 text-lg text-muted-foreground leading-relaxed">
            {t('about.body')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
