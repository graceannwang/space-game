/* global createCanvas, width, height, windowWidth, windowHeight, 
background, colorMode, HSB, color
rect, rectMode, ellipse, collideRectCircle,
CENTER, LEFT_ARROW, RIGHT_ARROW, UP_ARROW, CORNER, ESCAPE, LEFT, NORMAL
ITALIC
stroke, noStroke, strokeWeight, fill
keyIsDown, keyCode, key
random, ceil, floor
SpaceShip, InvaderShooter, EnergyBlast,
abs, text, textAlign, textSize, textStyle
*/

/*this version: 
  

*/

let bgdColor = 0;

let ship;
let shooter;

let tTimer;

let defense;

let points;

let timer;

//game states
let paused;
let gameOver;

function setup() {
  createCanvas(windowWidth, windowHeight);//creating canvas
  colorMode(HSB, 360, 100, 100, 1);
  
  //instantiating the battle objects
  ship = new SpaceShip(width/2, height - 25, 80, 51); 
  shooter = new InvaderShooter(3);
  
  timer = setInterval(incrementDefense, 1000);
  
  tTimer = new Timer(60);
  
  defense = 50;
  points = 0;
  
  paused = false;
  gameOver = false;
  
}

function draw() {
  if (!paused && !gameOver) {
    background(bgdColor);//background color
  
    //adds an invader if period is met
    shooter.addInvader();

    //checks for collisions
    collisions();

    //updates and draws blasts and invaders
    shooter.updateDrawInvaders();
    ship.updateDrawBlasts();

    //solely the ship
    ship.update();
    ship.draw();

    //draws the stats
    drawStats();

    tTimer.update();
    
    updateGameOver();
  }
  else if (gameOver) {
     drawGameOver(); 
  }
  
  
  
}

//checks invader blast collisions and removes objects when collided
function collisions() {
  let blasts = ship.blasts;
  let invaders = shooter.invaders;
  for(let i = 0; i < blasts.length; i++) {
    for(let j = 0; j < invaders.length; j++) {
      let moveToNextBlast = false;
      let currBlast = blasts[i];
      let currInvader = invaders[j];
      rectMode(CORNER);
      let col = collideRectCircle(currInvader.x, currInvader.y, currInvader.width, currInvader.height, 
                                 currBlast.x, currBlast.y, currBlast.diameter);
      if(col) {
        points += 5;
        blasts.splice(i, 1);
        i--;
        invaders.splice(j, 1);
        moveToNextBlast = true;
      }
      if(moveToNextBlast) break;
      
    }
  }
  
}

function updateGameOver() {
  if(defense <= 0) { 
    gameOver = true;
  }
  else {
    gameOver = false;
  }
}

function drawStats() {
  fill("white");
  textSize(15);
  textAlign(LEFT);
  textStyle(NORMAL);
  text("Points: " + points, width - 160, 30);
  text("Planet Defense: " + defense + "%", width - 160, 60);
  text("Speed: " + ship.speed, width - 160, 90);

}

function drawPaused() {
  fill ("white");
  textStyle(ITALIC);
  text("PAUSED", 20, 30)
}

function drawGameOver() {
  background(color(360, 80, 70, 1));
  textAlign(CENTER);
  textSize(40);
  stroke(5);
  text("PLANET DESTROYED", width/2, height/2);
}

function incrementDefense() {
  if(defense < 100) {
    defense++;
  }
}

function reset() {
  paused = false;
  gameOver = false;
  defense = 100;
}

function spacebarHit() {
  if(paused === false) {
    paused = true;
    drawPaused();
    clearTimeout(timer);
  }
  else {
    paused = false;
    timer = setInterval(incrementDefense, 1000);
  }

}

class Timer {
  constructor(fr) {
    this.frameRate = fr;
    this.frameCounter = 0;
  }
  
  update() {
    //should be called every frame
    this.frameCounter++;
  }
  
  reset() {
    this.frameCounter = 0;
  }
  
  stop() {
    //needs to be called every frame with update
    this.frameCounter--;
  }
  
  getSeconds() {
    return this.frameCounter/this.frameRate;
  }
  
  getWholeSeconds() {
    return ceil(this.frameCounter/this.frameRate);
  }
  
  secondsPassed(inSeconds) {
    //cannot take decimal numbers unless number is less than 1
    if(inSeconds >= 1) {
      if(abs(inSeconds) === this.getWholeSeconds()) {
        return true;
      } 
      return false;
    }
    else {
      //not exact. very not exact. Assumes decimals work in 120s 
      let newInSeconds = 100*inSeconds;
      let frSeconds = ceil(newInSeconds/2);
      if(frSeconds === this.frameCounter) return true;
      return false;
    }
    return false;
  }
  
}

//mouse key events----------------------------
function keyPressed() {
  if(keyCode === UP_ARROW) {
    let newEB = new EnergyBlast(ship.x, ship.y - ship.height/2 - ship.nozzleHeight);
    ship.blasts.push(newEB);
  }
  if(gameOver && (keyCode === ESCAPE)) {
    reset();
    shooter.reset();
  }
  if(key === 'q') {
    console.log(tTimer.secondsPassed(6)); 
    console.log(shooter.getInvaderCount());
  }
  if(key === 's') {
    ship.speed = 2.4;
  }
  else if(key === 'f') {
    ship.speed = 9.6;
  }
  if(key === " ") {
    spacebarHit();
  }
  
}

function keyReleased() {
  if(key === 's') {
    ship.speed = 6;
  }
  if(key === 'f') {
    ship.speed = 6;
  }
}
