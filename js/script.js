// ========== imports ==========
import './default.js';

// ========== DOM references ==========
const carouselTrack = document.querySelector('.carousel-track');
const carouselBtns = document.querySelectorAll('.carousel-btn');
const carouselBtnLeft = document.querySelector('.carousel-btn-left');
const carouselBtnRight = document.querySelector('.carousel-btn-right');
const carouselViewer = document.querySelector('.carousel-viewer');
const carouselIndicatorContainer = document.querySelector('.carousel-indicator-container');

// ========== global variables ==========
const carouselImgs = [];
const NumOfCarouselImgs = 10;
let currImgNum = 1;
const indicators = [];

// ========== script ==========
const main = function () {
    // ===== Functions =====
    // update indicators
    const updateIndicator = function (currImgNum) {
        indicators.forEach(indicator => {
            indicator.style.backgroundColor = 'var(--grey)';
        });
        indicators[currImgNum-1].style.backgroundColor = 'var(--black)';
    };
    // show and hide carousel btns
    const showHideCarouselBtn = function (currImgNum) {
        if (currImgNum === 1) {
            carouselBtnLeft.style.visibility = 'hidden';
            carouselBtnRight.style.visibility = 'visible';
        } else if (currImgNum === 10) {
            carouselBtnRight.style.visibility = 'hidden';
            carouselBtnLeft.style.visibility = 'visible';
        } else {
            carouselBtnLeft.style.visibility = 'visible';
            carouselBtnRight.style.visibility = 'visible';
        };
    };
    // control carousel track
    const controlCarouselTrack = function (currImgNum) {
        carouselTrack.style.transform = `translateX(${carouselViewerWidth - carouselViewerWidth * (currImgNum)}px)`;
    };

    // =====Load images=====
    for (let i = 0; i < NumOfCarouselImgs; i++) {
        const img = new Image();
        img.src = `./img/carousel-img/${i + 1}.jpg`;
        img.classList.add('carousel-img');
        carouselTrack.appendChild(img);
    };

    // =====Calculate carousel viewer width=====
    // init
    let carouselViewerWidth = carouselViewer.clientWidth;
    // on resize
    window.addEventListener('resize', () => {
        carouselViewerWidth = carouselViewer.clientWidth;
    });
    // When carousel btn is clicked
    carouselBtns.forEach(carouselBtn => {
        carouselBtn.addEventListener('click', e => {
            // control carousel track
            if (e.target.classList.contains('carousel-btn-right') || e.target.classList.contains('carousel-icon-right')) {
                if (currImgNum < NumOfCarouselImgs) {
                    currImgNum++;
                    // control carousel track
                    controlCarouselTrack(currImgNum);
                };
            } else if (e.target.classList.contains('carousel-btn-left') || e.target.classList.contains('carousel-icon-left')) {
                if (currImgNum > 1) {
                    currImgNum--;
                    // control carousel track
                    controlCarouselTrack(currImgNum);
                };
            };
            // update indicators
            updateIndicator(currImgNum);
            // show and hide carousel btns
            showHideCarouselBtn(currImgNum);
        });
    });

    // =====Keep carousel-track at the same position on resize=====
    window.addEventListener('resize', () => {
        console.log(currImgNum);
        controlCarouselTrack(currImgNum);
    });

    // =====Indicator (dots)=====
    // create indicator elements
    for (let i = 0; i < NumOfCarouselImgs; i++) {
        const indicator = document.createElement('button');
        indicator.classList.add('carousel-indicator');
        indicators.push(indicator);
        carouselIndicatorContainer.appendChild(indicator);
    };
    // show active indicator (init)
    indicators[currImgNum-1].style.backgroundColor = 'var(--black)';
    // show correct image when clicked
    indicators.forEach(indicator => {
        indicator.addEventListener('click', (e) => {
            currImgNum = indicators.indexOf(e.target) + 1;
            controlCarouselTrack(currImgNum);
            // update indicators
            updateIndicator(currImgNum);
            // show and hide carousel btns
            showHideCarouselBtn(currImgNum);
        });
    });
};

window.addEventListener('load', () => {
    main();
});