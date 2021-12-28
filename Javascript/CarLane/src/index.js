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



function updateActionArea() {
    actionArea.clear();
    car.update();
    obstacles.forEach(obstacle => {
        obstacle1.update()
        obstacle2.update()
    });
    laneBackground.print();
    //   speed = 1;
    // ants.forEach((ant) => {
    //   // speed *= 0.9
    //   ant.x += ant.dx * ant.speed;
    //   ant.y += ant.dy * ant.speed;
    //   wallCollision(ant);
    //   antCollision(ant);
    //   ant.update();
    // });
  
  
    // if (ants.length == 0) {
    //   actionArea.winGame();
    // }
  }