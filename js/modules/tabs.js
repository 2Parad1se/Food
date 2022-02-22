'use strict';

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

export default tabs;