"use client";
import React, { useState } from "react";

export default function Home() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="se-root">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        :root { --se-cream: #F6F3EC; --se-ink: #1E3329; --se-sage: #4A6B5C; --se-amber: #B8763E; --se-slate: #2C4A6E; --se-stone: #DDD6C7; }
        .se-root { background: var(--se-cream); color: var(--se-ink); font-family: 'Inter', sans-serif; line-height: 1.6; }
        .se-display { font-family: 'Source Serif 4', serif; }
        .se-mono { font-family: 'JetBrains Mono', monospace; }
        .se-eyebrow { font-family: 'JetBrains Mono', monospace; letter-spacing: 0.15em; text-transform: uppercase; font-size: 0.7rem; color: var(--se-sage); }
        .se-btn { background: var(--se-ink); color: var(--se-cream); font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; padding: 10px 20px; border: none; cursor: pointer; transition: background 0.2s; }
        .se-btn:hover { background: var(--se-sage); }
        .se-input { background: transparent; border: 1px solid var(--se-stone); padding: 10px; color: var(--se-ink); }
        .se-manifesto { background: var(--se-ink); color: var(--se-cream); }
      `}</style>

      {/* HEADER */}
      <header className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="se-mono text-sm uppercase">Sana Essencia</div>
        <nav className="flex gap-8 items-center">
          <a href="mailto:hello@sanaessencia.co.uk" className="se-mono text-sm underline hover:text-amber-700 transition">Contact</a>
          <a href="#join" className="se-btn">Join the Research</a>
        </nav>
      </header>

      {/* HERO SECTION WITH IMAGE */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-16">
        <div className="mb-10 w-full h-80 md:h-96 bg-stone-200 rounded-sm overflow-hidden">
          <img src="https://images.unsplash.com/photo-1584483766114-11119b489a3f" alt="Clinical Environment" className="w-full h-full object-cover opacity-90" />
        </div>
        <h1 className="se-display text-5xl md:text-6xl font-medium max-w-4xl leading-tight">
          Engineering Emotional Equilibrium Through the Neuroscience of Scent
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-emerald-900">
          Sana Essencia designs functional, brain-targeted scent formulas. Each protocol is engineered to act on a specific neural pathway for a measurable outcome.
        </p>
      </section>

      {/* VISUAL ANCHORS */}
      <section className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-8">
        <div className="h-64 bg-stone-200 rounded-sm overflow-hidden">
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" alt="Nature" className="w-full h-full object-cover" />
        </div>
        <div className="h-64 bg-stone-200 rounded-sm overflow-hidden">
          <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174" alt="Clinical" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* MANIFESTO */}
      <section id="manifesto" className="se-manifesto py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="se-display text-4xl mb-10">Bridging neuroscience and everyday chaos</h2>
          <div className="space-y-6 text-lg">
            <p>I am a professional, a mother of four, and a notorious self-taught researcher. Sana Essencia was born not in a lab, but at the intersection of a demanding corporate career and the beautiful, high-energy chaos of family life.</p>
            <p>I turned to the science of neuro-olfaction. By using targeted volatile compounds, we can trigger neural pathways — like norepinephrine for alertness or GABA for calm — to shift brain chemistry in seconds.</p>
            <p>Welcome to Sana Essencia. Let's optimise our brains, together.</p>
          </div>
        </div>
      </section>

      {/* JOIN / NEWSLETTER */}
      <section id="join" className="py-20 max-w-6xl mx-auto px-6">
        <p className="se-eyebrow mb-4">Join the Research</p>
        <h2 className="se-display text-3xl md:text-4xl font-medium mb-6 max-w-xl">
          Get the weekly finding before anyone else.
        </h2>
        
        {submitted ? (
          <p className="se-mono text-sm" style={{ color: "#4A6B5C" }}>
            You're on the list. Thank you.
          </p>
        ) : (
          <form 
            action="https://formspree.io/f/xqeowqqp" 
            method="POST" 
            className="flex flex-col sm:flex-row gap-3 max-w-md"
            onSubmit={() => setSubmitted(true)}
          >
            <input
              type="email"
              name="email"
              required
              placeholder="you@email.com"
              className="se-input flex-1"
            />
            <button type="submit" className="se-btn">Join the list</button>
          </form>
        )}
      </section>

      <footer className="max-w-6xl mx-auto px-6 py-10 border-t border-stone-200 se-mono text-xs text-stone-500">
        © Sana Essencia, {new Date().getFullYear()}
      </footer>
    </div>
  );
}
