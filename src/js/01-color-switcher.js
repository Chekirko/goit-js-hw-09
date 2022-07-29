const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

let btnStatus = true;

function onStartBtnClick() {
  if (btnStatus) {
    console.log('start');
    btnStatus = false;
    return (intervalId = setInterval(() => {
      refs.body.style.backgroundColor = `${getRandomHexColor()}`;
    }, 1000));
  }
}

function onStopBtnClick() {
  console.log('stop');
  clearInterval(intervalId);
  btnStatus = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
