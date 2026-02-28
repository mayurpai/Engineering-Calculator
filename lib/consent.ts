export const CONSENT_KEY = 'engineering-calculator-cookie-consent';
export const CONSENT_UPDATED_EVENT = 'engineering-calculator-consent-updated';

export type ConsentChoice = 'accepted' | 'essential-only';

export const readConsentChoice = (): ConsentChoice | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const choice = window.localStorage.getItem(CONSENT_KEY);
  if (choice === 'accepted' || choice === 'essential-only') {
    return choice;
  }

  return null;
};

export const writeConsentChoice = (choice: ConsentChoice) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(CONSENT_KEY, choice);
  window.dispatchEvent(new CustomEvent(CONSENT_UPDATED_EVENT, { detail: choice }));
};
