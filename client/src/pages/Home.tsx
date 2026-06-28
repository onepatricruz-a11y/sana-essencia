import React, { useState, useEffect, useRef } from "react";

// ─── FADE-IN HOOK ─────────────────────────────────────────────────────────────
const useFadeIn = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
};

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [ref, visible] = useFadeIn();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
};

// ─── WAITLIST ─────────────────────────────────────────────────────────────────
const WaitlistSection = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmationMsg, setConfirmationMsg] = useState("");

  const handleSubmit = async () => {
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (!email || !email.includes("@")) { setError("Please enter a valid email address."); return; }
    setError("");
    setLoading(true);
    try {
      const response = await fetch("https://formspree.io/f/xqeowqqp", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (response.ok) {
        setConfirmationMsg(`Your registration has been recorded, ${name.split(" ")[0]}. You are now in the queue for the first release of our instruments. We will be in touch as we approach our launch window.`);
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <section id="waitlist" className="max-w-6xl mx-auto px-6 py-20 border-b border-gray-200">
      <FadeIn>
        <div className="max-w-xl">
          <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">Early Access</p>
          <h2 className="text-3xl font-light mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            Join the waitlist.
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed text-sm">
            Be among the first to receive your instrument. Early access members receive priority dispatch and a complimentary refill subscription for their first cycle.
          </p>
          {!submitted ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Full name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Email address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
                  onKeyDown={e => e.key === "Enter" && handleSubmit()} />
              </div>
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <button onClick={handleSubmit} disabled={loading}
                className="w-full px-6 py-3 rounded-full text-white text-sm font-medium transition-all duration-200 disabled:opacity-40"
                style={{ background: "#2C2C2C" }}
                onMouseEnter={e => e.currentTarget.style.background = "#8B6914"}
                onMouseLeave={e => e.currentTarget.style.background = "#2C2C2C"}>
                {loading ? "Registering…" : "Request Early Access"}
              </button>
              <p className="text-xs text-gray-400 text-center">No spam. Priority dispatch only. Unsubscribe any time.</p>
            </div>
          ) : (
            <div className="rounded-xl p-6 border" style={{ background: "#F5EDD6", borderColor: "#8B6914" }}>
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#8B6914" }}>Registration confirmed</p>
              <p className="text-gray-700 leading-relaxed text-sm">{confirmationMsg}</p>
            </div>
          )}
        </div>
      </FadeIn>
    </section>
  );
};

// ─── MAIN ─────────────────────────────────────────────────────────────────────
const Home = () => {
  return (
    <div className="w-full bg-white text-gray-900" style={{ fontFamily: "var(--font-sans)" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,300;1,8..60,400&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');

        :root {
          --font-serif: 'Source Serif 4', Georgia, serif;
          --font-sans: 'Inter', system-ui, sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
          --graphite: #2C2C2C;
          --gold: #8B6914;
          --gold-light: #F5EDD6;
          --gold-mid: #C9A84C;
        }

        .se-divider { height: 1px; background: linear-gradient(to right, transparent, #d1cdc7, transparent); }
        .product-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .product-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); }
        .phase-pill { display: inline-block; padding: 2px 10px; border-radius: 99px; font-size: 11px; letter-spacing: 0.08em; font-weight: 500; }
        .nexus-card { background: linear-gradient(135deg, #2D2438 0%, #3D2E4A 50%, #2C3A3A 100%); }
        .equilibrium-card { background: linear-gradient(135deg, #f5f0f5 0%, #ede5ed 100%); }
        .benefit-card { transition: transform 0.2s ease; }
        .benefit-card:hover { transform: translateY(-2px); }
        .gold-btn { background: var(--graphite); color: white; transition: background 0.2s ease; }
        .gold-btn:hover { background: var(--gold); }
        .mono { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.05em; }
      `}</style>

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-gray-200" style={{ background: "rgba(255,255,255,0.92)" }}>
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <a href="/">
            <img src="/images/logo-light.png" alt="Sana Essencia" style={{ height: "40px", width: "auto" }} />
          </a>
          <div className="flex items-center gap-5">
            {[
              ["#discover", "Discover"],
              ["#neuro-tools", "Regulate"],
              ["#equilibrium", "Equilibrium"],
              ["#restoration", "Restore"],
              ["#research", "Research"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="text-xs uppercase tracking-widest text-gray-500 hover:text-gray-900 transition hidden md:block"
                style={{ fontFamily: "var(--font-sans)" }}>{label}</a>
            ))}
            <a href="#waitlist" className="px-5 py-2 rounded-full text-white text-xs font-medium transition gold-btn">Early Access</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 border-b border-gray-200">
        <FadeIn delay={0}>
          <p className="mono text-gray-400 mb-4 uppercase">Neuro-Aromachology · Sana Essencia Ltd · Co. No. 17298884</p>
        </FadeIn>
        <FadeIn delay={100}>
          <h1 className="max-w-3xl leading-tight mb-6" style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
            fontWeight: 300,
            color: "var(--graphite)"
          }}>
            Your nervous system, regulated.<br />
            <em>Without adding anything to your day.</em>
          </h1>
        </FadeIn>
        <FadeIn delay={200}>
          <p className="text-gray-500 max-w-xl leading-relaxed mb-4 text-base">
            Sana Essencia engineers precision scent delivery instruments that work through the fastest pathway to the emotional brain — passively, silently, without interrupting a single minute of your life.
          </p>
          <p className="text-gray-500 max-w-xl leading-relaxed mb-8 text-sm">
            Scent with intention — wherever you are, the moment you choose it. One deliberate breath, and your nervous system is already responding. The pathway the science describes.
          </p>
        </FadeIn>
        <FadeIn delay={300}>
          <div className="flex flex-wrap gap-3 mb-6">
            <a href="#discover" className="px-6 py-3 rounded-full text-white text-sm font-medium transition gold-btn">Discover Sana Essencia</a>
            <a href="#research" className="px-6 py-3 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:border-gray-500 transition">Help the research</a>
          </div>
          <p className="text-xs text-gray-400">Joining the professionals, students, clinicians, and women in transition already on the waitlist.</p>
        </FadeIn>
      </section>

      <div className="se-divider" />

      {/* ── DISCOVER ── */}
      <section id="discover" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <FadeIn>
          <div className="max-w-3xl">
            <p className="mono text-gray-400 mb-3 uppercase">Discover Sana Essencia</p>
            <h2 className="text-3xl font-light mb-6" style={{ fontFamily: "var(--font-serif)", color: "var(--graphite)" }}>
              Born from watching real nervous systems under load.
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
              Sana Essencia did not begin in a laboratory. It began in observation — of the people moving through an ordinary day, and the moments when their minds quietly strained against it.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
              The office worker hitting the afternoon wall, reaching for a third coffee that will not quite reach. The university student deep in revision, trying to hold focus the night before an exam. The woman moving through a transition her own biology is making turbulent — a mood arriving without warning, a version of herself that feels briefly out of reach.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6 text-sm">
              Three different people. Three different days. One shared truth: the nervous system was under load, and the tools on offer either asked too much — time, willpower, a new routine — or did nothing at all. There was a gap where a precise, effortless intervention should be. Sana Essencia was built to fill it.
            </p>
            <div className="rounded-xl p-6 border border-gray-200 bg-gray-50">
              <p className="text-sm text-gray-700 leading-relaxed mb-2">
                Everything we make is built on one mechanism, and everything we claim is traceable to published research.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                The olfactory pathway is the only sense that reaches the emotional brain without passing through the thalamus — in under one second, before conscious thought. We did not discover this. We built a precision instrument around what the science already describes.
                <a href="#science" className="underline ml-1 hover:text-gray-900" style={{ color: "var(--gold)" }}>See the science →</a>
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── WHY SANA ESSENCIA ── */}
      <section id="why" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <FadeIn>
          <p className="mono text-gray-400 mb-3 uppercase">Why Sana Essencia</p>
          <h2 className="text-3xl font-light mb-3" style={{ fontFamily: "var(--font-serif)", color: "var(--graphite)" }}>
            A precise answer to a problem most people just push through.
          </h2>
          <p className="text-gray-500 text-sm mb-10 max-w-2xl">
            Three questions, answered plainly: the problem we exist for, what makes the approach different, and why it is being built the way it is.
          </p>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { k: "The problem", h: "Cognitive depletion in demanding roles.", body: "Across a working day the nervous system runs down — focus fades in the afternoon, pressure builds before it is needed, and for many, hormonal change makes the dips sharper. Most responses ask for time, willpower or a new routine. The moment passes before any of them help." },
            { k: "The approach", h: "The Vector — a payload delivered to the pathway.", body: "A Vector is the scientific term for a carrier that delivers an active payload to its target. Our instruments do exactly that: a precise scent payload, sent through the one sense with a direct line to the emotional brain, in under a second. Every compound is chosen for a named mechanism — nothing is included because it simply smells pleasant." },
            { k: "Why this, why now", h: "Garden to lab, built and tested in the open.", body: "Sana Essencia is built by a synthesiser, not a marketer — someone who reads the research, translates plant compounds into the mechanisms they act on, and prototypes quickly rather than waiting for permission. Botanical origin, biological mechanism, published citation. The work is shown, not claimed." },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm h-full">
                <p className="mono text-gray-400 mb-2 uppercase">{item.k}</p>
                <h3 className="text-lg font-medium text-gray-900 mb-3" style={{ fontFamily: "var(--font-serif)" }}>{item.h}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <FadeIn>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="mono text-gray-400 mb-3 uppercase">The Problem</p>
              <h2 className="text-3xl font-light mb-5" style={{ fontFamily: "var(--font-serif)", color: "var(--graphite)" }}>Modern minds are overloaded.</h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">Screens, cognitive switching, emotional demands, and hormonal change have become the new baseline. Most interventions ask something of you — time, willpower, a new routine. Your nervous system needs support that works in the background.</p>
              <p className="text-gray-600 leading-relaxed text-sm">Sana Essencia is built on one mechanism: the olfactory pathway reaches the emotional brain before conscious thought. No effort required.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "74%", label: "of UK workers report chronic stress affecting performance", src: "CIPD, 2023" },
                { stat: "< 1s", label: "for aromatic molecules to reach the limbic system via the olfactory pathway", src: "Olfactory neuroscience" },
                { stat: "36%", label: "cortisol reduction from clary sage inhalation in menopausal women", src: "Lee et al., 2014" },
                { stat: "$150bn", label: "annual global productivity loss attributable to menopausal symptoms", src: "Frontiers in Psychiatry, 2024" },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 80}>
                  <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <p className="text-2xl font-semibold mb-1" style={{ color: "var(--graphite)", fontFamily: "var(--font-serif)" }}>{item.stat}</p>
                    <p className="text-xs text-gray-500 leading-snug">{item.label}</p>
                    <p className="mono text-gray-300 mt-2 uppercase">{item.src}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── SCIENCE ── */}
      <section id="science" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <FadeIn>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-lg order-2 md:order-1">
              <img src="/images/22812.jpg" alt="Golden essential oil drop on volcanic lava beads" className="w-full object-cover" style={{ height: "480px", objectPosition: "center" }} />
              <div className="absolute top-4 left-4">
                <span className="bg-white/80 backdrop-blur-sm text-gray-700 text-xs px-3 py-1 rounded-full uppercase tracking-widest">Volcanic Lava Substrate</span>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <p className="mono text-gray-400 mb-3 uppercase">The Science</p>
              <h2 className="text-3xl font-light mb-5" style={{ fontFamily: "var(--font-serif)", color: "var(--graphite)" }}>The only sense with a direct line to the emotional brain.</h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">Aromatic molecules travel from the olfactory bulb straight to the amygdala and hippocampus — the centres of emotion, memory, and state — bypassing the thalamus entirely. In under one second. Before conscious thought has formed.</p>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">In the words of Professor Noam Sobel, Weizmann Institute: the olfactory sensory neurons are not merely connected to the brain. They are brain.</p>
              <div className="space-y-3">
                {[
                  { label: "Direct brain access", desc: "Olfactory → amygdala in under one second" },
                  { label: "Circadian precision", desc: "Compounds matched to morning, focus, and rest phases" },
                  { label: "Passive delivery", desc: "No conscious effort or participation required" },
                  { label: "Mechanism or nothing", desc: "Every compound maps to a receptor, a pathway, and a citation" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "var(--gold)" }} />
                    <div><span className="text-sm font-medium text-gray-800">{item.label}: </span><span className="text-sm text-gray-500">{item.desc}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={150}>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { title: "Compound", body: "Every active ingredient selected for a documented neurological mechanism — not tradition or subjective experience.", cite: "Peer-reviewed basis" },
              { title: "Mechanism", body: "β-Pinene inhibits acetylcholinesterase. Linalool modulates GABA-A. Geraniol acts on 5-HT1A receptors and stimulates estrogenic pathways. The receptor is named. The pathway is known.", cite: "Moss et al., 2012 · Goel et al., 2005 · Flavour & Fragrance Journal, 2026" },
              { title: "Evidence", body: "Every claim traceable to published, replicated research. No wellness language. No soft promises. Mechanism or nothing.", cite: "Juhasz et al., 2020 · Lee et al., 2014 · Rashidi Fakari et al., 2015" },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                  <p className="mono text-gray-400 mb-2 uppercase">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="text-lg font-medium text-gray-900 mb-3" style={{ fontFamily: "var(--font-serif)" }}>{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">{item.body}</p>
                  <p className="mono text-gray-300 italic">{item.cite}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── COGNITIVE REGULATION ── */}
      <section id="neuro-tools" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <FadeIn>
          <p className="mono text-gray-400 mb-3 uppercase">Cognitive Regulation</p>
          <h2 className="text-3xl font-light mb-2" style={{ fontFamily: "var(--font-serif)", color: "var(--graphite)" }}>The Nexus 20.</h2>
          <p className="text-gray-500 text-sm mb-10 max-w-xl">A precision desk diffuser for the professional workspace. A concrete cylinder, a borosilicate glass inner chamber, a 316 stainless steel mesh tray, and a lava stone substrate — paired with a 5ml Cognitive Stamina dropper vial. Passive diffusion. Active mechanism.</p>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="grid md:grid-cols-2 gap-10 mb-10">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <p className="mono text-gray-400 mb-3 uppercase">The Vessel</p>
              <h3 className="text-xl font-medium mb-4" style={{ fontFamily: "var(--font-serif)", color: "var(--graphite)" }}>Nexus 20 — Desk Diffuser</h3>
              <div className="space-y-2 mb-6">
                {[
                  "55mm diameter concrete cylinder",
                  "Borosilicate glass inner chamber",
                  "316 stainless steel mesh tray",
                  "Lava stone substrate — slow sustained release",
                  "Silent, passive — no electricity, no water",
                  "Logo-engraved. Designed for the desk.",
                ].map((spec, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "var(--gold)" }} />
                    <p className="text-sm text-gray-600">{spec}</p>
                  </div>
                ))}
              </div>
              <span className="text-xs px-4 py-2 rounded-full" style={{ background: "var(--gold-light)", color: "var(--gold)" }}>
                Coming November 2026 — Join waitlist
              </span>
            </div>

            <div className="rounded-2xl p-8 border" style={{ background: "var(--graphite)", borderColor: "var(--graphite)" }}>
              <p className="mono mb-3 uppercase" style={{ color: "var(--gold-mid)" }}>The Formula</p>
              <h3 className="text-xl font-medium mb-4 text-white" style={{ fontFamily: "var(--font-serif)" }}>Cognitive Stamina — 5ml Dropper</h3>
              <div className="space-y-3">
                {[
                  { compound: "Lavender (Lavandula angustifolia)", mechanism: "Linalool → GABA-A receptor modulation → anxiolytic, cortisol reduction" },
                  { compound: "Frankincense (Boswellia carterii)", mechanism: "Incensole acetate → TRPV3 channel activation → anxiolytic, grounding" },
                  { compound: "Eucalyptus (Eucalyptus radiata)", mechanism: "1,8-Cineole → AChE inhibition → increased acetylcholine → focus" },
                  { compound: "Clary sage (Salvia sclarea)", mechanism: "Sclareol → GABA-A modulation → anxiety reduction, cortisol balance" },
                  { compound: "Bergamot FCF (Citrus bergamia)", mechanism: "Limonene → 5-HT1A agonism → mood lift, dopaminergic modulation" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: "var(--gold-mid)" }} />
                    <div>
                      <p className="text-sm font-medium text-white">{item.compound}</p>
                      <p className="mono mt-0.5" style={{ color: "#9A8A6A" }}>{item.mechanism}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 mt-6 pt-4">
                <p className="mono" style={{ color: "var(--gold-mid)" }}>Five compounds. Five mechanisms. One formula.</p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Circadian protocol */}
        <FadeIn delay={150}>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { time: "Morning", hours: "06:00 – 10:00", title: "Cortisol Awakening Window", desc: "The sharpest cognitive window of the day. 1,8-Cineole inhibits AChE, raising acetylcholine in the prefrontal cortex. This is when to do your hardest thinking.", color: "#fdf6ec" },
              { time: "Afternoon", hours: "10:00 – 16:00", title: "Sustained Focus Phase", desc: "Cortisol declines. Attention narrows. Linalool modulates GABA-A, supporting calm focus. Bergamot FCF lifts mood via 5-HT1A without stimulant rebound.", color: "#f5f7fa" },
              { time: "Transition", hours: "16:00 – 19:00", title: "Decompression Window", desc: "The working day closes. Frankincense activates TRPV3 — the grounding signal. The nervous system begins its shift from sympathetic to parasympathetic dominance.", color: "#f0f5f0" },
            ].map((phase, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="flex gap-5 rounded-xl p-5 border border-gray-100" style={{ background: phase.color }}>
                  <div className="flex-shrink-0 text-right" style={{ minWidth: "80px" }}>
                    <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider">{phase.time}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{phase.hours}</p>
                  </div>
                  <div className="border-l border-gray-200 pl-5">
                    <p className="text-sm font-medium text-gray-800 mb-1">{phase.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{phase.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={200}>
          <p className="mt-8 text-center text-xs text-gray-400 mono">Concrete vessel sourced to specification. Borosilicate glass. 316SS mesh. Lava stone substrate. Refill dropper subscription available.</p>
        </FadeIn>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <FadeIn>
          <p className="mono text-gray-400 mb-3 uppercase">The Sequence</p>
          <h2 className="text-3xl font-light mb-10" style={{ fontFamily: "var(--font-serif)", color: "var(--graphite)" }}>How it works.</h2>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { step: "01", action: "Apply", desc: "Add 1–3 drops of Cognitive Stamina onto the lava stone substrate using the 5ml precision dropper." },
              { step: "02", action: "Place", desc: "Set the Nexus 20 on your desk. The mesh tray diffuses the formula passively throughout your workspace." },
              { step: "03", action: "Work", desc: "No further action required. The olfactory pathway does the work. Passive, silent, continuous." },
              { step: "04", action: "Repeat", desc: "Daily use during focused work builds a conditioned olfactory response. The scent becomes the cognitive signal." },
              { step: "05", action: "Refill", desc: "Recharge the lava stone every 2–4 weeks with a fresh dropper. The signal stays strong." },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div className="text-center">
                  <p className="text-3xl font-light mb-3" style={{ fontFamily: "var(--font-serif)", color: "#E0D8C8" }}>{s.step}</p>
                  <p className="text-sm font-semibold text-gray-800 mb-2">{s.action}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── VIAL IMAGE ── */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <FadeIn>
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img src="/images/IMG_6444.jpg" alt="Sana Essencia Cognitive Stamina oil formulation" className="w-full object-cover" style={{ maxHeight: "560px", objectPosition: "center" }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6" style={{ background: "rgba(44,44,44,0.55)" }}>
              <p className="text-white text-xs uppercase tracking-widest mb-3 opacity-70" style={{ fontFamily: "var(--font-mono)" }}>Proprietary Formulation</p>
              <h3 className="text-white text-2xl md:text-3xl font-light" style={{ fontFamily: "var(--font-serif)" }}>Cognitive Stamina.<br /><em>Five compounds. Five mechanisms.</em></h3>
              <p className="text-white text-xs opacity-60 mt-4" style={{ fontFamily: "var(--font-mono)" }}>Lavender · Frankincense · Eucalyptus · Clary Sage · Bergamot FCF</p>
            </div>
            <div className="absolute top-4 right-4">
              <span className="bg-white/80 backdrop-blur-sm text-gray-700 text-xs px-3 py-1 rounded-full uppercase tracking-widest">Concept visualisation</span>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── EQUILIBRIUM ── */}
      <section id="equilibrium" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <FadeIn>
          <div className="grid md:grid-cols-2 gap-12 items-center mb-14">
            <div>
              <p className="mono mb-3 uppercase" style={{ color: "#7C5C7C" }}>Equilibrium — For Women in Transition</p>
              <h2 className="text-3xl font-light mb-5" style={{ fontFamily: "var(--font-serif)", color: "var(--graphite)" }}>Your baseline self.<br /><em>Still there.</em></h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">You know the feeling. The mood that arrives without warning. The urge to cry with no apparent cause. The version of yourself that feels unreachable some days — not because she has gone, but because your biology is creating interference.</p>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">Perimenopause is not just a hormonal event. It is a neurological one. As estradiol fluctuates, serotonin availability destabilises. As progesterone declines, GABA sensitivity falls. The amygdala becomes hyperreactive. The emotional brain fires before the rational brain has time to contextualise what is happening.</p>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">The Equilibrium range is built around the specific neurochemical shifts of this transition — not to replace HRT, not to mask symptoms, but to support the autonomic environment in which your nervous system operates.</p>
              <div className="space-y-2 mb-6">
                {[
                  "Lee et al., 2014 — clary sage inhalation reduced cortisol by 36% and increased serotonin in menopausal women",
                  "Grub et al., 2021 — HPA and HPG axes are intertwined: estradiol decline directly dysregulates cortisol",
                  "Flavour & Fragrance Journal, 2026 — geraniol and citronellol demonstrate efficacy for anxiety and menopausal symptom relief via inhalation",
                ].map((cite, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                    <p className="text-xs text-gray-400 italic leading-relaxed">{cite}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img src="/images/22921.jpg" alt="Sana Essencia Equilibrium Compact" className="w-full object-cover" style={{ height: "520px", objectPosition: "center" }} />
              <div className="absolute top-4 right-4">
                <span className="bg-white/80 backdrop-blur-sm text-gray-700 text-xs px-3 py-1 rounded-full uppercase tracking-widest">Concept visualisation</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-6 py-4" style={{ background: "linear-gradient(to top, rgba(45,36,56,0.85) 0%, transparent 100%)" }}>
                <p className="text-white text-xs uppercase tracking-widest opacity-70 mb-1" style={{ fontFamily: "var(--font-mono)" }}>Equilibrium Collection</p>
                <p className="text-white text-xl font-light" style={{ fontFamily: "var(--font-serif)" }}>The Equilibrium Compact</p>
                <p className="text-white text-xs opacity-60 mt-1">Coming January 2027</p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Equilibrium Compact hero card */}
        <FadeIn delay={100}>
          <div className="nexus-card rounded-2xl p-8 md:p-10 mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="mono mb-3 opacity-60 uppercase" style={{ color: "#C9A8C9" }}>The Portable Instrument</p>
                <h3 className="text-2xl font-light mb-4 text-white" style={{ fontFamily: "var(--font-serif)" }}>Equilibrium Compact</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#C9C4CC" }}>A zinc alloy clamshell compact that opens like a makeup case. Inside: a 316 stainless steel mesh tray over a terracotta lava stone disk. It fits in a handbag. It goes where you go. Open it when the moment arrives.</p>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "#C9C4CC" }}>The olfactory pathway reaches your amygdala in under one second. The Equilibrium Compact delivers the Accord formula the moment you need it — privately, silently, anywhere.</p>
                <div className="space-y-2">
                  {[
                    { spec: "Zinc alloy clamshell — matte graphite finish" },
                    { spec: "316 stainless steel mesh tray" },
                    { spec: "Terracotta lava stone disk — slow sustained release" },
                    { spec: "Paired with 5ml Equilibrium Accord dropper" },
                    { spec: "Handbag-ready. Silent. Discreet." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: "#C9A8C9" }} />
                      <p className="text-sm" style={{ color: "#C9C4CC" }}>{item.spec}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <p className="mono mb-4 opacity-60 uppercase" style={{ color: "#C9A8C9" }}>Equilibrium Accord — the formula</p>
                <div className="space-y-3">
                  {[
                    { compound: "Rose Geranium Bourbon", mechanism: "Geraniol + citronellol → 5-HT1A + estrogenic pathway → mood stabilisation, anxiety relief" },
                    { compound: "Lavender", mechanism: "Linalool → GABA-A modulation → amygdala quieting, cortisol reduction" },
                    { compound: "Clary Sage (reduced)", mechanism: "Sclareol → GABA-A → anxiety reduction, oestrogen pathway support" },
                    { compound: "Bergamot FCF", mechanism: "Limonene → 5-HT1A → mood lift, rapid olfactory priming" },
                    { compound: "Frankincense", mechanism: "Incensole acetate → TRPV3 → grounding, anxiolytic, anti-depressant signalling" },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: "#C9A8C9" }} />
                      <div>
                        <p className="text-sm font-medium text-white">{item.compound}</p>
                        <p className="mono mt-0.5" style={{ color: "#9A8A9A" }}>{item.mechanism}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 mt-6 pt-4">
                  <p className="mono" style={{ color: "#C9A8C9" }}>Five compounds. One compact. Wherever you are.</p>
                  <p className="mono mt-1 opacity-50" style={{ color: "#9A8A9A" }}>Lee et al., 2014 · Flavour & Fragrance Journal, 2026 · Rashidi Fakari et al., 2015</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="rounded-xl p-6 border border-gray-200 bg-white">
            <p className="text-sm font-medium text-gray-800 mb-2 text-center" style={{ fontFamily: "var(--font-serif)" }}>A note on what Equilibrium is — and is not</p>
            <p className="text-sm text-gray-500 leading-relaxed text-center max-w-2xl mx-auto">Equilibrium does not replace HRT. It does not claim to treat or cure any condition. It addresses the neurological environment — the autonomic state, the cortisol architecture, the amygdala reactivity — through the olfactory pathway. A precision instrument for a specific biological context. Nothing more. Nothing less.</p>
          </div>
        </FadeIn>
      </section>

      {/* ── OLFACTORY RESTORATION ── */}
      <section id="restoration" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <FadeIn>
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <p className="mono text-gray-400 mb-3 uppercase">Olfactory Restoration</p>
              <h2 className="text-3xl font-light mb-5" style={{ fontFamily: "var(--font-serif)", color: "var(--graphite)" }}>Your sense of smell,<br />restored.</h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">Olfactory receptor neurons are among the only neurons in the human body that regenerate throughout life. The question is not whether they will grow back. The question is whether they will grow back correctly.</p>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">Directed olfactory stimulation — twice daily, specific compounds, timed to the circadian rhythm — guides regenerating neurons back to correct function. Without clinical appointments, waiting lists, or anything to add to your day.</p>
              <div className="space-y-2">
                {[
                  "Hummel et al., 2009 — statistically significant improvement in post-infectious smell loss",
                  "Whitcroft & Hummel, 2019 — updated protocol for post-COVID olfactory dysfunction",
                  "Damm et al., 2014 — rotating scent sets at week 12 produces superior outcomes",
                ].map((cite, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                    <p className="text-xs text-gray-400 italic leading-relaxed">{cite}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img src="/images/restoration-collection.jpg" alt="Sana Essencia Olfactory Restoration" className="w-full object-cover" style={{ height: "500px", objectPosition: "center" }} />
              <div className="absolute top-4 right-4">
                <span className="bg-white/80 backdrop-blur-sm text-gray-700 text-xs px-3 py-1 rounded-full uppercase tracking-widest">Concept visualisation</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-6 py-4" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)" }}>
                <p className="text-white text-xs uppercase tracking-widest opacity-70 mb-1" style={{ fontFamily: "var(--font-mono)" }}>Coming Soon</p>
                <p className="text-white text-lg font-light" style={{ fontFamily: "var(--font-serif)" }}>The Restoration Collection</p>
                <p className="text-white text-xs opacity-60 mt-1">Illustrative image — final vials may differ</p>
              </div>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { tier: "Foundations", subtitle: "Weeks 1 – 12", desc: "The classical Hummel protocol. Four scents — Rose Absolute, Eucalyptus Globulus, Lemon Cold-Pressed, Clove Bud — presented twice daily. The entry point of the Olfactory Restoration Pathway.", scents: ["Florum — Rose Absolute", "Resina — Eucalyptus Globulus", "Spicium — Clove Bud", "Fructos — Lemon Cold-Pressed"], bg: "#faf8f5", border: "#e8e0d5" },
              { tier: "Sensory Expansion", subtitle: "Weeks 13 – 24", desc: "The modified protocol. Four new compounds introduced at week 12 to stimulate new neural pathways. Rotating scent sets produces superior outcomes — the Damm 2014 protocol.", scents: ["Lavender", "Scots Pine", "Jasmine", "Peppermint"], bg: "#f5f8f5", border: "#d5e8d5" },
              { tier: "Oil Vitals", subtitle: "Monthly subscription", desc: "Ongoing refill delivery on a 28-day schedule. The unbroken signal is the mechanism. Interrupting the protocol weakens the conditioned response. The subscription exists so that never happens.", scents: ["Your chosen compounds", "Delivered monthly", "Never interrupted", "Refill and continue"], bg: "#f5f7fa", border: "#d5dde8" },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="rounded-2xl p-6 border h-full" style={{ background: item.bg, borderColor: item.border }}>
                  <p className="mono text-gray-400 mb-1 uppercase">{item.subtitle}</p>
                  <h3 className="text-xl font-medium text-gray-900 mb-3" style={{ fontFamily: "var(--font-serif)" }}>{item.tier}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{item.desc}</p>
                  <div className="space-y-1">
                    {item.scents.map((scent, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                        <p className="text-xs text-gray-500">{scent}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── SUBSCRIPTION ── */}
      <section id="subscription" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <FadeIn>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="mono text-gray-400 mb-3 uppercase">Recurring Delivery</p>
              <h2 className="text-3xl font-light mb-5" style={{ fontFamily: "var(--font-serif)", color: "var(--graphite)" }}>The unbroken signal.</h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">Neural anchoring requires consistency. Recharge your lava stone substrate every 2 to 4 weeks. A refill subscription delivers your formulations on your chosen schedule so your nervous system always receives a clear, consistent cue.</p>
              <p className="text-xs text-gray-400 italic">The subscription exists so the signal is never interrupted.</p>
            </div>
            <div className="space-y-3">
              {[
                { name: "Cognitive Stamina", sub: "Nexus 20 — Refill Dropper", desc: "Lavender · Frankincense · Eucalyptus · Clary Sage · Bergamot FCF", dot: "#8B6914" },
                { name: "Equilibrium Accord", sub: "Equilibrium Compact — Refill Dropper", desc: "Rose Geranium Bourbon · Lavender · Clary Sage · Bergamot FCF · Frankincense", dot: "#7C5C7C" },
                { name: "Florum — Foundations", sub: "Olfactory Restoration — Phase 1", desc: "Rose Absolute · Eucalyptus Globulus · Clove Bud · Lemon Cold-Pressed", dot: "#4A6A9A" },
                { name: "Sensory Expansion", sub: "Olfactory Restoration — Phase 2", desc: "Lavender · Scots Pine · Jasmine · Peppermint", dot: "#4A7A65" },
              ].map((blend, i) => (
                <div key={i} className="flex gap-4 items-center bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: blend.dot }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{blend.name}</p>
                    <p className="mono text-gray-400 mt-0.5">{blend.sub}</p>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{blend.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── HELP THE RESEARCH ── */}
      <section id="research" className="max-w-6xl mx-auto px-6 py-20 border-b border-gray-200">
        <FadeIn>
          <div className="rounded-2xl p-8 md:p-12" style={{ background: "linear-gradient(135deg, #2D3748 0%, #3a4a5c 100%)" }}>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="mono mb-3 uppercase" style={{ color: "#9DB4C8" }}>The Research Club</p>
                <h2 className="text-3xl font-light mb-5 text-white" style={{ fontFamily: "var(--font-serif)" }}>Help shape the science.</h2>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#C5D0DC" }}>Sana Essencia is built on observation, and we are still observing. We are researching how the working day moves through people — the afternoon dip, the commute home, the pre-meeting nerves, the moments a mood shifts without warning.</p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#C5D0DC" }}>If you work in an office, study, treat patients, or simply move through a demanding day, your honest experience genuinely shapes what we build next. It takes about two minutes, it is anonymous unless you choose otherwise, and there is nothing medical in it.</p>
                <p className="text-xs leading-relaxed mb-6" style={{ color: "#9DB4C8" }}>Members of the Research Club receive occasional updates on what we learn — and the first chance to test the instruments before launch.</p>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSeW3FOUbL0JP9tnBoYQMyZwMH6YT0Qp59yhPB56JX2VKLouQg/viewform" target="_blank" rel="noopener noreferrer"
                  className="inline-block px-7 py-3 rounded-full bg-white text-gray-900 text-sm font-medium hover:bg-gray-100 transition">
                  Take part — two minutes
                </a>
              </div>
              <div className="space-y-4">
                {[
                  { title: "Why it matters", body: "Real answers from real working lives tell us which moments matter most — and which compounds to prioritise. This is research that becomes product." },
                  { title: "Designed for convenience", body: "Our instruments — the Vectors — are portable by design. Pocketable, discreet, used on the spot the moment you choose. No spray into shared air. Nothing to wear. Nothing to charge. The scent goes where you go." },
                  { title: "Scent with intention", body: "One deliberate breath, wherever you are, and your nervous system is already responding. The pathway the science describes." },
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-5 border border-white/10">
                    <p className="text-sm font-medium text-white mb-1">{item.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "#9DB4C8" }}>{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── WAITLIST ── */}
      <WaitlistSection />

      {/* ── FOOTER ── */}
      <footer style={{ background: "var(--graphite)" }} className="w-full">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <img src="/images/logo-dark.png" alt="Sana Essencia" style={{ height: "56px", width: "auto", marginBottom: "16px" }} />
              <p className="text-xs leading-relaxed max-w-xs mb-3" style={{ color: "#9aa5b4" }}>
                Your nervous system, regulated.<br />Without adding anything to your day.<br /><br />
                Neuro-aromachology instruments for cognitive performance, autonomic balance, circadian alignment, and the perimenopausal transition.
              </p>
              <p className="text-xs italic mb-2" style={{ color: "#718096", fontFamily: "var(--font-serif)" }}>Scientia et Natura Formula</p>
              <p className="mono mb-2" style={{ color: "#718096" }}>Sana Essencia Ltd · Registered in England and Wales · Co. No. 17298884</p>
              <p className="text-xs" style={{ color: "#718096" }}>Product images are illustrative. Final devices, vials, packaging and finishes may differ from those shown.</p>
            </div>
            <div>
              <p className="mono mb-3 font-medium uppercase" style={{ color: "#a0aec0" }}>Navigate</p>
              <ul className="space-y-2">
                {[["#discover","Discover"],["#neuro-tools","Cognitive Regulation"],["#equilibrium","Equilibrium"],["#restoration","Olfactory Restoration"],["#research","Research Club"],["#waitlist","Early Access"]].map(([href, label]) => (
                  <li key={href}><a href={href} className="text-xs hover:text-white transition" style={{ color: "#9aa5b4" }}>{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mono mb-3 font-medium uppercase" style={{ color: "#a0aec0" }}>Contact</p>
              <a href="mailto:hello@sanaessencia.co.uk" className="text-xs hover:text-white transition block mb-4" style={{ color: "#9aa5b4" }}>hello@sanaessencia.co.uk</a>
              <p className="mono mb-2 font-medium uppercase" style={{ color: "#a0aec0" }}>Watch</p>
              <a href="https://youtube.com/@sanaessencia" className="text-xs hover:text-white transition" style={{ color: "#9aa5b4" }}>YouTube — @SanaEssencia</a>
            </div>
          </div>
          <div className="pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <p className="mono" style={{ color: "#718096" }}>© {new Date().getFullYear()} Sana Essencia Ltd. All rights reserved. Registered in England and Wales · Co. No. 17298884 · Basingstoke, UK</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;
