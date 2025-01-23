// let contacts = [
//   {
//     name: 'Max Muster',
//     initial: 'MM',
//     email: 'max@mm.com',
//     phone: '01234567890',
//   },
//   {
//     name: 'Dax Duster',
//     initial: 'DD',
//     email: 'dax@mm.com',
//     phone: '1234567890',
//   },
//   {
//     name: 'Fax Fuster',
//     initial: 'FF',
//     email: 'fax@mm.com',
//     phone: '234567890',
//   },
// ];

function contactInit() {
  loadContacts();
  renderContactsList();
}

// async function loadData(path = '') {
//   let response = await fetch(BASE_URL + path + '.json');
//   return (responseToJson = await response.json());
// }

// let currentSelectedContact = 0;

// function selectContact(index) {
//   currentSelectedContact = index;
//   renderContactsList();

//   let contact = contacts[currentSelectedContact];
//   let contactDetails = document.getElementById('contactDetailsDiv');

//   contactDetails.innerHTML = /*html*/ `
//         <div class="contact-name">${contact.name}</div>
//     `;
// }



function renderContactsList() {
  let contactsList = document.getElementById('scrollbar');
  contactsList.innerHTML = '';

  for (let i = 0; i < contacts.length; i++) {
    contactsList.innerHTML += generateContactsList(i);
  }
}

function generateContactsList(i) {
  return /*html*/ `
          <div class="contacts-list">
            <div class="contacts-list-item-h3-div" onclick="selectContact(${i})">
              <div class="contacts-abbreviation-div">
                <div class="contacts-abbreviation">${contacts[i].initial}</div>
              </div>
              <div class="contacts-list-item"><h3>${contacts[i].name}</h3></div>
            </div>
            <div class="contacts-list-item-dividing"></div>
          </div>
    `;
}

/*
function generateContactsList(i) {
    return `
        <li class="contact" data-index="${i}">
            <div class="contact-name">${contacts[i].name}</div>
            <div class="contact-email">${contacts[i].email}</div>
            <div class="contact-phone">${contacts[i].phone}</div>
        </li>
    `;
}*/
