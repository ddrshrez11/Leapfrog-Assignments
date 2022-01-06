export default class Fish {
    /**
     * @constructor
     * @param {Game} game Game object
     */
    constructor(game) {
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.mouse = game.mouse;

        this.r = getRandomFromRange(10, 30);
        this.position = {
            x: getRandomFromRange(this.r, this.gameWidth - this.r),
            y: getRandomFromRange(this.r, this.gameHeight - this.r),
        };
        this.speed = 10;
        this.level = 1;
        this.direction = {
            x: getRandomDirection(),
            y: getRandomDirection(),
        };
        setInterval(this.changeYDirection, 5000);
    }

    /**
     * update position of fish
     * @param {number} deltaTime change in time from previous frame
     */
    update = (deltaTime) => {
        this.wallCollisionDetect();
        if (game.gameMode === 0 && this.mouse.click) {
            this.userInputMovement(deltaTime);
        } else {
            this.normalMovement(deltaTime);
        }

        // console.log(this.position.y, this.direction.y, deltaTime);
    };

    /**
     * draw fish object onto the game screen
     * @param {context} ctx context of canvas
     */
    draw = (ctx) => {
        // console.log("draw");
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.arc(this.position.x, this.position.y, this.r, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    };

    normalMovement = (deltaTime) => {
        this.position.x += (this.direction.x * this.speed) / deltaTime;
        this.position.y += (this.direction.y * this.speed) / deltaTime;
    };

    userInputMovement = (deltaTime) => {
        const dx = this.position.x - this.mouse.x;
        const dy = this.position.y - this.mouse.y;

        if (this.mouse.x != this.position.x) {
            this.position.x -= dx / (3 * deltaTime);
            // this.mouse.click = false;
        }
        if (this.mouse.y != this.position.y) {
            this.position.y -= dy / (3 * deltaTime);
        }
        if (Math.abs(dx) < 1) {
            this.mouse.click = false;
        }
    };

    /**
     *detect the edge of the fish tank
     */
    wallCollisionDetect = () => {
        if (this.position.x > this.gameWidth - this.r) {
            this.direction.x = -1;
            this.changeYDirection();
        } else if (this.position.x < 0 + this.r) {
            this.direction.x = 1;
            this.changeYDirection();
        }
        if (this.position.y > this.gameHeight - this.r) {
            this.direction.x = getRandomDirection();
            this.changeYDirection(-1);
        } else if (this.position.y < 0 + this.r) {
            this.direction.x = getRandomDirection();
            this.changeYDirection(1);
        }
    };

    /**
     * Changes Y-direction of fish to given or random value
     * @param {number} dir change direction of fish in this direction
     */
    changeYDirection = (dir) => {
        if (dir != undefined) {
            this.direction.y = dir;
        } else {
            this.direction.y = getRandomDirection();
        }
        setTimeout(this.resetYDirection, 500);
    };

    /**
     * Reset Y-direction of fish to zero.
     */
    resetYDirection = () => {
        this.direction.y = 0;
    };
}
