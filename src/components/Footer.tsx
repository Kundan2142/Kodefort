// import { Facebook, Instagram, Linkedin } from "lucide-react";

// export default function Footer() {
//   return (
//     <footer className="w-full bg-gray-900 text-gray-100 py-10 mt-12">
//       <div className="px-8 text-center">
//         {/* Social Links */}
//         <div className="flex justify-center space-x-8 mb-6">
//           <a
//             href="https://facebook.com/kodefort"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="hover:text-blue-500 transition"
//           >
//             <Facebook size={32} />
//           </a>
//           <a
//             href="https://instagram.com/kodefort"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="hover:text-pink-500 transition"
//           >
//             <Instagram size={32} />
//           </a>
//           <a
//             href="https://linkedin.com/company/kodefort"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="hover:text-blue-400 transition"
//           >
//             <Linkedin size={32} />
//           </a>
//         </div>

//         {/* Copyright */}
//         <p className="text-lg font-semibold tracking-wide">
//           © {new Date().getFullYear()} Kodefort — All Rights Reserved
//         </p>
//         <p className="text-md mt-3 text-gray-400">
//           Built with ❤️ for secure and innovative software solutions.
//         </p>
//       </div>
//     </footer>
//   );
// }



import { Facebook, Instagram, Linkedin } from "lucide-react";


const ResponsiveMap = () => (
  <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57957.67259179843!2d84.94088109002563!3d24.783310612558235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f32a440a1b3c1f%3A0xcef6b223bdbf34a6!2sGaya%2C%20Bihar%2C%20India!5e0!3m2!1sen!2sus!4v1759067843706!5m2!1sen!2sus"
      className="absolute top-0 left-0 w-full h-full border-0"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Gaya, Bihar, India"
    />
  </div>
);


export default function Footer() {
  return (
    <footer className="w-screen relative left-1/2 right-1/2 -translate-x-1/2 bg-gray-900 text-gray-100">
      <div className="flex flex-col md:flex-row px-8 py-12 w-full">
        {/* Contact & Address */}
        <div className="flex-1 mb-8 md:mb-0">
          <h3 className="text-2xl font-semibold mb-4 text-white">Contact & Address</h3>
          <p className="text-gray-300 leading-relaxed">
            Kodefort<br />
            Near Laloo Mandal College, Kharkhura<br />
            Gaya, Bihar, India<br />
            Phone: +91 6207525287<br />
            Email: <a href="mailto:kundan@kodefort.com" className="text-blue-400 underline">kundan@kodefort.com</a>
          </p>
          <div className="flex space-x-6 mt-6">
            <a href="https://facebook.com/kodefort" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
              <Facebook size={28} />
            </a>
            <a href="https://instagram.com/kodefort" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
              <Instagram size={28} />
            </a>
            <a href="https://linkedin.com/company/kodefort" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              <Linkedin size={28} />
            </a>
          </div>
        </div>
        {/* Map */}
        <div className="flex-1 h-64 md:h-auto rounded-lg overflow-hidden bg-gray-800">
          <ResponsiveMap/>
        </div>
      </div>
      <div className="border-t border-gray-700">
        <p className="text-center text-gray-400 py-4">
          © {new Date().getFullYear()} Kodefort &trade;— All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

