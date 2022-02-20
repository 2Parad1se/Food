function tabs() {
    const tabHeaderItems = document.querySelectorAll(".tabheader__item");
    const parentTabHeaderItem = document.querySelector(".tabheader__items");
    const contents = document.querySelectorAll(".tabcontent");

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

module.exports = tabs;