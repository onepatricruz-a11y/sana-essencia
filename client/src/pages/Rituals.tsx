import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Sun, Sparkles, Moon, ArrowRight, Brain, Clock, ShieldCheck } from "lucide-react";

export default function Rituals() {
  const rituals = [
    {
      id: "morning",
      time: "08:00 — 10:00",
      title: "The Cortisol-Awakening Mist",
      phase: "Phase I: Sensory Activation",
      description: "Human cortisol levels naturally peak shortly after waking—a physiological process known as the Cortisol Awakening Response (CAR). Our morning protocol is designed to support this natural awakening curve while stabilizing nervous system jitter.",
      method: "Mist 3-4 pumps of Formula N° 07 Balance overhead. Allow the refreshing menthol vapors to trigger your TRPM8 cold-sensitive receptors. Take 3 deep, diaphragmatic breaths, focusing on the cooling sensation in the nasal cavity.",
      benefits: "Elevates mental alertness, down-regulates morning cortisol spikes, and establishes an immediate somatic state of grounded presence.",
      icon: <Sun className="h-6 w-6 text-accent" />,
      state: "BALANCE"
    },
    {
      id: "afternoon",
      time: "13:30 — 15:30",
      title: "The Cognitive-Clarity Blend",
      phase: "Phase II: Cholinergic Support",
      description: "The mid-afternoon is characterized by a natural dip in core body temperature and a corresponding decline in cognitive processing speed—often referred to as the post-prandial slump. Our afternoon protocol counters this dip by inhibiting the breakdown of acetylcholine.",
      method: "Diffuse Formula N° 04 Focus Mist into your immediate workspace ambient air. Sit comfortably, close your eyes, and allow the volatile 1,8-cineole molecules to passively cross your olfactory membrane. Continue working or reading.",
      benefits: "Enhances working memory capacity, speeds up cognitive processing, and extends mental stamina without the cardiovascular spikes of caffeine.",
      icon: <Sparkles className="h-6 w-6 text-accent" />,
      state: "FOCUS"
    },
    {
      id: "evening",
      time: "20:30 — 22:30",
      title: "The Melatonin-Reset Candle",
      phase: "Phase III: Autonomic Down-Regulation",
      description: "As natural light fades, the pineal gland begins synthesizing melatonin to prepare the body for deep, restorative slow-wave sleep. Our evening protocol accelerates this transition by down-regulating sympathetic nervous system hyperactivity.",
      method: "Light the Formula N° 01 Calm Candle in your living or sleeping area 1-2 hours before retiring. Allow the warm, golden flame and slow-diffusing linalool vapors to fill the space. Extinguish the flame before sleeping.",
      benefits: "Triggers GABAergic receptor pathways, lowers heart rate and blood pressure, and prepares the brain for optimal slow-wave sleep architecture.",
      icon: <Moon className="h-6 w-6 text-accent" />,
      state: "CALM"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Header */}
      <section className="bg-card text-card-foreground border-b border-border py-16 grid-notebook">
        <div className="container max-w-4xl text-center space-y-4">
          <div className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
            [Circadian Chronobiology]
          </div>
          <h1 className="text-3xl md:text-5xl font-serif text-primary font-bold">
            Daily Scent Cycles
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            A guide to integrating passive, circadian-aligned olfactory triggers into your daily environment to optimize nervous system tone.
          </p>
        </div>
      </section>

      {/* Rituals Timeline Section */}
      <section className="py-24 bg-background">
        <div className="container max-w-5xl">
          <div className="space-y-16 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-px before:bg-border/60">
            
            {rituals.map((ritual, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={ritual.id}
                  className={`relative flex flex-col sm:flex-row items-start sm:justify-between gap-8 sm:gap-12 ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  
                  {/* Central timeline node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 bg-background border border-primary p-1.5 z-10">
                    <div className="w-3.5 h-3.5 bg-accent" />
                  </div>

                  {/* Empty spacer column for larger screens */}
                  <div className="hidden sm:block w-1/2" />

                  {/* Content Column */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-0 space-y-4">
                    <div className="flex flex-col space-y-1">
                      <span className="font-mono text-xs text-secondary font-bold flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5" /> {ritual.time}
                      </span>
                      <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
                        {ritual.phase}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        {ritual.icon}
                        <h3 className="text-xl md:text-2xl font-serif text-primary font-semibold">
                          {ritual.title}
                        </h3>
                      </div>
                      <span className="inline-block font-mono text-[9px] border border-primary/20 bg-primary/5 px-2 py-0.5 text-primary">
                        STATE: {ritual.state}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {ritual.description}
                    </p>

                    {/* Protocol instruction card */}
                    <div className="border border-border/60 bg-card p-4 space-y-2">
                      <span className="font-mono text-[9px] text-primary font-bold uppercase tracking-wider block">
                        THE LAB PROTOCOL:
                      </span>
                      <p className="text-xs text-foreground/80 leading-relaxed italic">
                        "{ritual.method}"
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-mono text-[9px] text-primary font-bold uppercase tracking-wider block">
                        NEUROLOGICAL BENEFITS:
                      </span>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {ritual.benefits}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* Passive Diffusion Guide */}
      <section className="py-24 bg-card border-t border-border grid-notebook">
        <div className="container max-w-4xl">
          <div className="border border-border p-8 md:p-12 bg-background space-y-6">
            <div className="text-center space-y-2">
              <ShieldCheck className="h-8 w-8 text-accent mx-auto" />
              <div className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
                [Scientific Protocol]
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-primary font-semibold">
                How to Use Scent Passively
              </h2>
            </div>

            <p className="text-sm text-foreground/80 leading-relaxed text-center max-w-2xl mx-auto">
              The true power of neuroaromacology lies in **passive environmental conditioning**. Unlike active interventions that require your full cognitive focus, volatile botanical compounds can regulate your nervous system in the background while you focus on other tasks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 font-mono text-[11px] text-muted-foreground border-t border-border/60">
              <div className="space-y-2">
                <span className="text-primary font-bold block">[01] HABIT ANCHORING</span>
                <p className="leading-relaxed">
                  Always use the same scent for the same task. Over time, the hippocampus establishes a strong memory-trace, allowing the scent to trigger the desired neural state instantly.
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-primary font-bold block">[02] AMBIENT SATURATION</span>
                <p className="leading-relaxed">
                  Do not oversaturate. The olfactory bulb adapts quickly to constant stimuli. Gentle, passive diffusion is significantly more effective than heavy, direct inhalation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
