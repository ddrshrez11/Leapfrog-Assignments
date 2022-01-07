import Coin from "./coin.js";
import Fish from "./fish.js";
import Food from "./food.js";
import InputHandler from "./inputHandler.js";
import Junk from "./junk.js";

export default class Game {
    /**
     * @constructor
     * @param {number} gameWidth Width of game screen
     * @param {number} gameHeight Height of game screen
     */
    constructor(gameWidth, gameHeight, canvas) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.canvas = canvas;
        this.canvasPosition = this.canvas.getBoundingClientRect();
        this.limit = {
            junk: 10,
            coin: 10,
        };
        this.money = 0;

        this.gameModes = {
            MOVE: 0,
            FEED: 1,
            CLEAN: 2,
            SELECT: 3,
        };
        this.gameMode = this.gameModes.MOVE;
        this.changeInterval = {
            junk: 10000,
            coin: 10000,
        };
        this.mouse = {
            x: 0,
            y: 0,
            click: false,
        };

        // this.canvas.style.cursor = `url(
        //     http://www.rw-designer.com/cursor-extern.php?id=45618
        // ),default`;
        this.canvas.style.cursor = `url(
            http://www.rw-designer.com/cursor-extern.php?id=23450
        ),default`;
    }

    /**
     * function to initialize objects
     */
    start = () => {
        // for (let index = 0; index < 10; index++) {
        this.fishes = [];
        this.coins = [];
        this.fishes.push(new Fish(this));
        // this.fishes.push(new Fish(this));
        // this.fish = new Fish(this);
        // fish.draw(ctx);
        // }
        this.foods = [];
        this.food = new Food(this, 400, 100);
        this.junks = [];
        // for (let index = 0; index < 5; index++) {
        //     this.createJunk();
        //     //this.junks.push(new Junk(this));
        // }
        this.createJunkInterval = setInterval(
            this.createJunk,
            this.changeInterval.junk
        );
        this.createCoinInterval = setInterval(
            this.createCoin,
            this.changeInterval.coin
        );
        this.gameObjects = []; // ...this.junks];
        this.updateGameObjects();
        this.inputHandler = new InputHandler(this);
    };

    /**
     * update position of all game objects
     * @param {number} deltaTime
     */
    update = (deltaTime) => {
        this.gameObjects.forEach((object) => {
            object.update(deltaTime);
        });
    };

    /**
     * draw all game objects onto the screen
     * @param {context} ctx
     */
    draw = (ctx) => {
        this.gameObjects.forEach((object) => {
            object.draw(ctx);
        });
    };
    buyFish = () => {
        this.fishes.push(new Fish(this));
        this.updateGameObjects();
    };
    createFood = () => {
        //if (this.gameMode === 1 && this.mouse.click) {
        this.foods.push(new Food(this, this.mouse.x, this.mouse.y));
        this.updateGameObjects();
        this.mouse.click = false;
        console.log("new food");
        //}
    };

    createJunk = () => {
        if (this.junks.length >= this.limit.junk) {
            clearInterval(this.createJunkInterval);
            this.createJunkInterval = false;
            return;
        }
        let newJunk = new Junk(this);
        let overlapping = false;
        this.junks.every((junk) => {
            let dx = junk.position.x - newJunk.position.x;
            let dy = junk.position.y - newJunk.position.y;
            let distance = Math.abs(getDistance(dx, dy));
            if (distance < junk.r + newJunk.r) {
                overlapping = true;
                return false;
            }
            return true;
        });
        if (overlapping) {
            this.createJunk();
        } else {
            this.junks.push(newJunk);
            this.updateJunks();
        }
    };
    createCoin = () => {
        if (this.coins.length >= this.limit.coin) {
            clearInterval(this.createCoinInterval);
            this.createCoinInterval = false;
            return;
        }
        let newCoin = new Coin(this);
        let overlapping = false;
        this.coins.every((coin) => {
            let dx = coin.position.x - newCoin.position.x;
            let dy = coin.position.y - newCoin.position.y;
            let distance = Math.abs(getDistance(dx, dy));
            if (distance < coin.r + newCoin.r) {
                overlapping = true;
                return false;
            }
            return true;
        });
        if (overlapping) {
            this.createCoin();
        } else {
            this.coins.push(newCoin);
            this.updateCoins();
        }
    };

    updateGameObjects = () => {
        this.fishes.sort(function (a, b) {
            return b.r - a.r;
        });
        this.gameObjects = [
            ...this.junks,
            ...this.coins,
            ...this.fishes,
            ...this.foods,
        ];
    };

    updateJunks = () => {
        this.junks = this.junks.filter((junk) => {
            return !junk.cleaned;
        });
        if (this.junks.length === 0) {
            this.fishes.forEach((fish) => {
                clearInterval(fish.healthDecreaseInterval);
            });
            // this.fish.startHealthDecreaseInterval();
        } else {
            this.fishes.forEach((fish) => {
                fish.startHealthDecreaseInterval();
            });
            // clearInterval(this.fish.healthDecreaseInterval);
        }

        this.updateGameObjects();
    };

    updateCoins = () => {
        this.coins = this.coins.filter((coin) => {
            return !coin.cleaned;
        });

        this.updateGameObjects();
    };

    updateCursor = () => {
        let cursorName;
        switch (this.gameMode) {
            case this.gameModes.MOVE:
                cursorName = "hand-cursor";
                break;
            case this.gameModes.FEED:
                cursorName = "pot-purple";
                break;
            case this.gameModes.CLEAN:
                cursorName = "diamond-pick";
                break;
            case this.gameModes.SELECT:
                cursorName = "hand-cursor";
                break;
            default:
                cursorName = "hand-cursor";
                break;
        }
        this.canvas.style.cursor = `url(
            assets/cursors/${cursorName}.cur
        ),default`;
    };
}
