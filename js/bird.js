
class Bird {
    constructor() {
        this.direction = Math.round(Math.random()); // 0 = L2R 1 = R2L
        if(this.direction === 0)
            this.x = -(300 + (Math.ceil(Math.random() * 200)));
        else
            this.x = GAME_WIDTH + (Math.random() * 100) + 200;
        this.src = './assets/images/blueJay.png';
        this.srcR = './assets/images/blueJayR.png';
        this.y = Math.random() * (GAME_HEIGHT - 300) + 75;
        this.frame = 0;
        this.frameCounter = 0;
        this.speed = Math.ceil(Math.random() * 3) + currentLevel;
        this.alive = true;
        this.deathFrame = 0;
        this.deathFrameMax = 9;
        this.index;
    } // constructor
    Move() {
        this.frameCounter++;
        if(this.alive === false) {
            this.deathFrame++;
        }

        if(this.deathFrame >= this.deathFrameMax) {
            flock[this.index] = null; // kill the bird
            flock.splice(this.index, 1);
            this.Spawn();
        }
            
        if(this.direction === 0)
            this.x += this.speed;
        else
            this.x -= this.speed;

        if (this.frameCounter % 9 === 0)
            this.frame++;
        
        if (this.frame >= 3 && this.alive) {
            this.frame = 0;
        }      
    } // Move()
    Draw() {
        if(this.direction === 0) {
            if(this.alive)
                gameCtx.drawImage(birdImg, 100 * this.frame, 0, 100, 100, this.x, this.y, 100, 100);
            else
                gameCtx.drawImage(birdImg, 100 * 3, 0, 100, 100, this.x, this.y, 100, 100); 
        }
        else  {
            if(this.alive)
                gameCtx.drawImage(birdImgR, 100 * this.frame, 0, 100, 100, this.x, this.y, 100, 100);
            else
                gameCtx.drawImage(birdImgR, 100 * 3, 0, 100, 100, this.x, this.y, 100, 100);
        }
    } // Draw()
    Spawn() {
        bird = new Bird();
        flock.push(bird);
    } // Spawn()
} // class