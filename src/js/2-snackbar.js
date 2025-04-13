import iziToast from 'izitoast';

const form = document.querySelector('.js-form');
// console.dir(form);

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = form.elements.delay.value;
  const state = form.elements.state.value;

  form.reset(); // очищаем форму после нажатия на submit

  createNotificationPromise(delay, state)
    .then(result => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#59A10D',
        theme: 'dark',
        timeout: 3000,
      });
    })
    .catch(error => {
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#EF4040',
        theme: 'dark',
        timeout: 3000,
      });
    });
});

const createNotificationPromise = (delay, state) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay); // передаём задержку
      } else {
        reject(delay); // передаём задержку как "ошибку"
      }
    }, delay);
  });
};
