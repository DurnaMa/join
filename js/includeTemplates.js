/**
 * Asynchronously includes HTML content into elements with the attribute `w3-include-html`.
 * 
 * This function searches for all elements in the document that have the `w3-include-html` attribute.
 * For each element, it fetches the HTML content from the file specified in the attribute's value
 * and inserts the fetched content into the element's innerHTML. If the fetch fails, it sets the
 * innerHTML to "Page not found".
 * 
 * After including the HTML content, it calls the following functions:
 * - `headerinitials()`: Initializes the header content.
 * - `headerInitialsMobile()`: Initializes the mobile header content.
 * - `highlightNavItem()`: Highlights the current navigation item.
 * 
 * @async
 * @function includeHTML
 * @returns {Promise<void>} A promise that resolves when all HTML content has been included and
 *                          the subsequent functions have been executed.
 */
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
  headerinitials();
  headerInitialsMobile();
  highlightNavItem();
}

includeHTML();

/**
 * Updates the text content of an HTML element with the ID "initials" 
 * to display the user's initials stored in sessionStorage.
 * If the element is not found, logs an error to the console.
 *
 * The function retrieves the initials from sessionStorage using the key "userInitials".
 * If no initials are found, it defaults to an empty string.
 * A delay of 50 milliseconds is applied before attempting to update the element.
 */
function headerinitials() {
  const initials = sessionStorage.getItem("userInitials") || "";
  setTimeout(() => {
    const initialsElement = document.getElementById("initials");
    if (initialsElement) {
      initialsElement.textContent = initials;
    } else {
      console.error("Fehler.");
    }
  }, 50);
}

/**
 * Updates the text content of the mobile header initials element with the user's initials
 * stored in sessionStorage. If the element is not found, logs an error to the console.
 *
 * The function retrieves the "userInitials" value from sessionStorage and sets it as the
 * text content of the element with the ID "initialsMobile" after a short delay.
 */
function headerInitialsMobile() {
  const initials = sessionStorage.getItem("userInitials") || "";
  setTimeout(() => {
    const initialsElement = document.getElementById("initialsMobile");
    if (initialsElement) {
      initialsElement.textContent = initials;
    } else {
      console.error("Fehler.");
    }
  }, 50);
}
