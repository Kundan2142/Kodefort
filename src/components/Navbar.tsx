"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname(); // get current route

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Kodefort
        </Link>
        <div className="space-x-6">
          {/* Conditional links: scroll on homepage, or redirect to home with hash */}
          {pathname === "/" ? (
            <>
              <a href="#services" className="hover:text-blue-600">
                Services
              </a>
              <a href="#about" className="hover:text-blue-600">
                About
              </a>
            </>
          ) : (
            <>
              <Link href="/#services" className="hover:text-blue-600">
                Services
              </Link>
              <Link href="/#about" className="hover:text-blue-600">
                About
              </Link>
            </>
          )}
          <Link
            href="/contact"
            className={`hover:text-blue-600 font-medium ${
              pathname === "/contact" ? "text-blue-600 font-semibold" : ""
            }`}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
