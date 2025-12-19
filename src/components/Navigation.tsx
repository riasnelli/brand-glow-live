import { useState, useEffect } from 'react';
import MobileMenu from './MobileMenu';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 md:px-6">
        <div className="container mx-auto">
          <div 
            className={`relative flex items-center justify-between px-6 md:px-8 py-4 rounded-full transition-all duration-500 backdrop-blur-2xl ${
              scrolled 
                ? 'bg-gradient-to-r from-[hsl(280_30%_12%/0.7)] via-[hsl(260_25%_15%/0.6)] to-[hsl(240_30%_12%/0.7)] border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]' 
                : 'bg-gradient-to-r from-[hsl(280_25%_18%/0.4)] via-[hsl(260_20%_20%/0.3)] to-[hsl(240_25%_18%/0.4)] border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]'
            }`}
          >
            {/* Gradient overlay for glass depth */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            {/* Inner glow */}
            <div className={`absolute inset-0 rounded-full pointer-events-none transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-50'}`} style={{ background: 'radial-gradient(ellipse at 50% 0%, hsl(142 76% 56% / 0.08) 0%, transparent 60%)' }} />
            
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
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <button 
              onClick={() => setIsOpen(true)}
              className="md:hidden relative z-10 text-foreground p-2 hover:bg-white/10 rounded-lg transition-colors"
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
