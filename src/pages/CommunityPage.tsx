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
import {
  ArrowRight,
  BookOpen,
  Users,
  GraduationCap,
  Handshake,
  Globe2,
  Building2,
  Landmark,
  Cpu,
  ShieldCheck,
  Send,
  Check,
  Github,
  Linkedin,
  Youtube,
  Mail,
  Download,
  Code2,
  FlaskConical,
  Activity,
} from "lucide-react";
import { openWhatsApp, formatBookingMessage } from "@/lib/whatsapp";

/* Partner categories — abstract logos rendered as monogram tiles. */
const PARTNERS = [
  { name: "Government & Public Sector", icon: Landmark, count: "12+" },
  { name: "Financial Services", icon: Building2, count: "9" },
  { name: "Telecom & Infrastructure", icon: Globe2, count: "6" },
  { name: "Technology & SaaS", icon: Cpu, count: "18" },
  { name: "Healthcare & NGOs", icon: ShieldCheck, count: "7" },
  { name: "Education & Training", icon: GraduationCap, count: "11" },
];

const RESOURCES = [
  {
    icon: BookOpen,
    title: "QA Strategy Playbook",
    desc: "A 24-page field guide to setting up a quality program from scratch — risk matrices, test pyramids, and CI/CD gates included.",
    tag: "PDF · 24 pages",
  },
  {
    icon: Code2,
    title: "Selenium Starter Kit",
    desc: "Production-grade Selenium WebDriver project skeleton with Page Object Model, parallel execution, and HTML reporting.",
    tag: "GitHub Repo",
  },
  {
    icon: FlaskConical,
    title: "JUnit 5 Pattern Library",
    desc: "Curated patterns for parameterized tests, lifecycle hooks, custom extensions, and Mockito best practices.",
    tag: "Open Source",
  },
  {
    icon: Activity,
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
    icon: Handshake,
    title: "Strategic Partner",
    desc: "Long-term, exclusive partnerships with public-sector and enterprise clients. Joint roadmaps, dedicated teams, and shared KPIs.",
  },
  {
    icon: Users,
    title: "Delivery Partner",
    desc: "Co-deliver complex programs with system integrators and consultancies. We bring deep AI and QA capability to your team.",
  },
  {
    icon: GraduationCap,
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
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0"><ParticleField density={70} /></div>
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/15 rounded-full blur-[150px]" />

        <div className="container relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 glass rounded-full text-[10px] font-mono uppercase tracking-[0.4em] text-white/75">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Community &amp; Partners
          </div>
          <h1 className="font-display font-bold text-5xl md:text-7xl leading-[1.02] tracking-tight mb-6">
            <span className="text-white">Built with the people</span>
            <br />
            <span className="text-electric-gradient">we serve.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-white/70 mb-10">
            We invest in the African engineering community and partner with
            organizations that share our standard for excellence — from
            ministries and multilaterals to universities and global technology
            firms.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="electric" size="lg" asChild>
              <a href="#partner">Become a Partner <ArrowRight /></a>
            </Button>
            <Button variant="glass" size="lg" asChild>
              <a href="#resources">Free Resources</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Partner categories */}
      <section className="py-20 border-y border-white/5 bg-[hsl(var(--navy-deep))]/60">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-4">Our Partner Network</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
              Trusted across <span className="text-electric-gradient">six sectors.</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PARTNERS.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.name} className="glass rounded-2xl p-6 flex items-center gap-4 hover:border-primary/40 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-white text-sm">{p.name}</p>
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/50 mt-1">
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
      <section className="py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-4">How We Partner</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight">
              Three ways to <span className="text-electric-gradient">work together.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {ENGAGEMENT_MODELS.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.title} className="group glass rounded-2xl p-8 hover:border-primary/40 hover:-translate-y-1 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-gradient-electric flex items-center justify-center shadow-glow mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-semibold text-xl mb-3 text-white">{m.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{m.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section id="resources" className="py-24 bg-secondary/15">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-4">Free Resources</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight">
              Knowledge, freely <span className="text-electric-gradient">shared.</span>
            </h2>
            <p className="text-white/70 mt-5">
              Battle-tested materials we use with paying clients — released to
              the community, no email wall.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {RESOURCES.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.title} className="glass rounded-2xl p-7 hover:border-primary/40 transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-lg text-white">{r.title}</h3>
                      <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/45 mt-1">{r.tag}</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed mb-5">{r.desc}</p>
                  <button
                    onClick={() => openWhatsApp(`Hi ChanAI — please send me the "${r.title}" resource.`)}
                    className="inline-flex items-center gap-2 text-sm text-primary hover:text-white transition-colors font-medium"
                  >
                    <Download className="w-4 h-4" /> Request access
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog */}
      <BlogSection />

      {/* Programs */}
      <section className="py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-4">Community Programs</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight">
              Investing in <span className="text-electric-gradient">African engineering.</span>
            </h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {PROGRAMS.map((p) => (
              <div key={p.title} className="glass-strong rounded-2xl p-8 flex flex-col">
                <h3 className="font-display font-semibold text-xl text-white mb-3">{p.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-5">{p.desc}</p>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-white/80">
                      <span className="mt-0.5 w-4 h-4 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-primary" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openWhatsApp(`Hi ChanAI — I'm interested in: ${p.title}.`)}
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-white transition-colors font-medium"
                >
                  {p.cta} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Channels */}
      <section className="py-20 bg-secondary/15">
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-4">Stay Connected</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
              Follow our <span className="text-electric-gradient">work.</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Linkedin, label: "LinkedIn", href: "#" },
              { icon: Github, label: "GitHub", href: "#" },
              { icon: Youtube, label: "YouTube", href: "#" },
              { icon: Mail, label: "Newsletter", href: "mailto:hello@chanai.tech" },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.label}
                  href={c.href}
                  className="glass rounded-2xl p-6 flex flex-col items-center gap-3 hover:border-primary/40 hover:-translate-y-1 transition-all"
                >
                  <Icon className="w-6 h-6 text-primary" />
                  <span className="text-sm font-medium text-white">{c.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner form */}
      <section id="partner" className="py-24">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-4">Become a Partner</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight">
              Let&rsquo;s build the next <span className="text-electric-gradient">decade together.</span>
            </h2>
          </div>

          {!sent ? (
            <div className="glass-strong rounded-2xl p-8 md:p-10 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-white/65">Full name *</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Doe" />
                  {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-white/65">Organization *</Label>
                  <Input value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} placeholder="Acme Inc." />
                  {errors.organization && <p className="text-xs text-destructive">{errors.organization}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-white/65">Work email *</Label>
                  <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" />
                  {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-white/65">Partnership type *</Label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    {ENGAGEMENT_MODELS.map((m) => (
                      <option key={m.title}>{m.title}</option>
                    ))}
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-mono uppercase tracking-wider text-white/65">Tell us about the opportunity *</Label>
                <Textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="What are you trying to achieve, and where could ChanAI Tech add value?"
                />
                {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
                <p className="text-xs text-white/50">
                  We respond within one business day. Your details stay confidential.
                </p>
                <Button variant="electric" size="lg" onClick={submit}>
                  <Send /> Send partnership inquiry
                </Button>
              </div>
            </div>
          ) : (
            <div className="glass-strong rounded-2xl p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-electric mx-auto mb-6 flex items-center justify-center shadow-glow animate-scale-in">
                <Check className="w-10 h-10 text-primary-foreground" />
              </div>
              <h2 className="font-display font-bold text-3xl text-white mb-3">Inquiry received</h2>
              <p className="text-white/70 mb-8">
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
