
addEventListener('load', loadPage);


function loadPage(e) {
    var first_div = document.createElement('div');

    document.body.appendChild(first_div);
    document.getElementsByTagName('div')[0].innerHTML = 'Этот элемент создан при помощи DOM API';

    var second_div = document.createElement('div');

    second_div.setAttribute('class', 'inner');
    second_div.innerHTML = 'Этот элемент тоже создан при помощи DOM API'

    document.getElementsByTagName('div')[0].appendChild(second_div);

    second_div.style = 'color: red;';

    first_div.addEventListener('click', function (e) {
        console.log('Этот текст говорит о том, что я всё сделал правильно');
    });

    var link = document.createElement('a');

    link.innerHTML = 'Ссылка';
    link.setAttribute('href', 'https://loftschool.com/');
    link.addEventListener('click', function (e) {
        e.preventDefault();

        console.log('Я кликнул на ссылку ' + this.getAttribute('href'));
    });

    document.body.appendChild(link);

    var input = document.createElement('input'),
        button = document.createElement('button');

    button.addEventListener('click', function (e) {
        e.preventDefault();

        console.log('Вы ввели : ' + document.getElementsByTagName('input')[0].value);
    });

    document.body.appendChild(input);
    document.body.appendChild(button);
}
