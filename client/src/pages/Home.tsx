import React, { useState, useEffect, useRef } from "react";

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

const WaitlistSection = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    if (!name.trim() || !email.includes("@")) return;
    setLoading(true);
    const response = await fetch("https://formspree.io/f/xqeowqqp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    if (response.ok) setSubmitted(true);
    setLoading(false);
  };
  return (
    <section id="waitlist" className="max-w-6xl mx-auto px-6 py-20 border-b border-gray-200">
      <FadeIn>
        <h2 className="text-3xl font-light mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Join the waitlist.</h2>
        {!submitted ? (
          <div className="max-w-md space-y-4">
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full name" className="w-full border rounded-lg px-4 py-3" />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full border rounded-lg px-4 py-3" />
            <button onClick={handleSubmit} className="w-full px-6 py-3 rounded-full bg-gray-900 text-white">{loading ? "Registering…" : "Request Early Access"}</button>
          </div>
        ) : <p>Registration confirmed.</p>}
      </FadeIn>
    </section>
  );
};

const Home = () => {
  return (
    <div className="w-full bg-stone-50 text-gray-900">
      <nav className="sticky top-0 z-50 bg-stone-50/90 backdrop-blur-md border-b">
        <div className="max-w-6xl mx-auto px-6 py-3"><img src="/logo-light.png" alt="Sana Essencia" style={{ height: "40px" }} /></div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <FadeIn><h1 className="text-5xl font-light mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Your nervous system, regulated.</h1></FadeIn>
        <img src="/model-ritual.jpg" alt="Ritual" className="w-full rounded-2xl shadow-xl" />
      </section>

      {/* New Nexus Ritual Image */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <FadeIn>
          <img src="/22876.png" alt="Sana Essencia Nexus Ritual" className="w-full rounded-2xl shadow-xl" />
        </FadeIn>
      </section>

      {/* Equilibrium */}
      <section id="equilibrium" className="max-w-6xl mx-auto px-6 py-16">
        <FadeIn>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-light mb-5" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Your baseline self.</h2>
              <p className="text-sm text-gray-600">The Equilibrium range is built to support the autonomic environment in which your nervous system operates.</p>
            </div>
            <img src="/22921.jpg" alt="Nexus" className="w-full rounded-2xl shadow-xl" />
          </div>
        </FadeIn>
      </section>

      <WaitlistSection />

      <footer className="w-full py-16 px-6 bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto"><img src="/logo-dark.png" alt="Sana Essencia" style={{ height: "56px" }} /></div>
      </footer>
    </div>
  );
};

export default Home;
