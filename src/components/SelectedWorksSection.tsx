import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

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
  
  // Match hashtags - handles hashtags with spaces like "#Aravind's Burger Factory"
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

const SelectedWorksSection = () => {
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

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
          // Get all posts
          setInstagramPosts(data.media || []);
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
  };

  // Build projects from all Instagram posts
  const projects: ProjectItem[] = loading
    ? []
    : (instagramPosts || [])
        .filter((post) => Boolean(post?.imageUrl))
        .map((post, index) => {
          const { title, subtitle } = parseHashtags(post.caption);
          return {
            key: post.id ?? `post-${index}`,
            title,
            category: subtitle,
            year: getYear(post.timestamp),
            gradient: gradients[index % gradients.length],
            instagramPost: post,
          };
        });

  return (
    <section id="work" className="py-32 bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/30 via-background to-background pointer-events-none" />
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      {/* Corner glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block animate-fade-up">
              Case Studies
            </span>
            <h2 className="text-4xl md:text-5xl font-bold animate-fade-up-delay-1">
              <span className="text-foreground">Selected </span>
              <span className="text-primary">Work</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground animate-fade-up-delay-2">
            <span className="text-sm">{projects.length} Projects</span>
            <span className="text-primary">•</span>
            <span className="text-sm">Swipe to explore</span>
          </div>
        </div>

        {/* Projects Carousel */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <span className="text-muted-foreground text-sm">Loading projects...</span>
            <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-primary/50 rounded-full animate-[shimmer_1.5s_ease-in-out_infinite]" />
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-muted-foreground">
            No work to show right now.
          </div>
        ) : (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {projects.map((project, index) => (
                <CarouselItem key={project.key} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <a
                    href={project.instagramPost?.permalink || '#work'}
                    target={project.instagramPost ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="group relative animate-fade-up block"
                    style={{ animationDelay: `${(index + 1) * 50}ms` }}
                  >
                    {/* Project Card */}
                    <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-4 cursor-pointer">
                      {/* Instagram Image */}
                      {project.instagramPost?.imageUrl ? (
                        <img
                          src={project.instagramPost.imageUrl}
                          alt={project.instagramPost.caption?.slice(0, 100) || project.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
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
                      
                      {/* Carousel indicator for multi-image posts */}
                      {project.instagramPost?.carouselImages && project.instagramPost.carouselImages.length > 0 && (
                        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                          <div className="flex gap-1">
                            {[...Array(Math.min(project.instagramPost.carouselImages.length + 1, 5))].map((_, i) => (
                              <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/70" />
                            ))}
                            {project.instagramPost.carouselImages.length > 4 && (
                              <span className="text-white/70 text-xs ml-1">+{project.instagramPost.carouselImages.length - 4}</span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
                      
                      {/* View indicator on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20">
                          <ArrowRight className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300 truncate">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground text-sm truncate">
                          {project.category}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground/50 px-2 py-1 rounded-full border border-border/30 ml-2 flex-shrink-0">
                        {project.year}
                      </span>
                    </div>
                  </a>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Custom Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <CarouselPrevious className="relative inset-auto translate-y-0 bg-muted/50 hover:bg-muted border-border/50 hover:border-primary/50 transition-all duration-300" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Drag or use arrows</span>
              </div>
              <CarouselNext className="relative inset-auto translate-y-0 bg-muted/50 hover:bg-muted border-border/50 hover:border-primary/50 transition-all duration-300" />
            </div>
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default SelectedWorksSection;
