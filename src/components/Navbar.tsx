
// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { useState } from "react";

// export default function Navbar() {
//   const pathname = usePathname();
//   const [isOpen, setIsOpen] = useState(false);

//   // Navigation links
//   const navLinks = [
//     { name: "Services", href: "/#services" },
//     { name: "About", href: "/#about" },
//     { name: "Technologies", href: "/#technologies" },
//     { name: "Team", href: "/#team" },
//     { name: "Contact", href: "/contact" }, 
//   ];

//   return (
//     <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-100 shadow-md sticky top-0 z-50">
//       {/* Top bar with logo and hamburger */}
//       <div className="container mx-auto flex justify-between items-center py-4 px-6">
//         {/* Logo */}
//         <Link href="/" className="flex items-center z-50">
//           <Image
//             src="/logo.png"
//             alt="Kodefort Logo"
//             width={50}
//             height={50}
//             className="mr-2"
//           />
//           <span className="text-xl font-bold text-white hover:text-blue-400">
//             Kodefort
//           </span>
//         </Link>

//         {/* Hamburger button */}
//         <button
//           className="sm:hidden flex items-center px-3 py-2 border rounded text-gray-100 border-gray-100 hover:text-blue-400 hover:border-blue-400 z-50"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <svg
//             className="fill-current h-5 w-5"
//             viewBox="0 0 20 20"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             {isOpen ? (
//               <path
//                 fillRule="evenodd"
//                 d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                 clipRule="evenodd"
//               />
//             ) : (
//               <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
//             )}
//           </svg>
//         </button>

//         {/* Desktop Navigation Links */}
//         <div className="hidden sm:flex sm:items-center sm:space-x-6">
//           {navLinks.map((link) => (
//             <Link
//               key={link.name}
//               href={link.href}
//               className={`text-gray-100 font-medium hover:text-blue-400 ${
//                 pathname === link.href ? "text-blue-400 font-semibold" : ""
//               }`}
//             >
//               {link.name}
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Mobile Menu (renders below navbar) */}
//       <div
//         className={`sm:hidden overflow-hidden transition-all duration-300 bg-gray-900 shadow-md ${
//           isOpen ? "max-h-60" : "max-h-0"
//         }`}
//       >
//         <div className="flex flex-col px-6 py-3 space-y-2">
//           {navLinks.map((link) => (
//             <Link
//               key={link.name}
//               href={link.href}
//               className={`text-gray-100 font-medium hover:text-blue-400 ${
//                 pathname === link.href ? "text-blue-400 font-semibold" : ""
//               }`}
//               onClick={() => setIsOpen(false)}
//             >
//               {link.name}
//             </Link>
//           ))}
//         </div>
//       </div>
//     </nav>
//   );
// }


// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { useState } from "react";

// export default function Navbar() {
//   const pathname = usePathname();
//   const [isOpen, setIsOpen] = useState(false);

//   // Navigation links — added "XSS Safe Demo"
//   const navLinks = [
//     { name: "Services", href: "/#services" },
//     { name: "About", href: "/#about" },
//     { name: "Technologies", href: "/#technologies" },
//     { name: "Team", href: "/#team" },
//     { name: "Contact", href: "/contact" },
//     { name: "XSS Safe Demo", href: "/xss-safe-demo" }, // <-- added link
//   ];

//   return (
//     <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-100 shadow-md sticky top-0 z-50">
//       {/* Top bar with logo and hamburger */}
//       <div className="container mx-auto flex justify-between items-center py-4 px-6">
//         {/* Logo */}
//         <Link href="/" className="flex items-center z-50">
//           <Image
//             src="/logo.png"
//             alt="Kodefort Logo"
//             width={50}
//             height={50}
//             className="mr-2"
//           />
//           <span className="text-xl font-bold text-white hover:text-blue-400">
//             Kodefort
//           </span>
//         </Link>

//         {/* Hamburger button */}
//         <button
//           className="sm:hidden flex items-center px-3 py-2 border rounded text-gray-100 border-gray-100 hover:text-blue-400 hover:border-blue-400 z-50"
//           onClick={() => setIsOpen(!isOpen)}
//           aria-label={isOpen ? "Close menu" : "Open menu"}
//         >
//           <svg
//             className="fill-current h-5 w-5"
//             viewBox="0 0 20 20"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             {isOpen ? (
//               <path
//                 fillRule="evenodd"
//                 d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                 clipRule="evenodd"
//               />
//             ) : (
//               <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
//             )}
//           </svg>
//         </button>

//         {/* Desktop Navigation Links */}
//         <div className="hidden sm:flex sm:items-center sm:space-x-6">
//           {navLinks.map((link) => (
//             <Link
//               key={link.name}
//               href={link.href}
//               className={`text-gray-100 font-medium hover:text-blue-400 ${
//                 pathname === link.href ? "text-blue-400 font-semibold" : ""
//               }`}
//             >
//               {link.name}
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Mobile Menu (renders below navbar) */}
//       <div
//         className={`sm:hidden overflow-hidden transition-all duration-300 bg-gray-900 shadow-md ${
//           isOpen ? "max-h-60" : "max-h-0"
//         }`}
//       >
//         <div className="flex flex-col px-6 py-3 space-y-2">
//           {navLinks.map((link) => (
//             <Link
//               key={link.name}
//               href={link.href}
//               className={`text-gray-100 font-medium hover:text-blue-400 ${
//                 pathname === link.href ? "text-blue-400 font-semibold" : ""
//               }`}
//               onClick={() => setIsOpen(false)}
//             >
//               {link.name}
//             </Link>
//           ))}
//         </div>
//       </div>
//     </nav>
//   );
// }



// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { useState, useEffect } from "react";

// /**
//  * Navbar with Top Status Bar
//  * - Top slim bar: shows security status (DDoS / Uptime), quick links, and report button.
//  * - Main nav: your original navbar (logo, links, mobile menu)
//  *
//  * Replace your existing Navbar with this file.
//  */

// export default function Navbar() {
//   const pathname = usePathname();
//   const [isOpen, setIsOpen] = useState(false);

//   // Simulated status states (for demo). Replace with real API calls if needed.
//   const [ddosStatus, setDdosStatus] = useState<"protected" | "under-attack" | "unknown">("protected");
//   const [uptime, setUptime] = useState<string>("99.99%");

//   // Example: simulate a short status refresh on mount (you can replace with fetch to a status endpoint)
//   useEffect(() => {
//     // placeholder: if you want to poll, do it here. currently keeps "protected".
//     const id = setInterval(() => {
//       // keep stable in demo
//       setDdosStatus("protected");
//       setUptime("99.99%");
//     }, 60_000);
//     return () => clearInterval(id);
//   }, []);

//   // Navigation links
//   const navLinks = [
//     { name: "Services", href: "/#services" },
//     { name: "About", href: "/#about" },
//     { name: "Technologies", href: "/#technologies" },
//     { name: "Team", href: "/#team" },
//     { name: "Contact", href: "/contact" },
//     { name: "XSS Safe Demo", href: "/xss-safe-demo" },
//     { name: "Recent Attacks", href: "/recent-attacks" }, // added quick link
//   ];

//   // status badge UI
//   function StatusBadge() {
//     if (ddosStatus === "protected") {
//       return (
//         <span className="inline-flex items-center gap-2 bg-green-50 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
//           <svg className="w-3 h-3" viewBox="0 0 8 8" fill="none" aria-hidden>
//             <circle cx="4" cy="4" r="4" fill="currentColor" />
//           </svg>
//           Protected • {uptime}
//         </span>
//       );
//     }
//     if (ddosStatus === "under-attack") {
//       return (
//         <span className="inline-flex items-center gap-2 bg-red-50 text-red-800 px-2 py-1 rounded-full text-sm font-semibold">
//           <svg className="w-3 h-3" viewBox="0 0 8 8" fill="none" aria-hidden>
//             <circle cx="4" cy="4" r="4" fill="currentColor" />
//           </svg>
//           Under DDoS — Mitigation Active
//         </span>
//       );
//     }
//     return (
//       <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
//         <svg className="w-3 h-3" viewBox="0 0 8 8" fill="none" aria-hidden>
//           <circle cx="4" cy="4" r="4" fill="currentColor" />
//         </svg>
//         Status unknown
//       </span>
//     );
//   }

//   return (
//     <header>
//       {/* Top status bar */}
//       <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
//         <div className="container mx-auto flex items-center justify-between px-4 py-2 text-sm">
//           <div className="flex items-center gap-4">
//             {/* Status badge */}
//             <StatusBadge />

//             {/* Quick links */}
//             <nav aria-label="quick links" className="hidden sm:flex gap-3">
//               <Link href="/security" className="hover:underline text-slate-200">Security</Link>
//               <Link href="/recent-attacks" className="hover:underline text-slate-200">Recent attacks</Link>
//               <Link href="/status" className="hover:underline text-slate-200">System status</Link>
//             </nav>
//           </div>

//           <div className="flex items-center gap-3">
//             <a
//               href="mailto:kundan@kodefort.com"
//               className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 px-3 py-1 rounded hover:bg-yellow-300 font-medium"
//               aria-label="Report a security incident"
//             >
//               <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
//                 <path d="M12 2v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                 <path d="M6 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//               Report incident
//             </a>

//             {/* small utility: theme toggle placeholder */}
//             <button
//               title="Toggle theme"
//               className="p-1 rounded hover:bg-white/10"
//               onClick={() => {
//                 // placeholder theme toggle: implement if you have theme state
//                 document.documentElement.classList.toggle("dark");
//               }}
//               aria-label="Toggle theme"
//             >
//               <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
//                 <path d="M12 3v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                 <path d="M21 12h-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                 <path d="M12 21v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                 <path d="M3 12h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                 <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main nav */}
//       <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-100 shadow-md sticky top-[38px] z-50">
//         <div className="container mx-auto flex justify-between items-center py-4 px-6">
//           {/* Logo */}
//           <Link href="/" className="flex items-center z-50">
//             <Image
//               src="/logo.png"
//               alt="Kodefort Logo"
//               width={50}
//               height={50}
//               className="mr-2"
//             />
//             <span className="text-xl font-bold text-white hover:text-blue-400">Kodefort</span>
//           </Link>

//           {/* Hamburger button */}
//           <button
//             className="sm:hidden flex items-center px-3 py-2 border rounded text-gray-100 border-gray-100 hover:text-blue-400 hover:border-blue-400 z-50"
//             onClick={() => setIsOpen(!isOpen)}
//             aria-label={isOpen ? "Close menu" : "Open menu"}
//           >
//             <svg className="fill-current h-5 w-5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden>
//               {isOpen ? (
//                 <path
//                   fillRule="evenodd"
//                   d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 />
//               ) : (
//                 <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
//               )}
//             </svg>
//           </button>

//           {/* Desktop Navigation Links */}
//           <div className="hidden sm:flex sm:items-center sm:space-x-6">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 href={link.href}
//                 className={`text-gray-100 font-medium hover:text-blue-400 ${pathname === link.href ? "text-blue-400 font-semibold" : ""}`}
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <div className={`sm:hidden overflow-hidden transition-all duration-300 bg-gray-900 shadow-md ${isOpen ? "max-h-60" : "max-h-0"}`}>
//           <div className="flex flex-col px-6 py-3 space-y-2">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 href={link.href}
//                 className={`text-gray-100 font-medium hover:text-blue-400 ${pathname === link.href ? "text-blue-400 font-semibold" : ""}`}
//                 onClick={() => setIsOpen(false)}
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// }

"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function HeroWithNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Services", href: "/#services" },
    { name: "About", href: "/#about" },
    { name: "Technologies", href: "/#technologies" },
    { name: "Team", href: "/#team" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="relative h-screen overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#1e1b4b] to-[#0f172a] animate-gradient-x"></div>
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Subtle glowing orbs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute w-72 h-72 bg-blue-500/20 rounded-full blur-3xl top-10 left-20"></div>
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl bottom-20 right-20"></div>
      </div>

      {/* Top Status Bar */}
      <div className="relative z-20 bg-black/40 backdrop-blur-sm text-white text-sm border-b border-white/10">
        <div className="container mx-auto flex justify-between items-center px-4 py-2">
          <span className="text-green-400 font-medium">✅ Protected • 99.99% uptime</span>
          <div className="flex items-center gap-4">
            <Link href="/status" className="hover:underline text-gray-200">System Status</Link>
            <a
              href="mailto:security@kodefort.com"
              className="bg-yellow-400 text-black px-3 py-1 rounded font-medium hover:bg-yellow-300"
            >
              Report Incident
            </a>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="relative z-20 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Kodefort Logo" width={40} height={40} />
            <span className="ml-2 text-xl font-bold text-white">Kodefort</span>
          </Link>

          {/* Links (Desktop) */}
          <div className="hidden sm:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-gray-200 hover:text-blue-400 transition ${
                  pathname === link.href ? "text-blue-400 font-semibold" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="sm:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="sm:hidden bg-black/80 backdrop-blur-md">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-6 py-3 text-white hover:text-blue-400"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100%-100px)] text-center px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg">
          Secure & Innovative Solutions
        </h1>
        <p className="mt-6 text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto">
          Kodefort empowers businesses with cutting-edge software built with security at its core.
        </p>
        <a
          href="/contact"
          className="mt-8 inline-block bg-blue-600 text-white px-8 py-4 rounded-xl shadow-lg hover:bg-blue-700 transition"
        >
          Get in Touch
        </a>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 20s ease infinite;
        }
      `}</style>
    </header>
  );
}
