var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var lastFed,fedTime;
var feed,addFood;
var foodObj;

function preload(){
   dogImg=loadImage("Images/Dog.png");
   dogImg1=loadImage("Images/happy dog.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1000,400);
  foodObj = new Food();
  dog=createSprite(800,200,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  feed = createButton("FEED THE DOG");
  feed.position(650,95);
  feed.mousePressed(feedDog);

  addFood = createButton("ADD THE FOOD");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(30); 
}

// function to display UI
function draw() {
  background(160, 0, 253);

  foodObj.display();
  fedTime = database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  fill(255,255,255);
  textSize(15);
  if(lastFed>=12){
  text("LAST FEED: "+lastFed % 12+"pm",350,30);
  }
   else if(lastFed==0){
    text("LAST FEED: 12am",350,30);
   }

   else{
    text("LAST FEED: "+lastFed+"am",350,30);
   }
 

  drawSprites();

}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(dogImg1);
  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }
  else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour(),
  })
}

function addFoods(){
  foodS++
  database.ref('/').update({
  Food:foodS
  })
}
