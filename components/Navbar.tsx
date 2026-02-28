'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const updateViewportMode = () => setIsDesktop(mediaQuery.matches);

    updateViewportMode();
    mediaQuery.addEventListener('change', updateViewportMode);

    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
      mediaQuery.removeEventListener('change', updateViewportMode);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const isHomePage = window.location.pathname === '/';
    if (!isHomePage) {
      return;
    }

    const updateVisibility = () => {
      const calculatorsSection = document.getElementById('calculators');
      if (!calculatorsSection) {
        setIsHidden(false);
        return;
      }

      const hideThreshold = calculatorsSection.offsetTop - 120;
      setIsHidden(window.scrollY >= hideThreshold);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, []);

  const linkBaseClass =
    'relative transition-all duration-300 ui-interactive after:content-["\"] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-center after:scale-x-0 after:bg-gradient-to-r after:from-blue-400 after:to-purple-400 after:transition-transform after:duration-300 hover:after:scale-x-100 hover:-translate-y-0.5';
  const navTextClass = 'text-slate-100 hover:text-white font-extrabold tracking-wide';
  const calculatorsHeadingClass = 'text-slate-100 hover:text-white !font-black tracking-wider text-base';
  const dropdownLinkClass = 'block rounded-lg px-4 py-2.5 text-left text-sm font-bold text-slate-200 hover:text-white hover:bg-white/10 transition';

  const openDropdown = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const closeDropdownWithDelay = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => setIsOpen(false), 520);
  };

  return (
    <nav
      className={`sticky top-0 z-50 px-4 sm:px-6 lg:px-8 pt-3 transition-all duration-300 ${
        isHidden ? 'opacity-0 -translate-y-3 pointer-events-none' : 'opacity-100 translate-y-0'
      }`}
    >
      <div className="max-w-7xl mx-auto ui-card shadow-2xl drop-shadow-2xl px-4 sm:px-6">
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 py-3 sm:py-4 text-center">
          <Link href="/" className={`${linkBaseClass} ${navTextClass}`}>Home</Link>

          <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={() => {
              if (isDesktop) openDropdown();
            }}
            onMouseLeave={() => {
              if (isDesktop) closeDropdownWithDelay();
            }}
          >
            <button
              type="button"
              onClick={() => {
                if (!isDesktop) setIsOpen((prev) => !prev);
              }}
              className={`${linkBaseClass} ${calculatorsHeadingClass} inline-flex items-center gap-1.5`}
              aria-haspopup="menu"
              aria-expanded={isOpen}
            >
              Calculators
              <svg className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              className={`absolute left-1/2 -translate-x-1/2 mt-6 w-[min(16rem,calc(100vw-2rem))] sm:left-auto sm:right-0 sm:translate-x-0 sm:w-64 rounded-2xl border border-white/10 bg-slate-950/95 shadow-2xl backdrop-blur-xl p-2 transition-all duration-300 ease-in-out ${
                isOpen
                  ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                  : 'opacity-0 -translate-y-1 scale-95 pointer-events-none'
              }`}
              role="menu"
              aria-hidden={!isOpen}
              onMouseEnter={() => {
                if (isDesktop) openDropdown();
              }}
              onMouseLeave={() => {
                if (isDesktop) closeDropdownWithDelay();
              }}
            >
              <Link href="/calculators/cgpa" className={dropdownLinkClass} onClick={() => setIsOpen(false)}>
                CGPA Calculator
              </Link>
              <Link href="/calculators/sgpa" className={dropdownLinkClass} onClick={() => setIsOpen(false)}>
                SGPA Calculator
              </Link>
              <Link href="/calculators/cgpa-to-percentage" className={dropdownLinkClass} onClick={() => setIsOpen(false)}>
                CGPA to Percentage
              </Link>
              <Link href="/calculators/physics-cycle" className={dropdownLinkClass} onClick={() => setIsOpen(false)}>
                Physics Cycle
              </Link>
              <Link href="/calculators/chemistry-cycle" className={dropdownLinkClass} onClick={() => setIsOpen(false)}>
                Chemistry Cycle
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
