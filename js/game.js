class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      car1 = createSprite(100 ,200, 50, 50);
      car2 = createSprite(300, 200, 50, 50);
      car3 = createSprite(500, 200, 50, 50);
      car4 = createSprite(700, 200, 50, 50);

      cars = [car1, car2, car3, car4];
      plyrsHeight = [player.height1, player.height2, player.height3, player.height4];
      plyrsDistance = [player.distance1, player.distance2, player.distance3, player.distance4];
      plyrsY = [300, 560, 820, 1080];
      plyrsHurds = [car1Hurds, car2Hurds, car3Hurds, car4Hurds];
      plyrsImg = [car1_Img, car1_Img, car1_Img, car1_Img]

      cars[0].addImage("car1", plyrsImg[0] , 20, 20);
      cars[1].addImage("car2", plyrsImg[1] , 20, 20);
      cars[2].addImage("car3", plyrsImg[2] , 20, 20);
      cars[3].addImage("car4", plyrsImg[3] , 20, 20);
    }
  
    play(){
      form.hide();
      
      player.get();
      plyrsDistance[0] += 15;
      plyrsDistance[1] += 15;
      plyrsDistance[2] += 15;
      plyrsDistance[3] += 15;
      player.update();

      background("#c68767");
      image(trackImg,  - displayWidth * 4, 0, displayWidth * 5, displayHeight)
  
      Player.getPlayerInfo();
      player.getCarsAtEnd();
      
      if(allPlayers !== undefined){
        //index of the array
        
        var index = 0;

        car1.x = displayWidth - plyrsDistance[0] + 400 - 100;
        car2.x = displayWidth - plyrsDistance[1] + 800 - 100;
        car3.x = displayWidth - plyrsDistance[2] + 1200 - 100;
        car4.x = displayWidth - plyrsDistance[3] + 1600 - 100;

        car1.y = plyrsY[0];
        car2.y = plyrsY[1];
        car3.y = plyrsY[2];
        car4.y = plyrsY[3];


        for(var plr in allPlayers){
          index = index + 1;

          if (keyWentDown("space") && index === player.index && plyrsHeight[index - 1] === 0){
            plyrsHeight[index - 1] += 200
            player.update();
          }

          if (cars[index - 1].collide(plyrsHurds[index - 1]) && plyrsHeight[index - 1] === 0  && index === player.index){
            plyrsDistance[index - 1] = 0
            plyrsHeight[index - 1] = 0;
            player.update();
          }

          cars[index - 1].y = cars[index - 1].y - plyrsHeight[index - 1];
          if (plyrsHeight[index - 1] > 0 ){
            plyrsHeight[index - 1] = plyrsHeight[index - 1] - 5
            player.update();
          }

          if (index === player.index){
            //cars[index - 1].addImage("car", car2_Img, 20, 20);
            plyrsImg[index - 1] = car2_Img;
            camera.position.x = cars[index - 1].x; 
            //console.log(index - 1);
            camera.position.y = displayHeight/2;
          }
        }
      }
      

      if (plyrsDistance[index - 1] > 11850){
        gameState = 2;
        rank += 1
        player.updateCarsAtEnd(rank);
      }      
      drawSprites();
    }

    end(){
      console.log("game ended");
      console.log("position: " + rank);
    }
  }