import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Brain, ShieldCheck, Activity, Quote, Zap, Compass, CheckCircle, Moon, Sun } from "lucide-react";
import { LinaloolIcon, CineoleIcon } from "@/components/MoleculeIcons";

export default function Home() {
  const compressedHeroBg = "https://d2xsxph8kpxj0f.cloudfront.net/310519663714048926/9DeCNDduMpHGZnLX4VkgPB/hero_bg-XwHofX2fLBRiEeL4oWnYxX.webp";
  const compressedMistBottle = "https://d2xsxph8kpxj0f.cloudfront.net/310519663714048926/9DeCNDduMpHGZnLX4VkgPB/mist_bottle-Z4y3S3Wk4igK7WDLT4LJmA.webp";
  const compressedCandle = "https://d2xsxph8kpxj0f.cloudfront.net/310519663714048926/9DeCNDduMpHGZnLX4VkgPB/candle-VpyDEiw3f3kS2pZVvPNoQy.webp";

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Hero Section */}
      <section 
        className="relative min-h-[85vh] flex items-center bg-cover bg-center bg-no-repeat py-20"
        style={{ backgroundImage: `url(${compressedHeroBg})` }}
      >
        {/* Semi-transparent Overlay to ensure clinical contrast */}
        <div className="absolute inset-0 bg-cream-brand/80 backdrop-blur-[1px]" />
        
        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 flex flex-col items-start space-y-6 max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-primary/5 border border-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-secondary">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              <span>Passive Olfactory Healing</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl text-primary leading-[1.05] font-light" style={{fontFamily: "Cormorant Garamond, serif", fontWeight: 300, letterSpacing: "-0.02em"}}>
              Breathe. Improve. Heal.
            </h1>
            
            <p className="text-sm md:text-base text-foreground/80 leading-relaxed max-w-2xl font-sans">
              Simply inhaling scientifically formulated scents directly improves cognition, emotional regulation, and sleep quality. No effort required—passive healing through circadian-aligned botanical actives.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
              <Link href="/products" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto font-mono text-xs uppercase tracking-widest bg-primary text-primary-foreground hover:bg-secondary py-6 px-8 btn-tactile">
                  Explore Formulas <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Subtle Technical Spec box on hero right side */}
          <div className="lg:col-span-4 hidden lg:block bg-background/40 backdrop-blur-md border border-border p-6 font-mono text-[10px] space-y-4 text-muted-foreground">
            <div className="border-b border-border pb-2 text-primary font-bold tracking-widest uppercase">
              MECHANISM [ACTIVE]
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>PATHWAY:</span>
                <span className="text-secondary font-bold">OLFACTORY BYPASS</span>
              </div>
              <div className="flex justify-between">
                <span>TARGET:</span>
                <span className="text-secondary font-bold">LIMBIC SYSTEM</span>
              </div>
              <div className="flex justify-between">
                <span>DELIVERY:</span>
                <span className="text-secondary">PASSIVE INHALATION</span>
              </div>
              <div className="flex justify-between">
                <span>EFFECT TIME:</span>
                <span className="text-secondary">150-200 MILLISECONDS</span>
              </div>
            </div>
            <div className="border-t border-border pt-2 text-[8px] leading-relaxed uppercase">
              *No synthetic carriers. Pure botanical volatile actives.
            </div>
          </div>
        </div>
      </section>

      {/* 2. The Science of Passive Olfactory Healing */}
      <section className="py-24 bg-card text-card-foreground border-y border-border grid-notebook">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Column: SVG Pathway */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="border border-border p-8 bg-background max-w-md w-full relative">
                <div className="absolute top-3 left-3 font-mono text-[8px] text-muted-foreground uppercase">
                  Figure 1.1 — Direct Olfactory Pathway
                </div>
                
                {/* Simulated Pathway Diagram */}
                <div className="space-y-6 pt-6 font-mono text-xs">
                  <div className="border border-border/60 p-3 bg-cream-brand/50">
                    <div className="text-secondary font-bold text-[10px] uppercase tracking-wider">01. Inhalation</div>
                    <p className="text-[10px] text-muted-foreground mt-1">Volatile botanical compounds enter nasal cavity passively.</p>
                  </div>
                  
                  <div className="h-6 w-px bg-border mx-auto relative">
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-accent rounded-full" />
                  </div>
                  
                  <div className="border border-border/60 p-3 bg-cream-brand/50">
                    <div className="text-secondary font-bold text-[10px] uppercase tracking-wider">02. Olfactory Bulb</div>
                    <p className="text-[10px] text-muted-foreground mt-1">Direct synapse bypasses the thalamus entirely—no cognitive lag.</p>
                  </div>
                  
                  <div className="h-6 w-px bg-border mx-auto relative">
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-accent rounded-full" />
                  </div>
                  
                  <div className="border border-primary p-3 bg-primary/5">
                    <div className="text-primary font-bold text-[10px] uppercase tracking-wider">03. Limbic Activation</div>
                    <p className="text-[10px] text-primary/80 mt-1">Immediate amygdala & hippocampus engagement. Autonomic regulation begins.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Copywriting Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
                [The Science of Scent]
              </div>
              <h2 className="text-3xl md:text-4xl text-primary font-serif font-semibold">
                The only sense that bypasses the rational mind.
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Unlike sight, touch, or sound, olfactory signals do not route through the thalamus—the brain's cognitive filter. Instead, scent molecules travel directly from the nasal cavity to the limbic system, the ancient neurological seat of emotion, memory, and autonomic nervous system regulation.
              </p>
              <p className="text-sm text-foreground/80 leading-relaxed">
                This is passive healing. You do not need to think, meditate, or consciously engage. Simply breathe. The botanical compounds do the neurological work for you, regulating your nervous system in real-time.
              </p>
              <div className="pt-4">
                <Link href="/science">
                  <Button variant="link" className="p-0 font-mono text-xs uppercase tracking-widest text-primary hover:text-secondary group">
                    Study the Mechanism <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Circadian Rhythm Optimization Matrix */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
              [Circadian Science]
            </div>
            <h2 className="text-3xl md:text-4xl text-primary font-serif font-semibold">
              Align Your Rhythm. Optimize Your Life.
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground">
              Your body operates on a 24-hour circadian cycle. Sana Essencia formulations are engineered to support each phase of your natural rhythm through passive olfactory cues.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-border">
            
            {/* Morning: Cortisol Awakening */}
            <div className="p-8 border-b md:border-b-0 md:border-r border-border hover:bg-card/50 transition-colors duration-300 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs text-muted-foreground">[PHASE-01]</span>
                  <Sun className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-2xl font-serif text-primary font-semibold">Morning Awakening</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Support natural cortisol rise and sensory activation. Menthol and citrus actives trigger TRPM8 cold receptors for immediate mental clarity.
                </p>
              </div>
              <div className="border-t border-border/60 pt-4 font-mono text-[11px] text-muted-foreground space-y-1">
                <div className="flex justify-between">
                  <span>TIME:</span>
                  <span className="text-primary font-semibold">06:00 — 10:00</span>
                </div>
                <div className="flex justify-between">
                  <span>ACTIVE:</span>
                  <span className="text-primary">Menthol / Limonene</span>
                </div>
                <div className="flex justify-between">
                  <span>EFFECT:</span>
                  <span className="text-secondary font-semibold">Alertness</span>
                </div>
              </div>
            </div>

            {/* Afternoon: Cognitive Focus */}
            <div className="p-8 border-b md:border-b-0 md:border-r border-border hover:bg-card/50 transition-colors duration-300 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs text-muted-foreground">[PHASE-02]</span>
                  <Zap className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-2xl font-serif text-primary font-semibold">Afternoon Focus</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Counter the post-lunch cognitive slump. 1,8-Cineole inhibits acetylcholinesterase, extending acetylcholine lifespan for sustained mental stamina.
                </p>
              </div>
              <div className="border-t border-border/60 pt-4 font-mono text-[11px] text-muted-foreground space-y-1">
                <div className="flex justify-between">
                  <span>TIME:</span>
                  <span className="text-primary font-semibold">13:00 — 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>ACTIVE:</span>
                  <span className="text-primary">1,8-Cineole</span>
                </div>
                <div className="flex justify-between">
                  <span>EFFECT:</span>
                  <span className="text-secondary font-semibold">Cognition</span>
                </div>
              </div>
            </div>

            {/* Evening: Sleep Transition */}
            <div className="p-8 hover:bg-card/50 transition-colors duration-300 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs text-muted-foreground">[PHASE-03]</span>
                  <Moon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-2xl font-serif text-primary font-semibold">Evening Reset</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Prepare for restorative sleep. Linalool modulates GABA-A receptors, down-regulating sympathetic tone and supporting melatonin synthesis.
                </p>
              </div>
              <div className="border-t border-border/60 pt-4 font-mono text-[11px] text-muted-foreground space-y-1">
                <div className="flex justify-between">
                  <span>TIME:</span>
                  <span className="text-primary font-semibold">20:00 — 23:00</span>
                </div>
                <div className="flex justify-between">
                  <span>ACTIVE:</span>
                  <span className="text-primary">Linalool</span>
                </div>
                <div className="flex justify-between">
                  <span>EFFECT:</span>
                  <span className="text-secondary font-semibold">Sleep</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Product Spotlight */}
      <section className="py-24 bg-card border-t border-border grid-notebook">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div className="space-y-4">
              <div className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
                [Product Spotlight]
              </div>
              <h2 className="text-3xl md:text-4xl text-primary font-serif font-semibold">
                The Core Formulations
              </h2>
            </div>
            <Link href="/products">
              <Button className="font-mono text-xs uppercase tracking-widest bg-primary text-primary-foreground hover:bg-secondary btn-tactile">
                View Full Apothecary
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Spotlight 1: Mist */}
            <div className="bg-background border border-border p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2 aspect-square overflow-hidden border border-border/40 relative bg-cream-brand/20">
                <img 
                  src={compressedMistBottle} 
                  alt="Sana Essencia Focus Spray Mist Bottle" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm px-2.5 py-1 font-mono text-[8px] uppercase tracking-wider border border-border">
                  Mist Formulation
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-4 flex flex-col justify-between h-full py-2">
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-accent tracking-widest uppercase font-semibold">N° 04 — FOCUS</span>
                  <h3 className="text-xl md:text-2xl font-serif text-primary font-semibold">Neuroambient Mist</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    A fast-acting, water-soluble micro-emulsion designed to clear cognitive fog instantly. Elevates ambient cineole concentration to stimulate cortical blood flow and acetylcholine production.
                  </p>
                </div>
                <div className="border-t border-border/60 pt-4 font-mono text-[10px] text-muted-foreground space-y-1">
                  <div>ACTIVE: 1,8-Cineole (84%)</div>
                  <div>CARRIER: Organic hydrosol</div>
                  <div>USE: Passive room inhalation</div>
                </div>
                <Link href="/products" className="pt-2">
                  <Button variant="outline" className="w-full font-mono text-[10px] uppercase tracking-widest border-primary text-primary hover:bg-primary hover:text-primary-foreground btn-tactile py-4">
                    Explore Details
                  </Button>
                </Link>
              </div>
            </div>

            {/* Spotlight 2: Candle */}
            <div className="bg-background border border-border p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2 aspect-square overflow-hidden border border-border/40 relative bg-cream-brand/20">
                <img 
                  src={compressedCandle} 
                  alt="Sana Essencia Calm Scented Candle" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm px-2.5 py-1 font-mono text-[8px] uppercase tracking-wider border border-border">
                  Candle Formulation
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-4 flex flex-col justify-between h-full py-2">
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-accent tracking-widest uppercase font-semibold">N° 01 — CALM</span>
                  <h3 className="text-xl md:text-2xl font-serif text-primary font-semibold">Circadian Candle</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    A slow-diffusing soy wax candle engineered for evening autonomic down-regulation. Releases continuous, gentle linalool vapors to support the melatonin transition into deep sleep.
                  </p>
                </div>
                <div className="border-t border-border/60 pt-4 font-mono text-[10px] text-muted-foreground space-y-1">
                  <div>ACTIVE: Linalool & Linalyl Acetate</div>
                  <div>BASE: 100% natural soy wax</div>
                  <div>BURN TIME: ~45 clinical hours</div>
                </div>
                <Link href="/products" className="pt-2">
                  <Button variant="outline" className="w-full font-mono text-[10px] uppercase tracking-widest border-primary text-primary hover:bg-primary hover:text-primary-foreground btn-tactile py-4">
                    Explore Details
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Testimonials Section */}
      <section className="py-24 bg-card border-t border-border grid-notebook">
        <div className="container max-w-4xl">
          <div className="text-center mb-16">
            <div className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
              [Clinical Validation]
            </div>
          </div>

          <div className="relative border border-border p-8 md:p-12 bg-background space-y-6">
            <Quote className="h-8 w-8 text-accent opacity-60 absolute -top-4 left-8 bg-background px-1" />
            
            <p className="text-base md:text-lg font-serif italic text-primary leading-relaxed text-center">
              "The passive nature of this approach is revolutionary. My patients do not need to remember to meditate or take supplements. They simply breathe. The circadian-aligned formulations have measurably improved their sleep architecture and daytime cognitive performance."
            </p>
            
            <div className="border-t border-border/60 pt-6 flex flex-col items-center space-y-1">
              <span className="font-serif text-sm font-bold text-primary">Dr. Evelyn Vance, PhD</span>
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                Sleep Neuroscientist & Clinical Researcher
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
