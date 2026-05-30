import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    toast.success("Joined the research digest", {
      description: "You are now subscribed to neuroaromacology updates.",
    });
    setEmail("");
  };

  const navItems = [
    { name: "The Science", path: "/science" },
    { name: "Our Formulas", path: "/products" },
    { name: "Daily Rituals", path: "/rituals" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col selection:bg-accent selection:text-primary">
      {/* Top Banner: Scientific Credential */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-[10px] md:text-xs tracking-widest uppercase font-mono border-b border-border/10">
        Natura and Formula backed by Science
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border/60 py-3 shadow-sm"
            : "bg-transparent border-b border-transparent py-5"
        }`}
      >
        <div className="container flex items-center justify-between">
          {/* Logo wordmark */}
          <Link href="/" className="group flex flex-col items-start">
            <span className="text-2xl md:text-3xl tracking-[0.08em] text-primary font-light transition-colors duration-300 group-hover:text-secondary" style={{fontFamily: "Cormorant Garamond, serif", letterSpacing: "0.08em"}}>
              sana essencia
            </span>
            <span className="text-[7px] tracking-[0.35em] uppercase text-muted-foreground mt-1" style={{fontFamily: "IBM Plex Mono, monospace"}}>
              Neuroaromacology Lab
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = location === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`font-mono text-xs uppercase tracking-wider transition-all duration-300 relative py-1 ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-accent animate-in fade-in slide-in-from-bottom-1 duration-300" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Call to Action */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/products">
              <Button
                variant="outline"
                className="font-mono text-xs uppercase tracking-widest border-primary text-primary hover:bg-primary hover:text-primary-foreground btn-tactile"
              >
                Explore Formulas
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-primary p-1 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/98 backdrop-blur-lg pt-24 md:hidden animate-in fade-in duration-200">
          <div className="container flex flex-col space-y-6">
            {navItems.map((item) => {
              const isActive = location === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`font-serif text-2xl tracking-wide py-2 border-b border-border/40 ${
                    isActive ? "text-primary font-bold" : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-6">
              <Link href="/products" className="w-full block">
                <Button className="w-full font-mono text-xs uppercase tracking-widest py-6 btn-tactile">
                  Explore Formulas
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground border-t border-border/10 pt-16 pb-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-12 border-b border-border/10">
            {/* Brand Column */}
            <div className="md:col-span-4 flex flex-col space-y-4">
              <span className="font-serif text-2xl tracking-[0.15em] uppercase font-semibold">
                sana essencia
              </span>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent/80">
                Scientia et Natura Formula
              </p>
              <p className="text-xs text-primary-foreground/70 max-w-sm leading-relaxed mt-2">
                Blending neuroscience and botany to synthesize olfactory pathways for autonomic nervous system regulation. Grounded in research, formulated for emotional equilibrium.
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-3 flex flex-col space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                Formulations
              </h4>
              <ul className="space-y-2.5 text-xs text-primary-foreground/80">
                <li>
                  <Link href="/products" className="hover:text-accent transition-colors">
                    Neuroambient Mists
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="hover:text-accent transition-colors">
                    Circadian Candles
                  </Link>
                </li>
                <li>
                  <Link href="/science" className="hover:text-accent transition-colors">
                    Molecular Actives
                  </Link>
                </li>
                <li>
                  <Link href="/rituals" className="hover:text-accent transition-colors">
                    Scent Cycles
                  </Link>
                </li>
              </ul>
            </div>

            {/* Scientific Navigation Column */}
            <div className="md:col-span-2 flex flex-col space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                Research
              </h4>
              <ul className="space-y-2.5 text-xs text-primary-foreground/80">
                <li>
                  <Link href="/science" className="hover:text-accent transition-colors">
                    The Thalamus Bypass
                  </Link>
                </li>
                <li>
                  <Link href="/science" className="hover:text-accent transition-colors">
                    Clinical Studies
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-accent transition-colors">
                    Collaboration
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="md:col-span-3 flex flex-col space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                The Research Digest
              </h4>
              <p className="text-xs text-primary-foreground/70 leading-relaxed">
                Receive quarterly literature reviews on neuroaromacology and circadian scent-cycle findings.
              </p>
              {subscribed ? (
                <div className="bg-secondary/20 border border-secondary/40 p-3 flex items-center space-x-2 text-xs text-accent">
                  <Check size={16} />
                  <span>Subscribed to quarterly digest.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="researcher@institution.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-background/5 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 px-3 py-2 text-xs font-mono focus:outline-none focus:border-accent"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-accent hover:text-primary-foreground transition-colors"
                    >
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Bottom Copyright and Meta */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] font-mono tracking-wider text-primary-foreground/50">
            <div>
              © {new Date().getFullYear()} SANA ESSENCIA LABS. ALL RIGHTS RESERVED.
            </div>
            <div className="flex space-x-6">
              <a href="#privacy" className="hover:text-accent transition-colors">
                PRIVACY DEED
              </a>
              <a href="#terms" className="hover:text-accent transition-colors">
                RESEARCH PROTOCOL
              </a>
              <a href="#credits" className="hover:text-accent transition-colors">
                CREDITS
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
