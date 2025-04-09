async function singUpInit() {
  await loadDataUsers();
}

/**
 * Asynchronously fetches and loads JSON data from a specified path.
 *
 * @param {string} [path=""] - The relative path to the JSON file (excluding the `.json` extension).
 * @returns {Promise<Object>} A promise that resolves to the parsed JSON object.
 * @throws {Error} If the fetch request fails or the response cannot be parsed as JSON.
 */
async function loadData(path = '') {
  let response = await fetch(BASE_URL + path + '.json');
  return (responseToJson = await response.json());
}

/**
 * Sends a POST request to the specified path with the provided data.
 *
 * @async
 * @function postData
 * @param {string} path - The endpoint path to which the data will be sent.
 * @param {Object} data - The data to be sent in the request body.
 * @returns {Promise<Object>} A promise that resolves to the JSON response from the server.
 */
async function postData(path, data) {
  let response = await fetch(`${BASE_URL}${path}.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

/**
 * Handles the user registration process by validating input fields, checking for existing email,
 * and sending the registration data to the server. Displays appropriate error messages for invalid
 * inputs or registration failures and redirects to the homepage upon successful registration.
 *
 * @async
 * @function toTheRegistration
 * @returns {Promise<boolean|void>} Returns `false` if validation fails or email already exists,
 *                                  otherwise redirects to the homepage after successful registration.
 *
 * @throws {Error} Logs an error message and displays a registration failure message if an exception occurs.
 */
async function toTheRegistration() {
  let { errorDiv, passwordErrorDiv, checkboxErrorDiv, checkbox, nameInput, emailInput, passwordInput, popup } = registrationVariables();
  errorDiv.textContent = passwordErrorDiv.textContent = checkboxErrorDiv.textContent = '';
  if (!checkbox.checked) return (checkboxErrorDiv.textContent = 'Accept the Privacy Policy', checkboxErrorDiv.style.color = 'red', false);
  if (!nameInput.value || !emailInput.value || !passwordInput.value) return (errorDiv.textContent = 'Please fill in all fields');
  try {
    await loadContacts();
    if (contacts.some(c => c.email === emailInput.value)) return (errorDiv.textContent = 'Email already exists', false);

    let data = { name: nameInput.value, email: emailInput.value, password: passwordInput.value, color: colorPalette[Math.floor(Math.random() * colorPalette.length)] };
    if (await postData('/contacts', data)) contacts.push(data);

    [nameInput.value, emailInput.value, passwordInput.value, confirmPassword.value] = ['', '', '', ''];
    popup?.classList.remove('d-none');
    setTimeout(() => (window.location.href = '/index.html'), 2000);
  } catch (error) {
    console.error('Fehler bei der Anmeldung:', error);
    errorDiv.textContent = 'Registration failed. Please try again.';
  }
}


/**
 * Retrieves and returns references to various DOM elements used for user registration.
 *
 * @returns {Object} An object containing the following properties:
 *   - {HTMLElement} errorDiv - The div element for displaying email-related errors.
 *   - {HTMLElement} passwordErrorDiv - The div element for displaying password-related errors.
 *   - {HTMLElement} checkboxErrorDiv - The div element for displaying checkbox-related errors.
 *   - {HTMLElement} checkbox - The checkbox element for the sign-up agreement.
 *   - {HTMLElement} nameInput - The input element for the user's name.
 *   - {HTMLElement} emailInput - The input element for the user's email.
 *   - {HTMLElement} passwordInput - The input element for the user's password.
 *   - {HTMLElement} popup - The popup element for the sign-up process.
 */
function registrationVariables() {
  let nameInput = document.getElementById('name');
  let emailInput = document.getElementById('email');
  let passwordInput = document.getElementById('signupPassword');
  const checkbox = document.getElementById('checkboxSingUp');
  const errorDiv = document.getElementById('emailError');
  const passwordErrorDiv = document.getElementById('passwordError');
  const checkboxErrorDiv = document.getElementById('checkboxError');
  let popup = document.getElementById('singUpPopup');
  return { errorDiv, passwordErrorDiv, checkboxErrorDiv, checkbox, nameInput, emailInput, passwordInput, popup };
}

/**
 * Validates the email input field by checking if the entered value contains
 * both "@" and "." characters. Updates the border color of the input field
 * based on the validation result:
 * - Green border: Valid email format.
 * - Red border: Invalid email format.
 * - Blue border: Edge case (redundant condition in the current implementation).
 *
 * @function emailValidation
 * @returns {void} This function does not return a value.
 */
function emailValidation() {
  let emailInput = document.getElementById('email');
  let emailValue = emailInput.value;

  if (emailValue.includes('@') && emailValue.includes('.')) {
    emailInput.style.border = '1px solid green';
  } else if (emailValue) {
    emailInput.style.border = '1px solid red';
  } else if (emailValue) {
    emailInput.style.border = '1px solid blue';
  }
}

/**
 * Handles the login process by validating user credentials and managing session data.
 *
 * @returns {boolean} Returns `true` if login is successful, otherwise `false`.
 *
 * @description
 * - Checks if the "Remember me" checkbox is selected. If not, displays an error message.
 * - Searches for a user in the `contacts` array that matches the provided email and password.
 * - If a matching user is found:
 *   - Displays a success message.
 *   - Stores the user's full name and initials in the session storage.
 *   - Redirects the user to the summary page.
 * - If no matching user is found, displays an error message indicating incorrect credentials.
 */
function logIn() {
  const { checkbox, errorDiv, email, password } = logInVarible();
  const user = contacts.find((contact) => contact.email === email && contact.password === password);
  if (user) {
    errorDiv.textContent = 'Login erfolgreich!';
    errorDiv.style.color = 'green';
    sessionStorage.setItem('fullName', user.name);
    const initials = user.name.split(' ').map((initials) => initials[0]).join('').toUpperCase();
    sessionStorage.setItem('userInitials', initials);
    window.location.href = './pages/summary.html';
    return true;
  } else {
    errorDiv.textContent = 'Das Passwort oder die E-Mail ist falsch.';
    return false;
  }
}

/**
 * Retrieves and returns the values of login-related input fields and elements.
 *
 * @returns {Object} An object containing the following properties:
 *   - {HTMLInputElement} checkbox - The checkbox element for login.
 *   - {HTMLElement} errorDiv - The div element for displaying login errors.
 *   - {string} email - The value of the email input field.
 *   - {string} password - The value of the password input field.
 */
function logInVarible() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const checkbox = document.getElementById('checkboxLogin');
  const errorDiv = document.getElementById('loginError');
  return { checkbox, errorDiv, email, password };
}

/**
 * Logs in a guest user by setting default session storage values
 * and redirecting to the summary page.
 *
 * This function sets the following session storage items:
 * - `fullName`: "Guest"
 * - `userInitials`: "G"
 *
 * After setting these values, the user is redirected to the
 * summary page located at "../pages/summary.html".
 */
function guestLogin() {
  sessionStorage.setItem('fullName', 'Guest');
  sessionStorage.setItem('userInitials', 'G');
  window.location.href = '../pages/summary.html';
}

/**
 * Displays a greeting message on mobile devices if the screen width is 992px or less.
 * The greeting message fades in and out over a short duration.
 *
 * - Checks if the screen width matches the mobile criteria.
 * - Displays the element with the ID "mobileGreetings" if it exists.
 * - Fades the element in and out over 1.5 seconds.
 * - Logs an error if the element with the ID "mobileGreetings" is not found.
 * - Calls the `dailyTime` function after displaying the greeting.
 *
 * @function
 * @throws {Error} Logs an error if the element with the ID "mobileGreetings" is not found.
 */
function showMobileGreetings() {
  const isMobile = window.matchMedia('(max-width: 992px)').matches;
  if (isMobile) {
    const mobileGreetings = document.getElementById('mobileGreetings');
    if (mobileGreetings) {
      mobileGreetings.style.display = 'flex';
      mobileGreetings.style.opacity = 1;
      setTimeout(() => {
        mobileGreetings.style.opacity = 0;
        mobileGreetings.style.display = 'none';
      }, 1500);
    } else {
      console.error("Das Element mit der ID 'mobileGreetings' wurde nicht gefunden!");
    }
    dailyTime();
  }
}
