import React, { useState } from "react";

/* ─── BRAND CONFIGURATION DATA ──────────────────────────────── */
interface SpecItem {
  key: string;
  val: string;
}

interface SwatchItem {
  name: string;
  color: string;
}

interface ProductItem {
  id: string;
  num: string;
  tag: string;
  category: string[];
  name: string;
  sub: string;
  desc: string;
  descExtra: string;
  price: string;
  specs: SpecItem[];
  uses: string[];
  swatches: SwatchItem[];
  angles: string[];
}

const PRODUCT_DATA: ProductItem[] = [
  {
    id: "inhaler",
    num: "01",
    tag: "Morning Activation · Focus",
    category: ["morning", "focus"],
    name: "Inhaler Slide",
    sub: "Synaptic Activation Device",
    desc: "A precision-engineered sliding pocket device housing volcanic lava stones infused with cognitive-activation molecules. Triangle-lattice embossing channels tactile grounding while the clear acrylic reveal delivers a controlled first-hit olfactory cue.",
    descExtra: "PA12 nylon body, fine-grain matte finish. Engineered for the professional who needs state-shifting without stopping.",
    price: "£38",
    specs: [
      { key: "Dimensions", val: "90 × 50 × 15 mm" },
      { key: "Material", val: "PA12 Nylon · SLS or MJF" },
      { key: "Finish", val: "Matte bead-blast · Dyed graphite" },
      { key: "Contents", val: "Lava stones + essential oil formula" },
      { key: "Refresh", val: "Every 2–4 weeks" }
    ],
    uses: ["Morning clarity", "Pre-meeting reset", "Travel", "Desk focus", "Corporate gifting"],
    swatches: [
      { name: "Deep Graphite Grey", color: "#2e2e2e" },
      { name: "Stone White", color: "#e8e3da" }
    ],
    angles: ["front", "open", "top", "hand"]
  },
  {
    id: "clicker",
    num: "02",
    tag: "Cognitive Stamina · Deep Work",
    category: ["focus"],
    name: "Synaptic Clicker",
    sub: "Tactile Focus Instrument",
    desc: "A pebble-form tactile tool combining sensory grounding with scent-based cognitive support. Concentric ripple embossing under the thumb creates a tactile anchor. A polished jade dome delivers the focus cue at the moment of peak cognitive demand.",
    descExtra: "Matte teal PA12 nylon shell. Designed for hands that need something to hold while the mind needs to stay present.",
    price: "£44",
    specs: [
      { key: "Dimensions", val: "60 mm length" },
      { key: "Material", val: "PA12 Nylon · MJF or SLS" },
      { key: "Stone", val: "Polished jade dome" },
      { key: "Contents", val: "Lava stones + focus formula" },
      { key: "Refresh", val: "Every 2–4 weeks" }
    ],
    uses: ["Deep work", "Study sessions", "Long afternoons", "Meetings"],
    swatches: [
      { name: "Deep Teal", color: "#3a5a58" },
      { name: "Warm Gold", color: "#b8975a" }
    ],
    angles: ["front", "open", "top", "hand"]
  },
  {
    id: "canister",
    num: "03",
    tag: "Evening Regulation · Desk Ritual",
    category: ["evening"],
    name: "Cortical Column Canister",
    sub: "Aromatic Architecture Vessel",
    desc: "A precision aromacology vessel inspired by cortical micro-architecture. Vertical ribbing references the columnar organisation of the neocortex. Friction-fit lid engraved with brain motif and S/E monogram. Interior holds volcanic lava stones for passive ambient diffusion.",
    descExtra: "Available in Deep Graphite Grey (PA12) and Warm Grey-Gold (Alumide). A statement object that earns its place on any desk.",
    price: "£62",
    specs: [
      { key: "Dimensions", val: "80mm height · 75mm diameter" },
      { key: "Volume", val: "~250 ml interior" },
      { key: "Material", val: "PA12 Nylon (Grey) · Alumide (Gold)" },
      { key: "Engraving", val: "Brain motif + S/E · 0.3–0.4mm depth" },
      { key: "Lid fit", val: "Friction-fit · ±0.2mm tolerance" }
    ],
    uses: ["Desk diffusion", "Bedside ritual", "Corporate gift", "Decorative object", "Evening wind-down"],
    swatches: [
      { name: "Deep Graphite Grey", color: "#3d3d3d" },
      { name: "Warm Grey-Gold", color: "#b8975a" }
    ],
    angles: ["front", "lid", "ribbing", "gold"]
  }
];

export default function App() {
  const [filter, setFilter] = useState<string>("all");
  const [selectedAngles, setSelectedAngles] = useState<Record<string, string>>({ inhaler: "front", clicker: "front", canister: "front" });
  const [selectedSwatches, setSelectedSwatches] = useState<Record<string, string>>({ inhaler: "Deep Graphite Grey", clicker: "Deep Teal", canister: "Deep Graphite Grey" });
  
  // Quiz State
  const [quizStep, setQuizStep] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizRecommendation, setQuizRecommendation] = useState<ProductItem | null>(null);

  // Waitlist State
  const [email, setEmail] = useState<string>(" ");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleAngleChange = (prodId: string, angle: string) => {
    setSelectedAngles(prev => ({ ...prev, [prodId]: angle }));
  };

  const handleSwatchChange = (prodId: string, swatchName: string) => {
    setSelectedSwatches(prev => ({ ...prev, [prodId]: swatchName }));
  };

  const filteredProducts = PRODUCT_DATA.filter(p => filter === "all" || p.category.includes(filter));

  const handleQuizAnswer = (key: string, value: string) => {
    const updatedAnswers = { ...quizAnswers, [key]: value };
    setQuizAnswers(updatedAnswers);

    if (quizStep < 2) {
      setQuizStep(prev => prev + 1);
    } else {
      if (updatedAnswers.hurdle === "morning") {
        setQuizRecommendation(PRODUCT_DATA[0]);
      } else if (updatedAnswers.hurdle === "focus" || updatedAnswers.environment === "mobile") {
        setQuizRecommendation(PRODUCT_DATA[1]);
      } else {
        setQuizRecommendation(PRODUCT_DATA[2]);
      }
      setQuizStep(3);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({});
    setQuizRecommendation(null);
  };

  return (
    <section style={{ background: "#F7F4EF", padding: "7rem 2.5rem", color: "#2A2A2A", fontFamily: "'Jost', sans-serif" }} id="collection">
      <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
        
        {/* HEADER SECTION */}
        <div style={{ display: "grid", gap: "4rem", marginBottom: "5rem", alignItems: "end" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#7A7570" }}>
              <span style={{ width: "30px", height: "1px", background: "#7A7570" }}></span>06 — Neuro Tools Collection
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, lineHeight: 1.1, marginTop: "1rem" }}>
              Instruments<br /><span style={{ fontStyle: "italic", color: "#7A7570" }}>engineered for state.</span>
            </h2>
          </div>
          <div>
            <p style={{ fontSize: "0.85rem", lineHeight: 2, color: "#7A7570", maxWidth: "440px", marginBottom: "1.5rem" }}>
              Each Neuro Tool is a precision-manufactured scent instrument designed for a specific cognitive window. Portable biological signal systems, not wellness decor.
            </p>
            <div style={{ display: "flex", border: "1px solid #E8E3DA", width: "fit-content" }}>
              {["all", "morning", "focus", "evening"].map(type => (
                <button 
                  key={type}
                  onClick={() => setFilter(type)}
                  style={{
                    fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase",
                    padding: "0.6rem 1.25rem", background: filter === type ? "#2A2A2A" : "transparent",
                    color: filter === type ? "#F7F4EF" : "#7A7570", border: "none", cursor: "pointer", transition: "all 0.2s"
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PRODUCTS DYNAMIC GRID */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2px", background: "#E8E3DA" }}>
          {filteredProducts.map((product, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={product.id} style={{ display: "grid", background: "#F7F4EF", border: "1px solid #E8E3DA" }}>
                
                {/* Visual Frame Container */}
                <div style={{ position: "relative", background: "#E8E3DA", aspectRatio: "1/1" }}>
                  <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#7A7570" }}>
                    <div style={{ width: "60px", height: "60px", border: "1px solid #7A7570", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.4, marginBottom: "1rem" }}>
                      ⚡
                    </div>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.5, textAlign: "center" }}>
                      [{product.id} · {selectedAngles[product.id]} view] <br /> rendering engine active
                    </span>
                  </div>
                  <span style={{ position: "absolute", top: "1rem", right: "1rem", background: "#1E1E1E", color: "#F7F4EF", fontFamily: "'DM Mono', monospace", fontSize: "0.50rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.35rem 0.65rem", opacity: 0.7 }}>
                    Photos coming soon
                  </span>

                  <div style={{ position: "absolute", bottom: "0", left: "0", right: "0", display: "flex", gap: "2px", padding: "1rem", background: "linear-gradient(to top, rgba(0,0,0,0.2), transparent)" }}>
                    {product.angles.map(angle => (
                      <button
                        key={angle}
                        onClick={() => handleAngleChange(product.id, angle)}
                        style={{
                          fontFamily: "'DM Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase",
                          padding: "0.4rem 0.75rem", background: selectedAngles[product.id] === angle ? "#2A2A2A" : "rgba(28,28,28,0.4)",
                          color: "#fff", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", transition: "all 0.2s"
                        }}
                      >
                        {angle}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Technical Product Info Sidebar */}
                <div style={{ padding: "3rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: "#B8975A", textTransform: "uppercase" }}>{product.tag}</span>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#E8E3DA" }}>{product.num}</span>
                    </div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 300, lineHeight: 1.1 }}>{product.name}</h3>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A7570", marginTop: "0.25rem", marginBottom: "1.5rem" }}>{product.sub}</div>
                    <p style={{ fontSize: "0.82rem", lineHeight: 2, color: "#7A7570", paddingBottom: "1.5rem", borderBottom: "1px solid #E8E3DA" }}>
                      {product.desc}<br /><br />{product.descExtra}
                    </p>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", margin: "1.5rem 0" }}>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#7A7570" }}>Finish</span>
                      {product.swatches.map(swatch => (
                        <button
                          key={swatch.name}
                          onClick={() => handleSwatchChange(product.id, swatch.name)}
                          style={{
                            width: "20px", height: "20px", borderRadius: "50%", background: swatch.color, border: "none", cursor: "pointer",
                            outline: selectedSwatches[product.id] === swatch.name ? "1px solid #7A7570" : "none", outlineOffset: "2px"
                          }}
                          title={swatch.name}
                        />
                      ))}
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.5rem", color: "#7A7570" }}>{selectedSwatches[product.id]}</span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
                      {product.specs.map(spec => (
                        <div key={spec.key} style={{ display: "flex", fontSize: "0.75rem" }}>
                          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", color: "#7A7570", width: "100px", textTransform: "uppercase" }}>{spec.key}</span>
                          <span style={{ color: "#2A2A2A" }}>{spec.val}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "2.5rem" }}>
                      {product.uses.map(use => (
                        <span key={use} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.3rem 0.6rem", border: "1px solid #E8E3DA", color: "#7A7570" }}>
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1.5rem", borderTop: "1px solid #E8E3DA" }}>
                    <div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.75rem", fontWeight: 300 }}>{product.price}</div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.5rem", color: "#7A7570" }}>+ refill sub option</div>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button style={{ background: "#2A2A2A", color: "#F7F4EF", border: "none", padding: "0.75rem 1.5rem", fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}>Pre-Order</button>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* PROTOCOL ASSESSMENT ENGINE (QUIZ BLOCK) */}
        <div style={{ background: "#ece9e3", border: "1px solid #E8E3DA", marginTop: "4rem", padding: "3.5rem" }}>
          <div style={{ maxWidth: "600px" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8975A", marginBottom: "0.75rem" }}>
              Protocol Assessment Engine
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 300, marginBottom: "1.5rem" }}>
              Identify your neural interface requirements.
            </h3>

            {quizStep === 0 && (
              <div>
                <p style={{ fontSize: "0.85rem", color: "#7A7570", marginBottom: "1.5rem" }}>What primary cognitive profile hurdle limits your performance breakdown today?</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <button onClick={() => handleQuizAnswer("hurdle", "morning")} style={{ background: "transparent", border: "1px solid #E8E3DA", padding: "1rem", fontSize: "0.8rem", cursor: "pointer", textAlign: "left" }}>AM Brain Fog / Delayed Cortisol Activation Profile</button>
                  <button onClick={() => handleQuizAnswer("hurdle", "focus")} style={{ background: "transparent", border: "1px solid #E8E3DA", padding: "1rem", fontSize: "0.8rem", cursor: "pointer", textAlign: "left" }}>Midday Cognitive Stamina Decay / Executive Attention Strain</button>
                  <button onClick={() => handleQuizAnswer("hurdle", "evening")} style={{ background: "transparent", border: "1px solid #E8E3DA", padding: "1rem", fontSize: "0.8rem", cursor: "pointer", textAlign: "left" }}>PM Autonomic Hyper-Arousal / Overactive Default Mode Network</button>
                </div>
              </div>
            )}

            {quizStep === 1 && (
              <div>
                <p style={{ fontSize: "0.85rem", color: "#7A7570", marginBottom: "1.5rem" }}>What structural layout dictates your environmental deployment framework?</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <button onClick={() => handleQuizAnswer("environment", "mobile")} style={{ background: "transparent", border: "1px solid #E8E3DA", padding: "1rem", fontSize: "0.8rem", cursor: "pointer", textAlign: "left" }}>Dynamic / On-The-Move (Transit, Corporate Meetings, Shared Spaces)</button>
                  <button onClick={() => handleQuizAnswer("environment", "desk")} style={{ background: "transparent", border: "1px solid #E8E3DA", padding: "1rem", fontSize: "0.8rem", cursor: "pointer", textAlign: "left" }}>Fixed Anchor Architecture (Dedicated Private Office Desk or Bedside Base)</button>
                </div>
              </div>
            )}

            {quizStep === 2 && (
              <div>
                <p style={{ fontSize: "0.85rem", color: "#7A7570", marginBottom: "1.5rem" }}>Confirm tactile response prioritization strategy:</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <button onClick={() => handleQuizAnswer("tactile", "active")} style={{ background: "transparent", border: "1px solid #E8E3DA", padding: "1rem", fontSize: "0.8rem", cursor: "pointer", textAlign: "left" }}>Kinetic Manipulation Needed (Sliding mechanism, fidget properties)</button>
                  <button onClick={() => handleQuizAnswer("tactile", "passive")} style={{ background: "transparent", border: "1px solid #E8E3DA", padding: "1rem", fontSize: "0.8rem", cursor: "pointer", textAlign: "left" }}>Atmospheric Immersion (Set-and-forget passive cue distribution)</button>
                </div>
              </div>
            )}

            {quizStep === 3 && quizRecommendation && (
              <div style={{ padding: "1rem", background: "#F7F4EF", border: "1px solid #B8975A" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.5rem", color: "#B8975A", textTransform: "uppercase" }}>Recommended Archetype Interface</div>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", margin: "0.25rem 0" }}>{quizRecommendation.name}</h4>
                <p style={{ fontSize: "0.8rem", color: "#7A7570", marginBottom: "1rem" }}>{quizRecommendation.sub}. Perfectly matched to optimize your focus environment parameters.</p>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={resetQuiz} style={{ background: "transparent", border: "1px solid #E8E3DA", padding: "0.6rem 1.25rem", fontSize: "0.6rem", fontFamily: "'DM Mono', monospace", textTransform: "uppercase", cursor: "pointer" }}>Recalibrate Protocol Assessment</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* EARLY ACCESS CAPTURE MODULE */}
        <div style={{ background: "#1E1E1E", padding: "3.5rem 4rem", display: "grid", gap: "3rem", alignItems: "center", marginTop: "2px" }}>
          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#B8975A", marginBottom: "0.5rem" }}>Early Access · Limited Prototype Matrix</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 300, color: "#F7F4EF", lineHeight: 1.2 }}>
              Join the initial <br /><span style={{ fontStyle: "italic", color: "#7A7570" }}>laboratory cohort.</span>
            </h3>
            <p style={{ fontSize: "0.78rem", color: "rgba(247,244,239,0.45)", lineHeight: 1.8, marginTop: "0.5rem" }}>
              We are assembling data allocations for our first 3D-printed alpha sequence. Secure allocations for priority manufacturing, tiered founder tracking options, and research tracking metrics directly from development.
            </p>
          </div>
          <div>
            {!isSubmitted ? (
              <div style={{ display: "flex", border: "1px solid rgba(247,244,239,0.15)" }}>
                <input 
                  type="email" 
                  placeholder="secure@network.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ flex: 1, padding: "1rem", background: "rgba(247,244,239,0.05)", border: "none", color: "#F7F4EF", fontSize: "0.85rem", outline: "none" }}
                />
                <button 
                  onClick={() => email.includes("@") && setIsSubmitted(true)}
                  style={{ background: "#B8975A", color: "#1E1E1E", border: "none", padding: "0 1.5rem", fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.15em", cursor: "pointer" }}
                >
                  Initialize
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", color: "#B8975A" }}>
                <span style={{ width: "30px", height: "30px", borderRadius: "50%", border: "1px solid #B8975A", display: "flex", alignItems: "center", justifyContent: "center" }}>✓</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "#F7F4EF" }}>Nervous system registry logged. Welcome to the lab list.</span>
              </div>
            )}
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.5rem", color: "rgba(247,244,239,0.2)", marginTop: "0.75rem", textTransform: "uppercase" }}>Zero noise tracking. Complete parameter safety.</div>
          </div>
        </div>

      </div>
    </section>
  );
}
