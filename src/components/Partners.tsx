const partners = [
  "Microsoft", "Visit Rwanda", "Amazon", "Oracle",
  "Government of Rwanda", "Google", "OpenAI", "Anthropic"
];

const Partners = () => {
  const doubled = [...partners, ...partners];
  return (
    <section className="relative py-20 border-y border-white/10 overflow-hidden bg-[hsl(var(--navy-deep))]/40">
      <div className="container mb-10">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.4em] text-white/60">
          Aligned with the World's Leading Ecosystems
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[hsl(var(--navy-deep))] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[hsl(var(--navy-deep))] to-transparent z-10" />
        <div className="flex animate-marquee whitespace-nowrap">
          {doubled.map((p, i) => (
            <div
              key={i}
              className="mx-12 font-display font-semibold text-2xl md:text-3xl text-white/55 hover:text-white transition-colors"
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
