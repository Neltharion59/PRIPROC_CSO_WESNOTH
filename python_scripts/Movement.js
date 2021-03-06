function createMovementDict() {
	movement_dict = {};

	movement_dict["smallfoot"] = {};
	movement_dict["smallfoot"]["shallow_water"] = 3;
	movement_dict["smallfoot"]["reef"] = 2;
	movement_dict["smallfoot"]["swamp_water"] = 3;
	movement_dict["smallfoot"]["flat"] = 1;
	movement_dict["smallfoot"]["sand"] = 2;
	movement_dict["smallfoot"]["forest"] = 2;
	movement_dict["smallfoot"]["hills"] = 2;
	movement_dict["smallfoot"]["mountains"] = 3;
	movement_dict["smallfoot"]["village"] = 1;
	movement_dict["smallfoot"]["castle"] = 1;
	movement_dict["smallfoot"]["cave"] = 2;
	movement_dict["smallfoot"]["frozen"] = 3;
	movement_dict["smallfoot"]["fungus"] = 2;
	movement_dict["smallfoot"]["defense"] = {'shallow_water': 80, 'reef': 70, 'swamp_water': 80, 'flat': 60, 'sand': 70, 'forest': 50, 'hills': 50, 'mountains': 40, 'village': 40, 'castle': 40, 'cave': 60, 'frozen': 80, 'fungus': 50, 'deep_water': 100};
	movement_dict["smallfoot"]["resistance"] = {'blade': 100, 'pierce': 100, 'impact': 100, 'fire': 100, 'cold': 100, 'arcane': 80};

	movement_dict["orcishfoot"] = {};
	movement_dict["orcishfoot"]["shallow_water"] = 3;
	movement_dict["orcishfoot"]["reef"] = 2;
	movement_dict["orcishfoot"]["swamp_water"] = 3;
	movement_dict["orcishfoot"]["flat"] = 1;
	movement_dict["orcishfoot"]["sand"] = 2;
	movement_dict["orcishfoot"]["forest"] = 2;
	movement_dict["orcishfoot"]["hills"] = 1;
	movement_dict["orcishfoot"]["mountains"] = 2;
	movement_dict["orcishfoot"]["village"] = 1;
	movement_dict["orcishfoot"]["castle"] = 1;
	movement_dict["orcishfoot"]["cave"] = 2;
	movement_dict["orcishfoot"]["frozen"] = 2;
	movement_dict["orcishfoot"]["fungus"] = 3;
	movement_dict["orcishfoot"]["defense"] = {'shallow_water': 80, 'reef': 70, 'swamp_water': 70, 'flat': 60, 'sand': 70, 'forest': 50, 'hills': 50, 'mountains': 40, 'village': 40, 'castle': 40, 'cave': 60, 'frozen': 80, 'fungus': 60, 'deep_water': 100};
	movement_dict["orcishfoot"]["resistance"] = {'blade': 100, 'pierce': 100, 'impact': 100, 'fire': 100, 'cold': 100, 'arcane': 100};

	movement_dict["largefoot"] = {};
	movement_dict["largefoot"]["shallow_water"] = 2;
	movement_dict["largefoot"]["reef"] = 2;
	movement_dict["largefoot"]["swamp_water"] = 2;
	movement_dict["largefoot"]["flat"] = 1;
	movement_dict["largefoot"]["sand"] = 2;
	movement_dict["largefoot"]["forest"] = 2;
	movement_dict["largefoot"]["hills"] = 1;
	movement_dict["largefoot"]["mountains"] = 2;
	movement_dict["largefoot"]["village"] = 1;
	movement_dict["largefoot"]["castle"] = 1;
	movement_dict["largefoot"]["cave"] = 1;
	movement_dict["largefoot"]["frozen"] = 2;
	movement_dict["largefoot"]["fungus"] = 2;
	movement_dict["largefoot"]["defense"] = {'shallow_water': 80, 'reef': 70, 'swamp_water': 80, 'flat': 70, 'sand': 70, 'forest': 60, 'hills': 50, 'mountains': 40, 'village': 60, 'castle': 60, 'cave': 60, 'frozen': 80, 'fungus': 50, 'deep_water': 100};
	movement_dict["largefoot"]["resistance"] = {'blade': 80, 'pierce': 80, 'impact': 100, 'fire': 100, 'cold': 100, 'arcane': 110};

	movement_dict["armoredfoot"] = {};
	movement_dict["armoredfoot"]["shallow_water"] = 4;
	movement_dict["armoredfoot"]["reef"] = 3;
	movement_dict["armoredfoot"]["swamp_water"] = 4;
	movement_dict["armoredfoot"]["flat"] = 1;
	movement_dict["armoredfoot"]["sand"] = 2;
	movement_dict["armoredfoot"]["forest"] = 2;
	movement_dict["armoredfoot"]["hills"] = 3;
	movement_dict["armoredfoot"]["village"] = 1;
	movement_dict["armoredfoot"]["castle"] = 1;
	movement_dict["armoredfoot"]["cave"] = 2;
	movement_dict["armoredfoot"]["frozen"] = 4;
	movement_dict["armoredfoot"]["fungus"] = 2;
	movement_dict["armoredfoot"]["defense"] = {'shallow_water': 90, 'reef': 80, 'swamp_water': 90, 'flat': 70, 'sand': 80, 'forest': 60, 'hills': 60, 'village': 60, 'castle': 50, 'cave': 60, 'frozen': 80, 'fungus': 60, 'deep_water': 100, 'mountains': 100};
	movement_dict["armoredfoot"]["resistance"] = {'blade': 50, 'pierce': 60, 'impact': 90, 'fire': 110, 'cold': 110, 'arcane': 80};

	movement_dict["elusivefoot"] = {};
	movement_dict["elusivefoot"]["shallow_water"] = 2;
	movement_dict["elusivefoot"]["reef"] = 2;
	movement_dict["elusivefoot"]["swamp_water"] = 2;
	movement_dict["elusivefoot"]["flat"] = 1;
	movement_dict["elusivefoot"]["sand"] = 2;
	movement_dict["elusivefoot"]["forest"] = 2;
	movement_dict["elusivefoot"]["hills"] = 2;
	movement_dict["elusivefoot"]["mountains"] = 3;
	movement_dict["elusivefoot"]["village"] = 1;
	movement_dict["elusivefoot"]["castle"] = 1;
	movement_dict["elusivefoot"]["cave"] = 2;
	movement_dict["elusivefoot"]["frozen"] = 2;
	movement_dict["elusivefoot"]["fungus"] = 2;
	movement_dict["elusivefoot"]["defense"] = {'shallow_water': 60, 'reef': 50, 'swamp_water': 60, 'flat': 40, 'sand': 60, 'forest': 30, 'hills': 30, 'mountains': 30, 'village': 30, 'castle': 30, 'cave': 50, 'frozen': 60, 'fungus': 30, 'deep_water': 100};
	movement_dict["elusivefoot"]["resistance"] = {'blade': 130, 'pierce': 120, 'impact': 120, 'fire': 100, 'cold': 100, 'arcane': 80};

	movement_dict["mounted"] = {};
	movement_dict["mounted"]["shallow_water"] = 4;
	movement_dict["mounted"]["reef"] = 3;
	movement_dict["mounted"]["swamp_water"] = 4;
	movement_dict["mounted"]["flat"] = 1;
	movement_dict["mounted"]["sand"] = 2;
	movement_dict["mounted"]["forest"] = 3;
	movement_dict["mounted"]["hills"] = 2;
	movement_dict["mounted"]["village"] = 1;
	movement_dict["mounted"]["castle"] = 1;
	movement_dict["mounted"]["cave"] = 4;
	movement_dict["mounted"]["frozen"] = 2;
	movement_dict["mounted"]["fungus"] = 4;
	movement_dict["mounted"]["defense"] = {'shallow_water': 80, 'reef': 70, 'swamp_water': 80, 'flat': 60, 'sand': 70, 'forest': -70, 'hills': 60, 'village': 60, 'castle': 60, 'cave': 80, 'frozen': 70, 'fungus': -80, 'deep_water': 100, 'mountains': 100};
	movement_dict["mounted"]["resistance"] = {'blade': 80, 'pierce': 120, 'impact': 70, 'fire': 100, 'cold': 100, 'arcane': 80};

	movement_dict["woodland"] = {};
	movement_dict["woodland"]["shallow_water"] = 3;
	movement_dict["woodland"]["reef"] = 2;
	movement_dict["woodland"]["swamp_water"] = 2;
	movement_dict["woodland"]["flat"] = 1;
	movement_dict["woodland"]["sand"] = 2;
	movement_dict["woodland"]["forest"] = 1;
	movement_dict["woodland"]["hills"] = 2;
	movement_dict["woodland"]["mountains"] = 3;
	movement_dict["woodland"]["village"] = 1;
	movement_dict["woodland"]["castle"] = 1;
	movement_dict["woodland"]["cave"] = 3;
	movement_dict["woodland"]["frozen"] = 2;
	movement_dict["woodland"]["fungus"] = 2;
	movement_dict["woodland"]["defense"] = {'shallow_water': 80, 'reef': 70, 'swamp_water': 70, 'flat': 60, 'sand': 70, 'forest': 30, 'hills': 50, 'mountains': 40, 'village': 40, 'castle': 40, 'cave': 70, 'frozen': 70, 'fungus': 50, 'deep_water': 100};
	movement_dict["woodland"]["resistance"] = {};

	movement_dict["woodlandfloat"] = {};
	movement_dict["woodlandfloat"]["flying"] = true;
	movement_dict["woodlandfloat"]["deep_water"] = 2;
	movement_dict["woodlandfloat"]["shallow_water"] = 1;
	movement_dict["woodlandfloat"]["reef"] = 1;
	movement_dict["woodlandfloat"]["swamp_water"] = 1;
	movement_dict["woodlandfloat"]["flat"] = 1;
	movement_dict["woodlandfloat"]["sand"] = 1;
	movement_dict["woodlandfloat"]["forest"] = 1;
	movement_dict["woodlandfloat"]["hills"] = 1;
	movement_dict["woodlandfloat"]["mountains"] = 2;
	movement_dict["woodlandfloat"]["village"] = 1;
	movement_dict["woodlandfloat"]["castle"] = 1;
	movement_dict["woodlandfloat"]["cave"] = 2;
	movement_dict["woodlandfloat"]["frozen"] = 1;
	movement_dict["woodlandfloat"]["fungus"] = 2;
	movement_dict["woodlandfloat"]["defense"] = {'deep_water': 70, 'shallow_water': 60, 'reef': 50, 'swamp_water': 60, 'flat': 50, 'sand': 60, 'forest': 30, 'hills': 50, 'mountains': 40, 'village': 40, 'castle': 40, 'cave': 70, 'frozen': 60, 'fungus': 50};
	movement_dict["woodlandfloat"]["resistance"] = {};

	movement_dict["treefolk"] = {};
	movement_dict["treefolk"]["shallow_water"] = 2;
	movement_dict["treefolk"]["reef"] = 2;
	movement_dict["treefolk"]["swamp_water"] = 2;
	movement_dict["treefolk"]["flat"] = 1;
	movement_dict["treefolk"]["sand"] = 2;
	movement_dict["treefolk"]["forest"] = 1;
	movement_dict["treefolk"]["hills"] = 2;
	movement_dict["treefolk"]["mountains"] = 3;
	movement_dict["treefolk"]["village"] = 1;
	movement_dict["treefolk"]["castle"] = 1;
	movement_dict["treefolk"]["cave"] = 3;
	movement_dict["treefolk"]["frozen"] = 2;
	movement_dict["treefolk"]["fungus"] = 2;
	movement_dict["treefolk"]["defense"] = {'shallow_water': 80, 'reef': 80, 'swamp_water': 70, 'flat': 80, 'sand': 80, 'forest': 60, 'hills': 70, 'mountains': 70, 'village': 80, 'castle': 80, 'cave': 80, 'frozen': 80, 'fungus': 70, 'deep_water': 100};
	movement_dict["treefolk"]["resistance"] = {'blade': 100, 'pierce': 40, 'impact': 60, 'fire': 150, 'cold': 90, 'arcane': 130};

	movement_dict["fly"] = {};
	movement_dict["fly"]["flying"] = true;
	movement_dict["fly"]["cave"] = 3;
	movement_dict["fly"]["fungus"] = 3;
	movement_dict["fly"]["defense"] = {'cave': 80, 'fungus': 70, 'deep_water': 50, 'mountains': 40, 'flat': 50, 'forest': 50, 'hills': 50, 'village': 50, 'shallow_water': 50, 'castle': 50, 'swamp_water': 50};
	movement_dict["fly"]["resistance"] = {};

	movement_dict["smallfly"] = {};
	movement_dict["smallfly"]["flying"] = true;
	movement_dict["smallfly"]["cave"] = 1;
	movement_dict["smallfly"]["fungus"] = 2;
	movement_dict["smallfly"]["defense"] = {'cave': 40, 'fungus': 40, 'deep_water': 40, 'mountains': 40, 'flat': 40, 'forest': 40, 'hills': 40, 'village': 40, 'shallow_water': 40, 'castle': 40, 'swamp_water': 40};
	movement_dict["smallfly"]["resistance"] = {};

	movement_dict["lightfly"] = {};
	movement_dict["lightfly"]["flying"] = true;
	movement_dict["lightfly"]["cave"] = 3;
	movement_dict["lightfly"]["fungus"] = 3;
	movement_dict["lightfly"]["defense"] = {'cave': 70, 'fungus': 70, 'deep_water': 100, 'mountains': 100};
	movement_dict["lightfly"]["resistance"] = {'blade': 100, 'pierce': 100, 'impact': 110, 'fire': 100, 'cold': 100, 'arcane': 80};

	movement_dict["deepsea"] = {};
	movement_dict["deepsea"]["deep_water"] = 1;
	movement_dict["deepsea"]["shallow_water"] = 2;
	movement_dict["deepsea"]["reef"] = 2;
	movement_dict["deepsea"]["swamp_water"] = 2;
	movement_dict["deepsea"]["flat"] = 4;
	movement_dict["deepsea"]["sand"] = 4;
	movement_dict["deepsea"]["forest"] = 5;
	movement_dict["deepsea"]["hills"] = 5;
	movement_dict["deepsea"]["village"] = 2;
	movement_dict["deepsea"]["castle"] = 1;
	movement_dict["deepsea"]["cave"] = 3;
	movement_dict["deepsea"]["frozen"] = 2;
	movement_dict["deepsea"]["fungus"] = 3;
	movement_dict["deepsea"]["defense"] = {'deep_water': 40, 'shallow_water': 50, 'reef': 50, 'swamp_water': 60, 'flat': 70, 'sand': 70, 'forest': 70, 'hills': 70, 'village': 70, 'castle': 70, 'cave': 80, 'frozen': 70, 'fungus': 80, 'mountains': 100};
	movement_dict["deepsea"]["resistance"] = {'blade': 80, 'pierce': 100, 'impact': 70, 'fire': 100, 'cold': 40, 'arcane': 80};

	movement_dict["swimmer"] = {};
	movement_dict["swimmer"]["deep_water"] = 1;
	movement_dict["swimmer"]["shallow_water"] = 1;
	movement_dict["swimmer"]["reef"] = 2;
	movement_dict["swimmer"]["swamp_water"] = 1;
	movement_dict["swimmer"]["flat"] = 2;
	movement_dict["swimmer"]["sand"] = 2;
	movement_dict["swimmer"]["forest"] = 5;
	movement_dict["swimmer"]["hills"] = 5;
	movement_dict["swimmer"]["village"] = 1;
	movement_dict["swimmer"]["castle"] = 1;
	movement_dict["swimmer"]["cave"] = 3;
	movement_dict["swimmer"]["frozen"] = 2;
	movement_dict["swimmer"]["fungus"] = 3;
	movement_dict["swimmer"]["defense"] = {'deep_water': 50, 'shallow_water': 40, 'reef': 30, 'swamp_water': 40, 'flat': 70, 'sand': 70, 'forest': 70, 'hills': 70, 'village': 60, 'castle': 60, 'cave': 80, 'frozen': 70, 'fungus': 80, 'mountains': 100};
	movement_dict["swimmer"]["resistance"] = {'blade': 100, 'pierce': 100, 'impact': 100, 'fire': 100, 'cold': 80, 'arcane': 100};

	movement_dict["naga"] = {};
	movement_dict["naga"]["deep_water"] = 1;
	movement_dict["naga"]["shallow_water"] = 1;
	movement_dict["naga"]["reef"] = 2;
	movement_dict["naga"]["swamp_water"] = 1;
	movement_dict["naga"]["flat"] = 2;
	movement_dict["naga"]["sand"] = 1;
	movement_dict["naga"]["forest"] = 3;
	movement_dict["naga"]["hills"] = 3;
	movement_dict["naga"]["mountains"] = 5;
	movement_dict["naga"]["village"] = 1;
	movement_dict["naga"]["castle"] = 2;
	movement_dict["naga"]["cave"] = 2;
	movement_dict["naga"]["frozen"] = 2;
	movement_dict["naga"]["fungus"] = 2;
	movement_dict["naga"]["defense"] = {'deep_water': 50, 'shallow_water': 40, 'reef': 30, 'swamp_water': 40, 'flat': 70, 'sand': 60, 'forest': 60, 'hills': 60, 'mountains': 60, 'village': 60, 'castle': 50, 'cave': 60, 'frozen': 80, 'fungus': 60};
	movement_dict["naga"]["resistance"] = {'blade': 100, 'pierce': 100, 'impact': 100, 'fire': 100, 'cold': 100, 'arcane': 100};

	movement_dict["float"] = {};
	movement_dict["float"]["flying"] = true;
	movement_dict["float"]["deep_water"] = 1;
	movement_dict["float"]["shallow_water"] = 1;
	movement_dict["float"]["reef"] = 2;
	movement_dict["float"]["swamp_water"] = 2;
	movement_dict["float"]["defense"] = {'deep_water': 50, 'shallow_water': 50, 'reef': 50, 'swamp_water': 60, 'mountains': 100};
	movement_dict["float"]["resistance"] = {'blade': 100, 'pierce': 100, 'impact': 110, 'fire': 100, 'cold': 100, 'arcane': 40};

	movement_dict["mountainfoot"] = {};
	movement_dict["mountainfoot"]["resistance"] = {'blade': 100, 'pierce': 100, 'impact': 100, 'fire': 100, 'cold': 100, 'arcane': 80};

	movement_dict["dwarvishfoot"] = {};
	movement_dict["dwarvishfoot"]["resistance"] = {'blade': 80, 'pierce': 80, 'impact': 80, 'fire': 90, 'cold': 90, 'arcane': 90};
	movement_dict["dwarvishfoot"]["defense"] = {'mountains': 30, 'flat': 70, 'forest': 70, 'hills': 40, 'village': 50, 'shallow_water': 80, 'castle': 40, 'deep_water': 100, 'swamp_water': 80, 'fungus': 60};

	movement_dict["gruefoot"] = {};
	movement_dict["gruefoot"]["shallow_water"] = 3;
	movement_dict["gruefoot"]["reef"] = 2;
	movement_dict["gruefoot"]["swamp_water"] = 2;
	movement_dict["gruefoot"]["flat"] = 1;
	movement_dict["gruefoot"]["sand"] = 2;
	movement_dict["gruefoot"]["forest"] = 2;
	movement_dict["gruefoot"]["hills"] = 2;
	movement_dict["gruefoot"]["mountains"] = 3;
	movement_dict["gruefoot"]["village"] = 1;
	movement_dict["gruefoot"]["castle"] = 1;
	movement_dict["gruefoot"]["cave"] = 2;
	movement_dict["gruefoot"]["frozen"] = 2;
	movement_dict["gruefoot"]["fungus"] = 2;
	movement_dict["gruefoot"]["defense"] = {'shallow_water': 80, 'reef': 70, 'swamp_water': 70, 'flat': 60, 'sand': 70, 'forest': 50, 'hills': 50, 'mountains': 40, 'village': 40, 'castle': 40, 'cave': 60, 'frozen': 70, 'fungus': 40, 'deep_water': 100};
	movement_dict["gruefoot"]["resistance"] = {'blade': 90, 'pierce': 70, 'impact': 100, 'fire': 90, 'cold': 60, 'arcane': 80};

	movement_dict["undeadfoot"] = {};
	movement_dict["undeadfoot"]["deep_water"] = 3;
	movement_dict["undeadfoot"]["shallow_water"] = 2;
	movement_dict["undeadfoot"]["reef"] = 2;
	movement_dict["undeadfoot"]["swamp_water"] = 2;
	movement_dict["undeadfoot"]["flat"] = 1;
	movement_dict["undeadfoot"]["sand"] = 2;
	movement_dict["undeadfoot"]["forest"] = 2;
	movement_dict["undeadfoot"]["hills"] = 2;
	movement_dict["undeadfoot"]["mountains"] = 3;
	movement_dict["undeadfoot"]["village"] = 1;
	movement_dict["undeadfoot"]["castle"] = 1;
	movement_dict["undeadfoot"]["cave"] = 2;
	movement_dict["undeadfoot"]["frozen"] = 2;
	movement_dict["undeadfoot"]["fungus"] = 2;
	movement_dict["undeadfoot"]["defense"] = {'deep_water': 90, 'shallow_water': 80, 'reef': 70, 'swamp_water': 70, 'flat': 60, 'sand': 70, 'forest': 50, 'hills': 50, 'mountains': 40, 'village': 40, 'castle': 40, 'cave': 60, 'frozen': 70, 'fungus': 40};
	movement_dict["undeadfoot"]["resistance"] = {'blade': 90, 'pierce': 70, 'impact': 110, 'fire': 120, 'cold': 40, 'arcane': 150};

	movement_dict["undeadfly"] = {};
	movement_dict["undeadfly"]["flying"] = true;
	movement_dict["undeadfly"]["cave"] = 1;
	movement_dict["undeadfly"]["fungus"] = 1;
	movement_dict["undeadfly"]["defense"] = {'cave': 60, 'fungus': 50, 'deep_water': 100, 'mountains': 100};
	movement_dict["undeadfly"]["resistance"] = {'blade': 100, 'pierce': 100, 'impact': 100, 'fire': 120, 'cold': 40, 'arcane': 140};

	movement_dict["undeadspirit"] = {};
	movement_dict["undeadspirit"]["flying"] = true;
	movement_dict["undeadspirit"]["deep_water"] = 2;
	movement_dict["undeadspirit"]["shallow_water"] = 2;
	movement_dict["undeadspirit"]["reef"] = 2;
	movement_dict["undeadspirit"]["swamp_water"] = 1;
	movement_dict["undeadspirit"]["flat"] = 1;
	movement_dict["undeadspirit"]["sand"] = 1;
	movement_dict["undeadspirit"]["forest"] = 1;
	movement_dict["undeadspirit"]["hills"] = 1;
	movement_dict["undeadspirit"]["mountains"] = 1;
	movement_dict["undeadspirit"]["village"] = 1;
	movement_dict["undeadspirit"]["castle"] = 1;
	movement_dict["undeadspirit"]["cave"] = 1;
	movement_dict["undeadspirit"]["frozen"] = 1;
	movement_dict["undeadspirit"]["unwalkable"] = 1;
	movement_dict["undeadspirit"]["fungus"] = 1;
	movement_dict["undeadspirit"]["defense"] = {'mountains': 50, 'flat': 50, 'forest': 50, 'hills': 50, 'village': 50, 'shallow_water': 50, 'castle': 50, 'deep_water': 50, 'swamp_water': 50, 'fungus': 50};
	movement_dict["undeadspirit"]["resistance"] = {'blade': 50, 'pierce': 50, 'impact': 50, 'fire': 90, 'cold': 30, 'arcane': 110};

	movement_dict["spirit"] = {};
	movement_dict["spirit"]["flying"] = true;
	movement_dict["spirit"]["deep_water"] = 4;
	movement_dict["spirit"]["shallow_water"] = 3;
	movement_dict["spirit"]["reef"] = 3;
	movement_dict["spirit"]["swamp_water"] = 1;
	movement_dict["spirit"]["flat"] = 1;
	movement_dict["spirit"]["sand"] = 1;
	movement_dict["spirit"]["forest"] = 1;
	movement_dict["spirit"]["hills"] = 1;
	movement_dict["spirit"]["mountains"] = 1;
	movement_dict["spirit"]["village"] = 1;
	movement_dict["spirit"]["castle"] = 1;
	movement_dict["spirit"]["cave"] = 1;
	movement_dict["spirit"]["frozen"] = 1;
	movement_dict["spirit"]["unwalkable"] = 1;
	movement_dict["spirit"]["fungus"] = 1;
	movement_dict["spirit"]["defense"] = {'cave': 60, 'fungus': 50, 'deep_water': 100, 'mountains': 100};
	movement_dict["spirit"]["resistance"] = {'blade': 40, 'pierce': 40, 'impact': 40, 'fire': 100, 'cold': 30, 'arcane': 100};

	movement_dict["lizard"] = {};
	movement_dict["lizard"]["flies"] = false;
	movement_dict["lizard"]["shallow_water"] = 3;
	movement_dict["lizard"]["reef"] = 2;
	movement_dict["lizard"]["swamp_water"] = 1;
	movement_dict["lizard"]["flat"] = 1;
	movement_dict["lizard"]["sand"] = 1;
	movement_dict["lizard"]["forest"] = 2;
	movement_dict["lizard"]["hills"] = 1;
	movement_dict["lizard"]["mountains"] = 2;
	movement_dict["lizard"]["village"] = 1;
	movement_dict["lizard"]["castle"] = 1;
	movement_dict["lizard"]["cave"] = 1;
	movement_dict["lizard"]["frozen"] = 4;
	movement_dict["lizard"]["fungus"] = 1;
	movement_dict["lizard"]["defense"] = {'shallow_water': 60, 'reef': 60, 'swamp_water': 40, 'flat': 60, 'sand': 40, 'forest': 40, 'hills': 40, 'mountains': 40, 'village': 50, 'castle': 40, 'cave': 40, 'frozen': 70, 'fungus': 40, 'deep_water': 100};
	movement_dict["lizard"]["resistance"] = {'blade': 110, 'pierce': 80, 'impact': 110, 'fire': 120, 'cold': 120, 'arcane': 80};

	movement_dict["none"] = {};
	movement_dict["none"]["flies"] = false;
	movement_dict["none"]["defense"] = {'deep_water': 100, 'mountains': 100};
	movement_dict["none"]["resistance"] = {};

	movement_dict["scuttlefoot"] = {};
	movement_dict["scuttlefoot"]["shallow_water"] = 3;
	movement_dict["scuttlefoot"]["reef"] = 2;
	movement_dict["scuttlefoot"]["swamp_water"] = 2;
	movement_dict["scuttlefoot"]["flat"] = 1;
	movement_dict["scuttlefoot"]["sand"] = 2;
	movement_dict["scuttlefoot"]["forest"] = 2;
	movement_dict["scuttlefoot"]["hills"] = 3;
	movement_dict["scuttlefoot"]["mountains"] = 4;
	movement_dict["scuttlefoot"]["village"] = 1;
	movement_dict["scuttlefoot"]["castle"] = 1;
	movement_dict["scuttlefoot"]["cave"] = 2;
	movement_dict["scuttlefoot"]["frozen"] = 2;
	movement_dict["scuttlefoot"]["fungus"] = 2;
	movement_dict["scuttlefoot"]["defense"] = {'shallow_water': 70, 'reef': 60, 'swamp_water': 60, 'flat': 60, 'sand': 60, 'forest': 50, 'hills': 50, 'mountains': 40, 'village': 40, 'castle': 40, 'cave': 60, 'frozen': 60, 'fungus': 50, 'deep_water': 100};
	movement_dict["scuttlefoot"]["resistance"] = {'blade': 90, 'pierce': 90, 'impact': 30, 'fire': 200, 'cold': 120, 'arcane': 150};

	movement_dict["rodentfoot"] = {};
	movement_dict["rodentfoot"]["shallow_water"] = 3;
	movement_dict["rodentfoot"]["reef"] = 2;
	movement_dict["rodentfoot"]["swamp_water"] = 2;
	movement_dict["rodentfoot"]["flat"] = 1;
	movement_dict["rodentfoot"]["sand"] = 2;
	movement_dict["rodentfoot"]["forest"] = 1;
	movement_dict["rodentfoot"]["hills"] = 2;
	movement_dict["rodentfoot"]["mountains"] = 3;
	movement_dict["rodentfoot"]["village"] = 1;
	movement_dict["rodentfoot"]["castle"] = 1;
	movement_dict["rodentfoot"]["cave"] = 1;
	movement_dict["rodentfoot"]["frozen"] = 2;
	movement_dict["rodentfoot"]["fungus"] = 2;
	movement_dict["rodentfoot"]["defense"] = {'shallow_water': 80, 'reef': 70, 'swamp_water': 60, 'flat': 50, 'sand': 50, 'forest': 50, 'hills': 50, 'mountains': 40, 'village': 50, 'castle': 50, 'cave': 40, 'frozen': 50, 'fungus': 50, 'deep_water': 100};
	movement_dict["rodentfoot"]["resistance"] = {'blade': 100, 'pierce': 100, 'impact': 100, 'fire': 100, 'cold': 90, 'arcane': 80};

	movement_dict["drakefly"] = {};
	movement_dict["drakefly"]["#flying"] = true;
	movement_dict["drakefly"]["defense"] = {'deep_water': 80, 'shallow_water': 80, 'reef': 70, 'swamp_water': 70, 'flat': 70, 'sand': 60, 'forest': 60, 'hills': 60, 'mountains': 60, 'village': 60, 'castle': 60, 'cave': 70, 'fungus': 60, 'frozen': 80, 'unwalkable': 60};
	movement_dict["drakefly"]["resistance"] = {};

	movement_dict["drakeglide"] = {};
	movement_dict["drakeglide"]["#flying"] = true;
	movement_dict["drakeglide"]["defense"] = {'mountains': 60, 'flat': 60, 'forest': 60, 'hills': 60, 'village': 60, 'shallow_water': 60, 'castle': 60, 'deep_water': 60, 'swamp_water': 60, 'fungus': 60};
	movement_dict["drakeglide"]["resistance"] = {};

	movement_dict["drakeglide2"] = {};
	movement_dict["drakeglide2"]["#flying"] = true;
	movement_dict["drakeglide2"]["cave"] = 3;
	movement_dict["drakeglide2"]["fungus"] = 2;
	movement_dict["drakeglide2"]["defense"] = {'mountains': 50, 'flat': 50, 'forest': 50, 'hills': 50, 'village': 50, 'shallow_water': 50, 'castle': 50, 'deep_water': 50, 'swamp_water': 50, 'fungus': 60};
	movement_dict["drakeglide2"]["resistance"] = {};

	movement_dict["drakefoot"] = {};
	movement_dict["drakefoot"]["shallow_water"] = 3;
	movement_dict["drakefoot"]["reef"] = 2;
	movement_dict["drakefoot"]["swamp_water"] = 3;
	movement_dict["drakefoot"]["flat"] = 1;
	movement_dict["drakefoot"]["sand"] = 1;
	movement_dict["drakefoot"]["forest"] = 2;
	movement_dict["drakefoot"]["hills"] = 1;
	movement_dict["drakefoot"]["mountains"] = 1;
	movement_dict["drakefoot"]["village"] = 1;
	movement_dict["drakefoot"]["castle"] = 1;
	movement_dict["drakefoot"]["cave"] = 2;
	movement_dict["drakefoot"]["frozen"] = 3;
	movement_dict["drakefoot"]["fungus"] = 2;
	movement_dict["drakefoot"]["defense"] = {'shallow_water': 80, 'reef': 70, 'swamp_water': 80, 'flat': 70, 'sand': 60, 'forest': 60, 'hills': 60, 'mountains': 60, 'village': 60, 'castle': 60, 'cave': 70, 'frozen': 80, 'fungus': 60, 'deep_water': 100};
	movement_dict["drakefoot"]["resistance"] = {'blade': 80, 'pierce': 100, 'impact': 70, 'fire': 50, 'cold': 150, 'arcane': 130};

	movement_dict["dunefoot"] = {};
	movement_dict["dunefoot"]["shallow_water"] = 3;
	movement_dict["dunefoot"]["reef"] = 2;
	movement_dict["dunefoot"]["swamp_water"] = 2;
	movement_dict["dunefoot"]["flat"] = 1;
	movement_dict["dunefoot"]["sand"] = 1;
	movement_dict["dunefoot"]["forest"] = 2;
	movement_dict["dunefoot"]["hills"] = 2;
	movement_dict["dunefoot"]["mountains"] = 2;
	movement_dict["dunefoot"]["village"] = 1;
	movement_dict["dunefoot"]["castle"] = 1;
	movement_dict["dunefoot"]["cave"] = 2;
	movement_dict["dunefoot"]["frozen"] = 3;
	movement_dict["dunefoot"]["fungus"] = 2;
	movement_dict["dunefoot"]["defense"] = {'shallow_water': 80, 'reef': 70, 'swamp_water': 70, 'flat': 60, 'sand': 60, 'forest': 60, 'hills': 40, 'mountains': 40, 'village': 40, 'castle': 40, 'cave': 60, 'frozen': 80, 'fungus': 50, 'deep_water': 100};
	movement_dict["dunefoot"]["resistance"] = {'blade': 100, 'pierce': 100, 'impact': 100, 'fire': 100, 'cold': 100, 'arcane': 80};

	movement_dict["duneelusivefoot"] = {};
	movement_dict["duneelusivefoot"]["shallow_water"] = 3;
	movement_dict["duneelusivefoot"]["reef"] = 2;
	movement_dict["duneelusivefoot"]["swamp_water"] = 2;
	movement_dict["duneelusivefoot"]["flat"] = 1;
	movement_dict["duneelusivefoot"]["sand"] = 1;
	movement_dict["duneelusivefoot"]["forest"] = 2;
	movement_dict["duneelusivefoot"]["hills"] = 2;
	movement_dict["duneelusivefoot"]["mountains"] = 2;
	movement_dict["duneelusivefoot"]["village"] = 1;
	movement_dict["duneelusivefoot"]["castle"] = 1;
	movement_dict["duneelusivefoot"]["cave"] = 2;
	movement_dict["duneelusivefoot"]["frozen"] = 3;
	movement_dict["duneelusivefoot"]["fungus"] = 2;
	movement_dict["duneelusivefoot"]["defense"] = {'shallow_water': 70, 'reef': 60, 'swamp_water': 70, 'flat': 50, 'sand': 40, 'forest': 40, 'hills': 40, 'mountains': 40, 'village': 40, 'castle': 40, 'cave': 60, 'frozen': 80, 'fungus': 40, 'deep_water': 100};
	movement_dict["duneelusivefoot"]["resistance"] = {'blade': 110, 'pierce': 110, 'impact': 110, 'fire': 100, 'cold': 100, 'arcane': 80};

	movement_dict["dunearmoredfoot"] = {};
	movement_dict["dunearmoredfoot"]["shallow_water"] = 3;
	movement_dict["dunearmoredfoot"]["reef"] = 2;
	movement_dict["dunearmoredfoot"]["swamp_water"] = 3;
	movement_dict["dunearmoredfoot"]["flat"] = 1;
	movement_dict["dunearmoredfoot"]["sand"] = 1;
	movement_dict["dunearmoredfoot"]["forest"] = 2;
	movement_dict["dunearmoredfoot"]["hills"] = 2;
	movement_dict["dunearmoredfoot"]["mountains"] = 3;
	movement_dict["dunearmoredfoot"]["village"] = 1;
	movement_dict["dunearmoredfoot"]["castle"] = 1;
	movement_dict["dunearmoredfoot"]["cave"] = 2;
	movement_dict["dunearmoredfoot"]["frozen"] = 3;
	movement_dict["dunearmoredfoot"]["fungus"] = 2;
	movement_dict["dunearmoredfoot"]["defense"] = {'shallow_water': 80, 'reef': 70, 'swamp_water': 70, 'flat': 60, 'sand': 60, 'forest': 60, 'hills': 50, 'mountains': 50, 'village': 50, 'castle': 40, 'cave': 60, 'frozen': 80, 'fungus': 60, 'deep_water': 100};
	movement_dict["dunearmoredfoot"]["resistance"] = {'blade': 80, 'pierce': 80, 'impact': 110, 'fire': 100, 'cold': 100, 'arcane': 80};

	movement_dict["dunehorse"] = {};
	movement_dict["dunehorse"]["shallow_water"] = 4;
	movement_dict["dunehorse"]["reef"] = 3;
	movement_dict["dunehorse"]["swamp_water"] = 4;
	movement_dict["dunehorse"]["flat"] = 1;
	movement_dict["dunehorse"]["sand"] = 1;
	movement_dict["dunehorse"]["forest"] = 3;
	movement_dict["dunehorse"]["hills"] = 2;
	movement_dict["dunehorse"]["mountains"] = 3;
	movement_dict["dunehorse"]["village"] = 1;
	movement_dict["dunehorse"]["castle"] = 1;
	movement_dict["dunehorse"]["cave"] = 3;
	movement_dict["dunehorse"]["frozen"] = 2;
	movement_dict["dunehorse"]["fungus"] = 3;
	movement_dict["dunehorse"]["defense"] = {'shallow_water': 80, 'reef': 70, 'swamp_water': 80, 'flat': 60, 'sand': 60, 'forest': 60, 'hills': 40, 'mountains': 40, 'village': 60, 'castle': 40, 'cave': 70, 'frozen': 70, 'fungus': 60, 'deep_water': 100};
	movement_dict["dunehorse"]["resistance"] = {'blade': 100, 'pierce': 120, 'impact': 90, 'fire': 100, 'cold': 100, 'arcane': 80};

	movement_dict["dunearmoredhorse"] = {};
	movement_dict["dunearmoredhorse"]["shallow_water"] = 4;
	movement_dict["dunearmoredhorse"]["reef"] = 3;
	movement_dict["dunearmoredhorse"]["swamp_water"] = 4;
	movement_dict["dunearmoredhorse"]["flat"] = 1;
	movement_dict["dunearmoredhorse"]["sand"] = 1;
	movement_dict["dunearmoredhorse"]["forest"] = 3;
	movement_dict["dunearmoredhorse"]["hills"] = 2;
	movement_dict["dunearmoredhorse"]["mountains"] = 4;
	movement_dict["dunearmoredhorse"]["village"] = 1;
	movement_dict["dunearmoredhorse"]["castle"] = 1;
	movement_dict["dunearmoredhorse"]["cave"] = 3;
	movement_dict["dunearmoredhorse"]["frozen"] = 2;
	movement_dict["dunearmoredhorse"]["fungus"] = 3;
	movement_dict["dunearmoredhorse"]["defense"] = {'shallow_water': 80, 'reef': 70, 'swamp_water': 80, 'flat': 60, 'sand': 60, 'forest': -70, 'hills': 40, 'mountains': 60, 'village': 60, 'castle': 50, 'cave': 70, 'frozen': 70, 'fungus': -70, 'deep_water': 100};
	movement_dict["dunearmoredhorse"]["resistance"] = {'blade': 80, 'pierce': 120, 'impact': 80, 'fire': 100, 'cold': 100, 'arcane': 80};

	return movement_dict;
}