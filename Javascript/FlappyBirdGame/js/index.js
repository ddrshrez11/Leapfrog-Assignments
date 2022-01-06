let bird;
let background;
let obstacles = [];
let obstacle_gen;
let speed = 2;
let gameOverState = false;
const FPS = 16;
const GRAVITY = -4;
const minGap = 100;
const maxGap = 150;
let score = 0;
let highscore = localStorage.getItem("highscore_fb")
    ? localStorage.getItem("highscore_fb")
    : 0;

function startMenu() {
    actionArea.viewport.position = "relative";
    const startMenu = document.createElement("div");
    startMenu.id = "startMenu";
    actionArea.viewport.append(startMenu);
    startMenu.style.width = "340px";
    startMenu.style.height = "600px";
    startMenu.style.margin = "0 auto";
    startMenu.style.background = "#ded895";
    startMenu.style.backgroundImage =
        "url(assets/sprites/message.png),url(assets/sprites/background-day.png)";
    startMenu.style.backgroundRepeat = "no-repeat";
    startMenu.style.backgroundSize = "contain";
    startMenu.style.backgroundPosition = "center";
    startMenu.style.backgroundOrigin = "border-box";

    startMenu.onclick = function () {
        startGame(startMenu);
    };

    // startGame();
}

function startGame(startMenu = undefined) {
    if (startMenu) startMenu.style.display = "none";
    actionArea.startAction();
    // actionArea.clear();
    actionArea.interval = setInterval(updateActionArea, FPS);
    background = new Background();
    bird = new Bird();
    obstacle_gen = setInterval(() => {
        obstacles.push(new Obstacle(10));
    }, 2000);
}

function updateActionArea() {
    background.update();
    obstacles.forEach((obstacle) => {
        obstacle.update();
        obstacleCollision(obstacle);
        if (obstacle.scoreToggle) scoring(obstacle);
    });
    displayScore();
    baseCollision(bird);
    bird.update();

    if (gameOverState) {
        document.body.removeEventListener("keydown", actionArea.handleKeyPress);
        document.body.removeEventListener("click", actionArea.handleClick);
        clearInterval(actionArea.interval);
    }
}

function gameOver() {
    bird.dieSound.play();
    clearInterval(obstacle_gen);
    clearInterval(actionArea.interval);
    clearInterval(actionArea.jumpAnimation);
    // displayScoreClear();

    document.body.removeEventListener("keydown", actionArea.handleKeyPress);
    document.body.removeEventListener("click", actionArea.handleClick);

    actionArea.clear();
    background.update();
    // bird.update();

    if (score > highscore) {
        localStorage.setItem("highscore_fb", score);
    }

    let ctx = actionArea.context;
    ctx.fillStyle = "#ded895";
    ctx.fillRect(130, 80, 100, 120);

    actionArea.context.font = "22px Ubuntu";
    actionArea.context.fillStyle = "red";
    actionArea.context.fillText(`Score`, 155, 105);

    let score_str = score.toString();
    for (let i = 0; i < score_str.length; i++) {
        let num_shift = 0;
        this.img = document.createElement("img");
        this.img.src = `assets/sprites/${score_str[i]}.png`;
        ctx.drawImage(this.img, 170 + num_shift, 115, 16, 24);
        num_shift += 16;
    }

    actionArea.context.font = "22px Ubuntu";
    actionArea.context.fillStyle = "red";
    actionArea.context.fillText(`Best`, 160, 160);

    let highscore_str = highscore.toString();
    for (let i = 0; i < highscore_str.length; i++) {
        let num_shift = 0;
        this.img1 = document.createElement("img");
        this.img1.src = `assets/sprites/${highscore_str[i]}.png`;
        ctx.drawImage(this.img1, 170 + num_shift, 165, 16, 24);
        num_shift += num_shift;
    }

    actionArea.context.font = "28px Ubuntu";
    ctx.fillStyle = "#e86101";
    ctx.fillRect(125, 300, 120, 50);
    actionArea.context.fillStyle = "white";
    actionArea.context.fillText(`Restart`, 145, 335);

    let rect = {
        x: 125,
        y: 300,
        width: 1200,
        height: 50,
    };
    actionArea.canvas.addEventListener(
        "click",
        function (evt) {
            var mousePos = getMousePos(actionArea.canvas, evt);

            if (isInside(mousePos, rect)) {
                console.log("restrt");
                bird = null;
                obstacles = [];
                score = 0;
                speed = 2;
                background = null;
                gameOverState = false;

                startGame();
            }
        },
        false
    );
}
