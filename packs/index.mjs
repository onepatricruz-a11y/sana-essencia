// Seasonal packs live here, NOT in the public website folder, so nobody can read them before release
// or without a plan. Each pack opens on its releaseAt date. Free users see `preview` blends; the
// Maker plan sees everything. Oil ids match the Blend Studio's library.
// The blends below are PLACEHOLDERS for Patricia to replace with her real formulas.
// Every pack is held at 2099-01-01 and marked placeholder until she sends checked formulas.
// Do not move a releaseAt date, or clear placeholder, until that pack's formulas are checked.
export const PACKS = [
  {
    id: "winter-2026",
    title: { en: "Winter Hearth", pt: "Lareira de Inverno" },
    // PLACEHOLDER formulas, clearly marked below. Held with the other packs until checked formulas replace them.
    releaseAt: "2099-01-01T00:00:00Z",
    placeholder: true,
    plan: "maker",
    preview: 1,
    markets: ["uk"], // Brazilian November is early summer
    blends: [
      { id: "wh-1", placeholder: true, name: { en: "Placeholder: Fireside Orange", pt: "Placeholder: Laranja da Lareira" }, oils: { orange: 40, clove: 10, cinnamon: 10, cedarwood: 25, vanilla: 15 } },
      { id: "wh-2", placeholder: true, name: { en: "Placeholder: Frosted Pine Walk", pt: "Placeholder: Passeio Gelado" }, oils: { cypress: 35, eucalyptus: 15, frankincense: 30, cedarwood: 20 } },
      { id: "wh-3", placeholder: true, name: { en: "Placeholder: Mulled Evening", pt: "Placeholder: Noite de Quentão" }, oils: { orange: 35, ginger: 15, clove: 10, cardamom: 10, sandalwood: 30 } },
    ],
  },
  {
    id: "christmas-2026",
    title: { en: "Christmas Gifting", pt: "Presentes de Natal" },
    // Same hold as Winter Hearth: placeholder formulas, not served until checked.
    releaseAt: "2099-01-01T00:00:00Z",
    placeholder: true,
    plan: "maker",
    preview: 1,
    blends: [
      { id: "xm-1", placeholder: true, name: { en: "Placeholder: Spiced Clementine", pt: "Placeholder: Mexerica com Especiarias" }, oils: { mandarin: 45, clove: 10, cinnamon: 10, vanilla: 35 } },
      { id: "xm-2", placeholder: true, name: { en: "Placeholder: Midnight Mass", pt: "Placeholder: Missa do Galo" }, oils: { frankincense: 40, cedarwood: 30, orange: 30 } },
    ],
  },
  {
    id: "valentine-2027",
    title: { en: "Valentine's" },
    markets: ["uk"], // Brazil celebrates Dia dos Namorados on 12 June, so it gets its own pack
    releaseAt: "2099-01-01T00:00:00Z",
    placeholder: true,
    plan: "maker",
    preview: 1,
    blends: [
      { id: "vl-1", placeholder: true, name: { en: "Placeholder: Rose and Tonka", pt: "Placeholder: Rosa e Cumaru" }, oils: { rose: 30, geranium: 20, tonka: 25, sandalwood: 25 } },
      { id: "vl-2", placeholder: true, name: { en: "Placeholder: First Date", pt: "Placeholder: Primeiro Encontro" }, oils: { bergamot: 35, jasmine: 20, ylang: 10, vanilla: 35 } },
    ],
  },
  {
    id: "namorados-2027",
    title: { pt: "Dia dos Namorados" },
    releaseAt: "2099-01-01T00:00:00Z",
    placeholder: true,
    plan: "maker",
    preview: 1,
    markets: ["br"],
    blends: [
      { id: "nm-1", placeholder: true, name: { pt: "Placeholder: Rosa e Cumaru" }, oils: { rose: 30, geranium: 20, tonka: 25, sandalwood: 25 } },
    ],
  },
];
