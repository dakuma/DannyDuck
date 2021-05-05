
//---------------------------------------------------------------------------------//
//---------------------------> REQUEST ANIMATION FRAME <---------------------------//
(function () {
    let requestAnimationFrame = window.requestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();



const GAME_WIDTH = 1200;
const GAME_HEIGHT = 800;

///////////////////////////////
// canvas and contexts
let game = document.querySelector('#game');
let gameCtx = game.getContext('2d');
game.width = GAME_WIDTH;
game.height = GAME_HEIGHT;

//////////////////////////////
// global vars/objects
let backgroundMusic = document.querySelector('#music');
backgroundMusic.src = './assets/music/backgroundMusic.mp3';
backgroundMusic.volume = .21;
backgroundMusic.play();
let soundEffect = document.querySelector('#soundEffect');
let sightImg = new Image();
sightImg.src = SIGHT.src;
let shotgunImg = new Image();
shotgunImg.src = SHOTGUN.src;
let shotgunImg2 = new Image();
shotgunImg2.src = SHOTGUN.fireSrc;
let background = new Image();
background.src = './assets/images/background.jpg';
let flock = [];
let flockSize = 4; // each level adds 2 birds??
let birdImg = new Image();
birdImg.src = './assets/images/blueJay.png';
let birdImgR = new Image();
birdImgR.src = './assets/images/blueJayR.png';
let bullet;
const FLASH_FRAMES = 5; // for shotgun flash
let counter = FLASH_FRAMES;
let timeTxt = document.querySelector('#time');
let seconds = 60;
let scoreTxt = document.querySelector('#score');
scoreTxt.innerHTML = '00';
let score = 0;
let frame = 0;
let frameCounter = 13; // 13 ticks/frame
let currentLevel = 1;
let scoreTarget = 1000 * currentLevel;
let menu = document.querySelector('#menu');
let gameOver = false;

// make birds
for (let i = 0; i < flockSize; i++) {
    bird = new Bird();
    flock.push(bird);
}

////////////////////////////////////////////////
// timer for ahh you know, time
let timer = setInterval(tick, 1000);
let deathTimer;

function tick() {
    seconds--;
    timeTxt.innerHTML = seconds;
    if (seconds <= 0) {
        gameOver = true;
        clearInterval(timer);
        // kills birds
        flock = [];
        menu.setAttribute('style', 'display: initial;');
        backgroundMusic.pause();
    }
}

////////////////////////////////////////////////
// mousemove for sight and gun follow
game.addEventListener('mousemove', (elvis) => {
    if(!gameOver) {
        SIGHT.x = elvis.clientX - ((window.innerWidth - 1200) / 2) - 25;
        if (elvis.clientY < 620 && elvis.clientY > 80)
            SIGHT.y = elvis.clientY - 35;
    }
});

////////////////////////////////////////////////
// mouse 'click' for bullet fire - 2 pellets!
game.addEventListener('click', () => {
    if(!gameOver) {
        if (!bullet) {
            soundEffect.src = './assets/sounds/shotgun.mp3';
            soundEffect.play();
            bullet = new Bullet(SIGHT.x, SIGHT.y, + 1);
            counter = 0; // resets flash counter
        }
    } 
});

function ResetGame() {
    seconds = 60;
    score = 0;
    currentLevel = 1;
    for (let i = 0; i < flockSize; i++) {
        bird = new Bird();
        flock.push(bird);
    }
    menu.setAttribute('style', 'display: none;');
    backgroundMusic.play();
    timeTxt.innerHTML = seconds;
    timer = setInterval(tick, 1000);
    gameOver = false;
}

//////////////////////////////////////////////
// MAIN GAME LOOP BEYOND THIS POINT

////////////////////////// MOVE
function Move() {
    if (bullet) {
        bullet.Move(flockSize);
    }
    for (let i = 0; i < flock.length; i++) {
        flock[i].Move();
        if(flock[i].direction === 0) {
            if (flock[i].x > GAME_WIDTH + 150) {
                flock[i] = null;
                flock.splice(i, 1); // splice on splice off
                bird.Spawn();
            }
        }
        else {
            if (flock[i].x < - 150) {
                flock[i] = null;
                flock.splice(i, 1); // splice on splice off
                bird.Spawn();
            }
        }
        
    }
} // Move()

////////////////////////// DRAW
function Draw() {
    gameCtx.drawImage(background, 0, 0, 1200, 800);
    for (let i = 0; i < flock.length; i++) {
        flock[i].Draw();
    }
    SIGHT.Draw();
    if (bullet && bullet.shooting) {
        gameCtx.beginPath();
        gameCtx.fillStyle = '#111';
        gameCtx.arc(bullet.x, bullet.y, bullet.radius, 0, 2 * Math.PI);
        gameCtx.fill();
        gameCtx.beginPath();
    }
    counter++;
    if (counter < FLASH_FRAMES) {
        gameCtx.drawImage(shotgunImg2, SIGHT.x, 650 + SIGHT.y / 10, 66, 153);
    }
    else {
        gameCtx.drawImage(shotgunImg, SIGHT.x, 650 + SIGHT.y / 10, 66, 153);
    }
    scoreTxt.innerHTML = score + ' - lvl ' + currentLevel;
} // Draw()

////////////////////////// UPDATE
function Update() {
    gameCtx.clearRect(0, 0, 1200, 800); // clear game canvas
    // Spawn(); // manages the flock
    Move(); // updates postions on everything that's moving
    Draw(); // draws everything including the kitchen sink!
    requestAnimationFrame(Update); // calls update/itself aka game loop
} // Update()



//------------------------------------------------------------------//
//--------------------> ONLOAD EVENT LISTENER <---------------------//
window.addEventListener("load", function () {
    Update();
});