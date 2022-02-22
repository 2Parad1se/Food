'use strict';

async function getData(url) {
    const response = await fetch(url);
    // console.log(response.ok); // true (свойство показывает статус запроса)
    // console.log(response.status); //200 (свойство показывает статус запроса, числовой эквивалент)
    if (!response.ok) {
        throw new Error(`Опачки, ошибка по адресу ${url}, код ошибки: ${response.status}`);
    } //рукотворный обьект ошибки (который выскакивает в консоли)

    return await response.json();
}

export default getData;