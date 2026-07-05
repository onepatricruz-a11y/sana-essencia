<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Sana Essencia — neuro-aromachology for women. Science-backed scent protocols for perimenopause, focus, decompression and connection. Find your formula." />
  <meta name="theme-color" content="#2a2a28" />
  <title>Sana Essencia — Olfactory Science for the Modern Woman</title>
  <meta property="og:title" content="Sana Essencia" />
  <meta property="og:description" content="Your nose has a direct line to the part of your brain that runs your hormones, mood and memory. Find your formula." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://sanaessencia.co.uk" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,200;0,8..60,300;0,8..60,400;1,8..60,200;1,8..60,300&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
  <style>
    :root{--g:#2a2a28;--gm:#3d3d3a;--gl:#5a5a57;--gold:#b8963e;--gp:#fdf9f0;--cr:#f5f1ea;--cd:#ede9e0;--w:#ffffff;--b:rgba(42,42,40,.10);--bm:rgba(42,42,40,.18);--t:#1e1e1c;--t2:#5a5a57;--t3:#9a9a96;--sf:'Source Serif 4',Georgia,serif;--ss:'Inter',-apple-system,sans-serif;--max:1080px;--pad:clamp(1.25rem,5vw,3rem);--r:10px}
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{font-family:var(--ss);background:var(--cr);color:var(--t);line-height:1.6;-webkit-font-smoothing:antialiased}
    a{color:inherit;text-decoration:none}
    button{font-family:var(--ss);cursor:pointer;border:none;background:none}
    .wrap{width:100%;max-width:var(--max);margin:0 auto;padding:0 var(--pad)}
    .eye{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);font-weight:500}
    /* NAV */
    .nav{position:sticky;top:0;z-index:100;background:rgba(245,241,234,.93);backdrop-filter:blur(12px);border-bottom:.5px solid var(--b)}
    .nav-i{display:flex;align-items:center;justify-content:space-between;height:60px;max-width:var(--max);margin:0 auto;padding:0 var(--pad)}
    .nav-brand{font-family:var(--sf);font-size:15px;font-weight:300;letter-spacing:.18em;text-transform:uppercase;color:var(--g)}
    .nav-links{display:flex;align-items:center;gap:1.75rem;list-style:none}
    .nav-links a{font-size:12px;letter-spacing:.05em;color:var(--t2);transition:color .15s}
    .nav-links a:hover{color:var(--t)}
    .nav-cta{font-size:12px;font-weight:500;padding:8px 18px;background:var(--g);color:var(--cr);border-radius:20px;transition:background .15s;white-space:nowrap}
    .nav-cta:hover{background:var(--gm)}
    .nav-btn{display:none;flex-direction:column;gap:5px;padding:4px}
    .nav-btn span{display:block;width:22px;height:1.5px;background:var(--g)}
    .mob-nav{display:none;flex-direction:column;background:var(--cr);border-top:.5px solid var(--b);padding:1.5rem var(--pad);gap:1.25rem}
    .mob-nav.open{display:flex}
    .mob-nav a{font-size:15px;color:var(--t2);padding:.25rem 0;border-bottom:.5px solid var(--b)}
    .mob-cta{display:block;text-align:center;padding:12px;background:var(--g);color:var(--cr);border-radius:var(--r);font-weight:500;margin-top:.5rem}
    @media(max-width:680px){.nav-links,.nav-cta{display:none}.nav-btn{display:flex}}
    /* ANNOUNCE */
    .ann{background:var(--gold);padding:8px var(--pad);text-align:center;font-size:12px;color:var(--g);font-weight:500}
    .ann a{text-decoration:underline;text-underline-offset:2px}
    /* BUTTONS */
    .btn-p{padding:13px 28px;background:var(--g);color:var(--cr);border-radius:30px;font-size:14px;font-weight:500;transition:background .15s,transform .1s;display:inline-block}
    .btn-p:hover{background:var(--gm);transform:translateY(-1px)}
    .btn-g{padding:12px 24px;border:.5px solid var(--bm);border-radius:30px;font-size:14px;color:var(--t2);transition:border-color .15s,color .15s;display:inline-block}
    .btn-g:hover{border-color:var(--g);color:var(--t)}
    /* HERO */
    .hero{padding:clamp(4rem,10vw,8rem) var(--pad) clamp(3rem,8vw,6rem);max-width:var(--max);margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
    .hero-hl{font-family:var(--sf);font-size:clamp(2.4rem,5vw,3.8rem);font-weight:200;line-height:1.15;color:var(--g);margin-bottom:1.5rem;letter-spacing:-.01em}
    .hero-hl em{font-style:italic;color:var(--gold)}
    .hero-body{font-size:16px;line-height:1.75;color:var(--t2);margin-bottom:2rem;max-width:44ch}
    .hero-acts{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
    .hero-card{background:var(--g);border-radius:16px;padding:2.5rem;color:var(--cr);position:relative;overflow:hidden}
    .hero-card::before{content:'';position:absolute;top:-40px;right:-40px;width:180px;height:180px;background:radial-gradient(circle,rgba(184,150,62,.25) 0%,transparent 70%);pointer-events:none}
    .hc-lbl{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);margin-bottom:1rem}
    .hc-name{font-family:var(--sf);font-size:2rem;font-weight:200;font-style:italic;margin-bottom:.5rem}
    .hc-range{font-size:12px;color:rgba(245,241,234,.5);margin-bottom:1.5rem;letter-spacing:.06em}
    .hc-div{height:.5px;background:rgba(245,241,234,.15);margin-bottom:1.5rem}
    .crow{display:flex;align-items:flex-start;gap:.75rem;font-size:12px;margin-bottom:.6rem}
    .cn{color:var(--gold);min-width:90px;font-weight:500}
    .cp{color:rgba(245,241,234,.55);line-height:1.5}
    .hc-btn{margin-top:1.75rem;padding:11px 0;width:100%;background:rgba(184,150,62,.18);border:.5px solid rgba(184,150,62,.4);border-radius:8px;color:var(--gold);font-size:13px;font-weight:500;transition:background .15s;cursor:pointer}
    .hc-btn:hover{background:rgba(184,150,62,.28)}
    @media(max-width:820px){.hero{grid-template-columns:1fr;gap:3rem}.hero-body{max-width:100%}}
    /* STRIP */
    .strip{border-top:.5px solid var(--b);border-bottom:.5px solid var(--b);background:var(--w);padding:1.25rem var(--pad)}
    .strip-i{max-width:var(--max);margin:0 auto;display:flex;align-items:center;gap:2.5rem;overflow-x:auto;scrollbar-width:none}
    .strip-i::-webkit-scrollbar{display:none}
    .stat{display:flex;align-items:center;gap:10px;white-space:nowrap;flex-shrink:0}
    .stat-n{font-family:var(--sf);font-size:1.5rem;font-weight:200;color:var(--gold)}
    .stat-l{font-size:11px;color:var(--t3);line-height:1.4}
    .sdot{width:3px;height:3px;border-radius:50%;background:var(--bm);flex-shrink:0}
    /* SECTIONS */
    .sec{padding:clamp(4rem,8vw,7rem) var(--pad);max-width:var(--max);margin:0 auto}
    .sec-title{font-family:var(--sf);font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:200;line-height:1.2;color:var(--g);max-width:22ch;margin-top:.75rem}
    .sec-title em{font-style:italic;color:var(--gold)}
    .sec-body{font-size:16px;line-height:1.8;color:var(--t2);max-width:60ch;margin-top:1rem}
    /* SCIENCE GRID */
    .sci-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--b);border:1px solid var(--b);border-radius:12px;overflow:hidden;margin-top:3rem}
    .sci-cell{background:var(--w);padding:2rem 1.75rem;transition:background .15s}
    .sci-cell:hover{background:var(--gp)}
    .sci-icon{font-size:1.5rem;margin-bottom:1rem}
    .sci-t{font-family:var(--sf);font-size:1.1rem;font-weight:300;color:var(--g);margin-bottom:.5rem}
    .sci-b{font-size:13px;line-height:1.7;color:var(--t3)}
    .sci-c{display:inline-block;margin-top:.75rem;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);font-weight:500}
    @media(max-width:720px){.sci-grid{grid-template-columns:1fr}}
    /* STATES */
    .states-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--b);border:1px solid var(--b);border-radius:12px;overflow:hidden;margin-top:3rem}
    .state-cell{background:var(--w);padding:2rem 1.5rem;text-align:center;transition:background .15s;cursor:pointer}
    .state-cell:hover{background:var(--gp)}
    .state-icon{font-size:1.8rem;margin-bottom:1rem}
    .state-name{font-family:var(--sf);font-size:1.2rem;font-weight:300;color:var(--g);margin-bottom:.5rem}
    .state-quote{font-size:12px;line-height:1.6;color:var(--t3);font-style:italic}
    @media(max-width:720px){.states-grid{grid-template-columns:1fr 1fr}}
    /* FORMULAS */
    .f-sec{background:var(--g);padding:clamp(4rem,8vw,7rem) var(--pad)}
    .f-inner{max-width:var(--max);margin:0 auto}
    .f-inner .eye{color:var(--gold);margin-bottom:.75rem}
    .f-title{font-family:var(--sf);font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:200;color:var(--cr);margin-bottom:.75rem}
    .f-sub{font-size:14px;color:rgba(245,241,234,.55);max-width:55ch;line-height:1.7;margin-bottom:3rem}
    .f-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1px;background:rgba(245,241,234,.08);border:1px solid rgba(245,241,234,.08);border-radius:12px;overflow:hidden}
    .f-card{background:rgba(245,241,234,.04);padding:1.75rem;transition:background .15s}
    .f-card:hover{background:rgba(245,241,234,.08)}
    .f-code{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);margin-bottom:.5rem}
    .f-name{font-family:var(--sf);font-size:1.35rem;font-weight:200;font-style:italic;color:var(--cr);margin-bottom:.35rem}
    .f-range{font-size:11px;color:rgba(245,241,234,.4);letter-spacing:.06em;margin-bottom:1rem}
    .f-desc{font-size:13px;line-height:1.65;color:rgba(245,241,234,.6)}
    .f-mech{margin-top:1rem;padding-top:1rem;border-top:.5px solid rgba(245,241,234,.1);font-size:11px;color:rgba(184,150,62,.7);line-height:1.6}
    /* QUIZ */
    .quiz-card{background:var(--w);border:.5px solid var(--b);border-radius:16px;overflow:hidden;display:grid;grid-template-columns:1fr 1fr;margin-top:0}
    .quiz-l{padding:3rem;background:var(--gp);border-right:.5px solid var(--b)}
    .quiz-l .eye{margin-bottom:1rem}
    .quiz-title{font-family:var(--sf);font-size:clamp(1.6rem,3vw,2.4rem);font-weight:200;line-height:1.25;color:var(--g);margin-bottom:1rem}
    .quiz-body{font-size:14px;line-height:1.75;color:var(--t2);margin-bottom:2rem}
    .chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:2rem}
    .chip{padding:5px 12px;border:.5px solid var(--bm);border-radius:20px;font-size:11px;color:var(--t3);background:var(--w)}
    .quiz-r{padding:3rem;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}
    .quiz-vis{width:80px;height:80px;border-radius:50%;background:var(--cr);border:.5px solid var(--b);display:flex;align-items:center;justify-content:center;font-size:2rem;margin-bottom:1.5rem}
    .quiz-rt{font-family:var(--sf);font-size:1.4rem;font-weight:300;color:var(--g);margin-bottom:.75rem}
    .quiz-rb{font-size:13px;color:var(--t3);line-height:1.65;margin-bottom:1.75rem}
    @media(max-width:720px){.quiz-card{grid-template-columns:1fr}.quiz-l{border-right:none;border-bottom:.5px solid var(--b);padding:2rem}.quiz-r{padding:2rem}}
    /* SHOP */
    .shop-sec{background:var(--cd);border-top:.5px solid var(--b);border-bottom:.5px solid var(--b);padding:clamp(4rem,8vw,7rem) var(--pad)}
    .shop-i{max-width:var(--max);margin:0 auto}
    .shop-i .eye{margin-bottom:.75rem}
    .shop-title{font-family:var(--sf);font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:200;color:var(--g);margin-bottom:.75rem}
    .shop-sub{font-size:15px;color:var(--t2);max-width:58ch;line-height:1.75;margin-bottom:3rem}
    .shop-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:16px;margin-bottom:2.5rem}
    .shop-card{background:var(--w);border:.5px solid var(--b);border-radius:12px;overflow:hidden;transition:border-color .15s,transform .15s}
    .shop-card:hover{border-color:var(--gold);transform:translateY(-2px)}
    .shop-img{height:160px;background:var(--g);display:flex;align-items:center;justify-content:center;font-size:3rem;position:relative;overflow:hidden}
    .shop-img::after{content:'';position:absolute;inset:0;background:radial-gradient(circle at 30% 70%,rgba(184,150,62,.2) 0%,transparent 60%)}
    .shop-body{padding:1.25rem}
    .shop-cat{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:.35rem}
    .shop-name{font-family:var(--sf);font-size:1.05rem;font-weight:300;color:var(--g);margin-bottom:.35rem}
    .shop-desc{font-size:12px;color:var(--t3);line-height:1.55;margin-bottom:1rem}
    .shop-foot{display:flex;align-items:center;justify-content:space-between;padding-top:.75rem;border-top:.5px solid var(--b);margin-top:.75rem}
    .shop-price{font-size:14px;font-weight:500;color:var(--g)}
    .shop-btn{padding:7px 16px;background:var(--g);color:var(--cr);border-radius:20px;font-size:12px;font-weight:500;transition:background .12s;display:inline-block}
    .shop-btn:hover{background:var(--gm)}
    .shop-note{font-size:12px;color:var(--t3);font-style:italic;padding:1rem 1.25rem;background:var(--w);border:.5px solid var(--b);border-radius:8px;line-height:1.65}
    /* GIFTS */
    .gift-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;margin-top:2.5rem}
    .gift-card{padding:1.25rem;border:.5px solid var(--b);border-radius:var(--r);background:var(--w);transition:border-color .15s}
    .gift-card:hover{border-color:var(--gold)}
    .gift-occ{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);margin-bottom:.4rem}
    .gift-name{font-family:var(--sf);font-size:1rem;font-weight:300;color:var(--g);margin-bottom:.3rem}
    .gift-hook{font-size:12px;color:var(--t3);font-style:italic;line-height:1.5}
    /* PERI */
    .peri-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px;margin-top:2.5rem}
    .peri-card{padding:1.75rem;border:.5px solid var(--b);border-radius:12px;background:var(--w);transition:border-color .15s}
    .peri-card:hover{border-color:var(--gold)}
    .peri-sym{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:.5rem}
    .peri-f{font-family:var(--sf);font-size:1.2rem;font-weight:300;font-style:italic;color:var(--g);margin-bottom:.4rem}
    .peri-d{font-size:13px;color:var(--t3);line-height:1.6;margin-bottom:1rem}
    .peri-p{font-size:11px;color:var(--t2);padding:.6rem .75rem;background:var(--cr);border-radius:6px;line-height:1.55}
    /* FOUNDER */
    .founder-sec{background:var(--g);padding:clamp(4rem,8vw,7rem) var(--pad)}
    .founder-i{max-width:var(--max);margin:0 auto;display:grid;grid-template-columns:1fr 1.5fr;gap:4rem;align-items:center}
    .founder-i .eye{color:var(--gold);margin-bottom:1rem}
    .founder-t{font-family:var(--sf);font-size:clamp(1.8rem,3vw,2.6rem);font-weight:200;color:var(--cr);line-height:1.2;margin-bottom:1.5rem}
    .founder-b{font-size:15px;line-height:1.8;color:rgba(245,241,234,.65);margin-bottom:1.25rem}
    .founder-sig{font-family:var(--sf);font-size:1.1rem;font-style:italic;color:var(--gold)}
    .principle{padding:2rem;border:.5px solid rgba(245,241,234,.15);border-radius:12px;border-left:3px solid var(--gold)}
    .principle-lbl{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);margin-bottom:.75rem}
    .principle-txt{font-family:var(--sf);font-size:1.3rem;font-weight:200;font-style:italic;color:var(--cr);line-height:1.5}
    @media(max-width:720px){.founder-i{grid-template-columns:1fr;gap:2.5rem}}
    /* WAITLIST */
    .wl-sec{padding:clamp(4rem,8vw,7rem) var(--pad);max-width:680px;margin:0 auto;text-align:center}
    .wl-sec .eye{margin-bottom:1rem}
    .wl-title{font-family:var(--sf);font-size:clamp(1.8rem,4vw,2.8rem);font-weight:200;line-height:1.2;color:var(--g);margin-bottom:1rem}
    .wl-body{font-size:15px;color:var(--t2);line-height:1.75;margin-bottom:2rem}
    .wl-form{display:flex;gap:10px;max-width:440px;margin:0 auto 1rem}
    .wl-in{flex:1;padding:13px 16px;border:.5px solid var(--bm);border-radius:30px;background:var(--w);font-family:var(--ss);font-size:14px;color:var(--t);outline:none;transition:border-color .15s;-webkit-appearance:none}
    .wl-in:focus{border-color:var(--gold)}
    .wl-in::placeholder{color:var(--t3)}
    .wl-sub{padding:13px 24px;background:var(--g);color:var(--cr);border-radius:30px;font-size:14px;font-weight:500;transition:background .15s;white-space:nowrap;cursor:pointer;border:none;font-family:var(--ss)}
    .wl-sub:hover{background:var(--gm)}
    .wl-note{font-size:11px;color:var(--t3)}
    .wl-ok{display:none;font-size:14px;color:#5a8a5a;padding:12px 20px;background:rgba(90,138,90,.1);border-radius:8px;max-width:440px;margin:0 auto}
    @media(max-width:480px){.wl-form{flex-direction:column}.wl-in,.wl-sub{width:100%}}
    /* FOOTER */
    footer{background:var(--g);padding:3rem var(--pad) 2rem}
    .ft-i{max-width:var(--max);margin:0 auto}
    .ft-top{display:grid;grid-template-columns:2fr 1fr 1fr;gap:3rem;padding-bottom:2rem;border-bottom:.5px solid rgba(245,241,234,.1);margin-bottom:1.5rem}
    .ft-brand{font-family:var(--sf);font-size:1.1rem;font-weight:300;letter-spacing:.12em;text-transform:uppercase;color:var(--cr);margin-bottom:.75rem}
    .ft-tag{font-size:13px;color:rgba(245,241,234,.45);line-height:1.65;max-width:32ch}
    .ft-ct{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);margin-bottom:1rem}
    .ft-links{list-style:none;display:flex;flex-direction:column;gap:.6rem}
    .ft-links a{font-size:13px;color:rgba(245,241,234,.5);transition:color .15s}
    .ft-links a:hover{color:var(--cr)}
    .ft-bot{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem}
    .ft-leg{font-size:11px;color:rgba(245,241,234,.3)}
    @media(max-width:680px){.ft-top{grid-template-columns:1fr;gap:2rem}}
    /* ANIMATIONS */
    .fu{opacity:0;transform:translateY(20px);transition:opacity .6s ease,transform .6s ease}
    .fu.vis{opacity:1;transform:translateY(0)}
    @media(prefers-reduced-motion:reduce){.fu{opacity:1;transform:none;transition:none}}
  </style>
</head>
<body>

<div class="ann">🌿 Early access open — <a href="#waitlist">join the waitlist</a> and be first when we launch</div>

<nav class="nav" role="navigation" aria-label="Main">
  <div class="nav-i">
    <a href="/" class="nav-brand" aria-label="Sana Essencia home">Sana Essencia<sup style="font-size:8px;letter-spacing:0;vertical-align:super">&trade;</sup></a>
    <ul class="nav-links" role="list">
      <li><a href="#science">The Science</a></li>
      <li><a href="#formulas">Formulas</a></li>
      <li><a href="#shop">Shop</a></li>
      <li><a href="#gifts">Gifts</a></li>
      <li><a href="#perimenopause">Equilibrium Edit</a></li>
      <li><a href="#about">About</a></li>
    </ul>
    <a href="SE-equilibrium-quiz-v2.html" class="nav-cta">Start assessment</a>
    <button class="nav-btn" aria-label="Toggle menu" aria-expanded="false" onclick="toggleNav(this)">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div class="mob-nav" id="mob-nav">
    <a href="#science" onclick="closeMob()">The Science</a>
    <a href="#formulas" onclick="closeMob()">Formulas</a>
    <a href="#shop" onclick="closeMob()">Shop</a>
    <a href="#gifts" onclick="closeMob()">Gifts</a>
    <a href="#perimenopause" onclick="closeMob()">Equilibrium Edit</a>
    <a href="#about" onclick="closeMob()">About</a>
    <a href="SE-equilibrium-quiz-v2.html" class="mob-cta">Start assessment →</a>
  </div>
</nav>

<!-- HERO -->
<section aria-label="Introduction">
  <div class="hero">
    <div class="fu">
      <p class="eye" style="margin-bottom:1.5rem">Neuro-aromachology · Sana Essencia&trade;</p>
      <h1 class="hero-hl">Your nervous system<br>is trying to tell you<br><em>something.</em></h1>
      <p class="hero-body">Some days you can't focus. Some evenings you can't switch off. Sometimes you don't quite feel like yourself. Your sense of smell reaches the part of your brain that runs your mood, stress, and focus faster than any other sense. Start with a 2-minute assessment — no products, no pressure, just the science of your state.</p>
      <div class="hero-acts">
        <a href="SE-equilibrium-quiz-v2.html" class="btn-p">Start the assessment →</a>
        <a href="#science" class="btn-g">Why scent?</a>
      </div>
    </div>
    <div class="fu" style="transition-delay:.15s">
      <div class="hero-card">
        <div class="hc-lbl">Sample result · Cognitive Regulation</div>
        <div class="hc-name">Acuity Strike</div>
        <div class="hc-range">SE-N5 · Lemon + Rosemary</div>
        <div class="hc-div"></div>
        <div class="crow"><span class="cn">Limonene</span><span class="cp">→ dopaminergic signalling → directed attention</span></div>
        <div class="crow"><span class="cn">Beta-pinene</span><span class="cp">→ noradrenergic pathway → sustained focus</span></div>
        <div class="crow"><span class="cn">1,8-Cineole</span><span class="cp">→ AChE inhibition → acetylcholine availability</span></div>
        <button class="hc-btn" onclick="window.location.href='sana-essencia-advisor.html'">Get your personalised formula →</button>
      </div>
    </div>
  </div>
</section>

<!-- STRIP -->
<div class="strip" aria-label="Key facts">
  <div class="strip-i">
    <div class="stat"><span class="stat-n">7</span><span class="stat-l">Documented<br>formulas</span></div>
    <div class="sdot"></div>
    <div class="stat"><span class="stat-n">25+</span><span class="stat-l">Peer-reviewed<br>citations</span></div>
    <div class="sdot"></div>
    <div class="stat"><span class="stat-n">20</span><span class="stat-l">Minutes to feel<br>the difference</span></div>
    <div class="sdot"></div>
    <div class="stat"><span class="stat-n">5</span><span class="stat-l">Personalised<br>profiles</span></div>
    <div class="sdot"></div>
    <div class="stat"><span class="stat-n" style="font-family:var(--sf);font-style:italic;font-size:1.1rem;padding-top:3px">"Mechanism<br>or nothing"</span><span class="stat-l">— our founding<br>standard</span></div>
  </div>
</div>

<!-- SCIENCE -->
<section id="science" aria-labelledby="sci-h">
  <div class="sec">
    <div class="fu">
      <p class="eye">How it works</p>
      <h2 class="sec-title" id="sci-h">The olfactory pathway is the fastest route to your <em>limbic system.</em></h2>
      <p class="sec-body">When you inhale a scent compound, it binds to olfactory receptors in the nasal epithelium and sends signals directly to the limbic system — bypassing the cortex entirely. This is why scent affects mood, stress, and cognitive state faster than almost any other sensory input. There is no rational filter between the nose and the nervous system.</p>
    </div>
    <div class="sci-grid fu">
      <div class="sci-cell"><div class="sci-icon">🫁</div><div class="sci-t">Inhalation</div><div class="sci-b">Volatile aromatic compounds bind to olfactory receptor neurons in the nasal mucosa within seconds of inhalation.</div><span class="sci-c">Nasal epithelium → OR neurons</span></div>
      <div class="sci-cell"><div class="sci-icon">⚡</div><div class="sci-t">Signal</div><div class="sci-b">Receptor activation triggers signals directly to the limbic system — amygdala, hippocampus, hypothalamus — bypassing cortical processing.</div><span class="sci-c">Olfactory bulb → Limbic system</span></div>
      <div class="sci-cell"><div class="sci-icon">🧬</div><div class="sci-t">Effect</div><div class="sci-b">Limbic activation modulates cortisol, GABA, dopamine, and serotonin — producing measurable changes in stress, focus, and mood within 10–20 minutes.</div><span class="sci-c">Cortisol · GABA · Dopamine · Serotonin</span></div>
    </div>
  </div>
</section>

<!-- STATES -->
<section id="states" aria-labelledby="states-h">
  <div class="sec">
    <div class="fu">
      <p class="eye">Where to begin</p>
      <h2 class="sec-title" id="states-h">Four ways your nervous system <em>asks for help.</em></h2>
      <p class="sec-body">You don't wake up thinking "I need lavender." You wake up thinking "I can't focus" or "I can't switch off." Start with the state you're in — the assessment does the rest.</p>
    </div>
    <div class="states-grid fu">
      <a href="SE-equilibrium-quiz-v2.html" class="state-cell">
        <div class="state-icon">⚡</div>
        <div class="state-name">Focus</div>
        <div class="state-quote">"I lose concentration during the day."</div>
      </a>
      <a href="SE-equilibrium-quiz-v2.html" class="state-cell">
        <div class="state-icon">🌊</div>
        <div class="state-name">Reset</div>
        <div class="state-quote">"I can't switch off after work."</div>
      </a>
      <a href="SE-equilibrium-quiz-v2.html" class="state-cell">
        <div class="state-icon">🕯️</div>
        <div class="state-name">Connection</div>
        <div class="state-quote">"I want to feel closer to my partner."</div>
      </a>
      <a href="SE-equilibrium-quiz-v2.html" class="state-cell">
        <div class="state-icon">🌙</div>
        <div class="state-name">Recovery</div>
        <div class="state-quote">"I need better, more consistent rest."</div>
      </a>
    </div>
    <div style="margin-top:2rem;text-align:center">
      <a href="SE-equilibrium-quiz-v2.html" class="btn-p">Start the assessment →</a>
    </div>
  </div>
</section>

<!-- FORMULAS -->
<section id="formulas" aria-labelledby="form-h">
  <div class="f-sec">
    <div class="f-inner">
      <p class="eye">The catalogue</p>
      <h2 class="f-title" id="form-h">Seven formulas. Seven receptor pathways. One standard.</h2>
      <p class="f-sub">Every compound in every formula traces to a named receptor. Every receptor traces to a documented effect. Every effect traces to a peer-reviewed study.</p>
      <div class="f-grid fu">
        <div class="f-card"><div class="f-code">SE-N1 · Equilibrium</div><div class="f-name">Nexus Baseline</div><div class="f-range">Lavender dominant</div><div class="f-desc">Anxiety, hormonal restlessness, high stress. The grounding formula.</div><div class="f-mech">Linalool → GABA-A receptor → anxiolytic, cortisol reduction</div></div>
        <div class="f-card"><div class="f-code">SE-N2 · Equilibrium</div><div class="f-name">Nexus Thermal Reset</div><div class="f-range">Eucalyptus + Peppermint</div><div class="f-desc">Hot flushes, overheating, afternoon fatigue. The cooling formula.</div><div class="f-mech">1,8-Cineole → TRPM8 channel → thermal relief, alertness</div></div>
        <div class="f-card"><div class="f-code">SE-N3 · Cognitive Regulation</div><div class="f-name">Aurora Rise</div><div class="f-range">Bergamot FCF + Rosemary</div><div class="f-desc">Low mood, depleted energy, need to perform. The lift formula.</div><div class="f-mech">Linalyl acetate → serotonergic modulation + 1,8-cineole → AChE inhibition</div></div>
        <div class="f-card"><div class="f-code">SE-N4 · Olfactory Restoration</div><div class="f-name">Noct Descent</div><div class="f-range">Clary Sage + Frankincense</div><div class="f-desc">Evening wind-down, sleep preparation, high stress. The restoration formula.</div><div class="f-mech">Sclareol → GABAergic pathway + Incensole acetate → CB1 receptor</div></div>
        <div class="f-card"><div class="f-code">SE-N5 · Cognitive Regulation</div><div class="f-name">Acuity Strike</div><div class="f-range">Lemon + Rosemary</div><div class="f-desc">Brain fog, scattered energy, cognitive demand. The focus formula.</div><div class="f-mech">Limonene + Beta-pinene → dopaminergic signalling → directed attention</div></div>
        <div class="f-card"><div class="f-code">SE-N6 · Equilibrium Intimate</div><div class="f-name">Vinculum</div><div class="f-range">Jasmine + Bergamot + Sandalwood</div><div class="f-desc">Connection, intimacy, shared calm. The couples formula.</div><div class="f-mech">Hedione → VN1R1 pheromone receptor → social trust + bonding</div></div>
        <div class="f-card"><div class="f-code">SE-N7 · Olfactory Restoration</div><div class="f-name">Vela</div><div class="f-range">Orange + Bergamot + Cedarwood + Vetiver</div><div class="f-desc">Mental load, overwhelm, end-of-day transition. The permission formula.</div><div class="f-mech">Cedrol → autonomic regulation + Linalool → SNS suppression</div></div>
      </div>
    </div>
  </div>
</section>

<!-- QUIZ -->
<section id="quiz" aria-labelledby="quiz-h">
  <div class="sec">
    <div class="quiz-card fu">
      <div class="quiz-l">
        <p class="eye">The Equilibrium Quiz</p>
        <h2 class="quiz-title" id="quiz-h">Eight questions. A formula matched to you.</h2>
        <p class="quiz-body">Tell us where you are right now — your energy, stress, time of day, and what you need. The quiz recommends your formula with the receptor-pathway science behind it. No jargon. No wellness clichés.</p>
        <div class="chips">
          <span class="chip">❄️ Thermal Reset</span>
          <span class="chip">🌿 Hormone Balance</span>
          <span class="chip">🕯️ Connection</span>
          <span class="chip">⚡ Focus</span>
          <span class="chip">🌊 Decompression</span>
        </div>
        <a href="SE-equilibrium-quiz-v2.html" class="btn-p">Take the quiz →</a>
      </div>
      <div class="quiz-r">
        <div class="quiz-vis">🎁</div>
        <div class="quiz-rt">Also for gifting</div>
        <p class="quiz-rb">Taking it for someone else? The quiz has a gifting path. Build a personalised protocol for your partner, friend, or colleague — with science they'll actually understand.</p>
        <a href="SE-equilibrium-quiz-v2.html" class="btn-g">Find a gift protocol →</a>
      </div>
    </div>
  </div>
</section>

<!-- SHOP -->
<section id="shop" aria-labelledby="shop-h">
  <div class="shop-sec">
    <div class="shop-i">
      <p class="eye">The Vector Collection</p>
      <h2 class="shop-title" id="shop-h">Your formula needs a home.</h2>
      <p class="shop-sub">We've curated lava stone vectors, diffuser carriers, and protocol accessories — each chosen for its mechanism, not its marketing. Shop now, add formula when ready.</p>
      <div class="shop-grid fu">
        <div class="shop-card">
          <div class="shop-img">🪨</div>
          <div class="shop-body">
            <div class="shop-cat">Portable Vector</div>
            <div class="shop-name">Lava Stone Diffuser Bracelet</div>
            <div class="shop-desc">Porous volcanic basalt. Absorbs your formula and releases it steadily for 4–8 hours. The wearable protocol.</div>
            <div class="shop-foot"><span class="shop-price">£16.99</span><a href="https://sanaessencia.myshopify.com" target="_blank" rel="noopener" class="shop-btn">Shop now</a></div>
          </div>
        </div>
        <div class="shop-card">
          <div class="shop-img">🔗</div>
          <div class="shop-body">
            <div class="shop-cat">Portable Vector</div>
            <div class="shop-name">Stainless Steel Diffuser Locket</div>
            <div class="shop-desc">Absorbent felt pad with ventilation openings. Continuous olfactory signal at chest level for up to 8 hours.</div>
            <div class="shop-foot"><span class="shop-price">£19.99</span><a href="https://sanaessencia.myshopify.com" target="_blank" rel="noopener" class="shop-btn">Shop now</a></div>
          </div>
        </div>
        <div class="shop-card">
          <div class="shop-img">🗝️</div>
          <div class="shop-body">
            <div class="shop-cat">Secret Santa · Under £10</div>
            <div class="shop-name">Lava Stone Keyring</div>
            <div class="shop-desc">One drop. Clip to your keys. Decompress on the commute home. The pocket protocol.</div>
            <div class="shop-foot"><span class="shop-price">£8.99</span><a href="https://sanaessencia.myshopify.com" target="_blank" rel="noopener" class="shop-btn">Shop now</a></div>
          </div>
        </div>
        <div class="shop-card">
          <div class="shop-img">💊</div>
          <div class="shop-body">
            <div class="shop-cat">Perimenopause Support</div>
            <div class="shop-name">MENOstage Herbal Support</div>
            <div class="shop-desc">Soya isoflavones and women's herbs. EFSA-approved health claims. Pairs with your Equilibrium formula protocol.</div>
            <div class="shop-foot"><span class="shop-price">£18.99</span><a href="https://sanaessencia.myshopify.com" target="_blank" rel="noopener" class="shop-btn">Shop now</a></div>
          </div>
        </div>
      </div>
      <p class="shop-note">Your order may arrive in separate parcels from our fulfilment partners. Your Sana Essencia protocol cards and personal items are packed and dispatched by our founder from Basingstoke. <a href="#about" style="color:var(--gold)">Why we work this way →</a></p>
    </div>
  </div>
</section>

<!-- GIFTS -->
<section id="gifts" aria-labelledby="gifts-h">
  <div class="sec">
    <div class="fu">
      <p class="eye">For every occasion</p>
      <h2 class="sec-title" id="gifts-h">A gift with a story the giver can <em>tell.</em></h2>
      <p class="sec-body">Every Sana Essencia gift set contains a formula, a vector, and a protocol card — the science and the instructions. That's what makes it memorable.</p>
    </div>
    <div class="gift-grid fu">
      <div class="gift-card"><div class="gift-occ">Valentine's Day</div><div class="gift-name">Vinculum Connection Set</div><div class="gift-hook">"The science of connection. Given with intention."</div></div>
      <div class="gift-card"><div class="gift-occ">Mother's Day</div><div class="gift-name">Vela Decompression Set</div><div class="gift-hook">"For the woman who carries everything. Permission to put it down."</div></div>
      <div class="gift-card"><div class="gift-occ">Graduation</div><div class="gift-name">Acuity Strike Focus Set</div><div class="gift-hook">"The next chapter starts here. Your focus protocol."</div></div>
      <div class="gift-card"><div class="gift-occ">Work Promotion</div><div class="gift-name">Aurora Rise Leadership Set</div><div class="gift-hook">"For the leader you're becoming."</div></div>
      <div class="gift-card"><div class="gift-occ">Secret Santa · Under £10</div><div class="gift-name">The Desk Reset Keyring</div><div class="gift-hook">"Add one drop. Decompress on the way home."</div></div>
      <div class="gift-card"><div class="gift-occ">Perimenopause Support</div><div class="gift-name">The Equilibrium Edit Set</div><div class="gift-hook">"I thought of you. Because I know what you're carrying."</div></div>
      <div class="gift-card"><div class="gift-occ">New Parent</div><div class="gift-name">Vela Recovery Set</div><div class="gift-hook">"Not a baby gift. A gift for you."</div></div>
      <div class="gift-card"><div class="gift-occ">Corporate · Bulk orders</div><div class="gift-name">Workplace Wellbeing Pack</div><div class="gift-hook">"From £6.99 per unit." Enquire: hello@sanaessencia.co.uk</div></div>
    </div>
    <div style="margin-top:2rem"><a href="https://sanaessencia.myshopify.com" target="_blank" rel="noopener" class="btn-p">Shop all gift sets →</a></div>
  </div>
</section>

<!-- PERIMENOPAUSE -->
<section id="perimenopause" aria-labelledby="peri-h">
  <div class="sec" style="background:var(--cr)">
    <div class="fu">
      <p class="eye">The Equilibrium Edit</p>
      <h2 class="sec-title" id="peri-h">For the perimenopause transition — <em>scent that works with your biology.</em></h2>
      <p class="sec-body">Perimenopause isn't a malfunction. It's a transition with specific neurological and hormonal signatures. Our formulas are matched to those signatures.</p>
    </div>
    <div class="peri-grid fu">
      <div class="peri-card"><div class="peri-sym">Hot flushes · Night sweats</div><div class="peri-f">Nexus Thermal Reset</div><div class="peri-d">1,8-Cineole activates TRPM8 cold receptors, producing a measurable cooling sensation. Menthol stimulates the trigeminal nerve for instant thermal relief.</div><div class="peri-p">Pairs with: Lava stone bracelet · Magnesium menopause spray</div></div>
      <div class="peri-card"><div class="peri-sym">Low mood · Hormonal fog</div><div class="peri-f">Aurora Rise</div><div class="peri-d">Linalyl acetate from bergamot FCF modulates serotonergic signalling. 1,8-cineole from rosemary sustains acetylcholine for focus and mood stabilisation.</div><div class="peri-p">Pairs with: Diffuser locket · MENOstage herbal support</div></div>
      <div class="peri-card"><div class="peri-sym">Sleep disruption · Anxiety</div><div class="peri-f">Noct Descent</div><div class="peri-d">Sclareol from clary sage modulates the GABAergic pathway. Incensole acetate from frankincense activates CB1 receptors — reducing cortisol and neural hyperactivity.</div><div class="peri-p">Pairs with: Lava stone bracelet · Nexus Baseline (layered)</div></div>
      <div class="peri-card"><div class="peri-sym">Mental load · Overwhelm</div><div class="peri-f">Vela</div><div class="peri-d">Cedrol from cedarwood Atlas regulates the autonomic nervous system — grounding without drowsing. Linalool suppresses the sympathetic nervous system without sedation.</div><div class="peri-p">Pairs with: Lava stone bracelet · Used at 5–8pm daily</div></div>
    </div>
    <div style="margin-top:2rem"><a href="SE-equilibrium-quiz-v2.html" class="btn-p">Take the Equilibrium Quiz →</a></div>
  </div>
</section>

<!-- FOUNDER -->
<section id="about" aria-labelledby="about-h">
  <div class="founder-sec">
    <div class="founder-i">
      <div>
        <p class="eye">About Sana Essencia</p>
        <h2 class="founder-t" id="about-h">Built by a science translator. Not a scientist. Not a marketer.</h2>
        <p class="founder-b">Sana Essencia began with a single question: why do we trust wellness products that have no mechanism? Every product on this market is sold on tradition or feeling. None of them show you the receptor.</p>
        <p class="founder-b">My standard is simple: mechanism or nothing. If I cannot name the compound, identify the receptor, and cite a peer-reviewed study — that compound does not go in the formula.</p>
        <p class="founder-b">Incorporated June 2026. Building toward a pre-Christmas 2027 full product launch, self-funded, from Basingstoke, Hampshire.</p>
        <p class="founder-sig">— Patricia Cruz, Founder</p>
      </div>
      <div class="principle fu">
        <div class="principle-lbl">Our founding standard</div>
        <div class="principle-txt">"Every active compound in every Sana Essencia formula traces to a named receptor, a documented pathway, and a peer-reviewed citation. This is our founding commitment. It will not change."</div>
      </div>
    </div>
  </div>
</section>

<!-- WAITLIST -->
<section id="waitlist" aria-labelledby="wl-h">
  <div class="wl-sec">
    <p class="eye">Join the waitlist</p>
    <h2 class="wl-title" id="wl-h">Be first when we launch.</h2>
    <p class="wl-body">The Nexus 20 desk diffuser and full formula range launch in late 2026. Join the waitlist and receive your protocol guide, science updates, and early access before anyone else.</p>
    <form class="wl-form" onsubmit="submitWL(event)">
      <input type="email" class="wl-in" id="wl-email" placeholder="your@email.com" required aria-label="Email address" />
      <button type="submit" class="wl-sub">Join waitlist</button>
    </form>
    <div class="wl-ok" id="wl-ok">✓ You're on the list. We'll be in touch before launch.</div>
    <p class="wl-note">No spam, ever. Unsubscribe any time. Held under UK GDPR by Sana Essencia Ltd.</p>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="ft-i">
    <div class="ft-top">
      <div>
        <div class="ft-brand">Sana Essencia</div>
        <p class="ft-tag">Neuro-aromachology for the modern woman. Mechanism or nothing.</p>
      </div>
      <div>
        <div class="ft-ct">Navigate</div>
        <ul class="ft-links">
          <li><a href="#science">The Science</a></li>
          <li><a href="#formulas">Formulas</a></li>
          <li><a href="#shop">Shop</a></li>
          <li><a href="#gifts">Gifts</a></li>
          <li><a href="#perimenopause">Equilibrium Edit</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </div>
      <div>
        <div class="ft-ct">Tools</div>
        <ul class="ft-links">
          <li><a href="sana-essencia-advisor.html">Protocol Advisor</a></li>
          <li><a href="SE-equilibrium-quiz-v2.html">Equilibrium Quiz</a></li>
          <li><a href="https://sanaessencia.myshopify.com" target="_blank" rel="noopener">Shop</a></li>
          <li><a href="mailto:hello@sanaessencia.co.uk">hello@sanaessencia.co.uk</a></li>
        </ul>
      </div>
    </div>
    <div class="ft-bot">
      <p class="ft-leg">© 2026 Sana Essencia Ltd · Company No. 17298884 · Basingstoke, Hampshire</p>
      <p class="ft-leg">Not medical advice · UK Registered</p>
    </div>
  </div>
</footer>

<script>
function toggleNav(btn){const n=document.getElementById('mob-nav');const o=n.classList.toggle('open');btn.setAttribute('aria-expanded',o)}
function closeMob(){document.getElementById('mob-nav').classList.remove('open')}
const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');obs.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll('.fu').forEach(el=>obs.observe(el));
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const id=a.getAttribute('href').slice(1);const t=document.getElementById(id);if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'})}})});
async function submitWL(e){
  e.preventDefault();
  const em=document.getElementById('wl-email').value.trim();
  if(!em)return;
  const btn=e.target.querySelector('button');
  btn.textContent='Joining...';btn.disabled=true;
  try{await fetch('https://formspree.io/f/xqeowqqp',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({email:em,source:'Homepage waitlist',_subject:'New Sana Essencia waitlist signup'})})}catch(err){}
  e.target.style.display='none';
  document.getElementById('wl-ok').style.display='block';
}
</script>
</body>
</html>
