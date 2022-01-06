export default class InputHandler {
    /**
     * @constructor
     * @param {Game} game Game object
     */
    constructor(game) {
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.canvas = game.canvas;
        this.canvasPostion = game.canvasPosition;
        this.mouse = game.mouse;
        this.canvas.addEventListener("mousedown", this.clickHandler);
    }

    clickHandler = (event) => {
        // console.log(this.mouse);
        this.mouse.click = true;
        this.mouse.x = event.x - this.canvasPostion.left;
        this.mouse.y = event.y - this.canvasPostion.top;
        // console.log(this.mouse);
        if (this.game.gameMode === 1) {
            this.game.createFood();
        }
    };
}
