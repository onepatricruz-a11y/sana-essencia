/* Scent Ledger, by Sana Essencia */
(function(){
"use strict";
var CHECKED = "7 November 2026";

/* ---------- Official sources ---------- */
var SRC = {
  clp:{short:"GB CLP · 1272/2008", name:"GB CLP Regulation (EC) No 1272/2008, as it applies in Great Britain", url:"https://www.legislation.gov.uk/eur/2008/1272/contents"},
  hselabel:{short:"HSE · hazard label", name:"HSE: Telling others about the classification: the hazard label", url:"https://www.hse.gov.uk/chemical-classification/labelling-packaging/telling-others-classification-hazard-label.htm"},
  gpsr:{short:"GPSR 2005 · SI 2005/1803", name:"General Product Safety Regulations 2005", url:"https://www.legislation.gov.uk/uksi/2005/1803/contents"},
  bcf:{short:"BCF advice pack 2024", name:"British Candle Makers Federation: candle advice pack (2024)", url:"https://www.britishcandles.org/documents/www.britishcandles.org/Advice_Sheet_2024/candlesadvicepack(2024).pdf"},
  food:{short:"SI 1989/1291", name:"Food Imitations (Safety) Regulations 1989", url:"https://www.legislation.gov.uk/uksi/1989/1291/made"},
  lincs:{short:"Trading Standards · wax melts", name:"Lincolnshire Trading Standards: advice to wax melt sellers", url:"https://www.lincolnshire.gov.uk/news/article/465/lincolnshire-trading-standards-offers-advice-to-wax-melt-sellers"},
  aerosol:{short:"SI 2009/2824", name:"Aerosol Dispensers Regulations 2009", url:"https://www.legislation.gov.uk/uksi/2009/2824/contents"},
  biocides:{short:"HSE · biocides", name:"HSE: biocides (GB Biocidal Products Regulation)", url:"https://www.hse.gov.uk/biocides/"},
  cosmguide:{short:"UK Cosmetics Reg · 1223/2009", name:"GOV.UK: Regulation 1223/2009 and the Cosmetic Products Enforcement Regulations 2013 (Great Britain)", url:"https://www.gov.uk/government/publications/cosmetic-products-enforcement-regulations-2013/regulation-20091223-and-the-cosmetic-products-enforcement-regulations-2013-great-britain"},
  scpn:{short:"GOV.UK · SCPN", name:"GOV.UK: Submit a cosmetic product notification", url:"https://www.gov.uk/guidance/submit-a-cosmetic-product-notification"},
  asa:{short:"ASA · aromatherapy", name:"ASA advice: Health: Aromatherapy", url:"https://www.asa.org.uk/advice-online/health-aromatherapy.html"},
  asamed:{short:"ASA · medical conditions", name:"ASA advice: therapies and references to medical conditions", url:"https://www.asa.org.uk/advice-online/health-therapies-and-references-to-medical-conditions.html"},
  mhra:{short:"MHRA · borderline products", name:"MHRA: Borderline products: how to tell if your product is a medicine", url:"https://www.gov.uk/guidance/borderline-products-how-to-tell-if-your-product-is-a-medicine"},
  green:{short:"CMA · Green Claims Code", name:"CMA Green Claims Code: making environmental claims", url:"https://www.gov.uk/government/publications/make-a-green-claim/make-an-environmental-claim-for-your-product-service-or-organisation"},
  ccr:{short:"SI 2013/3134", name:"Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013", url:"https://www.legislation.gov.uk/uksi/2013/3134/contents"},
  dmcc:{short:"DMCC Act 2024 · Sch 20", name:"Digital Markets, Competition and Consumers Act 2024, Schedule 20 (banned practices)", url:"https://www.legislation.gov.uk/ukpga/2024/13/schedule/20"},
  cma207:{short:"CMA207", name:"CMA: Unfair commercial practices guidance (CMA207)", url:"https://assets.publishing.service.gov.uk/media/691b9bd821ef5aaa6543ee6f/Unfair_commercial_practices_CMA207_18_Nov_2025__2_.pdf"},
  bclogos:{short:"Business Companion · logos", name:"Business Companion: membership logos and claims of approval", url:"https://www.businesscompanion.info/en/quick-guides/good-practice/membership-logos-and-claims-of-approval"},
  gpsrni:{short:"GOV.UK · GPSR in NI", name:"GOV.UK: General Product Safety Regulation in Northern Ireland", url:"https://www.gov.uk/government/publications/general-product-safety-regulations-northern-ireland"},
  euallergens:{short:"EU 2023/1545", name:"Regulation (EU) 2023/1545 on fragrance allergen labelling", url:"https://eur-lex.europa.eu/eli/reg/2023/1545/oj"},
  pram:{short:"2025 c. 20", name:"Product Regulation and Metrology Act 2025", url:"https://www.legislation.gov.uk/ukpga/2025/20"},
  hmrcallow:{short:"GOV.UK · trading allowance", name:"GOV.UK: Tax-free allowances on property and trading income", url:"https://www.gov.uk/guidance/tax-free-allowances-on-property-and-trading-income"},
  hmrcse:{short:"GOV.UK · working for yourself", name:"GOV.UK: Working for yourself", url:"https://www.gov.uk/working-for-yourself"},
  elins:{short:"GOV.UK · employers' liability", name:"GOV.UK: Employers' liability insurance", url:"https://www.gov.uk/employers-liability-insurance"},
  hserisk:{short:"HSE · INDG163", name:"HSE: Risk assessment, a brief guide (INDG163)", url:"https://www.hse.gov.uk/pubns/indg163.pdf"},
  ico:{short:"ICO · data protection fee", name:"ICO: data protection fee", url:"https://ico.org.uk/for-organisations/data-protection-fee/"},
  buscomp:{short:"Business Companion", name:"Business Companion: free Trading Standards guidance", url:"https://www.businesscompanion.info"}
};

function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function cites(keys){
  if(!keys||!keys.length) return "";
  return '<span class="cites">'+keys.map(function(k){var s=SRC[k]; return s?'<a class="cite" href="'+s.url+'" target="_blank" rel="noopener" title="'+esc(s.name)+'">'+esc(s.short)+'</a>':"";}).join("")+'</span>';
}
function stamp(){return '<span class="stamp">Checked '+CHECKED+'</span>';}

/* ---------- Guides ---------- */
var GUIDES = {
  "candles":{
    title:"Candles", kicker:"Container candles, pillars and tealights",
    covers:"CLP · GPSR · BS EN 15494",
    card:"Labels, fire-safety warnings, burn testing and the records that prove it.",
    intro:"What UK law expects before you sell a scented or unscented candle, and the paperwork that shows you did it.",
    law:[
      {t:"Your candle must be safe in normal use, and you must give the warnings and information people need to use it safely.", src:["gpsr"]},
      {t:"If the finished scented wax is classified as hazardous, usually because of the fragrance, the candle needs a CLP hazard label. Classification depends on your fragrance and your fragrance load, so work it out for each product.", src:["clp","hselabel"]},
      {t:"Show your name and address and a product or batch reference, so a product can be traced and recalled if it has to be.", src:["gpsr"]}
    ],
    label:["Product name","Your business name, UK address and phone number","Net quantity (weight) when a CLP label applies","Hazard pictogram(s), signal word, hazard and precautionary statements, where the product is classified","The allergen line, for example “Contains linalool. May produce an allergic reaction.”","Fire-safety warnings to BS EN 15494, such as “Never leave a burning candle unattended”","Batch number"],
    records:["Safety data sheet (SDS) for every fragrance oil and dye","CLP calculation for each fragrance at the load you use","Burn-test results: melt pool, flame height, sooting and container temperature (BS EN 15493 and BS EN 15426 are the reference standards)","Batch records: date, wax and fragrance lot numbers, quantities","Supplier invoices"],
    mistakes:["Copying another maker’s CLP label. It only fits their fragrance at their load.","Going above your supplier’s maximum fragrance load for candles (IFRA category 12).","Hazard pictograms smaller than 1 cm², or out of proportion to the label.","Leaving off the phone number."],
    sources:["bcf","hselabel","clp","gpsr","buscomp"]
  },
  "wax-melts":{
    title:"Wax melts", kicker:"Snap bars, clamshells and shapes",
    covers:"CLP · GPSR · Food imitation",
    card:"Why most melts need a full CLP label, and the shapes and scent names to avoid.",
    intro:"Wax melts usually carry more fragrance than candles, so most need a full CLP label. Shapes and scent names that look edible are a separate legal risk.",
    law:[
      {t:"At the fragrance loads most makers use, wax melts are classified as hazardous and need a CLP label. Check each product against your fragrance’s SDS.", src:["clp","hselabel"]},
      {t:"Products that look like food and could be mistaken for it, especially by children, can be banned. Avoid sweet, cake and chocolate shapes, and wording that suggests they can be eaten.", src:["food","lincs"]},
      {t:"Wax melts must be safe and traceable, with your name, address and a batch reference.", src:["gpsr"]}
    ],
    label:["Product name and net weight","Your business name, UK address and phone number","CLP pictogram(s), signal word, hazard and precautionary statements","The allergen line where required","Use warnings, such as “Never leave a lit burner unattended” and “Keep out of reach of children and pets”","Batch number"],
    records:["SDS and CLP calculation for every fragrance and load","Batch records","A photo of each label version, with the date you started using it"],
    mistakes:["Giving away samples without labels. Free samples still need them.","Pictograms squeezed onto clamshell edges where nobody can read them.","Food-like shapes, or wording such as “good enough to eat”."],
    sources:["lincs","food","hselabel","clp"]
  },
  "diffusers":{
    title:"Reed diffusers", kicker:"Diffuser liquids and refills",
    covers:"CLP · child-resistant caps",
    card:"Flammability, aspiration hazards, child-resistant caps and tactile warnings.",
    intro:"Diffuser liquids often carry more hazard classes than candles. That can mean child-resistant caps and a raised warning triangle on the bottle.",
    law:[
      {t:"Diffuser liquids are mixtures, so they need a CLP label when classified. Bases and fragrances often bring flammability, irritation and aspiration hazards.", src:["clp","hselabel"]},
      {t:"Mixtures classified for some hazards, such as aspiration hazard (H304), need a child-resistant closure and a tactile warning of danger when sold to the public.", src:["clp"]},
      {t:"The product must be safe and traceable, with instructions for safe use.", src:["gpsr"]}
    ],
    label:["Full CLP label for the finished liquid","Your business name, UK address and phone number","Net volume","Instructions, such as “Place on a stable surface” and “Avoid contact with skin and polished surfaces”","Batch number"],
    records:["SDS for the diffuser base and every fragrance","CLP calculation for the finished mix","Your closure supplier’s child-resistance certificate, where one is needed"],
    mistakes:["Using the base supplier’s label without recalculating once fragrance is added.","A standard cap on a liquid that needs a child-resistant one.","No tactile triangle on a bottle that needs it."],
    sources:["hselabel","clp","gpsr"]
  },
  "sprays":{
    title:"Room and linen sprays", kicker:"Pump sprays and aerosols",
    covers:"CLP · Aerosols · Biocides",
    card:"Flammable sprays, aerosol rules and the germ-killing claims that turn a spray into a biocide.",
    intro:"Sprays usually contain alcohol or solvents, so flammability is the first thing to check. The words on the bottle matter just as much.",
    law:[
      {t:"Pump sprays are mixtures. When classified, often as flammable, they need a CLP label.", src:["clp","hselabel"]},
      {t:"Aerosols must also meet the Aerosol Dispensers Regulations 2009. Most small makers use a specialist contract filler for them.", src:["aerosol"]},
      {t:"Saying a spray kills germs, bacteria or viruses makes it a biocidal product, which has its own approval rules.", src:["biocides"]}
    ],
    label:["Full CLP label where classified, including flammability warnings","Your business name, UK address and phone number","Net volume","Directions, such as “Test on a hidden area of fabric first”","Batch number"],
    records:["SDS for every ingredient","CLP calculation for the finished spray","Batch records"],
    mistakes:["“Antibacterial”, “kills 99.9% of germs” or “purifies the air” on the label or listing.","No flammability warning on an alcohol-based spray."],
    sources:["hselabel","aerosol","biocides","clp"]
  },
  "cosmetics":{
    title:"Soap, bath and body", kicker:"Soap, bath bombs, balms, lotions, perfume and body mists",
    covers:"UK Cosmetics Regulation · CPSR · SCPN",
    card:"Responsible Person, safety report, SCPN notification and the cosmetics label.",
    intro:"Anything applied to the body to clean, perfume, protect or care for it is a cosmetic. Cosmetics have their own rules, and the safety report comes before the first sale.",
    law:[
      {t:"Each product needs a UK Responsible Person, which can be you. They make sure it meets the UK Cosmetics Regulation and keep its Product Information File.", src:["cosmguide"]},
      {t:"Each formula needs a Cosmetic Product Safety Report (CPSR) from a qualified safety assessor before it is sold. A new formula or a fragrance change means updating the report.", src:["cosmguide"]},
      {t:"Each product must be notified on the government’s Submit Cosmetic Product Notification (SCPN) service before it goes on sale.", src:["scpn"]},
      {t:"Claims must be truthful and backed by evidence. Claiming to treat a condition, such as eczema or anxiety, can make the product a medicine.", src:["cosmguide","mhra"]}
    ],
    extra:{t:"Selling to Northern Ireland or the EU follows the EU Cosmetics Regulation: a Responsible Person based in Northern Ireland or the EU, and notification on the EU’s CPNP portal. The expanded fragrance allergen list applies to products placed on that market from 31 July 2026.", src:["euallergens","gpsrni"]},
    label:["Name and UK address of the Responsible Person","Net quantity (weight or volume)","Best-before date, or the period-after-opening symbol if it lasts more than 30 months","Precautions for use","Batch number","Function, unless it is obvious from the product","Ingredients by INCI name, in descending order","Fragrance allergens named when above 0.001% (leave-on) or 0.01% (rinse-off)"],
    records:["Product Information File: description, CPSR, manufacturing method and Good Manufacturing Practice statement, evidence for any claims","Batch records","Supplier documents for every ingredient"],
    mistakes:["Selling before the CPSR is signed.","Changing the fragrance without updating the CPSR.","Using a CPSR written for a different recipe.","Wording such as “suitable for eczema” or “heals dry skin”."],
    sources:["cosmguide","scpn","mhra","euallergens"]
  },
  "selling":{
    title:"Selling online and at markets", kicker:"Tax, consumer rights, reviews and insurance",
    covers:"HMRC · Consumer Contracts · DMCC",
    card:"Registering with HMRC, cancellation rights, reviews, badges and insurance.",
    intro:"The rules that apply to every scent maker, whatever you make.",
    law:[
      {t:"Register as self-employed with HMRC once your trading income goes over the £1,000 trading allowance in a tax year. Check GOV.UK for the current figure.", src:["hmrcallow","hmrcse"]},
      {t:"Online and phone sales: give buyers the required information before they pay, and a 14-day right to cancel. Personalised items are an exception.", src:["ccr"]},
      {t:"Fake reviews, and showing a trust mark or approval you don’t have, are banned outright. The Competition and Markets Authority can fine businesses directly.", src:["dmcc","cma207"]},
      {t:"Selling to Northern Ireland or the EU: the EU General Product Safety Regulation applies, including a responsible economic operator based in Northern Ireland or the EU.", src:["gpsrni"]},
      {t:"Most employers must have employers’ liability insurance from the day they take someone on.", src:["elins"]}
    ],
    labelTitle:"Your checklist",
    label:["Business name and contact details on your shop and receipts","Delivery, returns and cancellation terms written down","Product liability insurance in place (fairs and stockists usually ask for it)","Whether you need to pay the ICO data protection fee"],
    records:["Sales and expenses for your tax return","Copies of your listing wording, with dates","Customer complaints and how you resolved them"],
    mistakes:["Buying or swapping reviews.","Showing logos of bodies you are not a member of.","Waiting until the end of the year to register with HMRC."],
    sources:["hmrcallow","ccr","dmcc","bclogos","gpsrni","elins","ico"]
  }
};
var GUIDE_ORDER = ["candles","wax-melts","diffusers","sprays","cosmetics","selling"];

/* ---------- Questions ---------- */
var FAQ = [
  {q:"Do candles need a CLP label?", a:"Usually, if the scented wax is classified as hazardous. That depends on your fragrance and how much you use, so work it out from your supplier’s safety data sheet (SDS) and a CLP calculation for your exact fragrance load. Many lightly scented candles still need the allergen line.", go:"candles", src:["clp","hselabel"], k:"clp label candle hazard sds fragrance load allergen"},
  {q:"Can I sell wax melts without a CLP label?", a:"Only if that exact melt is not classified as hazardous. At the fragrance loads most makers use it usually is, so most wax melts need a full CLP label.", go:"wax-melts", src:["clp","lincs"], k:"wax melt clp label snap bar clamshell"},
  {q:"Does handmade soap need a safety assessment?", a:"Yes. Soap is a cosmetic, so each formula needs a Cosmetic Product Safety Report (CPSR) from a qualified safety assessor, a UK Responsible Person and a notification on the government’s SCPN service before you sell it.", go:"cosmetics", src:["cosmguide","scpn"], k:"soap cpsr safety assessment cosmetic bath bomb responsible person scpn"},
  {q:"Can I say my candle helps with anxiety or sleep?", a:"No. Saying a product treats or relieves a condition is a medicinal claim. Describe the scent and the mood instead, for example “creates a calm, cosy atmosphere”.", go:"claims", src:["asa","mhra"], k:"anxiety sleep stress claim aromatherapy wellbeing health"},
  {q:"What warnings must a candle label show?", a:"Fire-safety warnings such as “Never leave a burning candle unattended” and “Keep out of reach of children and pets”. BS EN 15494 is the standard Trading Standards and the British Candle Makers Federation point to.", go:"candles", src:["bcf","gpsr"], k:"candle warnings safety label bs en 15494 pictogram"},
  {q:"Do I need insurance to sell candles?", a:"Product liability insurance is not a legal requirement for a sole trader, but most craft fairs, shops and stockists ask for it. Employers’ liability insurance is compulsory for most businesses once they employ someone.", go:"selling", src:["elins"], k:"insurance product liability public liability employers craft fair"},
  {q:"Can I make wax melts shaped like sweets?", a:"Avoid it. Products that look like food and could be mistaken for it, especially by children, can break the Food Imitations (Safety) Regulations 1989. Trading Standards have warned wax melt sellers about this.", go:"wax-melts", src:["food","lincs"], k:"food imitation sweets cake shape wax melt"},
  {q:"Do I need to register my candle business?", a:"Register with HMRC as self-employed once your trading income goes over the £1,000 trading allowance in a tax year. There is no special licence to make candles at home, but check your home insurance and any tenancy or mortgage terms.", go:"selling", src:["hmrcallow","hmrcse"], k:"register business hmrc self employed tax licence home"},
  {q:"Do I need GPSR details to sell on Etsy and other marketplaces?", a:"If you sell to buyers in Northern Ireland or the EU, the EU General Product Safety Regulation applies. You need a responsible economic operator based in Northern Ireland or the EU, and their details must go with the product. Marketplaces ask for this information in your shop settings.", go:"selling", src:["gpsrni"], k:"gpsr etsy marketplace northern ireland eu responsible person"},
  {q:"Do reed diffusers need child-resistant caps?", a:"Some do. If your diffuser liquid is classified for certain hazards, such as aspiration hazard (H304), it needs a child-resistant closure and a tactile warning when sold to the public. Section 2 of your SDS tells you.", go:"diffusers", src:["clp"], k:"diffuser child resistant cap tactile warning h304"},
  {q:"Can I call my products non-toxic or chemical-free?", a:"Avoid both. Everything is made of chemicals, and a safety promise like “non-toxic” needs evidence. Say what the product is made of instead.", go:"claims", src:["cma207"], k:"non-toxic chemical free natural claims misleading"},
  {q:"Can I say my room spray is antibacterial?", a:"No, unless it is an authorised biocide. Claims that a product kills germs, bacteria or viruses bring it under the biocides rules. “Freshens the room” is fine.", go:"sprays", src:["biocides"], k:"antibacterial room spray germs biocide disinfect"},
  {q:"Do I need a new CPSR for every scent?", a:"Each formula needs its own safety assessment. Changing the fragrance changes the formula, so the report usually needs updating. Ask your safety assessor how they handle scent variations.", go:"cosmetics", src:["cosmguide"], k:"cpsr every scent variation fragrance change formula"},
  {q:"Can I use another maker’s CLP label?", a:"No. A CLP label is worked out for one fragrance at one load in one product. Yours has to come from your own SDS and calculation.", go:"candles", src:["clp","hselabel"], k:"copy clp label another maker template"}
];

/* ---------- Law changes ---------- */
var UPDATES = [
  {no:"005", date:"31 Jul 2026", title:"EU expands fragrance allergen labelling for cosmetics", body:"Cosmetics placed on the EU market from this date must name the expanded list of fragrance allergens. Under the Windsor Framework, EU cosmetics rules also apply in Northern Ireland. Great Britain had not adopted the expanded list when we last checked.", who:"Soap, bath and perfume makers selling to Northern Ireland or the EU", todo:"Ask your safety assessor which allergens your labels must now list for those markets.", src:["euallergens"]},
  {no:"004", date:"21 Jul 2025", title:"Product Regulation and Metrology Act 2025 becomes law", body:"Gives ministers powers to update UK product safety rules, including duties for online marketplaces. It changes nothing for makers on its own. The detail will come in regulations made under it.", who:"Everyone selling physical products", todo:"Nothing yet. We log each regulation made under the Act here.", src:["pram"]},
  {no:"003", date:"6 Apr 2025", title:"New consumer protection rules in force", body:"The Digital Markets, Competition and Consumers Act 2024 bans fake reviews and the display of trust marks or approvals a business doesn’t have. The Competition and Markets Authority can now fine businesses directly.", who:"Everyone selling to consumers", todo:"Remove any review you didn’t earn and any badge you aren’t entitled to.", src:["dmcc","cma207"]},
  {no:"002", date:"13 Dec 2024", title:"EU General Product Safety Regulation applies, including in Northern Ireland", body:"Products sold to consumers in Northern Ireland or the EU need a responsible economic operator based there, with their details on the product, packaging or accompanying document.", who:"Makers selling to Northern Ireland or the EU", todo:"Arrange a responsible person in NI or the EU, or stop selling to those buyers.", src:["gpsrni"]},
  {no:"001", date:"1 Jan 2021", title:"GB cosmetics move to the SCPN notification service", body:"Cosmetics sold in Great Britain are notified on the government’s SCPN service instead of the EU portal, with a Responsible Person based in the UK.", who:"Soap, bath and perfume makers", todo:"Check every product you sell is notified on SCPN.", src:["scpn"]}
];

/* ---------- Product checker rules ---------- */
var PRODUCTS = [["candles","Candles"],["melts","Wax melts"],["diffusers","Reed diffusers"],["sprays","Room sprays"],["soap","Soap"],["bath","Bath and body"],["perfume","Perfume and mists"]];
var MIX = ["candles","melts","diffusers","sprays"], COS = ["soap","bath","perfume"];
var S = {products:["candles","melts"], market:"gb", claims:"no", food:"no", staff:"no", income:"yes"};
try{ var saved = JSON.parse(localStorage.getItem("sl-checker")||"null"); if(saved && Array.isArray(saved.products)) S = Object.assign(S, saved); }catch(e){}
function save(){ try{ localStorage.setItem("sl-checker", JSON.stringify(S)); }catch(e){} }
function has(k){ return S.products.indexOf(k) > -1; }
function any(list){ return list.some(has); }

var RULES = [
  {lv:"law", when:function(){return any(MIX);}, short:"Work out each product’s hazard classification from your SDS", text:"Get the safety data sheet (SDS) for every fragrance oil, and work out the hazard classification of each finished product at your fragrance load.", src:["clp","hselabel"]},
  {lv:"law", when:function(){return any(MIX);}, short:"Use a CLP hazard label where a product is classified", text:"Where a product is classified, use a CLP label: pictograms, signal word, hazard and precautionary statements, the allergen line, product name, your name, UK address and phone number, and the net quantity.", src:["clp","hselabel"]},
  {lv:"law", when:function(){return any(MIX);}, short:"Show your name, address and a batch reference", text:"Make every product traceable: your name and address and a batch or product reference on the product or packaging, with records of what went into each batch.", src:["gpsr"]},
  {lv:"law", when:function(){return has("candles");}, short:"Give candle fire-safety warnings (BS EN 15494)", text:"Give fire-safety warnings with every candle, such as “Never leave a burning candle unattended”. BS EN 15494 sets out the wording and symbols Trading Standards expect.", src:["gpsr","bcf"]},
  {lv:"law", when:function(){return has("diffusers");}, short:"Child-resistant cap and tactile warning if your SDS calls for them", text:"Check section 2 of your SDS. Diffuser liquids classified for some hazards, such as aspiration hazard (H304), need a child-resistant cap and a tactile warning when sold to the public.", src:["clp"]},
  {lv:"law", when:function(){return has("sprays");}, short:"Aerosols must meet the Aerosol Dispensers Regulations", text:"If you sell aerosol sprays, they must also meet the Aerosol Dispensers Regulations 2009. Most small makers use a specialist contract filler.", src:["aerosol"]},
  {lv:"law", when:function(){return any(COS);}, short:"Name a UK Responsible Person", text:"Name a UK Responsible Person for each cosmetic (this can be you), who keeps its Product Information File.", src:["cosmguide"]},
  {lv:"law", when:function(){return any(COS);}, short:"Get a signed CPSR before you sell", text:"Get a Cosmetic Product Safety Report (CPSR) for each formula, signed by a qualified safety assessor, before you sell it.", src:["cosmguide"]},
  {lv:"law", when:function(){return any(COS);}, short:"Notify each cosmetic on SCPN", text:"Notify each cosmetic on the government’s SCPN service before it goes on sale.", src:["scpn"]},
  {lv:"law", when:function(){return any(COS);}, short:"Use the full cosmetics label", text:"Label cosmetics with ingredients (INCI names), net quantity, a best-before date or period-after-opening symbol, batch number, precautions, function where it isn’t obvious, and the Responsible Person’s name and UK address. Name fragrance allergens above 0.001% in leave-on or 0.01% in rinse-off products.", src:["cosmguide"]},
  {lv:"law", when:function(){return S.claims==="yes";}, short:"Remove medicinal claims", text:"Remove claims that a product treats, cures or relieves a condition such as anxiety, insomnia, eczema or pain. They are medicinal claims. Describe the scent and the mood instead.", src:["asa","asamed","mhra"]},
  {lv:"law", when:function(){return S.food==="yes";}, short:"No food-like shapes", text:"Don’t sell products that look like food and could be mistaken for it, such as wax melts or soaps shaped like sweets or cakes.", src:["food","lincs"]},
  {lv:"law", when:function(){return S.staff==="yes";}, short:"Employers’ liability insurance and a risk assessment", text:"Get employers’ liability insurance and do a health and safety risk assessment, written down once you employ five or more people. It should cover handling fragrance oils.", src:["elins","hserisk"]},
  {lv:"law", when:function(){return S.income==="yes";}, short:"Register with HMRC", text:"Register as self-employed with HMRC once your trading income goes over the £1,000 trading allowance in a tax year.", src:["hmrcallow","hmrcse"]},
  {lv:"law", when:function(){return S.market!=="gb";}, short:"Responsible economic operator in NI or the EU", text:"Selling to Northern Ireland or the EU: the EU General Product Safety Regulation applies. You need a responsible economic operator based in Northern Ireland or the EU, and their details must go with the product.", src:["gpsrni"]},
  {lv:"law", when:function(){return S.market!=="gb" && any(COS);}, short:"EU cosmetics rules and CPNP for NI and EU", text:"Cosmetics sold in Northern Ireland or the EU follow the EU Cosmetics Regulation: a Responsible Person based there and notification on the EU’s CPNP portal. The expanded fragrance allergen list applies from 31 July 2026.", src:["euallergens"]},
  {lv:"law", when:function(){return true;}, short:"14-day cancellation right for online sales", text:"If you sell online or by phone, give buyers the required information before they pay and a 14-day right to cancel. Personalised items are an exception.", src:["ccr"]},
  {lv:"law", when:function(){return true;}, short:"No fake reviews or unearned badges", text:"Don’t post, buy or swap fake reviews, and don’t show badges or logos you haven’t earned. Both are banned outright.", src:["dmcc"]},
  {lv:"adv", when:function(){return has("candles");}, short:"Burn-test every combination", text:"Burn-test every wick, wax and fragrance combination and keep the results. BS EN 15493 covers fire safety and BS EN 15426 covers sooting.", src:["bcf"]},
  {lv:"adv", when:function(){return has("melts");}, short:"Add burner warnings", text:"Add burner warnings to wax melts: never leave a lit burner unattended, keep it away from children and pets, and don’t move it while the wax is liquid.", src:["gpsr"]},
  {lv:"adv", when:function(){return any(COS);}, short:"Follow Good Manufacturing Practice", text:"Make cosmetics following Good Manufacturing Practice (the ISO 22716 guidelines) and keep batch records.", src:["cosmguide"]},
  {lv:"adv", when:function(){return any(MIX);}, short:"Keep a technical file per product", text:"Keep a technical file for each product: SDS, CLP calculation, test results, batch records and supplier invoices.", src:[]},
  {lv:"adv", when:function(){return true;}, short:"Get product liability insurance", text:"Get product liability insurance. It isn’t a legal requirement for sole traders, but most fairs, shops and stockists ask for it.", src:[]},
  {lv:"adv", when:function(){return true;}, short:"Check the ICO data protection fee", text:"Check whether you need to pay the ICO data protection fee. The ICO’s self-assessment takes a few minutes.", src:["ico"]},
  {lv:"watch", when:function(){return has("sprays");}, short:"No germ-killing claims", text:"Don’t say a spray kills germs, bacteria or viruses, or purifies the air. That makes it a biocidal product with its own approval rules.", src:["biocides"]},
  {lv:"watch", when:function(){return S.income==="unsure";}, short:"Track your sales", text:"Track your sales. You need to register with HMRC once trading income goes over £1,000 in a tax year.", src:["hmrcallow"]},
  {lv:"watch", when:function(){return any(MIX);}, short:"Don’t copy other makers’ labels", text:"Don’t copy another maker’s CLP label. It only fits their fragrance at their load.", src:["clp"]}
];
var LV = {law:{tag:"Law", title:"Required by law"}, adv:{tag:"Advised", title:"Strongly advised"}, watch:{tag:"Watch", title:"Watch out"}};
function evaluate(){ var o={law:[],adv:[],watch:[]}; RULES.forEach(function(r){ if(r.when()) o[r.lv].push(r); }); return o; }
function productNames(){ var n = PRODUCTS.filter(function(p){return has(p[0]);}).map(function(p){return p[1];}); return n.length? n.join(", ") : "No products chosen"; }
function countsHTML(o){ return '<span><b>'+o.law.length+'</b> required by law</span><span><b>'+o.adv.length+'</b> strongly advised</span><span><b>'+o.watch.length+'</b> to watch</span>'; }

function heroCard(){
  var o = evaluate();
  var items = o.law.slice(0,5);
  var list = S.products.length ? '<ul class="cl-list">'+items.map(function(r){return '<li><span class="tag law">Law</span><span>'+esc(r.short)+'</span></li>';}).join("")+'</ul>' : '<p class="cl-empty">Choose at least one product to see what it needs.</p>';
  return '<div class="cl-head"><p class="eyebrow">Your checklist</p><h2>'+esc(productNames())+'</h2><div class="cl-counts">'+countsHTML(o)+'</div></div>'+list+
    '<div class="cl-foot"><span class="fine">Selling in Great Britain. Change this in the full checker.</span><a class="btn small arrow" href="#checker">Full checklist</a></div>';
}
function chipsHTML(){ return PRODUCTS.map(function(p){return '<button type="button" class="chip" data-p="'+p[0]+'" aria-pressed="'+(has(p[0])?"true":"false")+'">'+p[1]+'</button>';}).join(""); }

/* ---------- Claims checker ---------- */
var CLAIMS = [
  {re:/\b(treat(s|ing|ment)?|cures?(?!\s+(?:time|times|for|before|in|period)\b)|heal(s|ing)?|remed(y|ies)|therapeutic|medicinal|clinically proven)\b/gi, sev:"high", cat:"Medicinal claim", why:"Claims to treat, cure or heal can make your product an unlicensed medicine and break the advertising code.", use:"Describe the scent and the feeling: “a soft lavender scent for slow evenings”.", src:["mhra","asamed"]},
  {re:/\b(helps? (you )?(to )?sleep|sleep aid|aids? sleep|relie(f|ves?|ving)( from)? (stress|anxiety|pain|tension)|reduces? (stress|anxiety|pain)|stress relief|pain relief|boosts? (your )?immun\w*|detox\w*|lowers? blood pressure)\b/gi, sev:"high", cat:"Health benefit", why:"A promised health effect needs medical evidence that a small maker is unlikely to have.", use:"“Part of a calm bedtime routine” or “a relaxing scent for the end of the day”.", src:["asa","asamed"]},
  {re:/\b(anxiety|depression|insomnia|migraines?|headaches?|eczema|psoriasis|arthritis|asthma|panic attacks?|adhd|inflammation|anti-inflammatory)\b/gi, sev:"high", cat:"Medical condition", why:"Naming a medical condition implies the product helps with it.", use:"Remove the condition. The ASA’s aromatherapy advice accepts general wording such as “promotes a sense of relaxation”.", src:["asa","asamed"]},
  {re:/\b(anti-?bacterial|anti-?viral|anti-?microbial|kills? (99(\.9)?% of )?(germs|bacteria|viruses)|disinfect\w*|saniti[sz]\w*|purif(y|ies|ying) the air|air[- ]purif\w*)\b/gi, sev:"high", cat:"Biocide claim", why:"Saying a product kills germs makes it a biocidal product, which has its own approval rules.", use:"“Freshens the room” or “leaves linen smelling clean”.", src:["biocides"]},
  {re:/\b(non-?toxic|chemical[- ]free|toxin[- ]free|100% safe|completely safe|totally safe|harmless|safe for (babies|children|kids|pets|dogs|cats)|hypoallergenic|allergen[- ]free|no side effects)\b/gi, sev:"med", cat:"Safety promise", why:"Everything is made of chemicals, and promises of safety need proof you probably don’t have.", use:"Say what it’s made of: “rapeseed wax, cotton wick and lavender essential oil”.", src:["cma207"]},
  {re:/\b(eco[- ]?friendly|environmentally friendly|planet[- ]friendly|sustainable|carbon[- ]neutral|biodegradable|plastic[- ]free|zero[- ]waste)\b/gi, sev:"med", cat:"Environmental claim", why:"Green claims must be specific, accurate and backed by evidence.", use:"Be exact: “jar made from 100% recycled glass” or “posted in paper packaging”.", src:["green"]},
  {re:/\b(100% natural|all[- ]natural|natural|organic)\b/gi, sev:"low", cat:"Natural or organic", why:"Fine only if it’s true of the whole product and you can show it. “Organic” needs certified organic ingredients.", use:"Name the natural ingredient: “scented with essential oils”.", src:["cma207"]}
];
var SEV = {high:"Remove", med:"Needs evidence", low:"Check"};
var CLAIM_EXAMPLE = "Our hand-poured lavender candle is 100% natural and non-toxic. It relieves anxiety, helps you sleep and purifies the air. Made with eco-friendly soy wax.";
var claimText = CLAIM_EXAMPLE;
function scanClaims(text){
  var hits = [];
  CLAIMS.forEach(function(rule){ rule.re.lastIndex = 0; var m; while((m = rule.re.exec(text))){ hits.push({s:m.index, e:m.index+m[0].length, t:m[0], r:rule}); if(m[0].length===0) rule.re.lastIndex++; } });
  hits.sort(function(a,b){ return a.s-b.s || (b.e-b.s)-(a.e-a.s); });
  var out = [], last = -1;
  hits.forEach(function(h){ if(h.s >= last){ out.push(h); last = h.e; } });
  return out;
}
function highlight(text, hits){
  var html = "", i = 0;
  hits.forEach(function(h){ html += esc(text.slice(i,h.s)) + '<mark class="m-'+h.r.sev+'">' + esc(h.t) + '</mark>'; i = h.e; });
  return html + esc(text.slice(i));
}

/* ---------- Page renderers ---------- */
function secHead(eyebrow, h, p){ return '<div class="sec-head"><p class="eyebrow">'+eyebrow+'</p><h2>'+h+'</h2>'+(p?'<p>'+p+'</p>':'')+'</div>'; }
function qaHTML(f){ var target = f.go==="claims" ? "#claims" : "#"+f.go; var label = f.go==="claims" ? "Try the claims checker" : "Read the "+GUIDES[f.go].title.toLowerCase()+" guide"; return '<article class="qa"><h3>'+esc(f.q)+'</h3><p>'+esc(f.a)+'</p>'+cites(f.src)+'<a class="more arrow" href="'+target+'">'+label+' </a></article>'; }
function entryHTML(u){ return '<div class="entry"><span class="no">No. '+u.no+'</span><span class="date">'+u.date+'</span><div class="body"><h3>'+esc(u.title)+'</h3><p>'+esc(u.body)+'</p></div><div class="who"><div><b>Who it affects</b>'+esc(u.who)+'</div><div><b>What to do</b>'+esc(u.todo)+'</div>'+cites(u.src)+'</div></div>'; }
function ledgerHead(){ return '<div class="ledger-head"><span>Entry</span><span>Date</span><span>Change</span><span>Who and what to do</span></div>'; }
function guideCard(k){ var g = GUIDES[k]; return '<a class="card" href="#'+k+'"><span class="covers">'+g.covers+'</span><h3>'+g.title+'</h3><p>'+g.card+'</p></a>'; }

function tiersHTML(full){
  var t = [
    {name:"Free", price:"£0", per:"", alt:"Always free", items:["Product checker and claims checker","Answers to the most-asked questions","Monthly email of law changes"], cta:"Use the free tools", href:"#checker", cls:""},
    {name:"Member", price:"£9", per:"/month", alt:"or £90 a year", items:["Printable checklist for each product guide","Label templates: CLP, cosmetics and candle warnings","Record templates: batch log, burn-test log, technical file","Alerts when a rule that affects your products changes","Monthly live question time"], cta:"Register interest", href:"#membership", cls:"pick"}
  ];
  return '<div class="tiers">'+t.map(function(x){ return '<div class="tier '+x.cls+'">'+(x.cls?'<span class="pick-badge">Most makers</span>':'')+'<h3>'+x.name+'</h3><p class="price">'+x.price+'<small>'+x.per+'</small></p><p class="alt-price">'+x.alt+'</p><ul class="ticks">'+x.items.map(function(i){return '<li>'+i+'</li>';}).join("")+'</ul><a class="btn '+(x.cls?'':'ghost')+'" href="'+(full&&x.href==="#membership"?"#join":x.href)+'">'+x.cta+'</a></div>'; }).join("")+'</div>';
}

function renderHome(){
  var top = FAQ.slice(0,8);
  var o = scanClaims(CLAIM_EXAMPLE);
  return ''+
  '<section class="hero"><div class="wrap"><div class="hero-grid">'+
    '<div>'+
      '<p class="eyebrow">UK compliance for candle, wax melt, diffuser, soap and fragrance makers</p>'+
      '<h1 id="page-h1" tabindex="-1">Can I legally sell this?</h1>'+
      '<p class="lede">Find out what your product needs before it goes on sale: the label, the paperwork and the words you can use. Every answer links to the law and shows the date we last checked it.</p>'+
      '<p class="pick-label">What do you make? Tap all that apply.</p>'+
      '<div class="chips" id="hero-chips">'+chipsHTML()+'</div>'+
      '<form class="search" id="home-search" role="search"><label for="q-home" class="sr">Search the questions makers ask</label><input id="q-home" type="search" placeholder="Search, e.g. do wax melts need CLP?" autocomplete="off"><button class="btn ghost" type="submit">Search</button></form>'+
    '</div>'+
    '<aside class="sheet" id="hero-card" aria-live="polite">'+heroCard()+'</aside>'+
  '</div></div></section>'+

  '<section class="section"><div class="wrap">'+
    secHead("Most asked","The questions UK scent makers ask most","Short answers first, then the guide and the law behind each one.")+
    '<div class="qa-grid">'+top.map(qaHTML).join("")+'</div>'+
    '<div class="sec-foot"><a class="btn ghost arrow" href="#faq">All questions </a></div>'+
  '</div></section>'+

  '<section class="section alt"><div class="wrap">'+
    secHead("Free tools","Check your product and your wording","Two quick checks before a product goes on sale.")+
    '<div class="tools">'+
      '<div class="sheet tool"><p class="eyebrow">Product checker</p><h3>What does my product need?</h3><p>Answer six questions about what you make and where you sell. You get a checklist of what the law requires, what’s strongly advised and what to watch out for, with a source for each.</p><div class="demo"><p class="demo-label">Example: candles and wax melts, sold in Great Britain</p><p>'+evaluate().law.length+' legal requirements, including a CLP label check, fire-safety warnings and traceability.</p></div><a class="btn arrow" href="#checker">Open the product checker </a></div>'+
      '<div class="sheet tool"><p class="eyebrow">Claims checker</p><h3>Can I say this in my listing?</h3><p>Paste a product description. We highlight medical, germ-killing, safety and green claims, explain the risk and suggest wording you can use.</p><div class="demo"><p class="demo-label">Example text</p><p>'+highlight(CLAIM_EXAMPLE,o)+'</p></div><a class="btn arrow" href="#claims">Open the claims checker </a></div>'+
    '</div>'+
  '</div></section>'+

  '<section class="section"><div class="wrap">'+
    secHead("Guides","Guides by product","What the law requires, what goes on the label, which records to keep and the mistakes we see most.")+
    '<div class="cards">'+GUIDE_ORDER.map(guideCard).join("")+'</div>'+
  '</div></section>'+

  '<section class="section alt"><div class="wrap">'+
    secHead("Law updates","When the rules change, it goes in the ledger","Each change is dated, says who it affects and what to do, and links to the law.")+
    '<div class="ledger">'+ledgerHead()+UPDATES.slice(0,3).map(entryHTML).join("")+'</div>'+
    '<div class="sec-foot"><a class="btn ghost arrow" href="#updates">All law updates </a></div>'+
  '</div></section>'+

  '<section class="section"><div class="wrap">'+
    secHead("Membership","Stay compliant without becoming a lawyer","Founding prices for the first members. Sign-ups open after a qualified specialist has reviewed our guidance.")+
    tiersHTML(false)+
  '</div></section>'+

  '<section class="section alt"><div class="wrap">'+
    secHead("How we work","Answers you can check for yourself","")+
    '<div class="principles">'+
      '<div class="principle"><span class="k">Sourced</span><h3>Every answer cites the law</h3><p>Each answer links to the legislation or official guidance it comes from, so you can read it yourself.</p></div>'+
      '<div class="principle"><span class="k">Dated</span><h3>Every page shows when we checked it</h3><p>Rules change. Each page carries the date we last checked it against its sources.</p></div>'+
      '<div class="principle"><span class="k">Corrected</span><h3>Mistakes are logged in public</h3><p>When we fix an answer, the correction goes in our public log with the date.</p></div>'+
      '<div class="principle"><span class="k">Open</span><h3>Clear about who runs it</h3><p>Scent Ledger is run by Sana Essencia, which also sells tools for makers. Guides never push our products; when one is mentioned, it is labelled.</p></div>'+
    '</div>'+
  '</div></section>';
}

function renderGuides(){
  return '<section class="page-head"><div class="wrap"><p class="eyebrow">Guides</p><h1 id="page-h1" tabindex="-1">Guides by product</h1><p class="lede">Pick what you make. Each guide covers what the law requires, what goes on the label, which records to keep and the mistakes we see most.</p>'+stamp()+'</div></section>'+
    '<section class="section"><div class="wrap"><div class="cards">'+GUIDE_ORDER.map(guideCard).join("")+'</div></div></section>';
}

var COURSE_LINK = {"candles":"Modules 3 and 7","wax-melts":"Modules 3 and 7","diffusers":"Modules 4 and 7","sprays":"Modules 4 and 7","cosmetics":"Module 5","selling":"Modules 7 and 9"};
function renderGuide(k){
  var g = GUIDES[k];
  var others = GUIDE_ORDER.filter(function(x){return x!==k;}).map(function(x){return '<a href="#'+x+'">'+GUIDES[x].title+'</a>';}).join("");
  return '<section class="page-head"><div class="wrap">'+
      '<nav class="crumbs" aria-label="Breadcrumb"><a href="#guides">Guides</a> / <span>'+g.title+'</span></nav>'+
      '<p class="eyebrow">'+g.kicker+'</p><h1 id="page-h1" tabindex="-1">'+g.title+'</h1><p class="lede">'+g.intro+'</p>'+stamp()+
    '</div></section>'+
    '<section class="section"><div class="wrap guide-grid">'+
      '<div class="guide-main">'+
        '<h2 class="h-sub">What the law requires</h2>'+
        '<ul class="law-list">'+g.law.map(function(x){return '<li><p>'+x.t+'</p>'+cites(x.src)+'</li>';}).join("")+'</ul>'+
        (g.extra ? '<div class="note"><p class="eyebrow">Northern Ireland and the EU</p><p>'+g.extra.t+'</p>'+cites(g.extra.src)+'</div>' : '')+
        '<h2 class="h-sub">'+(g.labelTitle||"What goes on the label")+'</h2>'+
        '<ul class="ticks">'+g.label.map(function(x){return '<li>'+x+'</li>';}).join("")+'</ul>'+
        '<h2 class="h-sub">Records to keep</h2>'+
        '<ul class="ticks">'+g.records.map(function(x){return '<li>'+x+'</li>';}).join("")+'</ul>'+
        '<h2 class="h-sub">Mistakes we see most</h2>'+
        '<ul class="crosses">'+g.mistakes.map(function(x){return '<li>'+x+'</li>';}).join("")+'</ul>'+
      '</div>'+
      '<aside class="guide-side">'+
        '<div class="sheet side-box"><p class="eyebrow">Official sources</p><ul class="src-list">'+g.sources.map(function(s){return '<li><a href="'+SRC[s].url+'" target="_blank" rel="noopener">'+esc(SRC[s].name)+'</a></li>';}).join("")+'</ul></div>'+
        '<div class="sheet side-box"><p class="eyebrow">Templates for this guide</p><p>Members get label and record templates that follow these rules, and an alert when a rule changes.</p><a class="btn arrow" href="#membership">See membership </a></div>'+
        (COURSE_LINK[k] ? '<div class="sheet side-box"><p class="eyebrow">Learn it step by step</p><p>'+COURSE_LINK[k]+' of The Scent Business Course, by Sana Essencia. Module 1 is free.</p><a class="btn arrow" href="https://sanaessencia.co.uk/course/">See the course </a></div>' : '')+
        '<div class="side-box plain"><p class="eyebrow">Other guides</p><div class="side-links">'+others+'</div></div>'+
      '</aside>'+
    '</div></section>';
}

function renderChecker(){
  function opt(type, name, id, val, label, checked){ return '<label class="opt"><input type="'+type+'" name="'+name+'" id="'+id+'" value="'+val+'"'+(checked?' checked':'')+'><span>'+label+'</span></label>'; }
  function radios(name, list){ return '<div class="opts">'+list.map(function(x){return opt("radio",name,name+"-"+x[0],x[0],x[1],S[name]===x[0]);}).join("")+'</div>'; }
  return '<section class="page-head"><div class="wrap"><p class="eyebrow">Free tool</p><h1 id="page-h1" tabindex="-1">Product checker</h1><p class="lede">Answer six questions. You get a checklist of what the law requires for your products, what’s strongly advised and what to watch out for, with a source for each.</p>'+stamp()+'</div></section>'+
  '<section class="section"><div class="wrap checker">'+
    '<form class="qform" id="checker-form">'+
      '<p class="hint">Example answers are filled in. Change them to match your business.</p>'+
      '<fieldset><legend><span class="legend-no">01</span>What do you make?</legend><div class="opts">'+PRODUCTS.map(function(p){return opt("checkbox","products","p-"+p[0],p[0],p[1],has(p[0]));}).join("")+'</div></fieldset>'+
      '<fieldset><legend><span class="legend-no">02</span>Where do you sell?</legend>'+radios("market",[["gb","Great Britain only"],["ni","Also Northern Ireland"],["eu","Also the EU"]])+'</fieldset>'+
      '<fieldset><legend><span class="legend-no">03</span>Do you say your products help with sleep, stress, anxiety, pain or skin conditions?</legend>'+radios("claims",[["yes","Yes"],["no","No"]])+'</fieldset>'+
      '<fieldset><legend><span class="legend-no">04</span>Do any products look like food or sweets?</legend>'+radios("food",[["yes","Yes"],["no","No"]])+'</fieldset>'+
      '<fieldset><legend><span class="legend-no">05</span>Do you employ anyone?</legend>'+radios("staff",[["yes","Yes"],["no","No"]])+'</fieldset>'+
      '<fieldset><legend><span class="legend-no">06</span>Will your sales go over £1,000 this tax year?</legend>'+radios("income",[["yes","Yes"],["no","No"],["unsure","Not sure"]])+'</fieldset>'+
    '</form>'+
    '<div class="results"><div class="sheet" id="results" aria-live="polite"></div></div>'+
  '</div></section>';
}
function resultsHTML(){
  var o = evaluate();
  if(!S.products.length) return '<div class="cl-head"><p class="eyebrow">Your checklist</p><h2>Choose what you make</h2></div><p class="cl-empty">Pick at least one product in question 1 to see your checklist.</p>';
  var groups = ["law","adv","watch"].filter(function(k){return o[k].length;}).map(function(k){
    return '<div class="r-group"><h3>'+LV[k].title+'</h3>'+o[k].map(function(r){return '<div class="r-item"><span><span class="tag '+k+'">'+LV[k].tag+'</span></span><div><p>'+esc(r.text)+'</p>'+cites(r.src)+'</div></div>';}).join("")+'</div>';
  }).join("");
  return '<div class="cl-head"><p class="eyebrow">Your checklist</p><h2>'+esc(productNames())+'</h2><div class="cl-counts">'+countsHTML(o)+'</div></div>'+groups+
    '<div class="cl-foot"><span class="fine">General information, not legal advice.</span><button class="btn small" type="button" id="copy-list">Copy checklist</button></div><div id="copy-fallback"></div>';
}
function checklistText(){
  var o = evaluate(), lines = ["Scent Ledger checklist (checked "+CHECKED+")","Products: "+productNames(),""];
  ["law","adv","watch"].forEach(function(k){ if(!o[k].length) return; lines.push(LV[k].title.toUpperCase()); o[k].forEach(function(r){ lines.push("- "+r.text); }); lines.push(""); });
  lines.push("General information, not legal advice.");
  return lines.join("\n");
}

function renderClaims(){
  var rows = CLAIMS.map(function(c){ return '<tr><td><span class="sev '+c.sev+'">'+SEV[c.sev]+'</span></td><td><b>'+c.cat+'</b><br><span class="fine">'+esc(c.why)+'</span></td><td>'+esc(c.use)+'</td></tr>'; }).join("");
  return '<section class="page-head"><div class="wrap"><p class="eyebrow">Free tool</p><h1 id="page-h1" tabindex="-1">Claims checker</h1><p class="lede">Paste a product description or listing. We highlight words that can get a listing removed or a product treated as a medicine or biocide, and suggest wording you can use instead.</p>'+stamp()+'</div></section>'+
  '<section class="section"><div class="wrap claims">'+
    '<div style="display:grid;gap:12px">'+
      '<label for="claim-input" class="eyebrow">Your description</label>'+
      '<textarea id="claim-input" spellcheck="true">'+esc(claimText)+'</textarea>'+
      '<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn ghost small" type="button" id="claim-example">Load the example</button><button class="btn ghost small" type="button" id="claim-clear">Clear</button></div>'+
      '<p class="fine">This is a first check, not legal advice. It looks for common risky wording; it can’t judge context.</p>'+
    '</div>'+
    '<div class="sheet" id="claim-out" aria-live="polite"></div>'+
  '</div></section>'+
  '<section class="section alt"><div class="wrap">'+
    secHead("What we look for","Words to avoid, and what to say instead","Wellbeing wording is fine. Promises about health, germs, safety or the planet need evidence, or a different word.")+
    '<div class="table-scroll"><table class="wordtable"><thead><tr><th>Level</th><th>Type of claim</th><th>Say this instead</th></tr></thead><tbody>'+rows+'</tbody></table></div>'+
    '<div class="sec-foot">'+cites(["asa","asamed","mhra","biocides","green","cma207"])+'</div>'+
  '</div></section>';
}
function claimsOut(){
  var hits = scanClaims(claimText);
  var head = '<div class="cl-head"><p class="eyebrow">Result</p><h2>'+(claimText.trim()? (hits.length? hits.length+" phrase"+(hits.length>1?"s":"")+" to look at" : "No risky wording found") : "Paste a description to check it")+'</h2></div>';
  var prev = claimText.trim()? '<div class="preview">'+highlight(claimText,hits)+'</div>' : '';
  var flags = hits.map(function(h){ return '<div class="flag"><span class="sev '+h.r.sev+'">'+SEV[h.r.sev]+'</span><div style="display:grid;gap:5px"><p><q>'+esc(h.t)+'</q> · '+h.r.cat+'</p><p>'+esc(h.r.why)+'</p><p class="use">Instead: '+esc(h.r.use)+'</p>'+cites(h.r.src)+'</div></div>'; }).join("");
  var none = claimText.trim() && !hits.length ? '<p class="cl-empty">Nothing on our list. Still check that every claim is true and that you can back it up.</p>' : '';
  return head+prev+(flags? '<div style="border-top:1px solid var(--rule)">'+flags+'</div>' : '')+none;
}

function renderUpdates(){
  return '<section class="page-head"><div class="wrap"><p class="eyebrow">Law updates</p><h1 id="page-h1" tabindex="-1">The ledger of rule changes</h1><p class="lede">Every change that affects UK scent makers, newest first. Each entry says who it affects, what to do and where the law is.</p>'+stamp()+'</div></section>'+
    '<section class="section"><div class="wrap"><div class="ledger">'+ledgerHead()+UPDATES.map(entryHTML).join("")+'</div>'+
    '<div class="sec-foot"><p class="fine">Members get an alert when a change affects the products they make.</p></div></div></section>';
}

function renderMembership(){
  return '<section class="page-head"><div class="wrap"><p class="eyebrow">Membership</p><h1 id="page-h1" tabindex="-1">Stay compliant without becoming a lawyer</h1><p class="lede">The guides are free. Members get templates, printable checklists and an alert whenever a rule that affects their products changes.</p></div></section>'+
    '<section class="section"><div class="wrap">'+tiersHTML(true)+'<p class="fine" style="margin-top:16px">Founding prices for the first members. Prices include VAT where it applies.</p></div></section>'+
    '<section class="section alt" id="join"><div class="wrap two">'+
      '<div class="prose"><p class="eyebrow">Register interest</p><h2 style="font-size:32px">Be first in when sign-ups open</h2><p>Sign-ups open once a qualified specialist has reviewed our guidance. Leave your email and we’ll tell you the day it opens.</p>'+
      '<form class="inline-form" id="join-form" name="ledger-interest" method="POST" data-netlify="true" netlify-honeypot="company-website"><input type="hidden" name="form-name" value="ledger-interest"><p hidden><label>Leave this empty: <input name="company-website" tabindex="-1" autocomplete="off"></label></p><label for="join-email" class="sr">Email address</label><input id="join-email" name="email" type="email" placeholder="you@yourshop.co.uk" required maxlength="120"><button class="btn" type="submit">Notify me</button></form><p class="form-msg" id="join-msg" role="status" hidden></p><p class="fine">We use your email only to tell you when sign-ups open. See the <a href="https://sanaessencia.co.uk/privacy/">privacy notice</a>.</p></div>'+
      '<div class="prose"><p class="eyebrow">Questions</p>'+
        '<h3 style="font-size:20px">Is this legal advice?</h3><p>No. Scent Ledger explains the rules in plain English and links to the law. For advice on your own situation, speak to a solicitor or your local Trading Standards business advice service.</p>'+
        '<h3 style="font-size:20px">Can I cancel?</h3><p>Yes, at any time. Monthly plans stop at the end of the month; yearly plans stop at the end of the year.</p>'+
        '<h3 style="font-size:20px">Do you replace my safety assessor?</h3><p>No. Cosmetics still need a CPSR from a qualified safety assessor. We help you get everything else right around it.</p>'+
      '</div>'+
    '</div></section>';
}

function renderAbout(){
  return '<section class="page-head"><div class="wrap"><p class="eyebrow">About</p><h1 id="page-h1" tabindex="-1">About Scent Ledger</h1><p class="lede">Scent Ledger is a Sana Essencia product: plain-English UK compliance answers for people who make and sell scented products.</p></div></section>'+
    '<section class="section"><div class="wrap two">'+
      '<div class="prose"><p class="eyebrow">Why it exists</p><p>Small makers get compliance advice from forums, suppliers and other makers, and it often disagrees. The rules are public, but they are spread across chemical, product safety, cosmetics and consumer law.</p><p>Scent Ledger puts the rules for candles, wax melts, diffusers, sprays, soap and fragrance in one place, in plain English, with the source beside every answer.</p></div>'+
      '<div class="prose"><p class="eyebrow">Our editorial rules</p><ul class="ticks"><li>Every answer links to the legislation or official guidance behind it.</li><li>Every page shows the date we last checked it.</li><li>Corrections are logged in public, with the date.</li><li>No paid placements in guidance.</li><li>Sana Essencia products are never recommended in guidance. Where one is mentioned, it is labelled as ours.</li><li>A qualified specialist reviews the guidance before full launch.</li></ul></div>'+
    '</div></section>'+
    '<section class="section alt"><div class="wrap two">'+
      '<div class="prose"><p class="eyebrow">Who runs it</p><p>Scent Ledger is run by Sana Essencia Ltd, a UK company that makes science-led tools for workplaces and scent makers.</p><p><a href="https://sanaessencia.co.uk/about/">About Sana Essencia</a></p><p class="eyebrow" style="margin-top:12px">What we are not</p><ul class="crosses"><li>A government body or part of Trading Standards</li><li>A law firm</li><li>A cosmetic safety assessor</li><li>A testing laboratory</li></ul><p>For legal advice about your own situation, speak to a solicitor or your local Trading Standards business advice service.</p>'+cites(["buscomp"])+'</div>'+
      '<div class="prose"><p class="eyebrow">Corrections log</p><div class="empty"><p>No corrections yet. When we change an answer because it was wrong or out of date, it is listed here with the date.</p></div><p class="eyebrow" style="margin-top:12px">Contact</p><p>Email us at <b>hello@sanaessencia.co.uk</b></p></div>'+
    '</div></section>';
}

var faqQuery = "";
function renderFAQ(){
  return '<section class="page-head"><div class="wrap"><p class="eyebrow">Questions and answers</p><h1 id="page-h1" tabindex="-1">The questions makers ask</h1><p class="lede">Short answers with the law behind them. Search, or read through.</p>'+stamp()+'</div></section>'+
    '<section class="section"><div class="wrap"><form class="faq-tools" id="faq-search" role="search"><label for="q-faq" class="sr">Search questions</label><input id="q-faq" type="search" placeholder="Search, e.g. insurance, soap, CLP" value="'+esc(faqQuery)+'" autocomplete="off"><button class="btn ghost" type="submit">Search</button></form><div id="faq-results"></div></div></section>';
}
function faqResults(){
  var words = faqQuery.toLowerCase().split(/[^a-z0-9£%-]+/).filter(function(w){return w.length>1;});
  var list = FAQ.map(function(f){ var hay = (f.q+" "+f.a+" "+f.k).toLowerCase(), q=f.q.toLowerCase(), score=0; words.forEach(function(w){ if(q.indexOf(w)>-1) score+=3; if(f.k.indexOf(w)>-1) score+=2; if(hay.indexOf(w)>-1) score+=1; }); return {f:f, s:score}; });
  if(words.length) list = list.filter(function(x){return x.s>0;}).sort(function(a,b){return b.s-a.s;});
  if(!list.length) return '<div class="empty"><p><b>No answer matches “'+esc(faqQuery)+'” yet.</b></p><p>Try a shorter word, or browse the guides.</p><a class="btn ghost arrow" href="#guides">Browse guides </a></div>';
  return '<div class="faq-list">'+list.map(function(x){ var f=x.f; var target = f.go==="claims" ? "#claims" : "#"+f.go; return '<div class="faq-item"><h3>'+esc(f.q)+'</h3><p>'+esc(f.a)+'</p>'+cites(f.src)+'<a class="arrow" href="'+target+'">'+(f.go==="claims"?"Claims checker":GUIDES[f.go].title+" guide")+' </a></div>'; }).join("")+'</div>';
}


var PREFIX = document.body.getAttribute("data-prefix") || "";
var ROUTES_LIST = ["home","guides","checker","claims","updates","membership","about","faq","candles","wax-melts","diffusers","sprays","cosmetics","selling"];
function hrefFor(h){ if(h==="home") return PREFIX||"./"; if(h==="join") return PREFIX+"membership/#join"; if(ROUTES_LIST.indexOf(h)>-1) return PREFIX+(h==="faq"?"questions/":h+"/"); return null; }
function relinkDOM(root){ Array.prototype.forEach.call(root.querySelectorAll('a[href^="#"]'), function(a){ var r=hrefFor(a.getAttribute("href").slice(1)); if(r) a.setAttribute("href", r); }); }
var page = document.body.getAttribute("data-page");
var mb = document.getElementById("menu-btn");
if(mb){ mb.addEventListener("click", function(){ var n=document.getElementById("nav"), open=n.classList.toggle("open"); mb.setAttribute("aria-expanded", open?"true":"false"); }); }
function bindCopy(){
  var b = document.getElementById("copy-list"); if(!b) return;
  b.addEventListener("click", function(){
    var text = checklistText(), fb = document.getElementById("copy-fallback");
    var fallback = function(){ fb.innerHTML = '<div style="padding:0 18px 18px"><label class="fine" for="copy-area">Select all and copy:</label><textarea class="copy-out" id="copy-area" readonly></textarea></div>'; var ta=document.getElementById("copy-area"); ta.value = text; ta.focus(); ta.select(); };
    try{ navigator.clipboard.writeText(text).then(function(){ b.textContent = "Copied"; setTimeout(function(){ b.textContent = "Copy checklist"; }, 1800); }, fallback); }catch(e){ fallback(); }
  });
}
if(page==="home"){
  var card = document.getElementById("hero-card");
  var drawCard = function(){ card.innerHTML = heroCard(); relinkDOM(card); };
  drawCard();
  Array.prototype.forEach.call(document.querySelectorAll("#hero-chips .chip"), function(b){ b.setAttribute("aria-pressed", has(b.getAttribute("data-p"))?"true":"false"); });
  document.getElementById("hero-chips").addEventListener("click", function(e){
    var b = e.target.closest(".chip"); if(!b) return;
    var p = b.getAttribute("data-p"), i = S.products.indexOf(p);
    if(i>-1) S.products.splice(i,1); else S.products.push(p);
    b.setAttribute("aria-pressed", i>-1 ? "false" : "true"); save(); drawCard();
  });
  document.getElementById("home-search").addEventListener("submit", function(e){ e.preventDefault(); location.href = PREFIX + "questions/?q=" + encodeURIComponent(document.getElementById("q-home").value); });
}
if(page==="checker"){
  var form = document.getElementById("checker-form"), out = document.getElementById("results");
  Array.prototype.forEach.call(form.querySelectorAll("input"), function(x){ x.checked = x.name==="products" ? has(x.value) : S[x.name]===x.value; });
  var draw = function(){ out.innerHTML = resultsHTML(); relinkDOM(out); bindCopy(); };
  form.addEventListener("change", function(e){ var t=e.target; if(t.name==="products"){ S.products = Array.prototype.map.call(form.querySelectorAll('input[name="products"]:checked'), function(x){return x.value;}); } else if(t.name){ S[t.name]=t.value; } save(); draw(); });
  draw();
}
if(page==="claims"){
  var ta = document.getElementById("claim-input"), co = document.getElementById("claim-out");
  var drawC = function(){ co.innerHTML = claimsOut(); relinkDOM(co); };
  ta.addEventListener("input", function(){ claimText = ta.value; drawC(); });
  document.getElementById("claim-example").addEventListener("click", function(){ ta.value = claimText = CLAIM_EXAMPLE; drawC(); });
  document.getElementById("claim-clear").addEventListener("click", function(){ ta.value = claimText = ""; drawC(); ta.focus(); });
}
if(page==="faq"){
  var fr = document.getElementById("faq-results"), qi = document.getElementById("q-faq");
  try{ faqQuery = new URLSearchParams(location.search).get("q") || ""; }catch(e){}
  qi.value = faqQuery;
  var drawF = function(){ fr.innerHTML = faqResults(); relinkDOM(fr); };
  if(faqQuery) drawF();
  document.getElementById("faq-search").addEventListener("submit", function(e){ e.preventDefault(); faqQuery = qi.value; drawF(); });
  qi.addEventListener("input", function(){ faqQuery = qi.value; drawF(); });
}
if(page==="membership"){
  var jf = document.getElementById("join-form");
  if(jf) jf.addEventListener("submit", function(e){ e.preventDefault(); var m = document.getElementById("join-msg");
    var body = new URLSearchParams(new FormData(jf)).toString();
    fetch("/", {method:"POST", headers:{"Content-Type":"application/x-www-form-urlencoded"}, body:body})
      .then(function(r){ if(!r.ok) throw 0; m.textContent = "Thanks. We\u2019ll email you the day sign-ups open."; m.hidden = false; jf.reset(); })
      .catch(function(){ m.textContent = "That didn\u2019t send. Please try again, or email hello@sanaessencia.co.uk."; m.hidden = false; });
  });
}

})();
