export default class InputHandler {
    /**
     * @constructor
     * @param {Game} game Game object
     */
    constructor(game) {
        this.game = game;
        this.menu = game.menu;
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
        setTimeout(this.resetMouseClick, 500);
        this.mouse.x = event.x - this.canvasPostion.left;
        this.mouse.y = event.y - this.canvasPostion.top;
        // console.log(this.mouse);
        if (
            this.game.mouse.x < this.menu.menuX ||
            this.game.mouse.x > this.menu.menuX + this.menu.menuWidth ||
            this.game.mouse.y < this.menu.menuY ||
            this.game.mouse.y > this.menu.menuY + this.menu.menuHeight
        ) {
            if (this.game.gameMode === this.game.gameModes.FEED) {
                this.game.createFood();
            }
            if (this.game.gameMode === this.game.gameModes.PILL) {
                this.game.createPill();
            }
        }
    };

    resetMouseClick = () => {
        this.mouse.click = false;
    };
}
