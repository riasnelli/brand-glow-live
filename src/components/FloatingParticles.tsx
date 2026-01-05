import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  type: 'circle' | 'diamond' | 'ring' | 'star';
  floatRange: number;
}

interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

const FloatingParticles = ({ count = 25, className = '' }: FloatingParticlesProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const types: Particle['type'][] = ['circle', 'diamond', 'ring', 'star'];
    const generated: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 3,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * -15,
      opacity: Math.random() * 0.4 + 0.15,
      type: types[Math.floor(Math.random() * types.length)],
      floatRange: Math.random() * 30 + 20,
    }));
    setParticles(generated);
  }, [count]);

  const renderShape = (particle: Particle) => {
    const baseStyle = {
      left: `${particle.x}%`,
      top: `${particle.y}%`,
      animationDuration: `${particle.duration}s`,
      animationDelay: `${particle.delay}s`,
      '--float-range': `${particle.floatRange}px`,
    } as React.CSSProperties;
    
    switch (particle.type) {
      case 'circle':
        return (
          <div
            className="absolute rounded-full bg-primary animate-particle-float"
            style={{
              ...baseStyle,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size * 2}px hsl(var(--primary) / 0.3)`,
            }}
          />
        );
      case 'diamond':
        return (
          <div
            className="absolute bg-primary rotate-45 animate-particle-spin"
            style={{
              ...baseStyle,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity * 0.8,
            }}
          />
        );
      case 'ring':
        return (
          <div
            className="absolute rounded-full border-2 border-primary bg-transparent animate-particle-pulse"
            style={{
              ...baseStyle,
              width: `${particle.size * 2.5}px`,
              height: `${particle.size * 2.5}px`,
              opacity: particle.opacity * 0.6,
            }}
          />
        );
      case 'star':
        return (
          <div
            className="absolute animate-particle-twinkle"
            style={{
              ...baseStyle,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
            }}
          >
            <svg viewBox="0 0 24 24" fill="hsl(var(--primary))" className="w-full h-full">
              <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <div key={particle.id}>{renderShape(particle)}</div>
      ))}
    </div>
  );
};

export default FloatingParticles;
