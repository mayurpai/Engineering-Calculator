'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useState } from 'react';
import { getGradePoints } from '@/lib/grades';

export default function CGPAToPercentage() {
  const [cgpa, setCGPA] = useState<string>('');
  const [percentage, setPercentage] = useState<number | null>(null);
  const [method, setMethod] = useState<'scheme2018' | 'scheme2021'>('scheme2021');
  const [gradeScheme, setGradeScheme] = useState<'2018' | '2021'>('2021');
  const gradePoints = getGradePoints(gradeScheme);

  const calculatePercentage = () => {
    const cgpaValue = parseFloat(cgpa);
    if (isNaN(cgpaValue) || cgpaValue < 0 || cgpaValue > 10) {
      alert('Please enter a valid CGPA between 0 and 10');
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

    setPercentage(parseFloat(result.toFixed(2)));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      calculatePercentage();
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">CGPA to Percentage</h1>
            <p className="text-gray-600">Convert your CGPA to percentage using various methods</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            {/* Conversion Method Selection */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Select Conversion Method</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition hover:bg-pink-50" style={{borderColor: method === 'scheme2021' ? '#ec4899' : '#e5e7eb'}}>
                    <input
                      type="radio"
                      name="method"
                      value="scheme2021"
                      checked={method === 'scheme2021'}
                      onChange={(e) => setMethod(e.target.value as 'scheme2018' | 'scheme2021')}
                      className="w-4 h-4"
                    />
                    <div className="ml-4">
                      <p className="font-semibold text-gray-900">2021/2022 Scheme</p>
                      <p className="text-sm text-gray-600">Percentage = CGPA × 10</p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition hover:bg-pink-50" style={{borderColor: method === 'scheme2018' ? '#ec4899' : '#e5e7eb'}}>
                    <input
                      type="radio"
                      name="method"
                      value="scheme2018"
                      checked={method === 'scheme2018'}
                      onChange={(e) => setMethod(e.target.value as 'scheme2018' | 'scheme2021')}
                      className="w-4 h-4"
                    />
                    <div className="ml-4">
                      <p className="font-semibold text-gray-900">2018 Scheme</p>
                      <p className="text-sm text-gray-600">Percentage = (CGPA − 0.75) × 10</p>
                    </div>
                  </label>
                </div>
            </div>

            {/* Input Section */}
            <div>
              <label className="block text-xl font-bold text-gray-900 mb-4">Enter Your CGPA</label>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="number"
                  placeholder="Enter CGPA (0-10)"
                  min="0"
                  max="10"
                  step="0.01"
                  value={cgpa}
                  onChange={(e) => setCGPA(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
                />
                <button
                  onClick={calculatePercentage}
                  className="px-8 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition font-semibold"
                >
                  Convert
                </button>
              </div>
            </div>

            {/* Result Section */}
            {percentage !== null && (
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border-2 border-pink-300">
                  <p className="text-gray-600 mb-2">Your CGPA</p>
                  <p className="text-4xl font-bold text-pink-600 mb-6">{cgpa}</p>

                    <div className="border-t-2 border-pink-300 pt-6">
                    <p className="text-gray-600 mb-2">Converted Percentage ({method === 'scheme2018' ? '2018 Scheme' : '2021/2022 Scheme'})</p>
                    <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">
                      {percentage}%
                    </p>
                  </div>
                </div>

                {/* Grade Information */}
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-300">
                  <h3 className="font-bold text-gray-900 mb-4">Grade Scale Reference</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    {Object.entries(gradePoints).map(([letter, info]) => (
                      <div key={letter}>
                        <span className="font-semibold">{letter}:</span> {info.value}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
