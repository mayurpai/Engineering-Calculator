import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";
import ToasterProvider from "@/components/ToasterProvider";
import ConsentScripts from "@/components/ConsentScripts";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadataBase = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://mayurpai.github.io/Engineering-Calculator"
);

export const metadata: Metadata = {
  metadataBase,
  title: "Engineering Calculator",
  description: "Engineering Calculator is the essential academic companion for students, simplifying SGPA, CGPA, and CGPA-to-percentage calculations with precision. Designed for accuracy and ease of use, it helps students quickly convert and track their academic performance without complexity.",
  keywords:
    "HTML,CSS, JavaScript, Engineering, Engineering-Calculator, SGPA, CGPA, SGPA Calculator, CGPA Calculator, VTU sgpa calculator, VTU cgpa calculator, Engineering sgpa calculator, Engineering cgpa calculator, React.js, Next.js, Software Engineer II, Nike, Full Stack Engineer, Generative AI, Platform Engineering, Cloud Engineering, React.js, Next.js, JavaScript, TypeScript, Python, FastAPI, Kubernetes, Distributed Systems, Engineering Portfolio",
  authors: [{ name: "Mayur Pai" }],
  creator: "Mayur Pai",
  icons: {
    icon: "/Engineering-Calculator/favicon.svg",
    shortcut: "/Engineering-Calculator/favicon.svg",
    apple: "/Engineering-Calculator/favicon.svg",
  },
  other: {
    "google-adsense-account": "ca-pub-9607816643609771",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${geistMono.variable} min-h-screen bg-transparent text-white antialiased`}
      >
        {children}
        <ConsentScripts />
        <ToasterProvider />
        <CookieConsent />
      </body>
    </html>
  );
}
