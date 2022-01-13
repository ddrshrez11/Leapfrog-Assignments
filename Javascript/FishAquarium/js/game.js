import Coin from "./coin.js";
import { fishTypes } from "./data.js";
import Fish from "./fish.js";
import FishInfo from "./fishInfo.js";
import Food from "./food.js";
import { Help } from "./gameHelp.js";
import InputHandler from "./inputHandler.js";
import Junk from "./junk.js";
import Menu from "./menu.js";
import Pill from "./pill.js";
import Save from "./save.js";
import { FishShop, Shop } from "./shop.js";
import { getDistance, getRandomFromArray } from "./utils.js";

export default class Game {
    /**
     * @constructor
     * @param {number} gameWidth Width of game screen
     * @param {number} gameHeight Height of game screen
     */
    constructor(gameWidth, gameHeight, canvas, loadedAssets, sounds) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.canvas = canvas;
        this.canvasPosition = this.canvas.getBoundingClientRect();
        this.fishTypesArray = Object.keys(fishTypes);
        this.save = new Save(this);

        this.loadedAssets = loadedAssets;
        this.sounds = sounds;

        this.bgMusicSound = this.sounds.bgMusic;
        this.sellFishSound = this.sounds.sellFish;
        this.foodSound = this.sounds.food;
        this.pillSound = this.sounds.pill;
        this.errorSound = this.sounds.error;

        this.toggle = {
            showInfo: false,
            showFishShop: false,
            showShop: false,
            showHelp: false,
            isMute: false,
        };
        this.limit = {
            junk: 10,
            coin: 15,
        };
        this.money = this.save.getMoney() ? Number(this.save.getMoney()) : 100;
        this.bgIndex = this.save.getBgIndex() ? this.save.getBgIndex() : 0;

        this.gameModes = {
            SELECT: 0,
            FEED: 1,
            PILL: 2,
            CLEAN: 3,
        };
        this.gameMode = this.gameModes.SELECT;
        this.changeInterval = {
            junk: 10000,
            coin: 20000,
        };
        this.price = {
            food: 1,
            pill: 1,
        };
        this.mouse = {
            x: 0,
            y: 0,
            click: false,
        };
    }

    /**
     * function to initialize objects
     */
    start = () => {
        this.fishes = [];
        this.coins = [];
        this.foods = [];
        this.pills = [];
        this.junks = [];
        this.fishShop = [];
        this.shop = [];
        this.help = [];
        this.fishInfo = [];
        this.menu = new Menu(this);
        this.inputHandler = new InputHandler(this);

        this.fishesInfoArr = this.save.getFishes();
        if (this.fishesInfoArr) {
            this.fishesInfoArr.forEach((fishInfo) => {
                this.fishes.push(new Fish(this, fishInfo.color, fishInfo));
            });
        } else {
            this.fishes.push(new Fish(this, "blue"));
        }

        this.junkInfoArr = this.save.getJunks();
        if (this.junkInfoArr) {
            this.junkInfoArr.forEach((junkInfo) => {
                this.junks.push(new Junk(this, junkInfo));
            });
        }

        this.coinInfoArr = this.save.getCoins();
        if (this.coinInfoArr) {
            this.coinInfoArr.forEach((coinInfo) => {
                this.coins.push(
                    new Coin(
                        this,
                        coinInfo.position.x,
                        coinInfo.position.y,
                        coinInfo.bottomCollision
                    )
                );
            });
        }

        this.createJunkInterval = setInterval(
            this.createJunk,
            this.changeInterval.junk
        );
        this.createCoinInterval = setInterval(
            this.createCoin,
            this.changeInterval.coin
        );

        this.gameObjects = [];

        this.updateCursor();
        this.updateBg();
        this.updateGameObjects();

        this.clearFoodCount = 0;
    };

    /**
     * update position of all game objects
     * @param {number} deltaTime
     */
    update = (deltaTime) => {
        if (!this.toggle.isMute) this.bgMusicSound.play();
        if (this.toggle.isMute) this.bgMusicSound.stop();
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
    };

    /**
     * draw all game objects onto the screen
     * @param {context} ctx
     */
    drawBg = (ctx) => {
        ctx.drawImage(this.bgImg, 0, 0, this.gameWidth, this.gameHeight);
    };

    /**
     * add fish to the game
     * @param {string} color color of fish to add
     */
    buyFish = (color) => {
        if (!color) color = getRandomFromArray(this.fishTypesArray);
        this.fishes.push(new Fish(this, color));
        this.updateGameObjects();
    };

    /**
     * add food to the game
     */
    createFood = () => {
        if (this.handleBuy(this.price.food)) {
            if (!this.toggle.isMute) this.foodSound.play();
            if (this.toggle.isMute) this.foodSound.stop();
            this.foods.push(new Food(this, this.mouse.x, this.mouse.y));
            this.updateGameObjects();
            this.inputHandler.resetMouseClick();
        }
    };

    /**
     * add pill to the game
     */
    createPill = () => {
        if (this.handleBuy(this.price.food)) {
            if (!this.toggle.isMute) this.pillSound.play();
            this.pills.push(new Pill(this, this.mouse.x, this.mouse.y));
            this.updateGameObjects();
            this.inputHandler.resetMouseClick();
        }
    };

    /**
     * add Junk to the game
     */
    createJunk = () => {
        if (this.junks.length >= this.limit.junk) {
            clearInterval(this.createJunkInterval);
            this.createJunkInterval = false;
            return;
        }
        this.newJunk = new Junk(this);
        this.overlapping = false;
        this.junks.every((junk) => {
            this.dx = junk.position.x - this.newJunk.position.x;
            this.dy = junk.position.y - this.newJunk.position.y;
            this.distance = Math.abs(getDistance(this.dx, this.dy));
            if (this.distance < junk.r + this.newJunk.r) {
                this.overlapping = true;
                return false;
            }
            return true;
        });
        if (this.overlapping) {
            this.createJunk();
        } else {
            this.junks.push(this.newJunk);
            this.updateJunks();
        }
        this.newJunk = undefined;
    };

    /**
     * add coin to the game
     */
    createCoin = (x, y) => {
        if (this.coins.length >= this.limit.coin) {
            clearInterval(this.createCoinInterval);
            this.createCoinInterval = false;
            return;
        }
        this.newCoin = new Coin(this, x, y);
        this.overlapping = false;
        this.coins.every((coin) => {
            this.dx = Math.abs(coin.position.x - this.newCoin.position.x);
            if (this.dx < coin.r + this.newCoin.r) {
                this.overlapping = true;
                return false;
            }
            return true;
        });
        if (this.overlapping) {
            this.createCoin();
        } else {
            this.coins.push(this.newCoin);
            this.updateCoins();
        }
        this.newCoin = undefined;
    };

    /**
     * update array of all gameobjects of the game
     *
     */
    updateGameObjects = () => {
        this.fishes.sort(function (a, b) {
            return b.r - a.r;
        });
        this.gameObjects = [
            ...this.junks,
            ...this.fishes,
            ...this.coins,
            ...this.foods,
            ...this.pills,
            this.menu,
            ...this.fishInfo,
            ...this.fishShop,
            ...this.shop,
            ...this.help,
        ];
    };

    /**
     * update background image to the required one
     * @param {number} index index of background
     */
    updateBg = (index) => {
        if (index !== undefined) this.bgIndex = index;
        this.save.saveBgIndex();
        this.bgImg = this.loadedAssets[`background${this.bgIndex}`];
    };

    /**
     * update array of all fish objects of the game
     */
    updateFishes = () => {
        this.fishes = this.fishes.filter((fish) => {
            return !fish.sold;
        });
        this.updateGameObjects();
    };

    /**
     * update array of all food objects of the game
     */
    updateFoods = () => {
        this.foods = this.foods.filter((food) => {
            return !food.eaten;
        });
        this.updateGameObjects();
    };

    /**
     * update array of all pill objects of the game
     */
    updatePills = () => {
        this.pills = this.pills.filter((pill) => {
            return !pill.eaten;
        });
        this.updateGameObjects();
    };

    /**
     * update array of all junk objects of the game
     */
    updateJunks = () => {
        this.junks = this.junks.filter((junk) => {
            return !junk.cleaned;
        });
        if (this.junks.length === 0) {
            this.fishes.forEach((fish) => {
                clearInterval(fish.healthDecreaseInterval);
                fish.healthDecreaseInterval = false;
            });
        } else {
            this.fishes.forEach((fish) => {
                if (!fish.healthDecreaseInterval) {
                    setTimeout(() => {
                        if (!fish.healthDecreaseInterval)
                            fish.startHealthDecreaseInterval;
                    }, fish.changeInterval.healthTimeout);
                }
            });
        }
        this.updateGameObjects();
    };

    /**
     * update array of all coin objects of the game
     */
    updateCoins = () => {
        this.coins = this.coins.filter((coin) => {
            return !coin.collected;
        });
        this.updateGameObjects();
    };

    /**
     * update cursor of the game according to game mode
     */
    updateCursor = () => {
        switch (this.gameMode) {
            case this.gameModes.FEED:
                this.cursorName = "pot-purple";
                break;
            case this.gameModes.PILL:
                this.cursorName = "pill";
                break;
            case this.gameModes.CLEAN:
                this.cursorName = "clean";
                break;
            case this.gameModes.SELECT:
                this.cursorName = "hand-cursor";
                break;
            default:
                this.cursorName = "hand-cursor";
                break;
        }
        this.canvas.style.cursor = `url(
            assets/cursors/${this.cursorName}.cur
        ),default`;
    };

    /**
     * handle buying of fish and decorations in the game and update money accordingly
     */
    handleBuy = (price) => {
        if (this.money >= price) {
            this.money -= price;
            this.menu.setMoneyInfo(`-  $ ${price}`, -1);

            this.save.saveMoney();
            return true;
        }
        if (!this.toggle.isMute) this.errorSound.play();
        if (this.toggle.isMute) this.errorSound.stop();
        this.menu.setMoneyInfo(`No Money`, -1);
        return false;
    };

    /**
     * handle selling of fish and decorations in the game and update money accordingly
     */
    handleSell = (price) => {
        this.money += price;
        if (!this.toggle.isMute) this.sellFishSound.play();
        if (this.toggle.isMute) this.sellFishSound.stop();
        this.menu.setMoneyInfo(`+  $ ${price}`, 1);
        this.save.saveMoney();
    };

    /**
     * toggle showing of Fish Info panel
     */
    toggleShowInfo = (fish) => {
        if (this.toggle.showInfo) {
            this.toggle.showInfo = false;
            this.fishInfo.pop();
        } else {
            this.fishInfo.push(new FishInfo(fish));
            this.toggle.showInfo = true;
            this.gameMode = 0;
            this.updateCursor();
        }
        this.updateGameObjects();
    };

    /**
     * toggle showing of Fish Shop panel
     */
    toggleFishShop = () => {
        if (this.toggle.showFishShop) {
            this.toggle.showFishShop = false;
            this.fishShop.pop();
        } else {
            this.fishShop.push(new FishShop(this));
            this.toggle.showFishShop = true;
            this.gameMode = 0;
            this.updateCursor();
        }
        this.updateGameObjects();
    };

    /**
     * toggle showing of Shop panel
     */
    toggleShop = () => {
        if (this.toggle.showShop) {
            this.toggle.showShop = false;
            this.shop.pop();
        } else {
            this.shop.push(new Shop(this));
            this.toggle.showShop = true;
            this.gameMode = 0;
            this.updateCursor();
        }
        this.updateGameObjects();
    };

    /**
     * toggle showing of Help panel
     */
    toggleHelp = () => {
        if (this.toggle.showHelp) {
            this.toggle.showHelp = false;
            this.help.pop();
        } else {
            this.help.push(new Help(this));
            this.toggle.showHelp = true;
        }
        this.updateGameObjects();
    };

    /**
     * toggle Mute setting
     */
    toggleMute = () => {
        this.toggle.isMute = !this.toggle.isMute;
    };
}
