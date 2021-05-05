
class Bullet {
    constructor(gunX, sightY, offset) {
        this.shooting = true;
        this.x = gunX + 25;
        this.y = 720 + offset;
        this.distance = sightY;
        this.radius = 7;
        this.background = 'background: #f00;';
        this.velocity = 23;
        this.minVelocity = 10 - this.distance / 50;
        this.minSize = 1;
        this.shrink = .02;
        this.hitBoxSizeY = 35;
        this.hitBoxSizeX = 37;
    } // constructor

    // methods
    Move(flockSize) {
        if (this.shooting) {
            if (bullet.y <= bullet.distance + 25) {
                for (let i = 0; i < flockSize; i++) {
                    if (this.y > (flock[i].y + 50) - this.hitBoxSizeY
                        && this.y < (flock[i].y + 50) + this.hitBoxSizeY
                        && this.x > (flock[i].x + 50) - this.hitBoxSizeX
                        && this.x < (flock[i].x + 50) + this.hitBoxSizeX) {
                            score += Math.ceil(((1000 - this.distance) / 5) + (flock[i].speed * 10));
                            if(score >= scoreTarget) {
                                currentLevel++;
                                scoreTarget = 1000 * currentLevel;
                                seconds = 60;
                            }
                            flock[i].alive = false;
                            flock[i].frame = 3; 
                            flock[i].index = i;
                    }
                }
                bullet = null;
            }
            this.y -= this.velocity;
            if (this.velocity > this.minSize)
                this.velocity -= this.velocity / 23;
            if (this.radius >= this.minSize)
                this.radius -= this.shrink;
        } // if(this.shooting)
    } // Move()
} // class