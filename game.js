window.onload = function() {
	
     var game = new Phaser.Game("100%", "120%", Phaser.CANVAS, "", {preload: onPreload, create: onCreate});                
     
     var mapDict = getMaps();
     var mapName = "PRIPOC_MAPA_1";
     var map = MapToGrid(mapDict[mapName]);
     var starting_positions = extractStartingPositions(map);
     removeStartingPositions(map);
     
     var terrain_dict = createMinTerrainDict(onlyUniqueMapParts(map));
     console.log(map);
     var race_dict = createRaceDict();
     var movement_type_dict = createMovementDict();
     var unit_dict = createUnitDict();

     const image_path_prefix_terrain = "images/terrain/";
     const image_path_prefix_units = "images/";
     const image_path_postfix = ".png";

    // console.log(GetPossibleMovements(0, 0, 5, movement_type_dict["orcishfoot"], terrain_dict, map));

     var sides_dict = createSidesDict();
     var sides_list = [];
     Object.keys(sides_dict).forEach(function(key) {
          if(key != "Dunefolk") {
               sides_list.push(key);
          }
     });

     var playerQueue = new Queue();
     var UniqueSides = [];
     for(var i = 0; i < starting_positions.length; i++) {
          var player = {"id": i+1, "units":[], "side": sides_list[Math.floor(Math.random() * sides_list.length)]};
          var leader = {
               "is_leader": true,
               "type": sides_dict[player["side"]]["leader"][Math.floor(Math.random() * sides_dict[player["side"]]["leader"].length)]
          };
          leader["hp"] = unit_dict[leader["type"]]["hitpoints"];
          leader["xp"] = 0;
          leader["x"] = starting_positions[i][0];
          leader["y"] = starting_positions[i][1];
          leader["player_id"] = i + 1;

          player["units"].push(leader);

          playerQueue.enqueue(player);

          if(!UniqueSides.includes(player["side"])) {
               UniqueSides.push(player["side"]);
          }
     }
     playerQueue.shift = function(){ var temp = this.dequeue(); this.enqueue(temp);};

     var hexagonWidth = 280;
	var hexagonHeight = 280;
     //var gridSizeX = map[0].length;
     //var gridSizeY = map.length;
     var gridSizeX = map[0].length;
     var gridSizeY = map.length;
	var columns = [Math.ceil(gridSizeY/2),Math.floor(gridSizeY/2)];
     var moveIndex;
     var sectorWidth = hexagonWidth/4*3;
     var sectorHeight = hexagonHeight;
     var gradient = (hexagonWidth/4)/(hexagonHeight/2);
     var marker;
     var hexagonGroup;
     var hexagons = Create2DArray(gridSizeX, gridSizeY/2);

	function onPreload() {
          game.load.image("marker", "images/marker.png");

          for(key in terrain_dict) {
               game.load.image(terrain_dict[key]["symbol_image"], image_path_prefix_terrain + terrain_dict[key]["symbol_image"] + image_path_postfix);
          }
          
          UniqueSides.forEach(side => {
               sides_dict[side]["recruit"].forEach(unit => {
                    game.load.image(unit_dict[unit]["image"], image_path_prefix_units + unit_dict[unit]["image"]);
               });
               sides_dict[side]["leader"].forEach(unit => {
                    game.load.image(unit_dict[unit]["image"], image_path_prefix_units + unit_dict[unit]["image"]);
               });
          });
	}

	function onCreate() {
		hexagonGroup = game.add.group();
          game.stage.backgroundColor = "#ffffff";

	     for(var i = 0; i < gridSizeY; i ++) {
			for(var j = 0; j < gridSizeX; j ++) {
                    var hexagonX = hexagonWidth * j * 0.75;
                    var hexagonY = hexagonHeight*i + j%2*hexagonHeight/2;
                    
                    //console.log(i, j);
                    /*console.log(map[i][j]);*/
                    var image = terrain_dict[map[i][j]]["symbol_image"];

                    var hexagon = game.add.sprite(hexagonX,hexagonY,image);
                    hexagon.scale.setTo(4,4)

                    var style = { font: "30px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: hexagon.width, align: "center", backgroundColor: "#ffff00" };
                    text = game.add.text(hexagonX, hexagonY, "\n" + i + ","+ j, style);
                    //text.anchor.set(0.5);
                    hexagonGroup.add(text);

                    hexagon.grid_x = j;
                    hexagon.grid_y = i;
                    hexagon.hexagonX = hexagonX;
                    hexagon.hexagonY = hexagonY;
                    hexagon.unit = null;

                    hexagon.inputEnabled = true;
                    hexagon.events.onInputDown.add(hexagon_clicked, this);

                    hexagons[i][j] = hexagon;
                    hexagonGroup.add(hexagon);
			}
          }
          
          var first_player_id = undefined;
          while(first_player_id != playerQueue.peek()["id"]) {
               var current_player = playerQueue.peek();

               if(first_player_id == undefined) {
                    first_player_id = current_player["id"];
               }

               var image = unit_dict[current_player["units"][0]["type"]]["image"];
               var x = current_player["units"][0]["x"];
               var y = current_player["units"][0]["y"];

               var unit = game.add.sprite(hexagons[x][y].hexagonX,hexagons[x][y].hexagonY,image);
               unit.scale.setTo(4,4);
               hexagonGroup.add(unit);

               hexagons[x][y].unit = unit;
               playerQueue.shift();
          }

		hexagonGroup.y = (game.height-hexagonHeight*Math.ceil(gridSizeY/2))/2;
          if(gridSizeY%2==0){
               hexagonGroup.y-=hexagonHeight/4;
          }
		hexagonGroup.x = (game.width-Math.ceil(gridSizeX/2)*hexagonWidth-Math.floor(gridSizeX/2)*hexagonWidth/2)/2;
          if(gridSizeX%2==0){
               hexagonGroup.x-=hexagonWidth/8;
          }
		marker = game.add.sprite(0,0,"marker");
		marker.anchor.setTo(0.5);
		marker.visible=false;
		hexagonGroup.add(marker);
          moveIndex = game.input.addMoveCallback(placeMarker, this);

	}

     function checkHex(){
          var candidateX = Math.floor((game.input.worldX-hexagonGroup.x)/sectorWidth);
          var candidateY = Math.floor((game.input.worldY-hexagonGroup.y)/sectorHeight);
          var deltaX = (game.input.worldX-hexagonGroup.x)%sectorWidth;
          var deltaY = (game.input.worldY-hexagonGroup.y)%sectorHeight; 
          if(candidateX%2==0){
               if(deltaX<((hexagonWidth/4)-deltaY*gradient)){
                    candidateX--;
                    candidateY--;
               }
               if(deltaX<((-hexagonWidth/4)+deltaY*gradient)){
                    candidateX--;
               }
          }    
          else{
               if(deltaY>=hexagonHeight/2){
                    if(deltaX<(hexagonWidth/2-deltaY*gradient)){
                         candidateX--;
                    }
               }
               else{
                    if(deltaX<deltaY*gradient){
                         candidateX--;
                    }
                    else{
                         candidateY--;
                    }
               }
          }
          return [candidateX,candidateY];
     }
     
     function placeMarker(hexagon){
          t = checkHex()
          posX = t[0]
          posY = t[1]

          $( "#start" ).text(posX + "," + posY);

		if(posX<0 || posY<0 || posX>=gridSizeX || posY>columns[posX%2]-1){
			marker.visible=false;
		}
		else{
			marker.visible=true;
			marker.x = hexagonWidth/4*3*posX+hexagonWidth/2;
			marker.y = hexagonHeight*posY;
			if(posX%2==0){
				marker.y += hexagonHeight/2;
			}
			else{
				marker.y += hexagonHeight;
			}
		}
	}
     
     function hexagon_clicked(hexagon) {

     }

     /*  function do_shit(hexagon) {
               t = checkHex()
               posX = t[0]
               posY = t[1]
               
               x = hexagon.world.x;
               y = hexagon.world.y;

               grid_x = hexagon.grid_x;
               grid_y = hexagon.grid_y;

               console.log(grid_x, grid_y);
               console.log(hexagons[grid_x][grid_y]);

               //hexagon.destroy();
               game.add.sprite(x,y,"unit");
          }*/

     function Create2DArray(x, y) {
          var array = new Array(x);

          for (var i = 0; i < x; i++) {
               array[i] = new Array(y);
          }

          return array;
     }
}