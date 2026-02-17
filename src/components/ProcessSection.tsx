import FloatingParticles from './FloatingParticles';

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understanding your Dubai market, competitors, and target audience to identify the strategic opportunity your brand can own.',
  },
  {
    number: '02',
    title: 'Define',
    description: 'Translating research into a clear brand direction, messaging, and voice that resonates with UAE consumers and global stakeholders.',
  },
  {
    number: '03',
    title: 'Design',
    description: 'Crafting the complete visual identity — logo, typography, colors — with the precision and sophistication Dubai demands.',
  },
  {
    number: '04',
    title: 'Deliver',
    description: 'Handing over production-ready brand assets and comprehensive guidelines, ensuring flawless execution across all channels.',
  },
];

const ProcessSection = () => {
  return (
    <section id="about" className="py-32 bg-background relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/40 via-background to-muted/20 pointer-events-none" />
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      {/* Floating particles */}
      <FloatingParticles count={12} />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div>
            <div className="flex items-center gap-2 mb-6 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-sm font-semibold tracking-widest uppercase">
                The Process
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] animate-fade-up-delay-1">
              <span className="text-foreground">From chaos to</span>
              <br />
              <span className="text-primary/60">clarity.</span>
            </h2>
          </div>
          <div className="flex items-end animate-fade-up-delay-2">
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              A proven four-step framework refined over 15+ years — designed to deliver brands that win in Dubai's fast-paced market.
            </p>
          </div>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="group relative animate-fade-up"
              style={{ animationDelay: `${(index + 1) * 150}ms` }}
            >
              {/* Top border with gradient */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary/50 via-border to-transparent" />
              
              <div className="pt-8">
                {/* Large Number */}
                <span className="text-6xl md:text-7xl font-bold text-primary/20 group-hover:text-primary/30 transition-colors duration-500 block mb-4">
                  {step.number}
                </span>
                
                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;