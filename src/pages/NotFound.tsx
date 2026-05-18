import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleField from "@/components/shared/ParticleField";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Compass, MessageCircle } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 — route not found:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <section className="relative flex-1 flex items-center justify-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0"><ParticleField density={50} /></div>
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/15 rounded-full blur-[150px]" />

        <div className="container relative z-10 max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 glass rounded-full text-[10px] font-mono uppercase tracking-[0.4em] text-white/75">
            <Compass className="w-3 h-3 text-primary" /> 404 · Page not found
          </div>
          <h1 className="font-display font-bold text-7xl md:text-9xl text-electric-gradient leading-none mb-6">
            404
          </h1>
          <p className="font-display text-xl md:text-2xl text-white mb-3">
            We couldn&rsquo;t find that page.
          </p>
          <p className="text-white/65 mb-2 font-mono text-xs">
            <span className="text-white/40">Path:</span> {location.pathname}
          </p>
          <p className="text-white/70 mb-10 max-w-md mx-auto">
            The link may be outdated, or the page has moved. Try one of the
            options below — or send us a message and we&rsquo;ll point you in
            the right direction.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="electric" size="lg" asChild>
              <Link to="/"><ArrowLeft /> Back to Home</Link>
            </Button>
            <Button
              variant="glass"
              size="lg"
              onClick={() => openWhatsApp("Hi ChanAI — I hit a broken link on your site and need help.")}
            >
              <MessageCircle /> Talk to us
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default NotFound;
