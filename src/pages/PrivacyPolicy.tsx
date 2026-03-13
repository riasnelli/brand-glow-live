import Navigation from '@/components/Navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const PrivacyPolicy = () => {
  const { t, isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-grow pt-32 pb-16">
        <div className="container max-w-4xl mx-auto px-6">
          <a
            href="/"
            className={`inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8 group`}
          >
            {isRTL ? (
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            ) : (
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            )}
            {t('privacy.back')}
          </a>

          <h1 className="text-4xl md:text-5xl font-bold mb-8 animate-fade-up">
            {t('privacy.title')}
          </h1>

          <div className="prose prose-neutral dark:prose-invert max-w-none animate-fade-up-delay-1 space-y-6">
            <p className="text-lg text-muted-foreground">
              {t('privacy.lastUpdated')} {new Date().toLocaleDateString(isRTL ? 'ar-AE' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">{t('privacy.intro.title')}</h2>
              <p>
                {t('privacy.intro.desc')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">{t('privacy.data.title')}</h2>
              <p>
                {t('privacy.data.desc')}
              </p>
              <ul className={`list-disc mt-2 space-y-2 ${isRTL ? 'pr-6' : 'pl-6'}`}>
                <li>{t('privacy.data.identity')}</li>
                <li>{t('privacy.data.contact')}</li>
                <li>{t('privacy.data.tech')}</li>
                <li>{t('privacy.data.usage')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">{t('privacy.usage.title')}</h2>
              <p>
                {t('privacy.usage.desc')}
              </p>
              <ul className={`list-disc mt-2 space-y-2 ${isRTL ? 'pr-6' : 'pl-6'}`}>
                <li>{t('privacy.usage.contract')}</li>
                <li>{t('privacy.usage.legitimate')}</li>
                <li>{t('privacy.usage.legal')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">{t('privacy.security.title')}</h2>
              <p>
                {t('privacy.security.desc')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">{t('privacy.contact.title')}</h2>
              <p>
                {t('privacy.contact.desc')}
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
