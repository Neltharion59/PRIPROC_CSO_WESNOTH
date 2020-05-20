function createCSOObject(Game) {
    var CSO = {};

    CSO.Game = Game;
    CSO.weights = [1, 1, 1, 2, 2, 4, 2, 1.5, 1.5, 1.5];

    // Number of agents
    CSO.cat_count = 40;
    // Termination condition
    CSO.iteration_cap = 300;
    // MR
    CSO.mixture_ratio = 0.2;
    // SMP
    CSO.seeking_memory_pool = 20;
    // c1
    CSO.c1 = 2;
    // SPC
    CSO.self_position_considering = false;
    // SRD
    CSO.seeking_range_of_selected_dimensions = 0.3;
    // CDC
    CSO.count_of_dimensions_2_change = 0.4;
    CSO.get_movement_CDC = function(cat) {
        var dimension_count = Math.round(cat["movements"].length * CSO.count_of_dimensions_2_change);
        return dimension_count;
    }
    CSO.get_attack_CDC = function(cat) {
        var dimension_count = Math.round(cat["attack_ids"].length * CSO.count_of_dimensions_2_change);
        return dimension_count;
    }

    // CUSTOM PARAMETERS
    // Selection probability zero division preventor
    CSO.zdp1 = 0.000001;

    // Recording
    CSO.run_records = [];

    return CSO;
}
function cat_swarm_optimization(CSO, possible_movements) {
    var possible_attacks = CSO.Game.playerQueue.peek()["units"].map(unit => CSO.Game.unit_dict[unit["type"]]["attack"]);
    
    var movement_caps = possible_movements.map(movement => movement.length);
    var attack_caps = possible_attacks.map(attack => attack.length);

    var movement_velocity_caps = movement_caps.map(movement_cap => movement_cap);
    var attack_velocity_caps = attack_caps.map(attack_cap => attack_cap);

    var best_cat = {"fitness": Number.MIN_SAFE_INTEGER};

    // Step 1 - Create N cats
    var cats = [];
    for(var i = 0; i < CSO.cat_count; i++) {
        cats.push(create_cat_random(possible_movements, possible_attacks));
    }

    // Step 2 - Set velocities and modes
    for(var i = 0; i < cats.length; i++) {
        cats[i]["movement_velocities"] = [];
        for(var j = 0; j < cats[i]["movements"].length; j++) {
            cats[i]["movement_velocities"].push(getRandomArbitrary(movement_velocity_caps[j]));
        }
        cats[i]["attack_velocities"] = [];
        for(var j = 0; j < cats[i]["attack_ids"].length; j++) {
            cats[i]["attack_velocities"].push(getRandomArbitrary(attack_velocity_caps[j]));
        }
    }
    updateCatModes(CSO, cats);

    for(var i = 0; i < CSO.iteration_cap; i++) {

        // Step 3 - Evaluate fitness function and keep the best cat
        cats.forEach(cat => {
            cat["fitness"] = evaluateFitnessFunction(CSO, cat, possible_movements, possible_attacks);
            if(cat["fitness"] > best_cat["fitness"]) {
                best_cat = create_cat_copy_all_properties(cat);
                best_cat["iteration"] = i; 
            }
        });

        // Step 4 - Perform cats' actions according to seeking/tracing
        cats.forEach(cat => {
            //console.log(cat);
            if(cat["mode"] == "SEEK") {
                performSeeking(CSO, cat, movement_caps, attack_caps, possible_movements, possible_attacks);
            } else if(cat["mode"] == "TRACE") {
                performTracing(CSO, cat, best_cat, movement_velocity_caps, attack_velocity_caps, movement_caps, attack_caps, possible_movements);
            }
        });

        // Step 5 - Shuffle cat modes
        updateCatModes(CSO, cats);
    }
    CSO.run_records.push({
        "best_fitness": best_cat["fitness"],
        "iteration": best_cat["iteration"]
    });

    return turnCatIntoMovements(best_cat, possible_movements, possible_attacks);
}
function create_cat_random(movements, attacks) {
    var cat = {"movements": [], "attack_ids": []};

    //Calculate movements for the cat
    cat["movements"] = MovementCalculationRandom(movements, true);

    //Calculate attacks for the cat
    var attack_id;
    for(var i = 0; i < attacks.length; i++) {
        attack_id = null;
        if(cat["movements"][i] != null) {
            attack_id = getRandomArbitraryFloat(attacks[i].length);
        }
        cat["attack_ids"].push(attack_id);
    }

    return cat;
}
function create_cat_copy(originator_cat) {
    var new_cat = {
        "movements": originator_cat["movements"].slice(),
        "attack_ids": originator_cat["attack_ids"].slice()
    };

    return new_cat;
}
function create_cat_copy_all_properties(originator_cat) {
    var new_cat = {
        "movements": originator_cat["movements"].slice(),
        "attack_ids": originator_cat["attack_ids"].slice(),
        "movement_velocities": originator_cat["movement_velocities"].slice(),
        "attack_velocities": originator_cat["attack_velocities"].slice(),
        "fitness": originator_cat["fitness"],
        "mode": originator_cat["mode"]
    };

    return new_cat;
}
function updateCatModes(CSO, cats) {
    cats.forEach(cat => {
        cat["mode"] = "SEEK";
    });

    var tracing_cats = getRandom(cats, Math.max(Math.floor(cats.length * CSO.mixture_ratio), 1));
    tracing_cats.forEach(cat => {
        cat["mode"] = "TRACE";
    });
}
function getRandom(arr, n) {
    if(n <= 0) {
        return [];
    }
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}
function evaluateFitnessFunction(CSO, cat, possible_movements, possible_attacks) {
    var GameCopy = CSO.Game.createCopy(CSO.Game);
    
    var selected_movements = turnCatIntoMovements(cat, possible_movements, possible_attacks);
    GameCopy.performMoving(selected_movements, GameCopy.playerQueue.peek()["units"], GameCopy);
    
    var player_id = GameCopy.playerQueue.peek()["id"];

    var components = [];

    // Unit position fitness - hp, terrain_bonus
    var total_unit_health_player = 0;
    var total_unit_health_enemy = 0;
    var total_unit_max_health_player = 0;
    var total_unit_max_health_enemy = 0;
    var total_unit_terrain_bonus_player = 0;
    var total_unit_terrain_bonus_enemy = 0;
    var total_unit_max_terrain_bonus_player = 0;
    var total_unit_max_terrain_bonus_enemy = 0;
    var total_unit_xp_progress_player = 0;
    var total_unit_xp_progress_enemy = 0;
    var unit_count_player = 0;
    var unit_count_enemy = 0;
    var current_unit_terrain_bonus;
    var current_unit_max_terrain_bonus;
    var enemy_leader = null;
    var player_leader= null;
    
    GameCopy.unitMatrix.forEach(unitMatrixRow => {
        unitMatrixRow.forEach(unit => {
            if(unit != null) {
                // Clip unit HP to natural numbers
                unit["hp"] = Math.max(0, unit["hp"]);


                if(!unit["is_leader"]) {
                    current_unit_terrain_bonus = 100 - GameCopy.movement_type_dict[GameCopy.unit_dict[unit["type"]]["movement_type"]]["defense"][GameCopy.terrain_dict[GameCopy.map[unit["x"]][unit["y"]]]["name"]];
                    current_unit_max_terrain_bonus = 100 - Math.min(...Object.values(GameCopy.movement_type_dict[GameCopy.unit_dict[unit["type"]]["movement_type"]]["defense"]));

                    if(unit["player_id"] == player_id) {
                        total_unit_health_player += unit["hp"];
                        total_unit_max_health_player += unit["max_hp"];
                        total_unit_terrain_bonus_player += current_unit_terrain_bonus;
                        total_unit_max_terrain_bonus_player += current_unit_max_terrain_bonus;
                        total_unit_xp_progress_player += unit["xp"] / Math.floor(GameCopy.unit_dict[unit["type"]]["experience"] * GameCopy.xp_modifier);
                        unit_count_player++;
                    } else {
                        total_unit_health_enemy += unit["hp"];
                        total_unit_max_health_enemy += unit["max_hp"];
                        total_unit_terrain_bonus_enemy += current_unit_terrain_bonus;
                        total_unit_max_terrain_bonus_enemy += current_unit_max_terrain_bonus;
                        total_unit_xp_progress_enemy += unit["xp"] / Math.floor(GameCopy.unit_dict[unit["type"]]["experience"] * GameCopy.xp_modifier);
                        unit_count_enemy++;
                    }
                }
                if(unit["is_leader"] && unit["player_id"] != player_id) {
                    enemy_leader = unit;
                }
                if(unit["is_leader"] && unit["player_id"] == player_id) {
                    player_leader = unit;
                }
            }
        });
    });

    // Player total unit health
    let player_unit_health_fitness = 0;
    if(total_unit_max_health_player > 0) {
        player_unit_health_fitness = total_unit_health_player / total_unit_max_health_player;
    }
    components.push({"value": player_unit_health_fitness, "weight": CSO.weights[0], "name": "Total player unit health"});

    // Enemy total unit health
    let enemy_unit_health_fitness = 1;  
    if(total_unit_max_health_enemy > 0) {
        enemy_unit_health_fitness = 1 - (total_unit_health_enemy / total_unit_max_health_enemy);
    }
    components.push({"value": enemy_unit_health_fitness, "weight": CSO.weights[1], "name": "Total enemy unit health"});

    // Player total terrain bonus
    if(total_unit_max_terrain_bonus_player > 0) {
        let player_unit_terrain_fitness = total_unit_terrain_bonus_player / total_unit_max_terrain_bonus_player;
        components.push({"value": player_unit_terrain_fitness, "weight": CSO.weights[2], "name": "Total player unit terrain bonus"});
    }

    // Unit distance from enemy leader
    let unit_leader_distance_fitness = 1;
    if(enemy_leader != null) {
        let unit_leader_distance = 0;
        GameCopy.playerQueue.peek()["units"].forEach(unit => {
            if(!unit["is_leader"]) {
                unit_leader_distance += 1 - ((Math.abs(unit["x"] - enemy_leader["x"]) + Math.abs(unit["y"] - enemy_leader["y"])) / (GameCopy.map.length + GameCopy.map[0].length));
            }
        });
        unit_leader_distance_fitness = 0;
        if(GameCopy.playerQueue.peek()["units"].length > 1) {
            unit_leader_distance_fitness = unit_leader_distance / (GameCopy.playerQueue.peek()["units"].length - 1);
        }
    }
    components.push({"value": unit_leader_distance_fitness, "weight": CSO.weights[3], "name": "Total player unit distance from enemy leader"});

    // Attack count
    let attack_count = 0;
    for(var i = 0; i < cat["movements"].length; i++) {
        if(possible_movements[i]["is_attack"]) {
            attack_count++;
        }
    }
    let attack_count_fitness = attack_count/cat["movements"].length;
    components.push({"value": attack_count_fitness, "weight": CSO.weights[4], "name": "Count of attack commands"});

    // Enemy leader health
    let enemy_leader_health_fitness = enemy_leader == null ?  100 : 1 - (enemy_leader["hp"] / enemy_leader["max_hp"]);
    components.push({"value": enemy_leader_health_fitness, "weight": CSO.weights[5], "name": "Enemy leader health"});

    // Player leader health
    let player_leader_health_fitness = player_leader == null ? 0 : (player_leader["hp"] / player_leader["max_hp"]);
    components.push({"value": player_leader_health_fitness, "weight": CSO.weights[6], "name": "Player leader health"});

    // Player income
    let player_income_fitness = GameCopy.playerQueue.peek()["income"] / (GameCopy.base_income + GameCopy.village_count * GameCopy.village_income);
    components.push({"value": player_income_fitness, "weight": CSO.weights[7], "name": "Player income"});

    // Unit experience
    let player_unit_xp_fitness = 0;
    let enemy_unit_xp_fitness = 0;
    if(unit_count_player > 0) {
        // Player unit experience
        player_unit_xp_fitness = total_unit_xp_progress_player / unit_count_player;
        // Enemy unit experience
        enemy_unit_xp_fitness = 1 - (total_unit_xp_progress_enemy / unit_count_player);
    }
    components.push({"value": player_unit_xp_fitness, "weight": CSO.weights[8], "name": "Player unit xp"});
    components.push({"value": enemy_unit_xp_fitness, "weight": CSO.weights[9], "name": "Enemy unit xp"});

    // Aggregating all the components of fitness function
    let fitness = 0;
    components.forEach(component => {
        fitness += component["value"] * component["weight"];
    });

    if(isNaN(fitness)) {
        console.log("Fitness fail");
        console.log("Components", components);
        console.log("Fitness", fitness);
    }

    return fitness;
}
function performSeeking(CSO, cat, movement_caps, attack_caps, possible_movements, possible_attacks) {
    // Step 1 - Create cat copies
    var potential_positions = [];
    var cat_count = CSO.seeking_memory_pool;
    if(CSO.self_position_considering) {
        cat_count--;
        potential_positions.push(create_cat_copy_all_properties(cat));
    }
    for(var i = 0; i < cat_count; i++) {
        potential_positions.push(create_cat_copy(cat));
    }

    // Step 2 - Dimension mutation
    var movement_indices = range(cat["movements"].length);
    var attack_indices = range(cat["attack_ids"].length);
    var movement_selection_count = Math.max(CSO.get_movement_CDC(cat), 1);
    var attack_selection_count = Math.max(CSO.get_attack_CDC(cat), 1);
    potential_positions.forEach(potential_cat => {
        var selected_movement_indices = getRandom(movement_indices, movement_selection_count);
        var selected_attack_indices = getRandom(attack_indices, attack_selection_count);

        selected_movement_indices.forEach(movement_index => {
            potential_cat["movements"][movement_index] += potential_cat["movements"][movement_index] * CSO.seeking_range_of_selected_dimensions * randomOrientation();
            potential_cat["movements"][movement_index] = Math.max(0, potential_cat["movements"][movement_index] % movement_caps[movement_index]);
        });
        selected_attack_indices.forEach(attack_index => {
            potential_cat["attack_ids"][attack_index] += potential_cat["attack_ids"][attack_index] * CSO.seeking_range_of_selected_dimensions * randomOrientation();
            potential_cat["attack_ids"][attack_index] = Math.max(0, potential_cat["attack_ids"][attack_index] % attack_caps[attack_index]);
        });
    });

    // Step 3 - Calculate fitness
    potential_positions.forEach(potential_position => {
        potential_position["fitness"] = evaluateFitnessFunction(CSO, cat, possible_movements, possible_attacks);
    });

    // Step 4 - Calculate selection probabilities
    var best_local_cat = potential_positions[0];
    var worst_local_cat = potential_positions[0];
    potential_positions.forEach(potential_position => {
        if(potential_position["fitness"] > best_local_cat["fitness"]) {
            best_local_cat = potential_position;
        }
        if(potential_position["fitness"] < worst_local_cat["fitness"]) {
            worst_local_cat = potential_position;
        }
    });
    var selection_probabilities = [];
    var probability;
    potential_positions.forEach(potential_position => {
        probability = Math.abs(potential_position["fitness"] - best_local_cat["fitness"]) / Math.max(best_local_cat["fitness"] - worst_local_cat["fitness"] + CSO.zdp1);
        selection_probabilities.push(probability);
    });

    // Step 5 - Select next position
    var probability_sum = selection_probabilities.reduce((sum, current) => sum + current);
    var selected_probability = Math.random() * probability_sum;
    var accumulator = 0;
    var selected_index;
    for(var selected_index = 0; selected_index < selection_probabilities.length && accumulator < selected_probability; selected_index++) {
        accumulator += selection_probabilities[selected_index];
    }

    var selected_position = potential_positions[selected_index % potential_positions.length];
    cat["movements"] = selected_position["movements"];
    cat["attack_ids"] = selected_position["attack_ids"];
    cat["fitness"] = selected_position["fitness"];
}
function performTracing(CSO, cat, best_cat, movement_velocity_caps, attack_velocity_caps, movement_caps, attack_caps, possible_movements) {
    var r1;

    // Step 1 - Update velocities
    for(var i = 0; i < cat["movement_velocities"].length; i++) {
        r1 = Math.random();
        r1 = r1 == 0 ? 0.01 : r1;
        cat["movement_velocities"][i] = cat["movement_velocities"][i] + CSO.c1 * r1 * Math.abs(best_cat["movements"][i] - cat["movements"][i]);
    }
    for(var i = 0; i < cat["attack_velocities"].length; i++) {
        r1 = Math.random();
        r1 = r1 == 0 ? 0.01 : r1;
        cat["attack_velocities"][i] = cat["attack_velocities"][i] + CSO.c1 * r1 * Math.abs(best_cat["attack_ids"][i] - cat["attack_ids"][i]);
    }

    // Step 2 - Clip velocities
    for(var i = 0; i < cat["movement_velocities"].length; i++) {
        cat["movement_velocities"][i] %= movement_velocity_caps[i];
    }
    for(var i = 0; i < cat["attack_velocities"].length; i++) {
        cat["attack_velocities"][i] %= attack_velocity_caps[i];
    }

    // Step 3 - Update position
    for(var i = 0; i < cat["movements"].length; i++) {
        cat["movements"][i] += cat["movement_velocities"][i];
    }
    for(var i = 0; i < cat["attack_ids"].length; i++) {
        cat["attack_ids"][i] += cat["attack_velocities"][i];
    }

    // Extra step - clip position
    for(var i = 0; i < cat["movements"].length; i++) {
        cat["movements"][i] %= movement_caps[i];
    }
    for(var i = 0; i < cat["attack_ids"].length; i++) {
        cat["attack_ids"][i] %= attack_caps[i];
    }

    // Extra step - correct mutual exclusivity of movements
    var uniqueness_check_buffer = [];
    var final_indices = [];
    var index;
    for(var i = 0; i < cat["movements"].length; i++) {
        for(var j = 0; j < movement_caps[i]; j++) {
            index = Math.floor((cat["movements"][i] + j) % movement_caps[i]);
            if(!ContainsCoordinate__(uniqueness_check_buffer, possible_movements[i][index])) {
                uniqueness_check_buffer.push(possible_movements[i][index]);
                final_indices.push(index);
                break;
            }
            index = null;
        }
        if(index == null) {
           uniqueness_check_buffer.push(index);
            final_indices.push(index);
        }
    }
    for(var i = 0; i < cat["movements"].length; i++) {
        cat["movements"][i] = final_indices[i];
    }
}
function range(cap) {
    var range_array = [];
    for(var i = 0; i < cap; i++) {
        range_array.push(i);
    }
    return range_array;
}
function randomOrientation() {
    return random_orientation = Math.random() >= 0.5 ? -1 : 1;
}
function turnCatIntoMovements(cat, possible_movements, possible_attacks) {
    var movements = [];
    for(var i = 0; i < possible_attacks.length; i++) {
        movements.push(cat["movements"][i] == null ? null : possible_movements[i][cat["movements"][i]]);
        if(movements[i] != null && movements[i]["is_attack"]) {
            movements["attack_id"] = cat["attack_ids"][i];
        }
    }

    return movements;
}