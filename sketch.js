// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x, y, ay;
let theta = 0;
let vx = 0;
let vy = 0;
let friction = 0.99;
let maxSpeed = 8;
let bSpeed = 8;
let shotX;
let shotY;
let ballArray = [];


function setup() {
  createCanvas(800, 600);
  angleMode(DEGREES);
  x = width / 2;
  y = height /2;
  
}

function draw() {
  background(220);
  moveShip();
  displayShip();
  checkIfOnScreen();
  displayBall();
  moveBall();
}

function displayShip() {
  push();
  fill("white");
  translate(x, y);
  rotate(theta);
  beginShape();
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
  }
  else {
    stopMoving();
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
  for (let ball of ballArray) {
    if (ball.bx > width) {
      ball.bx = 0;
    }
    if (ball.bx < 0) {
      ball.bx = width;
    }
    if (ball.by > height) {
      ball.by = 0;
    }
    if (ball.by < 0) {
      ball.by = height;
    }
  }
}

function spawnBall() {    //Bullet Array
  push();
  translate (x, y);
  let newBall = {
    bx: 0,
    by: 0,
    totalX: 0,
    totalY: 0,
    radius: 5,
    ballColor: "grey",
    changeX : cos(theta) * bSpeed,
    changeY : sin(theta) * bSpeed,
  };
  ballArray.push(newBall);    
  pop();
}

function displayBall() {
  for (let ball of ballArray) {
    fill(ball.ballColor);
    circle(ball.bx, ball.by, ball.radius);
  }
}

function moveBall() {
  for (let theBall of ballArray) {
    theBall.bx += theBall.changeX;
    theBall.by += theBall.changeY;
    theBall.totalX += theBall.changeX;
    theBall.totalY += theBall.changeY;
    if (theBall.totalX > 550 || theBall.totalX < -550 || theBall.totalY > 550 || theBall.totalY < -550) {
      ballArray.shift();
    }
  }
}
//When I added this function, I couldnt move and shoot at the same time
function keyPressed() { //Shoot   
  if (keyCode === 32) {
    spawnBall();
    ballArray[ballArray.length-1].bx = x;
    ballArray[ballArray.length-1].by = y;
  }
}