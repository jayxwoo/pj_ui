// ========== Imports ==========
import './default.js';

// ========== Main ==========
(() => {
    // DOM
    const parallax_1 = document.querySelector('.parallax-1');
    const parallax_2 = document.querySelector('.parallax-2');
    const parallax_1_img = document.querySelector('.parallax-1-img');
    const parallax_2_img = document.querySelector('.parallax-2-img');

    // Global Variables

    // Calculate scrollRatio
    function calcScrollRatio() {
        const scroll = window.pageYOffset;
        const scrollRatio = scroll / document.body.scrollHeight;
        return scrollRatio;
    };

    // Calculate start parallax scroll Ratio (startScrollRatio)
    function calcStartScrollRatio(parallax) {
        let startScrollRatio = (parallax.offsetTop - window.innerHeight) / document.body.scrollHeight;
        if (startScrollRatio < 0) {
            return startScrollRatio = 0;
        } else {
            return startScrollRatio;
        };
    };

    // Calculate end parallax scroll Ratio (endScrollRatio)
    function calcEndScrollRatio(parallax) {
        const endScrollRatio = (parallax.offsetTop + parallax.scrollHeight) / document.body.scrollHeight;
        return endScrollRatio;
    };

    // Play parallax
    function playParallax(parallax, parallaxImg, scrollRatio, startScrollRatio, endScrollRatio, startPosition) {
        if (scrollRatio >= startScrollRatio && scrollRatio < endScrollRatio) {
            const partScrollRatio = (scrollRatio - startScrollRatio) / (endScrollRatio - startScrollRatio);

            if (startPosition === 'top') {
                parallaxImg.style.top = `${((partScrollRatio) - (parallaxImg.scrollHeight / parallax.scrollHeight)) * 100}%`;
            } else if (startPosition === 'bottom') {
                parallaxImg.style.top = `${100 - (((partScrollRatio) + (parallaxImg.scrollHeight / parallax.scrollHeight)) * 100)}%`;
            };
        };
    };

    // Main
    function main() {
        // On Load
        window.addEventListener('load', () => {
            const scrollRatio = calcScrollRatio();
            // Parallax 1
            playParallax(parallax_1, parallax_1_img, scrollRatio, calcStartScrollRatio(parallax_1), calcEndScrollRatio(parallax_1), 'top');
            // Parallax 2
            playParallax(parallax_2, parallax_2_img, scrollRatio, calcStartScrollRatio(parallax_2), calcEndScrollRatio(parallax_2), 'bottom');
        });

        // On Scroll
        window.addEventListener('scroll', () => {
            const scrollRatio = calcScrollRatio();
            // Parallax 1
            playParallax(parallax_1, parallax_1_img, scrollRatio, calcStartScrollRatio(parallax_1), calcEndScrollRatio(parallax_1), 'top');
            // Parallax 2
            playParallax(parallax_2, parallax_2_img, scrollRatio, calcStartScrollRatio(parallax_2), calcEndScrollRatio(parallax_2), 'bottom');
        });

        // On Resize
        window.addEventListener('resize', () => {
            const scrollRatio = calcScrollRatio();
            // Parallax 1
            playParallax(parallax_1, parallax_1_img, scrollRatio, calcStartScrollRatio(parallax_1), calcEndScrollRatio(parallax_1), 'top');
            // Parallax 2
            playParallax(parallax_2, parallax_2_img, scrollRatio, calcStartScrollRatio(parallax_2), calcEndScrollRatio(parallax_2), 'bottom');
        });
    };
    main();
})()