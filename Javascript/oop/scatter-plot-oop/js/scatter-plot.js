var points = [
  { x: 40, y: 40 },
  { x: 10, y: 20 },
  { x: 60, y: 20 },
  { x: 80, y: 60 },
];

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

        return this.element;
    }
}

class Dot{
    constructor(x,y,index, graph_box){
        this.x = x;
        this.y = y;
        this.toggle = true;

        this.element = document.createElement('div');
        this.element.id = "dot"+ (index+1);
        this.element.style.backgroundColor="red";
        this.element.style.height="20px";
        this.element.style.width="20px";
        this.element.style.borderRadius="50%";
        this.element.style.position="absolute";
        this.element.style.left= (this.x*5)+"px";
        this.element.style.bottom= (this.y*5)+"px";

        
        this.element.addEventListener("mouseover", (event) =>{
            console.log(event);
            this.element.style.transform="scale(1.5)";
        });
        this.element.addEventListener("mouseout", (event) => {
            console.log(event);
            this.element.style.transform="scale(1)";
            // dot.style.backgroundColor = "red";
        })
        this.element.addEventListener("click", (event) => {
            if (this.toggle){
                this.element.style.backgroundColor="blue";
                this.toggle = !this.toggle;
                
            }
            else{
                this.element.style.backgroundColor = "red";
                this.toggle = !this.toggle;
                // this.element.setAttribute("toggle","true");
            }
        })

        graph_box.appendChild(this.element);

        return this.element;
    }
}

const graph = new Box(600,600);
var dot=[]


points.forEach((point,index) => {
    dot[index]= new Dot(point.x, point.y,index, graph)
});



