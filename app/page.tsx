'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import SocialFooter from '@/components/SocialFooter';
import ScrambleText from '@/components/ScrambleText';
import { useEffect, useState } from 'react';
import { playClickSound } from '@/lib/sound';
import { usePageTitle } from '@/lib/usePageTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightArrowLeft,
  faAtom,
  faBolt,
  faChartBar,
  faChartLine,
  faDraftingCompass,
  faFlask,
  faGear,
  faPalette,
  faShieldHalved,
} from '@fortawesome/free-solid-svg-icons';

const calculators = [
  {
    title: 'CGPA Calculator',
    description: 'Track your cumulative GPA accurately across every semester and credit combination.',
    icon: faChartLine,
    href: '/calculators/cgpa',
    color: 'from-blue-500 to-blue-600',
    tint: 'from-blue-500/28 via-blue-500/12 to-slate-900/10',
    borderTint: 'border-blue-300/30',
    accentText: 'text-blue-100',
  },
  {
    title: 'SGPA Calculator',
    description: 'Compute semester GPA instantly with subject-wise grade points and credit inputs.',
    icon: faChartBar,
    href: '/calculators/sgpa',
    color: 'from-purple-500 to-purple-600',
    tint: 'from-purple-500/28 via-purple-500/12 to-slate-900/10',
    borderTint: 'border-purple-300/30',
    accentText: 'text-purple-100',
  },
  {
    title: 'CGPA to Percentage',
    description: 'Convert CGPA to percentage using a clear, consistent and student-friendly formula.',
    icon: faArrowRightArrowLeft,
    href: '/calculators/cgpa-to-percentage',
    color: 'from-pink-500 to-pink-600',
    tint: 'from-pink-500/28 via-pink-500/12 to-slate-900/10',
    borderTint: 'border-pink-300/30',
    accentText: 'text-pink-100',
  },
  {
    title: 'Physics Cycle',
    description: 'Covers first-year common subjects across all branches before specialization.',
    icon: faAtom,
    href: '/calculators/physics-cycle',
    color: 'from-green-500 to-green-600',
    tint: 'from-green-500/28 via-green-500/12 to-slate-900/10',
    borderTint: 'border-green-300/30',
    accentText: 'text-green-100',
  },
  {
    title: 'Chemistry Cycle',
    description: 'Covers first-year common subjects across all branches before specialization.',
    icon: faFlask,
    href: '/calculators/chemistry-cycle',
    color: 'from-orange-500 to-orange-600',
    tint: 'from-orange-500/28 via-orange-500/12 to-slate-900/10',
    borderTint: 'border-orange-300/30',
    accentText: 'text-orange-100',
  },
];

const heroWords = [
  'CGPA Calculation',
  'SGPA Calculation',
  'Physics Cycle SGPA',
  'Chemistry Cycle SGPA',
  'CGPA to Percentage',
];

export default function Home() {
  usePageTitle('Engineering Calculator | CGPA, SGPA & More');

  const [wordIndex, setWordIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleExploreToolsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    playClickSound('secondary');

    const calculatorsSection = document.getElementById('calculators');
    if (!calculatorsSection) {
      return;
    }

    const navbar = document.querySelector('nav');
    const navHeight = navbar instanceof HTMLElement ? navbar.offsetHeight : 0;
    const topOffset = calculatorsSection.getBoundingClientRect().top + window.scrollY - navHeight + 100;

    window.scrollTo({
      top: Math.max(0, topOffset),
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const currentWord = heroWords[wordIndex];
    const hasTypedFullWord = typedText === currentWord;
    const hasDeletedWord = typedText.length === 0;

    let timeoutMs = isDeleting ? 60 : 95;

    if (!isDeleting && hasTypedFullWord) {
      timeoutMs = 1300;
    }

    const timer = setTimeout(() => {
      if (!isDeleting && hasTypedFullWord) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && hasDeletedWord) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % heroWords.length);
        return;
      }

      setTypedText((prev) => {
        if (isDeleting) {
          return currentWord.slice(0, prev.length - 1);
        }
        return currentWord.slice(0, prev.length + 1);
      });
    }, timeoutMs);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, wordIndex]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col py-8 sm:py-10">
        {/* Hero Section */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="ui-hero-grid" aria-hidden="true" />
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="ui-reveal">
              <p className="uppercase tracking-[0.3em] text-xs text-blue-300 mb-4 ml-1">Engineering Toolkit</p>
              <h1 className="ui-gradient-text mb-4">
                <ScrambleText text="Engineering Calculator" />
              </h1>
              <p className="text-lg sm:text-xl text-slate-200 mb-3 font-semibold min-h-[2rem]" aria-live="polite">
                Built for <span className="text-blue-300">{typedText}</span>
                <span className="ml-1 inline-block w-[0.6ch] text-blue-300 animate-pulse">|</span>
              </p>
              <p className="ui-muted max-w-xl mb-8">
                Powerful academic and scientific calculators with real-time results, clean visuals, and zero data leaving your device.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/calculators/cgpa"
                  onClick={() => playClickSound('primary')}
                  className="px-8 py-4 rounded-lg font-semibold transition transform hover:scale-105 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl ui-pulse ui-interactive text-center"
                >
                  Start Calculating
                </Link>
                <a
                  href="#calculators"
                  onClick={handleExploreToolsClick}
                  className="px-8 py-4 border border-white/20 text-slate-200 rounded-lg font-semibold hover:border-blue-400 hover:text-white transition ui-interactive text-center"
                >
                  Explore Tools
                </a>
              </div>
            </div>

            <div className="relative ui-reveal ui-delay-1">
              <div className="ui-card p-6 sm:p-7">
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-slate-200 font-bold text-sm tracking-wide">Live Engineering Board</p>
                    <div className="flex gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="rounded-xl bg-blue-500/15 border border-blue-400/25 p-3">
                      <p className="text-xs text-blue-200 mb-1">CGPA</p>
                      <p className="text-2xl font-black ui-number text-white">9.31</p>
                    </div>
                    <div className="rounded-xl bg-purple-500/15 border border-purple-400/25 p-3">
                      <p className="text-xs text-purple-200 mb-1">SGPA</p>
                      <p className="text-2xl font-black ui-number text-white">9.88</p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-gradient-to-r from-slate-800/80 to-slate-700/70 border border-white/10 p-4">
                    <div className="flex items-center justify-between text-sm text-slate-200 mb-3">
                      <span>Engineering Artwork</span>
                      <span className="text-blue-300 inline-flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faGear} className="text-xs" /> Core
                      </span>
                    </div>
                    <div className="relative h-32 overflow-hidden rounded-lg border border-white/10 bg-slate-950/80">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(110,168,255,0.25),transparent_42%),radial-gradient(circle_at_80%_70%,rgba(157,123,255,0.2),transparent_48%)]" />
                      <div className="absolute top-4 left-5 text-3xl text-blue-300 ui-float"><FontAwesomeIcon icon={faGear} /></div>
                      <div className="absolute bottom-3 left-20 text-2xl text-cyan-300 ui-float [animation-delay:0.4s]"><FontAwesomeIcon icon={faDraftingCompass} /></div>
                      <div className="absolute top-5 right-12 text-2xl text-violet-300 ui-float [animation-delay:0.7s]"><FontAwesomeIcon icon={faChartLine} /></div>
                      <div className="absolute bottom-2 right-4 text-xl text-orange-300 ui-float [animation-delay:0.2s]"><FontAwesomeIcon icon={faFlask} /></div>
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-lg text-blue-200 ui-float [animation-delay:0.5s]"><FontAwesomeIcon icon={faBolt} /></div>
                      <div className="absolute bottom-3 left-7 text-lg text-pink-300 ui-float [animation-delay:0.9s]"><FontAwesomeIcon icon={faArrowRightArrowLeft} /></div>
                      <div className="absolute top-8 right-4 text-lg text-emerald-300 ui-float [animation-delay:0.3s]"><FontAwesomeIcon icon={faAtom} /></div>
                      <div className="absolute bottom-4 right-20 text-lg text-sky-300 ui-float [animation-delay:0.6s]"><FontAwesomeIcon icon={faChartBar} /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Highlights */}
        <section className="py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="ui-card p-4 sm:p-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="rounded-xl border border-blue-300/20 bg-blue-500/10 px-4 py-3 flex items-center gap-3">
                  <FontAwesomeIcon icon={faBolt} className="text-blue-300" />
                  <p className="text-sm text-slate-100">Instant calculations with reliable outputs</p>
                </div>
                <div className="rounded-xl border border-purple-300/20 bg-purple-500/10 px-4 py-3 flex items-center gap-3">
                  <FontAwesomeIcon icon={faPalette} className="text-purple-300" />
                  <p className="text-sm text-slate-100">Clean engineering-first interface</p>
                </div>
                <div className="rounded-xl border border-emerald-300/20 bg-emerald-500/10 px-4 py-3 flex items-center gap-3">
                  <FontAwesomeIcon icon={faShieldHalved} className="text-emerald-300" />
                  <p className="text-sm text-slate-100">Private usage, no sign-in needed</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calculators Grid */}
        <section id="calculators" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="ui-card p-6 sm:p-8 lg:p-10">
              <p className="text-center uppercase tracking-[0.24em] text-xs text-blue-300 mb-3">Tool Suite</p>
              <h2 className="text-4xl font-bold text-center mb-4 ui-gradient-text">
                Pick Your Calculator
              </h2>
              <p className="text-center ui-muted mb-12 max-w-2xl mx-auto">
                Tap into academic and core-engineering utilities built for quick and accurate decisions
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {calculators.map((calc) => (
                  <Link
                    key={calc.href}
                    href={calc.href}
                    className="group ui-reveal"
                  >
                    <div className={`relative overflow-hidden rounded-xl p-8 text-white transform-gpu transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-2 cursor-pointer h-full border ${calc.borderTint} shadow-xl ui-interactive bg-slate-900/55 backdrop-blur-xl`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${calc.tint} transition-opacity duration-500 ease-out group-hover:opacity-100`} />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(255,255,255,0.22),transparent_35%),radial-gradient(circle_at_85%_82%,rgba(255,255,255,0.1),transparent_42%)] transition-opacity duration-500 ease-out group-hover:opacity-100" />
                      <div className="relative">
                        <div className="text-4xl mb-4 ui-float drop-shadow-[0_6px_14px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-out group-hover:scale-105">
                          <FontAwesomeIcon icon={calc.icon} />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">{calc.title}</h3>
                        <p className="text-slate-100/95 mb-4">{calc.description}</p>
                        <div className={`flex items-center ${calc.accentText} group-hover:text-white transition-all duration-500 ease-out`}>
                          <span>Open Calculator</span>
                          <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-500 ease-out" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SocialFooter showLegalLinks />
      </main>
    </>
  );
}
