export default class Save {
    constructor(game) {
        this.game = game;
    }
    saveMoney = () => {
        this.saveInfo = this.game.money;
        localStorage.setItem("money", this.saveInfo);
    };
    saveFishes = () => {
        this.saveFishesInfoArr = [];
        this.game.fishes.forEach((fish) => {
            this.saveFishesInfoArr.push(fish.save());
        });
        this.fishJson = JSON.stringify(
            this.saveFishesInfoArr
            //this.getCircularReplacer()
        );
        localStorage.setItem("fishes", this.fishJson);
        console.log(JSON.parse(localStorage.getItem("fishes")));
    };

    saveCoins = () => {
        this.saveCoinInfoArr = [];
        this.game.coins.forEach((coin, index) => {
            this.saveCoinInfoArr.push(coin.save());
        });
        this.coinJson = JSON.stringify(
            this.saveCoinInfoArr
            //this.getCircularReplacer()
        );
        localStorage.setItem("coins", this.coinJson);
        console.log(JSON.parse(localStorage.getItem("coins")));
    };

    saveJunks = () => {
        this.saveJunkInfoArr = [];
        this.game.junks.forEach((junk, index) => {
            this.saveJunkInfoArr.push(junk.save());
        });
        this.junkJson = JSON.stringify(
            this.saveJunkInfoArr
            //this.getCircularReplacer()
        );
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

    getCircularReplacer = () => {
        const seen = new WeakSet();
        return (key, value) => {
            if (typeof value === "object" && value !== null) {
                if (seen.has(value)) {
                    return;
                }
                seen.add(value);
            }
            return value;
        };
    };
}
