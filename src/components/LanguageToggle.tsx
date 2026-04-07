import { useLanguage } from '@/contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
      className="relative z-10 flex items-center gap-1 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-xs font-medium tracking-wide text-primary hover:bg-primary/20 transition-colors duration-300"
      aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      <span className={language === 'en' ? 'opacity-100' : 'opacity-50'}>EN</span>
      <span className="text-primary/40">/</span>
      <span className={language === 'ar' ? 'opacity-100' : 'opacity-50'}>AR</span>
    </button>
  );
};

export default LanguageToggle;
