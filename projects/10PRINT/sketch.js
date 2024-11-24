var stepSize = 80;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noLoop();
}

function draw() {
    background(220);

    for (let x = 0; x < windowWidth; x += stepSize) {
        for (let y = 0; y < windowHeight; y += stepSize) {
            cond = random(1) > 0.5;

            if (cond) {
                line(x, y, x + stepSize, y + stepSize);
            } else {
                line(x, y + stepSize, x + stepSize, y);
            }
        }
    }
}