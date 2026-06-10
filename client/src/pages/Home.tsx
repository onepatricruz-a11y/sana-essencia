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

// ─── WAITLIST ──────────────────────────────────────────────────────────────
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
    setError(""); setLoading(true);
    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (response.ok) {
        setConfirmationMsg(`Your registration has been recorded, ${name.split(" ")[0]}.`);
        setSubmitted(true);
      } else { setError("Something went wrong."); }
    } catch { setError("Something went wrong."); }
    setLoading(false);
  };

  return (
    <section id="waitlist" className="max-w-6xl mx-auto px-6 py-20 border-b border-gray-200">
      <FadeIn>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-light mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Join the waitlist.</h2>
            {!submitted ? (
              <div className="space-y-4">
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full name" className="w-full border p-3 text-sm" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" className="w-full border p-3 text-sm" />
                <button onClick={handleSubmit} disabled={loading} className="w-full px-6 py-3 bg-gray-900 text-white text-sm">{loading ? "Registering…" : "Request Early Access"}</button>
              </div>
            ) : <div className="p-6 bg-stone-50 text-sm text-gray-700">{confirmationMsg}</div>}
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

// ─── MAIN ──────────────────────────────────────────────────────────────────
const Home = () => {
  return (
    <div className="w-full bg-stone-50 text-gray-900">
      <nav className="sticky top-0 z-50 bg-stone-50/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <a href="/"><img src="/images/logo-light.png" alt="Sana Essencia" style={{ height:"40px", width:"auto" }} /></a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <h1 className="text-5xl font-light mb-6" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Precision micro-regulation.</h1>
        <FadeIn><img src="/images/model-ritual.jpg" alt="Ritual" className="w-full rounded-2xl shadow-xl" /></FadeIn>
      </section>

      <WaitlistSection />
    </div>
  );
};

export default Home;
