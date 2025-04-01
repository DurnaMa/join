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
function validateForm() {
  const titleInput = document.getElementById('titleInput');
  const dateInput = document.getElementById('date');
  const categoryDropdown = document.querySelector('.categoryContainer');
  const descriptionTextarea = document.getElementById('descriptionTextarea');

  const titleError = document.getElementById('titleError');
  const dateError = document.getElementById('dateError');
  const categoryError = document.getElementById('categoryError');
  const descriptionTextareaError = document.getElementById('descriptionTextareaError');

  let isValid = true;

  titleError.textContent = '';
  dateError.textContent = '';
  categoryError.textContent = '';
  descriptionTextareaError.textContent = '';

  if (!titleInput.value.trim()) {
    titleInput.classList.add('error');
    titleError.textContent = 'Title is required.';
    isValid = false;
  }
  titleInput.addEventListener('input', () => {
    titleInput.classList.remove('error');
    titleError.textContent = '';
  });

  if (!dateInput.value.trim()) {
    dateInput.classList.add('error');
    dateError.textContent = 'Due Date is required.';
    isValid = false;
  }
  dateInput.addEventListener('input', () => {
    dateInput.classList.remove('error');
    dateError.textContent = '';
  });

  if (!descriptionTextarea.value.trim()) {
    descriptionTextarea.classList.add('error');
    descriptionTextareaError.textContent = 'Description is required.';
    isValid = false;
  }
  descriptionTextarea.addEventListener('input', () => {
    descriptionTextarea.classList.remove('error');
    descriptionTextareaError.textContent = '';
  });

  if (categoryDropdown.textContent.trim() === 'Select Task Category' || !categoryDropdown.textContent.trim()) {
    categoryDropdown.classList.add('error');
    categoryError.textContent = 'Category is required.';
    isValid = false;
  }
  categoryDropdown.addEventListener('input', () => {
    categoryDropdown.classList.remove('error');
    categoryError.textContent = '';
  });

  return isValid;
}
