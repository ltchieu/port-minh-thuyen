import React from 'react';
import { motion } from 'motion/react';

export type StickerType =
  | 'duck_shower_gun'
  | 'duck_glasses'
  | 'duck_sailor'
  | 'frogs_boba'
  | 'jellyfish_cute'
  | 'jellyfish_pompons'
  | 'planet_pastel';

interface StickerProps {
  type: StickerType;
  className?: string;
  size?: number | string; // e.g. 64, 80, 100, or CSS class size
  rotation?: number; // degrees
  interactive?: boolean;
}

/* 1. Duck Shower Gun SVG Sticker Component */
export const DuckShowerGunSticker: React.FC<{ size?: number; className?: string }> = ({
  size = 80,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.2)] ${className}`}
  >
    {/* White Die-cut Sticker Backing / Border */}
    <path
      d="M25 100 C25 40 60 10 100 10 C140 10 175 40 175 100 C185 130 180 180 150 205 C120 220 80 220 50 205 C20 180 15 130 25 100 Z"
      fill="white"
      stroke="#F3F4F6"
      strokeWidth="6"
    />

    {/* Yellow Duck Body & Head */}
    <ellipse cx="100" cy="115" rx="65" ry="70" fill="#FFEC85" />

    {/* Pink Plastic Shower Cap / Hood */}
    <path
      d="M38 105 C35 55 60 28 100 28 C140 28 165 55 162 105 C155 135 145 145 100 145 C55 145 45 135 38 105 Z"
      fill="#FFB6C1"
      fillOpacity="0.85"
      stroke="#FF8DA1"
      strokeWidth="3"
    />

    {/* Cap Knots on Top */}
    {/* Left Knot */}
    <ellipse cx="65" cy="22" rx="14" ry="10" fill="#FF8DA1" transform="rotate(-25 65 22)" />
    <ellipse cx="65" cy="22" rx="10" ry="6" fill="#F2789F" transform="rotate(-25 65 22)" />
    <rect x="62" y="27" width="8" height="4" rx="2" fill="#E85D88" />

    {/* Right Knot */}
    <ellipse cx="135" cy="22" rx="14" ry="10" fill="#FF8DA1" transform="rotate(25 135 22)" />
    <ellipse cx="135" cy="22" rx="10" ry="6" fill="#F2789F" transform="rotate(25 135 22)" />
    <rect x="130" y="27" width="8" height="4" rx="2" fill="#E85D88" />

    {/* Rosy Blush Cheeks */}
    <circle cx="58" cy="118" r="16" fill="#FF94A8" opacity="0.6" />
    <circle cx="142" cy="118" r="16" fill="#FF94A8" opacity="0.6" />

    {/* Orange Beak */}
    <ellipse cx="100" cy="118" rx="18" ry="12" fill="#FF9F29" />
    <path d="M85 118 Q100 126 115 118" stroke="#D97706" strokeWidth="2.5" fill="none" />

    {/* Pink Heart Glasses */}
    {/* Left Heart Lens */}
    <path
      d="M72 88 C64 78 48 82 50 96 C52 108 72 118 72 118 C72 118 92 108 94 96 C96 82 80 78 72 88 Z"
      fill="#221F28"
      stroke="#FF6B8B"
      strokeWidth="4"
    />
    {/* Right Heart Lens */}
    <path
      d="M128 88 C120 78 104 82 106 96 C108 108 128 118 128 118 C128 118 148 108 150 96 C152 82 136 78 128 88 Z"
      fill="#221F28"
      stroke="#FF6B8B"
      strokeWidth="4"
    />
    {/* Glasses Bridge */}
    <path d="M92 92 Q100 88 108 92" stroke="#FF6B8B" strokeWidth="4" />

    {/* Pink Toy Water Gun held in hands */}
    <g transform="translate(65, 125)">
      {/* Duck Hands */}
      <ellipse cx="10" cy="25" rx="12" ry="10" fill="#FFE566" />
      <ellipse cx="50" cy="25" rx="12" ry="10" fill="#FFE566" />

      {/* Toy Gun Body */}
      <path
        d="M20 18 L68 18 L68 32 L48 32 L42 52 L28 52 L34 32 L20 32 Z"
        fill="#FF6B8B"
        stroke="#D84364"
        strokeWidth="2"
      />
      {/* Gun Barrel Tip */}
      <rect x="68" y="21" width="8" height="8" rx="2" fill="#FF94A8" />
      <circle cx="70" cy="25" r="2" fill="#582C35" />
      {/* Trigger Guard */}
      <path d="M38 32 C38 42 46 42 46 32" stroke="#D84364" strokeWidth="2" fill="none" />
    </g>

    {/* Plastic Gloss Shine Line */}
    <path d="M50 45 C70 35 110 35 130 40" stroke="white" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
  </svg>
);

/* 2. Duck Glasses SVG Sticker Component */
export const DuckGlassesSticker: React.FC<{ size?: number; className?: string }> = ({
  size = 80,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.18)] ${className}`}
  >
    {/* White Sticker Backing */}
    <circle cx="100" cy="100" r="92" fill="white" stroke="#F3F4F6" strokeWidth="5" />

    {/* Main Yellow Duck Head */}
    <ellipse cx="100" cy="108" rx="72" ry="68" fill="#FFE866" />

    {/* White Tuft Hair on top */}
    <ellipse cx="100" cy="38" rx="18" ry="12" fill="#FFFFFF" />
    <ellipse cx="92" cy="42" rx="12" ry="10" fill="#FFFFFF" />
    <ellipse cx="108" cy="42" rx="12" ry="10" fill="#FFFFFF" />

    {/* Huge Plush Rosy Pink Blush Cheeks */}
    <ellipse cx="48" cy="115" rx="26" ry="22" fill="#FF8EA4" opacity="0.85" />
    <ellipse cx="152" cy="115" rx="26" ry="22" fill="#FF8EA4" opacity="0.85" />

    {/* Black Eyes */}
    <circle cx="72" cy="98" r="8" fill="#1F2937" />
    <circle cx="70" cy="95" r="3" fill="white" />

    <circle cx="128" cy="98" r="8" fill="#1F2937" />
    <circle cx="126" cy="95" r="3" fill="white" />

    {/* Bright Orange Beak */}
    <path
      d="M74 120 C74 108 126 108 126 120 C126 135 74 135 74 120 Z"
      fill="#FF8A00"
      stroke="#D97706"
      strokeWidth="2"
    />
    <path d="M78 120 Q100 128 122 120" stroke="#B45309" strokeWidth="2" fill="none" />

    {/* Gold Round Glasses */}
    <circle cx="72" cy="98" r="24" stroke="#D97706" strokeWidth="3.5" fill="none" />
    <circle cx="128" cy="98" r="24" stroke="#D97706" strokeWidth="3.5" fill="none" />
    {/* Glasses Bridge */}
    <path d="M96 95 Q100 90 104 95" stroke="#D97706" strokeWidth="3.5" fill="none" />

    {/* Glass Lens Glare */}
    <path d="M58 88 L72 80" stroke="white" strokeWidth="3" opacity="0.7" strokeLinecap="round" />
    <path d="M114 88 L128 80" stroke="white" strokeWidth="3" opacity="0.7" strokeLinecap="round" />

    {/* Gold Heart Pendant Necklace */}
    <path d="M100 162 L105 156 C110 156 112 160 108 165 L100 172 L92 165 C88 160 90 156 95 156 Z" fill="#FBBF24" />
  </svg>
);

/* 3. Duck Sailor SVG Sticker Component */
export const DuckSailorSticker: React.FC<{ size?: number; className?: string }> = ({
  size = 80,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.18)] ${className}`}
  >
    {/* White Sticker Backing */}
    <path
      d="M30 70 C30 20 80 10 100 10 C120 10 170 20 170 70 C185 100 180 160 150 195 C120 215 80 215 50 195 C20 160 15 100 30 70 Z"
      fill="white"
      stroke="#F3F4F6"
      strokeWidth="5"
    />

    {/* Sailor Cap */}
    <path d="M42 62 Q100 35 158 62 L152 78 Q100 58 48 78 Z" fill="#0284C7" />
    <path d="M48 78 Q100 58 152 78 L150 86 Q100 68 50 86 Z" fill="#FFFFFF" />
    {/* Red Ribbon Top Pompom */}
    <circle cx="100" cy="38" r="8" fill="#EF4444" />

    {/* Cap Badge: "HII-HO! MARINE" with Octopus Logo */}
    <circle cx="100" cy="56" r="14" fill="#1F2937" stroke="#FFFFFF" strokeWidth="2" />
    <path d="M95 56 C95 52 105 52 105 56 C105 60 95 60 95 56 Z" fill="#E5E7EB" />
    <circle cx="98" cy="54" r="1" fill="#1F2937" />
    <circle cx="102" cy="54" r="1" fill="#1F2937" />

    {/* Yellow Duck Face */}
    <ellipse cx="100" cy="120" rx="68" ry="62" fill="#FFEC85" />

    {/* Puffy Pink Blush Cheeks */}
    <ellipse cx="50" cy="128" rx="22" ry="18" fill="#FF8EA4" opacity="0.85" />
    <ellipse cx="150" cy="128" rx="22" ry="18" fill="#FF8EA4" opacity="0.85" />

    {/* Black Eyes */}
    <circle cx="74" cy="110" r="7" fill="#1F2937" />
    <circle cx="126" cy="110" r="7" fill="#1F2937" />

    {/* Orange Beak */}
    <ellipse cx="100" cy="130" rx="24" ry="14" fill="#FF8A00" stroke="#D97706" strokeWidth="2" />
    <path d="M80 130 Q100 138 120 130" stroke="#B45309" strokeWidth="2" fill="none" />

    {/* Round Glasses */}
    <circle cx="74" cy="110" r="22" stroke="#92400E" strokeWidth="3" fill="none" />
    <circle cx="126" cy="110" r="22" stroke="#92400E" strokeWidth="3" fill="none" />
    <path d="M96 108 Q100 104 104 108" stroke="#92400E" strokeWidth="3" fill="none" />
  </svg>
);

/* 4. Frogs Boba SVG Sticker Component */
export const FrogsBobaSticker: React.FC<{ size?: number; className?: string }> = ({
  size = 85,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 220 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.18)] ${className}`}
  >
    {/* White Sticker Backing */}
    <path
      d="M15 90 C15 30 70 15 110 15 C150 15 205 30 205 90 C215 140 180 185 110 185 C40 185 5 140 15 90 Z"
      fill="white"
      stroke="#F3F4F6"
      strokeWidth="6"
    />

    {/* LEFT GREEN FROG */}
    <g transform="translate(10, 20)">
      {/* Frog Eyes */}
      <circle cx="40" cy="35" r="18" fill="#65A30D" />
      <circle cx="40" cy="35" r="12" fill="white" />
      <circle cx="42" cy="35" r="6" fill="#1E293B" />

      <circle cx="85" cy="35" r="18" fill="#65A30D" />
      <circle cx="85" cy="35" r="12" fill="white" />

      {/* Wink Eye */}
      <path d="M78 35 L92 35" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />

      {/* Green Frog Body */}
      <ellipse cx="62" cy="85" rx="42" ry="48" fill="#65A30D" />
      <ellipse cx="62" cy="95" rx="28" ry="32" fill="#ECFCCB" />

      {/* Big Lips Mouth */}
      <path d="M42 72 Q62 82 82 72" stroke="#EA580C" strokeWidth="4" fill="#FCA5A5" />

      {/* Raised Arms holding Grapefruit Soda */}
      <path d="M25 75 Q20 40 40 25" stroke="#65A30D" strokeWidth="12" strokeLinecap="round" />
      <path d="M100 75 Q105 40 85 25" stroke="#65A30D" strokeWidth="12" strokeLinecap="round" />

      {/* Glass of Grapefruit Soda held high */}
      <g transform="translate(42, 5)">
        <rect x="0" y="0" width="38" height="32" rx="4" fill="#FCE7F3" stroke="#F472B6" strokeWidth="2" />
        <rect x="3" y="5" width="32" height="24" rx="2" fill="#FB7185" opacity="0.8" />
        {/* Grapefruit slice on top */}
        <circle cx="19" cy="0" r="12" fill="#F43F5E" stroke="#FECDD3" strokeWidth="2" />
        <circle cx="19" cy="0" r="8" fill="#FB7185" />
      </g>
    </g>

    {/* RIGHT PINK FROG */}
    <g transform="translate(105, 35)">
      {/* Frog Eyes */}
      <circle cx="35" cy="25" r="16" fill="#F472B6" />
      <circle cx="35" cy="25" r="10" fill="white" />
      <circle cx="35" cy="25" r="5" fill="#1E293B" />

      <circle cx="75" cy="25" r="16" fill="#F472B6" />
      <circle cx="75" cy="25" r="10" fill="white" />
      <circle cx="75" cy="25" r="5" fill="#1E293B" />

      {/* Pink Body */}
      <ellipse cx="55" cy="72" rx="38" ry="42" fill="#F472B6" />
      <ellipse cx="55" cy="80" rx="24" ry="28" fill="#FCE7F3" />

      {/* Peace Sign Arm ✌️ */}
      <path d="M22 65 Q5 55 10 40" stroke="#F472B6" strokeWidth="10" strokeLinecap="round" />

      {/* Boba Milk Tea Cup */}
      <g transform="translate(40, 55)">
        {/* Cup */}
        <path d="M5 15 L10 55 C10 58 35 58 35 55 L40 15 Z" fill="#FED7AA" stroke="#F97316" strokeWidth="2" />
        {/* Lid */}
        <ellipse cx="22" cy="15" rx="20" ry="6" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="2" />
        {/* Straw */}
        <line x1="22" y1="15" x2="30" y2="-5" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
        {/* Tapioca Pearls */}
        <circle cx="16" cy="48" r="3" fill="#451A03" />
        <circle cx="24" cy="50" r="3" fill="#451A03" />
        <circle cx="30" cy="46" r="3" fill="#451A03" />
        <circle cx="20" cy="42" r="3" fill="#451A03" />
      </g>
    </g>
  </svg>
);

/* 5. Jellyfish Cute SVG Sticker Component */
export const JellyfishCuteSticker: React.FC<{ size?: number; className?: string }> = ({
  size = 80,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 180 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.18)] ${className}`}
  >
    {/* White Sticker Backing */}
    <path
      d="M20 70 C20 20 160 20 160 70 C160 100 145 105 130 115 C130 160 110 190 90 190 C70 190 50 160 50 115 C35 105 20 100 20 70 Z"
      fill="white"
      stroke="#F3F4F6"
      strokeWidth="5"
    />

    {/* Translucent Glowing Umbrella Dome */}
    <path
      d="M30 70 C30 25 150 25 150 70 C150 85 135 90 120 90 C105 90 95 85 90 85 C85 85 75 90 60 90 C45 90 30 85 30 70 Z"
      fill="url(#jelly_grad_1)"
    />

    {/* Big Aqua Sparkling Eyes */}
    <circle cx="65" cy="65" r="9" fill="#0D9488" />
    <circle cx="63" cy="62" r="3.5" fill="white" />
    <circle cx="67" cy="68" r="1.5" fill="white" />

    <circle cx="115" cy="65" r="9" fill="#0D9488" />
    <circle cx="113" cy="62" r="3.5" fill="white" />
    <circle cx="117" cy="68" r="1.5" fill="white" />

    {/* Cheerful Smile */}
    <path d="M84 72 Q90 78 96 72" stroke="#0F766E" strokeWidth="2.5" strokeLinecap="round" fill="none" />

    {/* Rosy Cheeks */}
    <circle cx="50" cy="72" r="7" fill="#F472B6" opacity="0.6" />
    <circle cx="130" cy="72" r="7" fill="#F472B6" opacity="0.6" />

    {/* Wavy Tentacles */}
    <path d="M45 90 Q35 120 50 150 T40 180" stroke="#F472B6" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M65 90 Q75 125 60 155 T70 180" stroke="#A7F3D0" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M90 88 Q85 125 95 155 T90 185" stroke="#DDD6FE" strokeWidth="4.5" strokeLinecap="round" fill="none" />
    <path d="M115 90 Q125 125 110 155 T120 180" stroke="#A7F3D0" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M135 90 Q145 120 130 150 T140 180" stroke="#F472B6" strokeWidth="4" strokeLinecap="round" fill="none" />

    {/* Gradient Definitions */}
    <defs>
      <linearGradient id="jelly_grad_1" x1="30" y1="25" x2="150" y2="90" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#CCFBF1" />
        <stop offset="50%" stopColor="#FDE8E8" />
        <stop offset="100%" stopColor="#FBCFE8" />
      </linearGradient>
    </defs>
  </svg>
);

/* 6. Jellyfish Pompons SVG Sticker Component */
export const JellyfishPomponSticker: React.FC<{ size?: number; className?: string }> = ({
  size = 80,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 180 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.18)] ${className}`}
  >
    {/* White Backing */}
    <path
      d="M20 65 C20 15 160 15 160 65 C160 110 130 185 90 185 C50 185 20 110 20 65 Z"
      fill="white"
      stroke="#F3F4F6"
      strokeWidth="5"
    />

    {/* Pastel Rainbow Dome Head */}
    <path
      d="M30 65 C30 25 150 25 150 65 C150 78 30 78 30 65 Z"
      fill="url(#rainbow_jelly_grad)"
    />

    {/* Dark Eyes & Cute Smile */}
    <circle cx="62" cy="55" r="5" fill="#1F2937" />
    <circle cx="118" cy="55" r="5" fill="#1F2937" />
    <path d="M84 60 Q90 65 96 60" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" fill="none" />

    {/* Colorful Plush Pom-poms Cluster under Dome */}
    <circle cx="42" cy="82" r="11" fill="#FBCFE8" />
    <circle cx="62" cy="85" r="12" fill="#BAE6FD" />
    <circle cx="85" cy="82" r="12" fill="#FEF08A" />
    <circle cx="108" cy="85" r="12" fill="#DDD6FE" />
    <circle cx="130" cy="82" r="11" fill="#A7F3D0" />

    <circle cx="52" cy="98" r="10" fill="#A7F3D0" />
    <circle cx="74" cy="100" r="11" fill="#FBCFE8" />
    <circle cx="96" cy="98" r="11" fill="#BAE6FD" />
    <circle cx="118" cy="100" r="10" fill="#FEF08A" />

    {/* Pastel Legs / Tentacles */}
    <path d="M50 105 Q40 140 55 175" stroke="#F472B6" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <path d="M70 105 Q80 140 65 175" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <path d="M90 105 Q85 140 95 178" stroke="#FBBF24" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <path d="M110 105 Q120 140 105 175" stroke="#A7F3D0" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <path d="M130 105 Q140 140 125 175" stroke="#C084FC" strokeWidth="3.5" strokeLinecap="round" fill="none" />

    <defs>
      <linearGradient id="rainbow_jelly_grad" x1="30" y1="25" x2="150" y2="65" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FDE8E8" />
        <stop offset="30%" stopColor="#FEF08A" />
        <stop offset="60%" stopColor="#A7F3D0" />
        <stop offset="85%" stopColor="#BAE6FD" />
        <stop offset="100%" stopColor="#DDD6FE" />
      </linearGradient>
    </defs>
  </svg>
);

/* 7. Planet Pastel SVG Sticker Component */
export const PlanetPastelSticker: React.FC<{ size?: number; className?: string }> = ({
  size = 85,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.18)] ${className}`}
  >
    {/* White Die-cut Backing */}
    <circle cx="100" cy="100" r="90" fill="white" stroke="#F3F4F6" strokeWidth="5" />

    {/* Iridescent Swirling Planet Sphere */}
    <circle cx="100" cy="100" r="75" fill="url(#planet_grad)" />

    {/* Dripping Pastels Icing */}
    <path
      d="M30 85 C30 85 45 115 55 90 C65 125 80 80 95 110 C110 75 125 120 140 90 C150 110 170 85 170 85 C170 45 140 25 100 25 C60 25 30 45 30 85 Z"
      fill="#FBCFE8"
      fillOpacity="0.85"
    />

    {/* Fluffy Clouds Ring Wrapped around Planet */}
    <g transform="translate(10, 80)">
      <path
        d="M20 30 C15 10 35 5 45 18 C55 5 75 10 75 25 C85 15 105 20 105 32 C120 20 140 25 145 40 C160 30 180 45 170 60 C140 75 40 75 20 30 Z"
        fill="#FFFFFF"
        opacity="0.9"
      />
    </g>

    {/* Star Sprinkles & Moon Accents */}
    <path d="M70 50 L73 57 L80 58 L75 63 L76 70 L70 66 L64 70 L65 63 L60 58 L67 57 Z" fill="#FEF08A" />
    <path d="M135 65 L137 70 L142 71 L138 75 L139 80 L135 77 L131 80 L132 75 L128 71 L133 70 Z" fill="#FEF08A" />

    {/* Pearl Beads */}
    <circle cx="110" cy="45" r="4" fill="white" />
    <circle cx="85" cy="42" r="3" fill="white" />
    <circle cx="145" cy="115" r="4" fill="white" />

    {/* Crescent Moon Accent */}
    <path d="M125 125 C120 120 120 110 128 105 C122 108 120 118 125 125 Z" fill="#DDD6FE" />

    <defs>
      <linearGradient id="planet_grad" x1="25" y1="25" x2="175" y2="175" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#A7F3D0" />
        <stop offset="30%" stopColor="#BAE6FD" />
        <stop offset="65%" stopColor="#DDD6FE" />
        <stop offset="100%" stopColor="#FBCFE8" />
      </linearGradient>
    </defs>
  </svg>
);

/* Main Unified Sticker Renderer Switcher */
export const Sticker: React.FC<StickerProps> = ({
  type,
  className = '',
  size = 75,
  rotation = 0,
  interactive = true,
}) => {
  const numericSize = typeof size === 'number' ? size : 75;

  const stickerMap: Record<StickerType, React.ReactNode> = {
    duck_shower_gun: <DuckShowerGunSticker size={numericSize} />,
    duck_glasses: <DuckGlassesSticker size={numericSize} />,
    duck_sailor: <DuckSailorSticker size={numericSize} />,
    frogs_boba: <FrogsBobaSticker size={numericSize} />,
    jellyfish_cute: <JellyfishCuteSticker size={numericSize} />,
    jellyfish_pompons: <JellyfishPomponSticker size={numericSize} />,
    planet_pastel: <PlanetPastelSticker size={numericSize} />,
  };

  const content = stickerMap[type] || stickerMap.duck_glasses;

  if (!interactive) {
    return (
      <div
        style={{ transform: `rotate(${rotation}deg)` }}
        className={`inline-block select-none pointer-events-none ${className}`}
      >
        {content}
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{
        scale: 1.15,
        rotate: rotation + (Math.random() > 0.5 ? 8 : -8),
        y: -4,
      }}
      whileTap={{ scale: 0.9, rotate: rotation }}
      style={{ transform: `rotate(${rotation}deg)` }}
      className={`inline-block cursor-pointer select-none transition-transform duration-200 ${className}`}
    >
      {content}
    </motion.div>
  );
};

/* Corner Sticker Badge Wrapper to attach stickers to corners of content cards */
export interface CornerStickerProps {
  type: StickerType;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  size?: number;
  rotation?: number;
  className?: string;
}

export const CornerSticker: React.FC<CornerStickerProps> = ({
  type,
  position = 'top-right',
  size = 65,
  rotation = 12,
  className = '',
}) => {
  const positionClasses = {
    'top-right': '-top-5 -right-5 md:-top-6 md:-right-6',
    'top-left': '-top-5 -left-5 md:-top-6 md:-left-6',
    'bottom-right': '-bottom-5 -right-5 md:-bottom-6 md:-right-6',
    'bottom-left': '-bottom-5 -left-5 md:-bottom-6 md:-left-6',
  }[position];

  return (
    <div className={`absolute ${positionClasses} z-20 ${className}`}>
      <Sticker type={type} size={size} rotation={rotation} />
    </div>
  );
};

/* Random Floating Background Stickers Component */
export const RandomBackgroundStickers: React.FC = () => {
  const randomStickers: Array<{
    id: number;
    type: StickerType;
    top: string;
    left: string;
    size: number;
    rotation: number;
    delay: number;
  }> = [
    { id: 1, type: 'duck_shower_gun', top: '12%', left: '3%', size: 75, rotation: -12, delay: 0 },
    { id: 2, type: 'jellyfish_cute', top: '24%', left: '92%', size: 70, rotation: 15, delay: 0.4 },
    { id: 3, type: 'planet_pastel', top: '45%', left: '2%', size: 80, rotation: -8, delay: 0.8 },
    { id: 4, type: 'duck_glasses', top: '62%', left: '91%', size: 75, rotation: 10, delay: 0.2 },
    { id: 5, type: 'frogs_boba', top: '78%', left: '4%', size: 85, rotation: -14, delay: 0.6 },
    { id: 6, type: 'duck_sailor', top: '88%', left: '88%', size: 75, rotation: 12, delay: 1.0 },
    { id: 7, type: 'jellyfish_pompons', top: '96%', left: '12%', size: 70, rotation: -6, delay: 0.5 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
      {randomStickers.map((stk) => (
        <motion.div
          key={stk.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: stk.delay }}
          style={{ top: stk.top, left: stk.left }}
          className="pointer-events-auto absolute hidden lg:block"
        >
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [stk.rotation, stk.rotation + 4, stk.rotation],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: stk.delay,
            }}
          >
            <Sticker type={stk.type} size={stk.size} rotation={stk.rotation} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};
