import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const STACK = [
  { group: "Test Automation", items: ["Selenium", "TestNG", "JUnit 5", "Playwright", "Appium", "REST Assured"] },
  { group: "Performance", items: ["JMeter", "k6", "Gatling", "Apache Bench"] },
  { group: "AI & Agents", items: ["LangChain", "CrewAI", "OpenAI", "Anthropic", "Gemini", "Vector DBs"] },
  { group: "Languages", items: ["Java", "Python", "TypeScript", "JavaScript"] },
  { group: "DevOps & Cloud", items: ["GitHub Actions", "Jenkins", "Docker", "AWS", "Postman"] },
];

const TechStack = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("[data-tech]");
    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y: 16, scale: 0.9 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        once: true,
        onEnter: () =>
          gsap.to(items, { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.03, ease: "power3.out" }),
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">Stack</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-gradient">
            Technologies We Master
          </h2>
        </div>
        <div ref={ref} className="space-y-8 max-w-5xl mx-auto">
          {STACK.map((g) => (
            <div key={g.group}>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-3">{g.group}</p>
              <div className="flex flex-wrap gap-2">
                {g.items.map((i) => (
                  <span
                    key={i}
                    data-tech
                    className="px-4 py-2 rounded-lg glass text-sm hover:border-primary/40 hover:-translate-y-0.5 hover:text-electric-gradient transition-all cursor-default"
                  >
                    {i}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
