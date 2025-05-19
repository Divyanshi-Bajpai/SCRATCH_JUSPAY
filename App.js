import React, { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";

export default function App() {
  useEffect(() => {
    // ✅ Define moveSelected globally so Blockly can use it
    window.moveSelected = (steps) => {
      const sprite = window.currentSprite; // 'cat' or 'dog'
      const element = document.getElementById(`sprite-${sprite}`);
      const container = element?.parentElement;

      if (!element || !container) return;

      const currentLeft = parseInt(element.style.left || "0", 10);
      const spriteWidth = element.offsetWidth;
      const containerWidth = container.offsetWidth;

      let newLeft = currentLeft + Number(steps);
      newLeft = Math.max(0, Math.min(newLeft, containerWidth - spriteWidth));

      element.style.left = `${newLeft}px`;
    };

    // ✅ Default sprite is cat unless selected otherwise in Blockly
    window.currentSprite = "cat";
  }, []);

  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row">
        {/* Left section: Sidebar + Blockly Editor */}
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          <Sidebar />
          <MidArea />
        </div>

        {/* Right section: Preview area */}
        <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
          <PreviewArea />
        </div>
      </div>
    </div>
  );
}
