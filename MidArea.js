import React from "react";
import BlocklyComponent from "./BlocklyComponent";

export default function MidArea() {
  return (
    <div className="flex-1 h-full overflow-auto p-4">
      <h2 className="text-lg font-semibold text-center mb-2">Blockly Workspace</h2>
      <BlocklyComponent />
    </div>
  );
}
