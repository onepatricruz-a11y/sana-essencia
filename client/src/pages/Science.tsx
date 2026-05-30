import { Brain, Zap, Moon, Activity } from "lucide-react";

export default function Science() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Page Header */}
      <section className="py-16 bg-background border-b border-border">
        <div className="container space-y-4">
          <h1 
            className="text-5xl font-light text-primary"
            style={{fontFamily: "Cormorant Garamond, serif"}}
          >
            The Science
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            How botanical volatile compounds support your body's natural circadian rhythms and optimize cognitive and emotional performance through passive olfactory pathways.
          </p>
        </div>
      </section>

      {/* 1. The Olfactory Pathway */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 
                className="text-4xl font-light text-primary"
                style={{fontFamily: "Cormorant Garamond, serif"}}
              >
                Direct Olfactory Pathway
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Unlike other senses (vision, hearing, touch), which are processed through the thalamus before reaching the limbic system, olfactory signals travel directly from the nasal epithelium to the olfactory bulb and into the limbic system—the brain's emotional and autonomic control center. This direct pathway enables rapid, non-cognitive responses to environmental scents.
              </p>
            </div>

            <div className="border border-border bg-background p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Standard Sensory Route</p>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-accent font-semibold">Sensory Receptor</span> → Thalamus (filtering) → Cortex (conscious awareness)</p>
                    <p className="text-xs text-muted-foreground">Processing time: 150-300ms</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-mono uppercase tracking-wider text-accent mb-3">Olfactory Route (Sana Essencia)</p>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-accent font-semibold">Nasal Epithelium</span> → Olfactory Bulb → Limbic System (direct)</p>
                    <p className="text-xs text-muted-foreground">Processing time: 50-100ms</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              This direct pathway is an evolutionary adaptation that allows rapid responses to environmental chemicals. Sana Essencia formulations leverage this direct connection to support your body's natural neurotransmitter systems without cognitive lag.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Limbic System & Autonomic Regulation */}
      <section className="py-24 bg-background border-b border-border">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 
                className="text-4xl font-light text-primary"
                style={{fontFamily: "Cormorant Garamond, serif"}}
              >
                Limbic System & Autonomic Regulation
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The limbic system controls emotional processing, memory formation, and autonomic nervous system regulation. Olfactory signals reaching this region can influence:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="clinical-card">
                <Brain className="h-6 w-6 text-accent mb-3" />
                <h3 className="font-serif text-lg text-primary mb-2">Emotional State</h3>
                <p className="text-xs text-muted-foreground">Scent directly influences mood, stress perception, and emotional resilience through amygdala activation.</p>
              </div>
              <div className="clinical-card">
                <Activity className="h-6 w-6 text-accent mb-3" />
                <h3 className="font-serif text-lg text-primary mb-2">Autonomic Balance</h3>
                <p className="text-xs text-muted-foreground">Olfactory input modulates parasympathetic (rest) and sympathetic (alert) nervous system tone.</p>
              </div>
              <div className="clinical-card">
                <Moon className="h-6 w-6 text-accent mb-3" />
                <h3 className="font-serif text-lg text-primary mb-2">Circadian Rhythm</h3>
                <p className="text-xs text-muted-foreground">Specific compounds support natural cortisol and melatonin cycles aligned with your daily schedule.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Botanical Compounds & Mechanisms */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 
                className="text-4xl font-light text-primary"
                style={{fontFamily: "Cormorant Garamond, serif"}}
              >
                Botanical Compounds
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sana Essencia formulations contain specific volatile organic compounds (VOCs) from botanical sources, each with documented interactions with neurotransmitter systems:
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  name: "1,8-Cineole",
                  source: "Rosemary, Eucalyptus",
                  mechanism: "Acetylcholinesterase inhibition",
                  effect: "Supports sustained cognitive focus and memory clarity",
                  time: "Morning / Afternoon"
                },
                {
                  name: "Limonene",
                  source: "Lemon, Orange, Grapefruit",
                  mechanism: "Serotonin and dopamine modulation",
                  effect: "Promotes mood elevation and mental clarity",
                  time: "Morning / Afternoon"
                },
                {
                  name: "Linalool",
                  source: "Lavender, Mint",
                  mechanism: "GABA-A receptor modulation",
                  effect: "Supports relaxation and parasympathetic activation",
                  time: "Evening"
                },
                {
                  name: "Menthol",
                  source: "Peppermint",
                  mechanism: "TRPM8 cold receptor activation",
                  effect: "Promotes alertness and sensory clarity",
                  time: "Morning"
                },
              ].map((compound, idx) => (
                <div key={idx} className="border border-border p-6 bg-background space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-serif text-lg text-primary font-semibold">{compound.name}</h3>
                      <p className="text-xs font-mono text-muted-foreground mt-1">Source: {compound.source}</p>
                    </div>
                    <span className="text-xs font-mono uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded">{compound.time}</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground"><span className="font-semibold">Mechanism:</span> {compound.mechanism}</p>
                    <p className="text-xs text-muted-foreground"><span className="font-semibold">Effect:</span> {compound.effect}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground italic border-l-2 border-accent pl-4">
              Note: These descriptions are based on published research in olfactory neuroscience and phytochemistry. Sana Essencia formulations are designed to support optimal performance and well-being, not to treat, cure, or prevent any medical condition.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Circadian Rhythm Alignment */}
      <section className="py-24 bg-background border-b border-border">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 
                className="text-4xl font-light text-primary"
                style={{fontFamily: "Cormorant Garamond, serif"}}
              >
                Circadian Rhythm Alignment
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your body operates on a 24-hour circadian cycle governed by cortisol, melatonin, and other hormones. Sana Essencia collections are formulated to support these natural rhythms:
              </p>
            </div>

            <div className="space-y-4">
              <div className="border border-border p-6 bg-card space-y-3">
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-accent" />
                  <h3 className="font-serif text-lg text-primary font-semibold">Morning (6-9 AM)</h3>
                </div>
                <p className="text-sm text-muted-foreground">Cortisol naturally peaks, promoting alertness. Morning Cortisol collection supports this natural awakening response with cineole and limonene.</p>
              </div>

              <div className="border border-border p-6 bg-card space-y-3">
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-accent" />
                  <h3 className="font-serif text-lg text-primary font-semibold">Afternoon (2-4 PM)</h3>
                </div>
                <p className="text-sm text-muted-foreground">Cortisol dips, causing the "afternoon slump." Afternoon Focus collection sustains cognitive performance with rosemary and eucalyptus.</p>
              </div>

              <div className="border border-border p-6 bg-card space-y-3">
                <div className="flex items-center gap-3">
                  <Moon className="h-5 w-5 text-accent" />
                  <h3 className="font-serif text-lg text-primary font-semibold">Evening (8-11 PM)</h3>
                </div>
                <p className="text-sm text-muted-foreground">Melatonin rises, preparing the body for sleep. Evening Reset collection supports relaxation with lavender and chamomile.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Research Foundation */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 
                className="text-4xl font-light text-primary"
                style={{fontFamily: "Cormorant Garamond, serif"}}
              >
                Research Foundation
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sana Essencia formulations are grounded in peer-reviewed research across olfactory neuroscience, phytochemistry, and circadian biology. Key research areas include:
              </p>
            </div>

            <div className="space-y-3">
              {[
                "Olfactory bulb direct projections to limbic structures (Shipley & Ennis, 1996)",
                "Volatile organic compound interactions with neurotransmitter systems (Moss et al., 2003)",
                "Circadian rhythm modulation through sensory pathways (Mistlberger & Skene, 2005)",
                "Botanical compound bioavailability and neurochemical effects (Perry et al., 2003)",
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="text-accent font-semibold">•</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground italic border-l-2 border-accent pl-4">
              Sana Essencia is a research-backed atmospheric optimization brand. We do not make medical claims. If you have specific health concerns, consult a healthcare professional.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
