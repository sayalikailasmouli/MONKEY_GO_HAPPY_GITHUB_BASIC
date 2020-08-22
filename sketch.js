var monkey, monkey_running, banana_img, obstacle_img;

var invisible_ground;

var score = 0;

var food_group, obstacle_group;

function preload()
{
 monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
 
// back_img = loadImage("jungle.png");

 banana_img = loadImage("banana.png");
 
 obstacle_img = loadImage("stone.png");
  
}

function setup() 
{
  createCanvas(600,400);
  
  ground = createSprite(0,378,800,20);
  ground.velocityX = -5;
  ground.shapeColor = "black";
  
  invisible_ground = createSprite(300,380,800,17);
  invisible_ground.visible = false;

  monkey = createSprite(75,320,20,20);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.02 ;
              
  food_group = new Group();
  obstacle_group = new Group();
  
  //setting the text
  textFont("Arial");
  textStyle(BOLD);
  textSize(20);
  fill("white");
}

function draw() 
{
  background(rgb(34,139,34));
  
  if(ground.x < 300)
  {
    ground.x = ground.width /2;
  }
  
  if(keyDown("space") && monkey.y > 320)
  {
    monkey.velocityY = -17;
  }
  
  monkey.velocityY = monkey.velocityY +  0.8;
  
  banana_food();  
  
  if(monkey.isTouching(food_group))
  {
    score = score + 2;
    food_group.destroyEach();
    
    var scored = score;
    switch(scored)
    {
      case 4:  monkey.scale = 0.04;
               break;

      case 12: monkey.scale = 0.08;
               break;
               
      case 20: monkey.scale = 0.11;
               break;
               
      case 30: monkey.scale = 0.14;
               break;
               
      case 40: monkey.scale = 0.15;
               break;
               
      case 56: monkey.scale = 0.17;
               break;
               
      default: break;
    }
  } 
  
  if(monkey.isTouching(obstacle_group))
  {
    monkey.scale = 0.02;
    score = 0;
  }
  
  spawnRocks();
  
  monkey.collide(invisible_ground);
    
  drawSprites();
  text("Score: " + score ,425,50);
}

function banana_food()
{
  if(frameCount % 90 === 0)
  {
    //creating banana sprite
    var banana = createSprite(600,200);
    
    //setting where it will appear
    banana.y = random(120,200);
    
    //setting animation
    banana.addImage("Banana", banana_img);
    
    //scaling banana
    banana.scale = 0.05;
    
    //making banana move with the screen
    banana.velocityX = -6;
    
    //setting lifetime for banana
    banana.lifetime = 100;
    
    //adding the variable banana to group created for this sprite
    food_group.add(banana);
  }
}

function spawnRocks() {
  if(frameCount % 100 === 0) {
    
    //creating variable rock
    var rock = createSprite(600,350);

    //giving animation to rock
    rock.addAnimation("Stone", obstacle_img);
    
    //setting velocity for the rock
    rock.velocityX = random(-10,-15);
    
    //scaling the rock           
    rock.scale = 0.25;
    
    //setting lifetime for rock
    rock.lifetime = 120;        
    
    //add each obstacle to the group
    obstacle_group.add(rock);
  }
}
