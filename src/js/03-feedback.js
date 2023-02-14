// 1--Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, в которых сохраняй текущие значения полей формы. Пусть ключом для хранилища будет строка "feedback-form-state". +
// 2--При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы. В противном случае поля должны быть пустыми. +
// 3--При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями в консоль.
// 4--Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. Для этого добавь в проект и используй библиотеку lodash.throttle.

import throttle from 'lodash.throttle';

const STORAGE_KEY = "feedback-form-state";

// обьект для хранения данных
const formData = {
    email: "",
    message: "",
}
const refs = {
    form: document.querySelector(".feedback-form"),
    input: document.querySelector(".feedback-form input"),
    textarea: document.querySelector(".feedback-form textarea")
};

refs.form.addEventListener("input", throttle(onFormChange, 500));
refs.form.addEventListener('submit', onFormSubmit);

// ф-ция срабатывает при перезагрузке страницы
onLoadPage();


function onFormChange(event) {
// получает значение поля для соответствующего атрибута name
   formData[event.target.name] = event.target.value;
   console.log('formData', formData);
// создает обьект с ключем в localStorage и приводит его к строке в формате JSON
   localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

function onLoadPage() {
// получаем обьект с ключем
   const savedData = localStorage.getItem(STORAGE_KEY);
// проверяет есть ли созданный обьект в localStorage
   if(savedData) {
// распарсивает обьект из формата JSON
    const parsedData = JSON.parse(savedData);
    console.log('parsedData before submit', parsedData);
// записывает поля формы из соответсутвующего атрибута name
    refs.input.value = parsedData.email;
    refs.textarea.value = parsedData.message;
   }
};

function onFormSubmit(event) {
// сброс параметров по умолчанию
    event.preventDefault();
    console.log('submit form');
// сброс текущей цели
    event.currentTarget.reset();
// получает обьект после события Submit и распарсивает его из формата JSON
    const savedData = localStorage.getItem(STORAGE_KEY);
    const parsedData = JSON.parse(savedData);
    console.log('parsedData after Submit',parsedData);
// удаляет обьект с ключем из localStorage
    localStorage.removeItem(STORAGE_KEY);
};
