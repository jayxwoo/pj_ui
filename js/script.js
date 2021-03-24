// Imports
import './default.js';

// Scripts
(() => {
    // DOM
    const carouselFrame = document.querySelector('.carousel-frame');
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselBtns = document.querySelectorAll('.carousel-btn');
    const carouselBtnLeft = document.querySelector('.carousel-btn--left');
    const carouselBtnRight = document.querySelector('.carousel-btn--right');
    const carouselModal = document.querySelector('.carousel-modal');
    const carouselModalBtn = document.querySelector('.carousel-modal-btn');

    // Global Variables
    const totalNumImg = 10;
    const imgConts = [];
    let carouselFrameWidth = null;
    let imgContWidth = null;
    let imgContHeight = null;
    let imgGap = null;
    let scrollValue = null;
    let carouselModalImg = null;

    // Load images
    function loadImgs() {
        for (let i = 0; i < totalNumImg; i++) {
            const img = new Image();
            img.src = `./img/${i + 1}.jpeg`;
            img.classList.add('carousel-img');
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('carousel-img-container');
            imgContainer.append(img);
            carouselTrack.append(imgContainer);
            imgConts.push(imgContainer);
        };
    };
    loadImgs();

    // Set carouesl
    function setCarousel() {
        // Calculate carousel frame width
        carouselFrameWidth = carouselFrame.clientWidth;
        // Calculate image container width, height and gap(padding)
        imgContWidth = carouselFrameWidth / 3;
        imgContHeight = imgContWidth * 1.4;
        imgGap = imgContWidth * 0.14;
        // Set image container width, height and gap(padding)
        imgConts.forEach(imgCont => {
            imgCont.style.width = `${imgContWidth}px`;
            imgCont.style.height = `${imgContHeight}px`;
            imgCont.style.padding = `${imgGap / 2}px`;
        });
        // Set image container position
        imgConts.forEach((imgCont, index) => {
            imgCont.style.left = `${imgContWidth * index}px`;
        });
        // Set carousel track height
        carouselTrack.style.height = `${imgContHeight}px`;
    };

    // Play carousel
    function playCarousel() {
        // Move carousel
        carouselBtns.forEach(carouselBtn => {
            carouselBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (carouselBtn.classList.contains('carousel-btn--right') || e.target.classList.contains('carousel-icon--right')) {
                    carouselTrack.scrollBy({
                        left: carouselFrameWidth,
                        behavior: 'smooth'
                    });
                } else if (carouselBtn.classList.contains('carousel-btn--left') || e.target.classList.contains('carousel-icon--left')) {
                    carouselTrack.scrollBy({
                        left: -carouselFrameWidth,
                        behavior: 'smooth'
                    });
                };
            });
        });
        // Show and hide buttons
        carouselTrack.addEventListener('scroll', () => {
            scrollValue = carouselTrack.scrollLeft;
            if (scrollValue <= 0) {
                carouselBtnLeft.style.opacity = '0.3';
                carouselBtnRight.style.opacity = '1';
            } else if (scrollValue + carouselTrack.clientWidth >= carouselTrack.scrollWidth) {
                carouselBtnRight.style.opacity = '0.3';
                carouselBtnLeft.style.opacity = '1';
            } else {
                carouselBtnLeft.style.opacity = '1';
                carouselBtnRight.style.opacity = '1';
            };
        });
        // Open modal
        imgConts.forEach((imgCont, index) => {
            const img = imgCont.querySelector('.carousel-img');
            imgCont.addEventListener('click', (e) => {
                carouselModal.classList.add('carousel-modal--active');
                carouselModalImg = new Image();
                carouselModalImg.src = `./img/${index + 1}.jpeg`;
                carouselModalImg.classList.add('carousel-modal-img');
                carouselModal.append(carouselModalImg);
            });
        });
        // Close modal
        carouselModalBtn.addEventListener('click', (e) => {
            carouselModal.classList.remove('carousel-modal--active');
            carouselModalImg.remove();
        });
        carouselModal.addEventListener('click', (e) => {
            if (e.target === carouselModal) {
                carouselModal.classList.remove('carousel-modal--active');
                carouselModalImg.remove();
            };
        });
    };

    // Main
    function main() {
        setCarousel();
        window.addEventListener('resize', setCarousel);
        playCarousel();
    };
    window.addEventListener('load', main);
})();