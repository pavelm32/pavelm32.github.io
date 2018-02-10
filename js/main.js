var burger_link = document.getElementsByClassName('burger-link')[0],
    team_acrd = document.getElementsByClassName('team-list__item'),
    menu_acrd = document.getElementsByClassName('menu-list__item'),
    review_btn = document.getElementsByClassName('reviews-list__more-btn'),
    popup_close = document.getElementsByClassName('popup__close');

burger_link.addEventListener('click', function (e) {
    e.preventDefault();
    toogleOverlay();

    toggleElementClass(this);
});

function toogleOverlay() {
    var overlay = document.querySelector('.overlay');
    if (getComputedStyle(overlay).display == 'none' || getComputedStyle(overlay).display == '') {
        overlay.style.display = 'block';
    } else {
        overlay.style.display = 'none';
    }
}

function toggleElementClass($this) {
    $this.classList.toggle('burger-link_change');
    document.querySelector('.order-link').classList.toggle('order-link_hidden');
    document.querySelector('.nav-list').classList.toggle('fixed-menu');
    document.querySelector('.header').classList.toggle('header_fixed');
}

for (var i = 0; i < menu_acrd.length; i++) {
    menu_acrd[i].addEventListener('click', function (e) {
        e.preventDefault();

        checkActiveAccordionItem(this, 'menu');
    });
}

for (i = 0; i < team_acrd.length; i++) {
    team_acrd[i].addEventListener('click', function (e) {
        e.preventDefault();

        checkActiveAccordionItem(this, 'team');
    });
}

for (i = 0; i < review_btn.length; i++) {
    review_btn[i].addEventListener('click', function (e) {
        e.preventDefault();
        toogleOverlay();

        document.querySelector('.review-popup').classList.add('popup_show');
    });
}

for (i = 0; i < popup_close.length; i++) {
    popup_close[i].addEventListener('click', function (e) {
        e.preventDefault();
        toogleOverlay();

        document.querySelector('.popup_show').classList.remove('popup_show');
    });
}

function checkActiveAccordionItem($this, type) {
    if ($this.classList.contains(type + '-list__item_opened')) {
        $this.classList.remove(type + '-list__item_opened');
        return;
    }

    var elm = document.querySelector('.' + type + '-list__item_opened');

    if (typeof elm != 'undefined' && elm) {
        elm.classList.remove(type + '-list__item_opened');
    }

    $this.classList.add(type + '-list__item_opened');
}

$(function () {
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        items:1,
        nav:true,
        navText: '',
        dots: false,
        navClass: ['owl-prev slider__slide-arrow slider__slide-arrow_direction_left','owl-next slider__slide-arrow slider__slide-arrow_direction_right']
    })
});