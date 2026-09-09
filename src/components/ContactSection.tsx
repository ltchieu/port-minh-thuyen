import React from 'react';
import { motion } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faTiktok, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { PortfolioData } from '../types';
import { CornerSticker } from './common/CuteStickers';

interface ContactSectionProps {
  data: PortfolioData['contact'];
}

export const ContactSection: React.FC<ContactSectionProps> = ({ data }) => {
  const getSocialIcon = (platform: string, iconKey?: string) => {
    const key = `${platform} ${iconKey || ''}`.toLowerCase();
    if (key.includes('instagram')) return faInstagram;
    if (key.includes('tiktok') || key.includes('video')) return faTiktok;
    if (key.includes('linkedin')) return faLinkedin;
    if (key.includes('whatsapp')) return faWhatsapp;
    return faGlobe;
  };

  return (
    <section id="contact" className="relative py-16 md:py-24">
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 bg-paper-texture opacity-80"></div>

      <div className="relative mx-auto max-w-4xl px-4 md:px-6">
        {/* Title */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-editorial text-5xl font-black italic text-stone-900 sm:text-6xl lg:text-7xl">
              {data.heading}
            </h2>
            <span className="inline-block mt-2 font-handwritten text-2xl font-bold text-[#F2789F]">
              thank you for stopping by! 🌸
            </span>
          </motion.div>
        </div>

        {/* Full Width Letter Envelope Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full rounded-3xl border-2 border-dashed border-[#FF8DA1]/50 bg-white p-6 shadow-xl md:p-10 lg:p-12"
        >
          {/* Corner Sticker: Planet Pastel */}
          <CornerSticker type="planet_pastel" position="top-right" size={76} rotation={14} />

          {/* Pink Washi Tape */}
          <div className="washi-tape-pink absolute -top-3 left-8 h-6 w-36 -rotate-1"></div>

          <h3 className="font-editorial text-2xl font-bold text-stone-900 md:text-3xl">
            {data.noteTitle}
          </h3>

          <p className="mt-4 font-editorial text-lg leading-relaxed text-stone-700 italic">
            "{data.noteBody}"
          </p>

          <div className="mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-6 border-t border-stone-100">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-2.5 font-sans-clean text-sm font-semibold text-stone-800">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFE3E8] text-[#F2789F]">
                  <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" />
                </div>
                <a href={`mailto:${data.email}`} className="text-[#F2789F] hover:underline text-base font-bold">
                  {data.email}
                </a>
              </div>

              {data.worldwideEmail && (
                <div className="flex items-center gap-2 font-sans-clean text-sm text-stone-700 sm:border-l sm:border-stone-200 sm:pl-3">
                  <a href={`mailto:${data.worldwideEmail}`} className="text-stone-800 hover:text-[#F2789F] hover:underline text-sm font-bold flex items-center gap-1.5">
                    <span>{data.worldwideEmail}</span>
                    <span className="rounded-full bg-[#FFE3E8] px-2.5 py-0.5 font-handwritten text-xs font-bold text-[#F2789F]">
                      Worldwide
                    </span>
                  </a>
                </div>
              )}
            </div>

          </div>

          {/* Social Links */}
          <div className="mt-8 pt-6 border-t border-stone-100">
            <p className="mb-4 font-sans-clean text-xs font-bold uppercase tracking-wider text-stone-400">
              Social Media & Portfolios
            </p>
            <div className="flex flex-wrap gap-3">
              {data.socials.map((soc, idx) => {
                const socialIcon = getSocialIcon(soc.platform, soc.icon);
                return (
                  <a
                    key={idx}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-2 font-sans-clean text-xs font-semibold text-stone-700 transition-all hover:bg-[#FFE3E8] hover:text-[#F2789F] hover:border-[#FF8DA1] hover:shadow-sm"
                  >
                    <FontAwesomeIcon icon={socialIcon} className="h-4 w-4 text-[#F2789F]" />
                    <span>{soc.platform}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
