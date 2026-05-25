import type { Metadata } from "next";
// Google Fonts disabled for static export compatibility
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "CASER - Case Automated Search of Electronic Records",
  description: "Federal court case search and alerts for iOS. Monitor 300+ court feeds, zero in-app search fees. Download on the App Store.",
  keywords: ["CASER", "PACER", "Court Monitoring", "Legal Technology", "Electronic Records", "Federal Courts"],
  authors: [{ name: "CASER Legal" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "CASER - Case Automated Search of Electronic Records",
    description: "Federal court case search and alerts. Download CASER on the App Store.",
    url: "https://caserlegal.com",
    siteName: "CASER",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CASER - Case Automated Search of Electronic Records",
    description: "Federal court case search and alerts. Download CASER on the App Store.",
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
