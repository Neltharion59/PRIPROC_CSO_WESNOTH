function MovementCalculationRandom(movements, indices = false) {

    var result = [];
    var result_indices = [];
    //console.log(movements);

    var index;
    var selected;
    var selected_index;
    for(var i = 0; i<movements.length; i++) {
        //console.log("i: " + i, " options: " + movements[i].length);
        selected = null;
        selected_index = null;

        if(movements[i].length > 0) {
            index = getRandomArbitrary(movements[i].length);
            //console.log(index);
            for(var j = 0; j<movements[i].length; j++) {
                selected_index = (j + index) % movements[i].length;
                selected = movements[i][selected_index];
                //console.log(selected);
                if(!ContainsCoordinate__(result, selected)) {
                    break;
                } else {
                    //console.log("result contains coordinate");
                    selected = null;
                    selected_index = null;
                }
            }
        }

        //console.log(selected);
        result.push(selected);
        result_indices.push(selected_index);
    }

    var output = indices ? result_indices : result;

    return output;
}
function getRandomArbitrary(max) {
    var result = Math.floor(Math.random() * max)
    return result;
}
function getRandomArbitraryFloat(max) {
    var result = Math.random() * max
    return result;
}
function ContainsCoordinate__(array, coordinate) {
    var Result = false;
    var temp = coordinate;
    if(coordinate["is_attack"]) {
        temp = coordinate["previous"];
    }

    for(var i = 0; i < array.length; i++) {
        var element = array[i];
        if(element == null) {
            continue;
        }
        if(element["coords"][0] == temp["coords"][0] && element["coords"][1] == temp["coords"][1]) {
            Result = true;
            break;
        }
    };
    return Result;
}