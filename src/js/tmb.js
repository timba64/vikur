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

export function makeAccordion(){
    var i, acc, panel;
    acc = document.getElementsByClassName("accord");

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            this.classList.toggle("active");

            /* Toggle between hiding and showing the active panel */
            panel = this.nextElementSibling;
            if (panel.style.maxHeight){
            panel.style.maxHeight = null;
            } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
};