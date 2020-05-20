window.onload = function() {
    

    // How many times to try each combination of hyperparams and sides
    const combination_try_count = 1;

    // Hyperparams to try
    const hyperparams = [
        {
            "name": "cat_count",
            "values": [20, 30, 40]
        },
        {
            "name": "iteration_cap",
            "values": [100, 200, 300]
        },
        {
            "name": "seeking_memory_pool",
            "values": [10, 15, 20]
        },
        {
            "name": "mixture_ratio",
            "values": [0.10, 0.20]
        },
        {
            "name": "self_position_considering",
            "values": [true, false]
        },
        {
            "name": "seeking_range_of_selected_dimensions",
            "values": [0.3]
        },
        {
            "name": "count_of_dimensions_2_change",
            "values": [0.2, 0.4]
        }
    ];
    let hyperparam_indices = new Array(hyperparams.length).fill(-1);
    const hyperparam_indice_caps = hyperparams.map(hyperparam => hyperparam["values"].length);

    const hyperparam_variation_count = hyperparams.reduce((accumulator, currentValue) => accumulator * currentValue["values"].length, 1);
    const side_combination_count = 1;//Math.pow(GameObject.sides_list.length, 2);
    const total_run_count = hyperparam_variation_count * combination_try_count * side_combination_count;
    let run_counter = 1;
    let record;

    let config_counter = 1;
    while(incrementHyperparamIndices(hyperparam_indices, hyperparam_indice_caps)) {
        writeToFile({
            "config_id": config_counter,
            "config": getConfig(hyperparam_indices, hyperparams)
        });

       /* for(var i = 0; i < GameObject.sides_list.length; i++) {
            for(var j = i; j < GameObject.sides_list.length; j++) {           */     
                for(var k = 1; k <= combination_try_count; k++) {
                    let GameObject = CreateGameObject();
                    GameObject.turn_limit = 30;
                    let i = Math.floor((Math.random() * GameObject.sides_list.length)  % GameObject.sides_list.length);
                    let j = Math.floor((Math.random() * GameObject.sides_list.length)  % GameObject.sides_list.length);
                    console.log(run_counter, "/", total_run_count, ",", GameObject.sides_list[i], "vs", GameObject.sides_list[j], k.toString()+"/"+combination_try_count.toString()+",",  getConfig(hyperparam_indices, hyperparams));
                    GameObject.setup_session([i, j]);
                    setCSOParams(GameObject.CSO, hyperparam_indices, hyperparams);
                    GameObject.playGame(GameObject.Game);

                    writeToFile({
                        "run_id": run_counter,
                        "config_id": config_counter,
                        "p1_side": GameObject.sides_list[i],
                        "p2_side": GameObject.sides_list[j],
                        "CSO_run_records": GameObject.CSO.run_records,
                        "turn_count": GameObject.turn_count
                    });

                    run_counter++
         /*       }
            }*/
        }

        ++config_counter;
    };
    console.log("Search over");

    function incrementHyperparamIndices(indices, caps) {
        if(indices[0] == -1) {
            for(var i = 0; i < indices.length; i++) {
                indices[i] = 0;
            }
            return true;
        }

        let incremented = false;
        for(var i = indices.length - 1; i >= 0; i--) {
            indices[i] += 1;
            if(indices[i] == caps[i]) {
                indices[i] = 0;
            } else {
                incremented = true;
                break;
            }
        }
        return incremented;
    }
    function setCSOParams(CSO, hyperparam_indices, hyperparams) {
        for(var i = 0; i<hyperparam_indices.length; i++) {
            CSO[hyperparams[i]["name"]] = hyperparams[i]["values"][hyperparam_indices[i]];
        }
    }
    function getConfig(hyperparam_indices, hyperparams) {
        var result = {};
        for(var i = 0; i<hyperparam_indices.length; i++) {
            result[hyperparams[i]["name"]] = hyperparams[i]["values"][hyperparam_indices[i]];
        }
        return result;
    }
    function writeToFile(input) {
        customCallAjax(
            false,
            document.location, "POST", "api/write.php",
            {
                "data": input,
                "test": "ahoj"
            },
            function(result) {
            },
            {},
            {}
        );
    }
}