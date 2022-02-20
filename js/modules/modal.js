function modal() {
    //Modal window
    const modalOpen = document.querySelectorAll(".open_modal");
    const modalWindow = document.querySelector(".modal");

    modalOpen.forEach(item => {
        item.addEventListener("click", () => {
            openModal();
        });
    });

    modalWindow.addEventListener("click", (e) => {
        if (e.target == modalWindow || e.target.classList.contains("modal__close")) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape") { //отслеживает нажатие клавиатуры, если Esc закрывает модальное окно
            closeModal();
        }
    });

    function openModal() {
        modalWindow.classList.remove("hide");
        modalWindow.classList.add("show");
        document.body.style.overflow = "hidden"; //отменяет прокрутку страницы
        // clearInterval(modalTimerID);
    }

    function closeModal() {
        modalWindow.classList.remove("show");
        modalWindow.classList.add("hide");
        document.body.style.overflow = "";
    }


    // const modalTimerID = setTimeout(openModal, 5000);
    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll); //удаляем обработчик, если он уже срабатывал
        }

    }
    // window.addEventListener("scroll", showModalByScroll);
}