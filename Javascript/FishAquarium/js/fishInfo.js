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
        this.barWidth = 150;
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

        this.panelImg = new Image();
        this.panelImg.src = "./assets/otherObjects/panel1.png";

        this.textPosition = {};
        this.imgPosition = {};
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

        this.textPosition.x = this.startPosition.x;
        this.textPosition.y = this.startPosition.y;

        // ctx.fillStyle = "#c2c26b";
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

        ctx.drawImage(
            this.panelImg,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        ctx.textAlign = "start";
        ctx.textBaseline = "middle";
        ctx.lineWidth = 2;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowColor = "";
        ctx.shadowBlur = 0;

        ctx.fillStyle = "#000";
        ctx.font = "30px " + this.font;
        ctx.fillText(
            this.fish.name,
            this.position.x + this.textPosition.x,
            this.position.y + this.textPosition.y
        );

        // this.startPosition.x +=30
        this.textPosition.y = 60;

        ctx.font = this.fontSize + "px " + this.font;
        for (let i = 0; i < this.infoList.length; i++) {
            ctx.fillText(
                this.infoList[i],
                this.position.x + this.textPosition.x,
                this.position.y +
                    this.textPosition.y +
                    this.infoGapSize * (i + 1)
            );
        }

        this.imgPosition = {
            x: this.gameWidth / 2 + this.width / 4,
            y: this.gameHeight / 2 - this.height / 10,
        };
        this.fish.drawInfo(ctx, this.imgPosition.x, this.imgPosition.y);

        this.fish.drawHealthBar(
            ctx,
            this.imgPosition.x - this.barWidth / 2,
            this.imgPosition.y + this.fish.r + 50,
            this.barWidth
        );
        this.fish.drawHungerBar(
            ctx,
            this.imgPosition.x - this.barWidth / 2,
            this.imgPosition.y + this.fish.r + 50 + 10,
            this.barWidth
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
            this.game.toggle.showInfo
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
}
