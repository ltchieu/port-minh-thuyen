import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faWandMagicSparkles,
  faCamera,
  faLocationDot
} from '@fortawesome/free-solid-svg-icons';
import confetti from 'canvas-confetti';

export interface PolaroidCard3DProps {
  imageSrc: string;
  alt?: string;
  name?: string;
  caption?: string;
  date?: string;
  className?: string;
}

export const PolaroidCard3D: React.FC<PolaroidCard3DProps> = ({
  imageSrc,
  alt = 'Lê Thị Kim Thuyên',
  name = 'Lê Thị Kim Thuyên',
  caption = 'sáng tạo nội dung chạm cảm xúc ✦',
  date = 'Saigon • 2026',
  className = ''
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [likes, setLikes] = useState(24);
  const [hasLiked, setHasLiked] = useState(false);

  // Motion values for smooth 3D tilt tracking
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 260 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Tilt degrees
  const rotateX = useTransform(smoothY, [0, 1], [10, -10]);
  const rotateY = useTransform(smoothX, [0, 1], [-10, 10]);

  // Dynamic light glare gradient position
  const glareBackground = useTransform(
    [smoothX, smoothY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0) 80%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    }

    const rect = cardRef.current?.getBoundingClientRect();
    const originX = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.7;
    const originY = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.7;

    confetti({
      particleCount: 35,
      spread: 55,
      origin: { x: originX, y: originY },
      colors: ['#FF8DA1', '#52C0B6', '#FFA366', '#FFE3E8', '#FFD166'],
      scalar: 1.0,
      disableForReducedMotion: true
    });
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Tiffany Washi Tape on top of Polaroid */}
      <div className="washi-tape-tiffany absolute -top-4 z-30 h-7 w-36 -rotate-2 shadow-xs transition-transform duration-300 hover:rotate-0" />

      {/* 3D Perspective Card Wrapper */}
      <div style={{ perspective: 1200 }} className="relative w-full max-w-[340px] sm:max-w-[360px]">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          whileHover={{ scale: 1.03 }}
          transition={{ scale: { duration: 0.25 } }}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d'
          }}
          className="group relative rounded-3xl border-2 border-stone-200/90 bg-[#FAF7F2] p-3 sm:p-4 pb-6 sm:pb-7 shadow-xl shadow-pink-950/5 transition-shadow duration-500 hover:shadow-2xl hover:shadow-pink-500/15"
        >
          {/* Dynamic Glare Overlay */}
          <motion.div
            style={{ background: glareBackground }}
            className={`pointer-events-none absolute inset-0 z-20 rounded-3xl transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Top Heart Badge Pill with 3D Pop */}
          <div
            className="absolute top-6 right-6 z-25"
            style={{ transform: 'translateZ(40px)' }}
          >
            <button
              type="button"
              onClick={handleHeartClick}
              title="Thả tim cho Kim Thuyên"
              className="group/btn flex items-center gap-1.5 rounded-full border border-pink-200 bg-white/95 px-3 py-1 text-xs font-bold text-[#F2789F] shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#FF8DA1] hover:bg-[#FFE3E8] cursor-pointer"
            >
              <FontAwesomeIcon
                icon={faHeart}
                className={`h-3.5 w-3.5 transition-transform group-hover/btn:scale-125 ${
                  hasLiked ? 'text-[#F2789F] scale-110' : 'text-pink-400'
                }`}
              />
              <span className="font-sans-clean text-xs font-bold">{likes}</span>
            </button>
          </div>

          {/* Photo Frame Container (Instant Polaroid Image Area with 3D Depth) */}
          <div
            style={{ transform: 'translateZ(25px)' }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-pink-100/80 bg-gradient-to-b from-[#FFF0F3] via-[#FFEBF0] to-[#FFDEE6] shadow-inner flex items-center justify-center"
          >
            {/* Soft Ambient Radial Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.7)_0%,_rgba(255,255,255,0)_70%)] pointer-events-none" />

            {/* Sparkle Watermark Icon */}
            <div className="absolute top-3 left-3 opacity-60 text-[#F2789F] pointer-events-none">
              <FontAwesomeIcon icon={faWandMagicSparkles} className="h-4 w-4" />
            </div>

            {/* Subject Image (Kim Thuyên holding camera) */}
            <motion.img
              src={imageSrc}
              alt={alt}
              className="relative z-10 h-full w-full object-contain drop-shadow-[0_12px_20px_rgba(242,120,159,0.25)] transition-transform duration-500 group-hover:scale-105"
              draggable="false"
            />

            {/* Vintage Postmark Stamp Badge (Bottom-Right of photo area) */}
            <div
              className="absolute bottom-2 right-2 z-15 pointer-events-none"
              style={{ transform: 'translateZ(15px)' }}
            >
              <div className="flex h-12 w-12 -rotate-12 items-center justify-center rounded-full border-2 border-dashed border-[#F2789F]/50 bg-white/75 backdrop-blur-xs p-1 text-center text-[#F2789F] shadow-xs">
                <span className="font-handwritten text-[10px] font-bold leading-tight">
                  SAIGON<br />✦ 2026
                </span>
              </div>
            </div>
          </div>

          {/* Polaroid Bottom Margin: Handwritten Caption & Label with 3D Pop */}
          <div
            className="mt-4 px-2 text-center"
            style={{ transform: 'translateZ(30px)' }}
          >
            <h4 className="font-editorial text-xl sm:text-2xl font-bold text-stone-800 tracking-tight">
              {name}
            </h4>

            <p className="mt-1 font-handwritten text-lg sm:text-xl font-bold text-[#F2789F] -rotate-1">
              "{caption}"
            </p>

            <div className="mt-2.5 flex items-center justify-center gap-2 font-sans-clean text-[11px] font-semibold text-stone-500">
              <FontAwesomeIcon icon={faLocationDot} className="h-3 w-3 text-[#52C0B6]" />
              <span>{date}</span>
              <span className="text-stone-300">•</span>
              <span className="text-[#52C0B6] font-bold">Content Marketer</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Washi Tape Corner Pin (Bottom-Left) */}
      <div className="washi-tape-pink absolute -bottom-3 -left-2 z-20 h-5 w-24 rotate-6 shadow-xs hidden sm:block" />
    </div>
  );
};

export default PolaroidCard3D;
