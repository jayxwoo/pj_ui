// ========== imports ==========
import './default.js';

// ========== DOM references ==========
const carouselImgContainer = document.querySelector('.carousel-img-container');
const carouselBtns = document.querySelectorAll('.carousel-btn');
const carouselBtnLeft = document.querySelector('.carousel-btn-left');
const carouselBtnRight = document.querySelector('.carousel-btn-right');
const carouselIndicatorContainer = document.querySelector('.carousel-indicator-container');

// ========== global variables ==========
const totalImgCount = 10;
const carouselImgs = [];
let currImgNum = 1;
const indicators = [];

// ========== script ==========
// ===== Functions =====
// update active indicator
const updateActiveIndicator = function (currImgNum) {
    for (let i = 0; i < totalImgCount; i++) {
        indicators[i].classList.remove('carousel-indicator--active');
    };
    indicators[currImgNum - 1].classList.add('carousel-indicator--active');
};
// show current carousel image
const showCurrCarouselImg = function (i, carouselImgContainerWidth, currImgNum) {
    carouselImgs[i].style.transform = `translateX(${carouselImgContainerWidth - (carouselImgContainerWidth * currImgNum)}px)`;
};
// show and hide carousel btns
const showHideCarouselBtns = function (currImgNum) {
    if (currImgNum === totalImgCount) {
        carouselBtnLeft.style.visibility = 'visible';
        carouselBtnRight.style.visibility = 'hidden';
    } else if (currImgNum === 1) {
        carouselBtnRight.style.visibility = 'visible';
        carouselBtnLeft.style.visibility = 'hidden';
    } else {
        carouselBtnRight.style.visibility = 'visible';
        carouselBtnLeft.style.visibility = 'visible';
    };
};

// ===== Load images =====
for (let i = 0; i < totalImgCount; i++) {
    const img = new Image();
    img.src = `./img/carousel-img/${i + 1}.jpg`;
    img.classList.add('carousel-img');
    carouselImgs.push(img);
    carouselImgContainer.append(img);
};

const main = function () {
    // ===== Calculute image container width =====
    let carouselImgContainerWidth = carouselImgContainer.clientWidth;
    // on resize
    window.addEventListener('resize', () => {
        carouselImgContainerWidth = carouselImgContainer.clientWidth;
    });

    // ===== Calculate image height =====
    let carouselImgHeight = carouselImgs[0].clientHeight;
    // on resize
    window.addEventListener('resize', () => {
        carouselImgHeight = carouselImgs[0].clientHeight;
    });

    // ===== Set height for image and image-container =====
    for (let i = 1; i < totalImgCount; i++) {
        carouselImgs[i].style.height = `${carouselImgHeight}px`;
    };
    carouselImgContainer.style.height = `${carouselImgHeight}px`;
    // on resize
    window.addEventListener('resize', () => {
        for (let i = 1; i < totalImgCount; i++) {
            carouselImgs[i].style.height = `${carouselImgHeight}px`;
        };
        carouselImgContainer.style.height = `${carouselImgHeight}px`;
    });

    // ===== Position images =====
    for (let i = 0; i < totalImgCount; i++) {
        const leftValue = carouselImgContainerWidth * i;
        carouselImgs[i].style.left = `${leftValue}px`;
    };
    // on resize
    window.addEventListener('resize', () => {
        // align carousel imgs
        for (let i = 0; i < totalImgCount; i++) {
            const leftValue = carouselImgContainerWidth * i;
            carouselImgs[i].style.left = `${leftValue}px`;
        };
        // show carousel img
        for (let i = 0; i < totalImgCount; i++) {
            showCurrCarouselImg(i, carouselImgContainerWidth, currImgNum);
        };
    });

    // ===== Carousel nav buttons =====
    carouselBtns.forEach(carouselBtn => {
        carouselBtn.addEventListener('click', (e) => {
            if (carouselBtn.classList.contains('carousel-btn-right')) {
                if (currImgNum < totalImgCount) {
                    currImgNum++;
                    // show carousel img
                    for (let i = 0; i < totalImgCount; i++) {
                        showCurrCarouselImg(i, carouselImgContainerWidth, currImgNum);
                    };
                };
            } else if (carouselBtn.classList.contains('carousel-btn-left')) {
                if (currImgNum > 1) {
                    currImgNum--;
                    // show carousel img
                    for (let i = 0; i < totalImgCount; i++) {
                        showCurrCarouselImg(i, carouselImgContainerWidth, currImgNum);
                    };
                };
            };
            // udate active indicator
            updateActiveIndicator(currImgNum);
            // show and hide carousel btn
            showHideCarouselBtns(currImgNum);
        });
    });

    // ===== Indicators =====
    // create indicators
    for (let i = 0; i < totalImgCount; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('carousel-indicator');
        indicators.push(indicator);
        carouselIndicatorContainer.append(indicator);
    };
    // update active indicator
    updateActiveIndicator(currImgNum);
    // show corresponding img when an indicator is clicked
    indicators.forEach(indicator => {
        indicator.addEventListener('click', (e) => {
            currImgNum = indicators.indexOf(e.target) + 1;
            // show carousel img
            for (let i = 0; i < totalImgCount; i++) {
                showCurrCarouselImg(i, carouselImgContainerWidth, currImgNum);
            };
            // udate active indicator
            updateActiveIndicator(currImgNum);
            // show and hide carousel btn
            showHideCarouselBtns(currImgNum);
        });
    });
};

window.addEventListener('load', () => {
    main();
});