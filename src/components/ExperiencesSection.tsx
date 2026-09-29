import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faLocationDot,
  faWandMagicSparkles,
  faArrowUpRightFromSquare,
  faBriefcase,
  faEye,
  faImages,
  faVideo,
  faCircleCheck,
  faFolderOpen,
  faChartLine,
  faChevronDown,
  faChevronUp
} from '@fortawesome/free-solid-svg-icons';
import { ExperienceItem, ProjectItem } from '../types';
import { CornerSticker, StickerType } from './common/CuteStickers';
import { ProjectModal } from './ProjectModal';

interface ExperiencesSectionProps {
  experiences: ExperienceItem[];
}

export const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({ experiences }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Modal state
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);

  // Expanded state per experience card
  const [expandedExps, setExpandedExps] = useState<Record<string, boolean>>({});

  // Active client project index per experience (for MT Digital Agency with 3 projects)
  const [activeClientIndexByExp, setActiveClientIndexByExp] = useState<Record<string, number>>({});

  // Active preview image index per project
  const [activeImageIndexByProject, setActiveImageIndexByProject] = useState<Record<string, number>>({});

  // Scroll Progress for Central Timeline Line
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 60%', 'end 40%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Transform scroll progress to vertical position percentage (0% to 100%)
  const circleTop = useTransform(scaleY, [0, 1], ['0%', '100%']);

  const toggleExpand = (expId: string) => {
    setExpandedExps((prev) => ({
      ...prev,
      [expId]: !prev[expId],
    }));
  };

  const handleSelectClient = (expId: string, clientIdx: number) => {
    setActiveClientIndexByExp((prev) => ({
      ...prev,
      [expId]: clientIdx,
    }));
  };

  const handleSelectImage = (projectId: string, imgIdx: number) => {
    setActiveImageIndexByProject((prev) => ({
      ...prev,
      [projectId]: imgIdx,
    }));
  };

  return (
    <section id="experiences" ref={sectionRef} className="relative py-16 md:py-24">
      {/* Anchor for #projects */}
      <div id="projects" className="absolute -top-24" aria-hidden="true" />

      <div className="mx-auto max-w-[92rem] px-4 md:px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block rounded-full bg-[#E2EFE7] px-4 py-1 font-handwritten text-xl font-bold text-[#2F523B]">
              career journey &amp; experience ✦
            </span>
            <h2 className="mt-2 font-fluffy text-4xl font-extrabold text-fluffy-green md:text-5xl">
              WORK EXPERIENCE
            </h2>
            <p className="mt-2 font-editorial text-lg italic text-stone-600">
              Kinh nghiệm thực chiến trong việc xây dựng &amp; phát triển nội dung đa lĩnh vực
            </p>
          </motion.div>
        </div>

        {/* Experience Cards Container */}
        <div className="relative space-y-6 md:space-y-10">
          {/* Central Shining Timeline Track & Single Traveling Orb (Desktop Only) */}
          <div className="hidden md:block absolute top-4 bottom-4 left-1/2 w-1.5 -translate-x-1/2 z-10">
            {/* Base Background Track & Scroll Fill Line */}
            <div className="relative h-full w-full bg-stone-200/80 rounded-full overflow-hidden">
              <motion.div
                style={{ scaleY, transformOrigin: 'top' }}
                className="absolute inset-0 w-full rounded-full bg-gradient-to-b from-[#FF8DA1] via-[#81D8D0] to-[#FFA366] shadow-[0_0_12px_#FF8DA1,0_0_20px_#81D8D0]"
              />
              {/* Traveling Luminous Light Beam */}
              <div className="animate-shining-beam absolute inset-0 h-1/2 w-full bg-gradient-to-b from-transparent via-white to-transparent opacity-90 blur-[1px]" />
            </div>

            {/* SINGLE TRAVELING CIRCLE ORB */}
            <motion.div
              style={{ top: circleTop }}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white border-4 border-[#FF8DA1] shadow-[0_0_15px_#FF8DA1,0_0_25px_#81D8D0] transition-transform duration-200 hover:scale-125"
            >
              <FontAwesomeIcon
                icon={faWandMagicSparkles}
                className="h-3.5 w-3.5 text-[#F2789F] animate-spin"
                style={{ animationDuration: '6s' }}
              />
            </motion.div>
          </div>

          {experiences.map((exp, idx) => {
            const isEven = idx % 2 === 0;

            const badgeColor = exp.badgeColor || 'pink';

            const badgeBg = {
              pink: 'bg-[#FF8DA1] text-white',
              tiffany: 'bg-[#52C0B6] text-white',
              green: 'bg-[#78A587] text-white',
              orange: 'bg-[#FFA366] text-white',
            }[badgeColor];

            const washiTape = {
              pink: 'washi-tape-pink',
              tiffany: 'washi-tape-tiffany',
              green: 'washi-tape-green',
              orange: 'washi-tape-orange',
            }[badgeColor];

            const expProjects = exp.projects || [];
            const hasProjects = expProjects.length > 0;
            const isExpanded = Boolean(expandedExps[exp.id]);
            const activeClientIdx = activeClientIndexByExp[exp.id] || 0;
            const currentProject = expProjects[activeClientIdx] || expProjects[0];

            // Media data for active project
            const projectImages = currentProject?.galleryImages || (currentProject?.coverImage ? [currentProject.coverImage] : []);
            const activeImgIdx = activeImageIndexByProject[currentProject?.id || ''] || 0;
            const currentImg = projectImages[activeImgIdx] || currentProject?.coverImage || '';
            const currentCaption = (currentProject?.imageCaptions && currentProject.imageCaptions[currentImg]) || '';
            const videoClips = currentProject?.videoClips || [];
            const photoCount = projectImages.length;
            const videoCount = videoClips.length;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`scroll-mt-28 relative flex flex-col md:flex-row ${
                  isEven ? 'md:flex-row-reverse' : ''
                } items-center`}
              >
                {/* Content Box - Full width on mobile, half on desktop */}
                <div className="w-full px-1 sm:px-3 md:w-1/2 md:px-8">
                  <div className="group relative rounded-3xl border border-stone-200 bg-white/95 p-5 sm:p-6 md:p-8 shadow-lg hover:shadow-xl backdrop-blur-md transition-all duration-300 hover:border-pink-300 overflow-visible">
                    {/* Corner Sticker for Card */}
                    <CornerSticker
                      type={
                        (['duck_shower_gun', 'duck_glasses', 'frogs_boba', 'duck_sailor', 'jellyfish_cute', 'planet_pastel'][
                          idx % 6
                        ] as StickerType)
                      }
                      position={isEven ? 'top-right' : 'top-left'}
                      size={58}
                      rotation={isEven ? 12 : -12}
                    />

                    {/* Washi Tape Accent */}
                    <div className={`${washiTape} absolute -top-3 left-6 h-6 w-28 rotate-1`} />

                    {/* Card Header: Company & Role */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {exp.logo && (
                            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-stone-100 bg-white p-1.5 shadow-sm">
                              <img
                                src={exp.logo}
                                alt={`${exp.company} logo`}
                                className="h-full w-full object-contain rounded-xl"
                              />
                            </div>
                          )}
                          <div className="flex flex-col gap-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className={`self-start rounded-full px-3 py-0.5 font-sans-clean text-xs font-bold uppercase tracking-wider ${badgeBg}`}>
                                {exp.company}
                              </span>
                              {exp.link && (
                                <a
                                  href={exp.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title={`Visit ${exp.company}`}
                                  className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2 py-0.5 font-sans-clean text-[11px] font-bold text-stone-600 hover:bg-[#FF8DA1] hover:text-white transition-colors"
                                >
                                  <span>Visit</span>
                                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-2.5 w-2.5" />
                                </a>
                              )}
                            </div>
                            <h3 className="font-editorial text-2xl font-bold text-stone-900 group-hover:text-[#F2789F] transition-colors">
                              {exp.role}
                            </h3>
                          </div>
                        </div>

                        {exp.period && (
                          <span className="flex items-center gap-1 font-sans-clean text-xs font-bold text-[#F2789F] shrink-0">
                            <FontAwesomeIcon icon={faCalendarDays} className="h-3.5 w-3.5" />
                            {exp.period}
                          </span>
                        )}
                      </div>

                      {exp.location && (
                        <p className="flex items-center gap-1 font-sans-clean text-xs text-stone-500 -mt-1">
                          <FontAwesomeIcon icon={faLocationDot} className="h-3.5 w-3.5 text-stone-400" />
                          {exp.location}
                        </p>
                      )}

                      {/* Description text */}
                      <p className="mt-2 font-sans-clean text-sm sm:text-base leading-relaxed text-stone-700">
                        {exp.description}
                      </p>

                      {/* EXPAND BUTTON TO VIEW ATTACHED PROJECTS */}
                      {hasProjects && (
                        <div className="mt-2 pt-2 border-t border-stone-100">
                          <button
                            type="button"
                            onClick={() => toggleExpand(exp.id)}
                            className="flex items-center justify-between w-full rounded-2xl bg-stone-50 hover:bg-[#FFE3E8]/40 border border-stone-200/90 px-4 py-2.5 transition-all duration-200 cursor-pointer group/btn"
                          >
                            <div className="flex items-center gap-2">
                              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-pink-100 text-[#F2789F] group-hover/btn:scale-110 transition-transform">
                                <FontAwesomeIcon icon={faFolderOpen} className="h-3 w-3" />
                              </span>
                              <span className="font-sans-clean text-xs font-bold text-stone-800">
                                Dự án thực chiến ({expProjects.length})
                              </span>
                              {expProjects.length > 1 && (
                                <span className="rounded-full bg-pink-50 border border-pink-200/60 px-2 py-0.5 text-[10px] font-bold text-[#F2789F]">
                                  3 Clients
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-1.5 font-sans-clean text-xs font-bold text-[#F2789F]">
                              <span>{isExpanded ? 'Thu gọn' : 'Xem dự án'}</span>
                              <FontAwesomeIcon
                                icon={isExpanded ? faChevronUp : faChevronDown}
                                className="h-3 w-3 transition-transform duration-200"
                              />
                            </div>
                          </button>

                          {/* EXPANDABLE PROJECTS CONTAINER */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-4 pt-3 space-y-4">
                                  {/* Sub-tabs switcher if company has multiple projects (like MT Digital Agency) */}
                                  {expProjects.length > 1 && (
                                    <div className="flex flex-wrap gap-2">
                                      {expProjects.map((p, pIdx) => {
                                        const isSelected = activeClientIdx === pIdx;
                                        const shortName =
                                          p.id === 'proj-quoc-phong-hair-salon'
                                            ? '01. Quốc Phong'
                                            : p.id === 'proj-savax-luxury-door'
                                            ? '02. SAVAX Luxury'
                                            : p.id === 'proj-tt-genesis'
                                            ? '03. TT GENESIS'
                                            : p.client || p.title;

                                        return (
                                          <button
                                            key={p.id}
                                            type="button"
                                            onClick={() => handleSelectClient(exp.id, pIdx)}
                                            className={`rounded-xl px-3 py-1.5 font-sans-clean text-xs font-bold transition-all cursor-pointer border ${
                                              isSelected
                                                ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                                                : 'bg-white hover:bg-stone-100 text-stone-600 border-stone-200'
                                            }`}
                                          >
                                            {shortName}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  )}

                                  {/* Current Active Project Details Card */}
                                  {currentProject && (
                                    <div className="rounded-2xl border border-stone-200/90 bg-stone-50/80 p-4 sm:p-5 flex flex-col gap-4">
                                      {/* Project Header */}
                                      <div>
                                        <div className="flex flex-wrap items-center gap-1.5">
                                          <span className="rounded-full bg-stone-200/80 px-2 py-0.5 font-sans-clean text-[10px] font-bold text-stone-700">
                                            {currentProject.category}
                                          </span>
                                          {currentProject.role && (
                                            <span className="rounded-full bg-pink-50 border border-pink-200/60 px-2 py-0.5 font-sans-clean text-[10px] font-bold text-[#F2789F]">
                                              {currentProject.role}
                                            </span>
                                          )}
                                        </div>

                                        <h4 className="mt-1 font-editorial text-lg sm:text-xl font-bold text-stone-900 leading-snug">
                                          {currentProject.title}
                                        </h4>
                                      </div>

                                      {/* Media Showcase */}
                                      <div className="flex flex-col gap-2">
                                        <div
                                          onClick={() => setActiveProjectModal(currentProject)}
                                          className="group/img relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-stone-200 border border-stone-200 shadow-xs cursor-pointer"
                                        >
                                          <img
                                            src={currentImg}
                                            alt={currentProject.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                                          />

                                          {/* Hover Overlay */}
                                          <div className="absolute inset-0 bg-stone-900/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover/img:opacity-100 flex items-center justify-center">
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 font-sans-clean text-xs font-bold text-stone-900 shadow-md">
                                              <FontAwesomeIcon icon={faEye} className="h-3.5 w-3.5 text-[#F2789F]" />
                                              Xem chi tiết dự án
                                            </span>
                                          </div>

                                          {/* Media Badges */}
                                          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                                            {photoCount > 0 && (
                                              <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 font-sans-clean text-[10px] font-bold text-white backdrop-blur-sm">
                                                <FontAwesomeIcon icon={faImages} className="h-2.5 w-2.5 text-[#81D8D0]" />
                                                {photoCount} ảnh
                                              </span>
                                            )}
                                            {videoCount > 0 && (
                                              <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 font-sans-clean text-[10px] font-bold text-white backdrop-blur-sm">
                                                <FontAwesomeIcon icon={faVideo} className="h-2.5 w-2.5 text-[#FF8DA1]" />
                                                {videoCount} clips
                                              </span>
                                            )}
                                          </div>
                                        </div>

                                        {/* Thumbnail Strip (if project has multiple images) */}
                                        {projectImages.length > 1 && (
                                          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 scrollbar-thin">
                                            {projectImages.map((img, i) => (
                                              <button
                                                key={i}
                                                type="button"
                                                onClick={() => handleSelectImage(currentProject.id, i)}
                                                className={`relative h-10 w-12 shrink-0 overflow-hidden rounded-lg border-2 transition-all cursor-pointer ${
                                                  activeImgIdx === i
                                                    ? 'border-[#F2789F] scale-105'
                                                    : 'border-transparent opacity-60 hover:opacity-100'
                                                }`}
                                              >
                                                <img src={img} alt="" className="h-full w-full object-cover" />
                                              </button>
                                            ))}
                                          </div>
                                        )}

                                        {/* Caption proof */}
                                        {currentCaption && (
                                          <p className="font-sans-clean text-xs leading-relaxed text-stone-600 italic bg-white p-2.5 rounded-lg border border-stone-200/70">
                                            <FontAwesomeIcon icon={faChartLine} className="mr-1 text-[#52C0B6]" />
                                            {currentCaption}
                                          </p>
                                        )}
                                      </div>

                                      {/* Key Metrics Grid */}
                                      {currentProject.metrics && currentProject.metrics.length > 0 && (
                                        <div className="grid grid-cols-2 gap-2">
                                          {currentProject.metrics.slice(0, 4).map((metric, mIdx) => (
                                            <div
                                              key={mIdx}
                                              className="rounded-xl border border-stone-200 bg-white p-2 text-center shadow-xs"
                                            >
                                              <div className="font-editorial text-sm font-bold text-stone-900 leading-tight">
                                                {metric.value}
                                              </div>
                                              <div className="mt-0.5 font-sans-clean text-[9px] font-bold uppercase tracking-wider text-stone-500">
                                                {metric.label}
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      )}

                                      {/* Concept highlight */}
                                      {currentProject.concept && (
                                        <p className="font-sans-clean text-xs text-stone-700 bg-white p-2.5 rounded-lg border border-stone-200/70">
                                          <strong className="text-[#F2789F] block mb-0.5">✦ Chiến lược &amp; Định vị:</strong>
                                          {currentProject.concept}
                                        </p>
                                      )}

                                      {/* Results highlights */}
                                      {currentProject.results && currentProject.results.length > 0 && (
                                        <ul className="space-y-1">
                                          {currentProject.results.slice(0, 2).map((res, rIdx) => (
                                            <li key={rIdx} className="flex items-start gap-1.5 font-sans-clean text-xs text-stone-700">
                                              <FontAwesomeIcon icon={faCircleCheck} className="h-3 w-3 text-[#52C0B6] shrink-0 mt-0.5" />
                                              <span>{res}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      )}

                                      {/* Action Button to Open Full Modal */}
                                      <div className="flex flex-wrap items-center gap-2 pt-1">
                                        <button
                                          type="button"
                                          onClick={() => setActiveProjectModal(currentProject)}
                                          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-stone-900 hover:bg-[#F2789F] px-4 py-2 font-sans-clean text-xs font-bold text-white shadow-sm transition-colors cursor-pointer"
                                        >
                                          <FontAwesomeIcon icon={faEye} className="h-3 w-3" />
                                          <span>Xem chi tiết dự án &amp; Full Media</span>
                                        </button>

                                        {currentProject.externalLinks && currentProject.externalLinks.length > 0 && (
                                          <a
                                            href={currentProject.externalLinks[0].url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 rounded-xl border border-stone-300 bg-white hover:border-pink-300 px-3 py-2 font-sans-clean text-xs font-bold text-stone-700 hover:text-[#F2789F] transition-colors"
                                          >
                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3 w-3" />
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  )}

                                  {/* Bottom Collapse Button */}
                                  <div className="text-center pt-1">
                                    <button
                                      type="button"
                                      onClick={() => toggleExpand(exp.id)}
                                      className="inline-flex items-center gap-1 text-[11px] font-sans-clean font-bold text-stone-500 hover:text-[#F2789F] transition-colors cursor-pointer"
                                    >
                                      <span>Thu gọn dự án</span>
                                      <FontAwesomeIcon icon={faChevronUp} className="h-2.5 w-2.5" />
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Global Project Details Modal */}
      <ProjectModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
      />
    </section>
  );
};
