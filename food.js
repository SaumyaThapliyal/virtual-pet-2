class Food{
constructor(){
  this.foodStock = 0;
  this.lastFed = 0;
  this.milk = loadImage("Images/Milk.png");
}
display(){
    var x=80,y=100

    imageMode(CENTER);
    image(this.milk,720,220,70,70);

    if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
            if(i%10==0){
                x=80;
                y=y+50;
        }
        image(this.milk,x,y,50,50);
        x=x+30;
    }

}
}
updateFoodStock(food){
    this.foodStock = food;
}
getFoodStock(){
    return this.foodStock;
}
deductFood(){
    if(this.foodStock>0){
        this.foodStock -= 1;
    }
}
getFedTime(lastFed){
    this.lastFed = lastFed;
}
}