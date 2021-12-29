let car;
let laneBackground;
let obstacles = [];
let ammo;
const FPS = 16;
let speed = 2;
let bullet;
let bulletCount=1;
const laneMap = [200,440,650];
//     0: 200, //laneLeft
//     1:440, //laneMiddle
//     2:650, //laneRight
let score = 0;
let highscore = 0;
let index = 1;
const carHeight = 70;
const carWidth = 40;

function start(){
    actionArea.viewport.position = "relative";
    const startMenu = document.createElement("div");
    startMenu.id ="startMenu";
    actionArea.viewport.append(startMenu);
    startMenu.style.width = "900px";
    startMenu.style.height = "400px";
    startMenu.style.position = "absolute";
    startMenu.style.top = "5px";
    startMenu.style.left = "50%";
    // startMenu.style.right = "0";
    startMenu.style.transform = "translateX(-50%)";
    startMenu.style.backgroundColor = "blue";
    startMenu.style.textAlign = "center";
    startMenu.style.color = "white";
    startMenu.style.fontSize = "100px";
    startMenu.style.fontFamily = "Ubuntu";
    startMenu.style.paddingTop = "10%";
    startMenu.innerHTML = "Car Lane Game";
    // actionArea.startAction();

    const startBtn = document.createElement("div");
    startBtn.style.position = "absolute";
    startBtn.style.height = "50px";
    startBtn.style.width = "150px";
    startBtn.style.padding = "10px";
    startBtn.style.borderRadius = "20%";

    startBtn.style.fontSize = "40px";
    startBtn.style.backgroundColor = "red";
    startBtn.style.bottom = "30px";
    startBtn.style.marginLeft = "50%";
    startBtn.style.transform = "translateX(-50%)"
    // reLoad.style.marginBottom = "30px";
    startBtn.innerText = "Play";
    startMenu.append(startBtn);
    startBtn.onclick = function () {
      startGame(startMenu);
    };
}


function startGame(startMenu){
    startMenu.style.display = 'none';
    actionArea.startAction();
    car = new Car(carWidth,carHeight);
    
    laneBackground = new Background(speed);
    obstacle1 = new Obstacle(carWidth,carHeight,-100);
    obstacle2 = new Obstacle(carWidth,carHeight,-250);
    obstacles.push(obstacle1);
    obstacles.push(obstacle2);
    setInterval(() => {
        if(ammo === undefined) ammo = new Ammo(carWidth,carWidth,-100);
    }, getRandomFromRange(1000,6000));
    if (localStorage.getItem("highscore") !== null){
        highscore = (localStorage.getItem("highscore"));
    }
    let speedUpdate =setInterval(() => {
        speed++;
    }, 5000);

}

function collisionDetect(obstacle) {
    if (
      obstacle.x + carWidth > car.x &&
      obstacle.y < car.y + carHeight &&
      obstacle.x < car.x + carWidth &&
      obstacle.y + carHeight  > car.y
    ) {
      actionArea.gameOver();
    console.log('Game Over');
    }
    
   
  }

function collisionDetectAmmo(ammo) {
if (ammo != undefined &&
    ammo.x < car.x + car.w &&
    ammo.x + ammo.w > car.x &&
    ammo.y < car.y + car.h &&
    ammo.h + ammo.y > car.y
) {
    ammo.collected();
    console.log('ammo added');
}


}

function collisionDetectBullet(obstacle){
    if ( bullet != undefined &&
        obstacle.x < bullet.x + bullet.w &&
        obstacle.x + obstacle.w > bullet.x &&
        obstacle.y < bullet.y + bullet.h &&
        obstacle.h + obstacle.y > bullet.y
      ) {
      //   actionArea.gameOver();
      obstacle.carExplosionSound.play()
      obstacle.reset();
      bullet.reset();

      score+=5;
      console.log('Bullet hit')
      }
      
}


function updateActionArea() {
    actionArea.clear();
    displayScore();
    car.update();
    obstacles.forEach(obstacle => {
        collisionDetect(obstacle)
        collisionDetectBullet(obstacle)
        collisionDetectAmmo(ammo)
        obstacle.update()
    });
    if (ammo != undefined) ammo.update();
    
    laneBackground.print();
    
  }

function displayScore(){
    actionArea.context.font = "30px Ubuntu";
    actionArea.context.fillStyle = "white";
    actionArea.context.fillText(`Score: ${score}`,150, 50 );
    // actionArea.context.font = "30px Ubuntu";
    // actionArea.context.fillStyle = "white";
    actionArea.context.fillText(`Highscore: ${highscore}`,350, 50 );
    // actionArea.context.font = "30px Ubuntu";
    // actionArea.context.fillStyle = "white";
    actionArea.context.fillText(`Bullets: ${bulletCount}`,550, 50 );

}

function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }