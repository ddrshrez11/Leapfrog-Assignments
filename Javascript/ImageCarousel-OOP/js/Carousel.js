// new Carousel(carouselId, imageWidth, transitionTime, holdTime)
//carouselId => id of outmost carousel div
//imageWidth => required width of image 
//transitionTime => time taken to change slide
//holdTime => slide changes automatically after given time

class Carousel {
  constructor(carouselId, imageWidth, transitionTime, holdTime) {
    this.body = document.getElementsByTagName("body");
    this.carousel = document.getElementById(carouselId);
    this.imagesWrapper =
      this.carousel.getElementsByClassName("image_wrapper")[0];
    this.images = this.imagesWrapper.children;
    this.imageCount = this.images.length;
    // this.carousel.style.visibility = "hidden";

    this.imageWidth = imageWidth; //700;
    this.currentIndex = 0;
    this.carouselPosition = 0;
    // this.speed = 10;
    this.transitionTime = transitionTime;
    this.holdTime = holdTime;
    // this.images[0].setAttribute('onload','setHeight()');
    this.images[0].addEventListener("load", this.setHeight);
    this.StartCarousel();
    // this.body[0].setAttribute('onload','StartCarousel()');
  }

  setHeight = () => {
    this.imagesWrapper.style.height = `${this.images[0].height}px`;
  };
  handleNext = () => {
    clearInterval(this.automaticSlide);
    this.revertDot(this.currentIndex, this.dots, this.images);
    this.currentIndex === this.imageCount - 1
      ? (this.currentIndex = 0)
      : this.currentIndex++;
    this.activeDot(this.currentIndex, this.dots, this.images);
    // this.imagesWrapper.style.left = `-${this.imageWidth * this.currentIndex}px`;
    if (this.currentIndex) {
      const transition = setInterval(() => {
        this.carouselPosition = this.carouselPosition + this.speed;
        // console.log((this.carouselPosition % this.imageWidth))
        if (this.carouselPosition > this.imageWidth * this.currentIndex) {
          this.carouselPosition = this.imageWidth * this.currentIndex;
          clearInterval(transition);
          //Automatic sliding
          this.autoSlide();
        }
        this.imagesWrapper.style.left = `-${this.carouselPosition}px`;
        // if ((this.carouselPosition % this.imageWidth) == 0) clearInterval(transition);
      }, 10);
    } else {
      // this.imagesWrapper.style.left = "0px";
      const transition = setInterval(() => {
        this.carouselPosition = this.carouselPosition - this.speed;
        if (this.carouselPosition < 0) this.carouselPosition = 0;
        this.imagesWrapper.style.left = `-${this.carouselPosition}px`;
        if (this.carouselPosition == 0) {
          clearInterval(transition);
          //Automatic sliding
          this.autoSlide();
        }
      }, 0);
    }

    // //Automatic sliding
    // this.automaticSlide = setInterval(() => {
    //     this.handleNext();
    // }, this.holdTime);
  };
  handlePrev = () => {
    clearInterval(this.automaticSlide);
    // this.imagesWrapper.style.left = `-${this.imageWidth * this.currentIndex}px`;
    this.revertDot(this.currentIndex, this.dots, this.images);

    if (this.currentIndex) {
      const transition = setInterval(() => {
        this.carouselPosition = this.carouselPosition - this.speed;
        // console.log((this.carouselPosition % this.imageWidth))
        if (this.carouselPosition < this.imageWidth * this.currentIndex) {
          this.carouselPosition = this.imageWidth * this.currentIndex;
          clearInterval(transition);
          //Automatic sliding
          this.autoSlide();
        }
        this.imagesWrapper.style.left = `-${this.carouselPosition}px`;
        // if ((this.carouselPosition % imageWidth) == 0) clearInterval(transition);
      }, 1);
    } else {
      this.imagesWrapper.style.left = "0px";
      const transition = setInterval(() => {
        this.carouselPosition = this.carouselPosition + this.speed;
        if (this.carouselPosition > this.imageWidth * this.currentIndex) {
          this.carouselPosition = this.imageWidth * this.currentIndex;
          clearInterval(transition);
          //Automatic sliding
          this.autoSlide();
        }
        this.imagesWrapper.style.left = `-${this.carouselPosition}px`;
        // if (this.carouselPosition == 0) clearInterval(transition);
      }, 0);
    }
    this.currentIndex === 0
      ? (this.currentIndex = this.imageCount - 1)
      : this.currentIndex--;
    this.activeDot(this.currentIndex, this.dots, this.images);
  };
  revertDot(index, dots, images) {
    dots[index].style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    dots[index].classList.toggle("active");
    images[index].classList.toggle("active");
  }
  activeDot(index, dots, images) {
    dots[index].style.backgroundColor = "rgba(255, 255, 255, 1)";
    dots[index].classList.toggle("active");
    images[index].classList.toggle("active");
  }
  checkResponsive() {
    //Carousel CSS
    if (window.screen.availWidth < this.imageWidth) {
      this.carousel.style.width = `100%`;
      this.imageWidth = window.screen.availWidth;
    } else {
      this.carousel.style.width = `${this.imageWidth}px`;
    }
    this.carousel.style.overflow = `hidden`;
    this.carousel.style.position = `relative`;
    this.carousel.style.margin = `0 auto`;
    // this.carousel.style.height = `${this.images[0].height}px`;  // comment this
    this.imagesWrapper.style.position = `relative`;
    this.imagesWrapper.style.height = `${this.images[0].height}px`;
    this.speed = this.imageWidth / (this.transitionTime / 10);
    // this.carousel.style.visibility = "visible";
  }

  StartCarousel() {
    this.checkResponsive();
    this.carousel.addEventListener("resize", this.checkResponsive);

    // Aligning images in a horizontal line
    for (let i = 0; i < this.images.length; i++) {
      this.images[i].style.left = `${this.imageWidth * i}px`;
      this.images[i].style.top = `0`;
      this.images[i].style.position = `absolute`;
    }

    //create Navigation container
    const navigation = document.createElement("div");
    navigation.id = "carousel-navigation";
    navigation.style.zIndex = "5";
    this.carousel.append(navigation);

    //create controls container
    const controls = document.createElement("div");
    controls.id = "carousel-controls";
    navigation.append(controls);

    //create prev control buttons
    const prev = document.createElement("div");
    prev.id = "prev";
    const prevBtn = document.createElement("img");
    // prevBtn.setAttribute('src','https://img.icons8.com/external-those-icons-lineal-those-icons/48/000000/external-left-arrows-those-icons-lineal-those-icons-4.png');
    prevBtn.setAttribute("src", "images/chevron-left.png");
    prev.style.position = "absolute";
    prev.style.left = "0";
    prev.style.top = "0";
    prev.style.height = "100%";
    prev.style.backgroundColor = "rgb(210 211 213 / 15%)";
    prevBtn.style.position = "relative";
    prevBtn.style.top = "50%";
    prevBtn.style.transform = "translateY(-50%)";

    prev.append(prevBtn);
    controls.append(prev);
    prev.addEventListener("click", this.handlePrev);

    //create next control buttons
    const next = document.createElement("div");
    next.id = "next";
    const nextBtn = document.createElement("img");
    // nextBtn.setAttribute('src','https://img.icons8.com/external-those-icons-lineal-those-icons/48/000000/external-right-arrows-those-icons-lineal-those-icons-3.png');
    nextBtn.setAttribute("src", "images/chevron-right.png");
    next.style.position = "absolute";
    next.style.right = "0";
    next.style.top = "0";
    next.style.height = "100%";
    next.style.backgroundColor = "rgb(210 211 213 / 15%)";
    nextBtn.style.position = "relative";
    nextBtn.style.top = "50%";
    nextBtn.style.transform = "translateY(-50%)";

    next.append(nextBtn);
    controls.append(next);
    next.addEventListener("click", this.handleNext);

    //create dot container
    const dotContainer = document.createElement("div");
    dotContainer.id = "carousel-dots-container";
    dotContainer.style.position = "absolute";
    dotContainer.style.bottom = "3%";
    dotContainer.style.left = "50%";
    dotContainer.style.transform = "translateX(-50%)";

    navigation.append(dotContainer);

    // add Carousel Dots dynamically
    for (let i = 0; i < this.imageCount; i++) {
      let dot = document.createElement("div");
      dot.setAttribute("class", "carousel-dot");
      dot.style.height = "10px";
      dot.style.width = "10px";
      dot.style.borderRadius = "50%";
      dot.style.display = "inline-block";
      dot.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
      dot.style.boxShadow = "1px 1px 2px #000";
      dot.style.margin = "3px";
      dotContainer.append(dot);
      dot.addEventListener("click", () => {
        let selected = i;
        console.log(selected);
        let slideChange = this.currentIndex - selected;
        if (slideChange > 0) {
          for (let i = slideChange; i != 0; i--) {
            this.handlePrev();
          }
        } else if (slideChange < 0) {
          for (let i = slideChange; i != 0; i++) {
            this.handleNext();
          }
        }
      });
    }
    this.dots = Array.from(dotContainer.children);
    this.activeDot(this.currentIndex, this.dots, this.images);

    //Automatic sliding
    this.autoSlide();
  }

  autoSlide() {
    this.automaticSlide = setInterval(() => {
      this.handleNext();
    }, this.holdTime);
  }
}
