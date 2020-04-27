import re
import os


def to_string(var):
    if "," in var:
        tokensies = var.split(",")
        result = "["
        for token in tokensies:
            if not result == "[":
                result += ","
            result += "\"" + token + "\""
        result += "]"
        return result

    if type(var) == str:
        return "\"" + var + "\""
    return str(var)


sides = []
desired_attrs = ["id", "name", "leader", "recruit"]

side_filename_pattern = re.compile("[A-Za-z]+-default.cfg")
for file in os.listdir("./"):
    if side_filename_pattern.match(file):
        with open(file) as fp:

            current_side = {}
            for line in fp:
                if "=" in line:
                    tokens = line.split("=")
                    name = tokens[0].replace(" ", "")
                    if name not in desired_attrs:
                        continue

                    value = tokens[1]
                    value = value.replace("\n", "")
                    value = value.replace(" ", "")
                    value = value.replace("_", "")
                    value = value.replace("\"", "")

                    current_side[name] = value
            sides.append(current_side)


f = open("Sides.js", "w+")
f.write("function createSidesDict() {\n\tsides_dict = {};\n\n")
for side in sides:
    f.write("\tsides_dict[\"" + side["name"] + "\"] = {};\n")
    for key in side:
        f.write("\tsides_dict[\"" + side["name"] + "\"][\"" + key + "\"] = " + to_string(side[key]) + ";\n")
    f.write("\n")
f.write("\treturn sides_dict;\n}")
