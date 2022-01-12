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
        this.price = this.fish.value;

        this.width = this.gameWidth - this.gameWidth / 2;
        // this.height = this.gameHeight - this.gameHeight / 4;
        this.height = this.gameHeight;
        this.barWidth = 150;
        this.position = {
            x: (this.gameWidth - this.width) / 2,
            y: (this.gameHeight - this.height) / 2,
        };

        this.closeBtn = {
            x: this.position.x + this.width - 50 - 1.22 * 50,
            y: this.position.y + 90,
            w: 1.22 * 50,
            h: 50,
        };

        this.startPosition = {
            x: (this.gameWidth - this.width) / 2 - 200,
            y: this.gameHeight / 2 - 150,
        };
        this.btnWidth = 150;
        this.btnHeight = 40;

        this.font = "Arial";
        this.fontSize = 20;
        this.infoGapSize = 30;

        this.panelImg = this.game.loadedAssets[`shopPanel`];
        this.btnImg = this.game.loadedAssets[`shopBtn`];
        this.closeBtnImg = this.game.loadedAssets[`closeBtn`];
        this.coinImg = this.game.loadedAssets[`coin1`];

        this.closeSound = this.game.sounds.close;

        this.textPosition = {};
        this.imgPosition = {};
    }

    /**
     * draw fish on info screen
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
            "Pregnancy: " + this.fish.pregnancy,
            "Postpartum: " + this.fish.postpartum,
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

        ctx.drawImage(
            this.closeBtnImg,
            this.closeBtn.x,
            this.closeBtn.y,
            this.closeBtn.w,
            this.closeBtn.h
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
        this.textPosition.y = this.startPosition.y + 20;

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
            x: this.gameWidth / 2 + 100,
            y: this.gameHeight / 2 - this.height / 10,
        };
        this.fish.drawInfo(ctx, this.imgPosition.x, this.imgPosition.y);

        this.fish.drawHealthBar(
            ctx,
            this.imgPosition.x - this.barWidth / 2,
            this.imgPosition.y + 50,
            this.barWidth
        );
        this.fish.drawHungerBar(
            ctx,
            this.imgPosition.x - this.barWidth / 2,
            this.imgPosition.y + 50 + 10,
            this.barWidth
        );
        this.drawButton(ctx);
    };

    drawButton = (ctx) => {
        this.btnX = this.position.x + this.width / 2 - this.btnWidth / 2;
        this.btnY = this.position.y + this.height / 2 + 150;
        ctx.drawImage(
            this.btnImg,
            this.btnX,
            this.btnY,
            this.btnWidth,
            this.btnHeight
        );
        ctx.font = `bold ${this.fontSize}px ${this.font}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowColor = "black";
        ctx.shadowBlur = 1;
        ctx.drawImage(
            this.coinImg,
            this.btnX + 6 + this.btnWidth / 2,
            this.btnY - 1 + this.btnHeight / 4,
            20,
            20
        );
        ctx.fillText(
            `Sell       ${this.price}`,
            this.btnX + this.btnWidth / 2,
            this.btnY + this.btnHeight / 2
        );
        // ctx.strokeText("BUY", x + this.btnWidth / 2, y + this.btnHeight / 2);
        this.checkForBtnClick(this.btnX, this.btnY);
    };

    /**
     * check for click on each update
     * @param {number} deltaTime change in time from previous frame
     */
    update = (deltaTime) => {
        this.checkForOutsideClick();
        this.checkForCloseBtnClick();
    };

    checkForOutsideClick = () => {
        if (
            this.game.mouse.click &&
            this.game.gameMode === this.game.gameModes.SELECT &&
            this.game.toggle.showInfo
        ) {
            if (
                this.game.mouse.x < this.position.x ||
                this.game.mouse.x > this.position.x + this.width ||
                this.game.mouse.y < this.position.y ||
                this.game.mouse.y > this.position.y + this.height
            ) {
                this.game.toggleShowInfo();
                this.game.inputHandler.resetMouseClick();
            }
        }
    };

    checkForBtnClick = (x, y) => {
        if (
            this.game.mouse.click &&
            //this.game.gameMode === this.game.gameModes.SELECT &&
            this.game.toggle.showInfo
        ) {
            if (
                this.game.mouse.x > x &&
                this.game.mouse.x < x + this.btnWidth &&
                this.game.mouse.y > y &&
                this.game.mouse.y < y + this.btnHeight
            ) {
                console.log("buy", this.price);
                this.game.handleSell(this.price);
                this.fish.sold = true;
                this.game.toggleShowInfo();
                this.game.inputHandler.resetMouseClick();
                this.game.updateFishes();
            }
        }
    };

    checkForCloseBtnClick = () => {
        if (
            this.game.mouse.click &&
            //this.game.gameMode === this.game.gameModes.SELECT &&
            this.game.toggle.showInfo
        ) {
            if (
                this.game.mouse.x > this.closeBtn.x &&
                this.game.mouse.x < this.closeBtn.x + this.closeBtn.w &&
                this.game.mouse.y > this.closeBtn.y &&
                this.game.mouse.y < this.closeBtn.y + this.closeBtn.h
            ) {
                if (!this.game.toggle.isMute) this.closeSound.play();
                if (this.game.toggle.isMute) this.closeSound.stop();
                this.game.toggleShowInfo();
                this.game.inputHandler.resetMouseClick();
            }
        }
    };
}
