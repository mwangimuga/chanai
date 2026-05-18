import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ParticleField from "@/components/shared/ParticleField";
import heroBg from "@/assets/hero-bg.jpg";
import { trackClick } from "@/lib/analytics";

const ROTATING_WORDS = [
  "Intelligent Agents",
  "Bulletproof QA Systems",
  "Automated Test Frameworks",
  "High-Performance Software",
  "Africa's Engineering Future",
];

const FLOATING_TAGS = [
  { text: "Selenium", top: "18%", left: "8%", delay: "0s" },
  { text: "JUnit", top: "26%", right: "10%", delay: "0.6s" },
  { text: "JMeter", top: "70%", left: "6%", delay: "1.2s" },
  { text: "Load Testing", top: "78%", right: "8%", delay: "0.3s" },
  { text: "Automation", top: "44%", left: "4%", delay: "0.9s" },
  { text: "QA", top: "50%", right: "6%", delay: "1.5s" },
  { text: "Python · Java", top: "12%", left: "42%", delay: "1.8s" },
  { text: "CI / CD", top: "85%", left: "48%", delay: "0.4s" },
];

const Hero = () => {
  const [wordIdx, setWordIdx] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % ROTATING_WORDS.length);
        setAnimating(false);
      }, 400);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen min-h-[100svh] flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-40"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/80 via-navy/70 to-background" />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <ParticleField density={110} />
      </div>

      {/* Glow orbs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] animate-glow-pulse animation-delay-400" />

      {/* Floating tech tags */}
      <div className="absolute inset-0 z-10 hidden md:block pointer-events-none">
        {FLOATING_TAGS.map((tag, i) => (
          <span
            key={i}
            className="absolute px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] glass rounded-full text-white/70 animate-float hover:text-white transition-colors"
            style={{
              top: tag.top,
              left: tag.left,
              right: tag.right,
              animationDelay: tag.delay,
              animationDuration: `${5 + (i % 3)}s`,
            }}
          >
            {tag.text}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="container relative z-20 text-center max-w-5xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 glass rounded-full text-[10px] font-mono uppercase tracking-[0.3em] text-white/80 animate-fade-in opacity-0">
          <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
          <span>Consulting · Engineering · Quality Assurance</span>
        </div>

        <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[1.02] tracking-tight mb-6 animate-fade-in-up opacity-0 animation-delay-200">
          <span className="block text-white">We Build</span>
          <span
            className={`text-electric-gradient inline-block mt-2 transition-all duration-400 ${
              animating ? "opacity-0 -translate-y-3" : "opacity-100 translate-y-0"
            }`}
          >
            {ROTATING_WORDS[wordIdx]}
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/75 mb-10 leading-relaxed animate-fade-in-up opacity-0 animation-delay-400">
          A Kigali-based consulting firm engineering intelligent systems and
          enterprise-grade quality assurance for organizations that cannot afford
          to fail.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0 animation-delay-600">
          <Button variant="electric" size="xl" asChild>
            <Link to="/book" onClick={() => trackClick("hero:book-consultation")}>
              Book a Consultation <ArrowRight />
            </Link>
          </Button>
          <Button variant="glass" size="xl" asChild>
            <a href="#services" onClick={() => trackClick("hero:explore-services")}>Explore Our Services</a>
          </Button>
        </div>

        <p className="mt-10 text-[10px] font-mono uppercase tracking-[0.4em] text-white/45 animate-fade-in opacity-0 animation-delay-800">
          Trusted by enterprises engineering the future
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:block">
        <div className="w-6 h-10 rounded-full border border-muted-foreground/30 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-primary rounded-full animate-float" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
