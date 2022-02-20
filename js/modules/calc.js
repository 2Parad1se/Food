function calc() {
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
}

module.exports = calc;