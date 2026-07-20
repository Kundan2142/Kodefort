"use client";

export default function Hero() {
  return (
    <section
      className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 pt-10 sm:pt-16 md:pt-20 pb-16 sm:pb-24 md:pb-32 overflow-hidden"
      style={{
        background: `
          linear-gradient(180deg, #FCFCFD 0%, #F8FAFC 45%, #F4F7FB 100%),
          radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.15), transparent 60%),
          radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.12), transparent 60%),
          radial-gradient(circle at center, rgba(255,255,255,0.85), transparent 70%)
        `,
      }}
    >
      {/* Abstract Blue Gradient Mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -left-32 sm:-left-48 top-20 sm:top-32 h-80 sm:h-[500px] lg:h-[600px] w-80 sm:w-[500px] lg:w-[600px] rounded-full bg-sky-300/25 blur-3xl"
        />
        <div 
          className="absolute left-24 sm:left-40 top-40 sm:top-60 h-64 sm:h-80 md:h-96 w-64 sm:w-80 md:w-96 rounded-full bg-blue-400/15 blur-3xl"
        />
        <div 
          className="absolute -right-24 sm:-right-32 -bottom-24 sm:-bottom-32 h-80 sm:h-96 md:h-[500px] w-80 sm:w-96 md:w-[500px] rounded-full bg-cyan-300/12 blur-3xl"
        />
      </div>

      {/* Huge Watery Background Text */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <h2
          className="absolute left-[-40px] top-8 font-black tracking-[-0.08em] whitespace-nowrap select-none"
          style={{
            fontSize: "clamp(70px, 18vw, 110px)",
            color: "rgba(56,189,248,0.05)",
            WebkitTextStroke: "1px rgba(56,189,248,0.1)",
            filter: "blur(1px)",
          }}
        >
          WELCOME TO KODEFORT
        </h2>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start lg:items-center">
          {/* Left Content */}
          <div className="flex-1 space-y-0">
            {/* Elegant Welcome to Kodefort */}
            <div className="mb-6 inline-flex items-center gap-2">
              <div className="h-px w-6 bg-sky-400"></div>
              <span className="text-sky-600 uppercase tracking-[0.25em] font-medium text-xs">
                Welcome to Kodefort
              </span>
              <div className="h-px w-6 bg-sky-400"></div>
            </div>

            <h1 
              className="text-gray-950 font-black mb-7"
              style={{
                maxWidth: "9ch",
                lineHeight: ".9",
                letterSpacing: "-0.05em",
                fontSize: "clamp(2.7rem, 11vw, 4rem)",
              }}
            >
              Engineering
              Software
              That Moves
              Businesses
              Forward.
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-md lg:max-w-lg mb-9">
              From custom web platforms and AI applications to enterprise software, we help businesses launch faster, scale confidently, and innovate without limits.
            </p>

            <div className="flex flex-col gap-3 mb-12">
              {/* Primary CTA - Full Width */}
              <a
                href="/contact"
                className="inline-flex items-center justify-center w-full px-8 py-4 bg-gray-950 hover:bg-black text-white font-semibold rounded-full text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.985]"
              >
                Book a Consultation
              </a>

              {/* Secondary CTA - Outline */}
              <a
                href="/projects"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-slate-300 hover:bg-slate-50 hover:border-slate-400 font-semibold rounded-full text-lg text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.985]"
              >
                Explore Projects
              </a>
            </div>

            {/* Trust Items */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 mb-6">
              <div>✓ Custom Software</div>
              <div>✓ AI Development</div>
              <div>✓ Cloud Native</div>
              <div>✓ Enterprise Security</div>
            </div>

            {/* Tech Logos */}
            <div className="flex flex-wrap items-center gap-6 opacity-75">
              <div className="text-lg font-semibold text-slate-400">React</div>
              <div className="text-lg font-semibold text-slate-400">Next.js</div>
              <div className="text-lg font-semibold text-slate-400">AWS</div>
              <div className="text-lg font-semibold text-slate-400">OpenAI</div>
              <div className="text-lg font-semibold text-slate-400">Docker</div>
            </div>
          </div>

          {/* Right Side - Browser Mockup */}
          <div className="w-full lg:w-1/2 relative">
            <div className="w-[92%] mx-auto bg-white border border-slate-200 rounded-3xl overflow-hidden" style={{ boxShadow: "0 20px 60px rgba(15,23,42,0.08)" }}>
              {/* Browser Header */}
              <div className="h-12 border-b border-slate-100 bg-slate-50 flex items-center px-5 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                </div>
                <div className="mx-auto text-sm font-medium text-slate-500 flex items-center gap-2">
                  <span className="text-slate-400">●</span>
                  kodefort.app
                </div>
              </div>

              {/* Mock Content */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <div className="uppercase text-xs tracking-widest text-slate-500 mb-4">Our Stack</div>
                  <div className="grid grid-cols-2 gap-y-6">
                    <div>
                      <div className="font-medium mb-2 text-sm sm:text-base">Frontend</div>
                      <div className="space-y-1 text-xs sm:text-sm text-slate-600">
                        <div>React • Next.js • TypeScript ✓</div>
                      </div>
                    </div>
                    <div>
                      <div className="font-medium mb-2 text-sm sm:text-base">Backend</div>
                      <div className="space-y-1 text-xs sm:text-sm text-slate-600">
                        <div>FastAPI • Node • Go ✓</div>
                      </div>
                    </div>
                    <div>
                      <div className="font-medium mb-2 text-sm sm:text-base">AI</div>
                      <div className="space-y-1 text-xs sm:text-sm text-slate-600">
                        <div>LangChain • OpenAI • Vector DB ✓</div>
                      </div>
                    </div>
                    <div>
                      <div className="font-medium mb-2 text-sm sm:text-base">Cloud</div>
                      <div className="space-y-1 text-xs sm:text-sm text-slate-600">
                        <div>AWS • Docker • Vercel ✓</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-emerald-600 font-medium text-sm">Deploy Successful</div>
                      <div className="text-xs text-slate-500">Build time: 31s</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl sm:text-3xl font-semibold text-gray-900">v2.4.1</div>
                      <div className="text-xs text-emerald-600">Live on production</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stat Card */}
            <div className="absolute -right-2 bottom-4 sm:-right-4 sm:bottom-6 bg-white border border-slate-200 shadow-xl rounded-2xl p-3 sm:p-4 w-36 sm:w-44" style={{ transform: "scale(0.75)", transformOrigin: "bottom right" }}>
              <div className="text-2xl sm:text-3xl font-semibold text-gray-900">120+</div>
              <div className="text-xs text-slate-600 mt-1">Projects Delivered</div>
              <div className="h-1.5 bg-emerald-500 w-10 rounded mt-3"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Soft Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148,163,184,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148,163,184,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      ></div>
    </section>
  );
}