export default class Junk {
    /**
     * @constructor
     * @param {Game} game Game object
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
        this.speed = 2;
        this.cleaned = false;
        this.bottomCollision = false;

        this.junkImg = this.game.loadedAssets[`junk${this.junkImgIndex}`];

        this.cleanSound = this.game.sounds.clean;

        // this.junkImg = new Image();
        // this.junkImg.src =
        //     "./assets/otherObjects/junk" + this.junkImgIndex + ".png";
    }

    /**
     * draw junk on game screen
     * @param {context} ctx Context of canvas
     */
    draw = (ctx) => {
        // console.log("draw");
        // ctx.beginPath();
        // ctx.fillStyle = "red";
        // ctx.arc(this.position.x, this.position.y, this.r, 0, 2 * Math.PI);
        // ctx.stroke();
        // ctx.fill();

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
            this.game.gameMode === this.game.gameModes.CLEAN
        ) {
            const dx = this.position.x - this.game.mouse.x;
            const dy = this.position.y - this.game.mouse.y;
            if (Math.abs(getDistance(dx, dy)) < this.r) {
                // console.log("clean");
                this.cleaned = true;
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
    save = () => {
        this.obj = {};
        this.obj.r = this.r;
        this.obj.position = this.position;
        this.obj.junkImgIndex = this.junkImgIndex;
        return this.obj;
    };
}
