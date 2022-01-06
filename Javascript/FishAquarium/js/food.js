export default class Food {
    constructor(game, x, y) {
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.r = 10;
        this.position = {
            x: x,
            y: y,
        };
        this.speed = 5;
        this.direction = {
            y: 1,
        };
    }

    draw = (ctx) => {
        console.log("draw");
        ctx.beginPath();
        ctx.fillStyle = "brown";
        ctx.arc(this.position.x, this.position.y, this.r, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    };
    update = (deltaTime) => {
        this.wallCollisionDetect();
        this.position.y += (this.direction.y * this.speed) / deltaTime;
        // console.log(this.position.y, this.direction.y, deltaTime);
    };
    wallCollisionDetect = () => {
        if (this.position.y > this.gameHeight - this.r) {
            this.direction.y = 0;
        }
    };
}
