import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import LogoMarquee from '@/components/LogoMarquee';
import ExpertiseSection from '@/components/ExpertiseSection';
import SelectedWorksSection from '@/components/SelectedWorksSection';
import ProcessSection from '@/components/ProcessSection';
import TestimonialSection from '@/components/TestimonialSection';
import { InstagramGallery } from '@/components/InstagramGallery';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <LogoMarquee />
        <ExpertiseSection />
        <SelectedWorksSection />
        <ProcessSection />
        <TestimonialSection />
        <InstagramGallery />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
