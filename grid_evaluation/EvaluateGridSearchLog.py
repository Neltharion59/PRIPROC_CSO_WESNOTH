import json
from functools import reduce
from statistics import mean


def normalize(input_set):
    max_value = reduce(max, input_set)
    result = map(lambda x: x/max_value, input_set)
    return result


def get_max_index(input_set):
    max_index = 0
    max_value = 0
    for j in range(len(input_set)):
        if input_set[j] > max_value:
            max_index = j
    return max_index


def get_min_index(input_set):
    min_index = 0
    min_value = 0
    for j in range(len(input_set)):
        if input_set[j] < min_value:
            min_index = j
    return min_index


file_name = "train_log_second.txt"

results = []
with open(file_name) as file:
    for line in file:
        obj = json.loads(line)
        index = int(obj["config_id"]) - 1
        if len(results) < index + 1:
            results.append({})
        for key in obj:
            results[index][key] = obj[key]

max_fitnesses = map(lambda config: reduce(max, filter(lambda x: x < 100, map(lambda record: float(record["best_fitness"]), config["CSO_run_records"]))), results)
avg_fitnesses = map(lambda config: mean([x for x in map(lambda record: float(record["best_fitness"]), config["CSO_run_records"]) if x < 100]), results)
best_fitness_find_turn_min = map(lambda config: reduce(min, filter(lambda x: x > 0, map(lambda record: int(record["iteration"]), config["CSO_run_records"]))), results)
best_fitness_find_turn_max = map(lambda config: reduce(max, filter(lambda x: x > 0, map(lambda record: int(record["iteration"]), config["CSO_run_records"]))), results)
best_fitness_find_turn_avg = map(lambda config: mean(filter(lambda x: x > 0, map(lambda record: int(record["iteration"]), config["CSO_run_records"]))), results)
turn_count = map(lambda config: int(config["turn_count"]), results)

stats = [max_fitnesses, avg_fitnesses, best_fitness_find_turn_min, best_fitness_find_turn_max, best_fitness_find_turn_avg, turn_count]
weights = [1, 2, 1, 1, 2, 0.5]
stats = [list(normalize(list(stat))) for stat in stats]
stats[3] = list(map(lambda x: 1 - x, stats[2]))
stats[-1] = list(map(lambda x: 1 - x, stats[-1]))

model_fitnesses = [0] * len(results)
for i in range(len(stats[0])):
    for stat, w in zip(stats, weights):
        model_fitnesses[i] += stat[i] * w

max_model_fitness_index = get_max_index(model_fitnesses)
max_avg_fitness_index = get_max_index(stats[1])
min_avg_fitness_find_turn_index = get_min_index(stats[4])

print("Best overall model:")
print(results[max_model_fitness_index]["config"])
print()

print("Best model for finding best fitness:")
print(results[max_avg_fitness_index]["config"])
print()

print("Best model for finding its best fitness fast:")
print(results[min_avg_fitness_find_turn_index]["config"])
print()





