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
            <div class="contact-details-div-icons">
              <div class="contact-details-div-icon-edit">
                <img src="/assets/icons/edit-icon.png" alt="" /><h4>Edit</h4>
              </div>
              <div class="contact-details-div-icon-delete">
                <img src="/assets/icons/delete-icon.png" onclick="deleteContact(${currentSelectedContact})" alt="" /><h4>Delete</h4>
              </div>
            </div>

          </div>
        </div>

        <div>
          <h3>Contact Information</h3>
        </div>

        <div class="contact-details-div-email-phone">
        <div class="contact-details-div-email">${contact.email}</div>
        <div class="contact-details-div-phone">${contact.phone}</div>
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

/**
 * Renders the "Add New Contact" form by making the corresponding div visible
 * and populating it with the necessary HTML structure.
 *
 * The form includes fields for name, email, and phone, as well as a button
 * to submit the new contact. It also includes a button to close the form.
 */
function renderAddNewContact() {
  const addNewContactDiv = document.getElementById("addNewContactDiv");
  addNewContactDiv.classList.remove("d-none");
  addNewContactDiv.innerHTML = /*html*/ `
        <div class="add-new-contact-div">
          <button onclick="closeAddNewContact()">
          <img src="/assets/icons/cancel.png" alt="">
          </button>
          <div class="contacts-seid-left">
          <div class="add-new-contact-h3-div">
            <h3>Add new contact</h3>
          </div>
          </div>
          <div class="add-new-contact-form">
            <input class="name" type="text" id="newContactName" placeholder="Name">
            <input class="email" type="text" id="newContactEmail" placeholder="Email" />
            <input class="phone" type="text" id="newContactPhone" placeholder="Phone" />
            <button class="add-new-contact-btn" onclick="addNewContact()">Add contact</button>
          </div>
        </div>
    `;
}

function closeAddNewContact() {
  document.getElementById("addNewContactDiv").classList.add("d-none");
}

async function addNewContact() {
  let name = document.getElementById("newContactName").value;
  let email = document.getElementById("newContactEmail").value;
  let phone = document.getElementById("newContactPhone").value;

  if (name && email && phone) {
    let data = {
      name: name,
      email: email,
      phone: phone,
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
}