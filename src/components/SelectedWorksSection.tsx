import { useState, useEffect } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface InstagramPost {
  id: string;
  type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  imageUrl: string;
  permalink: string;
  caption: string;
  timestamp: string;
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
          // Get only the first 6 posts
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
  };

  // Build projects from Instagram posts with parsed metadata.
  // No placeholders: render ONLY real posts (max 6) once loaded.
  const projects: ProjectItem[] = loading
    ? []
    : (instagramPosts || [])
        .filter((post) => Boolean(post?.imageUrl))
        .slice(0, 6)
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
          <a 
            href="#work" 
            className="text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2 group animate-fade-up-delay-2"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>

        {/* Projects Grid - Masonry-like layout */}
        {!loading && projects.length === 0 ? (
          <div className="text-muted-foreground">
            No work to show right now.
          </div>
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
              >
              {/* Project Card */}
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-4 cursor-pointer">
                {/* Instagram Image or Gradient Background */}
                {loading ? (
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                    <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
                  </div>
                ) : project.instagramPost?.imageUrl ? (
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
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                
                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>

              {/* Project Info */}
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
    </section>
  );
};

export default SelectedWorksSection;
