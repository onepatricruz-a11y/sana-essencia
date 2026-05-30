import React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

export const LinaloolIcon = ({ className = "", size = 100 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Background Grid */}
    <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" className="opacity-20" />
    
    {/* Chemical Bonds */}
    <path
      d="M20 75 L35 60 M35 60 L50 65 M50 60 L65 45 M65 45 L80 50 M80 45 L95 30 M95 30 L105 35 M95 30 L95 15 M50 65 L50 80 M50 65 L58 68 M35 60 L35 45"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    
    {/* Atoms / Nodes */}
    <circle cx="20" cy="75" r="3" fill="currentColor" />
    <circle cx="35" cy="60" r="3" fill="currentColor" />
    <circle cx="50" cy="65" r="3.5" fill="currentColor" />
    <circle cx="65" cy="45" r="3" fill="currentColor" />
    <circle cx="80" cy="50" r="3" fill="currentColor" />
    <circle cx="95" cy="30" r="3" fill="currentColor" />
    
    {/* Hydroxyl group label (OH) */}
    <rect x="42" cy="78" width="16" height="10" rx="2" fill="var(--background)" />
    <text x="50" y="86" fill="currentColor" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">OH</text>
    
    {/* Methyl label (CH3) */}
    <rect x="88" cy="8" width="16" height="10" rx="2" fill="var(--background)" />
    <text x="96" y="16" fill="currentColor" fontSize="6" fontFamily="var(--font-mono)" textAnchor="middle">H₃C</text>
  </svg>
);

export const CineoleIcon = ({ className = "", size = 100 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Background Grid */}
    <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" className="opacity-20" />
    
    {/* Chemical Bridge / Ring Structure */}
    <path
      d="M60 25 L85 45 L85 75 L60 95 L35 75 L35 45 Z M60 25 L60 55 M60 55 L35 75 M60 55 L85 75 M60 25 L60 12 M60 95 L60 108"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    
    {/* Oxygen Bridge Node */}
    <circle cx="60" cy="55" r="6" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />
    <text x="60" y="58" fill="currentColor" fontSize="9" fontFamily="var(--font-serif)" textAnchor="middle" fontWeight="bold">O</text>

    {/* Nodes */}
    <circle cx="60" cy="25" r="3" fill="currentColor" />
    <circle cx="85" cy="45" r="3" fill="currentColor" />
    <circle cx="85" cy="75" r="3" fill="currentColor" />
    <circle cx="60" cy="95" r="3" fill="currentColor" />
    <circle cx="35" cy="75" r="3" fill="currentColor" />
    <circle cx="35" cy="45" r="3" fill="currentColor" />
  </svg>
);

export const MentholIcon = ({ className = "", size = 100 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Background Grid */}
    <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" className="opacity-20" />
    
    {/* Hexane Ring with Side Chains */}
    <path
      d="M60 20 L85 35 L85 65 L60 80 L35 65 L35 35 Z M85 35 L100 25 M35 65 L20 75 M35 35 L20 25 M60 80 L60 95 M60 95 L48 102 M60 95 L72 102"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    
    {/* Hydroxyl group label (OH) */}
    <rect x="12" cy="18" width="16" height="10" rx="2" fill="var(--background)" />
    <text x="20" y="26" fill="currentColor" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">OH</text>

    {/* Isopropyl group labels */}
    <circle cx="60" cy="20" r="3" fill="currentColor" />
    <circle cx="85" cy="35" r="3" fill="currentColor" />
    <circle cx="85" cy="65" r="3" fill="currentColor" />
    <circle cx="60" cy="80" r="3" fill="currentColor" />
    <circle cx="35" cy="65" r="3" fill="currentColor" />
    <circle cx="35" cy="35" r="3" fill="currentColor" />
  </svg>
);
