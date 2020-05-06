import re

tag_open_pattern = re.compile("\[[A-Za-z]+\]")
tag_close_pattern = re.compile("\[\/[A-Za-z]+\]")
trait_pattern = re.compile("\{TRAIT_[A-Z]+\}")

superdict = {}
attr_ignore_lists = {
    "race": ["description", "name", "male_name", "female_name", "plural_name", "<header>text",
    "Drakesoriginatedfromanarchipelagoofvolcanicislandscalled<ref>dst"]
}


def append_to_dict(dict_in, key, item):
    if key in dict_in:
        if not isinstance(dict_in[key], list):
            dict_in[key] = [dict_in[key]]
        if not isinstance(item, list):
            dict_in[key].append(item)
        else:
            dict_in[key] = dict_in[key] + item
    else:
        dict_in[key] = item


def to_string(var):
    if isinstance(var, dict):
        for key in var:
            try:
                var[key] = int(var[key])
            except Exception as _:
                pass
    if var == "yes":
        return "true"
    if var == "no":
        return "false"
    if var == "null":
        return var
    try:
        int(var)
        return var
    except Exception as _:
        pass
    if type(var) == str:
        return "\"" + var + "\""
    return str(var)


with open('units.cfg') as fp:

    current_dict = superdict
    tag_stack = ["super"]
    dict_stack = [current_dict]

    for line in fp:
        line = line.replace(" ", "")
        tag = tag_open_pattern.match(line)
        if tag:
            tag = tag.string[1:-2]
            tag_stack.append(tag)
            dict_stack.append(current_dict)
            current_dict = {}
            continue
        tag = tag_close_pattern.match(line)
        if tag:
            tag = tag.string[2:-2]
            temp = dict_stack.pop()
            append_to_dict(temp, tag_stack.pop(), current_dict)
            current_dict = temp
            continue
        if trait_pattern.match(line):
            line = "traits=" + trait_pattern.match(line).string[1:-2]
        if "=" in line:
            tokens = line.split("=")

            name = tokens[0].replace(" ", "")
            if tag_stack[-1] in attr_ignore_lists and name in attr_ignore_lists[tag_stack[-1]]:
                continue

            value = tokens[1]
            value = value.split("#")[0]
            value = value.replace(" ", "")
            value = value.replace("\n", "")

            append_to_dict(current_dict, name, value)

            continue


superdict = superdict["units"]
racedict = {}
for race in superdict["race"]:
    if not ("ignore_global_traits" in race and race["ignore_global_traits"] == "yes"):
        append_to_dict(race, "traits", superdict["traits"])
    if "markov_chain_size" not in race:
        race["markov_chain_size"] = "1"
    if "ignore_global_traits" not in race:
        race["ignore_global_traits"] = "no"
    if type(race["traits"]) == str:
        race["traits"] = [race["traits"]]

    idt = race["id"]
    del race["id"]
    if "ignore_global_traits" in race:
        del race["ignore_global_traits"]
    if "undead_variation" not in race:
        race["undead_variation"] = "null"
    racedict[idt] = race
del superdict['traits']
del superdict['race']

f = open("Races.js", "w+")
f.write("function createRaceDict() {\n\trace_dict = {};\n\n")
for race in racedict:
        f.write("\trace_dict[\"" + race + "\"] = {};\n")
        for key in racedict[race]:
            f.write("\trace_dict[\"" + race + "\"][\"" + key + "\"] = " + to_string(racedict[race][key]) + ";\n")
        f.write("\n")
f.write("\treturn race_dict;\n}")



movedict = {}
for move in superdict["movetype"]:
    idt = move["name"]
    del move["name"]
    movedict[idt] = move
del superdict['movetype']

known_terrain_types = ["mountains", "flat", "forest", "hills", "village", "shallow_water", "castle", "deep_water", "swamp_water"]

for movement_type in movedict:
    if "defense" in movedict[movement_type] and "deep_water" not in movedict[movement_type]["defense"]:
        movedict[movement_type]["defense"]["deep_water"] = "100"
    if "defense" in movedict[movement_type] and "mountains" not in movedict[movement_type]["defense"]:
        movedict[movement_type]["defense"]["mountains"] = "100"
    if "resistance" not in movedict[movement_type]:
        movedict[movement_type]["resistance"] = {}
    if movement_type == "smallfly":
        for tt in known_terrain_types:
            movedict[movement_type]["defense"][tt] = "40"
    if movement_type == "fly":
        for tt in known_terrain_types:
            movedict[movement_type]["defense"][tt] = "50"
        movedict[movement_type]["defense"]["mountains"] = "40"
        movedict[movement_type]["defense"]["fungus"] = "70"
    if movement_type == "dwarvishfoot":
        movedict[movement_type]["defense"] = {}
        movedict[movement_type]["defense"]["mountains"] = "30"
        movedict[movement_type]["defense"]["flat"] = "70"
        movedict[movement_type]["defense"]["forest"] = "70"
        movedict[movement_type]["defense"]["hills"] = "40"
        movedict[movement_type]["defense"]["village"] = "50"
        movedict[movement_type]["defense"]["shallow_water"] = "80"
        movedict[movement_type]["defense"]["castle"] = "40"
        movedict[movement_type]["defense"]["deep_water"] = "100"
        movedict[movement_type]["defense"]["swamp_water"] = "80"
        movedict[movement_type]["defense"]["fungus"] = "60"


f = open("Movement.js", "w+")
f.write("function createMovementDict() {\n\tmovement_dict = {};\n\n")
for movement in movedict:
        f.write("\tmovement_dict[\"" + movement + "\"] = {};\n")
        for key in movedict[movement]:
            f.write("\tmovement_dict[\"" + movement + "\"][\"" + key + "\"] = " + to_string(movedict[movement][key]) + ";\n")
        f.write("\n")
f.write("\treturn movement_dict;\n}")

