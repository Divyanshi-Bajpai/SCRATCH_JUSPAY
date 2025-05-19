import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

export function defineCustomBlocks() {
  Blockly.Blocks['move_steps'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('move')
        .appendField(new Blockly.FieldNumber(10), 'STEPS')
        .appendField('steps');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip('Move the sprite forward');
      this.setHelpUrl('');
    },
  };

  // ✅ Proper way to register the generator
  javascriptGenerator['move_steps'] = function (block) {
    const steps = block.getFieldValue('STEPS');
    return `move(${steps});\n`;
  };
}


