import jollyflex from '@/assets/logos/jollyflex.png';
import galaxy from '@/assets/logos/galaxy.png';
import blooming from '@/assets/logos/blooming.png';
import guardinex from '@/assets/logos/guardinex.png';
import prakrti from '@/assets/logos/prakrti.png';
import stgregorios from '@/assets/logos/stgregorios.png';
import { useLanguage } from '@/contexts/LanguageContext';

const logos = [
  { src: jollyflex, alt: 'JollyFlex USA' },
  { src: galaxy, alt: 'Galaxy Glass Products' },
  { src: blooming, alt: 'Blooming' },
  { src: guardinex, alt: 'Guardinex' },
  { src: prakrti, alt: 'Prakrti.me' },
  { src: stgregorios, alt: 'St. Gregorios Cashew Industries' },
];

const LogoMarquee = () => {
  const { t } = useLanguage();
  const doubled = [...logos, ...logos];

  return (
    <section className="relative py-8 border-y border-border/30 bg-[#070707] dark:bg-[#070707] overflow-hidden">
      <p className="text-center text-xs md:text-sm text-muted-foreground/80 tracking-wide px-6 mb-6">
        {t('trust.line')}
      </p>
      <div className="flex animate-marquee">
        {doubled.map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center px-10 md:px-14 shrink-0"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-[4.5rem] w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
              style={{ filter: 'invert(1)', mixBlendMode: 'screen' }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default LogoMarquee;
