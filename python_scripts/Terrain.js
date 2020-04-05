function createTerrainDict() {
	terrain_dict = {};

	terrain_dict["Wog"] = {};
	terrain_dict["Wog"]["symbol_image"] = "water/ocean-grey-tile";
	terrain_dict["Wog"]["editor_group"] = ['water'];

	terrain_dict["Wo"] = {};
	terrain_dict["Wo"]["symbol_image"] = "water/ocean-tile";
	terrain_dict["Wo"]["editor_group"] = ['water'];

	terrain_dict["Wot"] = {};
	terrain_dict["Wot"]["symbol_image"] = "water/ocean-tropical-tile";
	terrain_dict["Wot"]["editor_group"] = ['water'];

	terrain_dict["Wwg"] = {};
	terrain_dict["Wwg"]["symbol_image"] = "water/coast-grey-tile";
	terrain_dict["Wwg"]["editor_group"] = ['water'];

	terrain_dict["Ww"] = {};
	terrain_dict["Ww"]["symbol_image"] = "water/coast-tile";
	terrain_dict["Ww"]["editor_group"] = ['water'];

	terrain_dict["Wwt"] = {};
	terrain_dict["Wwt"]["symbol_image"] = "water/coast-tropical-tile";
	terrain_dict["Wwt"]["editor_group"] = ['water'];

	terrain_dict["Wwf"] = {};
	terrain_dict["Wwf"]["symbol_image"] = "water/ford-tile";
	terrain_dict["Wwf"]["editor_group"] = ['water'];

	terrain_dict["Wwrg"] = {};
	terrain_dict["Wwrg"]["symbol_image"] = "water/reef-gray-tile";
	terrain_dict["Wwrg"]["editor_group"] = ['water'];

	terrain_dict["Wwr"] = {};
	terrain_dict["Wwr"]["symbol_image"] = "water/reef-tile";
	terrain_dict["Wwr"]["editor_group"] = ['water'];

	terrain_dict["Wwrt"] = {};
	terrain_dict["Wwrt"]["symbol_image"] = "water/reef-tropical-tile";
	terrain_dict["Wwrt"]["editor_group"] = ['water'];

	terrain_dict["Ss"] = {};
	terrain_dict["Ss"]["symbol_image"] = "swamp/water-tile";
	terrain_dict["Ss"]["editor_group"] = ['water'];

	terrain_dict["Sm"] = {};
	terrain_dict["Sm"]["symbol_image"] = "swamp/mud-tile";
	terrain_dict["Sm"]["editor_group"] = ['water'];

	terrain_dict["Gg"] = {};
	terrain_dict["Gg"]["symbol_image"] = "grass/green-symbol";
	terrain_dict["Gg"]["editor_group"] = ['flat'];

	terrain_dict["Gs"] = {};
	terrain_dict["Gs"]["symbol_image"] = "grass/semi-dry";
	terrain_dict["Gs"]["editor_group"] = ['flat'];

	terrain_dict["Gd"] = {};
	terrain_dict["Gd"]["symbol_image"] = "grass/dry-symbol";
	terrain_dict["Gd"]["editor_group"] = ['flat'];

	terrain_dict["Gll"] = {};
	terrain_dict["Gll"]["symbol_image"] = "grass/leaf-litter";
	terrain_dict["Gll"]["editor_group"] = ['flat', 'fall'];

	terrain_dict["Rb"] = {};
	terrain_dict["Rb"]["symbol_image"] = "flat/dirt-dark";
	terrain_dict["Rb"]["editor_group"] = ['flat'];

	terrain_dict["Re"] = {};
	terrain_dict["Re"]["symbol_image"] = "flat/dirt";
	terrain_dict["Re"]["editor_group"] = ['flat'];

	terrain_dict["Rd"] = {};
	terrain_dict["Rd"]["symbol_image"] = "flat/desert-road";
	terrain_dict["Rd"]["editor_group"] = ['desert', 'flat'];

	terrain_dict["Rr"] = {};
	terrain_dict["Rr"]["symbol_image"] = "flat/road";
	terrain_dict["Rr"]["editor_group"] = ['flat'];

	terrain_dict["Rrc"] = {};
	terrain_dict["Rrc"]["symbol_image"] = "flat/road-clean";
	terrain_dict["Rrc"]["editor_group"] = ['flat'];

	terrain_dict["Rp"] = {};
	terrain_dict["Rp"]["symbol_image"] = "flat/stone-path";
	terrain_dict["Rp"]["editor_group"] = ['flat'];

	terrain_dict["Ai"] = {};
	terrain_dict["Ai"]["symbol_image"] = "frozen/ice";
	terrain_dict["Ai"]["editor_group"] = ['frozen'];

	terrain_dict["Aa"] = {};
	terrain_dict["Aa"]["symbol_image"] = "frozen/snow";
	terrain_dict["Aa"]["editor_group"] = ['frozen'];

	terrain_dict["Dd"] = {};
	terrain_dict["Dd"]["symbol_image"] = "sand/desert";
	terrain_dict["Dd"]["editor_group"] = ['desert'];

	terrain_dict["Ds"] = {};
	terrain_dict["Ds"]["symbol_image"] = "sand/beach";
	terrain_dict["Ds"]["editor_group"] = ['desert'];

	terrain_dict["^Do"] = {};
	terrain_dict["^Do"]["symbol_image"] = "sand/desert-oasis";
	terrain_dict["^Do"]["default_base"] = "Dd";
	terrain_dict["^Do"]["heals"] = 8;
	terrain_dict["^Do"]["editor_group"] = ['desert'];

	terrain_dict["^Dr"] = {};
	terrain_dict["^Dr"]["symbol_image"] = "misc/rubble-tile";
	terrain_dict["^Dr"]["editor_group"] = ['desert', 'rough'];

	terrain_dict["Dd^Dc"] = {};
	terrain_dict["Dd^Dc"]["symbol_image"] = "sand/crater";
	terrain_dict["Dd^Dc"]["default_base"] = "Dd";
	terrain_dict["Dd^Dc"]["editor_group"] = ['desert'];

	terrain_dict["^Efm"] = {};
	terrain_dict["^Efm"]["symbol_image"] = "embellishments/flowers-mixed";
	terrain_dict["^Efm"]["editor_group"] = ['embellishments'];

	terrain_dict["^Gvs"] = {};
	terrain_dict["^Gvs"]["symbol_image"] = "embellishments/farm-veg-spring-icon";
	terrain_dict["^Gvs"]["editor_group"] = ['embellishments'];

	terrain_dict["^Es"] = {};
	terrain_dict["^Es"]["symbol_image"] = "embellishments/stones-small7";
	terrain_dict["^Es"]["editor_group"] = ['embellishments'];

	terrain_dict["^Esa"] = {};
	terrain_dict["^Esa"]["symbol_image"] = "embellishments/snowbits-small4";
	terrain_dict["^Esa"]["editor_group"] = ['embellishments'];

	terrain_dict["^Em"] = {};
	terrain_dict["^Em"]["symbol_image"] = "embellishments/mushroom";
	terrain_dict["^Em"]["editor_group"] = ['embellishments'];

	terrain_dict["^Emf"] = {};
	terrain_dict["^Emf"]["symbol_image"] = "embellishments/mushroom-farm-small";
	terrain_dict["^Emf"]["editor_group"] = ['embellishments', 'cave'];

	terrain_dict["^Edp"] = {};
	terrain_dict["^Edp"]["symbol_image"] = "embellishments/desert-plant5";
	terrain_dict["^Edp"]["editor_group"] = ['embellishments', 'desert'];

	terrain_dict["^Edpp"] = {};
	terrain_dict["^Edpp"]["symbol_image"] = "embellishments/desert-plant";
	terrain_dict["^Edpp"]["editor_group"] = ['embellishments', 'desert'];

	terrain_dict["^Wm"] = {};
	terrain_dict["^Wm"]["symbol_image"] = "misc/windmill-embellishment-tile";
	terrain_dict["^Wm"]["editor_group"] = ['embellishments'];

	terrain_dict["^Ecf"] = {};
	terrain_dict["^Ecf"]["symbol_image"] = "misc/fire-A01";
	terrain_dict["^Ecf"]["editor_group"] = ['embellishments'];

	terrain_dict["^Efs"] = {};
	terrain_dict["^Efs"]["symbol_image"] = "walls/stone/flames/flames-tile";
	terrain_dict["^Efs"]["editor_group"] = ['embellishments'];

	terrain_dict["^Eb"] = {};
	terrain_dict["^Eb"]["symbol_image"] = "misc/brazier-embellishment";
	terrain_dict["^Eb"]["editor_group"] = ['embellishments'];

	terrain_dict["^Ebn"] = {};
	terrain_dict["^Ebn"]["symbol_image"] = "misc/brazier-A01";
	terrain_dict["^Ebn"]["editor_group"] = ['embellishments'];

	terrain_dict["^Eff"] = {};
	terrain_dict["^Eff"]["symbol_image"] = "embellishments/fence-se-nw-01";
	terrain_dict["^Eff"]["editor_group"] = ['embellishments'];

	terrain_dict["^Esd"] = {};
	terrain_dict["^Esd"]["symbol_image"] = "embellishments/rocks";
	terrain_dict["^Esd"]["editor_group"] = ['embellishments', 'desert'];

	terrain_dict["^Ewl"] = {};
	terrain_dict["^Ewl"]["symbol_image"] = "embellishments/water-lilies-tile";
	terrain_dict["^Ewl"]["default_base"] = "Ww";
	terrain_dict["^Ewl"]["editor_group"] = ['water', 'embellishments'];

	terrain_dict["^Ewf"] = {};
	terrain_dict["^Ewf"]["symbol_image"] = "embellishments/water-lilies-flower-tile";
	terrain_dict["^Ewf"]["default_base"] = "Ww";
	terrain_dict["^Ewf"]["editor_group"] = ['water', 'embellishments'];

	terrain_dict["^Edt"] = {};
	terrain_dict["^Edt"]["symbol_image"] = "misc/detritus/trashC-1";
	terrain_dict["^Edt"]["editor_group"] = ['embellishments'];

	terrain_dict["^Edb"] = {};
	terrain_dict["^Edb"]["symbol_image"] = "misc/detritus/detritusC-1";
	terrain_dict["^Edb"]["editor_group"] = ['embellishments'];

	terrain_dict["^Fet"] = {};
	terrain_dict["^Fet"]["symbol_image"] = "forest/great-tree-tile";
	terrain_dict["^Fet"]["default_base"] = "Gg";
	terrain_dict["^Fet"]["editor_group"] = ['forest'];

	terrain_dict["^Fetd"] = {};
	terrain_dict["^Fetd"]["symbol_image"] = "forest/great-tree-dead-tile";
	terrain_dict["^Fetd"]["default_base"] = "Gd";
	terrain_dict["^Fetd"]["editor_group"] = ['forest'];

	terrain_dict["^Ft"] = {};
	terrain_dict["^Ft"]["symbol_image"] = "forest/tropical/jungle-tile";
	terrain_dict["^Ft"]["default_base"] = "Gs";
	terrain_dict["^Ft"]["editor_group"] = ['forest'];

	terrain_dict["^Ftr"] = {};
	terrain_dict["^Ftr"]["symbol_image"] = "forest/tropical/rainforest-tile";
	terrain_dict["^Ftr"]["default_base"] = "Gll";
	terrain_dict["^Ftr"]["editor_group"] = ['forest'];

	terrain_dict["^Ftd"] = {};
	terrain_dict["^Ftd"]["symbol_image"] = "forest/tropical/palm-desert-tile";
	terrain_dict["^Ftd"]["default_base"] = "Dd";
	terrain_dict["^Ftd"]["editor_group"] = ['forest', 'desert'];

	terrain_dict["^Ftp"] = {};
	terrain_dict["^Ftp"]["symbol_image"] = "forest/tropical/palms-tile";
	terrain_dict["^Ftp"]["default_base"] = "Gs";
	terrain_dict["^Ftp"]["editor_group"] = ['forest'];

	terrain_dict["^Fts"] = {};
	terrain_dict["^Fts"]["symbol_image"] = "forest/tropical/savanna-tile";
	terrain_dict["^Fts"]["default_base"] = "Gd";
	terrain_dict["^Fts"]["editor_group"] = ['forest', 'desert'];

	terrain_dict["^Fp"] = {};
	terrain_dict["^Fp"]["symbol_image"] = "forest/pine-tile";
	terrain_dict["^Fp"]["default_base"] = "Gll";
	terrain_dict["^Fp"]["editor_group"] = ['forest'];

	terrain_dict["^Fpa"] = {};
	terrain_dict["^Fpa"]["symbol_image"] = "forest/snow-forest-tile";
	terrain_dict["^Fpa"]["default_base"] = "Aa";
	terrain_dict["^Fpa"]["editor_group"] = ['frozen', 'forest'];

	terrain_dict["^Fds"] = {};
	terrain_dict["^Fds"]["symbol_image"] = "forest/deciduous-summer-tile";
	terrain_dict["^Fds"]["default_base"] = "Gs";
	terrain_dict["^Fds"]["editor_group"] = ['forest'];

	terrain_dict["^Fdf"] = {};
	terrain_dict["^Fdf"]["symbol_image"] = "forest/deciduous-fall-tile";
	terrain_dict["^Fdf"]["default_base"] = "Gll";
	terrain_dict["^Fdf"]["editor_group"] = ['forest', 'fall'];

	terrain_dict["^Fdw"] = {};
	terrain_dict["^Fdw"]["symbol_image"] = "forest/deciduous-winter-tile";
	terrain_dict["^Fdw"]["default_base"] = "Gll";
	terrain_dict["^Fdw"]["editor_group"] = ['forest', 'fall'];

	terrain_dict["^Fda"] = {};
	terrain_dict["^Fda"]["symbol_image"] = "forest/deciduous-winter-snow-tile";
	terrain_dict["^Fda"]["default_base"] = "Aa";
	terrain_dict["^Fda"]["editor_group"] = ['frozen', 'forest'];

	terrain_dict["^Fms"] = {};
	terrain_dict["^Fms"]["symbol_image"] = "forest/mixed-summer-tile";
	terrain_dict["^Fms"]["default_base"] = "Gs";
	terrain_dict["^Fms"]["editor_group"] = ['forest'];

	terrain_dict["^Fmf"] = {};
	terrain_dict["^Fmf"]["symbol_image"] = "forest/mixed-fall-tile";
	terrain_dict["^Fmf"]["default_base"] = "Gll";
	terrain_dict["^Fmf"]["editor_group"] = ['forest', 'fall'];

	terrain_dict["^Fmw"] = {};
	terrain_dict["^Fmw"]["symbol_image"] = "forest/mixed-winter-tile";
	terrain_dict["^Fmw"]["default_base"] = "Gll";
	terrain_dict["^Fmw"]["editor_group"] = ['forest', 'fall'];

	terrain_dict["^Fma"] = {};
	terrain_dict["^Fma"]["symbol_image"] = "forest/mixed-winter-snow-tile";
	terrain_dict["^Fma"]["default_base"] = "Aa";
	terrain_dict["^Fma"]["editor_group"] = ['frozen', 'forest'];

	terrain_dict["Hh"] = {};
	terrain_dict["Hh"]["symbol_image"] = "hills/regular";
	terrain_dict["Hh"]["editor_group"] = ['rough'];

	terrain_dict["Hhd"] = {};
	terrain_dict["Hhd"]["symbol_image"] = "hills/dry";
	terrain_dict["Hhd"]["editor_group"] = ['fall', 'rough'];

	terrain_dict["Hd"] = {};
	terrain_dict["Hd"]["symbol_image"] = "hills/desert";
	terrain_dict["Hd"]["editor_group"] = ['desert', 'rough'];

	terrain_dict["Ha"] = {};
	terrain_dict["Ha"]["symbol_image"] = "hills/snow";
	terrain_dict["Ha"]["editor_group"] = ['frozen', 'rough'];

	terrain_dict["Mm"] = {};
	terrain_dict["Mm"]["symbol_image"] = "mountains/basic-tile";
	terrain_dict["Mm"]["editor_group"] = ['rough'];

	terrain_dict["Md"] = {};
	terrain_dict["Md"]["symbol_image"] = "mountains/dry-tile";
	terrain_dict["Md"]["editor_group"] = ['rough', 'desert'];

	terrain_dict["Ms"] = {};
	terrain_dict["Ms"]["symbol_image"] = "mountains/snow-tile";
	terrain_dict["Ms"]["editor_group"] = ['rough', 'frozen'];

	terrain_dict["Mdd"] = {};
	terrain_dict["Mdd"]["symbol_image"] = "desert_mountains/desert-tile";
	terrain_dict["Mdd"]["editor_group"] = ['rough', 'desert'];

	terrain_dict["Irs"] = {};
	terrain_dict["Irs"]["symbol_image"] = "interior/stone-regular";
	terrain_dict["Irs"]["editor_group"] = ['flat'];

	terrain_dict["Icr"] = {};
	terrain_dict["Icr"]["symbol_image"] = "interior/royal-rug/rug-tile";
	terrain_dict["Icr"]["editor_group"] = ['flat'];

	terrain_dict["Icn"] = {};
	terrain_dict["Icn"]["symbol_image"] = "interior/regular-rug/rug-tile";
	terrain_dict["Icn"]["editor_group"] = ['flat'];

	terrain_dict["Urc"] = {};
	terrain_dict["Urc"]["symbol_image"] = "interior/cave-rug/rug-tile";
	terrain_dict["Urc"]["editor_group"] = ['cave', 'flat'];

	terrain_dict["Iwr"] = {};
	terrain_dict["Iwr"]["symbol_image"] = "interior/wood-regular";
	terrain_dict["Iwr"]["editor_group"] = ['flat'];

	terrain_dict["Ior"] = {};
	terrain_dict["Ior"]["symbol_image"] = "interior/wood-ruined";
	terrain_dict["Ior"]["editor_group"] = ['flat'];

	terrain_dict["^Ii"] = {};
	terrain_dict["^Ii"]["symbol_image"] = "cave/beam-tile";
	terrain_dict["^Ii"]["editor_group"] = ['cave'];

	terrain_dict["Uu"] = {};
	terrain_dict["Uu"]["symbol_image"] = "cave/floor6";
	terrain_dict["Uu"]["editor_group"] = ['cave'];

	terrain_dict["Uue"] = {};
	terrain_dict["Uue"]["symbol_image"] = "cave/earthy-floor3";
	terrain_dict["Uue"]["editor_group"] = ['cave'];

	terrain_dict["Urb"] = {};
	terrain_dict["Urb"]["symbol_image"] = "cave/flagstones-dark";
	terrain_dict["Urb"]["editor_group"] = ['cave', 'flat'];

	terrain_dict["Ur"] = {};
	terrain_dict["Ur"]["symbol_image"] = "cave/path";
	terrain_dict["Ur"]["editor_group"] = ['cave', 'flat'];

	terrain_dict["^Uf"] = {};
	terrain_dict["^Uf"]["symbol_image"] = "forest/mushrooms-tile";
	terrain_dict["^Uf"]["default_base"] = "Uu";
	terrain_dict["^Uf"]["editor_group"] = ['cave', 'forest'];

	terrain_dict["^Ufi"] = {};
	terrain_dict["^Ufi"]["symbol_image"] = "forest/mushrooms-beam-tile";
	terrain_dict["^Ufi"]["default_base"] = "Uu";
	terrain_dict["^Ufi"]["editor_group"] = ['cave'];

	terrain_dict["^Tf"] = {};
	terrain_dict["^Tf"]["symbol_image"] = "forest/mushrooms-tile";
	terrain_dict["^Tf"]["default_base"] = "Tb";
	terrain_dict["^Tf"]["editor_group"] = ['cave', 'forest'];

	terrain_dict["^Tfi"] = {};
	terrain_dict["^Tfi"]["symbol_image"] = "forest/mushrooms-beam-tile";
	terrain_dict["^Tfi"]["default_base"] = "Tb";
	terrain_dict["^Tfi"]["editor_group"] = ['cave'];

	terrain_dict["Tb"] = {};
	terrain_dict["Tb"]["symbol_image"] = "forest/mushroom-base";
	terrain_dict["Tb"]["editor_group"] = ['cave'];

	terrain_dict["Uh"] = {};
	terrain_dict["Uh"]["symbol_image"] = "cave/hills-variation";
	terrain_dict["Uh"]["editor_group"] = ['cave', 'rough'];

	terrain_dict["^Br|"] = {};
	terrain_dict["^Br|"]["symbol_image"] = "misc/rails-n-s";
	terrain_dict["^Br|"]["editor_group"] = ['cave'];

	terrain_dict["^Br/"] = {};
	terrain_dict["^Br/"]["symbol_image"] = "misc/rails-ne-sw";
	terrain_dict["^Br/"]["editor_group"] = ['cave'];

	terrain_dict["^Br\\"] = {};
	terrain_dict["^Br\\"]["symbol_image"] = "misc/rails-se-nw";
	terrain_dict["^Br\\"]["editor_group"] = ['cave'];

	terrain_dict["Qxu"] = {};
	terrain_dict["Qxu"]["symbol_image"] = "chasm/depths";
	terrain_dict["Qxu"]["editor_group"] = ['cave', 'obstacle'];

	terrain_dict["Qxe"] = {};
	terrain_dict["Qxe"]["symbol_image"] = "chasm/depths";
	terrain_dict["Qxe"]["editor_group"] = ['cave', 'obstacle'];

	terrain_dict["Qxua"] = {};
	terrain_dict["Qxua"]["symbol_image"] = "chasm/abyss";
	terrain_dict["Qxua"]["editor_group"] = ['cave', 'obstacle'];

	terrain_dict["Ql"] = {};
	terrain_dict["Ql"]["symbol_image"] = "unwalkable/lava-tile";
	terrain_dict["Ql"]["editor_group"] = ['cave', 'obstacle'];

	terrain_dict["Qlf"] = {};
	terrain_dict["Qlf"]["symbol_image"] = "unwalkable/lava-tile";
	terrain_dict["Qlf"]["editor_group"] = ['cave', 'obstacle'];

	terrain_dict["Mv"] = {};
	terrain_dict["Mv"]["symbol_image"] = "mountains/volcano-tile";
	terrain_dict["Mv"]["editor_group"] = ['rough', 'obstacle'];

	terrain_dict["Mm^Xm"] = {};
	terrain_dict["Mm^Xm"]["symbol_image"] = "mountains/cloud-tile";
	terrain_dict["Mm^Xm"]["editor_group"] = ['rough', 'obstacle'];

	terrain_dict["Md^Xm"] = {};
	terrain_dict["Md^Xm"]["symbol_image"] = "mountains/cloud-desert-tile";
	terrain_dict["Md^Xm"]["editor_group"] = ['rough', 'obstacle', 'desert'];

	terrain_dict["Ms^Xm"] = {};
	terrain_dict["Ms^Xm"]["symbol_image"] = "mountains/cloud-snow-tile";
	terrain_dict["Ms^Xm"]["editor_group"] = ['rough', 'obstacle', 'frozen'];

	terrain_dict["Mdd^Xm"] = {};
	terrain_dict["Mdd^Xm"]["symbol_image"] = "desert_mountains/cloud-desert-tile";
	terrain_dict["Mdd^Xm"]["editor_group"] = ['rough', 'obstacle', 'desert'];

	terrain_dict["Xu"] = {};
	terrain_dict["Xu"]["symbol_image"] = "void/void";
	terrain_dict["Xu"]["editor_group"] = ['cave', 'obstacle'];

	terrain_dict["Xuc"] = {};
	terrain_dict["Xuc"]["symbol_image"] = "void/void";
	terrain_dict["Xuc"]["editor_group"] = ['cave', 'obstacle'];

	terrain_dict["Xue"] = {};
	terrain_dict["Xue"]["symbol_image"] = "void/void";
	terrain_dict["Xue"]["editor_group"] = ['cave', 'obstacle'];

	terrain_dict["Xuce"] = {};
	terrain_dict["Xuce"]["symbol_image"] = "void/void";
	terrain_dict["Xuce"]["editor_group"] = ['cave', 'obstacle'];

	terrain_dict["Xos"] = {};
	terrain_dict["Xos"]["symbol_image"] = "void/void";
	terrain_dict["Xos"]["editor_group"] = ['cave', 'obstacle'];

	terrain_dict["Xol"] = {};
	terrain_dict["Xol"]["symbol_image"] = "void/void";
	terrain_dict["Xol"]["editor_group"] = ['cave', 'obstacle'];

	terrain_dict["Xom"] = {};
	terrain_dict["Xom"]["symbol_image"] = "void/void";
	terrain_dict["Xom"]["editor_group"] = ['cave', 'obstacle'];

	terrain_dict["Xoi"] = {};
	terrain_dict["Xoi"]["symbol_image"] = "void/void";
	terrain_dict["Xoi"]["editor_group"] = ['cave', 'obstacle'];

	terrain_dict["Xoc"] = {};
	terrain_dict["Xoc"]["symbol_image"] = "void/void";
	terrain_dict["Xoc"]["editor_group"] = ['cave', 'obstacle'];

	terrain_dict["Xot"] = {};
	terrain_dict["Xot"]["symbol_image"] = "void/void";
	terrain_dict["Xot"]["editor_group"] = ['cave', 'obstacle'];

	terrain_dict["^Pr\\"] = {};
	terrain_dict["^Pr\\"]["symbol_image"] = "void/void";
	terrain_dict["^Pr\\"]["default_base"] = "Rr";
	terrain_dict["^Pr\\"]["editor_group"] = ['embellishments', 'obstacle'];

	terrain_dict["^Pr/"] = {};
	terrain_dict["^Pr/"]["symbol_image"] = "void/void";
	terrain_dict["^Pr/"]["default_base"] = "Rr";
	terrain_dict["^Pr/"]["editor_group"] = ['embellishments', 'obstacle'];

	terrain_dict["^Pr|"] = {};
	terrain_dict["^Pr|"]["symbol_image"] = "void/void";
	terrain_dict["^Pr|"]["default_base"] = "Rr";
	terrain_dict["^Pr|"]["editor_group"] = ['embellishments', 'obstacle'];

	terrain_dict["^Pw\\"] = {};
	terrain_dict["^Pw\\"]["symbol_image"] = "void/void";
	terrain_dict["^Pw\\"]["default_base"] = "Rr";
	terrain_dict["^Pw\\"]["editor_group"] = ['embellishments', 'obstacle'];

	terrain_dict["^Pw/"] = {};
	terrain_dict["^Pw/"]["symbol_image"] = "void/void";
	terrain_dict["^Pw/"]["default_base"] = "Rr";
	terrain_dict["^Pw/"]["editor_group"] = ['embellishments', 'obstacle'];

	terrain_dict["^Pw|"] = {};
	terrain_dict["^Pw|"]["symbol_image"] = "void/void";
	terrain_dict["^Pw|"]["default_base"] = "Rr";
	terrain_dict["^Pw|"]["editor_group"] = ['embellishments', 'obstacle'];

	terrain_dict["^Pr\\o"] = {};
	terrain_dict["^Pr\\o"]["symbol_image"] = "void/void";
	terrain_dict["^Pr\\o"]["default_base"] = "Rr";
	terrain_dict["^Pr\\o"]["editor_group"] = ['embellishments', 'obstacle'];

	terrain_dict["^Pr/o"] = {};
	terrain_dict["^Pr/o"]["symbol_image"] = "void/void";
	terrain_dict["^Pr/o"]["default_base"] = "Rr";
	terrain_dict["^Pr/o"]["editor_group"] = ['embellishments', 'obstacle'];

	terrain_dict["^Pr|o"] = {};
	terrain_dict["^Pr|o"]["symbol_image"] = "void/void";
	terrain_dict["^Pr|o"]["default_base"] = "Rr";
	terrain_dict["^Pr|o"]["editor_group"] = ['embellishments', 'obstacle'];

	terrain_dict["^Pw\\o"] = {};
	terrain_dict["^Pw\\o"]["symbol_image"] = "void/void";
	terrain_dict["^Pw\\o"]["default_base"] = "Rr";
	terrain_dict["^Pw\\o"]["editor_group"] = ['embellishments', 'obstacle'];

	terrain_dict["^Pw/o"] = {};
	terrain_dict["^Pw/o"]["symbol_image"] = "void/void";
	terrain_dict["^Pw/o"]["default_base"] = "Rr";
	terrain_dict["^Pw/o"]["editor_group"] = ['embellishments', 'obstacle'];

	terrain_dict["^Pw|o"] = {};
	terrain_dict["^Pw|o"]["symbol_image"] = "void/void";
	terrain_dict["^Pw|o"]["default_base"] = "Rr";
	terrain_dict["^Pw|o"]["editor_group"] = ['embellishments', 'obstacle'];

	terrain_dict["^Xo"] = {};
	terrain_dict["^Xo"]["editor_group"] = ['obstacle', 'special'];

	terrain_dict["^Qov"] = {};
	terrain_dict["^Qov"]["editor_group"] = ['obstacle', 'special'];

	terrain_dict["Xv"] = {};
	terrain_dict["Xv"]["symbol_image"] = "void/void";
	terrain_dict["Xv"]["editor_group"] = ['obstacle', 'special'];

	terrain_dict["^Vda"] = {};
	terrain_dict["^Vda"]["symbol_image"] = "village/desert-tile";
	terrain_dict["^Vda"]["default_base"] = "Dd";
	terrain_dict["^Vda"]["heals"] = 8;
	terrain_dict["^Vda"]["gives_income"] = true;
	terrain_dict["^Vda"]["editor_group"] = ['village', 'desert'];

	terrain_dict["^Vdr"] = {};
	terrain_dict["^Vdr"]["symbol_image"] = "village/desert-ruin-tile";
	terrain_dict["^Vdr"]["default_base"] = "Dd";
	terrain_dict["^Vdr"]["heals"] = 8;
	terrain_dict["^Vdr"]["gives_income"] = true;
	terrain_dict["^Vdr"]["editor_group"] = ['village', 'desert'];

	terrain_dict["^Vdt"] = {};
	terrain_dict["^Vdt"]["symbol_image"] = "village/desert-camp-tile";
	terrain_dict["^Vdt"]["default_base"] = "Dd";
	terrain_dict["^Vdt"]["heals"] = 8;
	terrain_dict["^Vdt"]["gives_income"] = true;
	terrain_dict["^Vdt"]["editor_group"] = ['village', 'desert'];

	terrain_dict["^Vct"] = {};
	terrain_dict["^Vct"]["symbol_image"] = "village/camp-tile";
	terrain_dict["^Vct"]["default_base"] = "Re";
	terrain_dict["^Vct"]["heals"] = 8;
	terrain_dict["^Vct"]["gives_income"] = true;
	terrain_dict["^Vct"]["editor_group"] = ['village'];

	terrain_dict["^Vo"] = {};
	terrain_dict["^Vo"]["symbol_image"] = "village/orc-tile";
	terrain_dict["^Vo"]["default_base"] = "Gd";
	terrain_dict["^Vo"]["heals"] = 8;
	terrain_dict["^Vo"]["gives_income"] = true;
	terrain_dict["^Vo"]["editor_group"] = ['village'];

	terrain_dict["^Voa"] = {};
	terrain_dict["^Voa"]["symbol_image"] = "village/orc-snow-tile";
	terrain_dict["^Voa"]["default_base"] = "Aa";
	terrain_dict["^Voa"]["heals"] = 8;
	terrain_dict["^Voa"]["gives_income"] = true;
	terrain_dict["^Voa"]["editor_group"] = ['village', 'frozen'];

	terrain_dict["^Vea"] = {};
	terrain_dict["^Vea"]["symbol_image"] = "village/elven-snow-tile";
	terrain_dict["^Vea"]["default_base"] = "Aa";
	terrain_dict["^Vea"]["heals"] = 8;
	terrain_dict["^Vea"]["gives_income"] = true;
	terrain_dict["^Vea"]["editor_group"] = ['village', 'frozen'];

	terrain_dict["^Ve"] = {};
	terrain_dict["^Ve"]["symbol_image"] = "village/elven-tile";
	terrain_dict["^Ve"]["default_base"] = "Gg";
	terrain_dict["^Ve"]["heals"] = 8;
	terrain_dict["^Ve"]["gives_income"] = true;
	terrain_dict["^Ve"]["editor_group"] = ['village'];

	terrain_dict["^Vh"] = {};
	terrain_dict["^Vh"]["symbol_image"] = "village/human-tile";
	terrain_dict["^Vh"]["default_base"] = "Gs";
	terrain_dict["^Vh"]["heals"] = 8;
	terrain_dict["^Vh"]["gives_income"] = true;
	terrain_dict["^Vh"]["editor_group"] = ['village'];

	terrain_dict["^Vha"] = {};
	terrain_dict["^Vha"]["symbol_image"] = "village/snow-tile";
	terrain_dict["^Vha"]["default_base"] = "Aa";
	terrain_dict["^Vha"]["heals"] = 8;
	terrain_dict["^Vha"]["gives_income"] = true;
	terrain_dict["^Vha"]["editor_group"] = ['village', 'frozen'];

	terrain_dict["^Vhr"] = {};
	terrain_dict["^Vhr"]["symbol_image"] = "village/human-cottage-ruin-tile";
	terrain_dict["^Vhr"]["default_base"] = "Gd";
	terrain_dict["^Vhr"]["heals"] = 8;
	terrain_dict["^Vhr"]["gives_income"] = true;
	terrain_dict["^Vhr"]["editor_group"] = ['village'];

	terrain_dict["^Vhc"] = {};
	terrain_dict["^Vhc"]["symbol_image"] = "village/human-city-tile";
	terrain_dict["^Vhc"]["default_base"] = "Rr";
	terrain_dict["^Vhc"]["heals"] = 8;
	terrain_dict["^Vhc"]["gives_income"] = true;
	terrain_dict["^Vhc"]["editor_group"] = ['village'];

	terrain_dict["^Vwm"] = {};
	terrain_dict["^Vwm"]["symbol_image"] = "misc/windmill-tile";
	terrain_dict["^Vwm"]["default_base"] = "Gg";
	terrain_dict["^Vwm"]["heals"] = 8;
	terrain_dict["^Vwm"]["gives_income"] = true;
	terrain_dict["^Vwm"]["editor_group"] = ['village'];

	terrain_dict["^Vhca"] = {};
	terrain_dict["^Vhca"]["symbol_image"] = "village/human-city-snow-tile";
	terrain_dict["^Vhca"]["default_base"] = "Rrc";
	terrain_dict["^Vhca"]["heals"] = 8;
	terrain_dict["^Vhca"]["gives_income"] = true;
	terrain_dict["^Vhca"]["editor_group"] = ['village', 'frozen'];

	terrain_dict["^Vhcr"] = {};
	terrain_dict["^Vhcr"]["symbol_image"] = "village/human-city-ruin-tile";
	terrain_dict["^Vhcr"]["default_base"] = "Rp";
	terrain_dict["^Vhcr"]["heals"] = 8;
	terrain_dict["^Vhcr"]["gives_income"] = true;
	terrain_dict["^Vhcr"]["editor_group"] = ['village'];

	terrain_dict["^Vhh"] = {};
	terrain_dict["^Vhh"]["symbol_image"] = "village/human-hills-tile";
	terrain_dict["^Vhh"]["default_base"] = "Hh";
	terrain_dict["^Vhh"]["heals"] = 8;
	terrain_dict["^Vhh"]["gives_income"] = true;
	terrain_dict["^Vhh"]["editor_group"] = ['village', 'rough'];

	terrain_dict["^Vhha"] = {};
	terrain_dict["^Vhha"]["symbol_image"] = "village/human-snow-hills-tile";
	terrain_dict["^Vhha"]["default_base"] = "Ha";
	terrain_dict["^Vhha"]["heals"] = 8;
	terrain_dict["^Vhha"]["gives_income"] = true;
	terrain_dict["^Vhha"]["editor_group"] = ['village', 'frozen', 'rough'];

	terrain_dict["^Vhhr"] = {};
	terrain_dict["^Vhhr"]["symbol_image"] = "village/human-hills-ruin-tile";
	terrain_dict["^Vhhr"]["default_base"] = "Hhd";
	terrain_dict["^Vhhr"]["heals"] = 8;
	terrain_dict["^Vhhr"]["gives_income"] = true;
	terrain_dict["^Vhhr"]["editor_group"] = ['village', 'rough'];

	terrain_dict["^Vht"] = {};
	terrain_dict["^Vht"]["symbol_image"] = "village/tropical-tile";
	terrain_dict["^Vht"]["default_base"] = "Gs";
	terrain_dict["^Vht"]["heals"] = 8;
	terrain_dict["^Vht"]["gives_income"] = true;
	terrain_dict["^Vht"]["editor_group"] = ['village'];

	terrain_dict["^Vd"] = {};
	terrain_dict["^Vd"]["symbol_image"] = "village/drake-tile";
	terrain_dict["^Vd"]["default_base"] = "Rr";
	terrain_dict["^Vd"]["heals"] = 8;
	terrain_dict["^Vd"]["gives_income"] = true;
	terrain_dict["^Vd"]["editor_group"] = ['village'];

	terrain_dict["^Vu"] = {};
	terrain_dict["^Vu"]["symbol_image"] = "village/cave-tile";
	terrain_dict["^Vu"]["default_base"] = "Uu";
	terrain_dict["^Vu"]["heals"] = 8;
	terrain_dict["^Vu"]["gives_income"] = true;
	terrain_dict["^Vu"]["editor_group"] = ['village', 'cave'];

	terrain_dict["^Vud"] = {};
	terrain_dict["^Vud"]["symbol_image"] = "village/dwarven-tile";
	terrain_dict["^Vud"]["default_base"] = "Uu";
	terrain_dict["^Vud"]["heals"] = 8;
	terrain_dict["^Vud"]["gives_income"] = true;
	terrain_dict["^Vud"]["editor_group"] = ['village', 'cave'];

	terrain_dict["^Vc"] = {};
	terrain_dict["^Vc"]["symbol_image"] = "village/hut-tile";
	terrain_dict["^Vc"]["default_base"] = "Gs";
	terrain_dict["^Vc"]["heals"] = 8;
	terrain_dict["^Vc"]["gives_income"] = true;
	terrain_dict["^Vc"]["editor_group"] = ['village'];

	terrain_dict["^Vca"] = {};
	terrain_dict["^Vca"]["symbol_image"] = "village/hut-snow-tile";
	terrain_dict["^Vca"]["default_base"] = "Aa";
	terrain_dict["^Vca"]["heals"] = 8;
	terrain_dict["^Vca"]["gives_income"] = true;
	terrain_dict["^Vca"]["editor_group"] = ['village', 'frozen'];

	terrain_dict["^Vl"] = {};
	terrain_dict["^Vl"]["symbol_image"] = "village/log-cabin-tile";
	terrain_dict["^Vl"]["default_base"] = "Gs";
	terrain_dict["^Vl"]["heals"] = 8;
	terrain_dict["^Vl"]["gives_income"] = true;
	terrain_dict["^Vl"]["editor_group"] = ['village'];

	terrain_dict["^Vla"] = {};
	terrain_dict["^Vla"]["symbol_image"] = "village/log-cabin-snow-tile";
	terrain_dict["^Vla"]["default_base"] = "Aa";
	terrain_dict["^Vla"]["heals"] = 8;
	terrain_dict["^Vla"]["gives_income"] = true;
	terrain_dict["^Vla"]["editor_group"] = ['village', 'frozen'];

	terrain_dict["^Vaa"] = {};
	terrain_dict["^Vaa"]["symbol_image"] = "village/igloo-tile";
	terrain_dict["^Vaa"]["default_base"] = "Aa";
	terrain_dict["^Vaa"]["heals"] = 8;
	terrain_dict["^Vaa"]["gives_income"] = true;
	terrain_dict["^Vaa"]["editor_group"] = ['village', 'frozen'];

	terrain_dict["^Vhs"] = {};
	terrain_dict["^Vhs"]["symbol_image"] = "village/swampwater-tile";
	terrain_dict["^Vhs"]["default_base"] = "Ss";
	terrain_dict["^Vhs"]["heals"] = 8;
	terrain_dict["^Vhs"]["gives_income"] = true;
	terrain_dict["^Vhs"]["editor_group"] = ['water', 'village'];

	terrain_dict["^Vm"] = {};
	terrain_dict["^Vm"]["symbol_image"] = "village/coast-tile";
	terrain_dict["^Vm"]["default_base"] = "Ww";
	terrain_dict["^Vm"]["heals"] = 8;
	terrain_dict["^Vm"]["gives_income"] = true;
	terrain_dict["^Vm"]["editor_group"] = ['water', 'village'];

	terrain_dict["^Vov"] = {};
	terrain_dict["^Vov"]["symbol_image"] = "fog/fog1";
	terrain_dict["^Vov"]["heals"] = 8;
	terrain_dict["^Vov"]["gives_income"] = true;
	terrain_dict["^Vov"]["editor_group"] = ['village', 'special'];

	terrain_dict["Ce"] = {};
	terrain_dict["Ce"]["symbol_image"] = "castle/encampment/regular-tile";
	terrain_dict["Ce"]["recruit_onto"] = true;
	terrain_dict["Ce"]["editor_group"] = ['castle'];

	terrain_dict["Cer"] = {};
	terrain_dict["Cer"]["symbol_image"] = "castle/encampment-ruin/regular-tile";
	terrain_dict["Cer"]["recruit_onto"] = true;
	terrain_dict["Cer"]["editor_group"] = ['castle'];

	terrain_dict["Cea"] = {};
	terrain_dict["Cea"]["symbol_image"] = "castle/encampment/snow-tile";
	terrain_dict["Cea"]["recruit_onto"] = true;
	terrain_dict["Cea"]["editor_group"] = ['castle', 'frozen'];

	terrain_dict["Co"] = {};
	terrain_dict["Co"]["symbol_image"] = "castle/orcish/tile";
	terrain_dict["Co"]["recruit_onto"] = true;
	terrain_dict["Co"]["editor_group"] = ['castle'];

	terrain_dict["Coa"] = {};
	terrain_dict["Coa"]["symbol_image"] = "castle/winter-orcish/tile";
	terrain_dict["Coa"]["recruit_onto"] = true;
	terrain_dict["Coa"]["editor_group"] = ['castle', 'frozen'];

	terrain_dict["Ch"] = {};
	terrain_dict["Ch"]["symbol_image"] = "castle/castle-tile";
	terrain_dict["Ch"]["recruit_onto"] = true;
	terrain_dict["Ch"]["editor_group"] = ['castle'];

	terrain_dict["Cha"] = {};
	terrain_dict["Cha"]["symbol_image"] = "castle/snowy/castle-tile";
	terrain_dict["Cha"]["recruit_onto"] = true;
	terrain_dict["Cha"]["editor_group"] = ['castle', 'frozen'];

	terrain_dict["Cv"] = {};
	terrain_dict["Cv"]["symbol_image"] = "castle/elven/tile";
	terrain_dict["Cv"]["recruit_onto"] = true;
	terrain_dict["Cv"]["editor_group"] = ['castle'];

	terrain_dict["Cvr"] = {};
	terrain_dict["Cvr"]["symbol_image"] = "castle/elven-ruin/tile";
	terrain_dict["Cvr"]["recruit_onto"] = true;
	terrain_dict["Cvr"]["editor_group"] = ['castle'];

	terrain_dict["Cva"] = {};
	terrain_dict["Cva"]["symbol_image"] = "castle/winter-elven/tile";
	terrain_dict["Cva"]["recruit_onto"] = true;
	terrain_dict["Cva"]["editor_group"] = ['castle'];

	terrain_dict["Cud"] = {};
	terrain_dict["Cud"]["symbol_image"] = "castle/dwarven-castle-tile";
	terrain_dict["Cud"]["recruit_onto"] = true;
	terrain_dict["Cud"]["editor_group"] = ['castle', 'cave'];

	terrain_dict["Cf"] = {};
	terrain_dict["Cf"]["symbol_image"] = "castle/outside-dwarven/dwarven-castle-tile";
	terrain_dict["Cf"]["recruit_onto"] = true;
	terrain_dict["Cf"]["editor_group"] = ['castle'];

	terrain_dict["Cfr"] = {};
	terrain_dict["Cfr"]["symbol_image"] = "castle/ruin-dwarven/dwarven-castle-tile";
	terrain_dict["Cfr"]["recruit_onto"] = true;
	terrain_dict["Cfr"]["editor_group"] = ['castle'];

	terrain_dict["Cfa"] = {};
	terrain_dict["Cfa"]["symbol_image"] = "castle/winter-dwarven/dwarven-castle-tile";
	terrain_dict["Cfa"]["recruit_onto"] = true;
	terrain_dict["Cfa"]["editor_group"] = ['castle', 'frozen'];

	terrain_dict["Chr"] = {};
	terrain_dict["Chr"]["symbol_image"] = "castle/ruin-tile";
	terrain_dict["Chr"]["recruit_onto"] = true;
	terrain_dict["Chr"]["editor_group"] = ['castle'];

	terrain_dict["Chw"] = {};
	terrain_dict["Chw"]["symbol_image"] = "castle/sunken-ruin-tile";
	terrain_dict["Chw"]["recruit_onto"] = true;
	terrain_dict["Chw"]["editor_group"] = ['castle', 'water'];

	terrain_dict["Chs"] = {};
	terrain_dict["Chs"]["symbol_image"] = "castle/swamp-ruin-tile";
	terrain_dict["Chs"]["recruit_onto"] = true;
	terrain_dict["Chs"]["editor_group"] = ['castle', 'water'];

	terrain_dict["Cd"] = {};
	terrain_dict["Cd"]["symbol_image"] = "castle/sand/tile";
	terrain_dict["Cd"]["recruit_onto"] = true;
	terrain_dict["Cd"]["editor_group"] = ['castle', 'desert'];

	terrain_dict["Cdr"] = {};
	terrain_dict["Cdr"]["symbol_image"] = "castle/sand/ruin-tile";
	terrain_dict["Cdr"]["recruit_onto"] = true;
	terrain_dict["Cdr"]["editor_group"] = ['castle', 'desert'];

	terrain_dict["Cte"] = {};
	terrain_dict["Cte"]["symbol_image"] = "castle/troll/tile";
	terrain_dict["Cte"]["recruit_onto"] = true;
	terrain_dict["Cte"]["editor_group"] = ['castle'];

	terrain_dict["Cme"] = {};
	terrain_dict["Cme"]["symbol_image"] = "castle/aquatic-camp/tile";
	terrain_dict["Cme"]["recruit_onto"] = true;
	terrain_dict["Cme"]["editor_group"] = ['castle', 'water'];

	terrain_dict["Cm"] = {};
	terrain_dict["Cm"]["symbol_image"] = "castle/aquatic-castle/castle-tile";
	terrain_dict["Cm"]["recruit_onto"] = true;
	terrain_dict["Cm"]["editor_group"] = ['castle', 'water'];

	terrain_dict["Ke"] = {};
	terrain_dict["Ke"]["symbol_image"] = "castle/encampment/regular-keep-tile";
	terrain_dict["Ke"]["recruit_from"] = true;
	terrain_dict["Ke"]["recruit_onto"] = true;
	terrain_dict["Ke"]["editor_group"] = ['castle'];

	terrain_dict["Ker"] = {};
	terrain_dict["Ker"]["symbol_image"] = "castle/encampment-ruin/regular-keep-tile";
	terrain_dict["Ker"]["recruit_from"] = true;
	terrain_dict["Ker"]["recruit_onto"] = true;
	terrain_dict["Ker"]["editor_group"] = ['castle'];

	terrain_dict["Ket"] = {};
	terrain_dict["Ket"]["symbol_image"] = "castle/encampment/tall-keep-tile";
	terrain_dict["Ket"]["recruit_from"] = true;
	terrain_dict["Ket"]["recruit_onto"] = true;
	terrain_dict["Ket"]["editor_group"] = ['castle'];

	terrain_dict["Kea"] = {};
	terrain_dict["Kea"]["symbol_image"] = "castle/encampment/snow-keep-tile";
	terrain_dict["Kea"]["recruit_from"] = true;
	terrain_dict["Kea"]["recruit_onto"] = true;
	terrain_dict["Kea"]["editor_group"] = ['castle', 'frozen'];

	terrain_dict["Ko"] = {};
	terrain_dict["Ko"]["symbol_image"] = "castle/orcish/keep-tile";
	terrain_dict["Ko"]["recruit_from"] = true;
	terrain_dict["Ko"]["recruit_onto"] = true;
	terrain_dict["Ko"]["editor_group"] = ['castle'];

	terrain_dict["Koa"] = {};
	terrain_dict["Koa"]["symbol_image"] = "castle/winter-orcish/keep-tile";
	terrain_dict["Koa"]["recruit_from"] = true;
	terrain_dict["Koa"]["recruit_onto"] = true;
	terrain_dict["Koa"]["editor_group"] = ['castle', 'frozen'];

	terrain_dict["Kh"] = {};
	terrain_dict["Kh"]["symbol_image"] = "castle/keep-tile";
	terrain_dict["Kh"]["recruit_from"] = true;
	terrain_dict["Kh"]["recruit_onto"] = true;
	terrain_dict["Kh"]["editor_group"] = ['castle'];

	terrain_dict["Kha"] = {};
	terrain_dict["Kha"]["symbol_image"] = "castle/snowy/keep-tile";
	terrain_dict["Kha"]["recruit_from"] = true;
	terrain_dict["Kha"]["recruit_onto"] = true;
	terrain_dict["Kha"]["editor_group"] = ['castle', 'frozen'];

	terrain_dict["Kv"] = {};
	terrain_dict["Kv"]["symbol_image"] = "castle/elven/keep-tile";
	terrain_dict["Kv"]["recruit_from"] = true;
	terrain_dict["Kv"]["recruit_onto"] = true;
	terrain_dict["Kv"]["editor_group"] = ['castle'];

	terrain_dict["Kvr"] = {};
	terrain_dict["Kvr"]["symbol_image"] = "castle/elven-ruin/keep-tile";
	terrain_dict["Kvr"]["recruit_from"] = true;
	terrain_dict["Kvr"]["recruit_onto"] = true;
	terrain_dict["Kvr"]["editor_group"] = ['castle'];

	terrain_dict["Kva"] = {};
	terrain_dict["Kva"]["symbol_image"] = "castle/winter-elven/keep-tile";
	terrain_dict["Kva"]["recruit_from"] = true;
	terrain_dict["Kva"]["recruit_onto"] = true;
	terrain_dict["Kva"]["editor_group"] = ['castle', 'frozen'];

	terrain_dict["Kud"] = {};
	terrain_dict["Kud"]["symbol_image"] = "castle/dwarven-keep-tile";
	terrain_dict["Kud"]["recruit_from"] = true;
	terrain_dict["Kud"]["recruit_onto"] = true;
	terrain_dict["Kud"]["editor_group"] = ['castle', 'cave'];

	terrain_dict["Kf"] = {};
	terrain_dict["Kf"]["symbol_image"] = "castle/outside-dwarven/dwarven-keep-tile";
	terrain_dict["Kf"]["recruit_from"] = true;
	terrain_dict["Kf"]["recruit_onto"] = true;
	terrain_dict["Kf"]["editor_group"] = ['castle'];

	terrain_dict["Kfr"] = {};
	terrain_dict["Kfr"]["symbol_image"] = "castle/ruin-dwarven/dwarven-keep-tile";
	terrain_dict["Kfr"]["recruit_from"] = true;
	terrain_dict["Kfr"]["recruit_onto"] = true;
	terrain_dict["Kfr"]["editor_group"] = ['castle'];

	terrain_dict["Kfa"] = {};
	terrain_dict["Kfa"]["symbol_image"] = "castle/winter-dwarven/dwarven-keep-tile";
	terrain_dict["Kfa"]["recruit_from"] = true;
	terrain_dict["Kfa"]["recruit_onto"] = true;
	terrain_dict["Kfa"]["editor_group"] = ['castle', 'frozen'];

	terrain_dict["Khr"] = {};
	terrain_dict["Khr"]["symbol_image"] = "castle/ruined-keep-tile";
	terrain_dict["Khr"]["recruit_from"] = true;
	terrain_dict["Khr"]["recruit_onto"] = true;
	terrain_dict["Khr"]["editor_group"] = ['castle'];

	terrain_dict["Khw"] = {};
	terrain_dict["Khw"]["symbol_image"] = "castle/sunken-keep-tile";
	terrain_dict["Khw"]["recruit_from"] = true;
	terrain_dict["Khw"]["recruit_onto"] = true;
	terrain_dict["Khw"]["editor_group"] = ['castle', 'water'];

	terrain_dict["Khs"] = {};
	terrain_dict["Khs"]["symbol_image"] = "castle/swamp-keep-tile";
	terrain_dict["Khs"]["recruit_from"] = true;
	terrain_dict["Khs"]["recruit_onto"] = true;
	terrain_dict["Khs"]["editor_group"] = ['castle', 'water'];

	terrain_dict["Kd"] = {};
	terrain_dict["Kd"]["symbol_image"] = "castle/sand/keep-tile";
	terrain_dict["Kd"]["recruit_from"] = true;
	terrain_dict["Kd"]["recruit_onto"] = true;
	terrain_dict["Kd"]["editor_group"] = ['castle', 'desert'];

	terrain_dict["Kdr"] = {};
	terrain_dict["Kdr"]["symbol_image"] = "castle/sand/ruin-keep-tile";
	terrain_dict["Kdr"]["recruit_from"] = true;
	terrain_dict["Kdr"]["recruit_onto"] = true;
	terrain_dict["Kdr"]["editor_group"] = ['castle', 'desert'];

	terrain_dict["Kme"] = {};
	terrain_dict["Kme"]["symbol_image"] = "castle/aquatic-camp/keep-tile";
	terrain_dict["Kme"]["recruit_onto"] = true;
	terrain_dict["Kme"]["recruit_from"] = true;
	terrain_dict["Kme"]["editor_group"] = ['castle', 'water'];

	terrain_dict["Kte"] = {};
	terrain_dict["Kte"]["symbol_image"] = "castle/troll/keep-tile";
	terrain_dict["Kte"]["recruit_onto"] = true;
	terrain_dict["Kte"]["recruit_from"] = true;
	terrain_dict["Kte"]["editor_group"] = ['castle'];

	terrain_dict["Km"] = {};
	terrain_dict["Km"]["symbol_image"] = "castle/aquatic-castle/keep-tile";
	terrain_dict["Km"]["recruit_onto"] = true;
	terrain_dict["Km"]["recruit_from"] = true;
	terrain_dict["Km"]["editor_group"] = ['castle', 'water'];

	terrain_dict["^Cov"] = {};
	terrain_dict["^Cov"]["symbol_image"] = "fog/fog1";
	terrain_dict["^Cov"]["recruit_onto"] = true;
	terrain_dict["^Cov"]["editor_group"] = ['castle', 'special'];

	terrain_dict["^Kov"] = {};
	terrain_dict["^Kov"]["symbol_image"] = "fog/fog1";
	terrain_dict["^Kov"]["recruit_from"] = true;
	terrain_dict["^Kov"]["recruit_onto"] = true;
	terrain_dict["^Kov"]["editor_group"] = ['castle', 'special'];

	terrain_dict["^Bw|"] = {};
	terrain_dict["^Bw|"]["symbol_image"] = "bridge/wood-n-s";
	terrain_dict["^Bw|"]["editor_group"] = ['bridge', 'water'];

	terrain_dict["^Bw/"] = {};
	terrain_dict["^Bw/"]["symbol_image"] = "bridge/wood-ne-sw";
	terrain_dict["^Bw/"]["editor_group"] = ['bridge', 'water'];

	terrain_dict["^Bw\\"] = {};
	terrain_dict["^Bw\\"]["symbol_image"] = "bridge/wood-se-nw";
	terrain_dict["^Bw\\"]["editor_group"] = ['bridge', 'water'];

	terrain_dict["^Bw|r"] = {};
	terrain_dict["^Bw|r"]["symbol_image"] = "bridge/wood-rotting-n-s";
	terrain_dict["^Bw|r"]["editor_group"] = ['bridge', 'water'];

	terrain_dict["^Bw/r"] = {};
	terrain_dict["^Bw/r"]["symbol_image"] = "bridge/wood-rotting-ne-sw";
	terrain_dict["^Bw/r"]["editor_group"] = ['bridge', 'water'];

	terrain_dict["^Bw\\r"] = {};
	terrain_dict["^Bw\\r"]["symbol_image"] = "bridge/wood-rotting-se-nw";
	terrain_dict["^Bw\\r"]["editor_group"] = ['bridge', 'water'];

	terrain_dict["^Bsb|"] = {};
	terrain_dict["^Bsb|"]["symbol_image"] = "bridge/stonebridge-n-s-tile";
	terrain_dict["^Bsb|"]["editor_group"] = ['bridge', 'water'];

	terrain_dict["^Bsb\\"] = {};
	terrain_dict["^Bsb\\"]["symbol_image"] = "bridge/stonebridge-se-nw-tile";
	terrain_dict["^Bsb\\"]["editor_group"] = ['bridge', 'water'];

	terrain_dict["^Bsb/"] = {};
	terrain_dict["^Bsb/"]["symbol_image"] = "bridge/stonebridge-ne-sw-tile";
	terrain_dict["^Bsb/"]["editor_group"] = ['bridge', 'water'];

	terrain_dict["^Bs|"] = {};
	terrain_dict["^Bs|"]["symbol_image"] = "cave/chasm-stone-bridge-s-n-tile";
	terrain_dict["^Bs|"]["default_base"] = "Qxu";
	terrain_dict["^Bs|"]["editor_group"] = ['bridge', 'cave'];

	terrain_dict["^Bs/"] = {};
	terrain_dict["^Bs/"]["symbol_image"] = "cave/chasm-stone-bridge-sw-ne-tile";
	terrain_dict["^Bs/"]["default_base"] = "Qxu";
	terrain_dict["^Bs/"]["editor_group"] = ['bridge', 'cave'];

	terrain_dict["^Bs\\"] = {};
	terrain_dict["^Bs\\"]["symbol_image"] = "cave/chasm-stone-bridge-se-nw-tile";
	terrain_dict["^Bs\\"]["default_base"] = "Qxu";
	terrain_dict["^Bs\\"]["editor_group"] = ['bridge', 'cave'];

	terrain_dict["^Bh\\"] = {};
	terrain_dict["^Bh\\"]["symbol_image"] = "bridge/hanging-se-nw-tile";
	terrain_dict["^Bh\\"]["default_base"] = "Qxu";
	terrain_dict["^Bh\\"]["editor_group"] = ['bridge', 'cave'];

	terrain_dict["^Bh/"] = {};
	terrain_dict["^Bh/"]["symbol_image"] = "bridge/hanging-sw-ne-tile";
	terrain_dict["^Bh/"]["default_base"] = "Qxu";
	terrain_dict["^Bh/"]["editor_group"] = ['bridge', 'cave'];

	terrain_dict["^Bh|"] = {};
	terrain_dict["^Bh|"]["symbol_image"] = "bridge/hanging-s-n-tile";
	terrain_dict["^Bh|"]["default_base"] = "Qxu";
	terrain_dict["^Bh|"]["editor_group"] = ['bridge', 'cave'];

	terrain_dict["^Bcx\\"] = {};
	terrain_dict["^Bcx\\"]["symbol_image"] = "bridge/chasm-se-nw-tile";
	terrain_dict["^Bcx\\"]["default_base"] = "Qxu";
	terrain_dict["^Bcx\\"]["editor_group"] = ['bridge', 'cave'];

	terrain_dict["^Bcx/"] = {};
	terrain_dict["^Bcx/"]["symbol_image"] = "bridge/chasm-sw-ne-tile";
	terrain_dict["^Bcx/"]["default_base"] = "Qxu";
	terrain_dict["^Bcx/"]["editor_group"] = ['bridge', 'cave'];

	terrain_dict["^Bcx|"] = {};
	terrain_dict["^Bcx|"]["symbol_image"] = "bridge/chasm-s-n-tile";
	terrain_dict["^Bcx|"]["default_base"] = "Qxu";
	terrain_dict["^Bcx|"]["editor_group"] = ['bridge', 'cave'];

	terrain_dict["^Bp\\"] = {};
	terrain_dict["^Bp\\"]["symbol_image"] = "bridge/planks-se-nw-tile";
	terrain_dict["^Bp\\"]["default_base"] = "Qxu";
	terrain_dict["^Bp\\"]["editor_group"] = ['bridge', 'cave'];

	terrain_dict["^Bp/"] = {};
	terrain_dict["^Bp/"]["symbol_image"] = "bridge/planks-sw-ne-tile";
	terrain_dict["^Bp/"]["default_base"] = "Qxu";
	terrain_dict["^Bp/"]["editor_group"] = ['bridge', 'cave'];

	terrain_dict["^Bp|"] = {};
	terrain_dict["^Bp|"]["symbol_image"] = "bridge/planks-s-n";
	terrain_dict["^Bp|"]["default_base"] = "Qxu";
	terrain_dict["^Bp|"]["editor_group"] = ['bridge', 'cave'];

	terrain_dict["_off^_usr"] = {};
	terrain_dict["_off^_usr"]["symbol_image"] = "off-map/symbol";
	terrain_dict["_off^_usr"]["editor_group"] = ['special', 'obstacle'];

	terrain_dict["^_fme"] = {};
	terrain_dict["^_fme"]["symbol_image"] = "off-map/border";
	terrain_dict["^_fme"]["editor_group"] = ['special', 'obstacle'];

	terrain_dict["_s"] = {};
	terrain_dict["_s"]["symbol_image"] = "void/void";
	terrain_dict["_s"]["editor_group"] = ['special'];

	terrain_dict["^_s"] = {};
	terrain_dict["^_s"]["symbol_image"] = "void/void";
	terrain_dict["^_s"]["editor_group"] = ['special'];

	terrain_dict["_f"] = {};
	terrain_dict["_f"]["symbol_image"] = "fog/fog1";
	terrain_dict["_f"]["editor_group"] = ['special'];

	terrain_dict["Tt"] = {};

	terrain_dict["Ut"] = {};

	terrain_dict["Dt"] = {};
	terrain_dict["Dt"]["editor_group"] = ['desert'];

	terrain_dict["Wrt"] = {};
	terrain_dict["Wrt"]["editor_group"] = ['water'];

	terrain_dict["Ht"] = {};
	terrain_dict["Ht"]["editor_group"] = ['rough'];

	terrain_dict["St"] = {};
	terrain_dict["St"]["editor_group"] = ['water'];

	terrain_dict["Wst"] = {};

	terrain_dict["Ct"] = {};
	terrain_dict["Ct"]["recruit_onto"] = true;
	terrain_dict["Ct"]["editor_group"] = ['castle'];

	terrain_dict["Mt"] = {};
	terrain_dict["Mt"]["editor_group"] = ['rough'];

	terrain_dict["Wdt"] = {};

	terrain_dict["Gt"] = {};

	terrain_dict["Ft"] = {};

	terrain_dict["At"] = {};

	terrain_dict["Vt"] = {};

	terrain_dict["Xt"] = {};

	terrain_dict["Qt"] = {};

	terrain_dict["Rt"] = {};

	return terrain_dict;
}