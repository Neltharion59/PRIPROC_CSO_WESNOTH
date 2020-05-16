function cat_swarm_optimization(possible_movements, units, unit_dict) {
    const cat_count = 50;

    var possible_attacks = units.map(unit => unit_dict[unit["type"]]["attack"]);

    //console.log("possible_movements");
    //console.log(possible_movements);
    //console.log(movements);
    //console.log(attacks);

    var best_cat;

    // Step 1 - Create N cats

    var cats = [];
    for(var i = 0; i < cat_count; i++) {
        cats.push(create_cat_random(possible_movements, possible_attacks));
    }

    best_cat = cats[0];

    // Algorithm is over and we have the best cat
    var best_movements = best_cat["movements"];
    for(var i = 0; i < possible_attacks.length; i++) {
        if(best_movements[i] != null && best_movements[i]["is_attack"]) {
            best_movements["attack_id"] = best_cat["attack_ids"][i];
        }
    }

    //console.log("Best movements by CSO");
    //console.log(best_movements);
    return best_movements;

    //return MovementCalculationRandom(possible_movements);
}
function create_cat_random(movements, attacks) {
   /* console.log(movements);
    console.log(attacks);*/

    var cat = {"movements": [], "attack_ids": []};
    

    ///////////////////////////////////
    //Calculate movements for the cat//
    ///////////////////////////////////
    cat["movements"] = MovementCalculationRandom(movements);

    /////////////////////////////////
    //Calculate attacks for the cat//
    /////////////////////////////////
    var attack_id;
    for(var i = 0; i < attacks.length; i++) {
        attack_id = null;
        if(cat["movements"][i] != null && cat["movements"][i]["is_attack"]) {
            attack_id = getRandomArbitrary(attacks[i].length);
        }
        cat["attack_ids"].push(attack_id);
    }

    return cat;
}