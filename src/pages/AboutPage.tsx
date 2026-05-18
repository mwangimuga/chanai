import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const GlobeSection = lazy(() => import("@/components/about/GlobeSection"));

const VALUES = [
  { title: "Integrity", desc: "Honesty in every engagement, no exceptions." },
  { title: "Excellence", desc: "We only ship our best work." },
  { title: "African Pride", desc: "Representing Rwanda and Africa on the global stage." },
  { title: "Innovation", desc: "Constantly pushing what's possible with engineering." },
  { title: "Education", desc: "We uplift through training and knowledge transfer." },
  { title: "Reliability", desc: "Our clients sleep well. We make sure of it." },
];

const TIMELINE = [
  { year: "2022", title: "Founded in Kigali", desc: "ChanAI Tech is born from a vision to bring world-class AI and QA to Africa." },
  { year: "2023", title: "First Enterprise Clients", desc: "Onboarded our first 10 enterprise QA clients across East Africa." },
  { year: "2023", title: "Flagship Curriculum", desc: "Launched our flagship engineering training program." },
  { year: "2024", title: "50+ Projects", desc: "Crossed the 50-project milestone with 98% client satisfaction." },
  { year: "2025", title: "Pan-African Expansion", desc: "Scaling operations across the East African Community and beyond." },
];

const TEAM_PREVIEW = [
  { name: "Founder & CEO", role: "Engineering & Strategy", bio: "Leads ChanAI Tech's vision to set the African standard for engineering excellence." },
  { name: "Lead Engineer", role: "Automation & Platforms", bio: "Architects production systems that solve real, measurable business problems." },
  { name: "Head of QA", role: "Test Automation Expert", bio: "Veteran QA practitioner with deep Selenium and JUnit expertise." },
];

const TRUST = [
  { label: "NDA & DPA ready" },
  { label: "Enterprise procurement-friendly" },
  { label: "Embedded delivery teams" },
  { label: "Kigali HQ · global delivery" },
];

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Globe cinematic */}
      <Suspense fallback={
        <div className="h-screen h-[100svh] flex items-center justify-center bg-background">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Loading our world…</p>
          </div>
        </div>
      }>
        <GlobeSection />
      </Suspense>

      {/* Trust strip — enterprise signals */}
      <section className="py-14 border-y border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5">
        <div className="container px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {TRUST.map((t, idx) => (
              <div key={t.label} className="flex items-center gap-4 pl-4 border-l border-primary/40">
                <span className="font-mono text-xs text-primary font-semibold">{String(idx + 1).padStart(2, "0")}</span>
                <span className="text-sm font-medium text-foreground/80">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-36 bg-background">
        <div className="container max-w-5xl px-6 grid md:grid-cols-2 gap-16">
          <div className="border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 rounded-2xl p-10 flex flex-col justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-6">Our Mission</p>
              <p className="font-display text-2xl md:text-3xl leading-relaxed text-foreground">
                To bring world-class consulting, AI engineering, and software
                quality assurance within reach of every ambitious African
                organization — and to compete, on merit, with the best in the world.
              </p>
            </div>
          </div>
          <div className="border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 rounded-2xl p-10 flex flex-col justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-6">Our Vision</p>
              <p className="font-display text-2xl md:text-3xl leading-relaxed text-foreground">
                A future where every African business operates with the{" "}
                <span className="text-primary font-semibold">precision, intelligence, and quality</span>{" "}
                of the world's top technology companies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-36 bg-black/5 dark:bg-white/5 border-t border-black/5 dark:border-white/5">
        <div className="container px-6">
          <div className="text-center max-w-2xl mx-auto mb-24">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-6">Core Values</p>
            <h2 className="font-display font-bold text-4xl md:text-6xl text-foreground leading-[1.08]">
              The principles that <span className="italic font-normal font-serif">guide our work.</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {VALUES.map((v, idx) => {
              const numStr = String(idx + 1).padStart(2, "0");
              return (
                <div key={v.title} className="group flex flex-col justify-between items-start transition-all duration-300">
                  <div>
                    <div className="font-serif italic text-3xl text-primary/60 dark:text-primary/45 mb-5 select-none font-normal">
                      {numStr}
                    </div>
                    <h3 className="font-display font-semibold text-2xl mb-3 text-foreground">{v.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Preview */}
      <section className="py-36 bg-background border-t border-black/5 dark:border-white/5">
        <div className="container px-6">
          <div className="max-w-3xl mb-24">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-6">Leadership</p>
            <h2 className="font-display font-bold text-4xl md:text-6xl text-foreground leading-[1.08] mb-8">
              The people <span className="italic font-normal font-serif">behind the work.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Meet our core engineering and strategy leadership driving World-Class solutions from Kigali.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {TEAM_PREVIEW.map((m, i) => (
              <div key={i} className="border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 rounded-2xl p-8 transition-all duration-300 hover:border-primary/20">
                <div className="w-20 h-20 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center mb-6 text-xl font-display font-semibold text-primary bg-background">
                  {m.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                </div>
                <h3 className="font-display font-semibold text-xl text-foreground">{m.name}</h3>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mt-1.5 mb-4">{m.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>

          {/* View Full Team CTA */}
          <div className="text-center font-serif text-lg">
            <Link
              to="/about/team"
              className="group inline-flex items-center gap-2 text-primary font-semibold border-b border-primary/30 hover:border-primary pb-1 transition-all duration-300"
            >
              Meet the Whole Team <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Styled Staggered Timeline */}
      <section className="py-36 bg-black/5 dark:bg-white/5 border-t border-black/5 dark:border-white/5">
        <div className="container max-w-5xl px-6">
          <div className="text-center mb-28">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-6">Our Journey</p>
            <h2 className="font-display font-bold text-4xl md:text-6xl text-foreground leading-[1.08]">
              From Kigali, <span className="italic font-normal font-serif">to the world.</span>
            </h2>
          </div>

          {/* Staggered Creative Magazine Timeline Layout */}
          <div className="relative space-y-24 md:space-y-36">
            {TIMELINE.map((t, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`flex flex-col md:flex-row items-start gap-8 md:gap-16 ${
                    isEven ? "" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Huge Serif Year Block */}
                  <div className={`w-full md:w-1/2 flex ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                    <div className="font-serif italic text-7xl md:text-9xl text-primary/30 dark:text-primary/20 select-none leading-none font-normal">
                      {t.year}
                    </div>
                  </div>

                  {/* Copy Block */}
                  <div className="w-full md:w-1/2 pl-4 border-l-2 border-primary/30">
                    <h3 className="font-display font-semibold text-2xl mb-3 text-foreground">{t.title}</h3>
                    <p className="text-muted-foreground text-base leading-relaxed max-w-md">{t.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-36 bg-background border-t border-black/5 dark:border-white/5">
        <div className="container max-w-3xl text-center px-6">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-8 leading-tight">
            Want to be part of <span className="italic font-normal font-serif">our journey?</span>
          </h2>
          <div className="flex justify-center font-serif text-lg">
            <Link
              to="/book"
              className="group inline-flex items-center gap-2 text-primary font-semibold border-b border-primary/30 hover:border-primary pb-1 transition-all duration-300"
            >
              Start a Conversation <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AboutPage;
