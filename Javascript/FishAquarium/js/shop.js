import Fish from "./fish.js";

export default class Shop {
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

        this.width = this.gameWidth - this.gameWidth / 2;
        this.height = this.gameHeight; // - this.gameHeight / 4;
        this.headerWidth = 500;
        this.headerHeight = 70;
        this.btnWidth = 150;
        this.btnHeight = 40;

        this.position = {
            x: (this.gameWidth - this.width) / 2,
            y: (this.gameHeight - this.height) / 2,
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
        this.leftpadding = 100;

        this.panelImg = new Image();
        this.panelImg.src = "./assets/otherObjects/shopPanel.png";

        this.panelHeaderImg = new Image();
        this.panelHeaderImg.src = "./assets/otherObjects/shopPanelHeader.png";

        this.btnImg = new Image();
        this.btnImg.src = "./assets/otherObjects/buyBtn.png";

        this.coinImg = new Image();
        this.coinImg.src = "./assets/coins/coin-1.png";
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
        let imgPosition = {
            x: this.position.x + this.startPosition.x + this.leftpadding,
            y:
                this.startPosition.y -
                this.shopFishes[0].baseSize -
                this.itemGapSize.y / 2.5,
        };
        this.shopFishes.forEach((shopFish, index) => {
            shopFish.drawInfo(ctx, imgPosition.x, imgPosition.y);
            let btnPosition = {
                x: imgPosition.x - this.btnWidth / 2,
                y: imgPosition.y + shopFish.baseSize * 2 + 10,
            };
            this.drawButton(ctx, btnPosition.x, btnPosition.y, shopFish.color);
            if (index == 2) {
                imgPosition.x -=
                    index * (shopFish.baseSize + this.itemGapSize.x);
                imgPosition.y = this.startPosition.y + this.itemGapSize.y * 0.5;
            } else {
                imgPosition.x += shopFish.baseSize + this.itemGapSize.x;
            }
        });
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
        this.checkForOutsideClick();
        this.shopFishes.forEach((shopFish) => {
            shopFish.update(deltaTime);
        });
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

    checkForBtnClick = (x, y, fishColor) => {
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
                console.log("buy");
                this.game.toggleShop();
                this.game.buyFish(fishColor);
                this.game.inputHandler.resetMouseClick();
            }
        }
    };
}
