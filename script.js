let allSeconds = 1500;
let timerId = null;
let isTimerWorking = false;

const timerElement = document.querySelector('#pomodoro-time');
const startButton = document.querySelector('#start');
const resetButton = document.querySelector('#reset');
const pomodoroButton = document.querySelector('#pomodoro');
const breakButton = document.querySelector('#break');

function formatTime(value) {
    let minutes = Math.floor(value / 60);
    let seconds = value - (minutes * 60);

    return `${formatUnitTime(minutes)}:${formatUnitTime(seconds)}`;
}

function formatUnitTime(value) {
    if (value < 10) {
        return '0' + value;
    } else {
        return value;
    }
}

function updateTimer() {
    if (allSeconds > 0) {
        allSeconds--;
        timerElement.textContent = formatTime(allSeconds);
    } else {
        clearInterval(timerId);
        resetTimer();
    }
}

function switchTimer() {
    if (!isTimerWorking) {
        startButton.textContent = 'stop';
        timerId = setInterval(updateTimer, 1000);
        isTimerWorking = true;
    } else {
        clearInterval(timerId);
        startButton.textContent = 'start';
        isTimerWorking = false;
    }
}

function resetTimer() {
    clearInterval(timerId);
    allSeconds = 1500;
    timerElement.textContent = formatTime(allSeconds);
    startButton.textContent = 'start';
    isTimerWorking = false;
}

function setPomodoro() {
    allSeconds = 1500;
    timerElement.textContent = formatTime(allSeconds);
}

function setBreak() {
    allSeconds = 300;
    timerElement.textContent = formatTime(allSeconds);
}

function switchMode(activeButton) {
    pomodoroButton.classList.remove('active');
    breakButton.classList.remove('active');
    activeButton.classList.add('active');
}

pomodoroButton.addEventListener('click', () => {
    resetTimer();
    switchMode(pomodoroButton);
    setPomodoro();
});

breakButton.addEventListener('click', () => {
    resetTimer();
    switchMode(breakButton);
    setBreak();
});

startButton.addEventListener('click', switchTimer);
resetButton.addEventListener('click', resetTimer);