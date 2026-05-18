import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogSection from "@/components/BlogSection";
import ParticleField from "@/components/shared/ParticleField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, Send, Check } from "lucide-react";
import { openWhatsApp, formatBookingMessage } from "@/lib/whatsapp";

/* Partner categories — simplified data without icons. */
const PARTNERS = [
  { name: "Government & Public Sector", count: "12+" },
  { name: "Financial Services", count: "9" },
  { name: "Telecom & Infrastructure", count: "6" },
  { name: "Technology & SaaS", count: "18" },
  { name: "Healthcare & NGOs", count: "7" },
  { name: "Education & Training", count: "11" },
];

const RESOURCES = [
  {
    title: "QA Strategy Playbook",
    desc: "A 24-page field guide to setting up a quality program from scratch — risk matrices, test pyramids, and CI/CD gates included.",
    tag: "PDF · 24 pages",
  },
  {
    title: "Selenium Starter Kit",
    desc: "Production-grade Selenium WebDriver project skeleton with Page Object Model, parallel execution, and HTML reporting.",
    tag: "GitHub Repo",
  },
  {
    title: "JUnit 5 Pattern Library",
    desc: "Curated patterns for parameterized tests, lifecycle hooks, custom extensions, and Mockito best practices.",
    tag: "Open Source",
  },
  {
    title: "Load Test Workload Templates",
    desc: "JMeter and k6 templates modeled on real e-commerce, banking, and fintech workloads — ready to adapt.",
    tag: "Templates",
  },
];

const PROGRAMS = [
  {
    title: "Scholarship Program",
    desc: "We sponsor seats in our flagship cohorts for high-potential engineers from underserved African communities.",
    bullets: [
      "Two cohorts per year — Selenium and JUnit tracks",
      "Mentorship from senior engineers throughout the program",
      "Job-placement support with our partner network",
    ],
    cta: "Apply for a scholarship",
  },
  {
    title: "Open Curriculum",
    desc: "Our foundational training material is freely available to lecturers and bootcamps across the continent.",
    bullets: [
      "Slide decks, exercises, and rubrics — Creative Commons licensed",
      "Train-the-trainer sessions for institutional partners",
      "Quarterly content updates aligned with industry tools",
    ],
    cta: "Request the curriculum",
  },
  {
    title: "Research & Public Goods",
    desc: "We publish technical research and reference architectures that the African engineering community can build on.",
    bullets: [
      "AI evaluation frameworks for low-resource environments",
      "Performance baselines for common African hosting topologies",
      "Quarterly “State of QA in Africa” report",
    ],
    cta: "Read our research",
  },
];

const ENGAGEMENT_MODELS = [
  {
    title: "Strategic Partner",
    desc: "Long-term, exclusive partnerships with public-sector and enterprise clients. Joint roadmaps, dedicated teams, and shared KPIs.",
  },
  {
    title: "Delivery Partner",
    desc: "Co-deliver complex programs with system integrators and consultancies. We bring deep AI and QA capability to your team.",
  },
  {
    title: "Academic Partner",
    desc: "Universities, technical colleges, and bootcamps — we co-develop curriculum, host residencies, and place graduates.",
  },
];

const partnerSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  organization: z.string().trim().min(2, "Organization is required").max(150),
  email: z.string().trim().email("Enter a valid email").max(200),
  type: z.string().min(1),
  message: z.string().trim().min(30, "Tell us a bit more (min 30 chars)").max(2000),
});

const CommunityPage = () => {
  const [form, setForm] = useState({
    name: "",
    organization: "",
    email: "",
    type: "Strategic Partner",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = () => {
    const r = partnerSchema.safeParse(form);
    if (!r.success) {
      setErrors(
        Object.fromEntries(
          Object.entries(r.error.flatten().fieldErrors).map(([k, v]) => [k, (v as string[])[0]]),
        ),
      );
      return;
    }
    setErrors({});
    openWhatsApp(
      formatBookingMessage({
        name: form.name,
        company: form.organization,
        email: form.email,
        phone: "—",
        country: "—",
        services: [`Partnership: ${form.type}`],
        project: form.message,
        timeline: "Open",
        budget: "Partnership engagement",
        contact: "Email",
      }),
    );
    setSent(true);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-44 pb-28 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-hero opacity-30 dark:opacity-20 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none"><ParticleField density={40} /></div>
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="container relative z-10 max-w-4xl text-center px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 border border-black/10 dark:border-white/10 rounded-full text-[10px] font-mono uppercase tracking-[0.4em] text-foreground/75">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Community &amp; Partners
          </div>
          <h1 className="font-display font-bold text-5xl md:text-7xl leading-[1.08] tracking-tight mb-8 text-foreground animate-fade-in-up">
            Built with the people <span className="italic font-normal font-serif">we serve.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-12 leading-relaxed animate-fade-in-up animation-delay-200">
            We invest in the African engineering community and partner with
            organizations that share our standard for excellence — from ministries and multilaterals to universities and global technology firms.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 font-serif text-lg animate-fade-in-up animation-delay-400">
            <a
              href="#partner"
              className="group inline-flex items-center gap-2 text-primary font-semibold border-b border-primary/30 hover:border-primary pb-1 transition-all duration-300"
            >
              Become a Partner <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>
            <a
              href="#resources"
              className="text-muted-foreground hover:text-foreground border-b border-transparent hover:border-foreground pb-1 transition-all duration-300"
            >
              Free Resources
            </a>
          </div>
        </div>
      </section>

      {/* Partner categories */}
      <section className="py-24 border-y border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5">
        <div className="container px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-6">Our Partner Network</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground">
              Active across <span className="italic font-normal font-serif">six key sectors.</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PARTNERS.map((p, idx) => {
              const numStr = String(idx + 1).padStart(2, "0");
              return (
                <div key={p.name} className="flex items-start gap-5 border border-black/5 dark:border-white/5 bg-background rounded-2xl p-6 hover:border-primary/20 transition-all duration-300">
                  <div className="font-serif italic text-3xl text-primary/60 dark:text-primary/45 select-none font-normal">
                    {numStr}
                  </div>
                  <div>
                    <p className="font-display font-semibold text-foreground text-base">{p.name}</p>
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mt-1.5">
                      {p.count} active engagements
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Engagement models */}
      <section className="py-36 bg-background">
        <div className="container px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-6">How We Partner</p>
            <h2 className="font-display font-bold text-4xl md:text-6xl text-foreground leading-tight">
              Three pathways to <span className="italic font-normal font-serif">collaboration.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {ENGAGEMENT_MODELS.map((m, idx) => {
              const numStr = String(idx + 1).padStart(2, "0");
              return (
                <div key={m.title} className="group border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 rounded-2xl p-8 hover:border-primary/20 transition-all duration-300">
                  <div className="font-serif italic text-3xl text-primary/60 dark:text-primary/45 mb-6 select-none font-normal">
                    {numStr}
                  </div>
                  <h3 className="font-display font-semibold text-2xl mb-4 text-foreground">{m.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section id="resources" className="py-36 bg-black/5 dark:bg-white/5 border-t border-black/5 dark:border-white/5">
        <div className="container px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-6">Free Resources</p>
            <h2 className="font-display font-bold text-4xl md:text-6xl text-foreground leading-tight">
              Knowledge, <span className="italic font-normal font-serif">freely shared.</span>
            </h2>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
              Battle-tested tools and playbooks we use with enterprise clients — released to the community.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {RESOURCES.map((r, idx) => {
              const numStr = String(idx + 1).padStart(2, "0");
              return (
                <div key={r.title} className="border border-black/5 dark:border-white/5 bg-background rounded-2xl p-8 hover:border-primary/20 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start gap-4 mb-4">
                      <span className="font-serif italic text-2xl text-primary/60 dark:text-primary/45 select-none font-normal">
                        {numStr}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-display font-semibold text-xl text-foreground">{r.title}</h3>
                        <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-muted-foreground mt-1.5">{r.tag}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-8">{r.desc}</p>
                  </div>
                  <button
                    onClick={() => openWhatsApp(`Hi ChanAI — please send me the "${r.title}" resource.`)}
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary hover:text-primary/80 transition-colors border-b border-primary/30 pb-0.5 self-start"
                  >
                    Request Access
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <BlogSection />

      {/* Programs */}
      <section className="py-36 bg-background border-t border-black/5 dark:border-white/5">
        <div className="container px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-6">Community Programs</p>
            <h2 className="font-display font-bold text-4xl md:text-6xl text-foreground leading-tight">
              Investing in <span className="italic font-normal font-serif">African engineering.</span>
            </h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {PROGRAMS.map((p, idx) => (
              <div key={p.title} className="border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 rounded-2xl p-8 flex flex-col justify-between">
                <div>
                  <div className="font-serif italic text-3xl text-primary/60 dark:text-primary/45 mb-6 select-none font-normal">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-display font-semibold text-2xl text-foreground mb-4">{p.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{p.desc}</p>
                  <ul className="space-y-3 mb-8">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-foreground/80">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => openWhatsApp(`Hi ChanAI — I'm interested in: ${p.title}.`)}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary hover:text-primary/80 transition-colors border-b border-primary/30 pb-0.5 self-start"
                >
                  {p.cta} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stay Connected Channels */}
      <section className="py-24 bg-black/5 dark:bg-white/5 border-t border-black/5 dark:border-white/5">
        <div className="container max-w-4xl px-6">
          <div className="text-center mb-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-6">Stay Connected</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground">
              Follow our <span className="italic font-normal font-serif">ongoing work.</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "LinkedIn", href: "#" },
              { label: "GitHub", href: "#" },
              { label: "YouTube", href: "#" },
              { label: "Newsletter", href: "mailto:hello@chanai.tech" },
            ].map((c) => {
              return (
                <a
                  key={c.label}
                  href={c.href}
                  className="border border-black/5 dark:border-white/5 bg-background rounded-2xl p-6 flex flex-col items-center justify-center hover:border-primary/20 hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="text-sm font-semibold text-foreground">{c.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner form */}
      <section id="partner" className="py-36 border-t border-black/5 dark:border-white/5">
        <div className="container max-w-3xl px-6">
          <div className="text-center mb-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-6">Become a Partner</p>
            <h2 className="font-display font-bold text-4xl md:text-6xl text-foreground leading-tight">
              Let's engineer the <span className="italic font-normal font-serif">next decade together.</span>
            </h2>
          </div>

          {!sent ? (
            <div className="border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 rounded-2xl p-8 md:p-10 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Full name *</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Doe" className="bg-background" />
                  {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Organization *</Label>
                  <Input value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} placeholder="Acme Inc." className="bg-background" />
                  {errors.organization && <p className="text-xs text-destructive">{errors.organization}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Work email *</Label>
                  <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className="bg-background" />
                  {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Partnership type *</Label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none"
                  >
                    {ENGAGEMENT_MODELS.map((m) => (
                      <option key={m.title}>{m.title}</option>
                    ))}
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Tell us about the opportunity *</Label>
                <Textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="What are you trying to achieve, and where could ChanAI Tech add value?"
                  className="bg-background"
                />
                {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                <p className="text-xs text-muted-foreground max-w-sm">
                  We respond within one business day. Your details stay strictly confidential.
                </p>
                <Button variant="electric" size="lg" onClick={submit} className="w-full sm:w-auto">
                  <Send className="w-4 h-4 mr-2" /> Send Inquiry
                </Button>
              </div>
            </div>
          ) : (
            <div className="border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 rounded-2xl p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-electric mx-auto mb-6 flex items-center justify-center shadow-glow animate-scale-in">
                <Check className="w-10 h-10 text-primary-foreground" />
              </div>
              <h2 className="font-display font-bold text-3xl text-foreground mb-3">Inquiry received</h2>
              <p className="text-muted-foreground mb-8">
                Thank you. Our partnerships team will be in touch within one business day.
              </p>
              <Button variant="electric" asChild>
                <Link to="/">Return Home</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CommunityPage;
