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
      </section>

      {/* ── HERO IMAGE ── */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <FadeIn>
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img src="/images/Model-ritual.jpg" alt="Applying Sana Essencia oil"
              className="w-full object-cover" style={{ maxHeight: "560px", objectPosition: "center 25%" }} />
          </div>
        </FadeIn>
      </section>
      
      {/* ── NEW NEXUS RITUAL IMAGE ── */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <FadeIn>
          <img src="/images/22876.png" alt="Sana Essencia Nexus Ritual" className="w-full rounded-2xl shadow-xl" />
        </FadeIn>
      </section>

      {/* ── EQUILIBRIUM SECTION ── */}
      <section id="equilibrium" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <FadeIn>
          <div className="grid md:grid-cols-2 gap-12 items-center mb-14">
            <div>
              <p className="uppercase tracking-widest text-xs mb-3" style={{ color: "#7C5C7C" }}>Equilibrium — For Women in Transition</p>
              <h2 className="text-3xl font-light mb-5" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                Your baseline self.<br /><em>Still there.</em>
              </h2>
            </div>
            <img src="/images/22921.jpg" alt="Nexus" className="w-full rounded-2xl shadow-xl" />
          </div>
        </FadeIn>
      </section>

      <WaitlistSection />

      {/* ── FOOTER ── */}
      <footer style={{ background: "#2d3748" }} className="w-full py-16 px-6 text-white">
        <div className="max-w-6xl mx-auto">
          <img src="/images/logo-dark.png" alt="Sana Essencia" style={{ height: "56px" }} />
        </div>
      </footer>
    </div>
  );
};

export default Home;
