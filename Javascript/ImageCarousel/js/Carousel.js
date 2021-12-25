// class Carousel{
//     constructor(){

//     }
// }
const carousel = document.getElementById('image_carousel');
const imagesWrapper = document.getElementById('image_wrapper');
const images = imagesWrapper.children;

//create Navigation container
const navigation = document.createElement("div");
navigation.id = "navigation"
carousel.append(navigation);

//create dot container
const dotContainer = document.createElement("div");
navigation.id = "carousel-dots-container"
navigation.append(dotContainer);

// const dotContainer = document.getElementById('carousel-dots-container')

const imageWidth = images[0].width;
const imageCount = images.length;
// carousel.style.height = `${images[0].height}px`;  // comment this
imagesWrapper.style.height = `${images[0].height}px`;

//Carousel Dots
for (let i = 0; i<imageCount; i++){
    let dot = document.createElement('div');
    dot.setAttribute('class','carousel-dot');
    dotContainer.append(dot);
}

// Aligning images in a horizontal line
let carouselPosition = 0;
for (let i = 0; i < images.length; i++){
    images[i].style.left = `${imageWidth * i}px`;
}

//create control buttons

const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentIndex = 0;
const dx = 10;

const handleNext = () => {
    (currentIndex === imageCount-1) ? currentIndex = 0 : currentIndex++;
    // imagesWrapper.style.left = `-${imageWidth * currentIndex}px`;
    if (currentIndex){
        const transition = setInterval(() => {
            carouselPosition = carouselPosition + dx;
            // console.log((carouselPosition % imageWidth))
            if (carouselPosition > imageWidth * currentIndex){
                carouselPosition = imageWidth * currentIndex;
                clearInterval(transition);
            }
            imagesWrapper.style.left = `-${carouselPosition}px`;
            // if ((carouselPosition % imageWidth) == 0) clearInterval(transition);
        }, 10);
    } 
    else{
        // imagesWrapper.style.left = "0px";
        const transition = setInterval(() => {
            carouselPosition = carouselPosition - dx;
            if (carouselPosition < 0) carouselPosition = 0;
            imagesWrapper.style.left = `-${carouselPosition}px`;
            if (carouselPosition == 0) clearInterval(transition);
        }, 0);
    }
}
const handlePrev = () => {
    // imagesWrapper.style.left = `-${imageWidth * currentIndex}px`;
    if (currentIndex){
        const transition = setInterval(() => {
            carouselPosition = carouselPosition - dx;
            // console.log((carouselPosition % imageWidth))
            if (carouselPosition < imageWidth * currentIndex){
                carouselPosition = imageWidth * currentIndex;
                clearInterval(transition);
            }
            imagesWrapper.style.left = `-${carouselPosition}px`;
            // if ((carouselPosition % imageWidth) == 0) clearInterval(transition);
        }, 10);
    } 
    else{
        imagesWrapper.style.left = "0px";
        const transition = setInterval(() => {
                carouselPosition = carouselPosition + dx;
                if (carouselPosition > imageWidth * currentIndex) {
                    carouselPosition = imageWidth * currentIndex;
                    clearInterval(transition);
                }
                imagesWrapper.style.left = `-${carouselPosition}px`;
                // if (carouselPosition == 0) clearInterval(transition);
            }, 0);
    }
    (currentIndex === 0) ? currentIndex = imageCount-1 : currentIndex--;
}
// const handlePrev = () => {
//     (currentIndex == 0) ? currentIndex = 4 : currentIndex--;
//     imagesWrapper.style.left = `-${imageWidth * currentIndex}px`;
// }

nextBtn.addEventListener('click', handleNext);
prevBtn.addEventListener('click', handlePrev);
