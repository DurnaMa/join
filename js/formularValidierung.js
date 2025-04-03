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

function validateCategory() {
  const categoryDropdown = document.getElementById('dropdownCategory');
  const categoryError = document.getElementById('categoryError');
  categoryError.textContent = '';
  const validCategories = ['Technical Task', 'User Story'];

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
  return validCategories.includes(categoryDropdown.textContent.trim());
}

function validateForm() {
  let isValid = true;
  isValid &= validateField('titleInput', 'titleError', 'Title is required.');
  isValid &= validateField('date', 'dateError', 'Due Date is required.');
  isValid &= validateField('descriptionTextarea', 'descriptionTextareaError', 'Description is required.');
  isValid &= validateCategory();
  return !!isValid;
}