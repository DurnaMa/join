const BASE_URL =
	"https://join-7f1d9-default-rtdb.europe-west1.firebasedatabase.app/";

function gesutLogin() {
	sessionStorage.setItem("username", "Guest");
	window.location.href = "../pages/summary.html";
}

async function init() {
	onloadFunc();
	loadData();
	postData("", {});
}

function onloadFunc() {
	console.log("test");
}

async function loadData(path = "") {
	let response = await fetch(BASE_URL + path + ".json");
	return (responseToJson = await response.json());
}

async function postData(path = "", data = {}) {
	let response = await fetch(BASE_URL + path + ".json", {
		method: "POST",
		header: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	return await response.json();
}

async function toTheRegistration() {
	let nameInput = document.getElementById("name");
	let emailInput = document.getElementById("email");
	let passwordInput = document.getElementById("password");

	if (nameInput.value && emailInput.value && passwordInput.value) {
		let data = {
			name: nameInput.value,
			email: emailInput.value,
			password: passwordInput.value,
		};

		try {
			await postData("/signup", data);
			nameInput.value = "";
			emailInput.value = "";
			passwordInput.value = "";
			console.log("Anmeldung erfolgreich");
		} catch (error) {
			console.error("Fehler bei der Anmeldung:", error);
		}
	} else {
		console.log("Bitte füllen Sie alle Felder aus");
	}
}

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
