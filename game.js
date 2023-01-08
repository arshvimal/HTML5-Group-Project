
// Set up canvas and context
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set up game variables
let isPlaying = false;
let score = 0;

// Set up obstacles
const obstacles = [];
let factor = 1;
let upscale = 2*factor;
groundPNGPixels = 50*factor;

function resizeCanvas() {
  canvas.width = canvas.width*factor;
  canvas.height = canvas.height*factor;
}
resizeCanvas();

const groundImage = new Image();
groundImage.src = './assets/ground.png';
const PlayerSpriteSheet = new Image();
PlayerSpriteSheet.src = './assets/player'+upscale+'x.png';
const RunParticleSpriteSheet = new Image();
RunParticleSpriteSheet.src = './assets/runparticle4x.png';

const ground = {
  x: 0,
  y: (canvas.height-groundPNGPixels), // position the ground at the bottom of the canvas
  width: groundPNGPixels,
  height: groundPNGPixels,
};


const runParticle = {
  width: 16*upscale
}

// Set up player
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
player.y = (canvas.height-groundPNGPixels-(48*upscale))

let frameCounter = 0;
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
    score++;
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
    ctx.drawImage(PlayerSpriteSheet, col*player.width, row*player.height, player.width, player.height, player.x, player.y + (8*upscale), player.height, player.width)
    
    ctx.font = '16px Arial';
    ctx.fillText(score, canvas.width - ctx.measureText(score).width - 10, 20);
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
    ground.x = 0;
    player.current = 0;
    // Start game loop
    loop();
  }
  function stopGame() {
    console.log("func stop is running")
    isPlaying = false;
    score = 0;
    ground.x = 0;
    player.current = 0;
    
  }

  function restartGame() {
    console.log("func restart is running")
    if (isPlaying && startButton.innerHTML === 'Stop Game'){
      stopGame();
    }
    else if(!isPlaying && startButton.innerHTML === 'Start Game'){
      startGame();
    }
  }

  function pauseGame(){
    if (isPlaying && pauseButton.innerHTML === 'Pause'){
      isPlaying = false;
    }
    else if(!isPlaying && pauseButton.innerHTML === 'Resume'){
      isPlaying = true;
      loop();
    }
  }
// Add event listener to start button

startButton.addEventListener('click', function() {
  if (startButton.innerHTML === 'Start Game') {
    restartGame();
    pauseButton.style.display = 'block';
    startButton.innerHTML = 'Stop Game';
  } else {
    restartGame();
    startButton.innerHTML = 'Start Game';
    pauseButton.style.display = 'none';
    pauseButton.innerHTML = 'Pause';
  }
});
pauseButton.addEventListener('click', function() {
  if (pauseButton.innerHTML === 'Pause') {
    pauseGame();
    pauseButton.innerHTML = 'Resume';
  } else {
    pauseGame();
    pauseButton.innerHTML = 'Pause';
  }
});