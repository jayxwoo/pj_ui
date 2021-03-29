// ========== Imports ==========
import './default.js';

// ========== Script ==========
(() => {
    const parallaxes = document.querySelectorAll('.parallax');
    const section_1_text = document.querySelector('.section-1-text');

    // Detect broswer on mobile or tablet devices and apply different css stylings for parallax
    // since background-attachement does not work on mobile browsers.
    if (typeof window.orientation !== 'undefined') {
        parallaxes.forEach((parallax) => {
            parallax.classList.add('parallax-mobile');
            section_1_text.innerHTML = '<b>Mobile</b> browser detected!<br>Parallaxes are replaced with normal background elements.';
        })
    } else {
        section_1_text.innerHTML = `<b>Desktop</b> browser detected!<br>Parallax(fixed) will work as normal.`;
    };
})();