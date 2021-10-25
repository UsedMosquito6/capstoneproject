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
let asteroidArray= [];
let thrust = false;
let side;

function setup() {
  createCanvas(800, 600);
  angleMode(DEGREES);
  x = width / 2;
  y = height /2;
}

function draw() {
  background(220);

  displayBall();
  moveBall();

  displayAsteroid();
  moveAsteroid();

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

function moveShip() { // Movement
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
  if (keyIsDown(49)) {
    spawnAsteroid();
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

function spawnBall() {  //Bullet Array
  push();
  translate (x, y);
  let newBall = {
    bx: 0,
    by: 0,
    totalX: 0,
    totalY: 0,
    radius: 3,
    ballColor: "grey",
    changeX: cos(theta) * bSpeed,
    changeY: sin(theta) * bSpeed,
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

function keyPressed() { //Shoot   
  if (keyCode === 32) {
    spawnBall();
    ballArray[ballArray.length-1].bx = x;
    ballArray[ballArray.length-1].by = y;
  }
}



function spawnAsteroid() {  //Asteroid Array
  let newAsteroid = {
    x: 0,
    y: 0,
    radius: 50,
    asteroidColor: "grey",
    side: round(random(1,4)),
    changeX: cos(random(360)) * 2,
    changeY: sin(random(360)) * 2,
  };
  for (let asteroid of asteroidArray) {
    if (asteroid.side === 1) {
      asteroid.x = random(width);
      asteroid.y = 0 - asteroid.radius;
    }
    if (asteroid.side === 2) {
      asteroid.x = width + asteroid.radius;
      asteroid.y = random(height);
    }
    if (asteroid.side === 3) {
      asteroid.x = random(width);
      asteroid.y = height + asteroid.radius;
    }
    if (asteroid.side === 4) {
      asteroid.x = 0 - asteroid.radius;
      asteroid.y = random(height);
    }
  }
  asteroidArray.push(newAsteroid);    
}

function displayAsteroid() {
  for (let i = 0; i<ballArray.length; i++){
    for (let j = 0; j < asteroidArray.length; j++){
      checkColisionWith(asteroidArray[j], ballArray[i]);
    }
  }
  for (let asteroid of asteroidArray) {
    fill(asteroid.asteroidColor);
    circle(asteroid.x, asteroid.y, asteroid.radius);
  }
}

function moveAsteroid() {
  for (let theAsteroid of asteroidArray) {
    theAsteroid.x += theAsteroid.changeX;
    theAsteroid.y += theAsteroid.changeY;
  }
}

function checkColisionWith(asteroid, ball) {
  let distanceBetween = dist(ball.x, ball.y, asteroid.x, asteroid.y);
  let radiSum = ball.radius + asteroid.radius;
  if (distanceBetween < radiSum){
    asteroidArray.delete(asteroid);
  }

}
