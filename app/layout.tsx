import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Engineering Calculator | CGPA, SGPA & More",
  description: "Advanced engineering calculator suite for CGPA, SGPA, semester grades, and scientific calculations",
  keywords: "calculator, CGPA, SGPA, engineering, grades, academic",
  openGraph: {
    title: "Engineering Calculator",
    description: "Advanced engineering calculator suite",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark-theme`}
      >
        {children}
      </body>
    </html>
  );
}
