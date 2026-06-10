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
  const [joinedList, setJoinedList] = useState([
    { name: "Isabelle M.", time: "2 min ago" },
    { name: "Thomas K.", time: "7 min ago" },
    { name: "Priya S.", time: "14 min ago" },
  ]);

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
        setConfirmationMsg(`Your registration has been recorded, ${name.split(" ")[0]}. You are now in the queue for the first release of our instruments.`);
        setSubmitted(true);
        setJoinedList(prev => [{ name: name.split(" ")[0] + " " + (name.split(" ")[1]?.[0] || "") + ".", time: "just now" }, ...prev.slice(0, 4)]);
      } else { setError("Something went wrong. Please try again."); }
    } catch { setError("Something went wrong. Please try again."); }
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
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full name" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
                <button onClick={handleSubmit} disabled={loading} className="w-full px-6 py-3 rounded-full bg-gray-900 text-white text-sm hover:bg-gray-700">{loading ? "Registering…" : "Request Early Access"}</button>
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

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────
const Home = () => {
  return (
    <div className="w-full bg-stone-50 text-gray-900" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .se-divider { height:1px; background:linear-gradient(to right,transparent,#d1cdc7,transparent); }
        .product-card { transition:transform 0.3s ease,box-shadow 0.3s ease; }
        .product-card:hover { transform:translateY(-4px); box-shadow:0 12px 40px rgba(0,0,0,0.08); }
        .phase-pill { display:inline-block; padding:2px 10px; border-radius:99px; font-size:11px; letter-spacing:0.08em; font-weight:500; }
        .nexus-card { background:linear-gradient(135deg,#2D2438 0%,#3D2E4A 50%,#2C3A3A 100%); }
        .equilibrium-card { background:linear-gradient(135deg,#f5f0f5 0%,#ede5ed 100%); }
      `}</style>

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-stone-50/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <a href="/"><img src="/images/logo-light.png" alt="Sana Essencia" style={{ height:"40px", width:"auto" }} /></a>
          <div className="flex items-center gap-6">
            <a href="#neuro-tools" className="text-xs uppercase tracking-widest text-gray-500 hidden md:block">Regulate</a>
            <a href="#equilibrium" className="text-xs uppercase tracking-widest text-gray-500 hidden md:block">Equilibrium</a>
            <a href="#restoration" className="text-xs uppercase tracking-widest text-gray-500 hidden md:block">Restore</a>
            <a href="#waitlist" className="px-5 py-2 rounded-full bg-gray-900 text-white text-xs hover:bg-gray-700">Early Access</a>
          </div>
        </div>
      </nav>

      {/* HERO & CONTENT - [Truncated for length, use the structure above for all sections] */}
      {/* Ensure you paste all sections (Problem, Science, Products, etc.) inside here as you had them previously */}

      <WaitlistSection />
    </div>
  );
};

export default Home;
