/* global createCanvas, width, height, windowWidth, windowHeight, 
background, colorMode, HSB
rect, rectMode, ellipse, collideRectCircle,
CENTER, LEFT_ARROW, RIGHT_ARROW, UP_ARROW, CORNER
stroke, noStroke, strokeWeight, fill
keyIsDown, keyCode, key
random, ceil, floor
SpaceShip, InvaderShooter, EnergyBlast,
abs, defense, ship
*/

//shooter class---------------------------------------
class InvaderShooter {
  constructor(period) {
    this.period = period;
    this.frameCounter = 0;
    this.invaders = [];
  }
  
  addInvader() {
    let combinedCount = 60*this.period;
    if(this.frameCounter%combinedCount === 0) {
      let newInvaderX = random(ship.width/2, width - ship.width/2);
      let newInvaderY = -5;
      this.invaders.push(new Invader(newInvaderX, newInvaderY));
    }
    this.frameCounter++;
    
  }
  
  updateDrawInvaders() {
    for(let i = 0; i < this.invaders.length; i++) {
      let currInvader = this.invaders[i];
      currInvader.update();
      currInvader.draw();
      if(currInvader.y > height) { 
        defense -= 10;
        this.invaders.splice(i, 1);
      }
    }
  }
  
  getInvaderCount() {
    return this.invaders.length;
  }
  
  reset() {
    this.invaders = [];
  }
  
}

//invader class---------------------------------------------
class Invader {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = this.width/3;
    this.speed = 1;
  }
  
  draw() {
    rectMode(CORNER);
    fill(0, 100, 100, 1);
    rect(this.x, this.y, this.width, this.height);
  }
  
  update() {
    this.y += this.speed;
  }
  
}
