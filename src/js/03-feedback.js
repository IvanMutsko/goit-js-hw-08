import { throttle } from 'lodash';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');
const formBtn = document.querySelector('button');
const LOCALSTORAGE_KEY_FORM = 'feedback-form-state';

// записуємо кожні 500мс введені дані в локалсторедж
form.addEventListener(
  'input',
  throttle(() => {
    //   шаблон локалстореджа
    const savedFormString = {
      email: email.value,
      message: message.value,
    };
    // перевід шаблона в рядок + збереження в локалсторедж
    localStorage.setItem(
      LOCALSTORAGE_KEY_FORM,
      JSON.stringify(savedFormString)
    );
  }, 500)
);

// перевірка на правильність данних при парсі
try {
  const savedFormObj = localStorage.getItem(LOCALSTORAGE_KEY_FORM);
  const parsedSavedFormObj = JSON.parse(savedFormObj);
  // перевірки на наявність даних в формі і запис зі стореджа
  if (parsedSavedFormObj.email.value !== '') {
    email.value = parsedSavedFormObj.email;
  }
  if (parsedSavedFormObj.message.value !== '') {
    message.value = parsedSavedFormObj.message;
  }
} catch (error) {
  // вивід помилок
  console.log(error.name);
  console.log(error.message);
}
// слухач кнопки
formBtn.addEventListener('click', event => {
  event.preventDefault();
  // очистка стореджа
  localStorage.removeItem(LOCALSTORAGE_KEY_FORM);
  // вивід в консоль відправлених даних
  const submitData = {
    email: email.value,
    message: message.value,
  };
  console.log('Feedback: ', submitData);
  // очистка форми
  form.reset();
});
