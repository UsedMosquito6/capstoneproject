// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// let dx = 0;
// let dy = 0;

let x, y;
let theta = 0;
let vx = 0;
let vy = 0;
let ay;
let friction = 0.99;

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
}

function displayShip() {
  push();
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
  if (keyIsDown(UP_ARROW)) {
    moveForward();
  }
  else {
    stopMoving();
  }
  if (keyIsDown(RIGHT_ARROW)) {
    theta += 4;
  }
  if (keyIsDown(LEFT_ARROW)) {
    theta -= 4;
  }
}

function moveForward() {
  x += vx;
  y += vy;
  vx += cos(theta) * 0.05;
  vy += sin(theta) * 0.05;
}

function stopMoving() {
  vx *= friction;
  vy *= friction;
  x += vx;
  y += vy;
  console.log(vx);
  console.log(vy);

}
