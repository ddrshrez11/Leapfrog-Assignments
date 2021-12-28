let ants = [];
const FPS = 16;
const speedLimit = 2;

const actionArea = {
  viewport: document.getElementById("viewport"),
  canvas: document.createElement("canvas"),
  startAction: function () {
    this.canvas.width = "1300";
    this.canvas.height = "590";
    this.canvas.style.border = "2px solid black";
    this.context = this.canvas.getContext("2d");
    // this.canvas.style.backgroundColor = "red";
    this.canvas.addEventListener("mousedown", handleClick);
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
};
function updateActionArea() {
  actionArea.clear();
  //   speed = 1;
  ants.forEach((ant) => {
    // speed *= 0.9
    ant.x += ant.dx * ant.speed;
    ant.y += ant.dy * ant.speed;
    wallCollision(ant);
    antCollision(ant);
    ant.update();
  });

  if (ants.length == 0) {
    actionArea.winGame();
  }
}

function Ant(radius, color, x, y) {
  this.radius = radius;
  this.x = x;
  this.y = y;
  this.dx = Math.random() > 0.5 ? 1 : -1;
  this.dy = Math.random() > 0.5 ? 1 : -1;
  this.speed = Math.random() * 2;
  this.img = document.createElement("img");
  this.img.src = "images/ant.png";
  this.update = function () {
    ctx = actionArea.context;
    antSize = 40;
    ctx.drawImage(
      this.img,
      this.x - antSize / 2 - 20,
      this.y - antSize / 2,
      antSize,
      antSize
    );
    ctx.stroke();
    ctx.fill();
  };
}

function start() {
  let antNum = getRandomFromRange(10,60);
  actionArea.startAction();
  generateAnts(antNum);
}

function generateAnts(antNum) {
  while (ants.length < antNum) {
    let overlapping = false;
    let color = getRandomColor();
    let randomRadius = 40;
    let randomX = getRandomFromRange(
      randomRadius,
      actionArea.canvas.width - randomRadius
    );
    let randomY = getRandomFromRange(
      randomRadius,
      actionArea.canvas.height - randomRadius
    );
    // (randomX<randomRadius)? randomX = randomRadius: randomX;

    for (let i = 0; i < ants.length; i++) {
      let ant = ants[i];
      distance = getDistance(
        randomX + randomRadius,
        ant.x + ant.radius,
        randomY + randomRadius,
        ant.y + ant.radius
      );
      // distance = getDistance(randomX, ant.x, randomY, ant.y);
      if (
        distance <
        (randomRadius + ant.radius) * (randomRadius + ant.radius)
      ) {
        overlapping = true;
        break;
      }
    }
    if (!overlapping) ants.push(new Ant(randomRadius, color, randomX, randomY));
  }
  // ants.push(new Ant(20,'red',50,50));
  // ants.push(new Ant(20,'red',150,250));
  // ants.push(new Ant(20,'red',100,40));
}

function wallCollision(ant) {
  maxHeight = actionArea.canvas.height - ant.radius;
  maxWidth = actionArea.canvas.width - ant.radius;

  if (ant.x <= ant.radius) {
    ant.dx = Math.abs(ant.dx);
    ant.x = ant.radius;
  } else if (ant.x >= maxWidth) {
    ant.dx = -Math.abs(ant.dx);
    ant.x = actionArea.canvas.width - ant.radius;
  }
  if (ant.y <= ant.radius) {
    ant.dy = Math.abs(ant.dy);
    ant.y = ant.radius;
  } else if (ant.y >= maxHeight) {
    ant.dy = -Math.abs(ant.dy);
    ant.y = actionArea.canvas.height - ant.radius;
  }
}

function antCollision(ant) {
  // let otherAnts = ants;
  for (let i = 0; i < ants.length; i++) {
    let otherAnt = ants[i];
    let ratio = 0.05;
    if (ant == otherAnt) continue;
    distance = getDistance(
      otherAnt.x + otherAnt.radius,
      ant.x + ant.radius,
      otherAnt.y + otherAnt.radius,
      ant.y + ant.radius
    );
    // distance = getDistance(otherAnt.x, ant.x, otherAnt.y, ant.y);
    // console.log(ant.x,otherAnt.x);
    if (
      distance <
      (otherAnt.radius + ant.radius) * (otherAnt.radius + ant.radius)
    ) {
      if (ant.x < otherAnt.x) {
        ant.x -= ant.radius * ratio;
        ant.dx = -Math.abs(ant.dx);
      } else {
        ant.x += ant.radius * ratio;
        ant.dx = Math.abs(ant.dx);
      }
      if (ant.y < otherAnt.y) {
        ant.y -= ant.radius * ratio;
        ant.dy = -Math.abs(ant.dy);
      } else {
        ant.y += ant.radius * ratio;
        ant.dy = Math.abs(ant.dy);
      }

      // otherAnt.dx = -otherAnt.dx;
      // otherAnt.dy = -otherAnt.dy;

      // console.log('collision',distance,otherAnt.radius+ant.radius);
    }
  }
}

const killAnt = (ant) => {
  const updatedAnts = ants.filter((items, index) => ant !== index);
  ants = updatedAnts;
};

function handleClick(event) {
  let pointerX = event.x;
  let pointerY = event.y;

  pointerX -= actionArea.canvas.offsetLeft;
  pointerY -= actionArea.canvas.offsetTop;

  for (let i = 0; i < ants.length; i++) {
    if (
      getDistance(pointerX, ants[i].x, pointerY, ants[i].y) <=
      ants[i].radius ** 2
    ) {
      killAnt(i);
      console.log("clicked");
    }
  }

  // tempAnts = ants.filter((ant) => {

  // })
}

// function

start();
