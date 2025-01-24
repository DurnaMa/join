async function contactInit() {
  await loadDataUsers();
  renderContactsList();
}

let currentSelectedContact = 0;

/**
 * Selects a contact by index, updates the current selected contact, and renders the contact details.
 * @function selectContact
 * @param {number} index - The index of the contact to select.
 */
function selectContact(index) {
  currentSelectedContact = index;
  renderContactsList();

  let contact = contacts[currentSelectedContact];
  let contactDetails = document.getElementById("contactDetailsDiv");

  contactDetails.innerHTML = /*html*/ `
        <div class="contact-details-div-header">
          <div class="contact-details-div-initials">
            <div class="contacts-abbreviation">${generateInitials(contact.name)}</div>
          </div>
          <div class="contact-name">${contact.name}</div>
          <div class="contact-details-div-name-icons">
            <div class="contact-details-div-name"></div>
            <div class="contact-details-div-icons"></div>
          </div>
        </div>

        <div>
          <h3>Contact Information</h3>
        </div>

        <div class="contact-details-div-email-phone">
        <div class="contact-details-div-email">${contact.email}</div>
        <div class="contact-details-div-phone">${contact.phone}</div>
        </div>

        <div class="contact-delete-btn-div">
          <button class="contact-delete-btn" onclick="deleteContact(${currentSelectedContact})">Delete contact</button>
        </div>
    `;
}

/**
 * Renders the list of contacts.
 * @function renderContactsList
 * @returns {void}
 */
function renderContactsList() {
  let contactsList = document.getElementById("scrollbar");
  contactsList.innerHTML = "";

  for (let i = 0; i < contacts.length; i++) {
    contactsList.innerHTML += generateContactsList(i);
  }
}

/**
 * Generates the HTML for a contact list item.
 * @function generateContactsList
 * @param {number} i - The index of the contact.
 * @returns {string} The HTML string for the contact list item.
 */
function generateContactsList(i) {
  const initials = generateInitials(contacts[i].name);
  return /*html*/ `
          <div class="contacts-list">
            <div class="contacts-list-item-h3-div" onclick="selectContact(${i})">
              <div class="contacts-abbreviation-div">
                <div class="contacts-abbreviation">${initials}</div>
              </div>
              <div class="contacts-list-item"><h3>${contacts[i].name}</h3><p>${contacts[i].email}</p></div>
            </div>
            <div class="contacts-list-item-dividing"></div>
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
  const nameParts = name.split(" ");
  const firstInitial = nameParts[0]?.charAt(0) || "";
  const lastInitial = nameParts[1]?.charAt(0) || "";
  return `${firstInitial}${lastInitial}`.toUpperCase();
}

function renderAddNewContact() {
  const addNewContactDiv = document.getElementById("addNewContactDiv");
  addNewContactDiv.classList.remove("d-none");
  addNewContactDiv.innerHTML = /*html*/ `
        <div class="add-new-contact-div">
          <div class="add-new-contact-h3-div">
            <h3>Add new contact</h3>
          </div>
          <div class="add-new-contact-form">
            <input class="name" type="text" id="newContactName" placeholder="Name" />
            <input class="email" type="text" id="newContactEmail" placeholder="Email" />
            <input class="phone" type="text" id="newContactPhone" placeholder="Phone" />
            <button class="add-new-contact-btn" onclick="addNewContact()">Add contact</button>
          </div>
        </div>
    `;
}
