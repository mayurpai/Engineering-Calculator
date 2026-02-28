'use client';

import { useEffect, useState } from 'react';

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$#%&*';

const createInitialScrambledText = (text: string) =>
  text
    .split('')
    .map((char, index) => {
      if (char === ' ') {
        return ' ';
      }
      return SCRAMBLE_CHARS[(index * 7 + 3) % SCRAMBLE_CHARS.length];
    })
    .join('');

interface ScrambleTextProps {
  text: string;
  durationMs?: number;
  intervalMs?: number;
}

export default function ScrambleText({
  text,
  durationMs = 1500,
  intervalMs = 65,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(() => createInitialScrambledText(text));

  useEffect(() => {
    const startTime = Date.now();

    const scrambleTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const revealCount = Math.floor(text.length * progress);

      const nextText = text
        .split('')
        .map((char, index) => {
          if (char === ' ') {
            return ' ';
          }

          if (index < revealCount || progress === 1) {
            return char;
          }

          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join('');

      setDisplayText(nextText);

      if (progress === 1) {
        clearInterval(scrambleTimer);
      }
    }, intervalMs);

    return () => clearInterval(scrambleTimer);
  }, [text, durationMs, intervalMs]);

  return <>{displayText}</>;
}
