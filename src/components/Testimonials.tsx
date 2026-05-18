import { Quote } from "lucide-react";

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
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />

      <div className="container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-4">Client Voices</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight">
            Trusted by Builders,
            <br />
            <span className="text-electric-gradient">Teams, and Innovators.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-2xl glass hover:border-primary/30 transition-all duration-500 flex flex-col"
            >
              <Quote className="w-8 h-8 text-primary mb-6 opacity-70" />
              <p className="text-white/85 leading-relaxed mb-8 flex-1 text-[15px]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="pt-6 border-t border-white/10">
                <div className="font-display font-semibold text-white">{t.author}</div>
                <div className="text-xs font-mono uppercase tracking-[0.2em] text-white/55 mt-1">{t.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
