import Junk from "./junk.js";

export default class Pill {
    /**
     * @constructor
     * @param {Game} game Game object
     * @param {number} x X coordinate to spawn pill
     * @param {number} y Y coordinate to spawn pill
     */
    constructor(game, x, y) {
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight - 30;
        this.r = 10;
        this.position = {
            x: x,
            y: y,
        };
        this.speed = 5;
        this.direction = {
            y: 1,
        };
        this.eaten = false;
        this.pillImg = this.game.loadedAssets[`pill`];
        // this.pillImg = new Image();
        // this.pillImg.src = "./assets/otherObjects/pill.png";
        this.bottomCollision = false;
        this.changeInterval = {
            clearPillTimeout: 5000,
        };
    }

    /**
     * draw fish pill on game screen
     * @param {context} ctx Context of canvas
     */
    draw = (ctx) => {
        // console.log("draw");
        // ctx.beginPath();
        // ctx.fillStyle = "brown";
        // ctx.arc(this.position.x, this.position.y, this.r, 0, 2 * Math.PI);
        // ctx.stroke();
        // ctx.fill();

        ctx.drawImage(
            this.pillImg,
            this.position.x - this.r,
            this.position.y - this.r,
            this.r * 2,
            this.r * 1.5
        );
    };

    /**
     * update position of fish pill
     * @param {number} deltaTime change in time from previous frame
     */
    update = (deltaTime) => {
        this.wallCollisionDetect();
        this.position.y += (this.direction.y * this.speed) / deltaTime;
        // console.log(this.position.y, this.direction.y, deltaTime);
    };

    /**
     * detect the bottom of the fish tank
     */
    wallCollisionDetect = () => {
        if (this.position.y > this.gameHeight - this.r) {
            this.direction.y = 0;
            if (!this.bottomCollision) {
                this.bottomCollision = true;

                this.clearPillTimeout = setTimeout(() => {
                    this.eaten = true;
                    this.game.clearFoodCount++;
                    if (this.game.clearFoodCount % 5 === 0) {
                        this.game.clearFoodCount %= 5;
                        this.game.junks.push(
                            new Junk(this.game, {
                                r: getRandomFromRange(20, 30),
                                position: {
                                    x: this.position.x,
                                    y: this.position.y,
                                },
                                junkImgIndex: getRandomIndex(0, 2),
                            })
                        );
                    }
                    this.game.updateJunks();
                    this.game.updatePills();
                }, this.changeInterval.clearPillTimeout);
            }
        }
    };
}
