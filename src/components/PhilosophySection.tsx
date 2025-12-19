import { ArrowRight, Sparkles } from 'lucide-react';

const PhilosophySection = () => {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left column */}
          <div className="space-y-8">
            <span className="text-sm font-semibold text-primary tracking-[0.2em] uppercase">
              Philosophy
            </span>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Design is<br />
              intelligence<br />
              <span className="text-gradient">made visible.</span>
            </h2>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                I don't just decorate. I distill the essence of your business into a visual language that speaks directly to your audience.
              </p>
              <p>
                In a noisy world, clarity is power. My approach strips away the non-essential to reveal the core truth of your brand, creating identities that are not only seen but felt.
              </p>
            </div>
            
            <a 
              href="#process" 
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all duration-300 group"
            >
              Learn about my process
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>

          {/* Right column - Glass card */}
          <div className="relative">
            <div className="glass rounded-2xl p-8 md:p-10 relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
              {/* Grid pattern background */}
              <div className="absolute inset-0 bg-grid opacity-40" />
              
              {/* Icon */}
              <div className="relative mb-8">
                <div className="w-14 h-14 rounded-xl bg-secondary/80 border border-border/50 flex items-center justify-center group-hover:border-primary/30 transition-colors duration-500">
                  <Sparkles className="w-6 h-6 text-foreground" />
                </div>
              </div>

              {/* VOL badge */}
              <div className="absolute top-8 right-8 text-xs text-muted-foreground font-mono">
                VOL. 01
              </div>

              {/* Spacer for card height */}
              <div className="h-48 md:h-64" />

              {/* Divider */}
              <div className="w-full h-px bg-border/50 mb-6" />

              {/* Card content */}
              <div className="relative space-y-2">
                <h3 className="text-2xl font-semibold text-foreground">
                  Strategic Identity
                </h3>
                <p className="text-sm text-muted-foreground font-mono">
                  Building systems, not just logos.
                </p>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
