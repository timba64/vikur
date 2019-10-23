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

// make top menu from credit-cards *********************
export function makeMenu() {
    const mb = document.querySelector('.m-button'),
    cb = document.querySelector('.close-button'),
    hd = document.querySelector('.header-down');

    mb.addEventListener('click', function(){
        this.classList.toggle('open');
        hd.classList.toggle('open');
    });
    cb.addEventListener('click', function(){
        hd.classList.toggle('open');
        mb.classList.toggle('open');
    });
};

export function makeScroll() {
    const anchors = document.querySelectorAll('a[href^="#an_"]'),
    mb = document.querySelector('.m-button'),
    hd = document.querySelector('.header-down');

    anchors.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const el = this.getAttribute('href').slice(1)
            mb.classList.toggle('open');
            hd.classList.toggle('open');
            slideWindow(el);
            //setTimeout(slideWindow(el), 3000);
        });
    });

    function slideWindow(nmAnchor) {
        const el = document.getElementById(nmAnchor);
        const coordY = el.getBoundingClientRect().top + window.pageYOffset;

        function smoothScroll() {
            window.scrollTo({ top: coordY, left: 0, behavior: 'smooth'});
        }
        setTimeout(smoothScroll, 500);
    }
};