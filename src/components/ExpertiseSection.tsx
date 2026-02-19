import { Lightbulb, Palette, PenTool, BookOpen, ArrowUpRight } from 'lucide-react';

const services = [
  {
    icon: Lightbulb,
    title: 'Brand Strategy',
    description: "Positioning your brand to thrive in competitive markets. From market research to strategic brand architecture tailored for your business landscape.",
    features: ['Market Research', 'Competitive Positioning'],
  },
  {
    icon: Palette,
    title: 'Visual Identity Design',
    description: 'Crafting premium visual systems — color palettes, typography, and imagery — that resonate with discerning audiences and global standards.',
    features: ['Color Systems', 'Typography Selection'],
  },
  {
    icon: PenTool,
    title: 'Logo Design',
    description: "Designing iconic, versatile logos that reflect ambition and sophistication — built to stand out across dynamic business ecosystems.",
    features: ['Logomark', 'Wordmark & Bilingual'],
  },
  {
    icon: BookOpen,
    title: 'Brand Guidelines',
    description: 'Comprehensive brand documentation ensuring flawless consistency across every touchpoint — from business cards to large-scale campaigns.',
    features: ['Usage Standards', 'Multi-Channel Application'],
  },
];

const ExpertiseSection = () => {
  return (
    <section id="services" className="py-32 bg-background relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-muted/30 pointer-events-none" />
      {/* Radial glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block animate-fade-up">
              Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight max-w-xl animate-fade-up-delay-1">
              Premium branding solutions for ambitious businesses.
            </h2>
          </div>
          <a 
            href="#services" 
            className="text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2 group animate-fade-up-delay-2"
          >
            See all services
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </a>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative glass p-8 rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_40px_hsl(var(--primary)/0.1)] animate-fade-up overflow-hidden"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              {/* Watermark icon */}
              <service.icon className="absolute -bottom-8 -right-8 w-48 h-48 text-primary/[0.04] group-hover:text-primary/[0.08] transition-colors duration-500 pointer-events-none" strokeWidth={0.8} />

              {/* Icon */}
              <div className="relative z-10 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <service.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed text-[20px]">
                  {service.description}
                </p>

                {/* Features & Arrow */}
                <div className="flex items-end justify-between">
                  <ul className="space-y-1">
                    {service.features.map((feature) => (
                      <li key={feature} className="text-sm text-muted-foreground/70 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="w-10 h-10 rounded-lg border border-border/50 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;