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

let shipColorCounter = 0;
let shipColor = ["white", "red", "orange", "yellow", "green", "blue", "indigo", "violet"];
let startButton, colorButton, difficultyButton;
let difficultyWord = "easy";

let start = false;
let gameOver = false;
let cheats = false;

let points = 0;
let lives = 3;
let difficulty = 3;

let bg, bg2, bg3;
let whiteS, redS, orangeS, yellowS, greenS, blueS, indigoS, violetS;
let asteroid4, asteroid3, asteroid2, asteroid1;



//----------------------------------------------------------------------------------------------------------------------------------------------------------------------



function preload() {
  bg =  loadImage("assets/stars.jpg");
  bg2 = loadImage("assets/space.gif");
  bg3 = loadImage("assets/blue-space.jpg");
  whiteS = loadImage("assets/ship.png");
  redS = loadImage("assets/red.png");
  orangeS = loadImage("assets/orange.png");
  yellowS = loadImage("assets/yellow.png");
  greenS = loadImage("assets/green.png");
  blueS = loadImage("assets/blue.png");
  indigoS = loadImage("assets/indigo.png");
  violetS = loadImage("assets/violet.png");
  asteroid4 = loadImage("assets/asteroid4.png");
  asteroid3 = loadImage("assets/asteroid3.png");
  asteroid2 = loadImage("assets/asteroid2.png");
}

function setup() {
  createCanvas(800, 600);
  angleMode(DEGREES);
  imageMode(CENTER);
}

function draw() {
  // Background (Title Screen)
  image(bg, width/2, height/ 2, 800, 800);
  // Call GameOver
  if (gameOver === true && cheats === false) {
    gameOverScreen(points, difficulty);
  }
  else {
    // Call startScreen
    startScreen();
    if (start === true) {
      // Background (In Game)
      image(bg, width/2, height/ 2, 800, 800);
      // Display Asteroids
      for (let asteroid of asteroidArray) {
        asteroid.display();
        asteroid.move();
      }
      // Display Bullets
      for (let bullet of bulletArray) {
        bullet.display();
        bullet.move();
      }
      // Removing Bullets and Asteroids After Collision
      let hasRemovedSomething = false;
      for (let i = bulletArray.length - 1; i>=0; i--){
        for (let j = asteroidArray.length - 1; j>=0; j--){
          if (!hasRemovedSomething && checkCollision(bulletArray[i], asteroidArray[j])) {
            points += 1;
            asteroidArray.splice(j, 1);
            bulletArray.splice(i, 1);
            hasRemovedSomething = true;
          }
        }
      }
      checkShipCollision();
      moveShip();
      displayShip();
      checkIfOnScreen();
      displayPoints();
      spawnAsteroids();
      checkLives();
      displayLives();
    }
  }
}



// Ship ----------------------------------------------------------------------------------------------------------------------------------------------------------------------



// Display Ship
function displayShip() {
  let shipColors = [whiteS, redS, orangeS, yellowS, greenS, blueS, indigoS, violetS];
  push();
  fill("#78C7FB");
  stroke("#2486C7");
  translate(x, y);
  rotate(theta);
  if (thrust === true) {  // Rocket flame
    beginShape();
    vertex(0,0);
    vertex(-5,-3);
    vertex(-20,0);
    vertex(-5,3);
    endShape();
  }
  // beginShape();  // Ship
  // vertex(15, 0);
  // vertex(-15, 10);
  // vertex(-5, 0);
  // vertex(-15, -10);
  // vertex(15, 0);
  // endShape();

  //circle(0, 0, 28);
  image(shipColors[shipColorCounter], 0, 0, 35, 35);
  pop();
}

// Move Ship
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

// Check Ship Collision With Asteroids 
function checkShipCollision () {
  for (let asteroid of asteroidArray) {
    let distanceBetween = dist(x, y, asteroid.x, asteroid.y);
    let radiSum = 14 + asteroid.radius;
    if (distanceBetween < radiSum) {
      lives -= 1;
      asteroidArray.splice(0, asteroidArray.length);
      x = width / 2;
      y = height / 2;
      vx = 0;
      vy = 0;
      theta = 0;
    }
  }
}

// Ship Acceleration
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

// Apply Friction
function stopMoving() {
  vx *= friction;
  vy *= friction;
  x += vx;
  y += vy;
}

// Check Live Count
function checkLives() {
  if (lives === 0) {
    gameOver = true;
  }
}



//----------------------------------------------------------------------------------------------------------------------------------------------------------------------



// Bullet Constructor
class Bullet {
  constructor(x, y){
    this.bx = x;
    this.by = y;
    this.totalX = 0;
    this.totalY = 0;
    this.radius = 2;
    this.dx = cos(theta) * bSpeed;
    this.dy = sin(theta) * bSpeed;
  }
  display() {
    noStroke();
    fill(shipColor[shipColorCounter]);
    circle(this.bx, this.by, this.radius * 2);
  }
  move() {
    this.bx += this.dx;
    this.by += this.dy;
    this.totalX += this.dx;
    this.totalY += this.dy;
    if (this.totalX > 550 || this.totalX < -550 || this.totalY > 550 || this.totalY < -550) {
      bulletArray.shift();
    }
  }
}

// Shoot
function keyPressed() { //Shoot   
  if (keyCode === 32) {
    let myBullet = new Bullet(x, y);
    bulletArray.push(myBullet);
  }
}



//Asteroids ----------------------------------------------------------------------------------------------------------------------------------------------------------------------



// Asteroid Constructor
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
    this.size = 3;
    this.r = 5;
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
    noFill();
    noStroke();
    // this.r += 5;
    push();
    // translate(this.x, this.y);
    // rotate(this.r);
    if (this.size === 3) {
      circle(this.x, this.y, this.radius * 2);
      image(asteroid4, this.x, this.y, this.radius * 2, this.radius * 2);
    }
    else if (this.size === 2) {
      image(asteroid3, this.x, this.y, this.radius, this.radius);
    }
    else {
      image(asteroid2, this.x, this.y, this.radius / 2, this.radius / 2);
    }
    pop();
  }
  move() {
    this.x += this.dx;
    this.y += this.dy;
  }
}

// Spawn Asteroids every (difficulty * 50) frames
function spawnAsteroids() {
  if (frameCount % (difficulty * 50) === 0) {
    for (let i = 0; i < 5; i++) {
      let myAsteroid = new Asteroid();
      asteroidArray.push(myAsteroid);
    }
    for (let c = asteroidArray.length-1; c > asteroidArray.length - 6; c--) {
      asteroidArray[c].side();
    }
  }
}



//----------------------------------------------------------------------------------------------------------------------------------------------------------------------



// Mouse Pressed for Buttons
function mousePressed() {
  if (startButton.checkIfInside(mouseX, mouseY) && gameOver === false && start === false) {
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
    if (shipColorCounter < 7) {
      shipColorCounter++;
    }
    else {
      shipColorCounter = 0;
    }
  }
}

// Check Bullet and Asteroid Colision
function checkCollision(bullet, asteroid) {
  let distanceBetween = dist(bullet.bx, bullet.by, asteroid.x, asteroid.y);
  let radiSum = bullet.radius + asteroid.radius;
  if (distanceBetween < radiSum) {
    return true;
  }
}

// Check if Any Object is Off Screen
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
    if (bullet.bx > width) {
      bullet.bx = 0;
    }
    if (bullet.bx < 0) {
      bullet.bx = width;
    }
    if (bullet.by > height) {
      bullet.by = 0;
    }
    if (bullet.by < 0) {
      bullet.by = height;
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

// Display Lives
function displayLives() {
  let shipColors = [whiteS, redS, orangeS, yellowS, greenS, blueS, indigoS, violetS];
  for (let i = 0; i < lives; i++){
    push();
    image(shipColors[shipColorCounter], i *30 + 25, 25, 35, 35);
    rotate(45);
    pop();
  }
}



// Taken From Snake----------------------------------------------------------------------------------------------------------------------------------------------------------------------



// Display Points
function displayPoints() {
  fill("white");
  textSize(50);
  textAlign(CENTER, CENTER);
  text(str(points), width/2, 25);
}

// Button Constructor
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

// Display Title and  Call Buttons
function startScreen() {
  titleText("Astro Shooter");
  startButton = new Button (250, "Start");
  startButton.display();
  difficultyButton = new Button (325, "Difficulty: " + difficultyWord);
  difficultyButton.display();
  colorButton = new Button (400, "Color: " + str(shipColor[shipColorCounter]));
  colorButton.display();
  //shipPreview();
}

// Game Over Screen
function gameOverScreen(endPoints, difficulty) {
  titleText("Game Over");
  fill(color("#B7C3CD"));
  textSize(30);
  textAlign(CENTER, CENTER);
  text("Points: " + str(points), width/2, 250 + 25);
  text("Difficulty: " + difficultyWord, width/2, 300 + 25);
}

// Title Text
function titleText(words) {
  fill(color("#B7C3CD"));
  stroke(color("#B7C3CD"));
  textSize(75);
  textAlign(CENTER, CENTER);
  text(str(words), width/2, 200);
}