"use strict";

// //tabs 038

window.addEventListener("DOMContentLoaded", () => {
    const tabHeaderItems = document.querySelectorAll(".tabheader__item");
    const parentTabHeaderItem = document.querySelector(".tabheader__items");
    const contents = document.querySelectorAll(".tabcontent");

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
        contents.forEach(content => {
            content.classList.add("hide");
            content.classList.remove("show", "fade");
        });

    }

    function showContent(i = 0) {
        contents[i].classList.remove("hide");
        contents[i].classList.add("show", "fade");
    }

    hideContent();
    showContent();

    //Timer 041
    const deadline = "2022-02-21";

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

    //add request
    const forms = document.querySelectorAll("form");

    const message = {
        'loading': "icons/spinner.svg",
        'succes': "Мы с вами свяжемся",
        'error': "Ошибка...",
    };

    async function postData(url, data) {
       const response = await fetch(url, {
           method: "POST",
           headers: {
               'Content-type': 'application/json'
           },
           body: data,
       });

       return await response.json();
    }

    async function getData(url) {
        const response = await fetch(url);
        // console.log(response.ok); // true (свойство показывает статус запроса)
        // console.log(response.status); //200 (свойство показывает статус запроса, числовой эквивалент)
        if (!response.ok) {
            throw new Error(`Опачки, ошибка по адресу ${url}, код ошибки: ${response.status}`);
        } //рукотворный обьект ошибки (который выскакивает в консоли)

        return await response.json();
    }

    // axios.get('http://localhost:3000/menu')
    // .then(result => { //axios возвращает более подробный ответ
    //     console.log(result); //{data: Array(3), status: 200, statusText: 'OK', headers: {…}, config: {…}, …}
    //     return result;
    // })
    // .then(result => console.log(result.data)); //[{…}, {…}, {…}]

    getData('http://localhost:3000/menu')
    .then(data => {
        data.forEach((product) => {
            new MenuCard(
                product.img,
                product.altimg,
                product.title,
                product.descr,
                product.price,
            ).render();
        });
    });
    // .catch(console.log("Сработал кетч"));

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
        openModal();

        modalDialog.append(newModalContent);
        setTimeout(() => {
            newModalContent.remove();
            prevModalContent.classList.remove('hide');
            closeModal();
        }, 3000);

    }
    
    
    //slider 001
    const slider = document.querySelector('.offer__slider');
    const wrapperSlider = document.querySelector('.offer__slider-wrapper');
    const lineSlider = document.querySelector('.offer__slides');
    const slides = document.querySelectorAll('.offer__slide');
    const controlArrows = document.querySelectorAll('.control__arrows');
    const currentSlide = document.querySelector('#current');
    const totalSlide = document.querySelector('#total');
    let numberSlide = 1;
    let offset = 0;
    const width = parseInt(window.getComputedStyle(wrapperSlider).width);
    const dots = [];

    lineSlider.style.width = 100 * slides.length + "%";

    //carousel point
    const indicator = document.createElement('ol');
    indicator.classList.add('carousel-indicators');
    slider.append(indicator);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        indicator.append(dot);
        dots.push(dot);
    }

    function dotActive(i = 1) {
        dots.forEach(dot => {
            dot.classList.remove('dot-active');
        });
        dots[i-1].classList.add('dot-active');
    }
    dotActive(1);

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showSlideClick(i);
        });
    });


    function showSlideClick(i) {
        lineSlider.style.transform = `translateX(-${i * width}px)`;
        currentSlide.textContent = getZero(i + 1);
        totalSlide.textContent = getZero(slides.length);
        dotActive(i + 1);
    }

    function setNumberSlide(par = 0) {
        numberSlide += par;
        if (numberSlide == 0) {
            numberSlide = slides.length;
        } else if (numberSlide > slides.length) {
            numberSlide = 1;
        }
        currentSlide.textContent = getZero(numberSlide);
        totalSlide.textContent = getZero(slides.length);
        dotActive(numberSlide);
    }
    setNumberSlide();

    function controlOffset(widthElem, numSlide) {
        offset += widthElem;
        if (offset < 0 ) {
            offset = width * (slides.length - 1);
        } else if (offset > width * (slides.length - 1)) {
            offset = 0;
        }
        console.log(offset);
        lineSlider.style.transform = `translateX(-${offset}px)`;
        setNumberSlide(numSlide);
    }

    // setInterval(controlOffset, 3000, width, 1);

    controlArrows.forEach(arrow => {
        arrow.addEventListener('click', (e) => {
            if (e.target.classList.contains('offer__slider-prev')) {
                controlOffset(-width, -1);
            } else if (e.target.classList.contains('offer__slider-next')) {
                controlOffset(width, 1);
            }
        });
    });

    //calc
    let gender, height, weight, age, ratio;
    const calcResult = document.querySelector('.calculating__result span');  
    const allInput = document.querySelectorAll('.calculating__choose_medium input');
    // console.log(gender, ratio);

    function checkLocalStorage(id) {
        if (localStorage.getItem('gender')) {
            gender = localStorage.getItem('gender');
        } else {
            gender = 'female';
            localStorage.setItem('gender', gender);
        }
        if (localStorage.getItem('ratio')) {
            ratio = localStorage.getItem('ratio');
        } else {
            ratio = '1.375';
            localStorage.setItem('ratio', ratio);
        }
        const parent = document.querySelectorAll(`#${id} div`);
        parent.forEach(item => {
            item.classList.remove('calculating__choose-item_active');
            if (item.getAttribute(`data-${id}`) === localStorage.getItem(`${id}`)) {
                item.classList.add('calculating__choose-item_active');
            }
        });
    }

  
    checkLocalStorage('gender');
    // console.log(gender);
    checkLocalStorage('ratio');
    // console.log(gender, ratio);

    allInput.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.match(/\D/ig)) {
                input.style.border = '10px solid red';
            } else {
                input.style.border = 'none';
            }
            height = document.querySelector('#height').value;
            weight = document.querySelector('#weight').value;
            age = document.querySelector('#age').value;
            calcCalories(gender, height, weight, age, ratio);
        });
        
    });
    // function showErrorInput(input) { //Фокус не удался
    //     if (input.value.match(/\D/ig)) {
    //         input.classList.add('error_input');
    //     } else {
    //         input.classList.remove('error_input');
    //     }
    // }

    function getDataPassiveForm(id) {
        const parent = document.querySelectorAll(`#${id} div`);
        parent.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-gender')) {
                    gender = e.target.getAttribute('data-gender');
                    localStorage.setItem('gender', e.target.getAttribute('data-gender'));
                } else {
                    ratio = e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', e.target.getAttribute('data-ratio'));
                }
                parent.forEach(item => {
                    item.classList.remove('calculating__choose-item_active');
                });
            e.target.classList.add('calculating__choose-item_active');
            calcCalories(gender, height, weight, age, ratio);
            // console.log(gender, ratio);
            });
        });
    }
    getDataPassiveForm('gender');
    getDataPassiveForm('ratio');

    function calcCalories(gender, height, weight, age, ratio) {
        console.log(gender, height, weight, age, ratio);
        if (gender && +height && +weight && +age && ratio) {
            if (gender == 'male') {
                calcResult.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
                return;
            } else {
                calcResult.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
                return;
            }
        } else {
            calcResult.textContent = '_____';
            return;
        }
    }
    calcCalories(gender, height, weight, age, ratio);



    


});