function cat_swarm_optimization(possible_movements, units, unit_dict) {
    const cat_count = 5;
    const iteration_cap = 400;

    var possible_attacks = units.map(unit => unit_dict[unit["type"]]["attack"]);
    
    var movement_caps = possible_movements.map(movement => movement.length);
    var attack_caps = possible_attacks.map(attack => attack.length);

    var movement_velocity_caps = movement_caps.map(movement_cap => movement_cap);
    var attack_velocity_caps = attack_caps.map(attack_cap => attack_cap);

    // MR
    var mixture_ratio = 0.2;
    //console.log("possible_movements");
    //console.log(possible_movements);
    //console.log(movements);
    //console.log(attacks);

    var best_cat = {"fitness": Number.MIN_SAFE_INTEGER};

    // Step 1 - Create N cats
    var cats = [];
    for(var i = 0; i < cat_count; i++) {
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
    updateCatModes(cats, mixture_ratio);

    for(var i = 0; i < iteration_cap; i++) {

        // Step 3 - Evaluate fitness function and keep the best cat
        cats.forEach(cat => {
            if(!("fitness" in cat)) {
                cat["fitness"] = evaluateFitnessFunction(cat);
            }
            if(cat["fitness"] > best_cat["fitness"]) {
                best_cat = cat;
            }
        });

        // Step 4 - Perform cats' actions according to seeking/tracing
        cats.forEach(cat => {
            //console.log(cat);
            if(cat["mode"] == "SEEK") {
                performSeeking(cat);
            } else if(cat["mode"] == "TRACE") {
                performTracing(cat, best_cat, movement_velocity_caps, attack_velocity_caps, movement_caps, attack_caps, possible_movements);
            }
        });

        // Step 5 - Shuffle cat modes
        updateCatModes(cats, mixture_ratio);
    }

    //best_cat = cats[0];

    // Algorithm is over and we have the best cat
    var best_movements = [];
    for(var i = 0; i < possible_attacks.length; i++) {
        best_movements.push(best_cat["movements"][i] == null ? null : possible_movements[i][best_cat["movements"][i]]);
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
    cat["movements"] = MovementCalculationRandom(movements, true);

    /////////////////////////////////
    //Calculate attacks for the cat//
    /////////////////////////////////
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
function updateCatModes(cats, mixture_ratio) {
    cats.forEach(cat => {
        cat["mode"] = "SEEK";
    });

    var tracing_cats = getRandom(cats, Math.min(Math.floor(cats.length * mixture_ratio), 1));
    tracing_cats.forEach(cat => {
        cat["mode"] = "TRACE";
    });
}
function getRandom(arr, n) {
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
function evaluateFitnessFunction(cat) {
    var fitness = getRandomArbitrary(101);
    return fitness;
}
function performSeeking(cat) {

}
function performTracing(cat, best_cat, movement_velocity_caps, attack_velocity_caps, movement_caps, attack_caps, possible_movements) {
    const c1 = 2;
    var r1;

    // Step 1 - Update velocities
    for(var i = 0; i < cat["movement_velocities"].length; i++) {
        r1 = Math.random();
        r1 = r1 == 0 ? 0.01 : r1;
        
        /*if(i > 0 && isNaN(cat["movement_velocities"][i])) {
            console.log("NaN came to tracing as parameter");
        }*/
        //var temp = cat["movement_velocities"][i] + c1 * r1 * Math.abs(best_cat["movements"][i] - cat["movements"][i]);
        /*if(i > 0 && isNaN(temp)) {
            console.log("Checking temp");
            console.log(best_cat["movements"][i]);  console.log(cat["movements"][i]);
        }*/
        // Sometimes cat["movements"][i] are Undefined here with i>0 (meaning it is not leader)

        cat["movement_velocities"][i] = cat["movement_velocities"][i] + c1 * r1 * Math.abs(best_cat["movements"][i] - cat["movements"][i]);

        /*if(i > 0 && isNaN(cat["movement_velocities"][i])) {
            console.log("NaN happend as calculation");
            console.log(c1 * r1 * Math.abs(best_cat["movements"][i] - cat["movements"][i]));
            console.log(Math.abs(best_cat["movements"][i] - cat["movements"][i]));
            console.log(best_cat["movements"][i] - cat["movements"][i]);
            console.log(best_cat["movements"][i]);
            console.log(i);
            console.log(best_cat);
            console.log(cat);
            console.log("NaN check over");
            console.log(cat["movements"]);
            console.log(cat["movements"].includes(null));
        }*/
    }
    for(var i = 0; i < cat["attack_velocities"].length; i++) {
        r1 = Math.random();
        r1 = r1 == 0 ? 0.01 : r1;
        cat["attack_velocities"][i] = cat["attack_velocities"][i] + c1 * r1 * Math.abs(best_cat["attack_ids"][i] - cat["attack_ids"][i]);
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
            /*if(possible_movements[i][index] == null) {
                console.log("problem");
                console.log(index);
                console.log(cat);
            }*/
            if(!ContainsCoordinate__(uniqueness_check_buffer, possible_movements[i][index])) {
                //console.log("unique");
                uniqueness_check_buffer.push(possible_movements[i][index]);
                //if(i>0 && index == null) { console.log("Pushing null to indices");}
                final_indices.push(index);
                break;
            }
            index = null;
        }
        if(index == null) {
            if(i > 0) console.log("adding null to movement indices");
            uniqueness_check_buffer.push(index);
            final_indices.push(index);
        }
    }
    for(var i = 0; i < cat["movements"].length; i++) {
        cat["movements"][i] = final_indices[i];
        /*if(i>0 && final_indices[i] == null) {
            console.log("Final indice is null");
            console.log(i);
            console.log(final_indices);
        }*/
    }
    //console.log(final_indices);*/
}