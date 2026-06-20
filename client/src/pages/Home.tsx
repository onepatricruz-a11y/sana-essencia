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
          <div>
            <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">Early Access</p>
            <h2 className="text-3xl font-light mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
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
                  className="w-full px-6 py-3 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-all duration-200 disabled:opacity-40">
                  {loading ? "Registering…" : "Request Early Access"}
                </button>
                <p className="text-xs text-gray-400 text-center">No spam. Priority dispatch only. Unsubscribe any time.</p>
              </div>
            ) : (
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-6">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Registration confirmed</p>
                <p className="text-gray-700 leading-relaxed text-sm">{confirmationMsg}</p>
              </div>
            )}
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

// ─── MAIN ─────────────────────────────────────────────────────────────────────
const Home = () => {
  return (
    <div className="w-full bg-stone-50 text-gray-900" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .se-divider { height: 1px; background: linear-gradient(to right, transparent, #d1cdc7, transparent); }
        .product-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .product-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); }
        .phase-pill { display: inline-block; padding: 2px 10px; border-radius: 99px; font-size: 11px; letter-spacing: 0.08em; font-weight: 500; }
        .nexus-card { background: linear-gradient(135deg, #2D2438 0%, #3D2E4A 50%, #2C3A3A 100%); }
        .equilibrium-card { background: linear-gradient(135deg, #f5f0f5 0%, #ede5ed 100%); }
        .benefit-card { transition: transform 0.2s ease; }
        .benefit-card:hover { transform: translateY(-2px); }
      `}</style>

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-stone-50/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <a href="/">
            <img src="/images/logo-light.png" alt="Sana Essencia" style={{ height: "40px", width: "auto" }} />
          </a>
          <div className="flex items-center gap-5">
            <a href="#discover" className="text-xs uppercase tracking-widest text-gray-500 hover:text-gray-900 transition hidden md:block">Discover</a>
            <a href="#neuro-tools" className="text-xs uppercase tracking-widest text-gray-500 hover:text-gray-900 transition hidden md:block">Regulate</a>
            <a href="#equilibrium" className="text-xs uppercase tracking-widest text-gray-500 hover:text-gray-900 transition hidden md:block">Equilibrium</a>
            <a href="#restoration" className="text-xs uppercase tracking-widest text-gray-500 hover:text-gray-900 transition hidden md:block">Restore</a>
            <a href="#research" className="text-xs uppercase tracking-widest text-gray-500 hover:text-gray-900 transition hidden md:block">Research</a>
            <a href="#waitlist" className="px-5 py-2 rounded-full bg-gray-900 text-white text-xs font-medium hover:bg-gray-700 transition">Early Access</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 border-b border-gray-200">
        <FadeIn delay={0}>
          <p className="uppercase tracking-widest text-xs text-gray-400 mb-4">Neuro-Aromachology</p>
        </FadeIn>
        <FadeIn delay={100}>
          <h1 className="max-w-3xl leading-tight mb-6" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 300 }}>
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
            <a href="#discover" className="px-6 py-3 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition">Discover Sana Essencia</a>
            <a href="#research" className="px-6 py-3 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:border-gray-500 transition">Help the research</a>
          </div>
          <p className="text-xs text-gray-400">Joining the professionals, students, clinicians, and women in transition already on the waitlist.</p>
        </FadeIn>
      </section>

      {/* ── HERO IMAGE — Model-ritual.jpg ── */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <FadeIn>
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img src="/images/Model-ritual.jpg" alt="Applying Sana Essencia oil to the lava bead tray"
              className="w-full object-cover" style={{ maxHeight: "560px", objectPosition: "center 25%" }} />
            <div className="absolute top-4 right-4">
              <span className="bg-white/80 backdrop-blur-sm text-gray-700 text-xs px-3 py-1 rounded-full uppercase tracking-widest">Concept visualisation</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 px-8 py-6"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)" }}>
              <p className="text-white text-sm tracking-widest uppercase opacity-80">The Ritual</p>
              <p className="text-white text-lg font-light mt-1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                One drop. One breath. One shift.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      <div className="se-divider" />

      {/* ── DISCOVER — origin story ── */}
      <section id="discover" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <FadeIn>
          <div className="max-w-3xl">
            <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">Discover Sana Essencia</p>
            <h2 className="text-3xl font-light mb-6" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
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
            <div className="rounded-xl p-6 border border-gray-200 bg-white">
              <p className="text-sm text-gray-700 leading-relaxed mb-2">
                Everything we make is built on one mechanism, and everything we claim is traceable to published research.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                The olfactory pathway is the only sense that reaches the emotional brain without passing through the thalamus — in under one second, before conscious thought. We did not discover this. We built a precision instrument around what the science already describes.
                <a href="#science" className="text-gray-700 underline ml-1 hover:text-gray-900">See the science →</a>
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── WHY SANA ESSENCIA ── */}
      <section id="why" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <FadeIn>
          <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">Why Sana Essencia</p>
          <h2 className="text-3xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            A precise answer to a problem most people just push through.
          </h2>
          <p className="text-gray-500 text-sm mb-10 max-w-2xl">
            Three questions, answered plainly: the problem we exist for, what makes the approach different, and why it is being built the way it is.
          </p>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              k: "The problem",
              h: "Cognitive depletion in demanding roles.",
              body: "Across a working day the nervous system runs down — focus fades in the afternoon, pressure builds before it is needed, and for many, hormonal change makes the dips sharper. Most responses ask for time, willpower or a new routine. The moment passes before any of them help.",
            },
            {
              k: "The approach",
              h: "The Vector — a payload delivered to the pathway.",
              body: "A Vector is the scientific term for a carrier that delivers an active payload to its target. Our instruments do exactly that: a precise scent payload, sent through the one sense with a direct line to the emotional brain, in under a second. Every compound is chosen for a named mechanism — nothing is included because it simply smells pleasant.",
            },
            {
              k: "Why this, why now",
              h: "Garden to lab, built and tested in the open.",
              body: "Sana Essencia is built by a synthesiser, not a marketer — someone who reads the research, translates plant compounds into the mechanisms they act on, and prototypes quickly rather than waiting for permission. From the garden to the lab: botanical origin, biological mechanism, published citation. The work is shown, not claimed.",
            },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm h-full">
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">{item.k}</p>
                <h3 className="text-lg font-medium text-gray-900 mb-3" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{item.h}</h3>
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
              <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">The Problem</p>
              <h2 className="text-3xl font-light mb-5" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                Modern minds are overloaded.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                Screens, cognitive switching, emotional demands, and hormonal change have become the new baseline. Most interventions ask something of you — time, willpower, a new routine. Your nervous system needs support that works in the background.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm">
                Sana Essencia is built on one mechanism: the olfactory pathway reaches the emotional brain before conscious thought. No effort required.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "74%", label: "of UK workers report chronic stress affecting performance", src: "CIPD 2023" },
                { stat: "< 1s", label: "for aromatic molecules to reach the limbic system directly", src: "Olfactory neuroscience" },
                { stat: "36%", label: "cortisol reduction from clary sage inhalation in menopausal women", src: "Lee et al., 2014" },
                { stat: "21 days", label: "to build a stable conditioned olfactory neural anchor", src: "Sana Essencia protocol" },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 80}>
                  <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <p className="text-2xl font-semibold text-gray-900 mb-1">{item.stat}</p>
                    <p className="text-xs text-gray-500 leading-snug">{item.label}</p>
                    <p className="text-xs text-gray-300 mt-2 uppercase tracking-wider">{item.src}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── SCIENCE — 22812.jpg (lava drop) ── */}
      <section id="science" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <FadeIn>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-lg order-2 md:order-1">
              <img src="/images/22812.jpg" alt="Golden essential oil drop on volcanic lava beads"
                className="w-full object-cover" style={{ height: "480px", objectPosition: "center" }} />
              <div className="absolute top-4 left-4">
                <span className="bg-white/80 backdrop-blur-sm text-gray-700 text-xs px-3 py-1 rounded-full uppercase tracking-widest">
                  Volcanic Lava Substrate
                </span>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">The Science</p>
              <h2 className="text-3xl font-light mb-5" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                The only sense with a direct line to the emotional brain.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                Aromatic molecules travel from the olfactory bulb straight to the amygdala and hippocampus — the centres of emotion, memory, and state — bypassing the thalamus entirely. In under one second. Before conscious thought has formed.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                In the words of Professor Noam Sobel, Weizmann Institute: the olfactory sensory neurons are not merely connected to the brain. They are brain.
              </p>
              <div className="space-y-3">
                {[
                  { label: "Direct brain access", desc: "Olfactory → amygdala in under one second" },
                  { label: "Neural anchoring", desc: "21 sessions pairs scent with state permanently" },
                  { label: "Circadian precision", desc: "Compounds matched to morning, focus, and rest phases" },
                  { label: "Passive delivery", desc: "No conscious effort or participation required" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-medium text-gray-800">{item.label}: </span>
                      <span className="text-sm text-gray-500">{item.desc}</span>
                    </div>
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
              { title: "Mechanism", body: "β-Pinene inhibits acetylcholinesterase. Linalool modulates GABA. Beta-caryophyllene binds CB2 receptors. The receptor is named. The pathway is known.", cite: "Moss et al., 2012 · Goel et al., 2005" },
              { title: "Evidence", body: "Every claim traceable to published, replicated research. No wellness language. No soft promises. The mechanism or nothing.", cite: "Juhasz et al., 2020 · Pruessner et al., 1997" },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">{item.body}</p>
                  <p className="text-xs text-gray-300 italic">{item.cite}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── COGNITIVE REGULATION (text-only cards, no image placeholders) ── */}
      <section id="neuro-tools" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <FadeIn>
          <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">Cognitive Regulation</p>
          <h2 className="text-3xl font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Regulate. Focus. Rest.
          </h2>
          <p className="text-gray-500 text-sm mb-10 max-w-xl">
            Three precision instruments, one for each phase of your circadian day. Each holds volcanic lava beads infused with a proprietary neuroactive oil blend. Passive diffusion. Active mechanism.
          </p>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Inhaler Slide", tag: "Morning · Focus", phase: "06:00 – 10:00",
              phaseColor: "#f0ede8", phaseText: "#6b6560",
              desc: "A precision sliding device for the cortisol awakening window. Aperture calibration: Passive / Active / MAX. Engineered for the desk, the commute, the pre-meeting moment.",
              oil: "Morning Activation — β-Pinene Complex",
              mechanism: "Inhibits acetylcholinesterase · Increases prefrontal acetylcholine",
              price: "£38",
            },
            {
              name: "Synaptic Disc", tag: "Afternoon · Deep Work", phase: "10:00 – 16:00",
              phaseColor: "#e8ede8", phaseText: "#4a6050",
              desc: "A flat palm-sized disc for the afternoon cognitive trough. Rotating aperture. The tactile act of holding it doubles as a grounding moment between tasks.",
              oil: "Cognitive Stamina — 1,8-Cineole Complex",
              mechanism: "CB2 receptor modulation · TRPV3 ion channel activation",
              price: "£44",
            },
            {
              name: "Dusk Vessel", tag: "Evening · Rest", phase: "20:00 – 23:00",
              phaseColor: "#e8eaed", phaseText: "#505565",
              desc: "A vertically ribbed bedside cylinder. Rotating cap aperture. Passive overnight diffusion for the restorative phase. Place it. Sleep.",
              oil: "Calm Blend — Linalool Complex",
              mechanism: "GABA modulation · Reduces sympathetic tone",
              price: "£44",
            },
          ].map((product, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="product-card bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col h-full">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                </div>
                <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">{product.tag}</p>
                <span className="phase-pill mb-4 self-start" style={{ background: product.phaseColor, color: product.phaseText }}>
                  {product.phase}
                </span>
                <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{product.desc}</p>
                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Oil pairing</p>
                    <p className="text-xs text-gray-600 font-medium">{product.oil}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Mechanism</p>
                    <p className="text-xs text-gray-400 italic">{product.mechanism}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={200}>
          <p className="mt-8 text-center text-sm text-gray-500">
            All devices 3D-printed in PA12 nylon. Volcanic lava beads. Refill oil subscription available.
          </p>
        </FadeIn>
      </section>

      {/* ── CIRCADIAN PROTOCOL ── */}
      <section id="cycle" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">The Protocol</p>
              <h2 className="text-3xl font-light mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                Circadian Alignment.
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Your cortisol follows a precise daily rhythm. Your instruments do too. Three phases, three neurological states, three different requirements. The protocol maps the compound to the biology.
              </p>
            </div>
            <div className="md:col-span-2 space-y-4">
              {[
                { time: "Morning", hours: "06:00 – 10:00", title: "Cortisol Awakening Window", desc: "The sharpest cognitive window of the day. β-Pinene and 1,8-Cineole amplify acetylcholine in the prefrontal cortex. This is when to do your hardest thinking.", color: "#fdf6ec" },
                { time: "Afternoon", hours: "10:00 – 16:00", title: "Cognitive Trough", desc: "Cortisol declines. Attention narrows. Beta-caryophyllene modulates CB2 receptors. Sustained executive function without stimulant rebound.", color: "#f0f5f0" },
                { time: "Evening", hours: "20:00 – 23:00", title: "Restorative Phase", desc: "Cortisol at its minimum. Linalool activates parasympathetic dominance via GABA modulation. The system prepares for slow-wave sleep consolidation.", color: "#f0f2f5" },
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
          </div>
        </FadeIn>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <FadeIn>
          <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">The Sequence</p>
          <h2 className="text-3xl font-light mb-10" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            How it works.
          </h2>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { step: "01", action: "Apply", desc: "Add 1–3 drops of your formulation onto the volcanic lava beads using the precision dropper." },
              { step: "02", action: "Open", desc: "Slide or rotate the aperture to your chosen dose — Passive, Active, or MAX." },
              { step: "03", action: "Use", desc: "Use your instrument only during the state you want to anchor. Consistency is the mechanism." },
              { step: "04", action: "Repeat", desc: "Daily use builds the conditioned olfactory response. The scent becomes the biological trigger." },
              { step: "05", action: "Refresh", desc: "Recharge your lava beads every 2–4 weeks to maintain the neural cue at full signal strength." },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div className="text-center">
                  <p className="text-3xl font-light text-gray-200 mb-3" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{s.step}</p>
                  <p className="text-sm font-semibold text-gray-800 mb-2">{s.action}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── VIAL TRIO — IMG_6444.jpg ── */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <FadeIn>
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img src="/images/IMG_6444.jpg" alt="Three Sana Essencia oil formulations"
              className="w-full object-cover" style={{ maxHeight: "560px", objectPosition: "center" }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
              style={{ background: "rgba(0,0,0,0.35)" }}>
              <p className="text-white text-xs uppercase tracking-widest mb-3 opacity-70">Proprietary Formulations</p>
              <h3 className="text-white text-2xl md:text-3xl font-light" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                Three blends. Three phases.<br />One nervous system.
              </h3>
              <div className="flex flex-wrap justify-center gap-6 mt-6">
                {["Morning Activation", "Cognitive Stamina", "Calm Blend"].map((label, i) => (
                  <span key={i} className="text-white text-xs uppercase tracking-widest opacity-80">{label}</span>
                ))}
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <span className="bg-white/80 backdrop-blur-sm text-gray-700 text-xs px-3 py-1 rounded-full uppercase tracking-widest">Concept visualisation</span>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── EQUILIBRIUM — 22921.jpg (Nexus) ── */}
      <section id="equilibrium" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <FadeIn>
          <div className="grid md:grid-cols-2 gap-12 items-center mb-14">
            <div>
              <p className="uppercase tracking-widest text-xs mb-3" style={{ color: "#7C5C7C" }}>Equilibrium — For Women in Transition</p>
              <h2 className="text-3xl font-light mb-5" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                Your baseline self.<br /><em>Still there.</em>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                You know the feeling. The mood that arrives without warning. The urge to cry with no apparent cause. The version of yourself that feels unreachable some days — not because she has gone, but because your biology is creating interference.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                Perimenopause is not just a hormonal event. It is a neurological one. As estradiol fluctuates, serotonin availability destabilises. As progesterone declines, GABA sensitivity falls. The amygdala becomes hyperreactive. The emotional brain fires before the rational brain has time to contextualise what is happening.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                The Equilibrium range is built around the specific neurochemical shifts of this transition — not to replace HRT, not to mask symptoms, but to support the autonomic environment in which your nervous system operates.
              </p>
              <div className="space-y-2 mb-6">
                {[
                  "Lee et al., 2014 — clary sage inhalation reduced cortisol by 36% and increased serotonin in menopausal women",
                  "Grub et al., 2021 — HPA and HPG axes are intertwined: estradiol decline directly dysregulates cortisol",
                  "Gordon et al., 2015 — ovarian hormone fluctuation and HPA axis dysregulation in perimenopausal mood disorder",
                ].map((cite, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                    <p className="text-xs text-gray-400 italic leading-relaxed">{cite}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img src="/images/22921.jpg" alt="Sana Essencia Nexus — Quick-Action"
                className="w-full object-cover" style={{ height: "520px", objectPosition: "center" }} />
              <div className="absolute top-4 right-4">
                <span className="bg-white/80 backdrop-blur-sm text-gray-700 text-xs px-3 py-1 rounded-full uppercase tracking-widest">Concept visualisation</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-6 py-4"
                style={{ background: "linear-gradient(to top, rgba(45,36,56,0.85) 0%, transparent 100%)" }}>
                <p className="text-white text-xs uppercase tracking-widest opacity-70 mb-1">Equilibrium Collection</p>
                <p className="text-white text-xl font-light" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  The Nexus — Quick-Action
                </p>
                <p className="text-white text-xs opacity-60 mt-1">Coming soon</p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Nexus hero card */}
        <FadeIn delay={100}>
          <div className="nexus-card rounded-2xl p-8 md:p-10 mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-xs uppercase tracking-widest mb-3 opacity-60" style={{ color: "#C9A8C9" }}>The Acute Instrument</p>
                <h3 className="text-2xl font-light mb-4 text-white" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  Nexus — Baseline
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#C9C4CC" }}>
                  Nexus: a connection point. A junction. The link between where you are and where you were.
                </p>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "#C9C4CC" }}>
                  The Nexus Quick-Action is a pocketable acute-use instrument for the moments when your biology ambushes you. Open it. Breathe. The olfactory pathway reaches your amygdala in under one second.
                </p>
                <div className="space-y-2">
                  {[
                    { compound: "Clary Sage", action: "Cortisol reduction. Serotonin support. Tested specifically on menopausal women — Lee et al., 2014." },
                    { compound: "Linalool", action: "GABA modulation. Quiets the amygdala. Reduces sympathetic firing." },
                    { compound: "Rose Geranium", action: "HPA axis glucocorticoid reduction. Mood stabilisation. Anxiety reduction." },
                    { compound: "Bergamot FCF", action: "Rapid olfactory activation. Citrus brightness. Prevents sedation." },
                    { compound: "Frankincense", action: "Autonomic grounding. TRPV3 activation. The sense that the ground is still there." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: "#C9A8C9" }} />
                      <p className="text-xs leading-relaxed" style={{ color: "#9A8A9A" }}>
                        <span className="font-semibold" style={{ color: "#C9A8C9" }}>{item.compound} — </span>{item.action}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <p className="text-xs uppercase tracking-widest mb-4 opacity-60" style={{ color: "#C9A8C9" }}>
                  The formula — in plain language
                </p>
                <div className="space-y-4">
                  {[
                    { breath: "First breath", desc: "Bergamot reaches the olfactory receptors immediately. The signal is already moving to the amygdala before you have consciously registered what you are smelling." },
                    { breath: "Second breath", desc: "Clary sage and rose geranium arrive. Cortisol begins to fall. Serotonin begins to rise. The amygdala receives a different signal. Not a threat. A return." },
                    { breath: "Third breath", desc: "Linalool modulates GABA. The sympathetic system yields. Frankincense grounds the whole experience. The baseline is still there. She was always still there." },
                  ].map((item, i) => (
                    <div key={i}>
                      <p className="text-sm font-medium text-white mb-1">{item.breath}</p>
                      <p className="text-xs leading-relaxed" style={{ color: "#9A8A9A" }}>{item.desc}</p>
                    </div>
                  ))}
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-xs" style={{ color: "#C9A8C9" }}>Five compounds. One mechanism. Under 60 seconds.</p>
                    <p className="text-xs mt-1 opacity-50" style={{ color: "#9A8A9A" }}>Lee et al., 2014 · Goel et al., 2005 · Rashidi Fakari et al., 2015</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Three Equilibrium products */}
        <FadeIn delay={150}>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Equilibrium Morning", subtitle: "Cognitive clarity during the fog", desc: "Estradiol decline reduces acetylcholine synthesis in the prefrontal cortex. β-Pinene and 1,8-Cineole amplify it during the cortisol awakening window. The word comes back. The decision clears.", phase: "06:00 – 10:00" },
              { name: "Nexus — Baseline", subtitle: "For the moments that arrive without warning", desc: "The sudden mood shift. The tears with no cause. The amygdala firing on internal hormonal noise. Clary sage, linalool, rose geranium, bergamot, frankincense. Open it. Breathe. The pathway does the rest.", phase: "Acute — any time" },
              { name: "Equilibrium Evening", subtitle: "Sleep. The GABA the system is missing.", desc: "Progesterone declines. The natural GABA modulator goes with it. Linalool, vetiverol, and clary sage work through the same pathway. Extended overnight diffusion. The rest your nervous system needs.", phase: "20:00 – 23:00" },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="equilibrium-card rounded-2xl p-6 border h-full" style={{ borderColor: "#D4B8D4" }}>
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#7C5C7C" }}>{item.phase}</p>
                  <h3 className="text-lg font-medium mb-1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#3D2E4A" }}>
                    {item.name}
                  </h3>
                  <p className="text-xs italic mb-3" style={{ color: "#7C5C7C" }}>{item.subtitle}</p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.desc}</p>
                  <span className="text-xs px-3 py-1 rounded-full" style={{ background: "#E8D8E8", color: "#7C5C7C" }}>
                    Coming soon — join waitlist
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="mt-8 rounded-xl p-6 border border-gray-200 bg-white">
            <p className="text-sm font-medium text-gray-800 mb-2 text-center">A note on what Equilibrium is — and is not</p>
            <p className="text-sm text-gray-500 leading-relaxed text-center max-w-2xl mx-auto">
              Equilibrium does not replace HRT. It does not claim to treat or cure any condition. It addresses the neurological environment — the autonomic state, the cortisol architecture, the amygdala reactivity — through the olfactory pathway. A precision instrument for a specific biological context. Nothing more. Nothing less.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── OLFACTORY RESTORATION — 22812.jpg reused ── */}
      <section id="restoration" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <FadeIn>
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">Olfactory Restoration</p>
              <h2 className="text-3xl font-light mb-5" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                Your sense of smell,<br />restored.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                Olfactory receptor neurons are among the only neurons in the human body that regenerate throughout life. The question is not whether they will grow back. The question is whether they will grow back correctly.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                Directed olfactory stimulation — twice daily, specific compounds, timed to the circadian rhythm — guides regenerating neurons back to correct function. Without clinical appointments, waiting lists, or anything to add to your day.
              </p>
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
              <img src="/images/restoration-collection.jpg" alt="Sana Essencia Olfactory Restoration — Foundations vials"
                className="w-full object-cover" style={{ height: "500px", objectPosition: "center" }} />
              <div className="absolute top-4 right-4">
                <span className="bg-white/80 backdrop-blur-sm text-gray-700 text-xs px-3 py-1 rounded-full uppercase tracking-widest">Concept visualisation</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-6 py-4"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)" }}>
                <p className="text-white text-xs uppercase tracking-widest opacity-70 mb-1">Coming Soon</p>
                <p className="text-white text-lg font-light" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  The Restoration Collection
                </p>
                <p className="text-white text-xs opacity-60 mt-1">Illustrative image — final vials may differ</p>
              </div>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { tier: "Foundations", subtitle: "Weeks 1 – 12", desc: "The classical Hummel protocol. Four scents — Rose Absolute, Eucalyptus Globulus, Lemon Cold-Pressed, Clove Bud — presented twice daily. The entry point of the Olfactory Restoration Pathway.", scents: ["Florum — Rose Absolute", "Resina — Eucalyptus Globulus", "Spicium — Clove Bud", "Fructos — Lemon Cold-Pressed"], bg: "#faf8f5", border: "#e8e0d5" },
              { tier: "Sensory Expansion", subtitle: "Weeks 13 – 24", desc: "The modified protocol. Four new compounds introduced at week 12 to stimulate new neural pathways. Rotating scent sets produces superior outcomes. The Damm 2014 protocol.", scents: ["Lavender", "Scots Pine", "Jasmine", "Peppermint"], bg: "#f5f8f5", border: "#d5e8d5" },
              { tier: "Oil Vitals", subtitle: "Monthly subscription", desc: "Ongoing refill delivery on a 28-day schedule. The unbroken signal is the mechanism. Interrupting the protocol weakens the conditioned response. The subscription exists so that never happens.", scents: ["Your chosen compounds", "Delivered monthly", "Never interrupted", "Refill and continue"], bg: "#f5f7fa", border: "#d5dde8" },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="rounded-2xl p-6 border h-full" style={{ background: item.bg, borderColor: item.border }}>
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">{item.subtitle}</p>
                  <h3 className="text-xl font-medium text-gray-900 mb-3" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{item.tier}</h3>
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
        <FadeIn delay={150}>
          <div className="mt-8 rounded-xl p-6 border border-gray-200 bg-white">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 text-center">Why circadian timing matters for olfactory recovery</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm font-medium text-gray-800 mb-2">Morning — within 30 minutes of waking</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  The cortisol awakening response creates a neuroplasticity window. Stimulating compounds — eucalyptus, lemon, pine, peppermint — amplify both olfactory retraining and cortisol activation simultaneously.
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 mb-2">Evening — 60 to 90 minutes before sleep</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Slow wave sleep is when olfactory memory consolidation occurs. Restorative compounds — rose, lavender, jasmine, clove — before sleep mean the neural activity from retraining is consolidated overnight.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── SUBSCRIPTION ── */}
      <section id="subscription" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <FadeIn>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">Recurring Delivery</p>
              <h2 className="text-3xl font-light mb-5" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                The unbroken signal.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                Neural anchoring requires an unbroken signal. Refresh your lava beads every 2 to 4 weeks. A refill subscription delivers your formulations on your chosen schedule so your nervous system always receives a clear, consistent cue.
              </p>
              <p className="text-xs text-gray-400 italic">
                Gaps in the sequence weaken the conditioned response. The subscription exists so that never happens.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { name: "Morning Activation", sub: "β-Pinene Complex", desc: "Rosemary, Scots Pine, Lemon, Peppermint", dot: "#C17F3A" },
                { name: "Cognitive Stamina", sub: "1,8-Cineole Complex", desc: "Eucalyptus, Black Pepper, Cedarwood, Frankincense", dot: "#4A7A65" },
                { name: "Calm Blend", sub: "Linalool Complex", desc: "Lavender, Roman Chamomile, Vetiver, Bergamot FCF", dot: "#4A6A9A" },
                { name: "Nexus — Baseline", sub: "Equilibrium Complex", desc: "Clary Sage, Linalool, Rose Geranium, Bergamot, Frankincense", dot: "#7C5C7C" },
              ].map((blend, i) => (
                <div key={i} className="flex gap-4 items-center bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: blend.dot }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{blend.name}</p>
                    <p className="text-xs text-gray-400">{blend.sub}</p>
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
                <p className="uppercase tracking-widest text-xs mb-3" style={{ color: "#9DB4C8" }}>The Research Club</p>
                <h2 className="text-3xl font-light mb-5 text-white" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  Help shape the science.
                </h2>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#C5D0DC" }}>
                  Sana Essencia is built on observation, and we are still observing. We are researching how the working day moves through people — the afternoon dip, the commute home, the pre-meeting nerves, the moments a mood shifts without warning.
                </p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#C5D0DC" }}>
                  If you work in an office, study, treat patients, or simply move through a demanding day, your honest experience genuinely shapes what we build next. It takes about two minutes, it is anonymous unless you choose otherwise, and there is nothing medical in it.
                </p>
                <p className="text-xs leading-relaxed mb-6" style={{ color: "#9DB4C8" }}>
                  Members of the Research Club receive occasional updates on what we learn — and the first chance to test the instruments before launch.
                </p>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeW3FOUbL0JP9tnBoYQMyZwMH6YT0Qp59yhPB56JX2VKLouQg/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-7 py-3 rounded-full bg-white text-gray-900 text-sm font-medium hover:bg-gray-100 transition"
                >
                  Take part — two minutes
                </a>
              </div>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <p className="text-sm font-medium text-white mb-1">Why it matters</p>
                  <p className="text-xs leading-relaxed" style={{ color: "#9DB4C8" }}>
                    Real answers from real working lives tell us which moments matter most — and which compounds to prioritise. This is research that becomes product.
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <p className="text-sm font-medium text-white mb-1">Designed for convenience</p>
                  <p className="text-xs leading-relaxed" style={{ color: "#9DB4C8" }}>
                    Our instruments — the Vectors — are mobile by design. Pocketable, discreet, used on the spot the moment you choose. No spray into shared air. Nothing to wear. Nothing to charge. The scent goes where you go.
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <p className="text-sm font-medium text-white mb-1">Scent with intention</p>
                  <p className="text-xs leading-relaxed" style={{ color: "#9DB4C8" }}>
                    One deliberate breath, wherever you are, and your nervous system is already responding. The pathway the science describes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── WAITLIST ── */}
      <WaitlistSection />

      {/* ── PERCEIVED BENEFITS ── */}
      <section id="perceived-benefits" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <FadeIn>
          <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">Perceived Benefits</p>
          <h2 className="text-3xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            What users report.
          </h2>
          <p className="text-gray-500 text-sm mb-3 max-w-2xl">
            The following perceived effects are reported by people using circadian-timed olfactory protocols consistent with the Sana Essencia approach. They reflect the documented mechanisms of the active compounds — not claims about any specific medical outcome.
          </p>
          <p className="text-xs text-gray-400 italic mb-10 max-w-2xl">
            Individual responses vary. Sana Essencia instruments are not medical devices and are not intended to treat, diagnose, or cure any condition. All compound mechanisms referenced are drawn from peer-reviewed published research.
          </p>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { phase: "Morning", icon: "○", color: "#C17F3A", bg: "#fdf6ec", border: "#f0d9b5", title: "Greater morning clarity", desc: "Users report feeling more cognitively present within the first 20 minutes of waking when using the Morning Activation protocol during the cortisol awakening window.", mechanism: "β-Pinene — acetylcholinesterase inhibition — Moss et al., 2012" },
            { phase: "Morning", icon: "○", color: "#C17F3A", bg: "#fdf6ec", border: "#f0d9b5", title: "Reduced morning fog", desc: "Particularly noted by perimenopausal women. The cholinergic amplification mechanism supports prefrontal activation during a period when estradiol decline reduces natural acetylcholine synthesis.", mechanism: "1,8-Cineole — dual cholinergic action — Jager et al., 1992" },
            { phase: "Afternoon", icon: "◐", color: "#4A7A65", bg: "#f0f5f0", border: "#c5ddc5", title: "Sustained afternoon focus", desc: "Users report maintaining attention through the afternoon cognitive trough without caffeine. The CB2 modulation mechanism supports neuroinflammation reduction over extended deep work periods.", mechanism: "Beta-caryophyllene — CB2 receptor agonist — Juhasz et al., 2020" },
            { phase: "Afternoon", icon: "◐", color: "#4A7A65", bg: "#f0f5f0", border: "#c5ddc5", title: "Calmer response to pressure", desc: "During high-cognitive-load periods — presentations, examinations, complex decisions — users report a more measured emotional response when the afternoon protocol is in place.", mechanism: "1,8-Cineole + beta-caryophyllene — combined attentional support" },
            { phase: "Evening", icon: "●", color: "#4A6A9A", bg: "#f0f2f5", border: "#c5cede", title: "Easier transition to rest", desc: "Users report falling asleep more readily and feeling less mentally activated at bedtime when the evening protocol has been in place for 14 or more consecutive days.", mechanism: "Linalool — GABA modulation — Goel et al., 2005" },
            { phase: "Evening", icon: "●", color: "#4A6A9A", bg: "#f0f2f5", border: "#c5cede", title: "Reduced evening tension", desc: "The shift from sympathetic to parasympathetic dominance — which linalool supports through GABA modulation — is reported as a physical sense of the body releasing the day's accumulated tension.", mechanism: "Vetiverol + linalool — sympathetic tone reduction" },
            { phase: "Equilibrium", icon: "✦", color: "#7C5C7C", bg: "#f5eff5", border: "#d4b8d4", title: "Feeling more like yourself", desc: "Users of the Nexus Baseline report a perceptible return toward emotional baseline during acute perimenopausal mood fluctuation — the specific experience the formula was designed around.", mechanism: "Clary sage — cortisol reduction, serotonin support — Lee et al., 2014" },
            { phase: "Equilibrium", icon: "✦", color: "#7C5C7C", bg: "#f5eff5", border: "#d4b8d4", title: "Reduced acute mood ambush", desc: "The sudden mood shift with no apparent cause — characteristic of perimenopausal affective dysregulation — is reported as less overwhelming when the Nexus is used consistently during these moments over 21 days.", mechanism: "Linalool + rose geranium — HPA axis support — Rashidi Fakari et al., 2015" },
            { phase: "Restoration", icon: "↑", color: "#2C4A3E", bg: "#f0f5f2", border: "#b5d5c5", title: "Gradual scent recognition returning", desc: "Users following the Olfactory Restoration Pathway report first detection of scent — often the eucalyptus or lemon formula — within 2 to 6 weeks of consistent twice-daily use.", mechanism: "Limonene, 1,8-Cineole — trigeminal activation — Hummel et al., 2009" },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 50}>
              <div className="benefit-card rounded-2xl p-6 border h-full flex flex-col" style={{ background: item.bg, borderColor: item.border }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold" style={{ color: item.color }}>{item.icon}</span>
                  <span className="text-xs uppercase tracking-widest font-medium" style={{ color: item.color }}>{item.phase}</span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">{item.desc}</p>
                <p className="text-xs text-gray-400 italic border-t border-gray-100 pt-3">{item.mechanism}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={150}>
          <div className="rounded-xl p-5 border border-gray-200 bg-white">
            <p className="text-xs text-gray-500 leading-relaxed text-center max-w-3xl mx-auto">
              Perceived benefits reflect user-reported experiences consistent with the documented neurological mechanisms of the active compounds in Sana Essencia formulations. They are not guaranteed outcomes. The conditioned olfactory response requires consistent daily use across a minimum of 14 to 21 sessions to consolidate. Results are individual and depend on protocol adherence, biological baseline, and the specific neurological state being anchored.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── FOUNDER ── */}
      <section id="founder" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <FadeIn>
          <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">Founder</p>
          <h2 className="text-3xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Why Sana Essencia exists.
          </h2>
          <p className="text-gray-500 text-sm mb-10 max-w-xl">
            Sana Essencia is pre-launch. There are no customer reviews yet — and we would rather wait for real ones than invent them. In the meantime, here is the honest story of why this exists.
          </p>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="rounded-2xl p-8 md:p-10 border" style={{ background: "linear-gradient(135deg, #f5f0f5 0%, #ede5ed 100%)", borderColor: "#d4b8d4" }}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm font-semibold" style={{ background: "#5C3A5C" }}>P</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-gray-900">Patricia</p>
                  <span className="text-xs px-2 py-0.5 rounded-full text-white" style={{ background: "#7C5C7C" }}>Founder</span>
                </div>
                <p className="text-xs text-gray-500 mb-4">Founder, Sana Essencia · Basingstoke, UK</p>

                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  I am not a scientist. I want to say that plainly, before anything else, because the whole of Sana Essencia is built on the discipline of not pretending otherwise.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  What I am is a translator — someone who reads the research most people never get near, and asks a stubborn question of every claim: where is the receptor? Where is the pathway? Where is the citation? If a compound can't answer that question, it doesn't go in the bottle. Mechanism or nothing.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  The idea itself has a specific origin. In 2023 I listened to an episode of the Huberman Lab podcast featuring Professor Noam Sobel of the Weizmann Institute — a conversation about the olfactory system as one of the most direct, least understood pathways into the brain. It wasn't a vague inspiration. It was a specific, falsifiable claim about how scent reaches the nervous system, and I couldn't stop pulling on the thread.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  At the same time, I was living the exact gap the research described. Holding down a demanding corporate role, watching my own nervous system run down across the day in ways that had nothing to do with willpower, and finding that almost nothing on the market was built on an actual mechanism — just mood, marketing, and the word "wellness" doing a great deal of unearned work.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  So I started doing what I do for a living anyway: reading the papers, finding the named compound, tracing it to the documented pathway, and refusing to write a word of copy I couldn't defend to a pharmacologist. Sana Essencia is that discipline turned into a product line — three ranges, each built for a specific moment biology works against you, each compound chosen because the science says it should be there, not because it smells nice.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  I'm building this in public, pre-launch, with full transparency about what's proven, what's promising, and what's still being tested. No fabricated reviews. No invented traction. Just the mechanism, the citation, and an honest account of where we are.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="mt-8 rounded-xl p-5 border border-dashed border-gray-200 bg-stone-50">
            <p className="text-xs text-gray-400 text-center leading-relaxed">
              As Sana Essencia moves toward launch, this section will grow with verified experiences from early access customers and clinical practitioners. If you would like to be among the first to share yours, we would love to hear from you at{" "}
              <a href="mailto:hello@sanaessencia.co.uk" className="text-gray-600 hover:text-gray-900 underline">hello@sanaessencia.co.uk</a>
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── USE CASES ── */}
      <section id="use-cases" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <FadeIn>
          <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">Who It Serves</p>
          <h2 className="text-3xl font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Every environment has a nervous system.
          </h2>
          <p className="text-gray-500 text-sm mb-10 max-w-xl">
            Sana Essencia instruments are designed for any context where cognitive performance, emotional regulation, or autonomic state matters.
          </p>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { env: "The Office", icon: "🏢", desc: "Knowledge workers and coworking members. The desk is already a sensory environment. The Meridian Station makes it a functional one.", product: "Meridian Station + Inhaler Slide" },
            { env: "The Classroom", icon: "📚", desc: "Students before examinations. Study with a specific scent during revision. Use the same scent in the exam. The neural anchor fires.", product: "Synaptic Disc — Cognitive Stamina" },
            { env: "The Treatment Room", icon: "🏥", desc: "Therapists and physiotherapists. The environment is part of the intervention. A patient who arrives in parasympathetic dominance is a different patient.", product: "Dusk Vessel + Calm Blend" },
            { env: "The Bedroom", icon: "🌙", desc: "Adults with elevated sympathetic tone in the evening. Passive linalool and vetiverol diffusion during the restorative sleep phase.", product: "Dusk Vessel — Calm Blend" },
            { env: "The Perimenopausal Moment", icon: "🌸", desc: "The mood that arrives without warning. The Nexus is in your bag. Three breaths. The olfactory pathway does the rest before the cortisol compounds.", product: "Nexus — Baseline / Equilibrium" },
            { env: "The Dental Chair", icon: "🦷", desc: "Dental anxiety is one of the most common autonomic stress responses in adults. Linalool reduces sympathetic activity before the first instrument is raised.", product: "Elemental Token — Calm Blend" },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 60}>
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm h-full">
                <p className="text-2xl mb-3">{item.icon}</p>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{item.env}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{item.desc}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">{item.product}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── CORPORATE ── */}
      <section id="corporate" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <FadeIn>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">B2B & Corporate</p>
              <h2 className="text-3xl font-light mb-5" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                Workplace precision health.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                Sana Essencia instruments are integrated into workplace environments to maintain cognitive performance and autonomic balance during high-load operational periods — with zero disruption to the workday.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                Available as corporate gifting sets, coworking space amenity kits, and workplace performance programme components.
              </p>
              <a href="#waitlist" className="inline-block px-6 py-3 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:border-gray-500 transition">
                Enquire about partnerships
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🏢", label: "Coworking spaces", desc: "Amenity kits for members" },
                { icon: "🎁", label: "Corporate gifting", desc: "Branded sets for clients and teams" },
                { icon: "📦", label: "Bulk subscription", desc: "Recurring oil refills at volume" },
                { icon: "🤝", label: "White label", desc: "Enterprise partnership programme" },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                  <p className="text-xl mb-2">{item.icon}</p>
                  <p className="text-sm font-medium text-gray-800 mb-1">{item.label}</p>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── FOOTER — logo-dark.png ── */}
      <footer style={{ background: "#2d3748" }} className="w-full">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <img src="/images/logo-dark.png" alt="Sana Essencia" style={{ height: "56px", width: "auto", marginBottom: "16px" }} />
              <p className="text-xs leading-relaxed max-w-xs mb-3" style={{ color: "#9aa5b4" }}>
                Your nervous system, regulated.<br />
                Without adding anything to your day.<br /><br />
                Neuro-aromachology instruments for cognitive performance, autonomic balance, circadian alignment, and the perimenopausal transition.
              </p>
              <p className="text-xs italic" style={{ color: "#718096" }}>Scientia et Natura Formula</p>
              <p className="text-xs mt-3" style={{ color: "#718096" }}>Product images are illustrative. Final devices, vials, packaging and finishes may differ from those shown.</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest mb-3 font-medium" style={{ color: "#a0aec0" }}>Navigate</p>
              <ul className="space-y-2">
                {[
                  ["#discover", "Discover Sana Essencia"],
                  ["#neuro-tools", "Cognitive Regulation"],
                  ["#equilibrium", "Equilibrium"],
                  ["#restoration", "Olfactory Restoration"],
                  ["#research", "The Research Club"],
                  ["#perceived-benefits", "Perceived Benefits"],
                  ["#founder", "Founder"],
                  ["#cycle", "The Protocol"],
                  ["#subscription", "Subscription"],
                  ["#waitlist", "Early Access"],
                  ["#corporate", "Partnerships"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a href={href} className="text-xs hover:text-white transition" style={{ color: "#9aa5b4" }}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest mb-3 font-medium" style={{ color: "#a0aec0" }}>Legal</p>
              <ul className="space-y-2">
                {["Privacy Policy", "Terms of Use", "Cookie Policy", "Refund Policy"].map(item => (
                  <li key={item}>
                    <a href="#" className="text-xs hover:text-white transition" style={{ color: "#9aa5b4" }}>{item}</a>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <p className="text-xs uppercase tracking-widest mb-2 font-medium" style={{ color: "#a0aec0" }}>Contact</p>
                <a href="mailto:hello@sanaessencia.co.uk" className="text-xs hover:text-white transition" style={{ color: "#9aa5b4" }}>hello@sanaessencia.co.uk</a>
              </div>
              <div className="mt-4">
                <p className="text-xs uppercase tracking-widest mb-2 font-medium" style={{ color: "#a0aec0" }}>Watch</p>
                <a href="https://youtube.com/@sanaessencia" className="text-xs hover:text-white transition" style={{ color: "#9aa5b4" }}>YouTube — Neuro-Aromachology</a>
              </div>
            </div>
          </div>
          <div className="pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <p className="text-xs" style={{ color: "#718096" }}>
              © {new Date().getFullYear()} Sana Essencia Ltd. All rights reserved. Product designs protected by UK Registered Design and Unregistered Design Right. Trade marks applied for.
            </p>
            <p className="text-xs" style={{ color: "#718096" }}>Basingstoke, United Kingdom</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;
