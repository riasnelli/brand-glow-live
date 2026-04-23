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
  <div className="bg-background py-20 md:py-24" aria-hidden="true">
    <div className="container mx-auto px-6">
      <div className="space-y-6 rounded-[2rem] border border-border/40 bg-card/35 p-8 md:p-10">
        <div className="skeleton-shimmer h-4 w-32 rounded-full bg-muted/70" />
        <div className="skeleton-shimmer h-12 w-full max-w-2xl rounded-2xl bg-card/80 md:h-14" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-4 rounded-[1.5rem] border border-border/30 bg-card/50 p-6">
              <div className="skeleton-shimmer h-44 rounded-[1.25rem] bg-muted/50" />
              <div className="skeleton-shimmer h-6 w-2/3 rounded-full bg-card/80" />
              <div className="skeleton-shimmer h-4 w-full rounded-full bg-muted/60" />
              <div className="skeleton-shimmer h-4 w-5/6 rounded-full bg-muted/40" />
            </div>
          ))}
        </div>
      </div>
    </div>
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
