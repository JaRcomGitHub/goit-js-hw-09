
const buttonStartEl = document.querySelector('[data-start]');
const buttonStopEl = document.querySelector('[data-stop]');

buttonStartEl.addEventListener('click', intervalStart);
buttonStopEl.addEventListener('click', intervalStop);

let intervalId = null;

buttonStopEl.disabled = true;

function intervalStart() {
    if (!intervalId) {
        changeBodyBgnColor();
        intervalId = setInterval(changeBodyBgnColor, 1000);
        buttonStartEl.disabled = true;
        buttonStopEl.disabled = false;
        // console.log('start');
    } 
}

function intervalStop() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        buttonStartEl.disabled = false;
        buttonStopEl.disabled = true;
        // console.log('stop');
    }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBodyBgnColor() {
    document.body.style.backgroundColor = getRandomHexColor();
}
