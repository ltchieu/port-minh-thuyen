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
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogleDrive, faTiktok } from '@fortawesome/free-brands-svg-icons';

export interface HighlightVideoCardProps {
  index: number;
  title: string;
  subtitle?: string;
  channelName?: string;
  channelHandle?: string;
  platform?: 'facebook' | 'tiktok' | 'google-drive';
  videoUrl: string;
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
  channelName = 'Quốc Phong Hair Salon',
  channelHandle = '@quocphonghairsalon',
  platform = 'google-drive',
  videoUrl,
  localVideoUrl,
  image,
  avatarUrl,
  stats,
  duration = '00:00/00:26',
  viewsBadge,
  className = '',
}: HighlightVideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const isFacebook = platform.toLowerCase() === 'facebook';
  const isGoogleDrive = platform.toLowerCase() === 'google-drive';
  const isTiktok = platform.toLowerCase() === 'tiktok';

  return (
    <div
      className={`bg-white rounded-2xl border border-stone-200/80 p-3 sm:p-3.5 shadow-xs hover:border-[#F2789F] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group ${className}`}
    >
      {/* 1. Header Card */}
      <div className="flex items-center justify-between gap-2 pb-2.5 px-0.5 border-b border-stone-200/60">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-stone-900 text-white text-[11px] sm:text-xs font-black flex items-center justify-center shrink-0">
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
          {isFacebook && <FontAwesomeIcon icon={faFacebook} className="text-sm text-[#1877F2]" />}
          {isGoogleDrive && <FontAwesomeIcon icon={faGoogleDrive} className="text-sm text-[#34A853]" />}
          {isTiktok && <FontAwesomeIcon icon={faTiktok} className="text-sm text-black" />}
        </div>
      </div>

      {/* 2. Khung Phone Frame 9:16 */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          // Nếu có localVideoUrl hoặc không phải Facebook iframe, kích hoạt phát video
          if (localVideoUrl || !isFacebook) {
            setIsPlaying(true);
          }
        }}
        className="relative w-full aspect-[9/16] rounded-xl overflow-hidden bg-[#07181C] my-3 select-none cursor-pointer group/screen border border-stone-300/40 shadow-inner flex flex-col justify-between"
      >
        {isPlaying ? (
          /* TRẠNG THÁI 1: ĐANG PHÁT VIDEO */
          <div className="w-full h-full relative bg-black flex items-center justify-center overflow-hidden">
            {/* Nút Đóng / Dừng Video (X) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(false);
              }}
              className="absolute top-2.5 right-2.5 z-30 w-7 h-7 rounded-full bg-black/75 hover:bg-rose-600 text-white flex items-center justify-center transition-colors cursor-pointer shadow-md border border-white/20"
              title="Dừng phát video"
            >
              <FontAwesomeIcon icon={faXmark} className="text-xs" />
            </button>

            {/* Video HTML5 Native Player khi có localVideoUrl */}
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
              <iframe
                src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
                  videoUrl
                )}&show_text=0&autoplay=1`}
                className="w-full h-full border-0"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                title={title}
              />
            ) : null}
          </div>
        ) : (
          /* TRẠNG THÁI 2: MÀN HÌNH CHỜ MOCKUP (THUMBNAIL + REEL OVERLAYS) */
          <>
            {/* Ảnh Thumbnail */}
            {image && (
              <img
                src={image}
                alt={title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 ease-out group-hover/screen:scale-105"
              />
            )}

            {/* Hiệu ứng Gradient tối góc (Vignette) */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />

            {/* Top Overlay: Kênh & Badge Reels */}
            <div className="relative z-10 p-2.5 sm:p-3 flex items-start justify-between gap-2 pointer-events-none">
              <div className="flex items-center gap-2 min-w-0">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={channelName}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/60 object-cover"
                  />
                ) : (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/25 backdrop-blur-md border border-white/60 text-white font-bold text-xs flex items-center justify-center uppercase">
                    {channelName ? channelName.charAt(0) : 'Q'}
                  </div>
                )}
                <div className="min-w-0 leading-tight">
                  <span className="font-sans-clean font-bold text-xs text-white truncate block">
                    {channelName}
                  </span>
                  <span className="font-sans-clean text-[10px] text-white/80 truncate block">
                    {channelHandle}
                  </span>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/40 backdrop-blur-md border border-white/20 text-white">
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
            <div className="relative z-10 flex items-center justify-center my-auto pointer-events-none">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/45 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-2xl group-hover/screen:scale-110 group-hover/screen:bg-[#F2789F]/90 transition-all duration-300">
                <FontAwesomeIcon icon={faPlay} className="text-base sm:text-lg translate-x-0.5" />
              </div>
            </div>

            {/* Cột Tác vụ tương tác bên phải (Like, Comment, Share) */}
            <div className="absolute right-2.5 bottom-12 z-10 flex flex-col items-center space-y-3 pointer-events-none">
              <div className="flex flex-col items-center text-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/35 backdrop-blur-md flex items-center justify-center text-white">
                  <FontAwesomeIcon icon={faHeart} className="text-xs text-white" />
                </div>
                <span className="font-sans-clean font-bold text-[10px] text-white mt-0.5">
                  {stats?.likes || '2.8K'}
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/35 backdrop-blur-md flex items-center justify-center text-white">
                  <FontAwesomeIcon icon={faCommentDots} className="text-xs text-white" />
                </div>
                <span className="font-sans-clean font-bold text-[10px] text-white mt-0.5">
                  {stats?.comments || '142'}
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/35 backdrop-blur-md flex items-center justify-center text-white">
                  <FontAwesomeIcon icon={faBookmark} className="text-xs text-white" />
                </div>
                <span className="font-sans-clean font-bold text-[10px] text-white mt-0.5">
                  {stats?.shares || '380'}
                </span>
              </div>
            </div>

            {/* Thanh thời lượng video dưới đáy */}
            <div className="relative z-10 p-2 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex items-center justify-between text-white text-xs pointer-events-none">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faPlay} className="text-[10px]" />
                <FontAwesomeIcon icon={faVolumeHigh} className="text-[10px]" />
                <span className="font-mono text-[9px] font-medium text-white/90">{duration}</span>
              </div>
              <FontAwesomeIcon icon={faExpand} className="text-[10px]" />
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

        <div>
          {isFacebook ? (
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 bg-[#111827] hover:bg-black text-white rounded-xl font-sans-clean font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all shadow-xs hover:shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <FontAwesomeIcon icon={faFacebook} className="text-[#1877F2] text-xs" />
              <span>MỞ TRÊN FACEBOOK</span>
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
      </div>
    </div>
  );
}
