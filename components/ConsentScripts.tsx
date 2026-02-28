'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import {
  CONSENT_UPDATED_EVENT,
  type ConsentChoice,
  readConsentChoice,
} from '@/lib/consent';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function ConsentScripts() {
  const [consentChoice, setConsentChoice] = useState<ConsentChoice | null>(null);

  useEffect(() => {
    const applyChoice = () => setConsentChoice(readConsentChoice());

    const handleConsentUpdated = (event: Event) => {
      const customEvent = event as CustomEvent<ConsentChoice>;
      setConsentChoice(customEvent.detail ?? readConsentChoice());
    };

    applyChoice();
    window.addEventListener('storage', applyChoice);
    window.addEventListener(CONSENT_UPDATED_EVENT, handleConsentUpdated as EventListener);

    return () => {
      window.removeEventListener('storage', applyChoice);
      window.removeEventListener(CONSENT_UPDATED_EVENT, handleConsentUpdated as EventListener);
    };
  }, []);

  if (consentChoice !== 'accepted') {
    return null;
  }

  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <>
      {gaMeasurementId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${gaMeasurementId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {adsenseClientId && (
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
          crossOrigin="anonymous"
        />
      )}
    </>
  );
}
