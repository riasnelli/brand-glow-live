import { ArrowRight } from 'lucide-react';

const projects = [
  {
    title: 'Lumina Financial',
    category: 'Fintech Branding & Identity',
    year: '2023',
    gradient: 'from-[hsl(200_30%_15%)] to-[hsl(200_40%_8%)]',
  },
  {
    title: 'Aero Systems',
    category: 'Aerospace Rebranding',
    year: '2023',
    gradient: 'from-[hsl(220_30%_18%)] to-[hsl(220_40%_10%)]',
  },
  {
    title: 'Velvet & Oak',
    category: 'Luxury Retail Strategy',
    year: '2022',
    gradient: 'from-[hsl(30_20%_15%)] to-[hsl(30_30%_8%)]',
  },
  {
    title: 'Carbon Core',
    category: 'Eco-Tech Visual System',
    year: '2022',
    gradient: 'from-[hsl(160_30%_12%)] to-[hsl(160_40%_6%)]',
  },
];

const SelectedWorksSection = () => {
  return (
    <section id="work" className="py-32 bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220_30%_8%)] via-background to-background pointer-events-none" />
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      {/* Corner glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block animate-fade-up">
              Case Studies
            </span>
            <h2 className="text-4xl md:text-5xl font-bold animate-fade-up-delay-1">
              <span className="text-foreground">Selected </span>
              <span className="text-primary">Work</span>
            </h2>
          </div>
          <a 
            href="#work" 
            className="text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2 group animate-fade-up-delay-2"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>

        {/* Projects Grid - Masonry-like layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group relative animate-fade-up ${index % 2 === 1 ? 'md:mt-16' : ''}`}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              {/* Project Card */}
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-4 cursor-pointer">
                {/* Gradient Background with dot pattern */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `radial-gradient(circle, hsl(var(--muted-foreground) / 0.3) 1px, transparent 1px)`,
                    backgroundSize: '16px 16px',
                  }}
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
                
                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>

              {/* Project Info */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {project.category}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground/50 px-3 py-1 rounded-full border border-border/30">
                  {project.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectedWorksSection;
