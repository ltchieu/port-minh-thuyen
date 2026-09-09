import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWandMagicSparkles,
  faArrowDown,
  faHeart,
  faStar,
  faVideo
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faTiktok,
  faInstagram,
  faThreads
} from '@fortawesome/free-brands-svg-icons';
import { PortfolioData } from '../types';
import { CornerSticker } from './common/CuteStickers';

interface HeroSectionProps {
  data: PortfolioData['hero'];
}

export const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  // 3D Interactive Mouse Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 190, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D tilt angles
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);

  // Parallax offsets for multi-plane depth
  const avatarTranslateX = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const avatarTranslateY = useTransform(smoothY, [-0.5, 0.5], [-16, 16]);

  const badge1X = useTransform(smoothX, [-0.5, 0.5], [22, -22]);
  const badge1Y = useTransform(smoothY, [-0.5, 0.5], [22, -22]);

  const badge2X = useTransform(smoothX, [-0.5, 0.5], [-26, 26]);
  const badge2Y = useTransform(smoothY, [-0.5, 0.5], [-26, 26]);

  const auraX = useTransform(smoothX, [-0.5, 0.5], [25, -25]);
  const auraY = useTransform(smoothY, [-0.5, 0.5], [25, -25]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="hero" className="relative min-h-[90vh] overflow-hidden px-4 pt-8 pb-16 md:px-6 md:pt-12">
      {/* Decorative Washi Tape & Background Shapes */}
      <div className="pointer-events-none absolute left-10 top-20 h-32 w-32 rounded-full bg-[#FFE3E8] opacity-60 blur-2xl"></div>
      <div className="pointer-events-none absolute right-12 top-40 h-40 w-40 rounded-full bg-[#81D8D0]/30 opacity-60 blur-2xl"></div>

      <div className="mx-auto max-w-[92rem]">
        {/* Handwritten Scribble Intro (Matching Image 1) */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-2 flex items-center gap-2"
        >
          <span className="inline-block rounded-full bg-[#FFE3E8] px-3 py-1 font-handwritten text-xl font-bold text-[#F2789F] shadow-sm rotate-1">
            {data.handwrittenGreeting}
          </span>
        </motion.div>

        {/* Hero Grid Layout */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* Left Column: Titles & Description */}
          <div className="lg:col-span-6">
            {/* GIANT PLUSH FLUFFY PORTFOLIO TITLE (Matching Image 2) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative my-2"
            >
              <h1 className="font-fluffy text-5xl font-black tracking-wider sm:text-7xl lg:text-8xl text-fluffy-pink">
                {data.mainTitle}
              </h1>
              {/* Floating Sparkle Accent */}
              <span className="absolute -right-2 -top-4 text-3xl animate-bounce">✨</span>
            </motion.div>

            {/* Subtitle & Role */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 space-y-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#FF8DA1]/20 px-3.5 py-1 font-sans-clean text-xs font-bold uppercase tracking-wider text-[#D84C72]">
                  Content Marketing
                </span>
                <span className="rounded-full bg-[#81D8D0]/30 px-3.5 py-1 font-sans-clean text-xs font-bold uppercase tracking-wider text-[#2A726C]">
                  Social Media
                </span>
                <span className="rounded-full bg-[#FFB380]/30 px-3.5 py-1 font-sans-clean text-xs font-bold uppercase tracking-wider text-[#A05118]">
                  Short-form Video
                </span>
              </div>

              <h2 className="font-editorial text-2xl font-semibold italic text-stone-800 md:text-3xl">
                {data.subtitle}
              </h2>

              <p className="max-w-xl font-sans-clean text-base leading-relaxed text-stone-600 md:text-lg">
                {data.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full bg-[#FF8DA1] px-7 py-3 font-sans-clean text-sm font-bold text-white shadow-lg shadow-pink-200 transition-transform hover:scale-105 active:scale-95"
                >
                  <FontAwesomeIcon icon={faWandMagicSparkles} className="h-4 w-4" />
                  Explore Projects
                </a>

                <a
                  href="#about"
                  className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white/80 px-6 py-3 font-sans-clean text-sm font-semibold text-stone-800 shadow-sm transition-transform hover:bg-stone-50 hover:scale-105"
                >
                  <FontAwesomeIcon icon={faHeart} className="h-4 w-4 text-[#F2789F]" />
                  About Kim Thuyên
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D Pop-Up Interactive Avatar (No Container Frame) */}
          <div
            className="relative flex justify-center items-center lg:col-span-6 py-4 select-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1200 }}
          >
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl flex items-center justify-center cursor-pointer"
            >
              {/* 3D Depth Layer -1: Breathing Pastel Glow Halo */}
              <motion.div
                style={{
                  x: auraX,
                  y: auraY,
                  transform: 'translateZ(-50px)',
                }}
                className="pointer-events-none absolute -inset-6 m-auto h-80 w-80 sm:h-[420px] sm:w-[420px] rounded-full bg-gradient-to-tr from-[#FF8DA1]/35 via-[#FFE3E8]/45 to-[#81D8D0]/35 blur-3xl opacity-85"
              />

              {/* 3D Depth Layer 1: Standalone Transparent Cutout Image */}
              <motion.div
                style={{
                  x: avatarTranslateX,
                  y: avatarTranslateY,
                  transform: 'translateZ(65px)',
                }}
                className="relative z-10 w-full flex justify-center"
              >
                <img
                  src={data.profileImage}
                  alt="Lê Thị Kim Thuyên - Content Marketing / Social Media"
                  draggable={false}
                  className="w-full max-w-[480px] sm:max-w-[560px] lg:max-w-[620px] object-contain drop-shadow-[0_28px_40px_rgba(242,120,159,0.38)] drop-shadow-[0_10px_22px_rgba(0,0,0,0.1)] transition-transform duration-500 hover:scale-[1.03]"
                />
              </motion.div>

              {/* 3D Depth Layer 2: Pop-Up Floating Badges & Interactive 3D Accents */}

              {/* Badge 1: Top Floating Badge (Content Marketing / Social Media) */}
              <motion.div
                style={{
                  x: badge1X,
                  y: badge1Y,
                  transform: 'translateZ(110px)',
                }}
                className="absolute top-2 -left-2 sm:-left-6 z-20 pointer-events-auto"
              >
                <div className="flex items-center gap-2.5 rounded-2xl border border-pink-200/90 bg-white/95 px-4 py-2.5 shadow-xl shadow-pink-900/10 backdrop-blur-md transition-transform hover:scale-110 hover:-rotate-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFE3E8] text-[#F2789F] shadow-xs">
                    <FontAwesomeIcon icon={faWandMagicSparkles} className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-sans-clean text-[11px] font-bold uppercase tracking-wider text-[#D84C72]">
                      Content Marketing
                    </p>
                    <p className="font-editorial text-xs font-bold text-stone-800">
                      Social Media Specialist
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Badge 2: Bottom-Left Pop-up Video Card */}
              <motion.div
                style={{
                  x: badge2X,
                  y: badge2Y,
                  transform: 'translateZ(120px)',
                }}
                className="absolute -bottom-2 -left-1 sm:-left-4 z-20 pointer-events-auto"
              >
                <div className="flex items-center gap-3 rounded-2xl border border-[#81D8D0]/40 bg-white/95 px-4 py-2.5 shadow-xl shadow-teal-900/10 backdrop-blur-md transition-transform hover:scale-110 hover:rotate-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#E6F4F1] text-[#52C0B6] shadow-xs">
                    <FontAwesomeIcon icon={faVideo} className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5 text-stone-500 text-[11px] mb-0.5">
                      <FontAwesomeIcon icon={faTiktok} className="hover:text-stone-900" />
                      <FontAwesomeIcon icon={faInstagram} className="hover:text-pink-600" />
                      <FontAwesomeIcon icon={faFacebook} className="hover:text-blue-600" />
                      <FontAwesomeIcon icon={faThreads} className="hover:text-stone-900" />
                    </div>
                    <p className="font-editorial text-xs font-bold text-stone-800">
                      Short-form Video & Viral
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 3D Floating Cute Corner Sticker (Top-Right of avatar) */}
              <motion.div
                style={{
                  transform: 'translateZ(125px)',
                }}
                className="absolute -top-6 right-4 sm:right-8 z-20 pointer-events-none"
              >
                <CornerSticker type="duck_shower_gun" position="top-right" size={82} rotation={12} />
              </motion.div>

              {/* 3D Floating Cute Star Badge (Right) */}
              <motion.div
                style={{
                  transform: 'translateZ(100px)',
                }}
                className="absolute -right-2 bottom-16 z-20 pointer-events-auto"
              >
                <div className="flex h-12 w-12 rotate-12 items-center justify-center rounded-full bg-[#FFB380] text-stone-900 shadow-lg transition-transform hover:rotate-45 hover:scale-110">
                  <FontAwesomeIcon icon={faStar} className="h-5 w-5 text-stone-900" />
                </div>
              </motion.div>

              {/* Floating Jellyfish Sticker (Bottom-Right) */}
              <motion.div
                style={{
                  transform: 'translateZ(115px)',
                }}
                className="absolute -bottom-4 right-4 sm:right-8 z-20 pointer-events-none"
              >
                <CornerSticker type="jellyfish_cute" position="bottom-right" size={72} rotation={-8} />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="mt-50 flex justify-center">
          <a
            href="#about"
            className="group flex flex-col items-center gap-1 font-handwritten text-lg font-bold text-stone-500 transition-colors hover:text-[#F2789F]"
          >
            <span>chill & scroll down</span>
            <FontAwesomeIcon icon={faArrowDown} className="h-5 w-5 animate-bounce text-[#F2789F]" />
          </a>
        </div>
      </div>
    </section>
  );
};
