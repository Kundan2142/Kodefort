import "./globals.css";
import { ReactNode } from "react";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Kodefort | Software & Cybersecurity",
  description: "Kodefort - Your trusted partner in software and cybersecurity solutions.",
  icons: {
    icon: "/tech/kodefort-logo.png", // your logo path in public folder
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <main className="container mx-auto px-4">{children}</main>
      </body>
    </html>
  );
}
