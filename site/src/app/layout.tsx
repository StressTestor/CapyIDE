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
  metadataBase: new URL("https://capyide.dev"),
  title: {
    default: "CapyIDE — Persistent memory IDE with mainstream AI",
    template: "%s — CapyIDE",
  },
  description:
    "Only IDE with persistent memory + unlimited mainstream AI for $15 (Pro).",
  keywords: [
    "CapyIDE",
    "IDE",
    "AI",
    "persistent memory",
    "developer tools",
  ],
  openGraph: {
    type: "website",
    url: "https://capyide.dev",
    title: "CapyIDE",
    description:
      "Only IDE with persistent memory + unlimited mainstream AI for $15 (Pro).",
    siteName: "CapyIDE",
  },
  twitter: {
    card: "summary_large_image",
    title: "CapyIDE",
    description:
      "Only IDE with persistent memory + unlimited mainstream AI for $15 (Pro).",
  },
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>{/* no inline script/style here */}</head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
