function MovementCalculationRandom(movements) {
    var result = [];
    //console.log(movements);

    var index;
    var selected;
    for(var i = 0; i<movements.length; i++) {
        //console.log("i: " + i, " options: " + movements[i].length);
        selected = null;

        index = getRandomArbitrary(movements[i].length);
        //console.log(index);
        for(var j = 0; j<movements[i].length; j++) {
            selected = movements[i][(j + index) % movements[i].length];
            //console.log(selected);
            if(!ContainsCoordinate__(result, selected)) {
                break;
            } else {
                //console.log("result contains coordinate");
                selected = null;
            }
        }

        //console.log(selected);
        result.push(selected);
    }

    return result;
}
function getRandomArbitrary(max) {
    var result = Math.floor(Math.random() * max)
    return result;
}
function ContainsCoordinate__(array, coordinate) {
    var Result = false;
    for(var i = 0; i < array.length; i++) {
        var element = array[i];
        if(element["coords"][0] == coordinate["coords"][0] && element["coords"][1] == coordinate["coords"][1]) {
            Result = true;
            break;
        }
    };
    return Result;
}