let countdownInterval;
const displayCountdownDOM = document.querySelector('.display__time-left');
const displayEndtimeDOM = document.querySelector('.display__end-time');

const buttons = document.querySelectorAll('.timer__button');


function calcCountdown(countdownSeconds) {
    // clear interval if a new one is set
    clearInterval(countdownInterval);

    const begin = Date.now();
    const till = begin + countdownSeconds * 1000;
    displayTimeTill(till);
    showCountdown(countdownSeconds);

    let seconds;

    countdownInterval = setInterval(() => {
        // in case the browser misses some of the interval function executions
        seconds = Math.round((till - Date.now()) / 1000);
        if (seconds < 0) {
            clearInterval(countdownInterval);
            return;
        }
        showCountdown(seconds);
    }, 1000);
}

function showCountdown(countdownSeconds) {
    const minutes = Math.floor(countdownSeconds / 60);
    const seconds = countdownSeconds % 60;
    const displayTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    document.title = displayTime;
    displayCountdownDOM.textContent = displayTime;

    // console.log(displayTime);
}

function displayTimeTill(timeTillSeconds) {
    const timeTill = new Date(timeTillSeconds);
    const displayTimeTill = `Be back in: ${timeTill.getHours() < 10 ? '0' : ''}${timeTill.getHours()}:${timeTill.getMinutes()}`;
    displayEndtimeDOM.textContent = displayTimeTill;
}

buttons.forEach(button => button.addEventListener('click', function (e) {
    calcCountdown(this.dataset.time);
}));

// can select form by form name if name property exists
document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    calcCountdown(this.minutes.value * 60);
});
