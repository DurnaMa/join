function validateForm() {
  const titleInput = document.getElementById('titleInput');
  const dateInput = document.getElementById('date');
  const categoryDropdown = document.querySelector('.categoryContainer');
  const descriptionTextarea = document.getElementById('descriptionTextarea');
  const assignedContactsList = document.querySelector('.assignedContainer');
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
    titleInput.classList.add('error');
    titleError.textContent = 'Title is required.';
    isValid = false;
  } else {
    titleInput.classList.remove('error');
  }

  if (!dateInput.value.trim()) {
    dateInput.classList.add('error');
    dateError.textContent = 'Due Date is required.';
    isValid = false;
  } else {
    dateInput.classList.remove('error');
  }

  if (!descriptionTextarea.value.trim()) {
    descriptionTextarea.classList.add('error');
    descriptionTextareaError.textContent = 'Description is required.';
    isValid = false;
  } else {
    descriptionTextarea.classList.remove('error');
  }

  if (categoryDropdown.textContent.trim() === 'Select Task Category' || !categoryDropdown.textContent.trim()) {
    categoryDropdown.classList.add('error');
    categoryError.textContent = 'Category is required.';
    isValid = false;
  } else {
    categoryDropdown.classList.remove('error');
  }

  if (
    assignedContactsList.textContent.trim() === 'Select contacts to assign' ||
    !assignedContactsList.textContent.trim()
  ) {
    assignedContactsList.classList.add('error');
    assignedContactsListError.textContent = 'Assigned Contacts are required.';
    isValid = false;
  } else {
    assignedContactsList.classList.remove('error');
  }

  return isValid;
}