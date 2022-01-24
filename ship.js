/* global createCanvas, width, height, windowWidth, windowHeight, 
background, colorMode, HSB
rect, rectMode, ellipse, triangle, line, ellipseMode
CENTER, LEFT_ARROW, RIGHT_ARROW, UP_ARROW
stroke, noStroke, strokeWeight, fill
keyIsDown, keyCode, key, keyIsPressed
random
*/

//ship---------------------------------------
class SpaceShip {
  constructor(x, y, width, height) {
    //ship rect part
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.leftX = this.x - this.width/2;
    this.rightX = this.x + this.width/2;
    this.topY = this.y - this.height/2;
    this.speed = 6;
    this.origSpeed = this.speed;
    
    //ship triangle part
    this.nozzleHeight = 50;
    
    this.direction = null;
    
    //energy blasts
    this.blasts = [];
    
  }
    
  draw() {    
    this.leftX = this.x - this.width/2;
    this.rightX = this.x + this.width/2;
    this.topY = this.y - this.height/2;
    
    //pentagon 
    rectMode(CENTER);
    fill(50, 50, 90, 1);
    noStroke();
    rect(this.x, this.y, this.width, this.height);
    triangle(this.leftX, this.topY, this.rightX, this.topY, this.x, this.topY - this.nozzleHeight);
    
    //circles
    fill(20, 100, 100, 1);
    ellipseMode(CENTER);
    ellipse(this.x, this.y - 10, 50, 50);
    fill(200, 50, 100, 1);
    ellipse(this.x, this.y - 10, 40, 40);
    
    //triangles
    // right triangle: x: center + 40 & center + 20... y: 0 & 50
    fill(0, 100, 100, 1);
    let hWidth = this.width/2;
    let hHeight = this.height/2;
    let finWidth = 25;
    let finSpace = 10;
    
    triangle(this.x + hWidth, this.y + hHeight - finSpace, this.x + hWidth, this.y - hHeight, this.x + hWidth + finWidth, this.y + hHeight - finSpace);
    triangle(this.x - hWidth, this.y + hHeight - finSpace, this.x - hWidth, this.y - hHeight, this.x - hWidth - finWidth, this.y + hHeight - finSpace);

    stroke(20);
    fill(0);
    line(this.x, 0, this.x, this.topY - this.nozzleHeight);
  }
  
  update() {
    //cant go right when hit right wall
    if(!this.$hitRightWall()) {
      if(keyIsDown(RIGHT_ARROW)) {
        this.direction = "right";
        this.x += this.speed;
      }
      
    }
    //cant go left when hit left wall
    if(!this.$hitLeftWall()) {
      if(keyIsDown(LEFT_ARROW)) {
        this.direction = "left";
        this.x -= this.speed;
      }
    }
         
  }

  
  updateDrawBlasts() {
    for(let i = 0; i < this.blasts.length; i++) {
      let currBlast = this.blasts[i];
      currBlast.update();
      currBlast.draw();
      if(currBlast.y < 0) { 
        this.blasts.splice(i, 1);
        //i-- to not skip over the next element (which the index of moves back 1)
        i--;
      }
    }
  }
  
  
  $hitLeftWall() {
    if(this.leftX <= 0) return true;
    return false;
  }
  
  $hitRightWall() {
    if(this.rightX >= width) return true;
    return false;
    
  }

  
}

//energy blast class------------------------------
class EnergyBlast {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.diameter = 10;
    this.speed = 6;
    
  }
  
  update() {
    this.y -= this.speed;
  }
  
  draw() {
    noStroke();
    fill(50, 100, 100, 1);
    ellipse(this.x, this.y, this.diameter);
  }
}
