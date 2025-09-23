"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname(); // get current route

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-blue-800 hover:text-blue-900"
        >
          Kodefort
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6">
          {pathname === "/" ? (
            <>
              <a
                href="#services"
                className="text-blue-700 font-medium hover:text-blue-900"
              >
                Services
              </a>
              <a
                href="#about"
                className="text-blue-700 font-medium hover:text-blue-900"
              >
                About
              </a>
            </>
          ) : (
            <>
              <Link
                href="/#services"
                className="text-blue-700 font-medium hover:text-blue-900"
              >
                Services
              </Link>
              <Link
                href="/#about"
                className="text-blue-700 font-medium hover:text-blue-900"
              >
                About
              </Link>
            </>
          )}

          {/* Contact Link - highlighted if active */}
          <Link
            href="/contact"
            className={`font-medium hover:text-blue-900 ${
              pathname === "/contact"
                ? "text-blue-900 font-semibold"
                : "text-blue-700"
            }`}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
