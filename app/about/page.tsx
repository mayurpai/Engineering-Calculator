import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ScrambleText from '@/components/ScrambleText';
import SocialFooter from '@/components/SocialFooter';

export const metadata: Metadata = {
  title: 'About | Engineering Calculator',
  description: 'Engineering Calculator is a VTU-focused academic toolset that helps students calculate CGPA, SGPA, and cycle grades quickly and accurately.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full mb-4">
          <Link href="/" className="group text-blue-300 hover:text-blue-200 inline-flex items-center transition ui-interactive">
            <svg className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Homepage
          </Link>
        </div>
        <div className="max-w-7xl mx-auto w-full mb-6 flex flex-wrap gap-3">
          <Link href="/about" className="inline-flex items-center rounded-full border border-blue-300/55 bg-blue-500/15 px-3 py-1.5 text-sm text-blue-100 transition ui-interactive">About</Link>
          <Link href="/contact" className="inline-flex items-center rounded-full border border-white/15 px-3 py-1.5 text-sm text-slate-200 hover:text-white hover:border-blue-300/40 transition ui-interactive">Contact</Link>
          <Link href="/privacy-policy" className="inline-flex items-center rounded-full border border-white/15 px-3 py-1.5 text-sm text-slate-200 hover:text-white hover:border-blue-300/40 transition ui-interactive">Privacy Policy</Link>
          <Link href="/terms" className="inline-flex items-center rounded-full border border-white/15 px-3 py-1.5 text-sm text-slate-200 hover:text-white hover:border-blue-300/40 transition ui-interactive">Terms</Link>
        </div>
        <div className="max-w-7xl mx-auto w-full ui-card p-8">
          <h1 className="text-4xl font-bold ui-gradient-text mb-4"><ScrambleText text="About Engineering Calculator" /></h1>
          <p className="ui-muted mb-4">
            Engineering Calculator is built for VTU students who want fast, reliable, and simple academic calculations
            without manually checking formulas every time. From first year to final year, students often need to track
            internal progress, compare grade outcomes, and plan targets for upcoming semesters. This platform brings
            all those needs into one place with an interface designed for quick input and immediate results.
          </p>
          <p className="ui-muted mb-4">
            The main objective is to reduce confusion around grade computations and help students make better academic
            decisions. Every calculator is focused on clarity, mobile usability, and transparent logic so that students
            can trust the output and understand how the final values are derived.
          </p>
          <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-3">VTU-Focused Calculator Suite</h2>
          <p className="ui-muted mb-4">
            Engineering Calculator currently integrates multiple tools commonly used by VTU students during semester
            evaluation and overall academic planning:
          </p>
          <ul className="ui-muted list-disc pl-6 space-y-2 mb-6">
            <li>
              <span className="text-slate-100 font-semibold">CGPA Calculator:</span> Helps compute cumulative grade
              points across semesters, useful for internship eligibility, placement criteria, and long-term performance
              tracking.
            </li>
            <li>
              <span className="text-slate-100 font-semibold">SGPA Calculator:</span> Calculates semester-wise grade
              points accurately so students can evaluate performance immediately after results.
            </li>
            <li>
              <span className="text-slate-100 font-semibold">CGPA to Percentage Converter:</span> Quickly converts
              CGPA to percentage based on selected conversion logic, helping students while filling forms and profile
              details.
            </li>
            <li>
              <span className="text-slate-100 font-semibold">Physics / Chemistry Cycle Calculators:</span> Covers
              first-year common subjects (Semester 1 & Semester 2) across all branches before specialization.
            </li>
          </ul>
          <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-3">Why This Helps Students</h2>
          <p className="ui-muted mb-4">
            Instead of maintaining separate spreadsheets or doing repetitive manual calculations, students can use one
            platform to estimate outcomes, set realistic score goals, and monitor improvement across semesters. This is
            especially helpful during result season, revaluation planning, and before placement or higher-study
            applications where every decimal matters.
          </p>
          <p className="ui-muted mb-4">
            The platform is intentionally lightweight and quick to use, so students can focus on planning their next
            step rather than spending time validating formulas.
          </p>
        </div>
        <SocialFooter />
      </main>
    </>
  );
}
