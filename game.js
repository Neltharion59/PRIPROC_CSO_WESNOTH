window.onload = function() {
     var PhaserGameObject = new Phaser.Game("100%", "120%", Phaser.CANVAS, "", {preload: onPreload, create: onCreate});                
     
     var GameObject = CreateGameObject();
     GameObject.setup_session([0,1]);
     //GameObject.playerQueue.peek()["AI"] = false;

     const image_path_prefix_terrain = "images/terrain/";
     const image_path_prefix_units = "images/";
     const image_path_postfix = ".png";

     const colors = ["", "#d62f15", "#151cd4"];

     const hexagonWidth = 280;
	const hexagonHeight = 280;
     var hexagonGroup;
     var hexagons = Create2DArray(GameObject.gridSizeX, GameObject.gridSizeY);

     var humanMoving = false;
     var end_turn_button = null;
     var selectedUnit = null;
     var possibleSelectedUnitMovents = [];
     var attackButtons = [];


	function onPreload() {
          PhaserGameObject.load.image("marker", "images/marker.png");
          PhaserGameObject.load.image("end_turn", "images/sword.png");
          PhaserGameObject.load.image("attacks/blank-attack.png", "images/attacks/blank-attack.png");
          PhaserGameObject.load.image("endgame", "images/end_of_game.png");

          for(key in GameObject.terrain_dict) {
               PhaserGameObject.load.image(GameObject.terrain_dict[key]["symbol_image"], image_path_prefix_terrain + GameObject.terrain_dict[key]["symbol_image"] + image_path_postfix);
          }
          
          GameObject.UniqueSides.forEach(side => {
               GameObject.sides_dict[side]["recruit"].forEach(current_unit => {
                    let unit_buffer = [current_unit];
                    while(unit_buffer.length > 0) {
                         let unit = unit_buffer.pop();
                         PhaserGameObject.load.image(GameObject.unit_dict[unit]["image"], image_path_prefix_units + GameObject.unit_dict[unit]["image"]);
                         GameObject.unit_dict[unit]["attack"].forEach(attack => {
                              if(attack["icon"]) {
                                   PhaserGameObject.load.image(attack["icon"], image_path_prefix_units + attack["icon"]);
                              } else {
                                   attack["icon"] = "attacks/blank-attack.png";
                              }
                         });

                         if(GameObject.unit_dict[unit]["advances_to"] != null) {
                              unit_buffer = unit_buffer.concat(GameObject.unit_dict[unit]["advances_to"]);
                         }
                    }
               });
               GameObject.sides_dict[side]["leader"].forEach(unit => {
                    PhaserGameObject.load.image(GameObject.unit_dict[unit]["image"], image_path_prefix_units + GameObject.unit_dict[unit]["image"]);
                    GameObject.unit_dict[unit]["attack"].forEach(attack => {
                         if(attack["icon"]) {
                              PhaserGameObject.load.image(attack["icon"], image_path_prefix_units + attack["icon"]);
                         } else {
                              attack["icon"] = "attacks/blank-attack.png";
                         }
                    });
               });
          });
	}

	function onCreate() {
		hexagonGroup = PhaserGameObject.add.group();
          PhaserGameObject.stage.backgroundColor = "#ffffff";

	     for(var i = 0; i < GameObject.gridSizeY; i ++) {
			for(var j = 0; j < GameObject.gridSizeX; j ++) {
                    var hexagonX = hexagonWidth * j * 0.75;
                    var hexagonY = hexagonHeight * i + j % 2 * hexagonHeight / 2;
                    
                    var image = GameObject.terrain_dict[GameObject.map[i][j]]["symbol_image"];

                    var hexagon = PhaserGameObject.add.sprite(hexagonX,hexagonY,image);
                    hexagon.scale.setTo(4,4)

                    /*var style = { font: "30px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: hexagon.width, align: "center", backgroundColor: "#ffff00" };
                    text = PhaserGameObject.add.text(hexagonX, hexagonY, "\n" + i + ","+ j, style);
                    hexagonGroup.add(text);*/

                    hexagon.grid_x = j;
                    hexagon.grid_y = i;
                    hexagon.hexagonX = hexagonX;
                    hexagon.hexagonY = hexagonY;
                    hexagon.unit = null;
                    hexagon.text = null;

                    hexagon.inputEnabled = true;
                    hexagon.events.onInputDown.add(hexagon_clicked, this);

                    hexagons[i][j] = hexagon;
                    hexagonGroup.add(hexagon);
			}
          }
          
          var x = hexagonGroup.width/2;
          var y = -500;

          end_turn_button = PhaserGameObject.add.sprite(x,y,"end_turn");
          hexagonGroup.add(end_turn_button);
          end_turn_button.inputEnabled = true;
          end_turn_button.events.onInputDown.add(clickEndTurn, this);

          var first_player_id = undefined;
          while(first_player_id != GameObject.playerQueue.peek()["id"]) {
               var current_player = GameObject.playerQueue.peek();

               if(first_player_id == undefined) {
                    first_player_id = current_player["id"];
               }

               var image = GameObject.unit_dict[current_player["units"][0]["type"]]["image"];
              /* var x = current_player["units"][0]["x"];
               var y = current_player["units"][0]["y"];
               GameObject.unitMatrix[x][y] = current_player["units"][0];

               GameObject.playerQueue.shift();*/
          }

		hexagonGroup.y = (PhaserGameObject.height-hexagonHeight*Math.ceil(GameObject.gridSizeY/2))/2;
          if(GameObject.gridSizeY%2==0){
               hexagonGroup.y-=hexagonHeight/4;
          }
		hexagonGroup.x = (PhaserGameObject.width-Math.ceil(GameObject.gridSizeX/2)*hexagonWidth-Math.floor(GameObject.gridSizeX/2)*hexagonWidth/2)/2;
          if(GameObject.gridSizeX%2==0){
               hexagonGroup.x-=hexagonWidth/8;
          }

          renderUnits();
          GameObject.playGame(GameObject.Game);
	}

     GameObject.playerDeathCheckRender = function(game) {
          hexagonGroup.destroy();
          PhaserGameObject.width = window.innerWidth * window.devicePixelRatio * 3;
          PhaserGameObject.height = window.innerHeight * window.devicePixelRatio * 3;
          let endgame_banner = PhaserGameObject.add.sprite(0, 0, "endgame");
          endgame_banner.scale.setTo(4,4);

          let end_text = game.playerQueue.peek()["AI"] ? "You have lost!" : "You have won!";
          end_text += "\nPlayer " + game.playerQueue.peek()["id"] + " is victorious!";

          let style = { font: "150px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: PhaserGameObject.width, align: "center"};
          let text_sprite = PhaserGameObject.add.text(0, 0, end_text, style);
     }
     GameObject.humanEndTurnGUIActions = function() {
          end_turn_button.visible = false;
     }
     GameObject.humanStartTurnGUIActions = function() {
          humanMoving = true;
          end_turn_button.visible = true;
     }

     function clickEndTurn() {
          if(!humanMoving) {
               return;
          }

          humanMoving = false;
          applyMassHighlight(dehighlightHexagon);
          selectedUnit = null;

          GameObject.playerQueue.peek()["units"] = GameObject.playerQueue.peek()["units"].filter(unit => !unit["dead"]);
          GameObject.playerQueue.shift();
          GameObject.playerQueue.peek()["units"] = GameObject.playerQueue.peek()["units"].filter(unit => !unit["dead"]);

          GameObject.playGame(GameObject.Game);
     }

     function renderUnits() {
          for(var i = 0; i < hexagons.length; i++) {
               for(var j = 0; j < hexagons[i].length; j++) {
                    if(hexagons[i][j].unit != null) {
                         hexagons[i][j].unit.destroy();
                         hexagons[i][j].unit = null;
                    }

                    if(GameObject.unitMatrix[i][j] != null) {
                         let unit_sprite = PhaserGameObject.add.sprite(hexagons[i][j].hexagonX,hexagons[i][j].hexagonY, GameObject.unit_dict[GameObject.unitMatrix[i][j]["type"]]["image"]);
                         unit_sprite.scale.setTo(4,4);
                         hexagonGroup.add(unit_sprite);
                         hexagons[i][j].unit = unit_sprite;
                    }

                    refreshText(i, j);
               }
          }
     }
     GameObject.renderUnits = renderUnits;
     function refreshText(x, y) {
          let hexagon = hexagons[x][y];

          if(hexagon.text != null) {
               hexagon.text.destroy();
          }
          hexagon.text = null;

          let text = "";
          let unit = GameObject.unitMatrix[x][y];
          if(GameObject.village_matrix[x][y] != null && GameObject.village_matrix[x][y] != -1) {
               text += "Own: P" + GameObject.village_matrix[x][y].toString() + "\n";
          }
          if(GameObject.unitMatrix[x][y] != null) {
               text += "HP: " + unit["hp"].toString() + "\nXP: " + unit["xp"].toString() + "\nMP: " + unit["move_points"].toString();
          }
          if(text == "") {
               return;
          }
          let player_id = unit == null ? GameObject.village_matrix[x][y] : unit["player_id"];

          let style = { font: "30px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: hexagons[x][y].width, align: "center", backgroundColor: colors[player_id] };
          hexagons[x][y].text = PhaserGameObject.add.text(hexagons[x][y].hexagonX, hexagons[x][y].hexagonY, text, style);
          hexagonGroup.add(hexagons[x][y].text);
     }
     
     function hexagon_clicked(hexagon) {
          if(!humanMoving) {
               return;
          }

          if(selectedUnit == null) {
               if(hexagon.unit == null) {
                    return;
               }
               if(GameObject.unitMatrix[hexagon.grid_y][hexagon.grid_x]["player_id"] != GameObject.playerQueue.peek()["id"]) {
                    return;
               }
               
               selectUnit(hexagon);
          } else {
               if(GameObject.unitMatrix[hexagon.grid_y][hexagon.grid_x] != null && GameObject.unitMatrix[hexagon.grid_y][hexagon.grid_x]["player_id"] == GameObject.playerQueue.peek()["id"]) {
                    unselectUnit();
                    selectUnit(hexagon);
               } else {
                    var selectedMovement = selectedMovementPossible(hexagon);
                    if(selectedMovement == null) {
                         return;
                    }
                    
                    // MOVE
                    if(GameObject.unitMatrix[hexagon.grid_y][hexagon.grid_x] == null) {
                         GameObject.performMoving([selectedMovement], [selectedUnit], GameObject.Game);
                         renderUnits();
                         unselectUnit(selectedUnit);
                    }
                    // ATTACK
                    else {
                         showAttackOffer(selectedUnit, selectedMovement);
                    }
               }
          }
     }
     function unselectUnit() {
          selectedUnit = null;
          applyMassHighlight(dehighlightHexagon);
          possibleSelectedUnitMovents = [];
          hideAttackOffer();
     }
     function selectUnit(hexagon) {
          selectedUnit = GameObject.unitMatrix[hexagon.grid_y][hexagon.grid_x];

          applyMassHighlight(dehighlightHexagon);
          //console.log(unitMatrix[hexagon.grid_y][hexagon.grid_x]);
          possibleSelectedUnitMovents = movements = GetPossibleMovements(
               GameObject.unitMatrix[hexagon.grid_y][hexagon.grid_x]["x"],
               GameObject.unitMatrix[hexagon.grid_y][hexagon.grid_x]["y"],
               GameObject.unitMatrix[hexagon.grid_y][hexagon.grid_x]["move_points"],
               GameObject.movement_type_dict[GameObject.unit_dict[GameObject.unitMatrix[hexagon.grid_y][hexagon.grid_x]["type"]]["movement_type"]],
               GameObject.terrain_dict,
               GameObject.map,
               GameObject.unitMatrix,
               GameObject.playerQueue.peek()["id"]
          );

          movements.forEach(element => {
               highlightHexagonWalkable(hexagons[element["coords"][0]][element["coords"][1]]);
          });
          highlightHexagonSelectedUnit(hexagon);
     }
     function applyMassHighlight(apply_func) {
          for(var i = 0; i<hexagons.length; i++) {
               for(var j = 0; j<hexagons[i].length; j++) {
                    apply_func(hexagons[i][j]);
               }
          }
     }
     function dehighlightHexagon(hexagon) {
          hexagon.tint = 0xffffff;
     }
     function highlightHexagonWalkable(hexagon) {
          hexagon.tint = 0x00ff80;
     }
     function highlightHexagonSelectedUnit(hexagon) {
          hexagon.tint = 0xffff00;
     }
     function selectedMovementPossible(hexagon) {
          var result = null;
          for(var i = 0; i<possibleSelectedUnitMovents.length; i++) {
               if(hexagon.grid_y == possibleSelectedUnitMovents[i]["coords"][0] && hexagon.grid_x == possibleSelectedUnitMovents[i]["coords"][1]) {
                    result = possibleSelectedUnitMovents[i];
                    break;
               }
          }
          return result;
     }
     function showAttackOffer(attacker, attackCommand) {
          var unit_type_dict = GameObject.unit_dict[attacker["type"]];

          var i = 0;
          unit_type_dict["attack"].forEach(attack => {
               var attackButton = PhaserGameObject.add.sprite(-600, i * 500, attack["icon"]);
               hexagonGroup.add(attackButton);
               attackButton.scale.setTo(10,10)

               attackButton.inputEnabled = true; 
               attackButton.events.onInputDown.add(SelectAttack, this);
               attackButtons.push(attackButton);

               attackButton.attackID = i;
               attackButton.attacker = attacker;
               attackButton.attackCommand = attackCommand;

               i++;
          });
     }
     function hideAttackOffer() {
          attackButtons.forEach(button => {
               button.destroy();
          });
          attackButtons = [];
     }
     function SelectAttack(sprite) {
          var attackCommand = sprite.attackCommand;
          attackCommand["attack_id"] = sprite.attackID;

          GameObject.performMoving([attackCommand], [sprite.attacker], GameObject.Game);
          hideAttackOffer();
          unselectUnit();

          renderUnits();
     }
     /*function hexagonsToGrid() {
          var Grid = Create2DArray(gridSizeX, gridSizeY);
          for(var i = 0; i < hexagons.length; i++) {
               for(var j = 0; j < hexagons[i].length; j++) {
                    Grid[i][j] = hexagons[i][j].unit;
               }
          }
          return Grid;
     }
     function unitMatrixCopy() {
          var Grid = Create2DArray(gridSizeX, gridSizeY);
          for(var i = 0; i < unitMatrix.length; i++) {
               for(var j = 0; j < unitMatrix[i].length; j++) {
                    Grid[i][j] = unitMatrix[i][j];
               }
          }
          return Grid;
     }
     function gridsAreEqual(grid1, grid2) {
          var result = true;
          for(var i = 0; i < hexagons.length; i++) {
               for(var j = 0; j < hexagons[i].length; j++) {
                    if(!(grid1[i][j] == grid2[i][j])) {
                         result = false;
                         break;
                    }
               }
          }
          return result;
     }
     function unitMatrixAndHexagonsMatch() {
          var result = true;
          var x;
          var y;
          for(var i = 0; i < hexagons.length; i++) {
               for(var j = 0; j < hexagons[i].length; j++) {
                    x = hexagons[i][j].unit == null;
                    y = unitMatrix[i][j] == null;
                    if(!(x == y)) {
                         result = false;
                         break;
                    }
               }
          }
          return result;
     }*/
}