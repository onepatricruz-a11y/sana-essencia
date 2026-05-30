import { Link } from "wouter";
import { ArrowRight, Zap, Moon, Focus, Users, Briefcase, BookOpen, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Hero Section - Modern Minimal */}
      <section className="min-h-[90vh] flex items-center bg-background border-b border-border">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Headline & CTA */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono">
                <span className="w-2 h-2 bg-accent rounded-full" />
                Atmospheric Optimization
              </div>
              <h1 
                className="text-6xl md:text-7xl font-light leading-[1.05] text-primary"
                style={{fontFamily: "Cormorant Garamond, serif", letterSpacing: "-0.02em"}}
              >
                Your Day, Optimized by Scent
              </h1>
              <p className="text-base text-foreground/70 leading-relaxed max-w-lg">
                Circadian-aligned formulations that enhance cognitive performance in the morning, sustain focus through the afternoon, and prepare your body for restorative sleep at night.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button className="px-8 py-3 bg-primary text-primary-foreground hover:bg-slate-800 font-mono text-xs uppercase tracking-wider transition-all duration-300">
                  Explore Collections <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/science">
                <Button variant="outline" className="px-8 py-3 border border-border text-primary hover:bg-muted font-mono text-xs uppercase tracking-wider">
                  Learn the Science
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Visual Hierarchy - Product Showcase Placeholder */}
          <div className="hidden lg:block">
            <div className="relative space-y-6">
              {/* Simulated product display */}
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square border border-border bg-muted flex items-center justify-center text-muted-foreground text-sm">
                  Morning Collection
                </div>
                <div className="aspect-square border border-border bg-muted flex items-center justify-center text-muted-foreground text-sm">
                  Afternoon Collection
                </div>
                <div className="aspect-square border border-border bg-muted flex items-center justify-center text-muted-foreground text-sm col-span-2">
                  Evening Collection
                </div>
              </div>
              <p className="text-xs text-muted-foreground font-mono text-center">
                Product photography coming soon
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Three Circadian Collections */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 
              className="text-4xl font-light text-primary"
              style={{fontFamily: "Cormorant Garamond, serif"}}
            >
              Three Collections, One Optimized Day
            </h2>
            <p className="text-sm text-muted-foreground">
              Each collection is formulated to support your body's natural circadian rhythms and enhance performance at specific times of day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Morning */}
            <div className="clinical-card space-y-6">
              <div className="flex items-center gap-3">
                <Zap className="h-6 w-6 text-accent" />
                <h3 className="text-lg font-serif text-primary font-semibold">Morning Cortisol</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Supports natural cortisol awakening response. Enhances alertness, mental clarity, and readiness for the day ahead.
              </p>
              <div className="space-y-2 border-t border-border pt-4">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Key Compounds</p>
                <p className="text-xs text-foreground">1,8-Cineole, Limonene, Peppermint</p>
              </div>
              <Link href="/products">
                <Button variant="ghost" className="w-full text-xs uppercase tracking-wider font-mono text-accent hover:text-accent/80">
                  View Collection →
                </Button>
              </Link>
            </div>

            {/* Afternoon */}
            <div className="clinical-card space-y-6">
              <div className="flex items-center gap-3">
                <Focus className="h-6 w-6 text-accent" />
                <h3 className="text-lg font-serif text-primary font-semibold">Afternoon Focus</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sustains cognitive performance and prevents the afternoon slump. Promotes sustained attention and mental stamina.
              </p>
              <div className="space-y-2 border-t border-border pt-4">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Key Compounds</p>
                <p className="text-xs text-foreground">Rosemary, Lemon, Eucalyptus</p>
              </div>
              <Link href="/products">
                <Button variant="ghost" className="w-full text-xs uppercase tracking-wider font-mono text-accent hover:text-accent/80">
                  View Collection →
                </Button>
              </Link>
            </div>

            {/* Evening */}
            <div className="clinical-card space-y-6">
              <div className="flex items-center gap-3">
                <Moon className="h-6 w-6 text-accent" />
                <h3 className="text-lg font-serif text-primary font-semibold">Evening Reset</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Supports natural melatonin production and circadian wind-down. Promotes relaxation and prepares the body for sleep.
              </p>
              <div className="space-y-2 border-t border-border pt-4">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Key Compounds</p>
                <p className="text-xs text-foreground">Lavender, Chamomile, Sandalwood</p>
              </div>
              <Link href="/products">
                <Button variant="ghost" className="w-full text-xs uppercase tracking-wider font-mono text-accent hover:text-accent/80">
                  View Collection →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Target Audiences */}
      <section className="py-24 bg-background border-b border-border">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 
              className="text-4xl font-light text-primary"
              style={{fontFamily: "Cormorant Garamond, serif"}}
            >
              Designed for Your Lifestyle
            </h2>
            <p className="text-sm text-muted-foreground">
              Whether you're optimizing personal performance or creating the ideal environment for your team, Sana Essencia adapts to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Briefcase, label: "Professionals", desc: "Enhance focus and productivity throughout your workday" },
              { icon: BookOpen, label: "Students", desc: "Support concentration during study sessions and exams" },
              { icon: Users, label: "Corporate Teams", desc: "Optimize shared workspaces for collective performance" },
              { icon: Activity, label: "Athletes", desc: "Support recovery and circadian rhythm optimization" },
            ].map((item, idx) => (
              <div key={idx} className="border border-border p-6 bg-card space-y-4 hover:border-accent/40 transition-colors duration-300">
                <item.icon className="h-6 w-6 text-accent" />
                <h3 className="font-serif text-primary font-semibold">{item.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. How It Works */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 
                className="text-4xl font-light text-primary"
                style={{fontFamily: "Cormorant Garamond, serif"}}
              >
                Passive Olfactory Optimization
              </h2>
              <p className="text-sm text-muted-foreground">
                No effort required. Simply breathe.
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  num: "01",
                  title: "Inhalation",
                  desc: "Volatile botanical compounds enter your nasal cavity passively through normal breathing."
                },
                {
                  num: "02",
                  title: "Olfactory Pathway",
                  desc: "Scent molecules bypass the thalamus and travel directly to your limbic system—the brain's emotional and memory center."
                },
                {
                  num: "03",
                  title: "Neurochemical Response",
                  desc: "Specific compounds activate neurotransmitter systems that influence mood, cognition, and sleep-wake cycles."
                },
                {
                  num: "04",
                  title: "Circadian Alignment",
                  desc: "Formulations are timed to support your body's natural rhythms throughout the day."
                },
              ].map((step, idx) => (
                <div key={idx} className="flex gap-6 border-l-2 border-accent pl-6 py-2">
                  <span className="text-lg font-serif text-accent font-light">{step.num}</span>
                  <div>
                    <h3 className="font-serif text-primary font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground border-b border-border">
        <div className="container text-center space-y-8">
          <div className="space-y-4">
            <h2 
              className="text-4xl font-light"
              style={{fontFamily: "Cormorant Garamond, serif"}}
            >
              Ready to Optimize Your Day?
            </h2>
            <p className="text-sm text-primary-foreground/80 max-w-lg mx-auto">
              Join our waitlist to be among the first to experience circadian-aligned atmospheric optimization.
            </p>
          </div>
          <Link href="/coming-soon">
            <Button className="px-8 py-3 bg-accent text-accent-foreground hover:bg-accent/90 font-mono text-xs uppercase tracking-wider transition-all duration-300">
              Join the Waitlist
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
