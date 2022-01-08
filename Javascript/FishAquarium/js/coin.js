export default class Coin {
    /**
     * @constructor
     * @param {Game} game Game object
     * @param {number} x X coordinate to spawn food
     * @param {number} y Y coordinate to spawn food
     */
    constructor(game, x, y) {
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.r = 10;
        this.position = {
            x: x ? x : getRandomFromRange(this.r, this.gameWidth - this.r),
            y: y ? y : getRandomFromRange(this.r, this.gameHeight - this.r),
        };
        this.speed = 25;
        this.direction = {
            y: 1,
        };
        this.collected = false;
    }

    /**
     * draw fish food on game screen
     * @param {context} ctx Context of canvas
     */
    draw = (ctx) => {
        // console.log("draw");
        ctx.beginPath();
        ctx.fillStyle = "#cbc131";
        ctx.arc(this.position.x, this.position.y, this.r, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    };

    /**
     * update position of fish food
     * @param {number} deltaTime change in time from previous frame
     */
    update = (deltaTime) => {
        this.wallCollisionDetect();
        this.checkForClean();
        this.position.y += (this.direction.y * this.speed) / deltaTime;
        // console.log(this.position.y, this.direction.y, deltaTime);
    };

    checkForClean = () => {
        if (
            this.game.mouse.click &&
            this.game.gameMode === this.game.gameModes.SELECT
        ) {
            const dx = this.position.x - this.game.mouse.x;
            const dy = this.position.y - this.game.mouse.y;
            if (Math.abs(getDistance(dx, dy)) < this.r) {
                this.game.money++;
                console.log("Coin Collected", "Coins:", this.game.money);
                this.collected = true;
                if (!this.game.createCoinInterval) {
                    this.game.createCoinInterval = setInterval(
                        this.game.createCoin,
                        this.game.changeInterval.coin
                    );
                }
                this.game.updateCoins();
                this.game.inputHandler.resetMouseClick();
            }
        }
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
