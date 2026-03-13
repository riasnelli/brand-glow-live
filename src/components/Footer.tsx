import ThemeToggle from './ThemeToggle';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="w-full py-8 border-t border-border/30 bg-background relative z-10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex flex-col gap-3">
                        <p className="text-muted-foreground text-sm">
                            {t('contact.copyright')}
                        </p>
                        <ThemeToggle />
                    </div>
                    <div className="flex items-center gap-8">
                        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">Twitter</a>
                        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">LinkedIn</a>
                        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">Dribbble</a>
                        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">Behance</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
