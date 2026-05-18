import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const waLink = buildWhatsAppLink("Hello ChanAI Tech, I would like to book a consultation.");

const CTA = () => {
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] animate-glow-pulse" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-6">Let's talk</p>
          <h2 className="font-display font-bold text-4xl md:text-7xl text-gradient mb-8 leading-[1.05]">
            Ready to Build Systems<br />You Can Trust?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Speak directly with our team via WhatsApp and get started instantly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button variant="electric" size="xl" asChild>
              <Link to="/book">
                Book Your Consultation <ArrowRight />
              </Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <a href={waLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle /> Chat on WhatsApp
              </a>
            </Button>
          </div>

          <div className="inline-flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Available now on WhatsApp
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
