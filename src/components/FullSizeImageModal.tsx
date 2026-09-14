import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faChevronLeft, faChevronRight, faExpand, faCompress, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons';

interface FullSizeImageModalProps {
  isOpen: boolean;
  images: string[];
  initialIndex?: number;
  onClose: () => void;
  title?: string;
  imageCaptions?: Record<string, string>;
}

export const FullSizeImageModal: React.FC<FullSizeImageModalProps> = ({
  isOpen,
  images,
  initialIndex = 0,
  onClose,
  title,
  imageCaptions,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const thumbRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});

  // Sync index when initialIndex changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  // Auto-scroll active thumbnail into view when index changes
  useEffect(() => {
    if (isOpen && thumbRefs.current[currentIndex]) {
      thumbRefs.current[currentIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentIndex, isOpen]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Keyboard navigation support (ArrowLeft, ArrowRight, Escape)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handlePrev, handleNext, onClose]);

  if (!isOpen || !images || images.length === 0) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex flex-col justify-between bg-black/92 p-4 md:p-6 backdrop-blur-md select-none"
        onClick={onClose}
      >
        {/* Top Control Bar */}
        <div
          className="flex items-center justify-between gap-4 text-white z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-white/10 px-3.5 py-1 font-sans-clean text-xs sm:text-sm font-semibold tracking-wider backdrop-blur-sm">
              {currentIndex + 1} / {images.length}
            </span>
            {title && (
              <span className="font-editorial text-sm sm:text-base italic text-stone-300 truncate max-w-xs sm:max-w-md">
                {title}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 hover:scale-110 active:scale-95 border border-white/20"
            aria-label="Close full size view"
          >
            <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
          </button>
        </div>

        {/* Main Image/Video View Area */}
        <div
          className="relative flex flex-1 items-center justify-center py-4 my-auto overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Previous Button */}
          {images.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/25 hover:scale-110 active:scale-95 border border-white/20"
              aria-label="Previous item"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="h-5 w-5" />
            </button>
          )}

          {/* Active Displayed Media (Image or Video) */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="relative max-h-full max-w-full flex items-center justify-center p-2"
          >
            {/\.(mp4|webm|ogg|mov)$/i.test(images[currentIndex]) ? (
              <video
                src={images[currentIndex]}
                controls
                autoPlay
                className="max-h-[75vh] max-w-[90vw] object-contain rounded-xl shadow-2xl border border-white/10"
              />
            ) : images[currentIndex]?.includes('drive.google.com') ? (
              <iframe
                src={
                  images[currentIndex].includes('/preview')
                    ? images[currentIndex]
                    : `https://drive.google.com/file/d/${images[currentIndex].match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/)?.[1] || ''}/preview`
                }
                className="h-[75vh] w-[90vw] max-w-2xl rounded-xl shadow-2xl border border-white/10"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Google Drive Video"
              />
            ) : (
              <img
                src={images[currentIndex]}
                alt={`Full size item ${currentIndex + 1}`}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] max-w-[90vw] object-contain rounded-xl shadow-2xl border border-white/10"
              />
            )}
          </motion.div>

          {/* Caption Overlay if present */}
          {imageCaptions?.[images[currentIndex]] && (
            <div className="absolute bottom-4 z-20 flex justify-center pointer-events-none px-4">
              <span className="rounded-xl bg-black/80 px-4 py-2 font-sans-clean text-xs sm:text-sm font-semibold text-stone-200 shadow-xl backdrop-blur-md border border-white/15 text-center max-w-lg">
                {imageCaptions[images[currentIndex]]}
              </span>
            </div>
          )}

          {/* Next Button */}
          {images.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/25 hover:scale-110 active:scale-95 border border-white/20"
              aria-label="Next item"
            >
              <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Bottom Thumbnail Navigation Strip */}
        {images.length > 1 && (
          <div
            className="flex items-center justify-start gap-2 overflow-x-auto py-2 px-4 z-10 w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((img, idx) => {
              const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(img);
              const isDrive = img?.includes('drive.google.com');

              return (
                <button
                  key={idx}
                  ref={(el) => {
                    thumbRefs.current[idx] = el;
                  }}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                    currentIndex === idx
                      ? 'border-[#FF8DA1] scale-110 shadow-lg shadow-pink-500/30 ring-2 ring-[#FF8DA1]/50 opacity-100'
                      : 'border-transparent opacity-50 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  {isVideo ? (
                    <div className="relative h-full w-full bg-stone-800 flex items-center justify-center">
                      <video src={img} className="h-full w-full object-cover opacity-70" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <FontAwesomeIcon icon={faPlay} className="h-3 w-3 text-white drop-shadow-md" />
                      </div>
                    </div>
                  ) : isDrive ? (
                    <div className="relative h-full w-full bg-stone-900 flex items-center justify-center">
                      <FontAwesomeIcon icon={faGoogleDrive} className="h-6 w-6 text-[#34A853]" />
                    </div>
                  ) : (
                    <img src={img} alt={`Thumbnail ${idx + 1}`} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};
