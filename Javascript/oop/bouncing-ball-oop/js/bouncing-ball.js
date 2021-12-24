// const graph = document.getElementById("graph");

const app = document.getElementById("app")

class Box {
    constructor(x,y){
        this.x = x;
        this.y = y;

        this.element = document.createElement("div");
        this.element.id ="graph";
        this.element.style.height = x+"px";
        this.element.style.width = y+"px";
        this.element.style.backgroundColor = "pink";
        this.element.style.border = "2px solid #000";
        // this.element.style.color = "white";
        this.element.style.position="relative";
        
        app.appendChild(this.element)

        return this;
    }
}
class Ball{
  constructor(x,y,v,graph_box){
    this.x = x;
    this.y = y;
    this.velocity = v;
    this.direction = 1; //1 = down, -1 = up
    this.position = 0;

    this.element = document.createElement("div");
    this.element.style.height = x+"px";
    this.element.style.width = y+"px";
    this.element.style.background = "blue";
    this.element.style.borderRadius = "50%";
    this.element.style.position = "absolute";
    this.element.style.left = "250px";
    this.element.style.top = "0";

    graph_box.element.appendChild(this.element);
    
    // while(true){
    setInterval(() => {
      this.position += this.direction * this.velocity;
      this.element.style.top = this.position + "px";
      if (this.position >= (graph_box.x-this.y)) {
        this.direction = -1;
      }
      if (this.position == 0) {
        this.direction = 1;
      }
    }, 50);
  }
}
const graph = new Box(600,600);
const ball = new Ball(100,100,10,graph);
const ball1 = new Ball(100,100,20,graph);
const ball2 = new Ball(10,10,30,graph);

