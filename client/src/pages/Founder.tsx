import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Quote, Award, Microscope, HeartHandshake } from "lucide-react";

export default function Founder() {
  const compressedPatricia = "https://d2xsxph8kpxj0f.cloudfront.net/310519663714048926/9DeCNDduMpHGZnLX4VkgPB/patricia_founder-bLN4jVyjeoXHKyCZczvMZa.webp";

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Header */}
      <section className="bg-card text-card-foreground border-b border-border py-16 grid-notebook">
        <div className="container max-w-4xl text-center space-y-4">
          <div className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
            [The Founder's Lab]
          </div>
          <h1 className="text-3xl md:text-5xl font-serif text-primary font-bold">
            Patricia’s Story
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            A convergence of academic rigor, profound personal grief, and the resilient pursuit of natural neurological restoration.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Side: Photo & Quick Bio */}
            <div className="lg:col-span-5 flex flex-col items-center space-y-6 lg:sticky lg:top-28">
              <div className="border border-border p-4 bg-card w-full max-w-sm relative">
                <div className="aspect-square overflow-hidden border border-border/40 relative">
                  <img 
                    src={compressedPatricia} 
                    alt="Patricia, Founder of Sana Essência" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 right-3 bg-primary text-primary-foreground px-3 py-1 font-mono text-[8px] uppercase tracking-wider">
                    Patricia • Aromachology Researcher
                  </div>
                </div>
                
                <div className="mt-6 space-y-3 font-mono text-[11px] text-muted-foreground border-t border-border/60 pt-4">
                  <div className="flex justify-between">
                    <span>ACADEMIC FOCUS:</span>
                    <span className="text-primary font-bold">Neuroaromacology</span>
                  </div>
                  <div className="flex justify-between">
                    <span>LABORATORY LOCATION:</span>
                    <span className="text-primary">Coimbra Research Park</span>
                  </div>
                  <div className="flex justify-between">
                    <span>PRIOR RESEARCH:</span>
                    <span className="text-primary">HPA-Axis Regulation</span>
                  </div>
                </div>
              </div>

              {/* Lab process highlight box */}
              <div className="border border-border p-5 bg-card w-full max-w-sm font-mono text-[10px] space-y-2 text-muted-foreground uppercase">
                <div className="text-primary font-bold text-[11px] tracking-wider mb-2">
                  THE LAB METHODOLOGY
                </div>
                <div>01. Gas Chromatography Active Isolation</div>
                <div>02. Chiral Separation of Terpenes</div>
                <div>03. Inhalation Kinetic Modeling</div>
                <div>04. Cortisol Salivary Assay Testing</div>
              </div>
            </div>

            {/* Right Side: Detailed Story (Scientific, Personal, Resilient) */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="space-y-4">
                <div className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
                  [The Genesis]
                </div>
                <h2 className="text-2xl md:text-3xl font-serif text-primary font-semibold">
                  Scientist, Counselor, Mother
                </h2>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Before founding Sana Essência, Patricia spent over two decades navigating the intersections of human biology and emotional processing. With academic credentials spanning **neuroscience, psychological counseling, and botanical pharmacology**, she dedicated her early career to understanding how the central nervous system responds to stress, trauma, and environmental triggers.
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  She worked in clinical environments, helping patients map their emotional landscapes while conducting academic research on the **hypothalamic-pituitary-adrenal (HPA) axis**—the body's primary stress response system.
                </p>
              </div>

              <div className="space-y-4 border-l-2 border-accent pl-6 py-2 bg-accent/5">
                <h3 className="font-serif text-lg font-bold text-primary italic">
                  "Grief is not a cognitive puzzle to be solved. It is a somatic state that must be lived and regulated."
                </h3>
                <p className="text-xs text-muted-foreground font-mono uppercase">
                  — Patricia, on her transition to neuroaromacology
                </p>
              </div>

              <div className="space-y-4">
                <div className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
                  [The Crucible]
                </div>
                <h2 className="text-2xl md:text-3xl font-serif text-primary font-semibold">
                  Grief, Solo Parenting, and Perimenopause
                </h2>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  In 2019, Patricia's theoretical understanding of trauma became a sudden, visceral reality. Following a profound personal loss, she found herself navigating intense grief, the overwhelming demands of solo parenting, and the systemic endocrine shifts of early perimenopause. 
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  "The standard therapeutic tools I had practiced and researched for years felt inadequate," Patricia shares. "Cognitive behavioral strategies require cortical energy—energy that is entirely depleted when you are in a state of survival-induced nervous system exhaustion. I realized I needed a somatic, passive way to communicate safety to my brain."
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  She returned to her laboratory with a singular focus: **olfactory bypass kinetics**. She knew that scent was the only sensory signal capable of directly reaching the amygdala within milliseconds without requiring conscious cognitive effort.
                </p>
              </div>

              <div className="space-y-4">
                <div className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
                  [The Synthesis]
                </div>
                <h2 className="text-2xl md:text-3xl font-serif text-primary font-semibold">
                  The Synthesis of Sana Essência
                </h2>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Working late nights at her lab bench, Patricia began isolating volatile organic compounds from botanical extracts. She wasn't seeking pleasing fragrances; she was mapping **biochemical targets**. She synthesized and tested combinations of linalool, 1,8-cineole, and menthol, measuring her own physiological indicators of sympathetic tone—heart rate variability, blood pressure, and salivary cortisol.
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  What emerged was the **Sana Essência Circadian Cycle**—a series of precise, clinically clean formulations that passively regulate the autonomic nervous system on a predictable 24-hour cycle. 
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Today, Patricia continues to oversee every batch of formulations synthesized in her Portugal lab. Sana Essência remains a researcher-founded, independent laboratory, refusing to compromise on chemical purity or scientific transparency.
                </p>
              </div>

              {/* Core Values / Lab Commitments */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-border/60">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-secondary">
                    <Microscope className="h-4 w-4" />
                    <span className="font-mono text-xs uppercase tracking-wider font-bold">Empirical Rigor</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    We never formulate based on trends. Every molecule, concentration, and carrier is backed by peer-reviewed neurobiology literature.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-secondary">
                    <HeartHandshake className="h-4 w-4" />
                    <span className="font-mono text-xs uppercase tracking-wider font-bold">Radical Transparency</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Our lab sheets and gas chromatography-mass spectrometry (GC-MS) analysis reports are available to any researcher or customer upon request.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
