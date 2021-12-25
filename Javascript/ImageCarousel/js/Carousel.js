// class Carousel{
//     constructor(){

//     }
// }
const carousel = document.getElementById('image_carousel');
const imagesWrapper = document.getElementById('image_wrapper');
const images = imagesWrapper.children;
const imageCount = images.length;

let imageWidth = 700;
let currentIndex = 0;
let carouselPosition = 0;
const speed = 10;



//Carousel CSS 
if (window.screen.availWidth < imageWidth){
    carousel.style.width = `100%`;
    imageWidth = window.screen.availWidth;
}
else{
    carousel.style.width = `${imageWidth}px`;
}
carousel.style.overflow = `hidden`;
carousel.style.position = `relative`;
carousel.style.margin = `0 auto`;
// carousel.style.height = `${images[0].height}px`;  // comment this
imagesWrapper.style.position = `relative`;
imagesWrapper.style.height = `${images[0].height}px`;

const handleNext = () => {
    dotContainer.children[currentIndex].classList.toggle('active');
    (currentIndex === imageCount-1) ? currentIndex = 0 : currentIndex++;
    dotContainer.children[currentIndex].classList.toggle('active');
    // imagesWrapper.style.left = `-${imageWidth * currentIndex}px`;
    if (currentIndex){
        const transition = setInterval(() => {
            carouselPosition = carouselPosition + speed;
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
            carouselPosition = carouselPosition - speed;
            if (carouselPosition < 0) carouselPosition = 0;
            imagesWrapper.style.left = `-${carouselPosition}px`;
            if (carouselPosition == 0) clearInterval(transition);
        }, 0);
    }
}
const handlePrev = () => {
    // imagesWrapper.style.left = `-${imageWidth * currentIndex}px`;
    dotContainer.children[currentIndex].classList.toggle('active');
    if (currentIndex){
        const transition = setInterval(() => {
            carouselPosition = carouselPosition - speed;
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
                carouselPosition = carouselPosition + speed;
                if (carouselPosition > imageWidth * currentIndex) {
                    carouselPosition = imageWidth * currentIndex;
                    clearInterval(transition);
                }
                imagesWrapper.style.left = `-${carouselPosition}px`;
                // if (carouselPosition == 0) clearInterval(transition);
            }, 0);
    }
    (currentIndex === 0) ? currentIndex = imageCount-1 : currentIndex--;
    dotContainer.children[currentIndex].classList.toggle('active');
}

// Aligning images in a horizontal line
for (let i = 0; i < images.length; i++){
    images[i].style.left = `${imageWidth * i}px`;
    images[i].style.top = `0`;
    images[i].style.position = `absolute`;
}

//create Navigation container
const navigation = document.createElement("div");
navigation.id = "carousel-navigation"
navigation.style.zIndex='5';
carousel.append(navigation);

//create controls container
const controls = document.createElement("div");
controls.id = "carousel-controls"
navigation.append(controls);

//create prev control buttons
const prev = document.createElement("div");
prev.id = "prev";
const prevBtn = document.createElement('img');
prevBtn.setAttribute('src','https://img.icons8.com/external-those-icons-lineal-those-icons/48/000000/external-left-arrows-those-icons-lineal-those-icons-4.png');
prev.append(prevBtn);
controls.append(prev);
prev.addEventListener('click', handlePrev);

//create next control buttons
const next = document.createElement("div");
next.id = "next";
const nextBtn = document.createElement('img');
nextBtn.setAttribute('src','https://img.icons8.com/external-those-icons-lineal-those-icons/48/000000/external-right-arrows-those-icons-lineal-those-icons-3.png');
next.append(nextBtn);
controls.append(next);
next.addEventListener('click', handleNext);

//create dot container
const dotContainer = document.createElement("div");
dotContainer.id = "carousel-dots-container"
navigation.append(dotContainer);

// add Carousel Dots dynamically
for (let i = 0; i<imageCount; i++){
    let dot = document.createElement('div');
    dot.setAttribute('class','carousel-dot');
    dotContainer.append(dot);
    dot.addEventListener('click', ()=>{
        let selected = i;
        console.log(selected);
        let slideChange = currentIndex - selected;
        if (slideChange>0){
            for (let i = slideChange; i!=0; i--){
                handlePrev();
            }
        }
        else if(slideChange<0){
            for(let i=slideChange; i!=0; i++){
                handleNext();
            }
        }
    });
}
const dots = Array.from(dotContainer.children);
dotContainer.children[currentIndex].classList.add('active');

//Change slide with indicators
dots.forEach((dot,index) => {
    
});









// const handlePrev = () => {
//     (currentIndex == 0) ? currentIndex = 4 : currentIndex--;
//     imagesWrapper.style.left = `-${imageWidth * currentIndex}px`;
// }


