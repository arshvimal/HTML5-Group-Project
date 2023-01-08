
// Set up canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set up game variables
let isPlaying = false;
let score = 0;

// Set up obstacles
const obstacles = [];

const groundImage = new Image();
groundImage.src = './assets/ground.png';
const spriteSheet = new Image();
spriteSheet.src = './assets/player.png';

let frameCounter = 0;


const ground = {
  x: 0,
  y: (canvas.height-100), // position the ground at the bottom of the canvas
  width: 100,
  height: 100,
};

// Set up player

let upscale = 4;

const player = {
  width: 48*upscale,
  height: 48*upscale,
  PerRow: 6,
  rows: 10,
  total: 6,
  current: 0,
  x: 0,
  y: 0,
  speed: 2,
};
player.y = (canvas.height-100-(48*upscale))


let frameDelay = 24/player.speed;

function update() {
    // Check if player is playing
    if (!isPlaying) {
      return;
    }
    // Update ground position
  ground.x -= player.speed;

  frameCounter++;
  if (frameCounter >= frameDelay) {
    player.current = (player.current + 1) % player.total;
    frameCounter = 0;
  }

  // Check if ground is off screen
    if (ground.x + ground.width < 0) {
        ground.x = 0;
    }
  
  }
  
  // Set up draw function
  function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Draw ground
    let groundend = 0;
    while (true){
      if (groundend >= (canvas.width+ground.width)){
        break;
      }
      ctx.drawImage(groundImage, ground.x + groundend, ground.y, ground.width, ground.height);
      groundend = groundend + ground.width;
    }
    col = player.current % player.PerRow;
    row = 4; //running
    ctx.drawImage(spriteSheet, col*player.width, row*player.height, player.width, player.height, player.x, player.y + (8*upscale), player.height, player.width)
    
  
  }
  
  // Set up game loop
  function loop() {
    console.log("func loop is running")
    if(!isPlaying){
      return;
    }
    update();
    draw();
    requestAnimationFrame(loop);
  }
  
  // Start game
  function startGame() {
    console.log("func start is running")
    // Reset game variables
    isPlaying = true;
    score = 0;
  
    // Start game loop
    loop();
  }
  function stopGame() {
    console.log("func stop is running")
    isPlaying = false;
    score = 0;
    
  }

  function restartGame() {
    console.log("func restart is running")
    if (isPlaying){
      stopGame();
    }
    else{
      startGame();
    }
  }
// Add event listener to start button
const startButton = document.getElementById('startButton');
startButton.addEventListener('click', restartGame);
startButton.addEventListener('click', function() {
  if (this.innerHTML === 'Start Game') {
    this.innerHTML = 'Stop Game';
  } else {
    this.innerHTML = 'Start Game';
  }
});
