import { useState, useEffect } from 'react';
import { Instagram, ExternalLink, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface InstagramPost {
  id: string;
  type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  imageUrl: string;
  permalink: string;
  caption: string;
  timestamp: string;
}

export const InstagramGallery = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstagramFeed = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fnError } = await supabase.functions.invoke('instagram-feed', {
          body: {},
        });

        if (fnError) {
          throw new Error(fnError.message);
        }

        if (data?.error) {
          throw new Error(data.error);
        }

        setPosts(data.media || []);
      } catch (err) {
        console.error('Error fetching Instagram feed:', err);
        setError(err instanceof Error ? err.message : 'Failed to load Instagram feed');
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramFeed();
  }, []);

  if (loading) {
    return (
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Instagram className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">Instagram</h2>
          </div>
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Instagram className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">Instagram</h2>
          </div>
          <div className="text-center py-12">
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <Instagram className="w-8 h-8 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold">Instagram</h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg bg-card"
            >
              <img
                src={post.imageUrl}
                alt={post.caption?.slice(0, 100) || 'Instagram post'}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ExternalLink className="w-8 h-8 text-white" />
              </div>

              {/* Carousel indicator */}
              {post.type === 'CAROUSEL_ALBUM' && (
                <div className="absolute top-2 right-2 bg-black/50 rounded-md p-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6h2v12H4zm4 0h2v12H8zm4 0h8a2 2 0 012 2v8a2 2 0 01-2 2h-8a2 2 0 01-2-2V8a2 2 0 012-2z" />
                  </svg>
                </div>
              )}

              {/* Video indicator */}
              {post.type === 'VIDEO' && (
                <div className="absolute top-2 right-2 bg-black/50 rounded-md p-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
            </a>
          ))}
        </div>

        {/* Follow CTA */}
        <div className="flex justify-center mt-10">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            <Instagram className="w-5 h-5" />
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
};
