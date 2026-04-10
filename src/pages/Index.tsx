import { lazy, Suspense, useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';

// Lazy load below-the-fold components — each in its own dynamic import
// so Vite splits them into separate chunks parsed independently.
const LogoMarquee = lazy(() => import('@/components/LogoMarquee'));
const ExpertiseSection = lazy(() => import('@/components/ExpertiseSection'));
const SelectedWorksSection = lazy(() => import('@/components/SelectedWorksSection'));
const ProcessSection = lazy(() => import('@/components/ProcessSection'));
const TestimonialSection = lazy(() => import('@/components/TestimonialSection'));
const FAQSection = lazy(() => import('@/components/FAQSection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));

const SectionFallback = () => (
  <div className="py-32 bg-background" style={{ minHeight: '300px' }} aria-hidden="true" />
);

// Stagger which sections are mounted so chunk parsing is spread across
// multiple idle frames instead of one big synchronous burst.
const Index = () => {
  // readyLevel: 0 = nothing, 1 = first batch (marquee+expertise), 2 = all
  const [readyLevel, setReadyLevel] = useState(0);

  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;

    const kickoff = () => {
      // First batch: lightweight sections after a short idle gap
      t1 = setTimeout(() => setReadyLevel(1), 200);
      // Second batch: heavier sections slightly later
      t2 = setTimeout(() => setReadyLevel(2), 600);
    };

    // On mobile/touch: wait for scroll or touch — avoids loading before
    // the user interacts. On desktop: use a fixed 2 s delay so the main
    // thread is free during the critical LCP window (avoids the long task
    // that mousemove used to trigger immediately on desktop).
    const isTouchDevice = window.matchMedia('(hover: none)').matches;

    if (isTouchDevice) {
      const onInteraction = () => {
        window.removeEventListener('scroll', onInteraction);
        window.removeEventListener('touchstart', onInteraction);
        clearTimeout(fallback);
        kickoff();
      };
      window.addEventListener('scroll', onInteraction, { passive: true, once: true });
      window.addEventListener('touchstart', onInteraction, { passive: true, once: true });
      // Failsafe for touch devices
      var fallback = setTimeout(kickoff, 3000);
    } else {
      // Desktop: fixed 2 s delay — keeps main thread clear during TBT window
      t1 = setTimeout(() => setReadyLevel(1), 2000);
      t2 = setTimeout(() => setReadyLevel(2), 2400);
      // Allow scroll to accelerate loading on desktop too
      const onScroll = () => {
        clearTimeout(t1);
        clearTimeout(t2);
        kickoff();
      };
      window.addEventListener('scroll', onScroll, { passive: true, once: true });
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        {readyLevel >= 1 ? (
          <>
            <Suspense fallback={<SectionFallback />}>
              <LogoMarquee />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <ExpertiseSection />
            </Suspense>
          </>
        ) : (
          <div style={{ minHeight: '600px' }} aria-hidden="true" />
        )}
        {readyLevel >= 2 ? (
          <>
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
          <div style={{ minHeight: '2400px' }} aria-hidden="true" />
        )}
      </main>
    </div>
  );
};

export default Index;
