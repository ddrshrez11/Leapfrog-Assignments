export default class Junk {
    /**
     * @constructor
     * @param {Game} game Game object
     */
    constructor(game) {
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.r = getRandomFromRange(20, 30);
        this.position = {
            x: getRandomFromRange(this.r, this.gameWidth - this.r),
            y: getRandomFromRange(this.r, this.gameHeight - this.r),
        };
        this.cleaned = false;
    }

    /**
     * draw junk on game screen
     * @param {context} ctx Context of canvas
     */
    draw = (ctx) => {
        // console.log("draw");
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
        if (
            this.game.mouse.click &&
            this.game.gameMode === this.game.gameModes.CLEAN
        ) {
            const dx = this.position.x - this.game.mouse.x;
            const dy = this.position.y - this.game.mouse.y;
            if (Math.abs(getDistance(dx, dy)) < this.r) {
                // console.log("clean");
                // if (
                //     this.game.mouse.x >= this.position.x - this.r &&
                //     this.game.mouse.x <= this.position.x + this.r &&
                //     this.game.mouse.y >= this.position.y - this.r &&
                //     this.game.mouse.y > this.position.y + this.r
                // ) {
                this.cleaned = true;
                this.game.updateJunks();
                this.game.mouse.click = false;
            }
        }
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
