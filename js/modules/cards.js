function cards() {
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

    async function getData(url) {
        const response = await fetch(url);
        // console.log(response.ok); // true (свойство показывает статус запроса)
        // console.log(response.status); //200 (свойство показывает статус запроса, числовой эквивалент)
        if (!response.ok) {
            throw new Error(`Опачки, ошибка по адресу ${url}, код ошибки: ${response.status}`);
        } //рукотворный обьект ошибки (который выскакивает в консоли)

        return await response.json();
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

module.exports = cards;