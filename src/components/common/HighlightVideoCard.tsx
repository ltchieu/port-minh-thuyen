import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faXmark,
  faHeart,
  faCommentDots,
  faBookmark,
  faVolumeHigh,
  faExpand,
  faArrowUpRightFromSquare,
  faSignal,
  faWifi,
  faBatteryFull,
  faMusic,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogleDrive, faTiktok } from '@fortawesome/free-brands-svg-icons';

export interface HighlightVideoCardProps {
  index: number;
  title: string;
  subtitle?: string;
  channelName?: string;
  channelHandle?: string;
  platform?: 'facebook' | 'tiktok' | 'google-drive' | string;
  videoUrl: string;
  embedUrl?: string;
  localVideoUrl?: string;
  image?: string;
  avatarUrl?: string;
  stats?: {
    likes?: string;
    comments?: string;
    shares?: string;
    views?: string;
  };
  duration?: string;
  viewsBadge?: string;
  className?: string;
}

export default function HighlightVideoCard({
  index,
  title,
  subtitle,
  channelName = 'MT Digital Agency',
  channelHandle = '@mtdigital',
  platform = 'google-drive',
  videoUrl,
  embedUrl,
  localVideoUrl,
  image,
  avatarUrl,
  stats,
  duration = '00:00/00:26',
  viewsBadge,
  className = '',
}: HighlightVideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const isFacebook =
    platform?.toLowerCase() === 'facebook' ||
    videoUrl?.includes('facebook.com') ||
    Boolean(embedUrl?.includes('facebook.com'));
  const isGoogleDrive =
    platform?.toLowerCase() === 'google-drive' ||
    videoUrl?.includes('drive.google.com') ||
    Boolean(embedUrl?.includes('drive.google.com'));
  const isTiktok =
    platform?.toLowerCase() === 'tiktok' ||
    videoUrl?.includes('tiktok.com');

  const getFacebookEmbedSrc = () => {
    if (embedUrl && embedUrl.includes('facebook.com/plugins/video.php')) {
      return embedUrl.includes('autoplay=') ? embedUrl : `${embedUrl}&autoplay=1`;
    }
    const targetUrl = embedUrl || videoUrl;
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
      targetUrl
    )}&show_text=0&autoplay=1`;
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-stone-200/80 p-3 sm:p-3.5 shadow-sm hover:border-[#F2789F] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group ${className}`}
    >
      {/* 1. Header Card */}
      <div className="flex items-center justify-between gap-2 pb-2.5 px-0.5 border-b border-stone-200/60">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-stone-900 text-white text-[11px] sm:text-xs font-black flex items-center justify-center shrink-0 shadow-xs">
            {index}
          </span>
          <h4 className="font-editorial font-bold text-xs sm:text-sm text-stone-900 tracking-tight truncate">
            {channelName || title}
          </h4>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {viewsBadge && (
            <span className="rounded-full bg-[#FFE3E8] px-2 py-0.5 font-sans-clean text-[10px] font-bold text-[#F2789F]">
              {viewsBadge}
            </span>
          )}
          {isFacebook && (
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-blue-50 text-[#1877F2] font-sans-clean text-[10px] font-bold">
              <FontAwesomeIcon icon={faFacebook} className="text-xs" />
              <span>Reel</span>
            </span>
          )}
          {isGoogleDrive && (
            <FontAwesomeIcon icon={faGoogleDrive} className="text-sm text-[#34A853]" />
          )}
          {isTiktok && <FontAwesomeIcon icon={faTiktok} className="text-sm text-black" />}
        </div>
      </div>

      {/* 2. Realistic Mobile Phone Frame (Aspect 9:16) */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsPlaying(true);
        }}
        className="relative w-full aspect-[9/16] rounded-[2rem] sm:rounded-[2.2rem] overflow-hidden bg-[#071118] my-3 select-none cursor-pointer group/phone border-[5px] sm:border-[6px] border-[#181C20] shadow-2xl shadow-black/35 flex flex-col justify-between transition-transform duration-300 group-hover:scale-[1.01]"
      >
        {/* Hardware Notch / Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-4 bg-black rounded-full z-30 flex items-center justify-between px-2.5 pointer-events-none shadow-md border border-stone-800/80">
          <div className="w-2 h-2 rounded-full bg-[#0d1527] border border-stone-700/80 flex items-center justify-center">
            <div className="w-0.5 h-0.5 rounded-full bg-blue-400/80" />
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
        </div>

        {/* Mobile Phone Status Bar (Time 09:41, Signal, Wifi, Battery) */}
        <div className="absolute top-2.5 inset-x-0 px-3.5 z-20 flex items-center justify-between pointer-events-none text-white/90 text-[10px] font-sans font-semibold tracking-tight">
          <span>09:41</span>
          <div className="flex items-center gap-1.5 text-[9px] opacity-90">
            <FontAwesomeIcon icon={faSignal} className="text-[8px]" />
            <FontAwesomeIcon icon={faWifi} className="text-[8px]" />
            <FontAwesomeIcon icon={faBatteryFull} className="text-[10px]" />
          </div>
        </div>

        {/* Bottom Home Indicator Bar (iOS style) */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-1 bg-white/60 rounded-full z-30 pointer-events-none shadow-sm" />

        {isPlaying ? (
          /* TRẠNG THÁI 1: ĐANG PHÁT VIDEO TRỰC TIẾP */
          <div className="w-full h-full relative bg-black flex items-center justify-center overflow-hidden">
            {/* Nút Đóng / Dừng Video (X) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(false);
              }}
              className="absolute top-3 right-3 z-40 w-7 h-7 rounded-full bg-black/80 hover:bg-rose-600 text-white flex items-center justify-center transition-colors cursor-pointer shadow-lg border border-white/30"
              title="Đóng phát video"
            >
              <FontAwesomeIcon icon={faXmark} className="text-xs" />
            </button>

            {/* Video HTML5 Native Player (Khi có file mp4 nội bộ chất lượng cao) */}
            {localVideoUrl ? (
              <video
                src={localVideoUrl}
                poster={image}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-cover"
                onEnded={() => setIsPlaying(false)}
              />
            ) : isFacebook ? (
              /* Facebook Reels Player iframe chuẩn nhúng trực tiếp */
              <iframe
                src={getFacebookEmbedSrc()}
                className="w-full h-full border-0"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                title={title}
              />
            ) : isGoogleDrive && videoUrl ? (
              /* Google Drive Player */
              <iframe
                src={videoUrl.replace(/\/view(\?.*)?$/, '/preview')}
                className="w-full h-full border-0"
                allow="autoplay; fullscreen"
                allowFullScreen
                title={title}
              />
            ) : null}
          </div>
        ) : (
          /* TRẠNG THÁI 2: MÀN HÌNH CHỜ MOCKUP ĐIỆN THOẠI (THUMBNAIL + REEL SOCIAL OVERLAYS) */
          <>
            {/* Ảnh Thumbnail video */}
            {image && (
              <img
                src={image}
                alt={title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 ease-out group-hover/phone:scale-105"
              />
            )}

            {/* Hiệu ứng Gradient tối đa chiều sâu */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/10 to-black/90 pointer-events-none" />

            {/* Top Overlay: Kênh & Badge Reels (nằm dưới status bar điện thoại) */}
            <div className="relative z-10 pt-7 p-2.5 sm:p-3 flex items-start justify-between gap-2 pointer-events-none">
              <div className="flex items-center gap-2 min-w-0">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={channelName}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/60 object-cover shadow-sm"
                  />
                ) : (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/25 backdrop-blur-md border border-white/60 text-white font-bold text-xs flex items-center justify-center uppercase shadow-sm">
                    {channelName ? channelName.charAt(0) : 'M'}
                  </div>
                )}
                <div className="min-w-0 leading-tight">
                  <div className="flex items-center gap-1">
                    <span className="font-sans-clean font-bold text-xs text-white truncate block">
                      {channelName}
                    </span>
                    <FontAwesomeIcon icon={faCircleCheck} className="text-[10px] text-[#81D8D0]" />
                  </div>
                  <span className="font-sans-clean text-[10px] text-white/80 truncate block">
                    {channelHandle}
                  </span>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/45 backdrop-blur-md border border-white/20 text-white">
                {isFacebook && (
                  <FontAwesomeIcon icon={faFacebook} className="text-[10px] text-[#1877F2]" />
                )}
                {isGoogleDrive && (
                  <FontAwesomeIcon icon={faGoogleDrive} className="text-[10px] text-[#34A853]" />
                )}
                {isTiktok && <FontAwesomeIcon icon={faTiktok} className="text-[10px] text-white" />}
                <span className="font-sans-clean text-[9px] font-bold tracking-wider uppercase">
                  Reels
                </span>
              </div>
            </div>

            {/* Center Play Button Overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center my-auto pointer-events-none">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/50 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-2xl group-hover/phone:scale-110 group-hover/phone:bg-[#F2789F] transition-all duration-300">
                <FontAwesomeIcon icon={faPlay} className="text-base sm:text-lg translate-x-0.5" />
              </div>
              <span className="mt-2 text-[10px] font-sans-clean font-bold text-white/90 uppercase tracking-widest bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/10 opacity-80 group-hover/phone:opacity-100 transition-opacity">
                Bấm để phát
              </span>
            </div>

            {/* Cột Tác vụ tương tác bên phải (Like, Comment, Share, Audio) */}
            <div className="absolute right-2.5 bottom-14 z-10 flex flex-col items-center space-y-3 pointer-events-none">
              <div className="flex flex-col items-center text-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/10">
                  <FontAwesomeIcon icon={faHeart} className="text-xs text-rose-400" />
                </div>
                <span className="font-sans-clean font-bold text-[10px] text-white mt-0.5">
                  {stats?.likes || '3.2K'}
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/10">
                  <FontAwesomeIcon icon={faCommentDots} className="text-xs text-white" />
                </div>
                <span className="font-sans-clean font-bold text-[10px] text-white mt-0.5">
                  {stats?.comments || '128'}
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/10">
                  <FontAwesomeIcon icon={faBookmark} className="text-xs text-amber-300" />
                </div>
                <span className="font-sans-clean font-bold text-[10px] text-white mt-0.5">
                  {stats?.shares || '245'}
                </span>
              </div>
              <div className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white/80 border border-white/10 animate-spin-slow">
                <FontAwesomeIcon icon={faMusic} className="text-[10px] text-[#81D8D0]" />
              </div>
            </div>

            {/* Thanh thông tin & thời lượng video dưới đáy */}
            <div className="relative z-10 pb-3 px-3 bg-gradient-to-t from-black/95 via-black/75 to-transparent flex flex-col gap-1 text-white pointer-events-none">
              <p className="font-sans-clean text-[11px] font-semibold text-white/95 truncate pr-8">
                {title}
              </p>
              <div className="flex items-center justify-between text-[10px] text-white/80">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faPlay} className="text-[9px]" />
                  <FontAwesomeIcon icon={faVolumeHigh} className="text-[9px]" />
                  <span className="font-mono text-[9px] font-medium text-white/90">{duration}</span>
                </div>
                <FontAwesomeIcon icon={faExpand} className="text-[9px]" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* 3. Tiêu đề, Mô tả & Nút Điều Hướng Gốc */}
      <div className="pt-1 flex flex-col justify-between flex-1 gap-2.5">
        <div>
          <h5 className="font-editorial text-xs sm:text-sm font-bold text-stone-900 line-clamp-2 leading-snug">
            {title}
          </h5>
          {subtitle && (
            <p className="mt-1 font-sans-clean text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {videoUrl && (
          <div>
            {isFacebook ? (
              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 bg-[#1877F2] hover:bg-[#1565C0] text-white rounded-xl font-sans-clean font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <FontAwesomeIcon icon={faFacebook} className="text-white text-xs" />
                <span>XEM TRÊN FACEBOOK REELS</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[9px] opacity-80" />
              </a>
            ) : isGoogleDrive ? (
              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 bg-[#111827] hover:bg-black text-white rounded-xl font-sans-clean font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all shadow-xs hover:shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <FontAwesomeIcon icon={faGoogleDrive} className="text-[#34A853] text-xs" />
                <span>MỞ TRÊN GOOGLE DRIVE</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[9px] opacity-80" />
              </a>
            ) : isTiktok ? (
              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 bg-[#111827] hover:bg-black text-white rounded-xl font-sans-clean font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all shadow-xs hover:shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <FontAwesomeIcon icon={faTiktok} className="text-white text-xs" />
                <span>MỞ TRÊN TIKTOK</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[9px] opacity-80" />
              </a>
            ) : (
              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 bg-[#111827] hover:bg-black text-white rounded-xl font-sans-clean font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all shadow-xs hover:shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>XEM VIDEO GỐC</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[9px] opacity-80" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
