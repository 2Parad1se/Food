/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


function calc() {
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_getData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/getData */ "./js/services/getData.js");




function cards() {
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




    (0,_services_getData__WEBPACK_IMPORTED_MODULE_0__["default"])('http://localhost:3000/menu')
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_postData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/postData */ "./js/services/postData.js");





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

                

            (0,_services_postData__WEBPACK_IMPORTED_MODULE_1__["default"])('http://localhost:3000/requests', json)
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
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(".modal", modalTimerID);

        modalDialog.append(newModalContent);
        setTimeout(() => {
            newModalContent.remove();
            prevModalContent.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal");
        }, 3000);

    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal),
/* harmony export */   "closeModal": () => (/* binding */ closeModal)
/* harmony export */ });


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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./js/modules/timer.js");




function slider({
    controlArrowsSelector, 
    currentSlideSelector, 
    totalSlideSelector, 
    wrapperSliderSelector, 
    lineSlidesSelector, 
    slidesSelector}) {
    const controlArrows = document.querySelectorAll(controlArrowsSelector); //'.control__arrows'
    const currentSlide = document.querySelector(currentSlideSelector); //'#current'
    const totalSlide = document.querySelector(totalSlideSelector); //'#total'

    const wrapperSlider = document.querySelector(wrapperSliderSelector); //'.offer__slider-wrapper'
    const lineSlides = document.querySelector(lineSlidesSelector); //'.offer__slides'
    const slides = document.querySelectorAll(slidesSelector); //'.offer__slide'

    let numberSlide = 1;
    let offset = 0;
    const width = parseInt(window.getComputedStyle(wrapperSlider).width);
    const dots = [];
    lineSlides.style.width = 100 * slides.length + "%";

    //carousel point
    const indicator = document.createElement('ol');
    indicator.classList.add('carousel-indicators');
    wrapperSlider.append(indicator);

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
        lineSlides.style.transform = `translateX(-${i * width}px)`;
        currentSlide.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(i + 1);
        totalSlide.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(slides.length);
        dotActive(i + 1);
    }

    function setNumberSlide(par = 0) {
        numberSlide += par;
        if (numberSlide == 0) {
            numberSlide = slides.length;
        } else if (numberSlide > slides.length) {
            numberSlide = 1;
        }
        currentSlide.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(numberSlide);
        totalSlide.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(slides.length);
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
        lineSlides.style.transform = `translateX(-${offset}px)`;
        setNumberSlide(numSlide);
    }

    setInterval(() => controlOffset(width, 1), 10000);

    controlArrows.forEach(arrow => {
        arrow.addEventListener('click', (e) => {
            if (e.target.classList.contains('offer__slider-prev')) {
                controlOffset(-width, -1);
            } else if (e.target.classList.contains('offer__slider-next')) {
                controlOffset(width, 1);
            }
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


function tabs(parentTabItemSelector, tabItemsSelector, contentsSelector, activeSelector) {
    const parentTabItem = document.querySelector(parentTabItemSelector); //".tabheader__items"
    const tabItems = document.querySelectorAll(tabItemsSelector); //".tabheader__item"
    const contents = document.querySelectorAll(contentsSelector); //".tabcontent"

    parentTabItem.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target && e.target.classList.contains(tabItemsSelector.slice(1))) { //"tabheader__item"
            tabItems.forEach((item, i) => {
                item.classList.remove(activeSelector); //"tabheader__item_active"
                if (e.target == item) {
                    hideContent();
                    showContent(i);
                }
            });
            e.target.classList.add(activeSelector); //"tabheader__item_active"

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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getZero": () => (/* binding */ getZero)
/* harmony export */ });


function timer(timerSelector, deadline) {
    // const deadline = "2022-02-28";

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
    const endID = setInterval(() => setClock(timerSelector, deadline), 1000);
    setClock(timerSelector, deadline); //чтобы не было задержки 1с перед первым вызовом

    function setClock(timerSelector) {
        const timer = document.querySelector(timerSelector);
        const daysClock = timer.querySelector("#days");
        const hoursClock = timer.querySelector("#hours");
        const minutesClock = timer.querySelector("#minutes");
        const secondClock = timer.querySelector("#seconds");
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

}

function getZero(par) {
    if (par >= 0 && par < 10) {
        return `0${par}`;
    } else {
        return par;
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/getData.js":
/*!********************************!*\
  !*** ./js/services/getData.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


async function getData(url) {
    const response = await fetch(url);
    // console.log(response.ok); // true (свойство показывает статус запроса)
    // console.log(response.status); //200 (свойство показывает статус запроса, числовой эквивалент)
    if (!response.ok) {
        throw new Error(`Опачки, ошибка по адресу ${url}, код ошибки: ${response.status}`);
    } //рукотворный обьект ошибки (который выскакивает в консоли)

    return await response.json();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getData);

/***/ }),

/***/ "./js/services/postData.js":
/*!*********************************!*\
  !*** ./js/services/postData.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (postData);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");












window.addEventListener("DOMContentLoaded", () => {
    const modalTimerID = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)(".modal", modalTimerID), 500000);

    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])(modalTimerID);
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])(".tabheader__items", ".tabheader__item", ".tabcontent", "tabheader__item_active");
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', "2022-02-28");
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
        controlArrowsSelector: '.control__arrows',
        currentSlideSelector: '#current',
        totalSlideSelector: '#total',
        wrapperSliderSelector: '.offer__slider-wrapper',
        lineSlidesSelector: '.offer__slides',
        slidesSelector: '.offer__slide',
    });
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])(".modal", ".open_modal", modalTimerID);

});


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map