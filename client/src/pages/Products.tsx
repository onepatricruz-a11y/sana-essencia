import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { LinaloolIcon, CineoleIcon, MentholIcon } from "@/components/MoleculeIcons";
import { ArrowUpRight, Sparkles, Flame, Wind, Eye } from "lucide-react";

export default function Products() {
  const compressedMistBottle = "https://d2xsxph8kpxj0f.cloudfront.net/310519663714048926/9DeCNDduMpHGZnLX4VkgPB/mist_bottle-Z4y3S3Wk4igK7WDLT4LJmA.webp";
  const compressedCandle = "https://d2xsxph8kpxj0f.cloudfront.net/310519663714048926/9DeCNDduMpHGZnLX4VkgPB/candle-VpyDEiw3f3kS2pZVvPNoQy.webp";

  const products = [
    {
      id: "mist-focus",
      name: "Formula N° 04 — Focus Mist",
      category: "Neuroambient Mists",
      function: "Focus",
      keyCompounds: "1,8-Cineole, Alpha-Pinene",
      botanicalSources: "Rosmarinus officinalis (Rosemary), Mentha piperita (Peppermint)",
      howItWorks: "Inhibits acetylcholinesterase (AChE) breakdown in the frontal cortex, extending acetylcholine lifespan to enhance synaptic speed and cognitive stamina.",
      useInstructions: "Mist 3-4 pumps in the workspace ambient air during high-demand cognitive tasks. Avoid direct skin contact.",
      image: compressedMistBottle,
      price: "$48.00",
      size: "100ml e | 3.38 fl. oz",
      icon: <CineoleIcon size={36} className="text-accent" />
    },
    {
      id: "candle-calm",
      name: "Formula N° 01 — Calm Candle",
      category: "Circadian Candles",
      function: "Calm",
      keyCompounds: "Linalool, Linalyl Acetate",
      botanicalSources: "Lavandula angustifolia (Lavender), Santalum album (Sandalwood)",
      howItWorks: "Binds as a competitive antagonist at NMDA glutamate receptors while modulating GABA-A receptor response, reducing sympathetic flight-or-fight signaling.",
      useInstructions: "Burn for 1-2 hours in the evening. Allow the volatile vapors to passively diffuse throughout the room before sleep.",
      image: compressedCandle,
      price: "$64.00",
      size: "230g | 8.1 oz | 45 hr burn",
      icon: <LinaloolIcon size={36} className="text-accent" />
    },
    {
      id: "mist-balance",
      name: "Formula N° 07 — Balance Mist",
      category: "Neuroambient Mists",
      function: "Balance",
      keyCompounds: "Menthol, Limonene",
      botanicalSources: "Mentha piperita (Peppermint), Citrus limon (Lemon)",
      howItWorks: "Selectively stimulates TRPM8 cold-sensitive ion channels in the trigeminal pathway, triggering a refreshing cortical reflex and stabilizing cortisol fluctuations.",
      useInstructions: "Spray 2-3 pumps overhead during transitions or moments of acute sensory overwhelm. Inhale deeply.",
      image: compressedMistBottle,
      price: "$48.00",
      size: "100ml e | 3.38 fl. oz",
      icon: <MentholIcon size={36} className="text-accent" />
    }
  ];

  const handleAcquire = (productName: string) => {
    toast.success("Allocation Request Initiated", {
      description: `${productName} has been added to your request list. Patricia's lab will verify clinical availability.`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Header */}
      <section className="bg-card text-card-foreground border-b border-border py-16 grid-notebook">
        <div className="container max-w-4xl text-center space-y-4">
          <div className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
            [Apothecary Catalog]
          </div>
          <h1 className="text-3xl md:text-5xl font-serif text-primary font-bold">
            The Formulations
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Isolating therapeutic botanical molecules to regulate the autonomic nervous system. No synthetic additives, no filler carriers, purely active clinical compounds.
          </p>
        </div>
      </section>

      {/* Product Grid Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="space-y-20">
            {products.map((product, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={product.id}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-16 ${
                    index !== products.length - 1 ? "border-b border-border/60" : ""
                  }`}
                >
                  
                  {/* Image Column */}
                  <div className={`lg:col-span-5 flex justify-center ${!isEven ? "lg:order-2" : ""}`}>
                    <div className="border border-border p-4 bg-card w-full max-w-md relative">
                      <div className="aspect-square overflow-hidden border border-border/40 relative bg-cream-brand/20">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider border border-border font-bold text-primary">
                          {product.category}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details Column */}
                  <div className={`lg:col-span-7 space-y-6 ${!isEven ? "lg:order-1" : ""}`}>
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge variant="outline" className="font-mono text-[9px] uppercase tracking-widest border-primary/20 text-secondary bg-primary/5 px-2.5 py-0.5">
                        {product.function} STATE
                      </Badge>
                      <span className="font-mono text-xs text-muted-foreground">{product.size}</span>
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-2xl md:text-3xl font-serif text-primary font-semibold">
                        {product.name}
                      </h2>
                      <div className="text-xl font-mono text-secondary font-bold">{product.price}</div>
                    </div>

                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {product.howItWorks}
                    </p>

                    {/* Scientific Specifications */}
                    <div className="border-y border-border/60 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-[11px] text-muted-foreground">
                      <div className="space-y-1">
                        <div className="text-primary font-bold uppercase text-[9px] tracking-wider flex items-center gap-1.5">
                          {product.icon}
                          <span>Molecular Active Profile</span>
                        </div>
                        <div className="pt-1">Compounds: {product.keyCompounds}</div>
                        <div>Sources: {product.botanicalSources}</div>
                      </div>
                      <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-border/60 sm:pl-4">
                        <div className="text-primary font-bold uppercase text-[9px] tracking-wider flex items-center gap-1.5 h-[36px]">
                          <span>Protocol Application</span>
                        </div>
                        <div>Method: Ambient Vapor Inhalation</div>
                        <div>Guidance: {product.useInstructions}</div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button 
                        onClick={() => handleAcquire(product.name)}
                        className="w-full sm:w-auto font-mono text-xs uppercase tracking-widest bg-primary text-primary-foreground hover:bg-secondary py-6 px-8 btn-tactile"
                      >
                        Request Formulation Allocation <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quality Standards Banner */}
      <section className="py-16 bg-card border-t border-border text-card-foreground grid-notebook">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="space-y-2">
              <Wind className="h-6 w-6 text-accent mx-auto md:mx-0" />
              <h4 className="font-serif text-base font-bold text-primary">100% Volatile Actives</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Zero synthetic fixatives, phthalates, or chemical propellants. Our formulas utilize only natural, volatile organic compounds that diffuse cleanly into ambient air.
              </p>
            </div>
            <div className="space-y-2">
              <Flame className="h-6 w-6 text-accent mx-auto md:mx-0" />
              <h4 className="font-serif text-base font-bold text-primary">Circadian Engineering</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every formulation is molecularly balanced to match endogenous circadian endocrine transitions, supporting natural cortisol and melatonin cycles.
              </p>
            </div>
            <div className="space-y-2">
              <Sparkles className="h-6 w-6 text-accent mx-auto md:mx-0" />
              <h4 className="font-serif text-base font-bold text-primary">Clinical Traceability</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All botanical inputs are analyzed via gas chromatography-mass spectrometry (GC-MS) to guarantee precise active compound concentrations.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
