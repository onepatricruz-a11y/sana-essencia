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
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
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
  const [joinedList, setJoinedList] = useState([
    { name: "Isabelle M.", time: "2 min ago" },
    { name: "Thomas K.", time: "7 min ago" },
    { name: "Priya S.", time: "14 min ago" },
  ]);

  const handleSubmit = async () => {
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (!email || !email.includes("@")) { setError("Please enter a valid email address."); return; }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setConfirmationMsg(
      `Your registration has been recorded, ${name.split(" ")[0]}. You are now in the queue for the first release of our Cognitive Regulation Modules. We will be in touch as we approach our launch window.`
    );
    setSubmitted(true);
    setJoinedList((prev) => [
      { name: name.split(" ")[0] + " " + (name.split(" ")[1]?.[0] || "") + ".", time: "just now" },
      ...prev.slice(0, 4),
    ]);
    setLoading(false);
  };

  return (
    <section id="waitlist" className="max-w-6xl mx-auto px-6 py-20 border-b border-gray-200">
      <FadeIn>
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Left — form */}
          <div>
            <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">Early Access</p>
            <h2
              className="text-3xl font-light mb-4"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Join the waitlist.
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed text-sm">
              Be among the first to receive your Cognitive Regulation Module.
              Early access members receive priority dispatch and a complimentary
              refill subscription for their first cycle.
            </p>

            {!submitted ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Full name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  />
                </div>
                {error && <p className="text-red-400 text-xs">{error}</p>}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full px-6 py-3 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {loading ? "Registering…" : "Request Early Access"}
                </button>
                <p className="text-xs text-gray-400 text-center">
                  No spam. Priority dispatch only. Unsubscribe any time.
                </p>
              </div>
            ) : (
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-6">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Registration confirmed</p>
                <p className="text-gray-700 leading-relaxed text-sm">{confirmationMsg}</p>
              </div>
            )}
          </div>

          {/* Right — live registrations */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">Recent registrations</p>
            <ul className="space-y-3">
              {joinedList.map((entry, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm shadow-sm"
                  style={{ transition: "all 0.4s ease" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-xs font-semibold text-stone-500">
                      {entry.name[0]}
                    </div>
                    <span className="text-gray-700 font-medium">{entry.name}</span>
                  </div>
                  <span className="text-gray-400 text-xs">{entry.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-gray-400">Names partially anonymised to protect privacy.</p>
          </div>

        </div>
      </FadeIn>
    </section>
  );
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
const Home = () => {
  return (
    <div className="w-full bg-stone-50 text-gray-900" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .se-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #d1cdc7, transparent);
          margin: 0;
        }

        .product-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
        }

        .phase-pill {
          display: inline-block;
          padding: 2px 10px;
          border-radius: 99px;
          font-size: 11px;
          letter-spacing: 0.08em;
          font-weight: 500;
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-stone-50/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img
              src="/images/logo-light.png"
              alt="Sana Essencia — Neuro-Aromachology"
              style={{ height: "40px", width: "auto" }}
            />
          </a>
          <div className="flex items-center gap-6">
            <a href="#neuro-tools" className="text-xs uppercase tracking-widest text-gray-500 hover:text-gray-900 transition hidden md:block">Products</a>
            <a href="#science" className="text-xs uppercase tracking-widest text-gray-500 hover:text-gray-900 transition hidden md:block">Science</a>
            <a href="#waitlist" className="px-5 py-2 rounded-full bg-gray-900 text-white text-xs font-medium hover:bg-gray-700 transition">
              Early Access
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 border-b border-gray-200">
        <FadeIn delay={0}>
          <p className="uppercase tracking-widest text-xs text-gray-400 mb-4">Neuro-Aromachology Infrastructure</p>
        </FadeIn>
        <FadeIn delay={100}>
          <h1
            className="max-w-3xl leading-tight mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              fontWeight: 300,
              letterSpacing: "-0.01em",
            }}
          >
            Precision micro-regulation<br />
            <em>for the nervous system.</em>
          </h1>
        </FadeIn>
        <FadeIn delay={200}>
          <p className="text-gray-500 max-w-xl leading-relaxed mb-8 text-base">
            Sana Essencia engineers scientifically-validated scent delivery protocols.
            Our neuro-aromachology instruments provide rapid, non-invasive
            intervention to optimise cognitive state and mood — without disrupting your day.
          </p>
        </FadeIn>
        <FadeIn delay={300}>
          <div className="flex flex-wrap gap-3">
            <a
              href="#neuro-tools"
              className="px-6 py-3 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition"
            >
              View the Range
            </a>
            <a
              href="#waitlist"
              className="px-6 py-3 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:bg-white hover:border-gray-500 transition"
            >
              Join the Waitlist
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ── IMAGE 1: HUMAN MODEL ── */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <FadeIn>
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/images/model-ritual.jpg"
              alt="Applying neuro-scent oil to the Inhaler Slide lava bead tray"
              className="w-full object-cover"
              style={{ maxHeight: "520px", objectPosition: "center 20%" }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 px-8 py-6"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)" }}
            >
              <p className="text-white text-sm tracking-widest uppercase opacity-80">The Ritual</p>
              <p
                className="text-white text-lg font-light mt-1"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                One drop. One breath. One shift.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      <div className="se-divider" />

      {/* ── PROBLEM ── */}
      <section id="problem" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <FadeIn>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">The Problem</p>
              <h2
                className="text-3xl font-light mb-5"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Modern minds are overloaded.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                Screens, deadlines, emotional fatigue, and constant cognitive switching
                have become the new baseline. Traditional wellness tools require time,
                effort, or participation — things most people cannot afford.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm">
                Your nervous system needs support that works in the background, without asking anything of you.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "74%", label: "of UK workers report chronic stress affecting performance", src: "CIPD 2023" },
                { stat: "< 1s", label: "for aromatic molecules to reach the limbic system", src: "Neuroscience" },
                { stat: "3×", label: "faster than any other sensory pathway to the emotional brain", src: "Olfactory research" },
                { stat: "21 days", label: "to build a stable neural scent anchor through daily use", src: "Sana Essencia protocol" },
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

      {/* ── SCIENCE + IMAGE 2: LAVA DROP ── */}
      <section id="science" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <FadeIn>
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg order-2 md:order-1">
              <img
                src="/images/lava-drop.jpg"
                alt="Golden essential oil drop falling onto volcanic lava beads"
                className="w-full object-cover"
                style={{ height: "420px", objectPosition: "center" }}
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/80 backdrop-blur-sm text-gray-700 text-xs px-3 py-1 rounded-full uppercase tracking-widest">
                  Volcanic Lava Substrate
                </span>
              </div>
            </div>

            {/* Copy */}
            <div className="order-1 md:order-2">
              <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">The Science</p>
              <h2
                className="text-3xl font-light mb-5"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                The only sense with a direct line to the emotional brain.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 text-sm">
                Aromatic molecules travel from the olfactory bulb straight to the
                amygdala and hippocampus — the centres of emotion, memory, and
                state regulation — bypassing the thalamus entirely.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                Through repetition, the brain builds neural anchors between a
                specific scent and a specific state. The scent becomes the biological
                cue. Shift into focus, calm, or rest — on demand.
              </p>
              <div className="space-y-3">
                {[
                  { label: "Direct brain link", desc: "Olfactory → limbic system in under one second" },
                  { label: "Neural anchoring", desc: "Pairing scent with state builds a stable pathway" },
                  { label: "Circadian alignment", desc: "Blends formulated for morning, focus, and rest phases" },
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
      </section>

      {/* ── PRODUCTS ── */}
      <section id="neuro-tools" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <FadeIn>
          <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">The Range</p>
          <h2
            className="text-3xl font-light mb-2"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Cognitive Regulation Modules.
          </h2>
          <p className="text-gray-500 text-sm mb-10 max-w-xl">
            Portable scent instruments designed for cognitive clarity, emotional balance,
            and circadian alignment. Each device houses volcanic lava beads infused with
            proprietary neuro-aromachology oil blends.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Inhaler Slide",
              tag: "Morning · Focus",
              phase: "06:00 – 10:00",
              phaseColor: "#f0ede8",
              phaseText: "#6b6560",
              desc: "A precision sliding device revealing a lava bead tray infused with our Morning Activation blend — β-Pinene Complex. Engineered for the desk, the commute, and the pre-meeting reset.",
              oil: "Morning Activation — β-Pinene Complex",
              price: "£38",
            },
            {
              name: "Synaptic Disc",
              tag: "Afternoon · Deep Work",
              phase: "10:00 – 16:00",
              phaseColor: "#e8ede8",
              phaseText: "#4a6050",
              desc: "A flat palm-sized instrument combining tactile grounding with scent-based cognitive support. Rotating aperture controls diffusion intensity. Pairs with Cognitive Stamina blend.",
              oil: "Cognitive Stamina — 1,8-Cineole Complex",
              price: "£44",
            },
            {
              name: "Dusk Vessel",
              tag: "Evening · Rest",
              phase: "20:00 – 23:00",
              phaseColor: "#e8eaed",
              phaseText: "#505565",
              desc: "A vertically ribbed bedside canister with a rotating aperture cap. Diffuses passively through the night. Pairs with the Calm Blend — Linalool Complex for sleep-onset support.",
              oil: "Calm Blend — Linalool Complex",
              price: "£44",
            },
          ].map((product, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="product-card bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm flex flex-col">
                <div className="h-48 bg-stone-100 flex items-center justify-center text-stone-300 text-xs uppercase tracking-widest">
                  Product image
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                    <span className="text-sm font-semibold text-gray-700">{product.price}</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">{product.tag}</p>
                  <span
                    className="phase-pill mb-4 self-start"
                    style={{ background: product.phaseColor, color: product.phaseText }}
                  >
                    {product.phase}
                  </span>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{product.desc}</p>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Oil pairing</p>
                    <p className="text-xs text-gray-600 font-medium">{product.oil}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={200}>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              All devices 3D-printed in PA12 nylon. Lava beads included. Refill oil subscription available.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── CIRCADIAN PROTOCOL ── */}
      <section id="cycle" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">Protocols</p>
              <h2
                className="text-3xl font-light mb-4"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Circadian Alignment.
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Use circadian-aligned scent modules for systematic delivery of volatile
                organic compounds — calibrated to stabilise diurnal cortisol patterns
                throughout the day.
              </p>
            </div>
            <div className="md:col-span-2 space-y-4">
              {[
                {
                  time: "Morning", hours: "06:00 – 10:00",
                  title: "Wake / Focus Phase",
                  desc: "Activate the mind, clear cognitive fog, prime the prefrontal cortex for the day's first deep-work window.",
                  color: "#fdf6ec",
                },
                {
                  time: "Afternoon", hours: "10:00 – 16:00",
                  title: "Cognitive Peak Phase",
                  desc: "Sharpen sustained attention, bridge the post-lunch dip, maintain executive function through the afternoon.",
                  color: "#f0f5f0",
                },
                {
                  time: "Evening", hours: "20:00 – 23:00",
                  title: "Restorative Regulation Phase",
                  desc: "Release sympathetic tone, lower cortisol, anchor the olfactory cue for sleep onset.",
                  color: "#f0f2f5",
                },
              ].map((phase, i) => (
                <FadeIn key={i} delay={i * 80}>
                  <div
                    className="flex gap-5 rounded-xl p-5 border border-gray-100"
                    style={{ background: phase.color }}
                  >
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
          <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">Protocol</p>
          <h2
            className="text-3xl font-light mb-10"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            How it works.
          </h2>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { step: "01", action: "Apply", desc: "Add 1–3 drops of your scent formula onto the lava beads using the precision dropper." },
              { step: "02", action: "Open", desc: "Slide or rotate the aperture to your chosen dose — Passive, Active, or MAX." },
              { step: "03", action: "Use", desc: "Use your instrument only during the state you want to strengthen." },
              { step: "04", action: "Repeat", desc: "Daily use builds the neural pathway. The scent becomes the trigger." },
              { step: "05", action: "Refresh", desc: "Recharge your lava beads every 2–4 weeks to keep the neural cue strong." },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div className="text-center">
                  <p
                    className="text-3xl font-light text-gray-200 mb-3"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {s.step}
                  </p>
                  <p className="text-sm font-semibold text-gray-800 mb-2">{s.action}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── IMAGE 3: VIAL TRIO ── */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <FadeIn>
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/images/vial-trio.jpg"
              alt="Three Sana Essencia neuro-aromachology oil blends — Morning Activation, Cognitive Stamina, Calm Blend"
              className="w-full object-cover"
              style={{ maxHeight: "480px", objectPosition: "center" }}
            />
            <div
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
              style={{ background: "rgba(0,0,0,0.35)" }}
            >
              <p className="text-white text-xs uppercase tracking-widest mb-3 opacity-70">Proprietary Formulations</p>
              <h3
                className="text-white text-2xl md:text-3xl font-light"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Three blends. Three phases.<br />One nervous system.
              </h3>
              <div className="flex flex-wrap justify-center gap-6 mt-6">
                {["Morning Activation", "Cognitive Stamina", "Calm Blend"].map((label, i) => (
                  <span key={i} className="text-white text-xs uppercase tracking-widest opacity-80">
                    {label}
                  </span>
                ))}
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
              <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">Recurring Ritual</p>
              <h2
                className="text-3xl font-light mb-5"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Refill subscription.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                Neuro-aromachology works through repetition. To keep your neural anchor
                strong, refresh your lava beads every 2–4 weeks.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm">
                A refill subscription delivers fresh Sana Essencia scent modules on your
                chosen schedule — so your nervous system always receives a clear,
                consistent signal.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { name: "Morning Activation", sub: "β-Pinene Complex", desc: "Rosemary, Scots Pine, Lemon, Peppermint", bg: "#fdf0e0", icon: "☀️" },
                { name: "Cognitive Stamina", sub: "1,8-Cineole Complex", desc: "Eucalyptus, Black Pepper, Cedarwood, Frankincense", bg: "#e8f0e8", icon: "🧠" },
                { name: "Calm Blend", sub: "Linalool Complex", desc: "Lavender, Roman Chamomile, Vetiver, Bergamot FCF", bg: "#e8eaf0", icon: "🌙" },
              ].map((blend, i) => (
                <div key={i} className="flex gap-4 items-center bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <div
                    className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-sm"
                    style={{ background: blend.bg }}
                  >
                    {blend.icon}
                  </div>
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

      {/* ── WAITLIST ── */}
      <WaitlistSection />

      {/* ── CORPORATE ── */}
      <section id="corporate" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <FadeIn>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">B2B & Corporate</p>
              <h2
                className="text-3xl font-light mb-5"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Clinical Infrastructure Partnerships.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                Sana Essencia Neuro Instruments are integrated into workplace environments
                to maintain cognitive performance and stabilise emotional states during
                high-load operational periods — with zero disruption to the workday.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                Available as corporate gifting sets, coworking space amenity kits, and
                wellness programme components. Bespoke white-label options available for
                enterprise clients.
              </p>
              <a
                href="#waitlist"
                className="inline-block px-6 py-3 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:bg-white hover:border-gray-500 transition"
              >
                Enquire about partnerships
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🏢", label: "Coworking spaces", desc: "Amenity kits for members" },
                { icon: "🎁", label: "Corporate gifting", desc: "Branded sets for clients & teams" },
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

      {/* ── FOOTER ── */}
      <footer style={{ background: "#2d3748" }} className="w-full">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-8 mb-10">

            {/* Brand */}
            <div className="md:col-span-2">
              <img
                src="/images/logo-dark.png"
                alt="Sana Essencia"
                style={{ height: "56px", width: "auto", marginBottom: "16px" }}
              />
              <p className="text-xs leading-relaxed max-w-xs mb-3" style={{ color: "#9aa5b4" }}>
                Portable tools for the modern nervous system.<br />
                Neuro-aromachology instruments engineered for cognitive clarity,
                emotional balance, and circadian alignment.
              </p>
              <p className="text-xs italic" style={{ color: "#718096" }}>Scientia et Natura Formula</p>
            </div>

            {/* Navigate */}
            <div>
              <p className="text-xs uppercase tracking-widest mb-3 font-medium" style={{ color: "#a0aec0" }}>Navigate</p>
              <ul className="space-y-2">
                {[
                  ["#neuro-tools", "Products"],
                  ["#science", "Science"],
                  ["#cycle", "Protocols"],
                  ["#subscription", "Subscription"],
                  ["#waitlist", "Early Access"],
                  ["#corporate", "Partnerships"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-xs hover:text-white transition"
                      style={{ color: "#9aa5b4" }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <p className="text-xs uppercase tracking-widest mb-3 font-medium" style={{ color: "#a0aec0" }}>Legal</p>
              <ul className="space-y-2">
                {["Privacy Policy", "Terms of Use", "Cookie Policy", "Refund Policy"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-xs hover:text-white transition"
                      style={{ color: "#9aa5b4" }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom bar */}
          <div
            className="pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
          >
            <p className="text-xs" style={{ color: "#718096" }}>
              © {new Date().getFullYear()} Sana Essencia Ltd. All rights reserved.
              Product designs protected by UK Registered Design and Unregistered Design Right.
              Trade marks applied for.
            </p>
            <p className="text-xs" style={{ color: "#718096" }}>Basingstoke, United Kingdom</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;
