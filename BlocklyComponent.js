import React, { useEffect, useRef } from 'react';
import * as Blockly from 'blockly';
import 'blockly/blocks';
import { javascriptGenerator } from 'blockly/javascript';

// Custom JavaScript Generators - must be defined before workspace creation
javascriptGenerator.forBlock['select_sprite'] = function (block) {
  const sprite = block.getFieldValue('SPRITE');
  return `window.currentSprite = "${sprite}";\n`;
};

javascriptGenerator.forBlock['move_steps'] = function (block) {
  console.log("hhdgshrhmnbdfs");
  const steps = javascriptGenerator.valueToCode(block, 'STEPS', javascriptGenerator.ORDER_ATOMIC) || '0';
  return `moveSelected(${steps});\n`;
};

javascriptGenerator.forBlock['say_text'] = function (block) {
  const msg = javascriptGenerator.valueToCode(block, 'TEXT', javascriptGenerator.ORDER_ATOMIC) || '""';
  return `alert(${msg});\n`;
};

// Global function needed for the generated code
window.moveSelected = function(steps) {
  console.log(`Attempting to move ${window.currentSprite} by ${steps} steps`);
  
  if (!window.currentSprite) {
    console.error("No sprite selected!");
    return;
  }

  
  const spriteElement = document.getElementById(`sprite-${window.currentSprite}`);
  
  if (!spriteElement) {
    console.error(`Sprite element not found: ${spriteId}`);
    return;
  }

  // Debug current position
  console.log(`Current ${window.currentSprite} position:, {
    left: spriteElement.style.left,
    right: spriteElement.style.right,
    computedStyle: window.getComputedStyle(spriteElement)
  }`);

  const stepValue = parseInt(steps);
  if (isNaN(stepValue)) {
    console.error("Invalid step value:", steps);
    return;
  }

  if (window.currentSprite === 'cat') {
    const currentLeft = parseInt(spriteElement.style.left) || 0;
    const newLeft = currentLeft + stepValue;
    spriteElement.style.left = (newLeft)+"px";
    console.log(`Cat moved to left: ${newLeft}px`);
  } 
  else if (window.currentSprite === 'dog') {
    // Get current right position (default to 20px if not set)
    const currentRight = parseInt(spriteElement.style.right) || 0;
    const newRight = currentRight + stepValue;
    
    // Ensure we don't go off-screen
    // const bRight = Math.max(0, newRight);
    
    spriteElement.style.right = (newRight)+"px";
    // console.log(`Dog moved to right: ${boundedRight}px`);
    
    // Force reflow to ensure transition works
    // void spriteElement.offsetWidth;
    // Apply with smooth transition
    spriteElement.style.transition = "right 0.3s ease";
    spriteElement.style.right = (Math.max(0, newRight))+"px";
    
    // Force transition
    void spriteElement.offsetWidth;
  }
};

export default function BlocklyComponent() {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);

  useEffect(() => {
    // Block definitions
    Blockly.Blocks['select_sprite'] = {
      init: function() {
        this.appendDummyInput()
          .appendField("select sprite")
          .appendField(new Blockly.FieldDropdown([
            ["🐱 cat", "cat"],
            ["🐶 dog", "dog"]
          ]), "SPRITE");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(20);
        this.setTooltip("Select the sprite");
      }
    };

    Blockly.Blocks['move_steps'] = {
      init: function() {
        this.appendValueInput("STEPS")
          .setCheck("Number")
          .appendField("move");
        this.appendDummyInput().appendField("steps");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(230);
        this.setTooltip("Move selected sprite");
      }
    };

    Blockly.Blocks['say_text'] = {
      init: function() {
        this.appendValueInput("TEXT").appendField("say");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(160);
        this.setTooltip("Say something");
      }
    };

    // Inject Blockly workspace
    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      toolbox: document.getElementById('toolbox'),
      trashcan: true,
      scrollbars: true,
      grid: {
        spacing: 20,
        length: 3,
        colour: '#ccc',
        snap: true
      }
    });

    return () => {
      workspaceRef.current?.dispose();
    };
  }, []);

  const generateCode = () => {
    const code = javascriptGenerator.workspaceToCode(workspaceRef.current);
    console.log("Generated code:\n", code);
    try {
      // Create a temporary function to execute the generated code
      const executeCode = new Function(code);
      executeCode();
    } catch (err) {
      console.error("Execution error:", err);
    }
  };

  return (
    <>
      <div ref={blocklyDiv} style={{ height: '400px', width: '100%' }} />
      <button
        onClick={generateCode}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Generate Code
      </button>

      {/* Toolbox XML inside hidden div */}
      <div
        id="toolbox-container"
        style={{ display: 'none' }}
        dangerouslySetInnerHTML={{
          __html: `
            <xml id="toolbox" xmlns="https://developers.google.com/blockly/xml">
              <category name="Events" colour="#FFD500">
                <block type="select_sprite" />
              </category>
              <category name="Motion" colour="#4C97FF">
                <block type="move_steps">
                  <value name="STEPS">
                    <block type="math_number">
                      <field name="NUM">10</field>
                    </block>
                  </value>
                </block>
              </category>
              <category name="Looks" colour="#9966FF">
                <block type="say_text">
                  <value name="TEXT">
                    <block type="text">
                      <field name="TEXT">Hello!</field>
                    </block>
                  </value>
                </block>
              </category>
              <category name="Control" colour="#FFAB19">
                <block type="controls_repeat_ext">
                  <value name="TIMES">
                    <block type="math_number">
                      <field name="NUM">5</field>
                    </block>
                  </value>
                </block>
              </category>
              <category name="Logic" colour="#5C81A6">
                <block type="controls_if" />
                <block type="logic_compare" />
              </category>
              <category name="Math" colour="#5CA65C">
                <block type="math_number" />
              </category>
              <category name="Text" colour="#5BA58C">
                <block type="text" />
              </category>
            </xml>
          `
        }}
      />
    </>
  );
}