import React, { useState } from "react";
import Home from "./pages/Home";
import Science from "./pages/Science";
import Products from "./pages/Products";
import Rituals from "./pages/Rituals";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

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
          Sana <span style={{ color: "#B8975A" }}>Essencia</span>
        </a>
        
        {/* Desktop Links (Hidden automatically via CSS media if screen is too narrow, styled clean here) */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desktop-nav">
          <a href="#collection" style={{ fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#7A7570", textDecoration: "none" }}>Collection</a>
          <a href="#science" style={{ fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#7A7570", textDecoration: "none" }}>Science</a>
          <a href="#rituals" style={{ fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#7A7570", textDecoration: "none" }}>Rituals</a>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <a href="#waitlist" style={{ padding: "0.5rem 1.25rem", background: "#1E1E1E", color: "#F7F4EF", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }} className="desktop-nav-btn">Join Waitlist</a>
          
          {/* Mobile Hamburger Trigger Button */}
          <button 
            onClick={toggleMobileMenu}
            style={{
              background: "transparent", border: "none", cursor: "pointer", 
              display: "flex", flexDirection: "column", gap: "5px", padding: "0.5rem"
            }}
            aria-label="Toggle Menu"
          >
            <span style={{ width: "22px", height: "1px", background: "#2A2A2A", transition: "all 0.3s", transform: mobileMenuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }}></span>
            <span style={{ width: "22px", height: "1px", background: "#2A2A2A", transition: "all 0.3s", opacity: mobileMenuOpen ? 0 : 1 }}></span>
            <span style={{ width: "22px", height: "1px", background: "#2A2A2A", transition: "all 0.3s", transform: mobileMenuOpen ? "rotate(-45deg) translate(4px, -5px)" : "none" }}></span>
          </button>
        </div>
      </nav>

      {/* Dynamic Slide-Down Mobile Drawer Menu */}
      <div style={{
        position: "fixed", top: "91px", left: 0, right: 0, 
        background: "#F7F4EF", borderBottom: "1px solid rgba(138,138,130,0.15)",
        zIndex: 99, padding: "2rem", display: mobileMenuOpen ? "flex" : "none",
        flexDirection: "column", gap: "1.5rem", boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
      }}>
        <a href="#collection" onClick={closeMobileMenu} style={{ fontSize: "1rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#2A2A2A", textDecoration: "none", fontWeight: 300 }}>Collection</a>
        <a href="#science" onClick={closeMobileMenu} style={{ fontSize: "1rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#2A2A2A", textDecoration: "none", fontWeight: 300 }}>Science</a>
        <a href="#rituals" onClick={closeMobileMenu} style={{ fontSize: "1rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#2A2A2A", textDecoration: "none", fontWeight: 300 }}>Rituals</a>
        <a href="#waitlist" onClick={closeMobileMenu} style={{ padding: "0.75rem", background: "#1E1E1E", color: "#F7F4EF", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", textAlign: "center" }}>Join Waitlist</a>
      </div>

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
