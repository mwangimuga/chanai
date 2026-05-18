import { Link, useNavigate } from "react-router-dom";
import logoWebp from "@/assets/chanai-logo-trans.webp";
import logoWebp2x from "@/assets/chanai-logo-trans@2x.webp";
import logoPng from "@/assets/chanai-logo-trans-256.png";
import logoPng2x from "@/assets/chanai-logo-trans-512.png";

interface LogoProps {
  variant?: "full" | "mark";
  className?: string;
  /** Tailwind size classes for the mark, e.g. "w-10 h-10". Defaults to responsive sizing. */
  size?: string;
}

const Logo = ({
  variant = "full",
  className = "",
  size = "w-10 h-10 md:w-11 md:h-11",
}: LogoProps) => {
  const navigate = useNavigate();
  return (
    <Link
      to="/"
      onDoubleClick={(e) => {
        e.preventDefault();
        navigate("/admin");
      }}
      className={`flex items-center gap-3 group select-none ${className}`}
      aria-label="ChanAI Tech home"
    >
      <div className={`relative shrink-0 ${size}`}>
        <picture>
          <source type="image/webp" srcSet={`${logoWebp} 1x, ${logoWebp2x} 2x`} />
          <img
            src={logoPng}
            srcSet={`${logoPng} 1x, ${logoPng2x} 2x`}
            alt="ChanAI Tech"
            width={44}
            height={44}
            decoding="async"
            fetchPriority="high"
            className="w-full h-full object-contain drop-shadow-[0_2px_18px_hsl(var(--primary)/0.45)] transition-transform duration-500 group-hover:scale-[1.06]"
          />
        </picture>
        <div className="pointer-events-none absolute inset-0 rounded-full bg-primary/35 blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
      </div>
      {variant === "full" && (
        <div className="flex flex-col leading-none">
          <span className="font-display font-semibold text-base md:text-[17px] tracking-tight text-foreground">
            Chan<span className="text-electric-gradient">Ai</span>
          </span>
          <span className="text-[9px] font-mono uppercase tracking-[0.28em] text-muted-foreground mt-1">
            Consultation · Automations · AI
          </span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
