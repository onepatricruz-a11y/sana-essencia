"use client";
import React, { useState } from "react";

export default function Home() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="se-root">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400&display=swap');
        :root { --se-cream: #F6F3EC; --se-ink: #1E3329; --se-sage: #4A6B5C; --se-stone: #DDD6C7; }
        .se-root { background: var(--se-cream); color: var(--se-ink); font-family: 'Inter', sans-serif; }
        .se-display { font-family: 'Cormorant Garamond', serif; }
        .se-mono { font-family: 'JetBrains Mono', monospace; }
        .se-btn { background: var(--se-ink); color: var(--se-cream); padding: 12px 24px; border: none; cursor: pointer; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; }
      `}</style>

      {/* HEADER */}
      <header className="max-w-6xl mx-auto px-6 py-8 flex justify-between items-center">
        <img src="/images/logo-light.png" alt="Sana Essencia Logo" className="h-10" />
        <a href="#waitlist" className="se-mono text-xs uppercase tracking-widest border-b border-se-ink">Early Access</a>
      </header>

      {/* HERO: CLINICAL FOCUS */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="se-display text-5xl md:text-7xl font-light mb-12">Cognitive Infrastructure through Neuro-Olfaction</h1>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <img src="/images/molecular-hero.jpg" alt="Molecular Research" className="w-full h-96 object-cover rounded-sm" />
          <div className="space-y-6">
            <p className="text-xl">Sana Essencia investigates the chemical relationship between botanical volatiles and the autonomic nervous system.</p>
            <p className="text-lg opacity-80 leading-relaxed">Our research focuses on precision scent delivery as a mechanism for neural regulation, targeting specific pathways for executive function and physiological equilibrium.</p>
          </div>
        </div>
      </section>

      {/* LAB IMAGERY GRID */}
      <section className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
        <img src="/images/lava-drop.jpg" alt="Lava Drop" className="w-full h-80 object-cover rounded-sm" />
        <img src="/images/vial-trio.jpg" alt="Vial Trio" className="w-full h-80 object-cover rounded-sm" />
        <img src="/images/model-ritual.jpg" alt="Ritual Model" className="w-full h-80 object-cover rounded-sm" />
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="se-display text-4xl mb-8">Access the Research Protocol</h2>
        {!submitted ? (
          <form action="https://formspree.io/f/xqeowqqp" method="POST" className="flex flex-col gap-4" onSubmit={() => setSubmitted(true)}>
            <input type="email" name="email" required placeholder="Institutional or professional email" className="p-4 border border-se-stone bg-transparent w-full text-center" />
            <button type="submit" className="se-btn">Register for Early Access</button>
          </form>
        ) : (
          <p className="se-mono text-sm">Registration recorded. Dispatch priority established.</p>
        )}
      </section>

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto px-6 py-20 border-t border-se-stone text-xs se-mono uppercase tracking-widest">
        © Sana Essencia {new Date().getFullYear()} · Basingstoke, UK
      </footer>
    </div>
  );
}
