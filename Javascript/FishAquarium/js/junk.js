import { getRandomFromRange, getDistance, getRandomIndex } from "./utils.js";

export default class Junk {
    /**
     * @constructor
     * @param {Game} game Game object
     * @param {Object} junkInfo object containing saved data about junk
     */
    constructor(game, junkInfo) {
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight - 30;
        if (junkInfo) {
            this.r = junkInfo.r;
            this.position = junkInfo.position;
            this.junkImgIndex = junkInfo.junkImgIndex;
        } else {
            this.r = getRandomFromRange(20, 30);
            this.position = {
                x: getRandomFromRange(this.r, this.gameWidth - this.r),
                y: getRandomFromRange(this.r, this.gameHeight - this.r),
            };
            this.junkImgIndex = getRandomIndex(0, 2);
        }
        this.direction = {
            y: 1,
        };
        this.speed = 1;
        this.cleaned = false;
        this.bottomCollision = false;

        this.junkImg = this.game.loadedAssets[`junk${this.junkImgIndex}`];

        this.cleanSound = this.game.sounds.clean;
    }

    /**
     * draw junk on game screen
     * @param {context} ctx Context of canvas
     */
    draw = (ctx) => {
        ctx.drawImage(
            this.junkImg,
            this.position.x - this.r,
            this.position.y - this.r,
            this.r * 2,
            this.r * 2
        );
    };

    /**
     * update position of junk
     */
    update = () => {
        this.wallCollisionDetect();
        this.checkForClean();
        this.position.y += this.direction.y * this.speed;
    };

    /**
     * checks if user has clicked on the junk
     */
    checkForClean = () => {
        if (
            this.game.mouse.click &&
            this.game.gameMode === this.game.gameModes.CLEAN
        ) {
            const dx = this.position.x - this.game.mouse.x;
            const dy = this.position.y - this.game.mouse.y;
            if (Math.abs(getDistance(dx, dy)) < this.r) {
                this.cleaned = true;
                if (!this.game.toggle.isMute) this.cleanSound.play();
                if (this.game.toggle.isMute) this.cleanSound.stop();
                if (!this.game.createJunkInterval) {
                    this.game.createJunkInterval = setInterval(
                        this.game.createJunk,
                        this.game.changeInterval.junk
                    );
                }
                this.game.createCoin(this.position.x, this.position.y);
                this.game.updateJunks();
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
            if (!this.bottomCollision) {
                this.bottomCollision = true;
                this.game.updateJunks();
            }
        }
    };

    /**
     * create object of size, position and image index value to save in local storage
     */
    save = () => {
        this.obj = {};
        this.obj.r = this.r;
        this.obj.position = this.position;
        this.obj.junkImgIndex = this.junkImgIndex;
        return this.obj;
    };
}
