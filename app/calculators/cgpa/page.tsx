'use client';

import Navbar from '@/components/Navbar';
import SocialFooter from '@/components/SocialFooter';
import ScrambleText from '@/components/ScrambleText';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { playClickSound } from '@/lib/sound';
import { usePageTitle } from '@/lib/usePageTitle';
interface Semester {
  id: string;
  name: string;
  sgpa: string;
  credits: string;
}

const MAX_SEMESTERS = 12;
const MAX_CREDITS_PER_SEMESTER = 24;

export default function CGPACalculator() {
  usePageTitle('CGPA Calculator | Engineering Calculator');

  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: '1',
      name: 'Semester 1',
      sgpa: '',
      credits: '',
    },
  ]);

  const [cgpa, setCGPA] = useState<number | null>(null);
  const [animatedCGPA, setAnimatedCGPA] = useState(0);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [percentageScheme, setPercentageScheme] = useState<'2018' | '2021'>('2021');
  const [appearingSemesterId, setAppearingSemesterId] = useState<string | null>(null);
  const [removingSemesterId, setRemovingSemesterId] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const resultSectionRef = useRef<HTMLDivElement>(null);
  const shouldScrollToResultRef = useRef(false);
  const removeTimerRef = useRef<number | null>(null);
  const resetTimerRef = useRef<number | null>(null);
  const appearTimerRef = useRef<number | null>(null);

  const normalizeSemesters = (items: Semester[]): Semester[] =>
    items.map((semester, index) => ({
      ...semester,
      id: String(index + 1),
      name: `Semester ${index + 1}`,
    }));

  const scrollToResult = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        resultSectionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    });
  };

  const convertedPercentage =
    cgpa === null
      ? null
      : parseFloat(
          (percentageScheme === '2018' ? (cgpa - 0.75) * 10 : cgpa * 10).toFixed(2)
        );

  useEffect(() => {
    if (cgpa === null) {
      return;
    }

    let animationFrame = 0;
    const duration = 900;
    const startValue = 0;
    const endValue = cgpa;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const nextValue = startValue + (endValue - startValue) * easedProgress;
      setAnimatedCGPA(nextValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [cgpa]);

  useEffect(() => {
    if (convertedPercentage === null) {
      return;
    }

    let animationFrame = 0;
    const duration = 900;
    const startValue = 0;
    const endValue = convertedPercentage;
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
  }, [convertedPercentage]);

  useEffect(() => {
    if (!shouldScrollToResultRef.current || cgpa === null) {
      return;
    }

    resultSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    shouldScrollToResultRef.current = false;
  }, [cgpa]);

  useEffect(() => {
    return () => {
      if (removeTimerRef.current !== null) {
        window.clearTimeout(removeTimerRef.current);
      }
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
      if (appearTimerRef.current !== null) {
        window.clearTimeout(appearTimerRef.current);
      }
    };
  }, []);




  const calculateCGPA = () => {
    playClickSound('primary');
    let totalCredits = 0;
    let totalPoints = 0;

    for (const semester of semesters) {
      const sgpaValue = parseFloat(semester.sgpa);
      const creditsValue = parseFloat(semester.credits);

      if (
        isNaN(sgpaValue) ||
        isNaN(creditsValue) ||
        sgpaValue < 0 ||
        sgpaValue > 10 ||
        creditsValue <= 0 ||
        creditsValue > MAX_CREDITS_PER_SEMESTER
      ) {
        toast.error(`Please enter valid SGPA (0-10) and Credits (>0 and <=${MAX_CREDITS_PER_SEMESTER}) for all semesters.`);
        return;
      }

      totalCredits += creditsValue;
      totalPoints += sgpaValue * creditsValue;
    }

    const result = totalCredits > 0 ? totalPoints / totalCredits : 0;
    const shouldShowSuccessToast = cgpa === null;
    shouldScrollToResultRef.current = true;
    setCGPA(parseFloat(result.toFixed(2)));
    if (shouldShowSuccessToast) {
      toast.success('CGPA calculated successfully.');
    }
    scrollToResult();
  };

  const addSemester = () => {
    if (semesters.length >= MAX_SEMESTERS || removingSemesterId !== null || isResetting) {
      return;
    }

    playClickSound('secondary');

    const newSemesterId = String(semesters.length + 1);
    const nextSemesters = normalizeSemesters([
      ...semesters,
      {
        id: '',
        name: '',
        sgpa: '',
        credits: '',
      },
    ]);
    setSemesters(nextSemesters);
    setAppearingSemesterId(newSemesterId);

    if (appearTimerRef.current !== null) {
      window.clearTimeout(appearTimerRef.current);
    }
    appearTimerRef.current = window.setTimeout(() => {
      setAppearingSemesterId(null);
      appearTimerRef.current = null;
    }, 20);

    setCGPA(null);
  };

  const removeSemester = (semesterId: string) => {
    if (semesters.length <= 1 || removingSemesterId !== null || isResetting) {
      return;
    }

    playClickSound('secondary');

    setRemovingSemesterId(semesterId);
    if (removeTimerRef.current !== null) {
      window.clearTimeout(removeTimerRef.current);
    }

    removeTimerRef.current = window.setTimeout(() => {
      const nextSemesters = normalizeSemesters(
        semesters.filter((semester) => semester.id !== semesterId)
      );
      setSemesters(nextSemesters);
      setRemovingSemesterId(null);
      setCGPA(null);
      removeTimerRef.current = null;
    }, 240);
  };

  const resetSemesters = () => {
    if (isResetting || removingSemesterId !== null) {
      return;
    }

    playClickSound('secondary');

    setIsResetting(true);
    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = window.setTimeout(() => {
      setSemesters([
        {
          id: '1',
          name: 'Semester 1',
          sgpa: '',
          credits: '',
        },
      ]);
      setAppearingSemesterId('1');
      if (appearTimerRef.current !== null) {
        window.clearTimeout(appearTimerRef.current);
      }
      appearTimerRef.current = window.setTimeout(() => {
        setAppearingSemesterId(null);
        appearTimerRef.current = null;
      }, 20);
      setIsResetting(false);
      setCGPA(null);
      setAnimatedCGPA(0);
      setAnimatedPercentage(0);
      resetTimerRef.current = null;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 260);
  };

  const updateSemester = (
    semesterId: string,
    field: keyof Semester,
    value: string
  ) => {
    setSemesters(
      semesters.map((semester) => {
        if (semester.id === semesterId) {
          return {
            ...semester,
            [field]: value,
          };
        }
        return semester;
      })
    );
    setCGPA(null);
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key !== 'Enter') {
      return;
    }

    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.tagName === 'A') {
      return;
    }

    e.preventDefault();
    calculateCGPA();
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
            <h1 className="text-4xl font-bold ui-gradient-text mb-2"><ScrambleText text="CGPA Calculator" /></h1>
            <p className="ui-muted">Enter each semester SGPA and credits to calculate weighted CGPA</p>
          </div>

          <div className="ui-card p-8 ui-reveal" onKeyDown={handleEnterPress}>
            <div className="mb-6">
              <h3 className="text-sm font-medium text-slate-200 mb-3">Percentage Conversion Scheme</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label
                  className="flex items-center p-4 border rounded-lg cursor-pointer transition bg-slate-900/40 hover:bg-slate-900/70"
                  style={{ borderColor: percentageScheme === '2021' ? '#60a5fa' : 'rgba(255,255,255,0.15)' }}
                >
                  <input
                    type="radio"
                    name="percentageScheme"
                    value="2021"
                    checked={percentageScheme === '2021'}
                    onChange={() => setPercentageScheme('2021')}
                    className="w-4 h-4"
                  />
                  <div className="ml-4">
                    <p className="font-semibold text-slate-100">2021/2022 Scheme</p>
                    <p className="text-sm text-slate-400">Percentage = CGPA × 10</p>
                  </div>
                </label>

                <label
                  className="flex items-center p-4 border rounded-lg cursor-pointer transition bg-slate-900/40 hover:bg-slate-900/70"
                  style={{ borderColor: percentageScheme === '2018' ? '#60a5fa' : 'rgba(255,255,255,0.15)' }}
                >
                  <input
                    type="radio"
                    name="percentageScheme"
                    value="2018"
                    checked={percentageScheme === '2018'}
                    onChange={() => setPercentageScheme('2018')}
                    className="w-4 h-4"
                  />
                  <div className="ml-4">
                    <p className="font-semibold text-slate-100">2018 Scheme</p>
                    <p className="text-sm text-slate-400">Percentage = (CGPA − 0.75) × 10</p>
                  </div>
                </label>
              </div>
            </div>

            <div className="space-y-6">
              {semesters.map((semester, index) => (
                <div
                  key={semester.id}
                  className={`border border-white/15 rounded-lg p-6 bg-slate-900/35 shadow-lg ui-reveal transition-all duration-300 ease-out transform-gpu ${
                    isResetting || removingSemesterId === semester.id
                      ? 'opacity-0 -translate-y-2 scale-[0.98]'
                      : appearingSemesterId === semester.id
                        ? 'opacity-0 translate-y-2 scale-[0.98]'
                        : 'opacity-100 translate-y-0 scale-100'
                  }`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-100">{semester.name}</h2>
                    {semesters.length > 1 && (
                      <button
                        onClick={() => removeSemester(semester.id)}
                        disabled={isResetting || removingSemesterId !== null}
                        className="px-4 py-2 bg-red-500/90 text-white rounded-lg hover:bg-red-500 transition ui-interactive disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        Remove Semester
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">

                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">SGPA (0-10)</label>
                      <input
                        type="number"
                        placeholder="e.g. 8.75"
                        min="0"
                        max="10"
                        step="0.01"
                        autoFocus={index === 0}
                        value={semester.sgpa}
                        onChange={(e) => updateSemester(semester.id, 'sgpa', e.target.value)}
                        className="ui-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Credits</label>
                      <input
                        type="number"
                        placeholder="e.g. 20"
                        min="0"
                        max={MAX_CREDITS_PER_SEMESTER}
                        step="0.5"
                        value={semester.credits}
                        onChange={(e) => updateSemester(semester.id, 'credits', e.target.value)}
                        className="ui-input"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
              <button
                onClick={addSemester}
                disabled={semesters.length >= MAX_SEMESTERS || isResetting || removingSemesterId !== null}
                className="w-full px-4 py-2 border border-purple-400/70 text-purple-300 rounded-lg hover:bg-purple-500/10 transition font-semibold ui-interactive disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              >
                {semesters.length >= MAX_SEMESTERS ? 'Maximum 12 Semesters Reached' : '+ Add Semester'}
              </button>
              <button
                onClick={resetSemesters}
                disabled={isResetting || removingSemesterId !== null}
                className="w-full px-4 py-2 border border-red-400/70 text-red-300 rounded-lg hover:bg-red-500/10 transition font-semibold ui-interactive disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              >
                {isResetting ? 'Resetting...' : 'Reset Semesters'}
              </button>
            </div>

            <button
              onClick={calculateCGPA}
              disabled={isResetting || removingSemesterId !== null}
              className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-2xl hover:shadow-blue-500/25 hover:brightness-110 hover:-translate-y-0.5 transition-all duration-200 font-semibold ui-interactive"
            >
              Calculate CGPA
            </button>

            {cgpa !== null && (
              <div ref={resultSectionRef} className="mt-8 p-6 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-lg border border-blue-300/35 ui-reveal ui-delay-1">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-wider text-white mb-4">CALCULATED RESULT</h3>
                <p className="text-slate-300 mb-2">Your CGPA</p>
                <p className="text-4xl sm:text-5xl md:text-6xl !font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 ui-number">
                  {animatedCGPA.toFixed(2)}
                </p>

                <div className="border-t border-blue-300/35 pt-6 mt-6">
                  <p className="text-slate-300 mb-2">
                    Converted Percentage ({percentageScheme === '2018' ? '2018 Scheme' : '2021/2022 Scheme'})
                  </p>
                  <p className="text-4xl sm:text-5xl md:text-6xl !font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 ui-number">
                    {animatedPercentage.toFixed(2)}%
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <SocialFooter />
      </main>
    </>
  );
}
