import React from 'react';
import { motion } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWandMagicSparkles,
  faCircleCheck,
  faPalette,
  faVideo,
  faBrain,
  faMagnifyingGlass,
  faComments,
  faLanguage,
  faUser,
  faEnvelope,
  faPhone,
  faBriefcase,
  faCompass,
  faShareNodes,
  faLayerGroup
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faTiktok,
  faInstagram,
  faThreads
} from '@fortawesome/free-brands-svg-icons';
import { PortfolioData } from '../types';
import { CornerSticker } from './common/CuteStickers';

interface AboutSectionProps {
  data: PortfolioData['about'];
}

// Helper to map software skill names to SVG logos in public/logo
const getSoftwareLogo = (name: string): string | null => {
  const lower = name.toLowerCase();
  if (lower.includes('canva')) return '/logo/canva-1.svg';
  if (lower.includes('capcut')) return '/logo/capcut-3.svg';
  return null;
};

export const AboutSection: React.FC<AboutSectionProps> = ({ data }) => {
  const email = data.email || "kimthuyen014@gmail.com";
  const phone = data.phone || "0913104395";
  const name = data.name || "Lê Thị Kim Thuyên";
  const position = data.position || "Content Marketing / Social Media";

  return (
    <section id="about" className="relative py-16 md:py-24">
      <div className="relative mx-auto max-w-[92rem] px-4 md:px-6">
        {/* Section Title Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          {/* Handwritten Sub-quote */}
          <span className="inline-block rounded-full bg-[#FFE3E8] px-4 py-1 font-handwritten text-xl font-bold text-[#F2789F] -rotate-1">
            {data.handwrittenQuote}
          </span>

          <h2 className="mt-3 font-fluffy text-4xl font-extrabold text-fluffy-pink md:text-5xl lg:text-6xl">
            {data.heading}
          </h2>

          <p className="mt-2 font-sans-clean text-sm font-semibold uppercase tracking-widest text-[#52C0B6]">
            {data.subheading}
          </p>
        </motion.div>

        {/* 2-Column Split: Left = Bio / Self-Intro & Soft Skills | Right = Personal Overview & Hard Skills */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Self Introduction & Soft Skills */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6 lg:col-span-6"
          >
            {/* 1. Bio Card (Giới thiệu bản thân) */}
            <div className="relative rounded-3xl border border-stone-200 bg-white/95 p-6 shadow-xl shadow-stone-200/50 backdrop-blur-sm md:p-8">
              {/* Corner Sticker: Duck with Glasses */}
              <CornerSticker type="duck_glasses" position="top-right" size={70} rotation={12} />

              {/* Tiffany Washi Tape */}
              <div className="washi-tape-tiffany absolute -top-3 left-8 h-6 w-32 -rotate-2"></div>

              <div className="flex items-center gap-2 mb-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFE3E8] text-[#F2789F]">
                  <FontAwesomeIcon icon={faWandMagicSparkles} className="h-4 w-4" />
                </span>
                <h3 className="font-editorial text-2xl font-bold text-stone-900 md:text-3xl">
                  Giới thiệu
                </h3>
              </div>

              {/* Bio Paragraphs */}
              <div className="space-y-4 font-editorial text-base leading-relaxed text-stone-700 md:text-lg [&_strong]:font-bold [&_strong]:text-stone-900">
                {data.bioParagraphs.map((para, idx) => (
                  <p key={idx} dangerouslySetInnerHTML={{ __html: para }} />
                ))}
              </div>

              {/* Domains Badges */}
              <div className="mt-5 flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
                <span className="font-sans-clean text-xs font-bold uppercase tracking-wider text-stone-500">
                  Lĩnh vực:
                </span>
                {['Beauty', 'Education', 'Coffee Space', 'Luxury & Interior'].map((domain, dIdx) => (
                  <span
                    key={dIdx}
                    className="rounded-full bg-[#FFE3E8]/80 px-3 py-1 font-sans-clean text-xs font-bold text-[#D84C72]"
                  >
                    ✦ {domain}
                  </span>
                ))}
              </div>
            </div>

            {/* 2. Soft Skills & Languages Card (03. KỸ NĂNG MỀM & NGOẠI NGỮ) */}
            <div className="relative rounded-3xl border border-stone-200 bg-white/95 p-6 shadow-xl shadow-stone-200/50 backdrop-blur-sm md:p-8">
              {/* Tiffany Washi Tape */}
              <div className="washi-tape-tiffany absolute -top-3 left-8 h-6 w-32 -rotate-1"></div>

              <div className="flex items-center gap-2 mb-5">
                <FontAwesomeIcon icon={faBrain} className="h-5 w-5 text-[#52C0B6]" />
                <h3 className="font-editorial text-xs font-bold uppercase tracking-widest text-stone-500">
                  03. KỸ NĂNG MỀM & NGOẠI NGỮ
                </h3>
              </div>

              {/* Kỹ năng mềm */}
              <div className="space-y-3">
                <h4 className="font-editorial text-sm font-bold uppercase tracking-wider text-stone-800 flex items-center gap-2">
                  <FontAwesomeIcon icon={faCircleCheck} className="text-[#52C0B6] h-3.5 w-3.5" />
                  Kỹ năng mềm
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-[#E6F4F1] border border-[#52C0B6]/30 flex flex-col justify-between transition-all hover:bg-white hover:shadow-sm">
                    <FontAwesomeIcon icon={faBrain} className="text-[#52C0B6] text-lg mb-2" />
                    <p className="font-editorial font-bold text-stone-800 text-sm">Tư duy sáng tạo</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#FFE3E8] border border-[#F2789F]/30 flex flex-col justify-between transition-all hover:bg-white hover:shadow-sm">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#F2789F] text-lg mb-2" />
                    <p className="font-editorial font-bold text-stone-800 text-sm">Kỹ năng nghiên cứu</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#FFF0E5] border border-[#FFA366]/30 flex flex-col justify-between transition-all hover:bg-white hover:shadow-sm">
                    <FontAwesomeIcon icon={faComments} className="text-[#FFA366] text-lg mb-2" />
                    <p className="font-editorial font-bold text-stone-800 text-sm">Sale, giao tiếp & làm việc khách hàng</p>
                  </div>
                </div>
              </div>

              {/* Ngoại ngữ */}
              <div className="mt-6 pt-5 border-t border-stone-200/80">
                <div className="flex items-center gap-2 mb-3">
                  <FontAwesomeIcon icon={faLanguage} className="h-4 w-4 text-[#78A587]" />
                  <h4 className="font-editorial text-sm font-bold uppercase tracking-wider text-stone-800">
                    NGOẠI NGỮ
                  </h4>
                </div>
                <div className="p-4 rounded-2xl bg-stone-50/90 border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-editorial font-bold text-stone-900 text-base">Tiếng Anh</span>
                    <p className="font-sans-clean text-xs text-stone-600">Thành thạo trong công việc & giao tiếp</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Nghe', 'Nói', 'Đọc', 'Viết'].map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="rounded-full bg-[#E2EFE7] border border-[#78A587]/30 px-3 py-1 font-sans-clean text-xs font-bold text-[#2F523B]"
                      >
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Interactive Pill Category Badges */}
            <div className="rounded-2xl border border-stone-200 bg-[#FFF0E5]/60 p-4">
              <p className="font-sans-clean text-xs font-bold uppercase text-[#A05118] mb-2">
                Core Domains & Capabilities ✦
              </p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Social Media',
                  'Short-form Video',
                  'Content Marketing',
                  'Content Calendar',
                  'Canva',
                  'CapCut',
                  'Facebook & TikTok',
                  'Instagram & Threads'
                ].map((badge, bIdx) => (
                  <span
                    key={bIdx}
                    className="rounded-full bg-white px-3 py-1 font-sans-clean text-xs font-semibold text-stone-700 shadow-xs"
                  >
                    #{badge}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Personal Overview & 02. KỸ NĂNG CỨNG */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6 lg:col-span-6"
          >
            {/* 1. Personal Overview Card (Thông tin cá nhân) */}
            <div className="relative rounded-3xl border border-stone-200 bg-white/95 p-6 shadow-xl shadow-stone-200/50 backdrop-blur-sm md:p-8">
              {/* Corner Sticker: Sailor Duck */}
              <CornerSticker type="duck_sailor" position="top-right" size={72} rotation={10} />

              {/* Pink Washi Tape */}
              <div className="washi-tape-pink absolute -top-3 right-8 h-6 w-28 rotate-1"></div>

              <div className="flex items-center gap-2 mb-4">
                <FontAwesomeIcon icon={faUser} className="h-5 w-5 text-[#F2789F]" />
                <h3 className="font-editorial text-xs font-bold uppercase tracking-widest text-stone-500">
                  THÔNG TIN CÁ NHÂN & ĐỊNH VỊ
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Tên */}
                <div className="p-3.5 rounded-2xl bg-stone-50/90 border border-stone-200/80">
                  <span className="font-sans-clean text-xs font-bold text-stone-500 uppercase tracking-wider block mb-1">
                    Tên
                  </span>
                  <p className="font-editorial text-lg font-bold text-stone-900">
                    {name}
                  </p>
                </div>

                {/* Vị trí muốn định vị */}
                <div className="p-3.5 rounded-2xl bg-[#FFE3E8]/50 border border-[#F2789F]/30">
                  <span className="font-sans-clean text-xs font-bold text-[#D84C72] uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faBriefcase} className="h-3 w-3" />
                    Vị trí định vị
                  </span>
                  <p className="font-editorial text-base font-bold text-stone-900">
                    {position}
                  </p>
                </div>

                {/* Email */}
                <div className="p-3.5 rounded-2xl bg-stone-50/90 border border-stone-200/80">
                  <span className="font-sans-clean text-xs font-bold text-stone-500 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faEnvelope} className="h-3 w-3 text-stone-400" />
                    Email
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className="font-sans-clean text-sm font-semibold text-stone-800 hover:text-[#F2789F] transition-colors break-all"
                  >
                    {email}
                  </a>
                </div>

                {/* Số điện thoại */}
                <div className="p-3.5 rounded-2xl bg-stone-50/90 border border-stone-200/80">
                  <span className="font-sans-clean text-xs font-bold text-stone-500 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faPhone} className="h-3 w-3 text-stone-400" />
                    Số điện thoại
                  </span>
                  <a
                    href={`tel:${phone}`}
                    className="font-sans-clean text-sm font-semibold text-stone-800 hover:text-[#F2789F] transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              </div>
            </div>

            {/* 2. Hard Skills Section (02. KỸ NĂNG CỨNG) */}
            <div className="relative rounded-3xl border border-stone-200 bg-white/95 p-6 shadow-xl shadow-stone-200/50 backdrop-blur-sm md:p-8">
              {/* Corner Sticker: Frogs Boba */}
              <CornerSticker type="frogs_boba" position="top-right" size={78} rotation={-8} />

              {/* Green Washi Tape */}
              <div className="washi-tape-green absolute -top-3 left-10 h-6 w-32 -rotate-1"></div>

              <div className="flex items-center gap-2 mb-6">
                <FontAwesomeIcon icon={faLayerGroup} className="h-5 w-5 text-[#52C0B6]" />
                <h3 className="font-editorial text-xs font-bold uppercase tracking-widest text-stone-500">
                  02. KỸ NĂNG CỨNG
                </h3>
              </div>

              <div className="space-y-6">
                {/* 1. Social Media */}
                <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/80">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h4 className="font-editorial text-base font-bold text-stone-900 flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFE3E8] text-[#F2789F]">
                        <FontAwesomeIcon icon={faShareNodes} className="h-3.5 w-3.5" />
                      </span>
                      Social Media
                    </h4>
                    {/* Platform Brand Icons */}
                    <div className="flex items-center gap-2 text-stone-500">
                      <span title="Facebook" className="hover:text-blue-600 transition-colors">
                        <FontAwesomeIcon icon={faFacebook} className="h-4 w-4" />
                      </span>
                      <span title="TikTok" className="hover:text-stone-900 transition-colors">
                        <FontAwesomeIcon icon={faTiktok} className="h-4 w-4" />
                      </span>
                      <span title="Instagram" className="hover:text-pink-600 transition-colors">
                        <FontAwesomeIcon icon={faInstagram} className="h-4 w-4" />
                      </span>
                      <span title="Threads" className="hover:text-stone-900 transition-colors">
                        <FontAwesomeIcon icon={faThreads} className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-2 font-editorial text-sm text-stone-700">
                    <li className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F2789F]"></span>
                      <span>Quản lý và phát triển các kênh <strong>Facebook, TikTok, Instagram, Threads</strong></span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F2789F]"></span>
                      <span>Xây dựng định hướng nội dung dựa trên <strong>insight khách hàng</strong></span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F2789F]"></span>
                      <span>Xây dựng <strong>Content Pillar & Content Calendar</strong></span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F2789F]"></span>
                      <span>Phát triển nội dung phù hợp với <strong>từng nền tảng</strong></span>
                    </li>
                  </ul>
                </div>

                {/* 2. Short-form Video */}
                <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/80">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E6F4F1] text-[#52C0B6]">
                      <FontAwesomeIcon icon={faVideo} className="h-3.5 w-3.5" />
                    </span>
                    <h4 className="font-editorial text-base font-bold text-stone-900">
                      Short-form Video
                    </h4>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-editorial text-sm text-stone-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#52C0B6]"></span>
                      <span>Lên ý tưởng video</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#52C0B6]"></span>
                      <span>Xây dựng hook & kịch bản</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#52C0B6]"></span>
                      <span>Quay / phối hợp sản xuất</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#52C0B6]"></span>
                      <span>Dựng TikTok, Reels, Shorts</span>
                    </li>
                    <li className="flex items-start gap-2 sm:col-span-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#52C0B6]"></span>
                      <span>Tối ưu nhịp dựng, visual và trải nghiệm người xem</span>
                    </li>
                    <li className="flex items-start gap-2 sm:col-span-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#52C0B6]"></span>
                      <span>Theo dõi performance và tối ưu nội dung</span>
                    </li>
                  </ul>
                </div>

                {/* 3. Thiết kế & Biên tập */}
                <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/80">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFF0E5] text-[#FFA366]">
                      <FontAwesomeIcon icon={faPalette} className="h-3.5 w-3.5" />
                    </span>
                    <h4 className="font-editorial text-base font-bold text-stone-900">
                      Thiết kế & Biên tập
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {/* Canva */}
                    <div className="flex items-center gap-3 rounded-xl border border-stone-200/90 bg-white p-2.5 shadow-2xs transition-all hover:border-teal-300">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 border border-teal-200/80 p-1.5">
                        {getSoftwareLogo('canva') ? (
                          <img src={getSoftwareLogo('canva')!} alt="Canva" className="h-full w-full object-contain" />
                        ) : (
                          <FontAwesomeIcon icon={faPalette} className="h-4 w-4 text-teal-600" />
                        )}
                      </span>
                      <span className="font-editorial font-bold text-stone-800 text-sm">Canva</span>
                    </div>

                    {/* CapCut */}
                    <div className="flex items-center gap-3 rounded-xl border border-stone-200/90 bg-white p-2.5 shadow-2xs transition-all hover:border-stone-400">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-stone-100 border border-stone-300 p-1.5">
                        {getSoftwareLogo('capcut') ? (
                          <img src={getSoftwareLogo('capcut')!} alt="CapCut" className="h-full w-full object-contain" />
                        ) : (
                          <FontAwesomeIcon icon={faVideo} className="h-4 w-4 text-stone-800" />
                        )}
                      </span>
                      <span className="font-editorial font-bold text-stone-800 text-sm">CapCut</span>
                    </div>

                    {/* Chỉnh sửa và biên tập video */}
                    <div className="flex items-center gap-3 rounded-xl border border-stone-200/90 bg-white p-2.5 shadow-2xs transition-all hover:border-orange-300">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 border border-orange-200/80 p-1.5">
                        <FontAwesomeIcon icon={faVideo} className="h-4 w-4 text-orange-500" />
                      </span>
                      <span className="font-editorial font-bold text-stone-800 text-xs sm:text-sm leading-tight">
                        Biên tập video
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </motion.div>
        </div>
      </div>
    </section>
  );
};
