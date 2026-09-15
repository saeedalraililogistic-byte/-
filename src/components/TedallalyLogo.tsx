import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const TedallalyLogo: React.FC<LogoProps> = ({ className = '', size = 36 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Glow & Shadow */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#f43f5e" floodOpacity="0.3" />
        </filter>
        <radialGradient id="centerRing" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#e11d48" />
        </radialGradient>
        <linearGradient id="petalTop" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>

      {/* Main 4 Cardinal Petals (Vertical and Horizontal) */}
      {/* Top Petal */}
      <ellipse
        cx="100"
        cy="50"
        rx="15"
        ry="35"
        fill="#f43f5e"
        opacity="0.95"
      />
      {/* Bottom Petal */}
      <ellipse
        cx="100"
        cy="150"
        rx="15"
        ry="35"
        fill="#f43f5e"
        opacity="0.95"
      />
      {/* Left Petal */}
      <ellipse
        cx="50"
        cy="100"
        rx="35"
        ry="15"
        fill="#f43f5e"
        opacity="0.95"
      />
      {/* Right Petal */}
      <ellipse
        cx="150"
        cy="100"
        rx="35"
        ry="15"
        fill="#f43f5e"
        opacity="0.95"
      />

      {/* Translucent Angled Overlapping Petals forming the Diamond/Flower */}
      {/* Top-Right angled pair */}
      <ellipse
        cx="128"
        cy="72"
        rx="18"
        ry="38"
        transform="rotate(45 128 72)"
        fill="#fb7185"
        opacity="0.55"
      />
      <ellipse
        cx="120"
        cy="80"
        rx="16"
        ry="34"
        transform="rotate(25 120 80)"
        fill="#f43f5e"
        opacity="0.5"
      />

      {/* Top-Left angled pair */}
      <ellipse
        cx="72"
        cy="72"
        rx="18"
        ry="38"
        transform="rotate(-45 72 72)"
        fill="#fb7185"
        opacity="0.55"
      />
      <ellipse
        cx="80"
        cy="80"
        rx="16"
        ry="34"
        transform="rotate(-25 80 80)"
        fill="#f43f5e"
        opacity="0.5"
      />

      {/* Bottom-Left angled pair */}
      <ellipse
        cx="72"
        cy="128"
        rx="18"
        ry="38"
        transform="rotate(45 72 128)"
        fill="#fb7185"
        opacity="0.55"
      />
      <ellipse
        cx="80"
        cy="120"
        rx="16"
        ry="34"
        transform="rotate(25 80 120)"
        fill="#f43f5e"
        opacity="0.5"
      />

      {/* Bottom-Right angled pair */}
      <ellipse
        cx="128"
        cy="128"
        rx="18"
        ry="38"
        transform="rotate(-45 128 128)"
        fill="#fb7185"
        opacity="0.55"
      />
      <ellipse
        cx="120"
        cy="120"
        rx="16"
        ry="34"
        transform="rotate(-25 120 120)"
        fill="#f43f5e"
        opacity="0.5"
      />

      {/* Central Ring Frame */}
      <circle
        cx="100"
        cy="100"
        r="22"
        stroke="#f43f5e"
        strokeWidth="4"
        fill="#09090d"
      />
      <circle
        cx="100"
        cy="100"
        r="18"
        fill="#09090d"
      />
    </svg>
  );
};
