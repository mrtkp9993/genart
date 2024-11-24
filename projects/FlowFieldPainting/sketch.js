// Source: https://openprocessing.org/sketch/803505/
// I added saving functionality and some minor changes

var strokeLength = 50;
var strokeThickness = 10;
var noiseScale = 0.0025;

var imgs = [];
var imgIndex = -1;

var drawLength = 750;
var frame;

function preload() {
    const images = [
        {
            filename: "./images/boulevard_des_capucines.webp",
            name: "Boulevard des Capucines",
            artist: "Claude Monet",
            year: "1873",
        },
        {
            filename: "./images/margin_of_silence.webp",
            name: "Margin of Silence",
            artist: "Kay Sage",
            year: "1942",
        },
        {
            filename: "./images/no_title.webp",
            name: "No Title",
            artist: "Zdzisław Beksiński",
            year: "1985",
        },
        {
            filename: "./images/starry_night.webp",
            name: "Starry Night",
            artist: "Vincent van Gogh",
            year: "1889",
        },
        {
            filename: "./images/the_thames_below_westminster.webp",
            name: "The Thames below Westminster",
            artist: "Claude Monet",
            year: "1871",
        },
        {
            filename: "./images/the_trial.webp",
            name: "The Trial",
            artist: "Wolfgang Letti",
            year: "1981",
        }
    ]

    for (let i = 0; i < images.length; i++) {
        imgs.push({
            img: loadImage(images[i].filename),
            filename: images[i].filename,
            name: images[i].name,
            artist: images[i].artist,
            year: images[i].year,
        });
    }
}


function setup() {
    createCanvas(windowWidth, windowHeight);
    changeImage();
    alert("Press 's' to save the current image.\nPress 'i' to see the image information.");
}


function draw() {
    if (frame > drawLength) {
        return;
    }

    let img = imgs[imgIndex].img;

    translate(
        width / 2 - img.width / 2,
        height / 2 - img.height / 2
    );

    let count = map(frame, 0, drawLength, 2, 80);

    for (let i = 0; i < count; i++) {  // Add a new loop to create multiple strokes.
        let x = int(random(img.width))
        let y = int(random(img.height))

        let index = (y * img.width + x) * 4;

        let r = img.pixels[index];
        let g = img.pixels[index + 1];
        let b = img.pixels[index + 2];
        let a = img.pixels[index + 3];

        stroke(r, g, b, a);

        // Map the thickness based on the current frame of the sketch.
        // First it starts off thick, then gradually thins out until it reaches zero.
        let strokeThickness = map(frame, 0, drawLength, 25, 0);
        strokeWeight(strokeThickness);

        push();  // Use push to move and rotate the stroke.
        translate(x, y)
        let n = noise(x * noiseScale, y * noiseScale);
        rotate(radians(map(n, 0, 1, -180, 180)));

        let lengthVariation = random(0.75, 1.25);
        line(0, 0, strokeLength * lengthVariation, 0);
        line(0, -strokeThickness * 0.15, strokeLength * lengthVariation, -strokeThickness * 0.15);
        pop();  // Use pop to reset it for the next stroke.
    }

    frame++;

}

function changeImage() {
    background(255);

    frame = 0;  // Reset frame to 0.

    imgIndex++;
    if (imgIndex >= imgs.length) {
        imgIndex = 0;
    }

    imgs[imgIndex].img.loadPixels();
}

function mousePressed() {
    changeImage();
}

function keyPressed() {
    if (key === "s" | key === 'S') {
        let imgName = imgs[imgIndex].filename.replace("./images/", "").replace(".webp", "");
        saveCanvas(`flow_field_painter_${imgName}_${Math.floor(Math.random() * 1000000)}`, "png");
    }

    if (key === "i" | key === "I") {
        alert(`Image: ${imgs[imgIndex].name}\nArtist: ${imgs[imgIndex].artist}\nYear: ${imgs[imgIndex].year}`);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}