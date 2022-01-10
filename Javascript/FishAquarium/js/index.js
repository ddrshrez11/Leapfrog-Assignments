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

    let lastTime = 0;
    let gameLoop = (timestamp) => {
        let deltaTime = timestamp - lastTime;
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
    game = undefined;
    startGame();
};
window.resetGame = resetGame;
