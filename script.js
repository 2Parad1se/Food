"use strict";

//tabs 038

window.addEventListener("DOMContentLoaded", () => {
    const tabHeaderItems = document.querySelectorAll(".tabheader__item");
    const parentTabHeaderItem = document.querySelector(".tabheader__items");
    const content = document.querySelectorAll(".tabcontent");

    parentTabHeaderItem.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target && e.target.matches("div.tabheader__item")) {
            tabHeaderItems.forEach((item, i) => {
                item.classList.remove("tabheader__item_active");
                if (e.target == item) {
                    hideContent();
                    showContent(i);
                }
            });
            e.target.classList.add("tabheader__item_active");

        }
    });

    function hideContent() {
        content.forEach(item => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });

    }

    function showContent(i = 0) {
        content[i].classList.remove("hide");
        content[i].classList.add("show", "fade");

    }

    hideContent();
    showContent();

    //Timer 041

    const deadline = "2022-02-09";


    function getTime() {
        let total = Date.parse(deadline) - Date.parse(new Date());
        let days = Math.floor(total / (1000 * 60 * 60 * 24));
        let hours = Math.floor(total / (1000 * 60 * 60) % 24);
        let minutes = Math.floor(total / (1000 * 60) % 60);
        let seconds = Math.floor((total / 1000) % 60);
        // console.log(days, hours, minutes, seconds);

        return {
            "total": total,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds,
        };
    }
    const endID = setInterval(setClock, 1000);
    setClock(); //чтобы не было задержки 1с перед первым вызовом

    function setClock() {


        const daysClock = document.querySelector("#days");
        const hoursClock = document.querySelector("#hours");
        const minutesClock = document.querySelector("#minutes");
        const secondClock = document.querySelector("#seconds");
        let getTimer = getTime();
        if (getTimer.total <= 0) {
            clearInterval(endID);
            daysClock.textContent = "00";
            hoursClock.textContent = "00";
            minutesClock.textContent = "00";
            secondClock.textContent = "00";
        } else {
            daysClock.textContent = getZero(getTimer.days);
            hoursClock.textContent = getZero(getTimer.hours);
            minutesClock.textContent = getZero(getTimer.minutes);
            secondClock.textContent = getZero(getTimer.seconds);
        }

    }

    function getZero(par) {
        if (par >= 0 && par < 10) {
            return `0${par}`;
        } else {
            return par;
        }
    }

    

    //Modal window
    const modalOpen = document.querySelectorAll(".open_modal");
    const modalClose = document.querySelector(".modal__close");
    const modalWindow = document.querySelector(".modal");

    modalOpen.forEach(item => {
        item.addEventListener("click", (e) => {
            openModal();
        });
    });

    modalClose.addEventListener("click", (e) => {
        closeModal();
    });

    modalWindow.addEventListener("click", (e) => {
        if (e.target == modalWindow) {
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

    //modification modal window

    // const modalTimerID = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll); //удаляем обработчик, если он уже срабатывал
        }

    }

    // window.addEventListener("scroll", showModalByScroll);

    //add Class 048
    class MenuCard {
        constructor (src, alt, title, text, price, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.text = text;
            this.price = price;
            this.exchangeRates = 79;
            this.classes = classes;
            this.convertToRubles();
        }

        convertToRubles() {
            this.price = this.price * this.exchangeRates;
        }

        render() {
            const container = document.querySelector(".container_menu");
            const element = document.createElement("div");
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.text}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
            `;
            if (this.classes.length == 0) {
                this.classes.push("menu__item");
            } 
            this.classes.forEach(item => {
                element.classList.add(item);
            });
            container.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        70,
        "menu__item",
        "123",
        "312",
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        100,
        "menu__item",
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        55,
        
    ).render();

    //add request
    const forms = document.querySelectorAll("form");

    const message = {
        'loading': "Идет загрузка...",
        'succes': "Мы с вами свяжемся",
        'error': "Ошибка...",
    };

    forms.forEach(item => {
        item.addEventListener("submit", (e) => {
            e.preventDefault();

            const div = document.createElement('div');
            item.append(div);
            const request = new XMLHttpRequest();
            request.open("POST", "server.php");
            request.setRequestHeader("Content-type", "application/json");
            const data = new FormData(item); //специфический обьект, который собирает все данные с формы
            
            //для отправки данных на сервер в формате json 
            const obj = {};
            data.forEach((item, i) => {
                console.log(item, i, arr);  //qweqweq name FormData {}, 12312321 phone FormData {}
                obj[i] = item;
            });
            const json = JSON.stringify(obj);

            request.send(json);
            div.textContent = message.loading;

            request.addEventListener("load", () =>{
                if (request.status === 200) {
                    console.log(request.response);
                    div.textContent = message.succes;
                    item.reset();
                    setTimeout(() => {
                        div.remove();
                    }, 2000);
                } else {
                    div.textContent = message.error;
                }
            });
        });
    });
    

});