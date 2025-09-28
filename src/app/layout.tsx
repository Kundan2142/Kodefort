
import "./globals.css";
import { ReactNode } from "react";
import Navbar from "../components/Navbar";

import Script from 'next/script';

export const metadata = {
  title: "Kodefort | Software & Cybersecurity",
  description: "Kodefort - Your trusted partner in software and cybersecurity solutions.",
 icons: {
  icon: "/favicon.ico",
  shortcut: "/favicon.ico",
  apple: "/apple-touch-icon.png", // Optional
},
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <head>
        {/* 👇 Structured data for organization */}
        <Script
          id="organization-logo"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Kodefort",
              url: "https://www.kodefort.com",
              logo: "https://www.kodefort.com/favicon.ico",
              sameAs: [
                "https://www.linkedin.com/company/kodefort",
              ],
            }).replace(/^/, '').replace(/$/, ''),
          }}
        />
      </head>
        <Navbar />
        <main className="container mx-auto px-4">{children}</main>
      </body>
    </html>
  );
}
