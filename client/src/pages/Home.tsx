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
      `Your registration has been recorded, ${name.split(" ")[0]}. You are now in the queue for the first release of our Cognitive Regulation Modules.`
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
            {!submitted ? (
              <div className="space-y-4">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
                <button onClick={handleSubmit} disabled={loading} className="w-full px-6 py-3 rounded-full bg-gray-900 text-white text-sm hover:bg-gray-700">
                  {loading ? "Registering…" : "Request Early Access"}
                </button>
              </div>
            ) : (
              <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 text-sm text-gray-700">{confirmationMsg}</div>
            )}
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">Recent registrations</p>
            <ul className="space-y-3">
              {joinedList.map((entry, i) => (
                <li key={i} className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm">
                  <span className="font-medium">{entry.name}</span>
                  <span className="text-gray-400">{entry.time}</span>
                </li>
              ))}
            </ul>
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .se-divider { height: 1px; background: linear-gradient(to right, transparent, #d1cdc7, transparent); }
        .product-card { transition: transform 0.3s ease; }
        .product-card:hover { transform: translateY(-4px); }
        .phase-pill { display: inline-block; padding: 2px 10px; border-radius: 99px; font-size: 11px; font-weight: 500; }
      `}</style>

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-stone-50/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <a href="/"><img src="/images/logo-light.png" alt="Sana Essencia" style={{ height: "40px", width: "auto" }} /></a>
          <div className="flex items-center gap-6">
            <a href="#neuro-tools" className="text-xs uppercase tracking-widest text-gray-500 hidden md:block">Products</a>
            <a href="#science" className="text-xs uppercase tracking-widest text-gray-500 hidden md:block">Science</a>
            <a href="#waitlist" className="px-5 py-2 rounded-full bg-gray-900 text-white text-xs hover:bg-gray-700">Early Access</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 border-b border-gray-200">
        <FadeIn><p className="uppercase tracking-widest text-xs text-gray-400 mb-4">Neuro-Aromachology Infrastructure</p></FadeIn>
        <FadeIn delay={100}><h1 className="max-w-3xl leading-tight mb-6" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "3.8rem" }}>Precision micro-regulation<br /><em>for the nervous system.</em></h1></FadeIn>
      </section>

      {/* IMAGE: RITUAL */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <FadeIn><img src="/images/model-ritual.jpg" alt="Ritual" className="w-full rounded-2xl shadow-xl" /></FadeIn>
      </section>

      {/* PROBLEM SECTION */}
      <section id="problem" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-light mb-5" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Modern minds are overloaded.</h2>
            <p className="text-gray-600 text-sm leading-relaxed">Your nervous system needs support that works in the background.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[{stat: "74%", label: "Stress impact"}, {stat: "< 1s", label: "Direct brain link"}, {stat: "3×", label: "Pathway speed"}, {stat: "21 days", label: "Neural anchor"}].map((item, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-2xl font-semibold mb-1">{item.stat}</p>
                <p className="text-xs text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCIENCE + MOLECULAR HERO */}
      <section id="science" className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <img src="/images/lava-drop.jpg" alt="Science" className="w-full rounded-2xl shadow-lg" />
          <div>
            <h2 className="text-3xl font-light mb-5" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>The only sense with a direct line to the emotional brain.</h2>
          </div>
        </div>
        {/* NEW MOLECULAR HERO SECTION */}
        <FadeIn delay={200}><img src="/images/molecular-hero.jpg" alt="Molecular Intervention" className="w-full rounded-2xl shadow-xl mb-16" /></FadeIn>
      </section>

      {/* PRODUCTS */}
      <section id="neuro-tools" className="max-w-6xl mx-auto px-6 py-16 bg-white">
        <h2 className="text-3xl font-light mb-10" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Cognitive Regulation Modules.</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {["Inhaler Slide", "Synaptic Disc", "Dusk Vessel"].map((name, i) => (
            <div key={i} className="product-card border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-4">{name}</h3>
              <p className="text-sm text-gray-500">Precision instrument for state regulation.</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-16 border-t border-gray-200">
        <h2 className="text-3xl font-light mb-10" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>How it works.</h2>
        <div className="grid md:grid-cols-5 gap-6">
          {["Apply", "Open", "Use", "Repeat", "Refresh"].map((step, i) => (
            <div key={i} className="text-center"><p className="text-3xl font-light text-gray-200 mb-3">0{i+1}</p><p className="text-sm font-medium">{step}</p></div>
          ))}
        </div>
      </section>

      {/* WAITLIST */}
      <WaitlistSection />

      {/* FOOTER */}
      <footer style={{ background: "#2d3748" }} className="w-full py-16 px-6 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <img src="/images/logo-dark.png" alt="Sana Essencia" style={{ height: "56px", marginBottom: "16px" }} />
            <p className="text-xs text-gray-400">Scientia et Natura Formula. Basingstoke, UK.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
