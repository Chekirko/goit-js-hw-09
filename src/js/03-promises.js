import Notiflix from 'notiflix';

const refs = {
  delay: document.querySelector('input[name=delay]'),
  step: document.querySelector('input[name=step]'),
  amount: document.querySelector('input[name=amount]'),
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  const userAmount = refs.amount.value;
  const userDelay = refs.delay.value;
  const userStep = refs.step.value;
  let newDelay = Number(userDelay);
  for (let i = 1; i <= userAmount; i += 1) {
    const position = i;
    createPromise(position, newDelay)
      .then(result => {
        Notiflix.Notify.success(`${result}`);
      })
      .catch(error => {
        Notiflix.Notify.failure(`${error}`);
      });
    newDelay += Number(userStep);
  }
  evt.target.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
