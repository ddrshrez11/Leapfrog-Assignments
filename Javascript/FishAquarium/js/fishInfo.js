export default class FishInfo {
    /**
     * @constructor
     * @param {Fish} fish Game object
     */
    constructor(fish) {
        this.fish = fish;
        this.game = this.fish.game;
        this.gameWidth = fish.gameWidth;
        this.gameHeight = fish.gameHeight;
        this.screenMargin = 100;

        this.width = this.gameWidth - this.gameWidth / 2;
        this.height = this.gameHeight - this.gameHeight / 4;
        this.position = {
            x: (this.gameWidth - this.width) / 2,
            y: (this.gameHeight - this.height) / 2,
        };
        this.startPosition = {
            x: 50,
            y: 50,
        };
        this.font = "Arial";
        this.fontSize = 20;
        this.infoGapSize = 30;
    }

    /**
     * draw fish food on game screen
     * @param {context} ctx Context of canvas
     */
    draw = (ctx) => {
        this.infoList = [
            "Level: " + this.fish.level,
            "Gender: " + this.fish.gender,
            "Color: " + this.fish.color,
            "Speed: " + this.fish.speed,
            "Health Meter: " + this.fish.healthMeter,
            "Hunger Meter: " + this.fish.hungerMeter,
        ];
        let textPosition = {};
        textPosition.x = this.startPosition.x;
        textPosition.y = this.startPosition.y;
        // ctx.rect(this.position.x, this.position.y, this.width, this.height);
        // ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fillStyle = "#c2c26b";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        ctx.fillStyle = "#000";
        ctx.font = "30px " + this.font;
        ctx.fillText(
            this.fish.name,
            this.position.x + textPosition.x,
            this.position.y + textPosition.y
        );

        // this.startPosition.x +=30
        textPosition.y = 60;

        ctx.font = this.fontSize + "px " + this.font;
        for (let i = 0; i < this.infoList.length; i++) {
            let info = this.infoList[i];
            ctx.fillText(
                info,
                this.position.x + textPosition.x,
                this.position.y + textPosition.y + this.infoGapSize * (i + 1)
            );
        }

        let imgPosition = {
            x: this.gameWidth / 2 + this.width / 4,
            y: this.gameHeight / 2 - this.fish.r,
        };
        this.fish.draw(ctx, imgPosition.x, imgPosition.y);

        this.fish.drawHealthBar(
            ctx,
            imgPosition.x - 100 / 2,
            imgPosition.y + this.fish.r + 20,
            100
        );
        this.fish.drawHungerBar(
            ctx,
            imgPosition.x - 100 / 2,
            imgPosition.y + this.fish.r + 30,
            100
        );
    };

    /**
     * update position of fish food
     * @param {number} deltaTime change in time from previous frame
     */
    update = (deltaTime) => {
        this.checkForClick();
    };

    checkForClick = () => {
        if (
            this.game.mouse.click &&
            this.game.gameMode === this.game.gameModes.SELECT &&
            this.game.showInfo
        ) {
            if (
                this.game.mouse.x < this.position.x ||
                this.game.x > this.position.x + this.width ||
                this.game.mouse.y < this.position.y ||
                this.game.y > this.position.y + this.height
            ) {
                this.game.toggleShowInfo();
                this.game.inputHandler.resetMouseClick();
            }
        }
    };
    /**
     * detect the bottom of the fish tank
     */
    wallCollisionDetect = () => {
        if (this.position.y > this.gameHeight - this.r) {
            this.direction.y = 0;
        }
    };
}
