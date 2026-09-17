import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faPhone,
  faCopy,
  faCheck,
  faWandMagicSparkles,
  faLocationDot,
  faHandshake
} from '@fortawesome/free-solid-svg-icons';
import { PortfolioData } from '../types';
import { CornerSticker } from './common/CuteStickers';
import { PolaroidCard3D } from './common/PolaroidCard3D';

interface ContactSectionProps {
  data: PortfolioData['contact'];
}

export const ContactSection: React.FC<ContactSectionProps> = ({ data }) => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const phone = data.phone || "0913104395";
  const email = data.email || "kimthuyen014@gmail.com";

  const handleCopy = (text: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(text);
    if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <section id="contact" className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 bg-paper-texture opacity-80" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        {/* Section Title Header */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Cute handwritten pill badge */}
            <span className="inline-block rounded-full bg-[#FFE3E8] px-4 py-1 font-handwritten text-xl font-bold text-[#F2789F] rotate-1">
              get in touch &amp; collaborate ✦
            </span>

            <h2 className="mt-2 font-fluffy text-4xl font-extrabold text-fluffy-pink md:text-5xl lg:text-6xl">
              LET'S CONNECT
            </h2>

            <p className="mt-2 font-editorial text-lg italic text-stone-600 max-w-xl mx-auto">
              thank you for stopping by! 🌸
            </p>
          </motion.div>
        </div>

        {/* Scrapbook Envelope Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full rounded-3xl border-2 border-dashed border-[#FF8DA1]/50 bg-white/95 p-6 sm:p-8 lg:p-12 shadow-2xl shadow-stone-200/60 backdrop-blur-md overflow-visible"
        >
          {/* Top Corner Sticker: Planet Pastel */}
          <CornerSticker type="planet_pastel" position="top-right" size={76} rotation={14} />

          {/* Washi Tape Accent */}
          <div className="washi-tape-pink absolute -top-3 left-10 h-6 w-36 -rotate-1 z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Letter Note & Contact Information (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FFE3E8] text-[#F2789F]">
                    <FontAwesomeIcon icon={faWandMagicSparkles} className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-sans-clean text-xs font-bold uppercase tracking-wider text-[#F2789F]">
                    Thông tin liên hệ trực tiếp
                  </span>
                </div>

                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900">
                  {data.noteTitle || "Let's create something magical together ✨"}
                </h3>

                <p className="mt-3 font-editorial text-base sm:text-lg leading-relaxed text-stone-600 italic">
                  "{data.noteBody || "Cảm ơn bạn đã ghé thăm portfolio của mình! Mình luôn sẵn sàng kết nối và đồng hành cùng các thương hiệu trong chiến lược Content Marketing, sản xuất Short-form Video & phát triển Social Media thực chiến."}"
                </p>
              </div>

              {/* Contact Info Items (Styled matching the reference image) */}
              <div className="space-y-3.5 pt-4 border-t border-stone-100">
                {/* 1. Phone Item */}
                <div className="group flex items-center justify-between gap-4 rounded-2xl border border-stone-200/90 bg-[#FAF8F5] p-3.5 sm:p-4 transition-all duration-300 hover:border-[#FF8DA1] hover:bg-white hover:shadow-md">
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                    {/* Black Circle with Icon matching image */}
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-stone-900 text-white shadow-sm transition-transform group-hover:scale-105">
                      <FontAwesomeIcon icon={faPhone} className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <span className="block font-sans-clean text-[10px] font-bold uppercase tracking-wider text-stone-400">
                        Số điện thoại / Zalo
                      </span>
                      <a
                        href={`tel:${phone}`}
                        className="font-editorial text-lg sm:text-xl font-bold text-stone-900 hover:text-[#F2789F] transition-colors truncate block"
                      >
                        {phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(phone, 'phone')}
                      title="Sao chép số điện thoại"
                      className="flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3 py-1.5 font-sans-clean text-xs font-semibold text-stone-700 transition-all hover:bg-[#FFE3E8] hover:text-[#F2789F] hover:border-[#FF8DA1] cursor-pointer"
                    >
                      <FontAwesomeIcon icon={copiedPhone ? faCheck : faCopy} className="h-3.5 w-3.5 text-[#F2789F]" />
                      <span className="hidden sm:inline">{copiedPhone ? 'Đã chép!' : 'Copy'}</span>
                    </button>
                    <a
                      href={`tel:${phone}`}
                      className="hidden sm:inline-flex items-center rounded-xl bg-stone-900 px-3 py-1.5 font-sans-clean text-xs font-bold text-white transition-all hover:bg-[#F2789F] cursor-pointer shadow-xs"
                    >
                      Gọi ngay
                    </a>
                  </div>
                </div>

                {/* 2. Email Item */}
                <div className="group flex items-center justify-between gap-4 rounded-2xl border border-stone-200/90 bg-[#FAF8F5] p-3.5 sm:p-4 transition-all duration-300 hover:border-[#FF8DA1] hover:bg-white hover:shadow-md">
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                    {/* Black Circle with Icon matching image */}
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-stone-900 text-white shadow-sm transition-transform group-hover:scale-105">
                      <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <span className="block font-sans-clean text-[10px] font-bold uppercase tracking-wider text-stone-400">
                        Email liên hệ
                      </span>
                      <a
                        href={`mailto:${email}`}
                        className="font-editorial text-base sm:text-xl font-bold text-stone-900 hover:text-[#F2789F] transition-colors truncate block"
                      >
                        {email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(email, 'email')}
                      title="Sao chép địa chỉ email"
                      className="flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3 py-1.5 font-sans-clean text-xs font-semibold text-stone-700 transition-all hover:bg-[#FFE3E8] hover:text-[#F2789F] hover:border-[#FF8DA1] cursor-pointer"
                    >
                      <FontAwesomeIcon icon={copiedEmail ? faCheck : faCopy} className="h-3.5 w-3.5 text-[#F2789F]" />
                      <span className="hidden sm:inline">{copiedEmail ? 'Đã chép!' : 'Copy'}</span>
                    </button>
                    <a
                      href={`mailto:${email}`}
                      className="hidden sm:inline-flex items-center rounded-xl bg-stone-900 px-3 py-1.5 font-sans-clean text-xs font-bold text-white transition-all hover:bg-[#F2789F] cursor-pointer shadow-xs"
                    >
                      Gửi thư
                    </a>
                  </div>
                </div>
              </div>

              {/* Location & Status Footer */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs font-sans-clean text-stone-500">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faLocationDot} className="h-3.5 w-3.5 text-[#52C0B6]" />
                  <span>{data.location || "TP. Hồ Chí Minh"} • Sẵn sàng làm việc Remote &amp; On-site</span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E2EFE7] px-3 py-1 font-bold text-[#2F523B]">
                  <FontAwesomeIcon icon={faHandshake} className="h-3 w-3 text-[#2F523B]" />
                  <span>Open for Opportunities</span>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Interactive Polaroid (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <PolaroidCard3D
                imageSrc="/images/contact_img.png"
                alt="Lê Thị Kim Thuyên"
                name="Lê Thị Kim Thuyên"
                caption="sáng tạo nội dung chạm cảm xúc ✦"
                date="Saigon • 2026"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
