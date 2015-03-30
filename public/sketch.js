var x = 0;

function setup() {
  var eegCanvas = createCanvas(600, 400);
  background(200);
  eegCanvas.parent('eeg-canvas');
}

function draw() {
  ellipse(x, height/2, 20, 20);
  x = x + 1;
}
