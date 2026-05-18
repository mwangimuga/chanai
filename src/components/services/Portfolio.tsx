import { useState, useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface Project {
  title: string;
  outcome: string;
  category: "AI Agents" | "QA" | "Training" | "Automation";
  tags: string[];
}

const PROJECTS: Project[] = [
  { title: "FinTech QA Overhaul", outcome: "82% reduction in production incidents", category: "QA", tags: ["Selenium", "JUnit", "CI/CD"] },
  { title: "AI Support Agent", outcome: "65% faster ticket resolution", category: "AI Agents", tags: ["LangChain", "OpenAI", "RAG"] },
  { title: "E-Commerce Load Test", outcome: "Handles 50,000 concurrent users", category: "Automation", tags: ["JMeter", "k6", "AWS"] },
  { title: "Developer Bootcamp", outcome: "25 engineers certified", category: "Training", tags: ["Selenium", "Java", "Cohort"] },
  { title: "API Test Automation", outcome: "1,200 test cases automated", category: "Automation", tags: ["REST Assured", "JUnit", "Jenkins"] },
  { title: "Mobile App QA", outcome: "Released with 0 critical bugs", category: "QA", tags: ["Appium", "TestNG", "Android"] },
  { title: "Internal Knowledge Agent", outcome: "Cut HR queries by 70%", category: "AI Agents", tags: ["Claude", "Vector DB", "Slack"] },
  { title: "Corporate AI Workshop", outcome: "120 leaders trained on AI tooling", category: "Training", tags: ["Workshop", "Strategy"] },
];

const FILTERS = ["All", "AI Agents", "QA", "Automation", "Training"] as const;

const Portfolio = () => {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll<HTMLElement>("[data-card]");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 20, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.05, ease: "power3.out" }
    );
  }, [filter]);

  // First-paint reveal
  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: gridRef.current!,
        start: "top 85%",
        once: true,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 bg-secondary/20">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">Our Work</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-gradient mb-4">
            Projects That Speak for Themselves
          </h2>
          <p className="text-muted-foreground">Real outcomes from real engagements across Africa.</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-mono uppercase tracking-wider border transition-all ${
                filter === f
                  ? "border-primary bg-primary/15 text-foreground shadow-glow"
                  : "border-border bg-card/40 text-muted-foreground hover:border-primary/40"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <article
              key={p.title}
              data-card
              className="group glass rounded-2xl p-6 hover:border-primary/40 hover:-translate-y-1 transition-all relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/15 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <span className="inline-block text-[10px] font-mono uppercase tracking-wider text-primary mb-3">
                  {p.category}
                </span>
                <h3 className="font-display font-semibold text-xl mb-3">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-5">{p.outcome}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-md bg-secondary text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
