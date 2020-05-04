function MovementCalculationRandom(movements) {
    var result = [];
    console.log(movements);

    var index;
    var selected;
    for(var i = 0; i<movements.length; i++) {
        console.log("i: " + i, " options: " + movements[i].length);
        selected = null;

        index = getRandomArbitrary(movements[i].length);
        console.log(index);
        for(var j = 0; j<movements[i].length; j++) {
            selected = movements[i][(j + index) % movements[i].length];
            //console.log(selected);
            //if(!ContainsCoordinate_(result, selected)) {
                break;
            /*} else {
                //console.log("result contains coordinate");
                selected = null;
            }*/
        }

        console.log(selected);
        result.push(selected);
    }

    return result;
}
function getRandomArbitrary(max) {
    var result = Math.floor(Math.random() * max)
    return result;
}