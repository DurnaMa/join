function validateForm() {
  const titleInput = document.getElementById('titleInput');
  const dateInput = document.getElementById('date');
  const categoryDropdown = document.getElementById('dropdownCategory');
  const descriptionTextarea = document.getElementById('descriptionTextarea');
  const assignedContactsList = document.getElementById('assignedContactsList');

  const titleError = document.getElementById('titleError');
  const dateError = document.getElementById('dateError');
  const categoryError = document.getElementById('categoryError');
  const descriptionTextareaError = document.getElementById('descriptionTextareaError');
  const assignedContactsListError = document.getElementById('assignedContactsListError');

  let isValid = true;

  titleError.textContent = '';
  dateError.textContent = '';
  categoryError.textContent = '';
  descriptionTextareaError.textContent = '';
  assignedContactsListError.textContent = '';

  if (!titleInput.value.trim()) {
    isValid = false;
    titleError.textContent = 'Title is required.';
  }

  if (!dateInput.value.trim()) {
    isValid = false;
    dateError.textContent = 'Due Date is required.';
  } 

  if (!descriptionTextarea.value.trim()) {
    isValid = false;
    descriptionTextareaError.textContent = 'Description is required.';
  }

  if (categoryDropdown.textContent.trim() === 'Select Task Category' || !categoryDropdown.textContent.trim()) {
    isValid = false;
    categoryError.textContent = 'Category is required.';
  }

  if (assignedContactsList.textContent.trim() === 'Assigned Contacts' || !assignedContactsList.textContent.trim()) {
    isValid = false;
    assignedContactsListError.textContent = 'Category is required.';
  }

  return isValid;
}
