import { useEffect } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const navLinks = [
    { name: 'Works', href: '#work' },
    { name: 'Process', href: '#process' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavClick = () => {
    onClose();
  };

  return (
    <>
      {/* Fullscreen overlay with circle clip-path animation */}
      <div
        className={`fixed inset-0 z-[100] bg-[hsl(220_30%_12%)] transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isOpen
            ? 'clip-path-circle-open opacity-100'
            : 'clip-path-circle-closed opacity-0 pointer-events-none'
        }`}
        style={{
          clipPath: isOpen
            ? 'circle(150% at calc(100% - 40px) 40px)'
            : 'circle(0% at calc(100% - 40px) 40px)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6">
          <span className="text-lg font-semibold text-foreground tracking-tight">
            MakeYourBrand.Live
          </span>
          <button
            onClick={onClose}
            className="text-foreground p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col px-8 pt-16">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={handleNavClick}
              className={`text-4xl font-light py-4 transition-all duration-500 ${
                index === 0 ? 'text-foreground' : 'text-muted-foreground'
              } hover:text-foreground`}
              style={{
                transitionDelay: isOpen ? `${index * 80 + 200}ms` : '0ms',
                transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isOpen ? 1 : 0,
              }}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Bottom Contact Buttons */}
        <div 
          className="absolute bottom-0 left-0 right-0 flex border-t border-white/10 transition-all duration-500"
          style={{
            transitionDelay: isOpen ? '500ms' : '0ms',
            transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
            opacity: isOpen ? 1 : 0,
          }}
        >
          <a
            href="tel:+919497127222"
            className="flex-1 py-6 text-center text-foreground hover:bg-white/5 transition-colors border-r border-white/10"
          >
            Call
          </a>
          <a
            href="mailto:hello@makeyourbrand.live"
            className="flex-1 py-6 text-center text-foreground hover:bg-white/5 transition-colors"
          >
            Mail
          </a>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
