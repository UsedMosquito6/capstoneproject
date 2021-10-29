// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let bgColor = "black";
let x = 400;
let y = 300;
let ay;
let theta = 0;
let vx = 0;
let vy = 0;
let thrust = false;
let friction = 0.99;
let maxSpeed = 8;
 
let bSpeed = 8;
let bulletArray = [];
let asteroidArray= [];
let hit = false;

let points = 0;
let shipColor = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
let shipColorCounter = 0;
let startButton, colorButton, difficultyButton;
let difficultyWord = "easy";

let start = false;
let gameOver = false;
let cheats = false;
let difficulty = 3;
let bg, bg2, bg3;


function preload() {
  bg =  loadImage("assets/stars.jpg");
  bg2 = loadImage("assets/space.gif");
  bg3 = loadImage("assets/blue-space.png");
}



function setup() {
  createCanvas(800, 600);
  angleMode(DEGREES);
  imageMode(CENTER);
}

function draw() {
  image(bg, width/2, height/ 2, 800, 800);
  if (gameOver === true && cheats === false) {
    gameOverScreen(points, difficulty);
  }
  else {
    startScreen();
    if (start === true) {
      image(bg3, width/2, height/ 2, 800, 800);
      //background(bgColor);
      for (let asteroid of asteroidArray) {
        asteroid.display();
        asteroid.move();
      }
      for (let bullet of bulletArray) {
        bullet.display();
        bullet.move();
      }
      for (let i = 0; i<bulletArray.length; i++){
        for (let j = 0; j < asteroidArray.length; j++){
          if (checkBulletColision(bulletArray[i], asteroidArray[j])) {
            points += 1;
            asteroidArray.splice(j, 1);
            //bulletArray.splice(i, 1);
          }
        }

      }
      moveShip();
      displayShip();
      checkIfOnScreen();
      displayPoints();
    }
  }
}

function displayShip() {
  push();
  fill("white");
  translate(x, y);
  rotate(theta);
  if (thrust === true) {  // Rocket flame
    beginShape();
    vertex(0,0);
    vertex(-5,-5);
    vertex(-15,0);
    vertex(-5,5);
    endShape();
  }
  beginShape();  // Ship
  vertex(15, 0);
  vertex(-15, 10);
  vertex(-5, 0);
  vertex(-15, -10);
  vertex(15, 0);
  endShape();
  pop();
}

function moveShip() { 
  if (keyIsDown(RIGHT_ARROW)) {
    theta += 4;
  }
  if (keyIsDown(LEFT_ARROW)) {
    theta -= 4;
  }
  if (keyIsDown(UP_ARROW)) {
    moveForward();
    thrust = true;
  }
  else {
    stopMoving();
    thrust = false;
  }
}

function moveForward() {
  x += vx;
  y += vy;
  vx += cos(theta) * 0.05;
  vy += sin(theta) * 0.05;
  // if (vx > maxSpeed) {
  //   vx = maxSpeed;
  // }
  // if (vx < -5) {
  //   vx = -maxSpeed;
  // }
  // if (vy > maxSpeed) {
  //   vy = maxSpeed;
  // }
  // if (vy < -maxSpeed) {
  //   vy = -maxSpeed;
  // }
}

function stopMoving() {
  vx *= friction;
  vy *= friction;
  x += vx;
  y += vy;
}

function checkIfOnScreen() {
  if (x > width) {
    x = 0;
  }
  if (x < 0) {
    x = width;
  }
  if (y > height) {
    y = 0;
  }
  if (y < 0) {
    y = height;
  }
  for (let bullet of bulletArray) {
    if (bullet.x > width) {
      bullet.x = 0;
    }
    if (bullet.x < 0) {
      bullet.x = width;
    }
    if (bullet.y > height) {
      bullet.y = 0;
    }
    if (bullet.y < 0) {
      bullet.y = height;
    }
  }
  for (let asteroid of asteroidArray) {
    if (asteroid.x > width + asteroid.radius) {
      asteroid.x = 0;
    }
    if (asteroid.x < 0 - asteroid.radius) {
      asteroid.x = width;
    }
    if (asteroid.y > height + asteroid.radius) {
      asteroid.y = 0;
    }
    if (asteroid.y < 0 - asteroid.radius) {
      asteroid.y = height;
    }
  }
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------

class Bullet {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.totalX = 0;
    this.totalY = 0;
    this.radius = 3;
    this.color = "white";
    this.dx = cos(theta) * bSpeed;
    this.dy = sin(theta) * bSpeed;
  }
  display() {
    stroke("black");
    fill(this.color);
    circle(this.x, this.y, this.radius * 2);
  }
  move() {
    this.x += this.dx;
    this.y += this.dy;
    this.totalX += this.dx;
    this.totalY += this.dy;
    if (this.totalX > 550 || this.totalX < -550 || this.totalY > 550 || this.totalY < -550) {
      bulletArray.shift();
    }
  }
}

function keyPressed() { //Shoot   
  if (keyCode === 32) {
    let myBullet = new Bullet(x, y);
    bulletArray.push(myBullet);
  }
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------

class Asteroid {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.radius = 25;
    this.color = "grey";
    this.angle = random(360);
    this.randomSide = round(random(1,4));
    this.dx = cos(this.angle) * 2;
    this.dy = sin(this.angle) * 2;
  }
  side() {
    if (this.randomSide === 1) {
      this.x = random(width);
      this.y = 0 - this.radius;
    }
    if (this.randomSide === 2) {
      this.x = width + this.radius;
      this.y = random(height);
    }
    if (this.randomSide === 3) {
      this.x = random(width);
      this.y = height + this.radius;
    }
    if (this.randomSide === 4) {
      this.x = 0 - this.radius;
      this.y = random(height);
    }
  }
  display() {
    stroke("black");
    fill(this.color);
    circle(this.x, this.y, this.radius * 2);
  }
  move() {
    this.x += this.dx;
    this.y += this.dy;
  }
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------

function mousePressed() {
  for (let i = 0; i < 5; i++) {
    let myAsteroid = new Asteroid();
    asteroidArray.push(myAsteroid);
  }
  for (let asteroid of asteroidArray) {
    asteroid.side();
  }
  if (startButton.checkIfInside(mouseX, mouseY) && gameOver === false && start === false) {
    //snakeFramerate = difficulty * 5;
    start = true;
  }
  if (difficultyButton.checkIfInside(mouseX, mouseY) && difficulty > 1 && gameOver === false && start === false) {
    difficulty -= 1;
    if (difficulty === 1) {
      difficultyWord = "hard";
    }
    if (difficulty === 2) {
      difficultyWord = "medium";
    }
    if (difficulty === 3) {
      difficultyWord = "easy";
    }
  }
  else if (difficultyButton.checkIfInside(mouseX, mouseY) && gameOver === false && start === false) {
    difficulty = 3;
    if (difficulty === 1) {
      difficultyWord = "hard";
    }
    if (difficulty === 2) {
      difficultyWord = "medium";
    }
    if (difficulty === 3) {
      difficultyWord = "easy";
    }
  }
  if (colorButton.checkIfInside(mouseX, mouseY) && gameOver === false && start === false) {
    if (shipColorCounter < 6) {
      shipColorCounter++;
    }
    else {
      shipColorCounter = 0;
    }
  }
}

function checkBulletColision(bullet, asteroid) {
  let distanceBetween = dist(bullet.x, bullet.y, asteroid.x, asteroid.y);
  let radiSum = bullet.radius + asteroid.radius;
  if (distanceBetween < radiSum) {
    return true;
  }
}

// Taken From Snake----------------------------------------------------------------------------------------------------------------------------------------------------------------------

function displayPoints() {
  fill("white");
  textSize(50);
  textAlign(CENTER, CENTER);
  text(str(points), width/2, 25);
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------

class Button {
  constructor(y, text) {
    this.y = y;
    this.text = text;
    this.tColor = "#B7C3CD";
    this.dark = "#404E5C";
    this.light = "#4F6272";
  }

  display() {
    if (this.checkIfInside(mouseX, mouseY)) {
      fill(color(this.light));
    }
    else {
      fill(color(this.dark));
    }
    rect (width/2 -125, this.y, 250, 50);
    fill(color(this.tColor));
    textSize(30);
    textAlign(CENTER, CENTER);
    text(this.text, width/2, this.y + 25);
  }

  checkIfInside(x, y) {
    return x >= width/2 -100 && x <= width/2 -100 + 200 && y >= this.y &&  y <= this.y + 50;
  }
}

function startScreen() {
  titleText("Astro Shooter");
  startButton = new Button (250, "Start");
  startButton.display();
  difficultyButton = new Button (325, "Difficulty: " + difficultyWord);
  difficultyButton.display();
  colorButton = new Button (400, "Color: " + str(shipColor[shipColorCounter]));
  colorButton.display();
}

function gameOverScreen(endPoints, difficulty) {
  titleText("Game Over");
  fill(color("#B7C3CD"));
  textSize(30);
  textAlign(CENTER, CENTER);
  text("Points: " + str(points), width/2, 250 + 25);
  text("Difficulty: " + difficultyWord, width/2, 300 + 25);
}

function titleText(words) {
  fill(color("#B7C3CD"));
  stroke(color("#B7C3CD"));
  textSize(75);
  textAlign(CENTER, CENTER);
  text(str(words), width/2, 200);
}