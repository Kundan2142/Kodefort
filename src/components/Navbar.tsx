"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center z-50">
          <Image
            src="/tech/kodefort-logo.png"
            alt="Kodefort Logo"
            width={50}
            height={50}
            className="mr-2"
          />
          <span className="text-xl font-bold text-blue-800 hover:text-blue-900">
            Kodefort
          </span>
        </Link>

        {/* Hamburger button */}
        <button
          className="sm:hidden flex items-center px-3 py-2 border rounded text-blue-700 border-blue-700 hover:text-blue-900 hover:border-blue-900 z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="fill-current h-5 w-5"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            ) : (
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 bg-white shadow-md ${
          isOpen ? "max-h-60" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-6 py-3 space-y-2">
          {pathname === "/" ? (
            <>
              <a
                href="#services"
                className="text-blue-700 font-medium hover:text-blue-900"
                onClick={() => setIsOpen(false)}
              >
                Services
              </a>
              <a
                href="#about"
                className="text-blue-700 font-medium hover:text-blue-900"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
            </>
          ) : (
            <>
              <Link
                href="/#services"
                className="text-blue-700 font-medium hover:text-blue-900"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/#about"
                className="text-blue-700 font-medium hover:text-blue-900"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </>
          )}

          <Link
            href="/contact"
            className={`font-medium hover:text-blue-900 ${
              pathname === "/contact"
                ? "text-blue-900 font-semibold"
                : "text-blue-700"
            }`}
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
