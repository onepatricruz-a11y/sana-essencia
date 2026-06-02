import React from "react";

const Home: React.FC = () => {
  return (
    <div className="w-full bg-gray-50 text-gray-900">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-b border-gray-200">
        <p className="uppercase tracking-widest text-sm text-gray-500">
          Neuro‑aromacology for real life
        </p>

        <h1 className="text-4xl md:text-5xl font-semibold mt-4">
          Portable tools for the modern nervous system.
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mt-4">
          Neuro‑aromacology devices engineered to help you shift into focus,
          calm, or rest — effortlessly, anywhere, anytime. Sana Essência creates
          science‑coded scent instruments that support cognitive clarity,
          emotional balance, and nervous system regulation.
        </p>

        <div className="flex flex-wrap gap-4 mt-8">
          <a
            href="#neuro-tools"
            className="px-6 py-3 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Explore Neuro Tools
          </a>

          <a
            href="#science"
            className="px-6 py-3 rounded-full bg-gray-200 text-gray-900 text-sm font-medium hover:bg-gray-300 transition-colors"
          >
            Learn the Science
          </a>
        </div>

        <p className="text-sm text-gray-500 mt-4">State‑shifting through scent.</p>
      </section>

      {/* PROBLEM */}
      <section
        id="problem"
        className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200"
      >
        <h2 className="text-3xl font-semibold">Modern minds are overloaded.</h2>
        <p className="mt-4 text-gray-700 leading-relaxed">
          Screens, deadlines, emotional fatigue, and constant cognitive switching
          have become the new baseline. Traditional wellness tools require time,
          effort, or participation — things most people don’t have.
        </p>
        <p className="mt-4 text-gray-700">Your nervous system needs support that works in the background.</p>
      </section>

      {/* SOLUTION */}
      <section
        id="solution"
        className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200"
      >
        <h2 className="text-3xl font-semibold">
          Neuro Tools: portable scent instruments engineered for regulation.
        </h2>

        <p className="mt-4 text-gray-700">
          Sana Essência combines neuroscience, aromachology, and circadian
          biology to create tools that:
        </p>

        <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-700">
          <li>sharpen focus</li>
          <li>reduce stress</li>
          <li>support emotional balance</li>
          <li>improve sleep readiness</li>
          <li>regulate the nervous system through passive scent diffusion</li>
        </ul>
      </section>

      {/* SCIENCE SUMMARY */}
      <section
        id="science"
        className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200"
      >
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-semibold">The science of Sana Essência.</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Scent is the only sense with a direct line to the emotional brain.
              Aromatic molecules travel from the olfactory bulb straight to the
              amygdala and hippocampus — the centres of emotion, memory, and
              state regulation — bypassing the thalamus.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Through repetition, your brain builds neural anchors between a
              specific scent and a specific state. Over time, the scent becomes
              a biological cue that helps you shift into focus, calm, or rest
              more easily.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Key principles</h3>
            <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-700">
              <li>
                <strong>Direct brain link:</strong> olfactory → limbic system in
                under a second.
              </li>
              <li>
                <strong>Neural anchoring:</strong> pairing scent with state
                builds a stable pathway.
              </li>
              <li>
                <strong>Sensory cueing:</strong> the scent becomes the trigger.
              </li>
              <li>
                <strong>Circadian alignment:</strong> blends for morning, focus,
                and rest.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* NEURO TOOLS */}
      <section
        id="neuro-tools"
        className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200"
      >
        <h2 className="text-3xl font-semibold">Neuro Tools collection.</h2>
        <p className="mt-4 text-gray-700">
          Portable scent instruments designed for cognitive clarity, emotional
          balance, and circadian alignment.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {/* Inhaler Slide */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold">Inhaler Slide</h3>
            <p className="text-sm text-gray-500 mt-1">
              Lab precision • Morning activation
            </p>
            <p className="mt-4 text-gray-700">
              A compact sliding device revealing lava beads infused with
              energising scent molecules.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Best for: morning clarity, pre‑meeting reset, travel, desk use.
            </p>
          </div>

          {/* Synaptic Clicker */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold">Synaptic Clicker</h3>
            <p className="text-sm text-gray-500 mt-1">
              Brain activation • Cognitive stamina
            </p>
            <p className="mt-4 text-gray-700">
              A tactile focus tool combining sensory grounding with scent‑based
              cognitive support.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Best for: study sessions, long afternoons, deep work.
            </p>
          </div>

          {/* Elemental Token */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold">Elemental Token</h3>
            <p className="text-sm text-gray-500 mt-1">
              Molecular balance • Evening regulation
            </p>
            <p className="mt-4 text-gray-700">
              A pocket‑sized molecular disc that releases a soft, steady scent.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Best for: commuting, unwinding, sleep preparation.
            </p>
          </div>
        </div>
      </section>

      {/* CIRCADIAN CYCLE */}
      <section
        id="cycle"
        className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200"
      >
        <h2 className="text-3xl font-semibold">
          Support your rhythm throughout the day.
        </h2>

        <p className="mt-4 text-gray-700">
          Use circadian‑aligned scent modules to train your nervous system
          gently over time.
        </p>

        <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-700">
          <li>
            <strong>Morning – Cortisol Rise:</strong> wake the mind, clear the
            fog.
          </li>
          <li>
            <strong>Afternoon – Synaptic Peak:</strong> sharpen attention,
            sustain performance.
          </li>
          <li>
            <strong>Evening – Delta Descent:</strong> release tension, prepare
            for sleep.
          </li>
        </ul>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200"
      >
        <h2 className="text-3xl font-semibold">How it works.</h2>

        <ol className="list-decimal ml-6 mt-4 space-y-3 text-gray-700">
          <li>Add 1–3 drops of your scent formula onto the lava beads.</li>
          <li>
            Use your tool only during the state you want to strengthen (morning,
            focus, or rest).
          </li>
          <li>Repeat daily to build the neural pathway.</li>
          <li>Let the scent become the trigger for your nervous system.</li>
          <li>Refresh every 2–4 weeks to keep the cue strong.</li>
        </ol>
      </section>

      {/* SUBSCRIPTION */}
      <section
        id="subscription"
        className="max-w-6xl mx-auto px-6 py-12 border-b border-gray-200"
      >
        <h2 className="text-3xl font-semibold">Refill subscription.</h2>
        <p className="mt-4 text-gray-700 leading-relaxed">
          Neuro‑aromacology works through repetition. To keep your neural anchor
          strong, refresh your lava beads every 2–4 weeks. A refill subscription
          delivers fresh scent modules on your chosen schedule, so your nervous
          system always receives a clear, consistent signal.
        </p>
      </section>

      {/* CORPORATE */}
      <section
        id="corporate"
        className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-200"
      >
        <h2 className="text-3xl font-semibold">
          Corporate & workplace programs.
        </h2>
        <p className="mt-4 text-gray-700 leading-relaxed">
          Sana Essência Neuro Tools are ideal for employee wellbeing programs,
          onboarding gifts, leadership retreats, and study spaces. They offer
          passive, science‑led support for focus, calm, and emotional balance —
          with zero disruption to the workday.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto px-6 py-12 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>Sana Essência — portable tools for the modern nervous system.</div>
        <div className="text-xs text-gray-400">Sana Essência, Basingstoke, UK</div>
      </footer>
    </div>
  );
};

export default Home;
