import React, { useState, useEffect } from 'react';
import './Home.css'; // Make sure the CSS file is imported here

export default function Home() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [waitlistJoined, setWaitlistJoined] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('vis');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.fu').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWaitlistJoined(true);
  };

  return (
    <>
      <div className="ann">
        🌿 Early access open — <a href="#waitlist">join the waitlist</a> and be
        first when we launch
      </div>

      <nav className="nav" role="navigation" aria-label="Main">
        <div className="nav-i">
          <a href="/" className="nav-brand" aria-label="Sana Essencia home">
            Sana Essencia
            <sup style={{ fontSize: '8px', letterSpacing: 0, verticalAlign: 'super' }}>
              &trade;
            </sup>
          </a>
          <ul className="nav-links" role="list">
            <li><a href="#science">The Science</a></li>
            <li><a href="#formulas">Formulas</a></li>
            <li><a href="#shop">Shop</a></li>
            <li><a href="#gifts">Gifts</a></li>
            <li><a href="#perimenopause">Equilibrium Edit</a></li>
            <li><a href="#about">About</a></li>
          </ul>
          <a href="SE-equilibrium-quiz-v2.html" className="nav-cta">
            Start assessment
          </a>
          <button
            className="nav-btn"
            aria-label="Toggle menu"
            aria-expanded={isNavOpen}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className={`mob-nav ${isNavOpen ? 'open' : ''}`} id="mob-nav">
          <a href="#science" onClick={() => setIsNavOpen(false)}>The Science</a>
          <a href="#formulas" onClick={() => setIsNavOpen(false)}>Formulas</a>
          <a href="#shop" onClick={() => setIsNavOpen(false)}>Shop</a>
          <a href="#gifts" onClick={() => setIsNavOpen(false)}>Gifts</a>
          <a href="#perimenopause" onClick={() => setIsNavOpen(false)}>Equilibrium Edit</a>
          <a href="#about" onClick={() => setIsNavOpen(false)}>About</a>
          <a href="SE-equilibrium-quiz-v2.html" className="mob-cta">
            Start assessment →
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section aria-label="Introduction">
        <div className="hero">
          <div className="fu">
            <p className="eye" style={{ marginBottom: '1.5rem' }}>
              Neuro-aromachology · Sana Essencia&trade;
            </p>
            <h1 className="hero-hl">
              Your nervous system<br />
              is trying to tell you<br />
              <em>something.</em>
            </h1>
            <p className="hero-body">
              Some days you can't focus. Some evenings you can't switch off.
              Sometimes you don't quite feel like yourself. Your sense of smell
              reaches the part of your brain that runs your mood, stress, and
              focus faster than any other sense. Start with a 2-minute
              assessment — no products, no pressure, just the science of your
              state.
            </p>
            <div className="hero-acts">
              <a href="SE-equilibrium-quiz-v2.html" className="btn-p">
                Start the assessment →
              </a>
              <a href="#science" className="btn-g">
                Why scent?
              </a>
            </div>
          </div>
          <div className="fu" style={{ transitionDelay: '.15s' }}>
            <div className="hero-card">
              <div className="hc-lbl">Sample result · Cognitive Regulation</div>
              <div className="hc-name">Acuity Strike</div>
              <div className="hc-range">SE-N5 · Lemon + Rosemary</div>
              <div className="hc-div"></div>
              <div className="crow">
                <span className="cn">Limonene</span>
                <span className="cp">→ dopaminergic signalling → directed attention</span>
              </div>
              <div className="crow">
                <span className="cn">Beta-pinene</span>
                <span className="cp">→ noradrenergic pathway → sustained focus</span>
              </div>
              <div className="crow">
                <span className="cn">1,8-Cineole</span>
                <span className="cp">→ AChE inhibition → acetylcholine availability</span>
              </div>
              <button
                className="hc-btn"
                onClick={() => (window.location.href = 'sana-essencia-advisor.html')}
              >
                Get your personalised formula →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STRIP */}
      <div className="strip" aria-label="Key facts">
        <div className="strip-i">
          <div className="stat">
            <span className="stat-n">7</span>
            <span className="stat-l">Documented<br />formulas</span>
          </div>
          <div className="sdot"></div>
          <div className="stat">
            <span className="stat-n">25+</span>
            <span className="stat-l">Peer-reviewed<br />citations</span>
          </div>
          <div className="sdot"></div>
          <div className="stat">
            <span className="stat-n">20</span>
            <span className="stat-l">Minutes to feel<br />the difference</span>
          </div>
          <div className="sdot"></div>
          <div className="stat">
            <span className="stat-n">5</span>
            <span className="stat-l">Personalised<br />profiles</span>
          </div>
          <div className="sdot"></div>
          <div className="stat">
            <span
              className="stat-n"
              style={{
                fontFamily: 'var(--sf)',
                fontStyle: 'italic',
                fontSize: '1.1rem',
                paddingTop: '3px',
              }}
            >
              "Mechanism<br />or nothing"
            </span>
            <span className="stat-l">— our founding<br />standard</span>
          </div>
        </div>
      </div>

      {/* SCIENCE */}
      <section id="science" aria-labelledby="sci-h">
        <div className="sec">
          <div className="fu">
            <p className="eye">How it works</p>
            <h2 className="sec-title" id="sci-h">
              The olfactory pathway is the fastest route to your{' '}
              <em>limbic system.</em>
            </h2>
            <p className="sec-body">
              When you inhale a scent compound, it binds to olfactory receptors
              in the nasal epithelium and sends signals directly to the limbic
              system — bypassing the cortex entirely. This is why scent affects
              mood, stress, and cognitive state faster than almost any other
              sensory input. There is no rational filter between the nose and
              the nervous system.
            </p>
          </div>
          <div className="sci-grid fu">
            <div className="sci-cell">
              <div className="sci-icon">🫁</div>
              <div className="sci-t">Inhalation</div>
              <div className="sci-b">
                Volatile aromatic compounds bind to olfactory receptor neurons
                in the nasal mucosa within seconds of inhalation.
              </div>
              <span className="sci-c">Nasal epithelium → OR neurons</span>
            </div>
            <div className="sci-cell">
              <div className="sci-icon">⚡</div>
              <div className="sci-t">Signal</div>
              <div className="sci-b">
                Receptor activation triggers signals directly to the limbic
                system — amygdala, hippocampus, hypothalamus — bypassing
                cortical processing.
              </div>
              <span className="sci-c">Olfactory bulb → Limbic system</span>
            </div>
            <div className="sci-cell">
              <div className="sci-icon">🧬</div>
              <div className="sci-t">Effect</div>
              <div className="sci-b">
                Limbic activation modulates cortisol, GABA, dopamine, and
                serotonin — producing measurable changes in stress, focus, and
                mood within 10–20 minutes.
              </div>
              <span className="sci-c">Cortisol · GABA · Dopamine · Serotonin</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATES */}
      <section id="states" aria-labelledby="states-h">
        <div className="sec">
          <div className="fu">
            <p className="eye">Where to begin</p>
            <h2 className="sec-title" id="states-h">
              Four ways your nervous system <em>asks for help.</em>
            </h2>
            <p className="sec-body">
              You don't wake up thinking "I need lavender." You wake up
              thinking "I can't focus" or "I can't switch off." Start with the
              state you're in — the assessment does the rest.
            </p>
          </div>
          <div className="states-grid fu">
            <a href="SE-equilibrium-quiz-v2.html" className="state-cell">
              <div className="state-icon">⚡</div>
              <div className="state-name">Focus</div>
              <div className="state-quote">"I lose concentration during the day."</div>
            </a>
            <a href="SE-equilibrium-quiz-v2.html" className="state-cell">
              <div className="state-icon">🌊</div>
              <div className="state-name">Reset</div>
              <div className="state-quote">"I can't switch off after work."</div>
            </a>
            <a href="SE-equilibrium-quiz-v2.html" className="state-cell">
              <div className="state-icon">🕯️</div>
              <div className="state-name">Connection</div>
              <div className="state-quote">"I want to feel closer to my partner."</div>
            </a>
            <a href="SE-equilibrium-quiz-v2.html" className="state-cell">
              <div className="state-icon">🌙</div>
              <div className="state-name">Recovery</div>
              <div className="state-quote">"I need better, more consistent rest."</div>
            </a>
          </div>
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <a href="SE-equilibrium-quiz-v2.html" className="btn-p">
              Start the assessment →
            </a>
          </div>
        </div>
      </section>

      {/* FORMULAS */}
      <section id="formulas" aria-labelledby="form-h">
        <div className="f-sec">
          <div className="f-inner">
            <p className="eye">The catalogue</p>
            <h2 className="f-title" id="form-h">
              Seven formulas. Seven receptor pathways. One standard.
            </h2>
            <p className="f-sub">
              Every compound in every formula traces to a named receptor. Every
              receptor traces to a documented effect. Every effect traces to a
              peer-reviewed study.
            </p>
            <div className="f-grid fu">
              <div className="f-card">
                <div className="f-code">SE-N1 · Equilibrium</div>
                <div className="f-name">Nexus Baseline</div>
                <div className="f-range">Lavender dominant</div>
                <div className="f-desc">
                  Anxiety, hormonal restlessness, high stress. The grounding formula.
                </div>
                <div className="f-mech">
                  Linalool → GABA-A receptor → anxiolytic, cortisol reduction
                </div>
              </div>
              <div className="f-card">
                <div className="f-code">SE-N2 · Equilibrium</div>
                <div className="f-name">Nexus Thermal Reset</div>
                <div className="f-range">Eucalyptus + Peppermint</div>
                <div className="f-desc">
                  Hot flushes, overheating, afternoon fatigue. The cooling formula.
                </div>
                <div className="f-mech">
                  1,8-Cineole → TRPM8 channel → thermal relief, alertness
                </div>
              </div>
              <div className="f-card">
                <div className="f-code">SE-N3 · Cognitive Regulation</div>
                <div className="f-name">Aurora Rise</div>
                <div className="f-range">Bergamot FCF + Rosemary</div>
                <div className="f-desc">
                  Low mood, depleted energy, need to perform. The lift formula.
                </div>
                <div className="f-mech">
                  Linalyl acetate → serotonergic modulation + 1,8-cineole → AChE inhibition
                </div>
              </div>
              <div className="f-card">
                <div className="f-code">SE-N4 · Olfactory Restoration</div>
                <div className="f-name">Noct Descent</div>
                <div className="f-range">Clary Sage + Frankincense</div>
                <div className="f-desc">
                  Evening wind-down, sleep preparation, high stress. The restoration formula.
                </div>
                <div className="f-mech">
                  Sclareol → GABAergic pathway + Incensole acetate → CB1 receptor
                </div>
              </div>
              <div className="f-card">
                <div className="f-code">SE-N5 · Cognitive Regulation</div>
                <div className="f-name">Acuity Strike</div>
                <div className="f-range">Lemon + Rosemary</div>
                <div className="f-desc">
                  Brain fog, scattered energy, cognitive demand. The focus formula.
                </div>
                <div className="f-mech">
                  Limonene + Beta-pinene → dopaminergic signalling → directed attention
                </div>
              </div>
              <div className="f-card">
                <div className="f-code">SE-N6 · Equilibrium Intimate</div>
                <div className="f-name">Vinculum</div>
                <div className="f-range">Jasmine + Bergamot + Sandalwood</div>
                <div className="f-desc">
                  Connection, intimacy, shared calm. The couples formula.
                </div>
                <div className="f-mech">
                  Hedione → VN1R1 pheromone receptor → social trust + bonding
                </div>
              </div>
              <div className="f-card">
                <div className="f-code">SE-N7 · Olfactory Restoration</div>
                <div className="f-name">Vela</div>
                <div className="f-range">Orange + Bergamot + Cedarwood + Vetiver</div>
                <div className="f-desc">
                  Mental load, overwhelm, end-of-day transition. The permission formula.
                </div>
                <div className="f-mech">
                  Cedrol → autonomic regulation + Linalool → SNS suppression
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUIZ */}
      <section id="quiz" aria-labelledby="quiz-h">
        <div className="sec">
          <div className="quiz-card fu">
            <div className="quiz-l">
              <p className="eye">The Equilibrium Quiz</p>
              <h2 className="quiz-title" id="quiz-h">
                Eight questions. A formula matched to you.
              </h2>
              <p className="quiz-body">
                Tell us where you are right now — your energy, stress, time of
                day, and what you need. The quiz recommends your formula with
                the receptor-pathway science behind it. No jargon. No wellness clichés.
              </p>
              <div className="chips">
                <span className="chip">❄️ Thermal Reset</span>
                <span className="chip">🌿 Hormone Balance</span>
                <span className="chip">🕯️ Connection</span>
                <span className="chip">⚡ Focus</span>
                <span className="chip">🌊 Decompression</span>
              </div>
              <a href="SE-equilibrium-quiz-v2.html" className="btn-p">
                Take the quiz →
              </a>
            </div>
            <div className="quiz-r">
              <div className="quiz-vis">🎁</div>
              <div className="quiz-rt">Also for gifting</div>
              <p className="quiz-rb">
                Taking it for someone else? The quiz has a gifting path. Build a
                personalised protocol for your partner, friend, or colleague —
                with science they'll actually understand.
              </p>
              <a href="SE-equilibrium-quiz-v2.html" className="btn-g">
                Find a gift protocol →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" aria-labelledby="shop-h">
        <div className="shop-sec">
          <div className="shop-i">
            <p className="eye">The Vector Collection</p>
            <h2 className="shop-title" id="shop-h">
              Your formula needs a home.
            </h2>
            <p className="shop-sub">
              We've curated lava stone vectors, diffuser carriers, and protocol
              accessories — each chosen for its mechanism, not its marketing.
              Shop now, add formula when ready.
            </p>
            <div className="shop-grid fu">
              <div className="shop-card">
                <div className="shop-img">🪨</div>
                <div className="shop-body">
                  <div className="shop-cat">Portable Vector</div>
                  <div className="shop-name">Lava Stone Diffuser Bracelet</div>
                  <div className="shop-desc">
                    Porous volcanic basalt. Absorbs your formula and releases it
                    steadily for 4–8 hours. The wearable protocol.
                  </div>
                  <div className="shop-foot">
                    <span className="shop-price">£16.99</span>
                    <a
                      href="https://sanaessencia.myshopify.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shop-btn"
                    >
                      Shop now
                    </a>
                  </div>
                </div>
              </div>
              <div className="shop-card">
                <div className="shop-img">🔗</div>
                <div className="shop-body">
                  <div className="shop-cat">Portable Vector</div>
                  <div className="shop-name">Stainless Steel Diffuser Locket</div>
                  <div className="shop-desc">
                    Absorbent felt pad with ventilation openings. Continuous
                    olfactory signal at chest level for up to 8 hours.
                  </div>
                  <div className="shop-foot">
                    <span className="shop-price">£19.99</span>
                    <a
                      href="https://sanaessencia.myshopify.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shop-btn"
                    >
                      Shop now
                    </a>
                  </div>
                </div>
              </div>
              <div className="shop-card">
                <div className="shop-img">🗝️</div>
                <div className="shop-body">
                  <div className="shop-cat">Secret Santa · Under £10</div>
                  <div className="shop-name">Lava Stone Keyring</div>
                  <div className="shop-desc">
                    One drop. Clip to your keys. Decompress on the commute home.
                    The pocket protocol.
                  </div>
                  <div className="shop-foot">
                    <span className="shop-price">£8.99</span>
                    <a
                      href="https://sanaessencia.myshopify.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shop-btn"
                    >
                      Shop now
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="shop-note">
              <strong>Note:</strong> Our proprietary scent formulas are
              currently in final clinical testing. Secure your vectors now and
              join the waitlist to be first in line for the formulas.
            </div>
          </div>
        </div>
      </section>

      {/* GIFTS */}
      <section id="gifts" aria-labelledby="gifts-h">
        <div className="sec">
          <div className="fu">
            <p className="eye">Protocol Gifting</p>
            <h2 className="sec-title" id="gifts-h">
              Give the gift of <em>state change.</em>
            </h2>
            <p className="sec-body">
              Because "take a bath" isn't a strategy. Build a personalised
              protocol for someone whose nervous system needs a break.
            </p>
          </div>
          <div className="gift-grid fu">
            <div className="gift-card">
              <div className="gift-occ">For the overwhelmed</div>
              <div className="gift-name">The Decompression Protocol</div>
              <div className="gift-hook">
                Because they carry the mental load for everyone else.
              </div>
            </div>
            <div className="gift-card">
              <div className="gift-occ">For the distracted</div>
              <div className="gift-name">The Acuity Protocol</div>
              <div className="gift-hook">
                Because their brain has too many tabs open.
              </div>
            </div>
            <div className="gift-card">
              <div className="gift-occ">For the couple</div>
              <div className="gift-name">The Connection Protocol</div>
              <div className="gift-hook">
                Because evenings shouldn't just be scrolling next to each other.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PERI */}
      <section id="perimenopause" aria-labelledby="peri-h">
        <div
          className="sec"
          style={{
            background: 'var(--gp)',
            borderRadius: '24px',
            padding: 'clamp(3rem,6vw,5rem) var(--pad)',
            marginBottom: '4rem',
          }}
        >
          <div className="fu">
            <p className="eye">The Equilibrium Edit</p>
            <h2 className="sec-title" id="peri-h">
              Formulated for <em>Perimenopause.</em>
            </h2>
            <p className="sec-body">
              Hormonal fluctuation requires targeted intervention. We designed
              three specific formulas to address the primary autonomic symptoms
              of perimenopause.
            </p>
          </div>
          <div className="peri-grid fu">
            <div className="peri-card">
              <div className="peri-sym">Thermal Regulation</div>
              <div className="peri-f">Nexus Thermal Reset</div>
              <div className="peri-d">
                TRPM8 channel activation for immediate cooling and hot flush management.
              </div>
              <div className="peri-p">Target: Vasomotor symptoms</div>
            </div>
            <div className="peri-card">
              <div className="peri-sym">Nervous System</div>
              <div className="peri-f">Nexus Baseline</div>
              <div className="peri-d">
                GABAergic modulation to reduce anxiety spikes and hormonal restlessness.
              </div>
              <div className="peri-p">Target: Autonomic hyperarousal</div>
            </div>
            <div className="peri-card">
              <div className="peri-sym">Cognitive Support</div>
              <div className="peri-f">Acuity Strike</div>
              <div className="peri-d">
                Dopaminergic pathways to cut through brain fog and restore focus.
              </div>
              <div className="peri-p">Target: Cognitive fatigue</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER / ABOUT */}
      <section id="about" aria-labelledby="about-h">
        <div className="founder-sec">
          <div className="founder-i fu">
            <div>
              <p className="eye">Our Standard</p>
              <h2 className="founder-t" id="about-h">
                "We stripped the wellness clichés out of aromatherapy."
              </h2>
              <p className="founder-b">
                Sana Essencia was born from a frustration with the 'wellness'
                industry. Women don't need another vague promise of
                'relaxation'. They need functional tools, grounded in human
                physiology, to manage their day.
              </p>
              <p className="founder-b">
                We use essential oils not because they are natural, but because
                they contain volatile compounds that cross the blood-brain
                barrier and interface directly with the limbic system. It's not
                magic. It's chemistry.
              </p>
              <div className="founder-sig">Sana Essencia Science Team</div>
            </div>
            <div className="principle">
              <div className="principle-lbl">The Founding Principle</div>
              <div className="principle-txt">
                Mechanism or nothing.<br />
                Every compound traces to a receptor. Every receptor traces to a study.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" aria-labelledby="wl-h">
        <div className="wl-sec fu">
          <p className="eye">Join the Waitlist</p>
          <h2 className="wl-title" id="wl-h">
            Be the first to access the formulas.
          </h2>
          <p className="wl-body">
            Our vectors are available now. The essential oil protocols launch
            soon. Join the list to get 15% off your first formula order.
          </p>

          {!waitlistJoined ? (
            <form className="wl-form" onSubmit={handleWaitlistSubmit}>
              <input
                type="email"
                className="wl-in"
                placeholder="Enter your email address"
                required
                aria-label="Email address"
              />
              <button type="submit" className="wl-sub">
                Join waitlist
              </button>
            </form>
          ) : (
            <div className="wl-ok" style={{ display: 'block' }}>
              ✓ You're on the list. We'll be in touch soon.
            </div>
          )}

          <p className="wl-note" style={{ marginTop: '1rem' }}>
            We respect your inbox. No spam, just science.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer role="contentinfo">
        <div className="ft-i">
          <div className="ft-top">
            <div>
              <div className="ft-brand">Sana Essencia&trade;</div>
              <p className="ft-tag">
                Olfactory science for the modern woman. Formulated in the UK.
                Designed for your nervous system.
              </p>
            </div>
            <div>
              <div className="ft-ct">Explore</div>
              <ul className="ft-links">
                <li><a href="#science">The Science</a></li>
                <li><a href="#formulas">The Formulas</a></li>
                <li><a href="#perimenopause">Equilibrium Edit</a></li>
                <li><a href="SE-equilibrium-quiz-v2.html">Take the Assessment</a></li>
              </ul>
            </div>
            <div>
              <div className="ft-ct">Support</div>
              <ul className="ft-links">
                <li><a href="#shop">Shop Vectors</a></li>
                <li><a href="#gifts">Gifting</a></li>
                <li><a href="mailto:hello@sanaessencia.co.uk">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="ft-bot">
            <div className="ft-leg">&copy; 2026 Sana Essencia. All rights reserved.</div>
            <div className="ft-leg">Terms & Conditions | Privacy Policy</div>
          </div>
        </div>
      </footer>
    </>
  );
}
