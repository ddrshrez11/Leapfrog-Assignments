import Game from "./game.js";
const loading = document.getElementById("loading");
const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");
const GAME_WIDTH = window.innerWidth - 50;
const GAME_HEIGHT = window.innerHeight - 80;
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
canvas.style.border = "2px solid #000";
let game;
const loadedAssets = {};
const startGame = () => {
    game = new Game(GAME_WIDTH, GAME_HEIGHT, canvas, loadedAssets);
    game.start();

    window.addEventListener("beforeunload", function (e) {
        var confirmationMessage = "Are you sure you want to leave the game?";

        localStorage.setItem("restart", "yes");

        game.save.saveFishes();
        game.save.saveCoins();
        game.save.saveJunks();
        game.save.saveMoney();

        e.returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    });

    let lastTime = 0;
    let deltaTime;
    let gameLoop = (timestamp) => {
        deltaTime = timestamp - lastTime;
        lastTime = timestamp;

        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        game.update(deltaTime);
        game.draw(ctx);

        requestAnimationFrame(gameLoop);
    };

    requestAnimationFrame(gameLoop);

    //! REMOVE
    window.game = game;
};

const assets = [
    "./assets/otherObjects/bg1.jpg",
    "./assets/fishes/blue_left.png",
    "./assets/fishes/blue_right.png",
    "./assets/fishes/black_left.png",
    "./assets/fishes/black_right.png",
    "./assets/fishes/green_left.png",
    "./assets/fishes/green_right.png",
    "./assets/fishes/green_left.png",
    "./assets/fishes/green_right.png",
    "./assets/fishes/red_left.png",
    "./assets/fishes/red_right.png",
    "./assets/fishes/yellow_left.png",
    "./assets/fishes/yellow_right.png",
];
const assetsLoaded = assets.map(
    (url) =>
        new Promise((resolve) => {
            const img = new Image();
            img.onerror = (e) => reject(`${url} failed to load`);
            img.onload = (e) => resolve(img);
            img.src = url;
        })
);

Promise.all(assetsLoaded)
    .then((images) => {
        loading.style.display = "none";
        loadedAssets.background = images[0];
        loadedAssets.blue_left = images[1];
        loadedAssets.blue_right = images[2];
        loadedAssets.black_left = images[3];
        loadedAssets.black_right = images[4];
        loadedAssets.green_left = images[5];
        loadedAssets.green_right = images[6];
        loadedAssets.green_left = images[7];
        loadedAssets.green_right = images[8];
        loadedAssets.red_left = images[9];
        loadedAssets.red_right = images[10];
        loadedAssets.yellow_left = images[11];
        loadedAssets.yellow_right = images[12];
        // loadedAssets.background = images[13];
        // loadedAssets.background = images[14];
        console.log(loadedAssets);
        startGame();
    })
    .catch((err) => console.error(err));

// startGame();

const resetGame = () => {
    localStorage.removeItem("junks");
    localStorage.removeItem("coins");
    localStorage.removeItem("fishes");
    localStorage.removeItem("money");
    game = undefined;
    startGame();
};

window.resetGame = resetGame;
