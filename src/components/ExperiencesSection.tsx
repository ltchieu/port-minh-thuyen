import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faLocationDot, faWandMagicSparkles, faArrowUpRightFromSquare, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { ExperienceItem } from '../types';
import { CornerSticker, StickerType } from './common/CuteStickers';

interface ExperiencesSectionProps {
  experiences: ExperienceItem[];
}

export const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({ experiences }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <section id="experiences" ref={sectionRef} className="relative py-16 md:py-24">
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
              career journey & experience ✦
            </span>
            <h2 className="mt-2 font-fluffy text-4xl font-extrabold text-fluffy-green md:text-5xl">
              WORK EXPERIENCE
            </h2>
            <p className="mt-2 font-editorial text-lg italic text-stone-600">
              Kinh nghiệm thực chiến trong việc xây dựng & phát triển nội dung đa lĩnh vực
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

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`scroll-mt-28 relative flex flex-col md:flex-row ${isEven ? 'md:flex-row-reverse' : ''
                  } items-center`}
              >
                {/* Content Box - Full width on mobile, half on desktop */}
                <div className="w-full px-1 sm:px-3 md:w-1/2 md:px-8">
                  <div
                    className="group relative rounded-3xl border border-stone-200 bg-white/95 p-5 sm:p-6 md:p-8 shadow-lg hover:shadow-xl backdrop-blur-md transition-all duration-300 hover:border-pink-300 overflow-visible"
                  >
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
                    <div className={`${washiTape} absolute -top-3 left-6 h-6 w-28 rotate-1`}></div>

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
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
