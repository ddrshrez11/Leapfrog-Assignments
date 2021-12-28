let car;
let laneBackground;
let obstacles = [];
const FPS = 16;
let speed = 2;
const laneMap = [200,440,650];
//     0: 200, //laneLeft
//     1:440, //laneMiddle
//     2:650, //laneRight
let score = 0;
let index = 1;
const carHeight = 70;
const carWidth = 40;



function start(){
    actionArea.startAction();
    car = new Car(carWidth,carHeight);
    laneBackground = new Background(speed);
    obstacle1 = new Obstacle(carWidth,carHeight,-100);
    obstacle2 = new Obstacle(carWidth,carHeight,-250);
    obstacles.push(obstacle1);
    obstacles.push(obstacle2);

}

function collisionDetect(obstacle) {
    if (
      obstacle.x + 60 > car.x &&
      obstacle.y < car.y + 70 &&
      obstacle.x < car.x + 40 &&
      95 + obstacle.y > car.y
    ) {
    //   gameOver();
    console.log('Game Over')
    }
  }


function updateActionArea() {
    actionArea.clear();
    displayScore();
    car.update();
    obstacles.forEach(obstacle => {
        collisionDetect(obstacle)
        obstacle.update()
    });
    laneBackground.print();
  }

function displayScore(){
    actionArea.context.font = "50px Ubuntu";
    actionArea.context.fillStyle = "white";
    actionArea.context.fillText(`Score: ${score}`,150, 50 );
}