import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Construction } from "lucide-react";

const ComingSoon = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <main className="min-h-screen bg-background">
    <Navbar />
    <section className="min-h-screen min-h-[100svh] flex items-center justify-center pt-24 relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg opacity-50" />
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="container relative z-10 max-w-2xl text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 glass rounded-full text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
          <Construction className="w-3 h-3 text-primary" /> Coming soon
        </div>
        <h1 className="font-display font-bold text-5xl md:text-7xl text-gradient mb-6">{title}</h1>
        <p className="text-lg text-muted-foreground mb-10">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="electric" size="xl" asChild>
            <Link to="/book">Book a Consultation <ArrowRight /></Link>
          </Button>
          <Button variant="glass" size="xl" asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </section>
    <Footer />
  </main>
);

export default ComingSoon;
