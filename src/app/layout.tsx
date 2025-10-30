import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

// Temporarily disabled Google Fonts for static export
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "CASER - Court Automated Search of Electronic Records",
  description: "Monitor 175+ U.S. Courts in near real-time. Eliminate wasteful PACER search fees. Receive instant alerts with direct document links.",
  keywords: ["CASER", "PACER", "Court Monitoring", "Legal Technology", "Electronic Records", "Federal Courts"],
  authors: [{ name: "CASER Legal" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "CASER - Court Automated Search of Electronic Records",
    description: "Monitor 175+ U.S. Courts in near real-time. Eliminate wasteful PACER search fees.",
    url: "https://caserlegal.com",
    siteName: "CASER",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CASER - Court Automated Search of Electronic Records",
    description: "Monitor 175+ U.S. Courts in near real-time. Eliminate wasteful PACER search fees.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased bg-background text-foreground font-sans"
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
