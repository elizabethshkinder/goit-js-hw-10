import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(form);

    const delay = Number(formData.get('delay'));
    const state = formData.get('state');

    const promise = new Promise ((resolve, reject) => {
        setTimeout(() => {
            if(state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    })

    promise
    .then(delayValue => {
        iziToast.show({
            message: `✅ Fulfilled promise in ${delayValue}ms`,
            messageColor: '#ffffff',
            position: 'topRight',
            class: 'toast-success',
        });
    })
    .catch(delayValue => {
        iziToast.show({
            message: `❌ Rejected promise in ${delayValue}ms`,
            messageColor: '#ffffff', 
            position: 'topRight',
            class: 'toast-error',
        })
    });

});


