let bird;
let background;
let obstacles = [];
let obstacle;
let obstacle_gen;
let speed = 2;
const FPS = 16;
const GRAVITY = -4;
const minGap = 100;
const maxGap = 150;
let score = 0;
let highscore = localStorage.getItem("highscore_fb") || 0;

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

function startGame(startMenu) {
    startMenu.style.display = "none";
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
    // gameOver();

    background.update();
    obstacles.forEach((obstacle) => {
        obstacle.update();
        obstacleCollision(obstacle);
        if (obstacle.scoreToggle) scoring(obstacle);
    });
    actionArea.displayScore();
    baseCollision(bird);
    bird.update();
}

function gameOver() {
    clearInterval(obstacle_gen);
    clearInterval(actionArea.interval);

    actionArea.clear();
    background.update();
    bird.update();

    if (score > highscore) {
        localStorage.setItem("highscore_fb", score);
    }

    ctx = actionArea.context;
    ctx.fillStyle = "#ded895";
    ctx.fillRect(130, 60, 100, 120);

    actionArea.context.font = "22px Ubuntu";
    actionArea.context.fillStyle = "red";
    actionArea.context.fillText(`Score`, 155, 85);

    let score_str = score.toString();
    for (let i = 0; i < score_str.length; i++) {
        this.img = document.createElement("img");
        this.img.src = `assets/sprites/${score_str[i]}.png`;
        ctx.drawImage(this.img, 170, 95, 16, 24);
    }

    actionArea.context.font = "22px Ubuntu";
    actionArea.context.fillStyle = "red";
    actionArea.context.fillText(`Best`, 160, 140);

    let highscore_str = highscore.toString();
    for (let i = 0; i < highscore_str.length; i++) {
        this.img1 = document.createElement("img");
        this.img1.src = `assets/sprites/${highscore_str[i]}.png`;
        ctx.drawImage(this.img1, 170, 145, 16, 24);
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
    // actionArea.canvas.addEventListener(
    //     "click",
    //     function (evt) {
    //         var mousePos = getMousePos(actionArea.canvas, evt);

    //         if (isInside(mousePos, rect)) {
    //             background = new Background();
    //             bird = new Bird();
    //             obstacle_gen = setInterval(() => {
    //                 obstacles.push(new Obstacle(10));
    //             }, 2000);
    //         }
    //     },
    //     false
    // );

    // this.viewport.position = "relative";
    // const gameoverDiv = document.createElement("div");
    // gameoverDiv.id = "gameOverDiv";
    // this.viewport.append(gameoverDiv);
    // gameoverDiv.style.width = "900px";
    // gameoverDiv.style.height = "400px";
    // gameoverDiv.style.position = "absolute";
    // gameoverDiv.style.top = "5px";
    // gameoverDiv.style.left = "50%";
    // // gameoverDiv.style.right = "0";
    // gameoverDiv.style.transform = "translateX(-50%)";
    // gameoverDiv.style.backgroundColor = "black";
    // gameoverDiv.style.textAlign = "center";
    // gameoverDiv.style.color = "white";
    // gameoverDiv.style.fontSize = "100px";
    // gameoverDiv.style.fontFamily = "Ubuntu";
    // gameoverDiv.style.paddingTop = "10%";
    // gameoverDiv.innerHTML = "Game Over";

    // const reloadBtn = document.createElement("div");
    // reloadBtn.style.position = "absolute";
    // reloadBtn.style.height = "50px";
    // reloadBtn.style.width = "150px";
    // reloadBtn.style.padding = "10px";
    // reloadBtn.style.borderRadius = "20%";

    // reloadBtn.style.fontSize = "40px";
    // reloadBtn.style.backgroundColor = "red";
    // reloadBtn.style.bottom = "30px";
    // reloadBtn.style.marginLeft = "50%";
    // reloadBtn.style.transform = "translateX(-50%)";
    // // reLoad.style.marginBottom = "30px";
    // reloadBtn.innerText = "Reload";
    // gameoverDiv.append(reloadBtn);
    // reloadBtn.onclick = function () {
    //     window.location.reload();
    //     startGame();
    // };
}
