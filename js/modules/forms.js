'use strict';

import { openModal, closeModal } from "./modal";
import postData from '../services/postData';

function forms(modalTimerID) {
    const forms = document.querySelectorAll("form");

    const message = {
        'loading': "icons/spinner.svg",
        'succes': "Мы с вами свяжемся",
        'error': "Ошибка...",
    };

    forms.forEach(form => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const spinner = document.createElement("img");
            spinner.src = message.loading;
            spinner.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', spinner); //вставляем после формы, чтобы верстка не ехала

            const data = new FormData(form);  //специфический обьект, который собирает все данные с формы
            // const obj = {};
            // data.forEach((value, key) => {
            //     // console.log(value, key);  //qweqweq name FormData {}, 12312321 phone FormData {}
            //     obj[key] = value;
            // });
            const json = JSON.stringify(Object.fromEntries(data.entries()));

                

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showNewModal(message.succes);
            }).catch(() => {
                showNewModal(message.error);
            }).finally(() => {
                form.reset();
                spinner.remove();
            });



        });
    });
    
    //request modifier 054
    function showNewModal(message) {
        const modalDialog = document.querySelector(".modal__dialog");
        const prevModalContent = document.querySelector('.modal__content');
        const newModalContent = document.createElement("div");
        
        prevModalContent.classList.add("hide");

        newModalContent.innerHTML = `
        <div class="modal__content">
        <div class="modal__close">&times;</div>
            <p>${message}</p>
        </div>
        `;
        openModal(".modal", modalTimerID);

        modalDialog.append(newModalContent);
        setTimeout(() => {
            newModalContent.remove();
            prevModalContent.classList.remove('hide');
            closeModal(".modal");
        }, 3000);

    }
}

export default forms;