/**
 * Handles the login process by validating the user's email, password, and acceptance of terms.
 * Displays appropriate error messages if validation fails.
 * Redirects to the summary page if login is successful.
 *
 * @returns {boolean} - Returns true if login is successful, otherwise false.
 */
function logIn() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const checkbox = document.getElementById("checkboxLogin");
  const errorDiv = document.getElementById("loginError");
  if (!checkbox.checked) {
    errorDiv.textContent =
      "Bitte akzeptieren Sie die Bedingungen (Remember me).";
    errorDiv.style.color = "red";
    return false;
  }
  const user = contacts.find(
    (contact) => contact.email === email && contact.password === password
  );
  if (user) {
    errorDiv.textContent = "Login erfolgreich!";
    errorDiv.style.color = "green";
    window.location.href = "./pages/summary.html";
    return true;
  } else {
    errorDiv.textContent = "Das Passwort oder die E-Mail ist falsch.";
    return false;
  }
}

function guestLogin() {
  sessionStorage.setItem("username", "Guest");
  window.location.href = "../pages/summary.html";
}

// Code von Oliver(Mentor)

// function renderContacts() {
//   let contactsContainer = document.getElementById(" contacts-container");
//   contactsContainer.innerHTML = "";
//   for (let i = 0; i < contacts.length; i++) {
//     contactsContainer.innerHTML += renderContactHTML(i);
//   }
// }

// function renderContactHTML(contactIndex) {
//   return /*html*/ `
//     <div class="flex gap-x-8">
//       <div id="contact_${contactIndex}" class="bg-slate-300 h-max w-80 flex flex-col p-4 border border-slate-500 rounded-xl shadow">
//         <div class="text-lg font-semibold">${contacts[contactIndex]["name"]}</div>
//         <div>${contacts[contactIndex]["email"]}</div>
//         <div>${contacts[contactIndex]["phone"]}</div>
//         <div class="text-right">
//           <button onclick="deleteContact('${contacts[contactIndex]["id"]}')" class="bg-red-500  py-1 px-4 text-white rounded-lg">Delete</button>
//           <button onclick="editContact('${contacts[contactIndex]["id"]}')" class="bg-slate-700 py-1 px-4 text-white rounded-lg">Edit</button>
//         </div >
//       </div >

//       <div id="contact-form_${contacts[contactIndex]["id"]}" class="bg-slate-300 w-80 flex-col p-4 border border-slate-500 rounded-xl shadow hidden">
//         <form id="contact-form" onsubmit="saveContact('${contacts[contactIndex]["id"]}'); return false" class="flex flex-col gap-4">
//           <input id="name-edit" type="text" value="${contacts[contactIndex]["name"]}" class="max -w -xs py-2 px-4 border border-slate-800 rounded-lg">
//           <input id = "email-edit" type = "text" value = "${contacts[contactIndex]["email"]}" class="max-w-xs py-2 px-4 border border-slate-800 rounded-lg" >
//           <input id="phone-edit" type="text" value="${contacts[contactIndex]["phone"]}" class="max-w-xs py-2 px-4 border border-slate-800 rounded-lg">
//           <div class="text-right">
//             <button type="submit" class="bg-slate-700 py-1 px-4 text-white rounded-lg">Save</button>
//           </div>
//           </form >
//       </div >
//     </div >
//   `;
// }

// async function addContact() {
//   let contactName = document.getElementById("name").value;
//   let contactEmail = document.getElementById("email").value;
//   let contactPhone = document.getElementById("phone").value;
//   let contactData = {
//     name: contactName,
//     email: contactEmail,
//     phone: contactPhone,
//   };
//   await postDataToFirebase("contacts", contactData);
//   await loadContacts();
//   renderContacts();
//   document.getElementById("contact-form").reset();
// }

// function editContact(contactId) {
//   let contactEditForm = document.getElementById(`contact-form_${contactId}`);
//   contactEditForm.classList.remove("hidden");
//   contactEditForm.classList.add("flex");
// }

// async function saveContact(contactId) {
//   let contactEditForm = document.getElementById(`contact-form_${contactId}`);
//   let contactName = document.getElementById("name-edit").value;
//   let contactEmail = document.getElementById("email-edit").value;
//   let contactPhone = document.getElementById("phone-edit").value;
//   let contactData = {
//     name: contactName,
//     email: contactEmail,
//     phone: contactPhone,
//   };
//   let path = `contacts/${contactId}`;
//   await putDataOnFirebase(path, contactData);
//   contactEditForm.classList.remove("flex");
//   contactEditForm.classList.add("hidden");
//   await loadContacts();
//   renderContacts();
// }

// async function deleteContact(contactId) {
//   let path = `contacts/${contactId}`;
//   await deleteDataFromFirebase(path);
//   await loadContacts();
//   renderContacts();
// }

// Code ende von Oliver(Mentor)
