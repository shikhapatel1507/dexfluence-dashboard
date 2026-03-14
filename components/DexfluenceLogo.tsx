import React from "react";

interface DexfluenceLogoProps {
  variant?: "full" | "horizontal" | "icon";
  size?: number;
  className?: string;
}

export default function DexfluenceLogo({
  variant = "horizontal",
  size = 1,
  className = "",
}: DexfluenceLogoProps) {
  const uid = React.useId().replace(/:/g, "");

  /* ── shared defs ── */
  const Defs = ({ id }: { id: string }) => (
    <defs>
      <linearGradient id={`ga-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7B6EF6" />
        <stop offset="100%" stopColor="#3ecfcf" />
      </linearGradient>
      <filter id={`gf-${id}`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="1.4" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );

  /* ── icon only (60 × 56) ── */
  if (variant === "icon") {
    return (
      <svg
        viewBox="0 0 60 56"
        xmlns="http://www.w3.org/2000/svg"
        width={60 * size}
        height={56 * size}
        className={className}
        aria-label="Dexfluence"
        role="img"
      >
        <Defs id={uid} />
        {/* ghost top-left */}
        <polygon points="22,2 35,9.5 35,24.5 22,32 9,24.5 9,9.5"
          fill="#1e1e32" stroke="#7B6EF6" strokeWidth="0.8" strokeOpacity="0.55" />
        {/* ghost top-right */}
        <polygon points="38,2 51,9.5 51,24.5 38,32 25,24.5 25,9.5"
          fill="#1e1e32" stroke="#3ecfcf" strokeWidth="0.8" strokeOpacity="0.55" />
        {/* centre filled */}
        <polygon points="30,18 43,25.5 43,40.5 30,48 17,40.5 17,25.5"
          fill={`url(#ga-${uid})`} filter={`url(#gf-${uid})`} />
        {/* inner triangle */}
        <polygon points="30,27 38,41 22,41"
          fill="none" stroke="#fff" strokeWidth="1" strokeOpacity="0.5" />
        {/* dots */}
        <circle cx="9"  cy="17" r="1.5" fill="#3ecfcf" opacity="0.5" />
        <circle cx="51" cy="17" r="1.5" fill="#7B6EF6" opacity="0.5" />
      </svg>
    );
  }

  /* ── horizontal lockup (200 × 40) ── */
  if (variant === "horizontal") {
    return (
      <svg
        viewBox="0 0 200 40"
        xmlns="http://www.w3.org/2000/svg"
        width={200 * size}
        height={40 * size}
        className={className}
        aria-label="Dexfluence"
        role="img"
      >
        <Defs id={uid} />
        {/* ghost top-left */}
        <polygon points="12,2 20,6.6 20,15.4 12,20 4,15.4 4,6.6"
          fill="#1e1e32" stroke="#7B6EF6" strokeWidth="0.7" strokeOpacity="0.55" />
        {/* ghost top-right */}
        <polygon points="20,2 28,6.6 28,15.4 20,20 12,15.4 12,6.6"
          fill="#1e1e32" stroke="#3ecfcf" strokeWidth="0.7" strokeOpacity="0.55" />
        {/* centre filled */}
        <polygon points="16,12 24,16.6 24,25.4 16,30 8,25.4 8,16.6"
          fill={`url(#ga-${uid})`} filter={`url(#gf-${uid})`} />
        {/* inner triangle */}
        <polygon points="16,17 21,25 11,25"
          fill="none" stroke="#fff" strokeWidth="0.8" strokeOpacity="0.5" />
        {/* wordmark */}
        <text x="36" y="24"
          fontFamily="'Space Grotesk', 'Arial Black', sans-serif"
          fontSize="17" fontWeight="700" letterSpacing="-0.3"
          fill="#f0f0f8">
          DEXFLUENCE
        </text>
      </svg>
    );
  }

  /* ── full / vertical lockup (160 × 120) ── */
  return (
    <svg
      viewBox="0 0 160 120"
      xmlns="http://www.w3.org/2000/svg"
      width={160 * size}
      height={120 * size}
      className={className}
      aria-label="Dexfluence"
      role="img"
    >
      <Defs id={uid} />
      {/* ghost top-left */}
      <polygon points="60,8 76,17.2 76,35.6 60,44.8 44,35.6 44,17.2"
        fill="#1e1e32" stroke="#7B6EF6" strokeWidth="0.8" strokeOpacity="0.5" />
      {/* ghost top-right */}
      <polygon points="84,8 100,17.2 100,35.6 84,44.8 68,35.6 68,17.2"
        fill="#1e1e32" stroke="#3ecfcf" strokeWidth="0.8" strokeOpacity="0.5" />
      {/* centre filled */}
      <polygon points="72,26 88,35.2 88,53.6 72,62.8 56,53.6 56,35.2"
        fill={`url(#ga-${uid})`} filter={`url(#gf-${uid})`} />
      {/* outline bottom hex */}
      <polygon points="72,54 88,63.2 88,81.6 72,90.8 56,81.6 56,63.2"
        fill="none" stroke={`url(#ga-${uid})`} strokeWidth="1" strokeOpacity="0.4" />
      {/* inner triangle */}
      <polygon points="72,36 82,53 62,53"
        fill="none" stroke="#fff" strokeWidth="1" strokeOpacity="0.5" />
      {/* top connector */}
      <line x1="72" y1="8" x2="72" y2="2" stroke={`url(#ga-${uid})`} strokeWidth="0.8" strokeOpacity="0.4" />
      <circle cx="72" cy="1" r="1.8" fill="#7B6EF6" opacity="0.6" />
      {/* dots */}
      <circle cx="44" cy="26" r="1.5" fill="#3ecfcf" opacity="0.45" />
      <circle cx="100" cy="26" r="1.5" fill="#7B6EF6" opacity="0.45" />
      {/* wordmark */}
      <text x="80" y="104" textAnchor="middle"
        fontFamily="'Space Grotesk', 'Arial Black', sans-serif"
        fontSize="16" fontWeight="700" letterSpacing="1.5" fill="#f0f0f8">
        DEXFLUENCE
      </text>
      {/* rule */}
      <line x1="28" y1="108" x2="132" y2="108" stroke={`url(#ga-${uid})`} strokeWidth="0.6" strokeOpacity="0.4" />
      {/* tagline */}
      <text x="80" y="118" textAnchor="middle"
        fontFamily="'Instrument Sans', 'Arial', sans-serif"
        fontSize="6.5" fontWeight="400" letterSpacing="2.5" fill="#4a4a6a">
        AI CONTENT FACTORY
      </text>
    </svg>
  );
}