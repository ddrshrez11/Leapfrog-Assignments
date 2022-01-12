import { fishTypes } from "./data.js";
export default class Fish {
    /**
     * @constructor
     * @param {Game} game Game object
     */
    constructor(game, type, fishInfo) {
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
        this.price = this.type.price;

        this.sold = false;
        // this.baseSize = this.type.baseSize;

        if (fishInfo) {
            this.name = fishInfo.name;
            this.level = fishInfo.level;
            this.levelMeter = fishInfo.levelMeter;
            this.gender = fishInfo.gender;
            this.healthMeter = fishInfo.healthMeter;
            this.hungerMeter = fishInfo.hungerMeter;
            this.pregnancy = fishInfo.pregnancy;
            this.postpartum = fishInfo.postpartum;
            this.reproductionCounter = fishInfo.reproductionCounter;
        } else {
            this.level = 1;
            this.levelMeter = 0;
            this.gender = getGender(); //!to be implemented
            this.healthMeter = 100;
            this.hungerMeter = 100;
            this.pregnancy = false;
            this.postpartum = false;
            this.reproductionCounter = 0;
        }

        if (this.pregnancy) {
            this.startReproduction();
        }

        this.value = 2 * this.level;
        this.angle = 0;

        //image
        this.leftImg = this.game.loadedAssets[`${this.color}_left`];
        this.rightImg = this.game.loadedAssets[`${this.color}_right`];
        this.spriteX = this.type.image.spriteX;
        this.spriteY = this.type.image.spriteY;
        this.spriteWidth = this.type.image.totalSpriteWidth / this.spriteX;
        this.spriteHeight = this.type.image.totalSpriteHeight / this.spriteY;
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.theta = 0;

        this.baseSize = this.spriteWidth / 20;
        this.r = this.baseSize + 2 * this.level; //this.spriteWidth / 20; //getRandomFromRange(10, 30);
        this.hRatio = 6;
        this.wRatio = 4;
        this.barWidth;
        this.barHeight;

        this.levelUpSound = this.game.sounds.levelUp;
        this.controlFishSound = this.game.sounds.controlFish;

        this.position = {
            x: getRandomFromRange(this.r, this.gameWidth - this.r),
            y: getRandomFromRange(this.r, this.gameHeight - this.r),
        };
        this.direction = {
            x: getRandomDirection(),
            y: getRandomDirection(),
        };

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
            this.frame %= this.spriteX * this.spriteY;
            this.frameX = this.frame % this.spriteX;
            this.frameY = Math.floor(
                (this.frame % (this.spriteX * this.spriteY)) / this.spriteX
            );
        }, 200);
        // this.healthIncreaseInterval = setInterval(
        //     this.healthIncrease,
        //     this.changeInterval.health
        // );

        this.startHungerIncreaseInterval();
        this.startLevelUpInterval();
        // this.startHealthDecreaseInterval();

        this.obj = {};
    }

    /**
     * update position of fish
     * @param {number} deltaTime change in time from previous frame
     */
    update = (deltaTime) => {
        this.fishCollisionDetection();
        if (this.pregnancy || this.postpartum) this.checkReproduction();
        if (
            game.gameMode === this.game.gameModes.SELECT &&
            this.mouse.click &&
            (this.game.mouse.x < this.game.menu.menuX ||
                this.game.mouse.x >
                    this.game.menu.menuX + this.game.menu.menuWidth ||
                this.game.mouse.y < this.game.menu.menuY ||
                this.game.mouse.y >
                    this.game.menu.menuY + this.game.menu.menuHeight)
        ) {
            this.userInputMovement(deltaTime);
            this.checkForClick();
        } else if (this.game.foods.length != 0 && this.hungerMeter < 100) {
            this.movementToFood(deltaTime);
        } else if (this.game.pills.length != 0 && this.healthMeter < 100) {
            this.movementToPill(deltaTime);
        } else {
            this.normalMovement(deltaTime);
        }
        // if (this.game.gameMode === this.game.gameModes.SELECT)
        //     this.checkForClick();

        // console.log(this.position.y, this.direction.y, deltaTime);
    };

    /**
     * draw fish object onto the game screen
     * @param {context} ctx context of canvas
     */
    draw = (ctx) => {
        // ctx.beginPath();
        // ctx.fillStyle = this.color;
        // ctx.arc(x, y, this.r, 0, 2 * Math.PI);
        // ctx.stroke();
        // ctx.fill();

        ctx.save();
        ctx.translate(this.position.x, this.position.y);
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
            ctx.rotate(1 * Math.PI);
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

        if (!this.game.toggle.showInfo) {
            this.drawHealthBar(ctx);
            this.drawHungerBar(ctx);
        }
    };

    drawInfo = (ctx, x, y) => {
        // ctx.beginPath();
        // ctx.fillStyle = this.color;
        // ctx.arc(x, y, this.baseSize, 0, 2 * Math.PI);
        // ctx.stroke();
        // ctx.fill();

        // ctx.save();
        // ctx.translate(x, y);
        // if (this.direction.x < 0) {
        ctx.drawImage(
            this.leftImg,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            x - this.baseSize * (this.hRatio / 2),
            y - this.baseSize * (this.wRatio / 2),
            this.hRatio * this.baseSize,
            this.wRatio * this.baseSize
        );
        // }
        // if (this.direction.x > 0) {
        //     ctx.rotate(1 * Math.PI);
        //     ctx.drawImage(
        //         this.rightImg,
        //         (3 - this.frameX) * this.spriteWidth,
        //         (2 - this.frameY) * this.spriteHeight,
        //         this.spriteWidth,
        //         this.spriteHeight,
        //         0 - this.baseSize * (this.hRatio / 2),
        //         0 - this.baseSize * (this.wRatio / 2),
        //         this.hRatio * this.baseSize,
        //         this.wRatio * this.baseSize
        //     );
        // }
        // ctx.restore();
    };

    drawHealthBar = (ctx, x, y, maxWidth) => {
        if (!x && !y) {
            maxWidth = 40 + this.level;
            x = this.position.x - maxWidth / 2;
            y = this.position.y - this.r - 17;
        }
        this.barWidth = (this.healthMeter / this.maxHealthMeter) * maxWidth;
        this.barHeight = 4;
        ctx.lineWidth = 4;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#333";
        ctx.fillStyle = "#6aa06a";
        ctx.strokeRect(x, y, maxWidth, this.barHeight);
        ctx.fillRect(x, y, this.barWidth, this.barHeight);
    };

    drawHungerBar = (ctx, x, y, maxWidth) => {
        if (!x && !y) {
            maxWidth = 40 + this.level;
            x = this.position.x - maxWidth / 2;
            y = this.position.y - this.r - 10;
        }
        this.barWidth = (this.hungerMeter / this.maxHungerMeter) * maxWidth;
        this.barHeight = 4;
        ctx.lineWidth = 4;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#333";
        ctx.strokeRect(x, y, maxWidth, this.barHeight);
        ctx.fillStyle = "#e4ae4b";
        ctx.fillRect(x, y, this.barWidth, this.barHeight);
    };

    normalMovement = (deltaTime) => {
        this.theta = 0;
        if (this.direction.y === 0) {
            this.theta = Math.atan2(this.direction.x, -this.direction.x);
        } else {
            this.theta = Math.atan2(this.direction.x, this.direction.y);
        }

        this.angle = this.theta;
        this.position.x += this.direction.x; //* this.speed) / deltaTime;
        this.position.y += this.direction.y; //* this.speed) / deltaTime;
    };

    userInputMovement = (deltaTime) => {
        if (
            !this.game.toggle.showInfo &&
            !this.game.toggle.showFishShop &&
            !this.game.toggle.showShop
        )
            this.controlFishSound.play();
        this.dx = this.position.x - this.mouse.x;
        this.dy = this.position.y - this.mouse.y;
        if (this.dx > 0) {
            this.changeXDirection(-1);
        }
        if (this.dx < 0) {
            this.changeXDirection(1);
        }
        this.theta = Math.atan2(this.dx, this.dy);
        this.angle = this.theta;

        if (this.mouse.x != this.position.x) {
            this.position.x -= this.dx / (3 * deltaTime);
            // this.mouse.click = false;
        }
        if (this.mouse.y != this.position.y) {
            this.position.y -= this.dy / (3 * deltaTime);
        }
        if (Math.abs(this.dx) < 1) {
            this.game.inputHandler.resetMouseClick();
        }
    };

    movementToFood = (deltaTime) => {
        this.minimumFoodIndex = this.getMinimumFood();
        this.minimumFood = this.game.foods[this.minimumFoodIndex];

        this.dx = this.position.x - this.minimumFood.position.x;
        this.dy = this.position.y - this.minimumFood.position.y;
        if (this.dx > 0) {
            this.changeXDirection(-1);
        }
        if (this.dx < 0) {
            this.changeXDirection(1);
        }
        this.theta = Math.atan2(this.dx, this.dy);
        this.angle = this.theta;

        if (this.minimumFood.position.x != this.position.x) {
            this.position.x -= this.dx / (3 * deltaTime);
            // this.mouse.click = false;
        }
        if (this.minimumFood.position.y != this.position.y) {
            this.position.y -= this.dy / (3 * deltaTime);
        }
        if (
            Math.abs(getDistance(this.dx, this.dy)) <
            this.r + this.minimumFood.r
        ) {
            if (!this.minimumFood.eaten) {
                this.eatFood(this.minimumFoodIndex);
            }
        }
    };

    getMinimumFood = () => {
        this.minimumDistance = undefined;
        this.minimumFoodIndex = undefined;
        this.game.foods.forEach((food, index) => {
            this.distance = Math.abs(
                getDistance(
                    this.position.x,
                    this.position.y,
                    food.position.x,
                    food.position.x
                )
            );
            if (
                this.minimumFoodIndex === undefined ||
                this.minimumDistance > this.distance
            ) {
                this.minimumDistance = this.distance;
                this.minimumFoodIndex = index;
            }
        });
        return this.minimumFoodIndex;
    };

    eatFood = (minimumFoodIndex) => {
        this.minimumFood = this.game.foods[minimumFoodIndex];
        this.hungerDecrease();
        this.minimumFood.eaten = true;

        this.game.updateFoods();
        // this.game.foods.splice(minimumFoodIndex, 1);
        // this.game.updateGameObjects();
        console.log("Food Eaten");
    };

    movementToPill = (deltaTime) => {
        this.minimumPillIndex = this.getMinimumPill();
        this.minimumPill = this.game.pills[this.minimumPillIndex];

        this.dx = this.position.x - this.minimumPill.position.x;
        this.dy = this.position.y - this.minimumPill.position.y;
        if (this.dx > 0) {
            this.changeXDirection(-1);
        }
        if (this.dx < 0) {
            this.changeXDirection(1);
        }
        this.theta = Math.atan2(this.dx, this.dy);
        this.angle = this.theta;

        if (this.minimumPill.position.x != this.position.x) {
            this.position.x -= this.dx / (3 * deltaTime);
            // this.mouse.click = false;
        }
        if (this.minimumPill.position.y != this.position.y) {
            this.position.y -= this.dy / (3 * deltaTime);
        }
        if (
            Math.abs(getDistance(this.dx, this.dy)) <
            this.r + this.minimumPill.r
        ) {
            if (!this.minimumPill.eaten) {
                this.eatPill(this.minimumPillIndex);
            }
        }
    };

    getMinimumPill = () => {
        this.minimumDistance = undefined;
        this.minimumPillIndex = undefined;
        this.game.pills.forEach((pill, index) => {
            this.distance = Math.abs(
                getDistance(
                    this.position.x,
                    this.position.y,
                    pill.position.x,
                    pill.position.x
                )
            );
            if (
                this.minimumPillIndex === undefined ||
                this.minimumDistance > this.distance
            ) {
                this.minimumDistance = this.distance;
                this.minimumPillIndex = index;
            }
        });
        return this.minimumPillIndex;
    };

    eatPill = (minimumPillIndex) => {
        this.minimumPill = this.game.pills[minimumPillIndex];
        this.healthIncrease();
        this.minimumPill.eaten = true;

        this.game.updatePills();
        // this.game.pills.splice(minimumPillIndex, 1);
        // this.game.updateGameObjects();
        console.log("Pill Eaten");
    };

    checkForClick = () => {
        if (
            this.game.mouse.click &&
            this.game.gameMode === this.game.gameModes.SELECT &&
            !this.game.toggle.showInfo &&
            !this.game.toggle.showShop &&
            !this.game.toggle.showFishShop
        ) {
            this.dx = this.position.x - this.game.mouse.x;
            this.dy = this.position.y - this.game.mouse.y;
            if (Math.abs(getDistance(this.dx, this.dy)) < this.r) {
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
            this.dx = this.position.x - junk.position.x;
            this.dy = this.position.y - junk.position.y;

            if (Math.abs(getDistance(this.dx, this.dy)) < this.r + junk.r) {
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
            // this.game.save.saveFishes();
        }
    };
    healthIncrease = () => {
        if (this.healthMeter < 100) {
            this.healthMeter += 10;
            if (this.healthMeter > 100) {
                this.healthMeter = 100;
                clearInterval(this.healthDecreaseInterval);
                this.healthDecreaseInterval = false;
                if (!this.healthDecreaseInterval) {
                    setTimeout(
                        this.startHealthDecreaseInterval,
                        this.changeInterval.healthTimeout
                    );
                }
            }
            // console.log(this.healthMeter);
        }
    };

    hungerIncrease = () => {
        this.hungerMeter -= 10;
        if (this.hungerMeter < 0) {
            this.hungerMeter = 0;
            setTimeout(() => {
                if (!this.healthDecreaseInterval) {
                    this.startHealthDecreaseInterval();
                }
            }, this.changeInterval.healthTimeout);
        }
        // this.game.save.saveFishes();
        // console.log(
        //     "hungerIncrease",
        //     "hunger:" + this.hungerMeter,
        //     "health:" + this.healthMeter
        // );
    };
    hungerDecrease = () => {
        this.hungerMeter += 20;
        if (this.hungerMeter > 100) {
            this.hungerMeter = 100;
            clearInterval(this.hungerIncreaseInterval);
            setTimeout(
                this.startHungerIncreaseInterval,
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
        this.levelMeter += 10;
        console.log(this.levelMeter);
        if (this.levelMeter > 100) {
            this.levelUp();
        }
        // this.game.save.saveFishes();
    };
    levelUp = () => {
        console.log("levelUp");
        this.level++;
        this.r = this.r + 2;
        this.value = 2 * this.level;
        this.levelMeter = 0;
        this.levelUpSound.play();
        clearInterval(this.levelUpInterval);
        this.startLevelUpInterval();
        if (
            this.level > 15 &&
            this.gender === "Female" &&
            !this.pregnancy &&
            !this.postpartum
        ) {
            if (this.checkForMate()) {
                this.startPregnancy();
            }
        }
    };
    startHungerIncreaseInterval = () =>
        (this.hungerIncreaseInterval = setInterval(
            this.hungerIncrease,
            this.changeInterval.hunger
        ));
    startHealthDecreaseInterval = () =>
        (this.healthDecreaseInterval = setInterval(
            this.healthDecrease,
            this.changeInterval.healthTimeout
        ));
    startLevelUpInterval = () => {
        this.levelUpInterval = setInterval(
            this.levelMeterUp,
            this.changeInterval.levelUp * this.level
        );
    };

    checkForMate = () => {
        if (this.level < 15) return false;
        return this.game.fishes.some((fish) => {
            if (
                fish.color === this.color &&
                fish.level >= 15 &&
                fish.gender === "Male"
            ) {
                return true;
            }
            return false;
        });
    };

    startPregnancy = () => {
        console.log("startPregnancy");
        this.pregnancy = true;
        this.startReproduction();
    };

    startReproduction = () => {
        console.log("startReproduction");
        this.reproductionInterval = setInterval(() => {
            this.reproductionCounter++;
        }, this.changeInterval.reproductionCounter);
    };

    checkReproduction = () => {
        if (this.reproductionCounter > 70 && this.pregnancy) {
            console.log("birth");
            this.game.buyFish(this.color);
            this.pregnancy = false;
            this.postpartum = true;
        } else if (this.reproductionCounter > 100) {
            clearInterval(this.reproductionInterval);
            this.reproductionCounter = 0;
            this.postpartum = false;
        }
    };

    save = () => {
        this.obj.name = this.name;
        this.obj.color = this.color;
        this.obj.level = this.level;
        this.obj.levelMeter = this.levelMeter;
        this.obj.gender = this.gender;
        this.obj.healthMeter = this.healthMeter;
        this.obj.hungerMeter = this.hungerMeter;
        this.obj.pregnancy = this.pregnancy;
        this.obj.postpartum = this.postpartum;
        this.obj.reproductionCounter = this.reproductionCounter;
        return this.obj;
    };
}
