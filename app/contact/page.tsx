import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ScrambleText from '@/components/ScrambleText';
import SocialFooter from '@/components/SocialFooter';
import { Social } from '@/lib/constants/social';

export const metadata: Metadata = {
  title: 'Contact | Engineering Calculator',
  description: 'Contact Engineering Calculator for feedback, suggestions, or support.',
};

export default function ContactPage() {
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
          <Link href="/about" className="inline-flex items-center rounded-full border border-white/15 px-3 py-1.5 text-sm text-slate-200 hover:text-white hover:border-blue-300/40 transition ui-interactive">About</Link>
          <Link href="/contact" className="inline-flex items-center rounded-full border border-blue-300/55 bg-blue-500/15 px-3 py-1.5 text-sm text-blue-100 transition ui-interactive">Contact</Link>
          <Link href="/privacy-policy" className="inline-flex items-center rounded-full border border-white/15 px-3 py-1.5 text-sm text-slate-200 hover:text-white hover:border-blue-300/40 transition ui-interactive">Privacy Policy</Link>
          <Link href="/terms" className="inline-flex items-center rounded-full border border-white/15 px-3 py-1.5 text-sm text-slate-200 hover:text-white hover:border-blue-300/40 transition ui-interactive">Terms</Link>
        </div>
        <div className="max-w-7xl mx-auto w-full ui-card p-8">
          <h1 className="text-4xl font-bold ui-gradient-text mb-4"><ScrambleText text="Contact" /></h1>
          <p className="ui-muted mb-6">
            Engineering Calculator is built for VTU students. If you find a calculation issue, want a new
            calculator, or have feedback to improve usability, please reach out.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <a href={Social.Email} className="ui-btn text-sm font-bold inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </a>
            <a href={Social.WhatsApp} target="_blank" rel="noopener noreferrer" className="ui-btn text-sm font-bold inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.52 3.48A11.86 11.86 0 0012.05 0C5.48 0 .15 5.32.15 11.9c0 2.1.55 4.16 1.6 5.98L0 24l6.29-1.65a11.9 11.9 0 005.76 1.47h.01c6.57 0 11.9-5.33 11.9-11.9 0-3.18-1.24-6.17-3.44-8.44zM12.06 21.8h-.01a9.9 9.9 0 01-5.04-1.38l-.36-.21-3.73.98 1-3.64-.23-.37a9.9 9.9 0 01-1.52-5.28c0-5.47 4.45-9.92 9.93-9.92 2.65 0 5.14 1.03 7.01 2.91a9.85 9.85 0 012.9 7.02c0 5.47-4.45 9.92-9.93 9.92zm5.45-7.42c-.3-.15-1.77-.88-2.04-.98-.27-.1-.46-.15-.66.15-.2.3-.76.98-.94 1.18-.17.2-.34.23-.63.08-.3-.15-1.25-.46-2.38-1.48-.88-.79-1.47-1.77-1.64-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.34.44-.5.15-.17.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.66-1.6-.9-2.2-.24-.58-.48-.5-.66-.5h-.56c-.2 0-.53.08-.8.38-.27.3-1.04 1.01-1.04 2.47 0 1.45 1.07 2.86 1.22 3.06.15.2 2.1 3.2 5.09 4.49.71.3 1.26.48 1.69.62.71.23 1.35.2 1.86.12.57-.09 1.77-.72 2.02-1.41.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
              </svg>
              WhatsApp
            </a>
          </div>

          <div className="space-y-4 mb-8">
            <h2 className="text-2xl font-bold text-slate-100">What to Contact For</h2>
            <ul className="ui-muted list-disc pl-6 space-y-2">
              <li>Wrong result or grade calculation mismatch in any tool.</li>
              <li>Requests for new VTU-focused calculators or conversion methods.</li>
              <li>UI/UX feedback to make the site clearer and faster for students.</li>
              <li>Contribution ideas, bug reports, and improvement suggestions.</li>
            </ul>
          </div>

          <div className="space-y-4 mb-8">
            <h2 className="text-2xl font-bold text-slate-100">Continuous Improvements</h2>
            <p className="ui-muted">
              Engineering Calculator is continuously improved based on practical student use cases. The goal is to
              keep expanding useful VTU-oriented tools while preserving simplicity, correctness, and a smooth user
              experience.
            </p>
          </div>

          <div className="space-y-4 mb-2">
            <h2 className="text-2xl font-bold text-slate-100">Open for Contributions</h2>
            <p className="ui-muted">
              Contributions are welcome from students and developers who want to improve VTU-focused tools for
              everyone.
            </p>
            <div className="ui-card p-5">
              <ul className="ui-muted list-disc pl-6 space-y-2 mb-4">
                <li>Suggest new calculators relevant to VTU branches and semesters.</li>
                <li>Report incorrect edge-case calculations with reproducible examples.</li>
                <li>Improve UI clarity, accessibility, and input validation workflows.</li>
                <li>Help with content quality across legal/help/trust pages.</li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <a
                  href={Social.GitHub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-btn text-sm font-bold inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 .5A12 12 0 000 12.67c0 5.4 3.44 9.98 8.2 11.6.6.12.82-.27.82-.58v-2.06c-3.34.75-4.04-1.66-4.04-1.66-.55-1.43-1.34-1.8-1.34-1.8-1.1-.77.08-.75.08-.75 1.2.09 1.84 1.27 1.84 1.27 1.08 1.9 2.84 1.35 3.53 1.03.1-.8.42-1.35.76-1.66-2.66-.31-5.47-1.37-5.47-6.1 0-1.35.47-2.45 1.24-3.31-.13-.31-.54-1.57.12-3.27 0 0 1-.33 3.3 1.27a11.2 11.2 0 016 0c2.3-1.6 3.3-1.27 3.3-1.27.66 1.7.25 2.96.12 3.27.77.86 1.24 1.96 1.24 3.31 0 4.74-2.81 5.78-5.49 6.09.43.39.82 1.15.82 2.32v3.44c0 .32.22.7.83.58A12.2 12.2 0 0024 12.67 12 12 0 0012 .5z" />
                  </svg>
                  Contribute on GitHub
                </a>
                <a href={Social.Email} className="ui-btn text-sm font-bold inline-flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact for Collaboration
                </a>
              </div>
            </div>
          </div>
        </div>
        <SocialFooter />
      </main>
    </>
  );
}
