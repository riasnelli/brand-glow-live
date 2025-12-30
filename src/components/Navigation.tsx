import { useState, useEffect } from 'react';
import MobileMenu from './MobileMenu';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Detect active section
      const sections = ['work', 'services', 'about', 'contact'];
      let current = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work', id: 'work' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 md:px-6">
        <div className="container mx-auto">
          <div 
            className={`relative flex items-center justify-between px-6 md:px-8 py-4 rounded-full transition-all duration-500 backdrop-blur-2xl ${
              scrolled 
                ? 'bg-card/80 border border-border/50 shadow-lg dark:bg-card/70 dark:border-primary/20' 
                : 'bg-card/40 border border-border/30 shadow-md dark:bg-card/30'
            }`}
          >
            {/* Gradient overlay for glass depth */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-background/10 to-transparent pointer-events-none" />
            {/* Inner glow */}
            <div className={`absolute inset-0 rounded-full pointer-events-none transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-50'}`} style={{ background: 'radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.08) 0%, transparent 60%)' }} />
            
            <a 
              href="/" 
              className="relative z-10 text-lg font-semibold text-foreground tracking-tight hover:text-primary transition-colors duration-300"
            >
              MakeYourBrand.Live
            </a>
            
            <nav className="hidden md:flex items-center gap-10 relative z-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(link.id);
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`text-sm transition-all duration-300 ${
                    activeSection === link.id
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <button 
              onClick={() => setIsOpen(true)}
              className="md:hidden relative z-10 text-foreground p-2 hover:bg-muted/50 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Navigation;