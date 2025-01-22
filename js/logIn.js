// Code von Oliver(Mentor)

async function loadDataUsers() {
  await loadContacts();
  //   renderContacts();
}

async function getDataFromFirebase(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  return (responseToJson = await response.json());
}

async function postDataToFirebase(path = "", data = {}) {
  await fetch(BASE_URL + path + ".json", {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

async function putDataOnFirebase(path = "", data = {}) {
  await fetch(BASE_URL + path + ".json", {
    method: "PUT",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log("Data Update!");
}

async function deleteDataFromFirebase(path = "") {
  await fetch(BASE_URL + path + ".json", {
    method: "DELETE",
  });
}

async function loadContacts() {
  contacts = [];
  let contactsData = await getDataFromFirebase("contacts");
  console.log("Contacts Data: ", contactsData);
  for (const key in contactsData) {
    const SINGLE_CONTACT = contactsData[key];
    let contact = {
      id: key,
      name: SINGLE_CONTACT.name,
      email: SINGLE_CONTACT.email,
      password: SINGLE_CONTACT.password,
      phone: SINGLE_CONTACT.phone,
    };
    contacts.push(contact);
  }
  console.log("Contacts: ", contacts);
}

// Code ende von Oliver(Mentor)


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
  const user = contacts.find((contact) => contact.email === email && contact.password === password);
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


// Code von Oliver(Mentor)

function renderContacts() {
  let contactsContainer = document.getElementById(" contacts-container");
  contactsContainer.innerHTML = "";
  for (let i = 0; i < contacts.length; i++) {
    contactsContainer.innerHTML += renderContactHTML(i);
  }
}

function renderContactHTML(contactIndex) {
  return /*html*/ `
    <div class="flex gap-x-8">
      <div id="contact_${contactIndex}" class="bg-slate-300 h-max w-80 flex flex-col p-4 border border-slate-500 rounded-xl shadow">
        <div class="text-lg font-semibold">${contacts[contactIndex]["name"]}</div>
        <div>${contacts[contactIndex]["email"]}</div>
        <div>${contacts[contactIndex]["phone"]}</div>
        <div class="text-right">
          <button onclick="deleteContact('${contacts[contactIndex]["id"]}')" class="bg-red-500  py-1 px-4 text-white rounded-lg">Delete</button>
          <button onclick="editContact('${contacts[contactIndex]["id"]}')" class="bg-slate-700 py-1 px-4 text-white rounded-lg">Edit</button>
        </div >
      </div >

      <div id="contact-form_${contacts[contactIndex]["id"]}" class="bg-slate-300 w-80 flex-col p-4 border border-slate-500 rounded-xl shadow hidden">
        <form id="contact-form" onsubmit="saveContact('${contacts[contactIndex]["id"]}'); return false" class="flex flex-col gap-4">
          <input id="name-edit" type="text" value="${contacts[contactIndex]["name"]}" class="max -w -xs py-2 px-4 border border-slate-800 rounded-lg">
          <input id = "email-edit" type = "text" value = "${contacts[contactIndex]["email"]}" class="max-w-xs py-2 px-4 border border-slate-800 rounded-lg" >
          <input id="phone-edit" type="text" value="${contacts[contactIndex]["phone"]}" class="max-w-xs py-2 px-4 border border-slate-800 rounded-lg">
          <div class="text-right">
            <button type="submit" class="bg-slate-700 py-1 px-4 text-white rounded-lg">Save</button>
          </div>
          </form >
      </div >
    </div >
  `;
}

async function addContact() {
  let contactName = document.getElementById("name").value;
  let contactEmail = document.getElementById("email").value;
  let contactPhone = document.getElementById("phone").value;
  let contactData = {
    name: contactName,
    email: contactEmail,
    phone: contactPhone,
  };
  await postDataToFirebase("contacts", contactData);
  await loadContacts();
  renderContacts();
  document.getElementById("contact-form").reset();
}

function editContact(contactId) {
  let contactEditForm = document.getElementById(`contact-form_${contactId}`);
  contactEditForm.classList.remove("hidden");
  contactEditForm.classList.add("flex");
}

async function saveContact(contactId) {
  let contactEditForm = document.getElementById(`contact-form_${contactId}`);
  let contactName = document.getElementById("name-edit").value;
  let contactEmail = document.getElementById("email-edit").value;
  let contactPhone = document.getElementById("phone-edit").value;
  let contactData = {
    name: contactName,
    email: contactEmail,
    phone: contactPhone,
  };
  let path = `contacts/${contactId}`;
  await putDataOnFirebase(path, contactData);
  contactEditForm.classList.remove("flex");
  contactEditForm.classList.add("hidden");
  await loadContacts();
  renderContacts();
}

async function deleteContact(contactId) {
  let path = `contacts/${contactId}`;
  await deleteDataFromFirebase(path);
  await loadContacts();
  renderContacts();
}

// Code ende von Oliver(Mentor)




// let users = [
// 	{
// 		name: "Max Muster",
// 		initial: "MM",
// 		email: "max@mm.com",
// 		password: 123,
// 		phone: "01234567890",
// 	},
// 	{
// 		name: "Dax Duster",
// 		initial: "DD",
// 		email: "dax@mm.com",
// 		password: 123,
// 		phone: "1234567890",
// 	},
// 	{
// 		name: "Fax Fuster",
// 		initial: "FF",
// 		email: "fax@mm.com",
// 		password: 123,
// 		phone: "234567890",
// 	},
// ];

// function init(){
// 	console.log("test");
// 	// loadData("signup");

// }

function guestLogin() {
	sessionStorage.setItem("username", "Guest");
	window.location.href = "../pages/summary.html";
}

// async function checkData(path){
// let data = await fetch(BASE_URL + path)
// }

// async function loadData(path="signup"){
// 	let response = await fetch(BASE_URL + path + ".json");
// 	let responseToJson = await response.json();
// 	console.log(responseToJson);

// 	let email = document.getElementById("loginEmail");
// 	let password = document.getElementById("loginPassword");

// 	let users = responseToJson
// 	let user = users.find(checkData => user.email == email.value && user.password == password.value);

// console.log(users);
// console.log(user);

// }

// function logIn() {
// 	let email = document.getElementById("loginEmail");
// 	let password = document.getElementById("loginPassword");

// 	let name = users.find(
// 		(name) => name.email === email.value && name.password === password.value
// 	);
// 	console.log(name);

// 	if (name) {
// 		console.log("Anmeldung");
// 	} else {
// 		console.log("Fehler bei der Anmeldung");
// 	}
// }
>>>>>>> 7cc1958288d0649aff57687d3e733bd7198e6803

// async function logIn(path = '') {
//   // let BASE_URL = 'https://join-7f1d9-default-rtdb.europe-west1.firebasedatabase.app/';
//   let response = await fetch(BASE_URL + path + '.json');
//   console.log('Abruf datenbak', BASE_URL);
//   let loginEmail = document.getElementById('loginEmail');
//   let loginPassword = document.getElementById('loginPassword');

//   if (loginEmail && loginPassword) {
//     let data = {
//       email: loginEmail.value,
//       password: loginPassword.value,
//     };
//     console.log(data);

//     try {
//       await loadData('/signup', data);
//       loginEmail.value = '';
//       loginPassword.value = '';
//       window.location.href = './pages/summary.html';
//       console.log('Anmeldung erfolgreich');
//     } catch (error) {
//       console.error('Fehler bei der Anmeldung:', error);
//     }
//   }

//   return (responseToJson = await response.json());
// }
