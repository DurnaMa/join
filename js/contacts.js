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
// function selectContact(index) {
//   currentSelectedContact = index;
//   renderContactsList();

//   let contact = contacts[currentSelectedContact];
//   let phoneText;
//   if (contact.phone) {
//     phoneText = `<a class="contact-phone-link" href="tel:${contact.phone}">${contact.phone}</a>`;
//   } else {
//     phoneText = `<span class="no-phone">Leider liegt uns keine Telefonnummer vor</span>`;
//   }

//   contactDetailsHTML(contact, phoneText);
// }
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

  setTimeout(() => {
    const contactItems = document.querySelectorAll(".contacts-list");

    contactItems.forEach(item => item.classList.remove("active"));

    if (contactItems[currentSelectedContact]) {
      contactItems[currentSelectedContact].classList.add("active");
    }
  }, 0);
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
 * generateInitials("John Doe"); // Returns "JD"
 * generateInitials("Alice"); // Returns "A"
 * generateInitials(""); // Returns "??"
 * generateInitials(123); // Returns "??"
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

  let data = {
    name: name,
    email: email,
    phone: phone,
    color: getRandomColorFromArray(),
  };

  try {
    await postDataToFirebase("/contacts", data);
    document.getElementById("newContactName").value = "";
    document.getElementById("newContactEmail").value = "";
    document.getElementById("newContactPhone").value = "";
  } catch (error) {
    console.error("Fehler beim Hinzufügen des Kontakts:", error);
  }

  await loadDataUsers();
  closePopUp();
  document.getElementById("scrollbar").innerHTML = "";
  renderContactsList();
}

function validateContactData(name, email, phone) {
  const nameRegex = /^[A-Za-zÄÖÜäöüß\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]+$/;

  if (!nameRegex.test(name)) {
    let errorNewContactName = document.getElementById("errorNewContactName")
    errorNewContactName.innerText = "Bitte keine Zahlen, Sonderzeichen oder leere Felder!";
    // errorNewContactName.classList.toggle("d-none");
    return false;
  }else{
    errorNewContactName.classList.add("d-none");
  }
  if (!emailRegex.test(email)) {
    let errorNewContactEmail = document.getElementById("errorNewContactEmail")
    errorNewContactEmail.innerText = "Bitte eine gültige E-Mail-Adresse eingeben!";
    // errorNewContactEmail.classList.toggle("d-none");
    return false;
  }else{
    errorNewContactEmail.classList.add("d-none");
  }
  if (!phoneRegex.test(phone)) {
    let errorNewContactPhone = document.getElementById("errorNewContactPhone")
    errorNewContactPhone.innerText = "Die Telefonnummer darf nur Zahlen enthalten!";
    // errorNewContactPhone.classList.toggle("d-none");
    return false;
  }else{
    errorNewContactPhone.classList.add("d-none");
  }

  return true;
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

  if (!validateContactData(name, email, phone)) {
    return;
  }

  let data = {
    name: name,
    email: email,
    phone: phone,
    color: getRandomColorFromArray(),
  };

  try {
    await putDataToFirebase((path = "contacts/"), data, key);
    // console.log(key);
    // console.log("editContact erfolgreich");
  } catch (error) {
    console.error("Fehler bei der editcontact:", error);
  }

  await loadDataUsers();
  closePopUp();
  document.getElementById("scrollbar").innerHTML = "";
  renderContactsList();
  selectContact(currentSelectedContact);
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
