import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ScrambleText from '@/components/ScrambleText';
import SocialFooter from '@/components/SocialFooter';

export const metadata: Metadata = {
  title: 'Terms & Disclaimer | Engineering Calculator',
  description: 'Read terms of use and disclaimer for Engineering Calculator.',
};

export default function TermsPage() {
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
          <Link href="/contact" className="inline-flex items-center rounded-full border border-white/15 px-3 py-1.5 text-sm text-slate-200 hover:text-white hover:border-blue-300/40 transition ui-interactive">Contact</Link>
          <Link href="/privacy-policy" className="inline-flex items-center rounded-full border border-white/15 px-3 py-1.5 text-sm text-slate-200 hover:text-white hover:border-blue-300/40 transition ui-interactive">Privacy Policy</Link>
          <Link href="/terms" className="inline-flex items-center rounded-full border border-blue-300/55 bg-blue-500/15 px-3 py-1.5 text-sm text-blue-100 transition ui-interactive">Terms</Link>
        </div>
        <div className="max-w-7xl mx-auto w-full ui-card p-8 space-y-5">
          <h1 className="text-4xl font-bold ui-gradient-text"><ScrambleText text="Terms & Disclaimer" /></h1>
          <p className="ui-muted">Last updated: February 27, 2026</p>

          <p className="ui-muted">
            These Terms govern your use of Engineering Calculator. By using this website, you agree to these terms
            and acknowledge the informational nature of calculator outputs.
          </p>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-100">Use of Service</h2>
            <p className="ui-muted">
              This website is provided for educational and informational purposes. You may use the calculators for personal and academic assistance.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-100">Accuracy Disclaimer</h2>
            <p className="ui-muted">
              While we strive for correctness, results are estimates based on input and formula assumptions. Always verify critical outcomes with official guidelines.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-100">Acceptable Use</h2>
            <p className="ui-muted">
              You agree to use the website lawfully and responsibly. You must not misuse, disrupt, reverse engineer,
              or attempt to compromise the platform, its infrastructure, or associated services.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-100">Educational Purpose</h2>
            <p className="ui-muted">
              Engineering Calculator is intended to support students in academic planning. Results are for guidance and
              should not be treated as official academic records or institutional decisions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-100">No Liability</h2>
            <p className="ui-muted">
              The site owner is not liable for losses or decisions made based on calculator outputs.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-100">Intellectual Property</h2>
            <p className="ui-muted">
              Unless otherwise stated, website content, interface elements, and implementation logic are the property
              of the project owner. Unauthorized copying or redistribution beyond fair use is discouraged.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-100">External Links</h2>
            <p className="ui-muted">
              External links are provided for convenience and are governed by their respective owners and policies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-100">Service Availability</h2>
            <p className="ui-muted">
              We aim to keep the website available and stable, but uninterrupted access is not guaranteed. Features,
              formulas, or pages may change, pause, or be removed as the platform evolves.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-100">Changes to Terms</h2>
            <p className="ui-muted">
              These Terms may be updated periodically. Continued use of the website after updates indicates acceptance
              of the revised terms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-100">Contact</h2>
            <p className="ui-muted">
              For questions about these Terms, please use the Contact page.
            </p>
          </section>
        </div>
        <SocialFooter />
      </main>
    </>
  );
}
