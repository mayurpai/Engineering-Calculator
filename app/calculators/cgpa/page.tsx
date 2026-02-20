'use client';

import Navbar from '@/components/Navbar';
import { Average } from 'next/dist/compiled/@next/font/dist/google';
import Link from 'next/link';
import { useState } from 'react';
import { getGradePoints } from '@/lib/grades';

interface Subject {
  id: string;
  name: string;
  credits: number;
  grade: number;
}

interface Semester {
  id: string;
  name: string;
  subjects: Subject[];
}

export default function CGPACalculator() {
  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: '1',
      name: 'Semester 1',
      subjects: [{ id: '1', name: '', credits: 0, grade: 0 }],
    },
  ]);

  const [cgpa, setCGPA] = useState<number | null>(null);
  const [gradeScheme, setGradeScheme] = useState<'2018' | '2021'>('2021');
  const gradePoints = getGradePoints(gradeScheme);

  


  const calculateCGPA = () => {
    let totalCredits = 0;
    let totalPoints = 0;

    semesters.forEach((semester) => {
      semester.subjects.forEach((subject) => {
        if (subject.name && subject.credits > 0 && subject.grade > 0) {
          totalCredits += subject.credits;
          totalPoints += subject.grade * subject.credits;
        }
      });
    });

    const result = totalCredits > 0 ? totalPoints / totalCredits : 0;
    setCGPA(parseFloat(result.toFixed(2)));
  };

  const addSemester = () => {
    const newId = (Math.max(...semesters.map(s => parseInt(s.id))) + 1).toString();
    setSemesters([
      ...semesters,
      {
        id: newId,
        name: `Semester ${newId}`,
        subjects: [{ id: '1', name: '', credits: 0, grade: 0 }],
      },
    ]);
    setCGPA(null);
  };

  const removeSemester = (semesterId: string) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter((s) => s.id !== semesterId));
      setCGPA(null);
    }
  };

  const addSubject = (semesterId: string) => {
    setSemesters(
      semesters.map((semester) => {
        if (semester.id === semesterId) {
          const newSubjectId = (
            Math.max(...semester.subjects.map((s) => parseInt(s.id))) + 1
          ).toString();
          return {
            ...semester,
            subjects: [
              ...semester.subjects,
              { id: newSubjectId, name: '', credits: 0, grade: 0 },
            ],
          };
        }
        return semester;
      })
    );
    setCGPA(null);
  };

  const removeSubject = (semesterId: string, subjectId: string) => {
    setSemesters(
      semesters.map((semester) => {
        if (semester.id === semesterId) {
          return {
            ...semester,
            subjects: semester.subjects.filter((s) => s.id !== subjectId),
          };
        }
        return semester;
      })
    );
    setCGPA(null);
  };

  const updateSubject = (
    semesterId: string,
    subjectId: string,
    field: keyof Subject,
    value: string | number
  ) => {
    setSemesters(
      semesters.map((semester) => {
        if (semester.id === semesterId) {
          return {
            ...semester,
            subjects: semester.subjects.map((subject) => {
              if (subject.id === subjectId) {
                return {
                  ...subject,
                  [field]: field === 'name' ? value : Number(value),
                };
              }
              return subject;
            }),
          };
        }
        return semester;
      })
    );
    setCGPA(null);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">CGPA Calculator</h1>
            <p className="text-gray-600">Calculate your Cumulative Grade Point Average across all semesters</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mt-2 mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Grade Scheme</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition hover:bg-gray-50" style={{borderColor: gradeScheme === '2021' ? '#ec4899' : '#e5e7eb'}}>
                  <input
                    type="radio"
                    name="gradeScheme"
                    value="2021"
                    checked={gradeScheme === '2021'}
                    onChange={() => setGradeScheme('2021')}
                    className="w-4 h-4"
                  />
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">2021/2022 Scheme</p>
                    <p className="text-sm text-gray-600">Use O/A+/A/B+/B/C/P grade mapping</p>
                  </div>
                </label>

                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition hover:bg-gray-50" style={{borderColor: gradeScheme === '2018' ? '#ec4899' : '#e5e7eb'}}>
                  <input
                    type="radio"
                    name="gradeScheme"
                    value="2018"
                    checked={gradeScheme === '2018'}
                    onChange={() => setGradeScheme('2018')}
                    className="w-4 h-4"
                  />
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">2018 Scheme</p>
                    <p className="text-sm text-gray-600">Use S/A/B/C/D/E grade mapping</p>
                  </div>
                </label>
              </div>
            </div>

            <div className="space-y-8">
              {semesters.map((semester) => (
                <div key={semester.id} className="border-2 border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">{semester.name}</h2>
                    {semesters.length > 1 && (
                      <button
                        onClick={() => removeSemester(semester.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        Remove Semester
                      </button>
                    )}
                  </div>

                  <div className="space-y-4 mb-6">
                    {semester.subjects.map((subject) => (
                      <div key={subject.id} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
                        <input
                          type="text"
                          placeholder="Subject Name"
                          value={subject.name}
                          onChange={(e) =>
                            updateSubject(semester.id, subject.id, 'name', e.target.value)
                          }
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="number"
                          placeholder="Credits"
                          min="0"
                          step="0.5"
                          value={subject.credits || ''}
                          onChange={(e) =>
                            updateSubject(semester.id, subject.id, 'credits', e.target.value)
                          }
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                          value={subject.grade || ''}
                          onChange={(e) =>
                            updateSubject(semester.id, subject.id, 'grade', parseInt(e.target.value))
                          }
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Grade</option>
                          {Object.entries(gradePoints).map(([letter, info]) => (
                            <option key={letter} value={info.value}>
                              {letter} ({info.value})
                            </option>
                          ))}
                        </select>
                        {semester.subjects.length > 1 && (
                          <button
                            onClick={() => removeSubject(semester.id, subject.id)}
                            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => addSubject(semester.id)}
                    className="w-full px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition font-semibold"
                  >
                    + Add Subject
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={addSemester}
                className="flex-1 px-6 py-3 border-2 border-purple-500 text-purple-500 rounded-lg hover:bg-purple-50 transition font-semibold"
              >
                + Add Semester
              </button>
              <button
                onClick={calculateCGPA}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition font-semibold"
              >
                Calculate CGPA
              </button>
            </div>

            {cgpa !== null && (
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-300">
                <p className="text-gray-600 mb-2">Your CGPA</p>
                <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {cgpa.toFixed(2)}
                </p>
              </div>
            )}
            {/* Grade Scale Reference */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-3">Grade Scale Reference</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm text-gray-700">
                {Object.entries(gradePoints).map(([letter, info]) => (
                  <div key={letter} className="flex flex-col">
                    <span className="font-semibold">{letter}:</span>
                    <span className="text-sm text-gray-600">{info.value} — {info.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
