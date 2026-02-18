import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "MakeYourBrand.Live understood our market from day one. The brand identity they created elevated our presence and gave us instant credibility with investors.",
    author: "Ahmed Al Rashid",
    role: "CEO, Nexus Capital",
    company: "Nexus",
  },
  {
    quote: "From strategy to final delivery, every detail was polished and purposeful. Our rebrand attracted attention across the region and opened new partnership doors.",
    author: "Priya Sharma",
    role: "Founder, Aura Wellness",
    company: "Aura",
  },
  {
    quote: "Working with a designer who has 15+ years of global experience made all the difference. They built a brand system that works beautifully across all our touchpoints.",
    author: "James Mitchell",
    role: "Managing Director, Sterling Properties",
    company: "Sterling",
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-muted/30 pointer-events-none" />
      {/* Dual corner glows */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block animate-fade-up">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground animate-fade-up-delay-1">
            What clients say
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className="group glass p-8 rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-500 animate-fade-up"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              {/* Quote Icon */}
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Quote className="w-5 h-5 text-primary" />
              </div>

              {/* Quote Text */}
              <p className="text-muted-foreground leading-relaxed mb-8 text-sm">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm">
                    {testimonial.company}
                  </span>
                </div>
                <div>
                  <p className="text-foreground font-medium text-sm">
                    {testimonial.author}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;