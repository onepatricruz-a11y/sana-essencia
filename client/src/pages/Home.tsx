// ─── WAITLIST (FORM INTEGRATED) ──────────────────────────────────────────────
const WaitlistSection = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload
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
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">Early Access</p>
          <h2 className="text-3xl font-light mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Join the waitlist.
          </h2>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Full name"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400" />
              </div>
              <div>
                <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400" />
              </div>
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <button type="submit" disabled={loading}
                className="w-full px-6 py-3 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition">
                {loading ? "Registering…" : "Request Early Access"}
              </button>
            </form>
          ) : (
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed text-sm">Thank you. Your request has been recorded.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
