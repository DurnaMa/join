async function singUpInit() {
  await loadDataUsers();
}

function onloadFunc() {
  console.log("test");
}

async function loadData(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  return (responseToJson = await response.json());
}

async function postData(path, data) {
  let response = await fetch(`${BASE_URL}${path}.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

async function toTheRegistration() {
  let nameInput = document.getElementById("name");
  let emailInput = document.getElementById("email");
  let passwordInput = document.getElementById("signupPassword");
  const checkbox = document.getElementById("checkboxSingUp");
  const errorDiv = document.getElementById("emailError");
  const passwordErrorDiv = document.getElementById("passwordError");
  const checkboxErrorDiv = document.getElementById("checkboxError");

  // Fehler-Reset
  errorDiv.textContent = "";
  passwordErrorDiv.textContent = "";
  checkboxErrorDiv.textContent = "";

  if (!checkbox.checked) {
    checkboxErrorDiv.textContent = "Accept the Privacy Policy";
    checkboxErrorDiv.style.color = "red";
    return false;
  }

  if (nameInput.value && emailInput.value && passwordInput.value) {
    try {
      await loadContacts();
      // Prüfen, ob die E-Mail bereits existiert
      let emailExists = contacts.find(
        (contact) => contact.email === emailInput.value
      );
      if (emailExists) {
        errorDiv.textContent = "Email already exists";
        return false;
      }

      /*function getRandomColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      }*/

        function getRandomColorFromArray() {
          return colorPalette[Math.floor(Math.random() * colorPalette.length)];
        }

      // Neue Registrierung, wenn E-Mail nicht existiert
      let data = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        color: getRandomColorFromArray(),
      };
      let result = await postData("/contacts", data);
      // Falls der Server eine ID zurückgibt, speichern wir den User
      if (result && result.name) {
        contacts.push(data); // Fügt den neuen User zur `contacts`-Liste hinzu
      }
      // Eingabefelder zurücksetzen
      nameInput.value = "";
      emailInput.value = "";
      passwordInput.value = "";
      console.log("Anmeldung erfolgreich");
      window.location.href = "/index.html";
    } catch (error) {
      console.error("Fehler bei der Anmeldung:", error);
      errorDiv.textContent = "Registration failed. Please try again.";
    }
  } else {
    errorDiv.textContent = "Please fill in all fields";
  }
}

function emailValidation() {
  let emailInput = document.getElementById("email");
  let emailValue = emailInput.value;

  if (emailValue.includes("@") && emailValue.includes(".")) {
    emailInput.style.border = "1px solid green";
  } else if (emailValue) {
    emailInput.style.border = "1px solid red";
  } else if (emailValue) {
    emailInput.style.border = "1px solid blue";
  }
}

/**
 * Handles the login process by validating the user's email, password, and acceptance of terms.
 * Displays appropriate error messages if validation fails.
 * Redirects to the summary page if login is successful.
 *
 * @returns {boolean} - Returns true if login is successful, otherwise false.
 */
function logIn() {
  const { checkbox, errorDiv, email, password } = logInVarible();
  if (!checkbox.checked) {
    errorDiv.textContent =
      "Bitte akzeptieren Sie die Bedingungen (Remember me).";
    errorDiv.style.color = "red";
    return false;
  }
  const user = contacts.find(
    (contact) => contact.email === email && contact.password === password
  );
  if (user) {
    errorDiv.textContent = "Login erfolgreich!";
    errorDiv.style.color = "green";
    sessionStorage.setItem("fullName", user.name);
    const initials = user.name.split(' ').map(initials => initials[0]).join('').toUpperCase();
    sessionStorage.setItem("userInitials", initials);
    window.location.href = "./pages/summary.html";
    return true;
  } else {
    errorDiv.textContent = "Das Passwort oder die E-Mail ist falsch.";
    return false;
  }
}

function logInVarible() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const checkbox = document.getElementById("checkboxLogin");
  const errorDiv = document.getElementById("loginError");
  return { checkbox, errorDiv, email, password };
}

function guestLogin() {
  sessionStorage.setItem("username", "Guest");
  sessionStorage.setItem("userInitials", "G");
  window.location.href = "../pages/summary.html";
}

