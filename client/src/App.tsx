<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sana Essencia — Product Showcase Section</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Jost:wght@200;300;400;500&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet">

<!--
=============================================================
  SANA ESSENCIA — PRODUCT SHOWCASE SECTION
  Drop-in component for sanaessencia.co.uk
  
  HOW TO ADD TO YOUR SITE:
  1. Copy everything between the <style> tags into your
     existing CSS (or keep as a linked stylesheet)
  2. Copy the <section class="se-products"> block into
     your HTML where you want the section to appear
  3. Copy the <script> block before </body>
  4. Replace data-src on each .se-prod-viewer with your
     actual image paths when photos are ready
  5. The angle thumbnails auto-generate — swap their
     src attributes with real multi-angle shots
=============================================================
-->

<style>
/* ── PRODUCT SECTION TOKENS (matches existing site palette) ── */
:root {
  --cream: #F7F4EF;
  --stone: #E8E3DA;
  --text: #2A2A2A;
  --muted: #7A7570;
  --warm: #C9B89A;
  --gold: #B8975A;
  --graphite: #1E1E1E;
  --graphite-mid: #2e2e2e;
  --teal: #3a5a58;
  --font-serif: 'Cormorant Garamond', serif;
  --font-sans: 'Jost', sans-serif;
  --font-mono: 'DM Mono', monospace;
}

/* ── SECTION WRAPPER ── */
.se-products {
  background: var(--cream);
  padding: 7rem 4rem;
  position: relative;
  overflow: hidden;
  border-top: 1px solid var(--stone);
}

.se-products::before {
  content: 'NEURO TOOLS';
  position: absolute;
  top: 3rem;
  right: -2rem;
  font-family: var(--font-serif);
  font-size: clamp(5rem, 12vw, 14rem);
  font-weight: 300;
  color: var(--stone);
  letter-spacing: 0.05em;
  pointer-events: none;
  white-space: nowrap;
  line-height: 1;
  opacity: 0.5;
}

.se-products-inner { max-width: 1300px; margin: 0 auto; }

/* ── SECTION HEADER ── */
.se-prod-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: end;
  margin-bottom: 5rem;
}

.se-prod-label {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.se-prod-label::before {
  content: '';
  width: 40px;
  height: 1px;
  background: var(--muted);
  flex-shrink: 0;
}

.se-prod-title {
  font-family: var(--font-serif);
  font-size: clamp(2.2rem, 4.5vw, 4rem);
  font-weight: 300;
  line-height: 1.05;
  color: var(--text);
}
.se-prod-title em {
  font-style: italic;
  color: var(--muted);
}

.se-prod-header-right {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.se-prod-intro {
  font-size: 0.85rem;
  line-height: 2.1;
  color: var(--muted);
  max-width: 440px;
}

.se-prod-filter {
  display: flex;
  gap: 0;
  border: 1px solid var(--stone);
  width: fit-content;
}

.se-filter-btn {
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 0.65rem 1.25rem;
  background: transparent;
  border: none;
  border-right: 1px solid var(--stone);
  color: var(--muted);
  cursor: pointer;
  transition: all 0.25s;
}
.se-filter-btn:last-child { border-right: none; }
.se-filter-btn.active,
.se-filter-btn:hover {
  background: var(--text);
  color: var(--cream);
}

/* ── PRODUCT TABS ── */
.se-prod-tabs { display: none; }
.se-prod-tabs.active { display: block; }

/* ── PRODUCT CARD — MAIN LAYOUT ── */
.se-prod-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border: 1px solid var(--stone);
  margin-bottom: 2px;
  background: var(--cream);
  transition: background 0.3s;
  overflow: hidden;
}

.se-prod-card:hover { background: #fff; }

/* ── IMAGE VIEWER ── */
.se-prod-visual {
  position: relative;
  background: var(--stone);
  overflow: hidden;
  aspect-ratio: 1 / 1;
}

.se-prod-viewer {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.5s ease;
  background: var(--stone);
}

.se-prod-viewer.active { opacity: 1; }

.se-prod-viewer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.se-prod-card:hover .se-prod-viewer.active img {
  transform: scale(1.03);
}

/* Placeholder when no image */
.se-prod-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  width: 100%;
  height: 100%;
  color: var(--muted);
}

.se-placeholder-ring {
  width: 80px;
  height: 80px;
  border: 1px solid var(--muted);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.4;
}

.se-placeholder-label {
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.4;
  text-align: center;
}

/* Angle strip */
.se-angle-strip {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  gap: 2px;
  padding: 1rem;
  background: linear-gradient(to top, rgba(28,28,28,0.4), transparent);
}

.se-angle-thumb {
  width: 48px;
  height: 48px;
  object-fit: cover;
  cursor: pointer;
  opacity: 0.6;
  border: 1px solid transparent;
  transition: all 0.25s;
  flex-shrink: 0;
  background: var(--graphite-mid);
  display: flex;
  align-items: center;
  justify-content: center;
}

.se-angle-thumb:hover,
.se-angle-thumb.active {
  opacity: 1;
  border-color: rgba(255,255,255,0.6);
}

.se-angle-label-wrap {
  width: 48px;
  height: 48px;
  cursor: pointer;
  opacity: 0.5;
  border: 1px solid rgba(255,255,255,0.2);
  transition: all 0.25s;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(28,28,28,0.5);
}

.se-angle-label-wrap:hover,
.se-angle-label-wrap.active {
  opacity: 1;
  border-color: rgba(255,255,255,0.6);
}

.se-angle-label {
  font-family: var(--font-mono);
  font-size: 0.45rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #fff;
  text-align: center;
  line-height: 1.4;
}

/* Coming soon badge */
.se-coming-badge {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  font-family: var(--font-mono);
  font-size: 0.52rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 0.35rem 0.75rem;
  background: var(--graphite);
  color: var(--cream);
  opacity: 0.7;
}

/* ── PRODUCT INFO PANEL ── */
.se-prod-info {
  padding: 3rem 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 1px solid var(--stone);
}

.se-prod-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.se-prod-tag {
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold);
}

.se-prod-num {
  font-family: var(--font-serif);
  font-size: 1rem;
  color: var(--stone);
  font-weight: 300;
}

.se-prod-name {
  font-family: var(--font-serif);
  font-size: clamp(1.8rem, 2.5vw, 2.5rem);
  font-weight: 300;
  line-height: 1.1;
  color: var(--text);
  margin-bottom: 0.5rem;
}

.se-prod-sub {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 1.75rem;
}

.se-prod-desc {
  font-size: 0.83rem;
  line-height: 2.1;
  color: var(--muted);
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--stone);
  padding-bottom: 2rem;
}

/* Spec rows */
.se-prod-specs {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 2rem;
}

.se-spec-row {
  display: flex;
  align-items: baseline;
  gap: 1rem;
}

.se-spec-key {
  font-family: var(--font-mono);
  font-size: 0.55rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
  min-width: 90px;
  flex-shrink: 0;
}

.se-spec-val {
  font-size: 0.78rem;
  color: var(--text);
  line-height: 1.5;
}

/* Use cases */
.se-prod-uses {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 2.5rem;
}

.se-use-tag {
  font-family: var(--font-mono);
  font-size: 0.52rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 0.3rem 0.7rem;
  border: 1px solid var(--stone);
  color: var(--muted);
  transition: all 0.2s;
}

.se-use-tag:hover {
  border-color: var(--text);
  color: var(--text);
}

/* CTA row */
.se-prod-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1.75rem;
  border-top: 1px solid var(--stone);
  gap: 1rem;
  flex-wrap: wrap;
}

.se-price-block { display: flex; flex-direction: column; gap: 0.2rem; }

.se-price {
  font-family: var(--font-serif);
  font-size: 1.6rem;
  font-weight: 300;
  color: var(--text);
  line-height: 1;
}

.se-price-note {
  font-family: var(--font-mono);
  font-size: 0.52rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--muted);
}

.se-cta-btns {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.se-btn-primary {
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 0.85rem 1.75rem;
  background: var(--text);
  color: var(--cream);
  border: 1px solid var(--text);
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: all 0.25s;
}

.se-btn-primary:hover {
  background: var(--graphite-mid);
  border-color: var(--graphite-mid);
}

.se-btn-secondary {
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 0.85rem 1.75rem;
  background: transparent;
  color: var(--text);
  border: 1px solid var(--stone);
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: all 0.25s;
}

.se-btn-secondary:hover { border-color: var(--text); }

/* Colour swatch row */
.se-colour-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.75rem;
}

.se-colour-label {
  font-family: var(--font-mono);
  font-size: 0.55rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--muted);
  margin-right: 0.25rem;
}

.se-swatch {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  outline: 1px solid transparent;
  transition: all 0.2s;
}

.se-swatch.active,
.se-swatch:hover {
  outline-color: var(--muted);
  outline-offset: 2px;
}

.se-swatch-name {
  font-family: var(--font-mono);
  font-size: 0.52rem;
  letter-spacing: 0.12em;
  color: var(--muted);
}

/* ── WAITLIST INLINE BLOCK ── */
.se-waitlist-inline {
  background: var(--graphite);
  padding: 3.5rem 4rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  margin-top: 3rem;
}

.se-wl-label {
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 1rem;
}

.se-wl-title {
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 2.5vw, 2.2rem);
  font-weight: 300;
  color: var(--cream);
  line-height: 1.2;
}

.se-wl-body {
  font-size: 0.78rem;
  color: rgba(247,244,239,0.45);
  line-height: 1.9;
  margin-top: 0.75rem;
}

.se-wl-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.se-wl-row {
  display: flex;
  border: 1px solid rgba(247,244,239,0.12);
}

.se-wl-input {
  flex: 1;
  padding: 0.9rem 1.25rem;
  background: rgba(247,244,239,0.06);
  border: none;
  outline: none;
  color: var(--cream);
  font-family: var(--font-sans);
  font-size: 0.82rem;
  font-weight: 300;
}

.se-wl-input::placeholder { color: rgba(247,244,239,0.25); }

.se-wl-submit {
  padding: 0.9rem 1.5rem;
  background: var(--gold);
  color: var(--graphite);
  border: none;
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 400;
  transition: background 0.2s;
  white-space: nowrap;
}

.se-wl-submit:hover { background: #d4b07a; }

.se-wl-note {
  font-family: var(--font-mono);
  font-size: 0.52rem;
  letter-spacing: 0.12em;
  color: rgba(247,244,239,0.25);
  text-transform: uppercase;
}

.se-wl-success {
  display: none;
  flex-direction: column;
  gap: 0.75rem;
}

.se-wl-success.visible { display: flex; }

.se-wl-success-check {
  width: 44px;
  height: 44px;
  border: 1px solid var(--gold);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gold);
  font-size: 1rem;
}

.se-wl-success-text {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  color: var(--cream);
  font-style: italic;
}

/* ── SCROLL REVEAL ── */
.se-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.se-reveal.visible {
  opacity: 1;
  transform: none;
}
.se-reveal-delay-1 { transition-delay: 0.1s; }
.se-reveal-delay-2 { transition-delay: 0.2s; }
.se-reveal-delay-3 { transition-delay: 0.3s; }

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .se-prod-info { padding: 2.5rem 2rem 2rem; }
}

@media (max-width: 900px) {
  .se-products { padding: 5rem 1.75rem; }
  .se-products::before { display: none; }
  .se-prod-header { grid-template-columns: 1fr; gap: 2rem; margin-bottom: 3rem; }
  .se-prod-card { grid-template-columns: 1fr; }
  .se-prod-visual { aspect-ratio: 4/3; }
  .se-prod-info { border-left: none; border-top: 1px solid var(--stone); padding: 2rem 1.5rem; }
  .se-waitlist-inline { grid-template-columns: 1fr; padding: 2.5rem 1.75rem; }
}

@media (max-width: 600px) {
  .se-prod-cta { flex-direction: column; align-items: flex-start; }
  .se-cta-btns { width: 100%; }
  .se-btn-primary, .se-btn-secondary { flex: 1; text-align: center; }
  .se-angle-strip { gap: 2px; }
}
</style>

<!-- ============================================================
     PRODUCT SHOWCASE SECTION — START
     Add this block to your HTML
     ============================================================ -->

<section class="se-products" id="collection">
  <div class="se-products-inner">

    <!-- Header -->
    <div class="se-prod-header se-reveal">
      <div>
        <div class="se-prod-label">06 — Neuro Tools Collection</div>
        <h2 class="se-prod-title">
          Instruments<br>
          <em>engineered for state.</em>
        </h2>
      </div>
      <div class="se-prod-header-right">
        <p class="se-prod-intro">
          Each Neuro Tool is a precision-manufactured scent instrument
          designed for a specific cognitive window. Not wellness objects.
          Not diffusers. Portable biological signal devices.
        </p>
        <!-- Filter tabs -->
        <div class="se-prod-filter">
          <button class="se-filter-btn active" onclick="filterProducts('all', this)">All</button>
          <button class="se-filter-btn" onclick="filterProducts('morning', this)">Morning</button>
          <button class="se-filter-btn" onclick="filterProducts('focus', this)">Focus</button>
          <button class="se-filter-btn" onclick="filterProducts('evening', this)">Evening</button>
        </div>
      </div>
    </div>

    <!-- ── PRODUCT 01: INHALER SLIDE ── -->
    <div class="se-prod-card se-reveal" data-category="morning focus" id="card-inhaler">
      <div class="se-prod-visual">
        <!-- Main viewer: replace data-src with real image path -->
        <div class="se-prod-viewer active" id="inhaler-view-front">
          <div class="se-prod-placeholder">
            <div class="se-placeholder-ring">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <rect x="2" y="6" width="20" height="12" rx="2"/>
                <path d="M8 6V4M16 6V4M8 18v2M16 18v2"/>
              </svg>
            </div>
            <div class="se-placeholder-label">Photo<br>Coming Soon</div>
          </div>
          <!-- When ready: <img src="/images/inhaler-slide-front.jpg" alt="Inhaler Slide front view"> -->
        </div>
        <div class="se-prod-viewer" id="inhaler-view-open">
          <div class="se-prod-placeholder">
            <div class="se-placeholder-ring">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <rect x="2" y="6" width="20" height="12" rx="2"/>
                <path d="M14 6v12"/>
              </svg>
            </div>
            <div class="se-placeholder-label">Open<br>View</div>
          </div>
          <!-- When ready: <img src="/images/inhaler-slide-open.jpg" alt="Inhaler Slide open"> -->
        </div>
        <div class="se-prod-viewer" id="inhaler-view-top">
          <div class="se-prod-placeholder">
            <div class="se-placeholder-ring">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <circle cx="12" cy="12" r="9"/>
                <path d="M12 8v8M8 12h8"/>
              </svg>
            </div>
            <div class="se-placeholder-label">Top<br>Detail</div>
          </div>
        </div>
        <div class="se-prod-viewer" id="inhaler-view-hand">
          <div class="se-prod-placeholder">
            <div class="se-placeholder-ring">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v5"/>
                <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/>
                <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-2.5"/>
              </svg>
            </div>
            <div class="se-placeholder-label">In<br>Hand</div>
          </div>
        </div>

        <!-- Angle thumbnails -->
        <div class="se-angle-strip">
          <div class="se-angle-label-wrap active" onclick="switchAngle('inhaler', 'front', this)">
            <div class="se-angle-label">Front</div>
          </div>
          <div class="se-angle-label-wrap" onclick="switchAngle('inhaler', 'open', this)">
            <div class="se-angle-label">Open</div>
          </div>
          <div class="se-angle-label-wrap" onclick="switchAngle('inhaler', 'top', this)">
            <div class="se-angle-label">Detail</div>
          </div>
          <div class="se-angle-label-wrap" onclick="switchAngle('inhaler', 'hand', this)">
            <div class="se-angle-label">Hand</div>
          </div>
        </div>
        <span class="se-coming-badge">Photos coming soon</span>
      </div>

      <div class="se-prod-info">
        <div>
          <div class="se-prod-meta">
            <span class="se-prod-tag">Morning Activation · Focus</span>
            <span class="se-prod-num">01</span>
          </div>
          <div class="se-prod-name">Inhaler Slide</div>
          <div class="se-prod-sub">Synaptic Activation Device</div>
          <p class="se-prod-desc">
            A precision-engineered sliding pocket device housing volcanic lava stones
            infused with cognitive-activation molecules. Triangle-lattice embossing
            channels tactile grounding while the clear acrylic reveal delivers a
            controlled first-hit olfactory cue.
            <br><br>
            PA12 nylon body, fine-grain matte finish. Engineered for the professional
            who needs state-shifting without stopping.
          </p>

          <div class="se-colour-row">
            <span class="se-colour-label">Colour</span>
            <div class="se-swatch active" style="background:#2e2e2e;" title="Deep Graphite Grey" onclick="selectSwatch(this, 'inhaler')"></div>
            <div class="se-swatch" style="background:#e8e3da;" title="Stone White" onclick="selectSwatch(this, 'inhaler')"></div>
            <span class="se-swatch-name" id="inhaler-swatch-name">Deep Graphite Grey</span>
          </div>

          <div class="se-prod-specs">
            <div class="se-spec-row">
              <span class="se-spec-key">Dimensions</span>
              <span class="se-spec-val">90 × 50 × 15 mm</span>
            </div>
            <div class="se-spec-row">
              <span class="se-spec-key">Material</span>
              <span class="se-spec-val">PA12 Nylon · SLS or MJF</span>
            </div>
            <div class="se-spec-row">
              <span class="se-spec-key">Finish</span>
              <span class="se-spec-val">Matte bead-blast · Dyed graphite</span>
            </div>
            <div class="se-spec-row">
              <span class="se-spec-key">Contents</span>
              <span class="se-spec-val">Lava stones + essential oil formula</span>
            </div>
            <div class="se-spec-row">
              <span class="se-spec-key">Refresh</span>
              <span class="se-spec-val">Every 2–4 weeks</span>
            </div>
          </div>

          <div class="se-prod-uses">
            <span class="se-use-tag">Morning clarity</span>
            <span class="se-use-tag">Pre-meeting reset</span>
            <span class="se-use-tag">Travel</span>
            <span class="se-use-tag">Desk focus</span>
            <span class="se-use-tag">Corporate gifting</span>
          </div>
        </div>

        <div class="se-prod-cta">
          <div class="se-price-block">
            <div class="se-price">£38</div>
            <div class="se-price-note">+ refill subscription from £12/mo</div>
          </div>
          <div class="se-cta-btns">
            <a href="#waitlist" class="se-btn-primary">Pre-Order</a>
            <a href="#science" class="se-btn-secondary">The Science</a>
          </div>
        </div>
      </div>
    </div>

    <!-- ── PRODUCT 02: SYNAPTIC CLICKER ── -->
    <div class="se-prod-card se-reveal se-reveal-delay-1" data-category="focus" id="card-clicker"
         style="grid-template-columns: 1fr 1fr; flex-direction: row-reverse;">
      <!-- Info left this time — alternating layout -->
      <div class="se-prod-info" style="order: 1; border-left: none; border-right: 1px solid var(--stone);">
        <div>
          <div class="se-prod-meta">
            <span class="se-prod-tag">Cognitive Stamina · Deep Work</span>
            <span class="se-prod-num">02</span>
          </div>
          <div class="se-prod-name">Synaptic Clicker</div>
          <div class="se-prod-sub">Tactile Focus Instrument</div>
          <p class="se-prod-desc">
            A pebble-form tactile tool combining sensory grounding with scent-based
            cognitive support. Concentric ripple embossing under the thumb creates
            a tactile anchor. A polished jade dome delivers the focus cue at the
            moment of peak cognitive demand.
            <br><br>
            Matte teal PA12 nylon shell. Designed for hands that need something to
            hold while the mind needs to stay present.
          </p>

          <div class="se-colour-row">
            <span class="se-colour-label">Colour</span>
            <div class="se-swatch active" style="background:#3a5a58;" title="Deep Teal" onclick="selectSwatch(this, 'clicker')"></div>
            <div class="se-swatch" style="background:#b8975a;" title="Warm Gold" onclick="selectSwatch(this, 'clicker')"></div>
            <span class="se-swatch-name" id="clicker-swatch-name">Deep Teal</span>
          </div>

          <div class="se-prod-specs">
            <div class="se-spec-row">
              <span class="se-spec-key">Dimensions</span>
              <span class="se-spec-val">60 mm length</span>
            </div>
            <div class="se-spec-row">
              <span class="se-spec-key">Material</span>
              <span class="se-spec-val">PA12 Nylon · MJF or SLS</span>
            </div>
            <div class="se-spec-row">
              <span class="se-spec-key">Stone</span>
              <span class="se-spec-val">Polished jade dome</span>
            </div>
            <div class="se-spec-row">
              <span class="se-spec-key">Contents</span>
              <span class="se-spec-val">Lava stones + focus formula</span>
            </div>
            <div class="se-spec-row">
              <span class="se-spec-key">Refresh</span>
              <span class="se-spec-val">Every 2–4 weeks</span>
            </div>
          </div>

          <div class="se-prod-uses">
            <span class="se-use-tag">Deep work</span>
            <span class="se-use-tag">Study sessions</span>
            <span class="se-use-tag">Long afternoons</span>
            <span class="se-use-tag">Meetings</span>
          </div>
        </div>

        <div class="se-prod-cta">
          <div class="se-price-block">
            <div class="se-price">£44</div>
            <div class="se-price-note">+ refill subscription from £12/mo</div>
          </div>
          <div class="se-cta-btns">
            <a href="#waitlist" class="se-btn-primary">Pre-Order</a>
            <a href="#science" class="se-btn-secondary">The Science</a>
          </div>
        </div>
      </div>

      <div class="se-prod-visual" style="order: 2;">
        <div class="se-prod-viewer active" id="clicker-view-front">
          <div class="se-prod-placeholder">
            <div class="se-placeholder-ring">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <ellipse cx="12" cy="12" rx="10" ry="7"/>
              </svg>
            </div>
            <div class="se-placeholder-label">Photo<br>Coming Soon</div>
          </div>
        </div>
        <div class="se-prod-viewer" id="clicker-view-open">
          <div class="se-prod-placeholder">
            <div class="se-placeholder-ring">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <ellipse cx="8" cy="12" rx="5" ry="4"/><ellipse cx="17" cy="12" rx="4" ry="4"/>
              </svg>
            </div>
            <div class="se-placeholder-label">Open<br>View</div>
          </div>
        </div>
        <div class="se-prod-viewer" id="clicker-view-top">
          <div class="se-prod-placeholder">
            <div class="se-placeholder-ring">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>
              </svg>
            </div>
            <div class="se-placeholder-label">Top<br>Detail</div>
          </div>
        </div>
        <div class="se-prod-viewer" id="clicker-view-hand">
          <div class="se-prod-placeholder">
            <div class="se-placeholder-ring">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <path d="M18 11V6a2 2 0 0 0-4 0v5M14 10V4a2 2 0 0 0-4 0v2M10 10.5V6a2 2 0 0 0-4 0v8a6 6 0 0 0 12 0v-2.5"/>
              </svg>
            </div>
            <div class="se-placeholder-label">In<br>Hand</div>
          </div>
        </div>
        <div class="se-angle-strip">
          <div class="se-angle-label-wrap active" onclick="switchAngle('clicker', 'front', this)">
            <div class="se-angle-label">Front</div>
          </div>
          <div class="se-angle-label-wrap" onclick="switchAngle('clicker', 'open', this)">
            <div class="se-angle-label">Open</div>
          </div>
          <div class="se-angle-label-wrap" onclick="switchAngle('clicker', 'top', this)">
            <div class="se-angle-label">Detail</div>
          </div>
          <div class="se-angle-label-wrap" onclick="switchAngle('clicker', 'hand', this)">
            <div class="se-angle-label">Hand</div>
          </div>
        </div>
        <span class="se-coming-badge">Photos coming soon</span>
      </div>
    </div>

    <!-- ── PRODUCT 03: CORTICAL COLUMN CANISTER ── -->
    <div class="se-prod-card se-reveal se-reveal-delay-2" data-category="evening" id="card-canister">
      <div class="se-prod-visual">
        <div class="se-prod-viewer active" id="canister-view-front">
          <div class="se-prod-placeholder">
            <div class="se-placeholder-ring">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <rect x="6" y="4" width="12" height="16" rx="6"/>
              </svg>
            </div>
            <div class="se-placeholder-label">Photo<br>Coming Soon</div>
          </div>
        </div>
        <div class="se-prod-viewer" id="canister-view-lid">
          <div class="se-prod-placeholder">
            <div class="se-placeholder-ring">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <circle cx="12" cy="12" r="9"/>
                <path d="M8 12a4 4 0 0 0 8 0"/>
              </svg>
            </div>
            <div class="se-placeholder-label">Lid<br>Engraving</div>
          </div>
        </div>
        <div class="se-prod-viewer" id="canister-view-ribbing">
          <div class="se-prod-placeholder">
            <div class="se-placeholder-ring">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <path d="M6 4v16M9 4v16M12 4v16M15 4v16M18 4v16"/>
              </svg>
            </div>
            <div class="se-placeholder-label">Ribbing<br>Detail</div>
          </div>
        </div>
        <div class="se-prod-viewer" id="canister-view-gold">
          <div class="se-prod-placeholder">
            <div class="se-placeholder-ring">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <circle cx="12" cy="12" r="9"/>
                <path d="M9 9l6 6M15 9l-6 6"/>
              </svg>
            </div>
            <div class="se-placeholder-label">Gold<br>Edition</div>
          </div>
        </div>
        <div class="se-angle-strip">
          <div class="se-angle-label-wrap active" onclick="switchAngle('canister', 'front', this)">
            <div class="se-angle-label">Body</div>
          </div>
          <div class="se-angle-label-wrap" onclick="switchAngle('canister', 'lid', this)">
            <div class="se-angle-label">Lid</div>
          </div>
          <div class="se-angle-label-wrap" onclick="switchAngle('canister', 'ribbing', this)">
            <div class="se-angle-label">Detail</div>
          </div>
          <div class="se-angle-label-wrap" onclick="switchAngle('canister', 'gold', this)">
            <div class="se-angle-label">Gold Ed.</div>
          </div>
        </div>
        <span class="se-coming-badge">Photos coming soon</span>
      </div>

      <div class="se-prod-info">
        <div>
          <div class="se-prod-meta">
            <span class="se-prod-tag">Evening Regulation · Desk Ritual</span>
            <span class="se-prod-num">03</span>
          </div>
          <div class="se-prod-name">Cortical Column Canister</div>
          <div class="se-prod-sub">Aromatic Architecture Vessel</div>
          <p class="se-prod-desc">
            A precision aromacology vessel inspired by cortical micro-architecture.
            Vertical ribbing references the columnar organisation of the neocortex.
            Friction-fit lid engraved with brain motif and S/E monogram. Interior
            holds volcanic lava stones for passive ambient diffusion.
            <br><br>
            Available in Deep Graphite Grey (PA12) and Warm Grey-Gold (Alumide).
            A statement object that earns its place on any desk.
          </p>

          <div class="se-colour-row">
            <span class="se-colour-label">Edition</span>
            <div class="se-swatch active" style="background:#3d3d3d;" title="Deep Graphite Grey" onclick="selectSwatch(this, 'canister')"></div>
            <div class="se-swatch" style="background:#b8975a;" title="Warm Grey-Gold" onclick="selectSwatch(this, 'canister')"></div>
            <span class="se-swatch-name" id="canister-swatch-name">Deep Graphite Grey</span>
          </div>

          <div class="se-prod-specs">
            <div class="se-spec-row">
              <span class="se-spec-key">Dimensions</span>
              <span class="se-spec-val">80mm height · 75mm diameter</span>
            </div>
            <div class="se-spec-row">
              <span class="se-spec-key">Volume</span>
              <span class="se-spec-val">~250 ml interior</span>
            </div>
            <div class="se-spec-row">
              <span class="se-spec-key">Material</span>
              <span class="se-spec-val">PA12 Nylon (Grey) · Alumide (Gold)</span>
            </div>
            <div class="se-spec-row">
              <span class="se-spec-key">Engraving</span>
              <span class="se-spec-val">Brain motif + S/E · 0.3–0.4mm depth</span>
            </div>
            <div class="se-spec-row">
              <span class="se-spec-key">Lid fit</span>
              <span class="se-spec-val">Friction-fit · ±0.2mm tolerance</span>
            </div>
          </div>

          <div class="se-prod-uses">
            <span class="se-use-tag">Desk diffusion</span>
            <span class="se-use-tag">Bedside ritual</span>
            <span class="se-use-tag">Corporate gift</span>
            <span class="se-use-tag">Decorative object</span>
            <span class="se-use-tag">Evening wind-down</span>
          </div>
        </div>

        <div class="se-prod-cta">
          <div class="se-price-block">
            <div class="se-price">£62</div>
            <div class="se-price-note">+ refill subscription from £12/mo</div>
          </div>
          <div class="se-cta-btns">
            <a href="#waitlist" class="se-btn-primary">Pre-Order</a>
            <a href="#science" class="se-btn-secondary">The Science</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Waitlist inline -->
    <div class="se-waitlist-inline se-reveal se-reveal-delay-3">
      <div>
        <div class="se-wl-label">Early Access · Limited First Run</div>
        <div class="se-wl-title">
          Be first to own<br>
          <em style="font-family:'Cormorant Garamond',serif; font-style:italic;">a Neuro Tool.</em>
        </div>
        <p class="se-wl-body">
          We are preparing a limited prototype run. Join the waitlist for
          founder pricing, early access, and updates direct from the lab.
        </p>
      </div>
      <div class="se-wl-form" id="wl-form-block">
        <div class="se-wl-row">
          <input class="se-wl-input" type="email" id="wl-email" placeholder="your@email.com" required>
          <button class="se-wl-submit" onclick="submitWaitlist()">Join Now</button>
        </div>
        <div class="se-wl-note">No spam. Unsubscribe any time.</div>
      </div>
      <div class="se-wl-success" id="wl-success">
        <div class="se-wl-success-check">✓</div>
        <div class="se-wl-success-text">You're on the list.</div>
        <div class="se-wl-note" style="color:rgba(247,244,239,0.3);">We'll be in touch before anyone else.</div>
      </div>
    </div>

  </div>
</section>

<!-- ============================================================
     PRODUCT SHOWCASE SECTION — END
     ============================================================ -->

<script>
/* ── ANGLE SWITCHER ── */
function switchAngle(product, angle, thumbEl) {
  // Hide all viewers for this product
  document.querySelectorAll(`[id^="${product}-view-"]`).forEach(v => {
    v.classList.remove('active');
  });
  // Show target viewer
  const target = document.getElementById(`${product}-view-${angle}`);
  if (target) target.classList.add('active');

  // Update thumb active state
  const strip = thumbEl.closest('.se-angle-strip');
  if (strip) {
    strip.querySelectorAll('.se-angle-label-wrap').forEach(t => t.classList.remove('active'));
  }
  thumbEl.classList.add('active');
}

/* ── SWATCH SELECTOR ── */
function selectSwatch(el, product) {
  const parent = el.closest('.se-colour-row');
  parent.querySelectorAll('.se-swatch').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
  const nameEl = document.getElementById(`${product}-swatch-name`);
  if (nameEl) nameEl.textContent = el.title;
}

/* ── PRODUCT FILTER ── */
function filterProducts(cat, btn) {
  // Update button states
  document.querySelectorAll('.se-filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Show/hide cards
  document.querySelectorAll('.se-prod-card').forEach(card => {
    if (cat === 'all') {
      card.style.display = '';
    } else {
      const cats = card.dataset.category || '';
      card.style.display = cats.includes(cat) ? '' : 'none';
    }
  });
}

/* ── WAITLIST ── */
function submitWaitlist() {
  const email = document.getElementById('wl-email');
  if (email && email.value.includes('@')) {
    document.getElementById('wl-form-block').style.display = 'none';
    document.getElementById('wl-success').classList.add('visible');
    // TODO: connect to your email service (Mailchimp, ConvertKit, etc.)
    console.log('Waitlist signup:', email.value);
  }
}

/* Allow Enter key on waitlist input */
const wlInput = document.getElementById('wl-email');
if (wlInput) {
  wlInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') submitWaitlist();
  });
}

/* ── SCROLL REVEAL ── */
const seObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      seObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.se-reveal').forEach(el => seObserver.observe(el));
</script>

</html>
