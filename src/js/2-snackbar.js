import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
    e.preventDefault();
    const delay = form.elements['delay'].value;
    const state = form.elements['state'].value;
    if (state == 'fulfilled') {
        Promise.resolve(delay).then(e => {
            setTimeout(e => {
                iziToast.show({
                    message: `✅ Fulfilled promise in ${delay}ms`,
                    position: 'topRight'
                });
            }, delay)
        });
    }
    else if (state == 'rejected') {
        Promise.reject(delay).catch(e => {
            setTimeout(e => {
                iziToast.error({
                    message: `❌ Rejected promise in ${delay}ms`,
                    position: 'topRight'
                });
            }, delay)
        });
    }
    e.currentTarget.reset()
});