export default class Save {
    constructor(game) {
        this.game = game;
    }

    saveFishes = () => {
        let saveInfo = [];
        this.game.fishes.forEach((fish) => {
            saveInfo.push(fish.save());
        });
        let fishJson = JSON.stringify(
            saveInfo
            //this.getCircularReplacer()
        );
        localStorage.setItem("fishes", fishJson);
        console.log(JSON.parse(localStorage.getItem("fishes")));
    };

    saveCoins = () => {
        let saveInfo = [];
        this.game.coins.forEach((coin, index) => {
            saveInfo.push(coin.save());
        });
        let fishJson = JSON.stringify(
            saveInfo
            //this.getCircularReplacer()
        );
        localStorage.setItem("coins", fishJson);
        console.log(JSON.parse(localStorage.getItem("coins")));
    };

    saveJunks = () => {
        let saveInfo = [];
        this.game.junks.forEach((junk, index) => {
            saveInfo.push(junk.save());
        });
        let fishJson = JSON.stringify(
            saveInfo
            //this.getCircularReplacer()
        );
        localStorage.setItem("junks", fishJson);
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
    };
}
