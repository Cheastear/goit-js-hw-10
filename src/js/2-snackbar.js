import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
    e.preventDefault();
    const delay = form.elements['delay'].value;
    const state = form.elements['state'].value;
    
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if(state == 'fulfilled'){
                resolve(`✅ Fulfilled promise in ${delay}ms`);
            }
            else if (state == 'rejected'){
                reject(`❌ Rejected promise in ${delay}ms`);
            }
        }, delay)
    })
    
    promise
        .then(text => {
            iziToast.show({
                    message: text,
                    position: 'topRight'
                });
        })
        .catch(err => {
            iziToast.error({
                    message: err,
                    position: 'topRight'
                });
        })
    
    e.currentTarget.reset()
});