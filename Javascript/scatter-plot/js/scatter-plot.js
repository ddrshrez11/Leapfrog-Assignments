var points = [
  { x: 40, y: 40 },
  { x: 10, y: 20 },
  { x: 60, y: 20 },
  { x: 80, y: 60 },
];

const graph = document.getElementById("graph");

// graph.innerHTML = "<p>asdjnasjd</p>";
graph.style.height = "600px";
graph.style.width = "600px";
graph.style.backgroundColor = "pink";
graph.style.color = "white";
graph.style.position="relative";
graph.style.border = "2px solid #000";

const handleHover = (event) =>{
    console.log(event);
    dot.style.backgroundColor="yellow";
}

const handleMouseOut = (event) => {
    console.log(event);
    dot.style.backgroundColor="red";
}


points.forEach((point,index) => {
    let dot = document.createElement('div');
    dot.id = "dot"+ (index+1);
    dot.style.backgroundColor="red";
    dot.style.height="20px";
    dot.style.width="20px";
    dot.style.borderRadius="50%";
    dot.style.position="absolute";
    dot.style.left= (point.x*5)+"px";
    dot.style.bottom= (point.y*5)+"px";
    dot.setAttribute("toggle",true);
    
    dot.addEventListener("mouseover", (event) =>{
        console.log(event);
        dot.style.transform="scale(1.5)";
    });
    dot.addEventListener("mouseout", (event) => {
        console.log(event);
        dot.style.transform="scale(1)";
        // dot.style.backgroundColor = "red";
    })
    dot.addEventListener("click", (event) => {
        let toggle = dot.getAttribute("toggle");
        if (toggle==="true"){
            dot.style.backgroundColor="yellow";
            dot.setAttribute("toggle","false");
        }
        else{
            dot.style.backgroundColor = "red";
            dot.setAttribute("toggle","true");

        }    // dot.style.backgroundColor="yellow";
    })

    // dot.addEventListener("mouseout", handleMouseOut);
    // dot.

    graph.appendChild(dot);
});



