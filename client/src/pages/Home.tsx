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
          <div>
            <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">Early Access</p>
            <h2 className="text-3xl font-light mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Join the waitlist.</h2>
            <p className="text-gray-600 mb-8 leading-relaxed text-sm">
              Be among the first to receive your Cognitive Regulation Module.
              Early access members receive priority dispatch and a complimentary
              refill subscription for their first cycle.
            </p>

            {!submitted ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Full name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Email address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white" onKeyDown={(e) => e.key === "Enter" && handleSubmit()} />
                </div>
                {error && <p className="text-red-400 text-xs">{error}</p>}
                <button onClick={handleSubmit} disabled={loading} className="w-full px-6 py-3 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed">
                  {loading ? "Registering…" : "Request Early Access"}
                </button>
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
                    <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-xs font-semibold text-stone-500">{entry.name[0]}</div>
                    <span className="text-gray-700 font-medium">{entry.name}</span>
                  </div>
                  <span className="text-gray-400 text-xs">{entry.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

const Home = () => {
  return (
    <div className="w-full bg-stone-50 text-gray-900" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .se-divider { height: 1px; background: linear-gradient(to right, transparent, #d1cdc7, transparent); margin: 0; }
        .product-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .product-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); }
        .phase-pill { display: inline-block; padding: 2px 10px; border-radius: 99px; font-size: 11px; letter-spacing: 0.08em; font-weight: 500; }
      `}</style>

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-stone-50/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <a href="/"><img src="/images/logo-light.png" alt="Sana Essencia" style={{ height: "40px", width: "auto" }} /></a>
          <a href="#waitlist" className="px-5 py-2 rounded-full bg-gray-900 text-white text-xs font-medium hover:bg-gray-700 transition">Early Access</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 border-b border-gray-200">
        <FadeIn><p className="uppercase tracking-widest text-xs text-gray-400 mb-4">Neuro-Aromachology Infrastructure</p></FadeIn>
        <FadeIn delay={100}><h1 className="max-w-3xl leading-tight mb-6" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 300 }}>Precision micro-regulation<br /><em>for the nervous system.</em></h1></FadeIn>
      </section>

      {/* ── IMAGE: HUMAN MODEL ── */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <FadeIn><div className="relative rounded-2xl overflow-hidden shadow-xl"><img src="/images/model-ritual.jpg" alt="Ritual" className="w-full object-cover" style={{ maxHeight: "520px" }} /></div></FadeIn>
      </section>

      {/* ── SCIENCE + MOLECULAR HERO ── */}
      <section id="science" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <FadeIn>
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative rounded-2xl overflow-hidden shadow-lg"><img src="/images/lava-drop.jpg" alt="Science" className="w-full object-cover" style={{ height: "420px" }} /></div>
            <div>
              <h2 className="text-3xl font-light mb-5" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>The only sense with a direct line to the emotional brain.</h2>
              <p className="text-gray-600 leading-relaxed text-sm">Aromatic molecules travel from the olfactory bulb straight to the limbic system, bypassing the thalamus entirely.</p>
            </div>
          </div>
          {/* New Molecular Hero Section */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl mb-16">
            <img src="/images/molecular-hero.jpg" alt="Molecular Intervention" className="w-full object-cover" style={{ maxHeight: "480px" }} />
          </div>
        </FadeIn>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="neuro-tools" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <h2 className="text-3xl font-light mb-10" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Cognitive Regulation Modules.</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {["Inhaler Slide", "Synaptic Disc", "Dusk Vessel"].map((name, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="product-card bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{name}</h3>
                <div className="h-32 bg-stone-100 mb-4 rounded-lg flex items-center justify-center text-stone-300 text-xs">Image</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── WAITLIST ── */}
      <WaitlistSection />

      {/* ── FOOTER ── */}
      <footer style={{ background: "#2d3748" }} className="w-full py-16 px-6">
        <div className="max-w-6xl mx-auto text-white">
          <img src="/images/logo-dark.png" alt="Sana Essencia" style={{ height: "56px", marginBottom: "20px" }} />
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} Sana Essencia Ltd. Basingstoke, United Kingdom.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
