import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { trackClick } from "@/lib/analytics";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-44 pb-28 md:pt-52 md:pb-36 bg-background"
    >
      {/* Background ambient elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 mesh-bg opacity-30 dark:opacity-20" />
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-primary/10 dark:bg-primary/5 rounded-full blur-[140px] animate-glow-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] bg-accent/15 dark:bg-accent/5 rounded-full blur-[140px] animate-glow-pulse animation-delay-400" />
      </div>

      {/* Content */}
      <div className="container relative z-20 text-center max-w-4xl px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-10 border border-black/10 dark:border-white/10 rounded-full text-[10px] font-mono uppercase tracking-[0.3em] text-foreground/70 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span>Consulting · Engineering · Quality Assurance</span>
        </div>

        <h1 className="font-display font-bold text-3xl md:text-5xl lg:text-[58px] leading-[1.1] tracking-tight mb-6 text-foreground animate-fade-in-up">
          Engineering digital solutions <span className="italic font-normal font-serif">built on precision.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-sm md:text-[15px] text-muted-foreground mb-10 leading-relaxed animate-fade-in-up animation-delay-200">
          A Kigali-based technology consulting firm engineering custom intelligent agents and
          enterprise-grade software automation for teams that cannot afford to fail.
        </p>

        {/* Minimal, high-end editorial links (No loud CTAs) */}
        <div className="flex flex-wrap items-center justify-center gap-10 font-serif text-sm animate-fade-in-up animation-delay-400">
          <Link
            to="/book"
            onClick={() => trackClick("hero:book-consultation")}
            className="group inline-flex items-center gap-2 text-foreground font-semibold border-b border-foreground/30 hover:border-foreground pb-0.5 transition-all duration-300"
          >
            Start a Project <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
          <a
            href="#services"
            onClick={() => trackClick("hero:explore-services")}
            className="text-muted-foreground hover:text-foreground border-b border-transparent hover:border-foreground pb-0.5 transition-all duration-300"
          >
            Explore Services
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
