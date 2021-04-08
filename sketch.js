

var balloon, backgroundImg;
var position;
var balloonImg1,balloonImg2,balloonImg3;
var x, y;

function preload(){
  backgroundImg = loadImage("images/background.png");
  balloonImg1 = loadImage("images/balloon1.png");
  balloonImg2 = loadImage("images/balloon2.png");
  balloonImg3 = loadImage("images/balloon3.png");
}

function setup(){
  database = firebase.database();
  //console.log(database);
  createCanvas(800,800);
  //readPosition();

  balloon = createSprite(200, 400, 50, 50);
  balloon.addImage("b1",balloonImg1);
  balloon.scale = 0.7;

  var balloonPosition = database.ref('ball/position');
  balloonPosition.on("value", updatePosition, showError);
}

function draw(){
   
  if(backgroundImg){
      background(backgroundImg);
  }  


  if(keyDown(LEFT_ARROW)){
      writePosition(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(+10,0);
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-10);
    balloon.addImage("b2", balloonImg2);
    balloon.scale=balloon.scale+0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,+10);
    balloon.addImage("b3", balloonImg3);
    balloon.scale=balloon.scale-0.005;
  }
      drawSprites();
    
}

function writePosition(x,y){
  console.log(position.x);
  database.ref('ball/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function updatePosition(data){
  position = data.val();
  console.log(position);
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}

