// src/components/PreviewArea.js
import React from "react";
import CatSprite from "./CatSprite";
import DogSprite from "./DogSprite";

export default function PreviewArea() {
  return (
    <div
      className="flex-none p-4 bg-blue-50"
      style={{
        height: "97%",
        width: "100%",
        maxWidth: "800px",
        border: "2px solid #ccc",
        borderRadius: "10px",
        position: "relative", // KEY: enables absolute positioning
        overflow: "hidden",
      }}
    >
      {}
      <div
        id="sprite-cat"
        style={{
          position: "absolute",
          top: "20%",
          left: "20px", // start left position
          transition: "left 0.3s ease",
        }}
      >
        <CatSprite />
      </div>

      {}
      <div
        id="sprite-dog"
        style={{
          position: "absolute",
          top: "20%",
         right: "20px", // start right position
          transition: "right 0.3s ease",
          
        }}
      >
        <DogSprite />
      </div>
    </div>
  );
}
