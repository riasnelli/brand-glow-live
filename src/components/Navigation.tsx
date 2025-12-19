import { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

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

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6">
      <div className="container mx-auto">
        <div 
          className={`flex items-center justify-between px-8 py-4 rounded-full transition-all duration-500 border border-white/10 backdrop-blur-xl ${
            scrolled 
              ? 'bg-[hsl(140_30%_8%/0.85)] shadow-[0_8px_32px_rgba(0,0,0,0.4)]' 
              : 'bg-[hsl(140_30%_10%/0.6)] shadow-[0_4px_24px_rgba(0,0,0,0.2)]'
          }`}
        >
          <a 
            href="/" 
            className="text-lg font-semibold text-foreground tracking-tight hover:text-primary transition-colors duration-300"
          >
            MakeYourBrand.Live
          </a>
          
          <nav className="hidden md:flex items-center gap-10">
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

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden text-foreground p-2 hover:bg-white/10 rounded-lg transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-[300px] bg-[hsl(140_30%_6%/0.95)] backdrop-blur-xl border-l border-white/10"
            >
              <nav className="flex flex-col gap-6 mt-12">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={handleNavClick}
                    className="text-xl text-muted-foreground hover:text-foreground transition-colors duration-300 py-2 border-b border-white/5"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
