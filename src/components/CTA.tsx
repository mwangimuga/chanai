import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const waLink = buildWhatsAppLink("Hello ChanAI Tech, I would like to book a consultation.");

const CTA = () => {
  return (
    <section id="contact" className="relative py-40 overflow-hidden bg-background border-t border-black/5 dark:border-white/5">
      <div className="absolute inset-0 bg-gradient-hero opacity-30 dark:opacity-20 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] animate-glow-pulse pointer-events-none" />

      <div className="container relative z-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-6">Let's talk</p>
          <h2 className="font-display font-bold text-4xl md:text-6xl text-foreground mb-8 leading-tight">
            Ready to build systems <span className="italic font-normal font-serif">you can trust?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto leading-relaxed">
            Speak directly with our engineering team or book an exploratory call.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-12 font-serif text-lg mb-16">
            <Link
              to="/book"
              className="group inline-flex items-center gap-2 text-primary font-semibold border-b border-primary/30 hover:border-primary pb-1 transition-all duration-300"
            >
              Book a Consultation <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground border-b border-transparent hover:border-foreground pb-1 transition-all duration-300"
            >
              Chat on WhatsApp
            </a>
          </div>

          <div className="inline-flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Direct Channel
            </span>
            <span>+250 789 769 928</span>
            <span>Kigali, Rwanda</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
