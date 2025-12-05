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
                <img src="../assets/icons/edit-pencil.png" alt="" />Edit
              </div>
              <div onclick="deleteContact(${currentSelectedContact})" class="contact-details-div-icon-edit img">
                <img src="../assets/icons/deleteContact.png" alt="">Delete
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