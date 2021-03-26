HEIGHT = 240
WIDTH = 240
T = 0;
var ANIMALS = [];
var WHALE, OCTO, ROCKFISH, KELP_LEAF, REEF_TILESET;

function preload() {
  WHALE = loadImage(
    'https://raw.githubusercontent.com/agonegen/p5portfolio/master/assets/greywhale.png');
  OCTO = loadImage(
    'https://raw.githubusercontent.com/agonegen/p5portfolio/master/assets/oct.png');
  ROCKFISH = loadImage(
    'https://raw.githubusercontent.com/agonegen/p5portfolio/master/assets/rockfish.png');
  KELP_LEAF = loadImage(
    'https://raw.githubusercontent.com/agonegen/p5portfolio/master/assets/kelp.png');
  REEF_TILESET = loadImage(
    'https://raw.githubusercontent.com/agonegen/p5portfolio/master/assets/reef-tileset.png');
}

function setup() {
  createCanvas(HEIGHT, WIDTH);
  noSmooth();
  background('#00463b');
  frameRate(30);
  genAnimals();
}


function clearBg() {
  for (x = 0; x < WIDTH; x++) {
    for (y = 0; y < HEIGHT; y++) {
      set(x, y, color('#000'));
    }
  }
}

function vlineStroke(x, y, c, width) {
  for (x2 = x - width/2; x2 < x + width/2; x2++) {
    set(x2, y, c);
  }
}

function drawWaves(nWaves, t) {
  stride = WIDTH / nWaves;
  strokeWidth = stride / 5;
  for (x = stride / 2; x < WIDTH; x += stride) {
    for (y = 0; y < HEIGHT; y += 1) {
      jitter = 20 * (noise(x/20, y/20, t/10) - 0.5);
      jitter += sin(y/10 + t/2)
      vlineStroke(x+jitter, y, color('#007944'), 2);
      vlineStroke(x+jitter+1, y, color('#00d1cb'), 2);
    }
  }
}

function drawKelp(nKelp, t) {
  stride = WIDTH / nKelp;
  strokeWidth = 5//stride / 2;
  for (x = stride / 2; x < WIDTH; x += stride) {
    for (y = 0; y < HEIGHT; y += 1) {
      jitter = 15 * (noise(x/20, y/20, t/10) - 0.5);
      jitter += 8*sin(y/20 + t/8);
      vlineStroke(x+jitter, y, color('#e3c900'), strokeWidth);
      vlineStroke(x+jitter+strokeWidth/2, y, color('#b36406'), strokeWidth/2);
    }
  }
}

function drawKelpLeaves(nKelp, t) {
  stride = WIDTH / nKelp;
  strokeWidth = 5//stride / 2;
  for (x = stride / 2; x < WIDTH; x += stride) {
    for (y = 0; y < HEIGHT + KELP_LEAF.height; y += 1) {
      jitter = 15 * (noise(x/20, y/20, t/10) - 0.5);
      jitter += 8*sin(y/20 + t/8);
      x2 = x+jitter;
      if (y % 15 == 0) {
        if (floor(y % 30) == 0) {
          push();
          scale(-1,1);
          image(KELP_LEAF, -x2-18, y-37);
          pop();
        }
        else {
          image(KELP_LEAF, x2-18, y - 38);
        }
      }
    }
  }
}

function genAnimals() {
  if (random() < .1) {
    ANIMALS.push(
      {
        'type': 'whale',
        'image': WHALE,
        'x': random(WIDTH),
        'y': HEIGHT - 220
      }
    )
  }
  nFish = round(random(3, 10));
  console.log(nFish);
  for(i=0; i<nFish; i++) {
    ANIMALS.push(
      {
        'type': 'rockfish',
        'image': ROCKFISH,
        'x': random(WIDTH),
        'y': random(HEIGHT-ROCKFISH.height)
      }
    )
  }
  if (random() < .25) {
    ANIMALS.push(
      {
        'type': 'octopus',
        'image': OCTO,
        'x': random(WIDTH),
        'y': HEIGHT - OCTO.height
      }
    )
  }
}

function drawAnimals(t) {
  t2xoffset = 
  ANIMALS.forEach(function(a){
    xoffset = a.x + t * (3 / Math.log(a.image.width));
    xlimit = WIDTH + a.image.width;
    image(
      a.image,
      WIDTH - (xoffset % xlimit),
      a.y);
  });
}

function drawReef(){
  for (x=0; x<WIDTH; x+=64) {
    image(REEF_TILESET, x, 176)
  }
}

function draw() {
  drawWaves(50, T);
  drawKelp(3, T);
  updatePixels();
  drawKelpLeaves(3, T);
  drawAnimals(T);
  T += 1;
}