'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-white">🧮</div>
            <span className="text-xl font-bold text-white hidden sm:inline">
              EngineerCalc
            </span>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className={`hidden md:flex space-x-8`}>
            <Link href="/" className="text-white hover:text-blue-100 transition">Home</Link>
            <div className="relative group">
              <button className="text-white hover:text-blue-100 transition">
                Calculators
              </button>
              <div className="absolute left-0 mt-0 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
                <Link href="/calculators/cgpa" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">CGPA Calculator</Link>
                <Link href="/calculators/sgpa" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">SGPA Calculator</Link>
                <Link href="/calculators/cgpa-to-percentage" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">CGPA to Percentage</Link>
                <div className="border-t border-gray-200"></div>
                <Link href="/calculators/physics-cycle" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">Physics Cycle</Link>
                <Link href="/calculators/chemistry-cycle" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">Chemistry Cycle</Link>
              </div>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block text-white hover:text-blue-100">Home</Link>
            <Link href="/calculators/cgpa" className="block text-white hover:text-blue-100 pl-4">• CGPA Calculator</Link>
            <Link href="/calculators/sgpa" className="block text-white hover:text-blue-100 pl-4">• SGPA Calculator</Link>
            <Link href="/calculators/cgpa-to-percentage" className="block text-white hover:text-blue-100 pl-4">• CGPA to Percentage</Link>
            <Link href="/calculators/physics-cycle" className="block text-white hover:text-blue-100 pl-4">• Physics Cycle</Link>
            <Link href="/calculators/chemistry-cycle" className="block text-white hover:text-blue-100 pl-4">• Chemistry Cycle</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
