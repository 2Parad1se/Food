'use strict';

// const modalOpen = document.querySelectorAll(".open_modal"); //triggerSelector
// const modalWindow = document.querySelector(".modal"); //modalSelector

function openModal(modalSelector, modalTimerID) {
    const modalWindow = document.querySelector(`${modalSelector}`);
    modalWindow.classList.remove("hide");
    modalWindow.classList.add("show");
    document.body.style.overflow = "hidden"; //отменяет прокрутку страницы
    if (modalTimerID) {
        clearInterval(modalTimerID);
    }
    
}

function closeModal(modalSelector) {
    const modalWindow = document.querySelector(`${modalSelector}`);
    modalWindow.classList.remove("show");
    modalWindow.classList.add("hide");
    document.body.style.overflow = "";
}

function modal(modalSelector, triggerSelector, modalTimerID) {
    const modalWindow = document.querySelector(`${modalSelector}`);
    const modalOpen = document.querySelectorAll(`${triggerSelector}`);

    modalOpen.forEach(item => {
        item.addEventListener("click", () => {
            openModal(".modal", modalTimerID);
        });
    });

    modalWindow.addEventListener("click", (e) => {
        if (e.target == modalWindow || e.target.classList.contains("modal__close")) {
            closeModal(".modal");
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape") { //отслеживает нажатие клавиатуры, если Esc закрывает модальное окно
            closeModal(".modal");
        }
    });

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(".modal", modalTimerID);
            window.removeEventListener("scroll", showModalByScroll); //удаляем обработчик, если он уже срабатывал
        }

    }
    // window.addEventListener("scroll", showModalByScroll);
}

export default modal;
export {openModal, closeModal};