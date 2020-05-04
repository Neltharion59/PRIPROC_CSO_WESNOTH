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
          var player = {"id": i+1, "units":[], "side": sides_list[Math.floor(Math.random() * sides_list.length)], "gold":100};
          if(i == 0) {
               player["AI"] = false;
          } else {
               player["AI"] = true;
          }
          var leader = {
               "is_leader": true,
               "type": sides_dict[player["side"]]["leader"][Math.floor(Math.random() * sides_dict[player["side"]]["leader"].length)]
          };
          leader["hp"] = unit_dict[leader["type"]]["hitpoints"];
          leader["xp"] = 0;
          leader["x"] = starting_positions[i][0];
          leader["y"] = starting_positions[i][1];
          leader["player_id"] = i + 1;
          leader["move_points"] = 0;

          player["units"].push(leader);

          playerQueue.enqueue(player);

          if(!UniqueSides.includes(player["side"])) {
               UniqueSides.push(player["side"]);
          }
     }
     playerQueue.shift = function(){ var temp = this.dequeue(); this.enqueue(temp);};
     //playerQueue.gameIsOver = function() {}

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
     var hexagons = Create2DArray(gridSizeX, gridSizeY);

     var unitMatrix = Create2DArray(gridSizeX, gridSizeY);
     for(var i = 0; i < unitMatrix.length; i++) {
          for(var j = 0; j < unitMatrix[i].length; j++) {
               unitMatrix[i][j] = null;
          }
     }
     var hireMatrix = Create2DArray(gridSizeX, gridSizeY);
     for(var i = 0; i < hireMatrix.length; i++) {
          for(var j = 0; j < hireMatrix[i].length; j++) {
               hireMatrix[i][j] = null;
          }
     }
     for(var i = 0; i < starting_positions.length; i++) {
          hireMatrix[starting_positions[i][0]][starting_positions[i][1]] = findSurroundingHireToFields(starting_positions[i], map, terrain_dict);
     }
     console.log(hireMatrix);

    // console.log(GetPossibleMovements(0, 0, 5, movement_type_dict["orcishfoot"], terrain_dict, map, unitMatrix, playerQueue.peek["id"]));


     var humanMoving = false;
     var gameOver = false;
     var end_turn_button = null;
     var turn_count = 0;

	function onPreload() {
          game.load.image("marker", "images/marker.png");
          game.load.image("end_turn", "images/sword.png");

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
          
          var x = hexagonGroup.width/2;
          var y = -500;

          end_turn_button = game.add.sprite(x,y,"end_turn");
          hexagonGroup.add(end_turn_button);
          end_turn_button.inputEnabled = true;
          end_turn_button.events.onInputDown.add(clickEndTurn, this);

          var first_player_id = undefined;
          while(first_player_id != playerQueue.peek()["id"]) {
               var current_player = playerQueue.peek();

               if(first_player_id == undefined) {
                    first_player_id = current_player["id"];
               }

               var image = unit_dict[current_player["units"][0]["type"]]["image"];
               var x = current_player["units"][0]["x"];
               var y = current_player["units"][0]["y"];
               unitMatrix[x][y] = current_player["units"][0];

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

          playGame();
	}

     function playGame() {
          //console.log("b4 game over check");
          console.log(gameOver);
          if(gameOver) {
               return;
          }
          //console.log("after game over check");
          gameOver = (playerQueue.getLength() <= 1);

          //console.log("b4 loop");
          while(nextTurn() && !gameOver) {
               //console.log("in loop");
               gameOver = (playerQueue.getLength() <= 1);
          }
          //console.log("after loop");
     }

     function nextTurn() {
          if(playerQueue.peek()["id"] == 1) {
               turn_count++;
               console.log("Turn number:" + turn_count);
          }
          recruit();
          
          for(var i = 0; i < playerQueue.peek()["units"].length; i++) {
               playerQueue.peek()["units"][i]["move_points"] = unit_dict[playerQueue.peek()["units"][i]["type"]]["movement"];
          }

          if(playerQueue.peek()["AI"]) {
               end_turn_button.visible = false;
               var movements = calculateMoveOrders();
               console.log(movements);
               //performMoving(movements);
               playerQueue.shift();
               return true;
          } else {
               humanMoving = true;

               end_turn_button.visible = true;

               return false;
          }
     }

     function clickEndTurn() {
          console.log("Clicked end turn");

          if(!humanMoving) {
               return;
          }
          //console.log("Human moving test passed");

          humanMoving = false;
          playerQueue.shift();

          //console.log("about ot playGame");
          playGame();
     }

     function recruit() {

          var leader = null;
          for(var i = 0; i<playerQueue.peek()["units"].length; i++)
          {
               //console.log("checking unit " + i);
               if(playerQueue.peek()["units"][i]["is_leader"]) {
                    leader = playerQueue.peek()["units"][i];
                   // console.log("found leader");
                    break;
               }
          }

          if(leader == null) {
               return;
          }

          hire_positions = null;
          for(var i = 0; i<starting_positions.length; i++)
          {
               if(leader["x"] == starting_positions[i][0] && leader["y"] == starting_positions[i][1]) {
                    hire_positions = hireMatrix[leader["x"]][leader["y"]];
                    break;
               }
          }

          if(hire_positions == null) {
               return;
          }

          for(var i = hire_positions.length - 1; i >= 0; i--)
          {
               if(unitMatrix[hire_positions[i][0]][hire_positions[i][1]] != null) {
                    hire_positions.splice(i, 1);
               }
          }

          for(var i = 0; i < hire_positions.length; i++) {

               var possible_to_hire = sides_dict[playerQueue.peek()["side"]][["recruit"]];
               for(var j = possible_to_hire.length - 1; j >= 0; j--)
               {
                    if(unit_dict[possible_to_hire[j]]["cost"] > playerQueue.peek()["gold"]) {
                         possible_to_hire.splice(j, 1);
                    }
               }

               var hireType = possible_to_hire[Math.floor(Math.random() * possible_to_hire.length)];

               //We know what type unit we want to hire and where to place it
               var x = hire_positions[i][0];
               var y = hire_positions[i][1];
               var unit = {
                    "is_leader": false,
                    "type": hireType,
                    "hp": unit_dict[hireType]["hitpoints"],
                    "xp": 0,
                    "x": x,
                    "y": y,
                    "player_id": playerQueue.peek()["id"],
                    "move_points": 0
               };
               unitMatrix[x][y] = unit;
               playerQueue.peek()["units"].push(unit);
               playerQueue.peek()["gold"] -= unit_dict[hireType]["cost"];

               //Visual
               var unit_sprite = game.add.sprite(hexagons[x][y].hexagonX,hexagons[x][y].hexagonY, unit_dict[hireType]["image"]);
               unit_sprite.scale.setTo(4,4);
               hexagonGroup.add(unit_sprite);
               hexagons[x][y].unit = unit_sprite;
          }
     }

     function calculateMoveOrders() {
          var possible_movements = [];
          for(var i = 0; i < playerQueue.peek()["units"].length; i++) {
               possible_movements.push(GetPossibleMovements(
                    playerQueue.peek()["units"][i]["x"],
                    playerQueue.peek()["units"][i]["y"],
                    playerQueue.peek()["units"][i]["move_points"],
                    movement_type_dict[unit_dict[playerQueue.peek()["units"][i]["type"]]["movement_type"]],
                    terrain_dict,
                    map,
                    unitMatrix,
                    playerQueue.peek()["id"]
               ));
          };

          console.log(possible_movements);
          var selectedMovements = MovementCalculationRandom(possible_movements);
          return selectedMovements;
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
          else {
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