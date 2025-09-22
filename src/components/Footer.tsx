import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-100 py-10 mt-12">
      <div className="px-8 text-center">
        {/* Social Links */}
        <div className="flex justify-center space-x-8 mb-6">
          <a
            href="https://facebook.com/kodefort"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition"
          >
            <Facebook size={32} />
          </a>
          <a
            href="https://instagram.com/kodefort"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition"
          >
            <Instagram size={32} />
          </a>
          <a
            href="https://linkedin.com/company/kodefort"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <Linkedin size={32} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-lg font-semibold tracking-wide">
          © {new Date().getFullYear()} Kodefort — All Rights Reserved
        </p>
        <p className="text-md mt-3 text-gray-400">
          Built with ❤️ for secure and innovative software solutions.
        </p>
      </div>
    </footer>
  );
}
