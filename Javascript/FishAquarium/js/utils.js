export function getRandomFromRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

export function getRandomIndex(start, stop) {
    return getRandomFromRange(start, stop);
}

export function getGender() {
    return Math.random() > 0.5 ? "Male" : "Female";
}

export function getRandomDirection() {
    return Math.random() > 0.5 ? 1 : -1;
}

export function getDistance(x1, y1, x2 = 0, y2 = 0) {
    return Math.floor(Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2));
}

export const getRandomColor = () => {
    let r = getRandomFromRange(0, 255);
    let g = getRandomFromRange(0, 255);
    let b = getRandomFromRange(0, 255);
    return `rgb(${r}, ${g}, ${b})`;
};

export function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    };
    this.stop = function () {
        this.sound.pause();
    };
}

//Function to get the mouse position
export function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
    };
}
//Function to check whether a point is inside a rectangle
export function isInside(pos, rect) {
    return (
        pos.x > rect.x &&
        pos.x < rect.x + rect.width &&
        pos.y < rect.y + rect.height &&
        pos.y > rect.y
    );
}
