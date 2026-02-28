'use client';

import Navbar from '@/components/Navbar';
import SocialFooter from '@/components/SocialFooter';
import ScrambleText from '@/components/ScrambleText';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { getGradePoints } from '@/lib/grades';
import { playClickSound } from '@/lib/sound';
import { toast } from 'sonner';
import { usePageTitle } from '@/lib/usePageTitle';

interface Subject {
  id: string;
  name: string;
  credits: number;
  marks: number;
}

const MAX_SUBJECT_CREDITS = 8;
const MAX_MARKS = 100;

type GradeScheme = '2018' | '2021' | '2022';

const SUBJECT_CREDIT_TEMPLATES: Record<GradeScheme, number[]> = {
  '2018': [4, 4, 3, 3, 3, 1, 1, 1],
  '2021': [3, 3, 3, 3, 3, 1, 1, 1, 2],
  '2022': [4, 4, 3, 3, 3, 1, 1, 1],
};

const CHEMISTRY_2018_SUBJECTS = [
  '18MATx1',
  '18CHEx2',
  '18CPSx3',
  '18ELNx4',
  '18MEx5',
  '18CHELx6',
  '18CPLx7',
  '18EGHx8',
];

const CHEMISTRY_2021_SUBJECTS = [
  '21MATx1',
  '21CHEx2',
  '21CPSx3',
  '21ELNx4',
  '21MEx5',
  '21CHELx6',
  '21CPLx7',
  '21EGHx8',
  '21IDTx9',
];

const CHEMISTRY_2022_SUBJECTS = [
  '$%#@&x01',
  '$%#@&x02',
  '$%#@&x03',
  '$%#@&x04x',
  '$%#@&x05x',
  '$%#@&x06',
  '$%#@&x07',
  '$%#@&x08',
];

const buildSubjectsForScheme = (scheme: GradeScheme): Subject[] =>
  SUBJECT_CREDIT_TEMPLATES[scheme].map((credits, index) => ({
    id: String(index + 1),
    name:
      scheme === '2018'
        ? (CHEMISTRY_2018_SUBJECTS[index] ?? `Subject ${index + 1}`)
        : scheme === '2021'
          ? (CHEMISTRY_2021_SUBJECTS[index] ?? `Subject ${index + 1}`)
          : scheme === '2022'
            ? (CHEMISTRY_2022_SUBJECTS[index] ?? `Subject ${index + 1}`)
        : `Subject ${index + 1}`,
    credits,
    marks: -1,
  }));

export default function SGPACalculator() {
  usePageTitle('Chemistry Cycle | Engineering Calculator');

  const [subjects, setSubjects] = useState<Subject[]>(buildSubjectsForScheme('2022'));

  const [sgpa, setSGPA] = useState<number | null>(null);
  const [animatedSGPA, setAnimatedSGPA] = useState(0);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [gradeScheme, setGradeScheme] = useState<GradeScheme>('2022');
  const [activeGradeModal, setActiveGradeModal] = useState<GradeScheme | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const activeGradePoints = getGradePoints(gradeScheme);
  const gradePoints2021 = getGradePoints('2021');
  const gradePoints2022 = getGradePoints('2022');
  const gradePoints2018 = getGradePoints('2018');
  const resultSectionRef = useRef<HTMLDivElement>(null);
  const shouldScrollToResultRef = useRef(false);
  const resetTimerRef = useRef<number | null>(null);

  const convertedPercentage =
    sgpa === null
      ? null
      : parseFloat(
          (gradeScheme === '2018' ? (sgpa - 0.75) * 10 : sgpa * 10).toFixed(2)
        );
  const percentageSchemeLabel = gradeScheme === '2018' ? '2018 Scheme' : '2021/2022 Scheme';

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

  useEffect(() => {
    if (sgpa === null) {
      return;
    }

    let animationFrame = 0;
    const duration = 900;
    const startValue = 0;
    const endValue = sgpa;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const nextValue = startValue + (endValue - startValue) * easedProgress;
      setAnimatedSGPA(nextValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [sgpa]);

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
    if (!shouldScrollToResultRef.current || sgpa === null) {
      return;
    }

    resultSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    shouldScrollToResultRef.current = false;
  }, [sgpa]);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleGradeSchemeChange = (scheme: GradeScheme) => {
    setGradeScheme(scheme);
    setSubjects(buildSubjectsForScheme(scheme));
    setSGPA(null);
    setAnimatedSGPA(0);
    setAnimatedPercentage(0);
  };

  const getGradeFromMarks = (marks: number) => {
    if (gradeScheme === '2018') {
      if (marks >= 90) return { letter: 'S', point: 10 };
      if (marks >= 80) return { letter: 'A', point: 9 };
      if (marks >= 70) return { letter: 'B', point: 8 };
      if (marks >= 60) return { letter: 'C', point: 7 };
      if (marks >= 45) return { letter: 'D', point: 6 };
      if (marks >= 40) return { letter: 'E', point: 4 };
      return { letter: 'F', point: 0 };
    }

    if (marks >= 90) return { letter: 'O', point: 10 };
    if (marks >= 80) return { letter: 'A+', point: 9 };
    if (marks >= 70) return { letter: 'A', point: 8 };
    if (marks >= 60) return { letter: 'B+', point: 7 };
    if (marks >= 55) return { letter: 'B', point: 6 };
    if (marks >= 50) return { letter: 'C', point: 5 };
    if (marks >= 40) return { letter: 'P', point: 4 };
    return { letter: 'F', point: 0 };
  };

  const calculateSGPA = () => {
    playClickSound('primary');
    const firstMissingIndex = subjects.findIndex((subject) => subject.marks < 0);
    if (firstMissingIndex !== -1) {
      toast.error(`Please enter marks for Subject ${firstMissingIndex + 1} before calculating SGPA.`);
      return;
    }

    let totalCredits = 0;
    let totalPoints = 0;

    subjects.forEach((subject) => {
      if (subject.name && subject.credits > 0 && subject.marks >= 0) {
        const { point } = getGradeFromMarks(subject.marks);
        totalCredits += subject.credits;
        totalPoints += point * subject.credits;
      }
    });

    const result = totalCredits > 0 ? totalPoints / totalCredits : 0;
    const shouldShowSuccessToast = sgpa === null;
    shouldScrollToResultRef.current = true;
    setSGPA(parseFloat(result.toFixed(2)));
    if (shouldShowSuccessToast) {
      toast.success('SGPA calculated successfully.');
    }
    scrollToResult();
  };

  const resetSubjects = () => {
    if (isResetting) {
      return;
    }

    playClickSound('secondary');

    setIsResetting(true);
    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = window.setTimeout(() => {
      setSubjects(buildSubjectsForScheme(gradeScheme));
      setIsResetting(false);
      setSGPA(null);
      setAnimatedSGPA(0);
      setAnimatedPercentage(0);
      resetTimerRef.current = null;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 260);
  };

  const updateSubject = (
    subjectId: string,
    field: keyof Subject,
    value: string | number
  ) => {
    const nextValue =
      field === 'name'
        ? value
        : field === 'credits'
          ? Math.min(Number(value), MAX_SUBJECT_CREDITS)
          : field === 'marks'
            ? Number(value) === -1
              ? -1
              : Math.min(Math.max(Number(value), 0), MAX_MARKS)
            : Number(value);

    setSubjects(
      subjects.map((subject) => {
        if (subject.id === subjectId) {
          return {
            ...subject,
            [field]: nextValue,
          };
        }
        return subject;
      })
    );
    setSGPA(null);
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
    calculateSGPA();
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-8">
            <Link href="/" className="group text-orange-300 hover:text-orange-200 mb-4 inline-flex items-center transition ui-interactive">
              <svg className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Homepage
            </Link>
            <h1 className="text-4xl font-bold ui-gradient-text mb-2"><ScrambleText text="Chemistry Cycle" /></h1>
            <p className="ui-muted">Calculate SGPA for Chemistry Cycle subjects by selected scheme</p>
          </div>

          <div className="ui-card p-8 ui-reveal" onKeyDown={handleEnterPress}>
            <div className="mt-2 mb-4">
              <h3 className="text-sm font-medium text-slate-200 mb-3">Grade Scheme</h3>
              <div className="space-y-3">
                <select
                  value={gradeScheme}
                  onChange={(e) => handleGradeSchemeChange(e.target.value as GradeScheme)}
                  className="ui-input ui-select"
                >
                  <option value="2018">2018</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                </select>
                <button
                  type="button"
                  onClick={() => setActiveGradeModal(gradeScheme)}
                  className="inline-flex items-center text-xs font-bold text-orange-300 hover:text-orange-100 hover:underline underline-offset-4 transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
                >
                  View Grade Scale
                </button>
              </div>
            </div>
            <div className="mb-8">
              <div className="space-y-6 mb-6">
                {subjects.map((subject, index) => {
                  const derivedGrade = subject.marks >= 0 ? getGradeFromMarks(subject.marks) : null;
                  const derivedDescription = derivedGrade
                    ? (activeGradePoints[derivedGrade.letter]?.desc ?? '').replace(/\s*\(.*\)$/, '')
                    : '';

                  return (
                    <div
                      key={subject.id}
                      className="border border-white/15 rounded-lg p-6 bg-slate-900/35 shadow-lg ui-reveal transition-all duration-300 ease-out transform-gpu"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-slate-100">Subject {index + 1}</h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                        <div>
                          <input
                            type="text"
                            placeholder="Subject Name"
                            value={subject.name}
                            readOnly
                            tabIndex={-1}
                            className="ui-input ui-subject-name"
                          />
                          <input
                            type="number"
                            placeholder="Credits"
                            min="0"
                            max={MAX_SUBJECT_CREDITS}
                            step="0.5"
                            value={subject.credits || ''}
                            readOnly
                            tabIndex={-1}
                            className="ui-input mt-2"
                          />
                        </div>
                        <div>
                          <input
                            type="number"
                            placeholder="Marks (0-100)"
                            min="0"
                            max={MAX_MARKS}
                            step="1"
                            autoFocus={index === 0}
                            value={subject.marks >= 0 ? subject.marks : ''}
                            onChange={(e) =>
                              updateSubject(subject.id, 'marks', e.target.value === '' ? -1 : e.target.value)
                            }
                            className="ui-input"
                          />
                          {subject.marks >= 0 && derivedGrade && (
                            <div className="mt-2 h-12 flex items-center gap-2">
                              <span className="h-full px-3 rounded-lg border border-orange-300/35 bg-orange-500/20 text-orange-100 text-sm font-bold ui-number whitespace-nowrap flex items-center">
                                {derivedGrade.letter} ({derivedGrade.point})
                              </span>
                              <span
                                title={derivedDescription}
                                className="h-full flex-1 min-w-0 px-3 rounded-lg border border-white/20 bg-slate-800/80 text-slate-200 text-sm font-semibold truncate flex items-center"
                              >
                                {derivedDescription}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8">
                <button
                  onClick={resetSubjects}
                  disabled={isResetting}
                  className="w-full px-4 py-2 border border-red-400/70 text-red-300 rounded-lg hover:bg-red-500/10 transition font-semibold ui-interactive disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                  {isResetting ? 'Resetting...' : 'Reset Subjects'}
                </button>
              </div>
            </div>

              <button
              onClick={calculateSGPA}
              disabled={isResetting}
              className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:shadow-2xl hover:shadow-amber-500/25 hover:brightness-110 hover:-translate-y-0.5 transition-all duration-200 font-semibold ui-interactive"
            >
              Calculate SGPA
            </button>

            {sgpa !== null && (
              <div ref={resultSectionRef} className="mt-8 p-6 bg-gradient-to-r from-orange-500/15 to-amber-500/15 rounded-lg border border-orange-300/35 ui-reveal ui-delay-1">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-wider text-white mb-4">CALCULATED RESULT</h3>
                <p className="text-slate-300 mb-2">Your SGPA</p>
                <p className="text-4xl sm:text-5xl md:text-6xl !font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-amber-300 ui-number">
                  {animatedSGPA.toFixed(2)}
                </p>
                <p className="text-slate-300 mt-6 mb-2">Converted Percentage ({percentageSchemeLabel})</p>
                <p className="text-3xl sm:text-4xl md:text-5xl !font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-300 ui-number">
                  {animatedPercentage.toFixed(2)}%
                </p>
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
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500/30 to-amber-500/30 border border-orange-300/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h8M4 17h10" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 11.5v5m-2.5-2.5h5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black tracking-wide text-white">Grade Scale Reference</h3>
                  <p className="text-sm text-slate-400 mt-1">
                    {activeGradeModal === '2018'
                      ? '2018 Scheme'
                      : activeGradeModal === '2022'
                        ? '2022 Scheme'
                        : '2021 Scheme'}
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
              {Object.entries(
                activeGradeModal === '2018'
                  ? gradePoints2018
                  : activeGradeModal === '2022'
                    ? gradePoints2022
                    : gradePoints2021
              ).map(([letter, info]) => (
                <div key={letter} className="rounded-xl border border-white/10 bg-slate-900/55 hover:bg-slate-900/75 p-3.5 transition ui-interactive">
                  <p className="text-slate-100 !font-black text-3xl md:text-4xl leading-none tracking-tight ui-number">{letter}</p>
                  <p className="text-orange-300 font-bold text-lg ui-number">{info.value}</p>
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
