
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

const ground = {
  x: 0,
  y: 300, // position the ground at the bottom of the canvas
  width: 100,
  height: 100,
  speed: 5
};

// Set up player
const player = {
  x: 50,
  y: canvas.height / 2,
  width: 20,
  height: 20,
  speed: 3,
  jumpForce: 100,
  jumping: false
};

function update() {
    // Check if player is playing
    if (!isPlaying) {
      return;
    }
    // Update ground position
  ground.x -= 1;

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
    
    ctx.drawImage(groundImage, ground.x, ground.y, ground.width, ground.height);
    
  
  }
  
  // Set up game loop
  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }
  
  // Start game
  function startGame() {
    // Reset game variables
    isPlaying = true;
    score = 0;
    player.x = 50;
    player.y = canvas.height / 2;
    obstacles.length = 0;
  
    // Start game loop
    loop();
  }
// Add event listener to start button
const startButton = document.getElementById('startButton');
startButton.addEventListener('click', startGame);
