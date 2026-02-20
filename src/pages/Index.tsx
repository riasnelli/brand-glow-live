import { LanguageProvider } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import LogoMarquee from '@/components/LogoMarquee';
import ExpertiseSection from '@/components/ExpertiseSection';
import SelectedWorksSection from '@/components/SelectedWorksSection';
import ProcessSection from '@/components/ProcessSection';
import TestimonialSection from '@/components/TestimonialSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main>
          <HeroSection />
          <LogoMarquee />
          <ExpertiseSection />
          <SelectedWorksSection />
          <ProcessSection />
          <TestimonialSection />
          <ContactSection />
        </main>
      </div>
    </LanguageProvider>
  );
};

export default Index;
