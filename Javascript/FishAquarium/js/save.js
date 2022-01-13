export default class Save {
    /**
     * @constructor
     * @param {Game} game Game object
     */
    constructor(game) {
        this.game = game;
    }

    /**
     * save Money to local storage
     */
    saveMoney = () => {
        this.saveInfo = this.game.money;
        localStorage.setItem("money", this.saveInfo);
    };

    /**
     * save background image index to local storage
     */
    saveBgIndex = () => {
        this.saveInfo = this.game.bgIndex;
        localStorage.setItem("bgIndex", this.saveInfo);
    };

    /**
     * save bought background images to local storage
     */
    saveBg = (decoration) => {
        this.saveBgInfoArr = this.getBg();
        this.saveBgInfoArr.push(decoration);
        localStorage.setItem("bg", JSON.stringify(this.saveBgInfoArr));
    };

    /**
     * save fishes to local storage
     */
    saveFishes = () => {
        this.saveFishesInfoArr = [];
        this.game.fishes.forEach((fish) => {
            this.saveFishesInfoArr.push(fish.save());
        });
        this.fishJson = JSON.stringify(this.saveFishesInfoArr);
        localStorage.setItem("fishes", this.fishJson);
    };

    /**
     * save active coins to local storage
     */
    saveCoins = () => {
        this.saveCoinInfoArr = [];
        this.game.coins.forEach((coin) => {
            this.saveCoinInfoArr.push(coin.save());
        });
        this.coinJson = JSON.stringify(this.saveCoinInfoArr);
        localStorage.setItem("coins", this.coinJson);
    };

    /**
     * save active junks to local storage
     */
    saveJunks = () => {
        this.saveJunkInfoArr = [];
        this.game.junks.forEach((junk) => {
            this.saveJunkInfoArr.push(junk.save());
        });
        this.junkJson = JSON.stringify(this.saveJunkInfoArr);
        localStorage.setItem("junks", this.junkJson);
    };

    /**
     * get Fishes from local storage
     */
    getFishes = () => {
        return JSON.parse(localStorage.getItem("fishes"));
    };

    /**
     * get active Junks from local storage
     */
    getJunks = () => {
        return JSON.parse(localStorage.getItem("junks"));
    };

    /**
     * get active Coins from local storage
     */
    getCoins = () => {
        return JSON.parse(localStorage.getItem("coins"));
    };

    /**
     * get Money from local storage
     */
    getMoney = () => {
        return localStorage.getItem("money");
    };

    /**
     * get background image index from local storage
     */
    getBgIndex = () => {
        return localStorage.getItem("bgIndex");
    };

    /**
     * get bought background images from local storage
     */
    getBg = () => {
        return localStorage.getItem("bg")
            ? JSON.parse(localStorage.getItem("bg"))
            : [0];
    };
}
