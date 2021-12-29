const actionArea = {
    viewport: document.getElementById("viewport"),
    canvas: document.createElement("canvas"),

    startAction: function () {
        this.canvas.width = "350";
        this.canvas.height = "600";
        this.canvas.style.border = "2px solid black";
        this.context = this.canvas.getContext("2d");

        // this.initScores();
        document.body.addEventListener("keydown", this.handleKeyPress);
        document.body.addEventListener("click", this.handleClick);
        this.viewport.appendChild(this.canvas);
        this.viewport.style.width = "100%";
        this.viewport.style.textAlign = "center";
        this.interval = setInterval(updateActionArea, FPS);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    handleKeyPress: function (e) {
        console.log(e);
        if (e.keyCode == "32") {
            let index = 4;
            let jumpAnimation = setInterval(() => {
                index--;
                if (index == 0) {
                    bird.gravity = 0;
                    console.log(bird.gravity);
                } else if (index < 0) {
                    bird.gravity = GRAVITY;
                    console.log(bird.gravity);
                    clearInterval(jumpAnimation);
                } else {
                    bird.gravity = Math.abs(GRAVITY) + index;
                    console.log(bird.gravity);
                }
            }, 100);
        }
    },
    handleClick: function (e) {
        console.log(e);
        let index = 4;
        let jumpAnimation = setInterval(() => {
            index--;
            if (index == 0) {
                bird.gravity = 0;
                console.log(bird.gravity);
            } else if (index < 0) {
                bird.gravity = GRAVITY;
                console.log(bird.gravity);
                clearInterval(jumpAnimation);
            } else {
                bird.gravity = Math.abs(GRAVITY) + index;
                console.log(bird.gravity);
            }
        }, 100);
    },
    // gameOver: function () {
    //     clearInterval(this.interval);
    //     if (score > highscore) {
    //         localStorage.setItem("highscore", score);
    //     }
    //     this.viewport.position = "relative";
    //     const gameoverDiv = document.createElement("div");
    //     gameoverDiv.id = "gameOverDiv";
    //     this.viewport.append(gameoverDiv);
    //     gameoverDiv.style.width = "900px";
    //     gameoverDiv.style.height = "400px";
    //     gameoverDiv.style.position = "absolute";
    //     gameoverDiv.style.top = "5px";
    //     gameoverDiv.style.left = "50%";
    //     // gameoverDiv.style.right = "0";
    //     gameoverDiv.style.transform = "translateX(-50%)";
    //     gameoverDiv.style.backgroundColor = "black";
    //     gameoverDiv.style.textAlign = "center";
    //     gameoverDiv.style.color = "white";
    //     gameoverDiv.style.fontSize = "100px";
    //     gameoverDiv.style.fontFamily = "Ubuntu";
    //     gameoverDiv.style.paddingTop = "10%";
    //     gameoverDiv.innerHTML = "Game Over";

    //     const reloadBtn = document.createElement("div");
    //     reloadBtn.style.position = "absolute";
    //     reloadBtn.style.height = "50px";
    //     reloadBtn.style.width = "150px";
    //     reloadBtn.style.padding = "10px";
    //     reloadBtn.style.borderRadius = "20%";

    //     reloadBtn.style.fontSize = "40px";
    //     reloadBtn.style.backgroundColor = "red";
    //     reloadBtn.style.bottom = "30px";
    //     reloadBtn.style.marginLeft = "50%";
    //     reloadBtn.style.transform = "translateX(-50%)";
    //     // reLoad.style.marginBottom = "30px";
    //     reloadBtn.innerText = "Reload";
    //     gameoverDiv.append(reloadBtn);
    //     reloadBtn.onclick = function () {
    //         window.location.reload();
    //         startGame();
    //     };
    // },
};

function Background() {
    this.x = 0;
    this.height = actionArea.canvas.height;
    this.width = actionArea.canvas.width;
    this.min = -this.width;
    this.step = -speed++;
    this.img = document.createElement("img");
    this.img.src = "assets/sprites/background-day.png";
    this.img1 = document.createElement("img");
    this.img1.src = "assets/sprites/base.png";
    this.baseY = 530;
    this.baseHeight = this.height - this.baseY;
    this.update = function () {
        ctx = actionArea.context;
        ctx.drawImage(
            this.img,
            this.x,
            0,
            actionArea.canvas.width,
            actionArea.canvas.height
        );
        ctx.drawImage(
            this.img,
            this.x + this.width,
            0,
            actionArea.canvas.width,
            actionArea.canvas.height
        );
        ctx.drawImage(
            this.img1,
            this.x,
            this.baseY,
            actionArea.canvas.width,
            this.baseHeight
        );
        ctx.drawImage(
            this.img1,
            this.x + this.width,
            this.baseY,
            actionArea.canvas.width,
            this.baseHeight
        );
        this.x += this.step;
        if (this.x < this.min) {
            this.x = 0;
        }
    };
}

function Bird() {
    this.w = 34;
    this.h = 24;
    this.x = 125;
    this.y = 200;
    this.index = 1;
    this.color = getRandomColor();
    this.gravity = GRAVITY;
    // this.carIgnitionSound = new Sound("sounds/car-ignition.wav");
    // this.carIgnitionSound.play();
    this.srcSuffix = [
        "bird-downflap.png",
        "bird-midflap.png",
        "bird-upflap.png",
    ];
    this.speed = speed;
    this.index = 0;
    this.flapAnimation = setInterval(() => {
        this.index = (this.index + 1) % 3;
    }, 100);
    this.update = function () {
        ctx = actionArea.context;
        this.img = document.createElement("img");
        this.img.src = `assets/sprites/${
            this.color + this.srcSuffix[this.index]
        }`;
        // console.log([this.index]);
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
        this.moveBird();
    };
    this.moveBird = function () {
        this.y -= this.gravity; //* speed;
    };
    // this.moveLeft = function () {
    //     if (this.index > 0) {
    //         this.index--;
    //         this.x = laneMap[this.index];
    //     }
    // };
    // this.moveRight = function () {
    //     if (this.index < laneMap.length - 1) {
    //         this.index++;
    //         this.x = laneMap[this.index];
    //     }
    // };
}

function Obstacle(h, gap, y) {
    this.w = 52;
    this.h = this.h;
    this.maxHeight = 320;
    this.y = y;
    this.initialY = y;
    this.dy = 1;
    this.index = getRandomIndex();
    // this.x = laneMap[this.index];
    // this.carExplosionSound = new Sound('sounds/car-explosion.wav');
    this.update = function () {
        ctx = actionArea.context;
        this.img = document.createElement("img");
        this.img.src = "images/obstacle.png";
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
        this.moveObstacle();
        if (this.y >= actionArea.canvas.height) {
            this.reset();
        }
    };
    this.moveObstacle = function () {
        this.y += this.dy * speed;
    };
    this.reset = function () {
        score++;
        this.y = this.initialY;
        this.index = getRandomIndex();
        this.x = laneMap[this.index];
    };
}

function baseCollision(obj) {
    maxHeight = actionArea.canvas.height - obj.h - background.baseHeight;
    console.log(maxHeight);
    if (obj.y <= 5) {
        obj.gravity = GRAVITY;
        obj.y = 5;
    } else if (obj.y >= maxHeight) {
        obj.gravity = 0;
        obj.y = maxHeight;
        console.log("GAME OVER");
        clearInterval(actionArea.interval);
    }
}
