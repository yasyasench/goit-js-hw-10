import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmitForm);

const createPromise = (delay, state) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};

function onSubmitForm(event) {
  event.preventDefault();
  const { delay, state } = event.currentTarget.elements;

  console.log(event.currentTarget.elements);
  createPromise(delay.value, state.value)
    .then(delay =>
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay} ms`,
        position: 'topRight',
        close: false,
      })
    )
    .catch(delay =>
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        close: false,
      })
    );
  event.currentTarget.reset();
}