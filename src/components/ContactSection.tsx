import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FloatingParticles from './FloatingParticles';

const ContactSection = () => {
  return (
    <section id="contact" className="py-32 bg-background relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220_35%_4%)] via-background to-background pointer-events-none" />
      {/* Gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[100px] pointer-events-none" />
      {/* Secondary accent glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[hsl(220_60%_40%/0.08)] rounded-full blur-[100px] pointer-events-none" />
      {/* Floating particles */}
      <FloatingParticles count={10} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - CTA */}
          <div>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-6 block animate-fade-up">
              Let's Work Together
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-8 animate-fade-up-delay-1">
              Ready to build a brand that{' '}
              <span className="text-primary">stands out?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-md leading-relaxed animate-fade-up-delay-2">
              Let's discuss your project and create something memorable together. I'm currently accepting new projects for Q1 2024.
            </p>
            
            <Button variant="hero" size="xl" className="group animate-fade-up-delay-3">
              Start a Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>

          {/* Right Column - Contact Info */}
          <div className="space-y-8 animate-fade-up-delay-2">
            {/* Email Card */}
            <a 
              href="mailto:hello@makeyourbrand.live" 
              className="group glass p-6 rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-500 flex items-center gap-6 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Email me at</p>
                <p className="text-foreground font-medium group-hover:text-primary transition-colors duration-300">
                  hello@makeyourbrand.live
                </p>
              </div>
            </a>

            {/* Phone Card */}
            <a 
              href="tel:+919497127222" 
              className="group glass p-6 rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-500 flex items-center gap-6 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Call me at</p>
                <p className="text-foreground font-medium group-hover:text-primary transition-colors duration-300">
                  +91 9497 127 222
                </p>
              </div>
            </a>

            {/* Location Card */}
            <div className="glass p-6 rounded-2xl border border-border/50 flex items-center gap-6">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Based in</p>
                <p className="text-foreground font-medium">
                  India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-32 pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-muted-foreground text-sm">
              © 2024 MakeYourBrand.Live. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                Twitter
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                LinkedIn
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                Dribbble
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                Behance
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
