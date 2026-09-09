import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCircleCheck, faCalendarDays, faUser, faExpand, faImages, faFilePdf, faFileWord, faGraduationCap, faChevronLeft, faChevronRight, faPlay } from '@fortawesome/free-solid-svg-icons';
import { ProjectItem } from '../types';
import { FullSizeImageModal } from './FullSizeImageModal';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const projectLogos = project.logos && project.logos.length > 0 ? project.logos : project.logo ? [project.logo] : [];
  const [activeCollageIndex, setActiveCollageIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [fullSizeModalOpen, setFullSizeModalOpen] = useState(false);
  const [fullSizeInitialIndex, setFullSizeInitialIndex] = useState(0);
  const [fullSizeImages, setFullSizeImages] = useState<string[]>([]);
  const thumbRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});

  // Auto-scroll active thumbnail into view when activeImageIndex changes
  useEffect(() => {
    if (thumbRefs.current[activeImageIndex]) {
      thumbRefs.current[activeImageIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeImageIndex]);

  const badgeBg = {
    pink: 'bg-[#FF8DA1] text-white',
    tiffany: 'bg-[#52C0B6] text-white',
    green: 'bg-[#78A587] text-white',
    orange: 'bg-[#FFA366] text-white',
  }[project.badgeColor] || 'bg-[#FF8DA1] text-white';

  const hasCollages = Boolean(project.collages && project.collages.length > 0);
  const activeCollage = hasCollages ? project.collages![activeCollageIndex] || project.collages![0] : null;

  const allImages = hasCollages && activeCollage
    ? activeCollage.images
    : project.galleryImages && project.galleryImages.length > 0
      ? project.galleryImages
      : project.coverImage
        ? [project.coverImage]
        : [];

  const hasImages = allImages.length > 0;

  const openFullSizeWith = (imagesList: string[], index: number) => {
    setFullSizeImages(imagesList);
    setFullSizeInitialIndex(index);
    setFullSizeModalOpen(true);
  };

  const openFullSizeAt = (index: number) => {
    openFullSizeWith(allImages, index);
  };

  return (
    <>
      <AnimatePresence>
        {/* Backdrop overlay centered */}
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Modal Window Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col max-h-[90vh] w-full max-w-4xl rounded-3xl border border-stone-200 bg-[#FAF8F5] p-6 md:p-8 shadow-2xl overflow-hidden"
          >
            {/* Header Bar with Title and Close Button */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-200/80 shrink-0">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-3 py-1 font-sans-clean text-xs font-bold uppercase ${badgeBg}`}>
                    {project.category}
                  </span>
                  <span className="flex items-center gap-1 font-sans-clean text-xs font-semibold text-stone-500">
                    <FontAwesomeIcon icon={faUser} className="h-3.5 w-3.5" />
                    {project.client}
                  </span>
                  <span className="flex items-center gap-1 font-sans-clean text-xs font-semibold text-stone-500">
                    <FontAwesomeIcon icon={faCalendarDays} className="h-3.5 w-3.5" />
                    {project.year}
                  </span>
                  {project.grade && (
                    <span className="flex items-center gap-1 rounded-full bg-[#FFE3E8] px-3 py-1 font-sans-clean text-xs font-extrabold text-[#F2789F]">
                      <FontAwesomeIcon icon={faGraduationCap} className="h-3.5 w-3.5" />
                      {project.grade}
                    </span>
                  )}
                  {project.showName && (
                    <span className="rounded-full bg-[#FFE3E8] px-3 py-1 font-sans-clean text-xs font-bold text-[#F2789F]">
                      Show: {project.showName}
                    </span>
                  )}
                </div>

                <div className="mt-3 flex items-center gap-4">
                  {projectLogos.length > 0 && (
                    <div className="flex items-center gap-2 shrink-0">
                      {projectLogos.map((logoUrl, lIdx) => (
                        <div key={lIdx} className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-stone-200 bg-white p-2 shadow-md">
                          <img
                            src={logoUrl}
                            alt={`${project.title} logo ${lIdx + 1}`}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 md:text-4xl">
                    {project.title}
                  </h2>
                </div>
              </div>

              {/* Always Visible Close Button */}
              <button
                onClick={onClose}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-stone-700 shadow-md border border-stone-200 transition-transform hover:scale-110 active:scale-95"
                aria-label="Close modal"
              >
                <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
              </button>
            </div>

            {/* Inner Scrollable Body */}
            <div className="mt-4 overflow-y-auto pr-1 space-y-6">
              {/* Collages Side-by-Side Showcase Cards (Matching Reference Design) */}
              {hasCollages && project.collages && (
                <div className={`grid gap-4 md:gap-5 mb-2 ${
                  project.collages.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'
                }`}>
                  {project.collages.map((c, idx) => {
                    const isSelected = activeCollageIndex === idx;
                    const coverImg = c.images[0];

                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -3 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => {
                          setActiveCollageIndex(idx);
                          setActiveImageIndex(0);
                          openFullSizeWith(c.images, 0);
                        }}
                        className={`group relative w-full overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer border-2 transition-all shadow-xl ${
                          project.collages!.length === 1 ? 'aspect-[16/9]' : 'aspect-[4/3]'
                        } ${isSelected
                            ? 'border-[#78A587] ring-4 ring-[#78A587]/20 scale-[1.01]'
                            : 'border-stone-200/80 hover:border-stone-400'
                          }`}
                      >
                        {/* Background Image */}
                        <img
                          src={coverImg}
                          alt={c.title}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Top Left Floating Badge Tag */}
                        <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5 rounded-md sm:rounded-lg bg-white/95 px-3 py-1 font-sans-clean text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-stone-900 shadow-md backdrop-blur-md">
                          <FontAwesomeIcon icon={faImages} className="text-[#78A587]" />
                          <span>{c.badge || `GALLERY 0${idx + 1}`}</span>
                        </div>

                        {/* Top Right Photo Count Badge */}
                        <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1 rounded-md sm:rounded-lg bg-black/60 px-2.5 py-1 font-sans-clean text-[10px] sm:text-[11px] font-bold text-white shadow-md backdrop-blur-md">
                          {c.images.length} Photos
                        </div>

                        {/* Bottom Text Content with Dark Gradient Overlay */}
                        <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5 bg-gradient-to-t from-stone-950/90 via-stone-950/50 to-transparent flex flex-col justify-end text-left">
                          <span className="font-sans-clean text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-stone-300/90">
                            GALLERY 0{idx + 1} • {c.images.length} PHOTOS
                          </span>
                          <h3 className="mt-1 font-editorial text-base sm:text-lg md:text-xl font-bold uppercase tracking-wide text-white drop-shadow-md leading-tight">
                            {c.title}
                          </h3>
                        </div>

                        {/* Hover Full View Prompt Overlay */}
                        <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 pointer-events-none">
                          <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 font-sans-clean text-xs font-bold text-stone-900 shadow-xl backdrop-blur-md">
                            <FontAwesomeIcon icon={faExpand} className="text-[#78A587]" />
                            Open Full Gallery
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Gallery View with Prev / Next Navigation & MP4 Video Support (Only for projects without collages) */}
              {!hasCollages && hasImages && (
                <div className="relative overflow-hidden rounded-2xl bg-stone-900 shadow-lg">
                  {/* Main Display Area (Image or Video) */}
                  <div
                    className="group relative aspect-[16/9] w-full overflow-hidden flex items-center justify-center cursor-pointer bg-black"
                    onClick={() => openFullSizeAt(activeImageIndex)}
                  >
                    {/\.(mp4|webm|ogg|mov)$/i.test(allImages[activeImageIndex] || project.coverImage) ? (
                      <video
                        src={allImages[activeImageIndex] || project.coverImage}
                        controls
                        autoPlay
                        muted
                        loop
                        className="h-full w-full object-contain"
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <img
                        src={allImages[activeImageIndex] || project.coverImage}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                      />
                    )}

                    {/* Caption Overlay if present */}
                    {project.imageCaptions?.[allImages[activeImageIndex] || project.coverImage] && (
                      <div className="absolute bottom-3 left-3 right-3 z-20 flex justify-center pointer-events-none">
                        <span className="rounded-xl bg-stone-950/80 px-4 py-2 font-sans-clean text-xs font-semibold text-white shadow-lg backdrop-blur-md border border-white/10 max-w-lg text-center">
                          {project.imageCaptions[allImages[activeImageIndex] || project.coverImage]}
                        </span>
                      </div>
                    )}

                    {/* Expand Full-Size Overlay */}
                    {!/\.(mp4|webm|ogg|mov)$/i.test(allImages[activeImageIndex] || project.coverImage) && (
                      <div className="absolute inset-0 bg-stone-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 font-sans-clean text-xs font-bold text-stone-900 shadow-xl backdrop-blur-md">
                          <FontAwesomeIcon icon={faExpand} className="text-[#F2789F]" />
                          View Full Size Image
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Previous Item Button */}
                  {allImages.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-stone-900/75 text-white shadow-lg backdrop-blur-md transition-all hover:bg-stone-900 hover:scale-110 active:scale-95 border border-white/20"
                      aria-label="Previous item"
                    >
                      <FontAwesomeIcon icon={faChevronLeft} className="h-4 w-4" />
                    </button>
                  )}

                  {/* Next Item Button */}
                  {allImages.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-stone-900/75 text-white shadow-lg backdrop-blur-md transition-all hover:bg-stone-900 hover:scale-110 active:scale-95 border border-white/20"
                      aria-label="Next item"
                    >
                      <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4" />
                    </button>
                  )}

                  {/* Gallery Thumbnails Grid Strip */}
                  {allImages.length > 1 && (
                    <div className="flex items-center justify-start gap-2 p-3 bg-stone-900/90 overflow-x-auto w-full">
                      {allImages.map((mediaUrl, idx) => {
                        const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(mediaUrl);
                        return (
                          <button
                            key={idx}
                            ref={(el) => {
                              thumbRefs.current[idx] = el;
                            }}
                            onClick={() => setActiveImageIndex(idx)}
                            className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${activeImageIndex === idx
                                ? 'border-[#FF8DA1] scale-105 ring-2 ring-[#FF8DA1]/50 opacity-100'
                                : 'border-transparent opacity-60 hover:opacity-100'
                              }`}
                          >
                            {isVideo ? (
                              <div className="relative h-full w-full bg-stone-800 flex items-center justify-center">
                                <video src={mediaUrl} className="h-full w-full object-cover opacity-70" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                  <FontAwesomeIcon icon={faPlay} className="h-3.5 w-3.5 text-white drop-shadow-md" />
                                </div>
                              </div>
                            ) : (
                              <img src={mediaUrl} alt={`Thumbnail ${idx + 1}`} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* PDF & Document Presentation Link if available */}
              {((project.pdfLinks && project.pdfLinks.length > 0) || project.pdfUrl) && (
                <div className="rounded-2xl border border-[#52C0B6]/30 bg-[#E6F7F5]/60 p-4 sm:p-5 shadow-sm space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#52C0B6] text-white shadow-sm">
                      <FontAwesomeIcon
                        icon={
                          project.pdfUrl?.endsWith('.docx') || project.pdfUrl?.endsWith('.doc') || project.pdfLinks?.some(p => p.url.endsWith('.docx') || p.url.endsWith('.doc'))
                            ? faFileWord
                            : faFilePdf
                        }
                        className="h-5 w-5"
                      />
                    </div>
                    <div>
                      <h4 className="font-editorial text-base font-bold text-stone-800">
                        Academic Presentation Decks & Rationale Documents 📄
                      </h4>
                      <p className="font-sans-clean text-xs text-stone-600">
                        View or download original project files & documents
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {project.pdfLinks && project.pdfLinks.length > 0 ? (
                      project.pdfLinks.map((pdf, pIdx) => {
                        const isWordDoc = pdf.url.endsWith('.docx') || pdf.url.endsWith('.doc');
                        return (
                          <a
                            key={pIdx}
                            href={pdf.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={isWordDoc ? true : undefined}
                            className="inline-flex items-center gap-2.5 rounded-full bg-[#52C0B6] pl-3 pr-4 py-1.5 font-sans-clean text-xs sm:text-sm font-bold text-white shadow-md transition-all hover:scale-105 hover:bg-[#3ea89f]"
                          >
                            {pdf.logo ? (
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white p-1 shadow-xs">
                                <img src={pdf.logo} alt="" className="h-full w-full object-contain" />
                              </span>
                            ) : (
                              <FontAwesomeIcon icon={isWordDoc ? faFileWord : faFilePdf} className="h-4 w-4 shrink-0" />
                            )}
                            <span>{pdf.label}</span>
                          </a>
                        );
                      })
                    ) : (
                      <a
                        href={project.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={project.pdfUrl?.endsWith('.docx') || project.pdfUrl?.endsWith('.doc') ? true : undefined}
                        className="inline-flex items-center gap-2 rounded-full bg-[#52C0B6] px-4 py-2 font-sans-clean text-xs font-bold text-white shadow-md transition-all hover:scale-105 hover:bg-[#3ea89f]"
                      >
                        <FontAwesomeIcon
                          icon={project.pdfUrl?.endsWith('.docx') || project.pdfUrl?.endsWith('.doc') ? faFileWord : faFilePdf}
                          className="h-3.5 w-3.5"
                        />
                        <span>Open Document</span>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Campaign Details & Story */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-12 items-start">
                <div className="space-y-4 md:col-span-7">
                  <div>
                    <h3 className="font-editorial text-xl font-bold text-stone-800">
                      Campaign Concept & Vision ✨
                    </h3>
                    <p className="mt-1 font-sans-clean text-sm leading-relaxed text-stone-600">
                      {project.concept || project.summary}
                    </p>
                  </div>

                  {project.finalExecution && (
                    <div>
                      <h4 className="font-sans-clean text-xs font-bold uppercase text-[#52C0B6]">
                        Final Execution
                      </h4>
                      <p className="mt-1 font-sans-clean text-sm font-semibold text-stone-700">
                        {project.finalExecution}
                      </p>
                    </div>
                  )}

                  {project.rationale && (
                    <div>
                      <h4 className="font-sans-clean text-xs font-bold uppercase text-[#F2789F]">
                        Design Rationale
                      </h4>
                      <p className="mt-1 font-sans-clean text-sm text-stone-600 leading-relaxed">
                        {project.rationale}
                      </p>
                    </div>
                  )}

                  {project.keyInsights && (
                    <div>
                      <h4 className="font-sans-clean text-xs font-bold uppercase text-[#78A587]">
                        Key Insights & Research
                      </h4>
                      <p className="mt-1 font-sans-clean text-sm font-medium text-stone-700">
                        {project.keyInsights}
                      </p>
                    </div>
                  )}

                  {project.challenge && (
                    <div>
                      <h4 className="font-sans-clean text-xs font-bold uppercase text-stone-700">
                        The Creative Brief
                      </h4>
                      <p className="mt-1 font-sans-clean text-sm text-stone-600">
                        {project.challenge}
                      </p>
                    </div>
                  )}
                </div>

                {/* Results & Tags */}
                <div className="space-y-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm md:col-span-5">
                  <h3 className="font-fluffy text-lg font-bold text-[#F2789F]">
                    Impact & Deliverables 🚀
                  </h3>

                  {project.results && project.results.length > 0 && (
                    <div className="space-y-2">
                      {project.results.map((res, rIdx) => (
                        <div key={rIdx} className="flex items-start gap-2">
                          <FontAwesomeIcon icon={faCircleCheck} className="mt-0.5 h-4 w-4 shrink-0 text-[#81D8D0]" />
                          <span className="font-sans-clean text-xs font-semibold text-stone-700">
                            {res}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="pt-2 border-t border-stone-100">
                      <p className="mb-2 font-sans-clean text-xs font-bold text-stone-400 uppercase">
                        Project Tags
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="rounded-full bg-[#FFE3E8] px-2.5 py-1 font-sans-clean text-[11px] font-bold text-[#F2789F]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>

      {/* Full-Size Image Lightbox Modal */}
      <FullSizeImageModal
        isOpen={fullSizeModalOpen}
        images={fullSizeImages.length > 0 ? fullSizeImages : allImages}
        initialIndex={fullSizeInitialIndex}
        onClose={() => setFullSizeModalOpen(false)}
        title={project.title}
        imageCaptions={project.imageCaptions}
      />
    </>
  );
};
