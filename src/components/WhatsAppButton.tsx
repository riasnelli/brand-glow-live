import { useLanguage } from '@/contexts/LanguageContext';

const PHONE = '919497127222';

const WhatsAppButton = () => {
  const { language, isRTL } = useLanguage();

  const message =
    language === 'ar'
      ? 'مرحباً ريانيلي، أرغب في مناقشة مشروع هوية تجارية.'
      : "Hi Riasnelli, I'd like to discuss a branding project for my business.";

  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
  const label = language === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className={`fixed bottom-5 z-[90] flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] hover:scale-110 hover:shadow-[0_12px_30px_rgba(37,211,102,0.6)] transition-all duration-300 ${
        isRTL ? 'left-5' : 'right-5'
      }`}
    >
      <svg
        viewBox="0 0 32 32"
        className="w-7 h-7"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.876 2.722.876.817 0 2.15-.515 2.478-1.318.13-.33.245-.515.245-.815 0-.4-2.394-1.66-2.71-1.66ZM15.92 30.5c-3.043 0-6.044-1.045-8.464-2.95l-5.92 1.55 1.575-5.74C1.025 20.85 0 17.96 0 14.93 0 6.7 7.156 0 16 0c4.298 0 8.343 1.55 11.358 4.45 3.013 2.9 4.642 6.75 4.642 10.85 0 8.235-7.156 14.93-16 14.93l-.08-.07Zm-1.43-22c-3.5 0-6.357 2.78-6.357 6.197 0 1.305.41 2.61 1.18 3.685l.187.27-.794 2.84 2.943-.76.27.16c1.075.62 2.295.95 3.557.95 3.5 0 6.358-2.78 6.358-6.198 0-1.66-.66-3.21-1.86-4.38-1.2-1.17-2.795-1.81-4.484-1.81v.046Z" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
