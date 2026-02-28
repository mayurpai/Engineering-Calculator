import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ScrambleText from '@/components/ScrambleText';
import SocialFooter from '@/components/SocialFooter';

export const metadata: Metadata = {
  title: 'Privacy Policy | Engineering Calculator',
  description: 'Read the privacy policy for Engineering Calculator.',
};

export default function PrivacyPolicyPage() {
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
          <Link href="/privacy-policy" className="inline-flex items-center rounded-full border border-blue-300/55 bg-blue-500/15 px-3 py-1.5 text-sm text-blue-100 transition ui-interactive">Privacy Policy</Link>
          <Link href="/terms" className="inline-flex items-center rounded-full border border-white/15 px-3 py-1.5 text-sm text-slate-200 hover:text-white hover:border-blue-300/40 transition ui-interactive">Terms</Link>
        </div>
        <div className="max-w-7xl mx-auto w-full ui-card p-8 space-y-5">
          <h1 className="text-4xl font-bold ui-gradient-text"><ScrambleText text="Privacy Policy" /></h1>
          <p className="ui-muted">Last updated: February 27, 2026</p>

          <p className="ui-muted">
            This Privacy Policy explains how Engineering Calculator handles information when you use the website.
            We are committed to keeping the experience transparent, student-friendly, and respectful of your privacy.
          </p>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-100">Information We Collect</h2>
            <p className="ui-muted">
              We do not require account registration for calculator usage. Basic usage data may be collected through analytics and advertising tools.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-100">Cookies and Local Storage</h2>
            <p className="ui-muted">
              We may use cookies or browser storage to improve functionality, remember preferences, analyze traffic, and support ads.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-100">Third-Party Services</h2>
            <p className="ui-muted">
              We may use third-party services (such as Google Analytics and Google AdSense). These services may collect device/browser data as per their own policies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-100">How We Use Information</h2>
            <p className="ui-muted">
              Information collected through analytics and similar tools is used to understand traffic patterns,
              improve page performance, enhance calculator usability, and maintain overall reliability.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-100">Data Retention</h2>
            <p className="ui-muted">
              We do not maintain personal user accounts or store academic data on a profile basis. Analytics or
              advertising-related data retention is handled by the respective third-party providers under their own
              policies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-100">Data Security</h2>
            <p className="ui-muted">
              We apply reasonable practices to keep the website secure and updated. However, no method of internet
              transmission or storage is 100% secure, so complete security cannot be guaranteed.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-100">Your Choices</h2>
            <p className="ui-muted">
              You can control cookies through browser settings and choose consent options through the site banner where applicable.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-100">Children’s Privacy</h2>
            <p className="ui-muted">
              This website is intended for students and general users. We do not knowingly collect personal information
              from children under applicable legal age thresholds.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-100">External Links</h2>
            <p className="ui-muted">
              The website may include links to third-party websites. We are not responsible for the privacy practices
              or content of those external sites.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-100">Policy Updates</h2>
            <p className="ui-muted">
              This Privacy Policy may be updated from time to time to reflect feature changes, legal requirements, or
              improvements in how the platform operates. The latest effective date is shown at the top of this page.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-100">Contact</h2>
            <p className="ui-muted">If you have privacy questions, please use the Contact page.</p>
          </section>
        </div>
        <SocialFooter />
      </main>
    </>
  );
}
