import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, Clock } from "lucide-react";

const ResponsiveMap = () => (
  <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57957.67259179843!2d84.94088109002563!3d24.783310612558235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f32a440a1b3c1f%3A0xcef6b223bdbf34a6!2sGaya%2C%20Bihar%2C%20India!5e0!3m2!1sen!2sus!4v1759067843706!5m2!1sen!2sus"
      className="absolute top-0 left-0 w-full h-full border-0"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Kodefort - Gaya, Bihar"
      allowFullScreen
    />
  </div>
);

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#F8F4EC] text-slate-700 rounded-t-[48px] overflow-hidden mt-16">
      {/* Decorative Mesh/Blobs */}
      <div className="absolute left-[-200px] top-[-100px] w-[500px] h-[500px] rounded-full bg-sky-300/15 blur-[180px]" />
      <div className="absolute right-[-200px] bottom-[-100px] w-[500px] h-[500px] rounded-full bg-cyan-300/12 blur-[180px]" />

      <div className="relative px-8 pt-16 pb-12 max-w-7xl mx-auto">
        {/* CTA Section */}
        <div className="text-center mb-16">
          <p className="text-5xl font-black tracking-tight text-slate-900 mb-4">
            Ready to build your next product?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-full transition-all hover:-translate-y-0.5 shadow-lg text-lg"
          >
            Start Project →
          </a>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-5">
            <div className="mb-6">
              <h2 className="text-5xl font-bold tracking-tighter text-slate-900">Kodefort</h2>
              <div className="mt-3 text-2xl font-medium text-slate-700 leading-tight">
                Building Software.<br />
                Creating Impact.
              </div>
            </div>
            
            <p className="text-slate-600 leading-8 max-w-md">
              We craft exceptional digital experiences with cutting-edge technology and thoughtful design.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-10">
              <a
                href="https://facebook.com/kodefort"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-full p-3 shadow-sm hover:-translate-y-1 hover:bg-sky-50 transition-all"
              >
                <Facebook size={22} className="text-slate-600" />
              </a>
              <a
                href="https://instagram.com/kodefort"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-full p-3 shadow-sm hover:-translate-y-1 hover:bg-sky-50 transition-all"
              >
                <Instagram size={22} className="text-slate-600" />
              </a>
              <a
                href="https://linkedin.com/company/kodefort"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-full p-3 shadow-sm hover:-translate-y-1 hover:bg-sky-50 transition-all"
              >
                <Linkedin size={22} className="text-slate-600" />
              </a>
            </div>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-3">
            <h4 className="text-lg font-semibold text-slate-900 mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-2xl bg-white/70 px-4 py-3 border border-white/60">
                <Mail size={20} className="text-sky-600" />
                <a href="mailto:kundan@kodefort.com" className="hover:text-sky-600 transition">
                  kundan@kodefort.com
                </a>
              </div>
              <div className="flex items-center gap-4 rounded-2xl bg-white/70 px-4 py-3 border border-white/60">
                <Phone size={20} className="text-sky-600" />
                <a href="tel:+916207525287" className="hover:text-sky-600 transition">
                  +91 62075 25287
                </a>
              </div>
              <div className="flex items-center gap-4 rounded-2xl bg-white/70 px-4 py-3 border border-white/60">
                <Clock size={20} className="text-sky-600" />
                <div>Mon - Sat: 9:00 AM - 6:00 PM</div>
              </div>
            </div>
          </div>

          {/* Headquarters */}
          <div className="md:col-span-4">
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <div className="h-px w-10 bg-sky-400" />
                <p className="uppercase tracking-[0.28em] text-xs font-semibold text-sky-600">
                  OUR LOCATION
                </p>
              </div>
              <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Our Headquarters
              </h3>
              <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400" />
              <p className="mt-4 text-slate-600 leading-relaxed">
                We&apos;re always happy to meet founders, startups and businesses.
              </p>
            </div>

            {/* Premium Map Card */}
            <div className="relative rounded-[28px] overflow-hidden bg-white p-2 shadow-[0_20px_60px_rgba(15,23,42,.08)]">
              <div className="rounded-[22px] overflow-hidden relative">
                {/* Dotted Pattern */}
                <div
                  className="absolute inset-0 opacity-5 z-10 pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(#38bdf8 1px, transparent 1px)",
                    backgroundSize: "18px 18px"
                  }}
                />

                <div className="absolute -top-12 -left-10 w-36 h-36 rounded-full bg-sky-300/30 blur-3xl z-0" />
                <div className="absolute right-[-100px] bottom-[-120px] w-[280px] h-[280px] rounded-full bg-cyan-300/20 blur-[140px] z-0" />

                <ResponsiveMap />

                {/* Floating Info Card */}
                <div className="absolute bottom-4 left-4 z-30 bg-white/95 backdrop-blur-xl rounded-2xl px-5 py-4 shadow-xl border border-white/80">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <MapPin className="w-4 h-4 text-sky-500" />
                    <span>Kodefort HQ</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1">Gaya, Bihar</div>
                  <div className="text-xs text-slate-500 mt-1">Mon–Sat • 9AM–6PM</div>
                </div>

                {/* Pulsing Pin */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                  <div className="relative">
                    <div className="absolute inset-0 bg-sky-500/30 rounded-full animate-ping" />
                    <div className="w-14 h-14 rounded-full bg-white shadow-2xl flex items-center justify-center relative">
                      <MapPin className="w-8 h-8 text-sky-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="flex justify-between items-center px-6 py-5 bg-white">
                <span className="text-slate-500 text-sm">Near L.M. College, Kharkhura</span>
                <a
                  href="https://www.google.com/maps/place/Gaya,+Bihar,+India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 font-medium flex items-center gap-1 hover:translate-x-1 transition-all"
                >
                  View Map →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t border-slate-200 bg-white/70 py-6">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-6">
            <div>© 2026 Kodefort</div>
            <a href="/privacy" className="hover:text-slate-700 transition">Privacy</a>
            <a href="/terms" className="hover:text-slate-700 transition">Terms</a>
          </div>
          
          <div className="flex items-center gap-2 text-xs tracking-wide">
            Designed &amp; Engineered by Kodefort
          </div>
        </div>
      </div>
    </footer>
  );
}