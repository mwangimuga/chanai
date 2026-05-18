import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 30, suffix: "+", label: "Clients Supported" },
  { value: 95, suffix: "%", label: "QA Accuracy Rate" },
  { value: 1000, suffix: "+", label: "Hours of Training" },
  { value: 99.9, suffix: "%", label: "System Reliability", decimals: 1 },
];

const Counter = ({ value, suffix, decimals = 0, start }: { value: number; suffix: string; decimals?: number; start: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    const duration = 2000;
    const startTime = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(value * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value]);

  return (
    <span>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};

const Stats = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-4">By the Numbers</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight">
            Built on Precision.
            <br />
            <span className="text-electric-gradient">Driven by Results.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/10 rounded-2xl overflow-hidden glass">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-[hsl(var(--navy-deep))]/70 p-8 lg:p-10 text-center hover:bg-primary/5 transition-colors group"
            >
              <div className="font-display font-bold text-4xl lg:text-5xl text-electric-gradient mb-3 group-hover:scale-110 transition-transform">
                <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} start={visible} />
              </div>
              <div className="text-xs font-mono text-white/65 uppercase tracking-[0.2em]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
