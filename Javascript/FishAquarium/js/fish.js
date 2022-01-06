export default class Fish {
    constructor(game) {
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

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

    draw = (ctx) => {
        console.log("draw");
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.arc(this.position.x, this.position.y, this.r, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    };
    update = (deltaTime) => {
        this.wallCollisionDetect();
        this.position.x += (this.direction.x * this.speed) / deltaTime;
        this.position.y += (this.direction.y * this.speed) / deltaTime;
        // console.log(this.position.y, this.direction.y, deltaTime);
    };

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

    changeYDirection = (dir) => {
        if (dir != undefined) {
            this.direction.y = dir;
        } else {
            this.direction.y = getRandomDirection();
        }
        setTimeout(this.resetYDirection, 500);
    };
    resetYDirection = () => {
        this.direction.y = 0;
    };
}
