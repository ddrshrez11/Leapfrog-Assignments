var balls=[];


const actionArea = {
    viewport : document.getElementById('viewport'),
    canvas : document.createElement('canvas'),
    startAction: function(){
        this.canvas.width = "1510";
        this.canvas.height = "700";
        this.canvas.style.border = "2px solid black";
        this.context = this.canvas.getContext("2d");
        // this.canvas.style.backgroundColor = "red";
        this.viewport.appendChild(this.canvas);
        this.interval = setInterval(updateActionArea, 16);
    },
    clear : function(){
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    }
    
}
function updateActionArea(){
    actionArea.clear();
    speed = 2;
    balls.forEach(ball => {
        // speed *= 0.9    
        ball.x += ball.dx * speed;
        ball.y += ball.dy * speed;
        wallCollision(ball);   
        ballCollision(ball);
        ball.update();
    });

}

function Ball(radius, color,x,y){
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.dx = (Math.random()>0.5)? 1 : -1;
    this.dy = (Math.random()>0.5)? 1 : -1;
    this.update = function(){
        ctx = actionArea.context;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
        ctx.stroke();
        ctx.fill();
    }
}

function start(){
    ballNum = 200;
    actionArea.startAction();
    generateBalls(ballNum);
    
}

function getRandomFromRange(min,max){
    return Math.floor(Math.random() * (max - min)+min) ; 
}

function generateBalls(ballNum){
    while (balls.length < ballNum){
        let overlapping = false;
        let color = getRandomColor();
        let randomRadius = getRandomFromRange(7, 15);
        let randomX = getRandomFromRange(randomRadius, actionArea.canvas.width - randomRadius);
        let randomY = getRandomFromRange(randomRadius, actionArea.canvas.height - randomRadius);
        // (randomX<randomRadius)? randomX = randomRadius: randomX;

        for (let i = 0; i < balls.length; i++) {
            let ball = balls[i];
            distance = getDistance(randomX+randomRadius, ball.x + ball.radius, randomY + randomRadius, ball.y + ball.radius);
            // distance = getDistance(randomX, ball.x, randomY, ball.y);
            if (distance < (randomRadius+ball.radius)*(randomRadius+ball.radius)){
                overlapping = true;
                break;
            }
        };
        if (!overlapping)    balls.push(new Ball(randomRadius, color, randomX, randomY));        
    }
    // balls.push(new Ball(20,'red',50,50));
    // balls.push(new Ball(20,'red',150,250));
    // balls.push(new Ball(20,'red',100,40));
}

function wallCollision(ball){
    maxHeight = actionArea.canvas.height - ball.radius;
    maxWidth = actionArea.canvas.width - ball.radius;

    if (ball.x <= ball.radius ){
        ball.dx = Math.abs(ball.dx);
        ball.x = ball.radius;
    }
    else if (ball.x >= maxWidth){
        ball.dx = -Math.abs(ball.dx);
        ball.x = actionArea.canvas.width - ball.radius;
    }
    if (ball.y <= ball.radius ){
        ball.dy = Math.abs(ball.dy);
        ball.y = ball.radius;
    }
    else if (ball.y >= maxHeight){
        ball.dy = -Math.abs(ball.dy);
        ball.y = actionArea.canvas.height - ball.radius;
    }


}

function ballCollision(ball){
    // let otherBalls = balls;
    for (let i = 0; i < balls.length; i++) {
        let otherBall = balls[i];
        ratio = 0.05;
        if (ball == otherBall) continue;
        distance = getDistance(otherBall.x + otherBall.radius, ball.x + ball.radius, otherBall.y + otherBall.radius, ball.y + ball.radius);
        // distance = getDistance(otherBall.x, ball.x, otherBall.y, ball.y);
        // console.log(ball.x,otherBall.x);
        if (distance < (otherBall.radius+ball.radius)*(otherBall.radius+ball.radius)){

            if (ball.x < otherBall.x) {
                ball.x -= ball.radius*ratio
                ball.dx = -Math.abs(ball.dx);
            }
            else{
                ball.x += ball.radius*ratio
                ball.dx = Math.abs(ball.dx);
            }
            if (ball.y < otherBall.y) {
                ball.y -= ball.radius*ratio
                ball.dy = -Math.abs(ball.dy);
            }
            else{
                ball.y += ball.radius*ratio
                ball.dy = Math.abs(ball.dy);
            }
                        
            // otherBall.dx = -otherBall.dx;
            // otherBall.dy = -otherBall.dy;

            // console.log('collision',distance,otherBall.radius+ball.radius);
        }
    };
}


start();


