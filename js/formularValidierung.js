function validateForm() {
  const title = document.getElementById('titleInput').value.trim();
  const dueDate = document.getElementById('date').value.trim();
  const category = document.getElementById('dropdownCategory').textContent.trim();
  
  let isValid = true;
  let errorMessage = "";

  if (!title) {
    isValid = false;
    errorMessage += "Title is required.\n";
  }

  if (!dueDate) {
    isValid = false;
    errorMessage += "Due Date is required.\n";
  }

  if (category === "Select Task Category" || !category) {
    isValid = false;
    errorMessage += "Category is required.\n";
  }

  if (!isValid) {
    alert(errorMessage);
  }

  return isValid;
}