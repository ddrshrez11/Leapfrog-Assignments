export default class Save {
    constructor(game) {
        this.game = game;
    }
    saveMoney = () => {
        this.saveInfo = this.game.money;
        localStorage.setItem("money", this.saveInfo);
    };
    saveBgIndex = () => {
        this.saveInfo = this.game.bgIndex;
        localStorage.setItem("bgIndex", this.saveInfo);
    };
    saveFishes = () => {
        this.saveFishesInfoArr = [];
        this.game.fishes.forEach((fish) => {
            this.saveFishesInfoArr.push(fish.save());
        });
        this.fishJson = JSON.stringify(this.saveFishesInfoArr);
        localStorage.setItem("fishes", this.fishJson);
        console.log(JSON.parse(localStorage.getItem("fishes")));
    };

    saveCoins = () => {
        this.saveCoinInfoArr = [];
        this.game.coins.forEach((coin, index) => {
            this.saveCoinInfoArr.push(coin.save());
        });
        this.coinJson = JSON.stringify(this.saveCoinInfoArr);
        localStorage.setItem("coins", this.coinJson);
        console.log(JSON.parse(localStorage.getItem("coins")));
    };

    saveJunks = () => {
        this.saveJunkInfoArr = [];
        this.game.junks.forEach((junk, index) => {
            this.saveJunkInfoArr.push(junk.save());
        });
        this.junkJson = JSON.stringify(this.saveJunkInfoArr);
        localStorage.setItem("junks", this.junkJson);
        console.log(JSON.parse(localStorage.getItem("junks")));
    };

    getFishes = () => {
        return JSON.parse(localStorage.getItem("fishes"));
    };

    getJunks = () => {
        return JSON.parse(localStorage.getItem("junks"));
    };

    getCoins = () => {
        return JSON.parse(localStorage.getItem("coins"));
    };
    getMoney = () => {
        return localStorage.getItem("money");
    };
    getBgIndex = () => {
        return localStorage.getItem("bgIndex");
    };
}
