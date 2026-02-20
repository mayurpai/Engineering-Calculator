'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';

const calculators = [
  {
    title: 'CGPA Calculator',
    description: 'Calculate your Cumulative Grade Point Average across all semesters',
    icon: '📊',
    href: '/calculators/cgpa',
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'SGPA Calculator',
    description: 'Calculate Semester Grade Point Average for individual semesters',
    icon: '📈',
    href: '/calculators/sgpa',
    color: 'from-purple-500 to-purple-600',
  },
  {
    title: 'CGPA to Percentage',
    description: 'Convert your CGPA to percentage format',
    icon: '🔄',
    href: '/calculators/cgpa-to-percentage',
    color: 'from-pink-500 to-pink-600',
  },
  {
    title: 'Physics Cycle',
    description: 'Analyze and calculate physics cycle parameters',
    icon: '⚛️',
    href: '/calculators/physics-cycle',
    color: 'from-green-500 to-green-600',
  },
  {
    title: 'Chemistry Cycle',
    description: 'Calculate chemistry cycle and thermodynamic values',
    icon: '🧪',
    href: '/calculators/chemistry-cycle',
    color: 'from-orange-500 to-orange-600',
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h1 className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
                Engineering Calculator Suite
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Your all-in-one platform for academic calculations, grade analysis, and scientific computations
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/calculators/cgpa"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105"
                >
                  Get Started
                </Link>
                <a
                  href="#calculators"
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition"
                >
                  Explore Tools
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Overview */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-2">Fast & Accurate</h3>
                <p className="text-gray-600">Real-time calculations with precision and accuracy</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-bold mb-2">Modern Design</h3>
                <p className="text-gray-600">Beautiful, responsive interface for all devices</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
                <p className="text-gray-600">All calculations done locally in your browser</p>
              </div>
            </div>
          </div>
        </section>

        {/* Calculators Grid */}
        <section id="calculators" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
              Our Tools
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Choose from a variety of calculators to help you with your academic and scientific calculations
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {calculators.map((calc) => (
                <Link
                  key={calc.href}
                  href={calc.href}
                  className="group"
                >
                  <div className={`bg-gradient-to-br ${calc.color} rounded-xl shadow-lg p-8 text-white transform transition hover:shadow-2xl hover:-translate-y-2 cursor-pointer h-full`}>
                    <div className="text-5xl mb-4">{calc.icon}</div>
                    <h3 className="text-2xl font-bold mb-3">{calc.title}</h3>
                    <p className="text-blue-50 mb-4">{calc.description}</p>
                    <div className="flex items-center text-blue-100 group-hover:text-white transition">
                      <span>Open Calculator</span>
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <p className="mb-4">🧮 Engineering Calculator Suite</p>
            <p className="text-sm">Built with Next.js, React, and Tailwind CSS</p>
            <p className="text-xs mt-4">© 2026 Engineering Calculator. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  );
}
