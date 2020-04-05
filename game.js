window.onload = function() {
	
     var game = new Phaser.Game("100%", "120%", Phaser.CANVAS, "", {preload: onPreload, create: onCreate});                
     
     var mapDict = getMaps();
     var mapName = "PRIPOC_MAPA_1";
     var map = MapToGrid(mapDict[mapName]);
     var starting_positions = extractStartingPositions(map);
     removeStartingPositions(map);
     
     var terrain_dict = createMinTerrainDict(onlyUniqueMapParts(map));
     var race_dict = createRaceDict();
     console.log(race_dict);

     const image_path_prefix = "images/terrain/";
     const image_path_postfix = ".png";


     var playerQueue = new Queue();
     playerQueue.shift = function(){ var temp = this.dequeue(); console.log(temp); this.enqueue(temp);};
     playerQueue.enqueue('Lukas');
     playerQueue.enqueue('Martin');
     playerQueue.enqueue('a Martin');

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
               game.load.image(terrain_dict[key]["symbol_image"], image_path_prefix + terrain_dict[key]["symbol_image"] + image_path_postfix);
          }
	}

	function onCreate() {
		hexagonGroup = game.add.group();
          game.stage.backgroundColor = "#ffffff";

	     for(var i = 0; i < /*gridSizeX*/gridSizeY; i ++){
			for(var j = 0; j < /*gridSizeY*/gridSizeX; j ++){
				//if(gridSizeX%2==0 || i+1<gridSizeX/2 || j%2==0){
                         //var hexagonX = hexagonWidth*i*1.5+(hexagonWidth/4*3)*(j%2);
                         //var hexagonY = hexagonHeight*j/2;
                         var hexagonX = hexagonWidth * j * 0.75;
                         var hexagonY = hexagonHeight*i + j%2*hexagonHeight/2;
                         
                         //console.log(i, j);
                         /*console.log(map[i][j]);*/
                         var image = terrain_dict[map[i][j]]["symbol_image"];

                         var hexagon = game.add.sprite(hexagonX,hexagonY,image);
                         hexagon.scale.setTo(4,4)

                         /*var style = { font: "10px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: hexagon.width, align: "center", backgroundColor: "#ffff00" };
                         text = game.add.text(hexagonX, hexagonY, "\n" + i + ","+ j, style);
                         //text.anchor.set(0.5);
                         hexagonGroup.add(text);*/

                         hexagon.grid_x = j;
                         hexagon.grid_y = i;

                         hexagon.inputEnabled = true;
                         hexagon.events.onInputDown.add(hexagon_clicked, this);

                         hexagons[i][j] = hexagon;
                         hexagonGroup.add(hexagon);
				//}
			}
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
          console.log("Creating array " + x + ", " + y);

          var array = new Array(x);

          for (var i = 0; i < x; i++) {
               array[i] = new Array(y);
          }

          return array;
     }
}