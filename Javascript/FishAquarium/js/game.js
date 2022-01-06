import Fish from "./fish.js";
import Food from "./food.js";
import Junk from "./junk.js";

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gameMode = 1;
    }
    start = () => {
        // for (let index = 0; index < 10; index++) {
        this.fish = new Fish(this);
        // fish.draw(ctx);
        // }
        this.food = new Food(this, 400, 100);
        this.junks = [];
        for (let index = 0; index < 5; index++) {
            this.junks.push(new Junk(this));
        }

        this.gameObjects = [this.fish, this.food]; // ...this.junks];
    };

    update = (deltaTime) => {
        this.gameObjects.forEach((object) => {
            object.update(deltaTime);
        });
    };

    draw = (ctx) => {
        this.gameObjects.forEach((object) => {
            object.draw(ctx);
        });
    };
}
