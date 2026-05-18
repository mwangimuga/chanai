import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Animated load test chart: baseline spike vs optimized smooth
const LoadChart = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const baseline = el.querySelector<SVGPathElement>("#baseline");
    const optimized = el.querySelector<SVGPathElement>("#optimized");
    if (!baseline || !optimized) return;

    const bLen = baseline.getTotalLength();
    const oLen = optimized.getTotalLength();
    gsap.set(baseline, { strokeDasharray: bLen, strokeDashoffset: bLen });
    gsap.set(optimized, { strokeDasharray: oLen, strokeDashoffset: oLen });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(baseline, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" });
          gsap.to(optimized, { strokeDashoffset: 0, duration: 1.6, delay: 0.4, ease: "power2.inOut" });
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="rounded-2xl glass p-6 md:p-8">
      <div className="flex items-center justify-between mb-4 text-xs font-mono uppercase tracking-wider text-muted-foreground">
        <span>Response Time (ms)</span>
        <span>Time →</span>
      </div>
      <svg viewBox="0 0 400 160" className="w-full h-40 md:h-48">
        {/* grid */}
        {[40, 80, 120].map((y) => (
          <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3 3" />
        ))}
        {/* baseline (spike) */}
        <path
          id="baseline"
          d="M0,110 L80,108 L130,105 L160,40 L180,30 L210,35 L260,90 L320,95 L400,98"
          stroke="hsl(var(--destructive))"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* optimized (smooth) */}
        <path
          id="optimized"
          d="M0,115 L60,112 L130,108 L200,100 L280,92 L360,85 L400,82"
          stroke="hsl(var(--primary))"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <div className="flex flex-wrap items-center gap-5 mt-5 text-xs font-mono uppercase tracking-wider">
        <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-destructive" /> Before</span>
        <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-primary" /> After ChanAI</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border/50">
        {[
          ["P95", "120ms"],
          ["Throughput", "8.4k rps"],
          ["Error Rate", "0.02%"],
          ["Concurrent", "50,000"],
        ].map(([k, v]) => (
          <div key={k}>
            <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{k}</div>
            <div className="font-display font-semibold text-lg text-electric-gradient">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadChart;
