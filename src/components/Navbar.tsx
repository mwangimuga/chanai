import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Logo from "@/components/shared/Logo";
import { trackClick } from "@/lib/analytics";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Community & Partners", to: "/community" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-2.5 glass-strong border-b border-primary/15"
          : "py-4 md:py-5 bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between gap-4">
        <Logo />

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm font-medium transition-colors relative group ${
                  active ? "text-white" : "text-white/65 hover:text-white"
                }`}
              >
                {l.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-gradient-electric transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button variant="electric" size="sm" asChild>
            <Link to="/book" onClick={() => trackClick("nav:book-consultation")}>Book a Consultation</Link>
          </Button>
        </div>

        <button
          className="lg:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden glass-strong mt-3 mx-4 rounded-xl p-6 animate-fade-in">
          <nav className="flex flex-col gap-4">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm font-medium text-white/75 hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Button variant="electric" size="sm" asChild>
              <Link to="/book">Book a Consultation</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
