const graph = document.getElementById("graph");

graph.style.height = "600px";
graph.style.width = "600px";
graph.style.backgroundColor = "pink";
graph.style.border = "2px solid #000";
graph.style.color = "white";
graph.style.position = "relative";

const ball = document.createElement("div");
ball.style.height = "100px";
ball.style.width = "100px";
ball.style.background = "blue";
ball.style.borderRadius = "50%";
ball.style.position = "absolute";
ball.style.left = "250px";
// ball.style.right = "250px";
// ball.style.margin = "0 auto";
ball.style.top = "0";

let direction = 1; //1 = down, -1 = up
let position = 0;
graph.appendChild(ball);

// while(true){
setInterval(() => {
  position += direction * 20;
  ball.style.top = position + "px";
  if (position >= 500) {
    direction = -1;
  }
  if (position == 0) {
    direction = 1;
  }
}, 50);
// }
