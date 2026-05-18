import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Award, Globe2, Lightbulb, GraduationCap, Lock, Linkedin, ShieldCheck, Briefcase, Users, MapPin } from "lucide-react";

const GlobeSection = lazy(() => import("@/components/about/GlobeSection"));

const VALUES = [
  { icon: Heart, title: "Integrity", desc: "Honesty in every engagement, no exceptions." },
  { icon: Award, title: "Excellence", desc: "We only ship our best work." },
  { icon: Globe2, title: "African Pride", desc: "Representing Rwanda and Africa on the global stage." },
  { icon: Lightbulb, title: "Innovation", desc: "Constantly pushing what's possible with engineering." },
  { icon: GraduationCap, title: "Education", desc: "We uplift through training and knowledge transfer." },
  { icon: Lock, title: "Reliability", desc: "Our clients sleep well. We make sure of it." },
];

const TIMELINE = [
  { year: "2022", title: "Founded in Kigali", desc: "ChanAI Tech is born from a vision to bring world-class AI and QA to Africa." },
  { year: "2023", title: "First Enterprise Clients", desc: "Onboarded our first 10 enterprise QA clients across East Africa." },
  { year: "2023", title: "Flagship Curriculum", desc: "Launched our flagship engineering training program." },
  { year: "2024", title: "50+ Projects", desc: "Crossed the 50-project milestone with 98% client satisfaction." },
  { year: "2025", title: "Pan-African Expansion", desc: "Scaling operations across the East African Community and beyond." },
];

const TEAM = [
  { name: "Founder & CEO", role: "Engineering & Strategy", bio: "Leads ChanAI Tech's vision to set the African standard for engineering excellence." },
  { name: "Lead Engineer", role: "Automation & Platforms", bio: "Architects production systems that solve real, measurable business problems." },
  { name: "Head of QA", role: "Test Automation Expert", bio: "Veteran QA practitioner with deep Selenium and JUnit expertise." },
];

const TRUST = [
  { icon: ShieldCheck, label: "NDA & DPA ready" },
  { icon: Briefcase, label: "Enterprise procurement-friendly" },
  { icon: Users, label: "Embedded delivery teams" },
  { icon: MapPin, label: "Kigali HQ · global delivery" },
];


const AboutPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Globe cinematic */}
      <Suspense fallback={
        <div className="h-screen h-[100svh] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Loading our world…</p>
          </div>
        </div>
      }>
        <GlobeSection />
      </Suspense>

      {/* Trust strip — enterprise signals */}
      <section className="py-10 border-y border-white/5 bg-[hsl(var(--navy-deep))]/60">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TRUST.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-white/80 font-medium">{t.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-32 relative">
        <div className="absolute inset-0 mesh-bg opacity-30" />
        <div className="container relative grid md:grid-cols-2 gap-8 max-w-6xl">
          <div className="glass-strong rounded-2xl p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-5">Our Mission</p>
            <p className="font-display text-2xl md:text-[1.75rem] leading-snug text-white">
              To bring world-class consulting, AI engineering, and software
              quality assurance within reach of every ambitious African
              organization &mdash; and to compete, on merit, with the best in
              the world.
            </p>
          </div>
          <div className="glass-strong rounded-2xl p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-5">Our Vision</p>
            <p className="font-display text-2xl md:text-[1.75rem] leading-snug text-white">
              A future where every African business operates with the
              <span className="text-electric-gradient"> precision, intelligence, and quality</span>
              of the world&rsquo;s top technology companies.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-4">Core Values</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight">
              The principles that
              <span className="text-electric-gradient"> guide every engagement.</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="group glass rounded-2xl p-8 hover:border-primary/40 hover:-translate-y-1 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-gradient-electric flex items-center justify-center shadow-glow mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-semibold text-xl mb-2 text-white">{v.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-secondary/15">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-4">Leadership</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight">
              The people behind
              <span className="text-electric-gradient"> the work.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TEAM.map((m, i) => (
              <div key={i} className="glass rounded-2xl p-8 text-center hover:border-primary/40 transition-all">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-electric flex items-center justify-center shadow-glow mb-5 text-3xl font-display font-bold text-primary-foreground">
                  {m.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                </div>
                <h3 className="font-display font-semibold text-lg text-white">{m.name}</h3>
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary mt-1.5 mb-3">{m.role}</p>
                <p className="text-sm text-white/70 mb-5 leading-relaxed">{m.bio}</p>
                <a href="#" className="inline-flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" /> Connect
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="container max-w-4xl">
          <div className="text-center mb-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-4">Our Journey</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight">
              From Kigali, <span className="text-electric-gradient">to the world.</span>
            </h2>
          </div>
          <div className="relative pl-8 md:pl-12">
            <div className="absolute left-2 md:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-accent to-transparent" />
            {TIMELINE.map((t, i) => (
              <div key={i} className="relative mb-10 last:mb-0">
                <div className="absolute -left-7 md:-left-[34px] top-1.5 w-4 h-4 rounded-full bg-gradient-electric shadow-glow ring-4 ring-[hsl(var(--navy-deep))]" />
                <div className="glass rounded-xl p-6">
                  <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary mb-1.5">{t.year}</div>
                  <h3 className="font-display font-semibold text-xl mb-2 text-white">{t.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container max-w-3xl text-center">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-6 leading-tight">
            Want to be part of <span className="text-electric-gradient">the journey?</span>
          </h2>
          <Button variant="electric" size="xl" asChild>
            <Link to="/book">Book a Consultation <ArrowRight /></Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AboutPage;
