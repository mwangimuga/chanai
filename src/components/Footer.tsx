import { forwardRef } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/components/shared/Logo";
import logoWebp from "@/assets/chanai-logo-trans.webp";
import logoWebp2x from "@/assets/chanai-logo-trans@2x.webp";

const Footer = forwardRef<HTMLElement>((_, ref) => {
  return (
    <footer
      ref={ref}
      className="relative border-t border-black/5 dark:border-white/5 py-20 bg-black/5 dark:bg-white/5 overflow-hidden text-foreground"
    >
      {/* Brand watermark — subtle but clearly present */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
      >
        <picture>
          <source type="image/webp" srcSet={`${logoWebp} 1x, ${logoWebp2x} 2x`} />
          <img
            src={logoWebp2x}
            alt=""
            loading="lazy"
            decoding="async"
            className="w-[min(78vw,680px)] max-w-none opacity-[0.03] dark:opacity-[0.085] mix-blend-multiply dark:mix-blend-screen"
            style={{
              filter:
                "drop-shadow(0 0 40px hsl(var(--primary) / 0.2)) drop-shadow(0 0 80px hsl(var(--primary) / 0.15))",
              maskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 78%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 78%)",
            }}
          />
        </picture>
      </div>

      <div className="container relative z-10 px-6">
        <div className="grid md:grid-cols-4 gap-16 mb-16">
          <div className="md:col-span-2">
            <div className="mb-6">
              <Logo size="w-11 h-11" />
            </div>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              A Kigali-based consulting firm engineering intelligent systems and
              enterprise-grade quality assurance for organizations that
              cannot afford to fail.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-6 text-xs uppercase tracking-[0.3em] text-foreground">
              Services
            </h4>
            <ul className="space-y-3.5 text-[13px] text-muted-foreground">
              <li><Link to="/services#ai-agents" className="hover:text-foreground transition-colors">AI Agent Development</Link></li>
              <li><Link to="/services#qa-consulting" className="hover:text-foreground transition-colors">QA Consulting</Link></li>
              <li><Link to="/services#selenium" className="hover:text-foreground transition-colors">Selenium Training</Link></li>
              <li><Link to="/services#load-testing" className="hover:text-foreground transition-colors">Load &amp; Performance</Link></li>
              <li><Link to="/services#training" className="hover:text-foreground transition-colors">Corporate Training</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-6 text-xs uppercase tracking-[0.3em] text-foreground">
              Contact
            </h4>
            <ul className="space-y-4 text-[13px] text-muted-foreground">
              <li className="flex items-center gap-3">
                <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                <a href="tel:+250789769928" className="hover:text-foreground transition-colors">+250 789 769 928</a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Kigali, Rwanda</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                <a href="mailto:hello@chanai.tech" className="hover:text-foreground transition-colors">hello@chanai.tech</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-muted-foreground">
          <p>
            © {new Date().getFullYear()} ChanAI Tech Consulting Company. All rights reserved.
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.4em]">
            Engineering Intelligence · Delivering Trust
          </p>
        </div>
      </div>
    </footer>
  );
});
Footer.displayName = "Footer";

export default Footer;
