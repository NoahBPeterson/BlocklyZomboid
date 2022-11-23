<template>
    <div id="app">
        <BlocklyComponent id="blockly" :options="options" ref="foo" xml="" @mousedown="showCode()" @keypress="showCode()" @click="showCode()"></BlocklyComponent>
        <div id="code">
          <a href="https://pzwiki.net/wiki/Modding" target="_blank">
            <button id="menubuttons" style="color:#ffffff;background-color:#008766;font-weight:bold;">
              {{BlocklyLocale.ZomboidGuide}}
            </button>
          </a>
          <br>
          <button id="menubuttons" style="color:#000000;background-color:#DBD2CC" @click="backup_workspace()">
            {{BlocklyLocale.BackupWorkspace}}
          </button>
          <!--button id="menubuttons" style="color:#000000;background-color:#DBD2CC;" @click="restore_workspace()">
            {{BlocklyLocale.RestoreWorkspace}}
          </button-->
          Restore: <input type="file" name="inputfile" id="inputfile" @change="restore_file()">
          

          <button id="downloadbutton" size="normal" theme="color" @click="download()">
            <svg id="edcD1BShn9F1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 640 640" shape-rendering="geometricPrecision" text-rendering="geometricPrecision"><g transform="matrix(2.5 0 0 1.75-476.329552-39.889714)"><line x1="0" y1="-128.689884" x2="0" y2="-27.689884" transform="matrix(25 0 0 1 320 233.341149)" fill="none" stroke="#fff" stroke-width="3"/><polygon points="0,-12.923474 11.192057,6.461737 -11.192057,6.461737 0,-12.923474" transform="matrix(-6.704883 0 0-5.297823 320 216.774109)" fill="#fff" stroke-width="0"/></g><rect width="342.385" height="46.4345" rx="0" ry="0" transform="matrix(1.082173 0 0-1.020139 138.410548 542.086399)" fill="#fff" stroke-width="0"/></svg>
          </button>
          <div>
          &nbsp;<img style="vertical-align:middle;" src="./media/languageicon.png">&nbsp;
          <select style="marginTop: 5px;">
              <!--option class="language_option" id="zh_hans_option" @click="language('zh-hans')">中文</option-->
              <option class="language_option" id="en_US_option" @click="language('en-US')">English</option>
          </select>
          </div>
          <!-- <input ref="filElem" type="file" class="upload-file" style="display: none" @change="getFile"> -->
          
          <pre></pre>
          <div class="tab">
            <button id="menubuttons" @mousedown="tabChange('Lua')">Lua</button>
            <button id="menubuttons" @mousedown="tabChange('Scripts')">Scripts</button>
          </div>
          <div id="Lua" class="tabcontent active">
            <pre v-html="code"></pre>
          </div>
          <div id="Scripts" class="tabcontent">
            <pre v-html="scripts"></pre>
          </div>
        </div> 
    </div>
</template>

<script>
import BlocklyComponent from "./components/BlocklyComponent.vue";
import addCustomBlocks from "./blocks/customBlocks";

import Blockly from "blockly";
// import BlocklyJS from "blockly/javascript";
import BlocklyLua from "blockly/lua";
import toolBox from "./toolbox/ToolBox";

import { BlocklyLocale as en_us } from "./localizations/en-us";
// Set Blockly language to English
import english from "blockly/msg/en";

var JSZip = require("jszip");
var FileSaver = require("file-saver");

export default {
    name: "app",
    components: {
        BlocklyComponent,
    },
    data() {
        var blocklyLocale;
        if (document.URL.search("en-US") != -1) {
            blocklyLocale = en_us;
            Blockly.setLocale(english);
        } else {
            blocklyLocale = en_us;
            Blockly.setLocale(english);
        }
        addCustomBlocks(blocklyLocale);

        return {
            BlocklyLocale: blocklyLocale,
            code: "",
            scripts: "",
            options: {
                media: "media/",
                grid: {
                    spacing: 25,
                    length: 3,
                    colour: "#ccc",
                    snap: true,
                },
                toolbox: toolBox(blocklyLocale),
            },
        };
    },
    mounted() {
      this.updateOptions();
        if (document.cookie.length > 1) {
          var xml = Blockly.Xml.textToDom(document.cookie);
          Blockly.getMainWorkspace().clear();
          Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
        }
    },
    methods: {
        language(language) {
           window.open(`#${language}`, "_self");
            var blocklyLocale;
            if (document.URL.search("en-US") != -1) {
                blocklyLocale = en_us;
            } else {
                blocklyLocale = en_us;
            }
            this.updateOptions();
            this.BlocklyLocale = blocklyLocale;
            this.locale = blocklyLocale;
            document.location.reload();
        },
        updateOptions() {
            var options = document.getElementsByClassName("language_option");
            for (var i = 0; i < options.length; i++) {
              options[i].selected = false;
            }
            if (document.URL.search("en-US") != -1) {
                document.getElementById("en_US_option").selected = true;
            } else {
                document.getElementById("en_US_option").selected = true;
            }
        },
        showCode() {
          let codePlusScripts = BlocklyLua.workspaceToCode(this.$refs["foo"].workspace);
          let scripts = codePlusScripts.substring(codePlusScripts.indexOf('Recipe'));
          scripts = scripts.substring(0, codePlusScripts.indexOf('}')+1);
          this.code = BlocklyLua.workspaceToCode(this.$refs["foo"].workspace);
          this.scripts = scripts;
          this.saveToCookies();
        },
        saveToCookies() {
          var xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
          var xml_text = Blockly.Xml.domToText(xml);
          document.cookie = xml_text;
        },
        download() {
          const zip = JSZip();
          zip.file("mod.info", "Hname=My First Mod\nposter=poster.png\nid=MyFirst\ndescription=Basic example mod\nurl=https://theindiestone.com/forums/");

          const media = zip.folder("media");

          let lua = media.folder("lua");
          let shared = lua.folder("shared");
          let clientLua = lua.folder("client");
          let serverLua = lua.folder("server");

          let scripts = media.folder("scripts");
          let ui = media.folder("ui");
          let music = media.folder("music");
          console.log(shared+clientLua+serverLua+scripts+ui+music);

          scripts.file("scripts_test.txt", this.code);

          zip.generateAsync({type:"blob"}).then(function(content) {
            FileSaver.saveAs(content, "example.zip");
          });
          return;
          /*
          let str = this.code;
          // let x = document.getElementById("output");
          function custom_file() {
              var name = prompt(`${this.BlocklyLocale.DownloadPluginMessage}: `, "lxl-plugin");
              if (name != null) {
                window.alert(`${this.BlocklyLocale.DownloadPluginMessageFilename}:` + name + `.js, ${this.BlocklyLocale.DownloadPluginMessageOk}...`)
                download(name+".js",str);
              }

          }
        custom_file();*/
        },
        backup_workspace() {
          try {
            var xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
            var xml_text = Blockly.Xml.domToText(xml);
            var link = document.createElement('a');
            console.log("saving workspace?");
            console.log(xml);
            console.log(xml_text);
            link.download="blockly_zomboid_workspace_backup.txt";
            link.href="data:application/octet-stream;utf-8," + encodeURIComponent(xml_text);
            document.body.appendChild(link);
            link.click();
            link.remove();
          } catch (e) {
            window.location.href="data:application/octet-stream;utf-8," + encodeURIComponent(xml_text);
            alert(e);
          }
        },
        restore_workspace() {
          try {
            var xml_text = prompt("Please enter XML code", "");
            var xml = Blockly.Xml.textToDom(xml_text);
            Blockly.getMainWorkspace().clear();
            Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
          } catch (e) {
            alert(e);
          }
        },
        restore_file() {
            var fileInput = document.getElementById('inputfile');
            var fr=new FileReader();

            fr.onload = function () {
              let xml_backup = fr.result;
              try {
                var xml = Blockly.Xml.textToDom(xml_backup);
                Blockly.getMainWorkspace().clear();
                Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
              } catch (e) {
                alert(e);
                console.log(e);
              }
            };
            fr.readAsText(fileInput.files[0]);
        },
        tabChange(tabName) {
          // Declare all variables
          var i, tabcontent, tablinks;
          // Get all elements with class="tabcontent" and hide them
          tabcontent = document.getElementsByClassName("tabcontent");
          for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
          }

          // Get all elements with class="tablinks" and remove the class "active"
          tablinks = document.getElementsByClassName("tablinks");
          for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
          }

          // Show the current tab, and add an "active" class to the button that opened the tab
          document.getElementById(tabName).style.display = "block";
        } 
    },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html,
body {
  margin: 0;
}

#menubuttons {
  display: inline-block;
  vertical-align: middle;
  min-height: 36px;
  border-radius: 2px;
  min-width: 72px;
  text-transform: uppercase;
  cursor: pointer;
  user-select: none;
  font-size: .9rem;
  letter-spacing: 1px;
  position: relative;
  border: none;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 8px;
  padding-right: 8px;
  transition: 0.2s;
  opacity: 0.85;
}

#downloadbutton {
  background-color:#36A0F4;
  border-radius:50%;
  height:40px;
  width:40px;
  position:absolute;
  right:1px;
  top:1px;
  border: 0px;
  cursor: pointer;
}

button {
  transition:0.5s;
}

#menubuttons:hover {
  opacity: 1;
}

#downloadbutton:hover {
    opacity: 0.9
}

#code {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 30%;
  height: 100%;
  margin: 0;
  background-color: beige;
  --color-primary: 33, 150, 243;
}

#blockly {
  position: absolute;
  left: 1;
  top: 0;
  width: 70%;
  height: 100%;
}

 /* Style the tab; Below CSS taken from https://www.w3schools.com/howto/howto_js_tabs.asp*/
.tab {
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
}

/* Style the buttons that are used to open the tab content */
.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
}

/* Change background color of buttons on hover */
.tab button:hover {
  background-color: #ddd;
}

/* Create an active/current tablink class */
.tab button.active {
  background-color: #ccc;
}

/* Style the tab content */
.tabcontent {
  display: none;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-top: none;
}

</style>
