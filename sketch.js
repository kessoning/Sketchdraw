//Array of points
var points = [];

// PGraphic
var pg;

// Boolean variables for mirror
var hMirror;
var vMirror;

// Image for informations icon
var info_icon;
var iconSize;

// Information image
var showInfo;
var info;

function setup() {
  createCanvas(windowWidth, windowHeight); // Create canvas
  pg = createGraphics(windowWidth, windowHeight); // Create PGraphics to store the graphics
  background(0); // Create a black background in the canvas
  pg.background(0); // Create a black background in the PGraphics
  info_icon = loadImage("https://dl.dropboxusercontent.com/u/96815471/Drawing2/info27.png");
  iconSize = width / 24;
  showInfo = false;
  info = loadImage("https://dl.dropboxusercontent.com/u/96815471/Drawing2/information.png");
}

function draw() {
  // Show the graphics, without mirror
  image(pg, 0, 0, width, height);

  // Horizontal flip the image and show for horizontal mirror
  if (hMirror && !vMirror) {
    push();
    blendMode(ADD);
    scale(-1, 1);
    translate(-width, 0);
    image(pg, 0, 0, width, height);
    pop();
  }

  // Vertical flip the image and show for vertical mirror
  if (vMirror && !hMirror) {
    push();
    blendMode(ADD);
    scale(1, -1);
    translate(0, -height);
    image(pg, 0, 0, width, height);
    pop();
  }

  // Show both horizontal and vertical mirrors
  if (hMirror && vMirror) {
    push();
    blendMode(ADD);
    scale(-1, 1);
    translate(-width, 0);
    image(pg, 0, 0, width, height);
    pop();

    push();
    blendMode(ADD);
    scale(1, -1);
    translate(0, -height);
    image(pg, 0, 0, width, height);
    pop();

    push();
    blendMode(ADD);
    scale(-1, -1);
    translate(-width, -height);
    image(pg, 0, 0, width, height);
    pop();
  }

  // Show information icon
  push();
  tint(255, 150);
  imageMode(CENTER);
  image(info_icon, width - iconSize*2, height-iconSize, iconSize, iconSize);
  pop();

  // If showInfo is activated by pressing info icon, show information
  if (showInfo) {
    push();
    imageMode(CENTER);
    image(info, width / 2, height / 2, width / 2, height / 2);
    pop();
  }
}

// Resize the canvas when resizing te window.
// Unfortunately, I still don't know how to resize the PGraphics
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
    if (dist(mouseX, mouseY, width - iconSize*2, height-iconSize) < iconSize / 2) {
      showInfo = true;
    } else {
      if (showInfo) {
        showInfo = false;
      }
    }
  }
  // Add points to the array and render just one points
  // When the mouse is dragged
function mouseDragged() {
  var p = createVector(mouseX, mouseY);
  append(points, createVector(mouseX, mouseY));
  //pg.background(0);
  pg.fill(255);
  pg.noStroke();
  pg.ellipse(mouseX, mouseY, 3, 3);
  for (var i = 0; i < points.length; i++) {
    if (dist(points[i].x, points[i].y, mouseX, mouseY) < width / 10) {
      pg.stroke(255, 25);
      pg.line(points[i].x, points[i].y, mouseX, mouseY);
    }
  }
  //prevent default
  return false;
}

// Same as mouseDragged, but for touch devices
// Still have to optimize for mobile
function touchMoved() {
  var p = createVector(mouseX, mouseY);
  append(points, createVector(mouseX, mouseY));
  //pg.background(0);
  pg.fill(255);
  pg.noStroke();
  pg.ellipse(mouseX, mouseY, 3, 3);
  for (var i = 0; i < points.length; i++) {
    if (dist(points[i].x, points[i].y, mouseX, mouseY) < width / 10) {
      pg.stroke(255, 25);
      pg.line(points[i].x, points[i].y, mouseX, mouseY);
    }
  }

  //prevent default
  return false;
}

// Keyboard interactions
function keyPressed() {
  if (key === 'R') {
    // Set black background and remove all the points in the PGraphics
    pg.background(0);
    var i = 0;
    while (i < points.length) {
      points = shorten(points);
    }
  } else if (key === 'S') {
    // Save current frame
    save("Sketchdraw" + frameCount + "+.png");
    print("saved");
  } else if (key == 'H') {
    // Horizontal mirror
    hMirror = !hMirror;
  } else if (key == 'V') {
    // Vertical mirror
    vMirror = !vMirror;
  }
}