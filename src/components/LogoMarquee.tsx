import jollyflex from '@/assets/logos/jollyflex.png';
import galaxy from '@/assets/logos/galaxy.png';
import blooming from '@/assets/logos/blooming.png';
import guardinex from '@/assets/logos/guardinex.png';
import prakrti from '@/assets/logos/prakrti.png';
import stgregorios from '@/assets/logos/stgregorios.png';

const logos = [
  { src: jollyflex, alt: 'JollyFlex USA' },
  { src: galaxy, alt: 'Galaxy Glass Products' },
  { src: blooming, alt: 'Blooming' },
  { src: guardinex, alt: 'Guardinex' },
  { src: prakrti, alt: 'Prakrti.me' },
  { src: stgregorios, alt: 'St. Gregorios Cashew Industries' },
];

const LogoMarquee = () => {
  const doubled = [...logos, ...logos];

  return (
    <section className="relative py-8 border-y border-border/30 bg-[hsl(220,30%,8%)] dark:bg-[hsl(220,30%,8%)] overflow-hidden">
      <div className="flex animate-marquee">
        {doubled.map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center px-10 md:px-14 shrink-0"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-8 md:h-10 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default LogoMarquee;
