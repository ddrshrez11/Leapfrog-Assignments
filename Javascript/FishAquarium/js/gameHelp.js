export class Help {
    /**
     * @constructor
     * @param {Game} game Game object
     */
    constructor(game) {
        this.game = game;
        this.gameWidth = this.game.gameWidth;
        this.gameHeight = this.game.gameHeight;
        this.screenMargin = 100;

        this.width = this.gameWidth - this.gameWidth / 2.5;
        this.height = this.gameHeight;
        this.headerWidth = 500;
        this.headerHeight = 70;
        this.btnWidth = 150;
        this.btnHeight = 40;

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
            x: (this.gameWidth - this.headerWidth) / 2,
            y: this.position.y + 200,
        };
        this.font = "Arial";
        this.fontSize = 20;
        this.itemGapSize = {
            x: 200,
            y: 150,
        };
        this.leftPadding = 100;

        this.panelImg = this.game.loadedAssets[`shopPanel`];
        this.panelHeaderImg = this.game.loadedAssets[`shopPanelHeader`];
        this.btnImg = this.game.loadedAssets[`shopBtn`];
        this.coinImg = this.game.loadedAssets[`coin1`];
        this.closeBtnImg = this.game.loadedAssets[`closeBtn`];

        this.buySound = this.game.sounds.buy;
        this.closeSound = this.game.sounds.close;
    }

    /**
     * show Help Panel on game screen
     * @param {context} ctx Context of canvas
     */
    draw = (ctx) => {
        this.drawPanel(ctx);
        this.drawText(ctx);
    };

    /**
     * draw Help Panel background on game screen
     * @param {context} ctx Context of canvas
     */
    drawPanel = (ctx) => {
        ctx.drawImage(
            this.panelImg,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        ctx.drawImage(
            this.panelHeaderImg,
            (this.gameWidth - this.headerWidth) / 2,
            this.position.y + 100,
            this.headerWidth,
            this.headerHeight
        );

        ctx.drawImage(
            this.closeBtnImg,
            this.closeBtn.x,
            this.closeBtn.y,
            this.closeBtn.w,
            this.closeBtn.h
        );

        ctx.font = `bold ${this.fontSize + 20}px ${this.font}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowColor = "black";
        ctx.shadowBlur = 1;

        ctx.fillText(
            "FISH AQUARIUM",
            this.gameWidth / 2,
            this.position.y + 100 + this.headerHeight / 2
        );
    };

    /**
     * draw Help Panel text on game screen
     * @param {context} ctx Context of canvas
     */
    drawText = (ctx) => {
        this.startPosition = {
            x: (this.gameWidth - this.headerWidth - 160) / 2,
            y: this.position.y + 200,
        };

        ctx.font = `bold ${this.fontSize}px ${this.font}`;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowColor = "black";
        ctx.shadowBlur = 1;

        ctx.fillText(
            "•  You can feed the fish. Hungry Fishes will get sick.",
            this.startPosition.x,
            this.startPosition.y
        );

        this.startPosition.y += 40;
        ctx.fillText(
            "•  The tank will get dirty  (      ,      ) overtime and fishes will become sick.",
            this.startPosition.x,
            this.startPosition.y
        );
        ctx.drawImage(
            this.game.loadedAssets[`junk0`],
            this.startPosition.x + 245,
            this.startPosition.y - 12.5,
            25,
            25
        );
        ctx.drawImage(
            this.game.loadedAssets[`junk1`],
            this.startPosition.x + 285,
            this.startPosition.y - 12.5,
            25,
            25
        );

        this.startPosition.y += 40;
        ctx.fillText(
            "•  So, remember to clean the tank and you will be rewarded with coins.",
            this.startPosition.x,
            this.startPosition.y
        );

        this.startPosition.y += 40;
        ctx.fillText(
            "•  You can give pills to sick fishes.",
            this.startPosition.x,
            this.startPosition.y
        );

        this.startPosition.y += 40;
        ctx.fillText(
            "•  Fishes will get bigger and grow in value with time.",
            this.startPosition.x,
            this.startPosition.y
        );

        this.startPosition.y += 40;
        ctx.fillText(
            "•  You can sell the fishes.",
            this.startPosition.x,
            this.startPosition.y
        );

        this.startPosition.y += 40;
        ctx.fillText(
            "•  Fishes of same type and different gender will give offspring.",
            this.startPosition.x,
            this.startPosition.y
        );

        this.startPosition.y += 40;
        ctx.fillText(
            "•  You can buy new fishes and decorations from the shop.",
            this.startPosition.x,
            this.startPosition.y
        );

        this.startPosition.y += 40;
        ctx.fillText(
            "•  The game state will be saved but you can reset the game.",
            this.startPosition.x,
            this.startPosition.y
        );
    };

    /**
     * update panel
     */
    update = () => {
        this.checkForOutsideClick();
        this.checkForCloseBtnClick();
    };

    /**
     * check for click outside the panel
     */
    checkForOutsideClick = () => {
        if (this.game.mouse.click && this.game.toggle.showHelp) {
            if (
                this.game.mouse.x < this.position.x ||
                this.game.mouse.x > this.position.x + this.width ||
                this.game.mouse.y < this.position.y ||
                this.game.mouse.y > this.position.y + this.height
            ) {
                this.game.toggleHelp();
                this.game.inputHandler.resetMouseClick();
            }
        }
    };

    /**
     * check for click on close button
     */
    checkForCloseBtnClick = () => {
        if (this.game.mouse.click && this.game.toggle.showHelp) {
            if (
                this.game.mouse.x > this.closeBtn.x &&
                this.game.mouse.x < this.closeBtn.x + this.closeBtn.w &&
                this.game.mouse.y > this.closeBtn.y &&
                this.game.mouse.y < this.closeBtn.y + this.closeBtn.h
            ) {
                if (!this.game.toggle.isMute) this.closeSound.play();
                if (this.game.toggle.isMute) this.closeSound.stop();
                this.game.toggleHelp();
                this.game.inputHandler.resetMouseClick();
            }
        }
    };
}
