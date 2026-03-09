import { useState } from 'react';
import { ArrowRight, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FloatingParticles from './FloatingParticles';
import ThemeToggle from './ThemeToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import ProjectFormDialog from './ProjectFormDialog';

const ContactSection = () => {
  const { t } = useLanguage();
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section id="contact" className="py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-muted/50 via-background to-background pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <FloatingParticles count={10} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-6 block animate-fade-up">
              {t('contact.label')}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-8 animate-fade-up-delay-1">
              {t('contact.heading1')}
              <span className="text-primary">{t('contact.heading2')}</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-md leading-relaxed animate-fade-up-delay-2">
              {t('contact.subheading')}
            </p>
            
            <Button variant="hero" size="xl" className="group animate-fade-up-delay-3">
              {t('contact.cta')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>

          <div className="space-y-8 animate-fade-up-delay-2">
            <a 
              href="mailto:hello@makeyourbrand.live" 
              className="group glass p-6 rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-500 flex items-center gap-6 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t('contact.emailLabel')}</p>
                <p className="text-foreground font-medium group-hover:text-primary transition-colors duration-300">
                  {t('contact.email')}
                </p>
              </div>
            </a>

            <a 
              href="https://www.nellidesign.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="group glass p-6 rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-500 flex items-center gap-6 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <ArrowRight className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t('contact.houseOf')}</p>
                <p className="text-foreground font-medium group-hover:text-primary transition-colors duration-300">
                  {t('contact.nellidesign')}
                </p>
              </div>
            </a>

            <div className="glass p-6 rounded-2xl border border-border/50 flex items-center gap-6">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t('contact.basedIn')}</p>
                <p className="text-foreground font-medium">
                  {t('contact.location')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-32 pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-muted-foreground text-sm">
                {t('contact.copyright')}
              </p>
              <ThemeToggle />
            </div>
            <div className="flex items-center gap-8">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">Twitter</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">LinkedIn</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">Dribbble</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">Behance</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
