"use strict";

import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import { openModal } from './modules/modal';


window.addEventListener("DOMContentLoaded", () => {
    const modalTimerID = setTimeout(() => openModal(".modal", modalTimerID), 500000);

    calc();
    cards();
    forms(modalTimerID);
    tabs(".tabheader__items", ".tabheader__item", ".tabcontent", "tabheader__item_active");
    timer('.timer', "2022-02-28");
    slider({
        controlArrowsSelector: '.control__arrows',
        currentSlideSelector: '#current',
        totalSlideSelector: '#total',
        wrapperSliderSelector: '.offer__slider-wrapper',
        lineSlidesSelector: '.offer__slides',
        slidesSelector: '.offer__slide',
    });
    modal(".modal", ".open_modal", modalTimerID);

});

