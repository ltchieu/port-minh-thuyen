import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faUpRightFromSquare,
  faBriefcase,
  faImages,
  faVideo,
  faBuilding,
  faClock,
  faWandMagicSparkles
} from '@fortawesome/free-solid-svg-icons';
import { ProjectItem } from '../types';
import { ProjectModal } from './ProjectModal';
import { CornerSticker, StickerType } from './common/CuteStickers';

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  // Preserve scroll position when filter changes so scrollbar remains at current position
  const scrollPosRef = useRef<number | null>(null);

  const handleSelectCategory = (cat: string) => {
    scrollPosRef.current = window.scrollY;
    setSelectedCategory(cat);
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
  }, [selectedCategory]);

  // Extract unique categories dynamically
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = projects.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  );

  // MT DIGITAL contains upcoming client projects
  const upcomingProjects = [
    {
      id: 'upcoming-mt-3',
      title: '03 — MT DIGITAL AGENCY',
      subtitle: 'Client Project (Đang cập nhật)',
      category: 'Brand Strategy',
      role: 'Content Marketing'
    },
    {
      id: 'upcoming-mt-4',
      title: '04 — MT DIGITAL AGENCY',
      subtitle: 'Client Project (Đang cập nhật)',
      category: 'Social Media Campaign',
      role: 'Content Marketing'
    }
  ];

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
              client campaigns &amp; brand projects ✦
            </span>
            <h2 className="mt-2 font-fluffy text-4xl font-extrabold text-fluffy-pink md:text-5xl lg:text-6xl">
              SELECTED PROJECTS
            </h2>
            <p className="mt-2 font-editorial text-lg italic text-stone-600 max-w-xl mx-auto">
              Hồ sơ các dự án chiến lược Content Marketing, định hướng nội dung &amp; sản xuất truyền thông thực chiến.
            </p>
          </motion.div>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleSelectCategory(cat)}
                className={`flex items-center gap-2 rounded-full px-5 py-2 font-sans-clean text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-[#FF8DA1] text-white shadow-md shadow-pink-200 scale-105'
                    : 'bg-white border border-stone-200 text-stone-600 hover:bg-[#FFE3E8]/40'
                }`}
              >
                <span>{cat === 'All' ? 'All Projects' : cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Agency Group Header */}
        <div className="mb-16">
          <div className="mb-8 flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E2EFE7] px-4 py-1 font-handwritten text-lg font-bold text-[#2F523B]">
              <FontAwesomeIcon icon={faBuilding} className="h-3.5 w-3.5" />
              01 — MT DIGITAL AGENCY
            </span>
            <h3 className="mt-2 font-editorial text-3xl font-bold text-stone-900 md:text-4xl">
              MT DIGITAL AGENCY CLIENT PROJECTS
            </h3>
            <p className="mt-1 font-sans-clean text-sm text-stone-600 max-w-xl">
              Triển khai Content Marketing cho nhiều nhóm ngành (Beauty, Luxury &amp; Interior), từ nghiên cứu, xây dựng định hướng nội dung đến sản xuất short-form video &amp; tối ưu hóa tương tác.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Active Real Projects */}
            {filteredProjects.map((project, idx) => {
              const washiTape = {
                pink: 'washi-tape-pink',
                tiffany: 'washi-tape-tiffany',
                green: 'washi-tape-green',
                orange: 'washi-tape-orange'
              }[project.badgeColor] || 'washi-tape-pink';

              const photoCount = project.galleryImages?.length || 1;
              const videoCount = project.videoClips?.length || 0;
              const hasVideo = videoCount > 0 || project.galleryImages?.some((img) => /\.(mp4|webm|ogg|mov)$/i.test(img));
              const projectLogos = project.logos && project.logos.length > 0 ? project.logos : project.logo ? [project.logo] : [];

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
                  onClick={() => setActiveProject(project)}
                  className="group relative cursor-pointer rounded-3xl border border-stone-200 bg-white p-4 shadow-xl shadow-stone-200/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-900/10"
                >
                  {/* Washi Tape */}
                  <div className={`${washiTape} absolute -top-3 left-8 h-6 w-28 -rotate-1 z-10`} />

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
                        Xem chi tiết &amp; Sản phẩm thực tế
                      </span>
                    </div>

                    {/* Floating Logo Badge if available */}
                    {projectLogos.length > 0 && (
                      <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-xl bg-white/95 p-1.5 shadow-lg backdrop-blur-md border border-stone-200/80 z-10">
                        {projectLogos.map((logoUrl, lIdx) => (
                          <div key={lIdx} className="h-8 w-8 flex items-center justify-center">
                            <img src={logoUrl} alt="" className="h-full w-full object-contain" />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Category Pill */}
                    <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 font-sans-clean text-[11px] font-bold text-stone-800 shadow-sm backdrop-blur-sm">
                      {project.category}
                    </div>

                    {/* Gallery Image & Video Counter Badge */}
                    {(photoCount > 1 || videoCount > 0) && (
                      <div className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-stone-900/80 px-3 py-1 font-sans-clean text-[11px] font-semibold text-white shadow-sm backdrop-blur-sm">
                        <FontAwesomeIcon icon={hasVideo ? faVideo : faImages} className={`h-3.5 w-3.5 ${hasVideo ? 'text-[#81D8D0]' : 'text-[#FF8DA1]'}`} />
                        <span>
                          {videoCount > 0
                            ? `${videoCount} Video Reels${photoCount > 0 ? ` + ${photoCount} Ảnh` : ''}`
                            : `${photoCount} tư liệu`}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="mt-4 px-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
                      <span className="truncate max-w-[200px]">
                        {project.agency ? `${project.agency} • ` : ''}
                        {project.client}
                      </span>
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

                    {/* Role & Metrics Highlights */}
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      {project.role && (
                        <span className="rounded-full bg-[#E2EFE7] px-2.5 py-0.5 font-sans-clean text-[11px] font-bold text-[#2F523B]">
                          <FontAwesomeIcon icon={faBriefcase} className="h-2.5 w-2.5 mr-1" />
                          {project.role}
                        </span>
                      )}
                      <span className="rounded-full bg-[#FFE3E8] px-2.5 py-0.5 font-sans-clean text-[11px] font-bold text-[#F2789F]">
                        ✦ Top Reels: {project.metrics?.[0]?.value || 'Hot'}
                      </span>
                    </div>

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
                        Chi tiết <FontAwesomeIcon icon={faUpRightFromSquare} className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Upcoming Small Projects in MT Digital Agency */}
            {selectedCategory === 'All' &&
              upcomingProjects.map((item, idx) => (
                <div
                  key={item.id}
                  className="relative rounded-3xl border-2 border-dashed border-stone-300/80 bg-white/50 p-6 flex flex-col justify-between transition-all hover:bg-white/80 hover:border-pink-300"
                >
                  <div className="washi-tape-tiffany absolute -top-3 left-8 h-6 w-24 rotate-1 opacity-70" />

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-stone-100 px-3 py-1 font-sans-clean text-[11px] font-bold text-stone-500 uppercase">
                        {item.category}
                      </span>
                      <span className="flex items-center gap-1 font-sans-clean text-xs font-bold text-stone-400">
                        <FontAwesomeIcon icon={faClock} className="h-3 w-3" />
                        Coming Soon
                      </span>
                    </div>

                    <div className="mt-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-100 text-stone-400 mb-3">
                        <FontAwesomeIcon icon={faWandMagicSparkles} className="h-5 w-5" />
                      </div>
                      <h4 className="font-editorial text-2xl font-bold text-stone-700">
                        {item.title}
                      </h4>
                      <p className="mt-1 font-sans-clean text-xs font-semibold text-[#F2789F]">
                        {item.subtitle}
                      </p>
                      <p className="mt-2 font-sans-clean text-xs leading-relaxed text-stone-500">
                        Dự án thương hiệu tiếp theo trong hệ sinh thái khách hàng của MT Digital Agency đang được chuẩn bị và cập nhật số liệu.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-dashed border-stone-200 flex items-center justify-between">
                    <span className="font-sans-clean text-[11px] font-semibold text-stone-400">
                      Vai trò: {item.role}
                    </span>
                    <span className="font-sans-clean text-xs font-bold text-stone-400 italic">
                      Sắp ra mắt ✦
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
};
