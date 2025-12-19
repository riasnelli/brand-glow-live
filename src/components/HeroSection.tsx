import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import FloatingParticles from './FloatingParticles';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-background to-background" />
      
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Floating particles */}
      <FloatingParticles count={20} />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-32 pb-16">
        {/* Availability badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="text-xs font-medium text-primary tracking-wider">
            AVAILABLE FOR PROJECTS
          </span>
        </div>

        {/* Main heading */}
        <h1 className="animate-fade-up-delay-1 text-5xl md:text-6xl lg:text-8xl font-bold leading-[1.1] max-w-5xl mx-auto mb-8">
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
