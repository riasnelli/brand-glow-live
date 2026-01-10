import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import FloatingParticles from './FloatingParticles';
import heroBg from '@/assets/hero-bg.jpg';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Light mode: Parallax background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 dark:hidden will-change-transform"
        style={{ 
          backgroundImage: `url(${heroBg})`,
          transform: `translateY(${scrollY * 0.4}px) scale(1.1)`
        }}
      />
      
      {/* Dark mode: Jet black radial gradient - black edges to dark blue center */}
      <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,_hsl(var(--background))_0%,_hsl(220_30%_8%)_40%,_hsl(0_0%_0%)_70%,_hsl(0_0%_0%)_100%)]" />
      
      {/* Light mode gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background dark:hidden" />
      
      {/* Floating particles - more in dark mode */}
      <FloatingParticles count={30} />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-32 pb-16 max-w-5xl">
        {/* Availability badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="text-xs font-medium text-primary tracking-wider">
            AVAILABLE FOR PROJECTS
          </span>
        </div>

        {/* Main heading */}
        <h1 className="animate-fade-up-delay-1 text-5xl md:text-6xl lg:text-8xl font-bold leading-[1.1] mx-auto mb-8">
          <span className="text-foreground">I build brands that</span>
          <br />
          <span className="text-foreground">people </span>
          <span className="bg-gradient-to-r from-foreground via-muted-foreground/70 to-muted-foreground/40 bg-clip-text text-transparent">remember.</span>
        </h1>

        {/* Subheading */}
        <p className="animate-fade-up-delay-2 text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto mb-12 leading-relaxed">
          Freelance branding designer helping startups and businesses stand out with minimal, bold, and strategic visual identities.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button variant="hero" size="xl">
            Start a Project
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button variant="heroDark" size="xl">
            View Work
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="animate-fade-up-delay-4 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce-slow" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;