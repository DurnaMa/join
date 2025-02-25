async function singUpInit() {
  await loadDataUsers();
}

const colorPalette = [
  "#E63946", "#F4A261", "#2A9D8F", "#264653", "#D62828",
  "#F77F00", "#3D348B", "#E76F51", "#8E44AD", "#16A085",
  "#D7263D", "#1B998B", "#ECA400", "#3A86FF", "#8338EC",
  "#06D6A0", "#EF476F", "#118AB2", "#073B4C", "#F25C54",
  "#43AA8B", "#FF5A5F", "#5E548E", "#9B5DE5", "#00BBF9",
  "#FF006E", "#8AC926", "#6A0572", "#A60303", "#FF9F1C"
];

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
      // Neue Registrierung, wenn E-Mail nicht existiert
      let data = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
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
