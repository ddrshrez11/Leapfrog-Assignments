function getRandomFromRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomIndex() {
    return getRandomFromRange(0, 3);
}

function getDistance(x1, x2, y1, y2) {
    return Math.floor((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

const getRandomColor = () => {
    let color = ["red", "yellow", "blue"];
    return color[getRandomFromRange(0, 3)];
};
