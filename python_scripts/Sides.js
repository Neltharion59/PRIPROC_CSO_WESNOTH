function createSidesDict() {
	sides_dict = {};

	sides_dict["Drakes"] = {};
	sides_dict["Drakes"]["id"] = "Drakes";
	sides_dict["Drakes"]["name"] = "Drakes";
	sides_dict["Drakes"]["leader"] = ["DrakeFlare","FireDrake","DrakeArbiter","DrakeThrasher","DrakeWarrior","SaurianOracle","SaurianSoothsayer"];
	sides_dict["Drakes"]["recruit"] = ["DrakeBurner","DrakeClasher","DrakeGlider","DrakeFighter","SaurianSkirmisher","SaurianAugur"];

	sides_dict["Dunefolk"] = {};
	sides_dict["Dunefolk"]["id"] = "Dunefolk";
	sides_dict["Dunefolk"]["name"] = "Dunefolk";
	sides_dict["Dunefolk"]["leader"] = ["DuneExplorer","DuneSwordsman","DuneSpearguard","DuneScorcher","DuneApothecary"];
	sides_dict["Dunefolk"]["recruit"] = ["DuneRover","DuneSoldier","DuneSkirmisher","DuneRider","DuneHerbalist","DuneBurner","NagaDirkfang"];

	sides_dict["KnalganAlliance"] = {};
	sides_dict["KnalganAlliance"]["id"] = "KnalganAlliance";
	sides_dict["KnalganAlliance"]["name"] = "KnalganAlliance";
	sides_dict["KnalganAlliance"]["leader"] = ["DwarvishSteelclad","DwarvishThunderguard","DwarvishStalwart","Rogue","Trapper"];
	sides_dict["KnalganAlliance"]["recruit"] = ["DwarvishGuardsman","DwarvishFighter","DwarvishUlfserker","DwarvishThunderer","Thief","Poacher","Footpad","GryphonRider"];

	sides_dict["Loyalists"] = {};
	sides_dict["Loyalists"]["id"] = "Loyalists";
	sides_dict["Loyalists"]["name"] = "Loyalists";
	sides_dict["Loyalists"]["leader"] = ["Lieutenant","Swordsman","Pikeman","Javelineer","ShockTrooper","Longbowman","WhiteMage","RedMage"];
	sides_dict["Loyalists"]["recruit"] = ["Cavalryman","Horseman","Spearman","Fencer","HeavyInfantryman","Bowman","Mage","MermanFighter"];

	sides_dict["Northerners"] = {};
	sides_dict["Northerners"]["id"] = "Northerners";
	sides_dict["Northerners"]["name"] = "Northerners";
	sides_dict["Northerners"]["leader"] = ["OrcishWarrior","Troll","TrollRocklobber","OrcishCrossbowman","OrcishSlayer"];
	sides_dict["Northerners"]["recruit"] = ["OrcishGrunt","TrollWhelp","WolfRider","OrcishArcher","OrcishAssassin","NagaFighter","GoblinSpearman"];

	sides_dict["Rebels"] = {};
	sides_dict["Rebels"]["id"] = "Rebels";
	sides_dict["Rebels"]["name"] = "Rebels";
	sides_dict["Rebels"]["leader"] = ["ElvishCaptain","ElvishHero","ElvishRanger","ElvishMarksman","ElvishDruid","ElvishSorceress","WhiteMage","RedMage","ElderWose"];
	sides_dict["Rebels"]["recruit"] = ["ElvishFighter","ElvishArcher","Mage","ElvishShaman","ElvishScout","Wose","MermanHunter"];

	sides_dict["Undead"] = {};
	sides_dict["Undead"]["id"] = "Undead";
	sides_dict["Undead"]["name"] = "Undead";
	sides_dict["Undead"]["leader"] = ["DarkSorcerer","Revenant","Deathblade","BoneShooter","Necrophage"];
	sides_dict["Undead"]["recruit"] = ["Skeleton","SkeletonArcher","WalkingCorpse","Ghost","VampireBat","DarkAdept","Ghoul"];

	return sides_dict;
}