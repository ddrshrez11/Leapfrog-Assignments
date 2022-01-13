import Junk from "./junk.js";
import { getRandomFromRange, getRandomIndex } from "./utils.js";

export default class Food {
    /**
     * @constructor
     * @param {Game} game Game object
     * @param {number} x X coordinate to spawn food
     * @param {number} y Y coordinate to spawn food
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
        this.foodImg = this.game.loadedAssets[`food`];
        this.bottomCollision = false;
        this.changeInterval = {
            clearFoodTimeout: 5000,
        };
    }

    /**
     * draw fish food on game screen
     * @param {context} ctx Context of canvas
     */
    draw = (ctx) => {
        ctx.drawImage(
            this.foodImg,
            this.position.x - this.r,
            this.position.y - this.r,
            this.r * 2,
            this.r * 1.5
        );
    };

    /**
     * update position of fish food
     * @param {number} deltaTime change in time from previous frame
     */
    update = (deltaTime) => {
        this.wallCollisionDetect();
        this.position.y += (this.direction.y * this.speed) / deltaTime;
    };

    /**
     * detect the bottom of the fish tank
     */
    wallCollisionDetect = () => {
        if (this.position.y > this.gameHeight - this.r) {
            this.direction.y = 0;
            if (!this.bottomCollision) {
                this.bottomCollision = true;

                this.clearFoodTimeout = setTimeout(() => {
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
                    this.game.updateFoods();
                }, this.changeInterval.clearFoodTimeout);
            }
        }
    };
}
