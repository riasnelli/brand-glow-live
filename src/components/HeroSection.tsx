import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import FloatingParticles from './FloatingParticles';
import { ShaderBackground } from '@/components/ui/hero-shader';
import { useLanguage } from '@/contexts/LanguageContext';
import ProjectFormDialog from './ProjectFormDialog';

const HeroSection = () => {
  const { t, isRTL } = useLanguage();
  const [formOpen, setFormOpen] = useState(false);

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
        <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-3 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow flex-shrink-0" />
          <span className="text-xs font-medium text-primary tracking-wider leading-none">
            {t('hero.badge')}
          </span>
        </div>

        <h1 className={`animate-fade-up-delay-1 text-5xl md:text-6xl lg:text-8xl font-bold leading-[1.1] mx-auto mb-8 ${isRTL ? 'font-hero-ar' : ''}`}>
          <span className="text-foreground">{t('hero.heading1')}</span>
          <span className="inline-flex items-center align-middle mx-2 md:mx-3">
            <span className="relative w-16 h-8 md:w-24 md:h-10 lg:w-32 lg:h-12 rounded-full overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-primary animate-pulse" />
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" 
                style={{ backgroundSize: '200% 100%', animation: 'shimmer 2s infinite linear' }} 
              />
              <span className="absolute inset-[2px] rounded-full bg-gradient-to-br from-primary/80 via-primary/40 to-primary/60" />
            </span>
          </span>
          <br />
          <span className="bg-gradient-to-r from-primary via-foreground to-muted-foreground/60 bg-clip-text text-transparent">{t('hero.heading2')}</span>
        </h1>

        <p className="animate-fade-up-delay-2 text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto mb-12 leading-relaxed">
          {t('hero.subheading')}
        </p>

        <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button variant="hero" size="xl" onClick={() => setFormOpen(true)}>
            {t('hero.cta1')}
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button variant="heroDark" size="xl" onClick={() => {
            const el = document.getElementById('work');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}>
            {t('hero.cta2')}
          </Button>
        </div>

        <div className="animate-fade-up-delay-4 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs tracking-[0.3em] uppercase">{t('hero.scroll')}</span>
          <ChevronDown className="w-5 h-5 animate-bounce-slow" />
        </div>
      </div>
      <ProjectFormDialog open={formOpen} onOpenChange={setFormOpen} />
    </section>
  );
};

export default HeroSection;
