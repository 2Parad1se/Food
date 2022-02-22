'use strict';

import { getZero } from "./timer";

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

export default slider;