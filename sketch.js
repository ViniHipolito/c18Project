var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var ost, lose;

//Estados de Jogo
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  //pathImg = loadImage("Road.png");
pathImg = loadImage("Background.jpg");
  //boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  boyImg = loadAnimation("Jetpack.png");
  cashImg = loadImage("Coin.webp");
  diamondsImg = loadImage("Gem.webp");
  jwelleryImg = loadImage("MoreCoins.webp");
  //swordImg = loadImage("sword.png");
  swordImg = loadImage("Laser.webp");
  endImg =loadAnimation("fimdeJogo.png");
  ost = loadSound("ost.mp3");
  lose = loadSound("lose.wav");
  
}

function setup(){
  
//crie uma tela
 createCanvas(windowWidth,windowHeight);

//plano de fundo se movendo

path=createSprite(width/2,50);
path.addImage(pathImg);
path.velocityX = -7;
path.scale = 1.4;


//crie o menino correndo
boy = createSprite(50,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=1;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
ost.play();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.y = World.mouseY;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //código para reiniciar o plano de fundo

   if(path.x < width + 100 - width ){
     path.x = path.width/2;
   }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection + 3;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection + 5;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection + 15;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState=END;
        ost.pause();
        lose.play();
        
        boy.addAnimation("SahilRunning",endImg);
        boy.x=width/2;
        boy.y=height/2;
        boy.scale=0.6;
        
        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();
        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(125);
  text("Coin: "+ treasureCollection,width-1350,30);
  }

}

function createCash() {
  if (World.frameCount % 75 == 0) {
  var cash = createSprite(width,Math.round(random(50, height-50), 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.8
  cash.velocityX = -7;
  cash.lifetime = 200;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(width,Math.round(random(50, height-50), 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.8
  diamonds.velocityX = -7.5;
  diamonds.lifetime = 200;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(width,Math.round(random(50, height-50), 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.75
  jwellery.velocityX = -8.5;
  jwellery.lifetime = 200;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 175 == 0) {
  var sword = createSprite(width,Math.round(random(50, height-50), 10, 10));
  sword.addImage(swordImg);
  sword.scale = 0.75;
  sword.velocityX = -7;
  sword.lifetime = 200;
  swordGroup.add(sword);
  }
}