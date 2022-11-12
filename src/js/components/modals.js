document.addEventListener('DOMContentLoaded', () => {
  const formBtn = document?.querySelector('.form__btn');
  const overlay = document?.querySelector('.modals-overlay');
  const successModal = document?.querySelector('.success');
  const emptyModal = document?.querySelector('.empty');
  const scroll = calcScroll();

  formBtn?.addEventListener('click', openModal);

  function openModal() {
    overlay?.classList.add('modals-overlay--active');
    successModal?.classList.add('success--active');
    document.body.style.overflow = 'hidden';
    document.body.style.marginRight = `${scroll}px`;

    attachModalEvents();
  }

  function openEmptyModal() {
    overlay?.classList.add('modals-overlay--active');
    emptyModal?.classList.add('empty--active');
    document.body.style.overflow = 'hidden';
    document.body.style.marginRight = `${scroll}px`;

    attachModalEvents()
  }

  function attachModalEvents() {
    successModal?.querySelector('.modals-close')?.addEventListener('click', closeModal);
    emptyModal?.querySelector('.modals-close')?.addEventListener('click', closeEmptyModal);

    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal();
        closeEmptyModal();
      }
    });
  }

  function closeModal() {
    overlay?.classList.remove('modals-overlay--active');
    successModal?.classList.remove('success--active');
    document.body.style.overflow = "";
    document.body.style.marginRight = `0px`

    detachModalEvents();
  }

  function closeEmptyModal() {
    overlay?.classList.remove('modals-overlay--active');
    emptyModal?.classList.remove('empty--active');
    document.body.style.overflow = "";
    document.body.style.marginRight = `0px`

    detachModalEvents();
  }

  function detachModalEvents() {
    successModal?.querySelector('.modals-close')?.removeEventListener('click', closeModal);
    emptyModal?.querySelector('.modals-close')?.removeEventListener('click', closeEmptyModal);

    overlay?.removeEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal();
        closeEmptyModal();
      }
    });
  }

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight -1) {
        openEmptyModal();
        window.removeEventListener('scroll', showModalByScroll);
      }
  }

  function calcScroll() {
    let div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  }

  window.addEventListener('scroll', showModalByScroll);
});


