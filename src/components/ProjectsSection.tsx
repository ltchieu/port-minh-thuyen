import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUpRightFromSquare, faFolderOpen, faBriefcase, faImages, faGraduationCap, faVideo } from '@fortawesome/free-solid-svg-icons';
import { ProjectItem } from '../types';
import { ProjectModal } from './ProjectModal';
import { CornerSticker, StickerType } from './common/CuteStickers';

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [selectedType, setSelectedType] = useState<'all' | 'personal' | 'business'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  // Preserve scroll position when filter changes so scrollbar remains at current position
  const scrollPosRef = useRef<number | null>(null);

  const handleSelectType = (type: 'all' | 'personal' | 'business') => {
    scrollPosRef.current = window.scrollY;
    setSelectedType(type);
  };

  useLayoutEffect(() => {
    if (scrollPosRef.current !== null) {
      const savedScroll = scrollPosRef.current;
      window.scrollTo({ top: savedScroll, behavior: 'instant' });
      requestAnimationFrame(() => {
        window.scrollTo({ top: savedScroll, behavior: 'instant' });
      });
      scrollPosRef.current = null;
    }
  }, [selectedType, selectedCategory]);

  // Extract unique categories dynamically
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  // Separate personal (Part 1) and business (Part 2) projects
  const personalProjects = projects.filter(
    (p) =>
      p.projectType === 'personal' &&
      (selectedCategory === 'All' || p.category === selectedCategory)
  );

  const businessProjects = projects.filter(
    (p) =>
      p.projectType === 'business' &&
      (selectedCategory === 'All' || p.category === selectedCategory)
  );

  // Helper renderer for a grid of project cards
  const renderProjectGrid = (projectList: ProjectItem[], partBadge: string, partTitle: string, partDesc: string) => {
    if (projectList.length === 0) return null;

    return (
      <div className="mb-16 last:mb-0">
        {/* Sub-Section Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFE3E8] px-4 py-1 font-handwritten text-lg font-bold text-[#F2789F]">
            {partBadge}
          </span>
          <h3 className="mt-2 font-editorial text-3xl font-bold text-stone-900 md:text-4xl">
            {partTitle}
          </h3>
          <p className="mt-1 font-sans-clean text-sm text-stone-600 max-w-xl">
            {partDesc}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projectList.map((project, idx) => {
            const washiTape = {
              pink: 'washi-tape-pink',
              tiffany: 'washi-tape-tiffany',
              green: 'washi-tape-green',
              orange: 'washi-tape-orange',
            }[project.badgeColor] || 'washi-tape-pink';

            const photoCount = project.galleryImages?.length || 1;
            const hasVideo = project.galleryImages?.some((img) => /\.(mp4|webm|ogg|mov)$/i.test(img));
            const projectLogos = project.logos && project.logos.length > 0 ? project.logos : project.logo ? [project.logo] : [];

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
                onClick={() => setActiveProject(project)}
                className="group relative cursor-pointer rounded-3xl border border-stone-200 bg-white p-4 shadow-xl shadow-stone-200/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-900/10"
              >
                {/* Washi Tape */}
                <div className={`${washiTape} absolute -top-3 left-8 h-6 w-28 -rotate-1 z-10`}></div>

                {/* Sticker Badge on Card */}
                <CornerSticker
                  type={
                    (['planet_pastel', 'jellyfish_pompons', 'duck_shower_gun', 'duck_glasses'][
                      idx % 4
                    ] as StickerType)
                  }
                  position="top-right"
                  size={62}
                  rotation={10}
                />

                {/* Cover Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-100">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-stone-900/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2.5 font-sans-clean text-xs font-bold text-stone-900 shadow-lg">
                      <FontAwesomeIcon icon={faEye} className="h-4 w-4 text-[#F2789F]" />
                      View Project Brief & Gallery
                    </span>
                  </div>

                  {/* Floating Logo Badge if available */}
                  {projectLogos.length > 0 && (
                    <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-xl bg-white/95 p-1.5 shadow-lg backdrop-blur-md border border-stone-200/80 z-10">
                      {projectLogos.map((logoUrl, lIdx) => (
                        <div key={lIdx} className="h-7 w-7 flex items-center justify-center">
                          <img src={logoUrl} alt="" className="h-full w-full object-contain" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Category Pill */}
                  <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 font-sans-clean text-[11px] font-bold text-stone-800 shadow-sm backdrop-blur-sm">
                    {project.category}
                  </div>

                  {/* Grade / Score Badge if available */}
                  {project.grade && (
                    <div className="absolute left-3 bottom-3 flex items-center gap-1 rounded-full bg-[#FF8DA1] px-3 py-1 font-sans-clean text-[11px] font-extrabold text-white shadow-md backdrop-blur-sm">
                      <FontAwesomeIcon icon={faGraduationCap} className="h-3.5 w-3.5" />
                      <span>{project.grade}</span>
                    </div>
                  )}

                  {/* Gallery Image & Video Counter Badge */}
                  {photoCount > 1 && (
                    <div className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-stone-900/80 px-3 py-1 font-sans-clean text-[11px] font-semibold text-white shadow-sm backdrop-blur-sm">
                      <FontAwesomeIcon icon={hasVideo ? faVideo : faImages} className={`h-3.5 w-3.5 ${hasVideo ? 'text-[#81D8D0]' : 'text-[#FF8DA1]'}`} />
                      <span>{hasVideo ? `Video + ${photoCount - 1} photos` : `${photoCount} photos`}</span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="mt-4 px-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
                    <span className="truncate max-w-[200px]">{project.client}</span>
                    <span>{project.year}</span>
                  </div>

                  <div className="mt-2 flex items-center gap-3">
                    {projectLogos.length > 0 && (
                      <div className="flex items-center gap-1.5">
                        {projectLogos.map((logoUrl, lIdx) => (
                          <div key={lIdx} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-stone-200 bg-white p-1.5 shadow-md">
                            <img
                              src={logoUrl}
                              alt={`${project.title} logo ${lIdx + 1}`}
                              className="h-full w-full object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    <h4 className="font-editorial text-2xl font-bold text-stone-900 group-hover:text-[#F2789F] transition-colors leading-snug">
                      {project.title}
                    </h4>
                  </div>

                  {/* Extracted Show / Final Execution / Key Insights pill */}
                  {project.showName && (
                    <div className="mt-1 text-[12px] font-sans-clean font-bold text-[#F2789F]">
                      ✦ Show: {project.showName}
                    </div>
                  )}
                  {project.finalExecution && (
                    <div className="mt-1 text-[12px] font-sans-clean font-semibold text-[#52C0B6]">
                      ✦ Execution: {project.finalExecution}
                    </div>
                  )}
                  {project.keyInsights && (
                    <div className="mt-1 text-[12px] font-sans-clean font-semibold text-[#78A587]">
                      ✦ Insights: {project.keyInsights}
                    </div>
                  )}

                  <p className="mt-2 font-sans-clean text-xs leading-relaxed text-stone-600 line-clamp-3">
                    {project.summary}
                  </p>

                  {/* Tags & Details */}
                  <div className="mt-4 flex flex-wrap items-center justify-between pt-3 border-t border-stone-100">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="rounded-full bg-stone-100 px-2 py-0.5 font-sans-clean text-[10px] font-semibold text-stone-600"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <span className="flex items-center gap-1 font-sans-clean text-xs font-bold text-[#F2789F] group-hover:translate-x-1 transition-transform">
                      Details <FontAwesomeIcon icon={faUpRightFromSquare} className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-[92rem] px-4 md:px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block rounded-full bg-[#FFE3E8] px-4 py-1 font-handwritten text-xl font-bold text-[#F2789F] rotate-1">
              handpicked fashion & campaign edits ✦
            </span>
            <h2 className="mt-2 font-fluffy text-4xl font-extrabold text-fluffy-pink md:text-5xl lg:text-6xl">
              SELECTED PROJECTS
            </h2>
            <p className="mt-2 font-editorial text-lg italic text-stone-600 max-w-xl mx-auto">
              A curated showcase of personal briefs, academic campaigns, and commercial brand projects.
            </p>
          </motion.div>

          {/* Part Switcher Tabs (Part 1 vs Part 2 vs All) */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => handleSelectType('all')}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 font-sans-clean text-xs font-bold uppercase tracking-wider transition-all duration-300 ${selectedType === 'all'
                ? 'bg-stone-900 text-white shadow-lg scale-105'
                : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
            >
              <span>All Projects</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectType('personal')}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 font-sans-clean text-xs font-bold uppercase tracking-wider transition-all duration-300 ${selectedType === 'personal'
                ? 'bg-[#FF8DA1] text-white shadow-md shadow-pink-200 scale-105'
                : 'bg-white border border-stone-200 text-stone-600 hover:bg-[#FFE3E8]/50'
                }`}
            >
              <FontAwesomeIcon icon={faFolderOpen} className="h-4 w-4" />
              <span>Part 1: Personal & Quick Briefs</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectType('business')}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 font-sans-clean text-xs font-bold uppercase tracking-wider transition-all duration-300 ${selectedType === 'business'
                ? 'bg-[#52C0B6] text-white shadow-md shadow-teal-200 scale-105'
                : 'bg-white border border-stone-200 text-stone-600 hover:bg-[#E6F7F5]'
                }`}
            >
              <FontAwesomeIcon icon={faBriefcase} className="h-4 w-4" />
              <span>Part 2: University Projects</span>
            </button>
          </div>
        </div>

        {/* Render Part 1: Personal Projects */}
        {(selectedType === 'all' || selectedType === 'personal') &&
          renderProjectGrid(
            personalProjects,
            '✦ Part 1: Personal Projects & Academic Briefs',
            'Personal Projects & Quick Briefs',
            'Concept campaigns, creative writing competitions, and independent brand exploration projects.'
          )}

        {/* Render Part 2: University Projects */}
        {(selectedType === 'all' || selectedType === 'business') &&
          renderProjectGrid(
            businessProjects,
            '✦ Part 2: University Projects',
            'University Projects & Academic Campaigns',
            'Strategic advertising campaigns, art direction rationale, client briefs, and HD-scored studio deliverables from RMIT University.'
          )}
      </div>

      {/* Detail Modal */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
};
