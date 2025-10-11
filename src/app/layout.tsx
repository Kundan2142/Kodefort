
import "./globals.css";
import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import { Touchpad } from "lucide-react";
import TopBar from "@/components/topbar";



export const metadata = {
  title: "Kodefort | Software & Cybersecurity",
  description: "Kodefort - Your trusted partner in software and cybersecurity solutions.",
 icons: {
  icon: "/logo.png",
  shortcut: "/logo.png",
  apple: "/logo.png", // Optional
},
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
    
        <Navbar />
        <main className="container mx-auto px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
