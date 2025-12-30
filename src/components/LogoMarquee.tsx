import { Circle, Diamond, Hexagon, Octagon } from 'lucide-react';

const logos = [
  { name: 'Acme Corp', Icon: Circle },
  { name: 'Nebula', Icon: Diamond },
  { name: 'Vertex', Icon: Hexagon },
  { name: 'Orbit', Icon: Octagon },
  { name: 'Acme Corp', Icon: Circle },
  { name: 'Nebula', Icon: Diamond },
  { name: 'Vertex', Icon: Hexagon },
  { name: 'Orbit', Icon: Octagon },
];

const LogoMarquee = () => {
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