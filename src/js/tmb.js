export function addBlockColor() {

    const head = document.getElementById('masthead');

    window.addEventListener('scroll', function() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if( scrollTop > 40 ) {
            head.classList.add('black-head');
        } else {
            head.classList.remove('black-head');
        }
    });

};