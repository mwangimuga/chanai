import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleField from "@/components/shared/ParticleField";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import TechFlow from "@/components/services/TechFlow";
import TestPyramid from "@/components/services/TestPyramid";
import LoadChart from "@/components/services/LoadChart";
import TechStack from "@/components/services/TechStack";

const Portfolio = lazy(() => import("@/components/services/Portfolio"));

interface ServiceBlock {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  benefits: string[];
  deliverables: string[];
  outcomes: string[];
  timeline: string;
  engagement: string;
  visual: React.ReactNode;
  caseTitle: string;
  caseOutcome: string;
}

const SERVICES: ServiceBlock[] = [
  {
    id: "ai-agents",
    number: "01",
    category: "AI Engineering",
    title: "AI Agent Development",
    description:
      "We design, architect, and deploy custom AI agents powered by large language models and modern AI frameworks. From customer service bots to autonomous data pipelines — we build agents that think, act, and learn.",
    benefits: [
      "Reduce operational costs by up to 70% through intelligent automation",
      "Deploy in days, not months — our rapid agent framework",
      "Full integration with your existing systems and APIs",
    ],
    deliverables: [
      "Solution architecture document and system design diagrams",
      "Production-ready agent codebase with full source ownership",
      "Secure API integrations with your CRM, ERP, or data systems",
      "Evaluation suite with regression tests and quality scorecards",
      "Observability dashboard for usage, latency, and accuracy",
      "Deployment to your cloud (AWS, GCP, Azure) or ours",
      "Runbook, handover documentation, and admin training",
    ],
    outcomes: [
      "Measurable cost reduction within the first 90 days of launch",
      "Round-the-clock automated workflows with human-in-the-loop guardrails",
      "Internal team trained to maintain and extend the system",
    ],
    timeline: "4–10 weeks",
    engagement: "Fixed-scope build · Optional retainer for evolution",
    visual: (
      <TechFlow
        nodes={[
          { label: "User", sub: "Web · API · Slack" },
          { label: "Gateway", sub: "Auth · Rate" },
          { label: "Orchestrator", sub: "LangChain" },
          { label: "LLM", sub: "GPT · Claude" },
          { label: "Tools", sub: "DB · Web · APIs" },
          { label: "Response" },
        ]}
      />
    ),
    caseTitle: "Automated Customer Support Agent",
    caseOutcome: "Reduced ticket resolution time by 65% for a Kigali-based fintech.",
  },
  {
    id: "qa-consulting",
    number: "02",
    category: "Quality Engineering",
    title: "QA Consulting",
    description:
      "Quality isn't an afterthought — it's engineered in. Our QA consultants embed with your team to design test strategies, build automation pipelines, and establish quality gates that prevent bugs from ever reaching production.",
    benefits: [
      "Comprehensive test coverage strategy (unit, integration, E2E, performance)",
      "QA process audit and gap analysis included",
      "Ongoing retainer or project-based engagement models",
    ],
    deliverables: [
      "Quality strategy document tailored to your product and risk profile",
      "Test plan covering unit, integration, end-to-end, and non-functional tiers",
      "CI/CD quality gates with coverage, static analysis, and security checks",
      "Defect-tracking workflow and severity taxonomy",
      "Reusable test data management and environment strategy",
      "Quarterly QA scorecard with KPIs and trend analysis",
    ],
    outcomes: [
      "Defect leakage to production reduced by 70–90%",
      "Faster release cadence with predictable quality",
      "A measurable, executive-friendly view of product quality",
    ],
    timeline: "6–12 weeks initial · Optional ongoing retainer",
    engagement: "Embedded consultant · Fractional QA leadership",
    visual: <TestPyramid />,
    caseTitle: "QA Transformation",
    caseOutcome: "Helped a SaaS company reduce production bugs by 82% in 6 months.",
  },
  {
    id: "selenium",
    number: "03",
    category: "Training & Automation",
    title: "Selenium WebDriver Training",
    description:
      "Master the world's most widely-used web test automation framework. Our Selenium training goes from zero to professional — covering Java/Python bindings, Page Object Model, CI/CD integration, and advanced techniques.",
    benefits: [
      "40+ hours of hands-on labs and exercises",
      "Real project: build a full test suite from scratch",
      "Certificate of completion + ongoing community access",
    ],
    deliverables: [
      "Structured curriculum with daily learning objectives",
      "Pre-configured lab environment (Java/Python, IDE, browsers, drivers)",
      "Workbook with 40+ guided exercises and solutions",
      "Capstone project: end-to-end test framework for a real web app",
      "CI/CD pipeline template (GitHub Actions / Jenkins) with reporting",
      "Verified certificate of completion and reference letter on request",
    ],
    outcomes: [
      "Engineers ship their first production automation suite within 2 weeks",
      "Reduced manual regression effort by 60–80%",
      "Confident in-house automation capability without vendor lock-in",
    ],
    timeline: "3–5 weeks · Cohort or in-company format",
    engagement: "Public cohort · Private corporate training",
    visual: (
      <TechFlow
        accent="accent"
        nodes={[
          { label: "Setup" },
          { label: "Locators" },
          { label: "Waits" },
          { label: "POM" },
          { label: "TestNG" },
          { label: "CI/CD" },
          { label: "Reporting" },
        ]}
      />
    ),
    caseTitle: "Corporate Training",
    caseOutcome: "Upskilled a 25-person dev team in Nairobi — 100% passed certification.",
  },
  {
    id: "junit",
    number: "04",
    category: "Quality Engineering",
    title: "JUnit & Unit Testing Mastery",
    description:
      "Unit tests are the foundation of reliable software. We teach teams to write clean, maintainable unit tests with JUnit 5, Mockito, and TDD principles that make refactoring fearless.",
    benefits: [
      "JUnit 5 + Mockito deep dive with real codebases",
      "Test-driven development workflows that stick",
      "Coverage strategy: meaningful, not vanity metrics",
    ],
    deliverables: [
      "JUnit 5 + Mockito + AssertJ workshop materials",
      "Refactoring playbook for legacy code under test",
      "TDD katas and pair-programming exercises",
      "Coverage policy template with quality (not quantity) thresholds",
      "Code review checklist for reviewing tests",
      "Optional 30-day post-training mentorship",
    ],
    outcomes: [
      "Test suites become assets, not maintenance burdens",
      "Defects caught earlier — at developer desks, not in QA",
      "Refactoring becomes routine instead of risky",
    ],
    timeline: "2–4 weeks intensive · Optional mentorship",
    engagement: "Workshop · Embedded coaching",
    visual: (
      <TechFlow
        nodes={[
          { label: "Spec" },
          { label: "Red", sub: "Failing test" },
          { label: "Green", sub: "Make it pass" },
          { label: "Refactor" },
          { label: "Ship" },
        ]}
      />
    ),
    caseTitle: "Banking Core Refactor",
    caseOutcome: "Migrated 80k LOC to test-first — zero regressions in 12 weeks.",
  },
  {
    id: "load-testing",
    number: "05",
    category: "Performance",
    title: "Load & Performance Testing",
    description:
      "Is your application ready for Black Friday traffic? Our load testing service uses Apache JMeter, k6, and Gatling to simulate thousands of concurrent users and expose performance bottlenecks before they cost you revenue.",
    benefits: [
      "Realistic load profiles modeled on your actual traffic",
      "Bottleneck root-cause analysis (DB, app, infra)",
      "Tuning recommendations + retest validation",
    ],
    deliverables: [
      "Workload model derived from production telemetry or business projections",
      "Reusable test scripts in JMeter, k6, or Gatling",
      "Baseline, soak, stress, and spike test executions",
      "Bottleneck root-cause analysis across app, database, and infrastructure",
      "Prioritized tuning recommendations with effort and impact estimates",
      "Retest report validating remediation and certifying capacity",
    ],
    outcomes: [
      "Documented, evidence-based capacity for peak events",
      "Cost savings from right-sized infrastructure",
      "Confidence to launch high-stakes campaigns without surprises",
    ],
    timeline: "3–6 weeks per engagement",
    engagement: "Project-based · Pre-launch certification",
    visual: <LoadChart />,
    caseTitle: "E-Commerce Black Friday Prep",
    caseOutcome: "Scaled checkout to 50,000 concurrent users with 0.02% errors.",
  },
  {
    id: "training",
    number: "06",
    category: "Training & Mentorship",
    title: "Corporate AI & Automation Training",
    description:
      "From executives to developers — we design bespoke training programs that upskill your entire organization on AI tools, automation mindset, and modern QA practices. Delivered in-person in Kigali or virtually anywhere in Africa.",
    benefits: [
      "Workshops · Bootcamps · On-site Residencies · Virtual Cohorts",
      "Custom curriculum aligned with your stack and goals",
      "Post-training mentorship to make learning stick",
    ],
    deliverables: [
      "Skills audit and learner persona analysis",
      "Bespoke curriculum mapped to your tools, stack, and goals",
      "Live cohort delivery (in-person Kigali or virtual across Africa)",
      "Hands-on capstone project tied to a real business problem",
      "Learning portal with recordings, exercises, and reference material",
      "Manager dashboards tracking adoption and proficiency",
      "Optional 60–90 day post-training mentorship",
    ],
    outcomes: [
      "Measurable shift in team capability within one quarter",
      "Higher retention — engineers who feel invested in",
      "Internal champions who drive practices long after we leave",
    ],
    timeline: "Custom · 1-day briefings to multi-month residencies",
    engagement: "On-site · Virtual · Hybrid",
    visual: (
      <TechFlow
        accent="accent"
        nodes={[
          { label: "Discover", sub: "Skills audit" },
          { label: "Design", sub: "Curriculum" },
          { label: "Deliver", sub: "Cohort" },
          { label: "Practice", sub: "Real project" },
          { label: "Mentor", sub: "Ongoing" },
        ]}
      />
    ),
    caseTitle: "Pan-African AI Bootcamp",
    caseOutcome: "120 leaders trained across 4 countries in a single quarter.",
  },
];

const ServicesPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-44 pb-24 overflow-hidden min-h-[60vh] flex items-center bg-background">
        <div className="absolute inset-0 bg-gradient-hero opacity-30 dark:opacity-20 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none"><ParticleField density={40} /></div>
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="container relative z-10 max-w-4xl text-center px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 border border-black/10 dark:border-white/10 rounded-full text-[10px] font-mono uppercase tracking-[0.4em] text-foreground/75">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Services
          </div>
          <h1 className="font-display font-bold text-5xl md:text-7xl leading-[1.08] tracking-tight mb-8 text-foreground animate-fade-in-up">
            Engineering excellence. <span className="italic font-normal font-serif">At every layer.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-12 leading-relaxed animate-fade-in-up animation-delay-200">
            From strategic integration and autonomous agents to rigorous quality
            assurance — we build high-performance systems that scale.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono tracking-widest uppercase animate-fade-in-up animation-delay-400">
            {SERVICES.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-4 py-2 border border-black/5 dark:border-white/5 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-foreground transition-all duration-300"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Service detail sections */}
      <div className="relative">
        {SERVICES.map((s, i) => {
          const reverse = i % 2 === 1;
          return (
            <section
              key={s.id}
              id={s.id}
              className={`py-32 md:py-44 relative bg-background border-t border-black/5 dark:border-white/5`}
            >
              <div className="container px-6">
                <div className={`grid lg:grid-cols-2 gap-16 lg:gap-24 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  {/* Copy */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground">{s.number}</span>
                      <span className="h-px w-10 bg-black/10 dark:bg-white/10" />
                      <span className="text-xs font-mono uppercase tracking-wider text-primary">{s.category}</span>
                    </div>
                    
                    <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground leading-tight mb-8">
                      {s.title}
                    </h2>
                    
                    <p className="text-muted-foreground text-lg leading-relaxed mb-10">{s.description}</p>

                    <ul className="space-y-4 mb-10">
                      {s.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-4">
                          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span className="text-base text-foreground/90">{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Engagement meta */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 rounded-xl p-5">
                        <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-2">Timeline</p>
                        <p className="text-base text-foreground font-semibold">{s.timeline}</p>
                      </div>
                      <div className="border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 rounded-xl p-5">
                        <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-2">Engagement</p>
                        <p className="text-base text-foreground font-semibold">{s.engagement}</p>
                      </div>
                    </div>

                    {/* Expandable deliverables + outcomes */}
                    <Accordion type="single" collapsible className="mb-8 border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 rounded-xl px-6">
                      <AccordionItem value="deliverables" className="border-b border-black/5 dark:border-white/5">
                        <AccordionTrigger className="hover:no-underline py-5 text-left [&>svg]:text-primary font-display font-semibold text-foreground text-base">
                          What You Get — Deliverables
                        </AccordionTrigger>
                        <AccordionContent className="pb-6">
                          <ul className="space-y-3 pt-2">
                            {s.deliverables.map((d) => (
                              <li key={d} className="flex items-start gap-3">
                                <span className="mt-2 w-1.5 h-1.5 rounded-sm bg-primary shrink-0" />
                                <span className="text-sm text-foreground/85 leading-relaxed">{d}</span>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="outcomes" className="border-0">
                        <AccordionTrigger className="hover:no-underline py-5 text-left [&>svg]:text-primary font-display font-semibold text-foreground text-base">
                          Engagement Outcomes
                        </AccordionTrigger>
                        <AccordionContent className="pb-6">
                          <ul className="space-y-3 pt-2">
                            {s.outcomes.map((o) => (
                              <li key={o} className="flex items-start gap-3">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                <span className="text-sm text-foreground/85 leading-relaxed">{o}</span>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    {/* Case study */}
                    <div className="border-l-2 border-primary bg-black/5 dark:bg-white/5 rounded-r-xl p-6 mb-10">
                      <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary mb-2">Case Study</p>
                      <p className="font-display font-semibold mb-2 text-foreground">{s.caseTitle}</p>
                      <p className="text-sm text-muted-foreground">{s.caseOutcome}</p>
                    </div>

                    <Link
                      to="/book"
                      className="group inline-flex items-center gap-2 text-primary font-serif text-lg font-semibold border-b border-primary/30 hover:border-primary pb-1 transition-all duration-300"
                    >
                      Book This Service <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </Link>
                  </div>

                  {/* Visual */}
                  <div className="w-full">{s.visual}</div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Portfolio */}
      <Suspense fallback={<div className="h-40" />}>
        <Portfolio />
      </Suspense>

      {/* Tech stack */}
      <TechStack />

      {/* How We Engage — 5 step process */}
      <section className="py-36 relative bg-background border-t border-black/5 dark:border-white/5">
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
        <div className="container relative z-10 px-6">
          <div className="max-w-3xl mx-auto text-center mb-24">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-6">How We Engage</p>
            <h2 className="font-display font-bold text-4xl md:text-6xl text-foreground mb-6 leading-tight">
              A predictable process <span className="italic font-normal font-serif">for complex systems.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
              Five clearly-defined stages from our first discovery call to long-term engineering partnership.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              { step: "01", title: "Discovery Call", desc: "30-min consult to understand goals, constraints, and success criteria.", duration: "30 min · Free" },
              { step: "02", title: "Scoping & Proposal", desc: "Detailed scope, timeline, deliverables, and fixed-price proposal.", duration: "3–5 business days" },
              { step: "03", title: "Build & Iterate", desc: "Weekly demos, transparent progress, your team in the loop.", duration: "Per project plan" },
              { step: "04", title: "Launch & Handover", desc: "Production deployment, full documentation, team enablement.", duration: "1–2 weeks" },
              { step: "05", title: "Ongoing Partnership", desc: "Optional retainer for evolution, training, or support.", duration: "Monthly · Cancel anytime" },
            ].map((s) => {
              return (
                <div
                  key={s.step}
                  className="group relative flex flex-col justify-between items-start border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300"
                >
                  <div>
                    <div className="font-serif italic text-3xl text-primary/60 dark:text-primary/45 mb-6 select-none font-normal">
                      {s.step}
                    </div>
                    <h3 className="font-display font-semibold text-xl text-foreground mb-3">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{s.desc}</p>
                  </div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary/80 mt-auto">{s.duration}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-36 bg-black/5 dark:bg-white/5 border-t border-black/5 dark:border-white/5">
        <div className="container max-w-4xl px-6">
          <div className="text-center mb-20">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-6">FAQ</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground">
              Questions, <span className="italic font-normal font-serif">answered.</span>
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {[
              { q: "What's the typical engagement size?", a: "We work on engagements ranging from 2-week sprints to 6-month embedded residencies. Most projects sit in the 6–12 week range. We'll tell you on our first call which model fits best." },
              { q: "Do you work with international clients?", a: "Yes. We deliver across Africa and globally — virtually or on-site. Our team is fluent in English, French, and Kinyarwanda, and we routinely collaborate with teams in EMEA, North America, and the Middle East." },
              { q: "How do you price engagements?", a: "We default to fixed-scope, fixed-price proposals so you know exactly what you're paying for. For ongoing work, we offer monthly retainers. We do not bill by the hour for production work — outcomes matter, not timesheets." },
              { q: "Who owns the code and IP we build?", a: "You do. 100%. All source code, models, prompts, training material, and documentation are transferred to your organization on delivery. We retain no rights and impose no licensing restrictions." },
              { q: "Can you sign NDAs and data-processing agreements?", a: "Absolutely — and we expect to. We routinely sign mutual NDAs, DPAs, and security questionnaires before sensitive information is exchanged. Enterprise procurement-friendly contracts are our default." },
              { q: "What if we already have an internal team?", a: "Even better. Our preferred mode is augmentation, not replacement. We embed alongside your engineers, transfer knowledge as we go, and aim to leave your team stronger than we found it." },
            ].map((item, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`} className="border border-black/5 dark:border-white/5 bg-background rounded-xl px-6">
                <AccordionTrigger className="hover:no-underline py-5 text-left text-foreground font-display font-semibold text-base md:text-lg [&>svg]:text-primary">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-muted-foreground leading-relaxed text-sm md:text-base">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-40 relative overflow-hidden bg-background border-t border-black/5 dark:border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] animate-glow-pulse pointer-events-none" />
        <div className="container relative z-10 max-w-3xl text-center px-6">
          <h2 className="font-display font-bold text-4xl md:text-6xl text-foreground mb-8 leading-tight">
            Ready to build something <span className="italic font-normal font-serif">extraordinary?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            Join enterprise teams that trust ChanAI Tech to engineer their digital systems and automation.
          </p>
          <div className="flex flex-wrap gap-12 justify-center font-serif text-lg">
            <Link
              to="/book"
              className="group inline-flex items-center gap-2 text-primary font-semibold border-b border-primary/30 hover:border-primary pb-1 transition-all duration-300"
            >
              Book a Consultation <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
            <Link
              to="/about"
              className="text-muted-foreground hover:text-foreground border-b border-transparent hover:border-foreground pb-1 transition-all duration-300"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ServicesPage;
