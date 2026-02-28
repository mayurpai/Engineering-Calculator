'use client';

import Navbar from '@/components/Navbar';
import SocialFooter from '@/components/SocialFooter';
import ScrambleText from '@/components/ScrambleText';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { getGradePoints } from '@/lib/grades';
import { playClickSound } from '@/lib/sound';
import { usePageTitle } from '@/lib/usePageTitle';

export default function CGPAToPercentage() {
  usePageTitle('CGPA to Percentage | Engineering Calculator');

  const [cgpa, setCGPA] = useState<string>('');
  const [percentage, setPercentage] = useState<number | null>(null);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [activeGradeModal, setActiveGradeModal] = useState<'2018' | '2021' | null>(null);
  const [method, setMethod] = useState<'scheme2018' | 'scheme2021'>('scheme2021');
  const gradePoints2021 = getGradePoints('2021');
  const gradePoints2018 = getGradePoints('2018');
  const resultSectionRef = useRef<HTMLDivElement>(null);
  const shouldScrollToResultRef = useRef(false);

  useEffect(() => {
    if (percentage === null) {
      return;
    }

    let animationFrame = 0;
    const duration = 900;
    const startValue = 0;
    const endValue = percentage;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const nextValue = startValue + (endValue - startValue) * easedProgress;
      setAnimatedPercentage(nextValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [percentage]);

  useEffect(() => {
    if (!shouldScrollToResultRef.current || percentage === null) {
      return;
    }

    resultSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    shouldScrollToResultRef.current = false;
  }, [percentage]);

  useEffect(() => {
    if (!activeGradeModal) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveGradeModal(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [activeGradeModal]);

  const updateMethod = (nextMethod: 'scheme2018' | 'scheme2021') => {
    setMethod(nextMethod);

    if (percentage !== null) {
      const cgpaValue = parseFloat(cgpa);
      if (isNaN(cgpaValue) || cgpaValue < 0 || cgpaValue > 10) {
        setPercentage(null);
        return;
      }

      const nextResult =
        nextMethod === 'scheme2018' ? (cgpaValue - 0.75) * 10 : cgpaValue * 10;
      setPercentage(parseFloat(nextResult.toFixed(2)));
    }
  };

  const calculatePercentage = () => {
    playClickSound('primary');
    const cgpaValue = parseFloat(cgpa);
    if (isNaN(cgpaValue) || cgpaValue < 0 || cgpaValue > 10) {
      toast.error('Please enter a valid CGPA between 0 and 10');
      return;
    }

    let result: number;
    if (method === 'scheme2018') {
      // 2018 Scheme: Percentage = (CGPA - 0.75) * 10
      result = (cgpaValue - 0.75) * 10;
    } else {
      // 2021/2022 Scheme: Percentage = CGPA * 10
      result = cgpaValue * 10;
    }

    shouldScrollToResultRef.current = true;
    const shouldShowSuccessToast = percentage === null;
    setPercentage(parseFloat(result.toFixed(2)));
    if (shouldShowSuccessToast) {
      toast.success('Percentage calculated successfully.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A') {
        return;
      }

      e.preventDefault();
      calculatePercentage();
    }
  };

  const handleCGPAChange = (value: string) => {
    const sanitizedValue = value
      .replace(/[^0-9.]/g, '')
      .replace(/(\..*)\./g, '$1');

    if (!sanitizedValue.trim()) {
      setCGPA('');
      setPercentage(null);
      setAnimatedPercentage(0);
      return;
    }

    setCGPA(sanitizedValue);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-8">
            <Link href="/" className="group text-blue-300 hover:text-blue-200 mb-4 inline-flex items-center transition ui-interactive">
              <svg className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Homepage
            </Link>
            <h1 className="text-4xl font-bold ui-gradient-text mb-2"><ScrambleText text="CGPA to Percentage" /></h1>
            <p className="ui-muted">Convert your CGPA to percentage using various methods</p>
          </div>

          <div className="ui-card p-8 space-y-8 ui-reveal" onKeyDown={handleKeyPress}>
            {/* Conversion Method Selection */}
            <div>
              <h2 className="text-xl font-bold text-slate-100 mb-4">Select Conversion Method</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer transition bg-slate-900/40 hover:bg-slate-900/70" style={{ borderColor: method === 'scheme2021' ? '#ec4899' : 'rgba(255,255,255,0.15)' }}>
                    <input
                      type="radio"
                      name="method"
                      value="scheme2021"
                      checked={method === 'scheme2021'}
                      onChange={() => updateMethod('scheme2021')}
                      className="w-4 h-4"
                    />
                    <div className="ml-4">
                      <p className="font-semibold text-slate-100">2021/2022 Scheme</p>
                      <p className="text-sm text-slate-400">Percentage = CGPA × 10</p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveGradeModal('2021');
                        }}
                        className="mt-2 inline-flex items-center text-xs font-bold text-pink-300 hover:text-pink-100 hover:underline underline-offset-4 transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
                      >
                        View Grade Scale
                      </button>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border rounded-lg cursor-pointer transition bg-slate-900/40 hover:bg-slate-900/70" style={{ borderColor: method === 'scheme2018' ? '#ec4899' : 'rgba(255,255,255,0.15)' }}>
                    <input
                      type="radio"
                      name="method"
                      value="scheme2018"
                      checked={method === 'scheme2018'}
                      onChange={() => updateMethod('scheme2018')}
                      className="w-4 h-4"
                    />
                    <div className="ml-4">
                      <p className="font-semibold text-slate-100">2018 Scheme</p>
                      <p className="text-sm text-slate-400">Percentage = (CGPA − 0.75) × 10</p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveGradeModal('2018');
                        }}
                        className="mt-2 inline-flex items-center text-xs font-bold text-pink-300 hover:text-pink-100 hover:underline underline-offset-4 transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
                      >
                        View Grade Scale
                      </button>
                    </div>
                  </label>
                </div>
            </div>

            {/* Input Section */}
            <div>
              <label className="block text-xl font-bold text-slate-100 mb-4">Enter Your CGPA</label>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Enter CGPA (0-10)"
                  autoComplete="off"
                  autoFocus
                  value={cgpa}
                  onChange={(e) => handleCGPAChange(e.target.value)}
                  className="ui-input flex-1 text-lg"
                />
                <button
                  onClick={calculatePercentage}
                  className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:shadow-2xl hover:shadow-pink-500/25 hover:brightness-110 hover:-translate-y-0.5 transition-all duration-200 font-semibold ui-interactive"
                >
                  Convert
                </button>
              </div>
            </div>

            {/* Result Section */}
            {percentage !== null && (
              <div ref={resultSectionRef} className="space-y-6">
                <div className="p-6 bg-gradient-to-r from-pink-500/15 to-rose-500/15 rounded-lg border border-pink-300/35 ui-reveal ui-delay-1">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-wider text-white mb-4">CALCULATED RESULT</h3>
                  <p className="text-slate-300 mb-2">Your CGPA</p>
                  <p className="text-3xl sm:text-4xl md:text-6xl !font-black text-pink-300 mb-6 ui-number">{cgpa}</p>

                    <div className="border-t border-pink-300/35 pt-6">
                    <p className="text-slate-300 mb-2">Converted Percentage ({method === 'scheme2018' ? '2018 Scheme' : '2021/2022 Scheme'})</p>
                    <p className="text-4xl sm:text-5xl md:text-6xl !font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-rose-300 ui-number">
                      {animatedPercentage.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <SocialFooter />
      </main>

      {activeGradeModal && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/75 backdrop-blur-md px-4"
          onClick={() => setActiveGradeModal(null)}
        >
          <div
            className="w-full max-w-xl rounded-2xl border border-white/15 bg-gradient-to-b from-slate-900/95 to-slate-950/95 shadow-2xl shadow-black/50 p-6 sm:p-7 ui-reveal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Grade Scale Reference"
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-pink-500/30 to-rose-500/30 border border-pink-300/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-pink-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h8M4 17h10" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 11.5v5m-2.5-2.5h5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black tracking-wide text-white">Grade Scale Reference</h3>
                <p className="text-sm text-slate-400 mt-1">
                  {activeGradeModal === '2018' ? '2018 Scheme' : '2021/2022 Scheme'}
                </p>
              </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveGradeModal(null)}
                className="rounded-lg p-1.5 text-slate-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/15 transition"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              {Object.entries(activeGradeModal === '2018' ? gradePoints2018 : gradePoints2021).map(([letter, info]) => (
                <div key={letter} className="rounded-xl border border-white/10 bg-slate-900/55 hover:bg-slate-900/75 p-3.5 transition ui-interactive">
                  <p className="text-slate-100 !font-black text-3xl md:text-4xl leading-none tracking-tight ui-number">{letter}</p>
                  <p className="text-pink-300 font-bold text-lg ui-number">{info.value}</p>
                  <p className="text-xs text-slate-400 mt-1 leading-snug">{info.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
