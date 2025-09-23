"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap justify-between items-center py-3 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center mb-2 sm:mb-0">
          <Image
            src="/tech/kodefort-logo.png"
            alt="Kodefort Logo"
            width={50}
            height={50} // make height proportional to width
            className="mr-2"
          />
          <span className="text-xl font-bold text-blue-800 hover:text-blue-900">
            Kodefort
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-wrap gap-4">
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
