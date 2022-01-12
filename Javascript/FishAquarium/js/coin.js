export default class Coin {
    /**
     * @constructor
     * @param {Game} game Game object
     * @param {number} x X coordinate to spawn coin
     * @param {number} y Y coordinate to spawn coin
     */
    constructor(game, x, y, bottomCollision) {
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight - 30;
        this.r = 20;

        this.position = {
            x: x ? x : getRandomFromRange(this.r, this.gameWidth - this.r),
            y: y ? y : getRandomFromRange(this.r, this.gameHeight - this.r),
        };
        this.bottomCollision = bottomCollision ? bottomCollision : false;

        this.speed = 25;
        this.direction = {
            y: 1,
        };
        this.collected = false;
        this.changeInterval = {
            coinImg: 200,
            clearCoinTimeout: 5000,
        };
        this.coinImgIndex = 0;
        this.coinImg = this.game.loadedAssets[`coin${this.coinImgIndex}`];

        //sound
        // this.coinSound = new Sound("./assets/sounds/coin.wav");
        this.coinSound = this.game.sounds.coin;

        setInterval(() => {
            this.coinImg = this.game.loadedAssets[`coin${this.coinImgIndex}`];
            // this.coinImg.src =
            //     "./assets/coins/coin-" + this.coinImgIndex + ".png";
            this.coinImgIndex++;
            this.coinImgIndex %= 6;
        }, this.changeInterval.coinImg);
    }

    /**
     * draw fish coin on game screen
     * @param {context} ctx Context of canvas
     */
    draw = (ctx) => {
        // console.log("draw");
        // ctx.beginPath();
        // ctx.fillStyle = "#cbc131";
        // ctx.arc(this.position.x, this.position.y, this.r, 0, 2 * Math.PI);
        // ctx.stroke();
        // ctx.fill();

        ctx.drawImage(
            this.coinImg,
            this.position.x - this.r,
            this.position.y - this.r,
            this.r * 2,
            this.r * 2
        );
    };

    /**
     * update position of fish coin
     * @param {number} deltaTime change in time from previous frame
     */
    update = (deltaTime) => {
        this.wallCollisionDetect();
        this.checkForCollection();
        this.position.y += (this.direction.y * this.speed) / deltaTime;
        // console.log(this.position.y, this.direction.y, deltaTime);
    };

    checkForCollection = () => {
        if (
            this.game.mouse.click &&
            this.game.gameMode === this.game.gameModes.SELECT
        ) {
            const dx = this.position.x - this.game.mouse.x;
            const dy = this.position.y - this.game.mouse.y;
            if (Math.abs(getDistance(dx, dy)) < this.r) {
                this.game.money++;
                this.game.menu.setMoneyInfo(`+  $ 1`, 1);

                this.coinSound.play();

                // console.log("Coin Collected", "Coins:", this.game.money);
                this.collected = true;
                if (!this.game.createCoinInterval) {
                    this.game.createCoinInterval = setInterval(
                        this.game.createCoin,
                        this.game.changeInterval.coin
                    );
                }
                // this.game.save.saveMoney();
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
            if (!this.bottomCollision) {
                this.bottomCollision = true;
                this.clearCoinTimeout = setTimeout(() => {
                    this.collected = true;
                    this.game.updateCoins();
                }, this.changeInterval.clearCoinTimeout);
            }
        }
    };
    save = () => {
        this.obj = {};
        this.obj.position = this.position;
        this.obj.bottomCollision = this.bottomCollision;
        return this.obj;
    };
}
