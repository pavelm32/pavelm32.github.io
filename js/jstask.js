var name = 'Павел';

document.write("Мое имя " + name + "<br>");

name = 'Сергей';

document.write("Не Мое имя " + name + "<br>");


if (10 > 7) {
    console.log("Это истено");
} else {
    console.log("Это ложно");
}

for (var i = 1; i <= 10; i++) {
    document.write("Итерация " + i + "<br>");
}

function sum(p1, p2, p3) {
    var sum_result = p1 + p2 + p3;

    return sum_result;
}

var summa = sum(10, 20, 30);

document.write("Сумма 10 + 20 + 30 = " + summa + "<br>");

summa = sum(15, 10, 24);

document.write("Сумма 15 + 10 + 24 = " + summa + "<br>");


var array = ['привет', 'loftschool'];

array.push('я изучаю', 'javascript');

console.log(array.length);

for (i = 0; i < array.length; i++) {
    console.log(array[i]);
}

var numbers = [6, 8, 89, 789, 101, 99, 67, 123, 1000, 224];

for (i = 0; i < numbers.length; i++) {
    if (numbers[i] > 100) {
        console.log(numbers[i]);
    }
}

var person = {
    'name'      : 'Павел',
    'lastName'  : 'Московец',
    'age'       : 27
};

console.log(
    'Имя : ' + person.name + "\n" +
    'Фамилия : ' + person.lastName + "\n" +
    'Возраст : ' + person.age
);

person.newprop = 'незадано';

document.write("Новое свойство: " + person.newprop + "<br>");

function hello(human) {
    return "Привет, меня зовут " + human.name + " " + human.lastName + " и мне " + human.age + " лет!";
}

var result_string = hello(person);

document.write(result_string);