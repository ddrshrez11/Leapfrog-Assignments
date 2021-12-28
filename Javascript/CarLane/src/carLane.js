

const actionArea = {
  viewport: document.getElementById("viewport"),
  canvas: document.createElement("canvas"),

  
  
  startAction: function () {
    this.canvas.width = "900";
    this.canvas.height = "500";
    this.canvas.style.border = "2px solid black";
    this.context = this.canvas.getContext("2d");
    
    // this.initScores();

    document.body.addEventListener("keydown", this.handleKeyPress);
    this.viewport.appendChild(this.canvas);
    this.viewport.style.width = '100%';
    this.viewport.style.textAlign = 'center';
    this.interval = setInterval(updateActionArea, FPS);
  },
  // initScores: function(){
  //   this.score.innerHTML='0';
  //   this.scoreDiv.innerHTML = 'SCORE: ';
  //   this.scoreDiv.appendChild(this.score);
  //   this.viewport.appendChild(this.scoreDiv);
  //   this.scoreDiv.style.left="20%";
  //   this.scoreDiv.style.display="inline-block";
  //   this.highscoreDiv.style.display="inline-block";

  //   this.highscore.innerHTML='0';
  //   this.highscoreDiv.innerHTML = 'HIGHSCORE: ';
  //   this.highscoreDiv.appendChild(this.highscore);
  //   this.highscoreDiv.style.left="20%";
  //   this.viewport.appendChild(this.highscoreDiv);

  // },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  // winGame: function () {
  //   this.context.textAlign = "center";
  //   this.context.fillStyle = "Blue";
  //   this.context.font = "100px Ubuntu";
  //   this.context.fillText(
  //     "YOU WIN",
  //     this.canvas.width / 2,
  //     this.canvas.height / 2
  //   );
  // },
  handleKeyPress: function (e) {
    console.log(e);
    if (e.keyCode == '37'){
      console.log('left');
      car.moveLeft();
    }
    if (e.keyCode == '39'){
      console.log("right")
      car.moveRight();
    }

  },
  gameOver: function () {
    clearInterval(this.interval);
    if (score>highscore){
      localStorage.setItem("highscore",score);
    }
    this.viewport.position = "relative";
    const gameoverDiv = document.createElement("div");
    gameoverDiv.id ="gameOverDiv";
    this.viewport.append(gameoverDiv);
    gameoverDiv.style.width = "900px";
    gameoverDiv.style.height = "400px";
    gameoverDiv.style.position = "absolute";
    gameoverDiv.style.top = "5px";
    gameoverDiv.style.left = "50%";
    // gameoverDiv.style.right = "0";
    gameoverDiv.style.transform = "translateX(-50%)";
    gameoverDiv.style.backgroundColor = "black";
    gameoverDiv.style.textAlign = "center";
    gameoverDiv.style.color = "white";
    gameoverDiv.style.fontSize = "100px";
    gameoverDiv.style.fontFamily = "Ubuntu";
    gameoverDiv.style.paddingTop = "10%";
    gameoverDiv.innerHTML = "Game Over";



    
    const reloadBtn = document.createElement("div");
    reloadBtn.style.position = "absolute";
    reloadBtn.style.height = "50px";
    reloadBtn.style.width = "150px";
    reloadBtn.style.padding = "10px";
    reloadBtn.style.borderRadius = "20%";

    reloadBtn.style.fontSize = "40px";
    reloadBtn.style.backgroundColor = "red";
    reloadBtn.style.bottom = "30px";
    reloadBtn.style.marginLeft = "50%";
    reloadBtn.style.transform = "translateX(-50%)"
    // reLoad.style.marginBottom = "30px";
    reloadBtn.innerText = "Reload";
    gameoverDiv.append(reloadBtn);
    reloadBtn.onclick = function () {
      window.location.reload();
      startGame();
    };
  }
};

function Background(speed){
  this.y = 0;
  this.height = actionArea.canvas.height;
  this.max = this.y + this.height;
  this.step = -(speed++);
  this.img = document.createElement("img");
  this.img.src = "images/road-background.jpg";
  this.print = function() {
    ctx = actionArea.context;
    ctx.globalCompositeOperation='destination-over';
    ctx.drawImage(this.img, 0, this.y, actionArea.canvas.width, actionArea.canvas.height);
    ctx.drawImage(this.img, 0, this.y - this.height,actionArea.canvas.width,actionArea.canvas.height);
    this.y -= this.step;
    if(this.y > this.max){
      this.y =0;
    };

  };


};

function Obstacle(w, h, y){
  this.w = w;
  this.h = h;
  this.y = y;
  this.initialY = y;
  this.dy = 1;
  this.index = getRandomIndex();
  this.x = laneMap[this.index];

  this.update = function () {
    ctx = actionArea.context;
    this.img = document.createElement("img");
    this.img.src = "images/obstacle.png";
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    this.moveObstacle();
    if (this.y >= actionArea.canvas.height){
      this.reset();
    }
  }
  this.moveObstacle = function () {
    this.y += this.dy * speed;
  }
  this.reset = function() {
    score++;
    this.y = this.initialY;
    this.index = getRandomIndex();
    this.x = laneMap[this.index];
  }

}

function Car(w, h) {
  this.w = w;
  this.h = h;
  this.y = 400;
  this.index = 1;
  this.bulletCount = 0;
  this.x = laneMap[this.index];
  // this.color = color;
  this.speed = speed;
  this.update = function () {
    ctx = actionArea.context;
    this.img = document.createElement("img");
    this.img.src = "images/car.png";
    
      ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };
  this.moveLeft = function() {
    if (this.index > 0){
      this.index--;
      this.x = laneMap[this.index];
    }
  }
  this.moveRight = function() {
    if (this.index < laneMap.length){
      this.index++;
      this.x = laneMap[this.index];
    }
  }
  this.fireBullet = function(){
    
  }
}

function Bullet(w,h){
  this.w = w;
  this.h = h;
}