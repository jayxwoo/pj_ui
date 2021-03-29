// ========== default ==========
// stop all animations and transitions during resizing
const stopAnimationOnResize = function () {
    window.addEventListener('resize', () => {
        document.body.classList.add('resize-animation-stopper');
        setTimeout(function () {
            document.body.classList.remove('resize-animation-stopper');
        }, 300);
    });    
};
stopAnimationOnResize();