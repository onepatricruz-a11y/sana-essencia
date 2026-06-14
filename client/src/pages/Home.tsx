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
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (response.ok) {
        setConfirmationMsg(`Registration confirmed. We will be in touch.`);
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
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">Early Access</p>
            <h2 className="text-3xl font-light mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              Join the waitlist.
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed text-sm">
              Be among the first to receive your instrument.
            </p>
            {!submitted ? (
              <div className="space-y-4">
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full name"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400" />
                {error && <p className="text-red-400 text-xs">{error}</p>}
                <button onClick={handleSubmit} disabled={loading}
                  className="w-full px-6 py-3 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition">
                  {loading ? "Registering…" : "Request Early Access"}
                </button>
              </div>
            ) : (
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-6">
                <p className="text-gray-700 leading-relaxed text-sm">{confirmationMsg}</p>
              </div>
            )}
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

// ─── MAIN ──
const Home = () => {
  return (
    <div className="w-full bg-stone-50 text-gray-900" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* --- ADD YOUR STYLES AND SECTIONS HERE AS PER PREVIOUS BLOCK --- */}
      
      {/* Example Image Implementation with Optimizations: */}
      <img 
        src="/images/Model-ritual.jpg" 
        alt="Applying Sana Essencia"
        loading="lazy" 
        style={{ aspectRatio: "16/9", width: "100%", objectFit: "cover" }} 
      />

      <WaitlistSection />
    </div>
  );
};

export default Home;
