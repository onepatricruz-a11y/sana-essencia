import React from "react";
import Home from "./pages/Home";
import Science from "./pages/Science";
import Products from "./pages/Products";
import Rituals from "./pages/Rituals";

export default function App() {
  return (
    <div style={{ background: "#F7F4EF", minHeight: "100vh", color: "#2A2A2A", fontFamily: "'Jost', sans-serif" }}>
      {/* Announcement */}
      <div style={{ background: "#1E1E1E", color: "#F7F4EF", textAlign: "center", padding: "0.6rem 1.5rem", fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
        Now accepting waitlist registrations — limited first run
      </div>

      {/* Navigation */}
      <nav style={{
        position: "fixed", top: "27px", left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 2.5rem", height: "64px", background: "rgba(247,244,239,0.92)",
        backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(138,138,130,0.15)"
      }}>
        <a href="#" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontWeight: 400, letterSpacing: "0.08em", color: "#2A2A2A", textDecoration: "none" }}>
          Sana Essência
        </a>
        <div style={{ display: "flex", gap: "2rem" }}>
          <a href="#collection" style={{ fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#7A7570", textDecoration: "none" }}>Collection</a>
          <a href="#science" style={{ fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#7A7570", textDecoration: "none" }}>Science</a>
          <a href="#rituals" style={{ fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#7A7570", textDecoration: "none" }}>Rituals</a>
        </div>
        <a href="#waitlist" style={{ padding: "0.5rem 1.25rem", background: "#1E1E1E", color: "#F7F4EF", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>Join Waitlist</a>
      </nav>

      {/* Connected Page Sections Content */}
      <div style={{ paddingTop: "91px" }}>
        <Home />
        <div id="collection">
          <Products />
        </div>
        <div id="science">
          <Science />
        </div>
        <div id="rituals">
          <Rituals />
        </div>
      </div>
    </div>
  );
}
