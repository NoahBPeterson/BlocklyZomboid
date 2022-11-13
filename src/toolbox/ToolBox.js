export default function Toolbox(blocklyLocale) {
    return xml(blocklyLocale);
}

class BlockObject {
	BlockObject(xmlType = "", type = "", name = "", value = "", id = "", subfields = []) {
		this.xmlType = xmlType;
		this.type = type;
		this.name = name;
		this.value = value;
		this.id = id;
		this.subfields = subfields;
	}

	addBlockSubfield(subfield = BlockObject) {
		if (subfield == null) return;
		if (this.subfields == null) {
			this.subfields = [subfield];
		} else if (this.subfields != null) {
			this.subfields.push(subfield);
		}
		return this;
	}

	getBlockXML() {
		if (this == null)
			return '';
		let blockXML = `<${this.xmlType} ${this.stringOrEmpty("type", this.type)} ${this.stringOrEmpty("name", this.name)} ${this.stringOrEmpty("id", this.id)}>${this.stringOrEmpty("", this.value)}`;
		if (this.subfields == null)
			this.subfields = [];
		this.subfields.forEach(element => {
			blockXML += this.getBlockXML(element);
		});
		blockXML += `</${this.xmlType}>`;
		return blockXML;
	}

	stringOrEmpty(field = "", string = "") {
		if (string.length > 0) {
			if (field.length > 0)
				return field+"= \""+string+"\"";
			return string;
		}
		return "";
	}
}

export class ToolboxClass {
	ToolboxClass() {
		this.CategoryBlockMap = new Map();
	}

	addCategory(name, color) {
		if (this.CategoryBlockMap == null)
			this.CategoryBlockMap = new Map();
		this.CategoryBlockMap.set(name, 
		{ 
			color: color,
			blocks: [],
		});
	}

	addBlockToCategory(categoryName, block = BlockObject) {
		let category = this.CategoryBlockMap.get(categoryName);
		if (category == null)
			return;
		category.blocks.push(block);
		this.CategoryBlockMap.set(categoryName, 
		{ 
			color: category.color,
			blocks: category.blocks,
		});	
	}

	addSubfieldToBlockObject(blockObject = {}, subfield = {}) {
		if (blockObject.subfield == null) {
			blockObject.subfield = [subfield];
		} else 
		{
			blockObject.subfield.push(subfield);
		}
		return blockObject;
	}

	getCategoryXML(name) {
		let category = this.CategoryBlockMap.get(name);
		if (category == null)
			return '';
		let xml = `<category name="${name}" colour="${category.color}">`;
		category.blocks.forEach(element => {
			if (element instanceof BlockObject) {
				xml += element.getBlockXML();
			}
		});
		xml += `</category>`;
		return xml;
	}
	
	getBlockXML(block) {
		if (block == null)
			return '';
		let blockXML = `<${block.xmlType} ${this.stringOrEmpty("type", block.type)} ${this.stringOrEmpty("name", block.name)} ${this.stringOrEmpty("id", block.id)}>${this.stringOrEmpty("", block.value)}`;
		//let blockXML = `<${block.xmlType} type="${block.type}" name="${block.name} id="${block.id}">${block.value}`;
		if (block.subfields == null)
			block.subfields = [];
		block.subfields.forEach(element => {
			blockXML += this.getBlockXML(element);
		});
		blockXML += `</${block.xmlType}>`;
		return blockXML;
	}

	blocklytoolbox_Functions(BlocklyLocale) {
		this.addCategory(BlocklyLocale.RecipeCategory, "#111213");
	
		this.addBlockToCategory(BlocklyLocale.RecipeCategory, 
			new BlockObject("block", "recipe_list", "", "", "", [
				new BlockObject("field", "", "item_name", "Item Name", "", [])
			]));

		// new BlockObject(xmlType = "", type = "", name = "", value = "", id="", subfields = [])
		return this;
	}
}

function blocklyDefaultToolbox(BlocklyLocale) {
    return `
    <category name="${BlocklyLocale.LogicCategory}" colour="#5b80a5">
		<block type="controls_if"></block>
		<block type="logic_compare">
			<field name="OP">EQ</field>
		</block>
		<block type="logic_operation">
			<field name="OP">AND</field>
		</block>
		<block type="logic_negate"></block>
		<block type="logic_boolean">
			<field name="BOOL">TRUE</field>
		</block>
		<block type="logic_null"></block>
		<block type="logic_ternary"></block>
	</category>
	<category name="${BlocklyLocale.LoopCategory}" colour="#5ba55b">
		<block type="controls_repeat_ext">
			<value name="TIMES">
				<shadow type="math_number">
					<field name="NUM">10</field>
				</shadow>
			</value>
		</block>
		<block type="controls_whileUntil">
			<field name="MODE">WHILE</field>
		</block>
		<block type="controls_for">
			<field name="VAR" id="{+F:*ux)b%gAO*AsTj}{">i</field>
				<value name="FROM">
					<shadow type="math_number">
						<field name="NUM">1</field>
					</shadow>
				</value>
				<value name="TO">
					<shadow type="math_number">
						<field name="NUM">10</field>
					</shadow>
				</value>
				<value name="BY">
					<shadow type="math_number">
						<field name="NUM">1</field>
					</shadow>
				</value>
		</block>
		<block type="controls_forEach">
			<field name="VAR" id="KAYJBR5HEi#n@pQRzKJn">j</field>
		</block>
		<block type="controls_flow_statements">
			<field name="FLOW">BREAK</field>
		</block>
	</category>
	<category name="${BlocklyLocale.MathCategory}" colour="#5b67a5">
		<block type="math_number">
			<field name="NUM">0</field>
		</block>
		<block type="math_arithmetic">
			<field name="OP">ADD</field>
			<value name="A">
				<shadow type="math_number">
					<field name="NUM">1</field>
				</shadow>
			</value>
			<value name="B">
				<shadow type="math_number">
					<field name="NUM">1</field>
				</shadow>
			</value>
		</block>
		<block type="math_single">
			<field name="OP">ROOT</field>
			<value name="NUM">
				<shadow type="math_number">
					<field name="NUM">9</field>
				</shadow>
			</value>
		</block>
		<block type="math_trig">
			<field name="OP">SIN</field>
			<value name="NUM">
				<shadow type="math_number">
					<field name="NUM">45</field>
				</shadow>
			</value>
		</block>
		<block type="math_constant">
			<field name="CONSTANT">PI</field>
		</block>
		<block type="math_number_property">
			<mutation divisor_input="false"></mutation>
			<field name="PROPERTY">EVEN</field>
			<value name="NUMBER_TO_CHECK">
				<shadow type="math_number">
					<field name="NUM">0</field>
				</shadow>
			</value>
		</block>
		<block type="math_round">
			<field name="OP">ROUND</field>
			<value name="NUM">
				<shadow type="math_number">
					<field name="NUM">3.1</field>
				</shadow>
			</value>
		</block>
		<block type="math_on_list">
			<mutation op="SUM"></mutation>
			<field name="OP">SUM</field>
		</block>
		<block type="math_modulo">
			<value name="DIVIDEND">
				<shadow type="math_number">
					<field name="NUM">64</field>
				</shadow>
			</value>
			<value name="DIVISOR">
				<shadow type="math_number">
					<field name="NUM">10</field>
				</shadow>
			</value>
		</block>
		<block type="math_constrain">
			<value name="VALUE">
				<shadow type="math_number">
					<field name="NUM">50</field>
				</shadow>
			</value>
			<value name="LOW">
				<shadow type="math_number">
					<field name="NUM">1</field>
				</shadow>
			</value>
			<value name="HIGH">
				<shadow type="math_number">
					<field name="NUM">100</field>
				</shadow>
			</value>
		</block>
		<block type="math_random_int">
			<value name="FROM">
				<shadow type="math_number">
					<field name="NUM">1</field>
				</shadow>
			</value>
			<value name="TO">
				<shadow type="math_number">
					<field name="NUM">100</field>
				</shadow>
			</value>
		</block>
		<block type="math_random_float"></block>
	</category>
	<category name="${BlocklyLocale.StringsCategory}" colour="#5ba58c">
		<block type="text">
			<field name="TEXT"></field>
		</block>
		<block type="text_join">
			<mutation items="2"></mutation>
		</block>
		<block type="text_append">
		<field name="VAR" id="2YeTYsWn=e.jWZ1_jcJC">item</field>
		<value name="TEXT">
			<shadow type="text">
			<field name="TEXT"></field>
			</shadow>
		</value>
		</block>
		<block type="text_length">
		<value name="VALUE">
			<shadow type="text">
			<field name="TEXT">abc</field>
			</shadow>
		</value>
		</block>
		<block type="text_isEmpty">
		<value name="VALUE">
			<shadow type="text">
			<field name="TEXT"></field>
			</shadow>
		</value>
		</block>
		<block type="text_indexOf">
		<field name="END">FIRST</field>
		<value name="VALUE">
			<block type="variables_get">
			<field name="VAR" id="cZu0g~S;L.v,R7:PZm~3">text</field>
			</block>
		</value>
		<value name="FIND">
			<shadow type="text">
			<field name="TEXT">abc</field>
			</shadow>
		</value>
		</block>
		<block type="text_charAt">
		<mutation at="true"></mutation>
		<field name="WHERE">FROM_START</field>
		<value name="VALUE">
			<block type="variables_get">
			<field name="VAR" id="cZu0g~S;L.v,R7:PZm~3">text</field>
			</block>
		</value>
		</block>
		<block type="text_getSubstring">
		<mutation at1="true" at2="true"></mutation>
		<field name="WHERE1">FROM_START</field>
		<field name="WHERE2">FROM_START</field>
		<value name="STRING">
			<block type="variables_get">
			<field name="VAR" id="cZu0g~S;L.v,R7:PZm~3">text</field>
			</block>
		</value>
		</block>
		<block type="text_changeCase">
		<field name="CASE">UPPERCASE</field>
		<value name="TEXT">
			<shadow type="text">
			<field name="TEXT">abc</field>
			</shadow>
		</value>
		</block>
		<block type="text_trim">
		<field name="MODE">BOTH</field>
		<value name="TEXT">
			<shadow type="text">
			<field name="TEXT">abc</field>
			</shadow>
		</value>
		</block>
		<block type="text_print">
		<value name="TEXT">
			<shadow type="text">
			<field name="TEXT">abc</field>
			</shadow>
		</value>
		</block>
		<block type="text_prompt_ext">
		<mutation type="TEXT"></mutation>
		<field name="TYPE">TEXT</field>
		<value name="TEXT">
			<shadow type="text">
			<field name="TEXT">abc</field>
			</shadow>
		</value>
		</block>
	</category>
	<category name="${BlocklyLocale.ListCategory}" colour="#745ba5">
		<block type="lists_create_with">
			<mutation items="0"></mutation>
		</block>
		<block type="lists_create_with">
			<mutation items="3"></mutation>
		</block>
		<block type="lists_repeat">
			<value name="NUM">
				<shadow type="math_number">
				<field name="NUM">5</field>
				</shadow>
			</value>
		</block>
		<block type="lists_length"></block>
		<block type="lists_isEmpty"></block>
		<block type="lists_indexOf">
			<field name="END">FIRST</field>
			<value name="VALUE">
				<block type="variables_get">
				<field name="VAR" id="-hbRDCa(~y6co@wAQ04y">list</field>
				</block>
			</value>
		</block>
		<block type="lists_getIndex">
			<mutation statement="false" at="true"></mutation>
			<field name="MODE">GET</field>
			<field name="WHERE">FROM_START</field>
			<value name="VALUE">
				<block type="variables_get">
				<field name="VAR" id="-hbRDCa(~y6co@wAQ04y">list</field>
				</block>
			</value>
		</block>
		<block type="lists_setIndex">
		<mutation at="true"></mutation>
		<field name="MODE">SET</field>
		<field name="WHERE">FROM_START</field>
		<value name="LIST">
			<block type="variables_get">
			<field name="VAR" id="-hbRDCa(~y6co@wAQ04y">list</field>
			</block>
		</value>
		</block>
		<block type="lists_getSublist">
		<mutation at1="true" at2="true"></mutation>
		<field name="WHERE1">FROM_START</field>
		<field name="WHERE2">FROM_START</field>
		<value name="LIST">
			<block type="variables_get">
			<field name="VAR" id="-hbRDCa(~y6co@wAQ04y">list</field>
			</block>
		</value>
		</block>
		<block type="lists_split">
		<mutation mode="SPLIT"></mutation>
		<field name="MODE">SPLIT</field>
		<value name="DELIM">
			<shadow type="text">
			<field name="TEXT">,</field>
			</shadow>
		</value>
		</block>
		<block type="lists_sort">
		<field name="TYPE">NUMERIC</field>
		<field name="DIRECTION">1</field>
		</block>
	</category>
	<sep></sep>
	<category name="${BlocklyLocale.VariableCategory}" colour="#a55b80" custom="VARIABLE"></category>
	<category name="${BlocklyLocale.ProcedureCategory}" colour="#995ba5" custom="PROCEDURE"></category>
	<sep></sep>`;
}

function RecipeCategoryToolbox(BlocklyLocale) {
	return `
	<category name="${BlocklyLocale.RecipeCategory}" colour="#111213">
		<block type="item_list"></block>
		<block type="recipe">
			<value name="recipe_ingredients">
				<block type="item_list"></block>
			</value>
			<value name="recipe_result">
				<block type="item_list"></block>
			</value>
			<value name="recipe_category">
				<block type="text">
				</block>
			</value>
			<value name="recipe_time">
				<block type="math_number"></block>
			</value>
	  	</block>
		<block type="keep_item">
			<value name="kept_item">
				<block type="item_list"></block>
			</value>
		</block>
	</category>`;
}

function xml(BlocklyLocale) {
	// new ToolboxClass().blocklytoolbox_Functions(BlocklyLocale).getCategoryXML(BlocklyLocale.RecipeCategory)
    return `
    <xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">
        ${blocklyDefaultToolbox(BlocklyLocale)}    
     	${RecipeCategoryToolbox(BlocklyLocale)}
    </xml>`;
}

/*
        <block type="colorlog">
          <value name="log">
            <block type="text">
              <field name="TEXT">hello world!</field>
            </block>
          </value>
          <value name="color">
            <block type="text">
              <field name="TEXT">yellow</field>
            </block>
          </value>
        </block>
    
        <block type="settimeout">
          <value name="func">
            <block type="log">
              <value name="uni">
              <block type="text">
                <field name="TEXT">hello world!</field>
              </block>
            </value>
            </block>
          </value>
          <value name="timeout">
            <block type="math_number">
              <field name="NUM">1000</field>
            </block>
          </value>
        </block>
    
        <block type="setInterval">
          <value name="func">
            <block type="log">
              <value name="uni">
              <block type="text">
                <field name="TEXT">hello world!</field>
              </block>
            </value>
            </block>
          </value>
          <value name="timeout">
            <block type="math_number">
              <field name="NUM">1000</field>
            </block>
          </value>
        </block>
    
        <block type="clearinterval">
          <value name="id">
            <block type="math_number">
              <field name="NUM">1</field>
            </block>
          </value>
        </block>
    
      </category>
    
    <!-- ————————————————————————旧版———————————————————————— -->
    <!-- ————————————————————————旧版———————————————————————— -->
    <!-- ————————————————————————旧版———————————————————————— -->
    
      <category name="${BlocklyLocale.BasicInterfaceCategory}" colour="#9fa55b">
        <block type="newintpos"></block>
        <block type="newfloatpos"></block>

        <block type="dimension_type">
          <value name="dimension">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.BasicInterfaceOverworld}</field>
            </block>
          </value>
        </block>
        <block type="dimension_type">
          <value name="dimension">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.BasicInterfaceNether}</field>
            </block>
          </value>
        </block>
        <block type="dimension_type">
          <value name="dimension">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.BasicInterfaceEnd}</field>
            </block>
          </value>
        </block>
      </category>
    
      <category name="${BlocklyLocale.CommandOperationCategory}" colour="#5b67a5">
        <block type="runcmd">
          <value name="cmd">
            <block type="text">
              <field name="TEXT">help</field>
            </block>
          </value>
        </block>
        <block type="regplayercmddescription">
          <value name="cmd">
            <block type="text">
              <field name="TEXT">menu</field>
            </block>
          </value>
          <value name="description">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.CommandOperationOpenMainMenu}</field>
            </block>
          </value>
        </block>
        <block type="regcmd">
          <field name="object">Player</field>
          <value name="cmd">
            <block type="text">
              <field name="TEXT">menu</field>
            </block>
          </value>
        </block>
        <block type="getcmdrunner"></block>
        <block type="getruncmdfeedback">
          <field name="type">runcmd</field>
          <value name="cmd">
            <block type="text">
              <field name="TEXT">help</field>
            </block>
          </value>
        </block>
        <block type="sendcmdoutput"></block>
      </category>
      
      <category name="${BlocklyLocale.PlayerOperationCategory}" colour="#a5745b">
        <block type="getonlineplayers"></block>
        <block type="playerobject">
          <field name="type">name</field>
          <value name="info">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.PlayerGameName}</field>
            </block>
          </value>
        </block>
        <block type="kickplayer">
          <value name="info">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.PlayerGameName}</field>
            </block>
          </value>
          <value name="msg">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.PlayerKickMessage} </field>
            </block>
          </value>
        </block>
        <block type="sendtexttoplayer">
          <field name="type">0</field>
          <value name="info">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.PlayerGameName}</field>
            </block>
          </value>
          <value name="msg">
            <block type="text">
              <field name="TEXT">114514</field>
            </block>
          </value>
        </block>
        <block type="broadcast">
          <field name="type">0</field>
          <value name="msg">
            <block type="text">
              <field name="TEXT">114514</field>
            </block>
          </value>
        </block>
        <block type="runcmdas">
          <value name="info">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.PlayerGameName}</field>
            </block>
          </value>
          <value name="cmd">
            <block type="text">
              <field name="TEXT">kill</field>
            </block>
          </value>
        </block>
        <block type="talkas">
          <value name="info">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.PlayerGameName}</field>
            </block>
          </value>
          <value name="text">
            <block type="text">
              <field name="TEXT">114514!</field>
            </block>
          </value>
        </block>
        <block type="teleportplayer">
          <value name="info">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.PlayerGameName}</field>
            </block>
          </value>
          <value name="pos">
            <block type="newfloatpos">
              <value name="x">
                <block type="math_number">
                  <field name="NUM">1.1</field>
                </block>
              </value>
              <value name="y">
                <block type="math_number">
                  <field name="NUM">4.5</field>
                </block>
              </value>
              <value name="z">
                <block type="math_number">
                  <field name="NUM">1.4</field>
                </block>
              </value>
              <value name="NAME">
                <block type="text">
                  <field name="TEXT">${BlocklyLocale.BasicInterfaceOverworld}</field>
                </block>
              </value>
            </block>
          </value>
        </block>
        <block type="killplayer">
          <value name="info">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.PlayerGameName}</field>
            </block>
          </value>
        </block>
        <block type="hurt">
          <value name="info">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.PlayerGameName}</field>
            </block>
          </value>
          <value name="num">
            <block type="math_number">
              <field name="NUM">10</field>
            </block>
          </value>
        </block>
        <block type="setOnFire">
          <value name="info">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.PlayerGameName}</field>
            </block>
          </value>
          <value name="num">
            <block type="math_number">
              <field name="NUM">114</field>
            </block>
          </value>
        </block>
        <block type="renameplayer">
          <value name="info">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.PlayerGameName}</field>
            </block>
          </value>
          <value name="newname">
            <block type="text">
              <field name="TEXT">PA744</field>
            </block>
          </value>
        </block>
        <block type="getblockstandingon">
          <field name="type">name</field>
          <value name="info">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.PlayerGameName}</field>
            </block>
          </value>
        </block>
        <block type="getdevice">
          <value name="info">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.PlayerGameName}</field>
            </block>
          </value>
        </block>
        <block type="getplayerhanditem">
          <value name="info">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.PlayerGameName}</field>
            </block>
          </value>
        </block>
        <block type="getOffHand">
          <value name="info">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.PlayerGameName}</field>
            </block>
          </value>
        </block>
        <block type="getplayerallitems">
          <value name="info">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.PlayerGameName}</field>
            </block>
          </value>
        </block>
        <block type="getArmor">
          <value name="info">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.PlayerGameName}</field>
            </block>
          </value>
        </block>
        <block type="getEnderChest">
          <value name="info">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.PlayerGameName}</field>
            </block>
          </value>
        </block>
        <block type="getRespawnPosition">
          <value name="info">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.PlayerGameName}</field>
            </block>
          </value>
        </block>
        <block type="clearitem">
          <value name="info">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.PlayerGameName}</field>
            </block>
          </value>
          <value name="item">
            <block type="text">
              <field name="TEXT">minecraft:bread</field>
            </block>
          </value>
        </block>
        <block type="refreshitems">
          <value name="info">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.PlayerGameName}</field>
            </block>
          </value>
        </block>
        <block type="refreshChunks">
          <value name="info">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.PlayerGameName}</field>
            </block>
          </value>
        </block>
        <block type="setplayerpermlevel">
          <value name="info">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.PlayerGameName}</field>
            </block>
          </value>
          <value name="level">
            <block type="math_number">
              <field name="NUM">4</field>
            </block>
          </value>
        </block>
        <block type="setplayergamemode">
          <value name="info">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.PlayerGameName}</field>
            </block>
          </value>
          <value name="mode">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.GamemodeCreative}</field>
            </block>
          </value>
        </block>
        <block type="addplayerlevel">
          <value name="info">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.PlayerGameName}</field>
            </block>
          </value>
          <value name="count">
            <block type="math_number">
              <field name="NUM">114514</field>
            </block>
          </value>
        </block>
        <block type="transplayertoserver">
          <value name="info">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.PlayerGameName}</field>
            </block>
          </value>
          <value name="server">
            <block type="text">
              <field name="TEXT">xiabeize.com</field>
            </block>
          </value>
          <value name="port">
            <block type="math_number">
              <field name="NUM">1145</field>
            </block>
          </value>
        </block>
        <block type="crashplayerclient">
          <value name="info">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.PlayerGameName}</field>
            </block>
          </value>
        </block>
        <block type="setsidebar">
          <value name="info">
            <block type="text">
              <field name="TEXT">${BlocklyLocale.PlayerGameName}</field>
            </block>
          </value>
          <value name="title">
            <block type="text">
              <field name="TEXT">Money</field>
            </block>
          </value>
          <value name="data">
            <block type="text">
              <field name="TEXT">"${BlocklyLocale.PlayerGameName}":100,"eoe":80,"YQ":114514</field>
            </block>
          </value>
        </block>
*/