import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Check } from "lucide-react";
import { toast } from "sonner";

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setSubmitted(true);
    toast.success("Welcome to the waitlist", {
      description: "We'll notify you when Sana Essencia launches.",
    });
    
    setTimeout(() => {
      setEmail("");
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      {/* Minimal header */}
      <div className="absolute top-8 left-8">
        <h1 className="text-2xl font-serif text-primary font-light" style={{fontFamily: "Cormorant Garamond, serif"}}>
          sana essencia
        </h1>
      </div>

      {/* Main content */}
      <div className="w-full max-w-md space-y-12 text-center">
        
        {/* Headline */}
        <div className="space-y-4">
          <h2 className="text-5xl md:text-6xl font-serif text-primary font-light leading-tight" style={{fontFamily: "Cormorant Garamond, serif", letterSpacing: "-0.02em"}}>
            Optimize Your Atmosphere
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Circadian-aligned scent formulations designed to enhance performance, improve rest, and regulate mood throughout your day.
          </p>
        </div>

        {/* Tagline */}
        <div className="border-t border-border pt-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono">
            Natura and Formula backed by Science
          </p>
        </div>

        {/* Waitlist Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2 border border-border">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
              required
            />
            <Button
              type="submit"
              disabled={submitted}
              className="px-6 py-3 bg-primary text-primary-foreground hover:bg-slate-800 font-mono text-xs uppercase tracking-wider transition-all duration-300"
            >
              {submitted ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Joined
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Join Waitlist
                </>
              )}
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground">
            No spam. We'll only reach out when we launch.
          </p>
        </form>

        {/* Footer info */}
        <div className="border-t border-border pt-8 space-y-2">
          <p className="text-xs text-muted-foreground">
            Launching Q3 2026
          </p>
          <div className="flex justify-center gap-6 text-xs text-muted-foreground">
            <a href="https://instagram.com/sana_essencia" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              Instagram
            </a>
            <a href="mailto:hello@sanaessencia.com" className="hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Subtle background grid */}
      <div className="fixed inset-0 -z-10 opacity-30 grid-background" />
    </div>
  );
}
