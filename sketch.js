// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x, y;
let r = 0;
let theta = 0;
let dx = 0;
let dy = 0;
let speed = 0;
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
    if (dx < 6 || dy < 6) {
      dx += 0.1;
      dy += 0.1;
    }
    x += cos(theta) * dx;
    y += sin(theta) * dy;
  }
  else {
    dx *= friction;
    dy *= friction;
    x += cos(theta) * dx;
    y += sin(theta) * dy;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    theta += 4;
  }
  if (keyIsDown(LEFT_ARROW)) {
    theta -= 4;
  }
}
