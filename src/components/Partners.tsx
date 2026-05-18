const partners = [
  "Microsoft", "Visit Rwanda", "Amazon", "Oracle",
  "Government of Rwanda", "Google", "OpenAI", "Anthropic"
];

const Partners = () => {
  const doubled = [...partners, ...partners];
  return (
    <section className="relative py-24 border-y border-black/5 dark:border-white/5 overflow-hidden bg-black/5 dark:bg-white/5">
      <div className="container mb-12">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground/80">
          Aligned with the World's Leading Ecosystems
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee whitespace-nowrap">
          {doubled.map((p, i) => (
            <div
              key={i}
              className="mx-12 font-display font-semibold text-2xl md:text-3xl text-muted-foreground/60 hover:text-foreground transition-colors"
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
