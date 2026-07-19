"use client";

export default function Hero() {
  return (
    <section
      className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 pt-[140px] pb-[120px] overflow-hidden"
      style={{
        background: `
          linear-gradient(180deg, #FCFCFD 0%, #F8FAFC 45%, #F4F7FB 100%),
          radial-gradient(circle at top left, rgba(139, 92, 246, 0.12), transparent 50%),
          radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.10), transparent 50%),
          radial-gradient(circle at center, rgba(255,255,255,0.85), transparent 70%)
        `,
      }}
    >
      {/* Abstract Blue Gradient Mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -left-[200px] top-[120px] h-[700px] w-[700px] rounded-full bg-sky-300/20 blur-[180px]"
        />
        <div 
          className="absolute left-[250px] top-[260px] h-[500px] w-[500px] rounded-full bg-blue-400/12 blur-[160px]"
        />
        <div 
          className="absolute right-[-120px] bottom-[-120px] h-[650px] w-[650px] rounded-full bg-cyan-300/10 blur-[220px]"
        />
      </div>

      {/* Huge Watery Background Text */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <h2
          className="absolute left-1/2 top-4 -translate-x-1/2 text-[110px] xl:text-[115px] font-black tracking-[-0.08em] whitespace-nowrap select-none"
          style={{
            color: "rgba(56,189,248,0.09)",
            WebkitTextStroke: "1px rgba(56,189,248,0.17)",
            filter: "blur(1.5px)",
          }}
        >
          WELCOME TO KODEFORT
        </h2>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Elegant Welcome to Kodefort */}
            <div className="mb-6 inline-flex items-center gap-3">
              <div className="h-px w-10 bg-sky-400"></div>
              <span className="text-sky-600 uppercase tracking-[0.35em] font-medium text-sm">
                Welcome to Kodefort
              </span>
              <div className="h-px w-10 bg-sky-400"></div>
            </div>

            <h1 className="text-7xl font-black tracking-[-0.05em] leading-[0.95] text-gray-950">
              Engineering<br />
              Software That<br />
              Moves Businesses<br />
              Forward.
            </h1>

            <p className="text-2xl text-slate-600 max-w-lg">
              From custom web platforms and AI applications to enterprise software, we help businesses launch faster, scale confidently, and innovate without limits.
            </p>

            <div className="flex flex-wrap gap-4">
              {/* Primary CTA */}
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-10 py-4 bg-gray-950 hover:bg-black text-white font-semibold rounded-full text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.985]"
              >
                Book a Consultation
              </a>

              {/* Secondary CTA */}
              <a
                href="/projects"
                className="inline-flex items-center justify-center px-10 py-4 bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400 font-semibold rounded-full text-lg text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.985]"
              >
                Explore Projects
              </a>
            </div>

            {/* Trust Items */}
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-600 pt-4">
              <div>✓ Custom Software</div>
              <div>✓ AI Development</div>
              <div>✓ Cloud Native</div>
              <div>✓ Enterprise Security</div>
            </div>

            {/* Tech Logos */}
            <div className="flex items-center gap-8 pt-6 opacity-75">
              <div className="text-xl font-semibold text-slate-400">React</div>
              <div className="text-xl font-semibold text-slate-400">Next.js</div>
              <div className="text-xl font-semibold text-slate-400">AWS</div>
              <div className="text-xl font-semibold text-slate-400">OpenAI</div>
              <div className="text-xl font-semibold text-slate-400">Docker</div>
            </div>
          </div>

          {/* Right Side - Browser Mockup */}
          <div className="relative hidden lg:block">
            <div className="bg-white border border-slate-200 shadow-2xl rounded-3xl overflow-hidden">
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
              <div className="p-8 space-y-10">
                <div>
                  <div className="uppercase text-xs tracking-widest text-slate-500 mb-4">Our Stack</div>
                  <div className="grid grid-cols-2 gap-y-8">
                    <div>
                      <div className="font-medium mb-2">Frontend</div>
                      <div className="space-y-1 text-sm text-slate-600">
                        <div>React • Next.js • TypeScript ✓</div>
                      </div>
                    </div>
                    <div>
                      <div className="font-medium mb-2">Backend</div>
                      <div className="space-y-1 text-sm text-slate-600">
                        <div>FastAPI • Node • Go ✓</div>
                      </div>
                    </div>
                    <div>
                      <div className="font-medium mb-2">AI</div>
                      <div className="space-y-1 text-sm text-slate-600">
                        <div>LangChain • OpenAI • Vector DB ✓</div>
                      </div>
                    </div>
                    <div>
                      <div className="font-medium mb-2">Cloud</div>
                      <div className="space-y-1 text-sm text-slate-600">
                        <div>AWS • Docker • Vercel ✓</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-emerald-600 font-medium">Deploy Successful</div>
                      <div className="text-sm text-slate-500">Build time: 31s</div>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-semibold text-gray-900">v2.4.1</div>
                      <div className="text-xs text-emerald-600">Live on production</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stat Card */}
            <div className="absolute -right-6 -top-8 bg-white border border-slate-200 shadow-xl rounded-2xl p-6 w-60">
              <div className="text-5xl font-semibold text-gray-900">120+</div>
              <div className="text-sm text-slate-600 mt-1">Projects Delivered</div>
              <div className="h-1.5 bg-emerald-500 w-16 rounded mt-6"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Soft Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148,163,184,0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148,163,184,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      ></div>
    </section>
  );
}