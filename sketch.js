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

function setup() {
  createCanvas(800, 600);
  angleMode(DEGREES);
}

function draw() {
  background(bgColor);
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
        splice(asteroidArray, asteroidArray[j]);
      }
    }
  }
  moveShip();
  displayShip();
  checkIfOnScreen();
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
}

function checkBulletColision(bullet, asteroid) {
  let distanceBetween = dist(bullet.x, bullet.y, asteroid.x, asteroid.y);
  let radiSum = bullet.radius + asteroid.radius;
  if (distanceBetween < radiSum) {
    return true;
  }
}

