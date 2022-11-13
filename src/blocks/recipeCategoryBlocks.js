import * as Blockly from 'blockly/core';

export default function addRecipeBlocks(BlocklyLocale) {
    Blockly.Blocks['recipe'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("Recipe Name:")
              .appendField(new Blockly.FieldTextInput("Name of Recipe"), "recipe_name");
          this.appendStatementInput("recipe_ingredients")
              .setCheck("String")
              .appendField(BlocklyLocale.RecipeIngredients)
          this.appendStatementInput("recipe_result")
              .setCheck("String")
              .appendField(BlocklyLocale.RecipeResult);
          this.appendValueInput("recipe_category")
              .setCheck("String")
              .appendField(BlocklyLocale.RecipeCategoryName);
          this.appendValueInput("recipe_time")
              .setCheck("Number")
              .appendField(BlocklyLocale.RecipeTime);
          this.setInputsInline(true);
          this.setColour(270);
       this.setTooltip("");
       this.setHelpUrl("");
        }
    };Blockly.Lua['recipe'] = function(block) {
        var text_recipe_name = block.getFieldValue('recipe_name');
        var statements_recipe_ingredients = Blockly.Lua.statementToCode(block, 'recipe_ingredients');
        var statements_recipe_result = Blockly.Lua.statementToCode(block, 'recipe_result');
        var statements_recipe_category = Blockly.Lua.valueToCode(block, 'recipe_category', Blockly.Lua.ORDER_ATOMIC);
        var value_recipe_time = Blockly.Lua.valueToCode(block, 'recipe_time', Blockly.Lua.ORDER_ATOMIC);

        var code = `#Recipe#\nRecipe ${text_recipe_name}\n {\n }` + 
            statements_recipe_category +
            statements_recipe_ingredients +
            statements_recipe_result +
            value_recipe_time +
            `\n#Recipe#`;
            /*
                recipe Convert vanilla to ORGM 9x19mm FMJ
                {
                    Base.BulletsBox,

                    Result:Ammo_9x19mm_FMJ=30,
                    Time:1.0,
                    Category:ORGM,
                }
            */
        return code;
    };

    Blockly.Blocks['item_list'] = {
        init: function() {
          this.appendDummyInput()
              .appendField(new Blockly.FieldLabelSerializable("Item"), "Item")
              .appendField(new Blockly.FieldTextInput("Item Name"), "item_name");
          //this.setOutput(true, "String");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(270);
          this.setTooltip(`Type the exact item ID (Example: Base.Hat_WoolyHat).\nOpen Help for a list of items.`);
          this.setHelpUrl("https://pzwiki.net/wiki/Items");    
        },
      };Blockly.Lua['item_list'] = function(block) {
        var text_item_name = block.getFieldValue('item_name');
        return text_item_name;
      };
    
      Blockly.Blocks['recipe_ingredients'] = {
        init: function () {
          this.appendValueInput("uni")
            .setCheck("String")
            .appendField(`${BlocklyLocale.RecipeItem}：`);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(230);
          this.setTooltip("");
          this.setHelpUrl("");
        }
      };
      Blockly.Lua['recipe_ingredients'] = function (block) {
        var value_uni = Blockly.Lua.valueToCode(block, 'uni', Blockly.Lua.ORDER_ATOMIC);
        var code = 'log' + '(' + value_uni + ')' + ';\n';
        return code;
      };
    
      Blockly.Blocks['recipe_list'] = {
        init: function () {
          this.appendValueInput("uni")
            .setCheck("String")
            .appendField(`${BlocklyLocale.RecipeItem}：`);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(230);
          this.setTooltip("");
          this.setHelpUrl("");
        }
      };Blockly.Lua['recipe_list'] = function (block) {
        var value_uni = Blockly.Lua.valueToCode(block, 'uni', Blockly.Lua.ORDER_ATOMIC);
        var code = 'log' + '(' + value_uni + ')' + ';\n';
        return code;
      };
    
      Blockly.Blocks['keep_item'] = {
        init: function() {
          this.appendStatementInput("kept_item")
              .setCheck("String")
              .appendField("Keep:");
          this.setColour(270);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setTooltip("Keep this item when done crafting.");
          this.setHelpUrl("");
          }
      };
      Blockly.Lua['keep_item'] = function(block) {
        var statements_name = Blockly.Lua.statementToCode(block, 'kept_item');
        return "keep "+statements_name;
      };
    
      Blockly.Blocks['item_list_recipe_ingredient'] = {
        init: function () {
          this.appendValueInput("uni")
            .setCheck("String")
            .appendField(`${BlocklyLocale.ConsoleOutputLog}：`);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(230);
          this.setTooltip("");
          this.setHelpUrl("");
        }
      };Blockly.JavaScript['item_list_recipe_ingredient'] = function (block) {
        var value_uni = Blockly.JavaScript.valueToCode(block, 'uni', Blockly.JavaScript.ORDER_ATOMIC);
        var code = 'log' + '(' + value_uni + ')' + ';\n';
        return code;
      };
}