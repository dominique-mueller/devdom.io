/**
 * Constants
 */
const mediaQueryBreakpoint = '(min-width: 768px)';

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
 * Initialize mobile navigation
 *
 * NOTES:
 * - With the exception of focusable elements (generic), elements are being referenced and retrieved using data attributes, thus working
 *   independently from classes meant for styling purposes only
 * - Event listeners will be removed as soon as possible in order to achieve optimal performance (#perfmatters)
 * - The button that toggles the visibility of the navigation receives an according label (using "aria-label") depending on the action that
 *   a click will result in, as well as a state (using "aria-expanded")
 *   See <https://www.a11ymatters.com/pattern/mobile-nav#using-aria-attributes-for-the-toggle-element>
 * - While the navigation is visible, the focus gets trapped within the navigation area (meaning tabbing outside at the end will move the
 *   focus to the first element and tabbing outside at the beginning will move the focus to the last element)
 *   See <https://www.w3.org/TR/wai-aria-practices/#keyboard-interaction-7>
 *   Implementation inspired by <https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element>
 * - While the navigation is visible, hitting "Esc" will close the navigation
 *   See <https://www.w3.org/TR/wai-aria-practices/#keyboard-interaction-7>
 * - While the navigation is visible, navigating the page through assistive technologies gets trapped within the navigation area, using
 *   ("aria-hidden" on outside elements)
 * - While the navigation is visible, clicking on the backdrop element will close the navigation (not available to assistive technologies)
 */
const initMobileNavigation = () => {
  // Navigation elements
  const navigationElement = window.document.querySelector('[data-navigation-id="navigation"]');
  const buttonElement = window.document.querySelector('[data-navigation-id="button"]');
  const listElement = window.document.querySelector('[data-navigation-id="list"]');
  const backdropElement = window.document.querySelector('[data-navigation-id="backdrop"]');
  const outsideElements = window.document.querySelectorAll('[data-navigation-id="outside"]');

  // Focusable elements within navigation
  const focusableElements = navigationElement.querySelectorAll('a, button');
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

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
    outsideElements.forEach((outsideElement) => {
      outsideElement.removeAttribute('aria-hidden');
    });

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
    outsideElements.forEach((outsideElement) => {
      outsideElement.setAttribute('aria-hidden', booleanToString(true));
    });

    // Setup event listeners
    backdropElement.addEventListener('click', backdropElementClickEventHandler);
    window.document.addEventListener('keydown', windowKeydownEventHandler);
  };

  // Event handler: Close navigation when clicking on backdrop element
  const backdropElementClickEventHandler = () => {
    closeNavigation();
  };

  // Event handler: Close navigation when hitting "Esc" key, and trap focus within navigation
  const windowKeydownEventHandler = (event) => {
    if (event.key === 'Escape') {
      closeNavigation();
    }
    if (event.key === 'Tab' && !event.shiftKey && window.document.activeElement === lastFocusableElement) {
      firstFocusableElement.focus();
      event.preventDefault();
    }
    if (event.key === 'Tab' && event.shiftKey && window.document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus();
      event.preventDefault();
    }
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
