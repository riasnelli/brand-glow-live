import { lazy, Suspense, useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';

// Lazy load below-the-fold components
const LogoMarquee = lazy(() => import('@/components/LogoMarquee'));
const ExpertiseSection = lazy(() => import('@/components/ExpertiseSection'));
const SelectedWorksSection = lazy(() => import('@/components/SelectedWorksSection'));
const ProcessSection = lazy(() => import('@/components/ProcessSection'));
const TestimonialSection = lazy(() => import('@/components/TestimonialSection'));
const FAQSection = lazy(() => import('@/components/FAQSection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));

const SectionFallback = () => (
  <div className="py-32 bg-background min-h-screen" aria-hidden="true" />
);

const Index = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const setReady = () => setIsReady(true);
    window.addEventListener('scroll', setReady, { passive: true, once: true });
    window.addEventListener('mousemove', setReady, { passive: true, once: true });
    window.addEventListener('touchstart', setReady, { passive: true, once: true });
    
    // Failsafe timeout
    const timer = setTimeout(setReady, 3000);
    
    return () => {
      window.removeEventListener('scroll', setReady);
      window.removeEventListener('mousemove', setReady);
      window.removeEventListener('touchstart', setReady);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        {isReady ? (
          <>
            <Suspense fallback={<SectionFallback />}>
              <LogoMarquee />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <ExpertiseSection />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <SelectedWorksSection />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <ProcessSection />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <TestimonialSection />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <FAQSection />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <ContactSection />
            </Suspense>
          </>
        ) : (
          <div style={{ minHeight: '3000px' }} aria-hidden="true" />
        )}
      </main>
    </div>
  );
};

export default Index;
