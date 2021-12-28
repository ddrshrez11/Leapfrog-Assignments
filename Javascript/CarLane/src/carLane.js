

const actionArea = {
  viewport: document.getElementById("viewport"),
  canvas: document.createElement("canvas"),
  
  startAction: function () {
    this.canvas.width = "900";
    this.canvas.height = "500";
    this.canvas.style.border = "2px solid black";
    this.context = this.canvas.getContext("2d");
    document.body.addEventListener("keydown", this.handleKeyPress);
    this.viewport.appendChild(this.canvas);
    this.interval = setInterval(updateActionArea, FPS);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  winGame: function () {
    this.context.textAlign = "center";
    this.context.fillStyle = "Blue";
    this.context.font = "100px Ubuntu";
    this.context.fillText(
      "YOU WIN",
      this.canvas.width / 2,
      this.canvas.height / 2
    );
  },
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
    ctx.drawImage(this.img, 0, this.y - this.height,900,500);
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
  this.speed = speed;
  this.dy = 1;
  this.index = getRandomIndex();
  this.x = laneMap[this.index];
  this.update = function () {
    ctx = actionArea.context;
    ctx.globalCompositeOperation='destination-over';
    this.img = document.createElement("img");
    this.img.src = "images/obstacle.png";
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    this.moveObstacle();
    if (this.y >= actionArea.canvas.height){
      this.reset();
    }
  }
  this.moveObstacle = function () {
    this.y += this.dy * this.speed;
  }
  this.reset = function() {
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
  this.x = laneMap[this.index];
  // this.color = color;
  this.speed = speed;
  this.update = function () {
    ctx = actionArea.context;
    this.img = document.createElement("img");
    this.img.src = "images/Car.png";
    this.update = () => {
      ctx = actionArea.context;
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
  }
}
