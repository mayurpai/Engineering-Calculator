# Engineering Calculator

Engineering Calculator is a VTU-focused academic calculator suite built with Next.js.
It helps students quickly calculate SGPA, CGPA, CGPA-to-percentage, and first-year cycle results.

## Features

- CGPA Calculator (with weighted credits)
- SGPA Calculator (subject-wise marks + credits)
- CGPA to Percentage Converter
- Physics Cycle SGPA Calculator
- Chemistry Cycle SGPA Calculator
- Grade-scale references for 2018 / 2021 / 2022 schemes
- Cookie consent gating for non-essential scripts
- Dynamic sitemap and robots metadata routes

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Sonner (toast notifications)
- Font Awesome

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create/update your env file (`.env`):

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_ADSENSE_CLIENT_ID=
```

3. Start dev server:

```bash
npm run dev
```

4. Open:

`http://localhost:3000`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Run production build
- `npm run lint` - Run ESLint

## Cookie Consent Enforcement

The banner is not just UI; it actively gates non-essential scripts.

- `Essential Only`: non-essential scripts stay blocked.
- `Accept All`: Google Analytics / AdSense can load (only if env vars are set).

## Routes

- `/`
- `/about`
- `/contact`
- `/privacy-policy`
- `/terms`
- `/calculators/cgpa`
- `/calculators/sgpa`
- `/calculators/cgpa-to-percentage`
- `/calculators/physics-cycle`
- `/calculators/chemistry-cycle`

## SEO/Metadata

- Favicon and app icon generated via `app/icon.tsx`
- Sitemap served by `app/sitemap.ts` at `/sitemap.xml`
- Robots served by `app/robots.ts` at `/robots.txt`
- `public/` is optional in this project and can remain empty unless you add custom static assets.

## Notes

- `NEXT_PUBLIC_SITE_URL` should be your deployed base URL in production.
- If analytics/ad env vars are empty, those scripts are not injected.
