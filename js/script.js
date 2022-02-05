"use strict";

window.addEventListener("DOMContentLoaded", () => {
    const tabHeaderItems = document.querySelectorAll(".tabheader__item");
    const parentTabHeaderItem = document.querySelector(".tabheader__items");
    const content = document.querySelectorAll(".tabcontent");

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
        content.forEach(item => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });

    }
    function showContent(i = 0) {
        content[i].classList.remove("hide");
        content[i].classList.add("show", "fade");
 
    }

    hideContent();
    showContent();
});
