let bird;
let background;
let speed = 2;
const FPS = 16;
const GRAVITY = -4;

function start() {
    // actionArea.viewport.position = "relative";
    // const startMenu = document.createElement("div");
    // startMenu.id ="startMenu";
    // actionArea.viewport.append(startMenu);
    // startMenu.style.width = "900px";
    // startMenu.style.height = "400px";
    // startMenu.style.position = "absolute";
    // startMenu.style.top = "5px";
    // startMenu.style.left = "50%";
    // // startMenu.style.right = "0";
    // startMenu.style.transform = "translateX(-50%)";
    // startMenu.style.backgroundColor = "blue";
    // startMenu.style.textAlign = "center";
    // startMenu.style.color = "white";
    // startMenu.style.fontSize = "100px";
    // startMenu.style.fontFamily = "Ubuntu";
    // startMenu.style.paddingTop = "10%";
    // startMenu.innerHTML = "Car Lane Game";
    // // actionArea.startAction();

    // const startBtn = document.createElement("div");
    // startBtn.style.position = "absolute";
    // startBtn.style.height = "50px";
    // startBtn.style.width = "150px";
    // startBtn.style.padding = "10px";
    // startBtn.style.borderRadius = "20%";

    // startBtn.style.fontSize = "40px";
    // startBtn.style.backgroundColor = "red";
    // startBtn.style.bottom = "30px";
    // startBtn.style.marginLeft = "50%";
    // startBtn.style.transform = "translateX(-50%)"
    // // reLoad.style.marginBottom = "30px";
    // startBtn.innerText = "Play";
    // startMenu.append(startBtn);
    // startBtn.onclick = function () {
    //   startGame(startMenu);
    // };

    startGame();
}

function startGame() {
    actionArea.startAction();
    // car = new Bird();
    background = new Background();
    bird = new Bird();
}

function updateActionArea() {
    background.update();
    baseCollision(bird);
    bird.update();
}
