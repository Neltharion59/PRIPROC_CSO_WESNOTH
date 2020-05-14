function GetPossibleMovements(unit_x, unit_y, unit_movement_points, unit_movement_cost_dict, terrain_dict, battle_grid, unitMatrix, player_id) {
    //console.log("unit mov points:"); console.log(unit_movement_points);
    //console.log("unit mov dict:"); console.log(unit_movement_cost_dict);

    result = [{"coords":[unit_x, unit_y], "remaining_movement":unit_movement_points, "previous": null, "is_attack": false}];
    currently_found = [];
    previously_found = [{"coords":[unit_x, unit_y], "remaining_movement":unit_movement_points, "previous": null, "is_attack": false}];

    while(previously_found.length > 0) {
        for (var i = 0; i < previously_found.length; i++) {
            if(previously_found[i]["remaining_movement"] <= 0) {
                continue;
            }

            var neighbours = ProduceNeighbours(previously_found[i], unit_movement_cost_dict, terrain_dict, battle_grid, unitMatrix, player_id);
            //console.log("neighbours:");
            //console.log(neighbours);
            for (var j = 0; j < neighbours.length; j++) {
                if(ContainsCoordinate(result, neighbours[j]) || ContainsCoordinate(previously_found, neighbours[j])) {
                    continue;
                }

                AddUniqueCoordinate(currently_found, neighbours[j]);
            }
        }

        previously_found = currently_found;
        currently_found = [];
        previously_found.forEach(element => {
            AddUniqueCoordinate(result, element);
        });
    }

    return result;
}
function AddUniqueCoordinate(array, coordinate) {
    if(!ContainsCoordinate(array, coordinate)) {
        array.push(coordinate);
    }
}
function ContainsCoordinate(array, coordinate) {
    var Result = false;
    for(var i = 0; i < array.length; i++) {
        var element = array[i];
        if(element["coords"][0] == coordinate["coords"][0] && element["coords"][1] == coordinate["coords"][1]) {
            if(element["remaining_movement"] < coordinate["remaining_movement"]) {
                element["remaining_movement"] = coordinate["remaining_movement"];
                element["previous"] = coordinate["previous"];
            }
            Result = true;
            break;
        }
    };
    return Result;
}
function ProduceNeighbours(node, unit_movement_cost_dict, terrain_dict, battle_grid, unitMatrix, player_id) {
    var Result = [];

    if(!node["is_attack"])
    {
        var PotentialMoves = [];

        if(node["coords"][1] % 2 == 0) {
            PotentialMoves = [[-1, 0], [-1, -1], [-1, 1], [0, -1], [0, 1], [1, 0]];
        } else {
            PotentialMoves = [[-1, 0], [0, -1], [0, 1], [1, -1], [1, 1], [1, 0]];
        }

        PotentialMoves.forEach(element => {
            var new_node = {"coords":AddCoordinates(element, node["coords"]), "is_attack": false};

            if(
                new_node["coords"][0] >= 0
                && new_node["coords"][1] >= 0
                && new_node["coords"][0] < battle_grid.length
                && new_node["coords"][1] < battle_grid[0].length
                
            ) {
                if(unitMatrix[new_node["coords"][0]][new_node["coords"][1]] != null) {
                    
                    if(unitMatrix[new_node["coords"][0]][new_node["coords"][1]]["player_id"] != player_id) {
                        new_node["is_attack"] = true;
                        new_node["previous"] = node;
                        new_node["attack_id"] = 0;
                        Result.push(new_node);
                    }

                }
                else {
                    var move_cost = CalculateMoveCost(unit_movement_cost_dict, terrain_dict, battle_grid[new_node["coords"][0]][new_node["coords"][1]]);
                    //console.log(battle_grid[new_node["coords"][0]][new_node["coords"][1]]);
                    //console.log(move_cost);
                    if(move_cost > 0 && ((node["remaining_movement"] - move_cost) >= 0)) {
                        //console.log("can move");
                        new_node["remaining_movement"] = node["remaining_movement"] - move_cost;
                        new_node["previous"] = node;
                        Result.push(new_node);
                    } else {
                        //console.log("cannot move");
                    }
                }
                
            } else {
                //console.log("outside battlefield");
            }
        });
    }

    return Result;
}
function AddCoordinates(coord1, coord2) {
    return [coord1[0] + coord2[0], coord1[1] + coord2[1]];
}
function CalculateMoveCost(unit_movement_cost_dict, terrain_dict, terrain_description) {
   /* var tokens = terrain_description.split("^");
    console.log("token: " + tokens[0]);

    if(!(tokens[0] in terrain_dict)) {

        return 0;
    }*/

    if(!(terrain_description in terrain_dict)) {

        return 0;
    }

    var terrain = terrain_dict[terrain_description];
   // console.log("terrain:");
    //console.log(terrain);
    if(terrain["impassable"]) {
        return 0;
    }

    if(!(terrain["name"] in unit_movement_cost_dict)) {
        return 1;
    }
   // console.log("terrain_dict: ");
   // console.log(unit_movement_cost_dict[terrain["name"]]);
    return unit_movement_cost_dict[terrain["name"]];
}