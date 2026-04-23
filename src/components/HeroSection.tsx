import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import FloatingParticles from './FloatingParticles';
import { ShaderBackground } from '@/components/ui/hero-shader';
import { useLanguage } from '@/contexts/LanguageContext';
import ProjectFormDialog from './ProjectFormDialog';
import { useParallax, useScrollReveal } from '@/hooks/use-scroll-motion';

import work1 from '@/assets/works/work-1.png';
import work2 from '@/assets/works/work-2.png';
import work3 from '@/assets/works/work-3.png';
import work4 from '@/assets/works/work-4.png';
import work5 from '@/assets/works/work-5.png';

const workImages = [work1, work2, work3, work4, work5];

const HeroSection = () => {
  const { t, isRTL } = useLanguage();
  const [formOpen, setFormOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const heroOffset = useParallax(0.14);
  const badgeReveal = useScrollReveal<HTMLDivElement>(0.2, true);
  const titleReveal = useScrollReveal<HTMLHeadingElement>(0.2, true);
  const copyReveal = useScrollReveal<HTMLParagraphElement>(0.25, true);
  const actionsReveal = useScrollReveal<HTMLDivElement>(0.3, true);
  const scrollReveal = useScrollReveal<HTMLDivElement>(0.35, true);

  const scrollToWork = () => {
    let attempts = 0;

    const scroll = () => {
      const target = document.getElementById('work');

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      if (attempts >= 20) return;
      attempts += 1;
      window.setTimeout(scroll, 120);
    };

    if (document.getElementById('work')) {
      scroll();
      return;
    }

    window.dispatchEvent(new CustomEvent('prime-sections'));
    scroll();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % workImages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <ShaderBackground>
          <div className="absolute inset-0" />
        </ShaderBackground>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background pointer-events-none" />
      <FloatingParticles count={12} />
      
      <div className="relative z-10 container mx-auto px-6 text-center pt-32 pb-16 max-w-6xl">
        <div
          ref={badgeReveal.ref}
          className={`inline-flex items-center gap-2 px-4 py-3 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-8 transition-all duration-700 will-change-transform ${badgeReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transform: `translate3d(0, ${badgeReveal.isVisible ? heroOffset * -0.12 : 24}px, 0)` }}
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow flex-shrink-0" />
          <span className="text-xs font-medium text-primary tracking-wider leading-none">
            {t('hero.badge')}
          </span>
        </div>

        <h1
          ref={titleReveal.ref}
          className={`mx-auto mb-8 transition-all duration-700 will-change-transform ${titleReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${isRTL ? 'font-hero-ar' : ''}`}
          style={{ transform: `translate3d(0, ${titleReveal.isVisible ? heroOffset * -0.2 : 32}px, 0)` }}
        >
          <span className="flex items-center justify-center gap-3 text-5xl md:text-6xl lg:text-8xl font-bold leading-[0.98] whitespace-nowrap">
            <span className="text-foreground shrink-0 whitespace-nowrap">{t('hero.heading1')}</span>
            <span className="relative flex-none w-20 h-10 md:w-28 md:h-14 lg:w-40 lg:h-16 rounded-full overflow-hidden border-2 border-primary/30 shadow-lg">
              {workImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Brand work ${i + 1}`}
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out"
                  style={{ opacity: currentImage === i ? 1 : 0 }}
                />
              ))}
            </span>
          </span>
          <span className="mt-2 block whitespace-nowrap text-5xl md:text-6xl lg:text-8xl font-bold leading-[0.98] bg-gradient-to-r from-primary via-foreground to-muted-foreground/60 bg-clip-text text-transparent">
            {t('hero.heading2')}
          </span>
        </h1>

        <p
          ref={copyReveal.ref}
          className={`text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-700 will-change-transform ${copyReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transform: `translate3d(0, ${copyReveal.isVisible ? heroOffset * -0.1 : 32}px, 0)` }}
        >
          {t('hero.subheading')}
        </p>

        <div
          ref={actionsReveal.ref}
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 will-change-transform ${actionsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transform: `translate3d(0, ${actionsReveal.isVisible ? heroOffset * -0.06 : 32}px, 0)` }}
        >
          <Button variant="hero" size="xl" onClick={() => setFormOpen(true)}>
            {t('hero.cta1')}
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button variant="heroDark" size="xl" onClick={scrollToWork}>
            {t('hero.cta2')}
          </Button>
        </div>

        <div
          ref={scrollReveal.ref}
          className={`flex flex-col items-center gap-2 text-muted-foreground transition-all duration-700 will-change-transform ${scrollReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transform: `translate3d(0, ${scrollReveal.isVisible ? heroOffset * -0.03 : 32}px, 0)` }}
        >
          <span className="text-xs tracking-[0.3em] uppercase">{t('hero.scroll')}</span>
          <ChevronDown className="w-5 h-5 animate-bounce-slow" />
        </div>
      </div>
      <ProjectFormDialog open={formOpen} onOpenChange={setFormOpen} />
    </section>
  );
};

export default HeroSection;
