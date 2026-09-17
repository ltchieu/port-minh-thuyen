import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faUpRightFromSquare,
  faBriefcase,
  faImages,
  faVideo,
  faBuilding,
  faClock,
  faChevronLeft,
  faChevronRight,
  faGraduationCap,
  faAward,
  faUsers,
  faChartLine,
  faFire,
  faMugHot,
  faCoffee,
  faPalette,
  faMusic,
  faDumbbell
} from '@fortawesome/free-solid-svg-icons';
import { ProjectItem } from '../types';
import { ProjectModal } from './ProjectModal';
import { CornerSticker, StickerType } from './common/CuteStickers';

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [selectedCompany, setSelectedCompany] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  // MT Digital active client
  const [activeMtClientIndex, setActiveMtClientIndex] = useState<number>(0);

  // OTHK Education active preview image
  const [activeOthkImageIndex, setActiveOthkImageIndex] = useState<number>(0);

  // The Family Bean Coffee active preview image
  const [activeFamilyBeanImageIndex, setActiveFamilyBeanImageIndex] = useState<number>(0);

  // Pisago Music & Art active preview image
  const [activePisagoImageIndex, setActivePisagoImageIndex] = useState<number>(0);

  // STEED Sportswear active preview image
  const [activeSteedImageIndex, setActiveSteedImageIndex] = useState<number>(0);

  // Preserve scroll position when filter changes so scrollbar remains at current position
  const scrollPosRef = useRef<number | null>(null);

  // 1. Group: MT Digital Agency projects
  const mtDigitalProjects = projects.filter(
    (p) =>
      p.agency === 'MT DIGITAL AGENCY' ||
      p.id.startsWith('proj-quoc-phong') ||
      p.id.startsWith('proj-savax') ||
      p.id.startsWith('proj-tt-genesis')
  );

  // 2. Group: OTHK Education projects
  const othkProjects = projects.filter(
    (p) => p.agency === 'OTHK EDUCATION' || p.id.startsWith('proj-othk')
  );

  // 3. Group: The Family Bean Coffee projects
  const familyBeanProjects = projects.filter(
    (p) =>
      p.agency === 'THE FAMILY BEAN COFFEE' ||
      p.id.startsWith('proj-the-family-bean')
  );

  // 4. Group: Pisago Music & Art projects
  const pisagoProjects = projects.filter(
    (p) =>
      p.agency === 'PISAGO MUSIC & ART' ||
      p.id.startsWith('proj-pisago')
  );

  // 5. Group: STEED Sportswear projects
  const steedProjects = projects.filter(
    (p) =>
      p.agency === 'STEED' ||
      p.client?.toLowerCase().includes('steed') ||
      p.id.startsWith('proj-steed')
  );

  // 6. Other future projects
  const otherProjects = projects.filter(
    (p) =>
      !mtDigitalProjects.some((mt) => mt.id === p.id) &&
      !othkProjects.some((o) => o.id === p.id) &&
      !familyBeanProjects.some((f) => f.id === p.id) &&
      !pisagoProjects.some((pi) => pi.id === p.id) &&
      !steedProjects.some((st) => st.id === p.id)
  );

  const companiesList = [
    { id: 'All', label: 'All Companies', count: projects.length, icon: faBuilding },
    {
      id: 'MT DIGITAL AGENCY',
      label: '01 — MT DIGITAL AGENCY',
      count: mtDigitalProjects.length,
      icon: faBuilding,
      badge: '3 Clients'
    },
    {
      id: 'OTHK EDUCATION',
      label: '02 — OTHK EDUCATION',
      count: othkProjects.length,
      icon: faGraduationCap,
      badge: 'EdTech & Growth'
    },
    {
      id: 'THE FAMILY BEAN COFFEE',
      label: '03 — THE FAMILY BEAN COFFEE',
      count: familyBeanProjects.length,
      icon: faMugHot,
      badge: 'F&B & 39.8K Views'
    },
    {
      id: 'PISAGO MUSIC & ART',
      label: '04 — PISAGO MUSIC & ART',
      count: pisagoProjects.length,
      icon: faPalette,
      badge: 'Art & 5 Video Reels'
    },
    {
      id: 'STEED',
      label: '05 — STEED SPORTSWEAR',
      count: steedProjects.length,
      icon: faDumbbell,
      badge: 'Gym & 7 Video Reels'
    }
  ];

  const handleSelectCompany = (companyId: string) => {
    scrollPosRef.current = window.scrollY;
    setSelectedCompany(companyId);
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
  }, [selectedCompany]);

  const handlePrevMtClient = () => {
    setActiveMtClientIndex((prev) =>
      prev > 0 ? prev - 1 : mtDigitalProjects.length - 1
    );
  };

  const handleNextMtClient = () => {
    setActiveMtClientIndex((prev) =>
      prev < mtDigitalProjects.length - 1 ? prev + 1 : 0
    );
  };

  // Safe active MT Digital project
  const currentMtProject = mtDigitalProjects[activeMtClientIndex] || mtDigitalProjects[0];

  const mtWashiTape =
    {
      pink: 'washi-tape-pink',
      tiffany: 'washi-tape-tiffany',
      green: 'washi-tape-green',
      orange: 'washi-tape-orange'
    }[currentMtProject?.badgeColor || 'pink'] || 'washi-tape-pink';

  const mtPhotoCount = currentMtProject?.galleryImages?.length || 1;
  const mtVideoCount = currentMtProject?.videoClips?.length || 0;
  const mtHasVideo =
    mtVideoCount > 0 ||
    currentMtProject?.galleryImages?.some((img) => /\.(mp4|webm|ogg|mov)$/i.test(img));
  const mtProjectLogos =
    currentMtProject?.logos && currentMtProject.logos.length > 0
      ? currentMtProject.logos
      : currentMtProject?.logo
      ? [currentMtProject.logo]
      : [];

  // OTHK Project
  const othkProject = othkProjects[0];
  const othkImages = othkProject?.galleryImages || [];
  const currentOthkImage = othkImages[activeOthkImageIndex] || othkProject?.coverImage;
  const currentOthkCaption =
    (othkProject?.imageCaptions && othkProject.imageCaptions[currentOthkImage]) ||
    'Bằng chứng thực chiến & Số liệu tăng trưởng cộng đồng UEH';

  // Family Bean Project
  const familyBeanProject = familyBeanProjects[0];
  const familyBeanImages = familyBeanProject?.galleryImages || [];
  const currentFamilyBeanImage =
    familyBeanImages[activeFamilyBeanImageIndex] || familyBeanProject?.coverImage;
  const currentFamilyBeanCaption =
    (familyBeanProject?.imageCaptions &&
      familyBeanProject.imageCaptions[currentFamilyBeanImage]) ||
    'Hiệu quả video viral ổn định trên TikTok & Reels (Đỉnh 39.8K Views)';

  const shouldShowMtDigital =
    selectedCompany === 'All' || selectedCompany === 'MT DIGITAL AGENCY';

  const shouldShowOthk =
    selectedCompany === 'All' || selectedCompany === 'OTHK EDUCATION';

  const shouldShowFamilyBean =
    selectedCompany === 'All' || selectedCompany === 'THE FAMILY BEAN COFFEE';

  // Pisago Music & Art Project
  const pisagoProject = pisagoProjects[0];
  const pisagoImages = pisagoProject?.galleryImages || [];
  const currentPisagoImage =
    pisagoImages[activePisagoImageIndex] || pisagoProject?.coverImage || '/projects/PISAGO MUSIC AND ART/thumb_01.jpg';
  const currentPisagoCaption =
    (pisagoProject?.imageCaptions &&
      pisagoProject.imageCaptions[currentPisagoImage]) ||
    'Kế hoạch chiến lược Content & Sản xuất 5 video ngắn tại Pisago Music & Art';

  const shouldShowPisago =
    selectedCompany === 'All' || selectedCompany === 'PISAGO MUSIC & ART';

  // STEED Sportswear & Gym Project
  const steedProject = steedProjects[0];
  const steedImages = steedProject?.galleryImages || [];
  const currentSteedImage =
    steedImages[activeSteedImageIndex] || steedProject?.coverImage || '/projects/STEED/thumb_05.jpg';
  const currentSteedCaption =
    (steedProject?.imageCaptions &&
      steedProject.imageCaptions[currentSteedImage]) ||
    'Nghiên cứu Insight Gymer, Kế hoạch Content & Sản xuất 7 video ngắn STEED';

  const shouldShowSteed =
    (selectedCompany === 'All' || selectedCompany === 'STEED') &&
    steedProjects.length > 0;

  return (
    <section id="projects" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-[92rem] px-4 md:px-6">
        {/* Header */}
        <div className="mb-10 text-center">
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
              Hồ sơ các dự án chiến lược Content Marketing, định hướng nội dung &amp; sản xuất truyền thông thực chiến theo từng tổ chức / thương hiệu.
            </p>
          </motion.div>

          {/* 1. Company Navigation Switcher Tabs (Anti-Clutter System) */}
          <div className="mt-8 flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {companiesList.map((comp) => {
              const isSelected = selectedCompany === comp.id;
              return (
                <button
                  key={comp.id}
                  type="button"
                  onClick={() => handleSelectCompany(comp.id)}
                  className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 font-sans-clean text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                    isSelected
                      ? 'bg-stone-900 text-white border-stone-900 shadow-xl shadow-stone-900/15 scale-105'
                      : 'bg-white/95 border-stone-200 text-stone-600 hover:border-pink-300 hover:bg-[#FFE3E8]/30 shadow-xs'
                  }`}
                >
                  <FontAwesomeIcon
                    icon={comp.icon}
                    className={isSelected ? 'text-[#81D8D0]' : 'text-stone-400'}
                  />
                  <span>{comp.label}</span>
                  {comp.badge && (
                    <span
                      className={`ml-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        isSelected
                          ? 'bg-white/20 text-[#FF8DA1]'
                          : 'bg-stone-100 text-stone-500'
                      }`}
                    >
                      {comp.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 1. MT DIGITAL AGENCY MASTER SHOWCASE HUB */}
        {shouldShowMtDigital && mtDigitalProjects.length > 0 && (
          <div className="mb-20">
            {/* Agency Group Header */}
            <div className="mb-6 flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E2EFE7] px-4 py-1 font-handwritten text-lg font-bold text-[#2F523B]">
                <FontAwesomeIcon icon={faBuilding} className="h-3.5 w-3.5" />
                01 — MT DIGITAL AGENCY
              </span>
              <h3 className="mt-2 font-editorial text-3xl font-bold text-stone-900 md:text-4xl">
                MT DIGITAL AGENCY CLIENT PROJECTS
              </h3>
              <p className="mt-1 font-sans-clean text-sm text-stone-600 max-w-xl">
                Triển khai Content Marketing &amp; Video Production cho nhiều nhóm ngành (Beauty, Luxury &amp; Interior, Real Estate), từ nghiên cứu, xây dựng định hướng nội dung đến sản xuất short-form video &amp; tối ưu hóa tương tác.
              </p>
            </div>

            {/* Client Switcher Tabs Bar */}
            <div className="mb-6 flex flex-wrap justify-center items-center gap-2.5 sm:gap-3">
              {mtDigitalProjects.map((proj, idx) => {
                const isActive = currentMtProject.id === proj.id;
                const clientShortName =
                  proj.id === 'proj-quoc-phong-hair-salon'
                    ? '01. Quốc Phong Hair Salon'
                    : proj.id === 'proj-savax-luxury-door'
                    ? '02. SAVAX Luxury & Door'
                    : proj.id === 'proj-tt-genesis'
                    ? '03. TT GENESIS'
                    : proj.client;

                const clientBadge =
                  proj.id === 'proj-quoc-phong-hair-salon'
                    ? '✦ 11K+ Views'
                    : proj.id === 'proj-savax-luxury-door'
                    ? '✦ 56K+ Views'
                    : proj.id === 'proj-tt-genesis'
                    ? '✦ Reels 9:16'
                    : proj.category;

                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => {
                      setActiveMtClientIndex(idx);
                    }}
                    className={`group relative flex items-center gap-3 rounded-2xl px-4 py-2.5 transition-all duration-300 text-left cursor-pointer border ${
                      isActive
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xl shadow-stone-900/15 scale-[1.02]'
                        : 'bg-white/95 hover:bg-white text-stone-700 border-stone-200 hover:border-pink-300 shadow-xs'
                    }`}
                  >
                    {proj.logo && (
                      <div
                        className={`h-8 w-8 rounded-xl p-1 flex items-center justify-center shrink-0 border ${
                          isActive ? 'bg-white/10 border-white/20' : 'bg-stone-50 border-stone-200'
                        }`}
                      >
                        <img src={proj.logo} alt="" className="h-full w-full object-contain" />
                      </div>
                    )}
                    <div>
                      <div className="font-editorial text-sm font-bold leading-tight flex items-center gap-1.5">
                        <span>{clientShortName}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className={`text-[10px] font-sans-clean font-semibold uppercase tracking-wider ${
                            isActive ? 'text-[#81D8D0]' : 'text-stone-500'
                          }`}
                        >
                          {proj.category}
                        </span>
                        <span className="text-[10px] text-stone-400">•</span>
                        <span
                          className={`text-[10px] font-sans-clean font-bold ${
                            isActive ? 'text-[#FF8DA1]' : 'text-[#F2789F]'
                          }`}
                        >
                          {clientBadge}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Master Hub Showcase Container */}
            <div className="relative rounded-3xl border border-stone-200/90 bg-white p-5 sm:p-8 lg:p-10 shadow-2xl shadow-stone-200/60 overflow-visible">
              {/* Top Washi Tape */}
              <div className={`${mtWashiTape} absolute -top-3 left-10 h-6 w-32 -rotate-1 z-10`} />

              {/* Corner Sticker */}
              <CornerSticker
                type={
                  (['planet_pastel', 'jellyfish_pompons', 'duck_shower_gun', 'duck_glasses'][
                    activeMtClientIndex % 4
                  ] as StickerType)
                }
                position="top-right"
                size={68}
                rotation={10}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMtProject.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center"
                >
                  {/* Left Column: Media Visual Showcase (5 Cols) */}
                  <div className="lg:col-span-5">
                    <div
                      onClick={() => setActiveProject(currentMtProject)}
                      className="group/img relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-100 border border-stone-200/90 shadow-md cursor-pointer"
                    >
                      <img
                        src={currentMtProject.coverImage}
                        alt={currentMtProject.title}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-stone-900/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover/img:opacity-100 flex items-center justify-center">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 font-sans-clean text-xs font-bold text-stone-900 shadow-xl">
                          <FontAwesomeIcon icon={faEye} className="h-4 w-4 text-[#F2789F]" />
                          Xem chi tiết &amp; Sản phẩm thực tế
                        </span>
                      </div>

                      {/* Floating Logo Badge if available */}
                      {mtProjectLogos.length > 0 && (
                        <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-xl bg-white/95 p-1.5 shadow-lg backdrop-blur-md border border-stone-200/80 z-10">
                          {mtProjectLogos.map((logoUrl, lIdx) => (
                            <div key={lIdx} className="h-8 w-8 flex items-center justify-center">
                              <img src={logoUrl} alt="" className="h-full w-full object-contain" />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Category Pill */}
                      <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 font-sans-clean text-[11px] font-bold text-stone-800 shadow-sm backdrop-blur-sm">
                        {currentMtProject.category}
                      </div>

                      {/* Gallery Image & Video Counter Badge */}
                      {(mtPhotoCount > 1 || mtVideoCount > 0) && (
                        <div className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-stone-900/85 px-3 py-1 font-sans-clean text-[11px] font-semibold text-white shadow-sm backdrop-blur-sm">
                          <FontAwesomeIcon
                            icon={mtHasVideo ? faVideo : faImages}
                            className={`h-3.5 w-3.5 ${mtHasVideo ? 'text-[#81D8D0]' : 'text-[#FF8DA1]'}`}
                          />
                          <span>
                            {mtVideoCount > 0
                              ? `${mtVideoCount} Video Reels${mtPhotoCount > 0 ? ` + ${mtPhotoCount} Ảnh` : ''}`
                              : `${mtPhotoCount} tư liệu`}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Project Details & Intel (7 Cols) */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Top agency meta */}
                      <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
                        <span className="flex items-center gap-1.5 font-sans-clean uppercase tracking-wider text-[11px]">
                          <span className="h-2 w-2 rounded-full bg-[#81D8D0]" />
                          MT DIGITAL AGENCY • {currentMtProject.client}
                        </span>
                        <span className="font-mono text-stone-400">{currentMtProject.year}</span>
                      </div>

                      {/* Title & Logo */}
                      <div className="mt-2 flex items-center gap-3">
                        {mtProjectLogos.length > 0 && (
                          <div className="flex items-center gap-1.5 shrink-0">
                            {mtProjectLogos.map((logoUrl, lIdx) => (
                              <div
                                key={lIdx}
                                className="flex h-11 w-11 items-center justify-center rounded-xl border border-stone-200 bg-white p-1.5 shadow-xs"
                              >
                                <img
                                  src={logoUrl}
                                  alt={`${currentMtProject.title} logo`}
                                  className="h-full w-full object-contain"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                        <h4 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
                          {currentMtProject.title}
                        </h4>
                      </div>

                      {/* Role & Highlights */}
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        {currentMtProject.role && (
                          <span className="rounded-full bg-[#E2EFE7] px-3 py-1 font-sans-clean text-xs font-bold text-[#2F523B] flex items-center gap-1.5">
                            <FontAwesomeIcon icon={faBriefcase} className="h-3 w-3" />
                            {currentMtProject.role}
                          </span>
                        )}
                        <span className="rounded-full bg-[#FFE3E8] px-3 py-1 font-sans-clean text-xs font-bold text-[#F2789F]">
                          ✦ Top Reels: {currentMtProject.metrics?.[0]?.value || 'Hot'}
                        </span>
                        <span className="rounded-full bg-stone-100 px-3 py-1 font-sans-clean text-xs font-semibold text-stone-600">
                          {currentMtProject.category}
                        </span>
                      </div>

                      {/* Summary paragraph */}
                      <p className="mt-3 font-sans-clean text-xs sm:text-sm leading-relaxed text-stone-600 line-clamp-3">
                        {currentMtProject.summary}
                      </p>

                      {/* 4 Performance Metrics Grid */}
                      {currentMtProject.metrics && currentMtProject.metrics.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {currentMtProject.metrics.map((m, mIdx) => (
                            <div
                              key={mIdx}
                              className="rounded-xl border border-stone-200/80 bg-[#FAF8F5] p-2.5 text-center"
                            >
                              <span className="block font-sans-clean text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                                {m.label}
                              </span>
                              <span className="mt-0.5 block font-editorial text-base sm:text-lg font-bold text-[#F2789F]">
                                {m.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tags */}
                      <div className="mt-3.5 flex flex-wrap gap-1.5">
                        {currentMtProject.tags.slice(0, 4).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="rounded-full bg-stone-100 px-2.5 py-0.5 font-sans-clean text-[11px] font-semibold text-stone-600"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Controls */}
                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                      {/* Primary CTA */}
                      <button
                        type="button"
                        onClick={() => setActiveProject(currentMtProject)}
                        className="flex-1 rounded-2xl bg-stone-900 hover:bg-[#F2789F] px-5 py-3 font-sans-clean text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faEye} className="h-4 w-4" />
                        <span>Xem chi tiết Case Study &amp; Reels</span>
                        <FontAwesomeIcon icon={faUpRightFromSquare} className="h-3 w-3 opacity-80 ml-1" />
                      </button>

                      {/* Prev / Next Buttons */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={handlePrevMtClient}
                          className="h-11 w-11 rounded-xl border border-stone-200 bg-white hover:bg-[#FFE3E8]/50 hover:border-pink-300 flex items-center justify-center text-stone-700 transition-all active:scale-95 shadow-xs cursor-pointer"
                          title="Dự án trước"
                        >
                          <FontAwesomeIcon icon={faChevronLeft} className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={handleNextMtClient}
                          className="h-11 w-11 rounded-xl border border-stone-200 bg-white hover:bg-[#FFE3E8]/50 hover:border-pink-300 flex items-center justify-center text-stone-700 transition-all active:scale-95 shadow-xs cursor-pointer"
                          title="Dự án tiếp theo"
                        >
                          <FontAwesomeIcon icon={faChevronRight} className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dot Indicators & Client Switcher Helper */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-stone-500 font-sans-clean">
                <div className="flex items-center gap-2.5">
                  <span className="font-semibold text-stone-400">Chọn dự án:</span>
                  <div className="flex items-center gap-2">
                    {mtDigitalProjects.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        type="button"
                        onClick={() => setActiveMtClientIndex(dotIdx)}
                        className={`h-2.5 rounded-full transition-all cursor-pointer ${
                          activeMtClientIndex === dotIdx
                            ? 'w-7 bg-[#F2789F]'
                            : 'w-2.5 bg-stone-300 hover:bg-stone-400'
                        }`}
                        title={`Chuyển tới dự án 0${dotIdx + 1}`}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-stone-400 text-[11px]">
                    (0{activeMtClientIndex + 1} / 0{mtDigitalProjects.length})
                  </span>
                </div>

                <div className="flex items-center gap-2 font-sans-clean text-[11px] text-stone-400">
                  <FontAwesomeIcon icon={faClock} className="h-3 w-3" />
                  <span>MT DIGITAL AGENCY • 3 Client Case Studies Hoàn Tất</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. OTHK EDUCATION MASTER SHOWCASE */}
        {shouldShowOthk && othkProject && (
          <div className="mb-20">
            {/* Agency Group Header */}
            <div className="mb-6 flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E6F7F5] px-4 py-1 font-handwritten text-lg font-bold text-[#1D7870]">
                <FontAwesomeIcon icon={faGraduationCap} className="h-3.5 w-3.5" />
                02 — OTHK EDUCATION
              </span>
              <h3 className="mt-2 font-editorial text-3xl font-bold text-stone-900 md:text-4xl">
                OTHK EDUCATION — COMMUNITY &amp; GROWTH
              </h3>
              <p className="mt-1 font-sans-clean text-sm text-stone-600 max-w-xl">
                Xây dựng và phát triển cộng đồng học sinh - sinh viên, tối ưu chiến lược Content Marketing thực chiến trên Facebook, đạt danh hiệu Best Builder 3 tháng liên tiếp &amp; doanh thu cao nhất hệ thống.
              </p>
            </div>

            {/* OTHK Showcase Card */}
            <div className="relative rounded-3xl border border-stone-200/90 bg-white p-5 sm:p-8 lg:p-10 shadow-2xl shadow-stone-200/60 overflow-visible">
              {/* Top Washi Tape */}
              <div className="washi-tape-tiffany absolute -top-3 left-10 h-6 w-32 rotate-1 z-10" />

              {/* Corner Sticker */}
              <CornerSticker type="duck_glasses" position="top-right" size={68} rotation={-10} />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                {/* Left Column: Visual & Interactive Evidence Strip (5 Cols) */}
                <div className="lg:col-span-5 flex flex-col gap-3">
                  <div
                    onClick={() => setActiveProject(othkProject)}
                    className="group/img relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-100 border border-stone-200/90 shadow-md cursor-pointer"
                  >
                    <img
                      src={currentOthkImage}
                      alt={othkProject.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-stone-900/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover/img:opacity-100 flex items-center justify-center">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 font-sans-clean text-xs font-bold text-stone-900 shadow-xl">
                        <FontAwesomeIcon icon={faEye} className="h-4 w-4 text-[#52C0B6]" />
                        Xem chi tiết &amp; Bằng chứng thực tế
                      </span>
                    </div>

                    {/* Logo Badge */}
                    {othkProject.logo && (
                      <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-xl bg-white/95 p-1.5 shadow-lg backdrop-blur-md border border-stone-200/80 z-10">
                        <div className="h-8 w-8 flex items-center justify-center">
                          <img src={othkProject.logo} alt="" className="h-full w-full object-contain" />
                        </div>
                      </div>
                    )}

                    {/* Category Pill */}
                    <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 font-sans-clean text-[11px] font-bold text-stone-800 shadow-sm backdrop-blur-sm">
                      {othkProject.category}
                    </div>

                    {/* Photo Evidence Counter Badge */}
                    <div className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-stone-900/85 px-3 py-1 font-sans-clean text-[11px] font-semibold text-white shadow-sm backdrop-blur-sm">
                      <FontAwesomeIcon icon={faImages} className="h-3.5 w-3.5 text-[#81D8D0]" />
                      <span>{othkImages.length} Bằng chứng thực tế</span>
                    </div>
                  </div>

                  {/* Caption of active preview image */}
                  <div className="rounded-xl bg-[#FAF8F5] border border-stone-200/60 p-2.5 text-left">
                    <p className="font-sans-clean text-[11px] text-stone-600 line-clamp-2 leading-relaxed italic">
                      <span className="font-bold text-[#1D7870] not-italic mr-1">✦ Tư liệu:</span>
                      {currentOthkCaption}
                    </p>
                  </div>

                  {/* Mini Thumbnails Strip (Click to Preview) */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
                    {othkImages.slice(0, 6).map((imgUrl, thumbIdx) => {
                      const isThumbActive = activeOthkImageIndex === thumbIdx;
                      const thumbLabel =
                        thumbIdx === 0
                          ? 'Group 10.5K'
                          : thumbIdx === 1
                          ? 'Viral 25.1K'
                          : thumbIdx === 2
                          ? 'Cơ sở B 22K'
                          : thumbIdx === 3
                          ? 'Bí kíp K52'
                          : thumbIdx === 4
                          ? 'Review Cơ sở'
                          : 'Best Builder';

                      return (
                        <button
                          key={thumbIdx}
                          type="button"
                          onClick={() => setActiveOthkImageIndex(thumbIdx)}
                          className={`relative shrink-0 h-13 w-16 sm:h-14 sm:w-18 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                            isThumbActive
                              ? 'border-[#52C0B6] ring-2 ring-[#52C0B6]/30 scale-105 shadow-sm'
                              : 'border-stone-200 opacity-70 hover:opacity-100 hover:border-stone-400'
                          }`}
                          title={`Xem tư liệu 0${thumbIdx + 1}`}
                        >
                          <img src={imgUrl} alt="" className="h-full w-full object-cover" />
                          <span className="absolute inset-x-0 bottom-0 bg-stone-950/80 text-[8px] font-sans-clean font-bold text-white text-center py-0.5 truncate px-0.5">
                            {thumbLabel}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Project Details & Intel (7 Cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Meta Top */}
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
                      <span className="flex items-center gap-1.5 font-sans-clean uppercase tracking-wider text-[11px]">
                        <span className="h-2 w-2 rounded-full bg-[#52C0B6]" />
                        OTHK EDUCATION • CỘNG ĐỒNG SINH VIÊN UEH
                      </span>
                      <span className="font-mono text-stone-400">{othkProject.year}</span>
                    </div>

                    {/* Title */}
                    <div className="mt-2 flex items-center gap-3">
                      {othkProject.logo && (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-stone-200 bg-white p-1.5 shadow-xs">
                          <img src={othkProject.logo} alt="" className="h-full w-full object-contain" />
                        </div>
                      )}
                      <h4 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
                        {othkProject.title}
                      </h4>
                    </div>

                    {/* Roles & Achievements */}
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#E2EFE7] px-3 py-1 font-sans-clean text-xs font-bold text-[#2F523B] flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faBriefcase} className="h-3 w-3" />
                        {othkProject.role}
                      </span>
                      <span className="rounded-full bg-[#FFE3E8] px-3 py-1 font-sans-clean text-xs font-bold text-[#F2789F] flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faAward} className="h-3 w-3" />
                        Best Builder 3 Tháng Liên Tiếp
                      </span>
                      <span className="rounded-full bg-[#FFF0E5] px-3 py-1 font-sans-clean text-xs font-bold text-[#A05118] flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faFire} className="h-3 w-3" />
                        Doanh Thu Top 1 Hệ Thống
                      </span>
                    </div>

                    {/* Summary paragraph */}
                    <p className="mt-3 font-sans-clean text-xs sm:text-sm leading-relaxed text-stone-600 line-clamp-3">
                      {othkProject.summary}
                    </p>

                    {/* 4 Performance Metrics Grid */}
                    {othkProject.metrics && othkProject.metrics.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {othkProject.metrics.map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className="rounded-xl border border-stone-200/80 bg-[#FAF8F5] p-2.5 text-center"
                          >
                            <span className="block font-sans-clean text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                              {m.label}
                            </span>
                            <span className="mt-0.5 block font-editorial text-base sm:text-lg font-bold text-[#1D7870]">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {othkProject.tags.slice(0, 5).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="rounded-full bg-stone-100 px-2.5 py-0.5 font-sans-clean text-[11px] font-semibold text-stone-600"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveProject(othkProject)}
                      className="flex-1 rounded-2xl bg-stone-900 hover:bg-[#1D7870] px-5 py-3 font-sans-clean text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faEye} className="h-4 w-4" />
                      <span>Xem Chi Tiết Case Study &amp; Bằng Chứng Thực Tế</span>
                      <FontAwesomeIcon icon={faUpRightFromSquare} className="h-3 w-3 opacity-80 ml-1" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Dot Indicators */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-stone-500 font-sans-clean">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-stone-400">Đơn vị:</span>
                  <span className="rounded-full bg-[#E6F7F5] px-2.5 py-0.5 font-bold text-[#1D7870]">
                    02 — OTHK EDUCATION
                  </span>
                  <span className="text-stone-400">• Cộng đồng UEH</span>
                </div>

                <div className="flex items-center gap-2 font-sans-clean text-[11px] text-stone-400">
                  <FontAwesomeIcon icon={faAward} className="h-3 w-3 text-[#F2789F]" />
                  <span>Best Builder 3 Tháng Liên Tiếp • Doanh Thu Kỷ Lục</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. THE FAMILY BEAN COFFEE MASTER SHOWCASE */}
        {shouldShowFamilyBean && familyBeanProject && (
          <div className="mb-20">
            {/* Agency Group Header */}
            <div className="mb-6 flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF0E5] px-4 py-1 font-handwritten text-lg font-bold text-[#A05118]">
                <FontAwesomeIcon icon={faMugHot} className="h-3.5 w-3.5" />
                03 — THE FAMILY BEAN COFFEE
              </span>
              <h3 className="mt-2 font-editorial text-3xl font-bold text-stone-900 md:text-4xl">
                THE FAMILY BEAN COFFEE — F&amp;B SOCIAL &amp; VIDEO
              </h3>
              <p className="mt-1 font-sans-clean text-sm text-stone-600 max-w-xl">
                Nghiên cứu thị trường &amp; insight khách hàng sinh viên, xây dựng Content Calendar đa kênh, sản xuất chuỗi video ngắn viral đạt 39.8K views và triển khai các chiến dịch khuyến mãi (CTKM 10K, Phiếu tích điểm) tăng trưởng doanh số.
              </p>
            </div>

            {/* The Family Bean Showcase Card */}
            <div className="relative rounded-3xl border border-stone-200/90 bg-white p-5 sm:p-8 lg:p-10 shadow-2xl shadow-stone-200/60 overflow-visible">
              {/* Top Washi Tape */}
              <div className="washi-tape-orange absolute -top-3 left-10 h-6 w-32 -rotate-1 z-10" />

              {/* Corner Sticker */}
              <CornerSticker type="duck_shower_gun" position="top-right" size={68} rotation={12} />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                {/* Left Column: Visual Showcase & Mini Evidence Strip (5 Cols) */}
                <div className="lg:col-span-5 flex flex-col gap-3">
                  <div
                    onClick={() => setActiveProject(familyBeanProject)}
                    className="group/img relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-100 border border-stone-200/90 shadow-md cursor-pointer"
                  >
                    <img
                      src={currentFamilyBeanImage}
                      alt={familyBeanProject.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-stone-900/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover/img:opacity-100 flex items-center justify-center">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 font-sans-clean text-xs font-bold text-stone-900 shadow-xl">
                        <FontAwesomeIcon icon={faEye} className="h-4 w-4 text-[#D97706]" />
                        Xem chi tiết &amp; 6 Video Reels
                      </span>
                    </div>

                    {/* Logo Badge */}
                    {familyBeanProject.logo && (
                      <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-xl bg-white/95 p-1.5 shadow-lg backdrop-blur-md border border-stone-200/80 z-10">
                        <div className="h-8 w-8 flex items-center justify-center">
                          <img
                            src={familyBeanProject.logo}
                            alt=""
                            className="h-full w-full object-contain"
                          />
                        </div>
                      </div>
                    )}

                    {/* Category Pill */}
                    <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 font-sans-clean text-[11px] font-bold text-stone-800 shadow-sm backdrop-blur-sm">
                      {familyBeanProject.category}
                    </div>

                    {/* Video & Photo Counter Badge */}
                    <div className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-stone-900/85 px-3 py-1 font-sans-clean text-[11px] font-semibold text-white shadow-sm backdrop-blur-sm">
                      <FontAwesomeIcon icon={faVideo} className="h-3.5 w-3.5 text-[#F59E0B]" />
                      <span>6 Video Reels + 4 Kế hoạch thực tế</span>
                    </div>
                  </div>

                  {/* Caption of active preview image */}
                  <div className="rounded-xl bg-[#FAF8F5] border border-stone-200/60 p-2.5 text-left">
                    <p className="font-sans-clean text-[11px] text-stone-600 line-clamp-2 leading-relaxed italic">
                      <span className="font-bold text-[#B45309] not-italic mr-1">✦ Tư liệu:</span>
                      {currentFamilyBeanCaption}
                    </p>
                  </div>

                  {/* Mini Thumbnails Strip (Click to Preview) */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
                    {familyBeanImages.map((imgUrl, thumbIdx) => {
                      const isThumbActive = activeFamilyBeanImageIndex === thumbIdx;
                      const thumbLabel =
                        thumbIdx === 0
                          ? 'Viral 39.8K'
                          : thumbIdx === 1
                          ? 'Target & Insight'
                          : thumbIdx === 2
                          ? 'Content Plan'
                          : 'CTKM 10K';

                      return (
                        <button
                          key={thumbIdx}
                          type="button"
                          onClick={() => setActiveFamilyBeanImageIndex(thumbIdx)}
                          className={`relative shrink-0 h-13 w-16 sm:h-14 sm:w-18 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                            isThumbActive
                              ? 'border-[#D97706] ring-2 ring-[#D97706]/30 scale-105 shadow-sm'
                              : 'border-stone-200 opacity-70 hover:opacity-100 hover:border-stone-400'
                          }`}
                          title={`Xem tư liệu 0${thumbIdx + 1}`}
                        >
                          <img src={imgUrl} alt="" className="h-full w-full object-cover" />
                          <span className="absolute inset-x-0 bottom-0 bg-stone-950/80 text-[8px] font-sans-clean font-bold text-white text-center py-0.5 truncate px-0.5">
                            {thumbLabel}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Project Details & Intel (7 Cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Meta Top */}
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
                      <span className="flex items-center gap-1.5 font-sans-clean uppercase tracking-wider text-[11px]">
                        <span className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                        THE FAMILY BEAN COFFEE • BÌNH THẠNH, TP.HCM
                      </span>
                      <span className="font-mono text-stone-400">{familyBeanProject.year}</span>
                    </div>

                    {/* Title */}
                    <div className="mt-2 flex items-center gap-3">
                      {familyBeanProject.logo && (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-stone-200 bg-white p-1.5 shadow-xs">
                          <img
                            src={familyBeanProject.logo}
                            alt=""
                            className="h-full w-full object-contain"
                          />
                        </div>
                      )}
                      <h4 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
                        {familyBeanProject.title}
                      </h4>
                    </div>

                    {/* Roles & Highlights */}
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#E2EFE7] px-3 py-1 font-sans-clean text-xs font-bold text-[#2F523B] flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faBriefcase} className="h-3 w-3" />
                        {familyBeanProject.role}
                      </span>
                      <span className="rounded-full bg-[#FFE3E8] px-3 py-1 font-sans-clean text-xs font-bold text-[#F2789F]">
                        ✦ Video Cao Nhất: 39.8K Views
                      </span>
                      <span className="rounded-full bg-[#FFF0E5] px-3 py-1 font-sans-clean text-xs font-bold text-[#A05118]">
                        ✦ Chuỗi Reels: 17.8K &amp; 10.9K
                      </span>
                    </div>

                    {/* Summary paragraph */}
                    <p className="mt-3 font-sans-clean text-xs sm:text-sm leading-relaxed text-stone-600 line-clamp-3">
                      {familyBeanProject.summary}
                    </p>

                    {/* 4 Performance Metrics Grid */}
                    {familyBeanProject.metrics && familyBeanProject.metrics.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {familyBeanProject.metrics.map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className="rounded-xl border border-stone-200/80 bg-[#FAF8F5] p-2.5 text-center"
                          >
                            <span className="block font-sans-clean text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                              {m.label}
                            </span>
                            <span className="mt-0.5 block font-editorial text-base sm:text-lg font-bold text-[#B45309]">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {familyBeanProject.tags.slice(0, 5).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="rounded-full bg-stone-100 px-2.5 py-0.5 font-sans-clean text-[11px] font-semibold text-stone-600"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveProject(familyBeanProject)}
                      className="flex-1 rounded-2xl bg-stone-900 hover:bg-[#B45309] px-5 py-3 font-sans-clean text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faEye} className="h-4 w-4" />
                      <span>Xem Chi Tiết Case Study &amp; 6 Video Reels 🎬</span>
                      <FontAwesomeIcon icon={faUpRightFromSquare} className="h-3 w-3 opacity-80 ml-1" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Dot Indicators */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-stone-500 font-sans-clean">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-stone-400">Đơn vị:</span>
                  <span className="rounded-full bg-[#FFF0E5] px-2.5 py-0.5 font-bold text-[#A05118]">
                    03 — THE FAMILY BEAN COFFEE
                  </span>
                  <span className="text-stone-400">• 6 Video Clips + CTKM</span>
                </div>

                <div className="flex items-center gap-2 font-sans-clean text-[11px] text-stone-400">
                  <FontAwesomeIcon icon={faPalette} className="h-3 w-3 text-[#059669]" />
                  <span>04 — PISAGO MUSIC &amp; ART • Giáo Dục Nghệ Thuật &amp; 5 Video Reels</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. PISAGO MUSIC & ART MASTER SHOWCASE */}
        {shouldShowPisago && pisagoProject && (
          <div className="mb-20">
            {/* Agency Group Header */}
            <div className="mb-6 flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E2EFE7] px-4 py-1 font-handwritten text-lg font-bold text-[#2F523B]">
                <FontAwesomeIcon icon={faPalette} className="h-3.5 w-3.5" />
                04 — PISAGO MUSIC &amp; ART
              </span>
              <h3 className="mt-2 font-editorial text-3xl font-bold text-stone-900 md:text-4xl">
                PISAGO MUSIC &amp; ART — CREATIVE EDUCATION
              </h3>
              <p className="mt-1 font-sans-clean text-sm text-stone-600 max-w-xl">
                Nghiên cứu tâm lý phụ huynh, định vị &quot;Cây Âm Nhạc Cá Nhân Hoá — Mỗi bé là một hành trình riêng&quot;, sản xuất chuỗi 5 video ngắn chạm cảm xúc và triển khai các chương trình trải nghiệm (Gói phễu 0đ, Combo gia đình, Workshop cuối tuần).
              </p>
            </div>

            {/* Pisago Showcase Card */}
            <div className="relative rounded-3xl border border-stone-200/90 bg-white p-5 sm:p-8 lg:p-10 shadow-2xl shadow-stone-200/60 overflow-visible">
              {/* Top Washi Tape */}
              <div className="washi-tape-green absolute -top-3 left-10 h-6 w-32 -rotate-1 z-10" />

              {/* Corner Sticker */}
              <CornerSticker type="planet_pastel" position="top-right" size={68} rotation={10} />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                {/* Left Column: Visual Showcase & Mini Evidence Strip (5 Cols) */}
                <div className="lg:col-span-5 flex flex-col gap-3">
                  <div
                    onClick={() => setActiveProject(pisagoProject)}
                    className="group/img relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-100 border border-stone-200/90 shadow-md cursor-pointer"
                  >
                    <img
                      src={currentPisagoImage}
                      alt={pisagoProject.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-stone-900/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover/img:opacity-100 flex items-center justify-center">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 font-sans-clean text-xs font-bold text-stone-900 shadow-xl">
                        <FontAwesomeIcon icon={faEye} className="h-4 w-4 text-[#059669]" />
                        Xem chi tiết &amp; 5 Video Reels
                      </span>
                    </div>

                    {/* Logo Badge */}
                    {pisagoProject.logo && (
                      <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-xl bg-white/95 p-1.5 shadow-lg backdrop-blur-md border border-stone-200/80 z-10">
                        <div className="h-8 w-8 flex items-center justify-center">
                          <img
                            src={pisagoProject.logo}
                            alt=""
                            className="h-full w-full object-contain"
                          />
                        </div>
                      </div>
                    )}

                    {/* Category Pill */}
                    <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 font-sans-clean text-[11px] font-bold text-stone-800 shadow-sm backdrop-blur-sm">
                      {pisagoProject.category}
                    </div>

                    {/* Video & Photo Counter Badge */}
                    <div className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-stone-900/85 px-3 py-1 font-sans-clean text-[11px] font-semibold text-white shadow-sm backdrop-blur-sm">
                      <FontAwesomeIcon icon={faVideo} className="h-3.5 w-3.5 text-[#10B981]" />
                      <span>5 Video Reels + Kế hoạch chiến lược</span>
                    </div>
                  </div>

                  {/* Caption of active preview image */}
                  <div className="rounded-xl bg-[#FAF8F5] border border-stone-200/60 p-2.5 text-left">
                    <p className="font-sans-clean text-[11px] text-stone-600 line-clamp-2 leading-relaxed italic">
                      <span className="font-bold text-[#059669] not-italic mr-1">✦ Tư liệu:</span>
                      {currentPisagoCaption}
                    </p>
                  </div>

                  {/* Mini Thumbnails Strip (Click to Preview) */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
                    {pisagoImages.map((imgUrl, thumbIdx) => {
                      const isThumbActive = activePisagoImageIndex === thumbIdx;
                      const thumbLabel =
                        thumbIdx === 0
                          ? 'Chiến Lược'
                          : thumbIdx === 1
                          ? 'Reel 01 (Vẽ)'
                          : thumbIdx === 2
                          ? 'Reel 02 (Piano)'
                          : thumbIdx === 3
                          ? 'Reel 03 (Hội họa)'
                          : thumbIdx === 4
                          ? 'Reel 04 (Thích vẽ)'
                          : 'Reel 05 (Cô Dương)';

                      return (
                        <button
                          key={thumbIdx}
                          type="button"
                          onClick={() => setActivePisagoImageIndex(thumbIdx)}
                          className={`relative shrink-0 h-13 w-16 sm:h-14 sm:w-18 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                            isThumbActive
                              ? 'border-[#059669] ring-2 ring-[#059669]/30 scale-105 shadow-sm'
                              : 'border-stone-200 opacity-70 hover:opacity-100 hover:border-stone-400'
                          }`}
                          title={`Xem tư liệu 0${thumbIdx + 1}`}
                        >
                          <img src={imgUrl} alt="" className="h-full w-full object-cover" />
                          <span className="absolute inset-x-0 bottom-0 bg-stone-950/80 text-[8px] font-sans-clean font-bold text-white text-center py-0.5 truncate px-0.5">
                            {thumbLabel}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Project Details & Intel (7 Cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Meta Top */}
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
                      <span className="flex items-center gap-1.5 font-sans-clean uppercase tracking-wider text-[11px]">
                        <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                        PISAGO MUSIC &amp; ART • GIÁO DỤC NGHỆ THUẬT CHO TRẺ
                      </span>
                      <span className="font-mono text-stone-400">{pisagoProject.year}</span>
                    </div>

                    {/* Title */}
                    <div className="mt-2 flex items-center gap-3">
                      {pisagoProject.logo && (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-stone-200 bg-white p-1.5 shadow-xs">
                          <img
                            src={pisagoProject.logo}
                            alt=""
                            className="h-full w-full object-contain"
                          />
                        </div>
                      )}
                      <h4 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
                        {pisagoProject.title}
                      </h4>
                    </div>

                    {/* Roles & Highlights */}
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#E2EFE7] px-3 py-1 font-sans-clean text-xs font-bold text-[#2F523B] flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faBriefcase} className="h-3 w-3" />
                        {pisagoProject.role}
                      </span>
                      <span className="rounded-full bg-[#ECFDF5] px-3 py-1 font-sans-clean text-xs font-bold text-[#059669]">
                        ✦ Cây Âm Nhạc Cá Nhân Hoá
                      </span>
                      <span className="rounded-full bg-[#FEF3C7] px-3 py-1 font-sans-clean text-xs font-bold text-[#D97706]">
                        ✦ 5 Video Reels Thực Chiến
                      </span>
                    </div>

                    {/* Summary paragraph */}
                    <p className="mt-3 font-sans-clean text-xs sm:text-sm leading-relaxed text-stone-600 line-clamp-3">
                      {pisagoProject.summary}
                    </p>

                    {/* 4 Performance Metrics Grid */}
                    {pisagoProject.metrics && pisagoProject.metrics.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {pisagoProject.metrics.map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className="rounded-xl border border-stone-200/80 bg-[#FAF8F5] p-2.5 text-center"
                          >
                            <span className="block font-sans-clean text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                              {m.label}
                            </span>
                            <span className="mt-0.5 block font-editorial text-base sm:text-lg font-bold text-[#059669]">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {pisagoProject.tags.slice(0, 5).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="rounded-full bg-stone-100 px-2.5 py-0.5 font-sans-clean text-[11px] font-semibold text-stone-600"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveProject(pisagoProject)}
                      className="flex-1 rounded-2xl bg-stone-900 hover:bg-[#059669] px-5 py-3 font-sans-clean text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faEye} className="h-4 w-4" />
                      <span>Xem Chi Tiết Case Study &amp; 5 Video Reels 🎨</span>
                      <FontAwesomeIcon icon={faUpRightFromSquare} className="h-3 w-3 opacity-80 ml-1" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Dot Indicators */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-stone-500 font-sans-clean">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-stone-400">Đơn vị:</span>
                  <span className="rounded-full bg-[#E2EFE7] px-2.5 py-0.5 font-bold text-[#2F523B]">
                    04 — PISAGO MUSIC &amp; ART
                  </span>
                  <span className="text-stone-400">• 5 Video Clips + Workshop</span>
                </div>

                <div className="flex items-center gap-2 font-sans-clean text-[11px] text-stone-500 font-semibold">
                  <span>05 — STEED (Sportswear &amp; Gym • 7 Video Reels)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. STEED SPORTSWEAR & GYM APPAREL SHOWCASE */}
        {shouldShowSteed && steedProject && (
          <div className="mb-20">
            {/* Agency Group Header */}
            <div className="mb-6 flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFEDE5] px-4 py-1 font-handwritten text-lg font-bold text-[#EA580C]">
                <FontAwesomeIcon icon={faDumbbell} className="h-3.5 w-3.5" />
                05 — STEED SPORTSWEAR
              </span>
              <h3 className="mt-2 font-editorial text-3xl font-bold text-stone-900 md:text-4xl">
                STEED — SPORTSWEAR &amp; GYM APPAREL
              </h3>
              <p className="mt-1 font-sans-clean text-sm text-stone-600 max-w-xl">
                Nghiên cứu Insight Gymer, định vị USP &quot;Mặc vào nhìn đô hơn ngay cả khi chưa có body — Thứ bạn bán là sự tự tin&quot;, kịch bản chi tiết (Poly vs Cotton, Oversized vs Body fit) và trực tiếp quay dựng trọn bộ 7 video ngắn chuẩn 9:16 trên TikTok &amp; Reels.
              </p>
            </div>

            {/* Steed Showcase Card */}
            <div className="relative rounded-3xl border border-stone-200/90 bg-white p-5 sm:p-8 lg:p-10 shadow-2xl shadow-stone-200/60 overflow-visible">
              {/* Top Washi Tape */}
              <div className="washi-tape-orange absolute -top-3 left-10 h-6 w-32 -rotate-1 z-10" />

              {/* Corner Sticker */}
              <CornerSticker type="duck_glasses" position="top-right" size={68} rotation={12} />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                {/* Left Column: Visual Showcase & Mini Evidence Strip (5 Cols) */}
                <div className="lg:col-span-5 flex flex-col gap-3">
                  <div
                    onClick={() => setActiveProject(steedProject)}
                    className="group/img relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-100 border border-stone-200/90 shadow-md cursor-pointer"
                  >
                    <img
                      src={currentSteedImage}
                      alt={steedProject.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-stone-900/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover/img:opacity-100 flex items-center justify-center">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 font-sans-clean text-xs font-bold text-stone-900 shadow-xl">
                        <FontAwesomeIcon icon={faEye} className="h-4 w-4 text-[#EA580C]" />
                        Xem chi tiết &amp; 7 Video Reels
                      </span>
                    </div>

                    {/* Logo Badge */}
                    {steedProject.logo && (
                      <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-xl bg-white/95 p-1.5 shadow-lg backdrop-blur-md border border-stone-200/80 z-10">
                        <div className="h-8 w-8 flex items-center justify-center">
                          <img
                            src={steedProject.logo}
                            alt=""
                            className="h-full w-full object-contain"
                          />
                        </div>
                      </div>
                    )}

                    {/* Category Pill */}
                    <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 font-sans-clean text-[11px] font-bold text-stone-800 shadow-sm backdrop-blur-sm">
                      {steedProject.category}
                    </div>

                    {/* Video & Photo Counter Badge */}
                    <div className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-stone-900/85 px-3 py-1 font-sans-clean text-[11px] font-semibold text-white shadow-sm backdrop-blur-sm">
                      <FontAwesomeIcon icon={faVideo} className="h-3.5 w-3.5 text-[#FB923C]" />
                      <span>7 Video Reels + Kế hoạch Content</span>
                    </div>
                  </div>

                  {/* Caption of active preview image */}
                  <div className="rounded-xl bg-[#FAF8F5] border border-stone-200/60 p-2.5 text-left">
                    <p className="font-sans-clean text-[11px] text-stone-600 line-clamp-2 leading-relaxed italic">
                      <span className="font-bold text-[#EA580C] not-italic mr-1">✦ Tư liệu:</span>
                      {currentSteedCaption}
                    </p>
                  </div>

                  {/* Mini Thumbnails Strip (Click to Preview) */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
                    {steedImages.map((imgUrl, thumbIdx) => {
                      const isThumbActive = activeSteedImageIndex === thumbIdx;
                      const thumbLabels = [
                        'Research',
                        'SWOT & Form',
                        'Clip 1 (Vải)',
                        'Clip 2 (Form)',
                        'Reel 01 (Phỏng vấn)',
                        'Reel 02 (Đừng mua)',
                        'Reel 03 (Chọn 1 áo)',
                        'Reel 04 (Quần 300k)',
                        'Reel 05 (Cinematic)',
                        'Reel 07 (On-body)'
                      ];
                      const thumbLabel = thumbLabels[thumbIdx] || `Tư liệu 0${thumbIdx + 1}`;

                      return (
                        <button
                          key={thumbIdx}
                          type="button"
                          onClick={() => setActiveSteedImageIndex(thumbIdx)}
                          className={`relative shrink-0 h-13 w-16 sm:h-14 sm:w-18 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                            isThumbActive
                              ? 'border-[#EA580C] ring-2 ring-[#EA580C]/30 scale-105 shadow-sm'
                              : 'border-stone-200 opacity-70 hover:opacity-100 hover:border-stone-400'
                          }`}
                          title={`Xem tư liệu 0${thumbIdx + 1}`}
                        >
                          <img src={imgUrl} alt="" className="h-full w-full object-cover" />
                          <span className="absolute inset-x-0 bottom-0 bg-stone-950/80 text-[8px] font-sans-clean font-bold text-white text-center py-0.5 truncate px-0.5">
                            {thumbLabel}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Project Details & Intel (7 Cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Meta Top */}
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
                      <span className="flex items-center gap-1.5 font-sans-clean uppercase tracking-wider text-[11px]">
                        <span className="h-2 w-2 rounded-full bg-[#EA580C]" />
                        STEED • THỜI TRANG THỂ THAO &amp; ĐỒ TẬP GYM NAM
                      </span>
                      <span className="font-mono text-stone-400">{steedProject.year}</span>
                    </div>

                    {/* Title */}
                    <div className="mt-2 flex items-center gap-3">
                      {steedProject.logo && (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-stone-200 bg-white p-1.5 shadow-xs">
                          <img
                            src={steedProject.logo}
                            alt=""
                            className="h-full w-full object-contain"
                          />
                        </div>
                      )}
                      <div>
                        <h4 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                          {steedProject.title}
                        </h4>
                        <p className="font-sans-clean text-xs text-stone-500">
                          {steedProject.role}
                        </p>
                      </div>
                    </div>

                    {/* Highlight Pills */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-orange-50 border border-orange-200/80 px-2.5 py-1 font-sans-clean text-xs font-semibold text-orange-800">
                        <FontAwesomeIcon icon={faBriefcase} className="h-3 w-3 text-orange-600" />
                        Content Marketing &amp; Video Production
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 border border-amber-200/80 px-2.5 py-1 font-sans-clean text-xs font-semibold text-amber-800">
                        ✦ USP: Mặc Đô Hơn Khi Chưa Có Body
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-rose-50 border border-rose-200/80 px-2.5 py-1 font-sans-clean text-xs font-semibold text-rose-800">
                        ✦ 7 Video Reels Thực Chiến
                      </span>
                    </div>

                    {/* Description */}
                    <p className="mt-3.5 font-sans-clean text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                      {steedProject.summary}
                    </p>

                    {/* Metrics Grid */}
                    {steedProject.metrics && (
                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {steedProject.metrics.map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className="rounded-xl border border-stone-200/80 bg-[#FAF8F5] p-2.5 text-center"
                          >
                            <span className="block font-sans-clean text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                              {m.label}
                            </span>
                            <span className="mt-0.5 block font-editorial text-base sm:text-lg font-bold text-[#EA580C]">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {steedProject.tags.slice(0, 5).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="rounded-full bg-stone-100 px-2.5 py-0.5 font-sans-clean text-[11px] font-semibold text-stone-600"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveProject(steedProject)}
                      className="flex-1 rounded-2xl bg-stone-900 hover:bg-[#EA580C] px-5 py-3 font-sans-clean text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faEye} className="h-4 w-4" />
                      <span>Xem Chi Tiết Case Study &amp; 7 Video Reels ⚡</span>
                      <FontAwesomeIcon icon={faUpRightFromSquare} className="h-3 w-3 opacity-80 ml-1" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Dot Indicators */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-stone-500 font-sans-clean">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-stone-400">Đơn vị:</span>
                  <span className="rounded-full bg-[#FFEDE5] px-2.5 py-0.5 font-bold text-[#C2410C]">
                    05 — STEED SPORTSWEAR
                  </span>
                  <span className="text-stone-400">• 7 Video Clips + Kế hoạch kịch bản chi tiết</span>
                </div>

                <div className="flex items-center gap-2 font-sans-clean text-[11px] text-stone-500 font-semibold">
                  <span>Thương hiệu thời trang thể thao &amp; đồ tập Gym nam</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. OTHER FUTURE PROJECTS (IF ANY) */}
        {otherProjects.length > 0 && (
          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {otherProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setActiveProject(project)}
                  className="group relative cursor-pointer rounded-3xl border border-stone-200 bg-white p-4 shadow-xl shadow-stone-200/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-900/10"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-100">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 px-2">
                    <h4 className="font-editorial text-2xl font-bold text-stone-900">
                      {project.title}
                    </h4>
                    <p className="mt-2 font-sans-clean text-xs leading-relaxed text-stone-600 line-clamp-3">
                      {project.summary}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
};
