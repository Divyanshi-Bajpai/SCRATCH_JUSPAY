import React from "react";

export default function DogSprite() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="95"
      height="100"
      viewBox="0 0 95 100"
      version="1.1"
      xmlSpace="preserve"
    >
      <g>
        {/* Body */}
        <ellipse cx="47" cy="70" rx="35" ry="30" fill="#D2B48C" stroke="#000" strokeWidth="2"/>
        {/* Head */}
        <circle cx="47" cy="35" r="28" fill="#D2B48C" stroke="#000" strokeWidth="2"/>
        {/* Ears */}
        <polygon points="20,10 35,20 25,45" fill="#8B5A2B" stroke="#000" strokeWidth="2" />
        <polygon points="74,10 59,20 69,45" fill="#8B5A2B" stroke="#000" strokeWidth="2" />
        {/* Eyes */}
        <circle cx="35" cy="30" r="6" fill="#000" />
        <circle cx="60" cy="30" r="6" fill="#000" />
        {/* Nose */}
        <ellipse cx="47" cy="45" rx="8" ry="5" fill="#000" />
        {/* Mouth */}
        <path d="M35 55 Q47 65 59 55" stroke="#000" strokeWidth="2" fill="none" />
        {/* Tail */}
        <path d="M80 80 Q90 70 85 60" stroke="#8B5A2B" strokeWidth="5" fill="none" />
      </g>
    </svg>
  );
}
