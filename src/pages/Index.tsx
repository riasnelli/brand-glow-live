import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import LogoMarquee from '@/components/LogoMarquee';
import PhilosophySection from '@/components/PhilosophySection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <LogoMarquee />
        <PhilosophySection />
      </main>
    </div>
  );
};

export default Index;
