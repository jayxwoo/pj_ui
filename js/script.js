// ========== Imports ==========
import './default.js';

// ========== Main ==========
(() => {
    // Hero - bg
    const heroParallax = document.querySelector('.hero-parallax');
    const scrollPosition = document.querySelector('.scroll-position');

    window.addEventListener('scroll', () => {
        const scroll = window.pageYOffset;

        heroParallax.style.backgroundPositionY = `${scroll * 0.5}px`;

        scrollPosition.textContent = scroll;
    });
})()