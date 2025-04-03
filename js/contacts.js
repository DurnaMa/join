async function contactInit() {
  await loadDataUsers();
  renderContactsList();
}

let currentSelectedContact = 0;
let contactColors = {};

/**
 * Selects a contact by its index, updates the current selected contact,
 * re-renders the contacts list, and displays the contact details.
 *
 * @param {number} index - The index of the contact to select.
 * @throws {TypeError} Throws an error if the index is not a number.
 */
function selectContact(index) {
  currentSelectedContact = index;
  renderContactsList();
  let contact = contacts[currentSelectedContact];
  let phoneText;
  if (contact.phone) {
    phoneText = `<a class="contact-phone-link" href="tel:${contact.phone}">${contact.phone}</a>`;
  } else {
    phoneText = `<span class="no-phone">Leider liegt uns keine Telefonnummer vor</span>`;
  }

  contactDetailsHTML(contact, phoneText);
}

/**
 * Updates the HTML content of the contact details section for both desktop and mobile views.
 *
 * @param {Object} contact - The contact object containing details about the contact.
 * @param {string} contact.name - The full name of the contact.
 * @param {string} contact.email - The email address of the contact.
 * @param {string} contact.color - The background color associated with the contact.
 * @param {string} phoneText - The HTML string representing the phone number of the contact.
 *
 * @description This function generates the HTML structure for displaying contact details,
 * including the contact's name, email, phone number, and action buttons for editing or deleting
 * the contact. It updates the content of the `contactDetailsDiv` and `mobileContactDetailsDiv`
 * elements and ensures the mobile contact container is visible.
 */
function contactDetailsHTML(contact, phoneText) {
  let contactDetailsHTML = /*html*/ `
    <div class="contact-details-div-header">
      <div class="contact-details-div-initials">
        <div id="contactsAbbreviationRightArea" class="contacts-abbreviation-right-area"
             style="background-color: ${contact.color};">
          ${generateInitials(contact.name)}
        </div>
      </div>
      <div class="contact-name">
        <div class="contact-name-header">${contact.name}</div>
        <div class="contact-details-div-name-icons">
          <div class="contact-details-div-icons">
            <div onclick="editContact(${currentSelectedContact})" class="contact-details-div-icon-edit">
              <img src="/assets/icons/edit-pencil.png" alt="" />Edit
            </div>
            <div onclick="deleteContact(${currentSelectedContact})" class="contact-details-div-icon-edit img">
              <img src="/assets/icons/deleteContact.png" alt="">Delete
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="contact-info">    
      <div class="contact-info-header">
        Contact Information
      </div>
      <div class="contact-details-div-email-phone">
        <label>Email</label>
        <a class="contact-email-link" href="mailto:${contact.email}">${contact.email}</a>
        <label>Phone</label>
        ${phoneText}
      </div>
    </div>
  `;

  document.getElementById("contactDetailsDiv").innerHTML = contactDetailsHTML;
  document.getElementById("mobileContactDetailsDiv").innerHTML = contactDetailsHTML;
  document.getElementById("mobileContactContainer").classList.remove("d-none");
}

/**
 * Renders a sorted list of contacts grouped by their first letter.
 * 
 * This function clears the existing content of the element with the ID "scrollbar",
 * sorts the `contacts` array alphabetically by the `name` property, and dynamically
 * generates HTML to display the contacts grouped by their first letter. Each group
 * is preceded by a header displaying the letter and a horizontal rule.
 * 
 * Dependencies:
 * - Assumes the existence of a global `contacts` array where each contact has a `name` property.
 * - Uses the `generateContactsList` function to generate the HTML for individual contacts.
 * 
 * Side Effects:
 * - Modifies the innerHTML of the element with the ID "scrollbar".
 * 
 * @throws {TypeError} If `contacts` is not an array or if `generateContactsList` is not defined.
 */
function renderContactsList() {
  let contactsList = document.getElementById("scrollbar");
  contactsList.innerHTML = "";
  contacts.sort((a, b) => a.name.localeCompare(b.name));

  let lastLetter = "";

  for (let i = 0; i < contacts.length; i++) {
    let firstLetter = contacts[i].name.charAt(0).toUpperCase();
    if (firstLetter !== lastLetter) {
      contactsList.innerHTML += `<div class="letterSection"><h3>${firstLetter}</h3><div class="hr-div"><hr /></div></div>`;
      lastLetter = firstLetter;
    }
    contactsList.innerHTML += generateContactsList(i);
  }
}

/**
 * Generates an HTML string representing a contact list item.
 *
 * @param {number} i - The index of the contact in the `contacts` array.
 * @returns {string} The HTML string for the contact list item.
 *
 * The function retrieves the contact's initials using the `generateInitials` function
 * and assigns a background color based on the contact's `color` property. If no color
 * is provided, a default color of `#000000` is used. The returned HTML includes the
 * contact's name and email, and clicking on the item triggers the `selectContact` function.
 */
function generateContactsList(i) {
  const initials = generateInitials(contacts[i].name);
  let color = contacts[i].color ? contacts[i].color : "#000000";
  return /*html*/ `
    <div onclick="selectContact(${i})" class="contacts-list">
      <div class="contacts-abbreviation-div" style="background-color: ${color};">
        <span id="contactsAbbreviation-${i}" class="contacts-abbreviation">${initials}</span>
      </div>
      <div class="contacts-list-item">
        <h3>${contacts[i].name}</h3>
        <p>${contacts[i].email}</p>
      </div>
    </div>
  `;
}

/**
 * Generates initials from a given name.
 *
 * @param {string} name - The full name or single word to generate initials from.
 * @returns {string} The initials derived from the name. If the input is invalid or empty, returns "??".
 *
 * @example
 * generateInitials("John Doe");
 * generateInitials("Alice");
 * generateInitials("");
 * generateInitials(123);
 */
function generateInitials(name) {
  if (typeof name !== "string" || name.trim() === "") return "??";

  let parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Displays the "Add New Contact" popup by removing the "d-none" class
 * from the popup element and setting its inner HTML to the content
 * generated by the `addNewContactPopup` function.
 */
function addNewContact() {
  const addNewContactDiv = document.getElementById("popup");
  addNewContactDiv.classList.remove("d-none");
  addNewContactDiv.innerHTML = addNewContactPopup();
}

/**
 * Displays the "Add New Contact" popup on mobile devices.
 * 
 * This function removes the "d-none" class from the popup element to make it visible
 * and sets its inner HTML content to the result of the `mobileAddNewContactPopup` function.
 */
function mobileAddNewContact() {
  const mobileAddNewContactDiv = document.getElementById("popup");
  mobileAddNewContactDiv.classList.remove("d-none");
  mobileAddNewContactDiv.innerHTML = mobileAddNewContactPopup();
}

/**
 * Displays the edit contact popup by removing the "d-none" class from the popup element
 * and setting its inner HTML to the content generated by the `editContactPopup` function.
 */
function editContact() {
  const editContactDiv = document.getElementById("popup");
  editContactDiv.classList.remove("d-none");
  editContactDiv.innerHTML = editContactPopup();
}

/**
 * Displays the mobile edit contact popup by removing the "d-none" class
 * from the popup element and setting its inner HTML to the mobile edit
 * contact popup content.
 *
 * @function
 */
function mobileEditContact() {
  const editContactDiv = document.getElementById("popup");
  editContactDiv.classList.remove("d-none");
  editContactDiv.innerHTML = mobileEditContactPopup();
}

/**
 * Closes the popup and hides related UI elements.
 * 
 * This function adds the "d-none" class to the popup and mobile contact container
 * elements, effectively hiding them. It also adds the "hidden" class to the 
 * mobile toggle options element to ensure it is not visible.
 */
function closePopUp() {
  document.getElementById("popup").classList.add("d-none");
  document.getElementById("popup").classList.add("d-none");
  document.getElementById("mobileContactContainer").classList.add("d-none");
  document.getElementById("mobileToggleOptions").classList.add("hidden");
}

/**
 * Asynchronously saves a new contact by collecting input values from the DOM,
 * validating them, and sending the data to a Firebase database. After saving,
 * it reloads user data, closes the popup, clears the scrollbar content, and
 * re-renders the contacts list.
 *
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when the contact is saved and the UI is updated.
 * @throws Will log an error to the console if there is an issue with saving the contact.
 */

async function saveContact() {
  let name = document.getElementById("newContactName").value.trim();
  let email = document.getElementById("newContactEmail").value.trim();
  let phone = document.getElementById("newContactPhone").value.trim();

  if (!validateContactData(name, email, phone)) {
    return;
  }

  let data = {name: name, email: email, phone: phone, color: getRandomColorFromArray(),};

  await savingOnFirebase(data);

  await loadDataUsers();
  closePopUp();
  document.getElementById("scrollbar").innerHTML = "";
  renderContactsList();
}

/**
 * Saves a new contact to Firebase and clears the input fields upon success.
 * 
 * This asynchronous function:
 * - Sends the given contact data to Firebase using `postDataToFirebase()` with the `/contacts` endpoint.
 * - Clears the input fields for name, email, and phone after successful submission.
 * 
 * If an error occurs during the process, it is logged to the console.
 * 
 * @async
 * @function savingOnFirebase
 * @param {Object} data - The contact data to be saved (e.g., name, email, phone).
 * @returns {Promise<void>} A promise that resolves when the contact is saved and inputs are cleared.
 */
async function savingOnFirebase(data) {
  try {
    await postDataToFirebase("/contacts", data);
    document.getElementById("newContactName").value = "";
    document.getElementById("newContactEmail").value = "";
    document.getElementById("newContactPhone").value = "";
  } catch (error) {
    console.error("Fehler beim Hinzufügen des Kontakts:", error);
  }
}

/**
 * Validates a form field against a regular expression and displays an error message if invalid.
 * 
 * This function:
 * - Tests the input `value` against the provided `regex`.
 * - If the test fails, it applies an error style to the input field, shows the error message, 
 *   and returns `false`.
 * - If the test passes, it removes any error styling and hides the error message, then returns `true`.
 * 
 * @function validateField
 * @param {string} value - The value to validate.
 * @param {RegExp} regex - The regular expression to test the value against.
 * @param {string} fieldId - The ID of the input field to apply validation styling.
 * @param {string} errorId - The ID of the element where the error message is displayed.
 * @param {string} errorMessage - The message to display if validation fails.
 * @returns {boolean} `true` if the value is valid, otherwise `false`.
 */
function validateField(value, regex, fieldId, errorId, errorMessage) {
  const field = document.getElementById(fieldId);
  const errorField = document.getElementById(errorId);
  if (!regex.test(value)) {
    field.classList.add("error");
    errorField.innerText = errorMessage;
    errorField.classList.remove("d-none");
    return false;
  } else {
    field.classList.remove("error");
    errorField.classList.add("d-none");
    return true;
  }
}

/**
 * Validates contact form data including name, email, and phone number.
 * 
 * This function uses `validateField()` to validate each input:
 * - `name`: Must contain only letters and spaces (no numbers or special characters).
 * - `email`: Must follow a standard email format.
 * - `phone`: Must contain only numeric digits.
 * 
 * Displays specific error messages and styles the input fields accordingly.
 * 
 * @function validateContactData
 * @param {string} name - The contact's name to validate.
 * @param {string} email - The contact's email to validate.
 * @param {string} phone - The contact's phone number to validate.
 * @returns {boolean} `true` if all fields are valid, otherwise `false`.
 */
function validateContactData(name, email, phone) {
  const nameValid = validateField(name, /^[A-Za-zÄÖÜäöüß\s]+$/, "newContactName", "errorNewContactName","Bitte keine Zahlen, Sonderzeichen oder leere Felder!"
  );
  const emailValid = validateField(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "newContactEmail", "errorNewContactEmail","Bitte eine gültige E-Mail-Adresse eingeben!"
  );
  const phoneValid = validateField(phone, /^[0-9]+$/, "newContactPhone", "errorNewContactPhone","Die Telefonnummer darf nur Zahlen enthalten!"
  );
  return nameValid && emailValid && phoneValid;
}

/**
 * Validates an input field during edit mode and displays an error message if the value is invalid.
 * 
 * This function:
 * - Tests the input `value` against the provided regular expression `regex`.
 * - If the value does not match, it adds an error class to the field, shows the error message, and returns `false`.
 * - If the value is valid, it removes the error class, hides the error message, and returns `true`.
 * 
 * Intended for use in edit forms where real-time or on-submit validation is required.
 * 
 * @function validateEditField
 * @param {string} value - The value to validate.
 * @param {RegExp} regex - The regular expression to validate the value against.
 * @param {string} fieldId - The ID of the input field to apply validation styling.
 * @param {string} errorId - The ID of the element where the error message should be shown.
 * @param {string} errorMessage - The error message to display if validation fails.
 * @returns {boolean} `true` if the value is valid, otherwise `false`.
 */
function validateEditField(value, regex, fieldId, errorId, errorMessage) {
const field = document.getElementById(fieldId);
const errorField = document.getElementById(errorId);
if (!regex.test(value)) {
  field.classList.add("error");
  errorField.innerText = errorMessage;
  errorField.classList.remove("d-none");
  return false;
} else {
  field.classList.remove("error");
  errorField.classList.add("d-none");
  return true;
}
}

/**
 * Validates the edited contact data including name, email, and phone number.
 * 
 * This function uses `validateField()` to check the following fields:
 * - `editContactName`: Must only contain letters and spaces (no numbers or special characters).
 * - `editContactEmail`: Must be a valid email format.
 * - `editContactPhone`: Must contain only digits.
 * 
 * If any of the fields are invalid, appropriate error messages are shown and the function returns `false`.
 * 
 * @function validateEditContactData
 * @param {string} name - The edited name of the contact.
 * @param {string} email - The edited email address of the contact.
 * @param {string} phone - The edited phone number of the contact.
 * @returns {boolean} `true` if all fields are valid, otherwise `false`.
 */
function validateEditContactData(name, email, phone) {
const nameValid = validateField(name, /^[A-Za-zÄÖÜäöüß\s]+$/, "editContactName", "errorEditContactName","Bitte keine Zahlen, Sonderzeichen oder leere Felder!"
);
const emailValid = validateField(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "editContactEmail", "errorEditContactEmail","Bitte eine gültige E-Mail-Adresse eingeben!"
);
const phoneValid = validateField(phone, /^[0-9]+$/, "editContactPhone", "errorEditContactPhone","Die Telefonnummer darf nur Zahlen enthalten!"
);
return nameValid && emailValid && phoneValid;
}

/**
 * Updates the selected contact with new information provided by the user.
 * Retrieves the contact's key, updates its data in Firebase, and refreshes the UI.
 * 
 * @async
 * @function
 * @throws Will log an error if the update operation fails.
 */
async function updateContact() {
  let key = contacts[currentSelectedContact].id;
  let name = document.getElementById("editContactName").value.trim();
  let email = document.getElementById("editContactEmail").value.trim();
  let phone = document.getElementById("editContactPhone").value.trim();
  if (!validateEditContactData(name, email, phone)) {
    return;
  }

  let data = updateContentContact(name, email, phone);
  await sendingUpdateContact(data, key);
  await loadDataUsers();
  closePopUp();
  document.getElementById("scrollbar").innerHTML = "";
  renderContactsList();
  selectContact(currentSelectedContact);
}

/**
 * Sends updated contact data to Firebase using a PUT request.
 * 
 * This asynchronous function updates a contact entry in Firebase at the specified key.
 * If the operation fails, an error message is logged to the console.
 * 
 * @async
 * @function sendingUpdateContact
 * @param {Object} data - The updated contact data to be saved.
 * @param {string} key - The unique key (ID) of the contact in Firebase.
 * @returns {Promise<void>} A promise that resolves when the contact has been successfully updated.
 */
async function sendingUpdateContact(data, key) {
  try {
    await putDataToFirebase((path = "contacts/"), data, key);
  } catch (error) {
    console.error("Fehler bei der editcontact:", error);
  }
}

/**
 * Creates an updated contact object with a new random color.
 * 
 * This function returns a new contact object containing the provided name, email, and phone,
 * and assigns a random color using `getRandomColorFromArray()`.
 * 
 * @function updateContentContact
 * @param {string} name - The updated name of the contact.
 * @param {string} email - The updated email address of the contact.
 * @param {string} phone - The updated phone number of the contact.
 * @returns {Object} An object representing the updated contact data.
 */
function updateContentContact(name, email, phone) {
  return {
    name: name,
    email: email,
    phone: phone,
    color: getRandomColorFromArray(),
  };
}

/**
 * Deletes a contact by its ID, removes it from Firebase, reloads user data, 
 * updates the contacts list, clears the contact details view, and closes any open pop-ups.
 *
 * @async
 * @function deleteContact
 * @param {number} id - The index of the contact to be deleted in the `contacts` array.
 * @returns {Promise<void>} Resolves when the contact is deleted and the UI is updated.
 */
async function deleteContact(id) {
  let path = `/contacts/${contacts[id].id}`;
  await deleteDataFromFirebase(path);
  await loadDataUsers();
  renderContactsList();
  document.getElementById("contactDetailsDiv").innerHTML = "";
  closePopUp();
}

/**
 * Deletes the currently selected contact from the database and updates the UI.
 * 
 * This function performs the following steps:
 * 1. Validates the currently selected contact.
 * 2. Deletes the contact from the Firebase database using its ID.
 * 3. Reloads the user data and re-renders the contacts list.
 * 4. Clears the mobile contact details view and closes any open pop-ups.
 * 
 * @async
 * @function mobileDeleteContact
 * @throws {Error} If the contact ID is invalid or if there is an issue with the Firebase operation.
 */
async function mobileDeleteContact() {
  if (!contacts[currentSelectedContact]) {
    console.error("Invalid contact ID:", currentSelectedContact);
    return;
  }

  let contactId = contacts[currentSelectedContact].id;
  let path = `/contacts/${contactId}`;

  await deleteDataFromFirebase(path);
  await loadDataUsers();
  renderContactsList();

  document.getElementById("mobileContactDetailsDiv").innerHTML = "";
  closePopUp();
}

/**
 * Selects a random color from the predefined `colorPalette` array.
 *
 * @returns {string} A randomly selected color from the `colorPalette` array.
 */
function getRandomColorFromArray() {
  return colorPalette[Math.floor(Math.random() * colorPalette.length)];
}

/**
 * Toggles the visibility of the mobile options menu by adding or removing
 * the "hidden" class from the element with the ID "mobileToggleOptions".
 */
function mobileToggleOptions() {
  document.getElementById("mobileToggleOptions").classList.toggle("hidden");
}
