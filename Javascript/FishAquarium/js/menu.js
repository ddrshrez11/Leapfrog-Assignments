import { menuData } from "./data.js";

export default class Menu {
    /**
     * @constructor
     * @param {Game} game Game object
     */
    constructor(game) {
        this.game = game;
        this.gameWidth = this.game.gameWidth;
        this.gameHeight = this.game.gameHeight;
        this.screenMargin = 100;
        this.menuOptions = Object.keys(menuData);
        console.log(this.menuOptions);
        // this.game.fishTypesArray.forEach((fishType) => {
        //     this.shopFishes.push(new Fish(this.game, fishType));
        // });

        this.width = this.gameWidth / 20;
        this.height = this.width;
        this.imgHeight = this.height - 20;

        this.position = {
            x: 0,
            y: 0,
        };
        // this.startPosition = {
        //     x: 50,
        //     y: this.height / 2,
        // };
        this.font = "Arial";
        this.fontSize = 20;
        this.itemGapSize = {
            x: 20,
            y: 15,
        };

        this.padding = {
            x: 25,
            y: 5,
        };

        this.btnImg = this.game.loadedAssets[`shopBtn`];
        this.bubbleImg = this.game.loadedAssets[`menuBubble`];
        this.menuCoinImg = this.game.loadedAssets[`coin1`];

        // this.panelImg = new Image();
        // this.panelImg.src = "./assets/otherObjects/shopPanel.png";

        // this.panelHeaderImg = new Image();
        // this.panelHeaderImg.src = "./assets/otherObjects/shopPanelHeader.png";

        // this.btnImg = new Image();
        // this.btnImg.src = "./assets/otherObjects/buyBtn.png";

        // this.coinImg = new Image();
        // this.coinImg.src = "./assets/coins/coin-1.png";
    }

    /**
     * draw junk on game screen
     * @param {context} ctx Context of canvas
     */
    draw = (ctx) => {
        this.position.x = this.padding.x;
        this.position.y = this.padding.y;

        this.menuX = this.padding.x;
        this.menuY = this.padding.y;
        this.menuWidth =
            (this.width + this.padding.x) * this.menuOptions.length -
            this.padding.x;
        this.menuHeight = this.height + this.fontSize;

        // ctx.fillStyle = "#c2c26b";
        // ctx.fillRect(this.rectX, this.rectY, this.rectWidth, this.rectHeight);

        this.menuOptions.forEach((option, index) => {
            this.drawMenuIcons(ctx, option, index);
        });
        // this.drawShopFishes(ctx);
    };

    drawMenuIcons = (ctx, option, index) => {
        this.option = menuData[option];
        this.menuIconImg = this.game.loadedAssets[`menu_${option}`];
        this.imgWidth =
            this.imgHeight * (this.option.width / this.option.height);

        ctx.drawImage(
            this.bubbleImg,
            this.position.x, // + this.padding.x,
            this.position.y,
            this.width,
            this.height
        );
        ctx.drawImage(
            this.menuIconImg,
            this.position.x + (this.width - this.imgWidth) / 2,
            this.position.y + this.padding.y * 1.5,
            this.imgWidth,
            this.imgHeight
        );

        ctx.font = `bold ${this.fontSize}px ${this.font}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#fff";
        ctx.lineWidth = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowColor = "black";
        ctx.shadowBlur = 1;
        ctx.strokeText(
            this.option.name,
            this.position.x + this.width / 2,
            this.position.y + this.padding.y * 2.5 + this.imgHeight
        );
        ctx.fillText(
            this.option.name,
            this.position.x + this.width / 2,
            this.position.y + this.padding.y * 2.5 + this.imgHeight
        );

        this.checkForBtnClick(index);
        this.position.x += this.width + this.padding.x;
    };

    drawButton = (ctx, x, y, fishColor) => {
        ctx.drawImage(this.btnImg, x, y, this.btnWidth, this.btnHeight);
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
            x + 6 + this.btnWidth / 2,
            y - 1 + this.btnHeight / 4,
            20,
            20
        );
        ctx.fillText(
            "BUY       13",
            x + this.btnWidth / 2,
            y + this.btnHeight / 2
        );
        // ctx.strokeText("BUY", x + this.btnWidth / 2, y + this.btnHeight / 2);
        this.checkForBtnClick(x, y, fishColor);
    };

    /**
     * update position of junk
     * @param {number} deltaTime change in time from previous frame
     */
    update = (deltaTime) => {
        // this.checkForOutsideClick();
    };

    checkForBtnClick = (index) => {
        if (
            this.game.mouse.click //&&
            //this.game.gameMode === this.game.gameModes.SELECT &&
            // this.game.toggle.showShop
        ) {
            if (
                this.game.mouse.x > this.position.x &&
                this.game.mouse.x < this.position.x + this.width &&
                this.game.mouse.y > this.position.y &&
                this.game.mouse.y <
                    this.position.y + this.height + this.fontSize
            ) {
                console.log("Menu Click", index);
                if (index < 4) {
                    this.game.gameMode = index;
                    this.game.updateCursor();
                    if (this.game.toggle.showInfo) this.game.toggleShowInfo();
                    if (this.game.toggle.showShop) this.game.toggleShop();
                } else if (index === 4) {
                    this.game.toggleShop();
                }
                // this.game.toggleShop();
                // this.game.buyFish(fishColor);
                this.game.inputHandler.resetMouseClick();
            }
        }
    };
}
