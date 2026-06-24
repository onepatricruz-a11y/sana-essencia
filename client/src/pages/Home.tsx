import { useState, useEffect, useRef } from "react";

const COMPANY_NO = "17298884";

const refs = [
  { n: 1, text: "Buck, L. & Axel, R. (1991). A novel multigene family may encode odorant receptors: a molecular basis for odor recognition. Cell, 65(1), 175–187." },
  { n: 2, text: "Linck, V.M. et al. (2010). Inhaled linalool-induced sedation in mice. Phytomedicine, 16(4), 303–307." },
  { n: 3, text: "Moss, M. et al. (2003). Aromas of rosemary and lavender essential oils differentially affect cognition and mood. International Journal of Neuroscience, 113(1), 15–38." },
  { n: 4, text: "Moussaieff, A. et al. (2008). Incensole acetate, an incense component, elicits psychoactivity by activating TRPV3 channels in the brain. FASEB Journal, 22(8), 3024–3034." },
  { n: 5, text: "McKemy, D.D. et al. (2002). Identification of a cold receptor reveals a general role for TRP channels in thermosensation. Nature, 416, 52–58." },
];

const focusAreas = [
  { code: "EQ", name: "Equilibrium", sub: "Perimenopausal regulation", pathway: "TRPM8 · HPA-axis · GABAergic", blurb: "Designed for the 4–12 year perimenopausal transition. Targets the vasomotor, autonomic, and mood pathways disrupted by hormonal shift.", cite: "5" },
  { code: "CR", name: "Cognitive Regulation", sub: "Focus & alertness", pathway: "Norepinephrine · Acetylcholine", blurb: "Precision compounds to shift attentional networks into sustained engagement and counter mid-session cognitive fatigue.", cite: "3" },
  { code: "RS", name: "Olfactory Restoration", sub: "Hummel Protocol", pathway: "Olfactory epithelium retraining", blurb: "Structured smell training based on the Hummel Protocol — four canonical aromas, four weeks, documented recovery outcomes.", cite: "1" },
  { code: "ND", name: "Noct Descent", sub: "Sleep onset", pathway: "GABA · Adenosine", blurb: "An evening protocol timed to the body's adenosine rise — linalool-led compounds supporting the transition to sleep.", cite: "2" },
  { code: "AS", name: "Acuity Strike", sub: "Acute focus", pathway: "1,8-cineole · Norepinephrine", blurb: "A rapid cognitive activation formula. 1,8-cineole from rosemary with documented recall and attention performance data.", cite: "3" },
];

const formulas = [
  { code: "N1", name: "Nexus Baseline", range: "Equilibrium", desc: "Daily autonomic regulation — sympathetic / parasympathetic balance. The foundational morning protocol.", compounds: "Linalool, linalyl acetate, beta-pinene, incensole acetate" },
  { code: "N2", name: "Nexus Thermal Reset", range: "Equilibrium", desc: "Acute vasomotor relief for hot flushes. TRPM8 activation via menthol, HPA-axis support via clary sage.", compounds: "Menthol (peppermint), sclareol (clary sage), cypress terpenes" },
  { code: "AR", name: "Aurora Rise", range: "Equilibrium", desc: "Morning cortisol amplification. Timed to the cortisol awakening response for circadian entrainment.", compounds: "Limonene (bergamot FCF), geraniol, 1,8-cineole" },
  { code: "NO", name: "Noct Descent", range: "Equilibrium", desc: "Evening GABA and adenosine support. Sleep onset facilitation via linalool-rich compounds.", compounds: "Linalool, cedarwood sesquiterpenes, vetiver" },
  { code: "AC", name: "Acuity Strike", range: "Cognitive Regulation", desc: "Acute cognitive focus on demand. 1,8-cineole shown to improve recall performance in controlled studies.", compounds: "1,8-cineole (rosemary/eucalyptus), peppermint, black pepper piperine" },
];

function Cite({ n }) {
  return <sup style={{ color: "#B8893F", fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", marginLeft: "1px" }}>[{n}]</sup>;
}

export default function SanaEssencia() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("EQ");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWaitlist = async () => {
    if (!email.trim()) return;
    setSubmitting(true);
    try {
      await fetch("https://formspree.io/f/xqeowqqp", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
    setSubmitting(false);
  };

  const activeFormula = focusAreas.find(f => f.code === activeTab);

  return (
    <div style={{ background: "#F6F3EC", color: "#2B313D", fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,300;8..60,400;8..60,500;8..60,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --cream:#F6F3EC;--ink:#2B313D;--sage:#4A6B5C;--gold:#B8893F;--slate:#2C4A6E;--stone:#DDD6C7;--mist:#EBE7DE; }
        html { scroll-behavior: smooth; }
        .se-serif { font-family:'Source Serif 4',serif; }
        .se-mono { font-family:'JetBrains Mono',monospace; }
        .nav-link { color:var(--ink);text-decoration:none;font-size:0.8rem;letter-spacing:0.05em;font-family:'JetBrains Mono',monospace;border-bottom:1px solid transparent;transition:border-color 0.2s;padding-bottom:1px; }
        .nav-link:hover { border-color:var(--gold); }
        .btn-primary { background:var(--ink);color:var(--cream);border:none;padding:12px 24px;font-family:'JetBrains Mono',monospace;font-size:0.75rem;letter-spacing:0.08em;cursor:pointer;transition:background 0.2s; }
        .btn-primary:hover { background:var(--sage); }
        .btn-ghost { background:transparent;color:var(--ink);border:1px solid var(--stone);padding:11px 24px;font-family:'JetBrains Mono',monospace;font-size:0.75rem;letter-spacing:0.08em;cursor:pointer;transition:border-color 0.2s,color 0.2s; }
        .btn-ghost:hover { border-color:var(--sage);color:var(--sage); }
        .tab-btn { background:transparent;border:none;border-bottom:2px solid transparent;padding:8px 0;margin-right:32px;font-family:'JetBrains Mono',monospace;font-size:0.7rem;letter-spacing:0.12em;text-transform:uppercase;color:#8A8075;cursor:pointer;transition:color 0.2s,border-color 0.2s; }
        .tab-btn.active { color:var(--ink);border-color:var(--gold); }
        .tab-btn:hover { color:var(--ink); }
        .science-card { background:#fff;border:1px solid var(--stone);padding:28px;transition:border-color 0.2s,transform 0.2s; }
        .science-card:hover { border-color:var(--sage);transform:translateY(-2px); }
        .formula-row { border-bottom:1px solid var(--stone);padding:20px 0;display:grid;grid-template-columns:60px 1fr 1fr;gap:24px;align-items:start;transition:background 0.15s; }
        .formula-row:hover { background:var(--mist);padding-left:12px;margin-left:-12px;padding-right:12px; }
        .formula-row:last-child { border-bottom:none; }
        .input-field { background:transparent;border:1px solid var(--stone);color:var(--ink);padding:12px 16px;font-family:'Inter',sans-serif;font-size:0.9rem;flex:1;outline:none;transition:border-color 0.2s; }
        .input-field:focus { border-color:var(--slate); }
        .input-field::placeholder { color:#A09890; }
        .eyebrow { font-family:'JetBrains Mono',monospace;font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--sage); }
        .fig-label { font-family:'JetBrains Mono',monospace;font-size:0.62rem;letter-spacing:0.12em;color:var(--slate);text-transform:uppercase; }
        .gold-rule { border:none;border-top:1px solid var(--stone);margin:0; }
        .manifesto-section { background:var(--ink);color:var(--cream); }
        .pathway-badge { background:var(--mist);color:var(--slate);font-family:'JetBrains Mono',monospace;font-size:0.65rem;letter-spacing:0.08em;padding:4px 10px;display:inline-block; }
        .ref-item { font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:var(--sage);line-height:1.7; }
        @media(max-width:768px){.formula-row{grid-template-columns:48px 1fr}.formula-row .formula-compounds{display:none}.hero-grid{grid-template-columns:1fr!important}.philosophy-grid{grid-template-columns:1fr!important}.focus-tabs{overflow-x:auto;white-space:nowrap}.tab-btn{margin-right:20px}}
        @media(prefers-reduced-motion:reduce){.science-card,.formula-row{transition:none}}
      `}</style>

      {/* NAV */}
      <nav style={{ position:"sticky",top:0,zIndex:100,background:scrolled?"rgba(246,243,236,0.96)":"transparent",backdropFilter:scrolled?"blur(8px)":"none",borderBottom:scrolled?"1px solid var(--stone)":"none",transition:"all 0.3s",padding:"0 24px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:64 }}>
          <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"0.8rem",letterSpacing:"0.2em",color:"#2B313D" }}>SANA ESSENCIA</div>
          <div style={{ display:"flex",gap:32,alignItems:"center" }}>
            <a href="#philosophy" className="nav-link">Philosophy</a>
            <a href="#research" className="nav-link">Research</a>
            <a href="#formulas" className="nav-link">Formulas</a>
            <a href="#manifesto" className="nav-link">Manifesto</a>
            <a href="#references" className="nav-link">References</a>
          </div>
          <a href="#join" className="btn-primary" style={{ fontSize:"0.7rem",padding:"10px 18px" }}>Join the Research →</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth:1200,margin:"0 auto",padding:"80px 24px 100px" }}>
        <p className="eyebrow" style={{ marginBottom:24 }}>Neuro-Aromachology · Basingstoke, UK · Est. 2026 · Co. No. {COMPANY_NO}</p>
        <div className="hero-grid" style={{ display:"grid",gridTemplateColumns:"1fr 360px",gap:80,alignItems:"start" }}>
          <div>
            <h1 className="se-serif" style={{ fontSize:"clamp(2.2rem,5vw,3.8rem)",fontWeight:500,lineHeight:1.15,color:"#2B313D",marginBottom:24 }}>
              Engineering Emotional Equilibrium Through the Neuroscience of Scent<Cite n="1" />
            </h1>
            <p style={{ fontSize:"1.05rem",color:"#4A5568",maxWidth:560,marginBottom:32,lineHeight:1.75 }}>
              Sana Essencia designs functional, brain-targeted scent formulas — built from cited neuroscientific research, not perfume tradition. Each protocol acts on a specific neural pathway, at a specific time of day, for a specific outcome.
            </p>
            <div style={{ display:"flex",gap:12,flexWrap:"wrap" }}>
              <a href="#research" className="btn-primary">Explore the Research</a>
              <a href="#manifesto" className="btn-ghost">Read the Manifesto</a>
            </div>
          </div>
          <div>
            <p className="fig-label" style={{ marginBottom:16 }}>FIG. 1 — THE OLFACTORY-LIMBIC PATHWAY</p>
            <svg viewBox="0 0 340 420" style={{ width:"100%",height:"auto" }}>
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#4A6B5C" />
                </marker>
              </defs>
              {[
                { cx:170,cy:50,r:38,label:"Scent molecule",sub:"volatile compound",stroke:"#4A6B5C",fill:"#F6F3EC" },
                { cx:170,cy:160,r:38,label:"Olfactory bulb",sub:"CN I direct route",stroke:"#4A6B5C",fill:"#F6F3EC" },
                { cx:170,cy:270,r:42,label:"Limbic system",sub:"emotion · memory",stroke:"#2C4A6E",fill:"#EBE7DE" },
                { cx:70,cy:370,r:34,label:"Amygdala",sub:"mood · stress",stroke:"#B8893F",fill:"#F6F3EC" },
                { cx:270,cy:370,r:34,label:"Hippocampus",sub:"memory · recall",stroke:"#B8893F",fill:"#F6F3EC" },
              ].map((node,i) => (
                <g key={i}>
                  <circle cx={node.cx} cy={node.cy} r={node.r} fill={node.fill} stroke={node.stroke} strokeWidth="1.5" />
                  <text x={node.cx} y={node.cy-4} textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono,monospace" fill="#2B313D">{node.label}</text>
                  <text x={node.cx} y={node.cy+8} textAnchor="middle" fontSize="7.5" fontFamily="JetBrains Mono,monospace" fill="#4A6B5C">{node.sub}</text>
                </g>
              ))}
              <line x1="170" y1="90" x2="170" y2="118" stroke="#4A6B5C" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="170" y1="200" x2="170" y2="224" stroke="#4A6B5C" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <line x1="140" y1="305" x2="95" y2="337" stroke="#B8893F" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arrow)" />
              <line x1="200" y1="305" x2="245" y2="337" stroke="#B8893F" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arrow)" />
            </svg>
          </div>
        </div>
      </section>

      <hr className="gold-rule" />

      {/* PHILOSOPHY */}
      <section id="philosophy" style={{ maxWidth:1200,margin:"0 auto",padding:"80px 24px" }}>
        <div className="philosophy-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:80 }}>
          <div>
            <p className="eyebrow" style={{ marginBottom:16 }}>Our Philosophy</p>
            <h2 className="se-serif" style={{ fontSize:"2.2rem",fontWeight:500,marginBottom:24,lineHeight:1.2 }}>Functional formulas, not fragrances.</h2>
            <p style={{ color:"#4A5568",marginBottom:16,lineHeight:1.75 }}>
              Most scent products are designed to smell pleasant. Ours are designed to <em>do something.</em> The olfactory system holds a unique position in human neuroanatomy: it is the only sense with a direct, largely unfiltered route to the brain's emotional and arousal centres<Cite n="1" />, bypassing the longer relay paths that govern sight, sound, and touch.
            </p>
            <p style={{ color:"#4A5568",marginBottom:16,lineHeight:1.75 }}>
              By selecting specific volatile compounds — and timing their delivery to the body's natural circadian rhythm — we can influence neurotransmitter activity associated with calm<Cite n="2" />, alertness<Cite n="3" />, focus, and emotional steadiness<Cite n="4" />. Every formula exists to answer one question: which compound, at which dose, at which moment, produces a measurable shift in state?
            </p>
            <p style={{ color:"#4A5568",lineHeight:1.75 }}>
              We hold every claim to a single standard: <strong>mechanism or nothing.</strong> If we cannot name the receptor, document the pathway, and cite the peer-reviewed study — the claim does not appear. Anywhere.
            </p>
          </div>
          <div>
            <p className="eyebrow" style={{ marginBottom:16 }}>The Science Standard</p>
            {[
              { step:"01",title:"Name the compound",desc:"Every active ingredient is identified at molecular level — by its active constituent, not its common name." },
              { step:"02",title:"Name the receptor",desc:"Each compound must act on a named receptor: TRPM8, GABA-A, norepinephrine transporter. No vague 'calming properties'." },
              { step:"03",title:"Document the pathway",desc:"The neurological mechanism — the route from receptor activation to measurable state change — must be described and traceable." },
              { step:"04",title:"Cite the study",desc:"Every mechanism traces to a peer-reviewed publication. All citations are in our reference section, available for independent verification." },
            ].map(item => (
              <div key={item.step} style={{ display:"flex",gap:20,marginBottom:24 }}>
                <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"0.7rem",color:"#B8893F",minWidth:28,paddingTop:3 }}>{item.step}</div>
                <div>
                  <p style={{ fontFamily:"'Source Serif 4',serif",fontSize:"1rem",fontWeight:500,marginBottom:4 }}>{item.title}</p>
                  <p style={{ fontSize:"0.875rem",color:"#4A5568",lineHeight:1.65 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="gold-rule" />

      {/* RESEARCH */}
      <section id="research" style={{ maxWidth:1200,margin:"0 auto",padding:"80px 24px" }}>
        <p className="eyebrow" style={{ marginBottom:12 }}>Explore by Focus</p>
        <h2 className="se-serif" style={{ fontSize:"2.2rem",fontWeight:500,marginBottom:40,maxWidth:500,lineHeight:1.2 }}>Five neural targets. One research programme.</h2>
        <div className="focus-tabs" style={{ borderBottom:"1px solid var(--stone)",marginBottom:40,display:"flex" }}>
          {focusAreas.map(f => (
            <button key={f.code} className={`tab-btn ${activeTab===f.code?"active":""}`} onClick={() => setActiveTab(f.code)}>{f.name}</button>
          ))}
        </div>
        {activeFormula && (
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"start",marginBottom:60 }}>
            <div>
              <p className="fig-label" style={{ marginBottom:12 }}>FOCUS AREA — {activeFormula.name.toUpperCase()}</p>
              <h3 className="se-serif" style={{ fontSize:"1.8rem",fontWeight:500,marginBottom:8 }}>{activeFormula.sub}</h3>
              <div className="pathway-badge" style={{ marginBottom:20 }}>{activeFormula.pathway}</div>
              <p style={{ color:"#4A5568",lineHeight:1.75,fontSize:"1rem" }}>{activeFormula.blurb}<Cite n={activeFormula.cite} /></p>
            </div>
            <div style={{ background:"#fff",border:"1px solid var(--stone)",padding:32 }}>
              <p className="fig-label" style={{ marginBottom:16 }}>FORMULAS IN THIS RANGE</p>
              {formulas.filter(f => f.range===activeFormula.name).length>0
                ? formulas.filter(f => f.range===activeFormula.name).map(formula => (
                  <div key={formula.code} style={{ marginBottom:20,paddingBottom:20,borderBottom:"1px solid var(--stone)" }}>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:6 }}>
                      <p style={{ fontFamily:"'Source Serif 4',serif",fontWeight:500 }}>{formula.name}</p>
                      <span style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"0.65rem",color:"#B8893F" }}>{formula.code}</span>
                    </div>
                    <p style={{ fontSize:"0.85rem",color:"#4A5568",marginBottom:8,lineHeight:1.6 }}>{formula.desc}</p>
                    <p style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"0.65rem",color:"#4A6B5C" }}>{formula.compounds}</p>
                  </div>
                ))
                : <p style={{ color:"#8A8075",fontSize:"0.875rem" }}>Formulas in development — join the research for updates.</p>
              }
            </div>
          </div>
        )}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20 }}>
          {[
            { title:"The olfactory-limbic route",body:"The olfactory system is the only sense with a direct, unfiltered projection to the amygdala and hippocampus — structures governing emotion, memory, and arousal. This is the anatomical basis for everything Sana Essencia builds on.",cite:"1" },
            { title:"TRPM8 and thermal reset",body:"The TRPM8 receptor responds to menthol by signalling the nervous system to reduce perceived heat. This mechanism underlies our N2 Nexus Thermal Reset formula for vasomotor symptom relief during perimenopause.",cite:"5" },
            { title:"The memory anchor effect",body:"Repeated pairing of a specific scent with a physiological state produces a conditioned association. Over weeks of use, the ritual itself triggers the state. Efficacy deepens over time — the opposite of habituation.",cite:"1" },
          ].map((card,i) => (
            <div key={i} className="science-card">
              <p className="fig-label" style={{ marginBottom:12 }}>MECHANISM NOTE {String(i+1).padStart(2,"0")}</p>
              <h3 className="se-serif" style={{ fontSize:"1.1rem",fontWeight:500,marginBottom:10 }}>{card.title}</h3>
              <p style={{ fontSize:"0.875rem",color:"#4A5568",lineHeight:1.7 }}>{card.body}<Cite n={card.cite} /></p>
            </div>
          ))}
        </div>
      </section>

      <hr className="gold-rule" />

      {/* FORMULAS */}
      <section id="formulas" style={{ maxWidth:1200,margin:"0 auto",padding:"80px 24px" }}>
        <p className="eyebrow" style={{ marginBottom:12 }}>Formula Library</p>
        <h2 className="se-serif" style={{ fontSize:"2.2rem",fontWeight:500,marginBottom:8,lineHeight:1.2 }}>Every compound. Every mechanism. Every citation.</h2>
        <p style={{ color:"#4A5568",marginBottom:40,maxWidth:560 }}>Five formulas in development. Each built to a receptor, not a mood. Final blends confirmed following CPSR assessment.</p>
        <div style={{ borderTop:"1px solid var(--stone)" }}>
          {formulas.map(f => (
            <div key={f.code} className="formula-row">
              <div>
                <p style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"0.75rem",color:"#B8893F",fontWeight:500 }}>{f.code}</p>
                <p style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"0.62rem",color:"#8A8075",marginTop:2 }}>{f.range}</p>
              </div>
              <div>
                <p className="se-serif" style={{ fontSize:"1.05rem",fontWeight:500,marginBottom:4 }}>{f.name}</p>
                <p style={{ fontSize:"0.875rem",color:"#4A5568",lineHeight:1.65 }}>{f.desc}</p>
              </div>
              <div className="formula-compounds">
                <p className="fig-label" style={{ marginBottom:6 }}>Key compounds</p>
                <p style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"0.65rem",color:"#4A6B5C",lineHeight:1.7 }}>{f.compounds}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="gold-rule" />

      {/* MANIFESTO */}
      <section id="manifesto" className="manifesto-section">
        <div style={{ maxWidth:760,margin:"0 auto",padding:"100px 24px" }}>
          <p className="eyebrow" style={{ color:"#A09880",marginBottom:20 }}>The Sana Essencia Manifesto</p>
          <h2 className="se-serif" style={{ fontSize:"2.4rem",fontWeight:400,marginBottom:48,color:"#F6F3EC",lineHeight:1.2 }}>Bridging neuroscience and everyday chaos</h2>
          <p style={{ color:"#D4CFC6",lineHeight:1.85,marginBottom:24,fontSize:"1.02rem" }}>
            I am a professional, a mother of four, and a notorious self-taught researcher. Sana Essencia was born not in a lab, but at the intersection of a demanding corporate career and the beautiful, high-energy chaos of family life — four children, ages 11 to 19, who have watched me build this from a 2023 Huberman Lab episode to a registered UK company.
          </p>
          <p style={{ color:"#D4CFC6",lineHeight:1.85,marginBottom:24,fontSize:"1.02rem" }}>
            Every day, I watched brilliant colleagues hit the 3pm slump and my own family struggle to maintain emotional equilibrium. I realised our moods and focus were being hijacked by our environments — and by the hormonal transitions that nobody was addressing at mechanism level. I didn't want synthetic pills or caffeine crashes. I wanted a biological solution.
          </p>
          <p className="se-serif" style={{ fontSize:"1.3rem",color:"#F6F3EC",marginBottom:16,marginTop:40 }}>The Discovery</p>
          <p style={{ color:"#D4CFC6",lineHeight:1.85,marginBottom:24,fontSize:"1.02rem" }}>
            I turned to the science of neuro-olfaction. The olfactory system is the only sense with a direct, unfiltered highway to the brain's emotional and wakefulness centres<Cite n="1" /> — bypassing the longer relay paths that govern every other sense. By using specific, targeted volatile compounds, we can trigger neural pathways — TRPM8 for cooling<Cite n="5" />, GABA for calm<Cite n="2" />, 1,8-cineole for recall<Cite n="3" /> — to literally shift brain state in seconds.
          </p>
          <p className="se-serif" style={{ fontSize:"1.3rem",color:"#F6F3EC",marginBottom:16,marginTop:40 }}>The Mission</p>
          <p style={{ color:"#D4CFC6",lineHeight:1.85,marginBottom:24,fontSize:"1.02rem" }}>
            Sana Essencia translates frontier neuroscience into practical, sensory anchors for daily life. I'm here to prove that you don't need a medical degree to optimise your mind — you need a scientist who will cite their sources, a standard that refuses to claim what it cannot prove, and a device that works before you've had time to doubt it.
          </p>
          <p style={{ color:"#F6F3EC",fontSize:"1.05rem",marginTop:48,fontStyle:"italic" }}>Welcome to Sana Essencia. Let's optimise our brains, together.</p>
          <p style={{ color:"#A09880",fontSize:"0.875rem",marginTop:8 }}>— Patricia Alves Cruz, Founder · Sana Essencia Ltd · Co. No. {COMPANY_NO}</p>
        </div>
      </section>

      {/* REFERENCES */}
      <section id="references" style={{ background:"#EBE7DE" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",padding:"60px 24px" }}>
          <p className="eyebrow" style={{ marginBottom:20 }}>References</p>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(400px,1fr))",gap:"12px 40px" }}>
            {refs.map(r => (
              <div key={r.n} style={{ display:"flex",gap:12 }}>
                <span className="ref-item" style={{ color:"#B8893F",minWidth:20 }}>[{r.n}]</span>
                <span className="ref-item">{r.text}</span>
              </div>
            ))}
          </div>
          <p style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"0.62rem",color:"#8A8075",marginTop:20 }}>
            All references are peer-reviewed primary literature. Citations provided for transparency and independent verification.
          </p>
        </div>
      </section>

      {/* JOIN */}
      <section id="join" style={{ maxWidth:1200,margin:"0 auto",padding:"100px 24px" }}>
        <div style={{ maxWidth:600 }}>
          <p className="eyebrow" style={{ marginBottom:16 }}>Join the Research</p>
          <h2 className="se-serif" style={{ fontSize:"2.2rem",fontWeight:500,marginBottom:16,lineHeight:1.2 }}>Get the weekly finding before anyone else.</h2>
          <p style={{ color:"#4A5568",marginBottom:32,lineHeight:1.75 }}>
            One scientific finding a week, translated for real life. Early access to formulas and the Vector when we launch. No products to sell yet — just the research, the mechanism, and what it means for you.
          </p>
          {submitted ? (
            <p style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"0.85rem",color:"#4A6B5C" }}>✓ You're on the founding list. Thank you.</p>
          ) : (
            <div style={{ display:"flex",maxWidth:480 }}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key==="Enter"&&handleWaitlist()} placeholder="your@email.com" className="input-field" />
              <button onClick={handleWaitlist} disabled={submitting} className="btn-primary" style={{ whiteSpace:"nowrap",borderLeft:"none" }}>{submitting?"...":"Join →"}</button>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop:"1px solid var(--stone)",background:"#F6F3EC" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",padding:"32px 24px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:16,alignItems:"center" }}>
          <div>
            <p style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"0.7rem",color:"#2B313D",marginBottom:4 }}>SANA ESSENCIA LTD</p>
            <p style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"0.62rem",color:"#8A8075" }}>Registered in England and Wales · Company No. {COMPANY_NO} · Basingstoke, UK</p>
          </div>
          <div style={{ display:"flex",gap:24 }}>
            <a href="#philosophy" className="nav-link" style={{ fontSize:"0.7rem" }}>Philosophy</a>
            <a href="#research" className="nav-link" style={{ fontSize:"0.7rem" }}>Research</a>
            <a href="#manifesto" className="nav-link" style={{ fontSize:"0.7rem" }}>Manifesto</a>
            <a href="#join" className="nav-link" style={{ fontSize:"0.7rem" }}>Join</a>
          </div>
          <p style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"0.62rem",color:"#8A8075" }}>© Sana Essencia Ltd {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
