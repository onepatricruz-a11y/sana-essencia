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
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.includes("@")) { setError("Please provide valid details."); return; }
    setLoading(true);
    try {
      const response = await fetch("https://formspree.io/f/xqeowqqp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (response.ok) setSubmitted(true);
      else setError("Something went wrong.");
    } catch { setError("Something went wrong."); }
    setLoading(false);
  };

  return (
    <section id="waitlist" className="max-w-6xl mx-auto px-6 py-20 border-b border-gray-200">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-3xl font-light mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Join the waitlist.</h2>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Full name" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
              <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <button type="submit" className="w-full px-6 py-3 rounded-full bg-gray-900 text-white text-sm">
                {loading ? "Registering…" : "Request Early Access"}
              </button>
            </form>
          ) : <p className="text-sm">Thank you. Registration confirmed.</p>}
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="w-full bg-stone-50 text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <h1 className="text-5xl font-light mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Your nervous system, regulated.</h1>
        <p className="text-gray-600 max-w-xl mb-8">Sana Essencia engineers precision scent instruments that work through the fastest pathway to the emotional brain.</p>
        
        {/* Constrained Hero Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ maxHeight: "500px" }}>
            <img 
              src="/images/Model-ritual.jpg" 
              alt="Ritual"
              className="w-full h-full object-cover" 
              style={{ objectPosition: "center 25%" }} 
            />
        </div>
      </section>

      {/* Science Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-light mb-5" style={{ fontFamily: "'Cormorant Garamond', serif" }}>The only sense with a direct line to the emotional brain.</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-8">
            Aromatic molecules travel from the olfactory bulb straight to the amygdala and hippocampus.
        </p>
        
        <div className="relative rounded-2xl overflow-hidden shadow-lg mt-8" style={{ maxHeight: "400px" }}>
          <img src="/images/22812.jpg" alt="Lava beads" className="w-full h-full object-cover" />
        </div>
      </section>

      <WaitlistSection />
    </div>
  );
};

export default Home;
