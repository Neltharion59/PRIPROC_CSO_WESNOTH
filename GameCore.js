function CreateGameObject() {
    var GameObject = {};

    // Constants
    GameObject.village_income = 2;
    GameObject.base_income = 2;
    GameObject.xp_modifier = 0.70;

    // Basic map-related
    GameObject.mapDict = getMaps();
    GameObject.mapName = "PRIPOC_MAPA_1";
    GameObject.map = MapToGrid(GameObject.mapDict[GameObject.mapName]);
    GameObject.starting_positions = extractStartingPositions(GameObject.map);
    removeStartingPositions(GameObject.map);

    // Dicts and enums
    GameObject.terrain_dict = createMinTerrainDict(onlyUniqueMapParts(GameObject.map));
    GameObject.race_dict = createRaceDict();
    GameObject.movement_type_dict = createMovementDict();
    GameObject.unit_dict = createUnitDict();
    GameObject.sides_dict = createSidesDict();
    GameObject.sides_list = [];
    Object.keys(GameObject.sides_dict).forEach(function(key) {
        if(key != "Dunefolk") {
            GameObject.sides_list.push(key);
        }
    });

    // Session-specific
    GameObject.setup_session = function(side_ids) {
        // Players
        this.playerQueue = new Queue();
        this.UniqueSides = [];
        for(var i = 0; i < this.starting_positions.length; i++) {
            let player = {"id": i+1, "units":[], "side": this.sides_list[side_ids[i]], "gold":100, "income": this.base_income};
            player["AI"] = true;
            let leader = {
                "is_leader": true,
                "type": this.sides_dict[player["side"]]["leader"][Math.floor(Math.random() * this.sides_dict[player["side"]]["leader"].length)]
            };
            leader["hp"] = this.unit_dict[leader["type"]]["hitpoints"];
            leader["max_hp"] = this.unit_dict[leader["type"]]["hitpoints"];
            leader["xp"] = 0;
            leader["x"] = this.starting_positions[i][0];
            leader["y"] = this.starting_positions[i][1];
            leader["player_id"] = i + 1;
            leader["move_points"] = 0;
    
            player["units"].push(leader);
    
            this.playerQueue.enqueue(player);
    
            if(!this.UniqueSides.includes(player["side"])) {
                this.UniqueSides.push(player["side"]);
            }
        }
        this.playerQueue.shift = function() { var temp = this.dequeue(); this.enqueue(temp);};
        this.playerQueue.getPlayerByID = function(id) {
            let result = null;
            for(var i = 0; i < this.getLength(); i++) {
                if(id == this.peek()["id"]) {
                    result = this.peek();
                }
                this.shift();
            }
            return result;
        };

        // Turn counter
        this.turn_count = 0;

        // Game wrapper - for creating duplicate battlefields for CSO
        this.Game = {
            "playerQueue": this.playerQueue,
            "gameOver": false,
            "unitMatrix": this.unitMatrix,
    
            "unit_dict": this.unit_dict,
            "terrain_dict": this.terrain_dict,
            "movement_type_dict": this.movement_type_dict,
            "map": this.map,
            "village_matrix": this.village_matrix,
    
            "village_count": this.village_count,
            "village_income": this.village_income,
            "base_income": this.base_income,
            "xp_modifier": this.xp_modifier,
    
            "createCopy": this.CreateGameCopy,
            "performMoving": this.performMoving
        };

        // CSO object
        this.CSO = createCSOObject(this.Game);
    }

    // Convenient map dimensions
    GameObject.gridSizeX = GameObject.map[0].length;
    GameObject.gridSizeY = GameObject.map.length;

    // Unit matrix
    GameObject.unitMatrix = Create2DArray(GameObject.gridSizeX, GameObject.gridSizeY);
    for(var i = 0; i < GameObject.unitMatrix.length; i++) {
        for(var j = 0; j < GameObject.unitMatrix[i].length; j++) {
            GameObject.unitMatrix[i][j] = null;
        }
    }
    // Hire matrix
    GameObject.hireMatrix = Create2DArray(GameObject.gridSizeX, GameObject.gridSizeY);
    for(var i = 0; i < GameObject.hireMatrix.length; i++) {
        for(var j = 0; j < GameObject.hireMatrix[i].length; j++) {
            GameObject.hireMatrix[i][j] = null;
        }
    }
    for(var i = 0; i < GameObject.starting_positions.length; i++) {
        GameObject.hireMatrix[GameObject.starting_positions[i][0]][GameObject.starting_positions[i][1]]
            = findSurroundingHireToFields(GameObject.starting_positions[i], GameObject.map, GameObject.terrain_dict);
    }

    // Village matrix
    GameObject.village_matrix = Create2DArray(GameObject.gridSizeX, GameObject.gridSizeY);
    GameObject.village_count = 0;
    for(var i = 0; i < GameObject.village_matrix.length; i++) {
        for(var j = 0; j < GameObject.village_matrix[i].length; j++) {
            GameObject.village_matrix[i][j] = null;
            if(GameObject.terrain_dict[GameObject.map[i][j]]["gives_income"]) {
                GameObject.village_matrix[i][j] = -1;
                GameObject.village_count++;
            }
        }
    }

    GameObject.playerDeathCheck = function(game) {
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
                GameObject.destroyAllPlayerUnits(game.playerQueue.dequeue(), game);
            } else {
                checked_player_ids.push(game.playerQueue.peek()["id"]);
                game.playerQueue.shift();
            }
        }

        if(game.playerQueue.getLength() <= 1) {
            game.gameOver = true;

            GameObject.playerDeathCheckRender(game);
        }
    }
    GameObject.playerDeathCheckRender = function (game) {}

    GameObject.destroyAllPlayerUnits = function(player, game) {
        player["units"].forEach(unit => {
            unit["hp"] = -1;
            GameObject.tryKillUnit(unit["x"], unit["y"], game);
        });
    }

    GameObject.playGame = function(game) {
        if(game.gameOver) {
            return;
        }
        game.gameOver = (game.playerQueue.getLength() <= 1);

        while(this.nextTurn(game) && !game.gameOver) {}
    }

    GameObject.nextTurn = function(game) {

        if(game.playerQueue.peek()["id"] == 1) {
            this.turn_count++;
            console.log("Turn number:" + this.turn_count);
        }

        this.performHealing(game.playerQueue.peek()["id"], game);
        for(var i = 0; i < game.playerQueue.peek()["units"].length; i++) {
            game.playerQueue.peek()["units"][i]["move_points"] = game.unit_dict[game.playerQueue.peek()["units"][i]["type"]]["movement"];
        }
        
        game.playerQueue.peek()["gold"] += game.playerQueue.peek()["income"];

        if(game.playerQueue.peek()["AI"]) {
            this.humanEndTurnGUIActions();

            var movements = this.calculateMoveOrders(game);
            this.performMoving(movements, game.playerQueue.peek()["units"], game);
            game.playerQueue.peek()["units"] = game.playerQueue.peek()["units"].filter(unit => !unit["dead"]);

            this.recruit(game);
            game.playerQueue.shift();
            game.playerQueue.peek()["units"] = game.playerQueue.peek()["units"].filter(unit => !unit["dead"]);
            return true;
        } else {
            this.recruit(game);
            this.renderUnits();

            this.humanStartTurnGUIActions();
            
            return false;
        }
    }
    GameObject.renderUnits = function() {}
    GameObject.humanEndTurnGUIActions = function() {}
    GameObject.humanStartTurnGUIActions = function() {}

    GameObject.performHealing = function(player_id, game) {
        for(var i = 0; i < game.village_matrix.length; i++) {
            for(var j = 0; j < game.village_matrix[i].length; j++) {
                if(game.village_matrix[i][j] != null && game.unitMatrix[i][j] != null && game.unitMatrix[i][j]["player_id"] == player_id) {
                    this.healUnit(game.unitMatrix[i][j], game.terrain_dict[game.map[i][j]]["heals"]);
                }
            }
        }
    }
    GameObject.healUnit = function(unit, amount) {
          
        let heal_amount = Math.min(amount, unit["max_hp"] - unit["hp"]);
        unit["hp"] += heal_amount;
    }
    GameObject.recruit = function(game) {
        let leader = null;
        for(var i = 0; i < game.playerQueue.peek()["units"].length; i++)
        {
            if(game.playerQueue.peek()["units"][i]["is_leader"]) {
                leader = game.playerQueue.peek()["units"][i];
                break;
            }
        }

        if(leader == null) {
            return;
        }
      
        let hire_positions = null;
        for(var i = 0; i < GameObject.starting_positions.length; i++)
        {
            if(leader["x"] == GameObject.starting_positions[i][0] && leader["y"] == GameObject.starting_positions[i][1]) {
            hire_positions = GameObject.hireMatrix[leader["x"]][leader["y"]].map(function(arr) {
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
            if(GameObject.unitMatrix[hire_positions[i][0]][hire_positions[i][1]] != null) {
                hire_positions.splice(i, 1);
            }
        }
      
        for(var i = 0; i < hire_positions.length; i++) {

            let possible_to_hire = GameObject.sides_dict[game.playerQueue.peek()["side"]]["recruit"].slice();
            for(var j = possible_to_hire.length - 1; j >= 0; j--)
            {
                if(GameObject.unit_dict[possible_to_hire[j]]["cost"] > game.playerQueue.peek()["gold"]) {
                    possible_to_hire.splice(j, 1);
                }
            }

            if(possible_to_hire.length <= 0) {
                break;
            }
            let hireType = possible_to_hire[Math.floor(Math.random() * possible_to_hire.length)];

            //We know what type unit we want to hire and where to place it
            let x = hire_positions[i][0];
            let y = hire_positions[i][1];
            let unit = {
                "is_leader": false,
                "type": hireType,
                "hp": GameObject.unit_dict[hireType]["hitpoints"],
                "max_hp": GameObject.unit_dict[hireType]["hitpoints"],
                "xp": 0,
                "x": x,
                "y": y,
                "player_id": game.playerQueue.peek()["id"],
                "move_points": 0
            };
            game.unitMatrix[x][y] = unit;
            game.playerQueue.peek()["units"].push(unit);
            game.playerQueue.peek()["gold"] -= GameObject.unit_dict[hireType]["cost"];
        }

        this.renderUnits();
    }
    GameObject.calculateMoveOrders = function(game) {
        let possible_movements = [[]];
        for(var i = 1; i < game.playerQueue.peek()["units"].length; i++) {
             possible_movements.push(
                GetPossibleMovements(
                    game.playerQueue.peek()["units"][i]["x"],
                    game.playerQueue.peek()["units"][i]["y"],
                    game.playerQueue.peek()["units"][i]["move_points"],
                    game.movement_type_dict[GameObject.unit_dict[game.playerQueue.peek()["units"][i]["type"]]["movement_type"]],
                    GameObject.terrain_dict,
                    GameObject.map,
                    game.unitMatrix,
                    game.playerQueue.peek()["id"]
                )
             );
        };
        
        let selectedMovements = cat_swarm_optimization(this.CSO, possible_movements);
        return selectedMovements;
    }
    GameObject.performMoving = function(movements, units, game) {
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
                                previously_owning_player["income"] -= game.village_income;
                            }
                       }
                       game.playerQueue.peek()["income"] += game.village_income;
                       game.village_matrix[x][y] = game.playerQueue.peek()["id"];
                  }
             }
             if(movements[i]["is_attack"]) {
                units[i]["move_points"] = 0;

                let attacker_type = units[i]["type"];
                let defender_type = game.unitMatrix[movements[i]["coords"][0]][movements[i]["coords"][1]] == null ? null : game.unitMatrix[movements[i]["coords"][0]][movements[i]["coords"][1]]["type"];

                GameObject.performAttack(
                    units[i]["x"],
                    units[i]["y"],
                    movements[i]["coords"][0],
                    movements[i]["coords"][1],
                    movements[i]["attack_id"],
                    game
                );

                GameObject.playerDeathCheck(game);

                if(game.gameOver) {
                    return;
                }

                // Add xp
                if(!units[i]["dead"]) {
                    units[i]["xp"] += GameObject.calculateExperience(game, defender_type, game.unitMatrix[movements[i]["coords"][0]][movements[i]["coords"][1]] == null);
                }
                if(game.unitMatrix[movements[i]["coords"][0]][movements[i]["coords"][1]] != null) {
                    game.unitMatrix[movements[i]["coords"][0]][movements[i]["coords"][1]]["xp"] += GameObject.calculateExperience(game, attacker_type, units[i]["dead"]);
                }
                
                // Level up units
                GameObject.tryPromoteUnit(game, units[i]);
                GameObject.tryPromoteUnit(game, game.unitMatrix[movements[i]["coords"][0]][movements[i]["coords"][1]]);
            }
        }
    }
    GameObject.performAttack = function(atk_x, atk_y, def_x, def_y, atk_id, game) {
        if(game.unitMatrix[atk_x][atk_y] == null || game.unitMatrix[def_x][def_y] == null) {
            return;
        }

        var attacker_type_dict = game.unit_dict[game.unitMatrix[atk_x][atk_y]["type"]];
        var attacker_attack = attacker_type_dict["attack"][atk_id];

        var attacker_dmg = attacker_attack["damage"];
        var attacker_atk_type = attacker_attack["type"];
        var attacker_terrain_bonus = game.movement_type_dict[attacker_type_dict["movement_type"]]["defense"][game.terrain_dict[game.map[atk_x][atk_y]]["name"]];
        var attacker_atk_count = attacker_attack["number"];
        
        var defender_terrain_bonus = game.movement_type_dict[game.unit_dict[game.unitMatrix[def_x][def_y]["type"]]["movement_type"]]["defense"][game.terrain_dict[game.map[def_x][def_y]]["name"]];
        
        var defender_type_dict = game.unit_dict[game.unitMatrix[def_x][def_y]["type"]];

        var possible_defender_attacks = [];
        for(var i = 0; i < defender_type_dict["attack"].length; i++) {
            if(attacker_attack["range"] == defender_type_dict["attack"][i]["range"]) {
                possible_defender_attacks.push(defender_type_dict["attack"][i]);
            }
        }

        var best_index = -1;
        var best_value = 0;
        for(var i = 0; i < possible_defender_attacks.length; i++) {
            var current_value = possible_defender_attacks[i]["damage"] * this.getResistance(attacker_type_dict, possible_defender_attacks[i]["type"]) / 100 * possible_defender_attacks[i]["number"];
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

        var attacker_resistance = GameObject.getResistance(game.unit_dict[game.unitMatrix[atk_x][atk_y]["type"]], defender_atk_type);
        var defender_resistance = GameObject.getResistance(game.unit_dict[game.unitMatrix[def_x][def_y]["type"]], attacker_atk_type);

        var attacker_final_dmg = Math.floor(attacker_dmg * defender_resistance / 100);
        var defender_final_dmg = Math.floor(defender_dmg * attacker_resistance / 100);

        var attacker_hit_chance = defender_terrain_bonus;
        var defender_hit_chance = attacker_terrain_bonus;

        var death_check = false;
        while(defender_atk_count > 0 || attacker_atk_count > 0) {
            if(attacker_atk_count > 0) {
                var hit_target = Math.random() < (attacker_hit_chance / 100);
                
                if(hit_target) {
                    game.unitMatrix[def_x][def_y]["hp"] -= attacker_final_dmg;
                }

                --attacker_atk_count;
            }

            death_check = this.tryKillUnit(def_x, def_y, game);
            if(death_check) {
                break;
            }

            if(defender_atk_count > 0) {
                var hit_target = Math.random() < (defender_hit_chance / 100);
                
                if(hit_target) {
                    game.unitMatrix[atk_x][atk_y]["hp"] -= defender_final_dmg;
                }

                --defender_atk_count;
            }

            death_check = this.tryKillUnit(atk_x, atk_y, game);
            if(death_check) {
                break;
            }
        }
    }
    GameObject.tryKillUnit = function(x, y, game) {
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
    GameObject.calculateExperience = function (game, attacked_unit_type, unit_was_killed) {
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
    GameObject.tryPromoteUnit = function(game, unit) {
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
    GameObject.getResistance = function(attacked_unit_dict, atk_type) {
        var result = 100;
        if(atk_type in GameObject.movement_type_dict[attacked_unit_dict["movement_type"]]["resistance"]) {
            result = GameObject.movement_type_dict[attacked_unit_dict["movement_type"]]["resistance"][atk_type];
        }
        return result;
    }
    GameObject.CreateGameCopy = function(game) {
        var copiedGame = {};

        // Copying playerQueue and UnitMatrix
        var copiedPlayerQueue = new Queue();
        var copiedUnitMatrix = Create2DArray(GameObject.gridSizeX, GameObject.gridSizeY);
        var copiedVillageMatrix = Create2DArray(GameObject.gridSizeX, GameObject.gridSizeY);
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

            let currentPlayer = game.playerQueue.peek();
            let copiedPlayer = {};
            copiedPlayer["id"] = currentPlayer["id"];
            copiedPlayer["side"] = currentPlayer["side"];
            copiedPlayer["gold"] = currentPlayer["gold"];
            copiedPlayer["income"] = currentPlayer["income"];
            copiedPlayer["units"] = [];

            currentPlayer["units"].forEach(unit => {
                let copiedUnit = Object.assign({}, unit);
                copiedUnitMatrix[copiedUnit["x"]][copiedUnit["y"]] = copiedUnit;
                copiedPlayer["units"].push(copiedUnit);
            });

            copiedPlayerQueue.enqueue(copiedPlayer);

            game.playerQueue.shift();
        }
        copiedPlayerQueue.shift = game.playerQueue.shift;
        copiedPlayerQueue.getPlayerByID = game.playerQueue.getPlayerByID;
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

    return GameObject;
}