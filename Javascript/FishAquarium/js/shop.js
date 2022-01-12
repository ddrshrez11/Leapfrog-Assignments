import Fish from "./fish.js";
import { decorationData } from "./data.js";

export class FishShop {
    /**
     * @constructor
     * @param {Game} game Game object
     */
    constructor(game) {
        this.game = game;
        this.gameWidth = this.game.gameWidth;
        this.gameHeight = this.game.gameHeight;
        this.screenMargin = 100;
        this.shopFishes = [];
        this.game.fishTypesArray.forEach((fishType) => {
            this.shopFishes.push(new Fish(this.game, fishType));
        });

        this.width = this.gameWidth - this.gameWidth / 2.5;
        this.height = this.gameHeight; // - this.gameHeight / 4;
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
            x: 50,
            y: this.height / 2,
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
     * draw junk on game screen
     * @param {context} ctx Context of canvas
     */
    draw = (ctx) => {
        this.drawPanel(ctx);
        this.drawShopFishes(ctx);
    };

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
            (this.gameWidth - this.headerWidth) / 2, //this.position.x,
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
            "FISH SHOP",
            this.gameWidth / 2,
            this.position.y + 100 + this.headerHeight / 2
        );
    };

    drawShopFishes = (ctx) => {
        this.imgPosition = {
            x: this.position.x + this.startPosition.x + this.leftPadding,
            y:
                this.startPosition.y -
                this.shopFishes[0].baseSize -
                this.itemGapSize.y / 2.5,
        };
        this.shopFishes.forEach((shopFish, index) => {
            shopFish.drawInfo(ctx, this.imgPosition.x, this.imgPosition.y);
            this.btnPosition = {
                x: this.imgPosition.x - this.btnWidth / 2,
                y: this.imgPosition.y + shopFish.baseSize * 2 + 10,
            };
            this.drawButton(
                ctx,
                this.btnPosition.x,
                this.btnPosition.y,
                shopFish.color,
                shopFish.price
            );
            if (index == 2) {
                this.imgPosition.x -=
                    index * (shopFish.baseSize + this.itemGapSize.x);
                this.imgPosition.y =
                    this.startPosition.y + this.itemGapSize.y * 0.5;
            } else {
                this.imgPosition.x += shopFish.baseSize + this.itemGapSize.x;
            }
        });
    };
    drawButton = (ctx, x, y, fishColor, price) => {
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
            `BUY       ${price}`,
            x + this.btnWidth / 2,
            y + this.btnHeight / 2
        );
        // ctx.strokeText("BUY", x + this.btnWidth / 2, y + this.btnHeight / 2);
        this.checkForBtnClick(x, y, fishColor, price);
    };

    /**
     * update position of junk
     * @param {number} deltaTime change in time from previous frame
     */
    update = (deltaTime) => {
        this.checkForOutsideClick();
        this.checkForCloseBtnClick();
        this.shopFishes.forEach((shopFish) => {
            shopFish.update(deltaTime);
        });
    };

    checkForOutsideClick = () => {
        if (
            this.game.mouse.click &&
            //this.game.gameMode === this.game.gameModes.SELECT &&
            this.game.toggle.showFishShop
        ) {
            if (
                this.game.mouse.x < this.position.x ||
                this.game.mouse.x > this.position.x + this.width ||
                this.game.mouse.y < this.position.y ||
                this.game.mouse.y > this.position.y + this.height
            ) {
                this.game.toggleFishShop();
                this.game.inputHandler.resetMouseClick();
            }
        }
    };

    checkForBtnClick = (x, y, fishColor, price) => {
        if (
            this.game.mouse.click &&
            //this.game.gameMode === this.game.gameModes.SELECT &&
            this.game.toggle.showFishShop
        ) {
            if (
                this.game.mouse.x > x &&
                this.game.mouse.x < x + this.btnWidth &&
                this.game.mouse.y > y &&
                this.game.mouse.y < y + this.btnHeight
            ) {
                console.log("buy", price);
                if (this.game.handleBuy(price)) {
                    this.buySound.play();
                    this.game.toggleFishShop();
                    this.game.buyFish(fishColor);
                }
                this.game.inputHandler.resetMouseClick();
            }
        }
    };
    checkForCloseBtnClick = () => {
        if (
            this.game.mouse.click &&
            //this.game.gameMode === this.game.gameModes.SELECT &&
            this.game.toggle.showFishShop
        ) {
            if (
                this.game.mouse.x > this.closeBtn.x &&
                this.game.mouse.x < this.closeBtn.x + this.closeBtn.w &&
                this.game.mouse.y > this.closeBtn.y &&
                this.game.mouse.y < this.closeBtn.y + this.closeBtn.h
            ) {
                this.closeSound.play();
                this.game.toggleFishShop();
                this.game.inputHandler.resetMouseClick();
            }
        }
    };
}

export class Shop {
    /**
     * @constructor
     * @param {Game} game Game object
     */
    constructor(game) {
        this.game = game;
        this.gameWidth = this.game.gameWidth;
        this.gameHeight = this.game.gameHeight;
        this.screenMargin = 100;
        this.decorationData = decorationData;
        this.decorations = Object.keys(decorationData);
        this.savedDecorationData = this.game.save.getBg();

        this.width = this.gameWidth - this.gameWidth / 2;
        this.height = this.gameHeight; // - this.gameHeight / 4;
        this.headerWidth = 500;
        this.headerHeight = 70;
        this.btnWidth = 150;
        this.btnHeight = 40;

        this.baseSize = {};
        this.baseSize.x = 230;
        this.baseSize.y = this.baseSize.x * (9 / 16);

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

        this.startPosition = {};

        this.font = "Arial";
        this.fontSize = 20;
        this.itemGapSize = {
            x: 100,
            y: 20,
        };
        this.padding = 20;

        this.panelImg = this.game.loadedAssets[`shopPanel`];
        this.panelHeaderImg = this.game.loadedAssets[`shopPanelHeader`];
        this.btnImg = this.game.loadedAssets[`shopBtn`];
        this.coinImg = this.game.loadedAssets[`coin1`];
        this.closeBtnImg = this.game.loadedAssets[`closeBtn`];

        this.buyBgSound = this.game.sounds.buyBg;
        this.closeSound = this.game.sounds.close;
    }

    /**
     * draw junk on game screen
     * @param {context} ctx Context of canvas
     */
    draw = (ctx) => {
        this.drawPanel(ctx);
        this.drawDecorations(ctx);
    };

    drawPanel = (ctx) => {
        // this.position.x = (this.gameWidth - this.width) / 2;
        // this.position.y = (this.gameHeight - this.height) / 2;
        ctx.drawImage(
            this.panelImg,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        ctx.drawImage(
            this.panelHeaderImg,
            (this.gameWidth - this.headerWidth) / 2, //this.position.x,
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
            "SHOP",
            this.gameWidth / 2,
            this.position.y + 100 + this.headerHeight / 2
        );
    };

    drawDecorations = (ctx) => {
        this.startPosition.x = this.gameWidth / 2;
        this.startPosition.y = this.gameHeight / 2;
        this.imgPosition = {
            x: this.startPosition.x - this.baseSize.x - this.itemGapSize.x / 2,
            y:
                this.startPosition.y -
                this.baseSize.y -
                this.itemGapSize.y +
                this.padding,
        };
        this.count = 0;
        this.decorations.forEach((decoration, index) => {
            if (index != this.game.bgIndex) {
                this.count++;
                this.drawPreview(ctx, decoration);
                // decoration.drawInfo(ctx, this.imgPosition.x, this.imgPosition.y);
                this.btnPosition = {
                    x:
                        this.imgPosition.x +
                        this.baseSize.x / 2 -
                        this.btnWidth / 2,
                    y: this.imgPosition.y + this.baseSize.y - 10,
                };
                this.drawButton(
                    ctx,
                    this.btnPosition.x,
                    this.btnPosition.y,
                    index,
                    this.savedDecorationData.includes(index)
                        ? 0
                        : this.decorationData[decoration].price
                );
                if (this.count == 2) {
                    this.imgPosition.x =
                        this.startPosition.x -
                        this.baseSize.x -
                        this.itemGapSize.x / 2;
                    this.imgPosition.y =
                        this.startPosition.y +
                        this.itemGapSize.y +
                        this.padding;
                } else {
                    this.imgPosition.x =
                        this.startPosition.x + this.itemGapSize.x / 2;
                }
            }
        });
    };

    drawPreview = (ctx, decoration) => {
        // ctx.fillStyle = "#c2c26b";
        // ctx.fillRect(
        //     this.imgPosition.x,
        //     this.imgPosition.y,
        //     this.baseSize.x,
        //     this.baseSize.y
        // );
        this.previewImg = this.game.loadedAssets[decoration];
        ctx.drawImage(
            this.previewImg,
            this.imgPosition.x,
            this.imgPosition.y,
            this.baseSize.x,
            this.baseSize.y
        );
    };
    drawButton = (ctx, x, y, index, price) => {
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
            `BUY       ${price}`,
            x + this.btnWidth / 2,
            y + this.btnHeight / 2
        );
        // ctx.strokeText("BUY", x + this.btnWidth / 2, y + this.btnHeight / 2);
        this.checkForBtnClick(x, y, index, price);
    };

    /**
     * update position of junk
     * @param {number} deltaTime change in time from previous frame
     */
    update = (deltaTime) => {
        this.checkForOutsideClick();
        this.checkForCloseBtnClick();
    };

    checkForOutsideClick = () => {
        if (
            this.game.mouse.click &&
            //this.game.gameMode === this.game.gameModes.SELECT &&
            this.game.toggle.showShop
        ) {
            if (
                this.game.mouse.x < this.position.x ||
                this.game.mouse.x > this.position.x + this.width ||
                this.game.mouse.y < this.position.y ||
                this.game.mouse.y > this.position.y + this.height
            ) {
                this.game.toggleShop();
                this.game.inputHandler.resetMouseClick();
            }
        }
    };

    checkForBtnClick = (x, y, index, price) => {
        if (
            this.game.mouse.click &&
            //this.game.gameMode === this.game.gameModes.SELECT &&
            this.game.toggle.showShop
        ) {
            if (
                this.game.mouse.x > x &&
                this.game.mouse.x < x + this.btnWidth &&
                this.game.mouse.y > y &&
                this.game.mouse.y < y + this.btnHeight
            ) {
                console.log("buy", price);
                if (this.game.handleBuy(price)) {
                    this.buyBgSound.play();
                    this.game.toggleShop();
                    this.game.updateBg(index);
                    if (price) this.game.save.saveBg(index);
                }
                this.game.inputHandler.resetMouseClick();
            }
        }
    };

    checkForCloseBtnClick = () => {
        if (
            this.game.mouse.click &&
            //this.game.gameMode === this.game.gameModes.SELECT &&
            this.game.toggle.showShop
        ) {
            if (
                this.game.mouse.x > this.closeBtn.x &&
                this.game.mouse.x < this.closeBtn.x + this.closeBtn.w &&
                this.game.mouse.y > this.closeBtn.y &&
                this.game.mouse.y < this.closeBtn.y + this.closeBtn.h
            ) {
                this.closeSound.play();
                this.game.toggleShop();
                this.game.inputHandler.resetMouseClick();
            }
        }
    };
}
