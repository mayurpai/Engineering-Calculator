import Link from 'next/link';
import Navbar from '@/components/Navbar';
import SocialFooter from '@/components/SocialFooter';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex items-center">
        <section className="max-w-3xl mx-auto w-full">
          <div className="ui-card p-8 sm:p-10 text-center">
            <p className="uppercase tracking-[0.24em] text-xs text-blue-300 mb-3">Error 404</p>
            <h1 className="ui-gradient-text mb-4">Page Not Found</h1>
            <p className="ui-muted mb-8">
              The page you are looking for does not exist or may have moved to a new route.
            </p>
            <p className="text-sm text-slate-300 mb-8">
              If you opened an old <strong>.html</strong> link, you can continue using the new calculator routes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl ui-interactive text-center"
              >
                Go Home
              </Link>
              <Link
                href="/calculators/cgpa"
                className="px-6 py-3 border border-white/20 text-slate-200 rounded-lg font-semibold hover:border-blue-400 hover:text-white transition ui-interactive text-center"
              >
                Open Calculator
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SocialFooter />
    </>
  );
}
