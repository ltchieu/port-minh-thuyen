import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faWandMagicSparkles, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

interface NavbarProps {
  activeSection: string;
  sparklesEnabled: boolean;
  onToggleSparkles: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  sparklesEnabled,
  onToggleSparkles,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'About Me', href: '#about', id: 'about' },
    { name: 'Experiences', href: '#experiences', id: 'experiences' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      <header className="fixed top-2.5 sm:top-3.5 left-0 right-0 z-50 mx-auto w-[96%] max-w-[92rem] transition-all duration-300">
        <nav
          className={`relative flex items-center justify-between rounded-full border px-4 py-2 sm:py-2.5 shadow-lg backdrop-blur-md transition-all duration-300 md:px-6 ${
            isScrolled
              ? 'border-pink-200/80 bg-white/95 shadow-xl shadow-pink-900/10'
              : 'border-stone-200/80 bg-white/90 shadow-md shadow-pink-900/5'
          }`}
        >
          {/* Brand Logo / Identity */}
          <a
            href="#hero"
            className="group flex items-center gap-2 font-fluffy text-lg font-bold tracking-wide text-stone-800 transition-colors hover:text-[#F2789F]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFE3E8] text-[#F2789F] shadow-sm transition-transform group-hover:rotate-12 group-hover:scale-110">
              <FontAwesomeIcon icon={faHeart} className="h-4 w-4" />
            </span>
            <span className="font-editorial text-xl italic font-semibold text-stone-900 group-hover:text-[#F2789F]">
              KT. Portfolio
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden items-center gap-1 md:flex lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative rounded-full px-3.5 py-1.5 font-sans-clean text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? 'bg-[#FF8DA1] text-white shadow-sm shadow-pink-300'
                      : 'text-stone-600 hover:bg-[#FFE3E8]/60 hover:text-stone-900'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2">
            {/* Sparkles Toggle */}
            <button
              type="button"
              onClick={onToggleSparkles}
              title={sparklesEnabled ? 'Disable Sparkles' : 'Enable Sparkles'}
              className={`flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-semibold transition-all cursor-pointer ${
                sparklesEnabled
                  ? 'bg-[#81D8D0] text-stone-900 shadow-sm shadow-teal-200'
                  : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
              }`}
            >
              <FontAwesomeIcon
                icon={faWandMagicSparkles}
                className={`h-3.5 w-3.5 ${sparklesEnabled ? 'animate-spin' : ''}`}
              />
              <span className="hidden sm:inline">Sparkles</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-700 hover:bg-stone-200 md:hidden cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
              ) : (
                <FontAwesomeIcon icon={faBars} className="h-4 w-4" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="absolute left-0 right-0 top-16 mx-auto w-[98%] rounded-3xl border border-stone-200 bg-[#FAF8F5]/95 p-4 shadow-xl backdrop-blur-lg md:hidden">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-2xl px-4 py-2.5 font-sans-clean text-sm font-semibold tracking-wide transition-colors ${
                    activeSection === link.id
                      ? 'bg-[#FF8DA1] text-white'
                      : 'text-stone-700 hover:bg-[#FFE3E8]'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent content overlap with fixed header */}
      <div className="h-16 sm:h-20" aria-hidden="true" />
    </>
  );
};
