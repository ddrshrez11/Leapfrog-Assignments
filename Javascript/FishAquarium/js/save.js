export default class Save {
    constructor(game) {
        this.game = game;
    }
    saveMoney = () => {
        this.saveInfo = this.game.money;
        localStorage.setItem("money", this.saveInfo);
    };
    saveFishes = () => {
        this.saveInfoArr = [];
        this.game.fishes.forEach((fish) => {
            this.saveInfoArr.push(fish.save());
        });
        this.fishJson = JSON.stringify(
            this.saveInfoArr
            //this.getCircularReplacer()
        );
        localStorage.setItem("fishes", fishJson);
        console.log(JSON.parse(localStorage.getItem("fishes")));
    };

    saveCoins = () => {
        this.saveInfoArr = [];
        this.game.coins.forEach((coin, index) => {
            this.saveInfoArr.push(coin.save());
        });
        this.fishJson = JSON.stringify(
            this.saveInfoArr
            //this.getCircularReplacer()
        );
        localStorage.setItem("coins", fishJson);
        console.log(JSON.parse(localStorage.getItem("coins")));
    };

    saveJunks = () => {
        this.saveInfoArr = [];
        this.game.junks.forEach((junk, index) => {
            this.saveInfoArr.push(junk.save());
        });
        this.fishJson = JSON.stringify(
            this.saveInfoArr
            //this.getCircularReplacer()
        );
        localStorage.setItem("junks", this.fishJson);
        console.log(JSON.parse(localStorage.getItem("junks")));
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

    resetGame = () => {
        localStorage.removeItem("junks");
        localStorage.removeItem("coins");
        localStorage.removeItem("fishes");
        localStorage.removeItem("money");
    };
}
