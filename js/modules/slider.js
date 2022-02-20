function slider() {
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
}

module.exports = slider;