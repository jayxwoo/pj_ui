// ========== Imports ==========
import './default.js';

// ========== Main ==========
(() => {
    // DOM
    const parallax_1 = document.querySelector('.parallax-1');
    const parallax_2 = document.querySelector('.parallax-2');

    // Global Variable
    let scroll = null;
    let scrollRatio = null;
    let startScrollRatio = null;
    let endScrollRatio = null;

    // Calculate start scroll ratio
    function calcStartScrollRatio(parallax) {
        if (parallax.offsetTop - window.innerHeight < 0) {
            startScrollRatio = 0;
        } else {
            startScrollRatio = (parallax.offsetTop - window.innerHeight) / document.body.scrollHeight;
        };
        return startScrollRatio;
    };

    // Calculate end scroll ratio
    function calcEndScrollRatio(parallax) {
        endScrollRatio = (parallax.offsetTop + parallax.scrollHeight) / document.body.scrollHeight;
        return endScrollRatio;
    };

    // Play parallax
    function playParallax(parallax, startScrollRatio, endScrollRatio, scrollRatio) {
        if (scrollRatio > startScrollRatio && scrollRatio < endScrollRatio) {
            const partScrollRatio = (scrollRatio - startScrollRatio) / (endScrollRatio - startScrollRatio);
            parallax.style.backgroundPositionY = `${partScrollRatio * 100}%`;
        };
    };

    // Main
    function main() {
        // On Load
        window.addEventListener('load', () => {
            scroll = window.pageYOffset;
            scrollRatio = (scroll / document.body.scrollHeight);
            playParallax(parallax_1, calcStartScrollRatio(parallax_1), calcEndScrollRatio(parallax_1), scrollRatio);
            playParallax(parallax_2, calcStartScrollRatio(parallax_2), calcEndScrollRatio(parallax_2), scrollRatio);
        });

        // On Resize
        window.addEventListener('resize', () => {
            scroll = window.pageYOffset;
            scrollRatio = (scroll / document.body.scrollHeight);
            playParallax(parallax_1, calcStartScrollRatio(parallax_1), calcEndScrollRatio(parallax_1), scrollRatio);
            playParallax(parallax_2, calcStartScrollRatio(parallax_2), calcEndScrollRatio(parallax_2), scrollRatio);
        });

        // On Scroll
        window.addEventListener('scroll', () => {
            scroll = window.pageYOffset;
            scrollRatio = (scroll / document.body.scrollHeight);
            playParallax(parallax_1, calcStartScrollRatio(parallax_1), calcEndScrollRatio(parallax_1), scrollRatio);
            playParallax(parallax_2, calcStartScrollRatio(parallax_2), calcEndScrollRatio(parallax_2), scrollRatio);
        });
    };
    main();
})()