// 1--Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, в которых сохраняй текущие значения полей формы. Пусть ключом для хранилища будет строка "feedback-form-state". +
// 2--При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы. В противном случае поля должны быть пустыми. +
// 3--При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями в консоль.
// 4--Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. Для этого добавь в проект и используй библиотеку lodash.throttle.

import throttle from 'lodash.throttle';

const STORAGE_KEY = "feedback-form-state";

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
}

const formData = {
    email: "",
    message: ""
};

refs.form.addEventListener('input', throttle(onFormChange, 500));
refs.form.addEventListener('submit', onSubmitForm);

populateData();

function onFormChange() {
    formData.email = refs.input.value;
    formData.message = refs.textarea.value,
    // console.log('formData',formData);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));

}

function populateData() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const parsedData = JSON.parse(savedData);

    if(savedData) {
    console.log(parsedData);
    refs.input.value = parsedData.email;
    refs.textarea.value = parsedData.message;
    }
};

function onSubmitForm(event) {
    console.log('submit form');
    event.preventDefault();
    event.currentTarget.reset();
    const userData = localStorage.getItem(STORAGE_KEY);
    console.log('savedData', userData)
    localStorage.removeItem(STORAGE_KEY);
    
}