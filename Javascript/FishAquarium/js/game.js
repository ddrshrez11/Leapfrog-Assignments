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
        this.gameMode = 1;
        this.gameModes = {
            MOVE: 0,
            FEED: 1,
            CLEAN: 2,
        };
        this.changeInterval = {
            junk: 10000,
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
        // for (let index = 0; index < 10; index++) {
        this.fish = new Fish(this);
        // fish.draw(ctx);
        // }
        this.foods = [];
        this.food = new Food(this, 400, 100);
        this.junks = [];
        // for (let index = 0; index < 5; index++) {
        //     this.createJunk();
        //     //this.junks.push(new Junk(this));
        // }
        setInterval(this.createJunk, this.changeInterval.junk);
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

    createFood = () => {
        //if (this.gameMode === 1 && this.mouse.click) {
        this.foods.push(new Food(this, this.mouse.x, this.mouse.y));
        this.updateGameObjects();
        this.mouse.click = false;
        console.log("new food");
        //}
    };

    createJunk = () => {
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

    updateGameObjects = () => {
        this.gameObjects = [...this.junks, this.fish, ...this.foods];
    };

    updateJunks = () => {
        this.junks = this.junks.filter((junk) => {
            return !junk.cleaned;
        });
        this.updateGameObjects();
    };
}
