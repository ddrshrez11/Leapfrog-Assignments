export default class Fish {
    /**
     * @constructor
     * @param {Game} game Game object
     */
    constructor(game) {
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.mouse = game.mouse;

        this.r = getRandomFromRange(10, 30);
        this.position = {
            x: getRandomFromRange(this.r, this.gameWidth - this.r),
            y: getRandomFromRange(this.r, this.gameHeight - this.r),
        };
        this.direction = {
            x: getRandomDirection(),
            y: getRandomDirection(),
        };
        this.gender = "M";
        this.speed = 10;
        this.level = 1;
        this.maxHealthMeter = 100;
        this.maxhungerMeter = 100;
        this.healthMeter = 100;
        this.hungerMeter = 0;
        this.changeInterval = {
            health: 2500,
            hunger: 2000,
            healthTimeout: 5000,
            hungerTimeout: 5000,
            changeXDirection: 5000,
            changeYDirection: 4000,
            resetYDirection: 500,
        };

        this.changeYDirectionInterval = setInterval(
            this.changeYDirection,
            this.changeInterval.changeYDirection
        );
        this.changeXDirectionInterval = setInterval(
            this.changeXDirection,
            this.changeInterval.changeXDirection
        );
        this.healthIncreaseInterval = setInterval(
            this.healthIncrease,
            this.changeInterval.health
        );

        this.startHungerIncreaseInterval();
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

        // console.log(this.position.y, this.direction.y, deltaTime);
    };

    /**
     * draw fish object onto the game screen
     * @param {context} ctx context of canvas
     */
    draw = (ctx) => {
        // console.log("draw");
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.arc(this.position.x, this.position.y, this.r, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    };

    normalMovement = (deltaTime) => {
        this.position.x += (this.direction.x * this.speed) / deltaTime;
        this.position.y += (this.direction.y * this.speed) / deltaTime;
    };

    userInputMovement = (deltaTime) => {
        const dx = this.position.x - this.mouse.x;
        const dy = this.position.y - this.mouse.y;
        if (this.mouse.x != this.position.x) {
            this.position.x -= dx / (3 * deltaTime);
            // this.mouse.click = false;
        }
        if (this.mouse.y != this.position.y) {
            this.position.y -= dy / (3 * deltaTime);
        }
        if (Math.abs(dx) < 1) {
            this.mouse.click = false;
        }
    };

    movementToFood = (deltaTime) => {
        let minimumFoodIndex = this.getMinimumFood();
        let minimumFood = this.game.foods[minimumFoodIndex];

        const dx = this.position.x - minimumFood.position.x;
        const dy = this.position.y - minimumFood.position.y;
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

    changeXDirection = () => {
        this.direction.x = getRandomDirection();
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
                console.log("fish has died");
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
            console.log(this.healthMeter);
        }
    };

    hungerIncrease = () => {
        this.hungerMeter += 10;
        if (this.hungerMeter > 100) {
            this.hungerMeter = 100;
            this.healthDecrease();
        }
        console.log(
            "hungerIncrease",
            "hunger:" + this.hungerMeter,
            "health:" + this.healthMeter
        );
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
}
