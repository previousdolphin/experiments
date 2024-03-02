const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game Settings
const roadWidth = 200;
const roadCenterX = canvas.width / 2;
const segmentLength = 20;
 const carWidth = 40;
const carHeight = 30;
const playerX = roadCenterX - carWidth/2;
let camY = 0;
 let speed = 0;
let score = 0;
let segments = [];

// Track generation
function createSegments() {

if (segments.length > 300 && Math.random() < 1/coinFrequency) {
    let laneOffset = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
    let coin = {
        x: roadCenterX + (laneOffset * roadWidth/ 2), 
        y: -segmentLength, 
        width: coinWidth,
        height: coinWidth // Assuming square coin 
    };
    coins.push(coin);
}

// Inside updateSegments() (adjust movement and remove offscreen coins)
for (let i = coins.length - 1; i >= 0; i--) {
    coins[i].y += speed;
    if (coins[i].y > canvas.height) {
        coins.splice(i, 1); 
    }
}

}

// Road rendering (perspective)
function drawRoad() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < segments.length; i++) {
        let segment = segments[i];

        let perspective = i / segments.length;

        // ... (Calculate projected road X, width based on perspective)

        ctx.fillStyle = "gray";
        ctx.fillRect(0, segment.y, canvas.width, segment.height);

        // ... (Optional: Add road lines, obstacles, etc.)
    }
  let perspective = i / (segments.length - 1); // Adjusted calculation 

let roadX = roadCenterX + (segment.curve * perspective * canvas.width);
let roadWidth = canvas.width * perspective;
 let segmentHeight = segmentLength * perspective; 

ctx.fillStyle = "gray";
ctx.fillRect(0, segment.y, canvas.width, segment.height);

// Center line
let lineX = roadX + roadWidth * 0.5;
 let lineW = roadWidth * 0.1;
ctx.fillStyle = "yellow";
ctx.fillRect(lineX, segment.y, lineW, segment.height);

ctx.fillStyle = "gold";
for (let coin of coins) {
    // ... (Similar to how we draw obstacles, applying perspective)
    let coinTop =  camY - coin.y;
    let perspective = coinTop / camY; 
    let x = coin.x + roadCenterX - (coin.width * perspective / 2); 
    let w = coin.width * perspective;
    ctx.fillRect(x, coinTop, w, coin.height * perspective); 
}

}

// Player car
function drawCar() {
    ctx.fillStyle = "red";
    ctx.fillRect(playerX, canvas.height - carHeight, carWidth, carHeight);
}

// Key press handlers
let leftPressed = false;
let rightPressed = false;

function keyDownHandler(e) {
    if(e.keyCode === 37) { // Left arrow
        leftPressed = true;
    } else if(e.keyCode === 39) { // Right arrow
        rightPressed = true;
    }
}

function keyUpHandler(e) {
   // ... (Reset movement flags)
}

// Game loop
function update() {
    speed += 0.01; // Simulate acceleration
    camY += speed;
    updateSegments(); // Update segment positions for scrolling effect

    // ... (Handle player movement with leftPressed, rightPressed)

ctx.fillStyle = "blue";
for (let obstacle of obstacles) {
    let obstacleTop =  camY - obstacle.y;
    let perspective = obstacleTop / camY; // Same perspective effect as road
    let x = obstacle.x + roadCenterX - (obstacle.width * perspective / 2); 
    let w = obstacle.width * perspective;
    ctx.fillRect(x, obstacleTop, w, obstacle.height * perspective);
}
if (speedBoostActive) {
    speed += 0.04; // Extra acceleration
    if (Date.now() - speedBoostStartTime > speedBoostDuration) {
        speedBoostActive = false; 
    }
}

}

function draw() {
    drawRoad();
    drawCar();
    ();
    requestAnimationFrame(draw);
}

function updateSegments() {
   // ... (Add logic to shift segments and generate new ones)
}

// Initialize
createSegments();

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

update(
      if (leftPressed) {
    playerLane = Math.max(playerLane - laneChangeSpeed, -1);
}
if (rightPressed) {
    playerLane = Math.min(playerLane + laneChangeSpeed, 1);
}

const targetX = roadCenterX + (playerLane * roadWidth / 2);
playerX += (targetX - playerX) / 5; // Smoother movement
);  
draw();


const curveRange = 0.4; // How much the road can curve at a segment
const maxSegmentCount = 500; // Limit to avoid excessive memory usage

// ... 
function createSegments() {
    segments = []; //Initialize
    for (let i = 0; i < maxSegmentCount; i++) {
        let segment = {
            y: i * segmentLength,
            curve: randomCurve() 
        };
        segments.push(segment);
    }
}

function updateSegments() {
    // Shift segments down
    for (let i = segments.length - 1; i >= 0; i--) {
        segments[i].y += speed;
    }

    // Generate new segments if needed
    if (segments[0].y > segmentLength) {
        segments.shift(); // Remove oldest  
        segments.push({
            y: segments[segments.length - 1].y + segmentLength,
            curve: randomCurve()
        });
    }
}

function randomCurve() {
    return (Math.random() - 0.5) * curveRange;
}



const obstacleWidth = carWidth * 0.8; // Smaller than car
const obstacleFrequency = 80; // Control how often obstacles appear
let obstacles = [];

// Inside createSegments()
if (segments.length > 200 && Math.random() < 1/obstacleFrequency) {
    let obstacle = {
        x: roadCenterX + (randomCurve() * roadWidth/2), 
        y: -segmentLength, 
        width: obstacleWidth,
        height: carHeight 
    };
    obstacles.push(obstacle);
}

// Inside updateSegments()
for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].y += speed;
    if (obstacles[i].y > canvas.height) {
        obstacles.splice(i, 1); // Remove offscreen obstacles
    }
}

// Before drawRoad() - Collision check
function checkCollision() {
    for (let obstacle of obstacles) {
        if (playerX < obstacle.x + obstacle.width &&
            playerX + carWidth > obstacle.x &&
            canvas.height - carHeight < obstacle.y + obstacle.height &&
            canvas.height > obstacle.y) {
                resetGame(); // Implement reset logic
            }
    }
    for (let i = coins.length - 1; i >= 0; i--) {
        if (playerX < coins[i].x + coins[i].width &&
            playerX + carWidth > coins[i].x &&
            canvas.height - carHeight < coins[i].y + coins[i].height &&
            canvas.height > coins[i].y) {
            collectedCoins++;
            coins.splice(i, 1);
            speedBoostActive = true;
            speedBoostStartTime = Date.now();
            }
}
}

function resetGame() {
    speed = 0;
    score = 0;
    createSegments(); // Reset the track
    obstacles = [];
}
// ... Inside script.js (cont.)

let score = 0;

// ... In update()
score += Math.floor(speed); 

// ...
function drawScore() {
    ctx.font = "24px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score + "  Coins: " + collectedCoins, 30, 50);
}

const coinWidth = carWidth * 0.5;
const coinFrequency = 150; 
 let coins = [];
let collectedCoins = 0;

const speedBoostDuration = 3000; // 3 seconds
let speedBoostActive = false;
let speedBoostStartTime = 0;

              
const scoreMultiplierDuration = 5000; // 5 seconds
let scoreMultiplier = 1;
let scoreMultiplierStartTime = 0;

              
