import Coin from "./coin.js";
import Fish from "./fish.js";
import Food from "./food.js";
import Pill from "./pill.js";
import InputHandler from "./inputHandler.js";
import Junk from "./junk.js";
import { fishTypes } from "./data.js";
import FishInfo from "./fishInfo.js";
import Save from "./save.js";
import { FishShop, Shop } from "./shop.js";
import Menu from "./menu.js";

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

        this.toggle = {
            showInfo: false,
            showFishShop: false,
            showShop: false,
            isMute: false,
        };
        // this.showInfo = false;
        this.limit = {
            junk: 10,
            coin: 10,
        };
        this.money = this.save.getMoney() ? Number(this.save.getMoney()) : 0;
        console.log(typeof this.money);
        this.bgIndex = this.save.getBgIndex() ? this.save.getBgIndex() : 0;

        this.gameModes = {
            SELECT: 0,
            FEED: 1,
            PILL: 2,
            CLEAN: 3,
            // SELECT: 3,
        };
        this.gameMode = this.gameModes.SELECT;
        this.changeInterval = {
            junk: 20000,
            coin: 30000,
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

        // this.bgImg = loadedAssets[`background${this.bgIndex}`];
        // this.bgImg = new Image();
        // this.bgImg.src = "./assets/otherObjects/bg1.jpg";
    }

    /**
     * function to initialize objects
     */
    start = () => {
        // for (let index = 0; index < 10; index++) {
        this.fishes = [];
        this.coins = [];
        this.foods = [];
        this.pills = [];
        this.junks = [];
        this.fishShop = [];
        this.shop = [];
        this.fishInfo = [];
        this.menu = new Menu(this);
        this.inputHandler = new InputHandler(this);

        // this.toggleFishShop(); //! remove
        // this.toggleShop(); //! remove

        // this.fishes.push(new Fish(this, "black"));
        // this.fishes.push(new Fish(this, "green"));

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
        // this.save.saveFishes(this);
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
        // if (this.toggle.showInfo) {
        //     this.drawShowInfoBox(ctx);
        // }
    };

    drawBg = (ctx) => {
        ctx.drawImage(this.bgImg, 0, 0, this.gameWidth, this.gameHeight);
    };

    buyFish = (color) => {
        if (!color) color = getRandomFromArray(this.fishTypesArray);
        this.fishes.push(new Fish(this, color));
        this.updateGameObjects();
    };
    createFood = () => {
        if (this.handleBuy(this.price.food)) {
            if (!this.toggle.isMute) this.foodSound.play();
            if (this.toggle.isMute) this.foodSound.stop();
            this.foods.push(new Food(this, this.mouse.x, this.mouse.y));
            this.updateGameObjects();
            this.inputHandler.resetMouseClick();
            console.log("new food");
        }
    };
    createPill = () => {
        if (this.handleBuy(this.price.food)) {
            if (!this.toggle.isMute) this.pillSound.play();
            this.pills.push(new Pill(this, this.mouse.x, this.mouse.y));
            this.updateGameObjects();
            this.inputHandler.resetMouseClick();
            console.log("new pill");
        }
    };

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

    updateGameObjects = () => {
        this.fishes.sort(function (a, b) {
            return b.r - a.r;
        });
        this.gameObjects = [
            ...this.junks,
            ...this.coins,
            ...this.fishes,
            ...this.foods,
            ...this.pills,
            this.menu,
            ...this.fishInfo,
            ...this.fishShop,
            ...this.shop,
        ];
    };

    updateBg = (index) => {
        if (index !== undefined) this.bgIndex = index;
        this.save.saveBgIndex();
        this.bgImg = this.loadedAssets[`background${this.bgIndex}`];
    };
    updateFishes = () => {
        this.fishes = this.fishes.filter((fish) => {
            return !fish.sold;
        });
        this.updateGameObjects();
    };
    updateFoods = () => {
        this.foods = this.foods.filter((food) => {
            return !food.eaten;
        });
        this.updateGameObjects();
    };

    updatePills = () => {
        this.pills = this.pills.filter((pill) => {
            return !pill.eaten;
        });
        this.updateGameObjects();
    };

    updateJunks = () => {
        this.junks = this.junks.filter((junk) => {
            return !junk.cleaned;
        });
        if (this.junks.length === 0) {
            this.fishes.forEach((fish) => {
                clearInterval(fish.healthDecreaseInterval);
                fish.healthDecreaseInterval = false;
            });
            // this.fish.startHealthDecreaseInterval();
        } else {
            this.fishes.forEach((fish) => {
                if (!fish.healthDecreaseInterval) {
                    fish.startHealthDecreaseInterval();
                }
            });
            // clearInterval(this.fish.healthDecreaseInterval);
        }
        // this.save.saveJunks(this); //!check
        this.updateGameObjects();
    };

    updateCoins = () => {
        this.coins = this.coins.filter((coin) => {
            return !coin.collected;
        });
        // this.save.saveCoins(this); //!check
        this.updateGameObjects();
    };

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

    handleBuy = (price) => {
        if (this.money >= price) {
            this.money -= price;
            this.menu.setMoneyInfo(`-  $ ${price}`, -1);

            this.save.saveMoney();
            // console.log("item Bought for ", price, " Money: ", this.money);
            return true;
        }
        this.menu.setMoneyInfo(`No Money`, -1);
        // console.log("No Money");
        return false;
    };
    handleSell = (price) => {
        this.money += price;
        if (!this.toggle.isMute) this.sellFishSound.play();
        if (this.toggle.isMute) this.sellFishSound.stop();
        this.menu.setMoneyInfo(`+  $ ${price}`, 1);

        this.save.saveMoney();
        // console.log("item sold for ", price, " Money: ", this.money);
    };

    toggleShowInfo = (fish) => {
        if (this.toggle.showInfo) {
            this.toggle.showInfo = false;
            this.fishInfo.pop();
        } else {
            this.fishInfo.push(new FishInfo(fish));
            this.toggle.showInfo = true;
        }
        this.updateGameObjects();
    };

    toggleFishShop = () => {
        if (this.toggle.showFishShop) {
            this.toggle.showFishShop = false;
            this.fishShop.pop();
        } else {
            this.fishShop.push(new FishShop(this));
            this.toggle.showFishShop = true;
        }
        this.updateGameObjects();
    };
    toggleShop = () => {
        if (this.toggle.showShop) {
            this.toggle.showShop = false;
            this.shop.pop();
        } else {
            this.shop.push(new Shop(this));
            this.toggle.showShop = true;
        }
        this.updateGameObjects();
    };
    toggleMute = () => {
        this.toggle.isMute = !this.toggle.isMute;
    };
}
