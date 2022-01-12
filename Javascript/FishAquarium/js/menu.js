import Coin from "./coin.js";
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
        this.moneyInfo = "";
        this.moneyInfoType = 0;

        this.width = this.gameWidth / 20;
        this.height = this.width;
        this.imgHeight = this.height - 20;
        this.btnWidth = 100;
        this.btnHeight = 40;
        this.coinRadius = 30;

        this.position = {
            x: 0,
            y: 0,
        };
        this.startPosition = {
            x: 0,
            y: 0,
        };
        this.font = "Arial";
        this.fontSize = 20;
        this.itemGapSize = {
            x: 20,
            y: 15,
        };

        this.padding = {
            x: 30,
            y: 5,
        };

        this.menuBtnIcon = {
            width: 60,
            height: 60,
        };
        this.btnImg = this.game.loadedAssets[`btn2`];
        this.bubbleImg = this.game.loadedAssets[`menuBubble`];
        this.menuCoinImg = this.game.loadedAssets[`coin1`];
        this.replayBtnImg = this.game.loadedAssets[`replayBtn`];
        this.infoBtnImg = this.game.loadedAssets[`infoBtn`];
        this.soundOnImg = this.game.loadedAssets[`soundOnBtn`];
        this.soundOffImg = this.game.loadedAssets[`soundOffBtn`];
        this.soundBtnImg = this.soundOnImg;

        this.resetSound = this.game.sounds.reset;
    }

    /**
     * draw junk on game screen
     * @param {context} ctx Context of canvas
     */
    draw = (ctx) => {
        this.startPosition.x = this.padding.x;
        this.startPosition.y = this.padding.y;

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

        this.drawMoneyCounter(ctx);
        this.drawMenuBtn(ctx);
        if (!!this.moneyInfoType) {
            if (this.moneyInfoType > 0) {
                console.log("money added");
                this.displayMoneyGainInfo(ctx, this.moneyInfo);
            } else if (this.moneyInfoType < 0) {
                this.displayMoneySpentInfo(ctx, this.moneyInfo);
            }
        }
    };

    drawMenuIcons = (ctx, option, index) => {
        this.option = menuData[option];
        this.menuIconImg = this.game.loadedAssets[`menu_${option}`];
        this.imgWidth =
            this.imgHeight * (this.option.width / this.option.height);

        ctx.drawImage(
            this.bubbleImg,
            this.startPosition.x, // + this.padding.x,
            this.startPosition.y,
            this.width,
            this.height
        );
        ctx.drawImage(
            this.menuIconImg,
            this.startPosition.x + (this.width - this.imgWidth) / 2,
            this.startPosition.y + this.padding.y * 1.5,
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
            this.startPosition.x + this.width / 2,
            this.startPosition.y + this.padding.y * 2.5 + this.imgHeight
        );
        ctx.fillText(
            this.option.name,
            this.startPosition.x + this.width / 2,
            this.startPosition.y + this.padding.y * 2.5 + this.imgHeight
        );

        this.checkForBtnClick(index);
        this.startPosition.x += this.width + this.padding.x;
    };

    drawMenuBtn = (ctx) => {
        this.startPosition.x =
            this.gameWidth - this.menuBtnIcon.width - this.padding.x;
        this.startPosition.y = this.padding.y + 5; //+ this.settingIcon.height / 2;

        ctx.drawImage(
            this.replayBtnImg,
            this.startPosition.x,
            this.startPosition.y,
            this.menuBtnIcon.width,
            this.menuBtnIcon.height
        );

        this.checkForMenuBtnClick(8);

        this.startPosition.x -= this.menuBtnIcon.width + this.padding.x / 2;

        ctx.drawImage(
            this.infoBtnImg,
            this.startPosition.x,
            this.startPosition.y,
            this.menuBtnIcon.width,
            this.menuBtnIcon.height
        );
        this.checkForMenuBtnClick(7);

        this.startPosition.x -= this.menuBtnIcon.width + this.padding.x / 2;
        if (!this.game.toggle.isMute) this.soundBtnImg = this.soundOnImg;
        else if (this.game.toggle.isMute) this.soundBtnImg = this.soundOffImg;
        ctx.drawImage(
            this.soundBtnImg,
            this.startPosition.x,
            this.startPosition.y,
            this.menuBtnIcon.width,
            this.menuBtnIcon.height
        );
        this.checkForMenuBtnClick(6);
    };

    drawMoneyCounter = (ctx) => {
        this.startPosition.x =
            this.gameWidth -
            this.btnWidth -
            this.padding.x * 2.5 -
            this.menuBtnIcon.width * 3;
        this.startPosition.y =
            this.padding.y + 5 + (this.coinRadius - this.btnHeight / 2);

        ctx.drawImage(
            this.btnImg,
            this.startPosition.x,
            this.startPosition.y,
            this.btnWidth,
            this.btnHeight
        );
        ctx.drawImage(
            this.menuCoinImg,
            this.startPosition.x - this.coinRadius - 5,
            this.padding.y + 5,
            2 * this.coinRadius,
            2 * this.coinRadius
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
            this.game.money,
            this.startPosition.x + this.btnWidth / 2,
            this.startPosition.y + this.btnHeight / 2
        );
        ctx.fillText(
            this.game.money,
            this.startPosition.x + this.btnWidth / 2,
            this.startPosition.y + this.btnHeight / 2
        );
    };

    /**
     * update position of junk
     * @param {number} deltaTime change in time from previous frame
     */
    update = (deltaTime) => {
        // this.checkForOutsideClick();
    };

    checkForBtnClick = (index) => {
        if (this.game.mouse.click) {
            if (
                this.game.mouse.x > this.startPosition.x &&
                this.game.mouse.x < this.startPosition.x + this.width &&
                this.game.mouse.y > this.startPosition.y &&
                this.game.mouse.y <
                    this.startPosition.y + this.height + this.fontSize
            ) {
                console.log("Menu Click", index);
                if (
                    !this.game.toggle.showInfo &&
                    !this.game.toggle.showFishShop &&
                    !this.game.toggle.showFishShop
                ) {
                    if (this.game.toggle.showInfo) this.game.toggleShowInfo();
                    if (this.game.toggle.showFishShop)
                        this.game.toggleFishShop();
                    if (this.game.toggle.showShop) this.game.toggleShop();
                    if (index < 4) {
                        this.game.gameMode = index;
                        this.game.updateCursor();
                    } else if (index === 4) this.game.toggleFishShop();
                    else if (index === 5) this.game.toggleShop();
                }

                this.game.inputHandler.resetMouseClick();
            }
        }
    };
    checkForMenuBtnClick = (index) => {
        if (this.game.mouse.click) {
            if (
                this.game.mouse.x > this.startPosition.x &&
                this.game.mouse.x <
                    this.startPosition.x + this.menuBtnIcon.width &&
                this.game.mouse.y > this.startPosition.y &&
                this.game.mouse.y <
                    this.startPosition.y + this.menuBtnIcon.height
            ) {
                console.log("Menu BTN Click", index);
                if (
                    !this.game.toggle.showInfo &&
                    !this.game.toggle.showFishShop &&
                    !this.game.toggle.showFishShop
                ) {
                    if (this.game.toggle.showInfo) this.game.toggleShowInfo();
                    if (this.game.toggle.showFishShop)
                        this.game.toggleFishShop();
                    if (this.game.toggle.showShop) this.game.toggleShop();
                    if (index === 8) {
                        if (!this.game.toggle.isMute) this.resetSound.play();
                        if (this.game.toggle.isMute) this.resetSound.stop();
                        this.game.resetGame();
                    } else if (index === 7) console.log("info");
                    //! info page
                    else if (index === 6) this.game.toggleMute(); //!mute game
                }

                this.game.inputHandler.resetMouseClick();
            }
        }
    };

    displayMoneySpentInfo = (ctx, msg) => {
        this.startPosition.x =
            this.gameWidth - (this.menuBtnIcon.width + this.padding.x) * 1;
        this.startPosition.y = this.padding.y + 35;

        ctx.font = `bold ${this.fontSize + 5}px ${this.font}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "red";
        ctx.lineWidth = 2;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowColor = "black";
        ctx.shadowBlur = 3;
        ctx.strokeText(
            msg,
            this.startPosition.x,
            this.startPosition.y + this.menuBtnIcon.width
        );
        ctx.fillText(
            // "-  $ 4",
            // "No Money",
            msg,
            this.startPosition.x,
            this.startPosition.y + this.menuBtnIcon.width
        );
        // clearTimeout(this.displayMoneyInfoTimeout);
        if (!this.displayMoneyInfoTimeout)
            this.displayMoneyInfoTimeout = setTimeout(() => {
                this.moneyInfoType = 0;
                this.displayMoneyInfoTimeout = false;
            }, 2000);
    };
    displayMoneyGainInfo = (ctx, msg) => {
        this.startPosition.x =
            this.gameWidth - (this.menuBtnIcon.width + this.padding.x) * 1;
        this.startPosition.y = this.padding.y + 35;

        ctx.font = `bold ${this.fontSize + 5}px ${this.font}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "rgb(69 174 0)";
        ctx.lineWidth = 2;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowColor = "black";
        ctx.shadowBlur = 3;
        ctx.strokeText(
            msg,
            this.startPosition.x,
            this.startPosition.y + this.menuBtnIcon.width
        );
        ctx.fillText(
            // "-  $ 4",
            msg,
            this.startPosition.x,
            this.startPosition.y + this.menuBtnIcon.width
        );
        // clearTimeout(this.displayMoneyInfoTimeout);
        if (!this.displayMoneyInfoTimeout)
            this.displayMoneyInfoTimeout = setTimeout(() => {
                this.moneyInfoType = 0;
                this.displayMoneyInfoTimeout = false;
            }, 2000);
    };

    setMoneyInfo = (msg, type) => {
        this.game.menu.moneyInfo = msg;
        this.game.menu.moneyInfoType = type;
        clearTimeout(this.displayMoneyInfoTimeout);
        this.displayMoneyInfoTimeout = false;
    };
}
