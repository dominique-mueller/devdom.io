/**
 * Constants
 */
const mediaQueryBreakpoint = '(min-width: 720px)';

/**
 * Utility: Format boolean value to string
 */
const booleanToString = (boolean) => {
  return boolean.toString();
};

/**
 * Utility: Retrieve boolean value from string
 */
const booleanFromString = (string) => {
  return string === booleanToString(true);
};

/**
 * Initialize mobile navigation behaviour
 */
const initMobileNavigation = () => {
  // Elements
  const rootElement = window.document.querySelector('[data-navigation-id="root"]');
  const buttonElement = window.document.querySelector('[data-navigation-id="button"]');
  const listElement = window.document.querySelector('[data-navigation-id="list"]');
  const backdropElement = window.document.querySelector('[data-navigation-id="backdrop"]');

  // State
  let isNavigationOpen = false;

  // Close navigation
  const closeNavigation = () => {
    // Update state
    isNavigationOpen = false;

    // Update DOM
    buttonElement.setAttribute('aria-expanded', booleanToString(false));
    buttonElement.setAttribute('aria-label', 'Open navigation');
    buttonElement.classList.remove('is-pressed');
    listElement.classList.remove('is-visible');
    backdropElement.classList.remove('is-visible');

    // Cleanup event listeners
    backdropElement.removeEventListener('click', backdropElementClickEventHandler);
    window.document.removeEventListener('keydown', windowKeydownEventHandler);

    // Move focus to last focused element, which is always the button
    buttonElement.focus();
  };

  // Open navigation
  const openNavigation = () => {
    // Update state
    isNavigationOpen = true;

    // Update DOM
    buttonElement.setAttribute('aria-expanded', booleanToString(true));
    buttonElement.setAttribute('aria-label', 'Close navigation');
    buttonElement.classList.add('is-pressed');
    listElement.classList.add('is-visible');
    backdropElement.classList.add('is-visible');

    // Setup event listeners
    backdropElement.addEventListener('click', backdropElementClickEventHandler);
    window.document.addEventListener('keydown', windowKeydownEventHandler);
  };

  // Event handler: Close navigation when clicking on backdrop element
  const backdropElementClickEventHandler = () => {
    closeNavigation();
  };

  // Event handler: Close navigation when hitting "Esc" key
  const windowKeydownEventHandler = (event) => {
    if (event.key !== 'Escape') {
      return;
    }
    closeNavigation();
  };

  // Event handler: Toggle navigation state when clicking on the button
  const toggleButtonElementClickEventHandler = () => {
    if (isNavigationOpen) {
      closeNavigation();
    } else {
      openNavigation();
    }
  };

  // Setup event listeners
  buttonElement.addEventListener('click', toggleButtonElementClickEventHandler);

  // Return cleanup function
  return () => {
    // Reset navigation
    closeNavigation();

    // Cleanup event listeners
    buttonElement.removeEventListener('click', toggleButtonElementClickEventHandler);
  };
};

/**
 * Main
 */
const main = () => {
  // State
  let cleanup;

  // Initially, setup mobile navigation if media query matches
  if (!window.matchMedia(mediaQueryBreakpoint).matches) {
    cleanup = initMobileNavigation();
  }

  // Then, on media query changes, setup or cleanup mobile navigation
  window.matchMedia(mediaQueryBreakpoint).addEventListener('change', (event) => {
    if (event.matches) {
      cleanup();
    } else {
      cleanup = initMobileNavigation();
    }
  });
};

// Run
main();
