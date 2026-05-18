import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface Node {
  label: string;
  sub?: string;
}

const TechFlow = ({ nodes, accent = "primary" }: { nodes: Node[]; accent?: "primary" | "accent" }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("[data-flow-node]");
    const arrows = el.querySelectorAll<SVGPathElement>("[data-flow-arrow]");

    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y: 24 });
      gsap.set(arrows, { strokeDasharray: 8, strokeDashoffset: 200, opacity: 0 });

      ScrollTrigger.batch(el, {
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(items, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" });
          gsap.to(arrows, { strokeDashoffset: 0, opacity: 1, duration: 0.8, stagger: 0.12, delay: 0.2, ease: "power2.out" });
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative w-full overflow-hidden rounded-2xl glass p-6 md:p-8">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="relative flex flex-wrap md:flex-nowrap items-center justify-center gap-3 md:gap-2">
        {nodes.map((n, i) => (
          <div key={i} className="flex items-center gap-2 md:gap-1">
            <div
              data-flow-node
              className={`relative px-3 py-3 md:px-4 md:py-4 rounded-xl bg-card/80 border min-w-[110px] md:min-w-[130px] text-center ${
                accent === "primary" ? "border-primary/40" : "border-accent/40"
              }`}
            >
              <div className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-foreground">{n.label}</div>
              {n.sub && <div className="text-[9px] md:text-[10px] text-muted-foreground mt-1">{n.sub}</div>}
              <div className={`absolute inset-0 rounded-xl ${accent === "primary" ? "bg-primary/5" : "bg-accent/5"} blur-sm -z-10`} />
            </div>
            {i < nodes.length - 1 && (
              <svg width="28" height="12" viewBox="0 0 28 12" className="hidden md:block shrink-0">
                <path
                  data-flow-arrow
                  d="M2 6 L24 6"
                  stroke="hsl(var(--primary))"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <path d="M22 2 L26 6 L22 10" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechFlow;
