function Create2DArray(x, y) {
    var array = new Array(y);

    for (var i = 0; i < y; i++) {
         array[i] = new Array(x);
    }

    return array;
}