let colors;
let seed;
let vh = true;

function setup() {
  colors = [
    color(255, 240, 1),
    color(255, 1, 1),
    color(1, 1, 253),
    color(48, 48, 58),
  ];

  createCanvas(windowWidth, windowHeight);
  noLoop();
}

function draw() {
  randomSeed(seed);
  background(250);

  stroke(0);
  strokeWeight(3);
  drawRect(0, 0, width, height, 4);

  if (!saving) {
    noStroke();
    drawInfoBox();
  }
}

function drawRect(x, y, w, h, depth) {
  if (depth > 0) {
    let sizePerc = random(0.2, 0.8);
    if (vh) {
      drawRect(x, y, w * sizePerc, h, depth - 1);
      drawRect(x + w * sizePerc, y, w * (1 - sizePerc), h, depth - 1);
    } else {
      drawRect(x, y, w, h * sizePerc, depth - 1);
      drawRect(x, y + h * sizePerc, w, h * (1 - sizePerc), depth - 1);
    }
    vh = !vh;
  } else {
    fill(250);

    if (random(1) < 0.5) {
      fill(random(colors));
    }

    rect(x, y, w, h);
  }
}

function drawInfoBox() {
  fill(200, 200);
  noStroke();
  rect(10, height - 65, 170, 50, 5);

  fill(0);
  textSize(16);
  textAlign(LEFT, CENTER);
  text('Left Click to generate', 20, height - 50);
  text('Press S to save', 20, height - 30);
}

let saving = false;

function keyPressed() {
  if (key === 's' || key === 'S') {
    saving = true;

    const currentWidth = width;
    const currentHeight = height;
    resizeCanvas(currentWidth, currentHeight - 65);
    redraw();
    saveCanvas(`mondrian-${Math.floor(Math.random() * 1000000)}`, 'png');
    resizeCanvas(currentWidth, currentHeight);
    saving = false;
    redraw();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
  seed = random(1000000);
  redraw();
}
