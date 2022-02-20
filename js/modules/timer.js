function timer() {
    //Timer 041
    const deadline = "2022-02-21";

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
    const endID = setInterval(setClock, 1000);
    setClock(); //чтобы не было задержки 1с перед первым вызовом

    function setClock() {
        const daysClock = document.querySelector("#days");
        const hoursClock = document.querySelector("#hours");
        const minutesClock = document.querySelector("#minutes");
        const secondClock = document.querySelector("#seconds");
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
    function getZero(par) {
        if (par >= 0 && par < 10) {
            return `0${par}`;
        } else {
            return par;
        }
    }
}

module.exports = timer;