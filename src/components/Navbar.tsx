import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import Logo from "@/components/shared/Logo";
import { trackClick } from "@/lib/analytics";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Community", to: "/community" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored === "dark" || stored === "light") return stored;
      return "dark"; // Default to dark mode
    }
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4 w-full max-w-5xl mx-auto pointer-events-none">
      <header
        className="w-full rounded-full border border-black/5 dark:border-white/10 shadow-lg px-6 py-2.5 backdrop-blur-lg bg-white/70 dark:bg-black/60 transition-all duration-300 pointer-events-auto"
      >
        <div className="flex items-center justify-between gap-4">
          <Logo />

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => {
              const active = pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`text-sm font-medium transition-colors relative group ${
                    active ? "text-foreground font-semibold" : "text-foreground/75 hover:text-foreground"
                  }`}
                >
                  {l.label}
                  <span className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-foreground/80 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <Link
              to="/book"
              onClick={() => trackClick("nav:book-consultation")}
              className="hidden sm:inline-block text-xs font-mono uppercase tracking-widest text-primary hover:text-primary/80 transition-colors border-b border-primary pb-0.5"
            >
              Consultation
            </Link>

            <button
              className="md:hidden text-foreground p-1"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden mt-3 rounded-2xl p-4 border border-black/5 dark:border-white/10 bg-white/95 dark:bg-black/95 animate-fade-in space-y-4">
            <nav className="flex flex-col gap-3">
              {navLinks.map((l) => {
                const active = pathname === l.to;
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={`text-sm font-medium transition-colors ${
                      active ? "text-primary" : "text-foreground/85 hover:text-primary"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
              <Link
                to="/book"
                className="text-sm font-mono uppercase tracking-wider text-primary border-t border-black/5 dark:border-white/5 pt-2.5"
              >
                Book a Consultation
              </Link>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
