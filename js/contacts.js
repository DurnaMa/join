async function contactInit() {
  await loadDataUsers();
  renderContactsList();
}

let currentSelectedContact = 0;
let contactColors = {};

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

  let contactDetailsHTML = document.getElementById('contactDetailsDiv');
  contactDetailsHTML.innerHTML += contactDetailsHTML(contact, currentSelectedContact);

  //document.getElementById("contactDetailsDiv").innerHTML = contactDetailsHTML;
  document.getElementById("mobileContactDetailsDiv").innerHTML = contactDetailsHTML;
  document.getElementById("mobileContactContainer").classList.remove("d-none");
}

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
 * Generates the initials for a given name.
 * @function generateInitials
 * @param {string} name - The full name of the contact.
 * @returns {string} The initials of the contact's name.
 */
function generateInitials(name) {
  if (typeof name !== "string" || name.trim() === "") return "??";

  let parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function addNewContact() {
  const addNewContactDiv = document.getElementById("popup");
  addNewContactDiv.classList.remove("d-none");
  addNewContactDiv.innerHTML = addNewContactPopup();
}

function mobileAddNewContact() {
  const mobileAddNewContactDiv = document.getElementById("popup");
  mobileAddNewContactDiv.classList.remove("d-none");
  mobileAddNewContactDiv.innerHTML = mobileAddNewContactPopup();
}

/**
 * Displays the edit contact form with the current contact's details.
 *
 * This function retrieves the currently selected contact's information
 * (name, email, and phone) and populates an editable form with these details.
 * The form allows the user to update or delete the contact.
 *
 * @function
 * @name editContact
 */

function editContact() {
  const editContactDiv = document.getElementById("popup");
  editContactDiv.classList.remove("d-none");
  editContactDiv.innerHTML = editContactPopup();
}

function mobileEditContact() {
  const editContactDiv = document.getElementById("popup");
  editContactDiv.classList.remove("d-none");
  editContactDiv.innerHTML = mobileEditContactPopup();
}

function closePopUp() {
  document.getElementById("popup").classList.add("d-none");
  document.getElementById("popup").classList.add("d-none");
  document.getElementById("mobileContactContainer").classList.add("d-none");
  document.getElementById("mobileToggleOptions").classList.add("hidden");
}

/**
 * Asynchronously saves a new contact by retrieving input values from the DOM,
 * sending the data to Firebase, and updating the UI accordingly.
 *
 * @async
 * @function saveContact
 * @returns {Promise<void>} A promise that resolves when the contact is saved and the UI is updated.
 * @throws Will log an error message if there is an issue with saving the contact.
 */
async function saveContact() {
  let name = document.getElementById("newContactName").value;
  let email = document.getElementById("newContactEmail").value;
  let phone = document.getElementById("newContactPhone").value;
  if (name && email && phone) {
    let data = {
      name: name,
      email: email,
      phone: phone,
      color: getRandomColorFromArray(),
    };

    try {
      await postDataToFirebase("/contacts", data);
      name = "";
      email = "";
      phone = "";
      console.log("addNewcontact erfolgreich");
    } catch (error) {
      console.error("Fehler bei der addNewcontact:", error);
    }
  }

  await loadDataUsers();
  closePopUp();
  document.getElementById("scrollbar").innerHTML = "";
  renderContactsList();
}

/**
 * Updates the selected contact with new information from the input fields.
 *
 * This function retrieves the contact's ID, name, email, and phone number from the input fields,
 * constructs a data object, and sends it to Firebase to update the contact information.
 * After updating, it reloads the user data, closes the popup, clears the scrollbar content,
 * re-renders the contacts list, and re-selects the current contact.
 *
 * @async
 * @function updateContact
 * @returns {Promise<void>} A promise that resolves when the contact update process is complete.
 * @throws Will log an error message if the update process fails.
 */
async function updateContact() {
  let key = contacts[currentSelectedContact].id;
  console.log(key);
  let name = document.getElementById("editContactName").value;
  let email = document.getElementById("editContactEmail").value;
  let phone = document.getElementById("editContactPhone").value;

  let data = {
    name: name,
    email: email,
    phone: phone,
    color: getRandomColorFromArray(),
  };

  try {
    await putDataToFirebase((path = "contacts/"), data, key);
    console.log(key);
    console.log("editContact erfolgreich");
  } catch (error) {
    console.error("Fehler bei der editcontact:", error);
  }

  await loadDataUsers();
  closePopUp();
  document.getElementById("scrollbar").innerHTML = "";
  renderContactsList();
  selectContact(currentSelectedContact);
}

async function deleteContact(id) {
  let path = `/contacts/${contacts[id].id}`;
  await deleteDataFromFirebase(path);
  await loadDataUsers();
  renderContactsList();
  document.getElementById("contactDetailsDiv").innerHTML = "";
  closePopUp();
}

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

function getRandomColorFromArray() {
  return colorPalette[Math.floor(Math.random() * colorPalette.length)];
}

function mobileToggleOptions() {
  document.getElementById("mobileToggleOptions").classList.toggle("hidden");
}
