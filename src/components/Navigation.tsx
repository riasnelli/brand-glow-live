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
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-2 px-3 md:px-4' : 'py-4 px-4 md:px-6'}`}>
        <div className={`mx-auto transition-all duration-500 ${scrolled ? 'max-w-2xl' : 'container'}`}>
          <div 
            className={`relative flex items-center justify-between rounded-full transition-all duration-500 ease-out ${
              scrolled 
                ? 'px-5 md:px-8 py-3 bg-black border border-primary/60 shadow-xl shadow-primary/10 scale-[0.98] backdrop-blur-xl' 
                : 'px-6 md:px-8 py-4 bg-black/95 border border-primary/40 shadow-lg shadow-primary/5 scale-100 backdrop-blur-md'
            }`}
            style={{ transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 0.6s ease-out' }}
          >
            {/* Gradient overlay for glass depth */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
            {/* Inner glow */}
            <div className={`absolute inset-0 rounded-full pointer-events-none transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-60'}`} style={{ background: 'radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.15) 0%, transparent 60%)' }} />
            <a 
              href="/" 
              className={`relative z-10 font-semibold text-white tracking-tight hover:text-primary transition-all duration-300 ${scrolled ? 'text-base' : 'text-lg'}`}
            >
              <span className="flex items-center gap-0">
                MakeYourBrand
                <span className="relative mx-1 flex items-center justify-center">
                  <span className="absolute w-3 h-3 rounded-full bg-primary/40 animate-ping" />
                  <span className="relative w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_2px_hsl(var(--primary)/0.6)]" />
                </span>
                Live
              </span>
            </a>

            <nav className={`hidden md:flex items-center relative z-10 transition-all duration-300 ${scrolled ? 'gap-8' : 'gap-10'}`}>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(link.id);
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`transition-all duration-300 text-sm ${
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