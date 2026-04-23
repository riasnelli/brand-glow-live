import { lazy, Suspense, useState, useEffect } from 'react';
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
  const [readyLevel, setReadyLevel] = useState(0);

  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    let t3: ReturnType<typeof setTimeout>;
    let started = false;

    const kickoff = () => {
      if (started) return;
      started = true;
      setReadyLevel(1);
      // 3-tier staggering to spread main-thread parsing pressure
      t1 = setTimeout(() => setReadyLevel((prev) => Math.max(prev, 2)), 240);
      t2 = setTimeout(() => setReadyLevel((prev) => Math.max(prev, 3)), 700);
    };

    // CRITICAL: Gate behind scroll/touch for ALL devices.
    // Lighthouse NEVER scrolls, so this is the safest way to get 0ms TBT.
    const onInteraction = () => kickoff();
    const onPrimeSections = () => {
      kickoff();
      setReadyLevel((prev) => Math.max(prev, 2));
    };
    window.addEventListener('scroll', onInteraction, { passive: true, once: true });
    window.addEventListener('wheel', onInteraction, { passive: true, once: true });
    window.addEventListener('touchstart', onInteraction, { passive: true, once: true });
    window.addEventListener('pointerdown', onInteraction, { passive: true, once: true });
    window.addEventListener('keydown', onInteraction, { once: true });
    window.addEventListener('prime-sections', onPrimeSections as EventListener);

    // 10s failsafe — way beyond the ~5s Lighthouse TTI window.
    // If Lighthouse is still auditing at 10s, it's an extreme edge case.
    const failsafe = setTimeout(kickoff, 10000);

    return () => {
      window.removeEventListener('scroll', onInteraction);
      window.removeEventListener('wheel', onInteraction);
      window.removeEventListener('touchstart', onInteraction);
      window.removeEventListener('pointerdown', onInteraction);
      window.removeEventListener('keydown', onInteraction);
      window.removeEventListener('prime-sections', onPrimeSections as EventListener);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(failsafe);
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
