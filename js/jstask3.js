

addEventListener('load', loadPage);


function loadPage(e) {

    const left = document.querySelector("#left");
    const right = document.querySelector("#right");
    const items = document.querySelector("#items");

    right.addEventListener("click", function (e) {
        e.preventDefault();
        // напишите здесь код, который сдвигает items на 100px вправо
        // если items уже сдвинут на 5 элементов впарво, то больше элементы сдвигать не надо, т.к. вы достигли конца списка
        var current_offset = parseInt(getComputedStyle(items)['right']);
        if ((current_offset + 100) / 100 <= 5) {
            items.style = "right: " + (current_offset + 100) + "px";
        }
    });

    left.addEventListener("click", function () {
        e.preventDefault();
        // напишите здесь код, который сдвигает items на 100px влево
        // если item находится в самом начале, то больше элементы сдвигать влево не надо, т.к. вы достигли начала списка

        var current_offset = parseInt(getComputedStyle(items)['left']);
        if ((current_offset + 100) <= 0) {
            items.style = "left: " + (current_offset + 100) + "px";
        }
    });
}