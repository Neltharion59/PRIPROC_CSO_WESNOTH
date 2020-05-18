window.onload = function() {
     var PhaserGameObject = new Phaser.Game("100%", "120%", Phaser.CANVAS, "", {preload: onPreload, create: onCreate});                
     
     const village_income = 2;
     const base_income = 2;
     const xp_modifier = 0.70;

     var mapDict = getMaps();
     var mapName = "PRIPOC_MAPA_1";
     var map = MapToGrid(mapDict[mapName]);
     var starting_positions = extractStartingPositions(map);
     removeStartingPositions(map);

     ///console.log(map);

     var terrain_dict = createMinTerrainDict(onlyUniqueMapParts(map));
     /*map.forEach(row => {
          row.forEach(element => {
               console.log(terrain_dict[element]["gives_income"]);
          });
     });v
     console.log(terrain_dict);*/
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

     var colors = ["", "#d62f15", "#151cd4"];

     var playerQueue = new Queue();
     var UniqueSides = [];
     for(var i = 0; i < starting_positions.length; i++) {
          var player = {"id": i+1, "units":[], "side": sides_list[Math.floor(Math.random() * sides_list.length)], "gold":100, "income": base_income};
          if(i == 0) {
               player["AI"] = true;
          } else {
               player["AI"] = true;
          }
          var leader = {
               "is_leader": true,
               "type": sides_dict[player["side"]]["leader"][Math.floor(Math.random() * sides_dict[player["side"]]["leader"].length)]
          };
          leader["hp"] = unit_dict[leader["type"]]["hitpoints"];
          leader["max_hp"] = unit_dict[leader["type"]]["hitpoints"];
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
     playerQueue.shift = function() { var temp = this.dequeue(); this.enqueue(temp);};
     playerQueue.getPlayerByID = function(id) {
          let result = null;
          for(var i = 0; i < this.getLength(); i++) {
               if(id == this.peek()["id"]) {
                    result = this.peek();
               }
               this.shift();
          }
          return result;
     };
     //playerQueue.gameIsOver = function() {}

     var hexagonWidth = 280;
	var hexagonHeight = 280;
     //var gridSizeX = map[0].length;
     //var gridSizeY = map.length;
     var gridSizeX = map[0].length;
     var gridSizeY = map.length;

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
     var village_matrix = Create2DArray(gridSizeX, gridSizeY);
     var village_count = 0;
     for(var i = 0; i < village_matrix.length; i++) {
          for(var j = 0; j < village_matrix[i].length; j++) {
               village_matrix[i][j] = null;
               if(terrain_dict[map[i][j]]["gives_income"]) {
                    village_matrix[i][j] = -1;
                    village_count++;
               }
          }
     }
     console.log(village_matrix);


     var humanMoving = false;
     var end_turn_button = null;
     var turn_count = 0;
     var selectedUnit = null;
     var possibleSelectedUnitMovents = [];
     var attackButtons = [];

     var Game = {
          "playerQueue": playerQueue,
          "gameOver": false,
          "unitMatrix": unitMatrix,

          "unit_dict": unit_dict,
          "terrain_dict": terrain_dict,
          "movement_type_dict": movement_type_dict,
          "map": map,
          "village_matrix": village_matrix,

          "village_count": village_count,
          "village_income": village_income,
          "base_income": base_income,
          "xp_modifier": xp_modifier,

          "createCopy": CreateGameCopy,
          "performMoving": performMoving
     };
     var CSO = this.createCSOObject(Game);

	function onPreload() {
          PhaserGameObject.load.image("marker", "images/marker.png");
          PhaserGameObject.load.image("end_turn", "images/sword.png");
          PhaserGameObject.load.image("attacks/blank-attack.png", "images/attacks/blank-attack.png");
          PhaserGameObject.load.image("endgame", "images/end_of_game.png");

          for(key in terrain_dict) {
               PhaserGameObject.load.image(terrain_dict[key]["symbol_image"], image_path_prefix_terrain + terrain_dict[key]["symbol_image"] + image_path_postfix);
          }
          
          UniqueSides.forEach(side => {
               sides_dict[side]["recruit"].forEach(current_unit => {
                    let unit_buffer = [current_unit];
                    while(unit_buffer.length > 0) {
                         let unit = unit_buffer.pop();
                         PhaserGameObject.load.image(unit_dict[unit]["image"], image_path_prefix_units + unit_dict[unit]["image"]);
                         unit_dict[unit]["attack"].forEach(attack => {
                              if(attack["icon"]) {
                                   PhaserGameObject.load.image(attack["icon"], image_path_prefix_units + attack["icon"]);
                              } else {
                                   attack["icon"] = "attacks/blank-attack.png";
                              }
                         });

                         if(unit_dict[unit]["advances_to"] != null) {
                              unit_buffer = unit_buffer.concat(unit_dict[unit]["advances_to"]);
                         }
                    }
               });
               sides_dict[side]["leader"].forEach(unit => {
                    PhaserGameObject.load.image(unit_dict[unit]["image"], image_path_prefix_units + unit_dict[unit]["image"]);
                    unit_dict[unit]["attack"].forEach(attack => {
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

	     for(var i = 0; i < gridSizeY; i ++) {
			for(var j = 0; j < gridSizeX; j ++) {
                    var hexagonX = hexagonWidth * j * 0.75;
                    var hexagonY = hexagonHeight*i + j%2*hexagonHeight/2;
                    
                    var image = terrain_dict[map[i][j]]["symbol_image"];

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
          while(first_player_id != playerQueue.peek()["id"]) {
               var current_player = playerQueue.peek();

               if(first_player_id == undefined) {
                    first_player_id = current_player["id"];
               }

               var image = unit_dict[current_player["units"][0]["type"]]["image"];
               var x = current_player["units"][0]["x"];
               var y = current_player["units"][0]["y"];
               unitMatrix[x][y] = current_player["units"][0];

               playerQueue.shift();
          }

		hexagonGroup.y = (PhaserGameObject.height-hexagonHeight*Math.ceil(gridSizeY/2))/2;
          if(gridSizeY%2==0){
               hexagonGroup.y-=hexagonHeight/4;
          }
		hexagonGroup.x = (PhaserGameObject.width-Math.ceil(gridSizeX/2)*hexagonWidth-Math.floor(gridSizeX/2)*hexagonWidth/2)/2;
          if(gridSizeX%2==0){
               hexagonGroup.x-=hexagonWidth/8;
          }

          renderUnits();
          playGame();
	}

     function playerDeathCheck(game) {
          var checked_player_ids = [];
          while(true) {
               if(checked_player_ids.includes(game.playerQueue.peek()["id"])) {
                    break;
               }

               var player_died = true;
               for(var i = 0; i < game.playerQueue.peek()["units"].length; i++) {
                    if(game.playerQueue.peek()["units"][i]["is_leader"]) {
                         player_died = game.playerQueue.peek()["units"][i]["hp"] <= 0;
                         break;
                    }
               };
               if(player_died) {
                    destroyAllPlayerUnits(game.playerQueue.dequeue(), game);
               } else {
                    checked_player_ids.push(game.playerQueue.peek()["id"]);
                    game.playerQueue.shift();
               }
          }

          if(game.playerQueue.getLength() <= 1) {
               game.gameOver = true;
   
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
     }

     function destroyAllPlayerUnits(player, game) {
          player["units"].forEach(unit => {
               unit["hp"] = -1;
               tryKillUnit(unit["x"], unit["y"], game);
          });
     }

     function playGame() {
          //console.log("b4 game over check");
          //console.log(gameOver);
          if(Game.gameOver) {
               return;
          }
          //console.log("after game over check");
          Game.gameOver = (playerQueue.getLength() <= 1);

          //console.log("b4 loop");
          while(nextTurn() && !Game.gameOver) {
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

          performHealing(playerQueue.peek()["id"]);
          for(var i = 0; i < playerQueue.peek()["units"].length; i++) {
               playerQueue.peek()["units"][i]["move_points"] = unit_dict[playerQueue.peek()["units"][i]["type"]]["movement"];
               //refreshText(playerQueue.peek()["units"][i]);
          }
          
          playerQueue.peek()["gold"] += playerQueue.peek()["income"];

          if(playerQueue.peek()["AI"]) {
               end_turn_button.visible = false;
               var movements = calculateMoveOrders();
               //console.log(movements);
               performMoving(movements, playerQueue.peek()["units"], Game);
               playerQueue.peek()["units"] = playerQueue.peek()["units"].filter(unit => !unit["dead"]);

               recruit();
               playerQueue.shift();
               playerQueue.peek()["units"] = playerQueue.peek()["units"].filter(unit => !unit["dead"]);
               return true;
          } else {
               recruit();
               renderUnits();

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
     function performHealing(player_id) {
          for(var i = 0; i < village_matrix.length; i++) {
               for(var j = 0; j < village_matrix[i].length; j++) {
                    if(village_matrix[i][j] != null && unitMatrix[i][j] != null && unitMatrix[i][j]["player_id"] == player_id) {
                         healUnit(unitMatrix[i][j], terrain_dict[map[i][j]]["heals"]);
                    }
               }
          }
     }
     function healUnit(unit, amount) {
          
          let heal_amount = Math.min(amount, unit["max_hp"] - unit["hp"]);
          unit["hp"] += heal_amount;
     }
     function recruit() {

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
         
          for(var i = hire_positions.length - 1; i >= 0; i--)
          {
               if(unitMatrix[hire_positions[i][0]][hire_positions[i][1]] != null) {
                    hire_positions.splice(i, 1);
               }
          }

        
          for(var i = 0; i < hire_positions.length; i++) {

               var possible_to_hire = sides_dict[playerQueue.peek()["side"]]["recruit"].slice();
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

               //We know what type unit we want to hire and where to place it
               var x = hire_positions[i][0];
               var y = hire_positions[i][1];
               var unit = {
                    "is_leader": false,
                    "type": hireType,
                    "hp": unit_dict[hireType]["hitpoints"],
                    "max_hp": unit_dict[hireType]["hitpoints"],
                    "xp": 0,
                    "x": x,
                    "y": y,
                    "player_id": playerQueue.peek()["id"],
                    "move_points": 0
               };
               unitMatrix[x][y] = unit;
               playerQueue.peek()["units"].push(unit);
               playerQueue.peek()["gold"] -= unit_dict[hireType]["cost"];
          }

          renderUnits();
     }
     function renderUnits() {
          for(var i = 0; i < hexagons.length; i++) {
               for(var j = 0; j < hexagons[i].length; j++) {
                    if(hexagons[i][j].unit != null) {
                         hexagons[i][j].unit.destroy();
                         hexagons[i][j].unit = null;
                    }

                    if(unitMatrix[i][j] != null) {
                         let unit_sprite = PhaserGameObject.add.sprite(hexagons[i][j].hexagonX,hexagons[i][j].hexagonY, unit_dict[unitMatrix[i][j]["type"]]["image"]);
                         unit_sprite.scale.setTo(4,4);
                         hexagonGroup.add(unit_sprite);
                         hexagons[i][j].unit = unit_sprite;
                    }

                    refreshText(i, j);
               }
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
          
          var selectedMovements = cat_swarm_optimization(CSO, possible_movements);
          return selectedMovements;
     }

     function performMoving(movements, units, game) {
          for(var i = 0; i < movements.length && i < units.length; i++) {

               if(game.gameOver) {
                    break;
               }

               if(movements[i] == null) {
                    continue;
               }
               //console.log(movements[i]);
               let x, y;
               if(movements[i]["is_attack"])
               {
                    if(movements[i]["previous"] != null) {
                         x = movements[i]["previous"]["coords"][0];
                         y = movements[i]["previous"]["coords"][1];
                    } else {
                         x = units[i]["x"];
                         y = units[i]["y"];
                    }
               } else {
                    x = movements[i]["coords"][0];
                    y = movements[i]["coords"][1];
               }
               let old_x = units[i]["x"];
               let old_y = units[i]["y"];

               if(!(x == old_x && y == old_y)) {
                    units[i]["x"] = x;
                    units[i]["y"] = y;

                    game.unitMatrix[old_x][old_y] = null;
                    game.unitMatrix[x][y] = units[i];

                    units[i]["move_points"] = movements[i]["is_attack"] ? movements[i]["previous"]["remaining_movement"] : movements[i]["remaining_movement"];

                    if(game.village_matrix[x][y] != null) {
                         if(game.village_matrix[x][y] != -1) {
                              let previously_owning_player = game.playerQueue.getPlayerByID(game.village_matrix[x][y]);
                              if(previously_owning_player != null) {
                                   previously_owning_player["income"] -= village_income;
                              }
                         }
                         game.playerQueue.peek()["income"] += village_income;
                         game.village_matrix[x][y] = game.playerQueue.peek()["id"];
                    }
               }
               if(movements[i]["is_attack"]) {
                    units[i]["move_points"] = 0;

                    let attacker_type = units[i]["type"];
                    let defender_type = game.unitMatrix[movements[i]["coords"][0]][movements[i]["coords"][1]] == null ? null : game.unitMatrix[movements[i]["coords"][0]][movements[i]["coords"][1]]["type"];

                    performAttack(
                         units[i]["x"],
                         units[i]["y"],
                         movements[i]["coords"][0],
                         movements[i]["coords"][1],
                         movements[i]["attack_id"],
                         game
                    );

                    playerDeathCheck(game);

                    if(game.gameOver) {
                         return;
                    }

                    // Add xp
                    if(!units[i]["dead"]) {
                         units[i]["xp"] += calculateExperience(game, defender_type, game.unitMatrix[movements[i]["coords"][0]][movements[i]["coords"][1]] == null);
                    }
                    if(game.unitMatrix[movements[i]["coords"][0]][movements[i]["coords"][1]] != null) {
                         game.unitMatrix[movements[i]["coords"][0]][movements[i]["coords"][1]]["xp"] += calculateExperience(game, attacker_type, units[i]["dead"]);
                    }
                    
                    // Level up units
                    tryPromoteUnit(game, units[i]);
                    tryPromoteUnit(game, game.unitMatrix[movements[i]["coords"][0]][movements[i]["coords"][1]]);
               }
          }
     }
     function performAttack(atk_x, atk_y, def_x, def_y, atk_id, game) {
          if(game.unitMatrix[atk_x][atk_y] == null || game.unitMatrix[def_x][def_y] == null) {
               return;
          }

          var attacker_type_dict = unit_dict[game.unitMatrix[atk_x][atk_y]["type"]];
          var attacker_attack = attacker_type_dict["attack"][atk_id];

          var attacker_dmg = attacker_attack["damage"];
          var attacker_atk_type = attacker_attack["type"];
          var attacker_terrain_bonus = movement_type_dict[attacker_type_dict["movement_type"]]["defense"][terrain_dict[map[atk_x][atk_y]]["name"]];
          var attacker_atk_count = attacker_attack["number"];
          
          var defender_terrain_bonus = movement_type_dict[unit_dict[game.unitMatrix[def_x][def_y]["type"]]["movement_type"]]["defense"][terrain_dict[map[def_x][def_y]]["name"]];
          
          var defender_type_dict = unit_dict[game.unitMatrix[def_x][def_y]["type"]];

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

          var attacker_resistance = getResistance(unit_dict[game.unitMatrix[atk_x][atk_y]["type"]], defender_atk_type);
          var defender_resistance = getResistance(unit_dict[game.unitMatrix[def_x][def_y]["type"]], attacker_atk_type);

          var attacker_final_dmg = Math.floor(attacker_dmg * defender_resistance / 100);
          var defender_final_dmg = Math.floor(defender_dmg * attacker_resistance / 100);

          var attacker_hit_chance = defender_terrain_bonus;
          var defender_hit_chance = attacker_terrain_bonus;

          //console.log(attacker_atk_count, defender_atk_count);
          var death_check = false;
          while(defender_atk_count > 0 || attacker_atk_count > 0) {
               if(attacker_atk_count > 0) {
                   // console.log("Defender hp");
                   // console.log(unitMatrix[def_x][def_y]["hp"]);

                    var hit_target = Math.random() < (attacker_hit_chance / 100);
                    

                    if(hit_target) {
                         game.unitMatrix[def_x][def_y]["hp"] -= attacker_final_dmg;
                    }

                    --attacker_atk_count;

                    //console.log(hit_target, attacker_final_dmg, unitMatrix[def_x][def_y]["hp"]);
               }

               death_check = tryKillUnit(def_x, def_y, game);
               if(death_check) {
                    break;
               }

               if(defender_atk_count > 0) {
                   // console.log("Attacker hp");
                    //console.log(unitMatrix[atk_x][atk_y]["hp"]);

                    var hit_target = Math.random() < (defender_hit_chance / 100);
                    
                    if(hit_target) {
                         game.unitMatrix[atk_x][atk_y]["hp"] -= defender_final_dmg;
                    }

                    --defender_atk_count;

                    //console.log(hit_target, defender_final_dmg, unitMatrix[atk_x][atk_y]["hp"]);
               }

               death_check = tryKillUnit(atk_x, atk_y, game);
               if(death_check) {
                    break;
               }
          }
     }
     function tryKillUnit(x, y, game) {
          //console.log(x,y);

          if(game.unitMatrix[x][y] == null) {
               return;
          }

          if(game.unitMatrix[x][y]["hp"] <= 0) {
               game.unitMatrix[x][y]["dead"] = true;
               game.unitMatrix[x][y] = null;
                              
               return true;
          }

          return false;
     }
     function calculateExperience(game, attacked_unit_type, unit_was_killed) {
          if(attacked_unit_type == null) {
               return 0;
          }

          var experience;
          if(unit_was_killed) {
               experience = game.unit_dict[attacked_unit_type]["level"] * 8;
               experience = experience == 0 ? 4 : experience;
          } else {
               experience = game.unit_dict[attacked_unit_type]["level"];
          }
          return experience;
     }
     function tryPromoteUnit(game, unit) {
          if(unit == null || unit["dead"]) {
               return;
          }

          if(unit["xp"] >= Math.floor(game.unit_dict[unit["type"]]["experience"] * game.xp_modifier)) {
               if(game.unit_dict[unit["type"]]["advances_to"] == null) {
                    unit["max_hp"] += 3;
               } else {
                    unit["type"] = game.unit_dict[unit["type"]]["advances_to"][Math.floor(Math.random() * game.unit_dict[unit["type"]]["advances_to"].length)];
                    unit["max_hp"] = game.unit_dict[unit["type"]]["hitpoints"];
               }

               unit["xp"] = 0;
               unit["hp"] = unit["max_hp"];
          }
     }
     function getResistance(attacked_unit_dict, atk_type) {
          var result = 100;
          if(atk_type in movement_type_dict[attacked_unit_dict["movement_type"]]["resistance"]) {
               result = movement_type_dict[attacked_unit_dict["movement_type"]]["resistance"][atk_type];
          }
          return result;
     }
     function refreshText(x, y) {
          let hexagon = hexagons[x][y];

          if(hexagon.text != null) {
               hexagon.text.destroy();
          }
          hexagon.text = null;

          let text = "";
          let unit = unitMatrix[x][y];
          if(village_matrix[x][y] != null && village_matrix[x][y] != -1) {
               text += "Own: P" + village_matrix[x][y].toString() + "\n";
          }
          if(unitMatrix[x][y] != null) {
               text += "HP: " + unit["hp"].toString() + "\nXP: " + unit["xp"].toString() + "\nMP: " + unit["move_points"].toString();
          }
          if(text == "") {
               return;
          }
          let player_id = unit == null ? village_matrix[x][y] : unit["player_id"];

          let style = { font: "30px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: hexagons[x][y].width, align: "center", backgroundColor: colors[player_id] };
          hexagons[x][y].text = PhaserGameObject.add.text(hexagons[x][y].hexagonX, hexagons[x][y].hexagonY, text, style);
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

                         performMoving([selectedMovement], [selectedUnit], Game);
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
          //console.log(sprite.attackID, sprite.attacker, sprite.attackCommand);
          var attackCommand = sprite.attackCommand;
          attackCommand["attack_id"] = sprite.attackID;

         // console.log("Select Attack");
         // console.log(sprite.attacker);
         // console.log(attackCommand);
          performMoving([attackCommand], [sprite.attacker], Game);
          hideAttackOffer();
          unselectUnit();

          renderUnits();
     }
     function Create2DArray(x, y) {
          var array = new Array(y);

          for (var i = 0; i < y; i++) {
               array[i] = new Array(x);
          }

          return array;
     }
     function CreateGameCopy(game) {
          var copiedGame = {};
          copiedGame["test"] = "I am a copy";

          // Copying playerQueue and UnitMatrix
          var copiedPlayerQueue = new Queue();
          var copiedUnitMatrix = Create2DArray(gridSizeX, gridSizeY);
          var copiedVillageMatrix = Create2DArray(gridSizeX, gridSizeY);
          for(var i = 0; i < copiedUnitMatrix.length; i++) {
               for(var j = 0; j < copiedUnitMatrix[i].length; j++) {
                    copiedUnitMatrix[i][j] = null;
                    copiedVillageMatrix[i][j] = game.village_matrix[i][j];
               }
          }
          var first_player_id = -1;
          while(first_player_id != game.playerQueue.peek()["id"]) {
               if(game.playerQueue.peek()["id"] == first_player_id) {
                    break;
               }
               if(first_player_id == -1) {
                    first_player_id = game.playerQueue.peek()["id"];
               }

               var currentPlayer = game.playerQueue.peek();
               var copiedPlayer = {};
               copiedPlayer["id"] = currentPlayer["id"];
               copiedPlayer["side"] = currentPlayer["side"];
               copiedPlayer["gold"] = currentPlayer["gold"];
               copiedPlayer["income"] = currentPlayer["income"];
               copiedPlayer["units"] = [];

               currentPlayer["units"].forEach(unit => {
                    var copiedUnit = Object.assign({}, unit);
                    copiedUnitMatrix[copiedUnit["x"]][copiedUnit["y"]] = copiedUnit;
                    copiedPlayer["units"].push(copiedUnit);
               });

               copiedPlayerQueue.enqueue(copiedPlayer);

               game.playerQueue.shift();
          }
          copiedPlayerQueue.shift = playerQueue.shift;
          copiedPlayerQueue.getPlayerByID = playerQueue.getPlayerByID;
          copiedGame.playerQueue = copiedPlayerQueue;
          copiedGame.unitMatrix = copiedUnitMatrix;
          copiedGame.village_matrix = copiedVillageMatrix;

          // Copying primitives
          copiedGame.gameOver = game["gameOver"];
          copiedGame.village_count = game["village_count"];
          copiedGame.village_income = game["village_income"];
          copiedGame.base_income = game["base_income"];
          copiedGame.xp_modifier = game["xp_modifier"];

          // Copying dict references
          copiedGame["unit_dict"] = game["unit_dict"];
          copiedGame["terrain_dict"] = game["terrain_dict"];
          copiedGame["movement_type_dict"] = game["movement_type_dict"];
          copiedGame["map"] = game["map"];

          // Copying functions
          copiedGame["performMoving"] = game["performMoving"];

          return copiedGame;
     }
     function hexagonsToGrid() {
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
     }
}