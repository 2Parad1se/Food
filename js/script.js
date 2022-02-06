"use strict";

//tabs 038

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

    //Timer 041

    const deadline = "2022-02-07";
    

    function getTime() {
        let total = Date.parse(deadline) - Date.parse(new Date());
        let days = Math.floor(total / (1000 * 60 * 60 * 24));
        let hours = Math.floor(total / (1000 * 60 * 60) % 24);
        let minutes = Math.floor(total / (1000 * 60) % 60);
        let seconds = Math.floor((total / 1000) % 60);
        // console.log(days, hours, minutes, seconds);
        
        return {
            "total": total,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds,
        };
    }
    setClock(); //чтобы не было задержки 1с перед первым вызовом

    function setClock() {
        

        const daysClock = document.querySelector("#days");
        const hoursClock = document.querySelector("#hours");
        const minutesClock = document.querySelector("#minutes");
        const secondClock = document.querySelector("#seconds");
        let getTimer = getTime();
        daysClock.textContent = getZero(getTimer.days);
        hoursClock.textContent = getZero(getTimer.hours);
        minutesClock.textContent = getZero(getTimer.minutes);
        secondClock.textContent = getZero(getTimer.seconds);
        if (getTimer.total <= 0){
            clearInterval(endID);
        }

    }

    function getZero(par){
        if (par >= 0 && par < 10) {
            return `0${par}`;
        } else {
            return par;
        }
    }
    
    const endID = setInterval(setClock, 1000);

    //Modal window
    const modalOpen = document.querySelectorAll(".open_modal");
    const modalClose = document.querySelector(".modal__close");
    const modalWindow = document.querySelector(".modal");

    modalOpen.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            openModal(); //отменяет прокрутку страницы
        });
    });

    modalClose.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal();
    });

    modalWindow.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target == modalWindow) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        e.preventDefault();
        if (e.code === "Escape") {
            closeModal();
            
        }
        console.log(e.code);
    });

    function openModal(){
        modalWindow.classList.remove("hide");
        modalWindow.classList.add("show");
        document.body.style.overflow = "hidden";
    }

    function closeModal(){
        modalWindow.classList.remove("show");
        modalWindow.classList.add("hide");
        document.body.style.overflow = "";
    }

});

