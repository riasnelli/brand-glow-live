import { lazy, Suspense, useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import { Toaster } from "@/components/ui/toaster";

// Lazy load below-the-fold components — each in its own dynamic import
// so Vite splits them into separate chunks parsed independently.
const LogoMarquee = lazy(() => import('@/components/LogoMarquee'));
const ExpertiseSection = lazy(() => import('@/components/ExpertiseSection'));
const SelectedWorksSection = lazy(() => import('@/components/SelectedWorksSection'));
const ProcessSection = lazy(() => import('@/components/ProcessSection'));
const TestimonialSection = lazy(() => import('@/components/TestimonialSection'));
const FAQSection = lazy(() => import('@/components/FAQSection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));
const Footer = lazy(() => import('@/components/Footer'));

const SectionFallback = () => (
  <div className="py-32 bg-background flex items-center justify-center" style={{ minHeight: '400px' }} aria-hidden="true">
    <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
  </div>
);

const Index = () => {
  const [readyLevel, setReadyLevel] = useState(1);

  useEffect(() => {
    const t1 = window.setTimeout(() => setReadyLevel((prev) => Math.max(prev, 2)), 180);
    const t2 = window.setTimeout(() => setReadyLevel((prev) => Math.max(prev, 3)), 600);
    const onPrimeSections = () => setReadyLevel((prev) => Math.max(prev, 2));
    window.addEventListener('prime-sections', onPrimeSections as EventListener);

    return () => {
      window.removeEventListener('prime-sections', onPrimeSections as EventListener);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        
        {readyLevel >= 1 && (
          <Suspense fallback={<SectionFallback />}>
            <LogoMarquee />
            <ExpertiseSection />
          </Suspense>
        )}

        {readyLevel >= 2 && (
          <Suspense fallback={<SectionFallback />}>
            <SelectedWorksSection />
            <ProcessSection />
            <TestimonialSection />
          </Suspense>
        )}

        {readyLevel >= 3 && (
          <>
            <Suspense fallback={<SectionFallback />}>
              <FAQSection />
              <ContactSection />
              <Footer />
            </Suspense>
            <Toaster />
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
