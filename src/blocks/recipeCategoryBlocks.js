import * as Blockly from 'blockly/core';

export default function addRecipeBlocks(BlocklyLocale) {
    Blockly.Blocks['recipe'] = {
        init: function() {
          this.appendDummyInput()
              .appendField(BlocklyLocale.RecipeName)
              .appendField(new Blockly.FieldTextInput(BlocklyLocale.NameOfRecipe), "recipe_name");
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
        var statements_recipe_ingredients = Blockly.Lua.statementToCode(block, 'recipe_ingredients')
          .replaceAll(' ', "")
          .replace('keep', 'keep ');
        var statements_recipe_result = Blockly.Lua.statementToCode(block, 'recipe_result')
          .replaceAll(' ', '')
          .replaceAll('\t', '');
        var statements_recipe_category = Blockly.Lua.statementToCode(block, 'recipe_category')
          .replaceAll(' ', '')
          .replaceAll('\t', '');
        var value_recipe_time = Blockly.Lua.valueToCode(block, 'recipe_time', Blockly.Lua.ORDER_ATOMIC);

        var code = 
          `Recipe ${text_recipe_name}\n`+
          `{\n`+
          `\t${statements_recipe_ingredients}\n` +
          `\tResult:${statements_recipe_result},\n`+
          `\tTime:${(Math.round(value_recipe_time*10) /10).toFixed(1)},\n`+
          `\tCategory:${statements_recipe_category},\n}`
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
              .appendField(new Blockly.FieldTextInput(BlocklyLocale.DefaultItem+`\t`), "item_name");
          this.setOutput(true, "String");
          //this.setPreviousStatement(true, null);
          //this.setNextStatement(true, null);
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
        var code = value_uni + ';dsds\n';
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
          this.appendValueInput("kept_item")
              .setCheck(null)
              .appendField("Keep:");
          this.setOutput(true, null);
          this.setColour(270);
          this.setTooltip("Keep this item when done crafting.");
          this.setHelpUrl("");
        }
      };
      Blockly.Lua['keep_item'] = function(block) {
        var value_name = Blockly.Lua.valueToCode(block, 'kept_item', Blockly.Lua.ORDER_ATOMIC);
        var code = "keep "+ value_name.replace('(', '').replace(')', '');

        return [code, Blockly.Lua.ORDER_ATOMIC];
      };


      Blockly.Blocks['dont_keep_item'] = {
        init: function() {
          this.appendStatementInput("kept_item")
              .setCheck("String")
              .appendField("Keep:");
          this.setColour(270);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setTooltip(BlocklyLocale.DontKeepItemTooltip);
          this.setHelpUrl("");
          }
      };
      Blockly.Lua['dont_keep_item'] = function(block) {
        var statements_name = Blockly.Lua.statementToCode(block, 'kept_item');
        return statements_name;
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

      Blockly.Blocks['crafting_category'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("Crafting Category:")
              .appendField(new Blockly.FieldDropdown([["General","General"], ["Survivalist","Survivalist"], ["Farming","Farming"], ["Cooking","Cooking"], ["Carpentry","Carpentry"], ["Health","Health"], ["Hunting","Hunting"], ["Electrical","Electrical"], ["Metalworking","Metalworking"], ["Fishing","Fishing"]]), "crafting_category_value");
          this.setOutput(true, "String");
          this.setColour(165);
       this.setTooltip("Select the category for this crafting recipe.");
       this.setHelpUrl("https://pzwiki.net/wiki/Crafting");
        }
      };

      Blockly.Lua['crafting_category'] = function(block) {
        var dropdown_crafting_category_value = block.getFieldValue('crafting_category_value');
        return dropdown_crafting_category_value;
      };

      Blockly.Blocks['item_statement'] = {
        init: function() {
          this.appendValueInput("item_statement_val")
              .setCheck("String")
              .appendField("Item");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(270);
       this.setTooltip("Use an item.");
       this.setHelpUrl("https://pzwiki.net/wiki/Items");
        }
      };
      Blockly.Lua['item_statement'] = function(block) {
        var value_item_statement_val = Blockly.Lua.valueToCode(block, 'item_statement_val', Blockly.Lua.ORDER_ATOMIC);
        return value_item_statement_val;
      };

      Blockly.Blocks['item_list'] = {
        init: function() {
          this.appendValueInput("item_1")
              .setCheck("String")
              .appendField(new Blockly.FieldLabelSerializable("Item"), "Item_V");
          this.appendValueInput("item_2")
              .setCheck("String")
              .appendField(new Blockly.FieldLabelSerializable("Optional Item"), "Item_V_2");
          this.appendValueInput("item_3")
              .setCheck("String")
              .appendField(new Blockly.FieldLabelSerializable("Optional Item"), "Item_V_3");
          this.appendValueInput("item_4")
              .setCheck("String")
              .appendField(new Blockly.FieldLabelSerializable("Optional Item"), "Item_V_3");
          this.setInputsInline(false);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(270);
       this.setTooltip("Add up to four items.");
       this.setHelpUrl("https://pzwiki.net/wiki/Items");
        }
      };
      Blockly.Lua['item_list'] = function(block) {
        var value_item_1 = Blockly.Lua.valueToCode(block, 'item_1', Blockly.Lua.ORDER_ATOMIC);
        var value_item_2 = Blockly.Lua.valueToCode(block, 'item_2', Blockly.Lua.ORDER_ATOMIC);
        var value_item_3 = Blockly.Lua.valueToCode(block, 'item_3', Blockly.Lua.ORDER_ATOMIC);
        var value_item_4 = Blockly.Lua.valueToCode(block, 'item_4', Blockly.Lua.ORDER_ATOMIC);
        // TODO: Assemble Lua into code variable.
        var code = '';
        if (value_item_1 != "") {
          code += value_item_1 +`,\n\t`;
        }
        if (value_item_2 != "") {
          code += value_item_2 +`,\n\t`;
        }
        if (value_item_3 != "") {
          code += value_item_3 +`,\n\t`;
        }
        if (value_item_4 != "") {
          code += value_item_4 +`,\n\t`;
        }
        return code;
      };

      Blockly.Blocks['item'] = {
        init: function() {
          this.appendDummyInput()
              .appendField(new Blockly.FieldTextInput("Base.Axe"), "Item_Value");
          this.setOutput(true, null);
          this.setColour(270);
       this.setTooltip("Use an item.");
       this.setHelpUrl("https://pzwiki.net/wiki/Items");
        }
      };Blockly.Lua['item'] = function(block) {
        var text_item_value = block.getFieldValue('Item_Value');
        return [text_item_value, Blockly.Lua.ORDER_ATOMIC];
      };
}