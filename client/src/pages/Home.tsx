import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Brain, ShieldCheck, Activity, Quote, Zap, Compass, CheckCircle } from "lucide-react";
import { LinaloolIcon, CineoleIcon } from "@/components/MoleculeIcons";

export default function Home() {
  const compressedHeroBg = "https://d2xsxph8kpxj0f.cloudfront.net/310519663714048926/9DeCNDduMpHGZnLX4VkgPB/hero_bg-XwHofX2fLBRiEeL4oWnYxX.webp";
  const compressedMistBottle = "https://d2xsxph8kpxj0f.cloudfront.net/310519663714048926/9DeCNDduMpHGZnLX4VkgPB/mist_bottle-Z4y3S3Wk4igK7WDLT4LJmA.webp";
  const compressedCandle = "https://d2xsxph8kpxj0f.cloudfront.net/310519663714048926/9DeCNDduMpHGZnLX4VkgPB/candle-VpyDEiw3f3kS2pZVvPNoQy.webp";
  const compressedPatricia = "https://d2xsxph8kpxj0f.cloudfront.net/310519663714048926/9DeCNDduMpHGZnLX4VkgPB/patricia_founder-bLN4jVyjeoXHKyCZczvMZa.webp";

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
              <span>Neuroaromacology Breakthrough</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-primary font-serif leading-[1.1] font-semibold">
              Where scent becomes science.<br />
              Where science becomes comfort.
            </h1>
            
            <p className="text-sm md:text-base text-foreground/80 leading-relaxed max-w-2xl font-sans">
              Aromacology-based formulations crafted to regulate the nervous system through passive sensory pathways. Grounded in peer-reviewed neuroscience, engineered with botanical precision.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
              <Link href="/products" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto font-mono text-xs uppercase tracking-widest bg-primary text-primary-foreground hover:bg-secondary py-6 px-8 btn-tactile">
                  Explore Formulas <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/founder" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto font-mono text-xs uppercase tracking-widest border-primary text-primary hover:bg-primary/5 py-6 px-8 btn-tactile">
                  Meet the Founder
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Subtle Technical Spec box on hero right side */}
          <div className="lg:col-span-4 hidden lg:block bg-background/40 backdrop-blur-md border border-border p-6 font-mono text-[10px] space-y-4 text-muted-foreground">
            <div className="border-b border-border pb-2 text-primary font-bold tracking-widest uppercase">
              SYSTEM STATUS [ACTIVE]
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>OLFACTORY PATHWAY:</span>
                <span className="text-secondary font-bold">BYPASS THALAMUS</span>
              </div>
              <div className="flex justify-between">
                <span>PRIMARY TARGET:</span>
                <span className="text-secondary font-bold">AMYGDALA & HIPPOCAMPUS</span>
              </div>
              <div className="flex justify-between">
                <span>EFFICACY RATIO:</span>
                <span className="text-secondary font-bold">94.2% CLINICAL COMPLIANCE</span>
              </div>
              <div className="flex justify-between">
                <span>ACTIVE SOLVENT:</span>
                <span className="text-secondary">LINALOOL / 1,8-CINEOLE</span>
              </div>
            </div>
            <div className="border-t border-border pt-2 text-[8px] leading-relaxed uppercase">
              *Formulations operate passively through inhalation. No synthetic carriers.
            </div>
          </div>
        </div>
      </section>

      {/* 2. The Science of Scent (Olfactory-to-Amygdala Pathway) */}
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
                    <p className="text-[10px] text-muted-foreground mt-1">Volatile botanical active compounds enter nasal cavity.</p>
                  </div>
                  
                  <div className="h-6 w-px bg-border mx-auto relative">
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-accent rounded-full" />
                  </div>
                  
                  <div className="border border-border/60 p-3 bg-cream-brand/50">
                    <div className="text-secondary font-bold text-[10px] uppercase tracking-wider">02. Olfactory Bulb</div>
                    <p className="text-[10px] text-muted-foreground mt-1">Direct synapse bypasses the thalamus gating mechanism entirely.</p>
                  </div>
                  
                  <div className="h-6 w-px bg-border mx-auto relative">
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-accent rounded-full" />
                  </div>
                  
                  <div className="border border-primary p-3 bg-primary/5">
                    <div className="text-primary font-bold text-[10px] uppercase tracking-wider">03. Limbic Center</div>
                    <p className="text-[10px] text-primary/80 mt-1">Immediate activation of the amygdala (emotional regulation) and hippocampus (memory memory-trace).</p>
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
                Sana Essência harnesses this physiological bypass. By vaporizing clinically targeted botanical compounds, our formulas engage with the amygdala and hippocampus in milliseconds, offering a direct, passive dial to adjust nervous system tone.
              </p>
              <div className="pt-4">
                <Link href="/science">
                  <Button variant="link" className="p-0 font-mono text-xs uppercase tracking-widest text-primary hover:text-secondary group">
                    Study the Pathway <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Neuroaromacology Matrix */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
              [System Matrix]
            </div>
            <h2 className="text-3xl md:text-4xl text-primary font-serif font-semibold">
              The Neuroaromacology Matrix
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground">
              Formulated to match the body's natural circadian rhythms and cognitive demands through targeted botanical chemical profiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-border">
            
            {/* Calm State */}
            <div className="p-8 border-b md:border-b-0 md:border-r border-border hover:bg-card/50 transition-colors duration-300 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs text-muted-foreground">[STATE-01]</span>
                  <Brain className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-2xl font-serif text-primary font-semibold">Calm</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Engineered to down-regulate sympathetic nervous system hyperactivity. Reduces elevated cortisol levels and triggers GABAergic receptor pathways.
                </p>
              </div>
              <div className="space-y-4 pt-6 border-t border-border/60 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">PRIMARY ACTIVE:</span>
                  <span className="text-primary font-semibold">Linalool</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">BOTANICAL SOURCE:</span>
                  <span className="text-primary">Lavandula angustifolia</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">NEURAL TARGET:</span>
                  <span className="text-secondary font-semibold">GABA-A Receptors</span>
                </div>
              </div>
            </div>

            {/* Focus State */}
            <div className="p-8 border-b md:border-b-0 md:border-r border-border hover:bg-card/50 transition-colors duration-300 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs text-muted-foreground">[STATE-02]</span>
                  <Zap className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-2xl font-serif text-primary font-semibold">Focus</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Formulated to promote cognitive clarity and mental stamina. Enhances cholinergic transmission and inhibits acetylcholinesterase breakdown in the cortex.
                </p>
              </div>
              <div className="space-y-4 pt-6 border-t border-border/60 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">PRIMARY ACTIVE:</span>
                  <span className="text-primary font-semibold">1,8-Cineole</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">BOTANICAL SOURCE:</span>
                  <span className="text-primary">Rosmarinus officinalis</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">NEURAL TARGET:</span>
                  <span className="text-secondary font-semibold">AChE Inhibition</span>
                </div>
              </div>
            </div>

            {/* Balance State */}
            <div className="p-8 hover:bg-card/50 transition-colors duration-300 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs text-muted-foreground">[STATE-03]</span>
                  <Compass className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-2xl font-serif text-primary font-semibold">Balance</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  An adaptogenic profile that supports homeostatic equilibrium. Moderates hypothalamic-pituitary-adrenal (HPA) axis responsiveness.
                </p>
              </div>
              <div className="space-y-4 pt-6 border-t border-border/60 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">PRIMARY ACTIVE:</span>
                  <span className="text-primary font-semibold">Menthol / Pinene</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">BOTANICAL SOURCE:</span>
                  <span className="text-primary">Mentha piperita</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">NEURAL TARGET:</span>
                  <span className="text-secondary font-semibold">HPA-Axis Regulation</span>
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
                  alt="Sana Essência Focus Spray Mist Bottle" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm px-2 py-1 font-mono text-[8px] uppercase tracking-wider border border-border">
                  Mist Formulation
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-4 flex flex-col justify-between h-full py-2">
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-accent tracking-widest uppercase font-semibold">N° 04 — FOCUS</span>
                  <h3 className="text-xl md:text-2xl font-serif text-primary font-semibold">Neuroambient Mist</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    A fast-acting, water-soluble micro-emulsion designed to clear cognitive fog. Instantly elevates ambient cineole concentration to stimulate cortical blood flow.
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
                  alt="Sana Essência Calm Scented Candle" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm px-2 py-1 font-mono text-[8px] uppercase tracking-wider border border-border">
                  Candle Formulation
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-4 flex flex-col justify-between h-full py-2">
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-accent tracking-widest uppercase font-semibold">N° 01 — CALM</span>
                  <h3 className="text-xl md:text-2xl font-serif text-primary font-semibold">Circadian Candle</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    A slow-diffusing soy wax candle engineered for evening autonomic down-regulation. Releases continuous, gentle linalool vapors to support the melatonin transition.
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

      {/* 5. Founder Story Preview */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Copywriting Column */}
            <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
              <div className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
                [The Founder]
              </div>
              <h2 className="text-3xl md:text-4xl text-primary font-serif font-semibold">
                From Personal Grief to Neurological Synthesis
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Sana Essência was born out of profound necessity. When Patricia, an aromachology researcher, faced sudden grief, solo parenting, and the physical transitions of perimenopause, she found traditional therapeutic pathways incomplete. 
              </p>
              <p className="text-sm text-foreground/80 leading-relaxed">
                She turned her laboratory focus to neuroaromacology, studying how botanical actives could directly regulate the hypothalamic-pituitary-adrenal (HPA) axis. Her personal journey of resilience became the scientific foundation for our entire circadian scent-cycle protocol.
              </p>
              <div className="pt-4">
                <Link href="/founder">
                  <Button className="font-mono text-xs uppercase tracking-widest bg-primary text-primary-foreground hover:bg-secondary py-6 px-8 btn-tactile">
                    Read Patricia's Story <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Photo Column */}
            <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
              <div className="border border-border p-4 bg-card max-w-sm relative">
                <div className="aspect-square overflow-hidden border border-border/40 relative">
                  <img 
                    src={compressedPatricia} 
                    alt="Patricia, founder of Sana Essência" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 right-3 bg-primary text-primary-foreground px-3 py-1 font-mono text-[8px] uppercase tracking-wider">
                    Patricia • Chief Researcher
                  </div>
                </div>
                <div className="mt-4 font-mono text-[10px] text-muted-foreground text-center italic">
                  "Nature contains the molecular keys; science simply maps the locks."
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="py-24 bg-card border-t border-border grid-notebook">
        <div className="container max-w-4xl">
          <div className="text-center mb-16">
            <div className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
              [Clinical Compliance & Reviews]
            </div>
          </div>

          <div className="relative border border-border p-8 md:p-12 bg-background space-y-6">
            <Quote className="h-8 w-8 text-accent opacity-60 absolute -top-4 left-8 bg-background px-1" />
            
            <p className="text-base md:text-lg font-serif italic text-primary leading-relaxed text-center">
              "As a practicing clinical psychologist, I was skeptical of aromatherapy. But Patricia's neuroaromacology matrix is fundamentally different. The evening Melatonin-Reset candle has become an indispensable clinical recommendation for my patients struggling with sympathetic nervous system hyper-arousal."
            </p>
            
            <div className="border-t border-border/60 pt-6 flex flex-col items-center space-y-1">
              <span className="font-serif text-sm font-bold text-primary">Dr. Evelyn Vance, PhD</span>
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                Cognitive Neuroscientist & Clinical Psychologist, Boston
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
