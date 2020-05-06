import os
import fnmatch
import re
import pprint


def find_files(directory, pattern):
    for root, dirs, files in os.walk(directory):
        for basename in files:
            if fnmatch.fnmatch(basename, pattern):
                filename = os.path.join(root, basename)
                yield filename


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


def to_string(var, preserve = False):
    if isinstance(var, dict):
        for key in var:
            try:
                var[key] = int(var[key])
            except Exception as _:
                pass
        if preserve:
            return var
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
        if var[0] == "\"" and var[-1] == "\"":
            return var
        return "\"" + var + "\""
    return str(var)


tag_open_pattern = re.compile("\[[A-Za-z_]+\]")
tag_close_pattern = re.compile("\[\/[A-Za-z_]+\]")
attack_special_pattern = re.compile("\{WEAPON_SPECIAL_[A-Z]+\}")
ability_special_pattern = re.compile("\{ABILITY_[A-Z]+\}")
trait_special_pattern = re.compile("\{TRAIT_[A-Z]+\}")
string_pattern = re.compile(".*\".*\".*")
weird_property_pattern = re.compile(".*\{.*\}.*")
units = []
attr_ignore_lists = {
    "unit_type": ["profile", "description", "die_sound", "small_profile"],
    "attack": ["icon"]
}
ignore_tags = ["attack_anim", "filter_attack", "frame", "missile_frame", "standing_anim", "attack_sound_frame",
               "special_note", "defend", "movement_anim", "idle_anim", "if", "else", "healing_anim",
               "throw_sound_frame", "sound_frame", "gender", "halo"]
for filename in find_files('units', '*.cfg'):
    print(filename)
    with open(filename, encoding='utf-8') as fp:
        current_dict = {}
        tag_stack = ["super"]
        dict_stack = [current_dict]

        unit = {}
        for line in fp:
            line = line.replace(" ", "")
            tag = tag_open_pattern.match(line)
            if tag:
                tag = tag.string[1:-2]
                tag_stack.append(tag)
                if tag not in ignore_tags:
                    dict_stack.append(current_dict)
                    current_dict = {}
                continue
            tag = tag_close_pattern.match(line)
            if tag:
                tag = tag.string[2:-2]
                tag = tag_stack.pop()
                if tag not in ignore_tags:
                    temp = dict_stack.pop()
                    append_to_dict(temp, tag, current_dict)
                    current_dict = temp
                continue
            if tag_stack[-1] in ignore_tags:
                continue
            if attack_special_pattern.match(line):
                line = "attack_special=" + attack_special_pattern.match(line).string[1:-2]
            if trait_special_pattern.match(line):
                line = "traits=" + trait_special_pattern.match(line).string[1:-2]
            if ability_special_pattern.match(line):
                line = "ability=" + ability_special_pattern.match(line).string[1:-2]
            if weird_property_pattern.match(line):
                continue
            if "=" in line:
                tokens = line.split("=")

                name = tokens[0].replace(" ", "")
                if tag_stack[-1] in attr_ignore_lists and name in attr_ignore_lists[tag_stack[-1]]:
                    continue
                value = tokens[1]
                if string_pattern.match(value):
                    value = re.findall('"([^"]*)"', value)[0]
                else:
                    value = value.split("#")[0]
                    value = value.replace(" ", "")
                    value = value.replace("\n", "")

                append_to_dict(current_dict, name, value)

                continue

        units.append(current_dict["unit_type"])


f = open("Units.js", "w+")
f.write("function createUnitDict() {\n\tunit_dict = {};\n\n")
for unit in units:
    f.write("\tunit_dict[\"" + unit["id"] + "\"] = {};\n")
    if unit["name"] == "WalkingCorpse":
        unit["hitpoints"] = "18"
    if unit["name"] == "WalkingCorpse":
        unit["movement"] = "4"
    if unit["name"] == "WalkingCorpse":
        unit["movement_type"] = "smallfoot"
    if unit["name"] == "WalkingCorpse":
        unit["image"] = "units/undead/zombie.png"
    if unit["name"] == "Soulless":
        unit["hitpoints"] = "28"
    if unit["name"] == "Soulless":
        unit["movement"] = "4"
    if unit["name"] == "Soulless":
        unit["movement_type"] = "smallfoot"
    if unit["name"] == "Soulless":
        unit["image"] = "units/undead/soulless.png"
    for key in unit:
        if key == "attack" and isinstance(unit[key], dict):
            unit[key] = [unit[key]]
        if key == "attack":
            unit[key] = [to_string(x, preserve=True) for x in unit[key]]
        if key == "traits" and not isinstance(unit[key], list):
            unit[key] = [unit[key]]
        if key == "advances_to" and unit[key] != "null":
            unit[key] = str(unit[key]).split(",")
        f.write("\tunit_dict[\"" + unit["id"] + "\"][\"" + key + "\"] = " + to_string(
            unit[key]) + ";\n")
    f.write("\n")
f.write("\treturn unit_dict;\n}")
