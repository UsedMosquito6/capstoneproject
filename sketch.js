// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x, y;
let theta = 0;
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
  vertex(20, 0);
  vertex(-10, 10);
  vertex(0, 0);
  vertex(-10, -10);
  vertex(20, 0);
  endShape();
  pop();
}

function moveShip() {
  if (keyIsDown(UP_ARROW)) {
    if (speed < 5) {
      speed += 0.1;
    }
    x += cos(theta) * speed;
    y += sin(theta) * speed;
  }
  else {
    speed *= friction;
    speed *= friction;
    x += cos(theta) * speed;
    y += sin(theta) * speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    theta += 4;
  }
  if (keyIsDown(LEFT_ARROW)) {
    theta -= 4;
  }
}
