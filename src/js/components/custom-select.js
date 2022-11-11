const customSelect = document.querySelector('.custom-select');

customSelect.addEventListener('click', (e) => {
  e.preventDefault();

  e.currentTarget.classList.toggle('custom-select--open');

  if (e.target.classList.contains('custom-select__item')) {
    let text = e.target.textContent;
    e.currentTarget.querySelector('.custom-select__top').textContent = text;
  }
});

// customSelect.addEventListener('focus', (e) => {
//   e.preventDefault();
//   e.currentTarget.classList.add('custom-select--open');
// });

// customSelect.addEventListener('blur', (e) => {
//   e.preventDefault();
//   e.currentTarget.classList.remove('custom-select--open');
// });
