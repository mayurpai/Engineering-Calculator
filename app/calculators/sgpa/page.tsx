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
const MAX_SUBJECTS = 12;

export default function SGPACalculator() {
  usePageTitle('SGPA Calculator | Engineering Calculator');

  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: '', credits: 0, marks: -1 },
  ]);

  const [sgpa, setSGPA] = useState<number | null>(null);
  const [animatedSGPA, setAnimatedSGPA] = useState(0);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [gradeScheme, setGradeScheme] = useState<'2018' | '2021'>('2021');
  const [activeGradeModal, setActiveGradeModal] = useState<'2018' | '2021' | null>(null);
  const [appearingSubjectId, setAppearingSubjectId] = useState<string | null>(null);
  const [removingSubjectId, setRemovingSubjectId] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const activeGradePoints = getGradePoints(gradeScheme);
  const gradePoints2021 = getGradePoints('2021');
  const gradePoints2018 = getGradePoints('2018');
  const resultSectionRef = useRef<HTMLDivElement>(null);
  const shouldScrollToResultRef = useRef(false);
  const removeTimerRef = useRef<number | null>(null);
  const resetTimerRef = useRef<number | null>(null);
  const appearTimerRef = useRef<number | null>(null);

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
    const getSubjectValidity = (subject: Subject) => {
      const hasName = subject.name.trim().length > 0;
      const hasCredits = subject.credits > 0;
      const hasMarks = subject.marks >= 0;

      return {
        isEmpty: !hasName && !hasCredits && !hasMarks,
        isComplete: hasName && hasCredits && hasMarks,
      };
    };

    const firstIncompleteIndex = subjects.findIndex((subject) => {
      const { isEmpty, isComplete } = getSubjectValidity(subject);
      return !isEmpty && !isComplete;
    });

    if (firstIncompleteIndex !== -1) {
      toast.error(`Please complete all fields for Subject ${firstIncompleteIndex + 1} before calculating SGPA.`);
      return;
    }

    const hasAtLeastOneCompleteSubject = subjects.some((subject) => getSubjectValidity(subject).isComplete);
    if (!hasAtLeastOneCompleteSubject) {
      toast.error('Please enter details for at least one subject to calculate SGPA.');
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

  const addSubject = () => {
    if (isResetting || removingSubjectId !== null || subjects.length >= MAX_SUBJECTS) {
      return;
    }

    playClickSound('secondary');

    const newId = (Math.max(...subjects.map(s => parseInt(s.id))) + 1).toString();
    setSubjects([
      ...subjects,
      { id: newId, name: '', credits: 0, marks: -1 },
    ]);
    setAppearingSubjectId(newId);
    if (appearTimerRef.current !== null) {
      window.clearTimeout(appearTimerRef.current);
    }
    appearTimerRef.current = window.setTimeout(() => {
      setAppearingSubjectId(null);
      appearTimerRef.current = null;
    }, 20);
    setSGPA(null);
  };

  const removeSubject = (subjectId: string) => {
    if (subjects.length <= 1 || isResetting || removingSubjectId !== null) {
      return;
    }

    playClickSound('secondary');

    setRemovingSubjectId(subjectId);
    if (removeTimerRef.current !== null) {
      window.clearTimeout(removeTimerRef.current);
    }

    removeTimerRef.current = window.setTimeout(() => {
      setSubjects(subjects.filter((s) => s.id !== subjectId));
      setRemovingSubjectId(null);
      setSGPA(null);
      removeTimerRef.current = null;
    }, 240);
  };

  const resetSubjects = () => {
    if (isResetting || removingSubjectId !== null) {
      return;
    }

    playClickSound('secondary');

    setIsResetting(true);
    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = window.setTimeout(() => {
      setSubjects([{ id: '1', name: '', credits: 0, marks: -1 }]);
      setAppearingSubjectId('1');
      if (appearTimerRef.current !== null) {
        window.clearTimeout(appearTimerRef.current);
      }
      appearTimerRef.current = window.setTimeout(() => {
        setAppearingSubjectId(null);
        appearTimerRef.current = null;
      }, 20);
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
            <Link href="/" className="group text-blue-300 hover:text-blue-200 mb-4 inline-flex items-center transition ui-interactive">
              <svg className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Homepage
            </Link>
            <h1 className="text-4xl font-bold ui-gradient-text mb-2"><ScrambleText text="SGPA Calculator" /></h1>
            <p className="ui-muted">Calculate your Semester Grade Point Average</p>
          </div>

          <div className="ui-card p-8 ui-reveal" onKeyDown={handleEnterPress}>
            <div className="mt-2 mb-4">
                <h3 className="text-sm font-medium text-slate-200 mb-3">Grade Scheme</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer transition bg-slate-900/40 hover:bg-slate-900/70" style={{ borderColor: gradeScheme === '2021' ? '#9d7bff' : 'rgba(255,255,255,0.15)' }}>
                    <input
                      type="radio"
                      name="gradeScheme"
                      value="2021"
                      checked={gradeScheme === '2021'}
                      onChange={() => setGradeScheme('2021')}
                      className="w-4 h-4"
                    />
                    <div className="ml-4">
                      <p className="font-semibold text-slate-100">2021/2022 Scheme</p>
                      <p className="text-sm text-slate-400">Use O/A+/A/B+/B/C/P grade mapping</p>
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

                  <label className="flex items-center p-4 border rounded-lg cursor-pointer transition bg-slate-900/40 hover:bg-slate-900/70" style={{ borderColor: gradeScheme === '2018' ? '#9d7bff' : 'rgba(255,255,255,0.15)' }}>
                    <input
                      type="radio"
                      name="gradeScheme"
                      value="2018"
                      checked={gradeScheme === '2018'}
                      onChange={() => setGradeScheme('2018')}
                      className="w-4 h-4"
                    />
                    <div className="ml-4">
                      <p className="font-semibold text-slate-100">2018 Scheme</p>
                      <p className="text-sm text-slate-400">Use S/A/B/C/D/E grade mapping</p>
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
                      className={`border border-white/15 rounded-lg p-6 bg-slate-900/35 shadow-lg ui-reveal transition-all duration-300 ease-out transform-gpu ${
                        isResetting || removingSubjectId === subject.id
                          ? 'opacity-0 -translate-y-2 scale-[0.98]'
                          : appearingSubjectId === subject.id
                            ? 'opacity-0 translate-y-2 scale-[0.98]'
                            : 'opacity-100 translate-y-0 scale-100'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-slate-100">Subject {index + 1}</h2>
                        {subjects.length > 1 && (
                          <button
                            onClick={() => removeSubject(subject.id)}
                            disabled={isResetting || removingSubjectId !== null}
                            className="px-4 py-2 bg-red-500/90 text-white rounded-lg hover:bg-red-500 transition ui-interactive disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            Remove Subject
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                        <div>
                          <input
                            type="text"
                            placeholder="Subject Name"
                            autoFocus={index === 0}
                            value={subject.name}
                            onChange={(e) =>
                              updateSubject(subject.id, 'name', e.target.value)
                            }
                            className="ui-input"
                          />
                          <input
                            type="number"
                            placeholder="Credits"
                            min="0"
                            max={MAX_SUBJECT_CREDITS}
                            step="0.5"
                            value={subject.credits || ''}
                            onChange={(e) =>
                              updateSubject(subject.id, 'credits', e.target.value)
                            }
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
                            value={subject.marks >= 0 ? subject.marks : ''}
                            onChange={(e) =>
                              updateSubject(subject.id, 'marks', e.target.value === '' ? -1 : e.target.value)
                            }
                            className="ui-input"
                          />
                          {subject.marks >= 0 && derivedGrade && (
                            <div className="mt-2 h-12 flex items-center gap-2">
                              <span className="h-full px-3 rounded-lg border border-purple-300/35 bg-purple-500/20 text-purple-100 text-sm font-bold ui-number whitespace-nowrap flex items-center">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                <button
                  onClick={addSubject}
                  disabled={isResetting || removingSubjectId !== null || subjects.length >= MAX_SUBJECTS}
                  className="w-full px-4 py-2 border border-purple-400/70 text-purple-300 rounded-lg hover:bg-purple-500/10 transition font-semibold ui-interactive disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                  {subjects.length >= MAX_SUBJECTS ? 'Maximum 12 Subjects Reached' : '+ Add Subject'}
                </button>
                <button
                  onClick={resetSubjects}
                  disabled={isResetting || removingSubjectId !== null}
                  className="w-full px-4 py-2 border border-red-400/70 text-red-300 rounded-lg hover:bg-red-500/10 transition font-semibold ui-interactive disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                  {isResetting ? 'Resetting...' : 'Reset Subjects'}
                </button>
              </div>
            </div>

              <button
              onClick={calculateSGPA}
              disabled={isResetting || removingSubjectId !== null}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-2xl hover:shadow-pink-500/25 hover:brightness-110 hover:-translate-y-0.5 transition-all duration-200 font-semibold ui-interactive"
            >
              Calculate SGPA
            </button>

            {sgpa !== null && (
              <div ref={resultSectionRef} className="mt-8 p-6 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-lg border border-purple-300/35 ui-reveal ui-delay-1">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-wider text-white mb-4">CALCULATED RESULT</h3>
                <p className="text-slate-300 mb-2">Your SGPA</p>
                <p className="text-4xl sm:text-5xl md:text-6xl !font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 ui-number">
                  {animatedSGPA.toFixed(2)}
                </p>
                <p className="text-slate-300 mt-6 mb-2">Converted Percentage ({percentageSchemeLabel})</p>
                <p className="text-3xl sm:text-4xl md:text-5xl !font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 ui-number">
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
