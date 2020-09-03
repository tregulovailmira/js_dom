'use strict'

/*1) Вывод содержимого инпута через алерт или лог.*/
const input = document.querySelector('form > input');
console.log(input.value);

/*2) По нажатию на кнопку изменить текст самой  кнопки*/
const button = document.querySelector('form > button');
button.addEventListener('click', clickHandler);
function clickHandler(event) {
    event.preventDefault();
    button.textContent = 'Thank you!';
}

/*3) Отобразить картинку. Сделать так, что бы при появлении страницы отображалсь одна картинка,
а при наведении мышью на неё отображалась другая.*/
const img = document.querySelector('img.mouseover');
img.addEventListener('mouseover', mouseoverHandler);
img.addEventListener('mouseout', mouseoutHandler);
function mouseoverHandler(event) {
    event.preventDefault();
    img.src = 'https://tantour.vn.ua/wp-content/uploads/2019/05/greece_.jpg';
}

function mouseoutHandler(event) {
    event.preventDefault();
    img.src = 'https://picua.org/images/2020/04/17/84bdc84e40a93700d4c858df70d1a86a.jpg';
}