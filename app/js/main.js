let burger_link = document.getElementsByClassName('burger-link')[0],
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
    let overlay = document.querySelector('.overlay');
    if (getComputedStyle(overlay).display == 'none' || getComputedStyle(overlay).display == '') {
        overlay.style.display = 'block';
    } else {
        overlay.style.display = 'none';
    }
}

function tooglePopupOverlay() {
    let overlay = document.querySelector('.popup-overlay');
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
    document.querySelector('.nav-section-dot').classList.toggle('nav-section-dot_hidden');
}

for (let i = 0; i < menu_acrd.length; i++) {
    menu_acrd[i].addEventListener('click', function (e) {
        e.preventDefault();

        checkActiveAccordionItem(this, 'menu');
    });
}

for (let i = 0; i < team_acrd.length; i++) {
    team_acrd[i].addEventListener('click', function (e) {
        e.preventDefault();



        checkActiveAccordionItem(this, 'team');

       // var tmp_h = parseFloat(getComputedStyle(this).height);
       // this.style.height = tmp_h + 'px';
    });
}

for (let i = 0; i < review_btn.length; i++) {
    review_btn[i].addEventListener('click', function (e) {
        e.preventDefault();
        tooglePopupOverlay();

        document.querySelector('.review-popup').classList.add('popup_show');
    });
}

for (let i = 0; i < popup_close.length; i++) {
    popup_close[i].addEventListener('click', function (e) {
        e.preventDefault();
        tooglePopupOverlay();

        document.querySelector('.popup_show').classList.remove('popup_show');
    });
}

function checkActiveAccordionItem($this, type) {
    if ($this.classList.contains(type + '-list__item_opened')) {
        $this.classList.remove(type + '-list__item_opened');
        return;
    }

    let elm = document.querySelector('.' + type + '-list__item_opened');

    if (typeof elm != 'undefined' && elm) {
        elm.classList.remove(type + '-list__item_opened');
    }

    $this.classList.add(type + '-list__item_opened');
}


const sections = $('.section');
const maincontent = $('.maincontent');
let isScrolled = false;

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let resetActiveMenuItem = index_item => {
    if(!$((`[data-index=${index_item}]`)).hasClass('point-list__item_active')) {
        $('.point-list__item')
            .filter(`[data-index=${index_item}]`)
            .addClass('point-list__item_active')
            .siblings()
            .removeClass('point-list__item_active');
    }

    if ($(burger_link).hasClass('burger-link_change')) {
        toogleOverlay();

        toggleElementClass(burger_link);
    }
};

let scrollTo = index_section => {
    let position = `${index_section * -100}%`;

    if (isScrolled) return;

    isScrolled = true;

    sections
        .eq(index_section)
        .addClass("section_active")
        .siblings()
        .removeClass("section_active");

    maincontent.css({
        transform: `translate(0, ${position})`,
        "-webkit-transform": `translate(0, ${position})`
    });

    setTimeout(() => {
        isScrolled = false;
        resetActiveMenuItem(index_section);
    }, 1300);

};

let prepareToScroll = direction => {
    let current_section = sections.filter('.section_active'),
        next_section = current_section.next('.section'),
        prev_section = current_section.prev('.section');

    if (direction === 'down' && next_section.length) {
        scrollTo(next_section.index());
    } else if (direction === 'up' && prev_section.length) {
        scrollTo(prev_section.index());
    }
};

let sendForm = function (e) {
    e.preventDefault();

    let form = $(this),
        hasError = false,
        inputs = $('input[type=text]', form);

    $.each(inputs, (inx, elem) => {
        if ($(elem).val() == '') {
            $(elem).addClass('form__fieldset-input_error')
            hasError = true;
        }
    });

    if (hasError) {
        showStatusPopup("Незаполнены обязательные поля");
        return;
    }

    sendRequest(form).done(data => {
        let message = data.message,
            status = data.status;

        if (status) {
            form[0].reset();
        }

        showStatusPopup(message);

    }).fail((jqXHR, textStatus) => {
        showStatusPopup("Неудачный запрос: " + textStatus);
    });
};

let sendRequest = form => {
    let data = form.serialize(),
        methos = form.attr('method'),
        url = form.attr('action');

    return $.ajax({
        type: methos,
        url: url,
        dataType : 'JSON',
        data: data
    })
};

let showStatusPopup = message => {
    let status_popup = $('.status-popup').addClass('popup_show'),
        container = $('.status-popup__message', status_popup);

    container.html(message);
    tooglePopupOverlay();
};

$(function () {
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        items:1,
        nav:true,
        navText: '',
        dots: false,
        navClass: ['owl-prev slider__slide-arrow slider__slide-arrow_direction_left','owl-next slider__slide-arrow slider__slide-arrow_direction_right']
    });

    $('[data-index]').on('click', function(e) {
        e.preventDefault();

        let target_index = $(this).data('index');

        resetActiveMenuItem(target_index);
        scrollTo(target_index);
    });

    $('.scroll-arrow').on('click', e => {

        let target_index = 1;

        resetActiveMenuItem(target_index);
        scrollTo(target_index);
    });

    $(document).on({
        wheel: e => {
            //console.log(e);
            let offset = e.originalEvent.deltaY,
                direction = offset > 0 ? 'down' : 'up';

            prepareToScroll(direction);
        },
        keydown: e => {
            let key = e.originalEvent.keyCode;

            switch (key) {
                case 40:
                    prepareToScroll('down');
                    break;
                case 38:
                    prepareToScroll('up');
                    break;
            }
        },
        touchmove: e => e.preventDefault()
    });

    if (isMobile) {
        $(document).swipe({
            swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
                prepareToScroll(direction === 'down' ? 'up' : 'down');
            }
        });
    }

    $('#order-form').on('submit', sendForm);

    $('input[type=text]').on('focus', function () {
        let $this = $(this)

        if ($this.hasClass('form__fieldset-input_error')) {
            $this.removeClass('form__fieldset-input_error');
        }
    });

});

ymaps.ready(init);

function init(){

    let myMap;

    myMap = new ymaps.Map("map", {
        center: [59.920322, 30.378114],
        zoom: 12,
        controls: []
    });

    myMap.behaviors.disable('scrollZoom');

    let markers = [
        {
            lat: 59.974105,
            lon: 30.309965
        },
        {
            lat: 59.946215,
            lon: 30.383092
        },
        {
            lat: 59.888209,
            lon: 30.310651
        },
        {
            lat: 59.916492,
            lon: 30.488149
        }
    ];

    $.each(markers, (inx, elem) => {
        myMap.geoObjects.add(
            new ymaps.Placemark([elem.lat, elem.lon] , {},
            {
                iconLayout: 'default#image',
                iconImageHref: './img/icons/map-marker.svg',
                iconImageSize: [45, 57],
                iconImageOffset: [-20, -47]
            })
        );
    });
}