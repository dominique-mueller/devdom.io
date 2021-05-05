/*
 * Navigation
 */
const toggleButtonElement = document.querySelector('[data-navigation="button"]');
const navigationElement = document.querySelector('[data-navigation="navigation"]');
const backdropElement = document.querySelector('[data-navigation="backdrop"]');

const showNavigation = () => {
  toggleButtonElement.setAttribute('aria-pressed', true.toString());
  toggleButtonElement.setAttribute('aria-label', 'Close navigation');
  toggleButtonElement.classList.add('is-pressed');
  navigationElement.classList.add('is-open');
  backdropElement.classList.add('is-visible');
};

const hideNavigation = () => {
  toggleButtonElement.setAttribute('aria-pressed', false.toString());
  toggleButtonElement.setAttribute('aria-label', 'Open navigation');
  toggleButtonElement.classList.remove('is-pressed');
  navigationElement.classList.remove('is-open');
  backdropElement.classList.remove('is-visible');
};

toggleButtonElement.addEventListener('click', () => {
  const isPressed = toggleButtonElement.getAttribute('aria-pressed') === true.toString();
  if (isPressed) {
    hideNavigation();
  } else {
    showNavigation();
  }
});

backdropElement.addEventListener('click', () => {
  hideNavigation();
});
