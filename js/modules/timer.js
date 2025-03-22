

function timer(id, deadline) {



    // Timer

    // різниця між дедлайном і теперішім часом

        function getTimeRemaining(endtime) {
            let days, hours, minutes, seconds;
            const t = Date.parse(endtime)- Date.parse(new Date());

            if (t <= 0) {
                days =0;
                hours = 0;
                minutes = 0;
                seconds = 0;
            } else {
                days = Math.floor(t / (1000 * 60 * 60 * 24));
                hours = Math.floor((t / (1000 * 60 * 60)) % 24);
                minutes = Math.floor((t / 1000 / 60) % 60);
                seconds = Math.floor((t / 1000 ) % 60);
            }
        
            return {
                'total' : t,
                days,
                hours,
                minutes,
                seconds
            }

        }

        function addZero(num) {
            if( num >= 0 && num < 10) {
                return `0${num}`;
            } else {
                return num;
            }
        }


        function setClock (selector, endtime) {
            const timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);

                updateClock();

                function updateClock () {
                    const t = getTimeRemaining(endtime);
                    days.innerHTML = addZero(t.days);
                    hours.innerHTML = addZero(t.hours);
                    minutes.innerHTML = addZero(t.minutes);
                    seconds.innerHTML = addZero(t.seconds);

                    if (t.total <= 0) {
                        clearInterval(timeInterval);
                    }

                }
        }


        setClock(id, deadline);
}

export default  timer;