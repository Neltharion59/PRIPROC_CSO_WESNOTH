function createMinTerrainDict(unique_terrains) {
    var min_terrain_dict = {}
    var all_terrain_dict = createTerrainDict();

    unique_terrains.forEach(element => {

        var tokens = element.split("^");
        for(var i = 1; i<tokens.length; i++) tokens[i] = "^" + tokens[i];
        var current_terrain = {"editor_group" : []}
        tokens.forEach(element_token => {
            for(var key in all_terrain_dict[element_token]) {

                if(key == "editor_group") {
                    current_terrain[key] = current_terrain[key].concat(all_terrain_dict[element_token][key]);
                } else {
                    current_terrain[key] = all_terrain_dict[element_token][key];
                }
            }
        });

        min_terrain_dict[element] = current_terrain;
    });

    return min_terrain_dict;
}