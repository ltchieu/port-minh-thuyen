import React, { useEffect, useState } from 'react';

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
}

interface SparkleOverlayProps {
  enabled: boolean;
  cursorTrail: boolean;
}

const PASTEL_COLORS = ['#FF8DA1', '#81D8D0', '#A0E4DE', '#94B49F', '#FFB380', '#FFBDC9', '#F2789F'];

export const SparkleOverlay: React.FC<SparkleOverlayProps> = ({ enabled, cursorTrail }) => {
  const [trailParticles, setTrailParticles] = useState<SparkleParticle[]>([]);

  // Fixed background twinkling stars
  const backgroundSparkles = [
    { top: '8%', left: '5%', color: '#FF8DA1', size: 18, delay: '0s' },
    { top: '15%', left: '88%', color: '#81D8D0', size: 22, delay: '1s' },
    { top: '28%', left: '12%', color: '#94B49F', size: 16, delay: '2s' },
    { top: '42%', left: '92%', color: '#FFB380', size: 20, delay: '0.5s' },
    { top: '55%', left: '6%', color: '#F2789F', size: 24, delay: '1.5s' },
    { top: '68%', left: '85%', color: '#81D8D0', size: 18, delay: '2.5s' },
    { top: '82%', left: '10%', color: '#FFB380', size: 20, delay: '1s' },
    { top: '94%', left: '90%', color: '#FF8DA1', size: 16, delay: '0.2s' },
  ];

  useEffect(() => {
    if (!cursorTrail) return;

    let counter = 0;
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle particle creation
      if (Math.random() > 0.4) return;

      const newParticle: SparkleParticle = {
        id: Date.now() + counter++,
        x: e.clientX,
        y: e.clientY,
        size: Math.floor(Math.random() * 12) + 8,
        color: PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)],
        duration: Math.random() * 0.8 + 0.4,
      };

      setTrailParticles((prev) => [...prev.slice(-15), newParticle]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorTrail]);

  // Clean up old trail particles
  useEffect(() => {
    if (trailParticles.length === 0) return;
    const timer = setTimeout(() => {
      setTrailParticles((prev) => prev.slice(1));
    }, 600);
    return () => clearTimeout(timer);
  }, [trailParticles]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {/* Twinkling background stars */}
      {backgroundSparkles.map((star, idx) => (
        <div
          key={idx}
          className="absolute animate-sparkle-float transition-opacity duration-500"
          style={{
            top: star.top,
            left: star.left,
            color: star.color,
            fontSize: `${star.size}px`,
            animationDelay: star.delay,
          }}
        >
          ✨
        </div>
      ))}

      {/* Mouse trail cursor sparkles */}
      {cursorTrail &&
        trailParticles.map((p) => (
          <div
            key={p.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 animate-ping"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              fontSize: `${p.size}px`,
              color: p.color,
              animationDuration: `${p.duration}s`,
            }}
          >
            ✦
          </div>
        ))}
    </div>
  );
};
