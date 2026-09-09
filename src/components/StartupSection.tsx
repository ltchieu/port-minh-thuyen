import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faLightbulb,
  faShareNodes,
  faChartLine,
  faCircleCheck,
  faXmark,
  faExpand,
  faStar,
  faTrophy
} from '@fortawesome/free-solid-svg-icons';
import { StartupItem } from '../types';
import { CornerSticker } from './common/CuteStickers';

interface StartupSectionProps {
  startups: StartupItem[];
}

export const StartupSection: React.FC<StartupSectionProps> = ({ startups }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="startups" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-[92rem] px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block rounded-full bg-[#FFF0E5] px-5 py-1.5 font-handwritten text-xl font-bold text-[#A05118] shadow-sm">
              creative entrepreneurial venture ✦
            </span>
            <h2 className="mt-3 font-fluffy text-4xl font-extrabold text-fluffy-orange md:text-5xl lg:text-6xl tracking-wide">
              STARTUP & BRAND BUILDING
            </h2>
            <p className="mt-2 font-editorial text-lg italic text-stone-600 max-w-2xl mx-auto">
              From zero to an accessible premium lifestyle brand — leading strategy, visual direction, content production, and customer growth.
            </p>
          </motion.div>
        </div>

        {/* Startups List */}
        <div className="space-y-16">
          {startups.map((startup) => {
            return (
              <motion.div
                key={startup.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative rounded-3xl border border-stone-200 bg-white p-6 shadow-xl shadow-stone-200/50 md:p-10"
              >
                {/* Washi Tape */}
                <div className="washi-tape-pink absolute -top-3 left-10 h-6 w-36 -rotate-2 z-10"></div>

                {/* Corner Sticker */}
                <CornerSticker type="jellyfish_pompons" position="top-right" size={68} rotation={12} />

                {/* Brand Overview Header */}
                <div className="mb-10 grid grid-cols-1 gap-8 items-center lg:grid-cols-12">
                  {/* Left Info Column */}
                  <div className="space-y-4 lg:col-span-7">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#FF8DA1] px-3.5 py-1 font-sans-clean text-xs font-bold uppercase tracking-wider text-white">
                        {startup.role}
                      </span>
                      <span className="rounded-full bg-stone-100 px-3 py-1 font-sans-clean text-xs font-semibold text-stone-600">
                        {startup.period}
                      </span>
                    </div>

                    <h3 className="font-fluffy text-4xl font-bold text-stone-900 md:text-5xl">
                      {startup.name}
                    </h3>

                    <p className="font-editorial text-xl italic text-[#F2789F]">
                      "{startup.tagline}"
                    </p>

                    <p className="font-sans-clean text-sm leading-relaxed text-stone-600">
                      {startup.description}
                    </p>

                    {/* Key Highlights */}
                    <div className="grid grid-cols-1 gap-2.5 pt-2 sm:grid-cols-2">
                      {startup.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 rounded-xl bg-stone-50 p-2.5 border border-stone-100">
                          <FontAwesomeIcon icon={faCircleCheck} className="mt-0.5 h-4 w-4 shrink-0 text-[#81D8D0]" />
                          <span className="font-sans-clean text-xs font-semibold text-stone-700 leading-snug">
                            {h}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Hero Image Card */}
                  <div className="lg:col-span-5">
                    <div
                      onClick={() => setSelectedImage(startup.coverImage)}
                      className="group relative cursor-pointer overflow-hidden rounded-2xl border-4 border-white shadow-lg ring-1 ring-stone-200"
                    >
                      <img
                        src={startup.coverImage}
                        alt={startup.name}
                        referrerPolicy="no-referrer"
                        className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-96"
                      />
                      <div className="absolute inset-0 bg-stone-900/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-stone-900 shadow">
                          <FontAwesomeIcon icon={faExpand} className="h-3.5 w-3.5" /> Preview Concept
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-black/60 backdrop-blur-md p-3 text-white">
                        <span className="font-handwritten text-lg font-bold block text-pink-200">
                          Carne Gemstone Brand Identity ✦
                        </span>
                        <span className="font-sans-clean text-xs text-stone-300">
                          Visual aesthetics & product framing
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-10 border-stone-200" />

                {/* 1. STAFF MEMBERS SECTION */}
                {startup.members && startup.members.length > 0 && (
                  <div className="mb-12">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFE3E8] text-[#F2789F]">
                        <FontAwesomeIcon icon={faUsers} className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-fluffy text-2xl font-bold text-stone-900">
                          THE CREATIVE TEAM
                        </h4>
                        <p className="font-sans-clean text-xs text-stone-500">
                          Staff members powering Carne Gemstone's strategy and content
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                      {startup.members.map((member, mIdx) => (
                        <motion.div
                          key={mIdx}
                          whileHover={{ y: -4 }}
                          onClick={() => setSelectedImage(member.image)}
                          className="group relative cursor-pointer flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 p-4 shadow-md transition-all duration-300 hover:shadow-xl hover:border-pink-300"
                        >
                          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-stone-200">
                            <img
                              src={member.image}
                              alt={member.name || member.role}
                              referrerPolicy="no-referrer"
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-stone-900/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                              <FontAwesomeIcon icon={faExpand} className="h-5 w-5 text-white" />
                            </div>
                          </div>

                          <div className="mt-3 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                                <span className="inline-block rounded-full bg-[#FFE3E8] px-3 py-0.5 font-handwritten text-base font-bold text-[#F2789F]">
                                  {member.role}
                                </span>
                              </div>
                              {member.name && (
                                <h5 className="font-editorial text-lg font-bold text-stone-900 mt-1">
                                  {member.name}
                                </h5>
                              )}
                              {member.description && (
                                <p className="mt-1.5 font-sans-clean text-xs leading-relaxed text-stone-600">
                                  {member.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. CONCEPT & PRODUCT SHOWCASE */}
                {startup.conceptImages && startup.conceptImages.length > 0 && (
                  <div className="mb-12">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E6F4F1] text-[#52C0B6]">
                        <FontAwesomeIcon icon={faLightbulb} className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-fluffy text-2xl font-bold text-stone-900">
                          CONCEPT & PRODUCT SHOWCASE
                        </h4>
                        <p className="font-sans-clean text-xs text-stone-500">
                          Art direction, gemstone photography, moodboarding & campaign concepts
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                      {startup.conceptImages.map((img, imgIdx) => (
                        <div
                          key={imgIdx}
                          onClick={() => setSelectedImage(img)}
                          className="group relative cursor-pointer aspect-square overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:z-10"
                        >
                          <img
                            src={img}
                            alt={`Concept ${imgIdx + 1}`}
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

                {/* 3. SOCIAL MEDIA POSTS & CAPTIONS */}
                {startup.postImages && startup.postImages.length > 0 && (
                  <div className="mb-12">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFF0E5] text-[#FFA366]">
                        <FontAwesomeIcon icon={faShareNodes} className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-fluffy text-2xl font-bold text-stone-900">
                          SOCIAL MEDIA POSTS & CAPTIONS
                        </h4>
                        <p className="font-sans-clean text-xs text-stone-500">
                          Engaging social copy, hashtags, and visual post storytelling
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {startup.postImages.map((img, pIdx) => (
                        <div
                          key={pIdx}
                          onClick={() => setSelectedImage(img)}
                          className="group relative cursor-pointer overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 p-2 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-orange-300"
                        >
                          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-stone-200">
                            <img
                              src={img}
                              alt={`Post ${pIdx + 1}`}
                              referrerPolicy="no-referrer"
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-stone-900/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                              <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-stone-900">
                                View Post Details
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. CAMPAIGN RESULTS & METRICS */}
                {(startup.resultFeaturedImage || (startup.resultImages && startup.resultImages.length > 0)) && (
                  <div>
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E6F4F1] text-[#78A587]">
                        <FontAwesomeIcon icon={faChartLine} className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-fluffy text-2xl font-bold text-stone-900">
                          CAMPAIGN RESULTS & GROWTH METRICS
                        </h4>
                        <p className="font-sans-clean text-xs text-stone-500">
                          Organic conversions, customer engagement proof, and sales frequency
                        </p>
                      </div>
                    </div>

                    {/* Conversion Highlight Banner */}
                    {startup.resultHighlightText && (
                      <div className="mb-8 overflow-hidden rounded-2xl border-2 border-[#81D8D0] bg-gradient-to-r from-[#E6F4F1] via-[#F2FAF8] to-white p-6 shadow-lg">
                        <div className="grid grid-cols-1 gap-6 items-center lg:grid-cols-12">
                          <div className="space-y-3 lg:col-span-7">
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#81D8D0] px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-stone-900 shadow-sm">
                              <FontAwesomeIcon icon={faTrophy} className="h-3.5 w-3.5" /> Key Growth Milestone
                            </div>
                            <h5 className="font-editorial text-2xl font-bold text-stone-900 md:text-3xl leading-snug">
                              {startup.resultHighlightText}
                            </h5>
                            <p className="font-sans-clean text-xs font-semibold text-stone-600">
                              Building customer trust from day 1 with consistent content strategy, targeted consultation, and high repeat order frequency.
                            </p>
                          </div>

                          {startup.resultFeaturedImage && (
                            <div className="lg:col-span-5">
                              <div
                                onClick={() => setSelectedImage(startup.resultFeaturedImage!)}
                                className="group relative cursor-pointer overflow-hidden rounded-xl border-2 border-white shadow-md transition-transform hover:scale-105"
                              >
                                <img
                                  src={startup.resultFeaturedImage}
                                  alt="Result Highlight"
                                  referrerPolicy="no-referrer"
                                  className="h-48 w-full object-cover md:h-56"
                                />
                                <div className="absolute inset-0 bg-stone-900/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                                  <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-stone-900">
                                    Enlarge Proof Image
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Result Screenshots Grid */}
                    {startup.resultImages && startup.resultImages.length > 0 && (
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                        {startup.resultImages.map((resImg, rIdx) => (
                          <div
                            key={rIdx}
                            onClick={() => setSelectedImage(resImg)}
                            className="group relative cursor-pointer overflow-hidden rounded-xl border border-stone-200 bg-stone-100 aspect-square shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md"
                          >
                            <img
                              src={resImg}
                              alt={`Result Proof ${rIdx + 1}`}
                              referrerPolicy="no-referrer"
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-stone-900/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                              <FontAwesomeIcon icon={faExpand} className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* FULL RESOLUTION IMAGE LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl border border-white/20 bg-stone-900 shadow-2xl"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-stone-900/80 text-white shadow-lg hover:bg-stone-800 transition-transform hover:scale-110"
              >
                <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
              </button>
              <img
                src={selectedImage}
                alt="Selected Showcase Image"
                referrerPolicy="no-referrer"
                className="max-h-[85vh] max-w-full object-contain p-2"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
