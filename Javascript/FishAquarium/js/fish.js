import { fishTypes } from "./fishTypes.js";
export default class Fish {
    /**
     * @constructor
     * @param {Game} game Game object
     */
    constructor(game, type) {
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.mouse = game.mouse;

        // different for each fish type
        this.type = fishTypes[type];
        this.name = "Fish" + this.game.fishes.length;
        this.color = this.type.color;
        this.speed = this.type.speed;
        this.maxHealthMeter = this.type.maxHealthMeter;
        this.maxHungerMeter = this.type.maxhungerMeter;
        this.changeInterval = this.type.changeInterval;
        this.baseSize = this.type.baseSize;
        this.angle = 0;

        //image
        this.leftImg = new Image();
        this.leftImg.src = "./assets/fishes/" + this.type.image.leftSrc;
        this.rightImg = new Image();
        this.rightImg.src = "./assets/fishes/" + this.type.image.rightSrc;
        this.spriteX = this.type.image.spriteX;
        this.spriteY = this.type.image.spriteY;
        this.spriteWidth = this.type.image.totalSpriteWidth / this.spriteX;
        this.spriteHeight = this.type.image.totalSpriteHeight / this.spriteY;
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;

        this.level = 1; //!to be implemented
        this.levelMeter = 0;
        this.r = this.spriteWidth / 34; //this.baseSize + this.level; //getRandomFromRange(10, 30);
        this.position = {
            x: getRandomFromRange(this.r, this.gameWidth - this.r),
            y: getRandomFromRange(this.r, this.gameHeight - this.r),
        };
        this.direction = {
            x: getRandomDirection(),
            y: getRandomDirection(),
        };
        this.gender = getGender(); //!to be implemented
        this.healthMeter = 100;
        this.hungerMeter = 0;

        this.changeYDirectionInterval = setInterval(
            this.changeYDirection,
            this.changeInterval.changeYDirection
        );
        this.changeXDirectionInterval = setInterval(
            this.changeXDirection,
            this.changeInterval.changeXDirection
        );

        setInterval(() => {
            this.frame++;
            this.frame %= 12;
            this.frameX = this.frame % 4;
            this.frameY = Math.floor((this.frame % 12) / 4);
        }, 200);
        // this.healthIncreaseInterval = setInterval(
        //     this.healthIncrease,
        //     this.changeInterval.health
        // );

        this.startHungerIncreaseInterval();
        this.startLevelUpInterval();
        // this.startHealthDecreaseInterval();
    }

    /**
     * update position of fish
     * @param {number} deltaTime change in time from previous frame
     */
    update = (deltaTime) => {
        this.fishCollisionDetection();

        if (game.gameMode === this.game.gameModes.MOVE && this.mouse.click) {
            this.userInputMovement(deltaTime);
        } else if (this.game.foods.length != 0 && this.hungerMeter > 0) {
            this.movementToFood(deltaTime);
        } else {
            this.normalMovement(deltaTime);
        }
        if (this.game.gameMode === this.game.gameModes.SELECT)
            this.checkForClick();

        // console.log(this.position.y, this.direction.y, deltaTime);
    };

    /**
     * draw fish object onto the game screen
     * @param {context} ctx context of canvas
     */
    draw = (ctx, x, y) => {
        // console.log("draw");
        if (!x && !y) {
            x = this.position.x;
            y = this.position.y;
        }
        // ctx.beginPath();
        // ctx.fillStyle = this.color;
        // ctx.arc(x, y, this.r, 0, 2 * Math.PI);
        // ctx.stroke();
        // ctx.fill();

        ctx.save();
        ctx.translate(x, y);
        // ctx.rotate(this.angle);
        if (this.direction.x < 0) {
            ctx.drawImage(
                this.leftImg,
                this.frameX * this.spriteWidth,
                this.frameY * this.spriteHeight,
                this.spriteWidth,
                this.spriteHeight,
                0 - this.r * 1.5,
                0 - this.r,
                3 * this.r,
                2 * this.r
            );
        }
        if (this.direction.x > 0) {
            ctx.drawImage(
                this.rightImg,
                (3 - this.frameX) * this.spriteWidth,
                (2 - this.frameY) * this.spriteHeight,
                this.spriteWidth,
                this.spriteHeight,
                0 - this.r * 1.5,
                0 - this.r,
                3 * this.r,
                2 * this.r
            );
        }
        ctx.restore();

        if (!this.game.showInfo) {
            this.drawHealthBar(ctx);
            this.drawHungerBar(ctx);
        }
    };

    drawHealthBar = (ctx, x, y, maxWidth) => {
        if (!x && !y) {
            maxWidth = 40 + this.level;
            x = this.position.x - maxWidth / 2;
            y = this.position.y - this.r - 17;
        }
        let w = (this.healthMeter / this.maxHealthMeter) * maxWidth;
        let h = 4;
        ctx.lineWidth = 4;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#333";
        ctx.fillStyle = "#6aa06a";
        ctx.strokeRect(x, y, maxWidth, h);
        ctx.fillRect(x, y, w, h);
    };

    drawHungerBar = (ctx, x, y, maxWidth) => {
        if (!x && !y) {
            maxWidth = 40 + this.level;
            x = this.position.x - maxWidth / 2;
            y = this.position.y - this.r - 10;
        }
        let w = (this.hungerMeter / this.maxHungerMeter) * maxWidth;
        let h = 4;
        ctx.lineWidth = 4;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#333";
        ctx.strokeRect(x, y, maxWidth, h);
        ctx.fillStyle = "#e4ae4b";
        ctx.fillRect(x, y, w, h);
    };

    normalMovement = (deltaTime) => {
        let theta = 0;
        if (this.direction.y === 0) {
            theta = Math.atan2(this.direction.x, -this.direction.x);
        } else {
            theta = Math.atan2(this.direction.x, this.direction.y);
        }

        this.angle = theta;
        this.position.x += this.direction.x; //* this.speed) / deltaTime;
        this.position.y += this.direction.y; //* this.speed) / deltaTime;
    };

    userInputMovement = (deltaTime) => {
        const dx = this.position.x - this.mouse.x;
        const dy = this.position.y - this.mouse.y;
        if (dx > 0) {
            this.changeXDirection(-1);
        }
        if (dx < 0) {
            this.changeXDirection(1);
        }
        let theta = Math.atan2(dx, dy);
        this.angle = theta;

        if (this.mouse.x != this.position.x) {
            this.position.x -= dx / (3 * deltaTime);
            // this.mouse.click = false;
        }
        if (this.mouse.y != this.position.y) {
            this.position.y -= dy / (3 * deltaTime);
        }
        if (Math.abs(dx) < 1) {
            this.game.inputHandler.resetMouseClick();
        }
    };

    movementToFood = (deltaTime) => {
        let minimumFoodIndex = this.getMinimumFood();
        let minimumFood = this.game.foods[minimumFoodIndex];

        const dx = this.position.x - minimumFood.position.x;
        const dy = this.position.y - minimumFood.position.y;
        if (dx > 0) {
            this.changeXDirection(-1);
        }
        if (dx < 0) {
            this.changeXDirection(1);
        }
        let theta = Math.atan2(dx, dy);
        this.angle = theta;

        if (minimumFood.position.x != this.position.x) {
            this.position.x -= dx / (3 * deltaTime);
            // this.mouse.click = false;
        }
        if (minimumFood.position.y != this.position.y) {
            this.position.y -= dy / (3 * deltaTime);
        }
        if (Math.abs(getDistance(dx, dy)) < this.r + minimumFood.r) {
            if (!minimumFood.eaten) {
                this.eatFood(minimumFoodIndex);
            }
        }
    };

    getMinimumFood = () => {
        let minimumDistance = undefined;
        let minimumFoodIndex = undefined;
        this.game.foods.forEach((food, index) => {
            let distance = Math.abs(
                getDistance(
                    this.position.x,
                    this.position.y,
                    food.position.x,
                    food.position.x
                )
            );
            if (minimumFoodIndex === undefined || minimumDistance > distance) {
                minimumDistance = distance;
                minimumFoodIndex = index;
            }
        });
        return minimumFoodIndex;
    };

    eatFood = (minimumFoodIndex) => {
        let minimumFood = this.game.foods[minimumFoodIndex];
        minimumFood.eaten = true;
        this.hungerDecrease();
        this.game.foods.splice(minimumFoodIndex, 1);
        this.game.updateGameObjects();
        console.log("Food Eaten");
    };

    checkForClick = () => {
        if (
            this.game.mouse.click &&
            this.game.gameMode === this.game.gameModes.SELECT &&
            !this.game.showInfo
        ) {
            const dx = this.position.x - this.game.mouse.x;
            const dy = this.position.y - this.game.mouse.y;
            if (Math.abs(getDistance(dx, dy)) < this.r) {
                this.game.toggleShowInfo(this);
                this.game.mouse.click = false;
            }
        }
    };
    /**
     *detect the edge of the fish tank
     */
    wallCollisionDetection = () => {
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

    junkCollisionDetection = () => {
        this.game.junks.forEach((junk) => {
            let dx = this.position.x - junk.position.x;
            let dy = this.position.y - junk.position.y;

            if (Math.abs(getDistance(dx, dy)) < this.r + junk.r) {
                this.direction.x = -this.direction.x;
                this.changeYDirection(-this.direction.y);
            }
        });
    };

    fishCollisionDetection = () => {
        this.wallCollisionDetection();
        // this.junkCollisionDetection();
    };

    /**
     * Changes Y-direction of fish to given or random value
     * @param {number} dir change direction of fish in this direction
     */
    changeYDirection = (dir) => {
        if (dir != undefined) {
            this.direction.y = dir;
        } else {
            this.direction.y = getRandomDirection();
        }
        setTimeout(this.resetYDirection, 500);
    };

    changeXDirection = (dir) => {
        if (dir != undefined) {
            this.direction.x = dir;
        } else {
            this.direction.x = getRandomDirection();
        }
    };

    /**
     * Reset Y-direction of fish to zero.
     */
    resetYDirection = () => {
        this.direction.y = 0;
    };

    healthDecrease = () => {
        if (this.game.junks.length !== 0) {
            this.healthMeter -= 10;
            if (this.healthMeter <= 0) {
                this.healthMeter = 0;
                // console.log("fish has died");
            }
        }
    };
    healthIncrease = () => {
        if (
            this.game.junks.length === 0 &&
            this.hungerMeter === 0 &&
            this.healthMeter < 100
        ) {
            this.healthMeter += 10;
            if (this.healthMeter > 100) {
                this.healthMeter = 100;
                clearInterval(this.healthDecreaseInterval);
                setTimeout(
                    this.startHealthDecreaseInterval,
                    // () =>
                    //     (this.healthDecreaseInterval = setInterval(
                    //         this.healthDecrease,
                    //         this.changeInterval.health
                    //     )),
                    this.changeInterval.healthTimeout
                );
            }
            // console.log(this.healthMeter);
        }
    };

    hungerIncrease = () => {
        this.hungerMeter += 10;
        if (this.hungerMeter > 100) {
            this.hungerMeter = 100;
            this.healthDecrease();
        }
        // console.log(
        //     "hungerIncrease",
        //     "hunger:" + this.hungerMeter,
        //     "health:" + this.healthMeter
        // );
    };
    hungerDecrease = () => {
        this.hungerMeter -= 20;
        if (this.hungerMeter < 0) {
            this.hungerMeter = 0;
            clearInterval(this.hungerIncreaseInterval);
            setTimeout(
                this.startHungerIncreaseInterval,
                // () =>
                //     (this.hungerIncreaseInterval = setInterval(
                //         this.hungerIncrease,
                //         this.changeInterval.hunger
                //     )),
                this.changeInterval.hungerTimeout
            );
        }
        console.log(
            "hungerDecrease",
            "hunger:" + this.hungerMeter,
            "health:" + this.healthMeter
        );
    };
    levelMeterUp = () => {
        this.levelMeter += 50;
        console.log(this.levelMeter);
        if (this.levelMeter > 100) {
            this.levelUp();
        }
    };
    levelUp = () => {
        this.level++;
        this.r = this.r + 0.5;
        this.levelMeter = 0;
        clearInterval(this.levelUpInterval);
        this.startLevelUpInterval();
    };
    startHungerIncreaseInterval = () =>
        (this.hungerIncreaseInterval = setInterval(
            this.hungerIncrease,
            this.changeInterval.hunger
        ));
    startHealthDecreaseInterval = () =>
        (this.healthDecreaseInterval = setInterval(
            this.healthDecrease,
            this.changeInterval.health
        ));
    startLevelUpInterval = () => {
        this.levelUpInterval = setInterval(
            this.levelMeterUp,
            this.changeInterval.levelUp * this.level
        );
    };
}
