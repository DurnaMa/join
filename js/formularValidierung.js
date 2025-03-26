function validateForm(event) {
  let isValid = true;

  const titleInput = document.getElementById("titleInput");
  if (titleInput.value.trim() === "") {
    titleInput.classList.add("invalid");
    isValid = false;
  } else {
    titleInput.classList.remove("invalid");
  }

  const dateInput = document.getElementById("date");
  if (dateInput.value === "") {
    dateInput.classList.add("invalid");
    isValid = false;
  } else {
    dateInput.classList.remove("invalid");
  }

  const categoryDropdown = document.getElementById("dropdownCategory");
  if (categoryDropdown.innerText === "Select Task Category") {
    categoryDropdown.classList.add("invalid");
    isValid = false;
  } else {
    categoryDropdown.classList.remove("invalid");
  }


  if (!isValid) {
    event.preventDefault();
    alert("Please fill in all required fields.");
  }

  return isValid;
}

document.querySelector(".form").addEventListener("submit", (event) => {
    event.preventDefault();

    if (validateForm()) {
        postAddTask();
    } else {
        event.preventDefault();
    }
});
