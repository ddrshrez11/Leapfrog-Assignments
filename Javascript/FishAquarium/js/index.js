import Game from "./game.js";

const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");
const GAME_WIDTH = window.innerWidth - 50;
const GAME_HEIGHT = window.innerHeight - 80;
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
canvas.style.border = "2px solid #000";
let game;
const startGame = () => {
    game = new Game(GAME_WIDTH, GAME_HEIGHT, canvas);
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
startGame();

const resetGame = () => {
    localStorage.removeItem("junks");
    localStorage.removeItem("coins");
    localStorage.removeItem("fishes");
    localStorage.removeItem("money");
    game = undefined;
    startGame();
};

window.resetGame = resetGame;
