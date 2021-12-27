function getDistance(x1,x2,y1,y2){
    return Math.floor(((x1-x2)**2 )+((y1-y2)**2 ));
}

const getRandomColor = () => {
    let r = getRandomFromRange(0, 255);
    let g = getRandomFromRange(0, 255);
    let b = getRandomFromRange(0, 255);
    return `rgb(${r}, ${g}, ${b})`;
}