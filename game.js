window.onload = function() {
     var game = new Phaser.Game("100%", "120%", Phaser.CANVAS, "", {preload: onPreload, create: onCreate});                
     
     var mapDict = getMaps();
     var mapName = "PRIPOC_MAPA_1";
     var map = MapToGrid(mapDict[mapName]);
     var starting_positions = extractStartingPositions(map);
     removeStartingPositions(map);
     var CSO = this.createCSOObject();

     var terrain_dict = createMinTerrainDict(onlyUniqueMapParts(map));
    // console.log(map);
     var race_dict = createRaceDict();
     var movement_type_dict = createMovementDict();
     var unit_dict = createUnitDict();

     const image_path_prefix_terrain = "images/terrain/";
     const image_path_prefix_units = "images/";
     const image_path_postfix = ".png";

     var sides_dict = createSidesDict();
     var sides_list = [];
     Object.keys(sides_dict).forEach(function(key) {
          if(key != "Dunefolk") {
               sides_list.push(key);
          }
     });

     var playerQueue = new Queue();
     var UniqueSides = [];
     for(var i = 0; i < starting_positions.length; i++) {
          var player = {"id": i+1, "units":[], "side": sides_list[Math.floor(Math.random() * sides_list.length)], "gold":100};
          if(i == 0) {
               player["AI"] = false;
          } else {
               player["AI"] = true;
          }
          var leader = {
               "is_leader": true,
               "type": sides_dict[player["side"]]["leader"][Math.floor(Math.random() * sides_dict[player["side"]]["leader"].length)]
          };
          leader["hp"] = unit_dict[leader["type"]]["hitpoints"];
          leader["xp"] = 0;
          leader["x"] = starting_positions[i][0];
          leader["y"] = starting_positions[i][1];
          leader["player_id"] = i + 1;
          leader["move_points"] = 0;

          player["units"].push(leader);

          playerQueue.enqueue(player);

          if(!UniqueSides.includes(player["side"])) {
               UniqueSides.push(player["side"]);
          }
     }
     playerQueue.shift = function(){ var temp = this.dequeue(); this.enqueue(temp);};
     //playerQueue.gameIsOver = function() {}

     var hexagonWidth = 280;
	var hexagonHeight = 280;
     //var gridSizeX = map[0].length;
     //var gridSizeY = map.length;
     var gridSizeX = map[0].length;
     var gridSizeY = map.length;
	var columns = [Math.ceil(gridSizeY/2),Math.floor(gridSizeY/2)];
     var moveIndex;
     var sectorWidth = hexagonWidth/4*3;
     var sectorHeight = hexagonHeight;
     var gradient = (hexagonWidth/4)/(hexagonHeight/2);
     var marker = null;
     var hexagonGroup;
     var hexagons = Create2DArray(gridSizeX, gridSizeY);
     //console.log(gridSizeX, gridSizeY);
    // console.log(hexagons);
     var unitMatrix = Create2DArray(gridSizeX, gridSizeY);

     for(var i = 0; i < unitMatrix.length; i++) {
          for(var j = 0; j < unitMatrix[i].length; j++) {
               unitMatrix[i][j] = null;
          }
     }
     var hireMatrix = Create2DArray(gridSizeX, gridSizeY);
     for(var i = 0; i < hireMatrix.length; i++) {
          for(var j = 0; j < hireMatrix[i].length; j++) {
               hireMatrix[i][j] = null;
          }
     }
     for(var i = 0; i < starting_positions.length; i++) {
          hireMatrix[starting_positions[i][0]][starting_positions[i][1]] = findSurroundingHireToFields(starting_positions[i], map, terrain_dict);
     }
     //console.log(hireMatrix);

    // console.log(GetPossibleMovements(0, 0, 5, movement_type_dict["orcishfoot"], terrain_dict, map, unitMatrix, playerQueue.peek["id"]));


     var humanMoving = false;
     var gameOver = false;
     var end_turn_button = null;
     var turn_count = 0;
     var selectedUnit = null;
     var possibleSelectedUnitMovents = [];
     var attackButtons = [];

	function onPreload() {
          game.load.image("marker", "images/marker.png");
          game.load.image("end_turn", "images/sword.png");
          game.load.image("attacks/blank-attack.png", "images/attacks/blank-attack.png");

          for(key in terrain_dict) {
               game.load.image(terrain_dict[key]["symbol_image"], image_path_prefix_terrain + terrain_dict[key]["symbol_image"] + image_path_postfix);
          }
          
          UniqueSides.forEach(side => {
               sides_dict[side]["recruit"].forEach(unit => {
                    game.load.image(unit_dict[unit]["image"], image_path_prefix_units + unit_dict[unit]["image"]);
                    unit_dict[unit]["attack"].forEach(attack => {
                         if(attack["icon"]) {
                              game.load.image(attack["icon"], image_path_prefix_units + attack["icon"]);
                         } else {
                              attack["icon"] = "attacks/blank-attack.png";
                         }
                    });
               });
               sides_dict[side]["leader"].forEach(unit => {
                    game.load.image(unit_dict[unit]["image"], image_path_prefix_units + unit_dict[unit]["image"]);
                    unit_dict[unit]["attack"].forEach(attack => {
                         if(attack["icon"]) {
                              game.load.image(attack["icon"], image_path_prefix_units + attack["icon"]);
                         } else {
                              attack["icon"] = "attacks/blank-attack.png";
                         }
                    });
               });
          });
	}

	function onCreate() {
		hexagonGroup = game.add.group();
          game.stage.backgroundColor = "#ffffff";

	     for(var i = 0; i < gridSizeY; i ++) {
			for(var j = 0; j < gridSizeX; j ++) {
                    var hexagonX = hexagonWidth * j * 0.75;
                    var hexagonY = hexagonHeight*i + j%2*hexagonHeight/2;
                    
                    //console.log(i, j);
                    /*console.log(map[i][j]);*/
                    var image = terrain_dict[map[i][j]]["symbol_image"];

                    var hexagon = game.add.sprite(hexagonX,hexagonY,image);
                    hexagon.scale.setTo(4,4)

                    /*var style = { font: "30px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: hexagon.width, align: "center", backgroundColor: "#ffff00" };
                    text = game.add.text(hexagonX, hexagonY, "\n" + i + ","+ j, style);
                    //text.anchor.set(0.5);
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

          end_turn_button = game.add.sprite(x,y,"end_turn");
          hexagonGroup.add(end_turn_button);
          end_turn_button.inputEnabled = true;
          end_turn_button.events.onInputDown.add(clickEndTurn, this);

          var first_player_id = undefined;
          while(first_player_id != playerQueue.peek()["id"]) {
               var current_player = playerQueue.peek();

               if(first_player_id == undefined) {
                    first_player_id = current_player["id"];
               }

               var image = unit_dict[current_player["units"][0]["type"]]["image"];
               var x = current_player["units"][0]["x"];
               var y = current_player["units"][0]["y"];
               unitMatrix[x][y] = current_player["units"][0];

               var unit = game.add.sprite(hexagons[x][y].hexagonX,hexagons[x][y].hexagonY,image);
               unit.scale.setTo(4,4);
               hexagonGroup.add(unit);

               hexagons[x][y].unit = unit;
               refreshText(current_player["units"][0]);
               playerQueue.shift();

               /*console.log("test");
               console.log(movement_type_dict[unit_dict[unitMatrix[x][y]["type"]]["movement_type"]]["defense"]);
               console.log(terrain_dict[map[x][y]]["name"]);
               console.log(movement_type_dict[unit_dict[unitMatrix[x][y]["type"]]["movement_type"]]["defense"][terrain_dict[map[x][y]]["name"]]);

               var unit_def_dict = movement_type_dict[unit_dict[unitMatrix[x][y]["type"]]["movement_type"]]["defense"];
               var mapss = [];
               for(var i =0; i<map.length; i++) {
                    for(var j =0; j<map[0].length; j++) {
                         mapss.push(map[i][j]);
                    }
               }
               var unique = mapss.filter((v, i, a) => a.indexOf(v) === i); 
               console.log(unique);
               var unique2 = unique.map(x => terrain_dict[x]["name"]);
               unique2 = unique2.filter((v, i, a) => a.indexOf(v) === i); 
               console.log(unique2);

               for (var key in movement_type_dict) {
                    if(!movement_type_dict[key]["defense"]) {
                         console.log(key);
                    }
               }

               for (var key in movement_type_dict) {
                    for(var item in unique2) {
                         if(!movement_type_dict[key]["defense"][unique2[item]]) {
                              console.log("No " +unique2[item]+ " for " +key);
                         }
                    }
                }*/
          }

		hexagonGroup.y = (game.height-hexagonHeight*Math.ceil(gridSizeY/2))/2;
          if(gridSizeY%2==0){
               hexagonGroup.y-=hexagonHeight/4;
          }
		hexagonGroup.x = (game.width-Math.ceil(gridSizeX/2)*hexagonWidth-Math.floor(gridSizeX/2)*hexagonWidth/2)/2;
          if(gridSizeX%2==0){
               hexagonGroup.x-=hexagonWidth/8;
          }

          playGame();
	}

     function playerDeathCheck() {
         // console.log("Player death check");

          var checked_player_ids = [];
          while(true) {
               if(checked_player_ids.includes(playerQueue.peek()["id"])) {
                    break;
               }

               var player_died = true;
               for(var i = 0; i < playerQueue.peek()["units"].length; i++) {
                    if(playerQueue.peek()["units"][i]["is_leader"]) {
                         player_died = playerQueue.peek()["units"][i]["hp"] <= 0;
                         break;
                    }
               }
               console.log("Player died " + player_died.toString());

               if(player_died) {
                    destroyAllPlayerUnits(playerQueue.dequeue());
               } else {
                    checked_player_ids.push(playerQueue.peek()["id"]);
                    playerQueue.shift();
               }
          }

          if(playerQueue.getLength() <= 1) {
               gameOver = true;
               console.log("Game over");
          }
     }

     function destroyAllPlayerUnits(player) {
          player["units"].forEach(unit => {
               unit["hp"] = -1;
               console.log(unit);
               tryKillUnit(unit["x"], unit["y"]);
          });
     }

     function playGame() {
          //console.log("b4 game over check");
          //console.log(gameOver);
          if(gameOver) {
               return;
          }
          //console.log("after game over check");
          gameOver = (playerQueue.getLength() <= 1);

          //console.log("b4 loop");
          while(nextTurn() && !gameOver) {
               //console.log("in loop");
               //gameOver = (playerQueue.getLength() <= 1);
          }
          //console.log("after loop");
     }

     function nextTurn() {
          if(playerQueue.peek()["id"] == 1) {
               turn_count++;
               console.log("Turn number:" + turn_count);
          }


          for(var i = 0; i < playerQueue.peek()["units"].length; i++) {
               playerQueue.peek()["units"][i]["move_points"] = unit_dict[playerQueue.peek()["units"][i]["type"]]["movement"];
               refreshText(playerQueue.peek()["units"][i]);
          }
          

          if(playerQueue.peek()["AI"]) {
               end_turn_button.visible = false;
               var movements = calculateMoveOrders();
               //console.log(movements);
               performMoving(movements, playerQueue.peek()["units"]);
               playerQueue.peek()["units"] = playerQueue.peek()["units"].filter(unit => !unit["dead"]);

               recruit();
               playerQueue.shift();
               playerQueue.peek()["units"] = playerQueue.peek()["units"].filter(unit => !unit["dead"]);
               return true;
          } else {
               recruit();

               humanMoving = true;
               end_turn_button.visible = true;
               

               return false;
          }
     }

     function clickEndTurn() {
          //console.log("Clicked end turn");

          if(!humanMoving) {
               return;
          }
          //console.log("Human moving test passed");

          humanMoving = false;
          applyMassHighlight(dehighlightHexagon);
          selectedUnit = null;
          playerQueue.peek()["units"] = playerQueue.peek()["units"].filter(unit => !unit["dead"]);
          playerQueue.shift();
          playerQueue.peek()["units"] = playerQueue.peek()["units"].filter(unit => !unit["dead"]);
          //console.log("about ot playGame");
          playGame();
     }

     function recruit() {

          //console.log("recruit called");

          var leader = null;
          for(var i = 0; i<playerQueue.peek()["units"].length; i++)
          {
               //console.log("checking unit " + i);
               if(playerQueue.peek()["units"][i]["is_leader"]) {
                    leader = playerQueue.peek()["units"][i];
                   // console.log("found leader");
                    break;
               }
          }

          if(leader == null) {
               return;
          }

          //console.log("recruit - leader found");

          hire_positions = null;
          for(var i = 0; i<starting_positions.length; i++)
          {
               if(leader["x"] == starting_positions[i][0] && leader["y"] == starting_positions[i][1]) {
                    hire_positions = hireMatrix[leader["x"]][leader["y"]].map(function(arr) {
                         return arr.slice();
                    });
                    break;
               }
          }

          if(hire_positions == null) {
               return;
          }

          //console.log("recruit - hire positions found");
         
          //console.log(hire_positions.length + " positions found");
          for(var i = hire_positions.length - 1; i >= 0; i--)
          {
               if(unitMatrix[hire_positions[i][0]][hire_positions[i][1]] != null) {
                    hire_positions.splice(i, 1);
               }
          }

          //console.log(hire_positions.length + " positions available");

          for(var i = 0; i < hire_positions.length; i++) {

               var possible_to_hire = sides_dict[playerQueue.peek()["side"]][["recruit"]];
               for(var j = possible_to_hire.length - 1; j >= 0; j--)
               {
                    if(unit_dict[possible_to_hire[j]]["cost"] > playerQueue.peek()["gold"]) {
                         possible_to_hire.splice(j, 1);
                    }
               }

               if(possible_to_hire.length <= 0) {
                    break;
               }

               var hireType = possible_to_hire[Math.floor(Math.random() * possible_to_hire.length)];
               //console.log("Hire type: "); console.log(hireType);
               //We know what type unit we want to hire and where to place it
               var x = hire_positions[i][0];
               var y = hire_positions[i][1];
               var unit = {
                    "is_leader": false,
                    "type": hireType,
                    "hp": unit_dict[hireType]["hitpoints"],
                    "xp": 0,
                    "x": x,
                    "y": y,
                    "player_id": playerQueue.peek()["id"],
                    "move_points": 0
               };
               unitMatrix[x][y] = unit;
               playerQueue.peek()["units"].push(unit);
               playerQueue.peek()["gold"] -= unit_dict[hireType]["cost"];
               console.log("Gold: " + playerQueue.peek()["gold"].toString());

               //Visual
               var unit_sprite = game.add.sprite(hexagons[x][y].hexagonX,hexagons[x][y].hexagonY, unit_dict[hireType]["image"]);
               unit_sprite.scale.setTo(4,4);
               hexagonGroup.add(unit_sprite);
               hexagons[x][y].unit = unit_sprite;
               refreshText(unit);
          }
     }

     function calculateMoveOrders() {
          var possible_movements = [[]];
          for(var i = 1; i < playerQueue.peek()["units"].length; i++) {
               possible_movements.push(GetPossibleMovements(
                    playerQueue.peek()["units"][i]["x"],
                    playerQueue.peek()["units"][i]["y"],
                    playerQueue.peek()["units"][i]["move_points"],
                    movement_type_dict[unit_dict[playerQueue.peek()["units"][i]["type"]]["movement_type"]],
                    terrain_dict,
                    map,
                    unitMatrix,
                    playerQueue.peek()["id"]
               ));
          };

         // var selectedMovements = cat_swarm_optimization(possible_movements, playerQueue.peek()["units"], unit_dict);/*MovementCalculationRandom(possible_movements);*/
          var selectedMovements = cat_swarm_optimization(CSO, possible_movements, playerQueue.peek()["units"], unit_dict);
          //console.log("Selected movements");
          //console.log(selectedMovements);
          return selectedMovements;
     }

     function performMoving(movements, units) {
          for(var i = 0; i < movements.length && i < units.length; i++) {

               if(gameOver) {
                    break;
               }

               if(movements[i] == null) {
                    continue;
               }
               //console.log(movements[i]);

               if(movements[i]["is_attack"])
               {
                    if(movements[i]["previous"] != null) {
                         var x = movements[i]["previous"]["coords"][0];
                         var y = movements[i]["previous"]["coords"][1];
                    } else {
                         var x = units[i]["x"];
                         var y = units[i]["y"];
                    }
               } else {
                    var x = movements[i]["coords"][0];
                    var y = movements[i]["coords"][1];
               }
               var old_x = units[i]["x"];
               var old_y = units[i]["y"];

               if(!(x == old_x && y == old_y)) {
                    units[i]["x"] = x;
                    units[i]["y"] = y;

                    unitMatrix[old_x][old_y] = null;
                    unitMatrix[x][y] = units[i];

                    hexagons[x][y].unit = hexagons[old_x][old_y].unit;
                    hexagons[old_x][old_y].unit = null;
                    hexagons[x][y].unit.x = hexagons[x][y].hexagonX;
                    hexagons[x][y].unit.y = hexagons[x][y].hexagonY;

                    units[i]["move_points"] = movements[i]["is_attack"] ? movements[i]["previous"]["remaining_movement"] : movements[i]["remaining_movement"];

                    clearText(hexagons[old_x][old_y]);
                    refreshText(units[i]);
               }
               if(movements[i]["is_attack"]) {
                    console.log("Attack with sharpened steel");

                    units[i]["move_points"] = 0;
                    /*console.log("Attacking");
                    console.log(movements[i]["attack_id"]);
                    console.log(units[i]["attack"]);*/

                    performAttack(
                         units[i]["x"],
                         units[i]["y"],
                         movements[i]["coords"][0],
                         movements[i]["coords"][1],
                         movements[i]["attack_id"]
                    ); 
                    // Attacker
                    refreshText(unitMatrix[units[i]["x"]][units[i]["y"]]);
                    // Defender
                    refreshText(unitMatrix[movements[i]["coords"][0]][movements[i]["coords"][1]]);

                    playerDeathCheck();
               }
          }
     }
     function performAttack(atk_x, atk_y, def_x, def_y, atk_id) {
          if(unitMatrix[atk_x][atk_y] == null || unitMatrix[def_x][def_y] == null) {
               return;
          }

         //console.log(atk_x, atk_y, def_x, def_y, atk_id);
          //console.log(unitMatrix[atk_x][atk_y]);
         // console.log(unitMatrix[def_x][def_y]);

          var attacker_type_dict = unit_dict[unitMatrix[atk_x][atk_y]["type"]];
          var attacker_attack = attacker_type_dict["attack"][atk_id];

          var attacker_dmg = attacker_attack["damage"];
          var attacker_atk_type = attacker_attack["type"];
          var attacker_terrain_bonus = movement_type_dict[attacker_type_dict["movement_type"]]["defense"][terrain_dict[map[atk_x][atk_y]]["name"]];
          var attacker_atk_count = attacker_attack["number"];
          
          var defender_terrain_bonus = movement_type_dict[unit_dict[unitMatrix[def_x][def_y]["type"]]["movement_type"]]["defense"][terrain_dict[map[def_x][def_y]]["name"]];
          
          var defender_type_dict = unit_dict[unitMatrix[def_x][def_y]["type"]];

          //console.log(attacker_type_dict);
         // console.log(defender_type_dict);

          var possible_defender_attacks = [];
          for(var i = 0; i < defender_type_dict["attack"].length; i++) {
               if(attacker_attack["range"] == defender_type_dict["attack"][i]["range"]) {
                    possible_defender_attacks.push(defender_type_dict["attack"][i]);
               }
          }

          var best_index = -1;
          var best_value = 0;
          for(var i = 0; i < possible_defender_attacks.length; i++) {
               var current_value = possible_defender_attacks[i]["damage"] * getResistance(attacker_type_dict, possible_defender_attacks[i]["type"]) / 100 * possible_defender_attacks[i]["number"];
               current_value = Math.floor(current_value);
               if(current_value > best_value) {
                    best_value = current_value;
                    best_index = i;
               }
          }
 
          var defender_attack = 0;
          var defender_dmg = 0;
          var defender_atk_count = 0;
          var defender_atk_type = null;    
          if(best_index != -1) {
               defender_attack = possible_defender_attacks[best_index];
               defender_dmg = defender_attack["damage"];
               defender_atk_count = defender_attack["number"];
               defender_atk_type = defender_attack["type"];
          }

          var attacker_resistance = getResistance(unit_dict[unitMatrix[atk_x][atk_y]["type"]], defender_atk_type);
          var defender_resistance = getResistance(unit_dict[unitMatrix[def_x][def_y]["type"]], attacker_atk_type);

          var attacker_final_dmg = Math.floor(attacker_dmg * defender_resistance / 100);
          var defender_final_dmg = Math.floor(defender_dmg * attacker_resistance / 100);

          var attacker_hit_chance = defender_terrain_bonus;
          var defender_hit_chance = attacker_terrain_bonus;

          //console.log(attacker_atk_count, defender_atk_count);

          while(defender_atk_count > 0 || attacker_atk_count > 0) {
               if(attacker_atk_count > 0) {
                   // console.log("Defender hp");
                   // console.log(unitMatrix[def_x][def_y]["hp"]);

                    var hit_target = Math.random() < (attacker_hit_chance / 100);
                    

                    if(hit_target) {
                         unitMatrix[def_x][def_y]["hp"] -= attacker_final_dmg;
                    }

                    --attacker_atk_count;

                    //console.log(hit_target, attacker_final_dmg, unitMatrix[def_x][def_y]["hp"]);
               }

               if(tryKillUnit(def_x, def_y)) {
                    break;
               }

               if(defender_atk_count > 0) {
                   // console.log("Attacker hp");
                    //console.log(unitMatrix[atk_x][atk_y]["hp"]);

                    var hit_target = Math.random() < (defender_hit_chance / 100);
                    
                    if(hit_target) {
                         unitMatrix[atk_x][atk_y]["hp"] -= defender_final_dmg;
                    }

                    --defender_atk_count;

                    //console.log(hit_target, defender_final_dmg, unitMatrix[atk_x][atk_y]["hp"]);
               }

               if(tryKillUnit(atk_x, atk_y)) {
                    break;
               }
          }
        
     }
     function tryKillUnit(x, y) {
          //console.log(x,y);

          if(unitMatrix[x][y] == null) {
               return;
          }

          if(unitMatrix[x][y]["hp"] <= 0) {
               var hexagon = hexagons[x][y];

               hexagon.unit.destroy();
               hexagon.unit = null;
               clearText(hexagon);
               
               //console.log("Killing unit");
               //console.log(unitMatrix[x][y]);

               unitMatrix[x][y]["dead"] = true;
               unitMatrix[x][y] = null;

               
               /*for(var i = 0; i < playerQueue.peek()["units"].length; i++) {
                    if(playerQueue.peek()["units"][i]["x"] == x && playerQueue.peek()["units"][i]["y"] == y) {
                         console.log("nulling a unit");
                         playerQueue.peek()["units"][i] = null;
                         break;
                    }
               }*/
               
               
               return true;
          }

          return false;
     }

     function getResistance(attacked_unit_dict, atk_type) {
          var result = 100;
          if(atk_type in movement_type_dict[attacked_unit_dict["movement_type"]]["resistance"]) {
               result = movement_type_dict[attacked_unit_dict["movement_type"]]["resistance"][atk_type];
          }
          return result;
     }

     function clearText(hexagon) {
          if(hexagon.text != null) {
               hexagon.text.destroy();
          }
          hexagon.text = null;
     }
     function refreshText(unit) {
          if(unit == null) {
               return;
          }

          var x = unit["x"];
          var y = unit["y"];

          if(hexagons[x][y].text != null) {
               hexagons[x][y].text.destroy();
          }

          var style = { font: "30px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: hexagons[x][y].width, align: "center", backgroundColor: "#ffffff" };
          hexagons[x][y].text = game.add.text(hexagons[x][y].hexagonX, hexagons[x][y].hexagonY, "HP: " + unit["hp"].toString() + "\nXP: " + unit["xp"].toString() + "\nMP: " + unit["move_points"].toString(), style);
          hexagonGroup.add(hexagons[x][y].text);
     }
     
     function hexagon_clicked(hexagon) {
          //console.log(hexagon.grid_x + ", " + hexagon.grid_y);

          if(!humanMoving) {
               return;
          }

          if(selectedUnit == null) {
               if(hexagon.unit == null) {
                    return;
               }
               if(unitMatrix[hexagon.grid_y][hexagon.grid_x]["player_id"] != playerQueue.peek()["id"]) {
                    return;
               }
               
               selectUnit(hexagon);

               //console.log("Grid check");
              // console.log(hexagon.grid_x, hexagon.grid_y);
              // console.log(possibleSelectedUnitMovents[0]["coords"]);
          } else {
               if(unitMatrix[hexagon.grid_y][hexagon.grid_x] != null && unitMatrix[hexagon.grid_y][hexagon.grid_x]["player_id"] == playerQueue.peek()["id"]) {
                   // console.log("reselect"); 
                    unselectUnit();
                    selectUnit(hexagon);
               } else {
                    
                    var selectedMovement = selectedMovementPossible(hexagon);
                    if(selectedMovement == null) {
                         return;
                    }
                    
                   // console.log("Should do action now");
                    // MOVE
                    if(unitMatrix[hexagon.grid_y][hexagon.grid_x] == null) {

                         performMoving([selectedMovement], [selectedUnit]);
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
          selectedUnit = unitMatrix[hexagon.grid_y][hexagon.grid_x];

          applyMassHighlight(dehighlightHexagon);
          //console.log(unitMatrix[hexagon.grid_y][hexagon.grid_x]);
          possibleSelectedUnitMovents = movements = GetPossibleMovements(
               unitMatrix[hexagon.grid_y][hexagon.grid_x]["x"],
               unitMatrix[hexagon.grid_y][hexagon.grid_x]["y"],
               unitMatrix[hexagon.grid_y][hexagon.grid_x]["move_points"],
               movement_type_dict[unit_dict[unitMatrix[hexagon.grid_y][hexagon.grid_x]["type"]]["movement_type"]],
               terrain_dict,
               map,
               unitMatrix,
               playerQueue.peek()["id"]
          );
         // console.log(movements);
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
          var unit_type_dict = unit_dict[attacker["type"]];

          var i = 0;
          unit_type_dict["attack"].forEach(attack => {
               var attackButton = game.add.sprite(-600, i * 500, attack["icon"]);
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
          //console.log(sprite.attackID, sprite.attacker, sprite.attackCommand);
          var attackCommand = sprite.attackCommand;
          attackCommand["attack_id"] = sprite.attackID;

         // console.log("Select Attack");
         // console.log(sprite.attacker);
         // console.log(attackCommand);
          performMoving([attackCommand], [sprite.attacker]);

          hideAttackOffer();
          unselectUnit();
     }
     function Create2DArray(x, y) {
          var array = new Array(y);

          for (var i = 0; i < y; i++) {
               array[i] = new Array(x);
          }

          return array;
     }
}