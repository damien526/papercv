import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import { SITE, absoluteUrl, ogImageUrl } from "@/lib/site";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: "%s | PaperCV",
  },
  description: SITE.description,
  // `absoluteUrl("/")` keeps the trailing slash. The old `canonical: "/"`
  // resolved to `https://www.papercv.app` with no slash at all, naming a
  // slightly different address than the `/` actually served.
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    siteName: SITE.name,
    type: "website",
    locale: "en_US",
    url: SITE.url,
    title: SITE.title,
    description: SITE.description,
    images: [
      {
        url: ogImageUrl(),
        width: 1200,
        height: 630,
        alt: "PaperCV, free resume builder",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: [ogImageUrl()],
  },
  /**
   * By default Google truncates the snippet it shows and allows only a small
   * thumbnail. The last two directives lift both limits.
   *
   * `noindex` still sits where it belongs: the 404 and /builder declare it for
   * themselves and override these values.
   */
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  /**
   * Search Console verification. The token arrives through the environment
   * rather than the repo: it isn't code, and Google can rotate it without a
   * commit. Absent, Next writes nothing — no empty tag ships to production.
   */
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${instrumentSerif.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
