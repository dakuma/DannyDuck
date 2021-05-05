
class Sight {
    constructor() {
        this.x = 300;
        this.y = 100;
        this.src = './assets/images/sight.png';
    } // constructor
    // methods
    Move(x, y) {
        this.x = x;
        this.y = y;
    }
    Draw() {
        gameCtx.drawImage(sightImg, SIGHT.x, SIGHT.y, 50, 50);
    }
} // class
const SIGHT = new Sight();