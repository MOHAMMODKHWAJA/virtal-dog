var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var feed,lastFed;
var foodObj;
var feedthedog;
var time1;
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(850,95);
  addFood.mousePressed(addFoods);
 
  feedthedog=createButton("Feed The Dog");
  feedthedog.position(750,95);
  feedthedog.mousePressed(feedDog);
 

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  var time1 =database.ref('Feedtime') ;
 time1.on("value",function(data){
   time1 = data.val();
 })
  //write code to display text lastFed time here
fill(255,255,254);
 textSize(20);
 if(time1>=12){
text("Last Feed:"+ time1%12 + "PM",350,30);
 }else if(time1===0){
text("Last Feed:12AM",350,30);
 }else{
  text("Last Feed:"+ time1 + "AM",350,30);
 }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
var foodStockval =  foodObj.getFoodStock();
if (foodStockval<=0){
  foodObj.updateFoodStock(foodStockval*0);
}else{
  foodObj.updateFoodStock(foodStockval -1);
}
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  Feedtime:hour()
})
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
