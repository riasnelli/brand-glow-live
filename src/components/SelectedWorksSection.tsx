import { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

interface InstagramPost {
  id: string;
  type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  imageUrl: string;
  permalink: string;
  caption: string;
  timestamp: string;
  carouselImages?: string[];
}

const gradients = [
  'from-primary/20 to-primary/5',
  'from-muted to-muted/50',
  'from-primary/15 to-muted/30',
  'from-primary/25 to-primary/10',
];

// Parse hashtags from caption: first hashtag = title, second = subtitle
const parseHashtags = (caption: string | undefined): { title: string; subtitle: string } => {
  if (!caption) return { title: 'Untitled Project', subtitle: 'Creative Work' };
  
  const hashtagRegex = /#([^#\n]+?)(?=\s*#|\s*\n|$)/g;
  const matches = [...caption.matchAll(hashtagRegex)];
  
  const title = matches[0]?.[1]?.trim() || 'Untitled Project';
  const subtitle = matches[1]?.[1]?.trim() || 'Creative Work';
  
  return { title, subtitle };
};

// Extract year from timestamp
const getYear = (timestamp: string | undefined): string => {
  if (!timestamp) return new Date().getFullYear().toString();
  return new Date(timestamp).getFullYear().toString();
};

// Lightbox component
const ImageLightbox = ({
  images,
  initialIndex,
  title,
  permalink,
  onClose,
}: {
  images: string[];
  initialIndex: number;
  title: string;
  permalink: string;
  onClose: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const { t } = useLanguage();

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, goToPrevious, goToNext]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) goToNext();
    else if (distance < -50) goToPrevious();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        aria-label="Close"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      {/* Counter */}
      {images.length > 1 && (
        <div className="absolute top-4 left-4 z-50 text-white/70 text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Image */}
      <div
        className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={images[currentIndex]}
          alt={`${title} - ${currentIndex + 1}`}
          className="max-w-full max-h-[85vh] object-contain rounded-lg"
          draggable={false}
        />

        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 md:-left-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 md:-right-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </>
        )}
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        {images.length > 1 && (
          <div className="flex items-center gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white w-3' : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
        <a
          href={permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white text-xs transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          {t('works.viewAll')} →
        </a>
      </div>
    </div>
  );
};

// Mini carousel component for each project card
const ProjectImageCarousel = ({ 
  images, 
  alt, 
}: { 
  images: string[]; 
  alt: string; 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const goToPrevious = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(index);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance && images.length > 1) goToNext();
    else if (distance < -minSwipeDistance && images.length > 1) goToPrevious();
  };

  return (
    <div 
      className="relative w-full h-full touch-pan-y"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`${alt} - ${index + 1}`}
          width={600}
          height={450}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 grayscale dark:grayscale-0 group-hover:grayscale-0 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      ))}

      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className={`absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
            }`}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-gray-700" />
          </button>

          <button
            onClick={goToNext}
            className={`absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
            }`}
            aria-label="Next image"
          >
            <ChevronRight className="w-3.5 h-3.5 text-gray-700" />
          </button>

          <div
            className={`absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => goToSlide(e, index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white w-2 h-2'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />
    </div>
  );
};

const SelectedWorksSection = () => {
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<{
    images: string[];
    title: string;
    permalink: string;
  } | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchInstagramFeed = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.functions.invoke('instagram-feed', {
          body: {},
        });

        if (error || data?.error) {
          console.error('Instagram fetch error:', error || data?.error);
          setInstagramPosts([]);
        } else {
          setInstagramPosts((data.media || []).slice(0, 6));
        }
      } catch (err) {
        console.error('Error fetching Instagram feed:', err);
        setInstagramPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramFeed();
  }, []);

  type ProjectItem = {
    key: string;
    title: string;
    category: string;
    year: string;
    gradient: string;
    instagramPost: InstagramPost | null;
    allImages: string[];
  };

  const projects: ProjectItem[] = loading
    ? []
    : (instagramPosts || [])
        .filter((post) => Boolean(post?.imageUrl))
        .slice(0, 6)
        .map((post, index) => {
          const { title, subtitle } = parseHashtags(post.caption);
          const allImages = post.carouselImages && post.carouselImages.length > 0
            ? post.carouselImages
            : [post.imageUrl];
          
          return {
            key: post.id ?? `post-${index}`,
            title,
            category: subtitle,
            year: getYear(post.timestamp),
            gradient: gradients[index % gradients.length],
            instagramPost: post,
            allImages,
          };
        });

  const handleProjectClick = (e: React.MouseEvent, project: ProjectItem) => {
    // If multiple images, open lightbox; otherwise go to Instagram
    if (project.allImages.length > 1) {
      e.preventDefault();
      setLightbox({
        images: project.allImages,
        title: project.title,
        permalink: project.instagramPost?.permalink || '#',
      });
    }
  };

  return (
    <section id="work" className="py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-muted/30 via-background to-background pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block animate-fade-up">
              {t('works.label')}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold animate-fade-up-delay-1">
              <span className="text-foreground">{t('works.heading1')}</span>
              <span className="text-primary">{t('works.heading2')}</span>
            </h2>
          </div>
          <a 
            href="#work" 
            className="text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2 group animate-fade-up-delay-2"
          >
            {t('works.viewAll')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <span className="text-muted-foreground text-sm">{t('works.loading')}</span>
            <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-primary/50 rounded-full animate-[shimmer_1.5s_ease-in-out_infinite]" />
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-muted-foreground">{t('works.empty')}</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <a
                key={project.key}
                href={project.instagramPost?.permalink || '#work'}
                target={project.instagramPost ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className={`group relative animate-fade-up block ${index % 2 === 1 ? 'md:mt-16' : ''}`}
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
                onClick={(e) => handleProjectClick(e, project)}
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-4 cursor-pointer">
                  {project.allImages.length > 0 ? (
                    <ProjectImageCarousel
                      images={project.allImages}
                      alt={project.title}
                    />
                  ) : (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
                      <div 
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: `radial-gradient(circle, hsl(var(--muted-foreground) / 0.3) 1px, transparent 1px)`,
                          backgroundSize: '16px 16px',
                        }}
                      />
                    </>
                  )}
                  
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>

                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {project.category}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground/50 px-3 py-1 rounded-full border border-border/30">
                    {project.year}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <ImageLightbox
          images={lightbox.images}
          initialIndex={0}
          title={lightbox.title}
          permalink={lightbox.permalink}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
};

export default SelectedWorksSection;
