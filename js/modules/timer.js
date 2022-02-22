'use strict';

function timer(timerSelector, deadline) {
    // const deadline = "2022-02-28";

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
    const endID = setInterval(() => setClock(timerSelector, deadline), 1000);
    setClock(timerSelector, deadline); //чтобы не было задержки 1с перед первым вызовом

    function setClock(timerSelector) {
        const timer = document.querySelector(timerSelector);
        const daysClock = timer.querySelector("#days");
        const hoursClock = timer.querySelector("#hours");
        const minutesClock = timer.querySelector("#minutes");
        const secondClock = timer.querySelector("#seconds");
        let getTimer = getTime();
        if (getTimer.total <= 0) {
            clearInterval(endID);
            daysClock.textContent = "00";
            hoursClock.textContent = "00";
            minutesClock.textContent = "00";
            secondClock.textContent = "00";
        } else {
            daysClock.textContent = getZero(getTimer.days);
            hoursClock.textContent = getZero(getTimer.hours);
            minutesClock.textContent = getZero(getTimer.minutes);
            secondClock.textContent = getZero(getTimer.seconds);
        }
    }

}

function getZero(par) {
    if (par >= 0 && par < 10) {
        return `0${par}`;
    } else {
        return par;
    }
}

export default timer;
export {getZero};