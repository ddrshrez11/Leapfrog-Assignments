import Coin from "./coin.js";
import Fish from "./fish.js";
import Food from "./food.js";
import InputHandler from "./inputHandler.js";
import Junk from "./junk.js";
import { fishTypes } from "./fishTypes.js";
import FishInfo from "./fishInfo.js";

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
        this.fishTypesArray = Object.keys(fishTypes);
        this.showInfo = false;
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

        this.bgImg = new Image();
        this.bgImg.src = "./assets/otherObjects/bg1.jpg";
    }

    /**
     * function to initialize objects
     */
    start = () => {
        // for (let index = 0; index < 10; index++) {
        this.fishes = [];
        this.coins = [];
        this.foods = [];
        this.junks = [];
        this.inputHandler = new InputHandler(this);
        this.fishInfo = [];

        // this.fishes.push(new Fish(this, "blue"));
        this.fishes.push(new Fish(this, "black"));
        // this.fishes.push(new Fish(this, "green"));

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
        this.drawBg(ctx);
        this.gameObjects.forEach((object) => {
            object.draw(ctx);
        });
        // if (this.showInfo) {
        //     this.drawShowInfoBox(ctx);
        // }
    };

    drawBg = (ctx) => {
        ctx.drawImage(this.bgImg, 0, 0, this.gameWidth, this.gameHeight);
    };
    buyFish = () => {
        let color = getRandomFromArray(this.fishTypesArray);
        this.fishes.push(new Fish(this, color));
        this.updateGameObjects();
    };
    createFood = () => {
        //if (this.gameMode === 1 && this.mouse.click) {
        this.foods.push(new Food(this, this.mouse.x, this.mouse.y));
        this.updateGameObjects();
        this.inputHandler.resetMouseClick();
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

    createCoin = (x, y) => {
        if (this.coins.length >= this.limit.coin) {
            clearInterval(this.createCoinInterval);
            this.createCoinInterval = false;
            return;
        }
        let newCoin = new Coin(this, x, y);
        let overlapping = false;
        this.coins.every((coin) => {
            let dx = Math.abs(coin.position.x - newCoin.position.x);
            if (dx < coin.r + newCoin.r) {
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
            ...this.fishInfo,
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
            return !coin.collected;
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

    toggleShowInfo = (fish) => {
        if (this.showInfo) {
            this.showInfo = false;
            this.fishInfo.pop();
        } else {
            this.fishInfo.push(new FishInfo(fish));
            this.showInfo = true;
        }
        this.updateGameObjects();
    };

    // drawShowInfoBox = (ctx1) => {
    //     ctx1.rect(50, 50, 200, 200);
    //     ctx1.fillStyle = "rgba(255, 100, 0, 0.8)";
    //     ctx1.fill();
    // };
}
