//ab=angry birds
//gameState 1 = for choosing the games
//gameState 2 = angry birds game
//gameState 3 = brick breaker

const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

//All the variables for the first page
var startPageImg;

//All the variables in the game choosing section

//All variables for the button
var trexButton;
var angryBirdsButton;
var brickBreakerButton;
var spaceShooterButton

//All variables for angery birds games

var engine, world;
//game objects
var box1,box2,box3,box4,box5; 
var pig1,pig3;
var log1,log3,log4,log5;
var bird, slingshot,platform;
//games state
var abgameState = "onSling";
//score
var score = 0;
//birds
var birds=[];

//All variables for brick breaker game
var board;
var ball

//main gameState
var gameState =0;

 
function preload(){

  //Images fir the fist page
  startPageImg = loadImage("startPage.jpeg")

  //All the variables in the game choosing section
  secondPagebgImg = loadImage("secondBG.jpeg")

  //Images for angry birds game
  bg = loadImage("sprites/bg.png")

  //Images for brick breaker game
  brickBreakerbackgroundImg = loadImage("brick breaker/background.jpg");
  ballImg = loadImage("brick breaker/ball.png");
  blueBlock = loadImage("brick breaker/blue.png")
  boardImg = loadImage("brick breaker/board.png");
  heartImg = loadImage("brick breaker/heart.png")
  orangeBlock = loadImage("brick breaker/orange.png")
  purpleBlock = loadImage("brick breaker/purple.png")
  redBlock = loadImage("brick breaker/red.png")
  skyBlueBlock = loadImage("brick breaker/skyblue.png")
  yellowBlock = loadImage("brick breaker/yellow.png")

}//End of preload function

function setup() {
  createCanvas(1300,700);
  engine = Engine.create();
  world = engine.world;
  
  //For creating the Start button in the first page
  startButton=createImg("buttons/startButton.png")
  startButton.position(70,400)
  startButton.size(200,200);

  //For creating the rules button
  rulesButton=createImg("buttons/rules.png")
  rulesButton.position(1000,450)
  rulesButton.size(200,90);

  //For creating the trex button
  trexButton=createImg("buttons/trex_thumb.webp")
  trexButton.position(20,20)
  trexButton.size(300,200);
  trexButton.hide();

  //For creating the angry birds button
  angryBirdsButton=createImg("buttons/angryBirds.jpeg")
  angryBirdsButton.position(340,20)
  angryBirdsButton.size(300,200);
  angryBirdsButton.hide();

  //For creating the brick breaker  button
  brickBreakerButton=createImg("buttons/brick_breaker.jpg")
  brickBreakerButton.position(660,20)
  brickBreakerButton.size(300,200);
  brickBreakerButton.hide();

  //For creating the space shooter button
  spaceShooterButton=createImg("buttons/space_shooter.jpeg")
  spaceShooterButton.position(980,20)
  spaceShooterButton.size(300,200);
  spaceShooterButton.hide();

  //For creating the board in brick breaker game
  board = createSprite(650,600,100,40);
  board.addImage(boardImg);
  board.scale = 0.5;
  board.visible = false;

  //For creating the ball in brick breaker game
  ball = createSprite(660,530,50,50);
  ball.addImage(ballImg);
  ball.scale=0.2;
  ball.visible = false;

  //All the things in angry birds games
  ground = new Ground(600,height,1200,20);
  platform = new Ground(150, 605, 300, 170);

  box1 = new Box(700,500,70,70);
  box2 = new Box(920,500,70,70);
  pig1 = new Pig(810, 5000);
  log1 = new Log(810,260,300, PI/2);

  box3 = new Box(700,500,70,70);
  box4 = new Box(920,500,70,70);
  pig3 = new Pig(810, 500);

  log3 =  new Log(810,180,300, PI/2);

  box5 = new Box(810,540,70,70);
  log4 = new Log(760,500,150, PI/7);
  log5 = new Log(870,500,150, -PI/7);

  bird = new Bird(200,50);    
  bird2 = new Bird(150,170);   
  bird3 = new Bird(100,170);     
  bird4 = new Bird(50,170);    

  birds.push(bird4)
  birds.push(bird3)
  birds.push(bird2)
  birds.push(bird)

  slingshot = new SlingShot(bird.body,{x:200, y:350});

  redBlockGroup = createGroup();

}//End of setup function

function draw() {
  background(startPageImg); 
  Engine.update(engine);


  //FUnctions to happen after start button is pressed
  startButton.mousePressed(function () {
  startButton.hide();
  rulesButton.hide();
  gameState = 1;
  });

  if(gameState === 1){
    background(secondPagebgImg);
    //For displaying all the buttons
    trexButton.show();
    angryBirdsButton.show();
    brickBreakerButton.show();
    spaceShooterButton.show();
  }

  angryBirdsButton.mousePressed(function () {   
      gameState = 2;

  });

  if(gameState === 2){
    background(bg);
    trexButton.hide();
    angryBirdsButton.hide();
    brickBreakerButton.hide();
    spaceShooterButton.hide();
    
    noStroke();
    textSize(35)
    fill("white")
    text("Score  " + score, width-300, 50)
    

    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();
 
    box5.display();
    log4.display();
    log5.display();

    bird.display();
    bird2.display();
    bird3.display();
    bird4.display();
    platform.display();
    //log6.display();
    slingshot.display();
 
  }//End of gamesState 2
  
 brickBreakerButton.mousePressed(function () {   
  gameState = 3;
  
 });

  if(gameState === 3){
   background(brickBreakerbackgroundImg)
   drawSprites();
   createEdgeSprites();
   trexButton.hide();
   angryBirdsButton.hide();
   brickBreakerButton.hide();
   spaceShooterButton.hide();

   //to make the ball stay in frame
   ball.bounceOff(rightEdge);
   ball.bounceOff(leftEdge);
   ball.bounceOff(topEdge);
   ball.bounceOff(plate)

   if(gameState === 3){
     textSize(20);
     fill("white");
     text("Press space to start",130,260)
    }
  
  
   if(keyDown("space")&& gameState ===3){
     ball.velocityX=-5;
     ball.velocityY=5;
     gameState = 4
    }

   verticalrow1(140);

   board.visible = true;
   ball.visible = true;

   board.x = mouseX

   if(gameState===4){
    

    if(ball.isTouching(redBlockGroup)){
      redBlockGroup.destroy();
    }

   }

  }//End of gameState 3



}//End of draw function
    
  
 

 

function mouseDragged(){
  //if (gameState!=="launched"){
      Matter.Body.setPosition(birds[birds.length-1].body, {x: mouseX , y: mouseY});
      Matter.Body.applyForce(birds[birds.length-1].body,birds[birds.length-1].body.position, {x:5, y:-5});
  //}    
  return false;
}

function mouseReleased(){
  slingshot.fly();
  birds.pop()           
  abgameState = "launched";
  return false;
}

function keyPressed(){
  if(keyCode === 32 && bird.body.speed < 1){
      if(birds.length>=0){
     //bird.trajectory = [];
     Matter.Body.setPosition(birds[birds.length-1].body, {x: 200 , y: 50});
     slingshot.attach(birds[birds.length-1].body);
   
  }
  }
}

function verticalrow1(y){
  var i
  var a
  for(i=1; i<=10; i++ ){
    RedBlock = createSprite(i*90+160,180, 50, 50)
    RedBlock.addImage(redBlock)
    RedBlock.scale = 0.3;  
    redBlockGroup.add(RedBlock)
   
    PurpleBlock = createSprite(i*90+160,y, 50, 50)
    PurpleBlock.addImage(purpleBlock)
    PurpleBlock.scale = 0.3;

    YellowBlock = createSprite(i*90+145,290, 50, 50)
    YellowBlock.addImage(yellowBlock)
    YellowBlock.scale = 0.3;

    for(a=1; a<=9; a++ ){
    BlueBlock = createSprite(a*100+145,345, 50, 50)
    BlueBlock.addImage(blueBlock)
    BlueBlock.scale = 0.3;
    }

    lBlueBlock = createSprite(i*90+155,390, 50, 50)
    lBlueBlock.addImage(skyBlueBlock)
    lBlueBlock.scale = 0.4;

    OrangeBlock = createSprite(i*90+160,240, 50, 50)
    OrangeBlock.addImage(orangeBlock)
    OrangeBlock.scale = 0.3;

    
  }
}