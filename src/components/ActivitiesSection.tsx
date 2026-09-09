import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandHoldingHeart,
  faUsers,
  faBullhorn,
  faExpand,
  faImages,
  faTag,
  faCircleCheck,
  faLocationDot
} from '@fortawesome/free-solid-svg-icons';
import { ActivityItem } from '../types';
import { CornerSticker } from './common/CuteStickers';
import { FullSizeImageModal } from './FullSizeImageModal';

interface ActivitiesSectionProps {
  activities: ActivityItem[];
}

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({ activities }) => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    images: string[];
    index: number;
    title: string;
  }>({
    isOpen: false,
    images: [],
    index: 0,
    title: '',
  });

  const openLightbox = (images: string[], index: number, title: string) => {
    setModalState({
      isOpen: true,
      images,
      index,
      title,
    });
  };

  const closeLightbox = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const getBadgeStyle = (color: ActivityItem['badgeColor']) => {
    switch (color) {
      case 'pink':
        return 'bg-[#FF8DA1] text-white';
      case 'tiffany':
        return 'bg-[#81D8D0] text-stone-900';
      case 'orange':
        return 'bg-[#FFA366] text-white';
      default:
        return 'bg-stone-800 text-white';
    }
  };

  const getIconForActivity = (index: number) => {
    if (index % 3 === 0) return faHandHoldingHeart;
    if (index % 3 === 1) return faUsers;
    return faBullhorn;
  };

  return (
    <section id="activities" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-[92rem] px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block rounded-full bg-[#FFE3E8] px-5 py-1.5 font-handwritten text-xl font-bold text-[#F2789F] shadow-sm">
              community & volunteer initiatives ✦
            </span>
            <h2 className="mt-3 font-fluffy text-4xl font-extrabold text-fluffy-pink md:text-5xl lg:text-6xl tracking-wide">
              COMMUNITY & EXTRACURRICULAR ACTIVITIES
            </h2>
            <p className="mt-2 font-editorial text-lg italic text-stone-600 max-w-2xl mx-auto">
              Spearheading charitable food drives, youth summer campaigns, and creative marketing for university clubs.
            </p>
          </motion.div>
        </div>

        {/* Activities List */}
        <div className="space-y-16">
          {activities.map((activity, idx) => {
            const icon = getIconForActivity(idx);

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative rounded-3xl border border-stone-200 bg-white p-6 shadow-xl shadow-stone-200/50 md:p-10"
              >
                {/* Washi Tape Accent */}
                <div
                  className={`absolute -top-3 left-10 h-6 w-36 -rotate-2 z-10 ${
                    idx % 2 === 0 ? 'washi-tape-pink' : 'washi-tape-teal'
                  }`}
                ></div>

                {/* Corner Sticker */}
                <CornerSticker
                  type={idx % 3 === 0 ? 'duck_glasses' : idx % 3 === 1 ? 'jellyfish_pompons' : 'planet_pastel'}
                  position="top-right"
                  size={64}
                  rotation={10}
                />

                {/* Activity Main Content Grid */}
                <div className="grid grid-cols-1 gap-8 items-start lg:grid-cols-12">
                  {/* Left Column: Details */}
                  <div className="space-y-5 lg:col-span-7">
                    {/* Header Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3.5 py-1 font-sans-clean text-xs font-bold uppercase tracking-wider ${getBadgeStyle(
                          activity.badgeColor
                        )}`}
                      >
                        {activity.role}
                      </span>
                      {activity.organization && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-3 py-1 font-sans-clean text-xs font-semibold text-stone-700 border border-stone-200">
                          <FontAwesomeIcon icon={faLocationDot} className="h-3 w-3 text-[#F2789F]" />
                          {activity.organization}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FFE3E8] text-[#F2789F] shadow-sm">
                        <FontAwesomeIcon icon={icon} className="h-5 w-5" />
                      </div>
                      <h3 className="font-fluffy text-2xl font-bold text-stone-900 md:text-3xl lg:text-4xl leading-tight">
                        {activity.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="font-sans-clean text-sm leading-relaxed text-stone-600 md:text-base">
                      {activity.description}
                    </p>

                    {/* Tags */}
                    {activity.tags && activity.tags.length > 0 && (
                      <div className="pt-2">
                        <div className="mb-2 flex items-center gap-2 text-stone-400 font-sans-clean text-xs uppercase tracking-wider">
                          <FontAwesomeIcon icon={faTag} className="h-3 w-3" /> Key Competencies
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {activity.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="inline-flex items-center gap-1.5 rounded-xl bg-stone-50 px-3 py-1.5 font-sans-clean text-xs font-semibold text-stone-700 border border-stone-200/80 shadow-xs"
                            >
                              <FontAwesomeIcon icon={faCircleCheck} className="h-3.5 w-3.5 text-[#52C0B6]" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Hero Cover Photo */}
                  <div className="lg:col-span-5">
                    <div
                      onClick={() => openLightbox(activity.images, 0, activity.title)}
                      className="group relative cursor-pointer overflow-hidden rounded-2xl border-4 border-white shadow-lg ring-1 ring-stone-200 transition-transform duration-300 hover:scale-[1.02]"
                    >
                      <img
                        src={activity.coverImage}
                        alt={activity.title}
                        referrerPolicy="no-referrer"
                        className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-80"
                      />
                      <div className="absolute inset-0 bg-stone-900/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-stone-900 shadow">
                          <FontAwesomeIcon icon={faExpand} className="h-3.5 w-3.5" /> View Photo Gallery ({activity.images.length})
                        </span>
                      </div>
                      {activity.logo && (
                        <div className="absolute top-3 right-3 h-14 w-14 overflow-hidden rounded-2xl border-2 border-white bg-white p-1 shadow-md">
                          <img
                            src={activity.logo}
                            alt="Logo"
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-contain rounded-xl"
                          />
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-black/65 backdrop-blur-md p-3 text-white">
                        <span className="font-handwritten text-lg font-bold block text-pink-200">
                          Activity Showcase ✦
                        </span>
                        <span className="font-sans-clean text-xs text-stone-300">
                          Click to enlarge photo gallery
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Photo Gallery Strip if multiple images */}
                {activity.images && activity.images.length > 1 && (
                  <div className="mt-8 border-t border-stone-100 pt-6">
                    <div className="mb-4 flex items-center gap-2 text-stone-700 font-fluffy text-lg font-bold">
                      <FontAwesomeIcon icon={faImages} className="h-4 w-4 text-[#F2789F]" />
                      Activity Gallery ({activity.images.length} Photos)
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
                      {activity.images.map((img, imgIdx) => (
                        <div
                          key={imgIdx}
                          onClick={() => openLightbox(activity.images, imgIdx, activity.title)}
                          className="group relative cursor-pointer aspect-square overflow-hidden rounded-xl border border-stone-200 bg-stone-100 shadow-xs transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-pink-300"
                        >
                          <img
                            src={img}
                            alt={`${activity.title} photo ${imgIdx + 1}`}
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-stone-900/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                            <FontAwesomeIcon icon={faExpand} className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <FullSizeImageModal
        isOpen={modalState.isOpen}
        images={modalState.images}
        initialIndex={modalState.index}
        onClose={closeLightbox}
        title={modalState.title}
      />
    </section>
  );
};
