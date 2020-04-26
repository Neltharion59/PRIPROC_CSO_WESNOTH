import re;

def to_string(var):
    if var == "yes":
        return "true"
    if var == "no":
        return "false"
    try:
        int(var)
        return var
    except Exception as _:
        pass
    if type(var) == str:
        return "\"" + var + "\""
    return str(var)


def type_correction(var):
    if var in ["grassland", "road", "dirt"]:
        return "flat"
    return var


terrains = []
desired_attrs = ["symbol_image", "string", "default_base", "heals",
                 "gives_income", "name", "recruit_onto", "recruit_from"]

with open('terrain.cfg') as fp:

    current_terrain = None

    for line in fp:
        if "[terrain_type]" in line:
            current_terrain = {}
            continue
        if "[/terrain_type]" in line:
            terrains.append(current_terrain)
            continue
        if "=" in line:
            if current_terrain is None:
                continue

            if "name" in line:
                line = line.replace("_", "")
                parts = re.split(r"""("[^"]*"|'[^']*')""", line)
                parts[::2] = map(lambda s: "".join(s.split()), parts[::2])
                line = "".join(parts)
                line = line.replace(" ", "_")
                line = line.lower()
                line = line.replace("\"", "")

            tokens = line.split("=")
            name = tokens[0].replace(" ", "")
            if name not in desired_attrs:
                continue

            value = tokens[1]
            value = value.split("#")[0]
            value = value.replace(" ", "")
            value = value.replace("\\", "\\\\")
            value = value.replace("\n", "")
            if name == "name":
                value = type_correction(value)

            current_terrain[name] = value

f = open("Terrain.js", "w+")
f.write("function createTerrainDict() {\n\tterrain_dict = {};\n\n")
for terrain in terrains:
    f.write("\tterrain_dict[\"" + terrain["string"] + "\"] = {};\n")
    for key in terrain:
        if key == "string":
            continue
        f.write("\tterrain_dict[\"" + terrain["string"] + "\"][\"" + key + "\"] = " + to_string(terrain[key]) + ";\n")
    f.write("\n")
f.write("\treturn terrain_dict;\n}")
