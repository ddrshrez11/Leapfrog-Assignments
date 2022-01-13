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
     * draw Menu UI on game screen
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

        this.menuOptions.forEach((option, index) => {
            this.drawMenuIcons(ctx, option, index);
        });

        this.drawMoneyCounter(ctx);
        this.drawMenuBtn(ctx);
        if (this.moneyInfoType) {
            if (this.moneyInfoType > 0) {
                this.displayMoneyGainInfo(ctx, this.moneyInfo);
            } else if (this.moneyInfoType < 0) {
                this.displayMoneySpentInfo(ctx, this.moneyInfo);
            }
        }
    };

    /**
     * draw Left side menu options on game screen
     * @param {context} ctx Context of canvas
     * @param {number} index index of menuOptions
     */
    drawMenuIcons = (ctx, option, index) => {
        this.option = menuData[option];
        this.menuIconImg = this.game.loadedAssets[`menu_${option}`];
        this.imgWidth =
            this.imgHeight * (this.option.width / this.option.height);

        ctx.drawImage(
            this.bubbleImg,
            this.startPosition.x,
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

    /**
     *  draw right side menu options on game screen
     * @param {context} ctx Context of canvas
     */
    drawMenuBtn = (ctx) => {
        this.startPosition.x =
            this.gameWidth - this.menuBtnIcon.width - this.padding.x;
        this.startPosition.y = this.padding.y + 5;

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

    /**
     *  draw Money Counter on game screen
     * @param {context} ctx Context of canvas
     */
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
     */
    update = () => {
        return;
    };

    /**
     * check for click on menu option - left side
     * @param {number} index index of menuOptions
     */
    checkForBtnClick = (index) => {
        if (this.game.mouse.click) {
            if (
                this.game.mouse.x > this.startPosition.x &&
                this.game.mouse.x < this.startPosition.x + this.width &&
                this.game.mouse.y > this.startPosition.y &&
                this.game.mouse.y <
                    this.startPosition.y + this.height + this.fontSize
            ) {
                if (
                    !this.game.toggle.showInfo &&
                    !this.game.toggle.showFishShop &&
                    !this.game.toggle.showShop &&
                    !this.game.toggle.showHelp
                ) {
                    if (this.game.toggle.showInfo) this.game.toggleShowInfo();
                    if (this.game.toggle.showFishShop)
                        this.game.toggleFishShop();
                    if (this.game.toggle.showShop) this.game.toggleShop();
                    if (this.game.toggle.showHelp) this.game.toggleHelp();
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

    /**
     * check for click on menu settings - right side
     * @param {number} index index of menuOptions
     */
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
                if (
                    !this.game.toggle.showInfo &&
                    !this.game.toggle.showFishShop &&
                    !this.game.toggle.showShop &&
                    !this.game.toggle.showHelp
                ) {
                    if (this.game.toggle.showInfo) this.game.toggleShowInfo();
                    if (this.game.toggle.showFishShop)
                        this.game.toggleFishShop();
                    if (this.game.toggle.showShop) this.game.toggleShop();
                    if (this.game.toggle.showHelp) this.game.toggleHelp();
                    if (index === 8) {
                        if (!this.game.toggle.isMute) this.resetSound.play();
                        if (this.game.toggle.isMute) this.resetSound.stop();
                        this.game.resetGame();
                    } else if (index === 7) this.game.toggleHelp();
                    else if (index === 6) this.game.toggleMute();
                }

                this.game.inputHandler.resetMouseClick();
            }
        }
    };

    /**
     *  display money spent on game screen
     * @param {context} ctx Context of canvas
     * @param {string} msg message to be displayed
     */
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
            msg,
            this.startPosition.x,
            this.startPosition.y + this.menuBtnIcon.width
        );
        if (!this.displayMoneyInfoTimeout)
            this.displayMoneyInfoTimeout = setTimeout(() => {
                this.moneyInfoType = 0;
                this.displayMoneyInfoTimeout = false;
            }, 2000);
    };

    /**
     *  display money gained on game screen
     * @param {context} ctx Context of canvas
     * @param {string} msg message to be displayed
     */
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
            msg,
            this.startPosition.x,
            this.startPosition.y + this.menuBtnIcon.width
        );
        if (!this.displayMoneyInfoTimeout)
            this.displayMoneyInfoTimeout = setTimeout(() => {
                this.moneyInfoType = 0;
                this.displayMoneyInfoTimeout = false;
            }, 2000);
    };

    /**
     *  display money spent on game screen
     * @param {string} msg message to be displayed
     * @param {number} type type of transaction - spent(-1) or gained(1)
     */
    setMoneyInfo = (msg, type) => {
        this.game.menu.moneyInfo = msg;
        this.game.menu.moneyInfoType = type;
        clearTimeout(this.displayMoneyInfoTimeout);
        this.displayMoneyInfoTimeout = false;
    };
}
