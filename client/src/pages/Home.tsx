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
            <li><a href="sana-essencia-advisor.html">Get My Formula</a></li>
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
          <a href="sana-essencia-advisor.html" onClick={() => setIsNavOpen(false)}>Get My Formula</a>
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
