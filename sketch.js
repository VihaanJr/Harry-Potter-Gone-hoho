var HarryPotter , HarryPotterImage;
var Voldemort , VoldemortImage;
var Dragon , DragonImage;
var Battlefield , BattlefieldImage;
var Castle , CastleImage , CastlesGroup;
var gameState = 0;
var score = 0;


function preload(){
  HarryPotterImage = loadImage("Harry.png");
  VoldemortImage = loadImage("Voldemort.png");
  DragonImage = loadImage("Dragon.png");
  BattlefieldImage = loadImage("Battlefield.png");
  CastleImage = loadImage("Castle.png");
  GameOverImage = loadImage("GameOver.png");
}

function setup() {
createCanvas(600,600);
  
  
  Battlefield = createSprite(300,200);
  Battlefield.addImage("BattlefieldImage" , BattlefieldImage);
  Battlefield.scale = 0.7;
  Battlefield.velocityX =  -10;
  
  HarryPotter = createSprite(500,200);
  HarryPotter.addImage("HarryPotterImage" , HarryPotterImage);
  HarryPotter.scale = 0.2;
  //HarryPotter.debug = true;
  
  Voldemort = createSprite(200,200);
  Voldemort.addImage("VoldemortImage" , VoldemortImage);
  Voldemort.scale = 0.4;
  
  Dragon = createSprite(150,230);
  Dragon.addImage(DragonImage);
  Dragon.scale = 0.4;
  
  CastlesGroup = new Group();
}

function draw() {
  if(gameState === 0){
    background("black");
    textSize(25);
    text("Press Spacebar Key To Start The Game" , 100 , 100);
    
    if(keyDown("Space")){
      gameState = 1;
      frameCount = 1;
    }
  }
  else if(gameState === 1){
    
    score = score + 1;
    
    
    if (Battlefield.x < 0){
        Battlefield.x = 500;
    }
    spawnCastle();
    
    if (keyDown("space")) {
      HarryPotter.velocityY = -5;
    }
       HarryPotter.velocityY = HarryPotter.velocityY + 0.8;
    
    if(HarryPotter.isTouching(CastlesGroup)){
      gameState = 2;
    }
  
    drawSprites();
  }
  else if(gameState === 2){
    GameOver = createSprite(300,300);
    GameOver.addImage(GameOverImage);
    GameOver.scale = 0.3;
    Battlefield.velocityX = 0;
    HarryPotter.velocityY = 0;
    CastlesGroup.setVelocityXEach(0); 
    CastlesGroup.setLifetimeEach(-1);
    drawSprites();
  }
  textSize(20);
    fill("Violet")
    text("Score: " + score , 80,20);
} 

function spawnCastle() {
  if (frameCount % 150 === 0) {
   Castle = createSprite(600,300,100,100);
    //Castle.y = Math.round(random(200.200));
    Castle.addImage(CastleImage);
    Castle.scale = 0.2;
    Castle.velocityX = Battlefield.velocityX;
    Castle.lifetime = 65;
    Castle.setCollider("circle" , 0,100,400)
    //Castle.debug = true;
    CastlesGroup.add(Castle);
  }
}