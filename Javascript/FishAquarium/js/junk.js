export default class Junk {
    /**
     * @constructor
     * @param {Game} game Game object
     */
    constructor(game) {
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.r = getRandomFromRange(20, 30);
        this.position = {
            x: getRandomFromRange(this.r, this.gameWidth - this.r),
            y: getRandomFromRange(this.r, this.gameHeight - this.r),
        };
    }

    /**
     * draw junk on game screen
     * @param {context} ctx Context of canvas
     */
    draw = (ctx) => {
        console.log("draw");
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(this.position.x, this.position.y, this.r, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    };

    /**
     * update position of junk
     * @param {number} deltaTime change in time from previous frame
     */
    update = (deltaTime) => {
        // this.wallCollisionDetect();
        // this.position.y += (this.direction.y * this.speed) / deltaTime;
        // console.log(this.position.y, this.direction.y, deltaTime);
    };

    /**
     * detect the bottom of the fish tank
     */
    wallCollisionDetect = () => {
        if (this.position.y > this.gameHeight - this.r) {
            this.direction.y = 0;
        }
    };
}
