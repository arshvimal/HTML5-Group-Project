// Set up canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set up game variables
let isPlaying = false;
let score = 0;

// Set up obstacles
const obstacles = [];

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


// Set up update function
function update() {
  // Check if player is playing
  if (!isPlaying) {
    return;
  }

}

// Set up draw function
function draw() {
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
