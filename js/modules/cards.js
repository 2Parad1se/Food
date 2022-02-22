'use strict';

import getData from "../services/getData";

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
}

export default cards;