export default (message) => {
  const root = document.querySelector('body');

  let el = document.querySelector('._error-message');
  if (el === null) {
    el = document.createElement('div');
    el.setAttribute('class', '_error-message');
    root.appendChild(el);
  } else {
    el.style.display = 'block';
  }

  el.innerHTML = `<div class="_message">${message}</div>`;

  setTimeout(() => {
    el.style.display = 'none';
    el.style.innerHTML = '';
  }, 6000)
};