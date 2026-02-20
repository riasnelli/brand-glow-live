import { Circle, Diamond, Hexagon, Octagon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const LogoMarquee = () => {
  const { t } = useLanguage();

  const logos = [
    { name: t('marquee.startups'), Icon: Circle },
    { name: t('marquee.enterprises'), Icon: Diamond },
    { name: t('marquee.regional'), Icon: Hexagon },
    { name: t('marquee.global'), Icon: Octagon },
    { name: t('marquee.startups'), Icon: Circle },
    { name: t('marquee.enterprises'), Icon: Diamond },
    { name: t('marquee.regional'), Icon: Hexagon },
    { name: t('marquee.global'), Icon: Octagon },
  ];

  return (
    <section className="relative py-8 border-y border-border/30 bg-muted/20 overflow-hidden">
      <div className="flex animate-marquee">
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-12 text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-300"
          >
            <logo.Icon className="w-6 h-6" strokeWidth={1.5} />
            <span className="text-sm font-medium whitespace-nowrap">{logo.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LogoMarquee;
