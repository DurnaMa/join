/**
 * Validates the form fields and displays error messages for invalid inputs.
 *
 * This function checks if the required form fields are filled in correctly. If a field is empty,
 * it adds an error message and applies a visual error indicator. If all fields are valid,
 * the function returns `true`; otherwise, it returns `false`.
 *
 * Validated fields:
 * - `#titleInput`: Task title (required)
 * - `#date`: Due date (required)
 * - `.categoryContainer`: Task category dropdown (required, must not be "Select Task Category")
 * - `#descriptionTextarea`: Task description (required)
 *
 * @function validateForm
 * @returns {boolean} `true` if all fields are valid, otherwise `false`.
 */
function validateField(inputId, errorId, message) {
  let isValid = true;
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  error.textContent = '';
  if (!input.value.trim()) {
    input.classList.add('error');
    error.textContent = message;
    isValid = false;
  }
  input.addEventListener('input', () => {
    if (input.value.trim()) {
      input.classList.remove('error');
      error.textContent = '';
    }
  });
  return isValid;
}

/**
 * Validates the selected category from the category dropdown.
 * 
 * This function:
 * - Clears any previous error message in the `#categoryError` element.
 * - Checks if the currently selected category (text content of `#dropdownCategory`) 
 *   is one of the predefined valid categories (`'Technical Task'`, `'User Story'`).
 * - Calls `ifValidationCategory()` to handle additional visual validation (e.g., styling or messaging).
 * 
 * @function validateCategory
 * @returns {boolean} `true` if the selected category is valid, otherwise `false`.
 */
function validateCategory() {
  const categoryDropdown = document.getElementById('dropdownCategory');
  const categoryError = document.getElementById('categoryError');
  categoryError.textContent = '';
  const validCategories = ['Technical Task', 'User Story'];

  ifValidationCategory(validCategories, categoryDropdown, categoryError);
  return validCategories.includes(categoryDropdown.textContent.trim());
}

/**
 * Applies visual feedback for invalid category selection and clears it on valid user interaction.
 * 
 * This function:
 * - Checks whether the selected category (from `categoryDropdown`) is included in the provided `validCategories` array.
 * - If not valid, it visually marks the category dropdown container with a red border and displays an error message.
 * - Adds a click event listener that removes the red border and error message once a valid category is selected.
 * 
 * @function ifValidationCategory
 * @param {string[]} validCategories - An array of valid category names.
 * @param {HTMLElement} categoryDropdown - The DOM element displaying the selected category.
 * @param {HTMLElement} categoryError - The DOM element where the error message should be shown.
 */
function ifValidationCategory(validCategories, categoryDropdown, categoryError) {
  if (!validCategories.includes(categoryDropdown.textContent.trim())) {
    categoryDropdown.parentElement.style.border = '2px solid red';
    categoryError.textContent = 'Valid category is required.';
  } else {
    categoryDropdown.parentElement.style.border = '';
  }

  categoryDropdown.parentElement.addEventListener('click', () => {
    if (validCategories.includes(categoryDropdown.textContent.trim())) {
      categoryDropdown.parentElement.style.border = '';
      categoryError.textContent = '';
    }
  });
}

/**
 * Validates the task form by checking required fields and category selection.
 * 
 * This function uses `validateField()` to check if the following fields are filled:
 * - Title (`#titleInput`)
 * - Due date (`#date`)
 * - Description (`#descriptionTextarea`)
 * 
 * It also validates the category selection using `validateCategory()`.
 * 
 * The function uses bitwise AND (`&=`) to accumulate validation results.  
 * It returns `true` only if all validations pass.
 * 
 * @function validateForm
 * @returns {boolean} `true` if all required fields are valid, otherwise `false`.
 */
function validateForm() {
  let isValid = true;
  isValid &= validateField('titleInput', 'titleError', 'Title is required.');
  isValid &= validateField('date', 'dateError', 'Due Date is required.');
  isValid &= validateField('descriptionTextarea', 'descriptionTextareaError', 'Description is required.');
  isValid &= validateCategory();
  return !!isValid;
}