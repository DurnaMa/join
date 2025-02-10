async function init() {
  onloadFunc();
  loadData();
  postData("", {});
  await loadDataUsers();
}

function onloadFunc() {
  console.log("test");
}

async function loadData(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  return (responseToJson = await response.json());
}

async function postData(path, data) {
  let response = await fetch(`${BASE_URL}${path}.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

async function toTheRegistration() {
  let array = loadData();
  let nameInput = document.getElementById("name");
  let emailInput = document.getElementById("email");
  let passwordInput = document.getElementById("signupPassword");
  // const user = contacts.find(
  //   (contact) => contact.email);

  if (nameInput.value && emailInput.value && passwordInput.value) {
    let data = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    };
    if (emailInput.value !== array.email) {
      try {
        await postData("/contacts", data);
        nameInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";
        console.log("Anmeldung erfolgreich");
        window.location.href = "/index.html";
      } catch (error) {
        console.error("Fehler bei der Anmeldung:", error);
      }
    } else {
     // toTheRegistration();
    }
  }
}

function emailValidation() {
  let emailInput = document.getElementById("email");
  let emailValue = emailInput.value;

  if (emailValue.includes("@") && emailValue.includes(".")) {
    emailInput.style.border = "1px solid green";
  } else if (emailValue) {
    emailInput.style.border = "1px solid red";
  } else if (emailValue) {
    emailInput.style.border = "1px solid blue";
  }
}

// async function emailCheck(data) {
//   let userEmailAdress = contacts.find((contact) => contact.email === email);

//   if (!userEmailAdress === data.email) {
//     errorDiv.textContent = "die E-Mail ist ist vorhanden.";

//     try {
//       await postData("/contacts", data);
//       nameInput.value = "";
//       emailInput.value = "";
//       passwordInput.value = "";
//       console.log("Anmeldung erfolgreich");
//       window.location.href = "/index.html";
//     } catch (error) {
//       console.error("Fehler bei der Anmeldung:", error);
//     }
//   } else {
//     toTheRegistration();
//   }
// }

// async function deleteData(path=""){
//     let response = await fetch(BASE_URL + path +".json",{
//         method: "DELETE",
//     })
//     return responseToJson = await response.json();
// }

// async function testPostData(path="", data={}){
//     const response = await fetch(BASE_URL + path +".json",{
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data)
//     });
//     return responseToJson = await response.json();
// }
