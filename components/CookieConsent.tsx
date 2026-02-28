'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  type ConsentChoice,
  readConsentChoice,
  writeConsentChoice,
} from '@/lib/consent';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const savedChoice = readConsentChoice();
    if (!savedChoice) {
      const frame = window.requestAnimationFrame(() => setIsVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  const clearNonEssentialCookies = () => {
    const cookieNamesToClear = [
      '_ga',
      '_ga_*',
      '_gid',
      '_gat',
      '_gcl_au',
      '_gads',
      '__gads',
      '__gpi',
    ];

    cookieNamesToClear.forEach((cookieName) => {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`;
      if (window.location.hostname.includes('.')) {
        const topLevelDomain = window.location.hostname
          .split('.')
          .slice(-2)
          .join('.');
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${topLevelDomain}`;
      }
    });
  };

  const handleChoice = (choice: ConsentChoice) => {
    writeConsentChoice(choice);
    if (choice === 'essential-only') {
      clearNonEssentialCookies();
    }
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[60]">
      <div className="max-w-5xl mx-auto ui-card p-4 sm:p-5">
        <p className="text-sm text-slate-200 mb-3">
          We use essential storage for site functionality and may use cookies/analytics for improving the experience and ads.
        </p>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <Link href="/privacy-policy" className="hover:text-white transition ui-interactive">
              Privacy Policy
            </Link>
            <span>/</span>
            <Link href="/terms" className="hover:text-white transition ui-interactive">
              Terms & Disclaimer
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleChoice('essential-only')}
              className="px-3 py-2 border border-white/20 rounded-md text-sm text-slate-200 hover:bg-white/10 transition ui-interactive"
            >
              Essential Only
            </button>
            <button
              onClick={() => handleChoice('accepted')}
              className="px-3 py-2 rounded-md text-sm bg-blue-500 text-white hover:bg-blue-400 transition ui-interactive"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
