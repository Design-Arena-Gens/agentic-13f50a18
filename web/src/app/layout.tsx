import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "RideMate",
  description: "Mobile-first carpooling: find and offer rides",
  manifest: "/manifest.webmanifest",
  themeColor: "#0ea5e9",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-zinc-900`}>
        <div className="min-h-svh pb-20">{children}</div>
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="mx-auto flex max-w-md items-stretch justify-between px-6 py-2 text-sm">
            <Link href="/" className="flex flex-1 flex-col items-center justify-center gap-1 py-1">
              <span className="text-xl" aria-hidden>??</span>
              <span>Search</span>
            </Link>
            <Link href="/offer" className="flex flex-1 flex-col items-center justify-center gap-1 py-1">
              <span className="text-xl" aria-hidden>??</span>
              <span>Offer</span>
            </Link>
            <Link href="/trips" className="flex flex-1 flex-col items-center justify-center gap-1 py-1">
              <span className="text-xl" aria-hidden>???</span>
              <span>Trips</span>
            </Link>
          </div>
        </nav>
      </body>
    </html>
  );
}
