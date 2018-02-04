var burger_link = document.getElementsByClassName('burger-link')[0],
    team_acrd = document.getElementsByClassName('team-list__item'),
    menu_acrd = document.getElementsByClassName('menu-list__item');

burger_link.addEventListener('click', function (e) {
    e.preventDefault();

    toggleShowHidElementStyle();

    toggleElementClass(this);
});

function toggleShowHidElementStyle() {
    if (document.querySelector('.overlay').style.display == 'none' || document.querySelector('.overlay').style.display == '') {
        document.querySelector('.overlay').style.display = 'block';
        document.querySelector('.close-fixed-menu').style.display = 'block';
        document.querySelector('.order-link').style.display = 'none';
    } else {
        document.querySelector('.overlay').style.display = 'none';
        document.querySelector('.close-fixed-menu').style.display = 'none';
        document.querySelector('.order-link').style.display = 'block';
    }

}

function toggleElementClass($this) {
    $this.classList.toggle('burger-link_change');
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