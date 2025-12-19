import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  type: 'circle' | 'diamond' | 'ring';
}

interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

const FloatingParticles = ({ count = 15, className = '' }: FloatingParticlesProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const types: Particle['type'][] = ['circle', 'diamond', 'ring'];
    const generated: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * -20,
      opacity: Math.random() * 0.3 + 0.1,
      type: types[Math.floor(Math.random() * types.length)],
    }));
    setParticles(generated);
  }, [count]);

  const renderShape = (particle: Particle) => {
    const baseClasses = 'absolute animate-float';
    
    switch (particle.type) {
      case 'circle':
        return (
          <div
            className={`${baseClasses} rounded-full bg-primary`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        );
      case 'diamond':
        return (
          <div
            className={`${baseClasses} bg-primary rotate-45`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity * 0.7,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        );
      case 'ring':
        return (
          <div
            className={`${baseClasses} rounded-full border border-primary bg-transparent`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size * 2}px`,
              height: `${particle.size * 2}px`,
              opacity: particle.opacity * 0.5,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
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
