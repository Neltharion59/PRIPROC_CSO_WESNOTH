function getMaps() {
    maps = {};

    MAPA = new Array(10);
    MAPA[0] = "Mm^Xm, Gg, Gs^Fds, Gg, Gs^Fds, Gg, Hh, Gs^Fds, Gs^Fds, Gg, Gs^Vh, Md, Ww, Gs^Fds, Gs^Fds, Gg, Gg, Gs^Vl, Gg, Rr";
    MAPA[1]  = "Mm^Xm, Mm^Xm, Md, Gg, Gs^Vh, Gg, Gg, Rr, Gg, Rr, Gg, Ww, Ww, Gg, Gs^Fds, Gg, Gg, Gg, Gg, Gs^Fds";
    MAPA[2]  = "Mm^Xm, Ch, Mm^Xm, Gg, Gs^Fds, Rr, Rr, Gg, Rr, Ww, Wwf, Rr, Chw, Gg, Md, Hh, Gg, Gs^Fds, Mm^Xm, Mm^Xm";
    MAPA[3]  = "Ch, Rr, Rr, Rr, Rr, Gg, Gs^Fds, Md, Wo, Ww^Vm, Wo, Ww, Rr, Rr, Md, Gg, Gg, Gs^Fds, Ch, Mm^Xm";
    MAPA[4]  = "1 Kh, Ch, Gg, Gg, Rr, Rr, Gg, Gg, Wo, Wo, Wo, Wo, Ss, Gs^Fds, Rr, Gg, Gg, Rr^Vhc, Ch, 2 Kh";
    MAPA[5]  = "Rr^Vhc, Ch, Gs^Fds, Gg, Hh, Gg, Rr, Wwf, Wo, Ww, Ww^Vm, Wo, Gs^Fds, Rr, Rr, Rr, Rr, Rr, Rr, Ch";
    MAPA[6]  = "Gg, Gg, Md, Gg, Ww, Ww, Ww, Chw, Rr, Wo, Wo, Rr, Wwf, Ww, Hh, Gs^Fds, Gg, Gg, Ch, Mm^Xm";
    MAPA[7]  = "Ww, Ww, Gg, Ww, Ww, Ss, Ss, Gg, Rr, Rr, Rr, Gg, Gg, Gg, Ww, Ww, Gs^Fds, Gg, Gg, Md";
    MAPA[8]  = "Gs^Fds, Gg, Ww, Gg, Hh, Gg, Gg, Gs^Fds, Gg, Gg, Md, Gs^Fds, Gs^Vh, Gg, Gs^Fds, Ww, Gg, Gs^Fds, Gs^Vh, Gg";
    MAPA[9]  = "Md, Md, Gg, Gg, Gs^Vl, Gg, Gs^Fds, Gs^Fds, Gs^Fds, Gg, Md, Gs^Fds, Gg, Gs^Fds, Hh, Ww, Gs^Fds, Gs^Fds, Gg, Gs^Fds";
    maps["PRIPOC_MAPA_1"] = MAPA;

    MAPA = new Array(10);
    MAPA[0] = "Ss, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Ss";
    MAPA[1] = "Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm";
    MAPA[2] = "Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm";
    MAPA[3] = "Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm";
    MAPA[4] = "Kh, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Kh";
    MAPA[5] = "Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm";
    MAPA[6] = "Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm";
    MAPA[7] = "Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm";
    MAPA[8] = "Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm";
    MAPA[9] = "Ww, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Mm, Ww";
    maps["PRIPOC_MAPA_2"] = MAPA;

    TEMP = new Array(10);
    for(var i = 0; i<TEMP.length; i++) {
        TEMP[i] = "";

        for(var j = 0; j<20; j++) {
            if(j != 0) {
                TEMP[i] += ", ";
            }
            TEMP[i] = TEMP[i] + (i + "|" + j);
        }
    }
    maps["TEST_MAPA_1"] = TEMP;

    return maps;
}

function MapToGrid(map) {
    grid = new Array(map.length);

    for(var i = 0; i<map.length; i++) {
        grid[i] = map[i].split(", ")
    }

    return grid;
}

function onlyUniqueMapParts(map) {
    var map_as_array = []
    map.forEach(element => {
        map_as_array = map_as_array.concat(element)
    });
    for(var i = 0; i<map_as_array.length; i++) {
        if(map_as_array[i].includes(" ")) {
            map_as_array[i] = map_as_array[i].split(" ")[1];
        }
    }

    var unique = map_as_array.filter( onlyUnique );
    return unique
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function extractStartingPositions(map) {
    var startingPositions = []

    for(var i = 0; i<map.length; i++) {
        for(var j = 0; j<map[i].length; j++) {
            if(!map[i][j].includes(" ")) {
                continue;
            } else {
                startingPositions.push([i, j]);
            }
        }
    }

    return startingPositions;
}

function removeStartingPositions(map) {
    for(var i = 0; i<map.length; i++) {
        for(var j = 0; j<map[i].length; j++) {
            if(!map[i][j].includes(" ")) {
                continue;
            } else {
                var tokens = map[i][j].split(" ");
                map[i][j] = tokens[1];
            }
        }
    }
}