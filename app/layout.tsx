import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

/* Clean sans-serif for the whole dark theme. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* Space Grotesk — used by the MorphText component. */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const TITLE = "Pritelesh Bhowmik — Aspiring Game QA Tester";
const DESCRIPTION =
  "Aspiring Game QA Tester with 10+ years of gaming experience across FPS, MOBA, RPG, Strategy and Simulation. Gameplay analysis, bug reports and test documentation.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Game QA Tester",
    "Entry-Level Game Tester",
    "Game Testing",
    "Bug Reporting",
    "Quality Assurance",
    "Gameplay Analysis",
    "Pritelesh Bhowmik",
  ],
  authors: [{ name: "Pritelesh Bhowmik" }],
  creator: "Pritelesh Bhowmik",
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    siteName: "Pritelesh Bhowmik Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pritelesh Bhowmik",
  jobTitle: "Entry-Level Game QA Tester",
  knowsAbout: [
    "Game Testing",
    "Quality Assurance",
    "Bug Reporting",
    "Gameplay Analysis",
    "Test Case Writing",
  ],
  knowsLanguage: ["English", "Bengali"],
  email: "priteleshnel@gmail.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#121212]">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
