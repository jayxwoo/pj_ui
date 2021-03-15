// ========= Imports =========
import './default.js';

// ========= Main =========
function main() {
    // ====== DOM references ======
    const carouselImgContainer = document.querySelector('.carousel-img-container');
    const carouselBtns = document.querySelectorAll('.carousel-btn');
    const carouselBtnLeft = document.querySelector('.carousel-btn-left');
    const carouselBtnRight = document.querySelector('.carousel-btn-right');
    const carouselIndicatorContainer = document.querySelector('.carousel-indicator-container');

    // ====== Global variables ======
    const totalImgCount = 10;
    const carouselImgs = [];
    let currImgNum = 1;
    const indicators = [];
    let isDragging = false;
    let startPos = null;
    let dragValue = null;

    // ====== Load images ======
    function loadImgs() {
        for (let i = 0; i < totalImgCount; i++) {
            const img = new Image();
            img.src = `./img/carousel-img/${i + 1}.jpg`;
            img.classList.add('carousel-img', 'carousel-img--transition');
            carouselImgs.push(img);
            carouselImgContainer.append(img);
        };
    };
    loadImgs();

    // ====== Carousel ======
    function carousel() {
        // === Functions ===
        // update active indicator
        function updateActiveIndicator(currImgNum) {
            for (let i = 0; i < totalImgCount; i++) {
                indicators[i].classList.remove('carousel-indicator--active');
            };
            indicators[currImgNum - 1].classList.add('carousel-indicator--active');
        };
        // show current carousel image
        function showCurrCarouselImg(i, carouselImgContainerWidth, currImgNum) {
            carouselImgs[i].style.transform = `translateX(${carouselImgContainerWidth - (carouselImgContainerWidth * currImgNum)}px)`;
        };
        // show and hide carousel btns
        function showHideCarouselBtns(currImgNum) {
            if (currImgNum === totalImgCount) {
                carouselBtnLeft.style.opacity = 1;
                carouselBtnRight.style.opacity = 0.1;
            } else if (currImgNum === 1) {
                carouselBtnRight.style.opacity = 1;
                carouselBtnLeft.style.opacity = 0.1;
            } else {
                carouselBtnRight.style.opacity = 1;
                carouselBtnLeft.style.opacity = 1;
            };
        };

        // === Calculute image container width ===
        let carouselImgContainerWidth = carouselImgContainer.clientWidth;
        // on resize
        window.addEventListener('resize', () => {
            carouselImgContainerWidth = carouselImgContainer.clientWidth;
        });

        // === Calculate image height ===
        let carouselImgHeight = carouselImgs[0].clientHeight;
        // on resize
        window.addEventListener('resize', () => {
            carouselImgHeight = carouselImgs[0].clientHeight;
        });

        // === Set height for image and image-container ===
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

        // === Position images ===
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

        // === Carousel nav buttons ===
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

        // === Indicators ===
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

        // === touch/mouse slide ===
        // functions
        function touchStart(e) {
            isDragging = true;
            dragValue = 0;
            // remove transition class on img
            carouselImgs.forEach(img => {
                img.classList.remove('carousel-img--transition');
            });
            // get starting position(startPos) value
            if (e.type.includes('mouse')) {
                startPos = e.clientX;
            } else {
                startPos = e.touches[0].clientX;
            };
        };
        function touchEnd() {
            isDragging = false;
            // add back transition class on img
            carouselImgs.forEach(img => {
                img.classList.add('carousel-img--transition');
            });
            // move carousel imgs depending on dragValue
            if (dragValue < -(carouselImgContainerWidth / 4)) {
                if (currImgNum < totalImgCount) {
                    currImgNum++;
                    carouselImgs.forEach(img => {
                        img.style.transform = `translateX(${carouselImgContainerWidth - (carouselImgContainerWidth * currImgNum)}px)`
                    });
                    updateActiveIndicator(currImgNum);
                    showHideCarouselBtns(currImgNum);
                } else if (currImgNum === totalImgCount) {
                    carouselImgs.forEach(img => {
                        img.style.transform = `translateX(${carouselImgContainerWidth - (carouselImgContainerWidth * currImgNum)}px)`
                    });
                };
            } else if (dragValue > carouselImgContainerWidth / 4) {
                if (currImgNum > 1) {
                    currImgNum--;
                    carouselImgs.forEach(img => {
                        img.style.transform = `translateX(${carouselImgContainerWidth - (carouselImgContainerWidth * currImgNum)}px)`
                    });
                    updateActiveIndicator(currImgNum);
                    showHideCarouselBtns(currImgNum);
                } else if (currImgNum === 1) {
                    carouselImgs.forEach(img => {
                        img.style.transform = `translateX(${carouselImgContainerWidth - (carouselImgContainerWidth * currImgNum)}px)`
                    });
                };
            } else if (-(carouselImgContainerWidth / 4) < dragValue < carouselImgContainerWidth / 4) {
                carouselImgs.forEach(img => {
                    img.style.transform = `translateX(${carouselImgContainerWidth - (carouselImgContainerWidth * currImgNum)}px)`
                });
            };
        };
        function touchMove(e) {
            if (isDragging) {
                if (e.type.includes('mouse')) {
                    dragValue = e.clientX - startPos;
                    carouselImgs.forEach(img => {
                        img.style.transform = `translateX(${carouselImgContainerWidth - (carouselImgContainerWidth * currImgNum) + dragValue}px)`
                    });
                } else {
                    dragValue = e.touches[0].clientX - startPos;
                    carouselImgs.forEach(img => {
                        img.style.transform = `translateX(${carouselImgContainerWidth - (carouselImgContainerWidth * currImgNum) + dragValue}px)`
                    });
                };
            };
        };
        function touchLeave() {
            isDragging = false;
            carouselImgs.forEach(img => {
                img.style.transform = `translateX(${carouselImgContainerWidth - (carouselImgContainerWidth * currImgNum)}px)`
            });
        };

        // event listners
        carouselImgs.forEach(img => {
            // mouse events (desktop)
            img.addEventListener('mousedown', e => {
                // prevent dragging img
                e.preventDefault();

                touchStart(e);
            });
            img.addEventListener('mouseup', e => {
                touchEnd();
            });
            img.addEventListener('mouseleave', e => {
                touchLeave();
            });
            img.addEventListener('mousemove', e => {
                touchMove(e);
            });
            // touch events (mobile)
            img.addEventListener('touchstart', e => {
                // // prevent triggering mouse events
                // e.preventDefault();
                
                touchStart(e);
            });
            img.addEventListener('touchend', e => {
                // prevent triggering mouse events
                e.preventDefault();

                touchEnd();
            });
            img.addEventListener('touchmove', e => {
                touchMove(e);
            }, { passive: true });
        });
    };
    window.addEventListener('load', () => {
        carousel();
    });
};
main();