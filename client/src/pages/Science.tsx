import { LinaloolIcon, CineoleIcon, MentholIcon } from "@/components/MoleculeIcons";
import { ArrowRight, Brain, Zap, Moon, Activity, EyeOff, ShieldAlert, Award } from "lucide-react";

export default function Science() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Page Header */}
      <section className="bg-card text-card-foreground border-b border-border py-16 grid-notebook">
        <div className="container max-w-4xl text-center space-y-4">
          <div className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
            [Technical Documentation]
          </div>
          <h1 className="text-3xl md:text-5xl font-serif text-primary font-bold">
            The Neuroaromacology Protocol
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            An exploration of the direct olfactory bypass, limbic system modulation, and the clinical efficacy of botanical chemical actives.
          </p>
        </div>
      </section>

      {/* 1. The Olfactory Bypass & Thalamus */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
                [Pathway Mechanism 01]
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-primary font-semibold">
                The Thalamus Bypass: Direct Synaptic Entry
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                In standard sensory processing (vision, hearing, somatosensory), peripheral signals are routed to the **thalamus**—the brain's central sorting station and cognitive gatekeeper. The thalamus evaluates, filters, and down-regulates signals before they reach the cerebral cortex for conscious awareness.
              </p>
              
              <div className="bg-card border border-border p-5 space-y-3">
                <div className="flex items-center space-x-3 text-secondary">
                  <EyeOff className="h-5 w-5" />
                  <span className="font-mono text-xs uppercase tracking-wider font-bold">The Exception: Olfaction</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Olfactory receptors in the nasal epithelium project axons directly into the **olfactory bulb**. From there, signals travel via the lateral olfactory tract directly to the **primary olfactory cortex** and the **limbic system**, completely bypassing the thalamus filter.
                </p>
              </div>

              <p className="text-sm text-foreground/80 leading-relaxed">
                This direct pathway is an evolutionary survival mechanism, enabling instantaneous physiological responses to environmental chemicals. Sana Essência leverages this direct connection to introduce therapeutic molecular actives straight to emotional and autonomic control centers without cognitive lag.
              </p>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              {/* Technical diagram box */}
              <div className="border border-border p-6 bg-card w-full max-w-md font-mono text-[11px] space-y-6">
                <div className="border-b border-border pb-2 text-primary font-bold uppercase tracking-wider">
                  Fig 2.1 — COMPARATIVE SENSORY ROUTING
                </div>
                
                {/* Standard Route */}
                <div className="space-y-2">
                  <div className="text-muted-foreground font-semibold uppercase text-[9px]">[STANDARD SENSES: SIGHT / SOUND]</div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <span className="bg-muted px-2 py-0.5 border border-border">Sensory Receptor</span>
                    <span>→</span>
                    <span className="bg-muted px-2 py-0.5 border border-border font-bold text-primary">Thalamus (Gating)</span>
                    <span>→</span>
                    <span className="bg-muted px-2 py-0.5 border border-border">Cortex</span>
                  </div>
                </div>

                {/* Olfactory Route */}
                <div className="space-y-2 border-t border-border/40 pt-4">
                  <div className="text-secondary font-semibold uppercase text-[9px]">[OLFACTORY ROUTE: SANA ESSÊNCIA]</div>
                  <div className="flex items-center space-x-2 text-primary">
                    <span className="bg-primary/5 border border-primary px-2 py-0.5 font-bold">Nasal Epithelium</span>
                    <span>→</span>
                    <span className="bg-secondary/10 border border-secondary px-2 py-0.5 font-bold text-secondary">Limbic System</span>
                    <span>→</span>
                    <span className="bg-primary/5 border border-primary px-2 py-0.5">Autonomic Response</span>
                  </div>
                </div>

                <div className="bg-accent/10 border border-accent/20 p-3 text-[10px] leading-relaxed text-accent-foreground uppercase">
                  <strong>CRITICAL FINDING:</strong> Olfactory stimulation registers in the limbic cortex within 150-200 milliseconds, faster than any conscious cognitive appraisal.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Amygdala & Hippocampus Activation */}
      <section className="py-24 bg-card text-card-foreground border-y border-border grid-notebook">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <div className="border border-border p-6 bg-background w-full max-w-md space-y-6">
                <div className="font-mono text-[9px] text-muted-foreground uppercase border-b border-border pb-2">
                  NEURAL MAPPING [LIMBIC CENTER]
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/5 border border-primary p-2 mt-1">
                      <Brain className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-primary">Amygdala Modulation</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Governs the flight-or-fight sympathetic response. Inhalation of linalool down-regulates amygdalar hyperactivity, mitigating acute stress.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 border-t border-border/60 pt-4">
                    <div className="bg-primary/5 border border-primary p-2 mt-1">
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-primary">Hippocampal Memory-Trace</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Mediates memory formation and emotional associations. Scent triggers powerful memory anchoring, reinforcing long-term behavioral habits.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <div className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
                [Pathway Mechanism 02]
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-primary font-semibold">
                Direct Limbic Engagement: Amygdala & Hippocampus
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Once the olfactory tract bypasses the thalamus, it synapses directly onto the structures of the **limbic system**. The two primary targets of our aromacology formulations are:
              </p>
              <ul className="space-y-3 text-sm text-foreground/80">
                <li className="flex items-start">
                  <span className="font-mono text-xs text-accent mr-2 mt-1">01.</span>
                  <span><strong>The Amygdala:</strong> The emotional epicenter of the brain, responsible for processing fear, anxiety, and autonomic arousal. By modulating amygdala firing rates, our calming formulations reduce acute sympathetic output (lowering heart rate and blood pressure).</span>
                </li>
                <li className="flex items-start">
                  <span className="font-mono text-xs text-accent mr-2 mt-1">02.</span>
                  <span><strong>The Hippocampus:</strong> The seat of memory consolidation. Because of the direct link between the olfactory bulb and the hippocampus, scents are uniquely capable of evoking vivid memories and establishing robust, positive emotional associations. This allows our rituals to create lasting neurological "habits of calm."</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Biochemical Actives (The Molecules) */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
              [Molecular Taxonomy]
            </div>
            <h2 className="text-3xl font-serif text-primary font-bold">
              Botanical Actives & Chemical Profiles
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground">
              Sana Essência does not use generic "fragrances." We isolate specific volatile organic compounds with proven neurochemical mechanisms of action.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Linalool */}
            <div className="border border-border p-6 bg-card flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-border/60 pb-4">
                  <div>
                    <span className="font-mono text-[10px] text-muted-foreground">[COMPOUND-01]</span>
                    <h3 className="font-serif text-xl font-bold text-primary">Linalool</h3>
                  </div>
                  <LinaloolIcon size={50} className="text-accent" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A terpene alcohol found abundantly in lavender. It acts as an antagonist at NMDA receptors and modulates GABAergic transmission, producing a systemic sedative effect similar to low-dose clinical anxiolytics.
                </p>
              </div>
              <div className="pt-4 border-t border-border/60 font-mono text-[10px] text-muted-foreground space-y-1">
                <div>FORMULA: C₁₀H₁₈O</div>
                <div>MECHANISM: GABA-A Modulation</div>
                <div>SOURCE: Lavandula angustifolia</div>
              </div>
            </div>

            {/* 1,8-Cineole */}
            <div className="border border-border p-6 bg-card flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-border/60 pb-4">
                  <div>
                    <span className="font-mono text-[10px] text-muted-foreground">[COMPOUND-02]</span>
                    <h3 className="font-serif text-xl font-bold text-primary">1,8-Cineole</h3>
                  </div>
                  <CineoleIcon size={50} className="text-accent" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A monoterpene ether abundant in rosemary and eucalyptus. It inhibits acetylcholinesterase (AChE), the enzyme that breaks down the neurotransmitter acetylcholine, thereby improving cognitive focus, speed, and accuracy.
                </p>
              </div>
              <div className="pt-4 border-t border-border/60 font-mono text-[10px] text-muted-foreground space-y-1">
                <div>FORMULA: C₁₀H₁₈O</div>
                <div>MECHANISM: AChE Inhibition</div>
                <div>SOURCE: Rosmarinus officinalis</div>
              </div>
            </div>

            {/* Menthol */}
            <div className="border border-border p-6 bg-card flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-border/60 pb-4">
                  <div>
                    <span className="font-mono text-[10px] text-muted-foreground">[COMPOUND-03]</span>
                    <h3 className="font-serif text-xl font-bold text-primary">Menthol</h3>
                  </div>
                  <MentholIcon size={50} className="text-accent" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A covalent organic compound found in mint. It selectively activates TRPM8 cold receptors in sensory nerves, triggering cortical arousal, physical refreshment, and down-regulating acute cortisol surges.
                </p>
              </div>
              <div className="pt-4 border-t border-border/60 font-mono text-[10px] text-muted-foreground space-y-1">
                <div>FORMULA: C₁₀H₂₀O</div>
                <div>MECHANISM: TRPM8 Activation</div>
                <div>SOURCE: Mentha piperita</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Circadian-Aligned Scent Cycles */}
      <section className="py-24 bg-card text-card-foreground border-t border-border grid-notebook">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
                [Chronobiology Integration]
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-primary font-semibold">
                Circadian-Aligned Scent Cycles
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Human neurobiology is fundamentally cyclic. Cortisol spikes in the morning to wake us, cognitive endurance peaks in the afternoon, and melatonin rises in the evening to prepare us for restorative sleep.
              </p>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Sana Essência formulations are engineered to align with these endogenous clocks. Rather than a static sensory environment, our protocol utilizes a **Circadian Scent Cycle**—introducing specific biochemical triggers at precise biological intervals to reinforce healthy endocrine transitions and autonomic tone throughout the day.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 font-mono text-xs">
                <div className="border border-border/60 p-4 bg-background">
                  <div className="text-accent font-bold">08:00 — AWAKENING</div>
                  <p className="text-[10px] text-muted-foreground mt-1">Cortisol modulation & sensory awakening via refreshing TRPM8 actives.</p>
                </div>
                <div className="border border-border/60 p-4 bg-background">
                  <div className="text-accent font-bold">14:00 — CLARITY</div>
                  <p className="text-[10px] text-muted-foreground mt-1">AChE inhibition to prevent the mid-afternoon cognitive slump.</p>
                </div>
                <div className="border border-border/60 p-4 bg-background">
                  <div className="text-accent font-bold">21:00 — RESET</div>
                  <p className="text-[10px] text-muted-foreground mt-1">GABAergic up-regulation to ease the transition into deep slow-wave sleep.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="border border-border p-6 bg-background w-full max-w-md relative text-center space-y-6">
                <div className="absolute top-3 left-3 font-mono text-[8px] text-muted-foreground uppercase">
                  Figure 2.2 — Circadian Cycle
                </div>
                
                {/* Visual Circle Clock representing Scent Cycles */}
                <div className="w-48 h-48 rounded-full border-2 border-dashed border-border/80 mx-auto flex items-center justify-center relative mt-4">
                  <div className="absolute inset-4 rounded-full border border-primary/20 flex items-center justify-center">
                    <span className="font-serif text-sm text-primary font-bold">Sana Cycle</span>
                  </div>
                  
                  {/* Interactive node representations */}
                  <div className="absolute top-0 -translate-y-1/2 bg-background border border-primary px-2 py-0.5 font-mono text-[9px] text-primary font-bold">
                    Morning (Focus)
                  </div>
                  <div className="absolute right-0 translate-x-1/3 bg-background border border-primary px-2 py-0.5 font-mono text-[9px] text-primary font-bold">
                    Afternoon (Balance)
                  </div>
                  <div className="absolute bottom-0 translate-y-1/2 bg-background border border-primary px-2 py-0.5 font-mono text-[9px] text-primary font-bold">
                    Night (Calm)
                  </div>
                </div>
                
                <p className="text-[10px] text-muted-foreground font-mono leading-relaxed uppercase pt-2">
                  *Synchronizing external botanical cues with internal circadian pacemakers.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
