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
.wl-ok{font-size:14px;color:#5a8a5a;padding:12px 20px;background:rgba(90,138,90,.1);border-radius:8px;max-width:440px;margin:0 auto}
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
