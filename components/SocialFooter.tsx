'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Connections } from '@/lib/constants/connections';
import { Social } from '@/lib/constants/social';
import Link from 'next/link';

interface SocialFooterProps {
  showLegalLinks?: boolean;
}

export default function SocialFooter({ showLegalLinks = false }: SocialFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-slate-400 py-6 sm:py-8 px-3 sm:px-6 lg:px-8 mt-auto w-full">
      <div className="max-w-7xl mx-auto ui-card p-4 sm:p-6 shadow-2xl drop-shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/12 via-purple-500/8 to-slate-900/10 pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(96,165,250,0.18),transparent_42%),radial-gradient(circle_at_85%_80%,rgba(244,114,182,0.14),transparent_46%)] pointer-events-none" aria-hidden="true" />

        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-center">
          <div className="text-center lg:text-left">
            <p className="text-slate-100 font-bold tracking-wide">Engineering Calculator</p>
            <p className="text-sm text-slate-300 mt-1">
              Handcrafted with <span className="text-pink-400">♥</span> by{' '}
              <a
                href={Social.Portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-slate-100 hover:text-blue-300 transition ui-interactive"
              >
                Mayur Pai
              </a>
            </p>
          </div>

          <p className="text-xs text-center text-slate-300">
            © {currentYear} Engineering Calculator. All rights reserved.
          </p>

          <div className="ui-footer-icons flex items-center justify-center lg:justify-end gap-2">
            {Connections.map((connection) => (
              <a
                key={connection.heading}
                href={connection.link}
                target={connection.link.startsWith('mailto:') ? '_self' : '_blank'}
                rel={connection.link.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                aria-label={connection.heading}
                title={connection.heading}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-slate-100 hover:bg-white/20 hover:border-blue-400/40 transition-all duration-200 ui-interactive hover:-translate-y-0.5"
              >
                <FontAwesomeIcon icon={connection.icon} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            ))}
          </div>
        </div>

        {showLegalLinks && (
          <div className="relative mt-5 pt-4 border-t border-white/10 flex flex-wrap justify-center gap-3 sm:gap-4 text-xs text-slate-300">
            <Link href="/about" className="px-2 py-2 rounded-md hover:text-white hover:bg-white/5 transition ui-interactive">About</Link>
            <Link href="/contact" className="px-2 py-2 rounded-md hover:text-white hover:bg-white/5 transition ui-interactive">Contact</Link>
            <Link href="/privacy-policy" className="px-2 py-2 rounded-md hover:text-white hover:bg-white/5 transition ui-interactive">Privacy Policy</Link>
            <Link href="/terms" className="px-2 py-2 rounded-md hover:text-white hover:bg-white/5 transition ui-interactive">Terms & Disclaimer</Link>
          </div>
        )}
      </div>
    </footer>
  );
}
