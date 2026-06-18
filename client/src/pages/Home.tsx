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
    try {
      const response = await fetch("https://formspree.io/f/xqeowqqp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (response.ok) {
        setConfirmationMsg(`Your registration has been recorded, ${name.split(" ")[0]}. You are now in the queue for the first release of our instruments. We will be in touch as we approach our launch window.`);
        setSubmitted(true);
        setJoinedList(prev => [{ name: name.split(" ")[0] + " " + (name.split(" ")[1]?.[0] || "") + ".", time: "just now" }, ...prev.slice(0, 4)]);
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
        <div className="grid md:grid-cols-2 gap-12 items-start">
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
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">Recent registrations</p>
            <ul className="space-y-3">
              {joinedList.map((entry, i) => (
                <li key={i} className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm shadow-sm">
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
            <img src="/logo-light.png" alt="Sana Essencia" style={{ height: "40px", width: "auto" }} />
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

      {/* ── HERO IMAGE ── */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <FadeIn>
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img src="/model-ritual.jpg" alt="Applying Sana Essencia oil"
              className="w-full object-cover" style={{ maxHeight: "560px", objectPosition: "center 25%" }} />
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

      {/* ── DISCOVER ── */}
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
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── SCIENCE ── */}
      <section id="science" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <FadeIn>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-lg order-2 md:order-1">
              <img src="/22812.jpg" alt="Golden essential oil drop"
                className="w-full object-cover" style={{ height: "480px", objectPosition: "center" }} />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-light mb-5" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                The only sense with a direct line to the emotional brain.
              </h2>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── VIAL TRIO ── */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <FadeIn>
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img src="/IMG_6444.jpg" alt="Three Sana Essencia oil formulations"
              className="w-full object-cover" style={{ maxHeight: "560px", objectPosition: "center" }} />
          </div>
        </FadeIn>
      </section>

      {/* ── EQUILIBRIUM ── */}
      <section id="equilibrium" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <FadeIn>
          <img src="/22921.jpg" alt="Sana Essencia Nexus" className="w-full rounded-2xl shadow-xl" />
        </FadeIn>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#2d3748" }} className="w-full">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <img src="/logo-dark.png" alt="Sana Essencia" style={{ height: "56px", width: "auto", marginBottom: "16px" }} />
          <p className="text-xs" style={{ color: "#718096" }}>© {new Date().getFullYear()} Sana Essencia Ltd.</p>
        </div>
      </footer>

    </div>
  );
};

export default Home;
