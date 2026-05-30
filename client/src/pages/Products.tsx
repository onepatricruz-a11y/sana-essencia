import { Zap, Moon, Focus, Droplet, Wind, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Products() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Header */}
      <section className="py-16 bg-background border-b border-border">
        <div className="container space-y-4">
          <h1 
            className="text-5xl font-light text-primary"
            style={{fontFamily: "Cormorant Garamond, serif"}}
          >
            Collections
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Three scientifically formulated collections designed to optimize your performance, focus, and rest throughout the day.
          </p>
        </div>
      </section>

      {/* Morning Collection */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            
            {/* Left: Product Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Zap className="h-8 w-8 text-accent" />
                  <h2 
                    className="text-4xl font-light text-primary"
                    style={{fontFamily: "Cormorant Garamond, serif"}}
                  >
                    Morning Cortisol
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Supports your body's natural cortisol awakening response. Designed to enhance alertness, mental clarity, and readiness during your morning routine and early work hours.
                </p>
              </div>

              <div className="space-y-6 border-t border-border pt-6">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">Primary Compounds</p>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-accent font-semibold">1,8-Cineole</span> — Acetylcholinesterase inhibitor; enhances cognitive focus</p>
                    <p><span className="text-accent font-semibold">Limonene</span> — Mood elevation and cognitive stimulation</p>
                    <p><span className="text-accent font-semibold">Peppermint</span> — TRPM8 activation; promotes alertness</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">Delivery Methods</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-sm">
                      <Wind className="h-4 w-4 text-accent" />
                      <span>Neuroambient Mist — For personal spaces</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Flame className="h-4 w-4 text-accent" />
                      <span>Circadian Candle — For shared environments</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">Ideal For</p>
                  <p className="text-sm">Professionals, students, early-morning workouts, focus-intensive tasks</p>
                </div>
              </div>

              <Button className="px-8 py-3 bg-primary text-primary-foreground hover:bg-slate-800 font-mono text-xs uppercase tracking-wider">
                Join Waitlist
              </Button>
            </div>

            {/* Right: Product Showcase */}
            <div className="aspect-square border border-border bg-muted flex items-center justify-center text-muted-foreground">
              <div className="text-center space-y-2">
                <p className="text-sm font-mono">Morning Collection</p>
                <p className="text-xs text-muted-foreground">Product imagery coming soon</p>
              </div>
            </div>
          </div>

          {/* Product Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="clinical-card">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Neuroambient Mist</p>
              <h3 className="font-serif text-lg text-primary mb-2">Cortisol Awakening Mist</h3>
              <p className="text-xs text-muted-foreground mb-4">50ml spray bottle. 2-3 sprays per use. Ideal for personal workspaces.</p>
              <p className="text-xs font-mono text-accent">Coming Q3 2026</p>
            </div>
            <div className="clinical-card">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Circadian Candle</p>
              <h3 className="font-serif text-lg text-primary mb-2">Morning Clarity Candle</h3>
              <p className="text-xs text-muted-foreground mb-4">200g soy blend. 4-hour burn time. Perfect for shared spaces.</p>
              <p className="text-xs font-mono text-accent">Coming Q3 2026</p>
            </div>
            <div className="clinical-card">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Botanical Concentrate</p>
              <h3 className="font-serif text-lg text-primary mb-2">Morning Essence</h3>
              <p className="text-xs text-muted-foreground mb-4">10ml concentrate. For diffusers and personal use.</p>
              <p className="text-xs font-mono text-accent">Coming Q3 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* Afternoon Collection */}
      <section className="py-24 bg-background border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            
            {/* Left: Product Showcase */}
            <div className="aspect-square border border-border bg-muted flex items-center justify-center text-muted-foreground order-2 lg:order-1">
              <div className="text-center space-y-2">
                <p className="text-sm font-mono">Afternoon Collection</p>
                <p className="text-xs text-muted-foreground">Product imagery coming soon</p>
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="space-y-8 order-1 lg:order-2">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Focus className="h-8 w-8 text-accent" />
                  <h2 
                    className="text-4xl font-light text-primary"
                    style={{fontFamily: "Cormorant Garamond, serif"}}
                  >
                    Afternoon Focus
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sustains cognitive performance and prevents the afternoon energy dip. Formulated to promote sustained attention, mental stamina, and productivity during peak work hours.
                </p>
              </div>

              <div className="space-y-6 border-t border-border pt-6">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">Primary Compounds</p>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-accent font-semibold">Rosemary</span> — Enhances memory and cognitive function</p>
                    <p><span className="text-accent font-semibold">Lemon</span> — Promotes alertness and mental clarity</p>
                    <p><span className="text-accent font-semibold">Eucalyptus</span> — Respiratory support and focus enhancement</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">Delivery Methods</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-sm">
                      <Wind className="h-4 w-4 text-accent" />
                      <span>Neuroambient Mist — For personal spaces</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Flame className="h-4 w-4 text-accent" />
                      <span>Circadian Candle — For shared environments</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">Ideal For</p>
                  <p className="text-sm">Corporate teams, afternoon meetings, study sessions, creative work</p>
                </div>
              </div>

              <Button className="px-8 py-3 bg-primary text-primary-foreground hover:bg-slate-800 font-mono text-xs uppercase tracking-wider">
                Join Waitlist
              </Button>
            </div>
          </div>

          {/* Product Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="clinical-card">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Neuroambient Mist</p>
              <h3 className="font-serif text-lg text-primary mb-2">Afternoon Clarity Mist</h3>
              <p className="text-xs text-muted-foreground mb-4">50ml spray bottle. 2-3 sprays per use. Ideal for personal workspaces.</p>
              <p className="text-xs font-mono text-accent">Coming Q3 2026</p>
            </div>
            <div className="clinical-card">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Circadian Candle</p>
              <h3 className="font-serif text-lg text-primary mb-2">Focus Sustaining Candle</h3>
              <p className="text-xs text-muted-foreground mb-4">200g soy blend. 4-hour burn time. Perfect for shared spaces.</p>
              <p className="text-xs font-mono text-accent">Coming Q3 2026</p>
            </div>
            <div className="clinical-card">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Botanical Concentrate</p>
              <h3 className="font-serif text-lg text-primary mb-2">Afternoon Essence</h3>
              <p className="text-xs text-muted-foreground mb-4">10ml concentrate. For diffusers and personal use.</p>
              <p className="text-xs font-mono text-accent">Coming Q3 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* Evening Collection */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            
            {/* Left: Product Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Moon className="h-8 w-8 text-accent" />
                  <h2 
                    className="text-4xl font-light text-primary"
                    style={{fontFamily: "Cormorant Garamond, serif"}}
                  >
                    Evening Reset
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Supports your body's natural wind-down and melatonin production. Formulated to promote relaxation, reduce cognitive arousal, and prepare your body for restorative sleep.
                </p>
              </div>

              <div className="space-y-6 border-t border-border pt-6">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">Primary Compounds</p>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-accent font-semibold">Lavender</span> — GABA modulation; promotes relaxation</p>
                    <p><span className="text-accent font-semibold">Chamomile</span> — Anxiolytic properties; supports sleep onset</p>
                    <p><span className="text-accent font-semibold">Sandalwood</span> — Parasympathetic activation; deep relaxation</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">Delivery Methods</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-sm">
                      <Wind className="h-4 w-4 text-accent" />
                      <span>Neuroambient Mist — For personal spaces</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Flame className="h-4 w-4 text-accent" />
                      <span>Circadian Candle — For shared environments</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">Ideal For</p>
                  <p className="text-sm">Better sleep, stress relief, evening routines, meditation, shift workers</p>
                </div>
              </div>

              <Button className="px-8 py-3 bg-primary text-primary-foreground hover:bg-slate-800 font-mono text-xs uppercase tracking-wider">
                Join Waitlist
              </Button>
            </div>

            {/* Right: Product Showcase */}
            <div className="aspect-square border border-border bg-muted flex items-center justify-center text-muted-foreground">
              <div className="text-center space-y-2">
                <p className="text-sm font-mono">Evening Collection</p>
                <p className="text-xs text-muted-foreground">Product imagery coming soon</p>
              </div>
            </div>
          </div>

          {/* Product Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="clinical-card">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Neuroambient Mist</p>
              <h3 className="font-serif text-lg text-primary mb-2">Sleep Preparation Mist</h3>
              <p className="text-xs text-muted-foreground mb-4">50ml spray bottle. 2-3 sprays per use. Ideal for bedtime routine.</p>
              <p className="text-xs font-mono text-accent">Coming Q3 2026</p>
            </div>
            <div className="clinical-card">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Circadian Candle</p>
              <h3 className="font-serif text-lg text-primary mb-2">Rest & Recovery Candle</h3>
              <p className="text-xs text-muted-foreground mb-4">200g soy blend. 4-hour burn time. Perfect for bedrooms.</p>
              <p className="text-xs font-mono text-accent">Coming Q3 2026</p>
            </div>
            <div className="clinical-card">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Botanical Concentrate</p>
              <h3 className="font-serif text-lg text-primary mb-2">Evening Essence</h3>
              <p className="text-xs text-muted-foreground mb-4">10ml concentrate. For diffusers and personal use.</p>
              <p className="text-xs font-mono text-accent">Coming Q3 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center space-y-6">
          <h2 
            className="text-3xl font-light"
            style={{fontFamily: "Cormorant Garamond, serif"}}
          >
            Be First to Experience Sana Essencia
          </h2>
          <p className="text-sm text-primary-foreground/80 max-w-lg mx-auto">
            Join our waitlist to get early access, exclusive discounts, and updates on our launch.
          </p>
          <Link href="/coming-soon">
            <Button className="px-8 py-3 bg-accent text-accent-foreground hover:bg-accent/90 font-mono text-xs uppercase tracking-wider">
              Join Waitlist
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
