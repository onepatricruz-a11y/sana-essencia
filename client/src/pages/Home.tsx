import React, { useState } from "react";

// --- Live Waitlist Component ---
const WaitlistSection = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmationMsg, setConfirmationMsg] = useState("");
  const [error, setError] = useState("");
  const [joinedList, setJoinedList] = useState([
    { name: "Isabelle M.", time: "2 min ago" },
    { name: "Thomas K.", time: "7 min ago" },
    { name: "Priya S.", time: "14 min ago" },
  ]);

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    setError("");
    setLoading(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const msg = `Thank you, ${name}. Your registration for early access has been recorded. You are now in the queue for the first release of our Cognitive Regulation Modules. We will be in touch with your access details as we approach our launch window.`;

    setConfirmationMsg(msg);
    setSubmitted(true);

    setJoinedList((prev) => [
      { name: name.split(" ")[0] + " " + (name.split(" ")[1]?.[0] || "") + ".", time: "just now" },
      ...prev.slice(0, 4),
    ]);
    
    setLoading(false);
  };

  return (
    <section id="waitlist" className="max-w-6xl mx-auto px-6 py-20 border-b border-gray-200">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <p className="uppercase tracking-widest text-sm text-gray-500 mb-3">Early Access</p>
          <h2 className="text-3xl font-semibold mb-4">Join the waitlist.</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            Be among the first to receive your Cognitive Regulation Module.
            Early access members receive priority dispatch and a complimentary
            refill subscription for their first cycle.
          </p>

          {!submitted ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Full name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white"
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full px-6 py-3 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Registering…" : "Request Early Access"}
              </button>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">Registration confirmed</p>
              <p className="text-gray-800 leading-relaxed">{confirmationMsg}</p>
            </div>
          )}
        </div>

        <div>
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-4">Recent registrations</p>
          <ul className="space-y-3">
            {joinedList.map((entry, i) => (
              <li key={i} className="flex items-center justify-between bg-white border border-gray-100 rounded-lg px-4 py-3 text-sm shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
                    {entry.name[0]}
                  </div>
                  <span className="text-gray-800 font-medium">{entry.name}</span>
                </div>
                <span className="text-gray-400">{entry.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

// --- Main Page Component ---
const Home = () => {
  return (
    <div className="w-full bg-gray-50 text-gray-900">
      <section className="max-w-6xl mx-auto px-6 py-20 border-b border-gray-200">
        <p className="uppercase tracking-widest text-sm text-gray-500">Neuro-Aromachology Infrastructure</p>
        <h1 className="text-4xl md:text-5xl font-semibold mt-4">Precision micro-regulation for the nervous system.</h1>
        <p className="text-lg text-gray-600 max-w-2xl mt-4">
          Sana Essencia engineers scientifically-validated delivery protocols.
          Our neuro-aromachology instruments provide rapid, non-invasive
          intervention to optimize cognitive state and mood.
        </p>
        <div className="flex flex-wrap gap-4 mt-8">
          <a href="#neuro-tools" className="px-6 py-3 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition">View Technical Specifications</a>
          <a href="#waitlist" className="px-6 py-3 rounded-full border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-100 transition">Join the Waitlist</a>
        </div>
      </section>

      {/* LIFESTYLE VISUAL */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <img src="/22811_2.jpg" alt="Ritual application of neuro-scent" className="rounded-2xl shadow-lg w-full" />
      </section>

      <section id="problem" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <h2 className="text-3xl font-semibold">Modern minds are overloaded.</h2>
        <p className="mt-4 text-gray-700 leading-relaxed">
          Screens, deadlines, emotional fatigue, and constant cognitive switching
          have become the new baseline. Traditional wellness tools require time,
          effort, or participation — things most people don't have.
        </p>
      </section>

      <section id="science" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-semibold">The science of Sana Essencia.</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Scent is the only sense with a direct line to the emotional brain.
              Aromatic molecules travel from the olfactory bulb straight to the
              amygdala and hippocampus, bypassing the thalamus.
            </p>
          </div>
          <img src="/22812.jpg" alt="Close up of essential oil on lava rock" className="rounded-xl shadow-sm" />
        </div>
      </section>

      <WaitlistSection />

      <section id="corporate" className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200">
        <h2 className="text-3xl font-semibold">Clinical Infrastructure Partnerships.</h2>
        <p className="mt-4 text-gray-700 leading-relaxed">
          Sana Essencia Neuro Instruments are integrated into workplace environments 
          to maintain cognitive performance and stabilise emotional states during 
          high-load operational periods. Our tools offer systematic, non-invasive 
          support with zero disruption to the workday.
        </p>
      </section>

      <footer className="max-w-6xl mx-auto px-6 py-12 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>Sana Essencia — portable tools for the modern nervous system.</div>
        <div className="text-xs text-gray-400">Sana Essencia, Basingstoke, UK</div>
      </footer>
    </div>
  );
};

export default Home;
