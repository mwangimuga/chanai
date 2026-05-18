import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const LAYERS = [
  { label: "E2E", pct: "10%", width: "30%", color: "hsl(var(--accent))" },
  { label: "Integration", pct: "20%", width: "55%", color: "hsl(var(--primary-glow))" },
  { label: "Unit (JUnit)", pct: "70%", width: "85%", color: "hsl(var(--primary))" },
];

const TestPyramid = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const bars = el.querySelectorAll<HTMLElement>("[data-pyramid-bar]");
    const ctx = gsap.context(() => {
      gsap.set(bars, { scaleX: 0, opacity: 0, transformOrigin: "center center" });
      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        once: true,
        onEnter: () => gsap.to(bars, { scaleX: 1, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power3.out" }),
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="rounded-2xl glass p-6 md:p-10 flex flex-col items-center gap-3">
      {LAYERS.map((l, i) => (
        <div
          key={i}
          data-pyramid-bar
          className="flex items-center justify-between rounded-lg px-4 py-3 text-xs font-mono uppercase tracking-wider"
          style={{ width: l.width, background: `${l.color}25`, border: `1px solid ${l.color}` }}
        >
          <span>{l.label}</span>
          <span className="text-foreground/80">{l.pct}</span>
        </div>
      ))}
      <p className="text-xs text-muted-foreground mt-3">More tests at the base = faster, cheaper, more reliable.</p>
    </div>
  );
};

export default TestPyramid;
