/**
 * Generates the HTML template for the "Add New Contact" popup.
 *
 * This function returns a string containing the HTML structure for a popup
 * that allows users to add a new contact. The popup includes fields for
 * entering the contact's name, email, and phone number, as well as buttons
 * for canceling or creating the contact.
 *
 * @returns {string} The HTML string for the "Add New Contact" popup.
 */
function addNewContactPopup() {
    return /*html*/ `
    <div class="shadow-div"></div>
    <div class="add-edit-popup-contact-div">
      <div class="popup-left">
        <img src="../assets/img/logohell.png" alt="" />
        <h1>Add contact</h1>
        <span>Tasks are better with a team!</span>
        <hr />
      </div>
      <div class="popup-right">
        <div>
          <img src="../assets/img/profileIMG.png" alt="" />
        </div>
        <div>
          <img
            class="popup-close-img"
            onclick="closePopUp()"
            src="../assets/icons/close.png"
            alt=""
          />
        </div>
        <div>
          <form>
            <input
              class="name"
              type="name"
              id="newContactName"
              placeholder="Name"
            />
            <div id="errorNewContactName" class="nameError"></div>
            <input
              class="email"
              type="email"
              id="newContactEmail"
              placeholder="Email"
            />
            <div id="errorNewContactEmail" class="emailError"></div>
            <input
              class="phone"
              type="number"
              id="newContactPhone"
              placeholder="Phone"
            />
            <div id="errorNewContactPhone" class="phoneError"></div>
          </form>
          <div class="popup-buttons">
            <button class="cancel-button" onclick="closePopUp()">
              Cancel <img src="../assets/icons/cancel.png" alt="" />
            </button>
            <button class="create-button" onclick="saveContact()">
              Create contact <img src="../assets/icons/check.png" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
    `;
  }
  
  /**
   * Generates the HTML template for a mobile popup to add a new contact.
   *
   * This function returns a string containing the HTML structure for a popup
   * that allows users to input a new contact's name, email, and phone number.
   * The popup includes a close button, a header, and a form with input fields.
   *
   * @returns {string} The HTML string for the mobile add new contact popup.
   */
  function mobileAddNewContactPopup() {
    return /*html*/ `
    <div class="shadow-div"></div>
    <div class="mobile-add-edit-popup-contact-div">
    <div>
          <img
            class="mobile-popup-close-img"
            onclick="closePopUp()"
            src="../assets/icons/close-white.png"
            alt=""
          />
        </div>
      <div class="mobile-popup-above">
        <h1>Add contact</h1>
        <span>Tasks are better with a team!</span>
        <hr />
      </div>
      <div class="mobile-popup-below">
        <div>
          <img src="../assets/img/profileIMG.png" alt="" />
        </div> 
        <div>
          <form class="mobile-form">
            <input
              class="mobile-name"
              type="text"
              id="newContactName"
              placeholder="Name"
            />
            <div id="errorNewContactName" class="nameError"></div>
            <input
              class="mobile-email"
              type="text"
              id="newContactEmail"
              placeholder="Email"
            />
            <div id="errorNewContactEmail" class="emailError"></div>
            <input
              class="mobile-phone"
              type="text"
              id="newContactPhone"
              placeholder="Phone"
            />
            <div id="errorNewContactPhone" class="phoneError"></div>
          </form>
          <div class="mobile-popup-button">
            <button class="create-button" onclick="saveContact()">
              Create contact <img src="../assets/icons/check.png" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
    `;
  }
  
  /**
   * Generates the HTML template for the "Edit Contact" popup.
   * This popup allows users to edit the details of a selected contact,
   * including their name, email, and phone number.
   *
   * @returns {string} The HTML string for the "Edit Contact" popup.
   */
  function editContactPopup() {
    let contact = contacts[currentSelectedContact];
    let name = contact.name;
    let email = contact.email;
    let phone = contact.phone || "";
    let phonePlaceholder = contact.phone ? "" : "nicht vorhanden";
    return editContactPopupHTML(contact, name, email, phone, phonePlaceholder);
  }
  
  /**
   * Generates the HTML markup for the "Edit Contact" popup interface.
   * 
   * This function returns a complete HTML string that renders a popup form
   * for editing an existing contact. It includes:
   * - A profile initials section styled with the contact’s color.
   * - Input fields for name, email, and phone number, pre-filled with current values.
   * - Placeholders for error messages below each input.
   * - Buttons for saving changes or deleting the contact.
   * 
   * Uses `generateInitials(contact.name)` to display the contact's initials visually.
   * 
   * @function editContactPopupHTML
   * @param {Object} contact - The contact object containing the original contact data.
   * @param {string} contact.color - Background color for the profile circle.
   * @param {string} contact.name - Full name of the contact (used to generate initials).
   * @param {string} name - The current or updated name to be pre-filled in the input.
   * @param {string} email - The current or updated email address to be pre-filled.
   * @param {string} phone - The current or updated phone number to be pre-filled.
   * @param {string} phonePlaceholder - Placeholder text for the phone input field.
   * @returns {string} The HTML string for the edit contact popup.
   */
  function editContactPopupHTML(contact, name, email, phone, phonePlaceholder) {
    return /*html*/ `
    <div class="shadow-div"></div>
    <div class="add-edit-popup-contact-div">
      <div class="popup-left">
        <img src="../assets/img/logohell.png" alt="" />
        <h1>Edit contact</h1>
        <hr />
      </div>
      <div class="popup-right">
        <div class="popup-right-profile" style="background-color: ${contact.color};">
        ${generateInitials(contact.name)}
        </div>
        <div>
          <img
            class="popup-close-img"
            onclick="closePopUp()"
            src="../assets/icons/close.png"
            alt=""
          />
        </div>
        <div>
          <form>
            <input
              value="${name}"
              class="name"
              type="text"
              id="editContactName"
              placeholder="Name"
            />
            <div id="errorEditContactName" class="nameError"></div>
            <input
              value="${email}"
              class="email"
              type="text"
              id="editContactEmail"
              placeholder="Email"
            />
            <div id="errorEditContactEmail" class="emailError"></div>
            <input
              value="${phone}"
              class="phone"
              type="text"
              id="editContactPhone"
              placeholder="${phonePlaceholder}"
            />
            <div id="errorEditContactPhone" class="phoneError"></div>
          </form>
          <div class="popup-buttons">
            <button class="cancel-button" onclick="deleteContact(currentSelectedContact)">
              Delete
            </button>
            <button class="create-button" onclick="updateContact()">
              Save <img src="../assets/icons/check.png" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
    `;
  }
  
  /**
   * Generates the HTML template for a mobile popup to edit a contact.
   *
   * This function retrieves the currently selected contact's details (name, email, and phone)
   * and populates an editable form within a popup. The popup includes options to save the
   * updated contact information or delete the contact.
   *
   * @returns {string} The HTML string for the mobile edit contact popup.
   */
  function mobileEditContactPopup() {
    let contact = contacts[currentSelectedContact];
    let name = contact.name;
    let email = contact.email;
    let phone = contact.phone || "";
    let phonePlaceholder = contact.phone ? "" : "nicht vorhanden";
    return mobileEditContactPopupHTML(contact, name, email, phone, phonePlaceholder);
  }
  
  /**
   * Generates the HTML markup for the mobile version of the "Edit Contact" popup.
   * 
   * This function returns a complete HTML string optimized for mobile devices, including:
   * - A close button styled for mobile UI
   * - A section displaying the contact’s initials with background color
   * - Input fields for name, email, and phone, pre-filled with current values
   * - Error message placeholders for each input field
   * - Save and delete action buttons
   * 
   * Uses `generateInitials(contact.name)` to visually display the user's initials.
   * 
   * @function mobileEditContactPopupHTML
   * @param {Object} contact - The contact object containing original contact data.
   * @param {string} contact.color - The background color for the initials badge.
   * @param {string} contact.name - Full name of the contact, used for initials.
   * @param {string} name - The (possibly updated) name to be shown in the input field.
   * @param {string} email - The (possibly updated) email to be shown in the input field.
   * @param {string} phone - The (possibly updated) phone number to be shown in the input field.
   * @param {string} phonePlaceholder - Placeholder text for the phone input field.
   * @returns {string} The HTML string for the mobile "Edit Contact" popup.
   */
  function mobileEditContactPopupHTML(contact, name, email, phone, phonePlaceholder) {
    return /*html*/ `
    <div class="shadow-div"></div>
    <div class="mobile-add-edit-popup-contact-div">
        <div>
          <img
            class="mobile-popup-close-img"
            onclick="closePopUp()"
            src="../assets/icons/close-white.png"
            alt=""
          />
        </div>
      <div class="mobile-popup-above">
        <h1>Edit contact</h1>
        <hr />
      </div>
      <div class="mobile-edit-popup-below">
        <div class="popup-right-profile" style="background-color: ${contact.color};">
        ${generateInitials(contact.name)}
        </div>
        <div>
          <form class="mobile-form">
            <input
              value="${name}"
              class="mobile-name"
              type="text"
              id="editContactName"
              placeholder="Name"
            />
            <div id="errorEditContactName" class="nameError"></div>
            <input
              value="${email}"
              class="mobile-email"
              type="text"
              id="editContactEmail"
              placeholder="Email"
            />
            <div id="errorEditContactEmail" class="emailError"></div>
            <input
              value="${phone}"
              class="mobile-phone"
              type="text"
              id="editContactPhone"
              placeholder="${phonePlaceholder}"
            />
            <div id="errorEditContactPhone" class="phoneError"></div>
          </form>
          <div class="mobile-popup-button">
            <button class="cancel-button" onclick="deleteContact(currentSelectedContact)">
                Delete
            </button>
            <button class="create-button" onclick="updateContact()">
                Save <img src="../assets/icons/check.png" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
    `;
  }