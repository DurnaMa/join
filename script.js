const BASE_URL = "https://join-7f1d9-default-rtdb.europe-west1.firebasedatabase.app/";

let contacts = [];

function init() {
  includeHTML();
}

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
}

async function deleteDataFromFirebase(path = "") {
  await fetch(BASE_URL + path + ".json", {
    method: "DELETE",
  });
}

async function loadContacts() {
  contacts = [];
  let contactsData = await getDataFromFirebase("contacts");

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
}

// Code ende von Oliver(Mentor)

function goBack() {
  const referrer = document.referrer;
  if (referrer) {
    window.location.href = referrer;
  } else {
    window.location.href = "index.html";
  }
}

async function putDataToFirebase(path, data = {}, key) {
  await fetch(BASE_URL + path + key + ".json", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
