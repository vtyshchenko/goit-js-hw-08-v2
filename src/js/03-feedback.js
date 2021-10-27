const { throttle } = require('lodash');

const formRef = document.querySelector('.feedback-form');

loadData(formRef);

formRef.addEventListener('input', throttle(onInputData, 500));
formRef.addEventListener('submit', onSubmitData);

function loadData(form) {
  let feedback = localStorage.getItem('feedback-form-state');
  if (feedback) {
    feedback = JSON.parse(feedback);
    [...form.elements].forEach(elem => {
      if ((elem.nodeName === 'INPUT' || elem.nodeName === 'TEXTAREA') && feedback[elem.name]) {
        elem.value = feedback[elem.name];
      }
    });
  }
}

function saveData(target) {
  if (target) {
    const data = {};
    [...target.elements].forEach(elem => {
      if (elem.nodeName === 'INPUT' || elem.nodeName === 'TEXTAREA') {
        data[elem.attributes.name.value] = elem.value;
      }
    });

    localStorage.setItem('feedback-form-state', JSON.stringify(data));
  }
}

function onInputData(e) {
  if (e.currentTarget) {
    saveData(e.currentTarget);
  }
}

function onSubmitData(e) {
  e.preventDefault();
  for (const elem of [...e.currentTarget.elements]) {
    if ((elem.nodeName === 'INPUT' || elem.nodeName === 'TEXTAREA') && elem.value === '') {
      alert('Error!!! Empty fields!');
      return;
    }
  }

  saveData(e.currentTarget);
  e.currentTarget.reset();
  const data = localStorage.getItem('feedback-form-state');
  console.log(data);
}
