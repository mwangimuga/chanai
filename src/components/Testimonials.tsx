const testimonials = [
  {
    quote:
      "ChanAI transformed how we approach testing. Our systems are faster, cleaner, and far more reliable.",
    author: "Tech Lead",
    company: "Enterprise Client",
  },
  {
    quote:
      "Their training gave our team real confidence in automation. The depth of expertise is unmatched.",
    author: "Engineering Manager",
    company: "Software Company",
  },
  {
    quote:
      "Working with ChanAI elevated our entire QA pipeline. Precision, professionalism, and partnership.",
    author: "CTO",
    company: "FinTech Startup",
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-36 overflow-hidden bg-background border-t border-black/5 dark:border-white/5">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10 px-6">
        <div className="text-center max-w-2xl mx-auto mb-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-6">Client Voices</p>
          <h2 className="font-display font-bold text-4xl md:text-6xl text-foreground leading-tight">
            Trusted by builders, <span className="italic font-normal font-serif">teams, and innovators.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-2xl border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 hover:border-primary/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="font-serif italic text-7xl text-primary/30 dark:text-primary/20 select-none leading-none mb-4">
                  “
                </div>
                <p className="text-muted-foreground leading-relaxed mb-8 flex-1 text-[15px]">
                  {t.quote}
                </p>
              </div>
              <div className="pt-6 border-t border-black/5 dark:border-white/5">
                <div className="font-display font-semibold text-foreground">{t.author}</div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mt-1">{t.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
