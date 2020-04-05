function createRaceDict() {
	race_dict = {};

	race_dict["bats"] = {};
	race_dict["bats"]["num_traits"] = 2;
	race_dict["bats"]["undead_variation"] = "bat";
	race_dict["bats"]["traits"] = ['TRAIT_STRONG', 'TRAIT_QUICK', 'TRAIT_INTELLIGENT', 'TRAIT_RESILIENT'];
	race_dict["bats"]["markov_chain_size"] = 1;

	race_dict["drake"] = {};
	race_dict["drake"]["num_traits"] = 2;
	race_dict["drake"]["undead_variation"] = "drake";
	race_dict["drake"]["traits"] = ['TRAIT_STRONG', 'TRAIT_QUICK', 'TRAIT_INTELLIGENT', 'TRAIT_RESILIENT'];
	race_dict["drake"]["markov_chain_size"] = 1;

	race_dict["dwarf"] = {};
	race_dict["dwarf"]["num_traits"] = 2;
	race_dict["dwarf"]["undead_variation"] = "dwarf";
	race_dict["dwarf"]["traits"] = ['TRAIT_HEALTHY', 'TRAIT_STRONG', 'TRAIT_QUICK', 'TRAIT_INTELLIGENT', 'TRAIT_RESILIENT'];
	race_dict["dwarf"]["markov_chain_size"] = 1;

	race_dict["elf"] = {};
	race_dict["elf"]["num_traits"] = 2;
	race_dict["elf"]["markov_chain_size"] = 2;
	race_dict["elf"]["traits"] = ['TRAIT_DEXTROUS', 'TRAIT_STRONG', 'TRAIT_QUICK', 'TRAIT_INTELLIGENT', 'TRAIT_RESILIENT'];
	race_dict["elf"]["undead_variation"] = null;

	race_dict["falcon"] = {};
	race_dict["falcon"]["num_traits"] = 2;
	race_dict["falcon"]["undead_variation"] = "gryphon";
	race_dict["falcon"]["markov_chain_size"] = 2;
	race_dict["falcon"]["traits"] = ['TRAIT_STRONG', 'TRAIT_QUICK', 'TRAIT_INTELLIGENT', 'TRAIT_RESILIENT'];

	race_dict["goblin"] = {};
	race_dict["goblin"]["num_traits"] = 1;
	race_dict["goblin"]["undead_variation"] = "goblin";
	race_dict["goblin"]["traits"] = ['TRAIT_WEAK', 'TRAIT_SLOW', 'TRAIT_DIM'];
	race_dict["goblin"]["markov_chain_size"] = 1;

	race_dict["gryphon"] = {};
	race_dict["gryphon"]["num_traits"] = 2;
	race_dict["gryphon"]["undead_variation"] = "gryphon";
	race_dict["gryphon"]["traits"] = ['TRAIT_STRONG', 'TRAIT_QUICK', 'TRAIT_INTELLIGENT', 'TRAIT_RESILIENT'];
	race_dict["gryphon"]["markov_chain_size"] = 1;

	race_dict["human"] = {};
	race_dict["human"]["num_traits"] = 2;
	race_dict["human"]["traits"] = ['TRAIT_STRONG', 'TRAIT_QUICK', 'TRAIT_INTELLIGENT', 'TRAIT_RESILIENT'];
	race_dict["human"]["markov_chain_size"] = 1;
	race_dict["human"]["undead_variation"] = null;

	race_dict["dunefolk"] = {};
	race_dict["dunefolk"]["num_traits"] = 2;
	race_dict["dunefolk"]["markov_chain_size"] = 2;
	race_dict["dunefolk"]["traits"] = ['TRAIT_STRONG', 'TRAIT_QUICK', 'TRAIT_INTELLIGENT', 'TRAIT_RESILIENT'];
	race_dict["dunefolk"]["undead_variation"] = null;

	race_dict["lizard"] = {};
	race_dict["lizard"]["num_traits"] = 2;
	race_dict["lizard"]["undead_variation"] = "saurian";
	race_dict["lizard"]["traits"] = ['TRAIT_STRONG', 'TRAIT_QUICK', 'TRAIT_INTELLIGENT', 'TRAIT_RESILIENT'];
	race_dict["lizard"]["markov_chain_size"] = 1;

	race_dict["mechanical"] = {};
	race_dict["mechanical"]["num_traits"] = 1;
	race_dict["mechanical"]["traits"] = ['TRAIT_MECHANICAL'];
	race_dict["mechanical"]["markov_chain_size"] = 1;
	race_dict["mechanical"]["undead_variation"] = null;

	race_dict["merman"] = {};
	race_dict["merman"]["num_traits"] = 2;
	race_dict["merman"]["undead_variation"] = "swimmer";
	race_dict["merman"]["traits"] = ['TRAIT_STRONG', 'TRAIT_QUICK', 'TRAIT_INTELLIGENT', 'TRAIT_RESILIENT'];
	race_dict["merman"]["markov_chain_size"] = 1;

	race_dict["monster"] = {};
	race_dict["monster"]["num_traits"] = 0;
	race_dict["monster"]["traits"] = ['TRAIT_STRONG', 'TRAIT_QUICK', 'TRAIT_INTELLIGENT', 'TRAIT_RESILIENT'];
	race_dict["monster"]["markov_chain_size"] = 1;
	race_dict["monster"]["undead_variation"] = null;

	race_dict["naga"] = {};
	race_dict["naga"]["num_traits"] = 2;
	race_dict["naga"]["undead_variation"] = "swimmer";
	race_dict["naga"]["traits"] = ['TRAIT_STRONG', 'TRAIT_QUICK', 'TRAIT_INTELLIGENT', 'TRAIT_RESILIENT'];
	race_dict["naga"]["markov_chain_size"] = 1;

	race_dict["ogre"] = {};
	race_dict["ogre"]["num_traits"] = 2;
	race_dict["ogre"]["traits"] = ['TRAIT_STRONG', 'TRAIT_QUICK', 'TRAIT_INTELLIGENT', 'TRAIT_RESILIENT'];
	race_dict["ogre"]["markov_chain_size"] = 1;
	race_dict["ogre"]["undead_variation"] = null;

	race_dict["orc"] = {};
	race_dict["orc"]["num_traits"] = 2;
	race_dict["orc"]["traits"] = ['TRAIT_STRONG', 'TRAIT_QUICK', 'TRAIT_INTELLIGENT', 'TRAIT_RESILIENT'];
	race_dict["orc"]["markov_chain_size"] = 1;
	race_dict["orc"]["undead_variation"] = null;

	race_dict["troll"] = {};
	race_dict["troll"]["num_traits"] = 2;
	race_dict["troll"]["undead_variation"] = "troll";
	race_dict["troll"]["traits"] = ['TRAIT_STRONG', 'TRAIT_QUICK', 'TRAIT_RESILIENT', 'TRAIT_FEARLESS'];
	race_dict["troll"]["markov_chain_size"] = 1;

	race_dict["undead"] = {};
	race_dict["undead"]["num_traits"] = 1;
	race_dict["undead"]["traits"] = ['TRAIT_UNDEAD'];
	race_dict["undead"]["markov_chain_size"] = 1;
	race_dict["undead"]["undead_variation"] = null;

	race_dict["wolf"] = {};
	race_dict["wolf"]["num_traits"] = 2;
	race_dict["wolf"]["undead_variation"] = "wolf";
	race_dict["wolf"]["traits"] = ['TRAIT_STRONG', 'TRAIT_QUICK', 'TRAIT_INTELLIGENT', 'TRAIT_RESILIENT'];
	race_dict["wolf"]["markov_chain_size"] = 1;

	race_dict["wose"] = {};
	race_dict["wose"]["num_traits"] = 0;
	race_dict["wose"]["undead_variation"] = "wose";
	race_dict["wose"]["markov_chain_size"] = 3;
	race_dict["wose"]["traits"] = ['TRAIT_STRONG', 'TRAIT_QUICK', 'TRAIT_INTELLIGENT', 'TRAIT_RESILIENT'];

	return race_dict;
}